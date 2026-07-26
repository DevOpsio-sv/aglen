import { contentByLanguage, languages } from "./content";
import { localize, sortedEvents } from "./events";
import { getLandingPage, isLandingPageId } from "./landingPages";
import type { LanguageCode, PageCopy, PlaceId } from "./locales/types";
import { allLanguageCodes, buildBusinessPath, buildGuidePath, buildRoutePath, DEFAULT_LANGUAGE, type CoreRouteId, type RouteId } from "./routes";
import { findBusiness, localizeText, mapUrl, publishedBusinesses } from "./localBusinesses";
import { businessesUiByLanguage, categoryLabel as businessCategoryLabel } from "./localBusinessesUi";
import { findGuide, guidePlaces, guides, localizeGuide, readingMinutes } from "./guides";
import { guidesUiByLanguage } from "./guidesUi";
import type { BusinessCategory, LocalBusiness } from "./locales/types";
import { uiTextByLanguage } from "./uiText";
import { imageAttributes, imageSize, webpSrc } from "./images";
import {
  AGLEN,
  LOVECH_PROVINCE,
  distanceFromAglenKm,
  regionName,
  regionNote,
  regionPlaces,
  sameAsUrls,
} from "./region";
import { fontFaces } from "./generated/fontManifest";
import { routeHasOwnSections } from "./pageSections";
import { localizeTrust, trustPageByRoute } from "./trustPages";
import { buildAspectPath, buildPlacePath, buildSourcePath } from "./routes";
import { aspectCrumb, aspectLede, aspectTitle, namespaceTitle, NAMESPACE_CHROME, PROVENANCE_CHROME, SOURCE_CHROME, localizeChrome, type NamespaceKind } from "./graph/namespaces";
import {
  breadcrumbTrail,
  derivedLinks,
  entityById,
  entityBySlug,
  entityName,
  entityPoint,
  entityShortText,
  entityLongText,
  entitySameAs,
  namespaceEntities,
} from "./graph";
import {
  aspectPagesFor,
  claimStatement,
  claimsFor,
  claimsForAspect,
  claimsInDispute,
  corrections,
  disputeQuestion,
  disputesFor,
  knownClaims,
  lastReviewed,
  liveClaims,
  liveClaimsFromSource,
  sourceBySlug,
  sourceHasPage,
  sourcePages,
  sourceTitle,
  sourceNote,
  sources as ledgerSources,
  sourcesOf,
  trustSignals,
  uncertainClaims,
} from "./graph/ledger";
import type { ClaimAspect } from "./graph/claims";
import type { Entity } from "./graph/schema";
import type { Source } from "./graph/claims";

export const SITE_URL = "https://aglen.bg";

// Social preview. A dedicated 1200×630 JPEG: WebP is still unreliable in the
// Facebook, LinkedIn and WhatsApp scrapers, and the page image is now WebP.
const OG_IMAGE = `${SITE_URL}/assets/og-aglen-default.jpg`;
const OG_IMAGE_PATH = "/assets/og-aglen-default.jpg";
const APP_SITE_URL = "https://unlockingbulgaria.com/bg/";

// Routes that render the same content as a real guide page. They predate the
// /guides/ tree and are kept only so old links resolve: each one canonicalises
// and redirects to its guide, and is excluded from the sitemaps.
// See public/_redirects for the matching 301s.
const legacyGuideRouteIds: Partial<Record<CoreRouteId, string>> = {
  attractions: "beautiful-places",
  vitRiver: "vit-river",
  caves: "caves-and-rocks",
  food: "local-food",
  nearby: "nearby-destinations",
  seasonal: "seasonal-guide",
};

/** The guide a legacy route now duplicates, if any. */
export function supersedingGuideSlug(routeId: RouteId): string | undefined {
  return legacyGuideRouteIds[routeId as CoreRouteId];
}

// ── M1: thin keyword/marketing landing pages retired to an existing page ──────
// Each 301s to a route that returns 200 today (see public/_redirects), renders
// noindex with a canonical + hreflang pointing at that target, and drops from the
// sitemaps. Only existing routes are used as targets; entity, karst and plan
// targets are deferred until those routes exist (M3/M4).
const retiredLandingRouteIds: Partial<Record<RouteId, CoreRouteId>> = {
  visitAglen: "home",
  thingsToDo: "home",
  natureAroundAglen: "home",
  natureTourism: "home",
  ecoTourismBulgaria: "home",
  ruralTourismBulgaria: "home",
  slowTravelBulgaria: "home",
  culturalTourism: "home",
  adventureTourism: "home",
  hiddenPlaces: "geo",
  routeMap: "geo",
  traditionalFood: "localBusinesses",
  accommodationNearAglen: "localBusinesses",
  // M4: an "answer hub" that is not a source ledger is a keyword page. Now that
  // `/sources/` exists it is the honest target (`CONTENT_HIERARCHY.md` §4).
  aiAnswerHub: "sources",
  // ── M2: the two legacy standalone Unlocking Bulgaria pages consolidate into the
  // one local mission hub (ADR-013). Same retirement plumbing: canonical +
  // hreflang → /ar-missions/, noindex, dropped from the sitemaps, 301 in _redirects.
  quests: "arMissions",
  app: "arMissions",
};

/** The existing route a retired landing page now 301s and canonicalises to. */
export function retiredLandingTarget(routeId: RouteId): CoreRouteId | undefined {
  return retiredLandingRouteIds[routeId];
}

// ── M3: the six guide-content landing pages retire onto their entity pages.
// Their subject is a real place, now modelled as a /place/<slug>/ entity, so the
// landing 301s and canonicalises there (see public/_redirects). The pages keep
// serving noindex as a fallback until the redirect applies; the /place/ target
// exists first (sequencing rule), so no URL ever breaks.
const retiredLandingToEntitySlug: Partial<Record<RouteId, string>> = {
  lukovitGuide: "lukovit",
  karlukovoGuide: "karlukovo",
  krushunaGuide: "krushuna-falls",
  devetashkaCaveGuide: "devetashka",
  iskarPanegaGuide: "iskar-panega",
  lovechRegionGuide: "lovech-province",
};

/** The published entity a retired guide-landing page now 301s and canonicalises to. */
export function retiredLandingEntity(routeId: RouteId): Entity | undefined {
  const slug = retiredLandingToEntitySlug[routeId];
  if (!slug) return undefined;
  const entity = entityBySlug(slug);
  return entity && entity.page?.status === "published" ? entity : undefined;
}

// ── M1: travel-planning landing pages kept live but noindex until /plan/* exists.
// No redirect — there is no real target yet — but excluded from the sitemaps and
// marked noindex with a self-referencing canonical. Removed from this set as each
// /plan/* view ships.
const noindexUntilPlanRouteIds = new Set<RouteId>([
  "weekendInAglen",
  "aglenFromSofia",
  "howToGet",
  "familyTrip",
  "bestTime",
  "campingNearAglen",
]);

/**
 * Whether a route may be indexed and advertised in a sitemap.
 *
 * Four kinds of route may not:
 *   • a legacy duplicate of a /guides/ page, which canonicalises and 301s there;
 *   • a retired keyword/marketing landing page, which 301s to an existing page (M1);
 *   • a travel-planning landing page held noindex until its /plan/* view exists (M1);
 *   • a route whose only section is switched off by a feature flag, which would
 *     otherwise ship an empty page (SHOW_EXPERIENCES and SHOW_STAY are both off,
 *     so /activities/ and /stay/ currently render nothing of their own).
 */
/**
 * Routes that render the knowledge tier — the graph and its ledger rather than
 * crops of the home page. Constitution rule 43 restricts the knowledge tier to
 * `bg` and `en`: the other twelve languages still get a page so that links
 * resolve, but it is `noindex` and out of the sitemaps until a human has reviewed
 * the translation. A machine paraphrase of a sourced claim is exactly the thing
 * this system must not publish as authoritative (V8).
 */
const KNOWLEDGE_TIER_ROUTES = new Set<RouteId>(["history", "legend", "person", "sources", "corrections", "source"]);
const KNOWLEDGE_TIER_LANGUAGES = new Set<LanguageCode>(["bg", "en"]);

export function isKnowledgeTierRoute(routeId: RouteId, detailSlug?: string): boolean {
  if (KNOWLEDGE_TIER_ROUTES.has(routeId)) return true;
  // An aspect page beneath /place/ is nothing but claims, so it belongs to the
  // knowledge tier even though its namespace came with M3.
  return Boolean(detailSlug && routeId === "place" && detailSlug.includes("/"));
}

/** Whether this route may be indexed in this language (rule 43). */
export function isIndexableIn(lang: LanguageCode, routeId: RouteId, detailSlug?: string): boolean {
  // A source page exists only where the ledger has earned it: three live claims
  // must rest on the source, exactly as an entity needs three to earn a page
  // (rule 15). A slug that names no such source is not a page and is never
  // advertised — the sitemap is a function of the ledger, not a wish list.
  if (routeId === "source") {
    const source = detailSlug ? sourceBySlug(detailSlug) : undefined;
    if (!source || !sourceHasPage(source.id)) return false;
    return KNOWLEDGE_TIER_LANGUAGES.has(lang);
  }
  if (!isIndexableRoute(routeId)) return false;
  return !isKnowledgeTierRoute(routeId, detailSlug) || KNOWLEDGE_TIER_LANGUAGES.has(lang);
}

export function isIndexableRoute(routeId: RouteId): boolean {
  // The entity namespaces (M3, M4) render graph-derived content, not home-section
  // crops, so they are indexable even though they have no `pageSections` entry.
  // /source/ with no slug is not a page — /sources/ is the index — so the bare
  // route is never advertised; /source/<slug>/ is handled by the caller.
  if (routeId === "source") return false;
  if (routeId === "karst" || routeId === "place" || KNOWLEDGE_TIER_ROUTES.has(routeId)) return true;
  return (
    !supersedingGuideSlug(routeId) &&
    !retiredLandingTarget(routeId) &&
    !retiredLandingEntity(routeId) &&
    !noindexUntilPlanRouteIds.has(routeId) &&
    routeHasOwnSections(routeId)
  );
}

