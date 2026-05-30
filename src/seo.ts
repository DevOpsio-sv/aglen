import type { LanguageCode } from "./locales/types";
import { contentByLanguage } from "./content";
import { isLandingPageId, landingPagesById } from "./landingPages";
import { allLanguageCodes, buildRoutePath, DEFAULT_LANGUAGE, type CoreRouteId, type RouteId } from "./routes";

// ---------------------------------------------------------------------------
// IMPORTANT: Update SITE_URL to your production domain before deploying.
// ---------------------------------------------------------------------------
export const SITE_URL = "https://aglen.bg";
const OG_IMAGE = `${SITE_URL}/assets/aglen-hero-river-canyon.png`;
const OG_IMAGE_WIDTH = "1200";
const OG_IMAGE_HEIGHT = "630";
const APP_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.hiddenBulgaria.quests";

// ---------------------------------------------------------------------------
// Per-language meta titles (50-60 chars) and descriptions (140-160 chars)
// ---------------------------------------------------------------------------
const seoMeta: Record<
  LanguageCode,
  { title: string; description: string; locale: string; keywords: string }
> = {
  bg: {
    title: "Ъглен — Скритото село на река Вит | Hidden Bulgaria Quests",
    description:
      "Открий Ъглен — единственото българско село с буква Ъ. Варовикови каньони, пещери, история и AR приключение с Hidden Bulgaria Quests.",
    locale: "bg_BG",
    keywords:
      "Ъглен, село Ъглен, река Вит, Hidden Bulgaria Quests, AR туризъм, скрита България, каньон, пещери, Луковит, екотуризъм",
  },
  en: {
    title: "Aglen — Hidden Bulgaria Vit River Village | AR Quests",
    description:
      "Explore Aglen, Bulgaria's only village starting with Ъ. Limestone canyons, caves, Vit River history & the Hidden Bulgaria Quests AR adventure app.",
    locale: "en_US",
    keywords:
      "Aglen Bulgaria, hidden Bulgaria, Vit River, AR tourism Bulgaria, Bulgaria quests, Bulgaria hidden places, Bulgaria travel, limestone canyon, eco tourism Bulgaria",
  },
  de: {
    title: "Aglen — Verborgenes Vit-Tal-Dorf in Bulgarien | AR",
    description:
      "Entdecke Aglen, Bulgariens einziges Dorf mit dem Buchstaben Ъ. Kalksteinschluchten, Höhlen, Geschichte und AR-Abenteuer mit Hidden Bulgaria Quests.",
    locale: "de_DE",
    keywords:
      "Aglen Bulgarien, Vit Fluss, Bulgarien Reise, verstecktes Bulgarien, AR Tourismus, Kalksteinklamm, Öko-Tourismus Bulgarien",
  },
  fr: {
    title: "Aglen — Village Caché de la Vallée du Vit, Bulgarie",
    description:
      "Découvrez Aglen, seul village bulgare commençant par Ъ. Canyons calcaires, grottes, histoire et aventure AR avec Hidden Bulgaria Quests.",
    locale: "fr_FR",
    keywords:
      "Aglen Bulgarie, rivière Vit, Bulgarie cachée, tourisme AR, quêtes Bulgarie, canyon, écotourisme Bulgarie",
  },
  es: {
    title: "Aglen — Pueblo Oculto del Río Vit en Bulgaria | AR",
    description:
      "Descubre Aglen, el único pueblo búlgaro que empieza por Ъ. Cañones de piedra caliza, cuevas, historia y aventura AR Hidden Bulgaria Quests.",
    locale: "es_ES",
    keywords:
      "Aglen Bulgaria, río Vit, Bulgaria oculta, turismo AR, Bulgaria viaje, cañón caliza, ecoturismo Bulgaria",
  },
  it: {
    title: "Aglen — Villaggio Nascosto del Vit, Bulgaria | AR",
    description:
      "Scopri Aglen, l'unico villaggio bulgaro che inizia con Ъ. Canyon calcarei, grotte, storia e avventura AR Hidden Bulgaria Quests.",
    locale: "it_IT",
    keywords:
      "Aglen Bulgaria, fiume Vit, Bulgaria nascosta, turismo AR, avventura Bulgaria, canyon calcareo, ecoturismo Bulgaria",
  },
  ro: {
    title: "Aglen — Satul Ascuns al Văii Vit din Bulgaria | AR",
    description:
      "Descoperă Aglen, singurul sat bulgăresc care începe cu Ъ. Canioane calcaroase, peșteri, istorie și aventură AR Hidden Bulgaria Quests.",
    locale: "ro_RO",
    keywords:
      "Aglen Bulgaria, râul Vit, Bulgaria ascunsă, turism AR, aventură Bulgaria, canion calcar, ecoturism Bulgaria",
  },
  tr: {
    title: "Aglen — Bulgaristan'ın Gizli Vit Vadisi Köyü | AR",
    description:
      "Bulgaristan'ın Ъ harfiyle başlayan tek köyü Aglen'i keşfedin. Kireçtaşı kanyonları, mağaralar, tarih ve Hidden Bulgaria Quests AR macerası.",
    locale: "tr_TR",
    keywords:
      "Aglen Bulgaristan, Vit nehri, gizli Bulgaristan, AR turizm, Bulgaristan gezi, kireçtaşı kanyon, ekoturizm",
  },
  el: {
    title: "Aglen — Κρυφό Χωριό της Κοιλάδας Vit | Βουλγαρία",
    description:
      "Ανακαλύψτε το Aglen, το μοναδικό βουλγαρικό χωριό που αρχίζει με Ъ. Φαράγγια, σπήλαια, ιστορία και AR περιπέτεια Hidden Bulgaria Quests.",
    locale: "el_GR",
    keywords:
      "Aglen Βουλγαρία, ποταμός Vit, κρυφή Βουλγαρία, τουρισμός AR, Βουλγαρία ταξίδι, φαράγγι, οικοτουρισμός",
  },
  pl: {
    title: "Aglen — Ukryta Wioska Doliny Vit w Bułgarii | AR",
    description:
      "Odkryj Aglen, jedyną bułgarską wioskę zaczynającą się na Ъ. Wapienne kaniony, jaskinie, historia i przygoda AR Hidden Bulgaria Quests.",
    locale: "pl_PL",
    keywords:
      "Aglen Bułgaria, rzeka Vit, ukryta Bułgaria, turystyka AR, przygoda Bułgaria, wapiennej kanion, ekoturystyka",
  },
  ru: {
    title: "Ъглен — Скрытая деревня долины Вит в Болгарии | AR",
    description:
      "Откройте Ъглен — единственную болгарскую деревню, начинающуюся на букву Ъ. Каньоны, пещеры, история и AR-приключение Hidden Bulgaria Quests.",
    locale: "ru_RU",
    keywords:
      "Ъглен Болгария, река Вит, скрытая Болгария, AR туризм, приключение Болгария, известняковый каньон, экотуризм",
  },
  ja: {
    title: "アグレン — ブルガリアの隠れたヴィト渓谷の村 | AR",
    description:
      "ブルガリア唯一のЪから始まる村アグレンを探索。石灰岩の峡谷、洞窟、歴史、Hidden Bulgaria Quests ARアドベンチャーを体験しよう。",
    locale: "ja_JP",
    keywords:
      "アグレン ブルガリア, ヴィト川, 秘境ブルガリア, ARツーリズム, ブルガリア旅行, 峡谷, エコツーリズム",
  },
  sr: {
    title: "Агле̄н — Скривено Село Долине Вит у Бугарској | AR",
    description:
      "Откријте Агле̄н, једино бугарско село које почиње са Ъ. Кречњачки кањони, пећине, историја и AR авантура Hidden Bulgaria Quests.",
    locale: "sr_RS",
    keywords:
      "Агле̄н Бугарска, река Вит, скривена Бугарска, AR туризам, авантура Бугарска, кречњачки кањон, екотуризам",
  },
};

