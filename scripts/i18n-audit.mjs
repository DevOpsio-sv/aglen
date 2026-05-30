import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const rootDir = process.cwd();
const localesDir = path.join(rootDir, "src", "locales");
const reportsDir = path.join(rootDir, "reports");
const reportPath = path.join(reportsDir, "i18n-bg-audit.md");
const sourceLanguage = "bg";
const ignoredLocaleModules = new Set(["index", "shared", "types"]);
const ignoredTextPathPatterns = [
  /^experiencesList\.\d+\.price$/,
  /^galleryItems\.\d+\.size$/,
];
const allowedSameAsSourcePathPatterns = [
  /^app\.title$/,
  /^brand\.name$/,
  /^hero\.title$/,
  /^nav\.quests$/,
  /^placesList\.\d+\.title$/,
];

function readSource(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function parseSource(filePath) {
  return ts.createSourceFile(filePath, readSource(filePath), ts.ScriptTarget.Latest, true);
}

function collectExportedConsts(filePath) {
  const sourceFile = parseSource(filePath);
  const exports = new Map();

  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return;

    const isExported = node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
    if (!isExported) return;

    for (const declaration of node.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.initializer) {
        exports.set(declaration.name.text, declaration.initializer);
      }
    }
  });

  return exports;
}

function nodeToRef(node) {
  if (ts.isIdentifier(node)) return node.text;
  if (ts.isPropertyAccessExpression(node)) return `${nodeToRef(node.expression)}.${node.name.text}`;
  if (ts.isElementAccessExpression(node)) return `${nodeToRef(node.expression)}[${node.argumentExpression.getText()}]`;
  return node.getText();
}

function getPropertyName(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text;
  }

  return name.getText();
}

function evaluateNode(node, context, seen = new Set()) {
  if (ts.isAsExpression(node) || ts.isSatisfiesExpression?.(node)) {
    return evaluateNode(node.expression, context, seen);
  }

  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return { kind: "text", value: node.text };
  }

  if (ts.isIdentifier(node)) {
    const referenced = context.get(node.text);
    if (!referenced) return { kind: "ref", value: node.text };
    if (seen.has(node.text)) return { kind: "ref", value: node.text };

    return evaluateNode(referenced, context, new Set([...seen, node.text]));
  }

  if (ts.isElementAccessExpression(node)) {
    const target = evaluateNode(node.expression, context, seen);
    const index = ts.isNumericLiteral(node.argumentExpression)
      ? Number(node.argumentExpression.text)
      : Number.NaN;

    if (target.kind === "array" && Number.isInteger(index)) {
      return target.items[index] ?? { kind: "ref", value: nodeToRef(node) };
    }

    return { kind: "ref", value: nodeToRef(node) };
  }

  if (ts.isArrayLiteralExpression(node)) {
    return {
      kind: "array",
      items: node.elements.map((element) => evaluateNode(element, context, seen)),
    };
  }

  if (ts.isObjectLiteralExpression(node)) {
    const entries = new Map();

    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) continue;
      entries.set(getPropertyName(property.name), evaluateNode(property.initializer, context, seen));
    }

    return { kind: "object", entries };
  }

  return { kind: "ref", value: nodeToRef(node) };
}

function flattenText(value, currentPath = [], rows = []) {
  if (value.kind === "text") {
    rows.push({ path: currentPath.join("."), value: value.value });
    return rows;
  }

  if (value.kind === "array") {
    value.items.forEach((item, index) => flattenText(item, [...currentPath, String(index)], rows));
    return rows;
  }

  if (value.kind === "object") {
    for (const [key, item] of value.entries) {
      flattenText(item, [...currentPath, key], rows);
    }
  }

  return rows;
}

function getAtPath(value, dottedPath) {
  return dottedPath.split(".").reduce((current, segment) => {
    if (!current) return undefined;
    if (current.kind === "object") return current.entries.get(segment);
    if (current.kind === "array") return current.items[Number(segment)];
    return undefined;
  }, value);
}

function markdownEscape(value) {
  return value.replaceAll("|", "\\|").replaceAll("\n", " ");
}

function isText(value) {
  return value?.kind === "text";
}

function shouldAuditPath(dottedPath) {
  return !ignoredTextPathPatterns.some((pattern) => pattern.test(dottedPath));
}

function canMatchSource(dottedPath) {
  return allowedSameAsSourcePathPatterns.some((pattern) => pattern.test(dottedPath));
}

function compareLocale(language, sourceRows, sourcePaths, localeValue) {
  const localeRows = flattenText(localeValue).filter((row) => shouldAuditPath(row.path));
  const missing = [];
  const nonText = [];
  const sameAsBulgarian = [];
  const likelyTooShort = [];

  for (const sourceRow of sourceRows) {
    const localeNode = getAtPath(localeValue, sourceRow.path);

    if (!localeNode) {
      missing.push(sourceRow);
      continue;
    }

    if (!isText(localeNode)) {
      nonText.push({ ...sourceRow, actual: localeNode.kind });
      continue;
    }

    const targetValue = localeNode.value.trim();
    const sourceValue = sourceRow.value.trim();

    if (targetValue === sourceValue && !canMatchSource(sourceRow.path)) {
      sameAsBulgarian.push({ ...sourceRow, current: targetValue });
    }

    if (sourceValue.length > 120 && targetValue.length < sourceValue.length * 0.45) {
      likelyTooShort.push({ ...sourceRow, current: targetValue });
    }
  }

  const extra = localeRows.filter((row) => !sourcePaths.has(row.path));

  return {
    language,
    totalTextNodes: localeRows.length,
    missing,
    nonText,
    sameAsBulgarian,
    likelyTooShort,
    extra,
  };
}

