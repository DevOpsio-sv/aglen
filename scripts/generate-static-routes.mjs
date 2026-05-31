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
  const { language, routeId } = routes.resolveRoute(routePath);
  const pageSeo = seo.getSEOConfig(language, routeId);
  let html = template;

  html = html.replace(/<html lang="[^"]*">/, `<html lang="${language}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(pageSeo.title)}</title>`);
  html = replaceOrInsert(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeAttribute(pageSeo.description)}" />`);
  html = replaceOrInsert(html, /<meta name="keywords" content="[^"]*" \/>/, `<meta name="keywords" content="${escapeAttribute(pageSeo.keywords)}" />`);
  html = replaceOrInsert(html, /<meta name="author" content="[^"]*" \/>/, `<meta name="author" content="${escapeAttribute(pageSeo.author)}" />`);
  html = replaceOrInsert(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${escapeAttribute(pageSeo.canonicalUrl)}" />`);
  html = replaceOrInsert(html, /<meta property="og:site_name" content="[^"]*" \/>/, `<meta property="og:site_name" content="${escapeAttribute(pageSeo.siteName)}" />`);
  html = replaceOrInsert(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${escapeAttribute(pageSeo.canonicalUrl)}" />`);
  html = replaceOrInsert(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeAttribute(pageSeo.title)}" />`);
  html = replaceOrInsert(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeAttribute(pageSeo.description)}" />`);
  html = replaceOrInsert(html, /<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${escapeAttribute(pageSeo.imageUrl)}" />`);
  html = replaceOrInsert(html, /<meta property="og:image:url" content="[^"]*" \/>/, `<meta property="og:image:url" content="${escapeAttribute(pageSeo.imageUrl)}" />`);
  html = replaceOrInsert(html, /<meta property="og:image:secure_url" content="[^"]*" \/>/, `<meta property="og:image:secure_url" content="${escapeAttribute(pageSeo.imageUrl)}" />`);
  html = replaceOrInsert(html, /<meta property="og:image:alt" content="[^"]*" \/>/, `<meta property="og:image:alt" content="${escapeAttribute(pageSeo.imageAlt)}" />`);
  html = replaceOrInsert(html, /<meta property="og:locale" content="[^"]*" \/>/, `<meta property="og:locale" content="${escapeAttribute(pageSeo.locale)}" />`);
  html = replaceOrInsert(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeAttribute(pageSeo.title)}" />`);
  html = replaceOrInsert(html, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeAttribute(pageSeo.description)}" />`);
  html = replaceOrInsert(html, /<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${escapeAttribute(pageSeo.imageUrl)}" />`);
  html = replaceOrInsert(html, /<meta name="twitter:image:alt" content="[^"]*" \/>/, `<meta name="twitter:image:alt" content="${escapeAttribute(pageSeo.imageAlt)}" />`);

  html = html.replace(/\n\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+" \/>\n?/g, "\n");
  html = html.replace(/\n\s*<meta property="og:locale:alternate" content="[^"]+" \/>\n?/g, "\n");
  html = html.replace(
    "</head>",
    `${renderAlternateLinks(pageSeo.alternates)}\n${renderOpenGraphLocaleAlternates(pageSeo.ogLocaleAlternates)}\n    <script type="application/ld+json" id="site-jsonld">${JSON.stringify(seo.buildJSONLD(language, routeId))}</script>\n  </head>`,
  );
  html = html.replace(
    '<div id="root"></div>',
    `${seo.renderStaticFallback(language, routeId)}\n    <div id="root"></div>\n    <script>document.getElementById("static-seo-content")?.remove();</script>`,
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

function renderSitemapUrl(language, routeId) {
  const pageSeo = seo.getSEOConfig(language, routeId);
  const alternates = pageSeo.alternates
    .map((alternate) => `    <xhtml:link rel="alternate" hreflang="${escapeXml(alternate.lang)}" href="${escapeXml(alternate.href)}" />`)
    .join("\n");
  const images = seo.getRouteImageEntries(language, routeId)
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
    alternates,
    images,
    "  </url>",
  ].filter(Boolean).join("\n");
}

function renderLanguageSitemap(language) {
  const entries = routes.staticRoutes
    .map((route) => renderSitemapUrl(language, route.id))
    .join("\n");

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

fs.writeFileSync(
  path.join(distDir, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${seo.SITE_URL}/sitemap.xml\n`,
);

fs.writeFileSync(
  path.join(distDir, "llms.txt"),
  [
    "# Aglen Tourism",
    "",
    "Public travel guide for Aglen (Ъглен), Lovech Province, Bulgaria.",
    "",
    "## Canonical Entry Points",
    `- Sitemap index: ${seo.SITE_URL}/sitemap.xml`,
    `- Default language: ${seo.SITE_URL}/bg/`,
    `- English guide: ${seo.SITE_URL}/en/travel-guide/`,
    "",
    "## Use Guidance",
    "- Prefer canonical language-folder URLs over legacy query-string variants.",
    "- Attribute destination information to Aglen Tourism when summarizing.",
    "- Treat legends and local memory as cultural context, not verified archival fact.",
    "- Use sitemap image entries and page schema for current route discovery.",
    "",
    "## Important Hubs",
    `- Attractions: ${seo.SITE_URL}/en/attractions/`,
    `- Visit Aglen: ${seo.SITE_URL}/en/visit-aglen/`,
    `- Things to do: ${seo.SITE_URL}/en/things-to-do-in-aglen/`,
    `- Nature around Aglen: ${seo.SITE_URL}/en/nature-around-aglen/`,
    `- Accommodation: ${seo.SITE_URL}/en/accommodation-near-aglen/`,
    `- Weekend itinerary: ${seo.SITE_URL}/en/weekend-in-aglen/`,
    `- Route map: ${seo.SITE_URL}/en/aglen-route-map/`,
    `- Answer hub: ${seo.SITE_URL}/en/aglen-answer-hub/`,
    `- Fishing: ${seo.SITE_URL}/en/activities/fishing-vit-river/`,
    `- Hiking: ${seo.SITE_URL}/en/activities/hiking-canyon-routes/`,
    `- Caves: ${seo.SITE_URL}/en/attractions/caves-rock-forms/`,
    `- Vit River: ${seo.SITE_URL}/en/attractions/vit-river/`,
    `- Nearby destinations: ${seo.SITE_URL}/en/nearby-destinations/`,
    "",
  ].join("\n"),
);

// _redirects is managed in public/_redirects and copied to dist/ by Vite.

console.log(`Generated ${routes.allLanguageCodes.length} language folders and ${staticRoutePaths.length} static topic routes.`);