type SEOConfig = {
  title: string;
  description: string;
  locale: string;
  keywords: string;
  canonicalUrl: string;
  alternates: Array<{ lang: string; href: string }>;
  ogLocaleAlternates: string[];
};

export type ImageSitemapEntry = {
  loc: string;
  title: string;
  caption: string;
};

const routeKeywordSuffix: Record<CoreRouteId, string> = {
  home: "Aglen village, Ъглен tourism, Vit River Bulgaria",
  pillars: "Aglen tourism pillars, hidden Bulgaria village, cultural tourism Bulgaria",
  attractions: "Aglen attractions, Vit River landmarks, rock arch Aglen, Kaleto ruins",
  activities: "Aglen activities, canyon walk, fishing Vit River, Bulgaria eco tours",
  fishing: "Vit River fishing, fishing Aglen, slow travel Bulgaria, river guide",
  hiking: "Aglen hiking, canyon routes Bulgaria, Vit River trails, eco walking",
  caves: "Aglen caves, limestone caves Bulgaria, rock forms, cave thresholds",
  vitRiver: "Vit River Bulgaria, Aglen river, river canyon, Northern Bulgaria nature",
  food: "Aglen food, local products Bulgaria, rural food guide, village travel",
  nearby: "nearby destinations Aglen, Lukovit, Lovech Province, Prohodna cave",
  geo: "Aglen location, Lovech Province, Lukovit, Vit River map",
  stay: "Aglen accommodation, guest rooms Aglen, camping Vit River, Bulgaria rural stay",
  quests: "Hidden Bulgaria Quests, AR tourism Bulgaria, Aglen AR adventure",
  app: "Hidden Bulgaria Quests app, Android AR tourism app Bulgaria",
  travelGuide: "Aglen travel guide, Bulgaria village guide, weekend itinerary",
  seasonal: "Aglen seasonal guide, spring Bulgaria travel, autumn Vit River",
  events: "Aglen events, local tourism updates, seasonal routes Bulgaria",
  trust: "Aglen tourism about, local authors, E-E-A-T, visitor safety",
  editorial: "Aglen editorial policy, tourism sources, content review, safety notes",
  localSeo: "Aglen Google Business Profile, local SEO, NAP consistency",
  crawlerPolicy: "Aglen crawler policy, llms.txt, AI search guidance",
  contact: "Aglen visit planning, guided routes Aglen, tourism contact Bulgaria",
};

function absoluteRouteUrl(lang: LanguageCode, routeId: RouteId): string {
  return `${SITE_URL}${buildRoutePath(lang, routeId)}`;
}

function absoluteAssetUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

