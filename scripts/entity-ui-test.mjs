import fs from "node:fs";
import path from "node:path";
import { srcModule } from "./lib/load-module.mjs";

// ─────────────────────────────────────────────────────────────
// entity-ui-test — the leak gate (M5.1 repair, §12).
//
// The defect this exists to prevent shipped once and would have shipped again.
// Confidence markers reached production not because anybody decided to publish
// them but because two renderers each read `Claim.confidence` and nothing was
// watching. A code review would have to catch it every time; this has to catch it
// once.
//
// The tests are invariants over the built site and the data layer, not snapshots.
// A snapshot of an entity page would fail on every wording change and be updated
// without being read, which is worse than no test. These fail only when something
// a visitor must never see appears, or when something they must always have is
// missing.
//
// Ten checks, matching the ten guarantees the repair promised:
//   1. confidence survives in the data layer
//   2. no confidence marker in visitor HTML
//   3. uncertain material is phrased, not dropped or asserted
//   4. related entities carry human labels
//   5. sources are collapsed and optional
//   6. breadcrumbs use visitor-facing labels
//   7. every entity page routes back into the main site
//   8. locale-prefixed links stay in their locale
//   9. JSON-LD still renders and still carries the machine facts
//  10. every entity page type goes through the shared presentation layer
// ─────────────────────────────────────────────────────────────

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");

if (!fs.existsSync(distDir)) {
  console.error("entity-ui-test: dist/ does not exist — run the build first.");
  process.exit(1);
}

const graph = srcModule("graph", "index.ts");
const ledger = srcModule("graph", "ledger.ts");
const editorial = srcModule("graph", "editorial.ts");

const failures = [];
const checks = [];
function check(name, fn) {
  try {
    const detail = fn();
    checks.push({ name, ok: true, detail });
  } catch (error) {
    checks.push({ name, ok: false, detail: error.message });
    failures.push(`${name}: ${error.message}`);
  }
}
function assert(condition, message) {
  if (!condition) throw new Error(message);
}

/** Every published entity page in Bulgarian, plus the region roots. */
const entityPages = graph.entities
  .filter((entity) => entity.page?.status === "published")
  .map((entity) => ({ id: entity.id, path: `/bg${entity.page.path}` }));

function htmlFor(routePath) {
  const file = path.join(distDir, routePath.replace(/^\/+/, ""), "index.html");
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : undefined;
}

/**
 * The text a visitor actually reads: the rendered body with script, style and
 * the JSON-LD stripped out. Machine surfaces are allowed to carry the enum; this
 * is what must not.
 */
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<head[\s\S]*?<\/head>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
}

// ── 1. Confidence survives where it belongs ──────────────────
check("confidence remains available to the data layer", () => {
  const values = new Set(ledger.claims.map((claim) => claim.confidence));
  assert(ledger.claims.length > 0, "the ledger is empty");
  assert(values.has("verified") && values.has("uncertain"), `confidence values collapsed to ${[...values].join(", ")}`);
  const editorialCount = ledger.claims.filter((claim) => !editorial.isPublic(claim)).length;
  assert(editorialCount > 0, "no claim is marked editorial — the audience boundary is not in use");
  return `${ledger.claims.length} claims, ${editorialCount} editorial, ${values.size} confidence values intact`;
});

// ── 2. No confidence marker reaches visitor HTML ─────────────
// Both the enum and its Bulgarian rendering, bracketed or bare. `/sources/` and
// `/source/<slug>/` are exempt: they ARE the transparency surface, and §2 places
// provenance vocabulary there by design.
const FORBIDDEN = [
  /\[\s*verified\s*\]/i,
  /\[\s*reported\s*\]/i,
  /\[\s*disputed\s*\]/i,
  /\[\s*uncertain\s*\]/i,
  /\[\s*проверено\s*\]/i,
  /\[\s*предава се\s*\]/i,
  /\[\s*оспорвано\s*\]/i,
  /\[\s*несигурно\s*\]/i,
  /\bclm-[a-z0-9-]+-\d{4}\b/, // a claim id
  /\bsrc-[a-z0-9]+-\d{4}\b/, // a source id
  /\bdsp-[a-z0-9-]+-\d{3}\b/, // a dispute id
  /\bevd-\d{8}-\d{3}\b/, // an evidence id
  /\bsameFormation\b|\bcombinesWellWith\b|\bbirthPlaceOf\b|\bsubjectOf\b|\bcontainedIn\b|\bsupersededBy\b|\baccessedFrom\b/,
  /\bE[1-5]\b(?!\w)/, // an entity-confidence grade
];

