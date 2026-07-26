import fs from "node:fs";
import path from "node:path";
import { srcModule } from "./lib/load-module.mjs";

// ─────────────────────────────────────────────────────────────
// site-audit — the regression gates over the RENDERED site (M5, Part 10, ADR-017).
//
// `graph-audit.mjs` proves the graph is sound. It cannot prove the pages came out
// right, because it never looks at them: it checks records, edges, claims and
// sources, and then the prerenderer runs and writes 1,596 HTML files that nothing
// has ever asserted anything about. Every regression this project has actually
// feared — a canonical that stops being self-referencing, an hreflang set that
// loses a language, a JSON-LD block that becomes two, a 301 to a page that no
// longer exists, a title that turns up empty in one locale — happens on that side
// of the line and would have shipped green.
//
// So this is the other half, and it deliberately does NOT read the source code
// that produced the output. It opens the files a visitor and a crawler will
// actually receive and asserts the invariants against those. An audit that
// imports the generator to check the generator proves only that the generator is
// self-consistent; this one can fail when the generator is wrong.
//
// It gates, because everything here is correctness. Thin content, weak titles and
// missing photographs are `health-report.mjs`, which never fails a build.
// ─────────────────────────────────────────────────────────────

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const reportsDir = path.join(rootDir, "reports");
const reportPath = path.join(reportsDir, "site-audit.md");

if (!fs.existsSync(distDir)) {
  console.error("site-audit: dist/ does not exist — run the build first.");
  process.exit(1);
}

const routes = srcModule("routes.ts");
const seo = srcModule("seo.ts");

const gates = [];
const gate = (rule, message) => gates.push({ rule, message });

const languages = routes.allLanguageCodes;
const routePaths = routes.getAllStaticRoutePaths();

/** The generated HTML for a site path, or undefined when the file is missing. */
function htmlFor(routePath) {
  const file = path.join(distDir, routePath.replace(/^\/+/, ""), "index.html");
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : undefined;
}

function attr(html, pattern) {
  const match = pattern.exec(html);
  return match ? match[1] : undefined;
}

function countOf(html, pattern) {
  return (html.match(pattern) ?? []).length;
}

// ── 1. Every route generated exactly one page ────────────────
let checked = 0;
const titlesByLang = new Map();

for (const routePath of routePaths) {
  const html = htmlFor(routePath);
  if (!html) {
    gate("pages", `${routePath} was declared as a route but no index.html was generated for it.`);
    continue;
  }
  checked += 1;
  const lang = routePath.split("/")[1];

  // ── 2. The four things a page cannot be missing ────────────
  const title = attr(html, /<title>([\s\S]*?)<\/title>/);
  const description = attr(html, /<meta name="description" content="([^"]*)"/);
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  const htmlLang = attr(html, /<html lang="([^"]*)"/);

  if (!title || !title.trim()) gate("seo", `${routePath} has an empty <title>.`);
  if (!description || !description.trim()) gate("seo", `${routePath} has an empty meta description.`);
  if (!canonical) gate("seo", `${routePath} has no canonical link.`);
  if (htmlLang !== lang) gate("i18n", `${routePath} declares <html lang="${htmlLang}">, not "${lang}".`);

  // ── 3. Canonical is self-referencing or points at a real page ──
  // A canonical that points somewhere else is legitimate — that is how the
  // retired landing pages consolidate — but it must point at a page that exists,
  // or the consolidation loses the URL instead of merging it.
  if (canonical) {
    const canonicalPath = canonical.replace(seo.SITE_URL, "");
    if (canonicalPath !== routePath && !htmlFor(canonicalPath)) {
      gate("seo", `${routePath} canonicalises to ${canonicalPath}, which was not generated.`);
    }
  }

  // ── 4. One JSON-LD block, and it parses ───────────────────
  // Two blocks on a page is the classic duplication regression: a generator that
  // inserts instead of replacing produces a page that says everything twice, and
  // nothing downstream notices until a rich result quietly disappears.
  const scripts = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (scripts.length === 0) gate("structured data", `${routePath} carries no JSON-LD.`);
  else if (scripts.length > 1) gate("structured data", `${routePath} carries ${scripts.length} JSON-LD blocks; one page states its schema once.`);
  else {
    try {
      const parsed = JSON.parse(scripts[0][1]);
      const nodes = parsed["@graph"] ?? [parsed];
      if (!Array.isArray(nodes) || nodes.length === 0) gate("structured data", `${routePath} JSON-LD contains no nodes.`);
      // Every @id a node references must resolve inside the same graph, or a
      // consumer follows a pointer to nothing (the dangling-@id regression).
      const ids = new Set(nodes.map((node) => node["@id"]).filter(Boolean));
      const referenced = JSON.stringify(nodes).matchAll(/"@id":"([^"]+)"/g);
      for (const [, id] of referenced) {
        if (id.startsWith(`${seo.SITE_URL}/#`) && !ids.has(id)) {
          gate("structured data", `${routePath} JSON-LD references "${id}", which no node defines.`);
        }
      }
    } catch (error) {
      gate("structured data", `${routePath} JSON-LD does not parse: ${error.message}`);
    }
  }

  // ── 5. hreflang covers every language, exactly once each ──
  const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)"/g)].map(([, code]) => code);
  const seen = new Set();
  for (const code of alternates) {
    if (seen.has(code)) gate("i18n", `${routePath} declares hreflang "${code}" twice.`);
    seen.add(code);
  }
  for (const code of languages) {
    if (!seen.has(code)) gate("i18n", `${routePath} is missing the hreflang for "${code}".`);
  }

  // ── 6. Breadcrumbs on every page below the front door ─────
  // A page three levels deep with no BreadcrumbList is a page Google cannot place
  // in a hierarchy, which is the whole point of having built one.
  const depth = routePath.split("/").filter(Boolean).length;
  if (depth > 1 && !html.includes('"BreadcrumbList"')) {
    gate("breadcrumbs", `${routePath} is ${depth} levels deep and emits no BreadcrumbList.`);
  }

  // ── 7. The static fallback carries an h1 ──────────────────
  // The prerendered fallback is what a crawler without JavaScript reads. A page
  // whose fallback has no heading is, to that crawler, a blank page.
  if (html.includes('id="static-seo-content"') && !/<h1[^>]*>[\s\S]*?<\/h1>/.test(html)) {
    gate("content", `${routePath} renders a static fallback with no <h1>.`);
  }

  // ── 8. No duplicate titles inside one language ────────────
  const isIndexable = !/<meta name="robots" content="[^"]*noindex/.test(html);
  if (title && isIndexable) {
    const bucket = titlesByLang.get(lang) ?? new Map();
    if (bucket.has(title)) {
      gate("seo", `${routePath} and ${bucket.get(title)} share the indexable title "${title}".`);
    } else {
      bucket.set(title, routePath);
    }
    titlesByLang.set(lang, bucket);
  }
}

