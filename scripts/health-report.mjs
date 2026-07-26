import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { publicAssetExists, srcModule } from "./lib/load-module.mjs";

// ─────────────────────────────────────────────────────────────
// health-report — the project's dashboard (M5, Parts 3 and 9, ADR-017).
//
// This script never fails a build. That is its design, not a weakness.
//
// `graph-audit.mjs` and `site-audit.mjs` are gates: they stop a deploy that is
// WRONG — a dangling reference, an unsourced indexed claim, a flattened
// confidence, a page linked from nothing, a redirect to nowhere. What they must
// never do is stop a deploy that is merely THIN, because the moment a gate fires
// on "this description is short" somebody adds an exception, and the next person
// adds another, and within a year the gate is a list of exceptions and the
// architecture's one enforcement point has been talked out of enforcing.
//
// So quality lives here instead, and it lives as a number that moves. A short
// description, a page with two inbound links, a claim nobody has reviewed in a
// year, a photograph the project does not have — every one of these is real work,
// none of them is a defect, and all of them belong on a dashboard a human reads
// rather than in a gate a build argues with.
//
// The report is written to `reports/health.md` for reading and `reports/health.json`
// for the next build to diff against — which is how bundle growth and coverage
// drift become visible over time rather than only at the moment somebody looks.
// ─────────────────────────────────────────────────────────────

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const reportsDir = path.join(rootDir, "reports");
const reportPath = path.join(reportsDir, "health.md");
const dataPath = path.join(reportsDir, "health.json");
const authoringPath = path.join(reportsDir, "authoring-map.md");

const graph = srcModule("graph", "index.ts");
const ledger = srcModule("graph", "ledger.ts");
const registry = srcModule("graph", "registry.ts");
const media = srcModule("graph", "media.ts");
const search = srcModule("graph", "search.ts");
const routes = srcModule("routes.ts");
const seo = srcModule("seo.ts");
const guides = srcModule("guides.ts");
const localBusinesses = srcModule("localBusinesses.ts");

const TODAY = new Date().toISOString().slice(0, 10);
const LANGS = ["bg", "en"];
const ALL_LANGS = routes.allLanguageCodes;

const entities = graph.entities;
const published = entities.filter((entity) => entity.page?.status === "published");

// ── Thresholds ───────────────────────────────────────────────
// Every number here is a judgement, so every number here is named and explained
// rather than inlined. They are the shape of "good enough", and a project that
// wants to raise its bar raises it in one place.
const T = {
  /** Below this a summary tells a reader nothing they could not guess. */
  shortSummary: 80,
  /** A Google title is truncated around here; longer is not wrong, just unread. */
  longTitle: 62,
  /** Meta descriptions truncate around here. */
  longDescription: 158,
  shortDescription: 70,
  /** Rule 15: below three sourced claims a thing is a section, not a page. */
  thinClaims: 3,
  /** Below this a page depends on its index to be found at all. */
  weakInbound: 3,
  /** A page with fewer outbound links than this is close to a dead end (rule 23). */
  deadEndOutbound: 2,
  /** Claims unreviewed for longer than this are the review queue. */
  staleReviewDays: 365,
  /** Two summaries this similar are probably one page written twice. */
  duplicateSimilarity: 0.8,
};

const findings = []; // { area, severity, subject, note }
const flag = (area, severity, subject, note) => findings.push({ area, severity, subject, note });

// ── 1. Entity and page coverage ──────────────────────────────
const byKind = {};
for (const entity of entities) byKind[entity.kind] = (byKind[entity.kind] ?? 0) + 1;

const byNamespace = {};
for (const namespace of registry.NAMESPACES) {
  byNamespace[namespace.id] = graph.namespaceEntities(namespace.prefix).length;
}

const byRegion = registry.REGIONS.map((region) => ({
  id: region.id,
  name: region.name.en ?? region.name.bg,
  entities: entities.filter((entity) => graph.regionOf(entity)?.id === region.id).length,
  published: published.filter((entity) => graph.regionOf(entity)?.id === region.id).length,
  root: region.rootEntityId,
  base: region.baseEntityId,
}));

