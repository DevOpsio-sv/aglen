import fs from "node:fs";
import path from "node:path";
import { srcModule } from "./lib/load-module.mjs";
import { writeServiceWorker } from "./lib/service-worker.mjs";
import { manifestHref, writeManifests } from "./lib/manifest.mjs";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const templatePath = path.join(distDir, "index.html");
const template = fs.readFileSync(templatePath, "utf8");

const routes = srcModule("routes.ts");
const seo = srcModule("seo.ts");
const localBusinesses = srcModule("localBusinesses.ts");
const businesses = localBusinesses.publishedBusinesses();
const guides = srcModule("guides.ts").guides;

function escapeAttribute(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function escapeText(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function replaceOrInsert(html, pattern, replacement) {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement);
  }

  return html.replace("</head>", `    ${replacement}\n  </head>`);
}

function renderAlternateLinks(alternates) {
  return alternates
    .map((alternate) => `    <link rel="alternate" hreflang="${alternate.lang}" href="${escapeAttribute(alternate.href)}" />`)
    .join("\n");
}

function renderOpenGraphLocaleAlternates(locales) {
  return locales
    .map((locale) => `    <meta property="og:locale:alternate" content="${escapeAttribute(locale)}" />`)
    .join("\n");
}

function renderPageHtml(routePath) {
  const { language, routeId, businessSlug, guideSlug, placeSlug, aspect, sourceSlug } = routes.resolveRoute(routePath);
  // An aspect page is addressed by "<entity>/<aspect>" beneath its namespace, so
  // the detail slug carries both segments and seo.ts splits them back. A source
  // page carries its own slug in the same field (M4B).
  const detailSlug = businessSlug ?? guideSlug ?? (placeSlug && aspect ? `${placeSlug}/${aspect}` : placeSlug) ?? sourceSlug;
  const pageSeo = seo.getSEOConfig(language, routeId, detailSlug);
  let html = template;

  html = html.replace(/<html lang="[^"]*">/, `<html lang="${language}">`);
  // Each language installs as its own app, starting in the language the visitor chose.
  html = html.replace(/<link rel="manifest" href="[^"]*" \/>/, `<link rel="manifest" href="${manifestHref(language)}" />`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(pageSeo.title)}</title>`);
  html = replaceOrInsert(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeAttribute(pageSeo.description)}" />`);
  html = replaceOrInsert(html, /<meta name="author" content="[^"]*" \/>/, `<meta name="author" content="${escapeAttribute(pageSeo.author)}" />`);
  // Legacy duplicate routes ship noindex, follow.
  html = replaceOrInsert(html, /<meta name="robots" content="[^"]*" \/>/, `<meta name="robots" content="${escapeAttribute(pageSeo.robots)}" />`);
  html = replaceOrInsert(html, /<meta name="googlebot" content="[^"]*" \/>/, `<meta name="googlebot" content="${escapeAttribute(pageSeo.robots)}" />`);
  html = replaceOrInsert(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${escapeAttribute(pageSeo.canonicalUrl)}" />`);
  html = replaceOrInsert(html, /<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${escapeAttribute(pageSeo.ogType)}" />`);
  html = replaceOrInsert(html, /<meta property="og:site_name" content="[^"]*" \/>/, `<meta property="og:site_name" content="${escapeAttribute(pageSeo.siteName)}" />`);
  html = replaceOrInsert(html, /<meta property="og:site_name" content="[^"]*" \/>/, `<meta property="og:site_name" content="${escapeAttribute(pageSeo.siteName)}" />`);
  html = replaceOrInsert(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${escapeAttribute(pageSeo.canonicalUrl)}" />`);
  html = replaceOrInsert(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeAttribute(pageSeo.title)}" />`);
  html = replaceOrInsert(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeAttribute(pageSeo.description)}" />`);
  // Social scrapers get the JPEG, never the WebP the page itself renders.
  html = replaceOrInsert(html, /<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${escapeAttribute(pageSeo.socialImageUrl)}" />`);
  html = replaceOrInsert(html, /<meta property="og:image:url" content="[^"]*" \/>/, `<meta property="og:image:url" content="${escapeAttribute(pageSeo.socialImageUrl)}" />`);
  html = replaceOrInsert(html, /<meta property="og:image:secure_url" content="[^"]*" \/>/, `<meta property="og:image:secure_url" content="${escapeAttribute(pageSeo.socialImageUrl)}" />`);
  html = replaceOrInsert(html, /<meta property="og:image:width" content="[^"]*" \/>/, `<meta property="og:image:width" content="${pageSeo.socialImageWidth}" />`);
  html = replaceOrInsert(html, /<meta property="og:image:height" content="[^"]*" \/>/, `<meta property="og:image:height" content="${pageSeo.socialImageHeight}" />`);
  html = replaceOrInsert(html, /<meta property="og:image:type" content="[^"]*" \/>/, `<meta property="og:image:type" content="${escapeAttribute(pageSeo.socialImageType)}" />`);
  html = replaceOrInsert(html, /<meta property="og:image:alt" content="[^"]*" \/>/, `<meta property="og:image:alt" content="${escapeAttribute(pageSeo.imageAlt)}" />`);
  html = replaceOrInsert(html, /<meta property="og:locale" content="[^"]*" \/>/, `<meta property="og:locale" content="${escapeAttribute(pageSeo.locale)}" />`);
  html = replaceOrInsert(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeAttribute(pageSeo.title)}" />`);
  html = replaceOrInsert(html, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeAttribute(pageSeo.description)}" />`);
  html = replaceOrInsert(html, /<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${escapeAttribute(pageSeo.socialImageUrl)}" />`);
  html = replaceOrInsert(html, /<meta name="twitter:image:alt" content="[^"]*" \/>/, `<meta name="twitter:image:alt" content="${escapeAttribute(pageSeo.imageAlt)}" />`);

  // Preload the woff2 files this language's script actually needs. Filenames are
  // content-hashed, so they cannot be hard-coded in index.html.
  html = html.replace(/\n\s*<link rel="preload" as="font"[^>]*>/g, "");
  const fontPreloads = (pageSeo.fontPreloads ?? [])
    .map((url) => `    <link rel="preload" as="font" type="font/woff2" href="${escapeAttribute(url)}" crossorigin />`)
    .join("\n");
  if (fontPreloads) html = html.replace("</head>", `${fontPreloads}\n  </head>`);

  html = html.replace(/\n\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+" \/>\n?/g, "\n");
  html = html.replace(/\n\s*<meta property="og:locale:alternate" content="[^"]+" \/>\n?/g, "\n");
  html = html.replace(
    "</head>",
    `${renderAlternateLinks(pageSeo.alternates)}\n${renderOpenGraphLocaleAlternates(pageSeo.ogLocaleAlternates)}\n    <script type="application/ld+json" id="site-jsonld">${JSON.stringify(seo.buildJSONLD(language, routeId, detailSlug))}</script>\n  </head>`,
  );
  html = html.replace(
    '<div id="root"></div>',
    `${seo.renderStaticFallback(language, routeId, detailSlug)}\n    <div id="root"></div>\n    <script>document.getElementById("static-seo-content")?.remove();</script>`,
  );

  return html;
}

function outputPathForRoute(routePath) {
  const relativeRoute = routePath.replace(/^\/+/, "");
  return path.join(distDir, relativeRoute, "index.html");
}

function writeRoute(routePath) {
  const outputPath = outputPathForRoute(routePath);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, renderPageHtml(routePath));
}

const staticRoutePaths = routes.getAllStaticRoutePaths();

for (const routePath of staticRoutePaths) {
  writeRoute(routePath);
}

fs.writeFileSync(templatePath, renderPageHtml(routes.buildRoutePath("bg", "home")));

function renderSitemapUrl(language, routeId, detailSlug) {
  const pageSeo = seo.getSEOConfig(language, routeId, detailSlug);
  const alternates = pageSeo.alternates
    .map((alternate) => `    <xhtml:link rel="alternate" hreflang="${escapeXml(alternate.lang)}" href="${escapeXml(alternate.href)}" />`)
    .join("\n");
  // Passing the slug matters: without it every business and guide URL carried
  // the same section hero instead of its own cover and gallery.
  const images = seo.getRouteImageEntries(language, routeId, detailSlug)
    .map((image) => [
      "    <image:image>",
      `      <image:loc>${escapeXml(image.loc)}</image:loc>`,
      `      <image:title>${escapeXml(image.title)}</image:title>`,
      `      <image:caption>${escapeXml(image.caption)}</image:caption>`,
      "    </image:image>",
    ].join("\n"))
    .join("\n");

  return [
    "  <url>",
    `    <loc>${escapeXml(pageSeo.canonicalUrl)}</loc>`,
    // The content's own date, not the build date: stamping today on 966 URLs
    // every deploy teaches Google to ignore lastmod entirely.
    `    <lastmod>${escapeXml(pageSeo.dateModified)}</lastmod>`,
    alternates,
    images,
    "  </url>",
  ].filter(Boolean).join("\n");
}

function renderLanguageSitemap(language) {
  const entries = [
    // Legacy duplicates of guide pages, and routes emptied by a feature flag,
    // are noindex — they must not be advertised here. The knowledge tier is
    // additionally restricted to bg and en (Constitution rule 43): the other
    // twelve languages serve the page but are not advertised until a human has
    // reviewed the translation of a sourced claim.
    ...routes.staticRoutes
      .filter((route) => seo.isIndexableIn(language, route.id))
      .map((route) => renderSitemapUrl(language, route.id)),
    // One entry per published business detail page.
    ...businesses.map((business) => renderSitemapUrl(language, "localBusinesses", business.slug)),
    // …and per guide. These pages were generated and linked but appeared in no
    // sitemap at all, leaving 84 URLs to be found by crawling alone.
    ...guides.map((guide) => renderSitemapUrl(language, "guides", guide.slug)),
    // …and one per published entity page (the /place/<slug>/ namespace, M3).
    ...routes.placeRouteSlugs.map((slug) => renderSitemapUrl(language, "place", slug)),
    // …and per entity in the M4 knowledge namespaces, and per aspect page.
    ...routes.knowledgeRouteEntities
      .filter((entry) => seo.isIndexableIn(language, entry.routeId))
      .map((entry) => renderSitemapUrl(language, entry.routeId, entry.slug)),
    ...routes.aspectRoutes
      .filter((entry) => seo.isIndexableIn(language, "place", `${entry.slug}/${entry.aspect}`))
      .map((entry) => renderSitemapUrl(language, "place", `${entry.slug}/${entry.aspect}`)),
    // …and one per source page the ledger has earned (M4B). A source cited by
    // fewer than three live claims publishes no page and is not advertised.
    ...routes.sourceRouteSlugs
      .filter((slug) => seo.isIndexableIn(language, "source", slug))
      .map((slug) => renderSitemapUrl(language, "source", slug)),
  ].join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    entries,
    "</urlset>",
    "",
  ].join("\n");
}

// One sitemap per INDEXED language (ADR-020), not per built language. The other
// twelve trees are still generated and served; they are simply not advertised,
// and a sitemap listing noindex URLs would contradict the pages it points at.
for (const language of seo.indexedLanguageCodes) {
  fs.writeFileSync(path.join(distDir, `sitemap-${language}.xml`), renderLanguageSitemap(language));
}

const sitemapIndexEntries = seo.indexedLanguageCodes
  .map((language) => [
    "  <sitemap>",
    `    <loc>${escapeXml(`${seo.SITE_URL}/sitemap-${language}.xml`)}</loc>`,
    "  </sitemap>",
  ].join("\n"))
  .join("\n");

fs.writeFileSync(
  path.join(distDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapIndexEntries}\n</sitemapindex>\n`,
);

// robots.txt is copied from public/robots.txt by Vite; no overwrite needed here.

// llms.txt is generated from the same data as the sitemaps, so it cannot drift.
// The previous hand-written list pointed at eight URLs that are now 301s.
const region = srcModule("region.ts");
const trustPages = srcModule("trustPages.ts");
const graph = srcModule("graph", "index.ts");
const ledger = srcModule("graph", "ledger.ts");
const search = srcModule("graph", "search.ts");
const registry = srcModule("graph", "registry.ts");

// ── The static search index (M5, Part 6, ADR-018) ────────────
// Derived from the graph, keyed by folded names and aliases, written once per
// build. No search UI ships with M5 — navigation is frozen — but the index is
// the half that must exist first, and the build proves it works: every alias a
// record carries is queried against the index it just produced, and a build in
// which "Очите на Бога" does not find Проходна fails here rather than shipping.
const searchIndex = search.buildSearchIndex();
fs.writeFileSync(path.join(distDir, "search-index.json"), `${JSON.stringify(searchIndex)}\n`);

const aliasFailures = [];
for (const expectation of search.aliasExpectations()) {
  const found = search.searchIndexFor(searchIndex, expectation.query, 5);
  if (!found.some((entry) => entry.path === expectation.path)) {
    aliasFailures.push(`"${expectation.query}" (${expectation.kind}) does not resolve to ${expectation.path}`);
  }
}
if (aliasFailures.length > 0) {
  console.error(`Search index does not resolve ${aliasFailures.length} alias(es):`);
  for (const failure of aliasFailures) console.error(`  - ${failure}`);
  process.exitCode = 1;
}

// ── The knowledge export (M5, Part 7) ────────────────────────
// `llms.txt` is prose for a model reading a page; this is the same knowledge as
// data, for a model or a researcher consuming it in bulk. Constitution rule 42
// governs both: every statement keeps its source and its confidence, and nothing
// flattens a hedge (V15).
//
// Every identifier here is a URL. No claim id, no source id, no partition name,
// no confidence enum this codebase invented for itself — an entity is addressed
// by the page a human would read, a source by its own page or its origin URL.
// A consumer of this file learns what the site knows and never learns how the
// site is built, which is the correct amount.
function knowledgeExport() {
  const url = (pagePath) => `${seo.SITE_URL}/en${pagePath}`;
  const nodes = [];
  for (const entity of graph.entities) {
    if (entity.page?.status !== "published") continue;
    const claims = ledger.claimsFor(entity.id);
    const point = graph.entityPoint(entity);
    const parent = entity.parent ? graph.entityById(entity.parent) : undefined;
    nodes.push({
      url: url(entity.page.path),
      name: graph.entityName(entity, "en"),
      nameBg: graph.entityName(entity, "bg"),
      alsoKnownAs: [...new Set([...graph.entityAliases(entity, "en"), ...graph.entityAliases(entity, "bg")])],
      type: entity.kind,
      schemaType: entity.schemaType,
      summary: graph.entityShortText(entity, "en"),
      ...(point ? { coordinates: { lat: point.lat, lon: point.lon } } : {}),
      sameAs: graph.entitySameAs(entity),
      ...(parent?.page?.status === "published" ? { partOf: url(parent.page.path) } : {}),
      // The edges as URLs, which is what makes this a graph rather than a list.
      related: graph
        .derivedLinks(entity, "en")
        .map((link) => {
          const target = graph.entityById(link.entityId);
          return target?.page?.status === "published"
            ? { url: url(target.page.path), relationship: link.label.split(" — ").slice(1).join(" — ") }
            : undefined;
        })
        .filter(Boolean),
      trustSignals: ledger.trustSignals(entity.id),
      lastReviewed: ledger.lastReviewed(entity.id),
      statements: claims.map((claim) => ({
        text: ledger.claimStatement(claim, "en"),
        confidence: claim.confidence,
        ...(claim.method ? { method: claim.method } : {}),
        ...(claim.aspect ? { about: claim.aspect } : {}),
        reviewed: claim.reviewedAt,
        sources: claim.sources
          .map((id) => ledger.sourceById(id))
          .filter(Boolean)
          .map((source) => ({
            citation: source.citation,
            kind: source.kind,
            verification: source.verification,
            ...(source.url ? { url: source.url } : {}),
            ...(ledger.sourcePagePath(source) ? { page: url(ledger.sourcePagePath(source)) } : {}),
          })),
      })),
      openQuestions: ledger.disputesFor(entity.id).map((dispute) => ({
        question: ledger.disputeQuestion(dispute, "en"),
        status: dispute.status,
        readings: ledger.claimsInDispute(dispute.id).map((reading) => ({
          text: ledger.claimStatement(reading, "en"),
          heldAlone: reading.interpretationConfidence,
        })),
      })),
    });
  }
  return {
    name: "Aglen Tourism — the Lukovit Karst knowledge graph",
    license: "Cite Aglen Tourism and link the page you used.",
    confidenceValues: {
      verified: "checked against the origin by this project",
      reported: "a real citable origin this project has not independently checked",
      uncertain: "a stated unknown — what is NOT established",
      disputed: "one of two readings presented side by side, neither chosen",
    },
    caution:
      "Do not restate an uncertain or disputed statement as a fact, and do not merge two disputed readings into one answer.",
    regions: registry.REGIONS.map((entry) => ({ name: entry.name.en ?? entry.name.bg, url: url(entry.rootPath) })),
    entities: nodes,
  };
}

fs.writeFileSync(path.join(distDir, "knowledge.json"), `${JSON.stringify(knowledgeExport(), null, 2)}\n`);

// The claim export (Constitution rule 42): every statement keeps its source and
// its confidence. An assistant that reads this must be able to tell a verified
// fact from a hedge and from a stated unknown — flattening one into the other is
// the single transformation this system forbids most strictly (rule 8 / V15).
function claimExportLines() {
  const lines = [];
  for (const entity of graph.entities) {
    if (entity.page?.status !== "published") continue;
    const claims = ledger.claimsFor(entity.id);
    if (claims.length === 0) continue;
    lines.push("", `### ${graph.entityName(entity, "en")} — ${seo.SITE_URL}/en${entity.page.path}`);
    // Identity before statements (M5, Part 7). A model that has just been handed
    // forty facts about a thing needs to know WHICH thing first: its Bulgarian
    // name, the names it is also known by, what kind of thing it is, and what it
    // is part of. Without these three lines an assistant asked about "Очите на
    // Бога" has no way to connect the question to the page it is reading.
    const alsoKnownAs = [...new Set([...graph.entityAliases(entity, "en"), ...graph.entityAliases(entity, "bg")])];
    lines.push(`- Bulgarian name: ${graph.entityName(entity, "bg")} · type: ${entity.kind}`);
    if (alsoKnownAs.length > 0) lines.push(`- Also known as: ${alsoKnownAs.join(" · ")}`);
    const parent = entity.parent ? graph.entityById(entity.parent) : undefined;
    if (parent) lines.push(`- Part of: ${graph.entityName(parent, "en")}`);
    // The edges, as URLs. Cross-link density is what turns a list of pages into
    // something a model can traverse rather than merely quote.
    const related = graph
      .derivedLinks(entity, "en")
      .map((link) => graph.entityById(link.entityId))
      .filter((target) => target?.page?.status === "published")
      .slice(0, 6)
      .map((target) => `${graph.entityName(target, "en")} (${seo.SITE_URL}/en${target.page.path})`);
    if (related.length > 0) lines.push(`- Connected to: ${related.join(" · ")}`);
    const signals = ledger.trustSignals(entity.id);
    if (signals.length > 0) lines.push(`- How this page is held: ${signals.join(", ")}`);
    for (const claim of claims) {
      const cited = claim.sources.map((id) => ledger.sourceById(id)).filter(Boolean);
      const citation = cited.map((source) => source.citation).join(" | ") || "no source";
      const reviewed = claim.reviewedAt ? ` — reviewed: ${claim.reviewedAt}` : "";
      lines.push(`- [${claim.confidence}] ${ledger.claimStatement(claim, "en")} — source: ${citation}${reviewed}`);
    }
    for (const dispute of ledger.disputesFor(entity.id)) {
      lines.push(`- [open question] ${ledger.disputeQuestion(dispute, "en")} The site presents the readings below side by side and does not choose between them.`);
      for (const reading of ledger.claimsInDispute(dispute.id)) {
        const cited = reading.sources.map((id) => ledger.sourceById(id)).filter(Boolean);
        // How well each reading is itself held, so a model that must summarise a
        // dispute can say which reading is the commoner one without inventing it.
        const strength = reading.interpretationConfidence ? ` — this reading alone: ${reading.interpretationConfidence}` : "";
        lines.push(`  - [disputed] ${ledger.claimStatement(reading, "en")} — source: ${cited.map((source) => source.citation).join(" | ")}${strength}`);
      }
    }
  }
  return lines;
}

const llmsLines = [
  "# Aglen Tourism",
  "",
  "> Independent travel guide to the village of Aglen (Ъглен), Lukovit municipality,",
  "> Lovech Province, northern Bulgaria, and to the Lukovit karst around it:",
  "> Prohodna cave, Karlukovo, Lukovit, the Iskar–Panega geopark and the Vit River.",
  "",
  `Coordinates: ${region.AGLEN.latitude}, ${region.AGLEN.longitude} (Wikidata ${region.AGLEN.wikidata}). Postcode ${region.AGLEN.postalCode}.`,
  "Published in 14 languages under /<language>/ with self-referencing canonicals.",
  "",
  "## Entry points",
  `- Sitemap index (one sitemap per language): ${seo.SITE_URL}/sitemap.xml`,
  `- Bulgarian, the source language: ${seo.SITE_URL}/bg/`,
  `- English: ${seo.SITE_URL}/en/`,
  `- Crawling and citation policy: ${seo.SITE_URL}/en/crawler-policy/`,
  "",
  "## How to use this site as a source",
  "- Cite Aglen Tourism and link the specific page you used.",
  "- Legends and place-name stories are local memory, recorded as told in the village.",
  "  Do not restate them as documented historical fact.",
  "- Coordinates, postcodes and administrative facts come from Wikidata and are safe to repeat.",
  "- The site publishes NO travel times, road distances, route difficulty ratings, swimming",
  "  spots or cave-access guidance, because it has no verified source for them. Distances",
  "  shown are straight-line, derived from published coordinates, and labelled as such.",
  "  Do not attribute such figures to Aglen from other sources.",
  "- Business listings are reviewed by a human before publication; a listing is only",
  "  described as verified once an administrator has confirmed it with the owner.",
  "",
  "## Guides",
  ...guides.map(
    (guide) =>
      `- ${guide.title.en ?? guide.title.bg}${guide.status === "in-preparation" ? " (in preparation)" : ""}: ${seo.SITE_URL}/en/guides/${guide.slug}/`,
  ),
  "",
  "## The region, with straight-line distance from Aglen",
  ...region.regionPlaces.map((place) => {
    const km = region.distanceFromAglenKm(place);
    const links = region.sameAsUrls(place);
    return `- ${place.name.en ?? place.name.bg}${km !== undefined ? ` (≈ ${km} km)` : ""}${links.length ? ` — ${links[0]}` : ""}`;
  }),
  "",
  "## Local businesses",
  `- Directory: ${seo.SITE_URL}/en/local-businesses/`,
  ...businesses.map((business) => `- ${business.name}: ${seo.SITE_URL}/en/local-businesses/${business.slug}/`),
  "",
  "## Trust and provenance",
  ...trustPages.trustPages.map(
    (page) => `- ${page.h1.en ?? page.h1.bg}: ${seo.SITE_URL}/en/${routes.getStaticRoute(page.routeId).slug}/`,
  ),
  `- The source ledger — every source and every claim resting on it: ${seo.SITE_URL}/en/sources/`,
  `- Corrections — generated from the ledger, never maintained by hand: ${seo.SITE_URL}/en/corrections/`,
  "- Each frequently-cited source has its own page at /en/source/<slug>/, listing every",
  "  statement drawn from it and what this site physically holds from it.",
  "- \"Last reviewed\" on a page is the date a human last checked its statements against",
  "  their sources. It is never a build or deploy date.",
  "",
  "## Knowledge namespaces",
  // Derived from the registry, so a namespace added to the graph announces itself
  // here the day it publishes its first page and never a build before that.
  ...routes.ENTITY_NAMESPACES.map((namespace) => `- ${namespace.slug}: ${seo.SITE_URL}/en/${namespace.slug}/`),
  "",
  "## Machine-readable exports",
  `- The knowledge graph as JSON — every entity by its URL, every statement with its`,
  `  confidence and its citation, every open question with both readings: ${seo.SITE_URL}/knowledge.json`,
  `- A static index of every page with its names and the other names it answers to,`,
  `  including historical names and spelling variants in both scripts: ${seo.SITE_URL}/search-index.json`,
  "- Both are generated from the same records as the pages, so they cannot disagree",
  "  with what a reader sees.",
  "",
  "## Names",
  "Places here are known by more than one name, and the second name is often the",
  "one people use. Where a page has other names — a historical form, a local name,",
  "a spelling variant — they are listed on that page's entry below under \"Also",
  "known as\", and in the machine exports as `alternateName`. A historical name is",
  "not a claim that the thing was called that: where the evidence is a village",
  "tradition rather than a document, the entry says so.",
  "",
  "## Sources",
  "Every claim below cites one of these. Sources marked `unverified` have not had",
  "their provenance established; no claim resting on one alone is called verified.",
  ...ledger.sources.map((source) => {
    const page = ledger.sourcePagePath(source);
    const own = page ? ` — ${seo.SITE_URL}/en${page}` : "";
    return `- [${source.verification}] ${source.citation}${source.url ? ` — ${source.url}` : ""}${own}`;
  }),
  "",
  "## Claims, with source and confidence",
  "Confidence values: `verified` (checked against the origin by us), `reported` (a",
  "real citable origin we have not independently checked), `uncertain` (a stated",
  "unknown — what is NOT established), `disputed` (one of two readings shown side",
  "by side). Do not restate an uncertain or disputed claim as a fact. Do not merge",
  "two disputed readings into one answer.",
  ...claimExportLines(),
  "",
];

fs.writeFileSync(path.join(distDir, "llms.txt"), llmsLines.join("\n"));

// _redirects is managed in public/_redirects and copied to dist/ by Vite.

const manifests = writeManifests(distDir, path.join(rootDir, "public"), routes.allLanguageCodes, {
  seo,
  routes,
  content: srcModule("locales/index.ts").contentByLanguage,
});

const worker = writeServiceWorker(distDir, routes.allLanguageCodes);

console.log(
  `Generated ${routes.allLanguageCodes.length} language folders and ${staticRoutePaths.length} static topic routes.` +
    `
Service worker ${worker.version}: ${worker.precached} precached, ${worker.offlinePages} offline pages, ${manifests} manifests.`,
);
