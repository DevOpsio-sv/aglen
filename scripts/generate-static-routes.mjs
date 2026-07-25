import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const templatePath = path.join(distDir, "index.html");
const template = fs.readFileSync(templatePath, "utf8");
const nodeRequire = createRequire(import.meta.url);
const moduleCache = new Map();

function resolveSourceModule(specifier, fromFile) {
  if (!specifier.startsWith(".")) {
    return specifier;
  }

  const basePath = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [
    basePath,
    `${basePath}.ts`,
    `${basePath}.tsx`,
    `${basePath}.js`,
    `${basePath}.mjs`,
    path.join(basePath, "index.ts"),
  ];

  const match = candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (!match) {
    throw new Error(`Cannot resolve ${specifier} from ${fromFile}`);
  }

  return match;
}

function loadSourceModule(filePath) {
  if (!filePath.startsWith(rootDir)) {
    return nodeRequire(filePath);
  }

  const resolvedPath = resolveSourceModule(filePath, path.join(rootDir, "scripts", "generate-static-routes.mjs"));
  if (moduleCache.has(resolvedPath)) {
    return moduleCache.get(resolvedPath).exports;
  }

  const source = fs.readFileSync(resolvedPath, "utf8");
  const module = { exports: {} };
  moduleCache.set(resolvedPath, module);

  const output = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: resolvedPath,
  }).outputText;

  const localRequire = (specifier) => {
    if (specifier.endsWith(".css")) {
      return {};
    }

    const target = resolveSourceModule(specifier, resolvedPath);
    if (path.isAbsolute(target) && target.startsWith(rootDir)) {
      return loadSourceModule(target);
    }

    return nodeRequire(target);
  };

  const runner = new Function("exports", "require", "module", "__filename", "__dirname", output);
  runner(module.exports, localRequire, module, resolvedPath, path.dirname(resolvedPath));
  return module.exports;
}

const routes = loadSourceModule(path.join(rootDir, "src", "routes.ts"));
const seo = loadSourceModule(path.join(rootDir, "src", "seo.ts"));
const localBusinesses = loadSourceModule(path.join(rootDir, "src", "localBusinesses.ts"));
const businesses = localBusinesses.publishedBusinesses();
const guides = loadSourceModule(path.join(rootDir, "src", "guides.ts")).guides;

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
  const { language, routeId, businessSlug, guideSlug } = routes.resolveRoute(routePath);
  const detailSlug = businessSlug ?? guideSlug;
  const pageSeo = seo.getSEOConfig(language, routeId, detailSlug);
  let html = template;

  html = html.replace(/<html lang="[^"]*">/, `<html lang="${language}">`);
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
    // are noindex — they must not be advertised here.
    ...routes.staticRoutes
      .filter((route) => seo.isIndexableRoute(route.id))
      .map((route) => renderSitemapUrl(language, route.id)),
    // One entry per published business detail page.
    ...businesses.map((business) => renderSitemapUrl(language, "localBusinesses", business.slug)),
    // …and per guide. These pages were generated and linked but appeared in no
    // sitemap at all, leaving 84 URLs to be found by crawling alone.
    ...guides.map((guide) => renderSitemapUrl(language, "guides", guide.slug)),
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

for (const language of routes.allLanguageCodes) {
  fs.writeFileSync(path.join(distDir, `sitemap-${language}.xml`), renderLanguageSitemap(language));
}

const sitemapIndexEntries = routes.allLanguageCodes
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
const region = loadSourceModule(path.join(rootDir, "src", "region.ts"));
const trustPages = loadSourceModule(path.join(rootDir, "src", "trustPages.ts"));

const llmsLines = [
  "# Aglen Tourism",
  "",
  "> Independent travel guide to the village of Aglen (Ъглен), Lukovit municipality,",
  "> Lovech Province, northern Bulgaria, and to the Lukovit karst around it:",
  "> Prohodna cave, Karlukovo, Lukovit, the Iskar–Panega geopark and the Vit River.",
  "",
  `Coordinates: ${region.AGLEN.latitude}, ${region.AGLEN.longitude} (Wikidata ${region.AGLEN.wikidata}). Postcode 5562.`,
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
  "",
];

fs.writeFileSync(path.join(distDir, "llms.txt"), llmsLines.join("\n"));

// _redirects is managed in public/_redirects and copied to dist/ by Vite.

console.log(`Generated ${routes.allLanguageCodes.length} language folders and ${staticRoutePaths.length} static topic routes.`);
