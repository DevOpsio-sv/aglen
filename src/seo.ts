import type { LanguageCode } from "./locales/types";

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

// ---------------------------------------------------------------------------
// All supported language codes (mirrors src/locales/shared.ts)
// ---------------------------------------------------------------------------
const ALL_LANGS: LanguageCode[] = [
  "bg", "en", "de", "fr", "es", "it", "ro", "tr", "el", "pl", "ru", "ja", "sr",
];

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

function setHreflangLinks(activeLang: LanguageCode): void {
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((n) => n.remove());

  const addLink = (lang: string, href: string) => {
    const link = document.createElement("link");
    link.rel = "alternate";
    link.setAttribute("hreflang", lang);
    link.href = href;
    document.head.appendChild(link);
  };

  addLink("x-default", SITE_URL + "/");
  ALL_LANGS.forEach((code) => {
    const url = code === "bg" ? `${SITE_URL}/` : `${SITE_URL}/?lang=${code}`;
    addLink(code, url);
  });

  void activeLang; // used by caller to update URL
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

// ---------------------------------------------------------------------------
// JSON-LD @graph builder
// ---------------------------------------------------------------------------
function buildJSONLD(lang: LanguageCode): object {
  const meta = seoMeta[lang];
  const canonicalUrl =
    lang === "bg" ? `${SITE_URL}/` : `${SITE_URL}/?lang=${lang}`;

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
        url: SITE_URL,
        name: meta.title,
        description: meta.description,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: ALL_LANGS,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },

      // ── WebPage ───────────────────────────────────────────────────────────
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        url: canonicalUrl,
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

      // ── TouristAttraction + Place ─────────────────────────────────────────
      {
        "@type": ["TouristAttraction", "Place"],
        "@id": `${SITE_URL}/#aglen-village`,
        name: "Aglen Village",
        alternateName: ["Ъглен", "Ăglen", "Uglen"],
        description:
          "Bulgaria's only village whose name starts with the letter Ъ. Known for limestone canyons, the Vit River, historical caves, the Калето ruins, and the Hidden Bulgaria Quests AR adventure.",
        url: SITE_URL,
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
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        screenshot: OG_IMAGE,
        featureList: [
          "Augmented Reality (AR) overlay at real locations",
          "GPS-guided quests around Aglen village",
          "3D characters and historical storytelling",
          "The Guardian's hidden world",
          "Free to download and play",
        ],
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: ALL_LANGS,
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
        priceRange: "€10–€60",
        currenciesAccepted: "EUR",
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
              price: "25",
              priceCurrency: "EUR",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "River Photo Journey",
                description: "Half-day photography tour along the Vit River and rock formations.",
              },
              price: "40",
              priceCurrency: "EUR",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Fishing by the Vit",
                description: "2-hour guided fishing experience on the Vit River.",
              },
              price: "10",
              priceCurrency: "EUR",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Aglen Weekend Escape",
                description: "2-day package: walks, picnic, crafts, and village storytelling.",
              },
              price: "60",
              priceCurrency: "EUR",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Herbs & Village Knowledge",
                description: "90-minute herb walk with traditional knowledge and responsible gathering.",
              },
              price: "20",
              priceCurrency: "EUR",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "School Discovery Day",
                description: "Full-day educational field trip through geography, history, and nature.",
              },
              price: "35",
              priceCurrency: "EUR",
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
              text: "Aglen offers canyon walks (€25, 2–3 hours), river photography tours (€40, half day), fishing by the Vit (€10, 2 hours), weekend escape packages (€60, 2 days), herb and village knowledge walks (€20, 90 min), and school discovery day trips (€35). All include local guidance.",
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
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Landmarks", item: `${SITE_URL}/#landmarks` },
          { "@type": "ListItem", position: 3, name: "Experiences", item: `${SITE_URL}/#experiences` },
          { "@type": "ListItem", position: 4, name: "Stay", item: `${SITE_URL}/#stay` },
          { "@type": "ListItem", position: 5, name: "Hidden Bulgaria Quests", item: `${SITE_URL}/#quests` },
          { "@type": "ListItem", position: 6, name: "Download App", item: `${SITE_URL}/#app` },
          { "@type": "ListItem", position: 7, name: "Contact", item: `${SITE_URL}/#contact` },
        ],
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Main export — call once per language change
// ---------------------------------------------------------------------------
export function updateDocumentSEO(lang: LanguageCode): void {
  const meta = seoMeta[lang];
  const canonicalUrl =
    lang === "bg" ? `${SITE_URL}/` : `${SITE_URL}/?lang=${lang}`;

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
  setMeta("og:url", canonicalUrl, true);
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

  // Twitter / X Cards
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:site", "@hiddenBulgaria");
  setMeta("twitter:title", meta.title);
  setMeta("twitter:description", meta.description);
  setMeta("twitter:image", OG_IMAGE);
  setMeta("twitter:image:alt", "Aglen — Vit River Canyon, Hidden Bulgaria");

  // Canonical
  setCanonical(canonicalUrl);

  // Hreflang
  setHreflangLinks(lang);

  // JSON-LD structured data
  injectJSONLD(buildJSONLD(lang));
}