function formatIssueRows(rows, includeCurrent = false) {
  if (rows.length === 0) return "_None._\n";

  const header = includeCurrent
    ? "| Path | Bulgarian source | Current value |\n| --- | --- | --- |"
    : "| Path | Bulgarian source |\n| --- | --- |";
  const body = rows
    .map((row) => includeCurrent
      ? `| \`${row.path}\` | ${markdownEscape(row.value)} | ${markdownEscape(row.current ?? row.actual ?? "")} |`
      : `| \`${row.path}\` | ${markdownEscape(row.value)} |`)
    .join("\n");

  return `${header}\n${body}\n`;
}

function formatLocaleRows(rows) {
  if (rows.length === 0) return "_None._\n";

  const body = rows
    .map((row) => `| \`${row.path}\` | ${markdownEscape(row.value)} |`)
    .join("\n");

  return `| Path | Current value |\n| --- | --- |\n${body}\n`;
}

function buildReport(sourceRows, comparisons) {
  const generatedAt = new Date().toISOString();
  const report = [];

  report.push("# Bulgarian Copy Audit");
  report.push("");
  report.push(`Generated: ${generatedAt}`);
  report.push(`Source of truth: \`src/locales/${sourceLanguage}.ts\``);
  report.push("");
  report.push("## How To Use This");
  report.push("");
  report.push("1. Review the Bulgarian source checklist below for spelling, tone, and factual accuracy.");
  report.push("2. Update each non-Bulgarian locale at the same object path as the Bulgarian source.");
  report.push("3. Use the per-language sections as the update brief: each row shows the Bulgarian source and the current target value that needs review.");
  report.push("4. Run `npm run i18n:audit` again until every locale has zero missing paths and no stale Bulgarian text.");
  report.push("5. Run `npm run build` before publishing.");
  report.push("");
  report.push("## Summary");
  report.push("");
  report.push("| Language | Text nodes | Missing | Non-text at BG path | Same as BG | Likely too short | Extra |");
  report.push("| --- | ---: | ---: | ---: | ---: | ---: | ---: |");

  for (const comparison of comparisons) {
    report.push(`| ${comparison.language} | ${comparison.totalTextNodes} | ${comparison.missing.length} | ${comparison.nonText.length} | ${comparison.sameAsBulgarian.length} | ${comparison.likelyTooShort.length} | ${comparison.extra.length} |`);
  }

  report.push("");
  report.push("## Bulgarian Source Checklist");
  report.push("");
  report.push(`Total Bulgarian text nodes: ${sourceRows.length}`);
  report.push("");
  report.push("| Path | Bulgarian text |");
  report.push("| --- | --- |");

  for (const row of sourceRows) {
    report.push(`| \`${row.path}\` | ${markdownEscape(row.value)} |`);
  }

  for (const comparison of comparisons) {
    report.push("");
    report.push(`## ${comparison.language.toUpperCase()} Update Checklist`);
    report.push("");
    report.push("### Missing Bulgarian Paths");
    report.push("");
    report.push(formatIssueRows(comparison.missing));
    report.push("### Non-Text Values Where Bulgarian Has Text");
    report.push("");
    report.push(formatIssueRows(comparison.nonText, true));
    report.push("### Same As Bulgarian");
    report.push("");
    report.push(formatIssueRows(comparison.sameAsBulgarian, true));
    report.push("### Likely Too Short");
    report.push("");
    report.push(formatIssueRows(comparison.likelyTooShort, true));
    report.push("### Extra Target-Language Paths");
    report.push("");
    report.push(formatLocaleRows(comparison.extra));
  }

  return `${report.join("\n")}\n`;
}

const sharedContext = collectExportedConsts(path.join(localesDir, "shared.ts"));
const localeFiles = fs
  .readdirSync(localesDir)
  .filter((file) => file.endsWith(".ts"))
  .map((file) => path.basename(file, ".ts"))
  .filter((name) => !ignoredLocaleModules.has(name))
  .sort((a, b) => (a === sourceLanguage ? -1 : b === sourceLanguage ? 1 : a.localeCompare(b)));

const locales = new Map();

for (const language of localeFiles) {
  const localeExports = collectExportedConsts(path.join(localesDir, `${language}.ts`));
  const localeNode = localeExports.get(language);

  if (!localeNode) {
    throw new Error(`No exported const named "${language}" found in src/locales/${language}.ts`);
  }

  locales.set(language, evaluateNode(localeNode, new Map([...sharedContext, ...localeExports])));
}

const sourceValue = locales.get(sourceLanguage);
const sourceRows = flattenText(sourceValue).filter((row) => shouldAuditPath(row.path));
const sourcePaths = new Set(sourceRows.map((row) => row.path));
const comparisons = [...locales.entries()]
  .filter(([language]) => language !== sourceLanguage)
  .map(([language, localeValue]) => compareLocale(language, sourceRows, sourcePaths, localeValue));

fs.mkdirSync(reportsDir, { recursive: true });
fs.writeFileSync(reportPath, buildReport(sourceRows, comparisons));

const issueCount = comparisons.reduce(
  (total, comparison) => total
    + comparison.missing.length
    + comparison.nonText.length
    + comparison.sameAsBulgarian.length
    + comparison.likelyTooShort.length
    + comparison.extra.length,
  0,
);

console.log(`Audited ${sourceRows.length} Bulgarian text nodes across ${comparisons.length} target locales.`);
console.log(`Report written to ${path.relative(rootDir, reportPath)}`);

if (issueCount > 0) {
  console.log(`Found ${issueCount} translation issues that need review.`);
  process.exitCode = 1;
}