export function getSEOConfig(lang: LanguageCode, routeId: RouteId = "home"): SEOConfig {
  const base = seoMeta[lang];
  const copy = contentByLanguage[lang];
  const landingPage = isLandingPageId(routeId) ? landingPagesById.get(routeId) : undefined;

  const coreRouteText: Record<CoreRouteId, { title: string; description: string }> = {
    home: { title: base.title, description: base.description },
    pillars: {
      title: `${copy.about.title} | ${copy.brand.name}`,
      description: `${copy.about.text} ${copy.legends.text}`,
    },
    attractions: {
      title: `${copy.landmarks.title} | ${copy.brand.name}`,
      description: copy.landmarks.text,
    },
    activities: {
      title: `${copy.experiences.title} | ${copy.brand.name}`,
      description: copy.experiences.text,
    },
    fishing: {
      title: `Fishing by the Vit River | ${copy.brand.name}`,
      description: "A practical evergreen guide to slow fishing near Aglen, river access, visitor etiquette, seasonal notes, and how to combine the Vit with a quiet village weekend.",
    },
    hiking: {
      title: `Hiking and Canyon Routes | ${copy.brand.name}`,
      description: "Plan gentle walks around Aglen's canyon views, river paths, rock forms, village center, and photo stops with safety notes for slow travel.",
    },
    caves: {
      title: `Caves and Rock Forms around Aglen | ${copy.brand.name}`,
      description: "Explore Aglen's cave thresholds, limestone forms, local names, nearby rock arches, and responsible cave-visit guidance.",
    },
    vitRiver: {
      title: `Vit River Travel Guide | ${copy.brand.name}`,
      description: "A destination guide to the Vit River around Aglen: river pools, canyon light, walking routes, photo stops, fishing, and nature etiquette.",
    },
    food: {
      title: `Food and Local Products Guide | ${copy.brand.name}`,
      description: "Use this guide to plan simple village food stops, seasonal local products, picnic ideas, and respectful rural travel around Aglen.",
    },
    nearby: {
      title: `Nearby Destinations from Aglen | ${copy.brand.name}`,
      description: "Connect Aglen with nearby Northern Bulgaria destinations including Lukovit, Lovech Province, cave landscapes, river routes, and weekend itineraries.",
    },
    geo: {
      title: `${copy.landmarks.aria} | ${copy.brand.name}`,
      description: `${copy.hero.meta}. ${copy.landmarks.text}`,
    },
    stay: {
      title: `${copy.stay.title} | ${copy.brand.name}`,
      description: copy.stay.text,
    },
    quests: {
      title: `${copy.quests.title} | ${copy.brand.name}`,
      description: copy.quests.text,
    },
    app: {
      title: `${copy.app.title} | ${copy.brand.name}`,
      description: copy.app.text,
    },
    travelGuide: {
      title: `Aglen Travel Guide | ${copy.brand.name}`,
      description: "A crawlable travel hub for Aglen covering attractions, hiking, fishing, caves, river routes, accommodation, food, nearby destinations, safety, and seasonal updates.",
    },
    seasonal: {
      title: `Seasonal Guide to Aglen | ${copy.brand.name}`,
      description: "Monthly and seasonal planning notes for spring walks, summer river pauses, autumn photography, winter quiet travel, and route updates around Aglen.",
    },
    events: {
      title: `Events and Route Updates | ${copy.brand.name}`,
      description: "A freshness hub for local events, route updates, seasonal visitor notes, village stories, and travel-guide updates around Aglen.",
    },
    trust: {
      title: `About Aglen Tourism | ${copy.brand.name}`,
      description: "Learn who maintains the Aglen travel guide, how local knowledge is used, what sources inform the site, and which safety notes visitors should know.",
    },
    editorial: {
      title: `Editorial Policy and Sources | ${copy.brand.name}`,
      description: "Editorial standards for Aglen tourism content: source notes, local review, update cadence, safety guidance, image permissions, and correction requests.",
    },
    localSeo: {
      title: `Local Presence and NAP Checklist | ${copy.brand.name}`,
      description: "Public local SEO checklist for Aglen tourism profiles, consistent name-address-phone data, categories, photos, reviews, Q&A, and map ecosystems.",
    },
    crawlerPolicy: {
      title: `Crawler and AI Search Policy | ${copy.brand.name}`,
      description: "Crawler governance for Aglen tourism content, including sitemap discovery, AI-search guidance, source attribution, and llms.txt availability.",
    },
    contact: {
      title: `${copy.contact.title} | ${copy.brand.name}`,
      description: copy.contact.text,
    },
  };
  const routeText = landingPage
    ? {
        title: landingPage.title,
        description: landingPage.metaDescription,
      }
    : coreRouteText[routeId as CoreRouteId];
  const keywordSuffix = landingPage
    ? [
        ...landingPage.keywords,
        ...landingPage.secondaryKeywords,
        ...landingPage.bulgarianKeywords,
      ].join(", ")
    : routeKeywordSuffix[routeId as CoreRouteId];

  return {
    title: routeText.title,
    description: routeText.description,
    locale: base.locale,
    keywords: `${base.keywords}, ${keywordSuffix}`,
    canonicalUrl: absoluteRouteUrl(lang, routeId),
    alternates: [
      { lang: "x-default", href: absoluteRouteUrl(DEFAULT_LANGUAGE, routeId) },
      ...allLanguageCodes.map((code) => ({ lang: code, href: absoluteRouteUrl(code, routeId) })),
    ],
    ogLocaleAlternates: allLanguageCodes
      .filter((code) => code !== lang)
      .map((code) => seoMeta[code].locale),
  };
}