/** Index pages, which schema.org models as CollectionPage rather than WebPage. */
const collectionRouteIds = new Set<RouteId>([
  "guides", "localBusinesses", "events", "travelGuide",
  // The M4 index pages list entities and sources rather than describing one
  // thing, which is exactly what CollectionPage means.
  "history", "legend", "person", "sources", "corrections",
]);

/** Landing pages that describe an itinerary, so they can carry TouristTrip. */
const itineraryRouteIds = new Set<RouteId>(["weekendInAglen", "aglenFromSofia", "routeMap", "howToGet", "familyTrip"]);

function placeById(copy: PageCopy, placeId: PlaceId) {
  return copy.placesList.find((place) => place.id === placeId);
}

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
  author: string;
  siteName: string;
  imageUrl: string;
  imageAlt: string;
  /** Absolute URL of the JPEG/PNG used for social previews. */
  socialImageUrl: string;
  socialImageWidth: number;
  socialImageHeight: number;
  socialImageType: string;
  /** "article" for guides, landing pages and business detail; "website" elsewhere. */
  ogType: "website" | "article";
  /** Robots directive. Duplicate legacy routes are noindex, follow. */
  robots: string;
  canonicalUrl: string;
  alternates: Array<{ lang: string; href: string }>;
  ogLocaleAlternates: string[];
  /** ISO date the page's content last changed, for schema and sitemaps. */
  dateModified: string;
  /** Self-hosted woff2 files worth preloading for this language's script. */
  fontPreloads: string[];
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

function absoluteBusinessUrl(lang: LanguageCode, slug: string): string {
  return `${SITE_URL}${buildBusinessPath(lang, slug)}`;
}

function absoluteGuideUrl(lang: LanguageCode, slug: string): string {
  return `${SITE_URL}${buildGuidePath(lang, slug)}`;
}

// ── Entity pages (M3) ────────────────────────────────────────
// A `/place/<slug>/` page and `/karst/` are rendered from the knowledge graph.
// Title, description, image, canonical, breadcrumb and JSON-LD are all derived
// from the entity — the graph is the source of truth and these are functions of
// it (Constitution rule 1). Prose is transcluded, never re-authored.

/**
 * The entity namespaces (M3's `/place/` plus M4's three). Each addresses its
 * detail pages identically, so one resolver covers all of them and a new
 * namespace needs no new branch here.
 */
const ENTITY_ROUTE_IDS: Partial<Record<RouteId, string>> = {
  place: "/place/",
  history: "/history/",
  legend: "/legend/",
  person: "/person/",
};

/** A detail route's subject: the entity, plus the aspect when one is addressed. */
type EntitySubject = { entity: Entity; aspect?: ClaimAspect };

/**
 * Resolve `routeId` + `detailSlug` to the entity a page is about. `detailSlug`
 * is "<slug>" for an entity page and "<slug>/<aspect>" for a depth-3 aspect page;
 * an aspect that the ledger has not earned resolves to the entity itself rather
 * than to a page that does not exist.
 */
function entitySubject(routeId: RouteId, detailSlug?: string): EntitySubject | undefined {
  const prefix = ENTITY_ROUTE_IDS[routeId];
  if (!detailSlug || !prefix) return undefined;
  const [slug, aspectSlug] = detailSlug.split("/");
  const entity = slug ? entityBySlug(slug) : undefined;
  if (!entity || entity.page?.status !== "published" || !entity.page.path.startsWith(prefix)) return undefined;
  if (!aspectSlug) return { entity };
  const aspect = aspectSlug as ClaimAspect;
  return aspectPagesFor(entity.id).some((page) => page.aspect === aspect) ? { entity, aspect } : { entity };
}

/** The published entity a detail route addresses, if any. */
function entityForSlug(routeId: RouteId, slug?: string): Entity | undefined {
  return entitySubject(routeId, slug)?.entity;
}

/**
 * Absolute URL of an entity's page. The graph carries the language-agnostic
 * path, so this covers `/karst/`, `/place/<slug>/`, `/history/<slug>/`,
 * `/legend/<slug>/` and `/person/<slug>/` without a namespace table.
 */
function entityAbsoluteUrl(lang: LanguageCode, entity: Entity, aspect?: ClaimAspect): string {
  if (aspect) return `${SITE_URL}${buildAspectPath(lang, entity.slug, aspect)}`;
  if (!entity.page) return absoluteRouteUrl(lang, "karst");
  return `${SITE_URL}/${lang}${entity.page.path}`;
}

// A representative hero for an entity, reusing an existing asset. E1 places carry
// their own photograph in the locale content; the rest borrow a kind-appropriate
// image already shipped with the site (no new media, ADR-012 is M4).
const ENTITY_HERO_BY_KIND: Record<string, string> = {
  region: "/assets/aglen-hero-river-canyon.png",
  province: "/assets/aglen-aerial-river.png",
  municipality: "/assets/aglen-aerial-river.png",
  settlement: "/assets/aglen-village-church.png",
  cave: "/assets/aglen-cave-mystery.png",
  landform: "/assets/aglen-rock-arch.png",
  waterBody: "/assets/aglen-vit-river-sunset.png",
  spring: "/assets/aglen-river-pool.png",
  geopark: "/assets/aglen-aerial-river.png",
  archaeologicalSite: "/assets/aglen-kaleto-ruins.png",
  building: "/assets/aglen-village-church.png",
};

export function entityHeroPath(lang: LanguageCode, entity: Entity): string {
  if (entity.contentRef?.placeId) {
    const place = contentByLanguage[lang].placesList.find((candidate) => candidate.id === entity.contentRef!.placeId);
    if (place) return place.image;
  }
  if (entity.contentRef?.guideSlug) {
    const guide = findGuide(entity.contentRef.guideSlug);
    if (guide) return guide.heroImage;
  }
  return ENTITY_HERO_BY_KIND[entity.kind] ?? OG_IMAGE_PATH;
}

function entityText(lang: LanguageCode, subject: EntitySubject): { title: string; description: string } {
  const { entity, aspect } = subject;
  const brand = contentByLanguage[lang].brand.name;
  if (aspect) {
    return {
      title: `${aspectTitle(aspect, lang)} — ${entityName(entity, lang)} | ${brand}`,
      description: aspectLede(aspect, lang),
    };
  }
  return {
    title: `${entityName(entity, lang)} | ${brand}`,
    description: entityShortText(entity, lang),
  };
}

function entityImageEntries(lang: LanguageCode, entity: Entity): ImageSitemapEntry[] {
  return [
    { loc: absoluteAssetUrl(entityHeroPath(lang, entity)), title: entityName(entity, lang), caption: entityShortText(entity, lang) },
  ];
}

/**
 * Breadcrumb from the containment chain (Constitution rule 19), mirroring the
 * visible trail in `App.tsx` exactly. A `/place/` entity walks its containment
 * chain; a knowledge-namespace entity has no containment and walks
 * Home → namespace index → entity; an aspect page appends its own crumb.
 */
function entityBreadcrumb(lang: LanguageCode, entity: Entity, aspect?: ClaimAspect): Array<{ name: string; url?: string }> {
  const copy = contentByLanguage[lang];
  const items: Array<{ name: string; url?: string }> = [{ name: copy.nav.home, url: absoluteRouteUrl(lang, "home") }];
  const namespaceKind = (["history", "legend", "person"] as NamespaceKind[]).find((kind) =>
    entity.page?.path.startsWith(NAMESPACE_CHROME[kind].prefix),
  );
  if (namespaceKind) {
    items.push({ name: namespaceTitle(namespaceKind, lang), url: absoluteRouteUrl(lang, namespaceKind) });
    // The leaf carries no URL, matching the visible trail exactly.
    items.push({ name: entityName(entity, lang) });
    return items;
  }
  for (const node of breadcrumbTrail(entity)) {
    const isSelf = node.id === entity.id;
    const url = node.page?.status === "published" && (!isSelf || aspect) ? entityAbsoluteUrl(lang, node) : undefined;
    items.push({ name: entityName(node, lang), url });
  }
  // The same short crumb the visible trail renders — Google wants the markup to
  // describe a trail the reader can actually see.
  if (aspect) items.push({ name: aspectCrumb(aspect, lang) });
  return items;
}

/**
 * The citations behind a page, as schema.org `CreativeWork` references. Every
 * source the page's live claims rest on is emitted, with its URL where it has
 * one — so `llms.txt`, the JSON-LD and the rendered page name the same sources
 * (Constitution rule 33).
 */
function citationNodes(lang: LanguageCode, entityId: string): object[] {
  const cited = new Map<string, Source>();
  for (const claim of claimsFor(entityId)) {
    for (const source of sourcesOf(claim)) cited.set(source.id, source);
  }
  return [...cited.values()].map((source) => sourceCitationNode(lang, source));
}

/**
 * One source as a schema.org node. Where the source publishes a page, the node
 * carries this site's own URL for it and links onward to the origin — so a model
 * that follows a citation lands on a record it can read rather than on a bare
 * string it has to guess at (M4B, Part 11).
 */
function sourceCitationNode(lang: LanguageCode, source: Source): object {
  const page = sourceHasPage(source.id) ? `${SITE_URL}${buildSourcePath(lang, source.slug)}` : undefined;
  return {
    "@type": "CreativeWork",
    name: source.citation,
    ...(page ? { "@id": `${page}#source`, url: page, sameAs: source.url } : source.url ? { url: source.url } : {}),
    ...(source.author ? { author: { "@type": "Organization", name: source.author } } : {}),
    ...(source.publisher ? { publisher: { "@type": "Organization", name: source.publisher } } : {}),
    ...(source.year ? { datePublished: source.year } : {}),
    ...(source.license ? { license: source.license } : {}),
    ...(source.language ? { inLanguage: source.language } : {}),
  };
}

