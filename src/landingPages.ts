import { contentByLanguage } from "./locales";
import { images } from "./locales/shared";
import type { LanguageCode, PageCopy, PlaceId } from "./locales/types";
import { uiTextByLanguage } from "./uiText";

export type LandingPageId =
  | "visitAglen"
  | "thingsToDo"
  | "natureAroundAglen"
  | "historyOfAglen"
  | "accommodationNearAglen"
  | "traditionalFood"
  | "hiddenPlaces"
  | "culturalTourism"
  | "natureTourism"
  | "adventureTourism"
  | "familyTrip"
  | "campingNearAglen"
  | "weekendInAglen"
  | "routeMap"
  | "bestTime"
  | "howToGet"
  | "aglenFromSofia"
  | "lovechRegionGuide"
  | "lukovitGuide"
  | "karlukovoGuide"
  | "krushunaGuide"
  | "devetashkaCaveGuide"
  | "iskarPanegaGuide"
  | "ruralTourismBulgaria"
  | "ecoTourismBulgaria"
  | "slowTravelBulgaria"
  | "aiAnswerHub";

export type LandingPageSection = {
  heading: string;
  body: string;
};

/**
 * A section body split into the paragraphs it should render as.
 *
 * A card whose body is a list — all year / spring and autumn / summer / winter —
 * set as one block of prose makes the reader do the un-listing themselves, and
 * at four sentences it stops being read at all. An authored body may therefore
 * break its lines with `\n`; a generated body never contains one, so the pages
 * nobody has written by hand come back as the single paragraph they already are.
 *
 * Exported and used by BOTH the React card and the no-JavaScript fallback, for
 * the same reason `storyBlocks` is: two copies of a split eventually disagree
 * about where the paragraphs are.
 */
export function sectionParagraphs(body: string): string[] {
  const lines = body.split("\n").map((line) => line.trim()).filter(Boolean);
  return lines.length > 0 ? lines : [body];
}

export type LandingPageFaq = {
  question: string;
  answer: string;
};

export type LandingPage = {
  id: LandingPageId;
  slug: string;
  sectionId: "seo-guide";
  category: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  keywords: string[];
  secondaryKeywords: string[];
  bulgarianKeywords: string[];
  image: string;
  imageAlt: string;
  ctaLabel: string;
  schemaType: "Article" | "TravelGuide";
  sections: LandingPageSection[];
  faqs: LandingPageFaq[];
  internalLinks: Array<{ label: string; routeId: LandingPageId | string }>;
  interactive?: LandingInteractive;
};

/** The interactive blocks a landing page can carry. */
export type LandingInteractive = "transport" | "routes" | "checklist" | "seasons";

type LandingPageMaster = {
  id: LandingPageId;
  slug: string;
  image: string;
  imageAltKey: "hero" | "aerial" | "cave" | "church" | "pool" | "nearbyRetreat" | "kaleto";
  schemaType: "Article" | "TravelGuide";
  internalLinkRouteIds: Array<LandingPageId | string>;
  /** An interactive block this page carries — declared in data, not by id in JSX. */
  interactive?: LandingInteractive;
};

/**
 * Authored copy that replaces the generated copy for one page in one language.
 * Every field is optional: a page that only needs its prose rewritten should not
 * have to restate its title, its alt text and its three FAQs to say so. What is
 * omitted falls through to the generated page.
 */
type LandingPageOverride = {
  category?: string;
  title?: string;
  metaDescription?: string;
  h1?: string;
  intro?: string;
  imageAlt?: string;
  ctaLabel?: string;
  sections?: LandingPageSection[];
  faqs?: LandingPageFaq[];
  keywords?: string[];
  secondaryKeywords?: string[];
};

export const landingPageMaster: LandingPageMaster[] = [
  { id: "visitAglen", slug: "visit-aglen", image: images.hero, imageAltKey: "hero", schemaType: "TravelGuide", internalLinkRouteIds: ["attractions", "thingsToDo", "accommodationNearAglen", "vitRiver", "contact"] },
  { id: "thingsToDo", slug: "things-to-do-in-aglen", image: images.aerial, imageAltKey: "aerial", schemaType: "TravelGuide", internalLinkRouteIds: ["fishing", "hiking", "quests", "weekendInAglen"] },
  { id: "natureAroundAglen", slug: "nature-around-aglen", image: images.hero, imageAltKey: "hero", schemaType: "TravelGuide", internalLinkRouteIds: ["vitRiver", "hiking", "caves", "ecoTourismBulgaria"] },
  { id: "historyOfAglen", slug: "history-of-aglen", image: images.kaleto, imageAltKey: "kaleto", schemaType: "Article", internalLinkRouteIds: ["culturalTourism", "attractions", "quests", "editorial"] },
  { id: "accommodationNearAglen", slug: "accommodation-near-aglen", image: images.church, imageAltKey: "church", schemaType: "Article", internalLinkRouteIds: ["visitAglen", "campingNearAglen", "traditionalFood", "contact"] },
  { id: "traditionalFood", slug: "traditional-food-aglen", image: images.church, imageAltKey: "church", schemaType: "Article", internalLinkRouteIds: ["accommodationNearAglen", "visitAglen", "ruralTourismBulgaria"] },
  { id: "hiddenPlaces", slug: "hidden-places-near-aglen", image: images.nearbyRetreat, imageAltKey: "nearbyRetreat", schemaType: "TravelGuide", internalLinkRouteIds: ["lukovitGuide", "karlukovoGuide", "krushunaGuide", "devetashkaCaveGuide"] },
  { id: "culturalTourism", slug: "cultural-tourism-aglen", image: images.kaleto, imageAltKey: "kaleto", schemaType: "TravelGuide", internalLinkRouteIds: ["historyOfAglen", "quests", "contact"] },
  { id: "natureTourism", slug: "nature-tourism-aglen", image: images.hero, imageAltKey: "hero", schemaType: "TravelGuide", internalLinkRouteIds: ["natureAroundAglen", "vitRiver", "campingNearAglen"] },
  { id: "adventureTourism", slug: "adventure-tourism-aglen", image: images.cave, imageAltKey: "cave", schemaType: "TravelGuide", internalLinkRouteIds: ["quests", "hiking", "caves"] },
  { id: "familyTrip", slug: "family-trip-aglen", image: images.pool, imageAltKey: "pool", schemaType: "TravelGuide", internalLinkRouteIds: ["thingsToDo", "weekendInAglen", "accommodationNearAglen"], interactive: "checklist" },
  { id: "campingNearAglen", slug: "camping-near-aglen", image: images.aerial, imageAltKey: "aerial", schemaType: "Article", internalLinkRouteIds: ["accommodationNearAglen", "natureTourism", "vitRiver"] },
  { id: "weekendInAglen", slug: "weekend-in-aglen", image: images.hero, imageAltKey: "hero", schemaType: "TravelGuide", internalLinkRouteIds: ["aglenFromSofia", "howToGet", "nearby"] },
  { id: "routeMap", slug: "aglen-route-map", image: images.aerial, imageAltKey: "aerial", schemaType: "TravelGuide", internalLinkRouteIds: ["visitAglen", "attractions", "nearby"], interactive: "routes" },
  { id: "bestTime", slug: "best-time-to-visit-aglen", image: images.aerial, imageAltKey: "aerial", schemaType: "Article", internalLinkRouteIds: ["seasonal", "weekendInAglen", "natureTourism"], interactive: "seasons" },
  { id: "howToGet", slug: "how-to-get-to-aglen", image: images.aerial, imageAltKey: "aerial", schemaType: "Article", internalLinkRouteIds: ["aglenFromSofia", "lukovitGuide", "routeMap"], interactive: "transport" },
  { id: "aglenFromSofia", slug: "aglen-from-sofia", image: images.hero, imageAltKey: "hero", schemaType: "TravelGuide", internalLinkRouteIds: ["weekendInAglen", "howToGet", "nearby"] },
  { id: "lovechRegionGuide", slug: "lovech-region-travel-guide", image: images.aerial, imageAltKey: "aerial", schemaType: "TravelGuide", internalLinkRouteIds: ["lukovitGuide", "krushunaGuide", "devetashkaCaveGuide", "visitAglen"] },
  { id: "lukovitGuide", slug: "lukovit-travel-guide", image: images.nearbyRetreat, imageAltKey: "nearbyRetreat", schemaType: "TravelGuide", internalLinkRouteIds: ["visitAglen", "iskarPanegaGuide", "karlukovoGuide"] },
  { id: "karlukovoGuide", slug: "karlukovo-travel-guide", image: images.cave, imageAltKey: "cave", schemaType: "TravelGuide", internalLinkRouteIds: ["caves", "hiking", "weekendInAglen"] },
  { id: "krushunaGuide", slug: "krushuna-travel-guide", image: images.pool, imageAltKey: "pool", schemaType: "TravelGuide", internalLinkRouteIds: ["lovechRegionGuide", "devetashkaCaveGuide", "visitAglen"] },
  { id: "devetashkaCaveGuide", slug: "devetashka-cave-travel-guide", image: images.cave, imageAltKey: "cave", schemaType: "TravelGuide", internalLinkRouteIds: ["krushunaGuide", "lovechRegionGuide", "caves"] },
  { id: "iskarPanegaGuide", slug: "iskar-panega-travel-guide", image: images.nearbyRetreat, imageAltKey: "nearbyRetreat", schemaType: "TravelGuide", internalLinkRouteIds: ["lukovitGuide", "hiking", "natureAroundAglen"] },
  { id: "ruralTourismBulgaria", slug: "rural-tourism-bulgaria-aglen", image: images.church, imageAltKey: "church", schemaType: "Article", internalLinkRouteIds: ["accommodationNearAglen", "traditionalFood", "slowTravelBulgaria"] },
  { id: "ecoTourismBulgaria", slug: "eco-tourism-bulgaria-aglen", image: images.hero, imageAltKey: "hero", schemaType: "Article", internalLinkRouteIds: ["natureAroundAglen", "campingNearAglen", "vitRiver"] },
  { id: "slowTravelBulgaria", slug: "slow-travel-bulgaria-aglen", image: images.aerial, imageAltKey: "aerial", schemaType: "Article", internalLinkRouteIds: ["ruralTourismBulgaria", "hiddenPlaces", "weekendInAglen"] },
  { id: "aiAnswerHub", slug: "aglen-answer-hub", image: images.hero, imageAltKey: "hero", schemaType: "Article", internalLinkRouteIds: ["crawlerPolicy", "visitAglen", "contact", "editorial"] },
];

const pageNames: Record<LanguageCode, Record<LandingPageId, string>> = {
  bg: {
    visitAglen: "Посети Ъглен", thingsToDo: "Какво да правиш в Ъглен", natureAroundAglen: "Природата около Ъглен", historyOfAglen: "История на Ъглен", accommodationNearAglen: "Настаняване край Ъглен", traditionalFood: "Традиционна храна в Ъглен", hiddenPlaces: "Скрити места край Ъглен", culturalTourism: "Културен туризъм в Ъглен", natureTourism: "Природен туризъм в Ъглен", adventureTourism: "Приключенски туризъм в Ъглен", familyTrip: "Семейно пътуване до Ъглен", campingNearAglen: "Къмпинг край Ъглен", weekendInAglen: "Уикенд в Ъглен", routeMap: "Маршрутна карта на Ъглен", bestTime: "Най-добро време за посещение", howToGet: "Как да стигнеш до Ъглен", aglenFromSofia: "Ъглен от София", lovechRegionGuide: "Пътеводител за Ловешка област", lukovitGuide: "Пътеводител за Луковит", karlukovoGuide: "Пътеводител за Карлуково", krushunaGuide: "Пътеводител за Крушуна", devetashkaCaveGuide: "Пътеводител за Деветашката пещера", iskarPanegaGuide: "Пътеводител за Искър-Панега", ruralTourismBulgaria: "Селски туризъм в България", ecoTourismBulgaria: "Екотуризъм в България", slowTravelBulgaria: "Бавно пътуване в България", aiAnswerHub: "Отговори за Ъглен",
  },
  en: {
    visitAglen: "Visit Aglen", thingsToDo: "Things to Do in Aglen", natureAroundAglen: "Nature Around Aglen", historyOfAglen: "History of Aglen", accommodationNearAglen: "Accommodation Near Aglen", traditionalFood: "Traditional Food in Aglen", hiddenPlaces: "Hidden Places Near Aglen", culturalTourism: "Cultural Tourism in Aglen", natureTourism: "Nature Tourism in Aglen", adventureTourism: "Adventure Tourism in Aglen", familyTrip: "Family Trip to Aglen", campingNearAglen: "Camping Near Aglen", weekendInAglen: "Weekend in Aglen", routeMap: "Aglen Route Map", bestTime: "Best Time to Visit Aglen", howToGet: "How to Get to Aglen", aglenFromSofia: "Aglen from Sofia", lovechRegionGuide: "Lovech Region Travel Guide", lukovitGuide: "Lukovit Travel Guide", karlukovoGuide: "Karlukovo Travel Guide", krushunaGuide: "Krushuna Travel Guide", devetashkaCaveGuide: "Devetashka Cave Travel Guide", iskarPanegaGuide: "Iskar-Panega Travel Guide", ruralTourismBulgaria: "Rural Tourism in Bulgaria", ecoTourismBulgaria: "Eco Tourism in Bulgaria", slowTravelBulgaria: "Slow Travel in Bulgaria", aiAnswerHub: "Aglen Answer Hub",
  },
  de: {
    visitAglen: "Aglen besuchen", thingsToDo: "Aktivitäten in Aglen", natureAroundAglen: "Natur rund um Aglen", historyOfAglen: "Geschichte von Aglen", accommodationNearAglen: "Unterkunft nahe Aglen", traditionalFood: "Traditionelles Essen in Aglen", hiddenPlaces: "Verborgene Orte nahe Aglen", culturalTourism: "Kulturtourismus in Aglen", natureTourism: "Naturtourismus in Aglen", adventureTourism: "Abenteuertourismus in Aglen", familyTrip: "Familienausflug nach Aglen", campingNearAglen: "Camping nahe Aglen", weekendInAglen: "Wochenende in Aglen", routeMap: "Aglen-Routenkarte", bestTime: "Beste Reisezeit für Aglen", howToGet: "Anreise nach Aglen", aglenFromSofia: "Aglen ab Sofia", lovechRegionGuide: "Reiseführer Region Lovech", lukovitGuide: "Reiseführer Lukovit", karlukovoGuide: "Reiseführer Karlukovo", krushunaGuide: "Reiseführer Krushuna", devetashkaCaveGuide: "Reiseführer Devetashka-Höhle", iskarPanegaGuide: "Reiseführer Iskar-Panega", ruralTourismBulgaria: "Ländlicher Tourismus in Bulgarien", ecoTourismBulgaria: "Ökotourismus in Bulgarien", slowTravelBulgaria: "Slow Travel in Bulgarien", aiAnswerHub: "Aglen-Antwortzentrum",
  },
  fr: {
    visitAglen: "Visiter Aglen", thingsToDo: "Que faire à Aglen", natureAroundAglen: "Nature autour d'Aglen", historyOfAglen: "Histoire d'Aglen", accommodationNearAglen: "Hébergement près d'Aglen", traditionalFood: "Cuisine traditionnelle à Aglen", hiddenPlaces: "Lieux cachés près d'Aglen", culturalTourism: "Tourisme culturel à Aglen", natureTourism: "Tourisme nature à Aglen", adventureTourism: "Tourisme d'aventure à Aglen", familyTrip: "Voyage en famille à Aglen", campingNearAglen: "Camping près d'Aglen", weekendInAglen: "Week-end à Aglen", routeMap: "Carte des routes d'Aglen", bestTime: "Meilleure période pour Aglen", howToGet: "Comment aller à Aglen", aglenFromSofia: "Aglen depuis Sofia", lovechRegionGuide: "Guide de la région de Lovech", lukovitGuide: "Guide de Lukovit", karlukovoGuide: "Guide de Karlukovo", krushunaGuide: "Guide de Krushuna", devetashkaCaveGuide: "Guide de la grotte Devetashka", iskarPanegaGuide: "Guide Iskar-Panega", ruralTourismBulgaria: "Tourisme rural en Bulgarie", ecoTourismBulgaria: "Écotourisme en Bulgarie", slowTravelBulgaria: "Slow travel en Bulgarie", aiAnswerHub: "Centre de réponses Aglen",
  },
  es: {
    visitAglen: "Visitar Aglen", thingsToDo: "Qué hacer en Aglen", natureAroundAglen: "Naturaleza alrededor de Aglen", historyOfAglen: "Historia de Aglen", accommodationNearAglen: "Alojamiento cerca de Aglen", traditionalFood: "Comida tradicional en Aglen", hiddenPlaces: "Lugares ocultos cerca de Aglen", culturalTourism: "Turismo cultural en Aglen", natureTourism: "Turismo de naturaleza en Aglen", adventureTourism: "Turismo de aventura en Aglen", familyTrip: "Viaje familiar a Aglen", campingNearAglen: "Camping cerca de Aglen", weekendInAglen: "Fin de semana en Aglen", routeMap: "Mapa de rutas de Aglen", bestTime: "Mejor época para visitar Aglen", howToGet: "Cómo llegar a Aglen", aglenFromSofia: "Aglen desde Sofía", lovechRegionGuide: "Guía de la región de Lovech", lukovitGuide: "Guía de Lukovit", karlukovoGuide: "Guía de Karlukovo", krushunaGuide: "Guía de Krushuna", devetashkaCaveGuide: "Guía de la cueva Devetashka", iskarPanegaGuide: "Guía de Iskar-Panega", ruralTourismBulgaria: "Turismo rural en Bulgaria", ecoTourismBulgaria: "Ecoturismo en Bulgaria", slowTravelBulgaria: "Slow travel en Bulgaria", aiAnswerHub: "Centro de respuestas de Aglen",
  },
  it: {
    visitAglen: "Visitare Aglen", thingsToDo: "Cosa fare ad Aglen", natureAroundAglen: "Natura intorno ad Aglen", historyOfAglen: "Storia di Aglen", accommodationNearAglen: "Alloggi vicino ad Aglen", traditionalFood: "Cibo tradizionale ad Aglen", hiddenPlaces: "Luoghi nascosti vicino ad Aglen", culturalTourism: "Turismo culturale ad Aglen", natureTourism: "Turismo naturalistico ad Aglen", adventureTourism: "Turismo d'avventura ad Aglen", familyTrip: "Viaggio in famiglia ad Aglen", campingNearAglen: "Campeggio vicino ad Aglen", weekendInAglen: "Weekend ad Aglen", routeMap: "Mappa degli itinerari di Aglen", bestTime: "Periodo migliore per Aglen", howToGet: "Come arrivare ad Aglen", aglenFromSofia: "Aglen da Sofia", lovechRegionGuide: "Guida della regione di Lovech", lukovitGuide: "Guida di Lukovit", karlukovoGuide: "Guida di Karlukovo", krushunaGuide: "Guida di Krushuna", devetashkaCaveGuide: "Guida alla grotta Devetashka", iskarPanegaGuide: "Guida Iskar-Panega", ruralTourismBulgaria: "Turismo rurale in Bulgaria", ecoTourismBulgaria: "Ecoturismo in Bulgaria", slowTravelBulgaria: "Slow travel in Bulgaria", aiAnswerHub: "Centro risposte Aglen",
  },
  ro: {
    visitAglen: "Vizitează Aglen", thingsToDo: "Ce poți face în Aglen", natureAroundAglen: "Natura din jurul Aglen", historyOfAglen: "Istoria Aglen", accommodationNearAglen: "Cazare lângă Aglen", traditionalFood: "Mâncare tradițională în Aglen", hiddenPlaces: "Locuri ascunse lângă Aglen", culturalTourism: "Turism cultural în Aglen", natureTourism: "Turism de natură în Aglen", adventureTourism: "Turism de aventură în Aglen", familyTrip: "Excursie de familie la Aglen", campingNearAglen: "Camping lângă Aglen", weekendInAglen: "Weekend în Aglen", routeMap: "Harta rutelor Aglen", bestTime: "Cel mai bun timp pentru Aglen", howToGet: "Cum ajungi la Aglen", aglenFromSofia: "Aglen din Sofia", lovechRegionGuide: "Ghidul regiunii Lovech", lukovitGuide: "Ghid Lukovit", karlukovoGuide: "Ghid Karlukovo", krushunaGuide: "Ghid Krushuna", devetashkaCaveGuide: "Ghid Peștera Devetashka", iskarPanegaGuide: "Ghid Iskar-Panega", ruralTourismBulgaria: "Turism rural în Bulgaria", ecoTourismBulgaria: "Ecoturism în Bulgaria", slowTravelBulgaria: "Slow travel în Bulgaria", aiAnswerHub: "Hub de răspunsuri Aglen",
  },
  tr: {
    visitAglen: "Aglen'i ziyaret et", thingsToDo: "Aglen'de yapılacaklar", natureAroundAglen: "Aglen çevresinde doğa", historyOfAglen: "Aglen tarihi", accommodationNearAglen: "Aglen yakınında konaklama", traditionalFood: "Aglen'de geleneksel yemek", hiddenPlaces: "Aglen yakınında gizli yerler", culturalTourism: "Aglen'de kültür turizmi", natureTourism: "Aglen'de doğa turizmi", adventureTourism: "Aglen'de macera turizmi", familyTrip: "Aglen'e aile gezisi", campingNearAglen: "Aglen yakınında kamp", weekendInAglen: "Aglen'de hafta sonu", routeMap: "Aglen rota haritası", bestTime: "Aglen'i ziyaret için en iyi zaman", howToGet: "Aglen'e nasıl gidilir", aglenFromSofia: "Sofya'dan Aglen", lovechRegionGuide: "Lovech bölgesi rehberi", lukovitGuide: "Lukovit rehberi", karlukovoGuide: "Karlukovo rehberi", krushunaGuide: "Krushuna rehberi", devetashkaCaveGuide: "Devetashka Mağarası rehberi", iskarPanegaGuide: "Iskar-Panega rehberi", ruralTourismBulgaria: "Bulgaristan'da kırsal turizm", ecoTourismBulgaria: "Bulgaristan'da ekoturizm", slowTravelBulgaria: "Bulgaristan'da yavaş seyahat", aiAnswerHub: "Aglen yanıt merkezi",
  },
  el: {
    visitAglen: "Επίσκεψη στο Aglen", thingsToDo: "Τι να κάνετε στο Aglen", natureAroundAglen: "Φύση γύρω από το Aglen", historyOfAglen: "Ιστορία του Aglen", accommodationNearAglen: "Διαμονή κοντά στο Aglen", traditionalFood: "Παραδοσιακό φαγητό στο Aglen", hiddenPlaces: "Κρυφά μέρη κοντά στο Aglen", culturalTourism: "Πολιτιστικός τουρισμός στο Aglen", natureTourism: "Φυσιολατρικός τουρισμός στο Aglen", adventureTourism: "Τουρισμός περιπέτειας στο Aglen", familyTrip: "Οικογενειακό ταξίδι στο Aglen", campingNearAglen: "Κάμπινγκ κοντά στο Aglen", weekendInAglen: "Σαββατοκύριακο στο Aglen", routeMap: "Χάρτης διαδρομών Aglen", bestTime: "Καλύτερη εποχή για Aglen", howToGet: "Πώς να φτάσετε στο Aglen", aglenFromSofia: "Aglen από Σόφια", lovechRegionGuide: "Οδηγός περιοχής Lovech", lukovitGuide: "Οδηγός Lukovit", karlukovoGuide: "Οδηγός Karlukovo", krushunaGuide: "Οδηγός Krushuna", devetashkaCaveGuide: "Οδηγός σπηλαίου Devetashka", iskarPanegaGuide: "Οδηγός Iskar-Panega", ruralTourismBulgaria: "Αγροτικός τουρισμός στη Βουλγαρία", ecoTourismBulgaria: "Οικοτουρισμός στη Βουλγαρία", slowTravelBulgaria: "Αργό ταξίδι στη Βουλγαρία", aiAnswerHub: "Κέντρο απαντήσεων Aglen",
  },
  ru: {
    visitAglen: "Посетить Аглен", thingsToDo: "Чем заняться в Аглене", natureAroundAglen: "Природа вокруг Аглена", historyOfAglen: "История Аглена", accommodationNearAglen: "Жильё рядом с Агленом", traditionalFood: "Традиционная еда в Аглене", hiddenPlaces: "Скрытые места рядом с Агленом", culturalTourism: "Культурный туризм в Аглене", natureTourism: "Природный туризм в Аглене", adventureTourism: "Приключенческий туризм в Аглене", familyTrip: "Семейная поездка в Аглен", campingNearAglen: "Кемпинг рядом с Агленом", weekendInAglen: "Выходные в Аглене", routeMap: "Карта маршрутов Аглена", bestTime: "Лучшее время для Аглена", howToGet: "Как добраться до Аглена", aglenFromSofia: "Аглен из Софии", lovechRegionGuide: "Путеводитель по региону Ловеч", lukovitGuide: "Путеводитель по Луковиту", karlukovoGuide: "Путеводитель по Карлуково", krushunaGuide: "Путеводитель по Крушуне", devetashkaCaveGuide: "Путеводитель по Деветашской пещере", iskarPanegaGuide: "Путеводитель по Искыр-Панега", ruralTourismBulgaria: "Сельский туризм в Болгарии", ecoTourismBulgaria: "Экотуризм в Болгарии", slowTravelBulgaria: "Медленное путешествие в Болгарии", aiAnswerHub: "Центр ответов Аглена",
  },
  ja: {
    visitAglen: "アグレンを訪れる", thingsToDo: "アグレンでできること", natureAroundAglen: "アグレン周辺の自然", historyOfAglen: "アグレンの歴史", accommodationNearAglen: "アグレン近くの宿泊", traditionalFood: "アグレンの伝統料理", hiddenPlaces: "アグレン近くの隠れた場所", culturalTourism: "アグレンの文化観光", natureTourism: "アグレンの自然観光", adventureTourism: "アグレンの冒険観光", familyTrip: "家族で行くアグレン", campingNearAglen: "アグレン近くのキャンプ", weekendInAglen: "アグレンの週末", routeMap: "アグレンルートマップ", bestTime: "アグレンのベストシーズン", howToGet: "アグレンへの行き方", aglenFromSofia: "ソフィアからアグレンへ", lovechRegionGuide: "ロヴェチ地域ガイド", lukovitGuide: "ルコヴィトガイド", karlukovoGuide: "カルルコヴォガイド", krushunaGuide: "クルシュナガイド", devetashkaCaveGuide: "デヴェタシュカ洞窟ガイド", iskarPanegaGuide: "イスカル・パネガガイド", ruralTourismBulgaria: "ブルガリアの農村観光", ecoTourismBulgaria: "ブルガリアのエコツーリズム", slowTravelBulgaria: "ブルガリアのスロートラベル", aiAnswerHub: "アグレン回答ハブ",
  },
  sr: {
    visitAglen: "Посети Аглен", thingsToDo: "Шта радити у Аглену", natureAroundAglen: "Природа око Аглена", historyOfAglen: "Историја Аглена", accommodationNearAglen: "Смештај близу Аглена", traditionalFood: "Традиционална храна у Аглену", hiddenPlaces: "Скривена места близу Аглена", culturalTourism: "Културни туризам у Аглену", natureTourism: "Природни туризам у Аглену", adventureTourism: "Авантуристички туризам у Аглену", familyTrip: "Породично путовање у Аглен", campingNearAglen: "Камповање близу Аглена", weekendInAglen: "Викенд у Аглену", routeMap: "Мапа рута Аглена", bestTime: "Најбоље време за Аглен", howToGet: "Како стићи до Аглена", aglenFromSofia: "Аглен из Софије", lovechRegionGuide: "Водич за регион Ловеч", lukovitGuide: "Водич за Луковит", karlukovoGuide: "Водич за Карлуково", krushunaGuide: "Водич за Крушуну", devetashkaCaveGuide: "Водич за Деветашку пећину", iskarPanegaGuide: "Водич за Искар-Панегу", ruralTourismBulgaria: "Сеоски туризам у Бугарској", ecoTourismBulgaria: "Екотуризам у Бугарској", slowTravelBulgaria: "Споро путовање у Бугарској", aiAnswerHub: "Центар одговора Аглен",
  },
  zh: {
    visitAglen: "访问阿格伦", thingsToDo: "阿格伦可做之事", natureAroundAglen: "阿格伦周边自然", historyOfAglen: "阿格伦历史", accommodationNearAglen: "阿格伦附近住宿", traditionalFood: "阿格伦传统食物", hiddenPlaces: "阿格伦附近隐秘地点", culturalTourism: "阿格伦文化旅游", natureTourism: "阿格伦自然旅游", adventureTourism: "阿格伦冒险旅游", familyTrip: "阿格伦家庭旅行", campingNearAglen: "阿格伦附近露营", weekendInAglen: "阿格伦周末", routeMap: "阿格伦路线地图", bestTime: "访问阿格伦的最佳时间", howToGet: "如何到达阿格伦", aglenFromSofia: "从索非亚到阿格伦", lovechRegionGuide: "洛维奇地区指南", lukovitGuide: "卢科维特指南", karlukovoGuide: "卡尔卢科沃指南", krushunaGuide: "克鲁舒纳指南", devetashkaCaveGuide: "德维塔什卡洞穴指南", iskarPanegaGuide: "伊斯卡尔-帕内加指南", ruralTourismBulgaria: "保加利亚乡村旅游", ecoTourismBulgaria: "保加利亚生态旅游", slowTravelBulgaria: "保加利亚慢旅行", aiAnswerHub: "阿格伦问答中心",
  },
  hu: {
    visitAglen: "Aglen meglátogatása", thingsToDo: "Programok Aglenben", natureAroundAglen: "Természet Aglen körül", historyOfAglen: "Aglen története", accommodationNearAglen: "Szállás Aglen közelében", traditionalFood: "Hagyományos étel Aglenben", hiddenPlaces: "Rejtett helyek Aglen közelében", culturalTourism: "Kulturális turizmus Aglenben", natureTourism: "Természeti turizmus Aglenben", adventureTourism: "Kalandturizmus Aglenben", familyTrip: "Családi utazás Aglenbe", campingNearAglen: "Kemping Aglen közelében", weekendInAglen: "Hétvége Aglenben", routeMap: "Aglen útvonaltérkép", bestTime: "Legjobb idő Aglenhez", howToGet: "Hogyan juthatsz Aglenbe", aglenFromSofia: "Aglen Szófiából", lovechRegionGuide: "Lovech régió kalauz", lukovitGuide: "Lukovit kalauz", karlukovoGuide: "Karlukovo kalauz", krushunaGuide: "Krushuna kalauz", devetashkaCaveGuide: "Devetashka-barlang kalauz", iskarPanegaGuide: "Iskar-Panega kalauz", ruralTourismBulgaria: "Falusi turizmus Bulgáriában", ecoTourismBulgaria: "Ökoturizmus Bulgáriában", slowTravelBulgaria: "Lassú utazás Bulgáriában", aiAnswerHub: "Aglen válaszközpont",
  },
};

type LandingLanguageText = {
  category: string;
  titleSeparator: string;
  metaPrefix: string;
  introPrefix: string;
  sectionHeadings: [string, string, string];
  sectionBodies: [string, string, string];
  cta: string;
  faqWhere: string;
  faqWhereAnswer: string;
  faqDo: string;
  faqDoAnswer: string;
  faqWhen: string;
  faqWhenAnswer: string;
  keywordSuffixes: string[];
};

