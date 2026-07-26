import fs from "node:fs";
import path from "node:path";
import { publicAssetExists, srcModule } from "./lib/load-module.mjs";

const rootDir = process.cwd();
const localesDir = path.join(rootDir, "src", "locales");
const distDir = path.join(rootDir, "dist");
const reportsDir = path.join(rootDir, "reports");
const reportPath = path.join(reportsDir, "i18n-bg-audit.md");

const expectedLanguages = ["bg", "en", "de", "fr", "es", "it", "ro", "tr", "el", "ru", "ja", "sr", "zh", "hu"];
const expectedLocaleCodes = {
  bg: "bg_BG",
  en: "en_US",
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
  it: "it_IT",
  ro: "ro_RO",
  tr: "tr_TR",
  el: "el_GR",
  ru: "ru_RU",
  ja: "ja_JP",
  sr: "sr_RS",
  zh: "zh_CN",
  hu: "hu_HU",
};

const englishPhrasesForBg = [
  "Visit Aglen",
  "Things to Do",
  "Nature Around",
  "History of Aglen",
  "Accommodation Near",
  "Traditional Food",
  "Hidden Places",
  "Cultural Tourism",
  "Nature Tourism",
  "Adventure Tourism",
  "Family Trip",
  "Camping Near",
  "Weekend in Aglen",
  "Route Map",
  "Best Time",
  "How to Get",
  "Travel Guide",
  "Visitor answers",
  "Internal links",
  "Related guides",
  "Trust and policy pages",
  "About this guide",
  "Editorial policy",
  "Local presence checklist",
  "Crawler policy",
  "Events and updates",
  "Frequently Asked Questions",
  "Aglen Experiences",
  "Nature travelers",
  "Cultural travelers",
  "Guided routes",
  "Aglen village",
  "Vit River canyon",
  "limestone cliffs",
  "forest, Bulgaria",
  "Vit River Canyon",
];

const bulgarianPhrasesForForeign = [
  "Посети Ъглен",
  "Какво да правиш",
  "Природата около",
  "История на Ъглен",
  "Настаняване край",
  "Традиционна храна",
  "Скрити места",
  "Културен туризъм",
  "Природен туризъм",
  "Приключенски туризъм",
  "Семейно пътуване",
  "Къмпинг край",
  "Уикенд в Ъглен",
  "Маршрутна карта",
  "Най-добро време",
  "Как да стигнеш",
  "Пътеводител",
  "Отговори за посетители",
  "Вътрешни връзки",
  "Свързани ръководства",
  "Страници за доверие",
  "За този пътеводител",
  "Редакционна политика",
  "Политика за обхождане",
  "Събития и актуализации",
  "Планирай",
  "Това ръководство",
  "Основен смисъл",
  "Планиране",
  "Свързани маршрути",
  "Къде се намира",
  "Какво могат",
  "Кога е най-доброто",
];

const allowlistedProperTerms = [
  "Aglen",
  "Ъглен",
  "Uglen",
  "unlockingbulgaria",
  "unlockingbulgaria.com",
  "Android",
  "AR",
  "Vit",
  "Вит",
  "Lukovit",
  "Луковит",
  "Lovech",
  "Ловеч",
  "Дупката",
  "Слончето",
  "Червена стена",
  "Рачков вир",
  "Калето",
  "Prohodna",
  "DevOpsio",
  "Schema.org",
];

const placeholderPatterns = [
  /lorem ipsum/i,
  /placeholder/i,
  /\bTODO\b/,
  /планираш пътеводител за/i,
  /планирай пътеводител за/i,
  /plan travel guide for/i,
  /this guide helps you plan travel guide/i,
  /Основен смисъл/i,
  /Core promise/i,
  /Planning notes/i,
  /Related routes/i,
  /Promesse principale/i,
  /Promesa central/i,
  /Главная идея/i,
];

const issues = [];
const sections = [];