// ── 2. Link density, orphans and dead ends ───────────────────
const outbound = new Map();
const inbound = new Map();
for (const entity of published) {
  const links = graph.derivedLinks(entity, "bg").filter((link) => {
    const target = graph.entityById(link.entityId);
    return target?.page?.status === "published";
  });
  outbound.set(entity.id, links.length);
  for (const link of links) inbound.set(link.entityId, (inbound.get(link.entityId) ?? 0) + 1);
}

for (const entity of published) {
  const out = outbound.get(entity.id) ?? 0;
  const inn = inbound.get(entity.id) ?? 0;
  const isRoot = registry.REGIONS.some((region) => region.rootEntityId === entity.id);
  if (out < T.deadEndOutbound && !isRoot) {
    flag("journeys", "high", entity.id, `${out} outbound link(s) — a reader arriving here has nowhere to go next (rule 23).`);
  }
  if (inn < T.weakInbound && !isRoot) {
    flag("discoverability", inn === 0 ? "high" : "medium", entity.id, `${inn} inbound link(s); ${T.weakInbound} is where a page stops depending on its index.`);
  }
}

const linkTotals = [...outbound.values()];
const linkDensity = linkTotals.length > 0 ? linkTotals.reduce((sum, n) => sum + n, 0) / linkTotals.length : 0;

// ── 3. Descriptions, summaries and translations ──────────────
for (const entity of published) {
  for (const lang of LANGS) {
    const name = graph.entityName(entity, lang);
    const summary = graph.entityShortText(entity, lang);
    if (!name || name === entity.slug) flag("translations", "high", entity.id, `no ${lang} name resolves; the page would show its slug.`);
    if (!summary) flag("summaries", "high", entity.id, `no ${lang} summary — the card and the meta description would be empty.`);
    else if (summary.length < T.shortSummary) {
      flag("summaries", "low", entity.id, `${lang} summary is ${summary.length} characters; under ${T.shortSummary} it rarely says anything specific.`);
    }
  }
  // The knowledge tier is bg + en; the other twelve serve the page and fall back
  // to English by design (rule 43), so a missing translation there is the tier
  // working, not a gap. What IS a gap is an English fallback that never arrives.
  if (!entity.name?.en && !entity.contentRef && entity.name) {
    flag("translations", "medium", entity.id, "carries a Bulgarian name with no English form; twelve languages will show Bulgarian.");
  }
}

// ── 4. Duplicate entities and duplicate facts ────────────────
// Two kinds of duplication, and they fail differently. Two entities that answer
// to the same name are two records competing to be one thing (gated inside a
// region, reported across regions). Two claims that say the same thing are one
// fact written twice, and the day one is corrected the site contradicts itself.
for (const { key, entityIds } of graph.nameKeyIndex()) {
  if (entityIds.length > 1) {
    flag("duplicates", "medium", entityIds.join(" / "), `all answer to the name "${key}" — check they are genuinely different things.`);
  }
}

function similarity(a, b) {
  const wordsA = new Set(a.toLowerCase().split(/\W+/).filter((word) => word.length > 3));
  const wordsB = new Set(b.toLowerCase().split(/\W+/).filter((word) => word.length > 3));
  if (wordsA.size === 0 || wordsB.size === 0) return 0;
  let shared = 0;
  for (const word of wordsA) if (wordsB.has(word)) shared += 1;
  return shared / Math.min(wordsA.size, wordsB.size);
}

const summaries = published.map((entity) => ({ id: entity.id, text: graph.entityShortText(entity, "bg") })).filter((row) => row.text);
for (let i = 0; i < summaries.length; i += 1) {
  for (let j = i + 1; j < summaries.length; j += 1) {
    const score = similarity(summaries[i].text, summaries[j].text);
    if (score >= T.duplicateSimilarity) {
      flag("duplicates", "medium", `${summaries[i].id} / ${summaries[j].id}`, `summaries are ${Math.round(score * 100)}% the same words — one of them is probably not about its own subject.`);
    }
  }
}

const statementIndex = new Map();
for (const claim of ledger.liveClaims()) {
  const key = claim.statement.bg.trim().toLowerCase().replace(/\s+/g, " ");
  const owners = statementIndex.get(key) ?? [];
  owners.push(claim);
  statementIndex.set(key, owners);
}
for (const [, owners] of statementIndex) {
  if (owners.length > 1) {
    flag("duplicate facts", "high", owners.map((claim) => claim.entityId).join(" / "), `the same statement is recorded ${owners.length} times — one fact, one record (rule 2).`);
  }
}