/**
 * The claims a page asserts, as schema.org `Claim` nodes with their confidence
 * preserved verbatim (rule 8 / V15). A machine reading this must be able to tell
 * a verified statement from a hedged one; `disambiguatingDescription` carries the
 * confidence word, and an uncertain claim is never emitted as a bare assertion.
 */
function claimNodes(lang: LanguageCode, entityId: string, url: string): object[] {
  return claimsFor(entityId).map((claim) => ({
    "@type": "Claim",
    "@id": `${url}#${claim.id}`,
    text: claimStatement(claim, lang),
    disambiguatingDescription: claim.confidence,
    inLanguage: lang,
    dateCreated: claim.observedAt ?? claim.created,
    ...(claim.reviewedAt ? { dateModified: claim.reviewedAt } : {}),
    appearance: { "@id": `${url}#entity` },
    citation: sourcesOf(claim).map((source) => sourceCitationNode(lang, source)),
  }));
}

/** One entity as its honest schema node — a Place/Landform/Cave, never the TouristDestination view type (C6). */
function entityNode(lang: LanguageCode, entity: Entity, url: string): object {
  const point = entityPoint(entity);
  const sameAs = entitySameAs(entity);
  const parent = entity.parent ? entityById(entity.parent) : undefined;
  const citations = citationNodes(lang, entity.id);
  const reviewed = lastReviewed(entity.id);
  return {
    "@type": entity.schemaType,
    ...(entity.additionalType ? { additionalType: entity.additionalType } : {}),
    "@id": `${url}#entity`,
    name: entityName(entity, lang),
    description: entityShortText(entity, lang),
    url,
    ...(point ? { geo: { "@type": "GeoCoordinates", latitude: point.lat, longitude: point.lon } } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(parent
      ? { containedInPlace: { "@type": "Place", name: entityName(parent, lang), ...(entitySameAs(parent).length ? { sameAs: entitySameAs(parent) } : {}) } }
      : {}),
    ...(citations.length > 0 ? { subjectOf: citations } : {}),
    ...(reviewed ? { dateModified: reviewed } : {}),
    image: absoluteAssetUrl(entityHeroPath(lang, entity)),
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

// schema.org type per business category — a specific supported subtype where
// one exists, LocalBusiness only as the honest fallback.
const businessSchemaType: Record<BusinessCategory, string> = {
  food: "FoodEstablishment",
  shops: "Store",
  producers: "Store",
  stay: "LodgingBusiness",
  crafts: "Store",
  services: "LocalBusiness",
  farming: "LocalBusiness",
  other: "LocalBusiness",
};

function businessText(lang: LanguageCode, business: LocalBusiness): { title: string; description: string } {
  const bui = businessesUiByLanguage[lang];
  return {
    title: `${business.name} | ${bui.heroTitle}`,
    description: localizeText(business.shortDescription, lang),
  };
}

function absoluteAssetUrl(path: string): string {
  if (path.startsWith("http")) return path;
  // Content still points at the PNG/JPEG source; the WebP derivative is what the
  // site actually serves, so that is what sitemaps and schema should reference.
  return `${SITE_URL}${webpSrc(path)}`;
}

/**
 * Date the page's own content last changed. Stamped by hand rather than by the
 * build: telling Google every page changed because a deploy happened is the
 * fastest way to have `dateModified` ignored altogether.
 */
const SITE_CONTENT_UPDATED = "2026-07-24";

const SOCIAL_SAFE = /\.(jpe?g|png)$/i;

/** Preview image for social scrapers, which still choke on WebP. */
function socialImage(candidate?: string): {
  url: string;
  width: number;
  height: number;
  type: string;
} {
  const path = candidate && SOCIAL_SAFE.test(candidate) ? candidate : OG_IMAGE_PATH;
  const size = imageSize(path) ?? { width: 1200, height: 630 };
  return {
    url: `${SITE_URL}${path}`,
    width: size.width,
    height: size.height,
    type: /\.png$/i.test(path) ? "image/png" : "image/jpeg",
  };
}

// Which unicode subset a language reads in. ja and zh are absent on purpose:
// neither Inter nor Cormorant Garamond ships CJK, so those pages render in the
// system stack and preloading a Latin file would waste the request.
const scriptByLanguage: Partial<Record<LanguageCode, string>> = {
  bg: "cyrillic",
  ru: "cyrillic",
  sr: "cyrillic",
  el: "greek",
  en: "latin",
  de: "latin",
  fr: "latin",
  es: "latin",
  it: "latin",
  ro: "latin-ext",
  tr: "latin-ext",
  hu: "latin-ext",
};

/** The body and heading faces this language actually needs, for `rel=preload`. */
function fontPreloads(language: LanguageCode): string[] {
  const subset = scriptByLanguage[language];
  if (!subset) return [];
  const pick = (family: string, weight: number) =>
    fontFaces.find((face) => face.family === family && face.weight === weight && face.subset === subset)?.url;
  return [pick("Inter", 400), pick("Cormorant Garamond", 700)].filter((url): url is string => Boolean(url));
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
    home: { title: `${copy.hero.subtitle} | ${copy.brand.name}`, description: copy.hero.lede },
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
    arMissions: { title: `${copy.ub.hubTitle} | ${copy.brand.name}`, description: copy.ub.homeText },
    // The entity namespace index pages. /karst/ is the knowledge subject itself,
    // titled from the root entity; /place/ lists the entities.
    karst: (() => {
      const root = entityById("karst-lukovit");
      return root
        ? { title: `${entityName(root, lang)} | ${copy.brand.name}`, description: entityShortText(root, lang) }
        : { title: `${copy.landmarks.title} | ${copy.brand.name}`, description: copy.landmarks.text };
    })(),
    place: { title: `${copy.landmarks.title} | ${copy.brand.name}`, description: copy.landmarks.text },
    // The knowledge namespaces and the provenance surfaces (M4). Titles come from
    // the one chrome module the pages themselves render, so the <title>, the <h1>,
    // the breadcrumb and the JSON-LD cannot drift apart.
    history: { title: `${namespaceTitle("history", lang)} | ${copy.brand.name}`, description: localizeChrome(NAMESPACE_CHROME.history.lede, lang) },
    legend: { title: `${namespaceTitle("legend", lang)} | ${copy.brand.name}`, description: localizeChrome(NAMESPACE_CHROME.legend.lede, lang) },
    person: { title: `${namespaceTitle("person", lang)} | ${copy.brand.name}`, description: localizeChrome(NAMESPACE_CHROME.person.lede, lang) },
    sources: { title: `${localizeChrome(PROVENANCE_CHROME.sources.title, lang)} | ${copy.brand.name}`, description: localizeChrome(PROVENANCE_CHROME.sources.lede, lang) },
    // /source/ has no index page of its own; the bare route inherits the ledger's
    // chrome, and a real /source/<slug>/ overrides both title and description
    // from the source record below.
    source: { title: `${localizeChrome(PROVENANCE_CHROME.sources.title, lang)} | ${copy.brand.name}`, description: localizeChrome(SOURCE_CHROME.lede, lang) },
    corrections: { title: `${localizeChrome(PROVENANCE_CHROME.corrections.title, lang)} | ${copy.brand.name}`, description: localizeChrome(PROVENANCE_CHROME.corrections.lede, lang) },
    travelGuide:{ title: `${copy.hub.title} | ${copy.brand.name}`, description: copy.hub.text },
    seasonal: { title: `${copy.guides.seasonal.label} | ${copy.brand.name}`, description: copy.guides.seasonal.text },
    events: { title: `${trust.events} | ${copy.brand.name}`, description: copy.hub.text },
    guides: {
      title: `${guidesUiByLanguage[lang].indexTitle} | ${copy.hub.eyebrow}`,
      description: guidesUiByLanguage[lang].indexSubtitle,
    },
    localBusinesses: (() => {
      const bui = businessesUiByLanguage[lang];
      // The hero title already names the village, so the suffix lists what the
      // page actually holds instead of repeating the brand.
      return {
        title: `${bui.heroTitle} | ${bui.catShops}, ${bui.catServices}, ${bui.catProducers}`,
        description: bui.heroSubtitle,
      };
    })(),
    trust: { title: `${trust.trust} | ${copy.brand.name}`, description: copy.sourceNotes.join(" ") },
    editorial: { title: `${trust.editorial} | ${copy.brand.name}`, description: copy.sourceNotes.join(" ") },
    localSeo: { title: `${trust.localSeo} | ${copy.brand.name}`, description: copy.landmarks.aria },
    crawlerPolicy: { title: `${trust.crawlerPolicy} | ${copy.brand.name}`, description: copy.hub.text },
    contact: { title: `${copy.contact.title} | ${copy.brand.name}`, description: copy.contact.text },
  };

  return core[routeId as CoreRouteId];
}

/**
 * `detailSlug` addresses a single business or guide beneath its index route.
 * Both share the parameter because a route has at most one kind of detail page.
 */
export function getSEOConfig(lang: LanguageCode, routeId: RouteId = "home", detailSlug?: string): SEOConfig {
  const business = detailSlug && routeId === "localBusinesses" ? findBusiness(detailSlug) : undefined;
  const guide = detailSlug && routeId === "guides" ? findGuide(detailSlug) : undefined;
  const subject = entitySubject(routeId, detailSlug);
  const entity = subject?.entity;
  // A source page's title is the source's own title and its description is the
  // citation: the two things a researcher or a model needs in a search result.
  const source = detailSlug && routeId === "source" ? sourceBySlug(detailSlug) : undefined;
  const text = subject
    ? entityText(lang, subject)
    : source
      ? {
          title: `${sourceTitle(source, lang)} | ${contentByLanguage[lang].brand.name}`,
          description: sourceNote(source, lang) ?? source.citation,
        }
      : business
        ? businessText(lang, business)
        : guide
          ? {
              title: `${localizeGuide(guide.title, lang)} | ${contentByLanguage[lang].brand.name}`,
              description: localizeGuide(guide.summary, lang),
            }
          : routeText(lang, routeId);
  const primaryImage = getRouteImageEntries(lang, routeId, detailSlug)[0];
  const pageImagePath = (entity ? entityHeroPath(lang, entity) : undefined) ?? business?.coverImage ?? guide?.heroImage;
  const pageImage = pageImagePath ? absoluteAssetUrl(pageImagePath) : undefined;

  // A legacy route resolves to the guide that replaced it, so the canonical and
  // every hreflang alternate point at the URL that should actually rank.
  const supersededBy = detailSlug ? undefined : supersedingGuideSlug(routeId);
  const retiredTo = detailSlug ? undefined : retiredLandingTarget(routeId);
  const retiredEntity = detailSlug ? undefined : retiredLandingEntity(routeId);

  const urlFor = (code: LanguageCode) => {
    if (subject) return entityAbsoluteUrl(code, subject.entity, subject.aspect);
    if (source) return `${SITE_URL}${buildSourcePath(code, source.slug)}`;
    if (retiredEntity) return entityAbsoluteUrl(code, retiredEntity);
    if (business) return absoluteBusinessUrl(code, business.slug);
    if (guide) return absoluteGuideUrl(code, guide.slug);
    if (supersededBy) return absoluteGuideUrl(code, supersededBy);
    if (retiredTo) return absoluteRouteUrl(code, retiredTo);
    return absoluteRouteUrl(code, routeId);
  };

  const social = socialImage(pageImagePath ?? (isLandingPageId(routeId) ? getLandingPage(lang, routeId)?.image : undefined));
  const isArticle = Boolean(entity || business || guide || isLandingPageId(routeId));

  return {
    title: text.title,
    description: compact(text.description),
    locale: localeCodes[lang],
    author: seoTextByLanguage[lang].organizationName,
    siteName: seoTextByLanguage[lang].organizationName,
    imageUrl: pageImage ?? primaryImage?.loc ?? OG_IMAGE,
    imageAlt: entity
      ? entityName(entity, lang)
      : business
        ? localizeText(business.coverImageAlt ?? business.shortDescription, lang)
        : guide
          ? localizeGuide(guide.heroImageAlt, lang)
          : primaryImage?.caption ?? contentByLanguage[lang].hero.imageAlt,
    socialImageUrl: social.url,
    socialImageWidth: social.width,
    socialImageHeight: social.height,
    socialImageType: social.type,
    ogType: isArticle ? "article" : "website",
    // Rule 43: the knowledge tier is indexed in bg and en only. Every other
    // language still gets the page — links must resolve — but says noindex until
    // a human has reviewed the translation of a sourced claim (V8).
    robots:
      (business || guide || routeId === "source" || isIndexableRoute(routeId)) && isIndexableIn(lang, routeId, detailSlug)
        ? "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        : "noindex, follow",
    canonicalUrl: urlFor(lang),
    alternates: [
      { lang: "x-default", href: urlFor(DEFAULT_LANGUAGE) },
      ...allLanguageCodes.map((code) => ({ lang: code, href: urlFor(code) })),
    ],
    ogLocaleAlternates: allLanguageCodes.filter((code) => code !== lang).map((code) => localeCodes[code]),
    dateModified: business?.lastUpdated ?? guide?.lastUpdated ?? SITE_CONTENT_UPDATED,
    fontPreloads: fontPreloads(lang),
  };
}

function routeImages(lang: LanguageCode, routeId: RouteId, detailSlug?: string): ImageSitemapEntry[] {
  const copy = contentByLanguage[lang];

  // Detail pages own their images. Without this every business and guide URL
  // repeated the same section hero in the image sitemap.
  const business = detailSlug && routeId === "localBusinesses" ? findBusiness(detailSlug) : undefined;
  if (business) {
    const cover = business.coverImage
      ? [
          {
            loc: absoluteAssetUrl(business.coverImage),
            title: business.name,
            caption: localizeText(business.coverImageAlt ?? business.shortDescription, lang),
          },
        ]
      : [];
    return [
      ...cover,
      ...(business.gallery ?? []).map((image) => ({
        loc: absoluteAssetUrl(image.src),
        title: business.name,
        caption: localizeText(image.alt, lang),
      })),
    ];
  }

  const guide = detailSlug && routeId === "guides" ? findGuide(detailSlug) : undefined;
  if (guide) {
    return [
      { loc: absoluteAssetUrl(guide.heroImage), title: localizeGuide(guide.title, lang), caption: localizeGuide(guide.heroImageAlt, lang) },
      ...guidePlaces(guide, lang).map((place) => ({
        loc: absoluteAssetUrl(place.image),
        title: place.title,
        caption: place.imageAlt || place.description,
      })),
    ];
  }

  const entity = entityForSlug(routeId, detailSlug);
  if (entity) return entityImageEntries(lang, entity);

  const landing = isLandingPageId(routeId) ? getLandingPage(lang, routeId) : undefined;
  if (landing) {
    return [
      { loc: absoluteAssetUrl(landing.image), title: landing.h1, caption: landing.imageAlt },
      { loc: OG_IMAGE, title: copy.hero.title, caption: copy.hero.imageAlt },
    ];
  }

  const text = routeText(lang, routeId);
  const gallery = copy.galleryItems;
  const pool = placeById(copy, "rachkov-vir");
  const cave = copy.mysteries[1];
  const church = placeById(copy, "st-archangel-michael");
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
    arMissions: [{ loc: OG_IMAGE, title: copy.ub.hubTitle, caption: copy.ub.homeText }, { loc: `${SITE_URL}/assets/aglen-cave-mystery.png`, title: copy.quests.title, caption: copy.quests.text }],
    karst: (() => {
      const root = entityById("karst-lukovit");
      const rt = routeText(lang, "karst");
      return [{ loc: absoluteAssetUrl("/assets/aglen-hero-river-canyon.png"), title: root ? entityName(root, lang) : rt.title, caption: rt.description }];
    })(),
    place: [{ loc: `${SITE_URL}/assets/aglen-aerial-river.png`, title: routeText(lang, "place").title, caption: routeText(lang, "place").description }],
    history: [{ loc: absoluteAssetUrl(NAMESPACE_CHROME.history.hero), title: namespaceTitle("history", lang), caption: localizeChrome(NAMESPACE_CHROME.history.lede, lang) }],
    legend: [{ loc: absoluteAssetUrl(NAMESPACE_CHROME.legend.hero), title: namespaceTitle("legend", lang), caption: localizeChrome(NAMESPACE_CHROME.legend.lede, lang) }],
    person: [{ loc: absoluteAssetUrl(NAMESPACE_CHROME.person.hero), title: namespaceTitle("person", lang), caption: localizeChrome(NAMESPACE_CHROME.person.lede, lang) }],
    sources: [{ loc: absoluteAssetUrl(PROVENANCE_CHROME.sources.hero), title: localizeChrome(PROVENANCE_CHROME.sources.title, lang), caption: localizeChrome(PROVENANCE_CHROME.sources.lede, lang) }],
    source: [{ loc: absoluteAssetUrl(SOURCE_CHROME.hero), title: localizeChrome(SOURCE_CHROME.eyebrow, lang), caption: localizeChrome(SOURCE_CHROME.lede, lang) }],
    corrections: [{ loc: absoluteAssetUrl(PROVENANCE_CHROME.corrections.hero), title: localizeChrome(PROVENANCE_CHROME.corrections.title, lang), caption: localizeChrome(PROVENANCE_CHROME.corrections.lede, lang) }],
    travelGuide: [{ loc: OG_IMAGE, title: copy.hub.title, caption: copy.hub.text }],
    seasonal: [{ loc: `${SITE_URL}/assets/aglen-aerial-river.png`, title: copy.guides.seasonal.label, caption: copy.guides.seasonal.text }],
    events: [{ loc: `${SITE_URL}/assets/aglen-village-church.png`, title: routeText(lang, "events").title, caption: copy.hub.text }],
    guides: [
      {
        loc: `${SITE_URL}/assets/aglen-aerial-river.png`,
        title: guidesUiByLanguage[lang].indexTitle,
        caption: guidesUiByLanguage[lang].indexSubtitle,
      },
    ],
    localBusinesses: [
      {
        loc: `${SITE_URL}/assets/local-businesses-hero.jpg`,
        title: businessesUiByLanguage[lang].heroTitle,
        caption: businessesUiByLanguage[lang].heroSubtitle,
      },
    ],
    trust: [{ loc: `${SITE_URL}/assets/aglen-village-church.png`, title: routeText(lang, "trust").title, caption: copy.sourceNotes.join(" ") }],
    editorial: [{ loc: `${SITE_URL}/assets/aglen-village-church.png`, title: routeText(lang, "editorial").title, caption: copy.sourceNotes.join(" ") }],
    localSeo: [{ loc: `${SITE_URL}/assets/aglen-village-church.png`, title: routeText(lang, "localSeo").title, caption: copy.landmarks.aria }],
    crawlerPolicy: [{ loc: OG_IMAGE, title: routeText(lang, "crawlerPolicy").title, caption: copy.hub.text }],
    contact: [{ loc: `${SITE_URL}/assets/aglen-village-church.png`, title: copy.contact.title, caption: copy.contact.text }],
  };

  return byRoute[routeId as CoreRouteId] ?? [{ loc: OG_IMAGE, title: text.title, caption: text.description }];
}

export function getRouteImageEntries(
  lang: LanguageCode,
  routeId: RouteId = "home",
  detailSlug?: string,
): ImageSitemapEntry[] {
  const seen = new Set<string>();
  return routeImages(lang, routeId, detailSlug).filter((entry) => {
    if (seen.has(entry.loc)) return false;
    seen.add(entry.loc);
    return true;
  });
}

/** Bare page name — the " | Brand" suffix belongs in <title>, not in schema. */
function shortName(title: string): string {
  return title.split(" | ")[0]?.trim() || title;
}

/** One region entity as a schema node, tied to the ids Google already holds. */
function regionPlaceNode(lang: LanguageCode, id: string): object | undefined {
  const place = regionPlaces.find((candidate) => candidate.id === id);
  if (!place) return undefined;
  const km = distanceFromAglenKm(place);
  return {
    "@type": place.schemaType,
    "@id": `${SITE_URL}/#place-${place.id}`,
    name: regionName(place, lang),
    description: regionNote(place, lang),
    ...(place.latitude !== undefined && place.longitude !== undefined
      ? { geo: { "@type": "GeoCoordinates", latitude: place.latitude, longitude: place.longitude } }
      : {}),
    ...(sameAsUrls(place).length > 0 ? { sameAs: sameAsUrls(place) } : {}),
    ...(km !== undefined
      ? {
          // Straight-line, from the published coordinates of both places. Road
          // distance is longer and is not asserted anywhere.
          distance: `${km} km`,
        }
      : {}),
    // The page on this site that covers the place: the guide if there is one,
    // otherwise its landing page. A plain URL rather than an `@id` reference to a
    // node defined on a different document, which strict validators read as a
    // dangling reference.
    ...(place.guideSlug
      ? { url: absoluteGuideUrl(lang, place.guideSlug) }
      : place.routeId
        ? { url: `${SITE_URL}${buildRoutePath(lang, place.routeId as RouteId)}` }
        : {}),
  };
}

/**
 * Aglen itself, plus the province that contains it and the regional cluster.
 *
 * On every page, not only the ones built from home-page sections: the guide and
 * business graphs said `about: { "@id": "…#aglen-village" }` without the node
 * being present, so the site's primary entity was referenced and never defined
 * on exactly the pages that describe it in most detail.
 */
function placeNodes(lang: LanguageCode): object[] {
  const copy = contentByLanguage[lang];
  const seoText = seoTextByLanguage[lang];
  const homeUrl = absoluteRouteUrl(lang, "home");

  return [
    {
      "@type": ["TouristAttraction", "Place"],
      "@id": `${SITE_URL}/#aglen-village`,
      name: copy.brand.name,
      alternateName: ["Ъглен", "Aglen", "Uglen", "с. Ъглен"],
      description: seoText.destinationDescription,
      url: homeUrl,
      image: [
        absoluteAssetUrl("/assets/aglen-hero-river-canyon.png"),
        absoluteAssetUrl("/assets/aglen-rock-arch.png"),
        absoluteAssetUrl("/assets/aglen-aerial-river.png"),
        absoluteAssetUrl("/assets/aglen-kaleto-ruins.png"),
        absoluteAssetUrl("/assets/aglen-village-church.png"),
      ],
      // Coordinates, postcode and identifiers from Wikidata Q550547. The site
      // previously carried 43.267, 24.221 — about 11 km off, which pointed both
      // the schema and the "open map" links at the wrong valley.
      geo: { "@type": "GeoCoordinates", latitude: AGLEN.latitude, longitude: AGLEN.longitude },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ъглен",
        addressRegion: "Lovech",
        postalCode: AGLEN.postalCode,
        addressCountry: "BG",
      },
      sameAs: sameAsUrls(AGLEN),
      containedInPlace: { "@id": `${SITE_URL}/#lovech-province` },
      touristType: seoText.touristTypes,
      amenityFeature: [
        ...copy.placesList.slice(0, 4).map((place) => ({ "@type": "LocationFeatureSpecification", name: place.title, value: true })),
        ...copy.experiencesList.slice(0, 4).map((experience) => ({ "@type": "LocationFeatureSpecification", name: experience.title, value: true })),
      ],
      // The regional cluster: Prohodna, Karlukovo, Lukovit, Iskar-Panega and the
      // rest, each carrying its own Wikidata/Wikipedia identifiers.
      nearbyAttraction: regionPlaces.map((place) => ({ "@id": `${SITE_URL}/#place-${place.id}` })),
      hasMap: `https://www.google.com/maps/search/?api=1&query=${AGLEN.latitude},${AGLEN.longitude}`,
      publicAccess: true,
    },
    {
      "@type": "AdministrativeArea",
      "@id": `${SITE_URL}/#lovech-province`,
      name: regionName(LOVECH_PROVINCE, lang),
      description: regionNote(LOVECH_PROVINCE, lang),
      sameAs: sameAsUrls(LOVECH_PROVINCE),
      containedInPlace: { "@type": "Country", name: "Bulgaria", sameAs: "https://www.wikidata.org/wiki/Q219" },
    },
    ...regionPlaces
      .map((place) => regionPlaceNode(lang, place.id))
      .filter((node): node is object => Boolean(node)),
  ];
}