const landingText: Record<LanguageCode, LandingLanguageText> = {
  bg: { category: "Туристическо ръководство", titleSeparator: " | ", metaPrefix: "Планирай", introPrefix: "Това ръководство помага да планираш", sectionHeadings: ["За кого е това ръководство", "Как да планираш посещението", "Какво да свържеш наблизо"], sectionBodies: ["Подрежда реката, скалите, селската памет и практичните нужди на посетителите в ясен маршрут.", "Провери сезон, достъп, време, обувки, вода и дали е нужна актуална местна насока.", "Използвай вътрешните връзки, за да съчетаеш темата с маршрути, настаняване, храна и близки места."], cta: "Попитай за посещение", faqWhere: "Къде се намира Ъглен?", faqWhereAnswer: "Ъглен е село в Ловешка област, Северна България, близо до Луковит и долината на река Вит.", faqDo: "Какво могат да правят посетителите?", faqDoAnswer: "Посетителите могат да вървят край реката, да снимат, да разглеждат скални форми, да планират риболов, къмпинг, местни истории и AR преживяване.", faqWhen: "Кога е най-доброто време?", faqWhenAnswer: "Пролетта и есента са най-силни за ходене и фотография, а лятото е подходящо за речни паузи и внимателно планиране.", keywordSuffixes: ["Ъглен", "река Вит", "Луковит", "Ловешка област", "селски туризъм"] },
  en: { category: "Travel guide", titleSeparator: " | ", metaPrefix: "Plan", introPrefix: "This guide helps you plan", sectionHeadings: ["Who this guide is for", "How to plan the visit", "What to connect nearby"], sectionBodies: ["Organizes the river, rocks, village memory, and practical visitor needs into a clear route.", "Check season, access, timing, shoes, water, and whether current local guidance is useful.", "Use the internal links to combine this topic with routes, stays, food, and nearby places."], cta: "Ask about a visit", faqWhere: "Where is Aglen?", faqWhereAnswer: "Aglen is a village in Lovech Province, Northern Bulgaria, near Lukovit and the Vit River valley.", faqDo: "What can visitors do?", faqDoAnswer: "Visitors can walk river routes, photograph limestone places, plan fishing, camping, local stories, and an AR experience.", faqWhen: "When is the best time?", faqWhenAnswer: "Spring and autumn are strongest for walking and photography, while summer suits river pauses with careful planning.", keywordSuffixes: ["Aglen", "Vit River", "Lukovit", "Lovech region", "rural tourism"] },
  de: { category: "Reiseführer", titleSeparator: " | ", metaPrefix: "Plane", introPrefix: "Dieser Führer hilft bei der Planung von", sectionHeadings: ["Für wen dieser Führer ist", "So planst du den Besuch", "Was du in der Nähe verbindest"], sectionBodies: ["Ordnet Fluss, Felsen, Dorfgedächtnis und praktische Besucherfragen zu einer klaren Route.", "Prüfe Saison, Zugang, Zeit, Schuhe, Wasser und ob aktuelle lokale Hinweise sinnvoll sind.", "Nutze interne Links, um Thema, Routen, Unterkunft, Essen und nahe Orte zu verbinden."], cta: "Nach Besuch fragen", faqWhere: "Wo liegt Aglen?", faqWhereAnswer: "Aglen ist ein Dorf in der Region Lovech in Nordbulgarien, nahe Lukovit und dem Tal des Vit.", faqDo: "Was können Besucher tun?", faqDoAnswer: "Besucher können Flussrouten gehen, Kalksteinorte fotografieren, Angeln, Camping, lokale Geschichten und AR planen.", faqWhen: "Wann ist die beste Reisezeit?", faqWhenAnswer: "Frühling und Herbst sind stark für Spaziergänge und Fotografie, der Sommer passt zu Flusspausen mit guter Planung.", keywordSuffixes: ["Aglen", "Vit-Fluss", "Lukovit", "Region Lovech", "ländlicher Tourismus"] },
  fr: { category: "Guide de voyage", titleSeparator: " | ", metaPrefix: "Planifiez", introPrefix: "Ce guide aide à planifier", sectionHeadings: ["À qui s'adresse ce guide", "Comment préparer la visite", "Que relier à proximité"], sectionBodies: ["Organise la rivière, les rochers, la mémoire du village et les besoins pratiques dans un itinéraire clair.", "Vérifiez saison, accès, durée, chaussures, eau et intérêt d'un conseil local récent.", "Utilisez les liens internes pour relier ce thème aux routes, hébergements, repas et lieux proches."], cta: "Demander une visite", faqWhere: "Où se trouve Aglen ?", faqWhereAnswer: "Aglen est un village de la province de Lovech, au nord de la Bulgarie, près de Lukovit et de la vallée de la Vit.", faqDo: "Que peuvent faire les visiteurs ?", faqDoAnswer: "Les visiteurs peuvent marcher près de la rivière, photographier le calcaire, prévoir pêche, camping, récits locaux et expérience AR.", faqWhen: "Quelle est la meilleure période ?", faqWhenAnswer: "Le printemps et l'automne sont les meilleurs pour marcher et photographier; l'été convient aux pauses au bord de l'eau avec préparation.", keywordSuffixes: ["Aglen", "rivière Vit", "Lukovit", "région de Lovech", "tourisme rural"] },
  es: { category: "Guía de viaje", titleSeparator: " | ", metaPrefix: "Planifica", introPrefix: "Esta guía ayuda a planificar", sectionHeadings: ["Para quién es esta guía", "Cómo planificar la visita", "Qué conectar cerca"], sectionBodies: ["Ordena río, rocas, memoria local y necesidades prácticas en una ruta clara.", "Revisa temporada, acceso, tiempo, calzado, agua y si conviene orientación local actual.", "Usa los enlaces internos para unir el tema con rutas, alojamiento, comida y lugares cercanos."], cta: "Consultar una visita", faqWhere: "¿Dónde está Aglen?", faqWhereAnswer: "Aglen es un pueblo de la provincia de Lovech, en el norte de Bulgaria, cerca de Lukovit y del valle del Vit.", faqDo: "¿Qué pueden hacer los visitantes?", faqDoAnswer: "Pueden caminar junto al río, fotografiar caliza, planear pesca, camping, historias locales y una experiencia AR.", faqWhen: "¿Cuál es la mejor época?", faqWhenAnswer: "Primavera y otoño destacan para caminar y fotografiar; el verano sirve para pausas junto al río con buena planificación.", keywordSuffixes: ["Aglen", "río Vit", "Lukovit", "región de Lovech", "turismo rural"] },
  it: { category: "Guida di viaggio", titleSeparator: " | ", metaPrefix: "Pianifica", introPrefix: "Questa guida aiuta a pianificare", sectionHeadings: ["A chi serve questa guida", "Come pianificare la visita", "Cosa collegare nei dintorni"], sectionBodies: ["Organizza fiume, rocce, memoria del villaggio e bisogni pratici in una rotta chiara.", "Controlla stagione, accesso, tempi, scarpe, acqua e se servono indicazioni locali aggiornate.", "Usa i link interni per collegare tema, percorsi, alloggi, cibo e luoghi vicini."], cta: "Chiedi una visita", faqWhere: "Dove si trova Aglen?", faqWhereAnswer: "Aglen è un villaggio della provincia di Lovech, nel nord della Bulgaria, vicino a Lukovit e alla valle del Vit.", faqDo: "Cosa possono fare i visitatori?", faqDoAnswer: "Possono camminare lungo il fiume, fotografare luoghi calcarei, pianificare pesca, campeggio, storie locali ed esperienza AR.", faqWhen: "Qual è il periodo migliore?", faqWhenAnswer: "Primavera e autunno sono ideali per camminare e fotografare; l'estate va bene per pause sul fiume con pianificazione.", keywordSuffixes: ["Aglen", "fiume Vit", "Lukovit", "regione Lovech", "turismo rurale"] },
  ro: { category: "Ghid de călătorie", titleSeparator: " | ", metaPrefix: "Planifică", introPrefix: "Acest ghid te ajută să planifici", sectionHeadings: ["Pentru cine este ghidul", "Cum planifici vizita", "Ce legi în apropiere"], sectionBodies: ["Organizează râul, stâncile, memoria satului și nevoile practice într-un traseu clar.", "Verifică sezonul, accesul, timpul, încălțămintea, apa și dacă e util ghidaj local actual.", "Folosește linkurile interne pentru a lega tema de trasee, cazare, mâncare și locuri apropiate."], cta: "Întreabă despre vizită", faqWhere: "Unde este Aglen?", faqWhereAnswer: "Aglen este un sat din provincia Lovech, Bulgaria de Nord, aproape de Lukovit și valea râului Vit.", faqDo: "Ce pot face vizitatorii?", faqDoAnswer: "Pot merge pe trasee de râu, fotografia locuri calcaroase, planifica pescuit, camping, povești locale și experiență AR.", faqWhen: "Care este cea mai bună perioadă?", faqWhenAnswer: "Primăvara și toamna sunt excelente pentru mers și fotografie; vara merge pentru pauze la râu cu planificare atentă.", keywordSuffixes: ["Aglen", "râul Vit", "Lukovit", "regiunea Lovech", "turism rural"] },
  tr: { category: "Gezi rehberi", titleSeparator: " | ", metaPrefix: "Planla", introPrefix: "Bu rehber planlamaya yardımcı olur:", sectionHeadings: ["Bu rehber kimler için", "Ziyaret nasıl planlanır", "Yakında neyle birleştirilir"], sectionBodies: ["Nehri, kayaları, köy belleğini ve pratik ziyaretçi ihtiyaçlarını net bir rotada düzenler.", "Sezonu, erişimi, süreyi, ayakkabıyı, suyu ve güncel yerel bilginin yararlı olup olmadığını kontrol et.", "İç bağlantılarla konuyu rotalar, konaklama, yemek ve yakın yerlerle bağla."], cta: "Ziyaret hakkında sor", faqWhere: "Aglen nerede?", faqWhereAnswer: "Aglen, Kuzey Bulgaristan'da Lovech ilinde, Lukovit ve Vit Nehri vadisi yakınında bir köydür.", faqDo: "Ziyaretçiler ne yapabilir?", faqDoAnswer: "Nehir rotalarında yürüyebilir, kireçtaşı yerleri fotoğraflayabilir, balıkçılık, kamp, yerel hikâyeler ve AR deneyimi planlayabilirler.", faqWhen: "En iyi zaman ne zaman?", faqWhenAnswer: "İlkbahar ve sonbahar yürüyüş ve fotoğraf için güçlüdür; yaz dikkatli planlamayla nehir molalarına uygundur.", keywordSuffixes: ["Aglen", "Vit Nehri", "Lukovit", "Lovech bölgesi", "kırsal turizm"] },
  el: { category: "Ταξιδιωτικός οδηγός", titleSeparator: " | ", metaPrefix: "Σχεδιάστε", introPrefix: "Αυτός ο οδηγός βοηθά να σχεδιάσετε", sectionHeadings: ["Για ποιους είναι ο οδηγός", "Πώς να σχεδιάσετε την επίσκεψη", "Τι να συνδέσετε κοντά"], sectionBodies: ["Οργανώνει ποτάμι, βράχια, μνήμη χωριού και πρακτικές ανάγκες σε καθαρή διαδρομή.", "Ελέγξτε εποχή, πρόσβαση, χρόνο, παπούτσια, νερό και αν βοηθούν πρόσφατες τοπικές οδηγίες.", "Χρησιμοποιήστε εσωτερικούς συνδέσμους για σύνδεση με διαδρομές, διαμονή, φαγητό και κοντινά μέρη."], cta: "Ρωτήστε για επίσκεψη", faqWhere: "Πού βρίσκεται το Aglen;", faqWhereAnswer: "Το Aglen είναι χωριό στην επαρχία Lovech της Βόρειας Βουλγαρίας, κοντά στο Lukovit και την κοιλάδα του Vit.", faqDo: "Τι μπορούν να κάνουν οι επισκέπτες;", faqDoAnswer: "Μπορούν να περπατήσουν κοντά στο ποτάμι, να φωτογραφίσουν ασβεστολιθικά τοπία, να σχεδιάσουν ψάρεμα, κάμπινγκ, τοπικές ιστορίες και εμπειρία AR.", faqWhen: "Πότε είναι η καλύτερη περίοδος;", faqWhenAnswer: "Άνοιξη και φθινόπωρο είναι καλύτερα για περπάτημα και φωτογραφία, ενώ το καλοκαίρι ταιριάζει σε στάσεις στο ποτάμι με προσοχή.", keywordSuffixes: ["Aglen", "ποταμός Vit", "Lukovit", "περιοχή Lovech", "αγροτικός τουρισμός"] },
  ru: { category: "Туристический гид", titleSeparator: " | ", metaPrefix: "Планируйте", introPrefix: "Этот гид помогает планировать", sectionHeadings: ["Для кого этот гид", "Как планировать визит", "Что связать поблизости"], sectionBodies: ["Собирает реку, скалы, память села и практические потребности в понятный маршрут.", "Проверьте сезон, доступ, время, обувь, воду и нужны ли актуальные местные советы.", "Используйте внутренние ссылки, чтобы связать тему с маршрутами, жильём, едой и близкими местами."], cta: "Спросить о визите", faqWhere: "Где находится Аглен?", faqWhereAnswer: "Аглен — село в области Ловеч на севере Болгарии, рядом с Луковитом и долиной реки Вит.", faqDo: "Что могут делать посетители?", faqDoAnswer: "Можно гулять у реки, фотографировать известняковые места, планировать рыбалку, кемпинг, местные истории и AR-опыт.", faqWhen: "Когда лучше ехать?", faqWhenAnswer: "Весна и осень лучше всего подходят для прогулок и фотографии, лето — для речных пауз при хорошем планировании.", keywordSuffixes: ["Аглен", "река Вит", "Луковит", "регион Ловеч", "сельский туризм"] },
  ja: { category: "旅行ガイド", titleSeparator: " | ", metaPrefix: "計画する", introPrefix: "このガイドは計画に役立ちます:", sectionHeadings: ["このガイドの対象", "訪問の計画方法", "近くで組み合わせる場所"], sectionBodies: ["川、岩、村の記憶、訪問者に必要な実用情報をわかりやすいルートに整理します。", "季節、アクセス、所要時間、靴、水、最新の現地案内が役立つかを確認します。", "内部リンクでテーマをルート、宿泊、食事、近隣地へつなぎます。"], cta: "訪問について問い合わせる", faqWhere: "アグレンはどこですか？", faqWhereAnswer: "アグレンはブルガリア北部ロヴェチ州の村で、ルコヴィトとヴィト川の谷の近くにあります。", faqDo: "訪問者は何ができますか？", faqDoAnswer: "川沿いを歩き、石灰岩の場所を撮影し、釣り、キャンプ、地元の物語、AR体験を計画できます。", faqWhen: "ベストシーズンはいつですか？", faqWhenAnswer: "春と秋は散策と写真に向き、夏は準備すれば川辺の休憩に適しています。", keywordSuffixes: ["アグレン", "ヴィト川", "ルコヴィト", "ロヴェチ地域", "農村観光"] },
  sr: { category: "Туристички водич", titleSeparator: " | ", metaPrefix: "Планирај", introPrefix: "Овај водич помаже да планираш", sectionHeadings: ["За кога је овај водич", "Како планирати посету", "Шта повезати у близини"], sectionBodies: ["Сређује реку, стене, сеоско памћење и практичне потребе посетилаца у јасну руту.", "Провери сезону, приступ, време, обућу, воду и да ли су корисне актуелне локалне смернице.", "Користи унутрашње везе да тему повежеш са рутама, смештајем, храном и близином."], cta: "Питај за посету", faqWhere: "Где је Аглен?", faqWhereAnswer: "Аглен је село у области Ловеч, Северна Бугарска, близу Луковита и долине реке Вит.", faqDo: "Шта посетиоци могу да раде?", faqDoAnswer: "Могу да шетају речним рутама, фотографишу кречњачка места, планирају риболов, камп, локалне приче и AR искуство.", faqWhen: "Када је најбоље време?", faqWhenAnswer: "Пролеће и јесен су најбољи за шетњу и фотографију, а лето за речне паузе уз пажљиво планирање.", keywordSuffixes: ["Аглен", "река Вит", "Луковит", "регион Ловеч", "сеоски туризам"] },
  zh: { category: "旅行指南", titleSeparator: " | ", metaPrefix: "规划", introPrefix: "本指南帮助你规划", sectionHeadings: ["本指南适合谁", "如何规划访问", "附近可串联地点"], sectionBodies: ["把河流、岩石、村庄记忆和访客实用需求整理成清晰路线。", "确认季节、通行、时间、鞋、水以及最新本地建议是否有帮助。", "使用内部链接，把主题与路线、住宿、食物和附近地点连接起来。"], cta: "咨询访问", faqWhere: "阿格伦在哪里？", faqWhereAnswer: "阿格伦位于保加利亚北部洛维奇州，靠近卢科维特和维特河谷。", faqDo: "访客可以做什么？", faqDoAnswer: "访客可以沿河步行、拍摄石灰岩景观、规划钓鱼、露营、地方故事和 AR 体验。", faqWhen: "什么时候最好？", faqWhenAnswer: "春季和秋季最适合步行与摄影；夏季适合河边停留，但需要周密规划。", keywordSuffixes: ["阿格伦", "维特河", "卢科维特", "洛维奇地区", "乡村旅游"] },
  hu: { category: "Utazási kalauz", titleSeparator: " | ", metaPrefix: "Tervezd meg", introPrefix: "Ez a kalauz segít megtervezni", sectionHeadings: ["Kinek szól ez a kalauz", "Hogyan tervezd a látogatást", "Mit köss össze a közelben"], sectionBodies: ["A folyót, sziklákat, falusi emlékezetet és gyakorlati látogatói igényeket világos útvonallá rendezi.", "Ellenőrizd az évszakot, hozzáférést, időt, cipőt, vizet és hogy hasznos-e friss helyi útmutatás.", "Használd a belső linkeket, hogy a témát útvonalakkal, szállással, étellel és közeli helyekkel kösd össze."], cta: "Kérdezz a látogatásról", faqWhere: "Hol van Aglen?", faqWhereAnswer: "Aglen falu Észak-Bulgáriában, Lovech tartományban, Lukovit és a Vit folyó völgye közelében.", faqDo: "Mit tehetnek a látogatók?", faqDoAnswer: "Sétálhatnak folyóparti útvonalakon, fotózhatnak mészkőhelyeket, tervezhetnek horgászatot, kempinget, helyi történeteket és AR-élményt.", faqWhen: "Mikor a legjobb?", faqWhenAnswer: "Tavasz és ősz a legerősebb sétához és fotózáshoz; nyáron a folyóparti pihenés jó gondos tervezéssel.", keywordSuffixes: ["Aglen", "Vit folyó", "Lukovit", "Lovech régió", "falusi turizmus"] },
};

function imageAlt(lang: LanguageCode, key: LandingPageMaster["imageAltKey"]): string {
  const copy = contentByLanguage[lang];
  const placeAlt = (placeId: PlaceId) => copy.placesList.find((place) => place.id === placeId)?.imageAlt;
  const byKey: Record<LandingPageMaster["imageAltKey"], string> = {
    hero: copy.hero.imageAlt,
    aerial: copy.galleryItems[3]?.alt ?? copy.landmarks.aria,
    cave: copy.galleryItems[2]?.alt ?? copy.guides.caves.text,
    church: placeAlt("st-archangel-michael") ?? copy.stay.title,
    pool: placeAlt("rachkov-vir") ?? copy.guides.vitRiver.text,
    nearbyRetreat: copy.guides.nearby.text,
    kaleto: placeAlt("kaleto") ?? copy.about.title,
  };

  return byKey[key];
}

function landingImage(path: string): string {
  return path.startsWith("/assets/") || path.startsWith("http") ? path : images.hero;
}