function addIssue(category, message) {
  issues.push({ category, message });
}

function flattenStrings(value, prefix = "", rows = []) {
  if (typeof value === "string") {
    rows.push({ path: prefix, value });
    return rows;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => flattenStrings(item, `${prefix}.${index}`, rows));
    return rows;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => flattenStrings(item, prefix ? `${prefix}.${key}` : key, rows));
  }
  return rows;
}

function normalizedForContamination(value) {
  let next = value;
  for (const term of allowlistedProperTerms) {
    next = next.split(term).join("");
  }
  return next;
}

function checkContamination(kind, lang, context, value) {
  const haystack = normalizedForContamination(String(value));
  if (lang === "bg") {
    for (const phrase of englishPhrasesForBg) {
      if (haystack.includes(phrase)) addIssue(kind, `${context}: English phrase "${phrase}" found in Bulgarian content.`);
    }
    return;
  }

  for (const phrase of bulgarianPhrasesForForeign) {
    if (haystack.includes(phrase)) addIssue(kind, `${context}: Bulgarian phrase "${phrase}" found in ${lang} content.`);
  }
}

// `\b` is not Unicode-aware in JavaScript: it treats "ă" and "á" as non-word
// characters, so `\bpl\b` fired inside ordinary Romanian and Hungarian words
// ("plăteau", "táplálva"). Digits are excluded too, or the content hash in a
// font filename ("…SjIa2pL7SUc") reads as a Polish locale reference. What is
// left still matches what the check is for: "pl", /pl/, hreflang="pl", pl_PL.
const polishReference = /(?<![\p{L}\p{N}])pl(?![\p{L}\p{N}])|pl_PL|Polski|Polish/iu;

function checkNoPolish(kind, context, value) {
  if (polishReference.test(String(value))) {
    addIssue(kind, `${context}: Polish locale reference found.`);
  }
}

function checkNoPlaceholder(kind, context, value) {
  const text = String(value);
  for (const pattern of placeholderPatterns) {
    if (pattern.test(text)) addIssue(kind, `${context}: placeholder or generated-template phrase matched ${pattern}.`);
  }
}

function validateSourceFiles() {
  const localeFiles = fs.readdirSync(localesDir).filter((file) => file.endsWith(".ts")).map((file) => path.basename(file, ".ts"));
  const content = [
    ["src/locales/types.ts", fs.readFileSync(path.join(localesDir, "types.ts"), "utf8")],
    ["src/locales/shared.ts", fs.readFileSync(path.join(localesDir, "shared.ts"), "utf8")],
    ["src/locales/index.ts", fs.readFileSync(path.join(localesDir, "index.ts"), "utf8")],
    ["src/landingPages.ts", fs.readFileSync(path.join(rootDir, "src", "landingPages.ts"), "utf8")],
    ["src/seo.ts", fs.readFileSync(path.join(rootDir, "src", "seo.ts"), "utf8")],
    ["index.html", fs.readFileSync(path.join(rootDir, "index.html"), "utf8")],
  ];

  for (const lang of expectedLanguages) {
    if (!localeFiles.includes(lang)) addIssue("source", `Missing locale file src/locales/${lang}.ts.`);
  }
  if (localeFiles.includes("pl")) addIssue("source", "Polish locale file src/locales/pl.ts still exists.");

  for (const [file, text] of content) {
    checkNoPolish("source", file, text);
    checkNoPlaceholder("source", file, text);
    if (file.startsWith("src/")) {
      for (const lang of ["zh", "hu"]) {
        if (!text.includes(lang)) addIssue("source", `${file} does not mention required locale ${lang}.`);
      }
    }
  }
}

