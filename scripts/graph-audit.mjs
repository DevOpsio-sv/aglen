import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

// ─────────────────────────────────────────────────────────────
// graph-audit — the single build gate for the knowledge graph (Constitution
// rule 29; MASTER_ARCHITECTURE_BLUEPRINT §4.3, §15). It composes the rule-sets
// that apply at M3 into one enforcement point so their numbering never drifts:
//
//   • Graph health   — KNOWLEDGE_GRAPH §7 (orphans, reciprocity, coordinate
//                      inheritance, >60 km edges without a reason, one home per
//                      subject).
//   • Generation     — a published page must resolve a name, a description and a
//                      containment path, and carry an honest schema type (never
//                      the TouristDestination view type, C6).
//   • Linking        — every derived internal link resolves to a page that
//                      exists (zero 301-hops); every published page is reachable
//                      from /karst/.
//   • References     — every relation target and parent resolves (V3); symmetric
//                      edges are reciprocal (V7).
//
// Provenance rules (V1/V2/V4/V-hash) are the claim ledger and are deferred with
// M4. Missing coordinates, media, story and gallery are WARNINGS, not gates —
// they mark field-day work, not defects.
// ─────────────────────────────────────────────────────────────

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");
const reportsDir = path.join(rootDir, "reports");
const reportPath = path.join(reportsDir, "graph-audit.md");
const nodeRequire = createRequire(import.meta.url);
const moduleCache = new Map();

function resolveSourceModule(specifier, fromFile) {
  if (!specifier.startsWith(".")) return specifier;
  const basePath = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [basePath, `${basePath}.ts`, `${basePath}.tsx`, `${basePath}.js`, `${basePath}.mjs`, `${basePath}.json`, path.join(basePath, "index.ts")];
  const match = candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (!match) throw new Error(`Cannot resolve ${specifier} from ${fromFile}`);
  return match;
}