const guideOverrides: Partial<Record<LandingPageId, Record<LanguageCode, LandingPageOverride>>> = {
  lukovitGuide: {
    bg: {
      title: "Пътеводител за Луковит, Искър-Панега и Ъглен | Ъглен",
      metaDescription: "Практичен туристически пътеводител за Луковит: Искър-Панега, Проходна, Карлуково, река Вит, Ъглен, пещери, скали, екопътеки, храна и маршрути.",
      h1: "Луковит: пътеводител за каньони, пещери и бавен маршрут към Ъглен",
      intro: "Луковит е естествен вход към едни от най-силните пейзажи в Северна България: синята вода на Искър-Панега, скалните прозорци на Проходна, карлуковските пещери и по-тихата долина на река Вит при Ъглен. Този маршрут е за хора, които искат смислен ден навън, добри снимки, кратки преходи и близка среща с местния ритъм.",
      imageAlt: "Въздушна гледка към речен каньон, варовикови скали и села около Луковит и Ъглен",
      ctaLabel: "Планирай посещение край Ъглен",
      sections: [
        { heading: "Защо да посетиш Луковит", body: "Районът събира много преживявания на малка дистанция: екопътека Искър-Панега, пещера Проходна, скалите край Карлуково, речни гледки, селски пътища и спокойни места за фотография. Луковит е удобна база за еднодневен маршрут, но най-доброто усещане идва, когато не бързаш." },
        { heading: "Как Ъглен влиза в маршрута", body: "Ъглен добавя по-тихия пласт на пътуването: река Вит, варовикови форми, селска памет, местна храна, възможни водени разходки и бавно преживяване далеч от най-посещаваните точки. Комбинирай Луковит и Искър-Панега сутринта, Карлуково или Проходна по обяд и Ъглен за залез, вечеря или уикенд нощувка." },
        { heading: "Маршрут и практични съвети", body: "Започни рано с Искър-Панега, когато светлината е мека и пътеката е по-спокойна. Продължи към Проходна или Карлуково за пещери и скални кадри. Следобед се насочи към Ъглен и река Вит за по-бавна разходка, снимки, разговор с домакин и планиране на следващо посещение. Пролетта и есента са най-добри за цветове, ходене и фотография. Лятото е подходящо за речни паузи, но тръгвай рано и носи вода. След дъжд пътеките и камъните могат да са хлъзгави; удобни обувки, зареден телефон и уважение към частните дворове са задължителни." },
      ],
      faqs: [
        { question: "Колко време е нужно за Луковит, Искър-Панега, Проходна и Ъглен?", answer: "За бърз маршрут е достатъчен един пълен ден, но уикендът е по-добър: един ден за Искър-Панега и Карлуково, втори за Ъглен, река Вит, местна храна и спокойни снимки." },
        { question: "Подходящ ли е районът за семейства?", answer: "Да, ако маршрутът е избран според възрастта и времето. Искър-Панега има лесни участъци, а Ъглен е добър за по-спокойна пауза. При пещери, скали и речни брегове децата трябва да са под постоянен надзор." },
        { question: "Къде е най-добре да се правят снимки?", answer: "Искър-Панега е силна сутрин, Проходна и Карлуково дават драматична светлина около обяд, а Ъглен и долината на Вит са най-красиви в късния следобед и при залез." },
      ],
      keywords: ["Луковит", "Искър-Панега", "Проходна", "Карлуково", "Ъглен", "река Вит"],
      secondaryKeywords: ["екопътеки край Луковит", "пещери край Карлуково", "маршрут Луковит Ъглен"],
    },
    en: {
      title: "Lukovit, Iskar-Panega and Aglen Travel Guide | Aglen",
      metaDescription: "A practical Lukovit travel guide covering Iskar-Panega, Prohodna Cave, Karlukovo, the Vit River, Aglen, caves, cliffs, eco trails, food, and day routes.",
      h1: "Lukovit Travel Guide: Canyons, Caves, and a Slow Route to Aglen",
      intro: "Lukovit is a natural gateway to some of Northern Bulgaria's strongest landscapes: the blue water of Iskar-Panega, the rock windows of Prohodna Cave, the caves around Karlukovo, and the quieter Vit River valley near Aglen. This guide is for travelers who want a meaningful day outside, strong photography, short walks, and a closer local rhythm.",
      imageAlt: "Aerial view of a river canyon, limestone cliffs, and villages around Lukovit and Aglen",
      ctaLabel: "Plan a visit near Aglen",
      sections: [
        { heading: "Why Visit Lukovit", body: "The area brings many experiences into a compact route: the Iskar-Panega eco trail, Prohodna Cave, Karlukovo's cliffs, river views, village roads, and quiet places for photography. Lukovit works as a day-trip base, but the route feels best when you leave time to slow down." },
        { heading: "How Aglen Fits the Route", body: "Aglen adds the quieter layer: the Vit River, limestone forms, village memory, local food, possible guided walks, and slow travel away from the busiest stops. Pair Lukovit and Iskar-Panega in the morning, Karlukovo or Prohodna around midday, and Aglen for sunset, dinner, or a weekend stay." },
        { heading: "Route and Practical Tips", body: "Start early at Iskar-Panega while the light is soft and the trail is calmer. Continue to Prohodna or Karlukovo for caves and rock photography. In the afternoon, head toward Aglen and the Vit River for a slower walk, photos, a host conversation, and planning a return visit. Spring and autumn are strongest for color, walking, and photography. Summer works for river pauses, but start early and carry water. After rain, trails and stones can be slippery; walking shoes, a charged phone, and respect for private village spaces matter." },
      ],
      faqs: [
        { question: "How much time do Lukovit, Iskar-Panega, Prohodna, and Aglen need?", answer: "A fast route fits into one full day, but a weekend is better: one day for Iskar-Panega and Karlukovo, and one for Aglen, the Vit River, local food, and relaxed photography." },
        { question: "Is the area good for families?", answer: "Yes, if the route matches the age of the group and the weather. Iskar-Panega has easy sections, and Aglen is good for a quieter pause. Around caves, cliffs, and riverbanks, children need close supervision." },
        { question: "Where are the best photo stops?", answer: "Iskar-Panega is strongest in the morning, Prohodna and Karlukovo give dramatic light around midday, and Aglen with the Vit valley is most atmospheric in late afternoon and sunset." },
      ],
      keywords: ["Lukovit", "Iskar-Panega", "Prohodna Cave", "Karlukovo", "Aglen", "Vit River"],
      secondaryKeywords: ["Lukovit eco trails", "Karlukovo caves", "Lukovit Aglen route"],
    },
    de: {
      title: "Reiseführer Lukovit, Iskar-Panega und Aglen | Aglen",
      metaDescription: "Praktischer Reiseführer für Lukovit mit Iskar-Panega, Prohodna-Höhle, Karlukovo, Vit-Fluss, Aglen, Höhlen, Felsen, Ökopfaden, Essen und Tagesrouten.",
      h1: "Lukovit-Reiseführer: Canyons, Höhlen und eine ruhige Route nach Aglen",
      intro: "Lukovit ist ein natürlicher Einstieg in starke Landschaften Nordbulgariens: das blaue Wasser von Iskar-Panega, die Felsfenster der Prohodna-Höhle, die Höhlen um Karlukovo und das ruhigere Tal des Vit bei Aglen.",
      imageAlt: "Luftblick auf Flusscanyon, Kalksteinfelsen und Dörfer um Lukovit und Aglen",
      ctaLabel: "Besuch bei Aglen planen",
      sections: [
        { heading: "Warum Lukovit besuchen", body: "Die Region verbindet Ökopfad Iskar-Panega, Prohodna, Karlukovo, Flussblicke, Dorfstraßen und ruhige Fotostellen auf kurzer Distanz." },
        { heading: "Wie Aglen in die Route passt", body: "Aglen ergänzt die leise Seite der Reise: Vit-Fluss, Kalksteinformen, Dorfgedächtnis, lokale Küche, geführte Spaziergänge und Slow Travel abseits der meistbesuchten Orte." },
        { heading: "Route und Tipps", body: "Beginne früh in Iskar-Panega, fahre mittags nach Prohodna oder Karlukovo und nimm dir am Nachmittag Zeit für Aglen, den Vit, Fotos und ein Gespräch mit Gastgebern. Frühling und Herbst sind ideal für Farbe, Wandern und Fotografie. Im Sommer früh starten, Wasser mitnehmen und nach Regen auf rutschige Steine achten." },
      ],
      faqs: [
        { question: "Wie viel Zeit braucht die Route?", answer: "Ein voller Tag reicht knapp, ein Wochenende ist deutlich besser." },
        { question: "Ist die Region familienfreundlich?", answer: "Ja, mit passenden Abschnitten und Aufsicht an Höhlen, Felsen und Flussufern." },
        { question: "Wo lohnt Fotografie besonders?", answer: "Morgens Iskar-Panega, mittags Prohodna oder Karlukovo, spät am Tag Aglen und das Vit-Tal." },
      ],
    },
    fr: {
      title: "Guide de Lukovit, Iskar-Panega et Aglen | Aglen",
      metaDescription: "Guide pratique de Lukovit: Iskar-Panega, grotte Prohodna, Karlukovo, rivière Vit, Aglen, grottes, falaises, sentiers, cuisine et itinéraires.",
      h1: "Guide de Lukovit: canyons, grottes et route lente vers Aglen",
      intro: "Lukovit ouvre l'accès à des paysages majeurs du nord de la Bulgarie: l'eau bleue d'Iskar-Panega, les fenêtres rocheuses de Prohodna, les grottes de Karlukovo et la vallée plus calme de la Vit près d'Aglen.",
      imageAlt: "Vue aérienne d'un canyon, de falaises calcaires et de villages autour de Lukovit et Aglen",
      ctaLabel: "Planifier une visite près d'Aglen",
      sections: [
        { heading: "Pourquoi visiter Lukovit", body: "La région rassemble sentier Iskar-Panega, Prohodna, Karlukovo, vues de rivière, routes villageoises et lieux calmes pour la photo." },
        { heading: "La place d'Aglen", body: "Aglen ajoute la partie lente: rivière Vit, formes calcaires, mémoire villageoise, cuisine locale, marches guidées et tourisme rural." },
        { heading: "Itinéraire et conseils", body: "Commencez tôt à Iskar-Panega, continuez vers Prohodna ou Karlukovo, puis gardez l'après-midi pour Aglen, la Vit, les photos et un contact local. Printemps et automne sont les meilleurs pour marcher et photographier. En été, partez tôt, prenez de l'eau et soyez prudent après la pluie." },
      ],
      faqs: [
        { question: "Combien de temps prévoir?", answer: "Une journée complète suffit pour un aperçu; un week-end donne un rythme meilleur." },
        { question: "Est-ce adapté aux familles?", answer: "Oui, avec des tronçons simples et une surveillance près des grottes, falaises et rivières." },
        { question: "Où faire les meilleures photos?", answer: "Iskar-Panega le matin, Prohodna ou Karlukovo à midi, Aglen et la Vit en fin de journée." },
      ],
    },
    es: {
      title: "Guía de Lukovit, Iskar-Panega y Aglen | Aglen",
      metaDescription: "Guía práctica de Lukovit: Iskar-Panega, cueva Prohodna, Karlukovo, río Vit, Aglen, cuevas, rocas, senderos, comida y rutas de día.",
      h1: "Guía de Lukovit: cañones, cuevas y una ruta lenta hacia Aglen",
      intro: "Lukovit es una puerta natural a los paisajes del norte de Bulgaria: Iskar-Panega, Prohodna, las cuevas de Karlukovo y el valle más tranquilo del Vit junto a Aglen.",
      imageAlt: "Vista aérea de un cañón fluvial, rocas calizas y pueblos alrededor de Lukovit y Aglen",
      ctaLabel: "Planificar una visita cerca de Aglen",
      sections: [
        { heading: "Por qué visitar Lukovit", body: "La zona reúne Iskar-Panega, Prohodna, Karlukovo, vistas de río, caminos rurales y lugares tranquilos para fotografía." },
        { heading: "Cómo encaja Aglen", body: "Aglen aporta el ritmo lento: río Vit, formas calizas, memoria local, comida rural, paseos guiados y descanso lejos de los puntos más concurridos." },
        { heading: "Ruta y consejos prácticos", body: "Empieza temprano en Iskar-Panega, sigue hacia Prohodna o Karlukovo y deja la tarde para Aglen, el Vit, fotos y una conversación local. Primavera y otoño son ideales para caminar y fotografiar. En verano sal temprano, lleva agua y cuidado tras la lluvia." },
      ],
      faqs: [
        { question: "Cuánto tiempo hace falta?", answer: "Un día completo permite ver lo principal; un fin de semana es mejor." },
        { question: "Es adecuado para familias?", answer: "Sí, con tramos fáciles y vigilancia en cuevas, rocas y riberas." },
        { question: "Dónde hacer fotos?", answer: "Iskar-Panega por la mañana, Prohodna o Karlukovo al mediodía, Aglen y el Vit al atardecer." },
      ],
    },
    it: {
      title: "Guida di Lukovit, Iskar-Panega e Aglen | Aglen",
      metaDescription: "Guida pratica a Lukovit: Iskar-Panega, grotta Prohodna, Karlukovo, fiume Vit, Aglen, grotte, rocce, sentieri, cibo e itinerari.",
      h1: "Guida di Lukovit: canyon, grotte e una rotta lenta verso Aglen",
      intro: "Lukovit introduce alcuni dei paesaggi più forti della Bulgaria settentrionale: Iskar-Panega, Prohodna, Karlukovo e la valle più tranquilla del Vit vicino ad Aglen.",
      imageAlt: "Vista aerea di canyon fluviale, falesie calcaree e villaggi intorno a Lukovit e Aglen",
      ctaLabel: "Pianifica una visita vicino ad Aglen",
      sections: [
        { heading: "Perché visitare Lukovit", body: "In poca distanza trovi Iskar-Panega, Prohodna, Karlukovo, viste sul fiume, strade di villaggio e luoghi fotografici tranquilli." },
        { heading: "Come entra Aglen", body: "Aglen aggiunge il lato lento: fiume Vit, forme calcaree, memoria del villaggio, cucina locale, passeggiate guidate e turismo rurale." },
        { heading: "Itinerario e consigli", body: "Parti presto da Iskar-Panega, prosegui verso Prohodna o Karlukovo e dedica il pomeriggio ad Aglen, al Vit, alle foto e ai contatti locali. Primavera e autunno sono ideali. In estate parti presto, porta acqua e fai attenzione dopo la pioggia." },
      ],
      faqs: [
        { question: "Quanto tempo serve?", answer: "Un giorno pieno basta per un assaggio; un weekend è migliore." },
        { question: "Va bene per famiglie?", answer: "Sì, con percorsi adatti e attenzione presso grotte, rocce e fiumi." },
        { question: "Dove fotografare?", answer: "Iskar-Panega al mattino, Prohodna o Karlukovo a metà giornata, Aglen e il Vit verso sera." },
      ],
    },
    ro: {
      title: "Ghid Lukovit, Iskar-Panega și Aglen | Aglen",
      metaDescription: "Ghid practic pentru Lukovit: Iskar-Panega, Peștera Prohodna, Karlukovo, râul Vit, Aglen, peșteri, stânci, trasee, mâncare și rute.",
      h1: "Ghid Lukovit: canioane, peșteri și o rută lentă spre Aglen",
      intro: "Lukovit deschide drumul către Iskar-Panega, Prohodna, Karlukovo și valea mai liniștită a râului Vit de lângă Aglen.",
      imageAlt: "Vedere aeriană cu canion, stânci calcaroase și sate în jurul Lukovit și Aglen",
      ctaLabel: "Planifică o vizită lângă Aglen",
      sections: [
        { heading: "De ce să vizitezi Lukovit", body: "Zona adună Iskar-Panega, Prohodna, Karlukovo, priveliști de râu, drumuri de sat și locuri liniștite pentru fotografie." },
        { heading: "Cum se leagă Aglen", body: "Aglen adaugă ritmul calm: râul Vit, forme calcaroase, memorie locală, mâncare de sat, plimbări ghidate și turism rural." },
        { heading: "Rută și sfaturi practice", body: "Începe devreme la Iskar-Panega, continuă spre Prohodna sau Karlukovo și lasă după-amiaza pentru Aglen, Vit, fotografii și conversații locale. Primăvara și toamna sunt cele mai bune. Vara pleacă devreme, ia apă și ai grijă după ploaie." },
      ],
      faqs: [
        { question: "Cât timp este necesar?", answer: "O zi întreagă ajunge pentru esențial; un weekend este mai potrivit." },
        { question: "Este potrivit pentru familii?", answer: "Da, cu trasee ușoare și supraveghere la peșteri, stânci și râu." },
        { question: "Unde se fac fotografii bune?", answer: "Iskar-Panega dimineața, Prohodna sau Karlukovo la prânz, Aglen și Vit spre apus." },
      ],
    },
    tr: {
      title: "Lukovit, Iskar-Panega ve Aglen Rehberi | Aglen",
      metaDescription: "Lukovit için pratik rehber: Iskar-Panega, Prohodna Mağarası, Karlukovo, Vit Nehri, Aglen, mağaralar, kayalar, patikalar, yemek ve rotalar.",
      h1: "Lukovit Rehberi: Kanyonlar, mağaralar ve Aglen'e yavaş rota",
      intro: "Lukovit; Iskar-Panega, Prohodna, Karlukovo ve Aglen yakınındaki sakin Vit vadisine açılan doğal bir başlangıçtır.",
      imageAlt: "Lukovit ve Aglen çevresinde nehir kanyonu, kireçtaşı kayaları ve köylerin hava görünümü",
      ctaLabel: "Aglen yakınında ziyaret planla",
      sections: [
        { heading: "Neden Lukovit", body: "Bölge Iskar-Panega, Prohodna, Karlukovo, nehir manzaraları, köy yolları ve sakin fotoğraf noktalarını birleştirir." },
        { heading: "Aglen rotaya nasıl uyar", body: "Aglen daha yavaş katmanı sunar: Vit Nehri, kireçtaşı şekilleri, köy belleği, yerel yemek, rehberli yürüyüşler ve kırsal turizm." },
        { heading: "Rota ve pratik ipuçları", body: "Erken Iskar-Panega'da başla, öğlen Prohodna veya Karlukovo'ya geç, öğleden sonra Aglen ve Vit için zaman ayır. İlkbahar ve sonbahar en iyisidir. Yazın erken çık, su taşı ve yağmurdan sonra dikkatli ol." },
      ],
      faqs: [
        { question: "Ne kadar zaman gerekir?", answer: "Bir tam gün yeterli olabilir; hafta sonu daha iyidir." },
        { question: "Aileler için uygun mu?", answer: "Evet, kolay bölümler seçilir ve mağara, kaya, nehir kenarında gözetim olursa." },
        { question: "En iyi fotoğraf noktaları neresi?", answer: "Sabah Iskar-Panega, öğlen Prohodna veya Karlukovo, gün sonunda Aglen ve Vit vadisi." },
      ],
    },
    el: {
      title: "Οδηγός Lukovit, Iskar-Panega και Aglen | Aglen",
      metaDescription: "Πρακτικός οδηγός για Lukovit: Iskar-Panega, σπήλαιο Prohodna, Karlukovo, ποταμός Vit, Aglen, σπήλαια, βράχια, μονοπάτια, φαγητό και διαδρομές.",
      h1: "Οδηγός Lukovit: φαράγγια, σπήλαια και αργή διαδρομή προς Aglen",
      intro: "Το Lukovit οδηγεί σε Iskar-Panega, Prohodna, Karlukovo και στην πιο ήσυχη κοιλάδα του Vit κοντά στο Aglen.",
      imageAlt: "Αεροφωτογραφία φαραγγιού, ασβεστολιθικών βράχων και χωριών γύρω από Lukovit και Aglen",
      ctaLabel: "Σχεδιάστε επίσκεψη κοντά στο Aglen",
      sections: [
        { heading: "Γιατί να επισκεφθείτε το Lukovit", body: "Η περιοχή συνδυάζει Iskar-Panega, Prohodna, Karlukovo, ποτάμιες θέες, χωριάτικους δρόμους και ήσυχα σημεία φωτογραφίας." },
        { heading: "Πώς ταιριάζει το Aglen", body: "Το Aglen προσθέτει τον αργό ρυθμό: ποταμό Vit, ασβεστολιθικά σχήματα, τοπική μνήμη, φαγητό και αγροτικό τουρισμό." },
        { heading: "Διαδρομή και πρακτικές συμβουλές", body: "Ξεκινήστε νωρίς από Iskar-Panega, συνεχίστε σε Prohodna ή Karlukovo και κρατήστε το απόγευμα για Aglen και Vit. Άνοιξη και φθινόπωρο είναι ιδανικά. Το καλοκαίρι ξεκινήστε νωρίς, πάρτε νερό και προσοχή μετά τη βροχή." },
      ],
      faqs: [
        { question: "Πόσος χρόνος χρειάζεται;", answer: "Μια γεμάτη ημέρα αρκεί για τα βασικά, αλλά ένα σαββατοκύριακο είναι καλύτερο." },
        { question: "Είναι κατάλληλο για οικογένειες;", answer: "Ναι, με εύκολα τμήματα και επίβλεψη σε σπήλαια, βράχους και όχθες." },
        { question: "Πού αξίζει η φωτογραφία;", answer: "Iskar-Panega το πρωί, Prohodna ή Karlukovo το μεσημέρι, Aglen και Vit στο τέλος της ημέρας." },
      ],
    },
    ru: {
      title: "Путеводитель по Луковиту, Искыр-Панега и Аглену | Аглен",
      metaDescription: "Практичный гид по Луковиту: Искыр-Панега, пещера Проходна, Карлуково, река Вит, Аглен, пещеры, скалы, тропы, еда и маршруты.",
      h1: "Луковит: каньоны, пещеры и спокойный маршрут к Аглену",
      intro: "Луковит открывает путь к Искыр-Панега, Проходне, Карлуково и более тихой долине Вита рядом с Агленом.",
      imageAlt: "Вид с воздуха на речной каньон, известняковые скалы и деревни вокруг Луковита и Аглена",
      ctaLabel: "Планировать визит рядом с Агленом",
      sections: [
        { heading: "Зачем ехать в Луковит", body: "Здесь рядом находятся Искыр-Панега, Проходна, Карлуково, речные виды, сельские дороги и спокойные места для фотографии." },
        { heading: "Как вписывается Аглен", body: "Аглен добавляет спокойный слой маршрута: река Вит, известняковые формы, местная память, еда, прогулки и сельский туризм." },
        { heading: "Маршрут и советы", body: "Начните рано в Искыр-Панега, затем Проходна или Карлуково, а после обеда оставьте время для Аглена и Вита. Весна и осень лучше всего. Летом выходите рано, берите воду и будьте осторожны после дождя." },
      ],
      faqs: [
        { question: "Сколько времени нужно?", answer: "Один полный день возможен, но выходные лучше." },
        { question: "Подходит ли для семей?", answer: "Да, при выборе лёгких участков и внимании у пещер, скал и реки." },
        { question: "Где лучше фотографировать?", answer: "Искыр-Панега утром, Проходна или Карлуково днём, Аглен и Вит к вечеру." },
      ],
    },
    ja: {
      title: "ルコヴィト、イスカル・パネガ、アグレン旅行ガイド | Aglen",
      metaDescription: "ルコヴィト実用ガイド。イスカル・パネガ、プロホドナ洞窟、カルルコヴォ、ヴィト川、アグレン、洞窟、岩、遊歩道、食、日帰りルート。",
      h1: "ルコヴィト旅行ガイド: 渓谷、洞窟、アグレンへのゆっくりしたルート",
      intro: "ルコヴィトは、イスカル・パネガ、プロホドナ、カルルコヴォ、そしてアグレン近くの静かなヴィト川谷への自然な入口です。",
      imageAlt: "ルコヴィトとアグレン周辺の川の渓谷、石灰岩の崖、村の空撮",
      ctaLabel: "アグレン周辺の訪問を計画",
      sections: [
        { heading: "ルコヴィトを訪れる理由", body: "イスカル・パネガ、プロホドナ、カルルコヴォ、川の眺め、村道、静かな撮影地が近くにまとまっています。" },
        { heading: "アグレンの組み込み方", body: "アグレンは、ヴィト川、石灰岩の景観、村の記憶、地元の食、ガイド散策、農村観光という静かな層を加えます。" },
        { heading: "ルートと実用アドバイス", body: "朝はイスカル・パネガ、昼はプロホドナまたはカルルコヴォ、午後はアグレンとヴィト川に時間を残します。春と秋が最適です。夏は早朝出発、水の携帯、雨後の足元への注意が必要です。" },
      ],
      faqs: [
        { question: "必要な時間は?", answer: "主要部は丸一日で可能ですが、週末の方が余裕があります。" },
        { question: "家族向けですか?", answer: "はい。簡単な区間を選び、洞窟、崖、川辺では見守りが必要です。" },
        { question: "写真に良い場所は?", answer: "朝のイスカル・パネガ、昼のプロホドナまたはカルルコヴォ、夕方のアグレンとヴィト谷です。" },
      ],
    },
    sr: {
      title: "Водич за Луковит, Искар-Панегу и Аглен | Аглен",
      metaDescription: "Практичан водич за Луковит: Искар-Панега, пећина Проходна, Карлуково, река Вит, Аглен, пећине, стене, стазе, храна и руте.",
      h1: "Луковит: кањони, пећине и спора рута ка Аглену",
      intro: "Луковит води ка Искар-Панеги, Проходни, Карлукову и тишој долини Вита близу Аглена.",
      imageAlt: "Поглед из ваздуха на речни кањон, кречњачке стене и села око Луковита и Аглена",
      ctaLabel: "Планирај посету близу Аглена",
      sections: [
        { heading: "Зашто посетити Луковит", body: "Регион спаја Искар-Панегу, Проходну, Карлуково, речне видике, сеоске путеве и мирна места за фотографију." },
        { heading: "Како се уклапа Аглен", body: "Аглен додаје мирни слој: реку Вит, кречњачке форме, сеоско памћење, локалну храну, вођене шетње и сеоски туризам." },
        { heading: "Рута и савети", body: "Почни рано у Искар-Панеги, настави ка Проходни или Карлукову, а поподне остави за Аглен и Вит. Пролеће и јесен су најбољи. Лети крени рано, понеси воду и пази после кише." },
      ],
      faqs: [
        { question: "Колико времена треба?", answer: "Један цео дан је могућ, али викенд је бољи." },
        { question: "Да ли је за породице?", answer: "Да, уз лакше деонице и надзор код пећина, стена и реке." },
        { question: "Где је најбоље за фотографије?", answer: "Искар-Панега ујутру, Проходна или Карлуково око поднева, Аглен и Вит предвече." },
      ],
    },
    zh: {
      title: "卢科维特、伊斯卡尔-帕内加与阿格伦旅行指南 | Aglen",
      metaDescription: "卢科维特实用旅行指南：伊斯卡尔-帕内加、普罗霍德纳洞穴、卡尔卢科沃、维特河、阿格伦、洞穴、岩石、步道、美食和线路。",
      h1: "卢科维特旅行指南：峡谷、洞穴与通往阿格伦的慢路线",
      intro: "卢科维特是通往伊斯卡尔-帕内加、普罗霍德纳、卡尔卢科沃以及阿格伦附近安静维特河谷的自然入口。",
      imageAlt: "卢科维特和阿格伦周边河谷、石灰岩峭壁和村庄的航拍",
      ctaLabel: "规划阿格伦附近访问",
      sections: [
        { heading: "为什么访问卢科维特", body: "这里把伊斯卡尔-帕内加、普罗霍德纳、卡尔卢科沃、河景、村路和安静摄影点集中在短距离内。" },
        { heading: "阿格伦如何融入路线", body: "阿格伦带来更慢的部分：维特河、石灰岩地貌、村庄记忆、本地食物、导览散步和乡村旅游。" },
        { heading: "路线与实用建议", body: "清晨从伊斯卡尔-帕内加开始，中午去普罗霍德纳或卡尔卢科沃，下午留给阿格伦和维特河。春秋最适合。夏季请早出发、带水，雨后注意湿滑。" },
      ],
      faqs: [
        { question: "需要多长时间？", answer: "一整天可看主要地点，周末更从容。" },
        { question: "适合家庭吗？", answer: "适合，但需选择简单路段，并在洞穴、岩石和河岸看护儿童。" },
        { question: "哪里适合拍照？", answer: "上午伊斯卡尔-帕内加，中午普罗霍德纳或卡尔卢科沃，傍晚阿格伦和维特河谷。" },
      ],
    },
    hu: {
      title: "Lukovit, Iskar-Panega és Aglen útikalauz | Aglen",
      metaDescription: "Gyakorlati Lukovit kalauz: Iskar-Panega, Prohodna-barlang, Karlukovo, Vit folyó, Aglen, barlangok, sziklák, ösvények, étel és útvonalak.",
      h1: "Lukovit kalauz: kanyonok, barlangok és lassú út Aglen felé",
      intro: "Lukovit természetes kapu Iskar-Panega, Prohodna, Karlukovo és az Aglen melletti csendes Vit-völgy felé.",
      imageAlt: "Légi felvétel folyókanyonról, mészkősziklákról és falvakról Lukovit és Aglen körül",
      ctaLabel: "Látogatás tervezése Aglen közelében",
      sections: [
        { heading: "Miért érdemes Lukovitba menni", body: "A térség rövid távolságon belül köti össze Iskar-Panegát, Prohodnát, Karlukovót, folyókilátásokat, falusi utakat és csendes fotópontokat." },
        { heading: "Hogyan illik bele Aglen", body: "Aglen a lassabb réteg: Vit folyó, mészkőformák, falusi emlékezet, helyi étel, vezetett séták és falusi turizmus." },
        { heading: "Útvonal és praktikus tippek", body: "Kezdj korán Iskar-Panegánál, délben Prohodna vagy Karlukovo, délután pedig Aglen és a Vit következzen. Tavasz és ősz a legjobb. Nyáron indulj korán, vigyél vizet, eső után figyelj a csúszós kövekre." },
      ],
      faqs: [
        { question: "Mennyi idő kell?", answer: "Egy teljes nap elég lehet, de egy hétvége jobb." },
        { question: "Családoknak megfelelő?", answer: "Igen, könnyű szakaszokkal és felügyelettel a barlangoknál, szikláknál és folyónál." },
        { question: "Hol jó fotózni?", answer: "Reggel Iskar-Panega, délben Prohodna vagy Karlukovo, késő délután Aglen és a Vit-völgy." },
      ],
    },
  },
};

type RegionalGuideTopic = {
  highlightsBg: string[];
  highlightsIntl: string[];
  aglenConnectionBg: string;
  aglenConnectionIntl: string;
  imageAltKey: "aerial" | "cave" | "pool";
};

type RegionalGuideText = {
  title: (name: string, brand: string) => string;
  meta: (name: string, highlights: string, brand: string) => string;
  h1: (name: string) => string;
  intro: (name: string, highlights: string) => string;
  cta: string;
  imageAlt: (name: string) => string;
  sectionWhy: string;
  sectionSee: string;
  sectionAglen: string;
  sectionRoute: string;
  sectionSeason: string;
  whyBody: (name: string, highlights: string) => string;
  seeBody: (highlights: string) => string;
  aglenBody: (connection: string) => string;
  routeBody: (name: string, highlights: string) => string;
  seasonBody: string;
  faqTimeQ: (name: string) => string;
  faqTimeA: string;
  faqFamilyQ: string;
  faqFamilyA: string;
  faqPhotoQ: string;
  faqPhotoA: (highlights: string) => string;
};

const regionalGuideIds = new Set<LandingPageId>([
  "lovechRegionGuide",
  "karlukovoGuide",
  "krushunaGuide",
  "devetashkaCaveGuide",
  "iskarPanegaGuide",
]);

const regionalGuideTopics: Record<LandingPageId, RegionalGuideTopic> = {
  visitAglen: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
  thingsToDo: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
  natureAroundAglen: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
  historyOfAglen: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
  accommodationNearAglen: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
  traditionalFood: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
  hiddenPlaces: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
  culturalTourism: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
  natureTourism: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
  adventureTourism: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
  familyTrip: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
  campingNearAglen: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
  weekendInAglen: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
  routeMap: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
  bestTime: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
  howToGet: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
  aglenFromSofia: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
  lovechRegionGuide: {
    highlightsBg: ["Луковит", "Искър-Панега", "Карлуково", "Крушуна", "Деветашката пещера", "Ъглен"],
    highlightsIntl: ["Lukovit", "Iskar-Panega", "Karlukovo", "Krushuna", "Devetashka", "Aglen"],
    aglenConnectionBg: "Ъглен е тихата селска спирка между по-популярните места: река Вит, варовикови форми, местна храна и по-бавен ритъм.",
    aglenConnectionIntl: "Aglen is the quieter village stop between the better-known places: the Vit River, limestone forms, local food, and a slower rhythm.",
    imageAltKey: "aerial",
  },
  lukovitGuide: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
  karlukovoGuide: {
    highlightsBg: ["Проходна", "карлуковските пещери", "скални венци", "Искър-Панега", "Ъглен"],
    highlightsIntl: ["Prohodna", "Karlukovo", "Iskar-Panega", "Aglen"],
    aglenConnectionBg: "След драматичните пещери Ъглен дава по-мек финал с река Вит, селски пейзаж, вечерна светлина и възможност за нощувка.",
    aglenConnectionIntl: "After the dramatic caves, Aglen gives the route a softer finish with the Vit River, village landscape, evening light, and possible overnight stay.",
    imageAltKey: "cave",
  },
  krushunaGuide: {
    highlightsBg: ["Крушунските водопади", "Деветашката пещера", "Ловеч", "селски пътища", "Ъглен"],
    highlightsIntl: ["Krushuna", "Devetashka", "Lovech", "Aglen"],
    aglenConnectionBg: "Ъглен работи като спокойна контратема на водопадите: по-малко тълпи, река Вит, храна, снимки и селски туризъм.",
    aglenConnectionIntl: "Aglen works as a calm counterpoint to the waterfalls: fewer crowds, the Vit River, food, photography, and village tourism.",
    imageAltKey: "pool",
  },
  devetashkaCaveGuide: {
    highlightsBg: ["Деветашката пещера", "Крушуна", "Ловеч", "Карлуково", "Ъглен"],
    highlightsIntl: ["Devetashka", "Krushuna", "Lovech", "Karlukovo", "Aglen"],
    aglenConnectionBg: "Ъглен добавя човешки мащаб към голямата пещерна сцена: река, селска памет, местен разговор и бавен завършек.",
    aglenConnectionIntl: "Aglen adds human scale to the large cave landscape: river, village memory, local conversation, and a slower ending.",
    imageAltKey: "cave",
  },
  iskarPanegaGuide: {
    highlightsBg: ["екопътека Искър-Панега", "синята вода", "Луковит", "Проходна", "Ъглен"],
    highlightsIntl: ["Iskar-Panega", "Lukovit", "Prohodna", "Aglen"],
    aglenConnectionBg: "След Искър-Панега Ъглен продължава темата за реките, но я прави по-тиха: Вит, скали, селски улици и залез.",
    aglenConnectionIntl: "After Iskar-Panega, Aglen continues the river theme in a quieter way: the Vit River, rocks, village streets, and sunset.",
    imageAltKey: "pool",
  },
  ruralTourismBulgaria: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
  ecoTourismBulgaria: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
  slowTravelBulgaria: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
  aiAnswerHub: { highlightsBg: [], highlightsIntl: [], aglenConnectionBg: "", aglenConnectionIntl: "", imageAltKey: "aerial" },
};

const regionalGuideText: Partial<Record<LanguageCode, RegionalGuideText>> = {
  bg: {
    title: (name, brand) => `${name}, маршрути и връзка с ${brand} | ${brand}`,
    meta: (name, highlights) => `Практичен пътеводител за ${name}: ${highlights}, сезон, снимки, храна, връзка с Ъглен и маршрути край река Вит.`,
    h1: (name) => `${name}: как да го включиш в пътуване около Ъглен`,
    intro: (name, highlights) => `${name} е най-полезен, когато се планира като част от по-широк маршрут: ${highlights}. Тук ще намериш какво да видиш, кога да тръгнеш, как Ъглен влиза в деня и как да избегнеш прибързаното обикаляне.`,
    cta: "Планирай маршрут с Ъглен",
    imageAlt: (name) => `Пейзаж и туристически маршрут около ${name}, свързан с Ъглен и река Вит`,
    sectionWhy: "Защо да го посетиш",
    sectionSee: "Какво да видиш наблизо",
    sectionAglen: "Как Ъглен допълва маршрута",
    sectionRoute: "Предложен дневен маршрут",
    sectionSeason: "Сезон и практични съвети",
    whyBody: (name, highlights) => `${name} събира природни гледки, кратки преходи и места за фотография на малка дистанция. Най-смисленият маршрут не е списък за отметки, а плавно движение между ${highlights}.`,
    seeBody: (highlights) => `Основните спирки за комбиниране са ${highlights}. Провери предварително достъпа до пътеки и пещери, защото след дъжд настилките и камъните могат да са хлъзгави.`,
    aglenBody: (connection) => connection,
    routeBody: (name, highlights) => `Започни рано с най-посещаваната точка около ${name}, остави обяда за пещера, водопад или екопътека, а късния следобед насочи към Ъглен за река Вит, снимки и по-тиха среща с района. Маршрутът работи най-добре, когато ${highlights} не се минават на бегом.`,
    seasonBody: "Пролетта и есента са най-добри за цветове, ходене и фотография. Лятото изисква ранен старт, вода и сянка; през зимата провери пътните условия и дневната светлина.",
    faqTimeQ: (name) => `Колко време е нужно за ${name} и Ъглен?`,
    faqTimeA: "Един пълен ден е достатъчен за основен маршрут, но уикендът дава по-добър ритъм, време за храна, снимки и неочаквани спирки.",
    faqFamilyQ: "Подходящо ли е за семейства?",
    faqFamilyA: "Да, ако се изберат лесни участъци и се внимава край пещери, скали, водопади и речни брегове. Носи вода, удобни обувки и план Б при лошо време.",
    faqPhotoQ: "Къде са най-добрите моменти за снимки?",
    faqPhotoA: (highlights) => `Най-добрата светлина е рано сутрин и късно следобед. Комбинирай широките гледки около ${highlights} с по-тихите кадри край Вит и селските улици на Ъглен.`,
  },
  en: {
    title: (name, brand) => `${name}, Routes, and the Link to ${brand} | ${brand}`,
    meta: (name, highlights) => `Practical guide to ${name}: ${highlights}, seasons, photography, food, the Aglen connection, and Vit River routes.`,
    h1: (name) => `${name}: how to fit it into a trip around Aglen`,
    intro: (name, highlights) => `${name} works best as part of a wider route: ${highlights}. This guide explains what to see, when to go, how Aglen fits into the day, and how to avoid a rushed checklist trip.`,
    cta: "Plan a route with Aglen",
    imageAlt: (name) => `Landscape and travel route around ${name}, connected with Aglen and the Vit River`,
    sectionWhy: "Why visit",
    sectionSee: "What to see nearby",
    sectionAglen: "How Aglen completes the route",
    sectionRoute: "Suggested day route",
    sectionSeason: "Season and practical tips",
    whyBody: (name, highlights) => `${name} brings together nature views, short walks, and strong photo stops within a compact area. The best route is not a checklist, but a smooth movement between ${highlights}.`,
    seeBody: (highlights) => `The main stops to combine are ${highlights}. Check access to trails and caves before you go, especially after rain when paths and stone can be slippery.`,
    aglenBody: (connection) => connection,
    routeBody: (name, highlights) => `Start early with the busiest place around ${name}, keep midday for a cave, waterfall, or eco trail, then move toward Aglen in late afternoon for the Vit River, photos, and a quieter local layer. The route works best when ${highlights} are not rushed.`,
    seasonBody: "Spring and autumn are best for color, walking, and photography. Summer needs an early start, water, and shade; in winter, check road conditions and daylight.",
    faqTimeQ: (name) => `How much time do ${name} and Aglen need?`,
    faqTimeA: "One full day is enough for a basic route, but a weekend gives better rhythm, time for food, photography, and unexpected stops.",
    faqFamilyQ: "Is it suitable for families?",
    faqFamilyA: "Yes, if you choose easy sections and stay careful around caves, cliffs, waterfalls, and riverbanks. Carry water, walking shoes, and a backup plan for bad weather.",
    faqPhotoQ: "When are the best photo moments?",
    faqPhotoA: (highlights) => `The best light is early morning and late afternoon. Pair the wider views around ${highlights} with quieter frames by the Vit River and Aglen's village streets.`,
  },
};

function listText(items: string[]): string {
  return items.join(", ");
}

function subjectName(lang: LanguageCode, id: LandingPageId): string {
  const name = pageNames[lang][id];
  return name
    .replace(/^Пътеводител за\s+/u, "")
    .replace(/^Travel Guide to\s+/u, "")
    .replace(/\s+Travel Guide$/u, "")
    .replace(/^Reiseführer\s+/u, "")
    .replace(/^Guide de\s+/u, "")
    .replace(/^Guía de\s+/u, "")
    .replace(/^Guida di\s+/u, "")
    .replace(/^Ghid\s+/u, "")
    .replace(/\s+rehberi$/u, "")
    .replace(/^Οδηγός\s+/u, "")
    .replace(/^Путеводитель по\s+/u, "")
    .replace(/^Водич за\s+/u, "")
    .replace(/旅行ガイド$/u, "")
    .replace(/指南$/u, "")
    .replace(/\s+kalauz$/u, "")
    .trim();
}

function regionalTextFor(lang: LanguageCode, copy: PageCopy): RegionalGuideText {
  const override = regionalGuideText[lang];
  if (override) return override;

  const local = landingText[lang];
  return {
    title: (name, brand) => `${name}${local.titleSeparator}${brand}`,
    meta: (name) => `${name}: ${copy.landmarks.text}`,
    h1: (name) => name,
    intro: (name) => `${name} — ${copy.hero.meta}. ${copy.hub.text}`,
    cta: local.cta,
    imageAlt: (name) => `${imageAlt(lang, "aerial")} ${name}`,
    sectionWhy: local.sectionHeadings[0],
    sectionSee: local.sectionHeadings[1],
    sectionAglen: local.sectionHeadings[2],
    sectionRoute: copy.guides.nearby.label,
    sectionSeason: copy.guides.seasonal.label,
    whyBody: (name) => `${name}: ${local.sectionBodies[0]} ${copy.about.text}`,
    seeBody: (highlights) => `${local.sectionBodies[1]} ${highlights}.`,
    aglenBody: (connection) => connection,
    routeBody: (_name, highlights) => `${local.sectionBodies[2]} ${highlights}.`,
    seasonBody: copy.guides.seasonal.text,
    faqTimeQ: () => local.faqWhen,
    faqTimeA: local.faqWhenAnswer,
    faqFamilyQ: local.faqDo,
    faqFamilyA: local.faqDoAnswer,
    faqPhotoQ: local.faqWhere,
    faqPhotoA: () => local.faqWhereAnswer,
  };
}

function buildRegionalGuideOverride(id: LandingPageId, lang: LanguageCode): LandingPageOverride | undefined {
  if (!regionalGuideIds.has(id)) return undefined;

  const copy = contentByLanguage[lang];
  const text = regionalTextFor(lang, copy);
  const topic = regionalGuideTopics[id];
  const name = subjectName(lang, id);
  const highlights = listText(lang === "bg" ? topic.highlightsBg : topic.highlightsIntl);
  const connection = lang === "bg"
    ? topic.aglenConnectionBg
    : lang === "en"
      ? topic.aglenConnectionIntl
      : `${landingText[lang].sectionBodies[0]} ${copy.guides.vitRiver.text}`;

  return {
    title: text.title(name, copy.brand.name),
    metaDescription: text.meta(name, highlights, copy.brand.name),
    h1: text.h1(name),
    intro: text.intro(name, highlights),
    imageAlt: text.imageAlt(name),
    ctaLabel: text.cta,
    sections: [
      { heading: text.sectionWhy, body: `${text.whyBody(name, highlights)} ${text.seeBody(highlights)}` },
      { heading: text.sectionAglen, body: text.aglenBody(connection) },
      { heading: text.sectionSeason, body: `${text.routeBody(name, highlights)} ${text.seasonBody}` },
    ],
    faqs: [
      { question: text.faqTimeQ(name), answer: text.faqTimeA },
      { question: text.faqFamilyQ, answer: text.faqFamilyA },
      { question: text.faqPhotoQ, answer: text.faqPhotoA(highlights) },
    ],
    keywords: [name, ...highlights.split(", "), copy.brand.name, copy.guides.vitRiver.label],
    secondaryKeywords: [copy.guides.nearby.label, copy.guides.hiking.label, copy.guides.food.label],
  };
}

