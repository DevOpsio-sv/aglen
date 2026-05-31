import { contentByLanguage, languages } from "./content";
import { getLandingPage, isLandingPageId } from "./landingPages";
import type { LanguageCode } from "./locales/types";
import { allLanguageCodes, buildRoutePath, DEFAULT_LANGUAGE, type CoreRouteId, type RouteId } from "./routes";
import { uiTextByLanguage } from "./uiText";

export const SITE_URL = "https://xn--c1aerj5d.com";
const OG_IMAGE = `${SITE_URL}/assets/aglen-hero-river-canyon.png`;
const OG_IMAGE_WIDTH = "1200";
const OG_IMAGE_HEIGHT = "630";
const APP_PLAY_URL = "https://play.google.com/store/apps/details?id=com.hiddenBulgaria.quests";

const localeCodes: Record<LanguageCode, string> = {
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

type SEOConfig = {
  title: string;
  description: string;
  locale: string;
  keywords: string;
  author: string;
  siteName: string;
  imageUrl: string;
  imageAlt: string;
  canonicalUrl: string;
  alternates: Array<{ lang: string; href: string }>;
  ogLocaleAlternates: string[];
};

export type ImageSitemapEntry = {
  loc: string;
  title: string;
  caption: string;
};

type SeoText = {
  organizationName: string;
  destinationDescription: string;
  pagePlanQuestion: string;
  pagePlanAnswer: string;
  touristTypes: string[];
  localBusinessDescription: string;
  eventName: string;
  eventDescription: string;
  searchInputName: string;
  serviceCatalog: string;
};

const seoTextByLanguage: Record<LanguageCode, SeoText> = {
  bg: { organizationName: "Ъглен Туризъм", destinationDescription: "Ъглен е тихо село край река Вит с варовикови скали, пещери, селска памет и AR преживяване.", pagePlanQuestion: "Как да планирам този маршрут?", pagePlanAnswer: "Планирай спокойно посещение, провери времето и достъпа, носи вода и удобни обувки и се свържи за актуални местни насоки.", touristTypes: ["Природни пътешественици", "Културни пътешественици", "Семейства", "Фотографи"], localBusinessDescription: "Водени маршрути, екотуризъм, настаняване и AR приключение в Ъглен.", eventName: "Сезонни туристически актуализации за Ъглен", eventDescription: "Повтарящи се бележки за сезони, маршрути и местни посетителски насоки.", searchInputName: "търсене", serviceCatalog: "Преживявания в Ъглен" },
  en: { organizationName: "Aglen Tourism", destinationDescription: "Aglen is a quiet village by the Vit River with limestone rocks, caves, village memory, and an AR experience.", pagePlanQuestion: "How should visitors plan this route?", pagePlanAnswer: "Plan an unhurried visit, check weather and access, bring water and walking shoes, and contact Aglen Tourism for current local guidance.", touristTypes: ["Nature travelers", "Cultural travelers", "Families", "Photographers"], localBusinessDescription: "Guided routes, eco-tourism, accommodation, and AR adventure in Aglen.", eventName: "Seasonal Aglen travel updates", eventDescription: "Recurring seasonal notes, route updates, and local visitor guidance.", searchInputName: "search", serviceCatalog: "Aglen Experiences" },
  de: { organizationName: "Aglen Tourismus", destinationDescription: "Aglen ist ein stilles Dorf am Vit mit Kalksteinfelsen, Höhlen, Dorfgedächtnis und AR-Erlebnis.", pagePlanQuestion: "Wie sollten Besucher diese Route planen?", pagePlanAnswer: "Plane einen ruhigen Besuch, prüfe Wetter und Zugang, bring Wasser und Wanderschuhe mit und frage nach aktuellen lokalen Hinweisen.", touristTypes: ["Naturreisende", "Kulturreisende", "Familien", "Fotografen"], localBusinessDescription: "Geführte Routen, Ökotourismus, Unterkunft und AR-Abenteuer in Aglen.", eventName: "Saisonale Reiseupdates für Aglen", eventDescription: "Wiederkehrende saisonale Hinweise, Routenupdates und lokale Besucherinformationen.", searchInputName: "suche", serviceCatalog: "Aglen-Erlebnisse" },
  fr: { organizationName: "Tourisme Aglen", destinationDescription: "Aglen est un village calme près de la Vit, avec rochers calcaires, grottes, mémoire villageoise et expérience AR.", pagePlanQuestion: "Comment planifier cet itinéraire ?", pagePlanAnswer: "Prévoyez une visite lente, vérifiez météo et accès, apportez eau et chaussures de marche, et demandez les conseils locaux actuels.", touristTypes: ["Voyageurs nature", "Voyageurs culturels", "Familles", "Photographes"], localBusinessDescription: "Itinéraires guidés, écotourisme, hébergement et aventure AR à Aglen.", eventName: "Mises à jour saisonnières Aglen", eventDescription: "Notes saisonnières, mises à jour de routes et conseils locaux pour visiteurs.", searchInputName: "recherche", serviceCatalog: "Expériences Aglen" },
  es: { organizationName: "Turismo Aglen", destinationDescription: "Aglen es un pueblo tranquilo junto al Vit con rocas calizas, cuevas, memoria local y experiencia AR.", pagePlanQuestion: "¿Cómo planificar esta ruta?", pagePlanAnswer: "Planifica una visita sin prisa, revisa clima y acceso, lleva agua y calzado cómodo, y consulta orientación local actual.", touristTypes: ["Viajeros de naturaleza", "Viajeros culturales", "Familias", "Fotógrafos"], localBusinessDescription: "Rutas guiadas, ecoturismo, alojamiento y aventura AR en Aglen.", eventName: "Actualizaciones estacionales de Aglen", eventDescription: "Notas de temporada, cambios de rutas y orientación local para visitantes.", searchInputName: "búsqueda", serviceCatalog: "Experiencias Aglen" },
  it: { organizationName: "Turismo Aglen", destinationDescription: "Aglen è un villaggio tranquillo sul Vit con rocce calcaree, grotte, memoria locale ed esperienza AR.", pagePlanQuestion: "Come pianificare questo percorso?", pagePlanAnswer: "Pianifica una visita senza fretta, controlla meteo e accesso, porta acqua e scarpe comode, e chiedi indicazioni locali aggiornate.", touristTypes: ["Viaggiatori natura", "Viaggiatori culturali", "Famiglie", "Fotografi"], localBusinessDescription: "Percorsi guidati, ecoturismo, alloggi e avventura AR ad Aglen.", eventName: "Aggiornamenti stagionali di Aglen", eventDescription: "Note stagionali, aggiornamenti dei percorsi e indicazioni locali per visitatori.", searchInputName: "ricerca", serviceCatalog: "Esperienze Aglen" },
  ro: { organizationName: "Turism Aglen", destinationDescription: "Aglen este un sat liniștit lângă Vit, cu stânci calcaroase, peșteri, memorie locală și experiență AR.", pagePlanQuestion: "Cum se planifică acest traseu?", pagePlanAnswer: "Planifică o vizită fără grabă, verifică vremea și accesul, adu apă și încălțăminte bună și cere ghidaj local actual.", touristTypes: ["Călători de natură", "Călători culturali", "Familii", "Fotografi"], localBusinessDescription: "Trasee ghidate, ecoturism, cazare și aventură AR în Aglen.", eventName: "Actualizări sezoniere Aglen", eventDescription: "Note sezoniere, actualizări de trasee și îndrumări locale pentru vizitatori.", searchInputName: "căutare", serviceCatalog: "Experiențe Aglen" },
  tr: { organizationName: "Aglen Turizmi", destinationDescription: "Aglen, Vit Nehri yanında kireçtaşı kayaları, mağaraları, köy belleği ve AR deneyimi olan sakin bir köydür.", pagePlanQuestion: "Bu rota nasıl planlanmalı?", pagePlanAnswer: "Acele etmeyen bir ziyaret planla, hava ve erişimi kontrol et, su ve yürüyüş ayakkabısı getir, güncel yerel bilgi iste.", touristTypes: ["Doğa gezginleri", "Kültür gezginleri", "Aileler", "Fotoğrafçılar"], localBusinessDescription: "Aglen'de rehberli rotalar, ekoturizm, konaklama ve AR macerası.", eventName: "Aglen sezonluk seyahat güncellemeleri", eventDescription: "Sezon notları, rota güncellemeleri ve yerel ziyaretçi yönlendirmeleri.", searchInputName: "arama", serviceCatalog: "Aglen Deneyimleri" },
  el: { organizationName: "Τουρισμός Aglen", destinationDescription: "Το Aglen είναι ήσυχο χωριό στον Vit με ασβεστολιθικά βράχια, σπήλαια, τοπική μνήμη και εμπειρία AR.", pagePlanQuestion: "Πώς να σχεδιαστεί αυτή η διαδρομή;", pagePlanAnswer: "Σχεδιάστε ήρεμη επίσκεψη, ελέγξτε καιρό και πρόσβαση, φέρτε νερό και παπούτσια πεζοπορίας και ζητήστε τοπικές οδηγίες.", touristTypes: ["Ταξιδιώτες φύσης", "Πολιτιστικοί ταξιδιώτες", "Οικογένειες", "Φωτογράφοι"], localBusinessDescription: "Καθοδηγούμενες διαδρομές, οικοτουρισμός, διαμονή και AR περιπέτεια στο Aglen.", eventName: "Εποχικές ενημερώσεις Aglen", eventDescription: "Εποχικές σημειώσεις, ενημερώσεις διαδρομών και τοπική καθοδήγηση επισκεπτών.", searchInputName: "αναζήτηση", serviceCatalog: "Εμπειρίες Aglen" },
  ru: { organizationName: "Туризм Аглена", destinationDescription: "Аглен — тихое село у Вита с известняковыми скалами, пещерами, местной памятью и AR-опытом.", pagePlanQuestion: "Как планировать этот маршрут?", pagePlanAnswer: "Планируйте спокойный визит, проверьте погоду и доступ, возьмите воду и удобную обувь, запросите актуальные местные советы.", touristTypes: ["Любители природы", "Культурные путешественники", "Семьи", "Фотографы"], localBusinessDescription: "Маршруты с проводником, экотуризм, жильё и AR-приключение в Аглене.", eventName: "Сезонные обновления Аглена", eventDescription: "Сезонные заметки, обновления маршрутов и местные советы для посетителей.", searchInputName: "поиск", serviceCatalog: "Впечатления Аглена" },
  ja: { organizationName: "アグレン観光", destinationDescription: "アグレンはヴィト川沿いの静かな村で、石灰岩、洞窟、村の記憶、AR体験があります。", pagePlanQuestion: "このルートはどう計画すべきですか？", pagePlanAnswer: "急がない訪問を計画し、天気とアクセスを確認し、水と歩きやすい靴を持ち、最新の現地情報を問い合わせてください。", touristTypes: ["自然旅行者", "文化旅行者", "家族", "写真家"], localBusinessDescription: "アグレンのガイド付きルート、エコツーリズム、宿泊、ARアドベンチャー。", eventName: "アグレン季節更新", eventDescription: "季節メモ、ルート更新、訪問者向け現地ガイダンス。", searchInputName: "検索", serviceCatalog: "アグレン体験" },
  sr: { organizationName: "Туризам Аглен", destinationDescription: "Аглен је тихо село крај Вита са кречњачким стенама, пећинама, сеоским памћењем и AR искуством.", pagePlanQuestion: "Како планирати ову руту?", pagePlanAnswer: "Планирај мирну посету, провери време и приступ, понеси воду и удобну обућу и питај за актуелне локалне смернице.", touristTypes: ["Путници природе", "Културни путници", "Породице", "Фотографи"], localBusinessDescription: "Вођене руте, екотуризам, смештај и AR авантура у Аглену.", eventName: "Сезонска ажурирања Аглена", eventDescription: "Сезонске белешке, измене рута и локалне смернице за посетиоце.", searchInputName: "претрага", serviceCatalog: "Искуства у Аглену" },
  zh: { organizationName: "阿格伦旅游", destinationDescription: "阿格伦是维特河畔的安静村庄，拥有石灰岩、洞穴、村庄记忆和 AR 体验。", pagePlanQuestion: "访客应如何规划这条路线？", pagePlanAnswer: "安排从容访问，确认天气和通行，带水和适合步行的鞋，并咨询最新本地指引。", touristTypes: ["自然旅行者", "文化旅行者", "家庭", "摄影者"], localBusinessDescription: "阿格伦的导览路线、生态旅游、住宿和 AR 冒险。", eventName: "阿格伦季节旅行更新", eventDescription: "季节提示、路线更新和本地访客指引。", searchInputName: "搜索", serviceCatalog: "阿格伦体验" },
  hu: { organizationName: "Aglen Turizmus", destinationDescription: "Aglen csendes falu a Vit folyónál mészkősziklákkal, barlangokkal, falusi emlékezettel és AR-élménnyel.", pagePlanQuestion: "Hogyan érdemes ezt az útvonalat tervezni?", pagePlanAnswer: "Tervezz nyugodt látogatást, ellenőrizd az időjárást és hozzáférést, hozz vizet és túracipőt, és kérj aktuális helyi útmutatást.", touristTypes: ["Természetjárók", "Kulturális utazók", "Családok", "Fotósok"], localBusinessDescription: "Vezetett útvonalak, ökoturizmus, szállás és AR-kaland Aglenben.", eventName: "Szezonális Aglen utazási frissítések", eventDescription: "Szezonális jegyzetek, útvonalfrissítések és helyi látogatói útmutatás.", searchInputName: "keresés", serviceCatalog: "Aglen élmények" },
};

function absoluteRouteUrl(lang: LanguageCode, routeId: RouteId): string {
  return `${SITE_URL}${buildRoutePath(lang, routeId)}`;
}

function absoluteAssetUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

function compact(value: string, max = 158): string {
  return value.length <= max ? value : `${value.slice(0, max - 1).trim()}…`;
}

function routeText(lang: LanguageCode, routeId: RouteId): { title: string; description: string } {
  const copy = contentByLanguage[lang];
  const ui = uiTextByLanguage[lang];
  const landing = isLandingPageId(routeId) ? getLandingPage(lang, routeId) : undefined;
  if (landing) return { title: landing.title, description: landing.metaDescription };

  const trust = Object.fromEntries(ui.trustLinks.map((link) => [link.routeId, link.label]));
  const core: Record<CoreRouteId, { title: string; description: string }> = {
    home: { title: `${copy.hero.subtitle} | ${copy.nav.quests}`, description: copy.hero.lede },
    pillars: { title: `${copy.about.title} | ${copy.brand.name}`, description: `${copy.about.text} ${copy.legends.text}` },
    attractions: { title: `${copy.landmarks.title} | ${copy.brand.name}`, description: copy.landmarks.text },
    activities: { title: `${copy.experiences.title} | ${copy.brand.name}`, description: copy.experiences.text },
    fishing: { title: `${copy.guides.fishing.label} | ${copy.brand.name}`, description: copy.guides.fishing.text },
    hiking: { title: `${copy.guides.hiking.label} | ${copy.brand.name}`, description: copy.guides.hiking.text },
    caves: { title: `${copy.guides.caves.label} | ${copy.brand.name}`, description: copy.guides.caves.text },
    vitRiver: { title: `${copy.guides.vitRiver.label} | ${copy.brand.name}`, description: copy.guides.vitRiver.text },
    food: { title: `${copy.guides.food.label} | ${copy.brand.name}`, description: copy.guides.food.text },
    nearby: { title: `${copy.guides.nearby.label} | ${copy.brand.name}`, description: copy.guides.nearby.text },
    geo: { title: `${copy.landmarks.aria} | ${copy.brand.name}`, description: `${copy.hero.meta}. ${copy.landmarks.text}` },
    stay: { title: `${copy.stay.title} | ${copy.brand.name}`, description: copy.stay.text },
    quests: { title: `${copy.quests.title} | ${copy.brand.name}`, description: copy.quests.text },
    app: { title: `${copy.app.title} | ${copy.brand.name}`, description: copy.app.text },
    travelGuide: { title: `${copy.hub.title} | ${copy.brand.name}`, description: copy.hub.text },
    seasonal: { title: `${copy.guides.seasonal.label} | ${copy.brand.name}`, description: copy.guides.seasonal.text },
    events: { title: `${trust.events} | ${copy.brand.name}`, description: copy.hub.text },
    trust: { title: `${trust.trust} | ${copy.brand.name}`, description: copy.sourceNotes.join(" ") },
    editorial: { title: `${trust.editorial} | ${copy.brand.name}`, description: copy.sourceNotes.join(" ") },
    localSeo: { title: `${trust.localSeo} | ${copy.brand.name}`, description: copy.landmarks.aria },
    crawlerPolicy: { title: `${trust.crawlerPolicy} | ${copy.brand.name}`, description: copy.hub.text },
    contact: { title: `${copy.contact.title} | ${copy.brand.name}`, description: copy.contact.text },
  };

  return core[routeId as CoreRouteId];
}

function keywordsForRoute(lang: LanguageCode, routeId: RouteId): string {
  const copy = contentByLanguage[lang];
  const landing = isLandingPageId(routeId) ? getLandingPage(lang, routeId) : undefined;
  const base = [
    copy.brand.name,
    copy.hero.subtitle,
    copy.guides.vitRiver.label,
    copy.guides.hiking.label,
    copy.guides.nearby.label,
    copy.nav.quests,
  ];

  if (landing) {
    return [...base, ...landing.keywords, ...landing.secondaryKeywords, ...landing.bulgarianKeywords].join(", ");
  }

  const text = routeText(lang, routeId);
  return [...base, text.title, text.description].join(", ");
}

export function getSEOConfig(lang: LanguageCode, routeId: RouteId = "home"): SEOConfig {
  const text = routeText(lang, routeId);
  const primaryImage = getRouteImageEntries(lang, routeId)[0];

  return {
    title: text.title,
    description: compact(text.description),
    locale: localeCodes[lang],
    keywords: keywordsForRoute(lang, routeId),
    author: seoTextByLanguage[lang].organizationName,
    siteName: contentByLanguage[lang].nav.quests,
    imageUrl: primaryImage?.loc ?? OG_IMAGE,
    imageAlt: primaryImage?.caption ?? contentByLanguage[lang].hero.imageAlt,
    canonicalUrl: absoluteRouteUrl(lang, routeId),
    alternates: [
      { lang: "x-default", href: absoluteRouteUrl(DEFAULT_LANGUAGE, routeId) },
      ...allLanguageCodes.map((code) => ({ lang: code, href: absoluteRouteUrl(code, routeId) })),
    ],
    ogLocaleAlternates: allLanguageCodes.filter((code) => code !== lang).map((code) => localeCodes[code]),
  };
}

function routeImages(lang: LanguageCode, routeId: RouteId): ImageSitemapEntry[] {
  const copy = contentByLanguage[lang];
  const landing = isLandingPageId(routeId) ? getLandingPage(lang, routeId) : undefined;
  if (landing) {
    return [
      { loc: absoluteAssetUrl(landing.image), title: landing.h1, caption: landing.imageAlt },
      { loc: OG_IMAGE, title: copy.hero.title, caption: copy.hero.imageAlt },
    ];
  }

  const text = routeText(lang, routeId);
  const gallery = copy.galleryItems;
  const pool = copy.placesList[3];
  const cave = copy.mysteries[1];
  const church = copy.placesList[4];
  const byRoute: Record<CoreRouteId, ImageSitemapEntry[]> = {
    home: [{ loc: OG_IMAGE, title: copy.hero.title, caption: copy.hero.imageAlt }, ...gallery.map((item) => ({ loc: absoluteAssetUrl(item.image), title: item.title, caption: item.alt }))],
    pillars: copy.mysteries.map((item) => ({ loc: absoluteAssetUrl(item.image), title: item.title, caption: item.description })),
    attractions: copy.placesList.map((place) => ({ loc: absoluteAssetUrl(place.image), title: place.title, caption: place.imageAlt || place.description })),
    activities: copy.experiencesList.slice(0, 4).map((experience, index) => ({ loc: [OG_IMAGE, `${SITE_URL}/assets/aglen-river-pool.png`, `${SITE_URL}/assets/aglen-rock-arch.png`, `${SITE_URL}/assets/aglen-aerial-river.png`][index], title: experience.title, caption: experience.description })),
    fishing: [{ loc: `${SITE_URL}/assets/aglen-river-pool.png`, title: copy.guides.fishing.label, caption: copy.guides.fishing.text }],
    hiking: [{ loc: OG_IMAGE, title: copy.guides.hiking.label, caption: copy.guides.hiking.text }],
    caves: [{ loc: `${SITE_URL}/assets/aglen-cave-mystery.png`, title: copy.guides.caves.label, caption: cave?.description ?? copy.guides.caves.text }],
    vitRiver: [{ loc: OG_IMAGE, title: copy.guides.vitRiver.label, caption: pool?.description ?? copy.guides.vitRiver.text }],
    food: [{ loc: `${SITE_URL}/assets/aglen-village-church.png`, title: copy.guides.food.label, caption: copy.guides.food.text }],
    nearby: [{ loc: `${SITE_URL}/assets/aglen-aerial-river.png`, title: copy.guides.nearby.label, caption: copy.guides.nearby.text }],
    geo: [{ loc: `${SITE_URL}/assets/aglen-aerial-river.png`, title: copy.landmarks.aria, caption: copy.hero.meta }],
    stay: copy.accommodationList.map((item) => ({ loc: absoluteAssetUrl(item.image), title: item.title, caption: item.description })),
    quests: [{ loc: OG_IMAGE, title: copy.quests.title, caption: copy.quests.text }, { loc: `${SITE_URL}/assets/aglen-cave-mystery.png`, title: copy.ar.title, caption: copy.ar.text }],
    app: [{ loc: OG_IMAGE, title: copy.app.title, caption: copy.app.text }],
    travelGuide: [{ loc: OG_IMAGE, title: copy.hub.title, caption: copy.hub.text }],
    seasonal: [{ loc: `${SITE_URL}/assets/aglen-aerial-river.png`, title: copy.guides.seasonal.label, caption: copy.guides.seasonal.text }],
    events: [{ loc: `${SITE_URL}/assets/aglen-village-church.png`, title: routeText(lang, "events").title, caption: copy.hub.text }],
    trust: [{ loc: `${SITE_URL}/assets/aglen-village-church.png`, title: routeText(lang, "trust").title, caption: copy.sourceNotes.join(" ") }],
    editorial: [{ loc: `${SITE_URL}/assets/aglen-village-church.png`, title: routeText(lang, "editorial").title, caption: copy.sourceNotes.join(" ") }],
    localSeo: [{ loc: `${SITE_URL}/assets/aglen-village-church.png`, title: routeText(lang, "localSeo").title, caption: copy.landmarks.aria }],
    crawlerPolicy: [{ loc: OG_IMAGE, title: routeText(lang, "crawlerPolicy").title, caption: copy.hub.text }],
    contact: [{ loc: `${SITE_URL}/assets/aglen-village-church.png`, title: copy.contact.title, caption: copy.contact.text }],
  };

  return byRoute[routeId as CoreRouteId] ?? [{ loc: OG_IMAGE, title: text.title, caption: text.description }];
}

export function getRouteImageEntries(lang: LanguageCode, routeId: RouteId = "home"): ImageSitemapEntry[] {
  const seen = new Set<string>();
  return routeImages(lang, routeId).filter((entry) => {
    if (seen.has(entry.loc)) return false;
    seen.add(entry.loc);
    return true;
  });
}

function buildPageSpecificSchemas(lang: LanguageCode, routeId: RouteId, routeUrl: string): object[] {
  const copy = contentByLanguage[lang];
  const seoText = seoTextByLanguage[lang];
  const meta = getSEOConfig(lang, routeId);
  const images = getRouteImageEntries(lang, routeId);
  const landing = isLandingPageId(routeId) ? getLandingPage(lang, routeId) : undefined;
  const imageObjects = images.map((image, index) => ({
    "@type": "ImageObject",
    "@id": `${routeUrl}#image-${index + 1}`,
    url: image.loc,
    name: image.title,
    caption: image.caption,
  }));
  const isGuidePage = Boolean(landing) || routeId !== "home";

  const schemas: object[] = [
    ...imageObjects,
    {
      "@type": "TouristDestination",
      "@id": `${routeUrl}#destination`,
      name: meta.title,
      description: meta.description,
      url: routeUrl,
      inLanguage: lang,
      image: images.map((image) => image.loc),
      touristType: seoText.touristTypes,
      geo: { "@type": "GeoCoordinates", latitude: 43.267, longitude: 24.221 },
      containsPlace: copy.placesList.map((place) => ({ "@type": "TouristAttraction", name: place.title, description: place.description, image: absoluteAssetUrl(place.image) })),
    },
    {
      "@type": "FAQPage",
      "@id": `${routeUrl}#page-faq`,
      mainEntity: [
        { "@type": "Question", name: `${seoText.pagePlanQuestion} ${meta.title}`, acceptedAnswer: { "@type": "Answer", text: seoText.pagePlanAnswer } },
        { "@type": "Question", name: copy.contact.notesTitle, acceptedAnswer: { "@type": "Answer", text: `${copy.contact.noteOne} ${copy.contact.noteTwo}` } },
      ],
    },
  ];

  if (isGuidePage) {
    schemas.push({
      "@type": landing?.schemaType ?? "Article",
      "@id": `${routeUrl}#article`,
      headline: landing?.h1 ?? meta.title,
      description: meta.description,
      image: images.map((image) => image.loc),
      author: { "@type": "Organization", name: seoText.organizationName },
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntityOfPage: routeUrl,
      datePublished: "2026-05-30",
      dateModified: "2026-05-30",
      inLanguage: lang,
    });
  }

  if (landing?.faqs.length) {
    schemas.push({
      "@type": "FAQPage",
      "@id": `${routeUrl}#faq`,
      mainEntity: landing.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
    });
  }

  if (routeId === "events" || routeId === "seasonal") {
    schemas.push({
      "@type": "Event",
      "@id": `${routeUrl}#seasonal-visit-window`,
      name: seoText.eventName,
      description: seoText.eventDescription,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      startDate: "2026-06-01",
      endDate: "2026-12-31",
      location: { "@type": "Place", name: copy.brand.name, address: { "@type": "PostalAddress", addressLocality: "Ъглен", addressRegion: "Lovech", addressCountry: "BG" } },
      organizer: { "@id": `${SITE_URL}/#organization` },
      image: images.map((image) => image.loc),
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

export function buildJSONLD(lang: LanguageCode, routeId: RouteId = "home"): object {
  const meta = getSEOConfig(lang, routeId);
  const copy = contentByLanguage[lang];
  const seoText = seoTextByLanguage[lang];
  const homeUrl = absoluteRouteUrl(lang, "home");
  const routeUrl = meta.canonicalUrl;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: seoText.organizationName,
        alternateName: [copy.brand.name, "Hidden Bulgaria Quests"],
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: OG_IMAGE, width: 1200, height: 630 },
        contactPoint: { "@type": "ContactPoint", contactType: copy.contact.cta, email: "info.aglen@gmail.com", availableLanguage: languages.map((language) => language.label) },
        address: { "@type": "PostalAddress", streetAddress: "село Ъглен", addressLocality: "Ъглен", addressRegion: "Lovech", postalCode: "5562", addressCountry: "BG" },
        sameAs: [APP_PLAY_URL],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: homeUrl,
        name: meta.title,
        description: meta.description,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: allLanguageCodes,
        potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: `${homeUrl}?search={search_term_string}` }, "query-input": `required name=${seoText.searchInputName}` },
      },
      {
        "@type": "WebPage",
        "@id": routeUrl,
        url: routeUrl,
        name: meta.title,
        description: meta.description,
        inLanguage: lang,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#aglen-village` },
        primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE, width: 1200, height: 630 },
      },
      ...buildPageSpecificSchemas(lang, routeId, routeUrl),
      {
        "@type": ["TouristAttraction", "Place"],
        "@id": `${SITE_URL}/#aglen-village`,
        name: copy.brand.name,
        alternateName: ["Ъглен", "Aglen", "Uglen"],
        description: seoText.destinationDescription,
        url: homeUrl,
        image: [`${SITE_URL}/assets/aglen-hero-river-canyon.png`, `${SITE_URL}/assets/aglen-rock-arch.png`, `${SITE_URL}/assets/aglen-aerial-river.png`, `${SITE_URL}/assets/aglen-kaleto-ruins.png`, `${SITE_URL}/assets/aglen-village-church.png`],
        geo: { "@type": "GeoCoordinates", latitude: 43.267, longitude: 24.221 },
        address: { "@type": "PostalAddress", addressLocality: "Ъглен", addressRegion: "Lovech", addressCountry: "BG" },
        containedInPlace: { "@type": "AdministrativeArea", name: "Lovech", addressCountry: "BG" },
        touristType: seoText.touristTypes,
        amenityFeature: [
          ...copy.placesList.slice(0, 4).map((place) => ({ "@type": "LocationFeatureSpecification", name: place.title, value: true })),
          ...copy.experiencesList.slice(0, 4).map((experience) => ({ "@type": "LocationFeatureSpecification", name: experience.title, value: true })),
        ],
        hasMap: "https://maps.google.com/?q=Aglen+Bulgaria+Lovech",
        publicAccess: true,
      },
      {
        "@type": "MobileApplication",
        "@id": `${SITE_URL}/#hidden-bulgaria-quests`,
        name: "Hidden Bulgaria Quests",
        alternateName: "Hidden Bulgaria Quests AR",
        description: copy.app.text,
        url: APP_PLAY_URL,
        downloadUrl: APP_PLAY_URL,
        applicationCategory: "TravelApplication",
        applicationSubCategory: "Augmented Reality Tourism",
        operatingSystem: "Android",
        screenshot: OG_IMAGE,
        featureList: [...copy.ar.steps, ...copy.quests.features.map((feature) => feature.title)],
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: allLanguageCodes,
        isAccessibleForFree: true,
        availableOnDevice: "Mobile",
      },
      {
        "@type": ["LocalBusiness", "TouristInformationCenter"],
        "@id": `${SITE_URL}/#aglen-tourism-business`,
        name: seoText.organizationName,
        description: seoText.localBusinessDescription,
        url: SITE_URL,
        email: "info.aglen@gmail.com",
        image: OG_IMAGE,
        address: { "@type": "PostalAddress", addressLocality: "Ъглен", addressRegion: "Lovech", addressCountry: "BG" },
        geo: { "@type": "GeoCoordinates", latitude: 43.267, longitude: 24.221 },
        openingHours: "Mo-Su 08:00-20:00",
        paymentAccepted: "Cash",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: seoText.serviceCatalog,
          itemListElement: copy.experiencesList.map((experience) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: experience.title, description: `${experience.description} ${experience.duration}.` },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
          { "@type": "Question", name: copy.contact.notesTitle, acceptedAnswer: { "@type": "Answer", text: `${copy.contact.noteOne} ${copy.contact.noteTwo}` } },
          { "@type": "Question", name: copy.quests.title, acceptedAnswer: { "@type": "Answer", text: copy.quests.text } },
          { "@type": "Question", name: copy.landmarks.title, acceptedAnswer: { "@type": "Answer", text: copy.landmarks.text } },
          { "@type": "Question", name: copy.stay.title, acceptedAnswer: { "@type": "Answer", text: copy.stay.text } },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumbs`,
        itemListElement: routeId === "home"
          ? [{ "@type": "ListItem", position: 1, name: copy.nav.home, item: homeUrl }]
          : [{ "@type": "ListItem", position: 1, name: copy.nav.home, item: homeUrl }, { "@type": "ListItem", position: 2, name: meta.title, item: routeUrl }],
      },
    ],
  };
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function paragraph(text: string): string {
  return `<p>${escapeHtml(text)}</p>`;
}

function staticFallbackLink(lang: LanguageCode, label: string, routeId: RouteId): string {
  return `<a href="${buildRoutePath(lang, routeId)}">${escapeHtml(label)}</a>`;
}

export function renderStaticFallback(lang: LanguageCode, routeId: RouteId = "home"): string {
  const copy = contentByLanguage[lang];
  const meta = getSEOConfig(lang, routeId);
  const landing = isLandingPageId(routeId) ? getLandingPage(lang, routeId) : undefined;
  const ui = uiTextByLanguage[lang];

  if (landing) {
    return `
      <main id="static-seo-content" class="static-fallback" lang="${lang}">
        <article class="seo-landing section-shell">
          <div class="seo-landing-panel">
            <div class="seo-landing-hero">
              <div>
                <p class="eyebrow">${escapeHtml(landing.category)}</p>
                <h1>${escapeHtml(landing.h1)}</h1>
                ${paragraph(landing.intro)}
                <div class="seo-landing-actions">
                  <a class="button primary" href="${buildRoutePath(lang, "contact")}">${escapeHtml(landing.ctaLabel)}</a>
                  <a class="button ghost" href="${buildRoutePath(lang, "routeMap")}">${escapeHtml(ui.landing.routeMap)}</a>
                </div>
              </div>
              <img src="${landing.image}" alt="${escapeHtml(landing.imageAlt)}" loading="eager" />
            </div>
            <div class="seo-section-grid">
              ${landing.sections.map((section) => `<section class="seo-section-card"><h2>${escapeHtml(section.heading)}</h2>${paragraph(section.body)}</section>`).join("")}
            </div>
            <div class="seo-faq-links">
              <div class="seo-faq">
                <p class="eyebrow">${escapeHtml(ui.landing.visitorAnswers)}</p>
                <h2>${escapeHtml(ui.landing.visitorAnswers)}</h2>
                ${landing.faqs.map((faq) => `<details open><summary>${escapeHtml(faq.question)}</summary>${paragraph(faq.answer)}</details>`).join("")}
              </div>
              <aside class="seo-related" aria-label="${escapeHtml(ui.landing.relatedGuidesAria)}">
                <p class="eyebrow">${escapeHtml(ui.landing.internalLinks)}</p>
                <h2>${escapeHtml(ui.landing.relatedGuides)}</h2>
                ${landing.internalLinks.map((link) => staticFallbackLink(lang, link.label, link.routeId as RouteId)).join("")}
              </aside>
            </div>
          </div>
        </article>
      </main>
    `;
  }

  const routeLists: Partial<Record<CoreRouteId, string[]>> = {
    home: copy.highlights.map((item) => `${item.value}: ${item.detail}`),
    pillars: copy.timeline.map((item) => `${item.title}: ${item.detail}`),
    attractions: copy.placesList.map((place) => `${place.title}: ${place.description}`),
    activities: copy.experiencesList.map((experience) => `${experience.title}: ${experience.duration}, ${experience.bestFor}. ${experience.description}`),
    fishing: [copy.guides.fishing.text, copy.experiencesList[2]?.description ?? copy.experiences.text],
    hiking: [copy.guides.hiking.text, ...copy.mapStops.map((stop) => `${stop.title}: ${stop.detail}`)],
    caves: [copy.guides.caves.text, ...copy.mysteries.map((item) => `${item.title}: ${item.description}`)],
    vitRiver: [copy.guides.vitRiver.text, copy.placesList[3]?.description ?? copy.landmarks.text],
    food: [copy.guides.food.text],
    nearby: [copy.guides.nearby.text],
    geo: copy.mapStops.map((stop) => `${stop.title}: ${stop.detail}`),
    stay: copy.accommodationList.map((item) => `${item.title}: ${item.description}`),
    quests: copy.quests.features.map((feature) => `${feature.title}: ${feature.text}`),
    app: [...copy.ar.steps, copy.app.note],
    travelGuide: [copy.hub.text],
    seasonal: [copy.guides.seasonal.text],
    events: [copy.hub.text],
    trust: copy.sourceNotes,
    editorial: copy.sourceNotes,
    localSeo: [copy.landmarks.aria],
    crawlerPolicy: [copy.hub.text],
    contact: [copy.contact.noteOne, copy.contact.noteTwo],
  };

  return `
    <main id="static-seo-content" class="static-fallback" lang="${lang}">
      <article class="content-hub section-shell">
        <div class="section-heading">
          <p class="eyebrow">${escapeHtml(copy.brand.name)} - ${escapeHtml(copy.brand.subtitle)}</p>
          <h1>${escapeHtml(meta.title)}</h1>
          ${paragraph(meta.description)}
        </div>
        <div class="hub-grid">
          ${(routeLists[routeId as CoreRouteId] ?? [meta.description]).map((item) => `<div class="hub-card"><span>${escapeHtml(item)}</span></div>`).join("")}
        </div>
      </article>
    </main>
  `;
}

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
  getSEOConfig(lang, routeId).alternates.forEach((alternate) => {
    const link = document.createElement("link");
    link.rel = "alternate";
    link.setAttribute("hreflang", alternate.lang);
    link.href = alternate.href;
    document.head.appendChild(link);
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
  el.textContent = JSON.stringify(data);
}

export function updateDocumentSEO(lang: LanguageCode, routeId: RouteId = "home"): void {
  const meta = getSEOConfig(lang, routeId);
  const copy = contentByLanguage[lang];

  document.title = meta.title;
  setMeta("description", meta.description);
  setMeta("keywords", meta.keywords);
  setMeta("author", meta.author);
  setMeta("robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
  setMeta("googlebot", "index, follow");
  setMeta("og:type", "website", true);
  setMeta("og:site_name", meta.siteName, true);
  setMeta("og:url", meta.canonicalUrl, true);
  setMeta("og:title", meta.title, true);
  setMeta("og:description", meta.description, true);
  setMeta("og:image", meta.imageUrl, true);
  setMeta("og:image:url", meta.imageUrl, true);
  setMeta("og:image:secure_url", meta.imageUrl, true);
  setMeta("og:image:width", OG_IMAGE_WIDTH, true);
  setMeta("og:image:height", OG_IMAGE_HEIGHT, true);
  setMeta("og:image:alt", meta.imageAlt, true);
  setMeta("og:image:type", "image/png", true);
  setMeta("og:locale", meta.locale, true);
  setOpenGraphLocaleAlternates(meta.ogLocaleAlternates);
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:site", "@hiddenBulgaria");
  setMeta("twitter:title", meta.title);
  setMeta("twitter:description", meta.description);
  setMeta("twitter:image", meta.imageUrl);
  setMeta("twitter:image:alt", meta.imageAlt);
  setCanonical(meta.canonicalUrl);
  setHreflangLinks(lang, routeId);
  injectJSONLD(buildJSONLD(lang, routeId));
}