// ── 5. Thin pages and the claim ledger ───────────────────────
for (const entity of published) {
  const count = ledger.claimCount(entity.id);
  if (count < T.thinClaims) {
    flag("thin pages", count === 0 ? "high" : "medium", entity.id, `${count} sourced claim(s); rule 15 wants ${T.thinClaims} before a thing earns a page.`);
  }
}

// ── 6. Review queue (M5, Part 4) ─────────────────────────────
// "Last reviewed" is only worth printing if somebody is going to review again.
// This is the list that makes that happen: what has gone longest without a human
// going back to the sources.
const staleClaims = [];
for (const claim of ledger.liveClaims()) {
  if (!claim.reviewedAt) {
    staleClaims.push({ id: claim.id, entityId: claim.entityId, reviewedAt: null, days: Infinity });
    continue;
  }
  const days = Math.round((Date.parse(TODAY) - Date.parse(claim.reviewedAt)) / 86400000);
  if (days > T.staleReviewDays) staleClaims.push({ id: claim.id, entityId: claim.entityId, reviewedAt: claim.reviewedAt, days });
}
staleClaims.sort((a, b) => b.days - a.days);

// ── 7. SEO surface ───────────────────────────────────────────
const seenTitles = new Map();
const seoRows = [];
for (const entity of published) {
  for (const lang of LANGS) {
    const namespace = graph.namespaceDefOf(entity);
    const routeId = namespace?.id ?? registry.REGIONS.find((region) => region.rootEntityId === entity.id)?.rootRouteId;
    if (!routeId) continue;
    const isRoot = registry.REGIONS.some((region) => region.rootEntityId === entity.id);
    const config = seo.getSEOConfig(lang, routeId, isRoot ? undefined : entity.slug);
    seoRows.push({ id: entity.id, lang, title: config.title, description: config.description });
    if (config.title.length > T.longTitle) {
      flag("seo titles", "low", `${entity.id} (${lang})`, `title is ${config.title.length} characters; Google truncates around ${T.longTitle}.`);
    }
    if (config.description.length > T.longDescription) {
      flag("seo descriptions", "low", `${entity.id} (${lang})`, `description is ${config.description.length} characters; snippets truncate around ${T.longDescription}.`);
    } else if (config.description.length < T.shortDescription) {
      flag("seo descriptions", "medium", `${entity.id} (${lang})`, `description is ${config.description.length} characters — too short to answer a query.`);
    }
    const titleKey = `${lang}::${config.title}`;
    if (seenTitles.has(titleKey)) {
      flag("seo titles", "high", `${entity.id} / ${seenTitles.get(titleKey)}`, `share the ${lang} title "${config.title}" — two pages competing for one query.`);
    } else {
      seenTitles.set(titleKey, entity.id);
    }
  }
}

// ── 8. Schema and external identity ──────────────────────────
let withSameAs = 0;
for (const entity of published) {
  if (graph.entitySameAs(entity).length > 0) withSameAs += 1;
  else flag("schema", "medium", entity.id, "no external identifier (Wikidata / OSM / Commons) — nothing reconciles this page to the wider graph.");
  if (/tourist ?destination/i.test(entity.schemaType)) {
    flag("schema", "high", entity.id, `carries the view type "${entity.schemaType}" instead of what it is (C6).`);
  }
}

// ── 9. Media ─────────────────────────────────────────────────
const allAssets = graph.allMedia();
let renderableAssets = 0;
let brokenAssets = 0;
for (const { entity, asset } of allAssets) {
  if (media.isRenderable(asset)) renderableAssets += 1;
  if (!publicAssetExists(asset.src)) {
    brokenAssets += 1;
    flag("media", "high", entity.id, `asset ${asset.src} is not in public/.`);
  }
}
const withOwnHero = published.filter((entity) => graph.entityHeroAsset(entity)).length;

// ── 10. Field-work and historical uncertainty ────────────────
const sited = published.filter((entity) => registry.KIND_IS_SITED[entity.kind] === true);
const sitedWithFix = sited.filter((entity) => graph.entityPoint(entity) || entity.geo?.linear);
const uncertainClaims = ledger.liveClaims().filter((claim) => claim.confidence === "uncertain");
const openDisputes = ledger.disputes.filter((dispute) => dispute.status === "open");