export function getRouteImageEntries(lang: LanguageCode, routeId: RouteId = "home"): ImageSitemapEntry[] {
  const copy = contentByLanguage[lang];
  const landingPage = isLandingPageId(routeId) ? landingPagesById.get(routeId) : undefined;
  if (landingPage) {
    return [
      {
        loc: absoluteAssetUrl(landingPage.image),
        title: landingPage.h1,
        caption: landingPage.imageAlt,
      },
      {
        loc: OG_IMAGE,
        title: copy.hero.title,
        caption: copy.hero.imageAlt,
      },
    ].filter((entry, index, entries) =>
      entries.findIndex((candidate) => candidate.loc === entry.loc) === index,
    );
  }

  const entriesByRoute: Record<CoreRouteId, ImageSitemapEntry[]> = {
    home: [
      {
        loc: OG_IMAGE,
        title: copy.hero.title,
        caption: copy.hero.imageAlt,
      },
      ...copy.galleryItems.map((item) => ({
        loc: absoluteAssetUrl(item.image),
        title: item.title,
        caption: item.alt,
      })),
    ],
    pillars: [
      ...copy.mysteries.map((item) => ({
        loc: absoluteAssetUrl(item.image),
        title: item.title,
        caption: item.description,
      })),
    ],
    attractions: copy.placesList.map((place) => ({
      loc: absoluteAssetUrl(place.image),
      title: place.title,
      caption: place.imageAlt || place.description,
    })),
    activities: [
      {
        loc: OG_IMAGE,
        title: copy.experiences.title,
        caption: copy.experiences.text,
      },
      ...copy.experiencesList.slice(0, 3).map((experience, index) => ({
        loc: [OG_IMAGE, `${SITE_URL}/assets/aglen-river-pool.png`, `${SITE_URL}/assets/aglen-rock-arch.png`][index],
        title: experience.title,
        caption: experience.description,
      })),
    ],
    fishing: [
      { loc: `${SITE_URL}/assets/aglen-river-pool.png`, title: "Fishing by the Vit River", caption: "Quiet river pool and slow travel by the Vit near Aglen." },
      { loc: OG_IMAGE, title: copy.brand.name, caption: copy.hero.imageAlt },
    ],
    hiking: [
      { loc: OG_IMAGE, title: "Aglen canyon hiking routes", caption: copy.landmarks.text },
      { loc: `${SITE_URL}/assets/aglen-rock-arch.png`, title: "Rock arch walking route", caption: copy.placesList[0]?.imageAlt ?? copy.landmarks.title },
    ],
    caves: [
      { loc: `${SITE_URL}/assets/aglen-cave-mystery.png`, title: "Caves and rock forms around Aglen", caption: copy.mysteries[1]?.description ?? copy.landmarks.text },
      { loc: `${SITE_URL}/assets/aglen-rock-arch.png`, title: copy.placesList[0]?.title ?? copy.landmarks.title, caption: copy.placesList[0]?.description ?? copy.landmarks.text },
    ],
    vitRiver: [
      { loc: OG_IMAGE, title: "Vit River near Aglen", caption: copy.hero.imageAlt },
      { loc: `${SITE_URL}/assets/aglen-river-pool.png`, title: copy.placesList[3]?.title ?? "Vit River pool", caption: copy.placesList[3]?.description ?? copy.landmarks.text },
    ],
    food: [
      { loc: `${SITE_URL}/assets/aglen-village-church.png`, title: "Aglen village food and local products", caption: "Village center context for local food, picnics, and rural travel planning." },
    ],
    nearby: [
      { loc: `${SITE_URL}/assets/aglen-aerial-river.png`, title: "Nearby destinations from Aglen", caption: "Aerial view of the Vit River corridor for nearby route planning." },
      { loc: `${SITE_URL}/assets/aglen-cave-mystery.png`, title: "Nearby cave landscapes", caption: "Cave and limestone terrain connected with Northern Bulgaria routes." },
    ],
    geo: [
      {
        loc: `${SITE_URL}/assets/aglen-aerial-river.png`,
        title: copy.landmarks.aria,
        caption: copy.hero.meta,
      },
      {
        loc: OG_IMAGE,
        title: copy.landmarks.title,
        caption: copy.landmarks.text,
      },
    ],
    stay: copy.accommodationList.map((item) => ({
      loc: absoluteAssetUrl(item.image),
      title: item.title,
      caption: item.description,
    })),
    quests: [
      {
        loc: OG_IMAGE,
        title: copy.quests.title,
        caption: copy.quests.text,
      },
      {
        loc: `${SITE_URL}/assets/aglen-cave-mystery.png`,
        title: copy.ar.title,
        caption: copy.ar.text,
      },
    ],
    app: [
      {
        loc: OG_IMAGE,
        title: copy.app.title,
        caption: copy.app.text,
      },
    ],
    travelGuide: [
      { loc: OG_IMAGE, title: "Aglen travel guide", caption: copy.hero.imageAlt },
      { loc: `${SITE_URL}/assets/aglen-aerial-river.png`, title: "Aglen route planning", caption: copy.landmarks.text },
    ],
    seasonal: [
      { loc: `${SITE_URL}/assets/aglen-aerial-river.png`, title: "Seasonal guide to Aglen", caption: "Seasonal travel planning for river light, walks, photography, and quiet weekends." },
    ],
    events: [
      { loc: `${SITE_URL}/assets/aglen-village-church.png`, title: "Aglen events and local updates", caption: "Village context for local stories, events, and route updates." },
    ],
    trust: [
      { loc: `${SITE_URL}/assets/aglen-village-church.png`, title: "About Aglen Tourism", caption: "Local identity, sources, safety notes, and visitor guidance." },
    ],
    editorial: [
      { loc: `${SITE_URL}/assets/aglen-village-church.png`, title: "Editorial policy and sources", caption: "Source notes, local review, image permissions, and update cadence." },
    ],
    localSeo: [
      { loc: `${SITE_URL}/assets/aglen-village-church.png`, title: "Aglen local presence", caption: "Public checklist for local profiles, NAP consistency, photos, reviews, and Q&A." },
    ],
    crawlerPolicy: [
      { loc: OG_IMAGE, title: "Crawler and AI search policy", caption: "Sitemap, llms.txt, and crawler governance for Aglen tourism content." },
    ],
    contact: [
      {
        loc: `${SITE_URL}/assets/aglen-village-church.png`,
        title: copy.contact.title,
        caption: copy.contact.text,
      },
    ],
  };

  const seen = new Set<string>();
  return entriesByRoute[routeId as CoreRouteId].filter((entry) => {
    if (seen.has(entry.loc)) {
      return false;
    }

    seen.add(entry.loc);
    return true;
  });
}

// ---------------------------------------------------------------------------
// DOM helpers
// ---------------------------------------------------------------------------
function setMeta(nameOrProp: string, content: string, isProp = false): void {
  const attr = isProp ? "property" : "name";
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${nameOrProp}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, nameOrProp);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string): void {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

function setHreflangLinks(lang: LanguageCode, routeId: RouteId): void {
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((n) => n.remove());

  const addLink = (lang: string, href: string) => {
    const link = document.createElement("link");
    link.rel = "alternate";
    link.setAttribute("hreflang", lang);
    link.href = href;
    document.head.appendChild(link);
  };

  getSEOConfig(lang, routeId).alternates.forEach((alternate) => {
    addLink(alternate.lang, alternate.href);
  });
}

function setOpenGraphLocaleAlternates(locales: string[]): void {
  document.querySelectorAll('meta[property="og:locale:alternate"]').forEach((n) => n.remove());

  locales.forEach((locale) => {
    const meta = document.createElement("meta");
    meta.setAttribute("property", "og:locale:alternate");
    meta.setAttribute("content", locale);
    document.head.appendChild(meta);
  });
}

function injectJSONLD(data: object): void {
  let el = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"]#site-jsonld');
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "site-jsonld";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data, null, 0);
}