function loadSourceModule(filePath) {
  if (!filePath.startsWith(rootDir)) return nodeRequire(filePath);
  const resolvedPath = resolveSourceModule(filePath, path.join(rootDir, "scripts", "graph-audit.mjs"));
  if (moduleCache.has(resolvedPath)) return moduleCache.get(resolvedPath).exports;

  if (resolvedPath.endsWith(".json")) {
    const parsed = JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
    moduleCache.set(resolvedPath, { exports: parsed });
    return parsed;
  }

  const source = fs.readFileSync(resolvedPath, "utf8");
  const module = { exports: {} };
  moduleCache.set(resolvedPath, module);
  const output = ts.transpileModule(source, {
    compilerOptions: { esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    fileName: resolvedPath,
  }).outputText;
  const localRequire = (specifier) => {
    if (specifier.endsWith(".css")) return {};
    const target = resolveSourceModule(specifier, resolvedPath);
    if (path.isAbsolute(target) && target.startsWith(rootDir)) return loadSourceModule(target);
    return nodeRequire(target);
  };
  const runner = new Function("exports", "require", "module", "__filename", "__dirname", output);
  runner(module.exports, localRequire, module, resolvedPath, path.dirname(resolvedPath));
  return module.exports;
}

const gates = [];
const warnings = [];
const gate = (rule, message) => gates.push({ rule, message });
const warn = (rule, message) => warnings.push({ rule, message });

const graph = loadSourceModule(path.join(rootDir, "src", "graph", "index.ts"));
const content = loadSourceModule(path.join(rootDir, "src", "content.ts"));
const KARST_ROOT = "karst-lukovit";
const LANGS = ["bg", "en"]; // the full knowledge tier (Constitution rule 43)

const entities = graph.entities;
const byId = new Map(entities.map((e) => [e.id, e]));

function publicAssetExists(assetUrl) {
  if (!assetUrl || /^https?:\/\//.test(assetUrl)) return true;
  const cleanPath = assetUrl.split("?")[0].replace(/^\/+/, "");
  return fs.existsSync(path.join(publicDir, cleanPath));
}

// ── 0. Assembly errors (duplicate ids/slugs/paths, malformed records, bad parents)
for (const problem of graph.assembleErrors) gate("records", problem);

// ── 1. References — every relation target and parent resolves (V3)
for (const entity of entities) {
  if (entity.parent && !byId.has(entity.parent)) gate("reference", `"${entity.id}" parent "${entity.parent}" does not exist.`);
  for (const relation of entity.relations) {
    if (!byId.has(relation.target)) gate("reference", `"${entity.id}" relation ${relation.type} → "${relation.target}" does not exist.`);
    if (relation.km !== undefined && relation.km > 60 && !relation.reason) {
      gate("health", `"${entity.id}" ${relation.type} → "${relation.target}" is ${relation.km} km and carries no reason (KNOWLEDGE_GRAPH §7 rule 4).`);
    }
  }
}

// ── 2. Reciprocity — symmetric edges render both ways with identical values (V7)
const SYMMETRIC = new Set(["sameFormation", "sameWatershed", "combinesWellWith", "nearby"]);
for (const entity of entities) {
  for (const relation of graph.relationsOf(entity)) {
    if (!SYMMETRIC.has(relation.type)) continue;
    const target = byId.get(relation.target);
    if (!target) continue;
    const mirrored = graph.relationsOf(target).some((edge) => edge.type === relation.type && edge.target === entity.id);
    if (!mirrored) gate("health", `Reciprocity broken: "${entity.id}" ${relation.type} "${relation.target}" is not mirrored back.`);
  }
}

// ── 3. Coordinate inheritance — an entity claiming geo has its own fix (rule 16)
const aglen = byId.get("aglen");
const aglenPoint = aglen && graph.entityPoint(aglen);
for (const entity of entities) {
  const point = graph.entityPoint(entity);
  if (!point) continue;
  if (entity.id !== "aglen" && aglenPoint && point.lat === aglenPoint.lat && point.lon === aglenPoint.lon) {
    gate("health", `"${entity.id}" claims the village coordinates — inherited, not its own fix (rule 16).`);
  }
}

// ── 4. Generation — a published page resolves name + description + honest schema
for (const entity of entities) {
  const page = entity.page;
  if (!page || page.status !== "published") continue;
  if (!page.path.startsWith("/place/") && !page.path.startsWith("/karst/")) {
    gate("generation", `"${entity.id}" page path "${page.path}" is outside the /place/ and /karst/ namespaces (rule 18).`);
  }
  if (/tourist ?destination/i.test(entity.schemaType)) {
    gate("generation", `"${entity.id}" uses the view type "${entity.schemaType}"; entity pages carry Place/Landform/Cave types (C6).`);
  }
  for (const lang of LANGS) {
    if (!graph.entityName(entity, lang).trim()) gate("generation", `"${entity.id}" has no ${lang} name.`);
    if (!graph.entityShortText(entity, lang).trim()) gate("generation", `"${entity.id}" has no ${lang} description to render (would ship an empty page, rule 28).`);
  }
  if (!entity.parent && !page.breadcrumbRoot) {
    gate("generation", `"${entity.id}" has no parent and is not a breadcrumb root — it has no containment path.`);
  }
}

// ── 5. Linking — derived links resolve to existing published pages (zero 301-hops)
const pagePaths = new Set(entities.filter((e) => e.page?.status === "published").map((e) => e.page.path));
for (const entity of entities) {
  if (entity.page?.status !== "published") continue;
  for (const link of graph.derivedLinks(entity, "bg")) {
    if (!pagePaths.has(link.path)) gate("linking", `"${entity.id}" derives a link to "${link.path}" which is not a published page path.`);
  }
}

// ── 6. Orphans — every published page is reachable from /karst/ (rule 17)
// A hub lists its containment subtree, so a place is reachable via its ancestors;
// cross-tree entities are reachable through the karst's typed relations.
const reachable = new Set();
(function walk(id, depth) {
  if (!byId.has(id) || reachable.has(id)) return;
  reachable.add(id);
  // down the containment subtree (a hub page lists its descendants)
  for (const child of graph.childrenOf(id)) walk(child.id, depth + 1);
  // across typed relations (rendered as links)
  for (const relation of graph.relationsOf(byId.get(id))) walk(relation.target, depth + 1);
})(KARST_ROOT, 0);
for (const entity of entities) {
  if (entity.page?.status === "published" && !reachable.has(entity.id)) {
    gate("orphan", `"${entity.id}" (${entity.page.path}) is not reachable from /karst/.`);
  }
}

// ── 7. Broken images — a published page's transcluded hero must exist
for (const entity of entities) {
  if (entity.page?.status !== "published") continue;
  const placeId = entity.contentRef?.placeId;
  if (placeId) {
    const place = content.contentByLanguage.bg.placesList.find((p) => p.id === placeId);
    if (place && !publicAssetExists(place.image)) gate("assets", `"${entity.id}" transcludes missing image ${place.image}.`);
  }
}

// ── 8. Warnings — field-day gaps, never gates (mission "warnings only")
for (const entity of entities) {
  if (entity.page?.status !== "published") continue;
  if (!graph.entityPoint(entity) && !(entity.geo && entity.geo.linear)) warn("coordinates", `"${entity.id}" has no coordinates yet (needs a GPS fix).`);
  if (graph.derivedLinks(entity, "bg").filter((l) => /км|km/.test(l.label)).length === 0 && graph.entityPoint(entity)) warn("nearby", `"${entity.id}" surfaces no nearby entity.`);
  if (graph.entitySameAs(entity).length === 0) warn("sameAs", `"${entity.id}" has no external identifier (Wikidata/OSM/Commons).`);
}

// ── Report ───────────────────────────────────────────────────
const lines = [
  "# Knowledge-graph audit",
  "",
  `Entities: ${entities.length} · published pages: ${entities.filter((e) => e.page?.status === "published").length} · nodes: ${entities.filter((e) => !e.page || e.page.status === "node").length}`,
  "",
  "## Gates (build fails on any)",
  "",
];
if (gates.length === 0) lines.push("_None._");
else {
  lines.push("| Rule | Violation |", "| --- | --- |");
  for (const g of gates) lines.push(`| ${g.rule} | ${g.message.replaceAll("|", "\\|")} |`);
}
lines.push("", "## Warnings (field-day gaps)", "");
if (warnings.length === 0) lines.push("_None._");
else {
  lines.push("| Kind | Note |", "| --- | --- |");
  for (const w of warnings) lines.push(`| ${w.rule} | ${w.message.replaceAll("|", "\\|")} |`);
}
lines.push("", "## Summary", "", `Gates: ${gates.length} · Warnings: ${warnings.length}`, "");

fs.mkdirSync(reportsDir, { recursive: true });
fs.writeFileSync(reportPath, `${lines.join("\n")}\n`);

console.log(`graph-audit checked ${entities.length} entities: ${gates.length} gate violations, ${warnings.length} warnings.`);
console.log(`Report written to ${path.relative(rootDir, reportPath)}`);
if (gates.length > 0) process.exitCode = 1;