// ── 11. Redirects ────────────────────────────────────────────
// A 301 whose target does not exist is a broken promise to every link that ever
// pointed at the old URL. Checked here against the routes the site will generate;
// `site-audit.mjs` checks the same thing against the HTML that was generated.
const redirectsPath = path.join(rootDir, "public", "_redirects");
const knownPaths = new Set(routes.getAllStaticRoutePaths());
let redirectCount = 0;
if (fs.existsSync(redirectsPath)) {
  for (const line of fs.readFileSync(redirectsPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [, to] = trimmed.split(/\s+/);
    if (!to || /^https?:\/\//.test(to)) continue;
    redirectCount += 1;
    const resolved = to.replace(":lang", "bg").replace(":splat", "");
    if (resolved.startsWith("/") && !knownPaths.has(resolved) && !resolved.includes(":")) {
      flag("redirects", "high", trimmed, `301 target ${resolved} is not a generated page.`);
    }
  }
}

// ── 12. Bundle ───────────────────────────────────────────────
// Growth, not size: a number without a previous number is a fact nobody can act
// on. The previous build's figures come from the committed `health.json`, which
// is what makes this a trend rather than a reading.
function bundleSizes() {
  const assetsDir = path.join(distDir, "assets");
  if (!fs.existsSync(assetsDir)) return null;
  let js = 0;
  let css = 0;
  let jsGzip = 0;
  for (const file of fs.readdirSync(assetsDir)) {
    const full = path.join(assetsDir, file);
    if (!fs.statSync(full).isFile()) continue;
    const bytes = fs.statSync(full).size;
    if (file.endsWith(".js")) {
      js += bytes;
      jsGzip += zlib.gzipSync(fs.readFileSync(full)).length;
    } else if (file.endsWith(".css")) {
      css += bytes;
    }
  }
  return { js, css, jsGzip };
}

const previous = fs.existsSync(dataPath) ? JSON.parse(fs.readFileSync(dataPath, "utf8")) : undefined;
const bundle = bundleSizes();
if (bundle && previous?.bundle?.jsGzip) {
  const growth = ((bundle.jsGzip - previous.bundle.jsGzip) / previous.bundle.jsGzip) * 100;
  if (growth > 5) flag("bundle", "medium", "dist/assets", `gzipped JavaScript grew ${growth.toFixed(1)}% since the last recorded build.`);
}

// ── 13. Search index ─────────────────────────────────────────
const index = search.buildSearchIndex();
const aliasChecks = search.aliasExpectations();
const aliasResolved = aliasChecks.filter((expectation) =>
  search.searchIndexFor(index, expectation.query, 5).some((entry) => entry.path === expectation.path),
).length;
const withAliases = published.filter((entity) => (entity.aliases ?? []).length > 0).length;

// ── The report ───────────────────────────────────────────────
const bySeverity = (level) => findings.filter((finding) => finding.severity === level).length;
const areas = [...new Set(findings.map((finding) => finding.area))].sort();

const percent = (part, whole) => (whole === 0 ? "—" : `${Math.round((part / whole) * 100)}%`);
const kb = (bytes) => `${(bytes / 1024).toFixed(1)} kB`;

const data = {
  generated: TODAY,
  entities: entities.length,
  published: published.length,
  nodes: entities.filter((entity) => !entity.page || entity.page.status === "node").length,
  byKind,
  byNamespace,
  regions: byRegion,
  claims: ledger.claims.length,
  liveClaims: ledger.liveClaims().length,
  sources: ledger.sources.length,
  evidence: ledger.evidence.length,
  uncertainClaims: uncertainClaims.length,
  openDisputes: openDisputes.length,
  corrections: ledger.corrections().length,
  linkDensity: Number(linkDensity.toFixed(2)),
  withSameAs,
  withOwnHero,
  mediaAssets: allAssets.length,
  renderableAssets,
  brokenAssets,
  sited: sited.length,
  sitedWithFix: sitedWithFix.length,
  staleClaims: staleClaims.length,
  redirects: redirectCount,
  searchEntries: index.entries.length,
  aliasChecks: aliasChecks.length,
  aliasResolved,
  withAliases,
  bundle,
  findings: findings.length,
  high: bySeverity("high"),
  medium: bySeverity("medium"),
  low: bySeverity("low"),
};

const bundleRow = () => {
  if (!bundle) return "| Bundle (gzipped JS) | not built |";
  const before = previous?.bundle?.jsGzip;
  const delta = before ? ` (${bundle.jsGzip >= before ? "+" : ""}${(((bundle.jsGzip - before) / before) * 100).toFixed(1)}% since last record)` : "";
  return `| Bundle (gzipped JS) | ${kb(bundle.jsGzip)}${delta} |`;
};

const lines = [
  "# Site health",
  "",
  `Generated ${TODAY}. **This report never fails a build** — correctness is gated by`,
  "`graph-audit.mjs` and `site-audit.mjs`; everything here is work, not breakage",
  "(ADR-017).",
  "",
  `**${data.findings} findings** — ${data.high} high · ${data.medium} medium · ${data.low} low.`,
  "",
  "## Coverage",
  "",
  "| Measure | Value |",
  "| --- | --- |",
  `| Entities | ${data.entities} (${data.published} published, ${data.nodes} nodes) |`,
  `| Regions | ${byRegion.length} |`,
  `| Sourced claims (live) | ${data.liveClaims} of ${data.claims} |`,
  `| Sources | ${data.sources} · evidence records ${data.evidence} |`,
  `| Stated unknowns | ${data.uncertainClaims} |`,
  `| Open questions | ${data.openDisputes} |`,
  `| Corrections published | ${data.corrections} |`,
  `| Pages with an external identifier | ${withSameAs}/${published.length} (${percent(withSameAs, published.length)}) |`,
  `| Sited things with a GPS fix | ${sitedWithFix.length}/${sited.length} (${percent(sitedWithFix.length, sited.length)}) |`,
  `| Pages with a photograph of their own | ${withOwnHero}/${published.length} (${percent(withOwnHero, published.length)}) |`,
  `| Pages carrying other names | ${withAliases}/${published.length} (${percent(withAliases, published.length)}) |`,
  `| Average outbound links per page | ${data.linkDensity} |`,
  `| Search index entries | ${data.searchEntries} · aliases resolving ${aliasResolved}/${aliasChecks.length} |`,
  `| Redirect rules | ${redirectCount} |`,
  `| Guides · businesses | ${guides.guides.length} · ${localBusinesses.publishedBusinesses().length} |`,
  `| Languages served · knowledge tier | ${ALL_LANGS.length} · ${LANGS.length} |`,
  bundleRow(),
  "",
  "## By namespace",
  "",
  "| Namespace | Published | Status |",
  "| --- | --- | --- |",
  ...registry.NAMESPACES.map((namespace) => {
    const count = byNamespace[namespace.id];
    const status = count > 0 ? "live" : "declared, dormant — publishes nothing until an entity claims it";
    return `| /${namespace.slug}/ | ${count} | ${status} |`;
  }),
  "",
  "## By region",
  "",
  "| Region | Entities | Published | Root | Measures from |",
  "| --- | --- | --- | --- | --- |",
  ...byRegion.map((region) => `| ${region.name} (\`${region.id}\`) | ${region.entities} | ${region.published} | \`${region.root}\` | \`${region.base ?? "—"}\` |`),
  "",
  "## By kind",
  "",
  "| Kind | Records | Publishes under |",
  "| --- | --- | --- |",
  ...Object.entries(byKind)
    .sort((a, b) => b[1] - a[1])
    .map(([kind, count]) => {
      const home = registry.KIND_HOME[kind];
      return `| ${kind} | ${count} | ${home ? `/${home}/` : "another product owns that URL"} |`;
    }),
  "",
];

if (staleClaims.length > 0) {
  lines.push(
    "## Review queue",
    "",
    `${staleClaims.length} statement(s) have gone longer than ${T.staleReviewDays} days without a human going back to the sources, oldest first.`,
    "",
    "| Claim | About | Last reviewed |",
    "| --- | --- | --- |",
    ...staleClaims.slice(0, 25).map((row) => `| ${row.id} | ${row.entityId} | ${row.reviewedAt ?? "never"} |`),
    "",
  );
} else {
  lines.push("## Review queue", "", `_Empty — every live statement has been checked against its sources within ${T.staleReviewDays} days._`, "");
}

lines.push("## Findings", "");
if (findings.length === 0) {
  lines.push("_None._", "");
} else {
  for (const area of areas) {
    const rows = findings.filter((finding) => finding.area === area);
    lines.push(`### ${area} (${rows.length})`, "", "| Severity | Subject | Note |", "| --- | --- | --- |");
    for (const row of rows.sort((a, b) => a.severity.localeCompare(b.severity))) {
      lines.push(`| ${row.severity} | ${row.subject} | ${row.note.replaceAll("|", "\\|")} |`);
    }
    lines.push("");
  }
}

fs.mkdirSync(reportsDir, { recursive: true });
fs.writeFileSync(reportPath, `${lines.join("\n")}\n`);
fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);

// ── The authoring map (M5, Part 4) ───────────────────────────
// "Where does this belong?" answered from the registry, so the answer cannot be
// out of date with the code. This is the file a contributor reads before writing
// their first record, and nobody maintains it.
const authoring = [
  "# Where new knowledge goes",
  "",
  "**Generated from `src/graph/registry.ts` by `scripts/health-report.mjs`. Do not edit.**",
  "",
  "You have found a cave, a legend, a person, a document, a custom, an orchid. This",
  "table says which file it goes in and what its record has to carry. If the answer",
  "is not here, the thing needs a new namespace — that is an ADR in",
  "`docs/MASTER_ARCHITECTURE_BLUEPRINT.md` §18, not a new folder.",
  "",
  "## The kinds",
  "",
  "| If it is a… | use `kind` | its page lives at | occupies ground? |",
  "| --- | --- | --- | --- |",
  ...Object.keys(registry.KIND_HOME)
    .sort()
    .map((kind) => {
      const home = registry.KIND_HOME[kind];
      const where = home ? `/${home}/<slug>/` : "no entity page — the directory or the calendar owns that URL";
      return `| ${kind} | \`${kind}\` | ${where} | ${registry.KIND_IS_SITED[kind] ? "yes — it needs its own GPS fix, never an inherited one (rule 16)" : "no"} |`;
    }),
  "",
  "## The regions",
  "",
  "A region is one boundary with three roles at once: the data partition, the",
  "editorial unit and the physiographic subtree (ADR-009). Put the record in the",
  "partition whose landscape actually contains the thing.",
  "",
  "| Region | Records live in | Root entity | Distances measured from |",
  "| --- | --- | --- | --- |",
  ...registry.REGIONS.map(
    (region) => `| ${region.name.en ?? region.name.bg} | \`src/graph/${region.id}/\` | \`${region.rootEntityId}\` | \`${region.baseEntityId ?? "—"}\` |`,
  ),
  "",
  "## What a record must carry",
  "",
  "**Entity** (`entities.json`) — `id` (stable forever, never reused), `kind`,",
  "`slug`, `schemaType`, `confidence`, `relations` (may be empty), and either a",
  "`name` or a `contentRef` that resolves one. A page needs `page.path`,",
  "`page.priority` and `page.status`. Coordinates are its own fix or absent.",
  "",
  "**Claim** (`claims.json`) — `id`, `entityId`, `statement` (bg required), at",
  "least one `source`, a `confidence`, a `status` and a `created` date. A claim on",
  "a published page also needs `reviewedAt`. One fact, one claim: two facts are two",
  "records.",
  "",
  "**Source** (`sources.json`) — `id`, `kind`, `slug`, `title`, `citation` and a",
  "`verification`. A source marked `unverified` must say in its `note` what is not",
  "established.",
  "",
  "**Media** (on the entity's `media` list) — a licence, a capture date, a credit",
  "and a `depicts`, all four, or the asset is held and not rendered (rule 45).",
  "Never `aiGenerated` on a published page.",
  "",
  "## Before you commit",
  "",
  "```",
  "npm run validate     # records only, seconds",
  "npm run build        # the full gate set",
  "```",
  "",
  "`npm run new:record` scaffolds a valid stub for any of the above.",
  "",
];
fs.writeFileSync(authoringPath, `${authoring.join("\n")}\n`);

console.log(
  `health-report: ${data.findings} findings (${data.high} high, ${data.medium} medium, ${data.low} low) across ${published.length} published pages.`,
);
console.log(`Report written to ${path.relative(rootDir, reportPath)}; authoring map to ${path.relative(rootDir, authoringPath)}`);