function routeLabel(lang: LanguageCode, routeId: LandingPageId | string): string {
  const copy = contentByLanguage[lang];
  const ui = uiTextByLanguage[lang];

  if (routeId in pageNames[lang]) {
    return pageNames[lang][routeId as LandingPageId];
  }

  const coreLabels: Record<string, string> = {
    home: copy.nav.home,
    pillars: copy.about.title,
    attractions: copy.landmarks.title,
    activities: copy.experiences.title,
    fishing: copy.guides.fishing.label,
    hiking: copy.guides.hiking.label,
    caves: copy.guides.caves.label,
    vitRiver: copy.guides.vitRiver.label,
    food: copy.guides.food.label,
    nearby: copy.guides.nearby.label,
    geo: copy.landmarks.aria,
    stay: copy.nav.stay,
    quests: copy.nav.quests,
    app: copy.app.title,
    travelGuide: copy.hub.title,
    seasonal: copy.guides.seasonal.label,
    events: ui.trustLinks.find((link) => link.routeId === "events")?.label ?? copy.hub.eyebrow,
    trust: ui.trustLinks.find((link) => link.routeId === "trust")?.label ?? copy.brand.name,
    editorial: ui.trustLinks.find((link) => link.routeId === "editorial")?.label ?? copy.sourceNotes[0],
    localSeo: ui.trustLinks.find((link) => link.routeId === "localSeo")?.label ?? copy.landmarks.aria,
    crawlerPolicy: ui.trustLinks.find((link) => link.routeId === "crawlerPolicy")?.label ?? copy.hub.eyebrow,
    contact: copy.contact.cta,
  };

  return coreLabels[routeId] ?? copy.brand.name;
}

/**
 * Hand-written prose for a landing page, in every language the site serves.
 *
 * The twenty-seven landing pages are generated from one template, which is why
 * they read like one template. A page somebody has actually written belongs
 * here: the intro and the three section bodies, in all fourteen languages. The
 * headings, the FAQs, the title and the meta description stay generated — those
 * are structure and SEO, and they are already right.
 *
 * This is UI copy, not a knowledge-tier claim: it makes no sourced assertion, so
 * rule 43 does not apply and every language carries its own text.
 */
type AuthoredProse = {
  /** Replaces the shared category kicker over the <h1>. */
  kicker?: string;
  /** Replaces the generated <h1>. Omit to keep the page's routine name. */
  h1?: string;
  intro: string;
  /** Replaces the shared section headings. Omit to keep the locale's own three. */
  headings?: [string, string, string];
  /** Replaces the generated CTA label. */
  cta?: string;
  /** Omit to leave the three generated cards alone and rewrite only the hero. */
  bodies?: [string, string, string];
};

/**
 * The map-and-transport panel. One page needs it today; the shape is declared
 * here rather than in the component so a second page can have it by adding
 * `interactive: "transport"` to its master row, not by editing JSX.
 *
 * On the practical detail: the nearest stations and the road from Lukovit are
 * stated, timetables are not. A published departure time is wrong within a
 * season and the site would have no way of knowing — so the panel links to the
 * carrier and says plainly that the times are theirs to check.
 */
export type TransportCopy = {
  title: string;
  lede: string;
  mapCta: string;
  railSummary: string;
  railBody: string[];
  railLinkLabel: string;
  busSummary: string;
  busBody: string[];
};

/** Aglen's published coordinates, the ones the graph and the JSON-LD already use. */
export const AGLEN_MAP_URL = "https://maps.google.com/?q=43.201151,24.314943";
const BDZ_URL = "https://bdz.bg/";

/** The panel's words, per language. Practical, and deliberately without times. */
export const transportCopy: Record<LanguageCode, TransportCopy> = {
  bg: {
    title: "Карта и транспорт",
    lede: "Ъглен е в община Луковит, в долината на река Вит. Отворете точката на картата, за да си зададете навигация, и вижте по-долу как се стига с влак и с автобус.",
    mapCta: "Отваряне в Google Maps",
    railSummary: "С влак (БДЖ)",
    railBody: [
      "Ъглен няма собствена гара. Най-близките са Червен бряг — по главната линия София–Плевен, с най-често движение — и Луковит, на отклонението към Златна Панега, където влаковете са по-редки.",
      "От гарата до селото се продължава с междуселищен автобус или с такси. Разписанията се менят по сезони и по ремонти, затова ги проверявайте в деня на пътуването при превозвача."
    ],
    railLinkLabel: "Разписания в bdz.bg",
    busSummary: "С автобус",
    busBody: [
      "От Централна автогара София има редовни линии в посока Луковит. Луковит е общинският център и оттам тръгва връзката към селата в общината, включително Ъглен.",
      "Извън делничните курсове връзката Луковит–Ъглен е рядка. Ако пътувате в събота или неделя, попитайте предварително за часовете или пригответе такси за последната отсечка."
    ]
  },
  en: {
    title: "Map and transport",
    lede: "Aglen is in Lukovit municipality, in the valley of the River Vit. Open the point on the map to set your navigation, and see below how to arrive by train and by bus.",
    mapCta: "Open in Google Maps",
    railSummary: "By train (BDŽ)",
    railBody: [
      "Aglen has no station of its own. The nearest are Cherven Bryag — on the main Sofia–Pleven line, with the most frequent service — and Lukovit, on the Zlatna Panega branch, where trains are sparser.",
      "From the station you continue by regional bus or by taxi. Timetables change with the season and with engineering work, so check them with the carrier on the day you travel."
    ],
    railLinkLabel: "Timetables at bdz.bg",
    busSummary: "By bus",
    busBody: [
      "There are regular services from Sofia Central Bus Station towards Lukovit. Lukovit is the municipal centre, and the connection to the villages of the municipality, Aglen among them, starts from there.",
      "Outside weekday services the Lukovit–Aglen leg is infrequent. If you travel on a Saturday or Sunday, ask about the times in advance or plan a taxi for the last stretch."
    ]
  },
  de: {
    title: "Karte und Anreise",
    lede: "Aglen liegt in der Gemeinde Lukovit, im Tal des Flusses Vit. Öffnen Sie den Punkt auf der Karte für die Navigation, und sehen Sie unten, wie Sie mit Bahn und Bus ankommen.",
    mapCta: "In Google Maps öffnen",
    railSummary: "Mit der Bahn (BDŽ)",
    railBody: [
      "Aglen hat keinen eigenen Bahnhof. Am nächsten liegen Tscherwen Brjag an der Hauptstrecke Sofia–Pleven, mit der dichtesten Taktung, und Lukovit an der Nebenstrecke nach Slatna Panega, wo weniger Züge verkehren.",
      "Vom Bahnhof geht es mit dem Regionalbus oder dem Taxi weiter. Fahrpläne ändern sich saisonal und wegen Bauarbeiten — prüfen Sie sie am Reisetag beim Betreiber."
    ],
    railLinkLabel: "Fahrpläne auf bdz.bg",
    busSummary: "Mit dem Bus",
    busBody: [
      "Vom Zentralen Busbahnhof Sofia fahren regelmäßig Busse Richtung Lukovit. Lukovit ist der Gemeindesitz; von dort geht die Verbindung in die Dörfer der Gemeinde, darunter Aglen.",
      "Außerhalb der Werktagsverbindungen fährt der Abschnitt Lukovit–Aglen selten. Fragen Sie für Samstag oder Sonntag vorher nach den Zeiten oder planen Sie ein Taxi für das letzte Stück."
    ]
  },
  fr: {
    title: "Carte et transports",
    lede: "Aglen se trouve dans la commune de Lukovit, dans la vallée de la Vit. Ouvrez le point sur la carte pour lancer votre navigation, et voyez ci-dessous comment venir en train et en bus.",
    mapCta: "Ouvrir dans Google Maps",
    railSummary: "En train (BDŽ)",
    railBody: [
      "Aglen n'a pas de gare. Les plus proches sont Cherven Bryag, sur la ligne principale Sofia–Pleven et la mieux desservie, et Lukovit, sur l'antenne de Zlatna Panega, où les trains sont plus rares.",
      "De la gare, on continue en car régional ou en taxi. Les horaires changent avec la saison et les travaux : vérifiez-les auprès du transporteur le jour du voyage."
    ],
    railLinkLabel: "Horaires sur bdz.bg",
    busSummary: "En bus",
    busBody: [
      "Des liaisons régulières partent de la gare routière centrale de Sofia vers Lukovit. Lukovit est le chef-lieu de la commune, et c'est de là que part la desserte des villages, dont Aglen.",
      "Hors jours ouvrés, le tronçon Lukovit–Aglen est peu fréquent. Pour un samedi ou un dimanche, renseignez-vous à l'avance ou prévoyez un taxi pour la dernière portion."
    ]
  },
  es: {
    title: "Mapa y transporte",
    lede: "Aglen está en el municipio de Lukovit, en el valle del río Vit. Abra el punto en el mapa para fijar la navegación y vea abajo cómo llegar en tren y en autobús.",
    mapCta: "Abrir en Google Maps",
    railSummary: "En tren (BDŽ)",
    railBody: [
      "Aglen no tiene estación propia. Las más cercanas son Cherven Bryag, en la línea principal Sofía–Pleven y la mejor comunicada, y Lukovit, en el ramal de Zlatna Panega, con menos trenes.",
      "Desde la estación se continúa en autobús comarcal o en taxi. Los horarios cambian según la temporada y las obras: consúltelos con el operador el mismo día del viaje."
    ],
    railLinkLabel: "Horarios en bdz.bg",
    busSummary: "En autobús",
    busBody: [
      "Hay servicios regulares desde la Estación Central de Autobuses de Sofía hacia Lukovit. Lukovit es la cabecera del municipio y de allí sale la conexión con sus pueblos, Aglen entre ellos.",
      "Fuera de los días laborables el tramo Lukovit–Aglen es poco frecuente. Si viaja en sábado o domingo, pregunte los horarios con antelación o prevea un taxi para el último tramo."
    ]
  },
  it: {
    title: "Mappa e trasporti",
    lede: "Aglen si trova nel comune di Lukovit, nella valle del fiume Vit. Aprite il punto sulla mappa per impostare la navigazione e vedete qui sotto come arrivare in treno e in autobus.",
    mapCta: "Apri in Google Maps",
    railSummary: "In treno (BDŽ)",
    railBody: [
      "Aglen non ha una stazione propria. Le più vicine sono Cherven Bryag, sulla linea principale Sofia–Pleven e la meglio servita, e Lukovit, sulla diramazione di Zlatna Panega, dove i treni sono più radi.",
      "Dalla stazione si prosegue in autobus regionale o in taxi. Gli orari cambiano con la stagione e con i lavori: verificateli presso il vettore il giorno stesso del viaggio."
    ],
    railLinkLabel: "Orari su bdz.bg",
    busSummary: "In autobus",
    busBody: [
      "Dall'autostazione centrale di Sofia partono collegamenti regolari verso Lukovit. Lukovit è il capoluogo comunale e da lì parte il collegamento con i villaggi del comune, Aglen compreso.",
      "Fuori dai giorni feriali la tratta Lukovit–Aglen è poco frequente. Se viaggiate di sabato o domenica, chiedete prima gli orari o mettete in conto un taxi per l'ultimo tratto."
    ]
  },
  ro: {
    title: "Hartă și transport",
    lede: "Aglen se află în comuna Lukovit, în valea râului Vit. Deschideți punctul pe hartă pentru navigație și vedeți mai jos cum ajungeți cu trenul și cu autobuzul.",
    mapCta: "Deschide în Google Maps",
    railSummary: "Cu trenul (BDŽ)",
    railBody: [
      "Aglen nu are gară proprie. Cele mai apropiate sunt Cherven Bryag, pe magistrala Sofia–Pleven și cea mai bine deservită, și Lukovit, pe ramificația spre Zlatna Panega, unde trenurile sunt mai rare.",
      "De la gară se continuă cu autobuzul regional sau cu taxiul. Orarele se schimbă în funcție de sezon și de lucrări, așa că verificați-le la transportator în ziua călătoriei."
    ],
    railLinkLabel: "Orare pe bdz.bg",
    busSummary: "Cu autobuzul",
    busBody: [
      "Din Autogara Centrală Sofia există curse regulate spre Lukovit. Lukovit este centrul comunei, iar de acolo pleacă legătura spre satele comunei, între care și Aglen.",
      "În afara zilelor lucrătoare, segmentul Lukovit–Aglen este rar. Dacă mergeți sâmbăta sau duminica, întrebați dinainte de ore sau pregătiți un taxi pentru ultima porțiune."
    ]
  },
  tr: {
    title: "Harita ve ulaşım",
    lede: "Aglen, Vit Nehri vadisinde, Lukovit belediyesindedir. Navigasyonu ayarlamak için noktayı haritada açın; trenle ve otobüsle nasıl gelineceğini aşağıda bulacaksınız.",
    mapCta: "Google Maps'te aç",
    railSummary: "Trenle (BDŽ)",
    railBody: [
      "Aglen'in kendi istasyonu yok. En yakınları, Sofya–Pleven ana hattındaki ve en sık seferin olduğu Çerven Bryag ile Zlatna Panega hattındaki, trenlerin daha seyrek olduğu Lukovit'tir.",
      "İstasyondan sonra bölge otobüsü ya da taksiyle devam edilir. Tarifeler mevsime ve bakım çalışmalarına göre değişir; yolculuk günü taşıyıcıdan kontrol edin."
    ],
    railLinkLabel: "bdz.bg'de tarifeler",
    busSummary: "Otobüsle",
    busBody: [
      "Sofya Merkez Otogarı'ndan Lukovit yönüne düzenli seferler var. Lukovit belediye merkezidir; belediyeye bağlı köylere, Aglen dahil, bağlantı oradan başlar.",
      "Hafta içi seferlerin dışında Lukovit–Aglen bacağı seyrektir. Cumartesi ya da pazar yola çıkacaksanız saatleri önceden sorun veya son etap için taksi planlayın."
    ]
  },
  el: {
    title: "Χάρτης και μετακίνηση",
    lede: "Το Άγκλεν βρίσκεται στον δήμο Λούκοβιτ, στην κοιλάδα του ποταμού Βιτ. Ανοίξτε το σημείο στον χάρτη για πλοήγηση και δείτε παρακάτω πώς φτάνετε με τρένο και με λεωφορείο.",
    mapCta: "Άνοιγμα στο Google Maps",
    railSummary: "Με τρένο (BDŽ)",
    railBody: [
      "Το Άγκλεν δεν έχει δικό του σταθμό. Οι πλησιέστεροι είναι το Τσέρβεν Μπριάγκ, στην κύρια γραμμή Σόφια–Πλέβεν με τα πυκνότερα δρομολόγια, και το Λούκοβιτ, στη διακλάδωση προς Ζλάτνα Πάνεγκα, όπου τα τρένα είναι αραιότερα.",
      "Από τον σταθμό συνεχίζετε με υπεραστικό λεωφορείο ή ταξί. Τα δρομολόγια αλλάζουν ανά εποχή και λόγω έργων, γι' αυτό ελέγξτε τα στον μεταφορέα την ημέρα του ταξιδιού."
    ],
    railLinkLabel: "Δρομολόγια στο bdz.bg",
    busSummary: "Με λεωφορείο",
    busBody: [
      "Από τον Κεντρικό Σταθμό Λεωφορείων της Σόφιας υπάρχουν τακτικά δρομολόγια προς το Λούκοβιτ. Το Λούκοβιτ είναι η έδρα του δήμου και από εκεί ξεκινά η σύνδεση με τα χωριά, μεταξύ τους και το Άγκλεν.",
      "Εκτός των εργάσιμων, το σκέλος Λούκοβιτ–Άγκλεν είναι αραιό. Αν ταξιδεύετε Σάββατο ή Κυριακή, ρωτήστε εκ των προτέρων ή προβλέψτε ταξί για το τελευταίο κομμάτι."
    ]
  },
  ru: {
    title: "Карта и транспорт",
    lede: "Аглен находится в общине Луковит, в долине реки Вит. Откройте точку на карте, чтобы задать навигацию, и посмотрите ниже, как добраться поездом и автобусом.",
    mapCta: "Открыть в Google Maps",
    railSummary: "Поездом (БДЖ)",
    railBody: [
      "У Аглена нет собственной станции. Ближайшие — Червен-Бряг на главной линии София–Плевен, где движение самое частое, и Луковит на ветке к Златна-Панеге, где поездов меньше.",
      "От станции дальше — междугородним автобусом или такси. Расписания меняются по сезонам и из-за ремонтов, поэтому уточняйте их у перевозчика в день поездки."
    ],
    railLinkLabel: "Расписания на bdz.bg",
    busSummary: "Автобусом",
    busBody: [
      "С Центрального автовокзала Софии есть регулярные рейсы в сторону Луковита. Луковит — центр общины, оттуда идёт сообщение с её сёлами, включая Аглен.",
      "Вне будних дней участок Луковит–Аглен ходит редко. Если едете в субботу или воскресенье, узнайте расписание заранее или закладывайте такси на последний отрезок."
    ]
  },
  ja: {
    title: "地図と交通",
    lede: "アグレンはヴィト川の谷、ルコヴィト市に属します。ナビ用に地図の地点を開いてください。鉄道とバスでの行き方は下記のとおりです。",
    mapCta: "Google マップで開く",
    railSummary: "鉄道で（BDŽ）",
    railBody: [
      "アグレンに駅はありません。最寄りは、ソフィア–プレヴェン本線上で便数のもっとも多いチェルヴェン・ブリャグと、ズラトナ・パネガ支線上で本数の少ないルコヴィトです。",
      "駅からは地域バスかタクシーで続きます。時刻表は季節や工事で変わるため、出発当日に運行会社で確認してください。"
    ],
    railLinkLabel: "bdz.bg の時刻表",
    busSummary: "バスで",
    busBody: [
      "ソフィア中央バスターミナルからルコヴィト方面へ定期便があります。ルコヴィトは市の中心で、アグレンを含む各村への接続はそこから出ています。",
      "平日以外はルコヴィト–アグレン間の便がまばらです。土日に移動する場合は事前に時刻を確認するか、最後の区間はタクシーを見込んでください。"
    ]
  },
  sr: {
    title: "Мапа и превоз",
    lede: "Аглен је у општини Луковит, у долини реке Вит. Отворите тачку на мапи ради навигације, а испод погледајте како се стиже возом и аутобусом.",
    mapCta: "Отвори у Google мапама",
    railSummary: "Возом (БДЖ)",
    railBody: [
      "Аглен нема сопствену станицу. Најближе су Црвени бряг на главној прузи Софија–Плевен, са најгушћим саобраћајем, и Луковит на огранку ка Златној Панеги, где су возови ређи.",
      "Од станице се наставља међумесним аутобусом или таксијем. Редови вожње мењају се по сезонама и због радова, зато их проверите код превозника на дан путовања."
    ],
    railLinkLabel: "Редови вожње на bdz.bg",
    busSummary: "Аутобусом",
    busBody: [
      "Са Централне аутобуске станице у Софији постоје редовне линије ка Луковиту. Луковит је центар општине и одатле полази веза ка селима, међу њима и ка Аглену.",
      "Ван радних дана деоница Луковит–Аглен је ретка. Ако путујете суботом или недељом, распитајте се унапред за термине или предвидите такси за последњу деоницу."
    ]
  },
  zh: {
    title: "地图与交通",
    lede: "阿格伦位于维特河谷的卢科维特市。点开地图上的坐标即可导航；乘火车与巴士的方式见下方。",
    mapCta: "在 Google 地图中打开",
    railSummary: "乘火车（BDŽ）",
    railBody: [
      "阿格伦没有自己的火车站。最近的是索非亚–普列文干线上的红岸站，班次最密；以及兹拉特纳帕内加支线上的卢科维特站，列车较少。",
      "出站后换乘区域巴士或出租车。时刻表随季节和线路施工变动，请在出行当天向承运方核实。"
    ],
    railLinkLabel: "在 bdz.bg 查看时刻表",
    busSummary: "乘巴士",
    busBody: [
      "索非亚中央汽车站有定期班车前往卢科维特。卢科维特是市镇中心，通往辖内各村（包括阿格伦）的接驳从这里发出。",
      "非工作日卢科维特至阿格伦一段班次稀疏。若在周六或周日出行，请提前询问班次，或为最后一段预留出租车。"
    ]
  },
  hu: {
    title: "Térkép és közlekedés",
    lede: "Aglen a Vit folyó völgyében, Lukovit községben fekszik. Nyissa meg a pontot a térképen a navigációhoz, alább pedig megtalálja, hogyan érkezhet vonattal és busszal.",
    mapCta: "Megnyitás a Google Térképen",
    railSummary: "Vonattal (BDŽ)",
    railBody: [
      "Aglennek nincs saját állomása. A legközelebbiek Cserven Brjag a Szófia–Pleven fővonalon, a legsűrűbb közlekedéssel, és Lukovit a Zlatna Panega-i szárnyvonalon, ahol ritkábbak a vonatok.",
      "Az állomástól helyközi busszal vagy taxival lehet továbbmenni. A menetrendek évszakonként és felújítások miatt változnak, ezért az utazás napján ellenőrizze őket a szolgáltatónál."
    ],
    railLinkLabel: "Menetrendek a bdz.bg oldalon",
    busSummary: "Busszal",
    busBody: [
      "A szófiai Központi Buszpályaudvarról rendszeres járatok indulnak Lukovit felé. Lukovit a község központja, és onnan indul a kapcsolat a községhez tartozó falvakba, köztük Aglenbe.",
      "Hétköznapokon kívül a Lukovit–Aglen szakasz ritkán jár. Ha szombaton vagy vasárnap utazik, érdeklődjön előre az időpontokról, vagy számoljon taxival az utolsó szakaszra."
    ]
  }
};

export type RouteChoice = { dot: string; name: string; meta: string; stops: string[] };
export type RoutesCopy = { title: string; lede: string; seeRoutes: string; routes: RouteChoice[] };

/** The three walks, per language. Times are stated as approximate, and are. */
export const routesCopy: Record<LanguageCode, RoutesCopy> = {
  bg: {
    title: "Трите маршрута",
    lede: "Времената са ориентировъчни и са за спокойно ходене със спирания за снимки. Проходимостта се мени със сезона — питайте в селото, преди да тръгнете към по-отдалечените скали.",
    seeRoutes: "Виж маршрутите",
    routes: [
      {
        dot: "🟢",
        name: "Кратък разходков маршрут",
        meta: "Около 1 час · Лесен · Подходящ за деца и възрастни",
        stops: [
          "Центърът на селото",
          "Църквата „Св. Архангел Михаил“",
          "Брегът на река Вит"
        ]
      },
      {
        dot: "🟡",
        name: "Каньонът и скалните феномени",
        meta: "Около 2,5 часа · Умерен · С денивелация",
        stops: [
          "Речният бряг",
          "Скалната арка „Дупката“",
          "Панорамните скални венци"
        ]
      },
      {
        dot: "🔵",
        name: "Фотографски и приключенски маршрут",
        meta: "Около 3–4 часа · Разширен",
        stops: [
          "Каньонът на Вит",
          "Пещерите над Ъглен",
          "Преход към съседните карстови плата"
        ]
      }
    ]
  },
  en: {
    title: "The three routes",
    lede: "Times are approximate and assume an unhurried pace with stops for photographs. How passable the paths are changes with the season — ask in the village before setting off for the more distant rocks.",
    seeRoutes: "See the routes",
    routes: [
      {
        dot: "🟢",
        name: "The short village walk",
        meta: "About 1 hour · Easy · Suits children and older walkers",
        stops: [
          "The village centre",
          "The church of St Archangel Michael",
          "The bank of the Vit"
        ]
      },
      {
        dot: "🟡",
        name: "The canyon and the rock formations",
        meta: "About 2.5 hours · Moderate · Some climbing",
        stops: [
          "The riverbank",
          "The rock arch Dupkata",
          "The panoramic cliffs"
        ]
      },
      {
        dot: "🔵",
        name: "The photography and adventure route",
        meta: "About 3–4 hours · Demanding",
        stops: [
          "The canyon of the Vit",
          "The caves above Aglen",
          "Onward to the neighbouring karst plateaus"
        ]
      }
    ]
  },
  de: {
    title: "Die drei Routen",
    lede: "Die Zeiten sind Richtwerte und gehen von gemächlichem Gehen mit Fotopausen aus. Wie begehbar die Pfade sind, ändert sich mit der Jahreszeit — fragen Sie im Dorf, bevor Sie zu den entlegeneren Felsen aufbrechen.",
    seeRoutes: "Routen ansehen",
    routes: [
      {
        dot: "🟢",
        name: "Der kurze Dorfspaziergang",
        meta: "Etwa 1 Stunde · Leicht · Für Kinder und ältere Gäste",
        stops: [
          "Der Ortskern",
          "Die Kirche St. Erzengel Michael",
          "Das Ufer des Vit"
        ]
      },
      {
        dot: "🟡",
        name: "Die Schlucht und die Felsformationen",
        meta: "Etwa 2,5 Stunden · Mittel · Mit Steigungen",
        stops: [
          "Das Flussufer",
          "Der Felsbogen Dupkata",
          "Die Aussichtsfelsen"
        ]
      },
      {
        dot: "🔵",
        name: "Foto- und Abenteuerroute",
        meta: "Etwa 3–4 Stunden · Anspruchsvoll",
        stops: [
          "Die Schlucht des Vit",
          "Die Höhlen über Aglen",
          "Weiter zu den benachbarten Karstplateaus"
        ]
      }
    ]
  },
  fr: {
    title: "Les trois itinéraires",
    lede: "Les durées sont indicatives, pour une marche tranquille avec des arrêts photo. La praticabilité des sentiers varie selon la saison : renseignez-vous au village avant de partir vers les rochers les plus éloignés.",
    seeRoutes: "Voir les itinéraires",
    routes: [
      {
        dot: "🟢",
        name: "La courte promenade du village",
        meta: "Environ 1 heure · Facile · Convient aux enfants et aux aînés",
        stops: [
          "Le centre du village",
          "L'église Saint-Archange-Michel",
          "La berge de la Vit"
        ]
      },
      {
        dot: "🟡",
        name: "Le canyon et les formations rocheuses",
        meta: "Environ 2 h 30 · Moyen · Avec dénivelé",
        stops: [
          "La berge",
          "L'arche rocheuse Dupkata",
          "Les corniches panoramiques"
        ]
      },
      {
        dot: "🔵",
        name: "Itinéraire photo et aventure",
        meta: "Environ 3 à 4 heures · Exigeant",
        stops: [
          "Le canyon de la Vit",
          "Les grottes au-dessus d'Aglen",
          "Vers les plateaux karstiques voisins"
        ]
      }
    ]
  },
  es: {
    title: "Las tres rutas",
    lede: "Los tiempos son orientativos y suponen un paso tranquilo con paradas para fotografiar. La transitabilidad cambia con la estación: pregunte en el pueblo antes de ir hacia las rocas más lejanas.",
    seeRoutes: "Ver las rutas",
    routes: [
      {
        dot: "🟢",
        name: "El paseo corto por el pueblo",
        meta: "Alrededor de 1 hora · Fácil · Apto para niños y mayores",
        stops: [
          "El centro del pueblo",
          "La iglesia de San Arcángel Miguel",
          "La orilla del Vit"
        ]
      },
      {
        dot: "🟡",
        name: "El cañón y las formaciones rocosas",
        meta: "Alrededor de 2,5 horas · Moderada · Con desnivel",
        stops: [
          "La ribera",
          "El arco de roca Dupkata",
          "Los cortados panorámicos"
        ]
      },
      {
        dot: "🔵",
        name: "Ruta fotográfica y de aventura",
        meta: "Alrededor de 3–4 horas · Exigente",
        stops: [
          "El cañón del Vit",
          "Las cuevas sobre Aglen",
          "Hacia las mesetas kársticas vecinas"
        ]
      }
    ]
  },
  it: {
    title: "I tre percorsi",
    lede: "I tempi sono indicativi e presuppongono un passo tranquillo con soste per le fotografie. La percorribilità cambia con la stagione: chiedete in paese prima di dirigervi verso le rocce più lontane.",
    seeRoutes: "Vedi i percorsi",
    routes: [
      {
        dot: "🟢",
        name: "La breve passeggiata nel villaggio",
        meta: "Circa 1 ora · Facile · Adatta a bambini e anziani",
        stops: [
          "Il centro del villaggio",
          "La chiesa di San Michele Arcangelo",
          "La riva del Vit"
        ]
      },
      {
        dot: "🟡",
        name: "Il canyon e le formazioni rocciose",
        meta: "Circa 2,5 ore · Media · Con dislivello",
        stops: [
          "La riva del fiume",
          "L'arco di roccia Dupkata",
          "Le pareti panoramiche"
        ]
      },
      {
        dot: "🔵",
        name: "Percorso fotografico e d'avventura",
        meta: "Circa 3–4 ore · Impegnativo",
        stops: [
          "Il canyon del Vit",
          "Le grotte sopra Aglen",
          "Verso gli altipiani carsici vicini"
        ]
      }
    ]
  },
  ro: {
    title: "Cele trei trasee",
    lede: "Timpii sunt orientativi și presupun un mers lejer, cu opriri pentru fotografii. Practicabilitatea se schimbă cu sezonul — întrebați în sat înainte de a porni spre stâncile mai îndepărtate.",
    seeRoutes: "Vezi traseele",
    routes: [
      {
        dot: "🟢",
        name: "Plimbarea scurtă prin sat",
        meta: "Circa 1 oră · Ușor · Potrivit pentru copii și vârstnici",
        stops: [
          "Centrul satului",
          "Biserica Sfântul Arhanghel Mihail",
          "Malul Vitului"
        ]
      },
      {
        dot: "🟡",
        name: "Canionul și formele de stâncă",
        meta: "Circa 2,5 ore · Moderat · Cu diferență de nivel",
        stops: [
          "Malul râului",
          "Arcada de stâncă Dupkata",
          "Brâiele panoramice"
        ]
      },
      {
        dot: "🔵",
        name: "Traseu foto și de aventură",
        meta: "Circa 3–4 ore · Solicitant",
        stops: [
          "Canionul Vitului",
          "Peșterile de deasupra Aglenului",
          "Spre platourile carstice vecine"
        ]
      }
    ]
  },
  tr: {
    title: "Üç rota",
    lede: "Süreler yaklaşıktır; fotoğraf molalarıyla sakin bir tempoya göredir. Patikaların geçilebilirliği mevsime göre değişir — uzaktaki kayalara yönelmeden önce köyde sorun.",
    seeRoutes: "Rotaları gör",
    routes: [
      {
        dot: "🟢",
        name: "Kısa köy yürüyüşü",
        meta: "Yaklaşık 1 saat · Kolay · Çocuklara ve yaşlılara uygun",
        stops: [
          "Köy merkezi",
          "Baş Melek Mihail Kilisesi",
          "Vit'in kıyısı"
        ]
      },
      {
        dot: "🟡",
        name: "Kanyon ve kaya oluşumları",
        meta: "Yaklaşık 2,5 saat · Orta · Yükselti farkı var",
        stops: [
          "Nehir kıyısı",
          "Dupkata kaya kemeri",
          "Manzaralı kaya kuşakları"
        ]
      },
      {
        dot: "🔵",
        name: "Fotoğraf ve macera rotası",
        meta: "Yaklaşık 3–4 saat · Zorlu",
        stops: [
          "Vit kanyonu",
          "Aglen üzerindeki mağaralar",
          "Komşu karst platolarına geçiş"
        ]
      }
    ]
  },
  el: {
    title: "Οι τρεις διαδρομές",
    lede: "Οι χρόνοι είναι ενδεικτικοί και υπολογίζουν ήρεμο βάδισμα με στάσεις για φωτογραφίες. Το πόσο βατά είναι τα μονοπάτια αλλάζει με την εποχή — ρωτήστε στο χωριό πριν ξεκινήσετε για τους πιο απόμακρους βράχους.",
    seeRoutes: "Δείτε τις διαδρομές",
    routes: [
      {
        dot: "🟢",
        name: "Ο σύντομος περίπατος στο χωριό",
        meta: "Περίπου 1 ώρα · Εύκολη · Κατάλληλη για παιδιά και ηλικιωμένους",
        stops: [
          "Το κέντρο του χωριού",
          "Ο ναός του Αρχαγγέλου Μιχαήλ",
          "Η όχθη του Βιτ"
        ]
      },
      {
        dot: "🟡",
        name: "Το φαράγγι και οι βραχώδεις σχηματισμοί",
        meta: "Περίπου 2,5 ώρες · Μέτρια · Με υψομετρική διαφορά",
        stops: [
          "Η όχθη του ποταμού",
          "Η βραχώδης αψίδα Ντούπκατα",
          "Τα πανοραμικά βραχώδη στεφάνια"
        ]
      },
      {
        dot: "🔵",
        name: "Διαδρομή φωτογραφίας και περιπέτειας",
        meta: "Περίπου 3–4 ώρες · Απαιτητική",
        stops: [
          "Το φαράγγι του Βιτ",
          "Οι σπηλιές πάνω από το Άγκλεν",
          "Προς τα γειτονικά καρστικά πλατώματα"
        ]
      }
    ]
  },
  ru: {
    title: "Три маршрута",
    lede: "Время указано ориентировочно, из расчёта спокойного шага с остановками на съёмку. Проходимость троп меняется по сезонам — спросите в селе, прежде чем идти к дальним скалам.",
    seeRoutes: "Смотреть маршруты",
    routes: [
      {
        dot: "🟢",
        name: "Короткая прогулка по селу",
        meta: "Около 1 часа · Легко · Подходит детям и пожилым",
        stops: [
          "Центр села",
          "Церковь Святого Архангела Михаила",
          "Берег Вита"
        ]
      },
      {
        dot: "🟡",
        name: "Каньон и скальные формы",
        meta: "Около 2,5 часов · Средне · С перепадом высот",
        stops: [
          "Берег реки",
          "Скальная арка Дупката",
          "Панорамные скальные гряды"
        ]
      },
      {
        dot: "🔵",
        name: "Фотографический и приключенческий маршрут",
        meta: "Около 3–4 часов · Сложно",
        stops: [
          "Каньон Вита",
          "Пещеры над Агленом",
          "Переход к соседним карстовым плато"
        ]
      }
    ]
  },
  ja: {
    title: "三つのルート",
    lede: "所要時間は目安で、写真を撮りながらのゆっくりした歩みを想定しています。道の通りやすさは季節で変わります。遠くの岩場へ向かう前に村で尋ねてください。",
    seeRoutes: "ルートを見る",
    routes: [
      {
        dot: "🟢",
        name: "村を歩く短いコース",
        meta: "約1時間・やさしい・子どもや年配の方にも",
        stops: [
          "村の中心",
          "聖大天使ミカエル教会",
          "ヴィト川の岸辺"
        ]
      },
      {
        dot: "🟡",
        name: "渓谷と奇岩のコース",
        meta: "約2.5時間・ふつう・登り下りあり",
        stops: [
          "川岸",
          "岩のアーチ「ドゥプカタ」",
          "見晴らしの岩壁"
        ]
      },
      {
        dot: "🔵",
        name: "撮影と冒険のコース",
        meta: "約3〜4時間・健脚向き",
        stops: [
          "ヴィト川の渓谷",
          "アグレン上方の洞窟",
          "隣接するカルスト台地へ"
        ]
      }
    ]
  },
  sr: {
    title: "Три руте",
    lede: "Времена су оквирна и рачунају на лаган ход са паузама за фотографисање. Проходност стаза мења се са годишњим добом — питајте у селу пре него што кренете ка удаљенијим стенама.",
    seeRoutes: "Погледај руте",
    routes: [
      {
        dot: "🟢",
        name: "Кратка шетња кроз село",
        meta: "Око 1 сат · Лако · Погодно за децу и старије",
        stops: [
          "Центар села",
          "Црква Светог Арханђела Михаила",
          "Обала Вита"
        ]
      },
      {
        dot: "🟡",
        name: "Кањон и стеновити облици",
        meta: "Око 2,5 сата · Умерено · Са успоном",
        stops: [
          "Обала реке",
          "Стеновити лук Дупката",
          "Панорамски стеновити венци"
        ]
      },
      {
        dot: "🔵",
        name: "Фотографска и авантуристичка рута",
        meta: "Око 3–4 сата · Захтевно",
        stops: [
          "Кањон Вита",
          "Пећине изнад Аглена",
          "Прелаз ка суседним крашким заравнима"
        ]
      }
    ]
  },
  zh: {
    title: "三条路线",
    lede: "时间为大致估算，按从容步行、途中停下拍照计算。步道是否好走随季节变化——前往较远的岩区前请先在村中打听。",
    seeRoutes: "查看路线",
    routes: [
      {
        dot: "🟢",
        name: "村中短程漫步",
        meta: "约 1 小时 · 轻松 · 适合老人与孩子",
        stops: [
          "村庄中心",
          "圣天使长米迦勒教堂",
          "维特河岸"
        ]
      },
      {
        dot: "🟡",
        name: "峡谷与岩形",
        meta: "约 2.5 小时 · 中等 · 有起伏",
        stops: [
          "河岸",
          "杜普卡塔岩拱",
          "观景岩壁"
        ]
      },
      {
        dot: "🔵",
        name: "摄影与探险路线",
        meta: "约 3–4 小时 · 进阶",
        stops: [
          "维特河峡谷",
          "阿格伦上方的洞穴",
          "前往邻近的喀斯特台地"
        ]
      }
    ]
  },
  hu: {
    title: "A három útvonal",
    lede: "Az időtartamok tájékoztatók, kényelmes tempóval és fotószünetekkel számolva. Az ösvények járhatósága évszakonként változik — kérdezzen a faluban, mielőtt a távolabbi sziklák felé indulna.",
    seeRoutes: "Útvonalak megtekintése",
    routes: [
      {
        dot: "🟢",
        name: "Rövid falusi séta",
        meta: "Nagyjából 1 óra · Könnyű · Gyerekeknek és időseknek is",
        stops: [
          "A falu központja",
          "Szent Mihály arkangyal temploma",
          "A Vit partja"
        ]
      },
      {
        dot: "🟡",
        name: "A kanyon és a sziklaalakzatok",
        meta: "Nagyjából 2,5 óra · Közepes · Szintkülönbséggel",
        stops: [
          "A folyópart",
          "A Dupkata sziklaboltív",
          "A panorámás sziklafalak"
        ]
      },
      {
        dot: "🔵",
        name: "Fotós és kalandútvonal",
        meta: "Nagyjából 3–4 óra · Igényes",
        stops: [
          "A Vit kanyonja",
          "Az Aglen fölötti barlangok",
          "Tovább a szomszédos karsztfennsíkokra"
        ]
      }
    ]
  }
};