function buildPageSpecificSchemas(lang: LanguageCode, routeId: RouteId, routeUrl: string): object[] {
  const copy = contentByLanguage[lang];
  const meta = getSEOConfig(lang, routeId);
  const routeImages = getRouteImageEntries(lang, routeId);
  const landingPage = isLandingPageId(routeId) ? landingPagesById.get(routeId) : undefined;
  const imageObjects = routeImages.map((image, index) => ({
    "@type": "ImageObject",
    "@id": `${routeUrl}#image-${index + 1}`,
    url: image.loc,
    name: image.title,
    caption: image.caption,
  }));

  const isGuidePage = Boolean(landingPage) || [
    "pillars", "attractions", "activities", "fishing", "hiking", "caves", "vitRiver",
    "food", "nearby", "geo", "stay", "travelGuide", "seasonal", "trust", "editorial",
    "localSeo", "crawlerPolicy",
  ].includes(routeId);

  const schemas: object[] = [
    ...imageObjects,
    {
      "@type": "TouristDestination",
      "@id": `${routeUrl}#destination`,
      name: meta.title,
      description: meta.description,
      url: routeUrl,
      inLanguage: lang,
      image: routeImages.map((image) => image.loc),
      touristType: ["Nature travelers", "Cultural travelers", "Slow travel visitors", "Families"],
      geo: {
        "@type": "GeoCoordinates",
        latitude: 43.267,
        longitude: 24.221,
      },
      containsPlace: copy.placesList.map((place) => ({
        "@type": "TouristAttraction",
        name: place.title,
        description: place.description,
        image: absoluteAssetUrl(place.image),
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${routeUrl}#page-faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: `What can visitors do on ${meta.title}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: meta.description,
          },
        },
        {
          "@type": "Question",
          name: "How should visitors plan this route?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Plan an unhurried visit, check weather and local access, bring water and walking shoes, respect private spaces, and contact Aglen Tourism for current route guidance.",
          },
        },
      ],
    },
  ];

  if (isGuidePage) {
    schemas.push({
      "@type": landingPage?.schemaType ?? "Article",
      "@id": `${routeUrl}#article`,
      headline: landingPage?.h1 ?? meta.title,
      description: meta.description,
      image: routeImages.map((image) => image.loc),
      author: {
        "@type": "Organization",
        name: "Aglen Tourism",
      },
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntityOfPage: routeUrl,
      datePublished: "2026-05-30",
      dateModified: "2026-05-30",
      inLanguage: lang,
    });
  }

  if (landingPage?.faqs.length) {
    schemas.push({
      "@type": "FAQPage",
      "@id": `${routeUrl}#faq`,
      mainEntity: landingPage.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  if (routeId === "events" || routeId === "seasonal") {
    schemas.push({
      "@type": "Event",
      "@id": `${routeUrl}#seasonal-visit-window`,
      name: "Seasonal Aglen Travel Updates",
      description: "Recurring seasonal visitor notes, route updates, and local travel guidance for Aglen.",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      startDate: "2026-06-01",
      endDate: "2026-12-31",
      location: {
        "@type": "Place",
        name: "Aglen, Lovech Province, Bulgaria",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ъглен",
          addressRegion: "Lovech Province",
          addressCountry: "BG",
        },
      },
      organizer: { "@id": `${SITE_URL}/#organization` },
      image: routeImages.map((image) => image.loc),
    });
  }

  if (routeId === "quests" || routeId === "app") {
    schemas.push({
      "@type": "VideoObject",
      "@id": `${routeUrl}#app-preview-video`,
      name: copy.quests.title,
      description: copy.quests.text,
      thumbnailUrl: [OG_IMAGE],
      uploadDate: "2026-05-30",
      contentUrl: routeUrl,
      embedUrl: routeUrl,
    });
  }

  return schemas;
}

// ---------------------------------------------------------------------------
// JSON-LD @graph builder
// ---------------------------------------------------------------------------
export function buildJSONLD(lang: LanguageCode, routeId: RouteId = "home"): object {
  const meta = getSEOConfig(lang, routeId);
  const copy = contentByLanguage[lang];
  const homeUrl = absoluteRouteUrl(lang, "home");
  const routeUrl = meta.canonicalUrl;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // ── Organization ──────────────────────────────────────────────────────
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Aglen Tourism",
        alternateName: "Ъглен Туризъм",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: OG_IMAGE,
          width: 1200,
          height: 630,
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "info.aglen@gmail.com",
          availableLanguage: [
            "Bulgarian", "English", "German", "French",
            "Spanish", "Italian", "Romanian", "Turkish",
            "Greek", "Polish", "Russian", "Japanese", "Serbian",
          ],
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "село Ъглен",
          addressLocality: "Ъглен",
          addressRegion: "Ловеч",
          postalCode: "5562",
          addressCountry: "BG",
        },
        sameAs: [APP_PLAY_URL],
      },

      // ── WebSite ───────────────────────────────────────────────────────────
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: homeUrl,
        name: meta.title,
        description: meta.description,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: allLanguageCodes,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${homeUrl}?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },

      // ── WebPage ───────────────────────────────────────────────────────────
      {
        "@type": "WebPage",
        "@id": routeUrl,
        url: routeUrl,
        name: meta.title,
        description: meta.description,
        inLanguage: lang,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#aglen-village` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: OG_IMAGE,
          width: 1200,
          height: 630,
        },
      },

      ...buildPageSpecificSchemas(lang, routeId, routeUrl),

      // ── TouristAttraction + Place ─────────────────────────────────────────
      {
        "@type": ["TouristAttraction", "Place"],
        "@id": `${SITE_URL}/#aglen-village`,
        name: "Aglen Village",
        alternateName: ["Ъглен", "Ăglen", "Uglen"],
        description:
          "Bulgaria's only village whose name starts with the letter Ъ. Known for limestone canyons, the Vit River, historical caves, the Калето ruins, and the Hidden Bulgaria Quests AR adventure.",
        url: homeUrl,
        image: [
          `${SITE_URL}/assets/aglen-hero-river-canyon.png`,
          `${SITE_URL}/assets/aglen-rock-arch.png`,
          `${SITE_URL}/assets/aglen-aerial-river.png`,
          `${SITE_URL}/assets/aglen-kaleto-ruins.png`,
          `${SITE_URL}/assets/aglen-village-church.png`,
        ],
        geo: {
          "@type": "GeoCoordinates",
          latitude: 43.267,
          longitude: 24.221,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ъглен",
          addressRegion: "Lovech Province",
          addressCountry: "BG",
        },
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "Lovech Province",
          addressCountry: "BG",
        },
        touristType: [
          "Eco-tourists",
          "Photographers",
          "History Enthusiasts",
          "Adventure Travelers",
          "Nature Lovers",
          "Family Travelers",
          "Student Groups",
        ],
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "Limestone Canyon", value: true },
          { "@type": "LocationFeatureSpecification", name: "River Access", value: true },
          { "@type": "LocationFeatureSpecification", name: "Cave Exploration", value: true },
          { "@type": "LocationFeatureSpecification", name: "AR Adventure App", value: true },
          { "@type": "LocationFeatureSpecification", name: "Guided Tours", value: true },
          { "@type": "LocationFeatureSpecification", name: "Photography Spots", value: true },
          { "@type": "LocationFeatureSpecification", name: "Fishing", value: true },
          { "@type": "LocationFeatureSpecification", name: "Accommodation", value: true },
          { "@type": "LocationFeatureSpecification", name: "Camping", value: true },
        ],
        hasMap: "https://maps.google.com/?q=Aglen+Bulgaria+Lovech",
        publicAccess: true,
      },

      // ── MobileApplication — Hidden Bulgaria Quests ────────────────────────
      {
        "@type": "MobileApplication",
        "@id": `${SITE_URL}/#hidden-bulgaria-quests`,
        name: "Hidden Bulgaria Quests",
        alternateName: "Hidden Bulgaria Quests AR",
        description:
          "A free augmented reality (AR) mobile app for Android. Explore Aglen's real landmarks through GPS-guided quests, 3D storytelling, and the Guardian's hidden world — Bulgaria's first AR tourism experience.",
        url: APP_PLAY_URL,
        downloadUrl: APP_PLAY_URL,
        applicationCategory: "TravelApplication",
        applicationSubCategory: "Augmented Reality Tourism",
        operatingSystem: "Android",
        screenshot: OG_IMAGE,
        featureList: [
          "Augmented Reality (AR) overlay at real locations",
          "GPS-guided quests around Aglen village",
          "3D characters and historical storytelling",
          "The Guardian's hidden world",
          "Free to download and play",
        ],
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: allLanguageCodes,
        isAccessibleForFree: true,
        availableOnDevice: "Mobile",
      },

      // ── LocalBusiness ─────────────────────────────────────────────────────
      {
        "@type": ["LocalBusiness", "TouristInformationCenter"],
        "@id": `${SITE_URL}/#aglen-tourism-business`,
        name: "Aglen Tourism",
        description:
          "Guided tours, eco-tourism experiences, accommodation, and AR adventure in Aglen village, Lovech Province, Bulgaria.",
        url: SITE_URL,
        email: "info.aglen@gmail.com",
        image: OG_IMAGE,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ъглен",
          addressRegion: "Ловеч",
          addressCountry: "BG",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 43.267,
          longitude: 24.221,
        },
        openingHours: "Mo-Su 08:00-20:00",
        paymentAccepted: "Cash",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Aglen Experiences",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Canyon Walk",
                description: "Guided canyon walk along the Vit River with local storytelling. 2-3 hours.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "River Photo Journey",
                description: "Half-day photography tour along the Vit River and rock formations.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Fishing by the Vit",
                description: "2-hour guided fishing experience on the Vit River.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Aglen Weekend Escape",
                description: "2-day package: walks, picnic, crafts, and village storytelling.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Herbs & Village Knowledge",
                description: "90-minute herb walk with traditional knowledge and responsible gathering.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "School Discovery Day",
                description: "Full-day educational field trip through geography, history, and nature.",
              },
            },
          ],
        },
      },

      // ── FAQPage ───────────────────────────────────────────────────────────
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Aglen village famous for?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Aglen (Ъглен) is Bulgaria's only village whose name begins with the letter Ъ. It is known for its limestone canyon, Vit River, caves, the Калето archaeological ruins, and Hidden Bulgaria Quests — Bulgaria's first augmented reality (AR) adventure app set at real village locations.",
            },
          },
          {
            "@type": "Question",
            name: "Where is Aglen located in Bulgaria?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Aglen is a village in Lovech Province, Northern Bulgaria, near the town of Lukovit, situated along the Vit River valley. It is accessible for a day trip or weekend escape from Sofia or Pleven.",
            },
          },
          {
            "@type": "Question",
            name: "What is Hidden Bulgaria Quests?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Hidden Bulgaria Quests is a free augmented reality (AR) mobile app for Android. It guides visitors to real landmarks around Aglen, where pointing your phone camera reveals 3D characters, hidden stories, and GPS-guided puzzles through the village.",
            },
          },
          {
            "@type": "Question",
            name: "What activities are available in Aglen?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Aglen offers canyon walks (2–3 hours), river photography tours (half day), fishing by the Vit (2 hours), weekend escape packages (2 days), herb and village knowledge walks (90 min), and school discovery day trips. All include local guidance and prices are by arrangement.",
            },
          },
          {
            "@type": "Question",
            name: "Is there accommodation in Aglen?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Aglen offers three accommodation options: guest rooms in a local home close to the river, a campsite with tent space and river trail access, and a secluded mountain villa with canyon views ideal for small groups.",
            },
          },
          {
            "@type": "Question",
            name: "Is the Hidden Bulgaria Quests app free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Hidden Bulgaria Quests is completely free to download and play on Android via Google Play. An iOS version is coming soon.",
            },
          },
          {
            "@type": "Question",
            name: "What landmarks can I visit in Aglen?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Aglen's six main landmarks are: Дупката (a natural limestone rock arch), Слончето (a river rock figure), Червена стена (dramatic canyon cliff), Рачков вир (calm river pool), St. Archangel Michael Church (built 1888), and Калето (archaeological hilltop ruins).",
            },
          },
          {
            "@type": "Question",
            name: "When is the best time to visit Aglen?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Spring (April–June) and early autumn (September–October) are ideal for canyon walks, photography, and river experiences. Summer offers river swimming and camping. The village is a year-round destination for slow travel enthusiasts.",
            },
          },
        ],
      },

      // ── BreadcrumbList ────────────────────────────────────────────────────
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumbs`,
        itemListElement: routeId === "home"
          ? [{ "@type": "ListItem", position: 1, name: copy.nav.home, item: homeUrl }]
          : [
              { "@type": "ListItem", position: 1, name: copy.nav.home, item: homeUrl },
              { "@type": "ListItem", position: 2, name: meta.title, item: routeUrl },
            ],
      },
    ],
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function paragraph(text: string): string {
  return `<p>${escapeHtml(text)}</p>`;
}

function list(items: string[]): string {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

export function renderStaticFallback(lang: LanguageCode, routeId: RouteId = "home"): string {
  const copy = contentByLanguage[lang];
  const meta = getSEOConfig(lang, routeId);
  const landingPage = isLandingPageId(routeId) ? landingPagesById.get(routeId) : undefined;

  if (landingPage) {
    return `
      <main id="static-seo-content" lang="${lang}">
        <article>
          <p>${escapeHtml(landingPage.category)}</p>
          <h1>${escapeHtml(landingPage.h1)}</h1>
          ${paragraph(landingPage.intro)}
          ${landingPage.sections.map((section) => `
            <h2>${escapeHtml(section.heading)}</h2>
            ${paragraph(section.body)}
          `).join("")}
          <h2>Frequently Asked Questions</h2>
          ${landingPage.faqs.map((faq) => `
            <h3>${escapeHtml(faq.question)}</h3>
            ${paragraph(faq.answer)}
          `).join("")}
          <h2>Related Aglen Guides</h2>
          ${list(landingPage.internalLinks.map((link) => link.label))}
        </article>
      </main>
    `;
  }

  const sections: Record<CoreRouteId, string> = {
    home: `
      <p>${escapeHtml(copy.hero.meta)}</p>
      <h1>${escapeHtml(copy.hero.title)}</h1>
      ${paragraph(copy.hero.subtitle)}
      ${paragraph(copy.hero.lede)}
      ${list(copy.highlights.map((item) => `${item.value}: ${item.detail}`))}
    `,
    pillars: `
      <h1>${escapeHtml(copy.about.title)}</h1>
      ${paragraph(copy.about.text)}
      <h2>${escapeHtml(copy.legends.title)}</h2>
      ${paragraph(copy.legends.text)}
      ${list(copy.timeline.map((item) => item.title))}
    `,
    attractions: `
      <h1>${escapeHtml(copy.landmarks.title)}</h1>
      ${paragraph(copy.landmarks.text)}
      ${list(copy.placesList.map((place) => `${place.title}: ${place.description}`))}
    `,
    activities: `
      <h1>${escapeHtml(copy.experiences.title)}</h1>
      ${paragraph(copy.experiences.text)}
      ${list(copy.experiencesList.map((experience) => `${experience.title}: ${experience.duration}, ${experience.bestFor}. ${experience.description}`))}
    `,
    fishing: `
      <h1>Fishing by the Vit River</h1>
      ${paragraph("Use Aglen as a quiet base for slow fishing, river pauses, photography, and low-impact travel along the Vit. Check local conditions, respect private spaces, and avoid disturbing river habitats.")}
      ${list(["Best paired with a half-day river walk", "Bring your own equipment and confirm local rules before fishing", "Keep riverbanks clean and follow catch-and-release where appropriate", copy.experiencesList[2]?.description ?? copy.experiences.text])}
    `,
    hiking: `
      <h1>Hiking and Canyon Routes</h1>
      ${paragraph("Aglen is best explored through short, unhurried walks: village center, river path, rock arch, canyon viewpoints, and shaded photo stops.")}
      ${list(copy.mapStops.map((stop) => `${stop.title}: ${stop.detail}`))}
    `,
    caves: `
      <h1>Caves and Rock Forms around Aglen</h1>
      ${paragraph("The limestone terrain around Aglen gives the destination its cave thresholds, arches, rock names, and older landscape memory. Visit carefully and avoid entering unsafe cave spaces without local guidance.")}
      ${list(copy.mysteries.map((item) => `${item.title}: ${item.description}`))}
    `,
    vitRiver: `
      <h1>Vit River Travel Guide</h1>
      ${paragraph("The Vit River shapes Aglen's walking routes, views, fishing moments, and slow weekend rhythm. Plan for water, shade, weather, and respectful access.")}
      ${list(copy.placesList.filter((place) => /вир|river|pool|вит|Vit/i.test(`${place.title} ${place.description}`)).map((place) => `${place.title}: ${place.description}`))}
    `,
    food: `
      <h1>Food and Local Products Guide</h1>
      ${paragraph("Aglen is a rural destination, so food planning should stay practical: ask ahead, bring picnic basics, support local producers where available, and leave no waste near the river or trails.")}
      ${list(["Pack water and simple picnic food for walking routes", "Ask hosts about seasonal fruit, herbs, preserves, and local products", "Use nearby towns for broader restaurant and grocery options", "Keep meals low-impact around nature stops"])}
    `,
    nearby: `
      <h1>Nearby Destinations from Aglen</h1>
      ${paragraph("Aglen fits naturally into a Northern Bulgaria weekend with Lukovit, Lovech Province, cave landscapes, river routes, and quiet village detours.")}
      ${list(["Lukovit area for services and wider route planning", "Nearby limestone and cave landscapes for geology-focused trips", "Lovech Province for culture, history, and longer itineraries", "Vit River corridor for slow nature travel"])}
    `,
    geo: `
      <h1>${escapeHtml(copy.landmarks.aria)}</h1>
      ${paragraph(copy.hero.meta)}
      ${paragraph(copy.landmarks.text)}
      ${list(copy.mapStops.map((stop) => `${stop.title}: ${stop.detail}`))}
    `,
    stay: `
      <h1>${escapeHtml(copy.stay.title)}</h1>
      ${paragraph(copy.stay.text)}
      ${list(copy.accommodationList.map((item) => `${item.title}: ${item.description}`))}
    `,
    quests: `
      <h1>${escapeHtml(copy.quests.title)}</h1>
      ${paragraph(copy.quests.text)}
      ${list(copy.quests.features.map((feature) => `${feature.title}: ${feature.text}`))}
    `,
    app: `
      <h1>${escapeHtml(copy.app.title)}</h1>
      ${paragraph(copy.app.text)}
      ${paragraph(copy.app.note)}
      ${list(copy.ar.steps)}
    `,
    travelGuide: `
      <h1>Aglen Travel Guide</h1>
      ${paragraph("This hub organizes Aglen by visitor intent: attractions, fishing, hiking, caves, the Vit River, accommodation, food planning, nearby destinations, events, safety, and trusted sources.")}
      ${list(["Attractions and landmarks", "Fishing and hiking routes", "Accommodation and food planning", "Seasonal updates and nearby destinations", "Editorial policy, local presence, and crawler governance"])}
    `,
    seasonal: `
      <h1>Seasonal Guide to Aglen</h1>
      ${paragraph("Spring and autumn are strongest for walking and photography, summer suits river pauses and camping, and winter favors quiet local stories and careful route planning.")}
      ${list(["Spring: green river paths and flowers", "Summer: shade, water, and early starts", "Autumn: photography and soft light", "Winter: quiet travel and weather-aware walks"])}
    `,
    events: `
      <h1>Events and Route Updates</h1>
      ${paragraph("This page is the freshness layer for monthly guide updates, seasonal route notes, local stories, visitor advisories, and future event listings.")}
      ${list(["Monthly route and access checks", "Seasonal travel notes", "Local story updates", "Visitor safety and weather reminders"])}
    `,
    trust: `
      <h1>About Aglen Tourism</h1>
      ${paragraph("The site is maintained as a practical travel guide for Aglen, combining local context, public sources, visitor safety notes, and permission-based media.")}
      ${list(["Local-first destination framing", "Source notes visible in the footer", "Safety and access reminders for visitors", "Corrections accepted through the contact email"])}
    `,
    editorial: `
      <h1>Editorial Policy and Sources</h1>
      ${paragraph("Travel content is reviewed for usefulness, safety, source clarity, image permission, and seasonal freshness. Historical or legend material is framed as local memory unless verified by public sources.")}
      ${list(["Use public sources and local review where possible", "Separate legends from verified historical claims", "Keep route and safety notes current", "Credit or permission-check images before publication"])}
    `,
    localSeo: `
      <h1>Local Presence and NAP Checklist</h1>
      ${paragraph("The code can publish the checklist, but claiming Google Business Profile, Bing Places, Apple Business Connect, reviews, and Q&A requires owner action outside the repository.")}
      ${list(["Use one consistent name, address, phone, and website", "Choose tourism, attraction, and visitor information categories where accurate", "Upload current photos and answer common visitor questions", "Request reviews only from real visitors"])}
    `,
    crawlerPolicy: `
      <h1>Crawler and AI Search Policy</h1>
      ${paragraph("Aglen's public pages are discoverable through canonical language folders, XML sitemaps, image sitemap entries, and llms.txt guidance for AI search tools.")}
      ${list(["Respect canonical URLs and sitemap index", "Attribute facts to Aglen Tourism and linked public sources", "Do not treat local legends as verified archival history", "Use current pages over cached query-string variants"])}
    `,
    contact: `
      <h1>${escapeHtml(copy.contact.title)}</h1>
      ${paragraph(copy.contact.text)}
      ${paragraph(copy.contact.noteOne)}
      ${paragraph(copy.contact.noteTwo)}
    `,
  };

  return `
    <main id="static-seo-content" lang="${lang}">
      <article>
        <p>${escapeHtml(copy.brand.name)} - ${escapeHtml(copy.brand.subtitle)}</p>
        <h1>${escapeHtml(meta.title)}</h1>
        ${paragraph(meta.description)}
        ${sections[routeId as CoreRouteId]}
      </article>
    </main>
  `;
}

// ---------------------------------------------------------------------------
// Main export — call once per language change
// ---------------------------------------------------------------------------
export function updateDocumentSEO(lang: LanguageCode, routeId: RouteId = "home"): void {
  const meta = getSEOConfig(lang, routeId);

  // Title
  document.title = meta.title;

  // Core meta
  setMeta("description", meta.description);
  setMeta("keywords", meta.keywords);
  setMeta("author", "Aglen Tourism");
  setMeta("robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
  setMeta("googlebot", "index, follow");

  // Open Graph
  setMeta("og:type", "website", true);
  setMeta("og:site_name", "Aglen — Hidden Bulgaria", true);
  setMeta("og:url", meta.canonicalUrl, true);
  setMeta("og:title", meta.title, true);
  setMeta("og:description", meta.description, true);
  setMeta("og:image", OG_IMAGE, true);
  setMeta("og:image:url", OG_IMAGE, true);
  setMeta("og:image:secure_url", OG_IMAGE, true);
  setMeta("og:image:width", OG_IMAGE_WIDTH, true);
  setMeta("og:image:height", OG_IMAGE_HEIGHT, true);
  setMeta("og:image:alt", "Aglen village — Vit River canyon, limestone cliffs and forest, Bulgaria", true);
  setMeta("og:image:type", "image/png", true);
  setMeta("og:locale", meta.locale, true);
  setOpenGraphLocaleAlternates(meta.ogLocaleAlternates);

  // Twitter / X Cards
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:site", "@hiddenBulgaria");
  setMeta("twitter:title", meta.title);
  setMeta("twitter:description", meta.description);
  setMeta("twitter:image", OG_IMAGE);
  setMeta("twitter:image:alt", "Aglen — Vit River Canyon, Hidden Bulgaria");

  // Canonical
  setCanonical(meta.canonicalUrl);

  // Hreflang
  setHreflangLinks(lang, routeId);

  // JSON-LD structured data
  injectJSONLD(buildJSONLD(lang, routeId));
}
