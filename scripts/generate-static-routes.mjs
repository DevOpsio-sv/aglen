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

function renderPageHtml(routePath) {
  const { language, routeId } = routes.resolveRoute(routePath);
  const pageSeo = seo.getSEOConfig(language, routeId);
  let html = template;

  html = html.replace(/<html lang="[^"]*">/, `<html lang="${language}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(pageSeo.title)}</title>`);
  html = replaceOrInsert(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeAttribute(pageSeo.description)}" />`);
  html = replaceOrInsert(html, /<meta name="keywords" content="[^"]*" \/>/, `<meta name="keywords" content="${escapeAttribute(pageSeo.keywords)}" />`);
  html = replaceOrInsert(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${escapeAttribute(pageSeo.canonicalUrl)}" />`);
  html = replaceOrInsert(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${escapeAttribute(pageSeo.canonicalUrl)}" />`);
  html = replaceOrInsert(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeAttribute(pageSeo.title)}" />`);
  html = replaceOrInsert(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeAttribute(pageSeo.description)}" />`);
  html = replaceOrInsert(html, /<meta property="og:locale" content="[^"]*" \/>/, `<meta property="og:locale" content="${escapeAttribute(pageSeo.locale)}" />`);
  html = replaceOrInsert(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeAttribute(pageSeo.title)}" />`);
  html = replaceOrInsert(html, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeAttribute(pageSeo.description)}" />`);

  html = html.replace(/\n\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+" \/>\n?/g, "\n");
  html = html.replace(
    "</head>",
    `${renderAlternateLinks(pageSeo.alternates)}\n    <script type="application/ld+json" id="site-jsonld">${JSON.stringify(seo.buildJSONLD(language, routeId))}</script>\n  </head>`,
  );
  html = html.replace('<div id="root"></div>', `${seo.renderStaticFallback(language, routeId)}\n    <div id="root"></div>`);

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

const sitemapEntries = staticRoutePaths
  .map((routePath) => `  <url><loc>${seo.SITE_URL}${routePath}</loc></url>`)
  .join("\n");

fs.writeFileSync(
  path.join(distDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`,
);

fs.writeFileSync(
  path.join(distDir, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${seo.SITE_URL}/sitemap.xml\n`,
);

console.log(`Generated ${routes.allLanguageCodes.length} language folders and ${staticRoutePaths.length} static topic routes.`);