export type ChecklistCopy = { title: string; lede: string; items: string[]; done: string };

/** The family packing list, per language. */
export const checklistCopy: Record<LanguageCode, ChecklistCopy> = {
  bg: {
    title: "🧸 Семеен чек-лист за разходката",
    lede: "Отметнете, докато стягате багажа. Списъкът се пази, докато сте на страницата.",
    items: [
      "Одеяло за пикник и подкрепителна храна",
      "Резервни дрехи и вода за децата",
      "Удобни маратонки или сандали за брега",
      "Шапки и слънцезащитен крем",
      "Торбичка за отпадъци — пазим природата чиста"
    ],
    done: "Готови сте за път."
  },
  en: {
    title: "🧸 The family packing list",
    lede: "Tick these off while you pack. The list keeps your marks while you stay on the page.",
    items: [
      "A picnic blanket and something to eat",
      "Spare clothes and water for the children",
      "Trainers or sandals that suit the riverbank",
      "Hats and sun cream",
      "A bag for rubbish — we leave the place as we found it"
    ],
    done: "You are ready to go."
  },
  de: {
    title: "🧸 Die Packliste für die Familie",
    lede: "Haken Sie beim Packen ab. Die Liste behält Ihre Häkchen, solange Sie auf der Seite bleiben.",
    items: [
      "Picknickdecke und etwas zu essen",
      "Wechselkleidung und Wasser für die Kinder",
      "Turnschuhe oder Sandalen fürs Ufer",
      "Hüte und Sonnencreme",
      "Ein Beutel für den Müll — wir lassen den Ort, wie wir ihn fanden"
    ],
    done: "Sie sind startklar."
  },
  fr: {
    title: "🧸 La liste de la famille",
    lede: "Cochez pendant que vous préparez le sac. La liste garde vos coches tant que vous restez sur la page.",
    items: [
      "Une couverture de pique-nique et de quoi manger",
      "Des vêtements de rechange et de l'eau pour les enfants",
      "Des baskets ou des sandales adaptées à la berge",
      "Chapeaux et crème solaire",
      "Un sac pour les déchets — on laisse le lieu comme on l'a trouvé"
    ],
    done: "Vous êtes prêts à partir."
  },
  es: {
    title: "🧸 La lista de la familia",
    lede: "Marque mientras hace la mochila. La lista conserva sus marcas mientras siga en la página.",
    items: [
      "Una manta de picnic y algo de comer",
      "Ropa de recambio y agua para los niños",
      "Zapatillas o sandalias aptas para la ribera",
      "Gorras y crema solar",
      "Una bolsa para la basura: dejamos el sitio como lo encontramos"
    ],
    done: "Listos para salir."
  },
  it: {
    title: "🧸 La lista della famiglia",
    lede: "Spuntate mentre preparate lo zaino. L'elenco conserva i segni finché restate sulla pagina.",
    items: [
      "Una coperta da picnic e qualcosa da mangiare",
      "Vestiti di ricambio e acqua per i bambini",
      "Scarpe da ginnastica o sandali adatti alla riva",
      "Cappelli e crema solare",
      "Un sacchetto per i rifiuti: lasciamo il posto come l'abbiamo trovato"
    ],
    done: "Siete pronti a partire."
  },
  ro: {
    title: "🧸 Lista familiei",
    lede: "Bifați în timp ce faceți bagajul. Lista păstrează bifele cât timp rămâneți pe pagină.",
    items: [
      "O pătură de picnic și ceva de mâncare",
      "Haine de schimb și apă pentru copii",
      "Adidași sau sandale potrivite pentru mal",
      "Pălării și cremă de soare",
      "O pungă pentru gunoi — lăsăm locul cum l-am găsit"
    ],
    done: "Sunteți gata de drum."
  },
  tr: {
    title: "🧸 Aile için hazırlık listesi",
    lede: "Çantayı hazırlarken işaretleyin. Sayfada kaldığınız sürece işaretler durur.",
    items: [
      "Piknik örtüsü ve yiyecek bir şeyler",
      "Çocuklar için yedek kıyafet ve su",
      "Kıyıya uygun spor ayakkabı ya da sandalet",
      "Şapka ve güneş kremi",
      "Çöp için bir poşet — yeri bulduğumuz gibi bırakırız"
    ],
    done: "Yola çıkmaya hazırsınız."
  },
  el: {
    title: "🧸 Η λίστα της οικογένειας",
    lede: "Τσεκάρετε καθώς ετοιμάζετε τη τσάντα. Η λίστα κρατά τα σημάδια όσο μένετε στη σελίδα.",
    items: [
      "Κουβέρτα για πικνίκ και κάτι για φαγητό",
      "Ρούχα αλλαξιάς και νερό για τα παιδιά",
      "Αθλητικά ή σανδάλια κατάλληλα για την όχθη",
      "Καπέλα και αντηλιακό",
      "Μια σακούλα για τα σκουπίδια — αφήνουμε τον τόπο όπως τον βρήκαμε"
    ],
    done: "Είστε έτοιμοι."
  },
  ru: {
    title: "🧸 Семейный список сборов",
    lede: "Отмечайте, пока собираете рюкзак. Отметки сохраняются, пока вы на странице.",
    items: [
      "Плед для пикника и что-нибудь поесть",
      "Сменная одежда и вода для детей",
      "Кроссовки или сандалии для берега",
      "Панамы и солнцезащитный крем",
      "Пакет для мусора — оставляем место таким, каким нашли"
    ],
    done: "Можно в путь."
  },
  ja: {
    title: "🧸 家族の持ちもの表",
    lede: "荷造りをしながらチェックしてください。ページを開いているあいだ、印は残ります。",
    items: [
      "ピクニック用の敷物と食べもの",
      "子どもの着替えと水",
      "川辺に向くスニーカーかサンダル",
      "帽子と日焼け止め",
      "ごみ袋——来たときのままにして帰ります"
    ],
    done: "準備は整いました。"
  },
  sr: {
    title: "🧸 Породична листа за паковање",
    lede: "Штиклирајте док пакујете. Листа чува ознаке док сте на страници.",
    items: [
      "Ћебе за пикник и нешто за јело",
      "Резервна одећа и вода за децу",
      "Патике или сандале погодне за обалу",
      "Шешири и крема за сунце",
      "Кеса за смеће — остављамо место каквим смо га затекли"
    ],
    done: "Спремни сте за полазак."
  },
  zh: {
    title: "🧸 家庭出行清单",
    lede: "收拾行李时逐项勾选。只要停留在本页，勾选就会保留。",
    items: [
      "野餐垫和一些吃的",
      "孩子的换洗衣物与饮用水",
      "适合河岸的运动鞋或凉鞋",
      "帽子和防晒霜",
      "一个装垃圾的袋子——来时什么样，走时还什么样"
    ],
    done: "可以出发了。"
  },
  hu: {
    title: "🧸 Családi csomagolólista",
    lede: "Pipálja ki, miközben pakol. A lista megőrzi a jeleket, amíg az oldalon marad.",
    items: [
      "Pikniktakaró és valami harapnivaló",
      "Váltóruha és víz a gyerekeknek",
      "Partra való sportcipő vagy szandál",
      "Kalapok és naptej",
      "Egy zsák a szemétnek — úgy hagyjuk a helyet, ahogy találtuk"
    ],
    done: "Indulhatnak."
  }
};

export const transportLinks = { map: AGLEN_MAP_URL, rail: BDZ_URL };

/**
 * One season of the year as the page shows it: a tab, a promise and two badges.
 *
 * `months` is on the tab rather than inside the panel because it is what a
 * visitor is matching against — they arrive knowing when they can travel, not
 * which season they want, and a tab row that only says "Spring / Summer" makes
 * them open all four to find out which one covers August.
 */
export type SeasonPanel = {
  icon: string;
  /** The season's name, on the tab. */
  name: string;
  /** The months it covers, under the name — "April – June". */
  months: string;
  /** What the season is, as a heading inside the panel. */
  title: string;
  body: string;
  /** One or two badges: what this season is good for. */
  tags: string[];
  /**
   * Alt text for that season's photograph — describing THIS file, in this
   * language. Absent where `seasonImages` has no photograph to describe.
   */
  imageAlt?: string;
};

export type SeasonsCopy = {
  title: string;
  lede: string;
  seasons: [SeasonPanel, SeasonPanel, SeasonPanel, SeasonPanel];
  /** The forecast panel under the tabs. */
  weatherTitle: string;
  weatherBody: string;
  weatherCta: string;
};

/**
 * A forecast for Aglen's own coordinates — the ones the graph and the JSON-LD
 * already publish — rather than for Lukovit, the nearest place a weather service
 * has a name for. The valley floor and the town above it are not the same
 * afternoon, which is the whole argument of the page this panel sits on.
 *
 * The site states plainly that it has no weather source and does not track path
 * conditions (`src/guides.ts`). This link does not change that: it hands the
 * question to a meteorological service and says so, rather than printing a
 * number the site would have no way of keeping true.
 */
export const forecastLink = "https://www.meteoblue.com/en/weather/week/43.201N24.315E";

/**
 * Which of the four panels a visitor should land on, from a month index (0–11).
 *
 * Lives beside the copy because it IS the copy: the boundaries here are the
 * month ranges printed on the tabs, and a component that hard-coded its own
 * would eventually open "Spring" on a page whose tab says April.
 */
export function seasonForMonth(month: number): 0 | 1 | 2 | 3 {
  if (month >= 3 && month <= 5) return 0; // April – June
  if (month >= 6 && month <= 7) return 1; // July – August
  if (month >= 8 && month <= 10) return 2; // September – November
  return 3; // December – March
}

/**
 * The photograph each season shows, in the order the tabs run.
 *
 * One table rather than a path repeated inside all fourteen locales: a
 * photograph is not translated, and fourteen copies of a filename is fourteen
 * chances for one language to end up showing a different valley.
 *
 * Four photographs of the one valley, each taken in the season it is filed
 * under — so the tabs change the landscape and not merely the subject. All four
 * are 16:9, which is what lets the slot below them hold a fixed height without
 * cropping one season harder than the next.
 */
export const seasonImages: Array<string | undefined> = [
  images.spring,
  images.summer,
  images.autumn,
  images.winter,
];