function validateRuntimeData(routes, seo, landing) {
  const content = srcModule("content.ts");
  const ui = srcModule("uiText.ts");
  const languageCodes = routes.allLanguageCodes;

  if (JSON.stringify(languageCodes) !== JSON.stringify(expectedLanguages)) {
    addIssue("source", `Runtime languages are ${languageCodes.join(", ")}; expected ${expectedLanguages.join(", ")}.`);
  }
  if (languageCodes.includes("pl")) addIssue("source", "Runtime language list still includes pl.");

  for (const lang of expectedLanguages) {
    const copy = content.contentByLanguage[lang];
    if (!copy) {
      addIssue("source", `contentByLanguage missing ${lang}.`);
      continue;
    }
    if (!ui.uiTextByLanguage[lang]) addIssue("source", `uiTextByLanguage missing ${lang}.`);
    if (!Array.isArray(copy.quests.features) || copy.quests.features.length === 0) {
      addIssue("source", `${lang} has no localized quest features.`);
    }
    for (const row of flattenStrings(copy)) {
      checkNoPolish("source", `${lang}.${row.path}`, row.value);
      checkNoPlaceholder("source", `${lang}.${row.path}`, row.value);
    }
  }

  for (const lang of expectedLanguages) {
    const pages = landing.getLandingPages(lang);
    if (pages.length !== landing.landingPageMaster.length) {
      addIssue("route parity", `${lang} landing page count ${pages.length} does not match master ${landing.landingPageMaster.length}.`);
    }
    for (const page of pages) {
      checkContamination("source", lang, `${lang}.${page.id}`, JSON.stringify(page));
      checkNoPlaceholder("source", `${lang}.${page.id}`, JSON.stringify(page));
      if (!page.h1 || !page.title || !page.metaDescription || !page.intro) {
        addIssue("source", `${lang}.${page.id} missing required localized landing text.`);
      }
      if (!publicAssetExists(page.image)) addIssue("assets", `${lang}.${page.id} references missing image ${page.image}.`);
      const master = landing.landingPageMaster.find((candidate) => candidate.id === page.id);
      if (!master) addIssue("source", `${lang}.${page.id} missing Bulgarian master entry.`);
      if (master && page.slug !== master.slug) addIssue("route parity", `${lang}.${page.id} slug changed from master.`);
      if (master && page.image !== master.image) addIssue("route parity", `${lang}.${page.id} image changed from master.`);
      if (master && page.schemaType !== master.schemaType) addIssue("route parity", `${lang}.${page.id} schema type changed from master.`);
      const linkIds = page.internalLinks.map((link) => link.routeId).join("|");
      const masterLinkIds = master?.internalLinkRouteIds.join("|");
      if (master && linkIds !== masterLinkIds) addIssue("route parity", `${lang}.${page.id} internal route IDs changed from master.`);
    }
  }

  // Every language gets every static route, one page per published business and
  // guide, one per published entity (the /place/<slug>/ pages of M3 and the
  // /history/, /legend/ and /person/ pages of M4), and one per aspect page the
  // claim ledger has earned. The knowledge tier is `noindex` outside bg and en
  // (Constitution rule 43) but the PAGE still ships in all fourteen languages —
  // a link that resolves nowhere is worse than one that resolves to a page
  // marked as not yet reviewed.
  const publishedBusinesses = localBusinesses.publishedBusinesses();
  const allGuides = guidesModule.guides;
  const placeSlugs = routes.placeRouteSlugs;
  const knowledgeEntities = routes.knowledgeRouteEntities;
  const aspectRoutes = routes.aspectRoutes;
  // …and one per source page the ledger has earned (M4B). Same rule as the rest
  // of the knowledge tier: the page ships in all fourteen languages, indexed in
  // two, because a citation that resolves nowhere is worse than one marked
  // not-yet-reviewed.
  const sourceSlugs = routes.sourceRouteSlugs;
  const expectedPathCount =
    (routes.staticRoutes.length +
      publishedBusinesses.length +
      allGuides.length +
      placeSlugs.length +
      knowledgeEntities.length +
      aspectRoutes.length +
      sourceSlugs.length) *
    expectedLanguages.length;
  const paths = routes.getAllStaticRoutePaths();
  if (paths.length !== expectedPathCount) addIssue("route parity", `Expected ${expectedPathCount} static paths, got ${paths.length}.`);
  for (const lang of expectedLanguages) {
    for (const route of routes.staticRoutes) {
      const routePath = routes.buildRoutePath(lang, route.id);
      if (!paths.includes(routePath)) addIssue("route parity", `Missing route path ${routePath}.`);
    }
    for (const business of publishedBusinesses) {
      const businessPath = routes.buildBusinessPath(lang, business.slug);
      if (!paths.includes(businessPath)) addIssue("route parity", `Missing business path ${businessPath}.`);
    }
    for (const guide of allGuides) {
      const guidePath = routes.buildGuidePath(lang, guide.slug);
      if (!paths.includes(guidePath)) addIssue("route parity", `Missing guide path ${guidePath}.`);
    }
    for (const slug of placeSlugs) {
      const placePath = routes.buildPlacePath(lang, slug);
      if (!paths.includes(placePath)) addIssue("route parity", `Missing place path ${placePath}.`);
    }
    for (const entry of knowledgeEntities) {
      const knowledgePath = `/${lang}/${routes.getStaticRoute(entry.routeId).slug}/${entry.slug}/`;
      if (!paths.includes(knowledgePath)) addIssue("route parity", `Missing knowledge path ${knowledgePath}.`);
    }
    for (const entry of aspectRoutes) {
      const aspectPath = routes.buildAspectPath(lang, entry.slug, entry.aspect);
      if (!paths.includes(aspectPath)) addIssue("route parity", `Missing aspect path ${aspectPath}.`);
    }
    for (const slug of sourceSlugs) {
      const sourcePath = routes.buildSourcePath(lang, slug);
      if (!paths.includes(sourcePath)) addIssue("route parity", `Missing source path ${sourcePath}.`);
    }
  }
  if (paths.some((routePath) => routePath.startsWith("/pl/"))) addIssue("route parity", "Generated route list includes /pl/.");

  for (const lang of expectedLanguages) {
    for (const route of routes.staticRoutes) {
      const meta = seo.getSEOConfig(lang, route.id);
      checkNoPolish("metadata", `${lang}.${route.id}`, JSON.stringify(meta));
      checkNoPlaceholder("metadata", `${lang}.${route.id}`, JSON.stringify(meta));
      checkContamination("metadata", lang, `${lang}.${route.id}`, `${meta.title} ${meta.description}`);
      if (meta.locale !== expectedLocaleCodes[lang]) {
        addIssue("metadata", `${lang}.${route.id} locale ${meta.locale} does not match ${expectedLocaleCodes[lang]}.`);
      }
      if (!meta.alternates.some((alternate) => alternate.lang === "zh") || !meta.alternates.some((alternate) => alternate.lang === "hu")) {
        addIssue("metadata", `${lang}.${route.id} alternates missing zh or hu.`);
      }
      if (meta.alternates.some((alternate) => alternate.lang === "pl") || meta.ogLocaleAlternates.includes("pl_PL")) {
        addIssue("metadata", `${lang}.${route.id} metadata still includes Polish alternate.`);
      }

      const jsonld = JSON.stringify(seo.buildJSONLD(lang, route.id));
      checkNoPolish("JSON-LD", `${lang}.${route.id}`, jsonld);
      checkNoPlaceholder("JSON-LD", `${lang}.${route.id}`, jsonld);
      checkContamination("JSON-LD", lang, `${lang}.${route.id}`, jsonld);

      for (const image of seo.getRouteImageEntries(lang, route.id)) {
        const url = new URL(image.loc);
        if (!publicAssetExists(url.pathname)) addIssue("assets", `${lang}.${route.id} sitemap image missing from public assets: ${url.pathname}.`);
      }
    }
  }
}