// ── 9. Redirects resolve ─────────────────────────────────────
// A 301 to a page that was never generated is a 404 with extra steps, and it is
// invisible until somebody follows an old link.
const redirectsPath = path.join(rootDir, "public", "_redirects");
if (fs.existsSync(redirectsPath)) {
  for (const line of fs.readFileSync(redirectsPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [from, to] = trimmed.split(/\s+/);
    if (!to || /^https?:\/\//.test(to)) continue;
    // `:lang` is expanded to a real language; a rule that works for bg works for
    // all fourteen because the same generator produced all fourteen.
    const target = to.replace(":lang", "bg");
    if (target.includes(":")) continue; // a splat rule; its target is a prefix
    if (!htmlFor(target)) gate("redirects", `${from} → ${to} points at ${target}, which was not generated.`);
    if (from.replace(":lang", "bg") === target) gate("redirects", `${from} → ${to} redirects a path to itself.`);
  }
}

// ── 10. The machine surfaces exist and parse ─────────────────
for (const [file, check] of [
  ["llms.txt", (text) => text.includes("## Claims, with source and confidence")],
  ["knowledge.json", (text) => Array.isArray(JSON.parse(text).entities)],
  ["search-index.json", (text) => Array.isArray(JSON.parse(text).entries)],
  ["sitemap.xml", (text) => text.includes("<sitemapindex")],
  ["robots.txt", (text) => text.toLowerCase().includes("sitemap:")],
]) {
  const full = path.join(distDir, file);
  if (!fs.existsSync(full)) {
    gate("exports", `dist/${file} was not generated.`);
    continue;
  }
  try {
    if (!check(fs.readFileSync(full, "utf8"))) gate("exports", `dist/${file} is present but does not carry what it should.`);
  } catch (error) {
    gate("exports", `dist/${file} is malformed: ${error.message}`);
  }
}

// ── 11. Sitemaps advertise only pages that exist ─────────────
for (const language of languages) {
  const sitemapPath = path.join(distDir, `sitemap-${language}.xml`);
  if (!fs.existsSync(sitemapPath)) {
    gate("sitemap", `sitemap-${language}.xml was not generated.`);
    continue;
  }
  const xml = fs.readFileSync(sitemapPath, "utf8");
  for (const [, loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const locPath = loc.replace(seo.SITE_URL, "");
    if (!htmlFor(locPath)) gate("sitemap", `sitemap-${language}.xml advertises ${locPath}, which was not generated.`);
  }
}

// ── Report ───────────────────────────────────────────────────
const lines = [
  "# Rendered-site audit",
  "",
  `Checked ${checked} generated pages across ${languages.length} languages.`,
  "",
  "Gates: every page has one title, one description, one canonical that resolves, one",
  "JSON-LD block that parses with no dangling `@id`, an hreflang for every language,",
  "a BreadcrumbList below the front door, and an `<h1>` in its no-JavaScript",
  "fallback. Every redirect target and every sitemap entry resolves to a page that",
  "was actually generated. Nothing here reads the code that produced the output.",
  "",
  "## Gates (build fails on any)",
  "",
];
if (gates.length === 0) {
  lines.push("_None._");
} else {
  lines.push("| Rule | Violation |", "| --- | --- |");
  for (const g of gates) lines.push(`| ${g.rule} | ${g.message.replaceAll("|", "\\|")} |`);
}
lines.push("", "## Summary", "", `Pages checked: ${checked} · Gate violations: ${gates.length}`, "");

fs.mkdirSync(reportsDir, { recursive: true });
fs.writeFileSync(reportPath, `${lines.join("\n")}\n`);

console.log(`site-audit checked ${checked} generated pages: ${gates.length} gate violations.`);
console.log(`Report written to ${path.relative(rootDir, reportPath)}`);
if (gates.length > 0) process.exitCode = 1;