/** The seasonal selector's words, per language. */
export const seasonsCopy: Record<LanguageCode, SeasonsCopy> = {
  bg: {
    title: "🗓️ Изберете своя сезон",
    lede: "Четири различни Ъглена. Изберете сезона, за да видите какво ви чака.",
    seasons: [
      { icon: "🌸", name: "Пролет", months: "Април – Юни", title: "Буйна зеленина и пълноводие", body: "Най-доброто време за фотография и преходи. Река Вит е пълноводна, а температурите са идеални за ходене без жега.", tags: ["📸 Фотография", "🥾 Преходи"], imageAlt: "Пролетен изглед отвисоко към каньона на река Вит и Ъглен: тюркоазена вода, свежа зеленина по склоновете, бели варовикови скали и цъфнали храсти на преден план" },
      { icon: "☀️", name: "Лято", months: "Юли – Август", title: "Прохлада и сянка край реката", body: "Идеално за бягство от жегите. Сенчестите брегове и скалните стени предлагат естествен климатик за пикник.", tags: ["🌊 Речен релакс", "🧺 Пикник"], imageAlt: "Лятна гледка от брега на река Вит край Ъглен: бистра тюркоазена вода над каменистото дъно, гъста сянка от дърветата и варовикова стена вдясно" },
      { icon: "🍁", name: "Есен", months: "Септември – Ноември", title: "Златни нюанси и тишина", body: "Скалните венци контрастират с огнения цвят на дърветата. Време за тихи разходки и фотография.", tags: ["🍁 Спокойствие", "📷 Златен час"], imageAlt: "Есенна пътека край река Вит при Ъглен, покрита с окапали листа, между варовикови камъни и склонове в оранжево и златно" },
      { icon: "❄️", name: "Зима", months: "Декември – Март", title: "Сурова и драматична красота", body: "Каньонът придобива епичен вид. Перфектно за любители на зимния минимализъм и уединението.", tags: ["❄️ Зимна тишина"], imageAlt: "Заснежен Ъглен и каньонът на река Вит отвисоко: скреж по дърветата, частично замръзнала река и дим от комините на къщите" },
    ],
    weatherTitle: "🌤️ Прогноза и съвет за днес",
    weatherBody: "Проверете текущите температури в Луковит и Ъглен преди отпътуване. Сайтът не следи времето — прогнозата е на метеорологичната служба.",
    weatherCta: "Виж прогнозата за времето",
  },
  en: {
    title: "🗓️ Choose your season",
    lede: "Four different Aglens. Pick a season to see what waits for you.",
    seasons: [
      { icon: "🌸", name: "Spring", months: "April – June", title: "Deep green and high water", body: "The best time for photography and walking. The Vit runs full, and the temperature suits a long walk without the heat.", tags: ["📸 Photography", "🥾 Walking"], imageAlt: "A spring view over the Vit River canyon at Aglen: turquoise water, fresh green slopes, white limestone crags and blossoming shrubs in the foreground" },
      { icon: "☀️", name: "Summer", months: "July – August", title: "Shade and cool by the river", body: "The place to escape the heat. Shaded banks and rock walls make a natural air conditioner for a picnic.", tags: ["🌊 River time", "🧺 Picnic"], imageAlt: "A summer view from the bank of the River Vit near Aglen: clear turquoise water over a stony bed, deep shade from the trees and a limestone wall to the right" },
      { icon: "🍁", name: "Autumn", months: "September – November", title: "Golden light and quiet", body: "The rock crowns stand against the fire in the trees. A season for slow walks and photographs.", tags: ["🍁 Calm", "📷 Golden hour"], imageAlt: "An autumn path beside the River Vit at Aglen, covered in fallen leaves, between limestone boulders and slopes turned orange and gold" },
      { icon: "❄️", name: "Winter", months: "December – March", title: "Stark and dramatic", body: "The canyon turns epic. Made for anyone who loves winter minimalism and having a place to themselves.", tags: ["❄️ Winter quiet"], imageAlt: "Aglen and the Vit River canyon under snow from above: frost on the trees, the river part frozen and smoke rising from the chimneys" },
    ],
    weatherTitle: "🌤️ Today's forecast and advice",
    weatherBody: "Check the current temperature in Lukovit and Aglen before you set off. The site does not track the weather — the forecast is the meteorological service's own.",
    weatherCta: "Open the weather forecast",
  },
  de: {
    title: "🗓️ Wählen Sie Ihre Jahreszeit",
    lede: "Vier verschiedene Aglen. Wählen Sie eine Jahreszeit und sehen Sie, was Sie erwartet.",
    seasons: [
      { icon: "🌸", name: "Frühling", months: "April – Juni", title: "Sattes Grün und hoher Wasserstand", body: "Die beste Zeit für Fotografie und Wanderungen. Der Vit führt viel Wasser, und die Temperaturen eignen sich zum Gehen ohne Hitze.", tags: ["📸 Fotografie", "🥾 Wandern"], imageAlt: "Frühlingsblick über den Canyon des Vit bei Aglen: türkisfarbenes Wasser, frisches Grün an den Hängen, weiße Kalksteinfelsen und blühende Sträucher im Vordergrund" },
      { icon: "☀️", name: "Sommer", months: "Juli – August", title: "Kühle und Schatten am Fluss", body: "Ideal, um der Hitze zu entkommen. Schattige Ufer und Felswände sind die natürliche Klimaanlage für ein Picknick.", tags: ["🌊 Flusszeit", "🧺 Picknick"], imageAlt: "Sommerblick vom Ufer des Vit nahe Aglen: klares türkisfarbenes Wasser über steinigem Grund, tiefer Schatten der Bäume und rechts eine Kalksteinwand" },
      { icon: "🍁", name: "Herbst", months: "September – November", title: "Goldene Töne und Stille", body: "Die Felskronen stehen gegen das Feuer der Bäume. Eine Zeit für stille Spaziergänge und Fotografie.", tags: ["🍁 Ruhe", "📷 Goldene Stunde"], imageAlt: "Ein herbstlicher Pfad am Vit bei Aglen, mit Laub bedeckt, zwischen Kalksteinblöcken und orange-golden verfärbten Hängen" },
      { icon: "❄️", name: "Winter", months: "Dezember – März", title: "Rau und dramatisch", body: "Der Canyon wird episch. Perfekt für alle, die winterlichen Minimalismus und Abgeschiedenheit lieben.", tags: ["❄️ Winterstille"], imageAlt: "Aglen und der Canyon des Vit unter Schnee von oben: Raureif auf den Bäumen, der Fluss teilweise gefroren und Rauch aus den Schornsteinen" },
    ],
    weatherTitle: "🌤️ Vorhersage und Tipp für heute",
    weatherBody: "Prüfen Sie vor der Abfahrt die aktuellen Temperaturen in Lukovit und Aglen. Die Seite verfolgt das Wetter nicht — die Vorhersage stammt vom Wetterdienst.",
    weatherCta: "Wettervorhersage öffnen",
  },
  fr: {
    title: "🗓️ Choisissez votre saison",
    lede: "Quatre Aglen différents. Choisissez une saison pour voir ce qui vous attend.",
    seasons: [
      { icon: "🌸", name: "Printemps", months: "Avril – juin", title: "Verdure dense et hautes eaux", body: "Le meilleur moment pour la photographie et la marche. La Vit est haute et les températures conviennent à la marche sans la chaleur.", tags: ["📸 Photographie", "🥾 Randonnée"], imageAlt: "Vue de printemps sur le canyon de la Vit à Aglen : eau turquoise, versants d'un vert tendre, falaises calcaires blanches et arbustes en fleurs au premier plan" },
      { icon: "☀️", name: "Été", months: "Juillet – août", title: "Fraîcheur et ombre au bord de l'eau", body: "Idéal pour échapper à la chaleur. Les berges ombragées et les parois rocheuses forment une climatisation naturelle pour un pique-nique.", tags: ["🌊 Détente au bord de l'eau", "🧺 Pique-nique"], imageAlt: "Vue d'été depuis la berge de la Vit près d'Aglen : eau turquoise limpide sur un fond de galets, ombre dense des arbres et paroi calcaire à droite" },
      { icon: "🍁", name: "Automne", months: "Septembre – novembre", title: "Nuances dorées et silence", body: "Les couronnes rocheuses contrastent avec le feu des arbres. La saison des promenades tranquilles et de la photographie.", tags: ["🍁 Sérénité", "📷 Heure dorée"], imageAlt: "Un sentier d'automne au bord de la Vit à Aglen, couvert de feuilles mortes, entre des blocs calcaires et des versants passés à l'orange et à l'or" },
      { icon: "❄️", name: "Hiver", months: "Décembre – mars", title: "Une beauté rude et dramatique", body: "Le canyon devient épique. Parfait pour qui aime le minimalisme hivernal et la solitude.", tags: ["❄️ Silence d'hiver"], imageAlt: "Aglen et le canyon de la Vit sous la neige, vus d'en haut : givre sur les arbres, rivière en partie gelée et fumée sortant des cheminées" },
    ],
    weatherTitle: "🌤️ Prévisions et conseil du jour",
    weatherBody: "Vérifiez les températures actuelles à Lukovit et Aglen avant de partir. Le site ne suit pas la météo — les prévisions sont celles du service météorologique.",
    weatherCta: "Voir les prévisions météo",
  },
  es: {
    title: "🗓️ Elija su estación",
    lede: "Cuatro Aglen distintos. Elija una estación para ver qué le espera.",
    seasons: [
      { icon: "🌸", name: "Primavera", months: "Abril – junio", title: "Verde intenso y río crecido", body: "El mejor momento para la fotografía y las caminatas. El Vit baja lleno y las temperaturas permiten andar sin calor.", tags: ["📸 Fotografía", "🥾 Senderismo"], imageAlt: "Vista primaveral del cañón del río Vit en Aglen: agua turquesa, laderas de verde nuevo, riscos calizos blancos y arbustos en flor en primer plano" },
      { icon: "☀️", name: "Verano", months: "Julio – agosto", title: "Frescor y sombra junto al río", body: "Ideal para escapar del calor. Las orillas sombreadas y las paredes de roca son un aire acondicionado natural para un picnic.", tags: ["🌊 Río y descanso", "🧺 Picnic"], imageAlt: "Vista veraniega desde la orilla del Vit cerca de Aglen: agua turquesa transparente sobre un lecho de piedras, sombra densa de los árboles y pared caliza a la derecha" },
      { icon: "🍁", name: "Otoño", months: "Septiembre – noviembre", title: "Tonos dorados y silencio", body: "Las cornisas de roca contrastan con el fuego de los árboles. Tiempo de paseos tranquilos y fotografía.", tags: ["🍁 Calma", "📷 Hora dorada"], imageAlt: "Un sendero otoñal junto al río Vit en Aglen, cubierto de hojas caídas, entre bloques calizos y laderas teñidas de naranja y oro" },
      { icon: "❄️", name: "Invierno", months: "Diciembre – marzo", title: "Belleza áspera y dramática", body: "El cañón se vuelve épico. Perfecto para quien ama el minimalismo invernal y la soledad.", tags: ["❄️ Silencio invernal"], imageAlt: "Aglen y el cañón del Vit bajo la nieve, desde arriba: escarcha en los árboles, el río parcialmente helado y humo saliendo de las chimeneas" },
    ],
    weatherTitle: "🌤️ Pronóstico y consejo de hoy",
    weatherBody: "Consulte las temperaturas actuales en Lukovit y Aglen antes de salir. El sitio no sigue el tiempo: el pronóstico es del servicio meteorológico.",
    weatherCta: "Ver el pronóstico del tiempo",
  },
  it: {
    title: "🗓️ Scegli la tua stagione",
    lede: "Quattro Aglen diversi. Scegli una stagione per vedere che cosa ti aspetta.",
    seasons: [
      { icon: "🌸", name: "Primavera", months: "Aprile – giugno", title: "Verde folto e fiume in piena", body: "Il momento migliore per la fotografia e le camminate. Il Vit è in piena e le temperature permettono di camminare senza afa.", tags: ["📸 Fotografia", "🥾 Escursioni"], imageAlt: "Veduta primaverile sul canyon del fiume Vit ad Aglen: acqua turchese, versanti di verde nuovo, rupi calcaree bianche e arbusti in fiore in primo piano" },
      { icon: "☀️", name: "Estate", months: "Luglio – agosto", title: "Fresco e ombra lungo il fiume", body: "Ideale per sfuggire alla calura. Le rive ombrose e le pareti di roccia sono il condizionatore naturale per un picnic.", tags: ["🌊 Relax sul fiume", "🧺 Picnic"], imageAlt: "Veduta estiva dalla riva del Vit vicino ad Aglen: acqua turchese limpida su un fondo di sassi, ombra fitta degli alberi e parete calcarea a destra" },
      { icon: "🍁", name: "Autunno", months: "Settembre – novembre", title: "Toni dorati e silenzio", body: "Le corone di roccia contrastano con il fuoco degli alberi. Tempo di passeggiate quiete e fotografia.", tags: ["🍁 Quiete", "📷 Ora d'oro"], imageAlt: "Un sentiero autunnale lungo il fiume Vit ad Aglen, coperto di foglie cadute, tra massi calcarei e versanti virati all'arancio e all'oro" },
      { icon: "❄️", name: "Inverno", months: "Dicembre – marzo", title: "Bellezza aspra e drammatica", body: "Il canyon diventa epico. Perfetto per chi ama il minimalismo invernale e la solitudine.", tags: ["❄️ Silenzio invernale"], imageAlt: "Aglen e il canyon del Vit sotto la neve, dall'alto: brina sugli alberi, il fiume in parte ghiacciato e fumo dai camini" },
    ],
    weatherTitle: "🌤️ Previsioni e consiglio per oggi",
    weatherBody: "Controlla le temperature attuali a Lukovit e Aglen prima di partire. Il sito non segue il meteo: le previsioni sono del servizio meteorologico.",
    weatherCta: "Apri le previsioni del tempo",
  },
  ro: {
    title: "🗓️ Alegeți-vă anotimpul",
    lede: "Patru Aglen diferite. Alegeți un anotimp ca să vedeți ce vă așteaptă.",
    seasons: [
      { icon: "🌸", name: "Primăvara", months: "Aprilie – iunie", title: "Verde bogat și apă mare", body: "Cel mai bun moment pentru fotografie și drumeții. Vitul curge plin, iar temperaturile sunt potrivite pentru mers fără caniculă.", tags: ["📸 Fotografie", "🥾 Drumeții"], imageAlt: "Priveliște de primăvară peste canionul râului Vit la Aglen: apă turcoaz, versanți de verde crud, stânci albe de calcar și tufe înflorite în prim-plan" },
      { icon: "☀️", name: "Vara", months: "Iulie – august", title: "Răcoare și umbră lângă râu", body: "Ideal pentru a scăpa de caniculă. Malurile umbrite și pereții de stâncă sunt aerul condiționat natural pentru un picnic.", tags: ["🌊 Relaxare la râu", "🧺 Picnic"], imageAlt: "Priveliște de vară de pe malul Vitului lângă Aglen: apă turcoaz limpede peste un fund pietros, umbră deasă de la copaci și un perete de calcar în dreapta" },
      { icon: "🍁", name: "Toamna", months: "Septembrie – noiembrie", title: "Nuanțe aurii și liniște", body: "Cununile de stâncă contrastează cu focul din copaci. Vremea plimbărilor liniștite și a fotografiei.", tags: ["🍁 Liniște", "📷 Ora aurie"], imageAlt: "O potecă de toamnă lângă râul Vit la Aglen, acoperită de frunze căzute, între bolovani de calcar și versanți trecuți în portocaliu și auriu" },
      { icon: "❄️", name: "Iarna", months: "Decembrie – martie", title: "Frumusețe aspră și dramatică", body: "Canionul devine epic. Perfect pentru cei care iubesc minimalismul de iarnă și singurătatea.", tags: ["❄️ Liniște de iarnă"], imageAlt: "Aglen și canionul Vitului sub zăpadă, văzute de sus: chiciură pe copaci, râul parțial înghețat și fum ieșind din hornuri" },
    ],
    weatherTitle: "🌤️ Prognoza și sfatul zilei",
    weatherBody: "Verificați temperaturile actuale la Lukovit și Aglen înainte de plecare. Site-ul nu urmărește vremea — prognoza aparține serviciului meteorologic.",
    weatherCta: "Vezi prognoza meteo",
  },
  tr: {
    title: "🗓️ Mevsiminizi seçin",
    lede: "Dört farklı Aglen. Sizi neyin beklediğini görmek için bir mevsim seçin.",
    seasons: [
      { icon: "🌸", name: "İlkbahar", months: "Nisan – Haziran", title: "Gür yeşillik ve yüksek su", body: "Fotoğraf ve yürüyüş için en iyi zaman. Vit gürül gürül akar, sıcaklıklar sıcak basmadan yürümeye uygundur.", tags: ["📸 Fotoğraf", "🥾 Yürüyüş"], imageAlt: "Aglen'de Vit Nehri kanyonuna ilkbahar manzarası: turkuaz su, taze yeşil yamaçlar, beyaz kireçtaşı kayalıklar ve önde çiçek açmış çalılar" },
      { icon: "☀️", name: "Yaz", months: "Temmuz – Ağustos", title: "Nehir kıyısında serinlik ve gölge", body: "Sıcaktan kaçmak için ideal. Gölgeli kıyılar ve kaya duvarları piknik için doğal bir klima sunar.", tags: ["🌊 Nehir molası", "🧺 Piknik"], imageAlt: "Aglen yakınında Vit kıyısından yaz manzarası: taşlı zemin üzerinde berrak turkuaz su, ağaçların koyu gölgesi ve sağda kireçtaşı duvar" },
      { icon: "🍁", name: "Sonbahar", months: "Eylül – Kasım", title: "Altın tonlar ve sessizlik", body: "Kaya taçları ağaçların ateş rengiyle karşıtlık kurar. Sessiz yürüyüşlerin ve fotoğrafın zamanı.", tags: ["🍁 Huzur", "📷 Altın saat"], imageAlt: "Aglen'de Vit Nehri kıyısında, dökülmüş yapraklarla kaplı sonbahar patikası; kireçtaşı bloklar ve turuncuyla altın rengine dönmüş yamaçlar arasında" },
      { icon: "❄️", name: "Kış", months: "Aralık – Mart", title: "Sert ve dramatik bir güzellik", body: "Kanyon destansı bir hâl alır. Kış sadeliğini ve yalnızlığı sevenler için birebir.", tags: ["❄️ Kış sessizliği"], imageAlt: "Kar altındaki Aglen ve Vit kanyonu, yukarıdan: ağaçlarda kırağı, kısmen donmuş nehir ve bacalardan yükselen duman" },
    ],
    weatherTitle: "🌤️ Bugünün tahmini ve tavsiyesi",
    weatherBody: "Yola çıkmadan önce Lukovit ve Aglen'deki güncel sıcaklıkları kontrol edin. Site havayı takip etmez — tahmin meteoroloji servisinindir.",
    weatherCta: "Hava tahminini aç",
  },
  el: {
    title: "🗓️ Διαλέξτε την εποχή σας",
    lede: "Τέσσερα διαφορετικά Aglen. Διαλέξτε εποχή για να δείτε τι σας περιμένει.",
    seasons: [
      { icon: "🌸", name: "Άνοιξη", months: "Απρίλιος – Ιούνιος", title: "Πυκνό πράσινο και ορμητικό ποτάμι", body: "Η καλύτερη εποχή για φωτογραφία και πεζοπορία. Ο Vit είναι γεμάτος και οι θερμοκρασίες επιτρέπουν περπάτημα χωρίς ζέστη.", tags: ["📸 Φωτογραφία", "🥾 Πεζοπορία"], imageAlt: "Ανοιξιάτικη θέα στο φαράγγι του ποταμού Vit στο Aglen: τιρκουάζ νερό, φρέσκο πράσινο στις πλαγιές, λευκοί ασβεστολιθικοί βράχοι και ανθισμένοι θάμνοι στο πρώτο πλάνο" },
      { icon: "☀️", name: "Καλοκαίρι", months: "Ιούλιος – Αύγουστος", title: "Δροσιά και σκιά στο ποτάμι", body: "Ιδανικό για να ξεφύγετε από τον καύσωνα. Οι σκιερές όχθες και τα βραχώδη τοιχώματα είναι ένα φυσικό κλιματιστικό για πικνίκ.", tags: ["🌊 Χαλάρωση στο ποτάμι", "🧺 Πικνίκ"], imageAlt: "Καλοκαιρινή θέα από την όχθη του Vit κοντά στο Aglen: καθαρό τιρκουάζ νερό πάνω από πετρώδη πυθμένα, πυκνή σκιά από τα δέντρα και ασβεστολιθικό τοίχωμα δεξιά" },
      { icon: "🍁", name: "Φθινόπωρο", months: "Σεπτέμβριος – Νοέμβριος", title: "Χρυσές αποχρώσεις και ησυχία", body: "Τα βραχώδη στέφανα αντιπαρατίθενται στη φωτιά των δέντρων. Εποχή για ήσυχους περιπάτους και φωτογραφία.", tags: ["🍁 Γαλήνη", "📷 Χρυσή ώρα"], imageAlt: "Φθινοπωρινό μονοπάτι δίπλα στον Vit στο Aglen, στρωμένο με πεσμένα φύλλα, ανάμεσα σε ασβεστολιθικούς ογκόλιθους και πλαγιές στο πορτοκαλί και το χρυσό" },
      { icon: "❄️", name: "Χειμώνας", months: "Δεκέμβριος – Μάρτιος", title: "Τραχιά και δραματική ομορφιά", body: "Το φαράγγι γίνεται επικό. Ιδανικό για όσους αγαπούν τον χειμερινό μινιμαλισμό και τη μοναξιά.", tags: ["❄️ Χειμερινή σιωπή"], imageAlt: "Το Aglen και το φαράγγι του Vit κάτω από το χιόνι, από ψηλά: πάχνη στα δέντρα, ποτάμι εν μέρει παγωμένο και καπνός από τις καμινάδες" },
    ],
    weatherTitle: "🌤️ Πρόγνωση και συμβουλή για σήμερα",
    weatherBody: "Ελέγξτε τις τρέχουσες θερμοκρασίες σε Lukovit και Aglen πριν ξεκινήσετε. Ο ιστότοπος δεν παρακολουθεί τον καιρό — η πρόγνωση ανήκει στη μετεωρολογική υπηρεσία.",
    weatherCta: "Δείτε την πρόγνωση καιρού",
  },
  ru: {
    title: "🗓️ Выберите свой сезон",
    lede: "Четыре разных Аглена. Выберите сезон, чтобы увидеть, что вас ждёт.",
    seasons: [
      { icon: "🌸", name: "Весна", months: "Апрель – июнь", title: "Густая зелень и полная вода", body: "Лучшее время для фотографии и походов. Вит полноводен, а температура позволяет идти без жары.", tags: ["📸 Фотография", "🥾 Походы"], imageAlt: "Весенний вид на каньон реки Вит у Аглена: бирюзовая вода, свежая зелень на склонах, белые известняковые скалы и цветущие кусты на переднем плане" },
      { icon: "☀️", name: "Лето", months: "Июль – август", title: "Прохлада и тень у реки", body: "Идеально, чтобы уйти от жары. Тенистые берега и скальные стены работают как естественный кондиционер для пикника.", tags: ["🌊 Отдых у реки", "🧺 Пикник"], imageAlt: "Летний вид с берега Вита рядом с Агленом: прозрачная бирюзовая вода над каменистым дном, густая тень деревьев и известняковая стена справа" },
      { icon: "🍁", name: "Осень", months: "Сентябрь – ноябрь", title: "Золотые оттенки и тишина", body: "Скальные венцы контрастируют с огнём деревьев. Время тихих прогулок и фотографии.", tags: ["🍁 Спокойствие", "📷 Золотой час"], imageAlt: "Осенняя тропа вдоль реки Вит в Аглене, засыпанная опавшими листьями, между известняковыми валунами и склонами в оранжевом и золотом" },
      { icon: "❄️", name: "Зима", months: "Декабрь – март", title: "Суровая и драматичная красота", body: "Каньон становится эпическим. Для тех, кто любит зимний минимализм и уединение.", tags: ["❄️ Зимняя тишина"], imageAlt: "Аглен и каньон Вита под снегом с высоты: иней на деревьях, частично замёрзшая река и дым из печных труб" },
    ],
    weatherTitle: "🌤️ Прогноз и совет на сегодня",
    weatherBody: "Проверьте текущую температуру в Луковите и Аглене перед выездом. Сайт не следит за погодой — прогноз принадлежит метеослужбе.",
    weatherCta: "Открыть прогноз погоды",
  },
  ja: {
    title: "🗓️ 季節を選ぶ",
    lede: "アグレンは季節ごとに別の顔を見せます。季節を選んで、待っているものをご覧ください。",
    seasons: [
      { icon: "🌸", name: "春", months: "4月～6月", title: "深い緑と豊かな水", body: "写真と歩きに最適な季節です。ヴィト川は水量が多く、暑さのない気温で長く歩けます。", tags: ["📸 写真", "🥾 ハイキング"], imageAlt: "アグレンのヴィト川峡谷を見下ろす春の眺め。ターコイズ色の水、芽吹いた斜面の緑、白い石灰岩の岩峰、手前には花をつけた低木" },
      { icon: "☀️", name: "夏", months: "7月～8月", title: "川辺の涼しさと日陰", body: "暑さを逃れるのに最適です。日陰の岸辺と岩壁が、ピクニックのための天然の冷房になります。", tags: ["🌊 川辺で休む", "🧺 ピクニック"], imageAlt: "アグレン近くのヴィト川岸からの夏の眺め。石の川底が透けるターコイズ色の水、木々の濃い日陰、右手に石灰岩の壁" },
      { icon: "🍁", name: "秋", months: "9月～11月", title: "黄金の色合いと静けさ", body: "岩の稜線が木々の燃えるような色と対をなします。静かな散歩と写真の季節です。", tags: ["🍁 静けさ", "📷 ゴールデンアワー"], imageAlt: "アグレンのヴィト川沿い、落ち葉に覆われた秋の小道。石灰岩の岩塊と、橙と金に変わった斜面のあいだを抜ける" },
      { icon: "❄️", name: "冬", months: "12月～3月", title: "荒々しく劇的な美しさ", body: "峡谷は壮大な姿になります。冬のミニマリズムと静寂を好む人に。", tags: ["❄️ 冬の静寂"], imageAlt: "雪に覆われたアグレンとヴィト川峡谷を見下ろす。樹氷、部分的に凍った川、家々の煙突から立ちのぼる煙" },
    ],
    weatherTitle: "🌤️ 今日の予報とひとこと",
    weatherBody: "出発前にルコヴィトとアグレンの現在の気温をご確認ください。当サイトは天候を追跡していません — 予報は気象サービスのものです。",
    weatherCta: "天気予報を開く",
  },
  sr: {
    title: "🗓️ Изаберите своје годишње доба",
    lede: "Четири различита Аглена. Изаберите годишње доба да видите шта вас чека.",
    seasons: [
      { icon: "🌸", name: "Пролеће", months: "Април – јун", title: "Бујно зеленило и висок водостај", body: "Најбоље време за фотографију и пешачење. Вит је пун водом, а температуре су таман за ходање без врућине.", tags: ["📸 Фотографија", "🥾 Пешачење"], imageAlt: "Пролећни поглед на кањон реке Вит код Аглена: тиркизна вода, свеже зеленило на падинама, беле кречњачке стене и процветали жбунови у првом плану" },
      { icon: "☀️", name: "Лето", months: "Јул – август", title: "Хладовина и сенка крај реке", body: "Идеално за бег од врућина. Сеновите обале и стеновити зидови су природни клима-уређај за пикник.", tags: ["🌊 Одмор на реци", "🧺 Пикник"], imageAlt: "Летњи поглед са обале Вита близу Аглена: бистра тиркизна вода над каменитим дном, густа сенка дрвећа и кречњачки зид са десне стране" },
      { icon: "🍁", name: "Јесен", months: "Септембар – новембар", title: "Златни тонови и тишина", body: "Стеновити венци контрастирају ватреној боји дрвећа. Време за тихе шетње и фотографију.", tags: ["🍁 Спокој", "📷 Златни сат"], imageAlt: "Јесења стаза уз реку Вит у Аглену, прекривена опалим лишћем, између кречњачких громада и падина у наранџастом и златном" },
      { icon: "❄️", name: "Зима", months: "Децембар – март", title: "Сурова и драматична лепота", body: "Кањон добија епски изглед. За оне који воле зимски минимализам и осаму.", tags: ["❄️ Зимска тишина"], imageAlt: "Аглен и кањон Вита под снегом, из ваздуха: иње на дрвећу, делимично залеђена река и дим из димњака" },
    ],
    weatherTitle: "🌤️ Прогноза и савет за данас",
    weatherBody: "Проверите тренутне температуре у Луковиту и Аглену пре поласка. Сајт не прати време — прогноза припада метеоролошкој служби.",
    weatherCta: "Погледајте прогнозу времена",
  },
  zh: {
    title: "🗓️ 选择你的季节",
    lede: "四个不同的阿格伦。选一个季节，看看等着你的是什么。",
    seasons: [
      { icon: "🌸", name: "春", months: "四月—六月", title: "浓密的绿意与丰沛的河水", body: "拍照与徒步的最佳时节。维特河水量充沛，气温适合长时间行走而不觉炎热。", tags: ["📸 摄影", "🥾 徒步"], imageAlt: "俯瞰阿格伦维特河峡谷的春景：绿松石色的河水、初绿的山坡、白色石灰岩峭壁，前景是开花的灌木" },
      { icon: "☀️", name: "夏", months: "七月—八月", title: "河畔的清凉与树荫", body: "避暑的好去处。绿荫覆盖的河岸与岩壁，是野餐时的天然空调。", tags: ["🌊 河边休憩", "🧺 野餐"], imageAlt: "阿格伦附近维特河岸边的夏景：清澈的绿松石色河水下可见石底，树木投下浓荫，右侧是石灰岩崖壁" },
      { icon: "🍁", name: "秋", months: "九月—十一月", title: "金色的层次与安静", body: "岩冠与树木的火色相映成趣。适合安静散步与摄影的季节。", tags: ["🍁 静谧", "📷 黄金时刻"], imageAlt: "阿格伦维特河畔铺满落叶的秋日小径，穿行于石灰岩巨石与转为橙金色的山坡之间" },
      { icon: "❄️", name: "冬", months: "十二月—三月", title: "粗粝而壮阔的美", body: "峡谷显出史诗般的气象。适合喜欢冬日极简与独处的人。", tags: ["❄️ 冬日静默"], imageAlt: "俯瞰积雪覆盖的阿格伦与维特河峡谷：树挂雾凇、部分封冻的河面，屋顶烟囱升起炊烟" },
    ],
    weatherTitle: "🌤️ 今日预报与建议",
    weatherBody: "出发前请查看卢科维特与阿格伦的当前气温。本站不追踪天气——预报来自气象服务机构。",
    weatherCta: "查看天气预报",
  },
  hu: {
    title: "🗓️ Válassza ki az évszakát",
    lede: "Négy különböző Aglen. Válasszon évszakot, és nézze meg, mi várja.",
    seasons: [
      { icon: "🌸", name: "Tavasz", months: "Április – június", title: "Dús zöld és magas víz", body: "A legjobb idő a fotózásra és a túrázásra. A Vit bővizű, a hőmérséklet pedig hőség nélküli gyaloglásra való.", tags: ["📸 Fotózás", "🥾 Túrázás"], imageAlt: "Tavaszi kilátás a Vit folyó kanyonjára Aglennél: türkiz víz, frissen kizöldült lejtők, fehér mészkősziklák és virágzó bokrok az előtérben" },
      { icon: "☀️", name: "Nyár", months: "Július – augusztus", title: "Hűvös és árnyék a folyónál", body: "Ideális a hőség elől. Az árnyas partok és a sziklafalak természetes légkondicionálót adnak egy piknikhez.", tags: ["🌊 Pihenés a folyónál", "🧺 Piknik"], imageAlt: "Nyári kilátás a Vit partjáról Aglen közelében: tiszta türkiz víz a köves meder fölött, sűrű árnyék a fák alatt és jobbra egy mészkőfal" },
      { icon: "🍁", name: "Ősz", months: "Szeptember – november", title: "Aranyló árnyalatok és csend", body: "A sziklakoronák a fák tüzes színével feleselnek. A csendes séták és a fotózás ideje.", tags: ["🍁 Nyugalom", "📷 Aranyóra"], imageAlt: "Őszi ösvény a Vit folyó mellett Aglenben, lehullott levelekkel borítva, mészkőtömbök és narancsba-aranyba fordult lejtők között" },
      { icon: "❄️", name: "Tél", months: "December – március", title: "Zord és drámai szépség", body: "A kanyon epikussá válik. Azoknak való, akik szeretik a téli minimalizmust és a magányt.", tags: ["❄️ Téli csend"], imageAlt: "Aglen és a Vit kanyonja hó alatt, felülről: zúzmara a fákon, részben befagyott folyó és füst a kéményekből" },
    ],
    weatherTitle: "🌤️ Mai előrejelzés és tanács",
    weatherBody: "Indulás előtt nézze meg az aktuális hőmérsékletet Lukovitban és Aglenben. Az oldal nem követi az időjárást — az előrejelzés a meteorológiai szolgálaté.",
    weatherCta: "Időjárás-előrejelzés megnyitása",
  },
};