function validateGeneratedHtml(routes) {
  if (!fs.existsSync(distDir)) {
    sections.push("Generated HTML validation skipped because `dist/` does not exist yet.");
    return;
  }

  for (const lang of expectedLanguages) {
    const langDir = path.join(distDir, lang);
    if (!fs.existsSync(langDir)) addIssue("generated HTML", `Missing generated locale folder dist/${lang}.`);
    const sitemapPath = path.join(distDir, `sitemap-${lang}.xml`);
    if (!fs.existsSync(sitemapPath)) addIssue("generated HTML", `Missing sitemap-${lang}.xml.`);
  }
  if (fs.existsSync(path.join(distDir, "pl"))) addIssue("generated HTML", "Generated dist/pl folder exists.");
  if (fs.existsSync(path.join(distDir, "sitemap-pl.xml"))) addIssue("generated HTML", "Generated sitemap-pl.xml exists.");

  for (const lang of expectedLanguages) {
    for (const route of routes.staticRoutes) {
      const outputPath = path.join(distDir, routes.buildRoutePath(lang, route.id).replace(/^\/+/, ""), "index.html");
      if (!fs.existsSync(outputPath)) {
        addIssue("generated HTML", `Missing generated page ${path.relative(rootDir, outputPath)}.`);
        continue;
      }
      const html = fs.readFileSync(outputPath, "utf8");
      checkNoPolish("generated HTML", path.relative(rootDir, outputPath), html);
      checkNoPlaceholder("generated HTML", path.relative(rootDir, outputPath), html);
      checkContamination("generated HTML", lang, path.relative(rootDir, outputPath), html);
      if (!html.includes(`/${lang}/`)) addIssue("generated HTML", `${path.relative(rootDir, outputPath)} does not include its locale route.`);
    }
  }
}