check("no confidence marker, record id or relation type in visitor HTML", () => {
  const hits = [];
  for (const page of entityPages) {
    const html = htmlFor(page.path);
    if (!html) {
      hits.push(`${page.path} was not generated`);
      continue;
    }
    const text = visibleText(html);
    for (const pattern of FORBIDDEN) {
      const match = pattern.exec(text);
      if (match) hits.push(`${page.path} → "${match[0]}"`);
    }
  }
  assert(hits.length === 0, hits.join("; "));
  return `${entityPages.length} entity pages clean`;
});

// ── 3. Uncertain material is phrased, not dropped or asserted ──
check("uncertain claims are narrated with a hedge, never bare", () => {
  const uncertain = ledger.claims.filter((claim) => claim.confidence === "uncertain" && editorial.isPublic(claim));
  assert(uncertain.length > 0, "no public uncertain claim exists to check");
  for (const claim of uncertain) {
    const narrated = editorial.narrate(claim, "bg");
    const bare = ledger.claimStatement(claim, "bg");
    assert(narrated !== bare, `"${claim.id}" is narrated identically to its bare statement — the hedge was lost`);
    assert(
      /^Според местните разкази|^Не е установено/.test(narrated),
      `"${claim.id}" is narrated as "${narrated.slice(0, 40)}…" with no recognisable hedge`,
    );
  }
  // …and the hedge actually reaches the page.
  const html = htmlFor("/bg/place/aglen/");
  assert(html && /Според местните разкази/.test(visibleText(html)), "the village page carries no phrased hedge");
  return `${uncertain.length} public uncertain claims, all hedged in prose`;
});

check("editorial notes never appear in the narrative", () => {
  for (const page of entityPages) {
    const notes = editorial.editorialClaims(page.id);
    const narrated = editorial.narrateClaims(page.id).map((line) => line.id);
    for (const note of notes) {
      assert(!narrated.includes(note.id), `"${note.id}" is an editorial note and is being narrated on ${page.path}`);
    }
  }
  return "no editorial note is narrated on any page";
});

// ── 4. Related entities carry human labels ───────────────────
check("related entities render with readable names", () => {
  const html = htmlFor("/bg/place/aglen/");
  assert(html, "/bg/place/aglen/ was not generated");
  const text = visibleText(html);
  assert(text.includes("Трифон Кунев"), "the village page does not name Trifon Kunev");
  assert(!/роден тук|свързана история|също в /.test(text), "a raw relation caption is still rendered");
  return "grouped under human headings, no relation captions";
});