const authoredProse: Partial<Record<LandingPageId, Record<LanguageCode, AuthoredProse>>> = {
  // The seasonal guide. The tabs above answer "what is each season like"; these
  // three cards answer what the tabs cannot — why the valley is not the forecast,
  // how to pick between four good answers, and what goes in the bag either way.
  // Nothing here states a temperature or an elevation: this is UI copy, and a
  // number would be a knowledge-tier claim in a file that carries no sources.
  bestTime: {
    bg: {
      kicker: "🍂 Сезонен пътеводител",
      h1: "Кога да посетиш Ъглен?",
      cta: "Питай за посещение по сезон",
      intro: "Всеки сезон в Ъглен разкрива различна страна от магията на река Вит и каньона. От буйната пролетна зеленина и пълноводните речни вирове до златните есенни отражения върху скалите — открийте кога е най-подходящият момент за вашето перфектно бягство сред природата.",
      headings: [
        "🌡️ Какво да очаквате от времето",
        "🧭 Как да изберете своя сезон",
        "🎒 Какво да носите през годината",
      ],
      bodies: [
        "Долината има свой собствен характер, затова сезонът тук значи повече от цифрата в прогнозата.\nДъното край водата остава по-хладно от откритото поле над него.\nСкалните стени задържат сянка до късен предиобед.\nЕдин и същи ден може да е горещ на пътя и приятен на брега.",
        "Цвят и пълноводие — елате през пролетта.\nБягство от жегата — лятото край реката е по-прохладно от всяко кафене.\nТишина и мека светлина — есента е вашият сезон.\nДраматични кадри и празни пътеки — зимата няма конкуренция.\nНяма грешен сезон, има различни пътувания.",
        "Целогодишно: обувки с грайфер и повече вода, отколкото ви се струва нужна. Речните камъни са хлъзгави във всеки сезон.\nПролет и есен: непромокаемо яке и още един слой за ранната сутрин.\nЛято: шапка, слънцезащита и ранен старт.\nЗима: топли слоеве, ръкавици и проверка на пътя от Луковит — светлината свършва рано.",
      ],
    },
    en: {
      kicker: "🍂 A seasonal guide",
      h1: "When should you visit Aglen?",
      cta: "Ask about a visit by season",
      intro: "Every season in Aglen shows a different side of the River Vit and its canyon. From the deep green of spring and the full river pools to the golden autumn light on the rock — find the right moment for your own escape into the quiet.",
      headings: [
        "🌡️ What to expect from the weather",
        "🧭 How to choose your season",
        "🎒 What to carry through the year",
      ],
      bodies: [
        "The valley has a character of its own, so the season here means more than the number in the forecast.\nThe floor by the water stays cooler than the open field above it.\nThe rock walls hold their shade until late in the morning.\nThe same day can be hot on the road and pleasant on the bank.",
        "Colour and high water — come in spring.\nEscaping the heat — the river in summer is cooler than any café.\nQuiet and soft light — autumn is your season.\nDramatic frames and empty paths — winter has no competition.\nThere is no wrong season, only different trips.",
        "All year: shoes with grip and more water than you think you need. River stone is slippery in every season.\nSpring and autumn: a waterproof layer and something warm for the early morning.\nSummer: a hat, sun cream and an early start.\nWinter: warm layers, gloves and a look at the road from Lukovit — the daylight ends early.",
      ],
    },
    de: {
      kicker: "🍂 Ein Führer durch die Jahreszeiten",
      h1: "Wann sollten Sie Aglen besuchen?",
      cta: "Nach einem Besuch je Jahreszeit fragen",
      intro: "Jede Jahreszeit zeigt in Aglen eine andere Seite des Vit und seines Canyons. Vom satten Grün des Frühlings und den vollen Flussbecken bis zum goldenen Herbstlicht auf dem Fels — finden Sie den richtigen Moment für Ihre eigene Auszeit in der Natur.",
      headings: [
        "🌡️ Was Sie vom Wetter erwarten können",
        "🧭 So wählen Sie Ihre Jahreszeit",
        "🎒 Was Sie durchs Jahr mitnehmen",
      ],
      bodies: [
        "Das Tal hat seinen eigenen Charakter, deshalb bedeutet die Jahreszeit hier mehr als die Zahl in der Vorhersage.\nDie Sohle am Wasser bleibt kühler als das offene Feld darüber.\nDie Felswände halten den Schatten bis in den späten Vormittag.\nDerselbe Tag kann auf der Straße heiß und am Ufer angenehm sein.",
        "Farbe und viel Wasser — kommen Sie im Frühling.\nFlucht vor der Hitze — der Fluss im Sommer ist kühler als jedes Café.\nStille und weiches Licht — der Herbst ist Ihre Jahreszeit.\nDramatische Bilder und leere Wege — im Winter gibt es keine Konkurrenz.\nEs gibt keine falsche Jahreszeit, nur verschiedene Reisen.",
        "Ganzjährig: Schuhe mit Profil und mehr Wasser, als Sie zu brauchen glauben. Flusssteine sind in jeder Jahreszeit rutschig.\nFrühling und Herbst: eine wasserdichte Schicht und etwas Warmes für den frühen Morgen.\nSommer: Hut, Sonnencreme und ein früher Start.\nWinter: warme Schichten, Handschuhe und ein Blick auf die Straße von Lukovit — das Tageslicht endet früh.",
      ],
    },
    fr: {
      kicker: "🍂 Un guide des saisons",
      h1: "Quand visiter Aglen ?",
      cta: "Demander une visite selon la saison",
      intro: "Chaque saison révèle à Aglen une autre face de la Vit et de son canyon. De la verdure dense du printemps et des vasques pleines aux reflets dorés de l'automne sur la roche — trouvez le moment juste pour votre échappée au calme.",
      headings: [
        "🌡️ Ce qu'il faut attendre de la météo",
        "🧭 Comment choisir votre saison",
        "🎒 Quoi emporter au fil de l'année",
      ],
      bodies: [
        "La vallée a son caractère propre, et la saison compte ici plus que le chiffre des prévisions.\nLe fond, au bord de l'eau, reste plus frais que le plateau ouvert au-dessus.\nLes parois gardent l'ombre jusqu'en fin de matinée.\nLa même journée peut être chaude sur la route et agréable sur la berge.",
        "La couleur et les hautes eaux — venez au printemps.\nFuir la chaleur — en été, la rivière est plus fraîche que n'importe quel café.\nLe calme et la lumière douce — l'automne est votre saison.\nDes images fortes et des sentiers vides — l'hiver est sans concurrence.\nIl n'y a pas de mauvaise saison, seulement des voyages différents.",
        "Toute l'année : des chaussures qui accrochent et plus d'eau que vous ne le pensez. Les galets sont glissants en toute saison.\nPrintemps et automne : une couche imperméable et de quoi se couvrir au petit matin.\nÉté : chapeau, crème solaire et départ tôt.\nHiver : des couches chaudes, des gants et un coup d'œil à la route depuis Lukovit — le jour tombe vite.",
      ],
    },
    es: {
      kicker: "🍂 Una guía de las estaciones",
      h1: "¿Cuándo visitar Aglen?",
      cta: "Preguntar por una visita según la estación",
      intro: "Cada estación muestra en Aglen una cara distinta del río Vit y su cañón. Del verde intenso de la primavera y las pozas llenas a los reflejos dorados del otoño sobre la roca: encuentre el momento justo para su escapada tranquila.",
      headings: [
        "🌡️ Qué esperar del tiempo",
        "🧭 Cómo elegir su estación",
        "🎒 Qué llevar a lo largo del año",
      ],
      bodies: [
        "El valle tiene un carácter propio, y por eso aquí la estación dice más que la cifra del pronóstico.\nEl fondo, junto al agua, se mantiene más fresco que el campo abierto de arriba.\nLas paredes de roca guardan la sombra hasta bien entrada la mañana.\nEl mismo día puede ser caluroso en la carretera y agradable en la orilla.",
        "Color y río crecido: venga en primavera.\nHuir del calor: en verano el río es más fresco que cualquier café.\nSilencio y luz suave: el otoño es su estación.\nImágenes dramáticas y senderos vacíos: el invierno no tiene rival.\nNo hay una estación equivocada, solo viajes distintos.",
        "Todo el año: calzado con agarre y más agua de la que cree necesitar. El canto rodado resbala en cualquier estación.\nPrimavera y otoño: una capa impermeable y algo de abrigo para primera hora.\nVerano: gorra, protección solar y salida temprana.\nInvierno: capas de abrigo, guantes y una mirada a la carretera desde Lukovit, porque la luz se acaba pronto.",
      ],
    },
    it: {
      kicker: "🍂 Una guida alle stagioni",
      h1: "Quando visitare Aglen?",
      cta: "Chiedere di una visita per stagione",
      intro: "Ogni stagione ad Aglen mostra un lato diverso del fiume Vit e del suo canyon. Dal verde folto della primavera e dalle pozze piene ai riflessi dorati dell'autunno sulla roccia: trovate il momento giusto per la vostra fuga nel silenzio.",
      headings: [
        "🌡️ Che tempo aspettarsi",
        "🧭 Come scegliere la stagione",
        "🎒 Che cosa portare durante l'anno",
      ],
      bodies: [
        "La valle ha un carattere proprio, e per questo qui la stagione conta più del numero nelle previsioni.\nIl fondovalle, vicino all'acqua, resta più fresco del campo aperto sopra.\nLe pareti di roccia trattengono l'ombra fino a tarda mattina.\nLo stesso giorno può essere caldo sulla strada e piacevole sulla riva.",
        "Colore e fiume in piena: venite in primavera.\nSfuggire alla calura: d'estate il fiume è più fresco di qualsiasi caffè.\nQuiete e luce morbida: l'autunno è la vostra stagione.\nImmagini drammatiche e sentieri vuoti: l'inverno non ha rivali.\nNon esiste una stagione sbagliata, solo viaggi diversi.",
        "Tutto l'anno: scarpe con buona presa e più acqua di quanta pensiate di berne. I sassi del fiume scivolano in ogni stagione.\nPrimavera e autunno: uno strato impermeabile e qualcosa di caldo per la mattina presto.\nEstate: cappello, protezione solare e partenza presto.\nInverno: strati caldi, guanti e un controllo della strada da Lukovit, perché la luce finisce presto.",
      ],
    },
    ro: {
      kicker: "🍂 Un ghid al anotimpurilor",
      h1: "Când să vizitați Aglen?",
      cta: "Întreabă despre o vizită în funcție de anotimp",
      intro: "Fiecare anotimp arată la Aglen o altă față a râului Vit și a canionului. De la verdele bogat al primăverii și bulboanele pline până la reflexele aurii ale toamnei pe stâncă — găsiți momentul potrivit pentru evadarea dumneavoastră în liniște.",
      headings: [
        "🌡️ La ce vreme să vă așteptați",
        "🧭 Cum să vă alegeți anotimpul",
        "🎒 Ce să luați cu voi de-a lungul anului",
      ],
      bodies: [
        "Valea are un caracter al ei, iar de aceea anotimpul spune aici mai mult decât cifra din prognoză.\nFundul văii, lângă apă, rămâne mai răcoros decât câmpul deschis de deasupra.\nPereții de stâncă țin umbra până târziu dimineața.\nAceeași zi poate fi caldă pe drum și plăcută pe mal.",
        "Culoare și apă mare: veniți primăvara.\nScăpare de caniculă: vara râul e mai răcoros decât orice cafenea.\nLiniște și lumină blândă: toamna e anotimpul vostru.\nCadre dramatice și poteci goale: iarna nu are concurență.\nNu există anotimp greșit, doar călătorii diferite.",
        "Tot anul: încălțăminte cu aderență și mai multă apă decât credeți că vă trebuie. Pietrele de râu alunecă în orice anotimp.\nPrimăvara și toamna: un strat impermeabil și ceva călduros pentru dimineața devreme.\nVara: pălărie, protecție solară și plecare devreme.\nIarna: straturi calde, mănuși și o verificare a drumului dinspre Lukovit, pentru că lumina zilei se termină repede.",
      ],
    },
    tr: {
      kicker: "🍂 Mevsimler rehberi",
      h1: "Aglen'i ne zaman ziyaret etmeli?",
      cta: "Mevsime göre ziyaret için sorun",
      intro: "Aglen'de her mevsim, Vit Nehri'nin ve kanyonun başka bir yüzünü gösterir. İlkbaharın gür yeşilinden ve dolu nehir havuzlarından, sonbaharın kayalara vuran altın yansımalarına kadar — doğaya kaçışınız için doğru anı bulun.",
      headings: [
        "🌡️ Havadan ne beklemeli",
        "🧭 Mevsiminizi nasıl seçersiniz",
        "🎒 Yıl boyunca yanınıza ne almalı",
      ],
      bodies: [
        "Vadinin kendine ait bir karakteri var; bu yüzden mevsim burada tahmindeki sayıdan fazlasını anlatır.\nSuyun kenarındaki taban, yukarıdaki açık araziden serin kalır.\nKaya duvarları gölgeyi öğleye yakın saatlere kadar tutar.\nAynı gün yolda sıcak, kıyıda ise serin olabilir.",
        "Renk ve bol su: ilkbaharda gelin.\nSıcaktan kaçış: yazın nehir her kafeden serindir.\nSessizlik ve yumuşak ışık: mevsiminiz sonbahar.\nDramatik kareler ve boş patikalar: kışın rakibi yok.\nYanlış mevsim yoktur, yalnızca farklı yolculuklar vardır.",
        "Yıl boyunca: tutuşu iyi ayakkabılar ve sandığınızdan fazla su. Nehir taşları her mevsim kaygandır.\nİlkbahar ve sonbahar: su geçirmez bir kat ve sabahın erken saatleri için kalın bir şey.\nYaz: şapka, güneş kremi ve erken çıkış.\nKış: kalın katmanlar, eldiven ve Lukovit'ten gelen yolun durumuna bir bakış — gün ışığı erken biter.",
      ],
    },
    el: {
      kicker: "🍂 Ένας οδηγός των εποχών",
      h1: "Πότε να επισκεφθείτε το Aglen;",
      cta: "Ρωτήστε για επίσκεψη ανά εποχή",
      intro: "Κάθε εποχή δείχνει στο Aglen μια άλλη πλευρά του ποταμού Vit και του φαραγγιού. Από το πυκνό πράσινο της άνοιξης και τις γεμάτες γούρνες μέχρι τις χρυσές αντανακλάσεις του φθινοπώρου στον βράχο — βρείτε τη σωστή στιγμή για τη δική σας απόδραση στην ησυχία.",
      headings: [
        "🌡️ Τι να περιμένετε από τον καιρό",
        "🧭 Πώς να διαλέξετε εποχή",
        "🎒 Τι να έχετε μαζί σας όλο τον χρόνο",
      ],
      bodies: [
        "Η κοιλάδα έχει τον δικό της χαρακτήρα, γι' αυτό η εποχή εδώ λέει περισσότερα από τον αριθμό της πρόγνωσης.\nΟ πάτος, δίπλα στο νερό, μένει πιο δροσερός από το ανοιχτό χωράφι από πάνω.\nΤα βραχώδη τοιχώματα κρατούν τη σκιά ως αργά το πρωί.\nΗ ίδια μέρα μπορεί να είναι ζεστή στον δρόμο και ευχάριστη στην όχθη.",
        "Χρώμα και ορμητικό νερό: ελάτε την άνοιξη.\nΔιαφυγή από τη ζέστη: το καλοκαίρι το ποτάμι είναι πιο δροσερό από κάθε καφενείο.\nΗσυχία και απαλό φως: η εποχή σας είναι το φθινόπωρο.\nΔραματικά καρέ και άδεια μονοπάτια: ο χειμώνας δεν έχει ανταγωνισμό.\nΔεν υπάρχει λάθος εποχή, μόνο διαφορετικά ταξίδια.",
        "Όλο τον χρόνο: παπούτσια με καλό πάτημα και περισσότερο νερό απ' όσο νομίζετε. Οι πέτρες του ποταμού γλιστρούν σε κάθε εποχή.\nΆνοιξη και φθινόπωρο: ένα αδιάβροχο στρώμα και κάτι ζεστό για νωρίς το πρωί.\nΚαλοκαίρι: καπέλο, αντηλιακό και πρωινή εκκίνηση.\nΧειμώνας: ζεστά στρώματα, γάντια και έλεγχος του δρόμου από το Lukovit, γιατί το φως τελειώνει νωρίς.",
      ],
    },
    ru: {
      kicker: "🍂 Путеводитель по сезонам",
      h1: "Когда приехать в Аглен?",
      cta: "Спросить о поездке по сезону",
      intro: "Каждый сезон открывает в Аглене другую сторону реки Вит и её каньона. От густой весенней зелени и полных речных омутов до золотых осенних отражений на скалах — найдите свой момент для тихого побега на природу.",
      headings: [
        "🌡️ Чего ждать от погоды",
        "🧭 Как выбрать свой сезон",
        "🎒 Что брать с собой в течение года",
      ],
      bodies: [
        "У долины свой характер, поэтому сезон здесь значит больше, чем цифра в прогнозе.\nДно у воды остаётся прохладнее открытого поля наверху.\nСкальные стены держат тень до позднего утра.\nОдин и тот же день может быть жарким на дороге и приятным на берегу.",
        "Цвет и полная вода: приезжайте весной.\nСпасение от жары: летом у реки прохладнее, чем в любом кафе.\nТишина и мягкий свет: ваш сезон — осень.\nДраматичные кадры и пустые тропы: зимой у вас не будет конкурентов.\nНеправильного сезона нет, есть разные поездки.",
        "Круглый год: обувь с хорошим протектором и больше воды, чем кажется нужным. Речные камни скользкие в любой сезон.\nВесна и осень: непромокаемый слой и что-то тёплое на раннее утро.\nЛето: шляпа, солнцезащита и ранний выход.\nЗима: тёплые слои, перчатки и проверка дороги от Луковита — светлое время заканчивается рано.",
      ],
    },
    ja: {
      kicker: "🍂 季節のガイド",
      h1: "アグレンを訪れるなら、いつ？",
      cta: "季節に合わせた訪問について問い合わせる",
      intro: "アグレンでは季節ごとにヴィト川と峡谷が別の表情を見せます。春の深い緑と水をたたえた淵から、秋に岩肌を照らす黄金の反射まで — 静かな自然への、あなたにとって最良の逃避の時を見つけてください。",
      headings: [
        "🌡️ 天気について知っておくこと",
        "🧭 季節の選び方",
        "🎒 一年を通じて持っていくもの",
      ],
      bodies: [
        "谷には谷の性格があり、だからこそここでは季節が予報の数字以上の意味を持ちます。\n水辺の谷底は、上の開けた野原より涼しく保たれます。\n岩壁は午前の遅い時間まで日陰を保ちます。\n同じ日でも、道の上は暑く川岸は快適ということが起こります。",
        "色と水を求めるなら春。\n暑さを避けたいなら夏 — 川辺はどんなカフェよりも涼しい場所です。\n静けさと柔らかい光を求めるなら秋。\n劇的な絵と誰もいない道を選ぶなら冬。\n間違った季節はなく、違う旅があるだけです。",
        "通年：滑りにくい靴と、必要と思う以上の水。川の石はどの季節でも滑ります。\n春と秋：防水の一枚と、早朝用の暖かいもの。\n夏：帽子、日焼け止め、早めの出発。\n冬：重ね着、手袋、そしてルコヴィトからの道路状況の確認 — 日暮れが早いためです。",
      ],
    },
    sr: {
      kicker: "🍂 Водич кроз годишња доба",
      h1: "Када посетити Аглен?",
      cta: "Питај за посету по годишњем добу",
      intro: "Свако годишње доба открива у Аглену другу страну реке Вит и кањона. Од бујног пролећног зеленила и пуних речних вирова до златних јесењих одсјаја на стенама — пронађите прави тренутак за свој тихи бег у природу.",
      headings: [
        "🌡️ Шта очекивати од времена",
        "🧭 Како изабрати своје годишње доба",
        "🎒 Шта носити током године",
      ],
      bodies: [
        "Долина има свој карактер, и зато овде годишње доба значи више од броја у прогнози.\nДно поред воде остаје хладније од отвореног поља изнад.\nСтеновити зидови држе сенку до касног преподнева.\nИсти дан може бити врућ на путу и пријатан на обали.",
        "Боја и висок водостај: дођите у пролеће.\nБег од врућине: лети је река хладнија од сваког кафића.\nТишина и меко светло: ваша сезона је јесен.\nДраматични кадрови и празне стазе: зима нема конкуренцију.\nПогрешног годишњег доба нема, постоје само различита путовања.",
        "Целе године: обућа која добро пријања и више воде него што мислите да вам треба. Речно камење клизи у свако доба.\nПролеће и јесен: непромочиви слој и нешто топло за рано јутро.\nЛето: шешир, заштита од сунца и ран полазак.\nЗима: топли слојеви, рукавице и провера пута из Луковита — дневно светло брзо нестаје.",
      ],
    },
    zh: {
      kicker: "🍂 一份四季指南",
      h1: "什么时候来阿格伦？",
      cta: "按季节咨询行程",
      intro: "在阿格伦，每个季节都展现维特河与峡谷的另一面。从春天浓密的绿意和涨满的河潭，到秋天洒在岩壁上的金色反光——找到属于你的那个安静出逃的时刻。",
      headings: [
        "🌡️ 天气会是什么样",
        "🧭 如何挑选你的季节",
        "🎒 全年该带些什么",
      ],
      bodies: [
        "河谷有自己的性格，所以在这里，季节比预报上的数字说得更多。\n靠水的谷底比上方开阔的田野凉爽。\n岩壁把阴影留到上午很晚。\n同一天里，路上可能酷热，河岸却很舒服。",
        "想要色彩与丰沛的河水：春天来。\n想躲开暑气：夏天的河边比任何一间咖啡馆都凉快。\n想要安静与柔和的光线：秋天是你的季节。\n偏爱戏剧性的画面和空无一人的小径：冬天无可匹敌。\n这里没有错的季节，只有不同的旅程。",
        "全年：防滑的鞋，以及比你以为需要的更多的水。河石在任何季节都很滑。\n春秋：一件防水外层，加一件清晨保暖的衣物。\n夏天：帽子、防晒和早点出发。\n冬天：多层保暖、手套，并查看从卢科维特过来的路况——天黑得很早。",
      ],
    },
    hu: {
      kicker: "🍂 Évszakos kalauz",
      h1: "Mikor érdemes Aglenbe menni?",
      cta: "Kérdezz évszak szerinti látogatásról",
      intro: "Aglenben minden évszak a Vit folyó és a kanyon más arcát mutatja. A tavasz dús zöldjétől és a teli folyómedencéktől az ősz aranyló visszfényéig a sziklán — találja meg a maga pillanatát a csendbe való kiszakadásra.",
      headings: [
        "🌡️ Mire számítson az időjárástól",
        "🧭 Hogyan válassza ki az évszakot",
        "🎒 Mit vigyen magával az év során",
      ],
      bodies: [
        "A völgynek saját jellege van, ezért itt az évszak többet jelent az előrejelzés számánál.\nA víz melletti völgytalp hűvösebb marad, mint a fölötte nyíló mező.\nA sziklafalak késő délelőttig tartják az árnyékot.\nUgyanaz a nap lehet forró az úton és kellemes a parton.",
        "Szín és bővizű folyó: jöjjön tavasszal.\nMenekülés a hőség elől: nyáron a folyó hűvösebb bármelyik kávézónál.\nCsend és lágy fény: az ősz a maga évszaka.\nDrámai képek és üres ösvények: a télnek nincs versenytársa.\nNincs rossz évszak, csak különböző utazások vannak.",
        "Egész évben: jó tapadású cipő és több víz, mint amennyit szükségesnek gondol. A folyami kő minden évszakban csúszik.\nTavasszal és ősszel: egy vízálló réteg és valami meleg a kora reggelre.\nNyáron: kalap, fényvédő és korai indulás.\nTélen: meleg rétegek, kesztyű és egy pillantás a Lukovit felőli út állapotára — a nappali fény korán elfogy.",
      ],
    },
  },
  familyTrip: {
    bg: {
      kicker: "👨‍👩‍👧‍👦 Пътеводител за родители и деца",
      h1: "Семейно приключение в Ъглен",
      cta: "Питай за семейно посещение",
      intro: "Превърнете уикенда в незабравим спомен за цялото семейство. Ъглен предлага комбинацията от безопасни пътеки, прохладни речни брегове за пикник и природни чудеса, които будят любопитството на малките откриватели — без излишна умора и сложни преходи.",
      headings: [
        "👨‍👩‍👧‍👦 За кои семейства е подходящо?",
        "🎒 Как да планирате деня?",
        "🍦 Какво да съчетаете наблизо за децата?",
      ],
      bodies: [
        "Пътеводителят е за родители с деца от всички възрасти. Маршрутите покрай река Вит са равни, сенчести и пълни с безопасни места за тичане, игра и събиране на речни камъчета. Скалните ръбове над долината са друго нещо и не влизат в семейния ден — те са необезопасени и се гледат отдалеч.",
        "Подготовка: проверете прогнозата и изберете слънчев, умерен ден. Екипировка: вода и обувки, които могат да се мокрят край брега. Темпо: движете се с ритъма на децата и смятайте разходката за игра и откривателство, а не за преход.",
        "Допълнете деня с пещерата „Проходна“ — широка, светла и с лесен достъп, разходка в геопарка „Искър-Панега“ по дървените мостчета, или хапване в семейните заведения около Луковит.",
      ],
    },
    en: {
      kicker: "👨‍👩‍👧‍👦 A guide for parents and children",
      h1: "A family adventure in Aglen",
      cta: "Ask about a family visit",
      intro: "Turn the weekend into something the whole family remembers. Aglen offers safe paths, cool riverbanks for a picnic and natural wonders that wake up a small explorer's curiosity — without the tiredness and the difficult stretches.",
      headings: [
        "👨‍👩‍👧‍👦 Which families is it for?",
        "🎒 How to plan the day",
        "🍦 What to combine nearby for the children",
      ],
      bodies: [
        "This guide is for parents with children of any age. The paths along the River Vit are level, shaded and full of safe places to run, play and collect river pebbles. The cliff edges above the valley are another matter and are not part of a family day — they have no barriers and are best seen from a distance.",
        "Preparation: check the forecast and pick a sunny, mild day. Kit: water, and shoes that can get wet at the water's edge. Pace: go at the children's speed and treat the walk as play and discovery rather than as a hike.",
        "Add Prohodna cave — wide, light and easy to get into — a walk through the Iskar-Panega geopark on its wooden boardwalks, or a meal at one of the family places around Lukovit.",
      ],
    },
    de: {
      kicker: "👨‍👩‍👧‍👦 Ein Führer für Eltern und Kinder",
      h1: "Familienabenteuer in Aglen",
      cta: "Nach einem Familienbesuch fragen",
      intro: "Machen Sie aus dem Wochenende eine Erinnerung für die ganze Familie. Aglen bietet sichere Pfade, kühle Flussufer für ein Picknick und Naturwunder, die die Neugier kleiner Entdecker wecken — ohne unnötige Anstrengung und schwierige Passagen.",
      headings: [
        "👨‍👩‍👧‍👦 Für welche Familien ist das?",
        "🎒 So planen Sie den Tag",
        "🍦 Was Sie für die Kinder in der Nähe verbinden",
      ],
      bodies: [
        "Dieser Führer ist für Eltern mit Kindern jeden Alters. Die Wege am Fluss Vit sind eben, schattig und voller sicherer Stellen zum Rennen, Spielen und Kieselsammeln. Die Felskanten über dem Tal sind etwas anderes und gehören nicht zu einem Familientag — sie sind ungesichert und werden aus der Ferne betrachtet.",
        "Vorbereitung: Wetter prüfen und einen sonnigen, milden Tag wählen. Ausrüstung: Wasser und Schuhe, die am Ufer nass werden dürfen. Tempo: im Rhythmus der Kinder gehen und den Weg als Spiel und Entdeckung verstehen, nicht als Wanderung.",
        "Ergänzen Sie den Tag mit der Höhle Prohodna — weit, hell und leicht zugänglich —, einem Spaziergang im Geopark Iskar-Panega auf seinen Holzstegen oder einem Essen in einem der Familienlokale um Lukovit.",
      ],
    },
    fr: {
      kicker: "👨‍👩‍👧‍👦 Un guide pour parents et enfants",
      h1: "Une aventure en famille à Aglen",
      cta: "Demander une visite en famille",
      intro: "Faites du week-end un souvenir pour toute la famille. Aglen offre des sentiers sûrs, des berges fraîches pour pique-niquer et des merveilles naturelles qui éveillent la curiosité des petits explorateurs — sans fatigue inutile ni passages difficiles.",
      headings: [
        "👨‍👩‍👧‍👦 À quelles familles s'adresse-t-il ?",
        "🎒 Comment organiser la journée",
        "🍦 Que combiner à proximité pour les enfants",
      ],
      bodies: [
        "Ce guide s'adresse aux parents avec des enfants de tout âge. Les sentiers le long de la Vit sont plats, ombragés et pleins d'endroits sûrs pour courir, jouer et ramasser des galets. Les corniches au-dessus de la vallée sont autre chose et ne font pas partie d'une journée en famille : elles ne sont pas protégées et se regardent de loin.",
        "Préparation : consultez la météo et choisissez une journée ensoleillée et douce. Équipement : de l'eau et des chaussures qui peuvent être mouillées au bord de l'eau. Rythme : avancez au pas des enfants et considérez la promenade comme un jeu et une découverte, pas comme une randonnée.",
        "Complétez la journée par la grotte Prohodna — vaste, lumineuse et d'accès facile —, une promenade dans le géoparc Iskar-Panega sur ses passerelles en bois, ou un repas dans l'un des établissements familiaux autour de Lukovit.",
      ],
    },
    es: {
      kicker: "👨‍👩‍👧‍👦 Una guía para padres e hijos",
      h1: "Aventura familiar en Aglen",
      cta: "Preguntar por una visita en familia",
      intro: "Convierta el fin de semana en un recuerdo para toda la familia. Aglen ofrece senderos seguros, riberas frescas para un picnic y maravillas naturales que despiertan la curiosidad de los pequeños exploradores, sin cansancio innecesario ni tramos difíciles.",
      headings: [
        "👨‍👩‍👧‍👦 ¿Para qué familias es?",
        "🎒 Cómo organizar el día",
        "🍦 Qué combinar cerca para los niños",
      ],
      bodies: [
        "Esta guía es para padres con hijos de cualquier edad. Los senderos junto al río Vit son llanos, sombreados y llenos de sitios seguros para correr, jugar y recoger cantos rodados. Los cortados sobre el valle son otra cosa y no forman parte de un día en familia: no tienen protección y se miran de lejos.",
        "Preparación: consulte el pronóstico y elija un día soleado y templado. Equipo: agua y calzado que pueda mojarse en la orilla. Ritmo: vaya al paso de los niños y entienda el paseo como juego y descubrimiento, no como una caminata.",
        "Complete el día con la cueva Prohodna —amplia, luminosa y de acceso fácil—, un paseo por el geoparque Iskar-Panega sobre sus pasarelas de madera, o una comida en alguno de los sitios familiares en torno a Lukovit.",
      ],
    },
    it: {
      kicker: "👨‍👩‍👧‍👦 Una guida per genitori e bambini",
      h1: "Avventura in famiglia ad Aglen",
      cta: "Chiedere di una visita in famiglia",
      intro: "Trasformate il fine settimana in un ricordo per tutta la famiglia. Aglen offre sentieri sicuri, rive fresche per un picnic e meraviglie naturali che risvegliano la curiosità dei piccoli esploratori, senza fatica inutile e senza tratti difficili.",
      headings: [
        "👨‍👩‍👧‍👦 A quali famiglie si rivolge?",
        "🎒 Come organizzare la giornata",
        "🍦 Che cosa abbinare nei dintorni per i bambini",
      ],
      bodies: [
        "Questa guida è per genitori con bambini di ogni età. I sentieri lungo il fiume Vit sono pianeggianti, ombrosi e pieni di posti sicuri per correre, giocare e raccogliere sassolini. Le pareti sopra la valle sono un'altra cosa e non fanno parte di una giornata in famiglia: non hanno protezioni e si guardano da lontano.",
        "Preparazione: controllate le previsioni e scegliete una giornata soleggiata e mite. Attrezzatura: acqua e scarpe che possono bagnarsi in riva. Ritmo: andate al passo dei bambini e considerate la passeggiata un gioco e una scoperta, non un'escursione.",
        "Completate la giornata con la grotta Prohodna — ampia, luminosa e di accesso facile —, una passeggiata nel geoparco Iskar-Panega sulle sue passerelle di legno, o un pasto in uno dei locali familiari intorno a Lukovit.",
      ],
    },
    ro: {
      kicker: "👨‍👩‍👧‍👦 Un ghid pentru părinți și copii",
      h1: "Aventură în familie la Aglen",
      cta: "Întreabă despre o vizită în familie",
      intro: "Transformați weekendul într-o amintire pentru toată familia. Aglen oferă poteci sigure, maluri răcoroase pentru picnic și minuni naturale care trezesc curiozitatea micilor exploratori — fără oboseală inutilă și fără porțiuni dificile.",
      headings: [
        "👨‍👩‍👧‍👦 Pentru ce familii este?",
        "🎒 Cum să vă organizați ziua",
        "🍦 Ce să combinați în apropiere pentru copii",
      ],
      bodies: [
        "Ghidul este pentru părinți cu copii de orice vârstă. Potecile de pe malul râului Vit sunt drepte, umbrite și pline de locuri sigure pentru alergat, joacă și adunat pietricele. Marginile de stâncă de deasupra văii sunt altceva și nu fac parte dintr-o zi în familie: nu sunt asigurate și se privesc de la distanță.",
        "Pregătire: verificați prognoza și alegeți o zi însorită și blândă. Echipament: apă și încălțăminte care se poate uda la mal. Ritm: mergeți în ritmul copiilor și priviți plimbarea ca joacă și descoperire, nu ca drumeție.",
        "Completați ziua cu peștera Prohodna — largă, luminoasă și ușor accesibilă —, o plimbare în geoparcul Iskar-Panega pe podețele de lemn sau o masă la unul dintre localurile de familie din jurul Lukovitului.",
      ],
    },
    tr: {
      kicker: "👨‍👩‍👧‍👦 Anne babalar ve çocuklar için rehber",
      h1: "Aglen'de aile macerası",
      cta: "Ailece ziyaret için sorun",
      intro: "Hafta sonunu tüm ailenin hatırlayacağı bir şeye dönüştürün. Aglen güvenli patikalar, piknik için serin nehir kıyıları ve küçük kâşiflerin merakını uyandıran doğa harikaları sunar — gereksiz yorgunluk ve zor geçişler olmadan.",
      headings: [
        "👨‍👩‍👧‍👦 Hangi aileler için?",
        "🎒 Günü nasıl planlarsınız",
        "🍦 Çocuklar için yakında neleri birleştirebilirsiniz",
      ],
      bodies: [
        "Bu rehber, her yaştan çocuğu olan anne babalar için. Vit Nehri boyunca uzanan patikalar düz, gölgeli ve koşmak, oynamak, çakıl toplamak için güvenli yerlerle dolu. Vadinin üzerindeki kaya kenarları başka bir konu ve aile gününe dahil değil: korkulukları yok, uzaktan seyredilir.",
        "Hazırlık: hava durumuna bakın, güneşli ve ılıman bir gün seçin. Donanım: su ve kıyıda ıslanabilecek ayakkabılar. Tempo: çocukların hızında ilerleyin; yürüyüşü bir tırmanış değil, oyun ve keşif sayın.",
        "Günü Prohodna Mağarası ile tamamlayın — geniş, aydınlık ve girişi kolay —, Iskar-Panega jeoparkında ahşap köprücüklerde bir yürüyüş ya da Lukovit çevresindeki aile işletmelerinde bir yemek.",
      ],
    },
    el: {
      kicker: "👨‍👩‍👧‍👦 Οδηγός για γονείς και παιδιά",
      h1: "Οικογενειακή περιπέτεια στο Άγκλεν",
      cta: "Ρωτήστε για οικογενειακή επίσκεψη",
      intro: "Κάντε το σαββατοκύριακο ανάμνηση για όλη την οικογένεια. Το Άγκλεν προσφέρει ασφαλή μονοπάτια, δροσερές όχθες για πικνίκ και θαύματα της φύσης που ξυπνούν την περιέργεια των μικρών εξερευνητών — χωρίς περιττή κούραση και δύσκολα περάσματα.",
      headings: [
        "👨‍👩‍👧‍👦 Σε ποιες οικογένειες απευθύνεται;",
        "🎒 Πώς να οργανώσετε τη μέρα",
        "🍦 Τι να συνδυάσετε κοντά για τα παιδιά",
      ],
      bodies: [
        "Ο οδηγός είναι για γονείς με παιδιά κάθε ηλικίας. Τα μονοπάτια κατά μήκος του Βιτ είναι επίπεδα, σκιερά και γεμάτα ασφαλή σημεία για τρέξιμο, παιχνίδι και μάζεμα βοτσάλων. Τα βραχώδη χείλη πάνω από την κοιλάδα είναι άλλο πράγμα και δεν ανήκουν σε μια οικογενειακή μέρα: δεν έχουν προστατευτικά και τα βλέπουμε από απόσταση.",
        "Προετοιμασία: δείτε την πρόγνωση και διαλέξτε μια ηλιόλουστη, ήπια μέρα. Εξοπλισμός: νερό και παπούτσια που μπορούν να βραχούν στην όχθη. Ρυθμός: βαδίστε με τον ρυθμό των παιδιών και δείτε τη βόλτα ως παιχνίδι και ανακάλυψη, όχι ως πεζοπορία.",
        "Συμπληρώστε τη μέρα με το σπήλαιο Προχόντνα — ευρύχωρο, φωτεινό και με εύκολη πρόσβαση —, μια βόλτα στο γεωπάρκο Ίσκαρ-Πάνεγκα στα ξύλινα γεφυράκια του, ή ένα γεύμα σε κάποιο οικογενειακό μαγαζί γύρω από το Λούκοβιτ.",
      ],
    },
    ru: {
      kicker: "👨‍👩‍👧‍👦 Путеводитель для родителей и детей",
      h1: "Семейное приключение в Аглене",
      cta: "Спросить о семейной поездке",
      intro: "Превратите выходные в память для всей семьи. Аглен предлагает безопасные тропы, прохладные берега для пикника и природные чудеса, которые будят любопытство маленьких первооткрывателей — без лишней усталости и сложных переходов.",
      headings: [
        "👨‍👩‍👧‍👦 Каким семьям он подойдёт?",
        "🎒 Как спланировать день",
        "🍦 Что соединить поблизости для детей",
      ],
      bodies: [
        "Путеводитель для родителей с детьми любого возраста. Тропы вдоль Вита ровные, тенистые и полны безопасных мест, где можно побегать, поиграть и собирать речную гальку. Скальные обрывы над долиной — другое дело и в семейный день не входят: они не огорожены и на них смотрят издали.",
        "Подготовка: посмотрите прогноз и выберите солнечный, мягкий день. Снаряжение: вода и обувь, которую не жалко намочить у берега. Темп: идите в ритме детей и считайте прогулку игрой и открытием, а не походом.",
        "Дополните день пещерой Проходна — широкой, светлой и с лёгким входом, — прогулкой в геопарке Искыр-Панега по деревянным мосткам или обедом в одном из семейных заведений вокруг Луковита.",
      ],
    },
    ja: {
      kicker: "👨‍👩‍👧‍👦 親と子のためのガイド",
      h1: "アグレンで過ごす家族の一日",
      cta: "家族での訪問について問い合わせる",
      intro: "週末を家族みんなの思い出に変えてください。アグレンには安全な小径、ピクニックに向く涼しい川辺、そして小さな探検家の好奇心を目覚めさせる自然の造形があります——余計な疲れも、難所もなしに。",
      headings: [
        "👨‍👩‍👧‍👦 どんな家族に向くか",
        "🎒 一日の組み立て方",
        "🍦 子ども連れで近くに組み合わせたいもの",
      ],
      bodies: [
        "この案内は、どの年齢の子どもを連れた親にも向いています。ヴィト川沿いの道は平らで日陰が多く、走ったり遊んだり、川の小石を拾ったりできる安全な場所ばかりです。谷の上の岩の縁は別で、家族の一日には含みません——柵がなく、遠くから眺める場所です。",
        "準備——天気予報を見て、晴れて穏やかな日を選んでください。装備——水と、水辺で濡れてもよい靴。ペース——子どもの速さで進み、この道のりを登山ではなく遊びと発見として考えてください。",
        "一日にプロホドナ洞窟を足してみてください。広く、明るく、入りやすい洞窟です。イスカル・パネガ地質公園の木道を歩くのも、ルコヴィト界隈の家族向けの店で食事をするのもよいでしょう。",
      ],
    },
    sr: {
      kicker: "👨‍👩‍👧‍👦 Водич за родитеље и децу",
      h1: "Породична авантура у Аглену",
      cta: "Питај за породичну посету",
      intro: "Претворите викенд у успомену за целу породицу. Аглен нуди безбедне стазе, хладовите обале за пикник и природна чуда која буде радозналост малих истраживача — без непотребног умора и тешких деоница.",
      headings: [
        "👨‍👩‍👧‍👦 Којим породицама одговара?",
        "🎒 Како испланирати дан",
        "🍦 Шта повезати у близини за децу",
      ],
      bodies: [
        "Овај водич је за родитеље с децом свих узраста. Стазе уз реку Вит су равне, сеновите и пуне безбедних места за трчање, игру и скупљање речних облутака. Стеновите ивице изнад долине су друга прича и не улазе у породични дан: необезбеђене су и гледају се издалека.",
        "Припрема: проверите прогнозу и изаберите сунчан, благ дан. Опрема: вода и обућа која сме да се покваси уз обалу. Темпо: идите ритмом деце и схватите шетњу као игру и откривање, а не као поход.",
        "Допуните дан пећином Проходна — широком, светлом и лако приступачном —, шетњом кроз геопарк Искар-Панега по дрвеним мостићима, или оброком у неком од породичних локала око Луковита.",
      ],
    },
    zh: {
      kicker: "👨‍👩‍👧‍👦 写给父母与孩子的指南",
      h1: "阿格伦的家庭之旅",
      cta: "咨询家庭出行",
      intro: "把周末变成全家人的记忆。阿格伦有安全的步道、适合野餐的清凉河岸，以及能唤醒小小探险家好奇心的自然奇观——不必疲于奔命，也没有难走的路段。",
      headings: [
        "👨‍👩‍👧‍👦 适合哪些家庭",
        "🎒 如何安排这一天",
        "🍦 带孩子可在附近串联什么",
      ],
      bodies: [
        "这份指南写给带着任何年龄孩子的父母。维特河沿岸的小路平缓、有树荫，遍布可以奔跑、玩耍、捡河卵石的安全地方。谷上的岩缘是另一回事，不在家庭行程之内：那里没有护栏，远远看看就好。",
        "准备：查看天气预报，挑一个晴朗温和的日子。装备：饮用水，以及在水边可以打湿的鞋。节奏：按孩子的速度走，把这段路当成游戏与发现，而不是徒步。",
        "可以再加上普罗霍德纳洞穴——宽敞、明亮、进出方便；或在伊斯卡尔-帕内加地质公园的木栈道上走一走；也可以在卢科维特周边的家庭餐馆吃顿饭。",
      ],
    },
    hu: {
      kicker: "👨‍👩‍👧‍👦 Kalauz szülőknek és gyerekeknek",
      h1: "Családi kaland Aglenben",
      cta: "Érdeklődés családi látogatásról",
      intro: "Változtassa a hétvégét az egész család emlékévé. Aglen biztonságos ösvényeket, hűvös folyópartokat a piknikhez és olyan természeti csodákat kínál, amelyek felébresztik a kis felfedezők kíváncsiságát — fölösleges fáradság és nehéz szakaszok nélkül.",
      headings: [
        "👨‍👩‍👧‍👦 Mely családoknak való?",
        "🎒 Hogyan tervezze meg a napot",
        "🍦 Mit kapcsoljon össze a közelben a gyerekeknek",
      ],
      bodies: [
        "Ez a kalauz bármilyen korú gyermeket nevelő szülőknek szól. A Vit menti ösvények szintben vannak, árnyékosak, és tele vannak biztonságos helyekkel a futáshoz, játékhoz és a folyami kavicsok gyűjtéséhez. A völgy fölötti sziklaperemek más lapra tartoznak, és nem részei egy családi napnak: nincs korlát, messziről nézzük őket.",
        "Felkészülés: nézze meg az előrejelzést, és válasszon napos, enyhe napot. Felszerelés: víz és olyan cipő, amely a vízparton benedvesedhet. Tempó: haladjon a gyerekek ritmusában, és tekintse a sétát játéknak és felfedezésnek, ne túrának.",
        "Egészítse ki a napot a Prohodna-barlanggal — tágas, világos és könnyen járható —, egy sétával az Iskar-Panega geoparkban a fapallókon, vagy egy ebéddel valamelyik Lukovit környéki családi helyen.",
      ],
    },
  },
  routeMap: {
    bg: {
      kicker: "Интерактивен пътеводител",
      h1: "Маршрутна карта на Ъглен",
      cta: "Питай за воден маршрут",
      intro: "Открийте тайнствените пътеки, скалните феномени и тихите вирове на река Вит. Независимо дали търсите лека следобедна разходка край брега, фотографска точка за залез над каньона или приключение сред дивите карстови арки — изберете своя маршрут и тръгнете по стъпките на природата.",
    },
    en: {
      kicker: "Interactive guide",
      h1: "The Aglen route map",
      cta: "Ask about a guided walk",
      intro: "Find the hidden paths, the rock formations and the quiet pools of the River Vit. Whether you want an easy afternoon walk by the bank, a sunset vantage over the canyon, or an adventure among the wild karst arches — choose your route and follow the footsteps of the country itself.",
    },
    de: {
      kicker: "Interaktiver Führer",
      h1: "Die Routenkarte von Aglen",
      cta: "Nach einer geführten Wanderung fragen",
      intro: "Entdecken Sie die verborgenen Pfade, die Felsformationen und die stillen Gumpen des Flusses Vit. Ob leichter Nachmittagsspaziergang am Ufer, Fotostandpunkt für den Sonnenuntergang über der Schlucht oder Abenteuer zwischen den wilden Karstbögen — wählen Sie Ihre Route und folgen Sie den Spuren der Natur.",
    },
    fr: {
      kicker: "Guide interactif",
      h1: "La carte des itinéraires d'Aglen",
      cta: "Demander une sortie accompagnée",
      intro: "Découvrez les sentiers cachés, les formations rocheuses et les vasques tranquilles de la Vit. Promenade facile en bord de rivière, point de vue au coucher du soleil sur le canyon ou aventure parmi les arches karstiques — choisissez votre itinéraire et suivez les pas de la nature.",
    },
    es: {
      kicker: "Guía interactiva",
      h1: "El mapa de rutas de Aglen",
      cta: "Preguntar por una salida guiada",
      intro: "Descubra los senderos escondidos, las formaciones rocosas y las pozas tranquilas del río Vit. Un paseo fácil junto a la orilla, un mirador para el atardecer sobre el cañón o una aventura entre los arcos kársticos: elija su ruta y siga los pasos de la naturaleza.",
    },
    it: {
      kicker: "Guida interattiva",
      h1: "La mappa dei percorsi di Aglen",
      cta: "Chiedere di un'escursione guidata",
      intro: "Scoprite i sentieri nascosti, le formazioni rocciose e le pozze tranquille del fiume Vit. Una passeggiata facile lungo la riva, un punto panoramico per il tramonto sul canyon o un'avventura tra gli archi carsici: scegliete il vostro percorso e seguite le orme della natura.",
    },
    ro: {
      kicker: "Ghid interactiv",
      h1: "Harta traseelor din Aglen",
      cta: "Întreabă despre un traseu cu ghid",
      intro: "Descoperiți potecile ascunse, formele de stâncă și bulboanele liniștite ale râului Vit. Fie că vreți o plimbare ușoară pe mal, un punct de belvedere pentru apus deasupra canionului sau o aventură printre arcadele carstice — alegeți-vă traseul și mergeți pe urmele naturii.",
    },
    tr: {
      kicker: "Etkileşimli rehber",
      h1: "Aglen rota haritası",
      cta: "Rehberli yürüyüş için sorun",
      intro: "Vit Nehri'nin gizli patikalarını, kaya oluşumlarını ve sakin göletlerini keşfedin. Kıyıda kolay bir öğleden sonra yürüyüşü, kanyon üzerinde gün batımı için bir bakı noktası ya da yabani karst kemerleri arasında bir macera — rotanızı seçin ve doğanın izinden gidin.",
    },
    el: {
      kicker: "Διαδραστικός οδηγός",
      h1: "Ο χάρτης διαδρομών του Άγκλεν",
      cta: "Ρωτήστε για πεζοπορία με οδηγό",
      intro: "Ανακαλύψτε τα κρυφά μονοπάτια, τους βραχώδεις σχηματισμούς και τις ήσυχες γούρνες του ποταμού Βιτ. Είτε ψάχνετε έναν εύκολο απογευματινό περίπατο στην όχθη, ένα σημείο για το ηλιοβασίλεμα πάνω από το φαράγγι ή μια περιπέτεια ανάμεσα στις άγριες καρστικές αψίδες — διαλέξτε τη διαδρομή σας και ακολουθήστε τα βήματα της φύσης.",
    },
    ru: {
      kicker: "Интерактивный путеводитель",
      h1: "Карта маршрутов Аглена",
      cta: "Спросить о походе с проводником",
      intro: "Откройте скрытые тропы, скальные формы и тихие омуты реки Вит. Лёгкая послеобеденная прогулка вдоль берега, точка для съёмки заката над каньоном или приключение среди диких карстовых арок — выберите свой маршрут и идите по следам самой природы.",
    },
    ja: {
      kicker: "対話型ガイド",
      h1: "アグレンのルートマップ",
      cta: "ガイド付きの散策について問い合わせる",
      intro: "ヴィト川の隠れた小径、奇岩、静かな淵を見つけてください。岸辺の気軽な午後の散歩、渓谷に沈む夕日の撮影地点、あるいは荒々しいカルストのアーチをめぐる冒険——自分の道を選び、自然の足跡をたどってください。",
    },
    sr: {
      kicker: "Интерактивни водич",
      h1: "Мапа рута Аглена",
      cta: "Питај за вођени поход",
      intro: "Откријте скривене стазе, стеновите облике и мирне вирове реке Вит. Било да тражите лагану поподневну шетњу уз обалу, тачку за залазак сунца изнад кањона или авантуру међу дивљим крашким луковима — изаберите своју руту и пођите трагом природе.",
    },
    zh: {
      kicker: "互动指南",
      h1: "阿格伦路线地图",
      cta: "咨询向导带路",
      intro: "去发现维特河隐秘的小径、奇特的岩形与静谧的深潭。无论你想要一段河畔轻松的午后漫步、一处俯瞰峡谷的落日机位，还是在野性喀斯特岩拱间的一场冒险——选一条属于你的路线，循着自然的足迹前行。",
    },
    hu: {
      kicker: "Interaktív kalauz",
      h1: "Aglen útvonaltérképe",
      cta: "Érdeklődés vezetett túráról",
      intro: "Fedezze fel a Vit folyó rejtett ösvényeit, sziklaalakzatait és csendes medencéit. Akár könnyű délutáni sétát keres a parton, akár naplementés fotópontot a kanyon fölött, akár kalandot a vad karsztboltívek között — válassza ki az útvonalát, és induljon a természet nyomában.",
    },
  },
  howToGet: {
    bg: {
      h1: "Поеми към Ъглен: Открий пътя",
      intro: "Добре дошли във вашия интерактивен пътеводител към едно от най-потайните и вълшебни кътчета на Предбалкана. Тук приключението започва още от планирането — от избора на транспорт и точната локация на картата до най-красивите пешеходни маршрути покрай каньона на река Вит.",
      headings: [
        "🧭 За кого е това ръководство?",
        "🎒 Как да планираш посещението?",
        "🔗 Какво да свържеш наблизо?",
      ],
      bodies: [
        "Този пътеводител преплита в съвършена симбиоза величествения каньон, скалните феномени, вековната памет и практичните съвети, от които се нуждае всеки съвременен пътешественик. Историята на Ъглен се разгръща пласт по пласт — от първозданното океанско дъно, изваяло днешните варовикови стени, през първите древни заселници по бреговете, до живите легенди и разкази на местните хора. Изберете своето вдъхновение и тръгнете по стъпките на времето.",
        "За да бъде преживяването ви наистина пълноценно и безопасно, обърнете внимание на няколко важни детайла. Подготовка: проверете прогнозата за времето, сезонната проходимост на пътеките и актуалното състояние на маршрутите край реката. Екипировка: заложете на стабилни и удобни обувки за пешеходен туризъм, носете достатъчно питейна вода и слънцезащита. С уважение към природата: пътувайте с отворено сърце и уважение към местната общност, горите и уникалните скални ниши.",
        "Направете своето пътуване още по-вълнуващо! Използвайте вътрешните връзки в сайта, за да съчетаете разходката си в Ъглен с близки живописни маршрути, скалните манастири около Карлуково, уютни къщи за гости и автентични места за хапване в района на Луковит.",
      ],
    },
    en: {
      h1: "Set out for Aglen: find your way",
      intro: "Welcome to your interactive guide to one of the most secretive and enchanting corners of the Fore-Balkan. The adventure starts with the planning — choosing how to travel, finding the exact spot on the map, and picking the finest walks along the canyon of the River Vit.",
      headings: [
        "🧭 Who is this guide for?",
        "🎒 How to plan your visit",
        "🔗 What to combine nearby",
      ],
      bodies: [
        "This guide weaves together the great canyon, the rock formations, centuries of memory and the practical advice every modern traveller needs. The story of Aglen unfolds layer by layer — from the primeval sea floor that shaped today's limestone walls, through the first ancient settlers along the banks, to the living legends and stories of the people who live here. Choose your own inspiration and follow the footsteps of time.",
        "A few details will make the visit both fuller and safer. Preparation: check the forecast, whether the paths are passable this season, and the current state of the routes along the river. Kit: choose sturdy, comfortable walking shoes, and carry enough drinking water and sun protection. Respect: travel with an open heart and with respect for the local community, the woods and the rock shelters that make this place what it is.",
        "Make the journey richer still. Use the links across this site to combine a walk in Aglen with nearby scenic routes, the rock monasteries around Karlukovo, welcoming guest houses and honest places to eat around Lukovit.",
      ],
    },
    de: {
      h1: "Auf nach Aglen: Finden Sie Ihren Weg",
      intro: "Willkommen bei Ihrem interaktiven Reiseführer in einen der verborgensten und zauberhaftesten Winkel des Vorbalkans. Das Abenteuer beginnt schon bei der Planung — bei der Wahl des Verkehrsmittels, dem genauen Punkt auf der Karte und den schönsten Wanderungen entlang der Schlucht des Flusses Vit.",
      headings: [
        "🧭 Für wen ist dieser Führer?",
        "🎒 So planen Sie den Besuch",
        "🔗 Was Sie in der Nähe verbinden",
      ],
      bodies: [
        "Dieser Führer verwebt die mächtige Schlucht, die Felsformationen, jahrhundertealte Erinnerung und die praktischen Hinweise, die jeder heutige Reisende braucht. Die Geschichte von Aglen entfaltet sich Schicht um Schicht — vom urzeitlichen Meeresboden, der die heutigen Kalkwände formte, über die ersten Siedler an den Ufern bis zu den lebendigen Legenden und Erzählungen der Menschen von hier. Wählen Sie Ihre Inspiration und folgen Sie den Spuren der Zeit.",
        "Ein paar Dinge machen den Besuch reicher und sicherer. Vorbereitung: Prüfen Sie die Wettervorhersage, ob die Pfade in dieser Jahreszeit begehbar sind, und den aktuellen Zustand der Wege am Fluss. Ausrüstung: feste, bequeme Wanderschuhe, genug Trinkwasser und Sonnenschutz. Respekt: Reisen Sie mit offenem Herzen und mit Achtung für die Menschen vor Ort, die Wälder und die einzigartigen Felsnischen.",
        "Machen Sie die Reise noch reicher. Nutzen Sie die Verweise auf dieser Seite, um einen Spaziergang in Aglen mit nahen Panoramarouten, den Felsklöstern um Karlukovo, gastfreundlichen Pensionen und ehrlichen Lokalen rund um Lukovit zu verbinden.",
      ],
    },
    fr: {
      h1: "En route vers Aglen : trouvez votre chemin",
      intro: "Bienvenue dans votre guide interactif vers l'un des coins les plus secrets et les plus enchanteurs du Prébalkan. L'aventure commence dès la préparation : choisir son transport, situer le lieu exact sur la carte et repérer les plus belles marches le long du canyon de la Vit.",
      headings: [
        "🧭 À qui s'adresse ce guide ?",
        "🎒 Comment préparer la visite",
        "🔗 Que combiner à proximité",
      ],
      bodies: [
        "Ce guide tisse ensemble le grand canyon, les formations rocheuses, une mémoire séculaire et les conseils pratiques dont a besoin tout voyageur d'aujourd'hui. L'histoire d'Aglen se déploie couche après couche — du fond marin primitif qui a sculpté les parois calcaires actuelles, aux premiers habitants des rives, jusqu'aux légendes vivantes racontées par les gens d'ici. Choisissez votre inspiration et suivez les pas du temps.",
        "Quelques détails rendront la visite plus riche et plus sûre. Préparation : consultez la météo, vérifiez si les sentiers sont praticables en cette saison et l'état actuel des itinéraires le long de la rivière. Équipement : des chaussures de marche solides et confortables, assez d'eau potable et une protection solaire. Respect : voyagez le cœur ouvert et avec égard pour la communauté locale, les forêts et les niches rocheuses uniques.",
        "Enrichissez encore le voyage. Utilisez les liens du site pour associer une promenade à Aglen aux itinéraires panoramiques voisins, aux monastères rupestres autour de Karlukovo, aux maisons d'hôtes accueillantes et aux bonnes tables de la région de Lukovit.",
      ],
    },
    es: {
      h1: "Rumbo a Aglen: encuentre su camino",
      intro: "Bienvenido a su guía interactiva hacia uno de los rincones más secretos y encantadores de los Prebalcanes. La aventura empieza en la planificación: elegir el transporte, situar el punto exacto en el mapa y escoger los paseos más hermosos por el cañón del río Vit.",
      headings: [
        "🧭 ¿Para quién es esta guía?",
        "🎒 Cómo planear la visita",
        "🔗 Qué combinar cerca",
      ],
      bodies: [
        "Esta guía entreteje el gran cañón, las formaciones rocosas, la memoria de siglos y los consejos prácticos que necesita cualquier viajero de hoy. La historia de Aglen se despliega capa a capa — desde el fondo marino primigenio que esculpió las paredes calizas de hoy, pasando por los primeros pobladores de las orillas, hasta las leyendas vivas que cuentan sus habitantes. Elija su inspiración y siga las huellas del tiempo.",
        "Unos pocos detalles harán la visita más plena y más segura. Preparación: consulte el pronóstico, si los senderos son transitables en esta temporada y el estado actual de las rutas junto al río. Equipo: calzado de marcha resistente y cómodo, agua suficiente y protección solar. Respeto: viaje con el corazón abierto y con respeto por la comunidad local, los bosques y los singulares abrigos rocosos.",
        "Haga el viaje aún más rico. Use los enlaces del sitio para combinar un paseo por Aglen con rutas panorámicas cercanas, los monasterios rupestres de Karlukovo, casas de huéspedes acogedoras y lugares auténticos para comer en la zona de Lukovit.",
      ],
    },
    it: {
      h1: "In viaggio verso Aglen: trovate la strada",
      intro: "Benvenuti nella vostra guida interattiva a uno degli angoli più segreti e incantevoli dei Prebalcani. L'avventura comincia dalla preparazione: scegliere il mezzo, trovare il punto esatto sulla mappa e individuare le passeggiate più belle lungo il canyon del fiume Vit.",
      headings: [
        "🧭 A chi si rivolge questa guida?",
        "🎒 Come pianificare la visita",
        "🔗 Che cosa abbinare nei dintorni",
      ],
      bodies: [
        "Questa guida intreccia il grande canyon, le formazioni rocciose, la memoria dei secoli e i consigli pratici di cui ha bisogno ogni viaggiatore di oggi. La storia di Aglen si dispiega strato dopo strato — dal fondale marino primordiale che ha scolpito le odierne pareti calcaree, ai primi abitanti lungo le rive, fino alle leggende vive raccontate dalla gente del posto. Scegliete la vostra ispirazione e seguite le orme del tempo.",
        "Pochi accorgimenti renderanno la visita più piena e più sicura. Preparazione: controllate le previsioni, se i sentieri sono percorribili in questa stagione e lo stato attuale dei percorsi lungo il fiume. Attrezzatura: scarpe da trekking solide e comode, acqua a sufficienza e protezione solare. Rispetto: viaggiate a cuore aperto e con rispetto per la comunità locale, i boschi e le singolari nicchie di roccia.",
        "Rendete il viaggio ancora più ricco. Usate i collegamenti del sito per unire una passeggiata ad Aglen a itinerari panoramici vicini, ai monasteri rupestri intorno a Karlukovo, ad accoglienti case per ospiti e a locali autentici nella zona di Lukovit.",
      ],
    },
    ro: {
      h1: "Pornește spre Aglen: găsește-ți drumul",
      intro: "Bine ați venit în ghidul interactiv către unul dintre cele mai tainice și fermecătoare colțuri ale Prebalcanilor. Aventura începe încă de la planificare: alegerea transportului, punctul exact pe hartă și cele mai frumoase plimbări de-a lungul canionului râului Vit.",
      headings: [
        "🧭 Pentru cine este acest ghid?",
        "🎒 Cum îți planifici vizita",
        "🔗 Ce să combini în apropiere",
      ],
      bodies: [
        "Acest ghid împletește marele canion, formele de stâncă, memoria secolelor și sfaturile practice de care are nevoie orice călător de azi. Povestea Aglenului se desfășoară strat cu strat — de la fundul de mare primordial care a sculptat pereții de calcar de astăzi, la primii locuitori de pe maluri, până la legendele vii povestite de oamenii de aici. Alegeți-vă inspirația și mergeți pe urmele timpului.",
        "Câteva detalii vor face vizita mai bogată și mai sigură. Pregătire: verificați prognoza, dacă potecile sunt practicabile în acest sezon și starea actuală a traseelor de pe malul râului. Echipament: încălțăminte de drumeție solidă și comodă, apă suficientă și protecție solară. Respect: călătoriți cu inima deschisă și cu respect pentru comunitatea locală, păduri și nișele de stâncă unice.",
        "Faceți călătoria și mai bogată. Folosiți legăturile din site pentru a îmbina o plimbare prin Aglen cu trasee panoramice din apropiere, mănăstirile rupestre din jurul Karlukovo, pensiuni primitoare și locuri autentice unde să mâncați în zona Lukovit.",
      ],
    },
    tr: {
      h1: "Aglen'e yola çıkın: yolunuzu bulun",
      intro: "Ön Balkanlar'ın en gizli ve en büyülü köşelerinden birine açılan etkileşimli rehberinize hoş geldiniz. Macera daha planlamayla başlıyor: ulaşımı seçmek, haritada tam noktayı bulmak ve Vit Nehri kanyonu boyunca en güzel yürüyüşleri belirlemek.",
      headings: [
        "🧭 Bu rehber kimin için?",
        "🎒 Ziyareti nasıl planlarsınız",
        "🔗 Yakında neleri birleştirebilirsiniz",
      ],
      bodies: [
        "Bu rehber görkemli kanyonu, kaya oluşumlarını, yüzyılların belleğini ve bugünün gezgininin ihtiyaç duyduğu pratik önerileri bir araya dokur. Aglen'in hikâyesi katman katman açılır — bugünkü kireçtaşı duvarları yontan ilkçağ deniz tabanından, kıyılardaki ilk yerleşimcilere, buranın insanlarının hâlâ anlattığı efsanelere kadar. İlhamınızı seçin ve zamanın izinden gidin.",
        "Birkaç ayrıntı ziyareti hem daha doyurucu hem de daha güvenli kılar. Hazırlık: hava durumunu, patikaların bu mevsimde geçilebilirliğini ve nehir kıyısındaki rotaların güncel durumunu kontrol edin. Donanım: sağlam ve rahat yürüyüş ayakkabıları seçin, yeterli içme suyu ve güneş koruması taşıyın. Saygı: açık bir yürekle ve yerel topluluğa, ormanlara ve eşsiz kaya nişlerine saygıyla yolculuk edin.",
        "Yolculuğu daha da zenginleştirin. Sitedeki bağlantıları kullanarak Aglen'deki bir yürüyüşü yakındaki manzaralı rotalarla, Karlukovo çevresindeki kaya manastırlarıyla, sıcak konukevleriyle ve Lukovit yöresinin özgün yemek mekânlarıyla birleştirin.",
      ],
    },
    el: {
      h1: "Ξεκινήστε για το Άγκλεν: βρείτε τον δρόμο σας",
      intro: "Καλώς ήρθατε στον διαδραστικό οδηγό σας για μια από τις πιο κρυφές και μαγευτικές γωνιές των Προβαλκανίων. Η περιπέτεια ξεκινά από τον σχεδιασμό: την επιλογή μεταφορικού μέσου, το ακριβές σημείο στον χάρτη και τις ωραιότερες διαδρομές κατά μήκος του φαραγγιού του ποταμού Βιτ.",
      headings: [
        "🧭 Για ποιον είναι αυτός ο οδηγός;",
        "🎒 Πώς να σχεδιάσετε την επίσκεψη",
        "🔗 Τι να συνδυάσετε κοντά",
      ],
      bodies: [
        "Ο οδηγός αυτός υφαίνει μαζί το μεγαλειώδες φαράγγι, τους βραχώδεις σχηματισμούς, τη μνήμη των αιώνων και τις πρακτικές συμβουλές που χρειάζεται κάθε σημερινός ταξιδιώτης. Η ιστορία του Άγκλεν ξεδιπλώνεται στρώμα προς στρώμα — από τον αρχέγονο βυθό που λάξευσε τα σημερινά ασβεστολιθικά τοιχώματα, στους πρώτους κατοίκους των όχθεων, ως τους ζωντανούς θρύλους που αφηγούνται οι ντόπιοι. Διαλέξτε την έμπνευσή σας και ακολουθήστε τα βήματα του χρόνου.",
        "Λίγες λεπτομέρειες θα κάνουν την επίσκεψη πληρέστερη και ασφαλέστερη. Προετοιμασία: δείτε την πρόγνωση, αν τα μονοπάτια είναι βατά αυτή την εποχή και την τρέχουσα κατάσταση των διαδρομών κατά μήκος του ποταμού. Εξοπλισμός: στέρεα και άνετα παπούτσια πεζοπορίας, αρκετό πόσιμο νερό και αντηλιακή προστασία. Σεβασμός: ταξιδέψτε με ανοιχτή καρδιά και σεβασμό προς την τοπική κοινότητα, τα δάση και τις μοναδικές βραχώδεις κόγχες.",
        "Κάντε το ταξίδι ακόμη πιο πλούσιο. Χρησιμοποιήστε τους συνδέσμους του ιστότοπου για να συνδυάσετε μια βόλτα στο Άγκλεν με κοντινές πανοραμικές διαδρομές, τα βραχώδη μοναστήρια γύρω από το Καρλούκοβο, φιλόξενους ξενώνες και αυθεντικά μέρη για φαγητό στην περιοχή του Λούκοβιτ.",
      ],
    },
    ru: {
      h1: "В путь до Аглена: найдите свою дорогу",
      intro: "Добро пожаловать в ваш интерактивный путеводитель по одному из самых сокровенных и волшебных уголков Предбалкан. Приключение начинается с планирования: выбрать транспорт, найти точную точку на карте и наметить самые красивые прогулки вдоль каньона реки Вит.",
      headings: [
        "🧭 Для кого этот путеводитель?",
        "🎒 Как спланировать поездку",
        "🔗 Что соединить поблизости",
      ],
      bodies: [
        "Этот путеводитель сплетает воедино величественный каньон, скальные формы, память веков и практические советы, нужные современному путешественнику. История Аглена разворачивается слой за слоем — от древнего морского дна, вырезавшего нынешние известняковые стены, через первых поселенцев на берегах, до живых легенд и рассказов местных жителей. Выберите своё вдохновение и идите по следам времени.",
        "Несколько мелочей сделают поездку и полнее, и безопаснее. Подготовка: посмотрите прогноз, проходимы ли тропы в этот сезон и в каком состоянии маршруты вдоль реки. Снаряжение: крепкая и удобная обувь для ходьбы, достаточно питьевой воды и защита от солнца. Уважение: путешествуйте с открытым сердцем и уважением к местным жителям, лесам и неповторимым скальным нишам.",
        "Сделайте поездку ещё богаче. Пользуйтесь ссылками на сайте, чтобы соединить прогулку по Аглену с ближними живописными маршрутами, скальными монастырями вокруг Карлуково, уютными гостевыми домами и настоящими местами, где вкусно кормят, в районе Луковита.",
      ],
    },
    ja: {
      h1: "アグレンへ——道をみつける",
      intro: "前バルカンでもっとも人知れず、もっとも心惹かれる一角への、対話型の案内へようこそ。冒険は計画から始まります——どう行くかを選び、地図上の正確な場所を確かめ、ヴィト川の渓谷沿いのいちばん美しい道を選ぶところから。",
      headings: [
        "🧭 この案内は誰のためのものか",
        "🎒 訪問の計画の立て方",
        "🔗 近くで組み合わせたいもの",
      ],
      bodies: [
        "この案内は、雄大な渓谷、奇岩、幾世紀もの記憶、そして現代の旅人に必要な実際的な助言を一つに織り上げます。アグレンの物語は層をなして開かれます——今日の石灰岩の壁を削り出した太古の海底から、岸辺に暮らした最初の人々、そして今も語り継がれる土地の伝説まで。心惹かれるものを選び、時の足跡をたどってください。",
        "いくつかの心づもりが、訪れる時間をより豊かに、より安全にします。準備——天気予報、その季節に道が通れるかどうか、川沿いのルートの現在の状態を確かめてください。装備——しっかりした歩きやすい靴、十分な飲み水、日よけを。敬意——地元の人々、森、そしてこの土地ならではの岩陰に敬意を持って旅をしてください。",
        "旅をさらに豊かにしてください。サイト内のリンクをたどれば、アグレンの散策に、近隣の景勝ルート、カルルコヴォ周辺の岩窟修道院、居心地のよいゲストハウス、ルコヴィト界隈の素朴な食事どころを組み合わせられます。",
      ],
    },
    sr: {
      h1: "Крените ка Аглену: пронађите свој пут",
      intro: "Добро дошли у ваш интерактивни водич ка једном од најскривенијих и најчаробнијих кутака Предбалкана. Авантура почиње већ од планирања — од избора превоза и тачне тачке на мапи до најлепших пешачких стаза уз кањон реке Вит.",
      headings: [
        "🧭 Коме је овај водич намењен?",
        "🎒 Како испланирати посету",
        "🔗 Шта повезати у близини",
      ],
      bodies: [
        "Овај водич преплиће величанствени кањон, стеновите облике, памћење векова и практичне савете који су потребни сваком данашњем путнику. Прича Аглена отвара се слој по слој — од прадавног морског дна које је исклесало данашње кречњачке зидове, преко првих становника на обалама, до живих легенди које причају мештани. Изаберите своје надахнуће и пођите трагом времена.",
        "Неколико ситница учиниће посету и пунијом и безбеднијом. Припрема: проверите прогнозу, да ли су стазе проходне у овом годишњем добу и тренутно стање рута уз реку. Опрема: чврста и удобна обућа за ходање, довољно питке воде и заштита од сунца. Поштовање: путујте отвореног срца и с поштовањем према мештанима, шумама и јединственим стеновитим нишама.",
        "Учините путовање још богатијим. Користите везе на сајту да шетњу кроз Аглен спојите с оближњим живописним рутама, стеновитим манастирима око Карлукова, гостољубивим кућама за госте и аутентичним местима за јело у околини Луковита.",
      ],
    },
    zh: {
      h1: "启程前往阿格伦：找到你的路",
      intro: "欢迎来到这份互动指南，走进前巴尔干最幽秘、最迷人的一角。冒险从规划就开始了——选择交通方式，在地图上找到确切位置，挑出维特河谷沿线最美的步道。",
      headings: [
        "🧭 这份指南写给谁",
        "🎒 如何规划你的行程",
        "🔗 附近可以串联什么",
      ],
      bodies: [
        "这份指南将壮阔的峡谷、奇特的岩形、数百年的记忆，与今天的旅人所需要的实用建议编织在一起。阿格伦的故事层层展开——从雕刻出今日石灰岩壁的远古海床，到最早定居河岸的先民，再到当地人至今口耳相传的活的传说。选择属于你的灵感，循着时间的足迹前行。",
        "几个细节会让这趟行程更充实，也更安全。准备：查看天气预报、本季步道是否通行，以及河边路线的当前状况。装备：结实舒适的徒步鞋，足量饮用水与防晒。尊重：怀着开放的心，尊重当地居民、林地，以及这里独有的岩壁凹龛。",
        "让旅程更加丰盛。借助站内的链接，把阿格伦的漫步与邻近的景致路线、卡尔卢科沃一带的岩窟修道院、温馨的家庭旅馆，以及卢科维特周边地道的餐馆串联起来。",
      ],
    },
    hu: {
      h1: "Induljon Aglenbe: találja meg az utat",
      intro: "Üdvözöljük az Előbalkán egyik legrejtettebb és legvarázslatosabb zugába vezető interaktív kalauzában. A kaland már a tervezéssel kezdődik: a közlekedés kiválasztásával, a pontos hely megkeresésével a térképen és a Vit folyó kanyonja menti legszebb séták kiszemelésével.",
      headings: [
        "🧭 Kinek szól ez a kalauz?",
        "🎒 Hogyan tervezze meg a látogatást",
        "🔗 Mit kapcsoljon össze a közelben",
      ],
      bodies: [
        "Ez a kalauz egybeszövi a hatalmas kanyont, a sziklaalakzatokat, az évszázadok emlékezetét és azokat a gyakorlati tanácsokat, amelyekre a mai utazónak szüksége van. Aglen története rétegről rétegre tárul fel — az ősi tengerfenéktől, amely a mai mészkőfalakat formálta, a partok első lakóin át a helyiek máig élő legendáiig. Válassza ki a maga ihletét, és induljon az idő nyomában.",
        "Néhány apróság teljesebbé és biztonságosabbá teszi a látogatást. Felkészülés: nézze meg az időjárás-előrejelzést, hogy az ösvények járhatók-e ebben az évszakban, és milyen a folyó menti útvonalak jelenlegi állapota. Felszerelés: erős, kényelmes túracipő, elegendő ivóvíz és napvédelem. Tisztelet: nyitott szívvel utazzon, tisztelettel a helyi közösség, az erdők és az egyedülálló sziklafülkék iránt.",
        "Tegye még gazdagabbá az utat. Használja az oldal belső hivatkozásait, hogy egy agleni sétát a közeli panorámaútvonalakkal, a Karlukovo környéki sziklakolostorokkal, vendégszerető panziókkal és a Lukovit környéki autentikus étkezőhelyekkel kösse össze.",
      ],
    },
  },
};