/**
 * The knowledge namespace indexes and the two provenance surfaces as machine
 * data. `/history/`, `/legend/` and `/person/` are ItemLists over real entities;
 * `/sources/` is the ledger itself, emitted as the list of citable origins so a
 * machine can read the provenance without scraping the page.
 */
function knowledgeIndexSchemas(lang: LanguageCode, routeId: RouteId, routeUrl: string): object[] {
  const namespaceKind = (["history", "legend", "person"] as NamespaceKind[]).find((kind) => kind === routeId);
  if (namespaceKind) {
    const listed = namespaceEntities(NAMESPACE_CHROME[namespaceKind].prefix);
    return [
      {
        "@type": "ItemList",
        "@id": `${routeUrl}#list`,
        name: namespaceTitle(namespaceKind, lang),
        numberOfItems: listed.length,
        itemListElement: listed.map((entity, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: entityName(entity, lang),
          url: entityAbsoluteUrl(lang, entity),
        })),
      },
    ];
  }
  if (routeId === "sources") {
    return [
      {
        "@type": "ItemList",
        "@id": `${routeUrl}#ledger`,
        name: localizeChrome(PROVENANCE_CHROME.sources.title, lang),
        numberOfItems: ledgerSources.length,
        itemListElement: ledgerSources.map((source, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: sourceCitationNode(lang, source),
        })),
      },
    ];
  }
  if (routeId === "corrections") {
    return [
      {
        "@type": "ItemList",
        "@id": `${routeUrl}#corrections`,
        name: localizeChrome(PROVENANCE_CHROME.corrections.title, lang),
        numberOfItems: corrections().length,
        itemListElement: corrections().map((claim, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: claimStatement(claim, lang),
          ...(claim.correctedAt ? { item: { "@type": "Claim", text: claimStatement(claim, lang), dateModified: claim.correctedAt } } : {}),
        })),
      },
    ];
  }
  return [];
}