// ── 5. Sources are collapsed and optional ────────────────────
check("source disclosure is a collapsed, accessible control", () => {
  const html = htmlFor("/bg/place/aglen/");
  const app = fs.readFileSync(path.join(rootDir, "src", "graph", "EntitySections.tsx"), "utf8");
  assert(app.includes("<details className=\"entity-sources\">"), "the disclosure is not a <details> element");
  assert(app.includes("<summary>"), "the disclosure has no <summary> control");
  assert(!/\bopen\b\s*=\s*\{?true/.test(app), "the disclosure is open by default");
  // The sources must still be reachable — collapsed, not deleted.
  assert(html.includes("Източници и редакционни бележки"), "the disclosure summary is missing from the page");
  return "<details>/<summary>, closed by default, sources present";
});

// ── 6. Breadcrumbs use visitor-facing labels ─────────────────
check("breadcrumbs read as navigation, not as a containment walk", () => {
  const html = htmlFor("/bg/place/aglen/");
  const json = JSON.parse(html.match(/id="site-jsonld">([\s\S]*?)<\/script>/)[1]);
  const crumbs = (json["@graph"] ?? []).find((node) => node["@type"] === "BreadcrumbList");
  assert(crumbs, "no BreadcrumbList");
  const names = crumbs.itemListElement.map((item) => item.name);
  assert(names[0] === "Начало" && names[1] === "Места", `trail starts "${names.slice(0, 2).join(" / ")}"`);
  assert(names[names.length - 1] === "Ъглен", `trail ends "${names[names.length - 1]}"`);
  // No unpublished graph node may appear as a crumb.
  const nodeNames = graph.entities.filter((entity) => !entity.page || entity.page.status === "node").map((entity) => graph.entityName(entity, "bg"));
  for (const page of entityPages) {
    const pageHtml = htmlFor(page.path);
    if (!pageHtml) continue;
    const parsed = JSON.parse(pageHtml.match(/id="site-jsonld">([\s\S]*?)<\/script>/)[1]);
    const trail = (parsed["@graph"] ?? []).find((node) => node["@type"] === "BreadcrumbList");
    for (const item of trail?.itemListElement ?? []) {
      assert(!nodeNames.includes(item.name), `${page.path} has the unpublished node "${item.name}" as a crumb`);
    }
  }
  return names.join(" / ");
});

// ── 7. Every entity page routes back into the main site ──────
check("every entity page offers a route back into the main site", () => {
  const editorialRoutes = ["/bg/guides/", "/bg/karst/", "/bg/place/", "/bg/local-businesses/", "/bg/events/"];
  for (const page of entityPages) {
    const html = htmlFor(page.path);
    if (!html) continue;
    const others = editorialRoutes.filter((route) => html.includes(`href="${route}"`) && !page.path.startsWith(route.replace(/\/$/, "")));
    assert(others.length > 0, `${page.path} links to no main-site destination`);
  }
  return `${entityPages.length} pages each link back into editorial content`;
});

// ── 8. Locale-prefixed links stay in their locale ────────────
check("locale-prefixed links stay in the active locale", () => {
  for (const lang of ["bg", "en", "de"]) {
    const html = htmlFor(`/${lang}/place/aglen/`);
    assert(html, `/${lang}/place/aglen/ was not generated`);
    const internal = [...html.matchAll(/href="(\/[a-z]{2}\/[^"]*)"/g)].map((match) => match[1]);
    const strays = internal.filter((href) => !href.startsWith(`/${lang}/`));
    assert(strays.length === 0, `${lang}: ${strays.slice(0, 3).join(", ")}`);
    assert(internal.length > 0, `${lang}: no internal links at all`);
  }
  return "bg, en and de each keep their prefix";
});

// ── 9. JSON-LD still carries the machine facts ───────────────
check("JSON-LD renders and still carries confidence", () => {
  const html = htmlFor("/bg/place/aglen/");
  const json = JSON.parse(html.match(/id="site-jsonld">([\s\S]*?)<\/script>/)[1]);
  const nodes = json["@graph"] ?? [json];
  const claims = nodes.filter((node) => node["@type"] === "Claim");
  assert(claims.length > 0, "no Claim nodes survived");
  assert(
    claims.every((claim) => typeof claim.disambiguatingDescription === "string"),
    "a Claim node lost its confidence",
  );
  // …and the editorial notes are NOT published as facts about the place.
  const texts = claims.map((claim) => claim.text);
  assert(!texts.some((text) => /не е сверено|не се публикува/.test(text)), "an editorial note is published as a schema.org Claim");
  const place = nodes.find((node) => String(node["@id"] ?? "").endsWith("#entity"));
  assert(place?.name === "Ъглен", "the entity node lost its name");
  assert(Array.isArray(place.alternateName) && place.alternateName.length > 0, "alternateName was dropped");
  return `${claims.length} Claim nodes, confidence intact, aliases intact`;
});

// ── 10. One shared presentation layer ────────────────────────
check("every entity page type uses the shared presentation layer", () => {
  const pages = fs.readFileSync(path.join(rootDir, "src", "graph", "EntityPages.tsx"), "utf8");
  const knowledge = fs.readFileSync(path.join(rootDir, "src", "graph", "KnowledgePages.tsx"), "utf8");
  for (const component of ["EntityHero", "EntityIntro", "EntityStory", "SourceDisclosure"]) {
    assert(pages.includes(component), `EntityPages.tsx does not use ${component}`);
  }
  assert(knowledge.includes("EntityDetail"), "the knowledge namespaces do not share EntityDetail");
  // The ENTITY presentation must not read confidence — that is what the editorial
  // layer is for. `KnowledgePages.tsx` is exempt and deliberately so: it also
  // renders /sources/ and /source/<slug>/, which are the transparency surfaces
  // where provenance vocabulary belongs (§2). What it may not do is render an
  // entity page of its own, and it does not — it delegates to EntityDetail.
  for (const file of ["EntityPages.tsx", "EntitySections.tsx"]) {
    const source = fs.readFileSync(path.join(rootDir, "src", "graph", file), "utf8");
    assert(!/claim-confidence|confidenceLabel/.test(source), `${file} renders a confidence label`);
    assert(!/claim\.confidence/.test(source), `${file} reads claim confidence directly`);
  }

  const kinds = new Set(
    entityPages
      .map((page) => graph.entityById(page.id).kind)
      .filter(Boolean),
  );
  return `${kinds.size} entity kinds through one composition`;
});

// ── Report ───────────────────────────────────────────────────
for (const result of checks) {
  console.log(`${result.ok ? "  ok  " : " FAIL "} ${result.name}${result.detail ? ` — ${result.detail}` : ""}`);
}
console.log(`\nentity-ui-test: ${checks.filter((c) => c.ok).length}/${checks.length} passed.`);
if (failures.length > 0) process.exitCode = 1;