function buildLandingPage(lang: LanguageCode, page: LandingPageMaster): LandingPage {
  const copy = contentByLanguage[lang];
  const text = landingText[lang];
  const h1 = pageNames[lang][page.id];
  const category = text.category;
  const location = copy.hero.meta;
  const title = `${h1}${text.titleSeparator}${copy.brand.name}`;
  const metaDescription = `${h1}: ${copy.landmarks.text}`;
  const intro = `${h1} — ${location}. ${copy.hub.text}`;
  // Authored prose keeps the generated section headings, so a page that has been
  // written by hand still sits in the same three-part shape as the other twenty-six.
  const written = authoredProse[page.id]?.[lang];
  const authoredOverride: LandingPageOverride | undefined = written
    ? {
        category: written.kicker,
        h1: written.h1,
        intro: written.intro,
        ctaLabel: written.cta,
        sections: written.bodies?.map((body, index) => ({
          heading: written.headings?.[index] ?? text.sectionHeadings[index],
          body,
        })),
      }
    : undefined;
  const override = guideOverrides[page.id]?.[lang] ?? authoredOverride ?? buildRegionalGuideOverride(page.id, lang);

  const generated: LandingPage = {
    id: page.id,
    slug: page.slug,
    sectionId: "seo-guide",
    category,
    title,
    metaDescription,
    h1,
    intro,
    keywords: [h1, copy.brand.name, copy.landmarks.title, ...text.keywordSuffixes],
    secondaryKeywords: [copy.guides.vitRiver.label, copy.guides.hiking.label, copy.guides.nearby.label],
    bulgarianKeywords: lang === "bg" ? ["Ъглен", "село Ъглен", "река Вит", "Луковит"] : [copy.brand.name, h1],
    image: landingImage(page.image),
    imageAlt: imageAlt(lang, page.imageAltKey),
    ctaLabel: text.cta,
    schemaType: page.schemaType,
    sections: [
      { heading: text.sectionHeadings[0], body: `${h1}: ${text.sectionBodies[0]} ${copy.about.text}` },
      { heading: text.sectionHeadings[1], body: `${text.sectionBodies[1]} ${copy.contact.note}` },
      { heading: text.sectionHeadings[2], body: text.sectionBodies[2] },
    ],
    faqs: [
      { question: text.faqWhere, answer: text.faqWhereAnswer },
      { question: text.faqDo, answer: text.faqDoAnswer },
      { question: text.faqWhen, answer: text.faqWhenAnswer },
    ],
    internalLinks: page.internalLinkRouteIds.map((routeId) => ({ label: routeLabel(lang, routeId), routeId })),
    interactive: page.interactive,
  };

  if (!override) {
    return generated;
  }

  // Field by field rather than a spread: an override that omits a field must
  // fall through to the generated value, not overwrite it with `undefined`.
  return {
    ...generated,
    category: override.category ?? generated.category,
    title: override.title ?? generated.title,
    metaDescription: override.metaDescription ?? generated.metaDescription,
    h1: override.h1 ?? generated.h1,
    intro: override.intro ?? generated.intro,
    imageAlt: override.imageAlt ?? generated.imageAlt,
    ctaLabel: override.ctaLabel ?? generated.ctaLabel,
    sections: override.sections ?? generated.sections,
    faqs: override.faqs ?? generated.faqs,
    keywords: override.keywords ?? generated.keywords,
    secondaryKeywords: override.secondaryKeywords ?? generated.secondaryKeywords,
    bulgarianKeywords: lang === "bg" ? [...generated.bulgarianKeywords, ...(override.keywords ?? [])] : generated.bulgarianKeywords,
  };
}

export function getLandingPages(lang: LanguageCode): LandingPage[] {
  return landingPageMaster.map((page) => buildLandingPage(lang, page));
}

export function getLandingPage(lang: LanguageCode, routeId: LandingPageId): LandingPage | undefined {
  const page = landingPageMaster.find((candidate) => candidate.id === routeId);
  return page ? buildLandingPage(lang, page) : undefined;
}

export const landingPages: LandingPage[] = getLandingPages("bg");
export const landingPagesById = new Map(landingPages.map((page) => [page.id, page]));

export function isLandingPageId(routeId: string): routeId is LandingPageId {
  return landingPageMaster.some((page) => page.id === routeId);
}