function buildPageSpecificSchemas(lang: LanguageCode, routeId: RouteId, routeUrl: string): object[] {
  const knowledge = knowledgeIndexSchemas(lang, routeId, routeUrl);
  if (knowledge.length > 0) return knowledge;
  const copy = contentByLanguage[lang];
  const seoText = seoTextByLanguage[lang];
  const meta = getSEOConfig(lang, routeId);
  const images = getRouteImageEntries(lang, routeId);
  const landing = isLandingPageId(routeId) ? getLandingPage(lang, routeId) : undefined;
  const imageObjects = images.map((image, index) => ({
    "@type": "ImageObject",
    "@id": `${routeUrl}#image-${index + 1}`,
    contentUrl: image.loc,
    url: image.loc,
    name: image.title,
    caption: image.caption,
    representativeOfPage: index === 0,
  }));
  const isArticlePage = Boolean(landing) || routeId !== "home";

  const schemas: object[] = [
    ...imageObjects,
    {
      "@type": "TouristDestination",
      "@id": `${routeUrl}#destination`,
      // The bare page name, not the <title>: a destination is not called
      // "Nature Around Aglen | Ъглен".
      name: shortName(landing?.h1 ?? meta.title),
      description: meta.description,
      url: routeUrl,
      inLanguage: lang,
      image: images.map((image) => image.loc),
      touristType: seoText.touristTypes,
      geo: { "@type": "GeoCoordinates", latitude: AGLEN.latitude, longitude: AGLEN.longitude },
      includesAttraction: copy.placesList.map((place) => ({
        "@type": "TouristAttraction",
        name: place.title,
        description: place.description,
        image: absoluteAssetUrl(place.image),
      })),
      containedInPlace: { "@id": `${SITE_URL}/#lovech-province` },
    },
  ];

  if (isArticlePage) {
    schemas.push({
      "@type": landing?.schemaType ?? "Article",
      "@id": `${routeUrl}#article`,
      headline: shortName(landing?.h1 ?? meta.title),
      description: meta.description,
      image: images.map((image) => image.loc),
      author: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntityOfPage: { "@id": routeUrl },
      datePublished: "2026-05-30",
      dateModified: meta.dateModified,
      inLanguage: lang,
      isAccessibleForFree: true,
    });
  }

  // Exactly one FAQPage per page. Three of them used to be emitted at once — the
  // page's own, the landing page's and the site-wide block — which is invalid.
  const faqs = [
    ...(landing?.faqs ?? []).map((faq) => ({ question: faq.question, answer: faq.answer })),
    { question: `${seoText.pagePlanQuestion} ${shortName(meta.title)}`, answer: seoText.pagePlanAnswer },
    { question: copy.contact.notesTitle, answer: `${copy.contact.noteOne} ${copy.contact.noteTwo}` },
  ];
  schemas.push({
    "@type": "FAQPage",
    "@id": `${routeUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  });

  if (collectionRouteIds.has(routeId)) {
    schemas.push({
      "@type": "CollectionPage",
      "@id": `${routeUrl}#collection`,
      name: shortName(meta.title),
      url: routeUrl,
      inLanguage: lang,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#aglen-village` },
    });
  }

  if (itineraryRouteIds.has(routeId) && landing) {
    schemas.push({
      "@type": "TouristTrip",
      "@id": `${routeUrl}#trip`,
      name: shortName(landing.h1),
      description: landing.metaDescription,
      touristType: seoText.touristTypes,
      itinerary: {
        "@type": "ItemList",
        itemListElement: copy.mapStops.map((stop, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: { "@type": "TouristAttraction", name: stop.title, description: stop.detail },
        })),
      },
      provider: { "@id": `${SITE_URL}/#organization` },
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

  if (routeId === "events") {
    for (const item of sortedEvents()) {
      schemas.push({
        "@type": "Event",
        "@id": `${routeUrl}#${item.id}`,
        name: localize(item.title, lang),
        description: localize(item.description, lang),
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        startDate: item.startDate,
        ...(item.endDate ? { endDate: item.endDate } : {}),
        location: {
          "@type": "Place",
          name: item.location,
          address: { "@type": "PostalAddress", addressLocality: "Ъглен", addressRegion: "Lovech", addressCountry: "BG" },
        },
        organizer: { "@id": `${SITE_URL}/#organization` },
        ...(item.image ? { image: [absoluteAssetUrl(item.image)] } : {}),
      });
    }
  }

  // A VideoObject used to be emitted here for /quests and /app with contentUrl
  // and embedUrl both pointing at the HTML page. There is no video: the markup
  // claimed a rich result the page cannot support, so it is gone.

  return schemas;
}

/** schema.org for one business, typed by what it actually is. */
function buildBusinessSchema(lang: LanguageCode, business: LocalBusiness): object {
  const bui = businessesUiByLanguage[lang];
  const url = absoluteBusinessUrl(lang, business.slug);
  const openingHours = Object.entries(business.openingHours ?? {}).flatMap(([day, slots]) =>
    (slots ?? []).map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][Number(day)]}`,
      opens: slot.open,
      closes: slot.close,
    })),
  );

  return {
    "@type": businessSchemaType[business.category],
    "@id": `${url}#business`,
    name: business.name,
    url,
    description: localizeText(business.description ?? business.shortDescription, lang),
    inLanguage: lang,
    // Contact and address are emitted only when the business supplied them.
    ...(business.coverImage ? { image: absoluteAssetUrl(business.coverImage) } : {}),
    ...(business.logo ? { logo: absoluteAssetUrl(business.logo) } : {}),
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(business.email ? { email: business.email } : {}),
    ...(business.website ? { sameAs: [business.website, business.socialLinks?.facebook, business.socialLinks?.instagram].filter(Boolean) } : {}),
    ...(business.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: business.address,
            addressLocality: business.locality ?? "Ъглен",
            addressCountry: "BG",
          },
        }
      : {}),
    ...(business.latitude !== undefined && business.longitude !== undefined
      ? { geo: { "@type": "GeoCoordinates", latitude: business.latitude, longitude: business.longitude } }
      : {}),
    ...(openingHours.length > 0 ? { openingHoursSpecification: openingHours } : {}),
    ...(mapUrl(business) ? { hasMap: mapUrl(business) } : {}),
    ...(business.products && business.products.length > 0
      ? {
          makesOffer: business.products.map((product) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: localizeText(product, lang) },
          })),
        }
      : {}),
    additionalType: businessCategoryLabel(bui, business.category),
  };
}