function buildReport() {
  const lines = [
    "# Multilingual Bulgarian-Source Audit",
    "",
    `Generated: ${new Date().toISOString()}`,
    `Expected locales: ${expectedLanguages.map((lang) => `\`${lang}\``).join(", ")}`,
    "",
    "## Checks",
    "",
    "- Source validation: locale files, type/list/index parity, no Polish references, zh/hu presence.",
    "- Route parity validation: every locale has every route and landing pages preserve Bulgarian master structure.",
    "- Metadata validation: titles, descriptions, keywords, hreflang, Open Graph locale codes.",
    "- JSON-LD validation: structured data human-readable fields and locale coverage.",
    "- Generated HTML contamination validation: static pages and sitemaps when `dist/` exists.",
    "",
    "## Notes",
    "",
    ...sections.map((section) => `- ${section}`),
    ...(sections.length ? [""] : []),
    "## Issues",
    "",
  ];

  if (issues.length === 0) {
    lines.push("_None._");
  } else {
    lines.push("| Category | Issue |");
    lines.push("| --- | --- |");
    for (const issue of issues) {
      lines.push(`| ${issue.category} | ${issue.message.replaceAll("|", "\\|")} |`);
    }
  }

  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`Total issues: ${issues.length}`);
  return `${lines.join("\n")}\n`;
}

validateSourceFiles();
const routes = srcModule("routes.ts");
const seo = srcModule("seo.ts");
const landing = srcModule("landingPages.ts");
const localBusinesses = srcModule("localBusinesses.ts");
const guidesModule = srcModule("guides.ts");
validateRuntimeData(routes, seo, landing);
validateGeneratedHtml(routes);

fs.mkdirSync(reportsDir, { recursive: true });
fs.writeFileSync(reportPath, buildReport());

console.log(`i18n audit checked ${expectedLanguages.length} locales and ${routes.staticRoutes.length} routes.`);
console.log(`Report written to ${path.relative(rootDir, reportPath)}`);

if (issues.length > 0) {
  console.log(`Found ${issues.length} multilingual issues.`);
  process.exitCode = 1;
}