/**
 * Organization and WebSite. Every page needs them: the detail pages referenced
 * `#organization` as their publisher without ever defining it, which left a
 * dangling node reference in the graph.
 */
function identityNodes(lang: LanguageCode): object[] {
  const copy = contentByLanguage[lang];
  const seoText = seoTextByLanguage[lang];
  const homeUrl = absoluteRouteUrl(lang, "home");

  return [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: seoText.organizationName,
      alternateName: [copy.brand.name],
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: OG_IMAGE, width: 1200, height: 630 },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: copy.contact.cta,
        email: "info.aglen@gmail.com",
        availableLanguage: languages.map((language) => language.label),
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "село Ъглен",
        addressLocality: "Ъглен",
        addressRegion: "Lovech",
        postalCode: AGLEN.postalCode,
        addressCountry: "BG",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: homeUrl,
      name: copy.brand.name,
      description: seoTextByLanguage[lang].destinationDescription,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: allLanguageCodes,
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${homeUrl}?search={search_term_string}` },
        "query-input": `required name=${seoText.searchInputName}`,
      },
    },
  ];
}

export function buildJSONLD(lang: LanguageCode, routeId: RouteId = "home", detailSlug?: string): object {
  const copy = contentByLanguage[lang];
  const guide = detailSlug && routeId === "guides" ? findGuide(detailSlug) : undefined;
  if (guide) {
    const gui = guidesUiByLanguage[lang];
    const url = absoluteGuideUrl(lang, guide.slug);
    const minutes = readingMinutes(guide, lang);
    const images = getRouteImageEntries(lang, "guides", guide.slug);
    return {
      "@context": "https://schema.org",
      "@graph": [
        ...identityNodes(lang),
        ...placeNodes(lang),
        {
          "@type": "WebPage",
          "@id": url,
          url,
          name: localizeGuide(guide.title, lang),
          description: localizeGuide(guide.summary, lang),
          inLanguage: lang,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${SITE_URL}/#aglen-village` },
          primaryImageOfPage: { "@id": `${url}#primaryimage` },
          dateModified: guide.lastUpdated,
        },
        {
          "@type": "ImageObject",
          "@id": `${url}#primaryimage`,
          contentUrl: absoluteAssetUrl(guide.heroImage),
          url: absoluteAssetUrl(guide.heroImage),
          caption: localizeGuide(guide.heroImageAlt, lang),
          representativeOfPage: true,
        },
        {
          // TravelGuide only where the guide really is one; the rest stay Article.
          "@type": guide.status === "published" ? "TravelGuide" : "Article",
          "@id": `${url}#guide`,
          name: localizeGuide(guide.title, lang),
          headline: localizeGuide(guide.title, lang),
          description: localizeGuide(guide.summary, lang),
          url,
          inLanguage: lang,
          image: images.map((image) => image.loc),
          isAccessibleForFree: true,
          ...(minutes > 0 ? { timeRequired: `PT${minutes}M` } : {}),
          author: { "@id": `${SITE_URL}/#organization` },
          publisher: { "@id": `${SITE_URL}/#organization` },
          mainEntityOfPage: { "@id": url },
          dateModified: guide.lastUpdated,
          about: { "@id": `${SITE_URL}/#aglen-village` },
          ...(guide.regionPlaceIds?.length
            ? { mentions: guide.regionPlaceIds.map((id) => ({ "@id": `${SITE_URL}/#place-${id}` })) }
            : {}),
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumbs`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: copy.nav.home, item: absoluteRouteUrl(lang, "home") },
            { "@type": "ListItem", position: 2, name: gui.indexTitle, item: absoluteRouteUrl(lang, "guides") },
            { "@type": "ListItem", position: 3, name: localizeGuide(guide.title, lang), item: url },
          ],
        },
      ],
    };
  }

  const business = detailSlug && routeId === "localBusinesses" ? findBusiness(detailSlug) : undefined;
  if (business) {
    const bui = businessesUiByLanguage[lang];
    const url = absoluteBusinessUrl(lang, business.slug);
    return {
      "@context": "https://schema.org",
      "@graph": [
        ...identityNodes(lang),
        ...placeNodes(lang),
        {
          "@type": "WebPage",
          "@id": url,
          url,
          name: business.name,
          description: localizeText(business.shortDescription, lang),
          inLanguage: lang,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${url}#business` },
          mainEntity: { "@id": `${url}#business` },
          ...(business.lastUpdated ? { dateModified: business.lastUpdated } : {}),
        },
        buildBusinessSchema(lang, business),
        {
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumbs`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: copy.nav.home, item: absoluteRouteUrl(lang, "home") },
            { "@type": "ListItem", position: 2, name: bui.heroTitle, item: absoluteRouteUrl(lang, "localBusinesses") },
            { "@type": "ListItem", position: 3, name: business.name, item: url },
          ],
        },
      ],
    };
  }

  // A source page (M4B): the source as a CreativeWork, and every live claim
  // resting on it as a Claim citing it. This is the namespace's entire purpose
  // for a machine — one fetch answers "where did this come from, how well is it
  // held, and what else rests on the same origin?" (Part 11).
  const sourceRecord = detailSlug && routeId === "source" ? sourceBySlug(detailSlug) : undefined;
  if (sourceRecord && sourceHasPage(sourceRecord.id)) {
    const url = `${SITE_URL}${buildSourcePath(lang, sourceRecord.slug)}`;
    const resting = liveClaimsFromSource(sourceRecord.id);
    const crumbs = [
      { name: contentByLanguage[lang].nav.home, url: absoluteRouteUrl(lang, "home") },
      { name: localizeChrome(PROVENANCE_CHROME.sources.title, lang), url: absoluteRouteUrl(lang, "sources") },
      { name: sourceTitle(sourceRecord, lang) },
    ];
    return {
      "@context": "https://schema.org",
      "@graph": [
        ...identityNodes(lang),
        {
          "@type": "WebPage",
          "@id": url,
          url,
          name: sourceTitle(sourceRecord, lang),
          description: sourceNote(sourceRecord, lang) ?? sourceRecord.citation,
          inLanguage: lang,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${url}#source` },
          ...(sourceRecord.accessedAt ? { dateModified: sourceRecord.accessedAt } : {}),
        },
        sourceCitationNode(lang, sourceRecord),
        // Each claim names the entity it is about, so a model can walk from a
        // source straight to the things it supports without scraping the page.
        ...resting.map((claim) => {
          const about = entityById(claim.entityId);
          const aboutUrl = about?.page?.status === "published" ? entityAbsoluteUrl(lang, about) : undefined;
          return {
            "@type": "Claim",
            "@id": `${aboutUrl ?? url}#${claim.id}`,
            text: claimStatement(claim, lang),
            disambiguatingDescription: claim.confidence,
            inLanguage: lang,
            dateCreated: claim.observedAt ?? claim.created,
            ...(claim.reviewedAt ? { dateModified: claim.reviewedAt } : {}),
            citation: { "@id": `${url}#source` },
            ...(about ? { about: { "@type": "Thing", name: entityName(about, lang), ...(aboutUrl ? { url: aboutUrl } : {}) } } : {}),
          };
        }),
        {
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumbs`,
          itemListElement: crumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            ...(crumb.url ? { item: crumb.url } : {}),
          })),
        },
      ],
    };
  }

  // Entity detail page (M3) and its aspect pages (M4): the node is its honest
  // schema type, the breadcrumb is the containment chain, the claims carry their
  // confidence, and all of it is derived from the graph and the ledger.
  const subject = entitySubject(routeId, detailSlug);
  if (subject) {
    const { entity, aspect } = subject;
    const url = entityAbsoluteUrl(lang, entity, aspect);
    const entityUrl = entityAbsoluteUrl(lang, entity);
    const heroUrl = absoluteAssetUrl(entityHeroPath(lang, entity));
    const crumbs = entityBreadcrumb(lang, entity, aspect);
    const pageText = entityText(lang, subject);
    const reviewed = lastReviewed(entity.id);
    return {
      "@context": "https://schema.org",
      "@graph": [
        ...identityNodes(lang),
        {
          "@type": "WebPage",
          "@id": url,
          url,
          name: shortName(pageText.title),
          description: pageText.description,
          inLanguage: lang,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${entityUrl}#entity` },
          primaryImageOfPage: { "@id": `${url}#primaryimage` },
          dateModified: reviewed ?? SITE_CONTENT_UPDATED,
        },
        {
          "@type": "ImageObject",
          "@id": `${url}#primaryimage`,
          contentUrl: heroUrl,
          url: heroUrl,
          caption: entityName(entity, lang),
          representativeOfPage: true,
        },
        // The entity node lives at its own URL, so an aspect page references the
        // same @id rather than minting a second node for one thing (rule 2).
        ...(aspect ? [] : [entityNode(lang, entity, url)]),
        ...claimNodes(lang, entity.id, entityUrl),
        {
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumbs`,
          itemListElement: crumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            ...(crumb.url ? { item: crumb.url } : {}),
          })),
        },
      ],
    };
  }

  const meta = getSEOConfig(lang, routeId);
  const seoText = seoTextByLanguage[lang];
  const homeUrl = absoluteRouteUrl(lang, "home");
  const routeUrl = meta.canonicalUrl;

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...identityNodes(lang),
      {
        "@type": collectionRouteIds.has(routeId) ? "CollectionPage" : "WebPage",
        "@id": routeUrl,
        url: routeUrl,
        name: shortName(meta.title),
        description: meta.description,
        inLanguage: lang,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#aglen-village` },
        dateModified: meta.dateModified,
        primaryImageOfPage: { "@id": `${routeUrl}#image-1` },
      },
      ...buildPageSpecificSchemas(lang, routeId, routeUrl),
      ...placeNodes(lang),
      {
        "@type": "MobileApplication",
        "@id": `${SITE_URL}/#unlockingbulgaria`,
        name: "unlockingbulgaria",
        alternateName: "unlockingbulgaria AR",
        description: copy.app.text,
        url: APP_SITE_URL,
        downloadUrl: APP_SITE_URL,
        applicationCategory: "TravelApplication",
        applicationSubCategory: "Augmented Reality Tourism",
        operatingSystem: "Android",
        screenshot: OG_IMAGE,
        featureList: [...copy.ar.steps, ...copy.quests.features.map((feature) => feature.title)],
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
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ъглен",
          addressRegion: "Lovech",
          postalCode: AGLEN.postalCode,
          addressCountry: "BG",
        },
        geo: { "@type": "GeoCoordinates", latitude: AGLEN.latitude, longitude: AGLEN.longitude },
        areaServed: [{ "@id": `${SITE_URL}/#lovech-province` }, ...regionPlaces.map((place) => ({ "@id": `${SITE_URL}/#place-${place.id}` }))],
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
      // The site-wide FAQPage that used to live here is gone: it collided with
      // the per-page FAQPage from buildPageSpecificSchemas, and two FAQPage
      // entities on one URL is invalid markup. Those four questions are now part
      // of the single page-level FAQ where they belong.
      {
        "@type": "BreadcrumbList",
        "@id": `${routeUrl}#breadcrumbs`,
        itemListElement:
          routeId === "home"
            ? [{ "@type": "ListItem", position: 1, name: copy.nav.home, item: homeUrl }]
            : [
                { "@type": "ListItem", position: 1, name: copy.nav.home, item: homeUrl },
                // The bare page name; the breadcrumb used to repeat the full
                // <title> including the " | Ъглен" suffix.
                { "@type": "ListItem", position: 2, name: shortName(meta.title), item: routeUrl },
              ],
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

export function renderStaticFallback(lang: LanguageCode, routeId: RouteId = "home", detailSlug?: string): string {
  const copy = contentByLanguage[lang];
  const meta = getSEOConfig(lang, routeId, detailSlug);
  const business = detailSlug && routeId === "localBusinesses" ? findBusiness(detailSlug) : undefined;
  const guide = detailSlug && routeId === "guides" ? findGuide(detailSlug) : undefined;
  const subject = entitySubject(routeId, detailSlug);

  if (subject) {
    const { entity, aspect } = subject;
    const parent = entity.parent ? entityById(entity.parent) : undefined;
    const karst = entityById("karst-lukovit");
    const eyebrow = parent ? entityName(parent, lang) : karst ? entityName(karst, lang) : "";
    const long = entityLongText(entity, lang);
    const links = derivedLinks(entity, lang);
    const pageText = entityText(lang, subject);
    // The claim layer, flattened for a crawler that runs no JavaScript. Every
    // statement keeps its confidence word — a crawler must not be shown a firmer
    // version of a fact than a reader is (rule 8 / V15).
    const claimLines = [
      ...knownClaims(entity.id, aspect).map((claim) => `${claimStatement(claim, lang)} [${claim.confidence}]`),
      ...disputesFor(entity.id, aspect).flatMap((dispute) => [
        disputeQuestion(dispute, lang),
        ...claimsInDispute(dispute.id).map((claim) => `${claimStatement(claim, lang)} [${claim.confidence}]`),
      ]),
      ...uncertainClaims(entity.id, aspect).map((claim) => `${claimStatement(claim, lang)} [${claim.confidence}]`),
    ];
    const sourceLines = [...new Map(
      claimsFor(entity.id).flatMap((claim) => sourcesOf(claim)).map((source) => [source.id, source]),
    ).values()].map((source) => source.citation);
    return `
      <main id="static-seo-content" class="static-fallback" lang="${lang}">
        <article class="content-hub section-shell">
          <div class="section-heading">
            <p class="eyebrow">${escapeHtml(aspect ? entityName(entity, lang) : eyebrow)}</p>
            <h1>${escapeHtml(shortName(pageText.title))}</h1>
            ${paragraph(pageText.description)}
            ${long && !aspect ? paragraph(long) : ""}
            <a href="${buildRoutePath(lang, "karst")}">${escapeHtml(karst ? entityName(karst, lang) : "")}</a>
          </div>
          <div class="hub-grid">
            ${claimLines.map((line) => `<div class="hub-card"><span>${escapeHtml(line)}</span></div>`).join("")}
            ${sourceLines.map((line) => `<div class="hub-card"><span>${escapeHtml(line)}</span></div>`).join("")}
            ${links.map((link) => `<a class="hub-card" href="/${lang}${link.path}"><span>${escapeHtml(link.label)}</span></a>`).join("")}
          </div>
        </article>
      </main>
    `;
  }

  // The knowledge namespace indexes and the two provenance surfaces.
  const namespaceKind = (["history", "legend", "person"] as NamespaceKind[]).find((kind) => kind === routeId);
  if (namespaceKind) {
    const listed = namespaceEntities(NAMESPACE_CHROME[namespaceKind].prefix);
    return `
      <main id="static-seo-content" class="static-fallback" lang="${lang}">
        <article class="content-hub section-shell">
          <div class="section-heading">
            <p class="eyebrow">${escapeHtml(localizeChrome(NAMESPACE_CHROME[namespaceKind].eyebrow, lang))}</p>
            <h1>${escapeHtml(namespaceTitle(namespaceKind, lang))}</h1>
            ${paragraph(localizeChrome(NAMESPACE_CHROME[namespaceKind].lede, lang))}
          </div>
          <div class="hub-grid">
            ${listed.map((item) => `<a class="hub-card" href="/${lang}${item.page!.path}"><span>${escapeHtml(`${entityName(item, lang)}: ${entityShortText(item, lang)}`)}</span></a>`).join("")}
          </div>
        </article>
      </main>
    `;
  }

  // One source, flattened for a crawler that runs no JavaScript: the citation,
  // what rests on it with every confidence word intact (V15), and what we hold.
  const flatSource = detailSlug && routeId === "source" ? sourceBySlug(detailSlug) : undefined;
  if (flatSource) {
    const lines = [
      `${flatSource.citation} [${flatSource.verification}]`,
      ...(flatSource.url ? [flatSource.url] : []),
      ...(sourceNote(flatSource, lang) ? [sourceNote(flatSource, lang)!] : []),
      ...liveClaimsFromSource(flatSource.id).map((claim) => `${claimStatement(claim, lang)} [${claim.confidence}]`),
    ];
    return `
      <main id="static-seo-content" class="static-fallback" lang="${lang}">
        <article class="content-hub section-shell">
          <div class="section-heading">
            <p class="eyebrow">${escapeHtml(localizeChrome(SOURCE_CHROME.eyebrow, lang))}</p>
            <h1>${escapeHtml(sourceTitle(flatSource, lang))}</h1>
            ${paragraph(localizeChrome(SOURCE_CHROME.lede, lang))}
          </div>
          <div class="hub-grid">
            ${lines.map((line) => `<div class="hub-card"><span>${escapeHtml(line)}</span></div>`).join("")}
          </div>
        </article>
      </main>
    `;
  }

  if (routeId === "sources" || routeId === "corrections") {
    const chrome = PROVENANCE_CHROME[routeId];
    const lines =
      routeId === "sources"
        ? ledgerSources.flatMap((source) => [
            `${source.citation} [${source.verification}]`,
            ...(source.url ? [source.url] : []),
            ...(sourceHasPage(source.id) ? [`${SITE_URL}${buildSourcePath(lang, source.slug)}`] : []),
          ])
        : corrections().map((claim) => `${claimStatement(claim, lang)}${claim.correctedAt ? ` (${claim.correctedAt})` : ""}`);
    return `
      <main id="static-seo-content" class="static-fallback" lang="${lang}">
        <article class="content-hub section-shell">
          <div class="section-heading">
            <p class="eyebrow">${escapeHtml(localizeChrome(chrome.eyebrow, lang))}</p>
            <h1>${escapeHtml(localizeChrome(chrome.title, lang))}</h1>
            ${paragraph(localizeChrome(chrome.lede, lang))}
          </div>
          <div class="hub-grid">
            ${(lines.length > 0 ? lines : [localizeChrome(chrome.lede, lang)]).map((line) => `<div class="hub-card"><span>${escapeHtml(line)}</span></div>`).join("")}
          </div>
        </article>
      </main>
    `;
  }

  if (guide) {
    const gui = guidesUiByLanguage[lang];
    const lines = [
      ...(guide.status === "in-preparation" ? [`${gui.inPreparation}. ${gui.inPreparationNote}`] : []),
      ...(guide.sections ?? []).flatMap((section) => [
        `${localizeGuide(section.heading, lang)}: ${section.body.map((p) => localizeGuide(p, lang)).join(" ")}`,
        ...(section.list ?? []).map((item) => localizeGuide(item, lang)),
        ...(section.notice ? [`${gui.noticeLabel}: ${localizeGuide(section.notice, lang)}`] : []),
      ]),
      ...guidePlaces(guide, lang).map((place) => `${place.title}: ${place.description}`),
    ].filter((line) => line.trim().length > 0);

    return `
      <main id="static-seo-content" class="static-fallback" lang="${lang}">
        <article class="content-hub section-shell">
          <div class="section-heading">
            <p class="eyebrow">${escapeHtml(gui.indexEyebrow)}</p>
            <h1>${escapeHtml(localizeGuide(guide.title, lang))}</h1>
            ${paragraph(localizeGuide(guide.summary, lang))}
            <a href="${buildRoutePath(lang, "guides")}">${escapeHtml(gui.backToGuides)}</a>
          </div>
          <div class="hub-grid">
            ${lines.map((item) => `<div class="hub-card"><span>${escapeHtml(item)}</span></div>`).join("")}
          </div>
        </article>
      </main>
    `;
  }

  if (business) {
    const bui = businessesUiByLanguage[lang];
    const facts = [
      business.address ? `${bui.detailLocation}: ${business.address}` : "",
      business.phone ? `${bui.detailContact}: ${business.phone}` : "",
      ...(business.products ?? []).map((product) => `${bui.detailProducts}: ${localizeText(product, lang)}`),
      ...(business.services ?? []).map((service) => `${bui.detailServices}: ${localizeText(service, lang)}`),
    ].filter(Boolean);

    return `
      <main id="static-seo-content" class="static-fallback" lang="${lang}">
        <article class="content-hub section-shell">
          <div class="section-heading">
            <p class="eyebrow">${escapeHtml(businessCategoryLabel(bui, business.category))}</p>
            <h1>${escapeHtml(business.name)}</h1>
            ${paragraph(localizeText(business.description ?? business.shortDescription, lang))}
            <a href="${buildRoutePath(lang, "localBusinesses")}">${escapeHtml(bui.backToList)}</a>
          </div>
          <div class="hub-grid">
            ${facts.map((item) => `<div class="hub-card"><span>${escapeHtml(item)}</span></div>`).join("")}
          </div>
        </article>
      </main>
    `;
  }

  const landing = isLandingPageId(routeId) ? getLandingPage(lang, routeId) : undefined;
  const ui = uiTextByLanguage[lang];

  // The four trust pages. Without this branch a crawler that does not run
  // JavaScript saw only the two source notes on the editorial-policy page.
  const trustPage = trustPageByRoute.get(routeId as "trust" | "editorial" | "localSeo" | "crawlerPolicy");
  if (trustPage) {
    const lines = trustPage.sections.flatMap((section) => [
      `${localizeTrust(section.heading, lang)}: ${section.body.map((paragraph) => localizeTrust(paragraph, lang)).join(" ")}`,
      ...(section.list ?? []).map((item) => localizeTrust(item, lang)),
    ]);
    const nearby =
      trustPage.routeId === "localSeo"
        ? regionPlaces.map((place) => {
            const km = distanceFromAglenKm(place);
            return `${regionName(place, lang)}${km !== undefined ? ` — ≈ ${km} km` : ""}: ${regionNote(place, lang)}`;
          })
        : [];

    return `
      <main id="static-seo-content" class="static-fallback" lang="${lang}">
        <article class="content-hub section-shell">
          <div class="section-heading">
            <p class="eyebrow">${escapeHtml(localizeTrust(trustPage.eyebrow, lang))}</p>
            <h1>${escapeHtml(localizeTrust(trustPage.h1, lang))}</h1>
            ${paragraph(localizeTrust(trustPage.intro, lang))}
            <p><time datetime="${trustPage.lastReviewed}">${trustPage.lastReviewed}</time></p>
          </div>
          <div class="hub-grid">
            ${[...lines, ...nearby].map((item) => `<div class="hub-card"><span>${escapeHtml(item)}</span></div>`).join("")}
          </div>
        </article>
      </main>
    `;
  }

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
              <img ${imageAttributes(landing.image, { sizes: "(max-width: 900px) 92vw, 42vw" })} alt="${escapeHtml(landing.imageAlt)}" loading="eager" fetchpriority="high" />
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
    vitRiver: [copy.guides.vitRiver.text, placeById(copy, "rachkov-vir")?.description ?? copy.landmarks.text],
    food: [copy.guides.food.text],
    nearby: [copy.guides.nearby.text],
    geo: copy.mapStops.map((stop) => `${stop.title}: ${stop.detail}`),
    stay: copy.accommodationList.map((item) => `${item.title}: ${item.description}`),
    quests: copy.quests.features.map((feature) => `${feature.title}: ${feature.text}`),
    app: [...copy.ar.steps, copy.app.note],
    arMissions: [copy.ub.whatText, ...copy.quests.features.map((feature) => `${feature.title}: ${feature.text}`), `${copy.ub.needHeading}: ${copy.ub.needItems.join(", ")}`, copy.app.text],
    travelGuide: [copy.hub.text],
    seasonal: [copy.guides.seasonal.text],
    events: [copy.hub.text],
    guides: guides.map((guide) => `${localizeGuide(guide.title, lang)}: ${localizeGuide(guide.summary, lang)}`),
    localBusinesses: (() => {
      const bui = businessesUiByLanguage[lang];
      const listed = publishedBusinesses();
      if (listed.length === 0) return [bui.heroTagline, bui.emptyAll];
      return [bui.heroTagline, ...listed.map((item) => `${item.name}: ${localizeText(item.shortDescription, lang)}`)];
    })(),
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

function setHreflangLinks(alternates: SEOConfig["alternates"]): void {
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((n) => n.remove());
  alternates.forEach((alternate) => {
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

/**
 * Keeps the head in sync after a client-side navigation.
 *
 * `detailSlug` has to reach every call below. It used to be passed to
 * getSEOConfig only, so on a business or guide detail page the SPA replaced the
 * correct prerendered hreflang set and JSON-LD with the parent index page's —
 * meaning Google's rendered view of every detail page carried the wrong
 * canonical alternates and no LocalBusiness or TravelGuide markup at all.
 */
export function updateDocumentSEO(lang: LanguageCode, routeId: RouteId = "home", detailSlug?: string): void {
  const meta = getSEOConfig(lang, routeId, detailSlug);

  document.title = meta.title;
  setMeta("description", meta.description);
  setMeta("author", meta.author);
  setMeta("robots", meta.robots);
  setMeta("googlebot", meta.robots);
  setMeta("og:type", meta.ogType, true);
  setMeta("og:site_name", meta.siteName, true);
  setMeta("og:url", meta.canonicalUrl, true);
  setMeta("og:title", meta.title, true);
  setMeta("og:description", meta.description, true);
  setMeta("og:image", meta.socialImageUrl, true);
  setMeta("og:image:url", meta.socialImageUrl, true);
  setMeta("og:image:secure_url", meta.socialImageUrl, true);
  setMeta("og:image:width", String(meta.socialImageWidth), true);
  setMeta("og:image:height", String(meta.socialImageHeight), true);
  setMeta("og:image:alt", meta.imageAlt, true);
  setMeta("og:image:type", meta.socialImageType, true);
  setMeta("og:locale", meta.locale, true);
  setOpenGraphLocaleAlternates(meta.ogLocaleAlternates);
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:site", "@unlockingbulgaria");
  setMeta("twitter:title", meta.title);
  setMeta("twitter:description", meta.description);
  setMeta("twitter:image", meta.socialImageUrl);
  setMeta("twitter:image:alt", meta.imageAlt);
  setCanonical(meta.canonicalUrl);
  setHreflangLinks(meta.alternates);
  injectJSONLD(buildJSONLD(lang, routeId, detailSlug));
}
