import { contentByLanguage } from "./locales";
import { images } from "./locales/shared";
import type { LanguageCode } from "./locales/types";
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
};

type LandingPageMaster = {
  id: LandingPageId;
  slug: string;
  image: string;
  imageAltKey: "hero" | "aerial" | "cave" | "church" | "pool" | "kaleto";
  schemaType: "Article" | "TravelGuide";
  internalLinkRouteIds: Array<LandingPageId | string>;
};

export const landingPageMaster: LandingPageMaster[] = [
  { id: "visitAglen", slug: "visit-aglen", image: images.hero, imageAltKey: "hero", schemaType: "TravelGuide", internalLinkRouteIds: ["attractions", "thingsToDo", "accommodationNearAglen", "vitRiver", "contact"] },
  { id: "thingsToDo", slug: "things-to-do-in-aglen", image: images.aerial, imageAltKey: "aerial", schemaType: "TravelGuide", internalLinkRouteIds: ["fishing", "hiking", "quests", "weekendInAglen"] },
  { id: "natureAroundAglen", slug: "nature-around-aglen", image: images.hero, imageAltKey: "hero", schemaType: "TravelGuide", internalLinkRouteIds: ["vitRiver", "hiking", "caves", "ecoTourismBulgaria"] },
  { id: "historyOfAglen", slug: "history-of-aglen", image: images.kaleto, imageAltKey: "kaleto", schemaType: "Article", internalLinkRouteIds: ["culturalTourism", "attractions", "quests", "editorial"] },
  { id: "accommodationNearAglen", slug: "accommodation-near-aglen", image: images.church, imageAltKey: "church", schemaType: "Article", internalLinkRouteIds: ["visitAglen", "campingNearAglen", "traditionalFood", "contact"] },
  { id: "traditionalFood", slug: "traditional-food-aglen", image: images.church, imageAltKey: "church", schemaType: "Article", internalLinkRouteIds: ["accommodationNearAglen", "visitAglen", "ruralTourismBulgaria"] },
  { id: "hiddenPlaces", slug: "hidden-places-near-aglen", image: images.cave, imageAltKey: "cave", schemaType: "TravelGuide", internalLinkRouteIds: ["lukovitGuide", "karlukovoGuide", "krushunaGuide", "devetashkaCaveGuide"] },
  { id: "culturalTourism", slug: "cultural-tourism-aglen", image: images.kaleto, imageAltKey: "kaleto", schemaType: "TravelGuide", internalLinkRouteIds: ["historyOfAglen", "quests", "contact"] },
  { id: "natureTourism", slug: "nature-tourism-aglen", image: images.hero, imageAltKey: "hero", schemaType: "TravelGuide", internalLinkRouteIds: ["natureAroundAglen", "vitRiver", "campingNearAglen"] },
  { id: "adventureTourism", slug: "adventure-tourism-aglen", image: images.cave, imageAltKey: "cave", schemaType: "TravelGuide", internalLinkRouteIds: ["quests", "hiking", "caves"] },
  { id: "familyTrip", slug: "family-trip-aglen", image: images.pool, imageAltKey: "pool", schemaType: "TravelGuide", internalLinkRouteIds: ["thingsToDo", "weekendInAglen", "accommodationNearAglen"] },
  { id: "campingNearAglen", slug: "camping-near-aglen", image: images.aerial, imageAltKey: "aerial", schemaType: "Article", internalLinkRouteIds: ["accommodationNearAglen", "natureTourism", "vitRiver"] },
  { id: "weekendInAglen", slug: "weekend-in-aglen", image: images.hero, imageAltKey: "hero", schemaType: "TravelGuide", internalLinkRouteIds: ["aglenFromSofia", "howToGet", "nearby"] },
  { id: "routeMap", slug: "aglen-route-map", image: images.aerial, imageAltKey: "aerial", schemaType: "TravelGuide", internalLinkRouteIds: ["visitAglen", "attractions", "nearby"] },
  { id: "bestTime", slug: "best-time-to-visit-aglen", image: images.aerial, imageAltKey: "aerial", schemaType: "Article", internalLinkRouteIds: ["seasonal", "weekendInAglen", "natureTourism"] },
  { id: "howToGet", slug: "how-to-get-to-aglen", image: images.aerial, imageAltKey: "aerial", schemaType: "Article", internalLinkRouteIds: ["aglenFromSofia", "lukovitGuide", "routeMap"] },
  { id: "aglenFromSofia", slug: "aglen-from-sofia", image: images.hero, imageAltKey: "hero", schemaType: "TravelGuide", internalLinkRouteIds: ["weekendInAglen", "howToGet", "nearby"] },
  { id: "lovechRegionGuide", slug: "lovech-region-travel-guide", image: images.aerial, imageAltKey: "aerial", schemaType: "TravelGuide", internalLinkRouteIds: ["lukovitGuide", "krushunaGuide", "devetashkaCaveGuide", "visitAglen"] },
  { id: "lukovitGuide", slug: "lukovit-travel-guide", image: images.aerial, imageAltKey: "aerial", schemaType: "TravelGuide", internalLinkRouteIds: ["visitAglen", "iskarPanegaGuide", "karlukovoGuide"] },
  { id: "karlukovoGuide", slug: "karlukovo-travel-guide", image: images.cave, imageAltKey: "cave", schemaType: "TravelGuide", internalLinkRouteIds: ["caves", "hiking", "weekendInAglen"] },
  { id: "krushunaGuide", slug: "krushuna-travel-guide", image: images.pool, imageAltKey: "pool", schemaType: "TravelGuide", internalLinkRouteIds: ["lovechRegionGuide", "devetashkaCaveGuide", "visitAglen"] },
  { id: "devetashkaCaveGuide", slug: "devetashka-cave-travel-guide", image: images.cave, imageAltKey: "cave", schemaType: "TravelGuide", internalLinkRouteIds: ["krushunaGuide", "lovechRegionGuide", "caves"] },
  { id: "iskarPanegaGuide", slug: "iskar-panega-travel-guide", image: images.pool, imageAltKey: "pool", schemaType: "TravelGuide", internalLinkRouteIds: ["lukovitGuide", "hiking", "natureAroundAglen"] },
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
  bg: { category: "Туристическо ръководство", titleSeparator: " | ", metaPrefix: "Планирай", introPrefix: "Това ръководство помага да планираш", sectionHeadings: ["Основен смисъл", "Планиране", "Свързани маршрути"], sectionBodies: ["Свързва реката, скалите, селската памет и практичните нужди на посетителите.", "Провери сезон, достъп, време, обувки, вода и дали е нужна местна насока.", "Използвай вътрешните връзки, за да свържеш темата с маршрути, настаняване, храна и близки места."], cta: "Попитай за посещение", faqWhere: "Къде се намира Ъглен?", faqWhereAnswer: "Ъглен е село в Ловешка област, Северна България, близо до Луковит и долината на река Вит.", faqDo: "Какво могат да правят посетителите?", faqDoAnswer: "Посетителите могат да вървят край реката, да снимат, да разглеждат скални форми, да планират риболов, къмпинг, местни истории и AR преживяване.", faqWhen: "Кога е най-доброто време?", faqWhenAnswer: "Пролетта и есента са най-силни за ходене и фотография, а лятото е подходящо за речни паузи и внимателно планиране.", keywordSuffixes: ["Ъглен", "река Вит", "Луковит", "Ловешка област", "селски туризъм"] },
  en: { category: "Travel guide", titleSeparator: " | ", metaPrefix: "Plan", introPrefix: "This guide helps you plan", sectionHeadings: ["Core promise", "Planning notes", "Related routes"], sectionBodies: ["Connect the river, rocks, village memory, and practical visitor needs.", "Check season, access, timing, shoes, water, and whether local guidance is useful.", "Use the internal links to connect this topic with routes, stays, food, and nearby places."], cta: "Ask about a visit", faqWhere: "Where is Aglen?", faqWhereAnswer: "Aglen is a village in Lovech Province, Northern Bulgaria, near Lukovit and the Vit River valley.", faqDo: "What can visitors do?", faqDoAnswer: "Visitors can walk river routes, photograph limestone places, plan fishing, camping, local stories, and an AR experience.", faqWhen: "When is the best time?", faqWhenAnswer: "Spring and autumn are strongest for walking and photography, while summer suits river pauses with careful planning.", keywordSuffixes: ["Aglen", "Vit River", "Lukovit", "Lovech region", "rural tourism"] },
  de: { category: "Reiseführer", titleSeparator: " | ", metaPrefix: "Plane", introPrefix: "Dieser Führer hilft bei der Planung von", sectionHeadings: ["Kernversprechen", "Planungshinweise", "Verwandte Routen"], sectionBodies: ["Verbindet Fluss, Felsen, Dorfgedächtnis und praktische Besucherfragen.", "Prüfe Saison, Zugang, Zeit, Schuhe, Wasser und ob lokale Führung sinnvoll ist.", "Nutze interne Links, um Thema, Routen, Unterkunft, Essen und nahe Orte zu verbinden."], cta: "Nach Besuch fragen", faqWhere: "Wo liegt Aglen?", faqWhereAnswer: "Aglen ist ein Dorf in der Region Lovech in Nordbulgarien, nahe Lukovit und dem Tal des Vit.", faqDo: "Was können Besucher tun?", faqDoAnswer: "Besucher können Flussrouten gehen, Kalksteinorte fotografieren, Angeln, Camping, lokale Geschichten und AR planen.", faqWhen: "Wann ist die beste Reisezeit?", faqWhenAnswer: "Frühling und Herbst sind stark für Spaziergänge und Fotografie, der Sommer passt zu Flusspausen mit guter Planung.", keywordSuffixes: ["Aglen", "Vit-Fluss", "Lukovit", "Region Lovech", "ländlicher Tourismus"] },
  fr: { category: "Guide de voyage", titleSeparator: " | ", metaPrefix: "Planifiez", introPrefix: "Ce guide aide à planifier", sectionHeadings: ["Promesse principale", "Notes de préparation", "Itinéraires liés"], sectionBodies: ["Relie la rivière, les rochers, la mémoire du village et les besoins pratiques des visiteurs.", "Vérifiez saison, accès, durée, chaussures, eau et besoin éventuel d'un guide local.", "Utilisez les liens internes pour relier ce thème aux routes, hébergements, repas et lieux proches."], cta: "Demander une visite", faqWhere: "Où se trouve Aglen ?", faqWhereAnswer: "Aglen est un village de la province de Lovech, au nord de la Bulgarie, près de Lukovit et de la vallée de la Vit.", faqDo: "Que peuvent faire les visiteurs ?", faqDoAnswer: "Les visiteurs peuvent marcher près de la rivière, photographier le calcaire, prévoir pêche, camping, récits locaux et expérience AR.", faqWhen: "Quelle est la meilleure période ?", faqWhenAnswer: "Le printemps et l'automne sont les meilleurs pour marcher et photographier; l'été convient aux pauses au bord de l'eau avec préparation.", keywordSuffixes: ["Aglen", "rivière Vit", "Lukovit", "région de Lovech", "tourisme rural"] },
  es: { category: "Guía de viaje", titleSeparator: " | ", metaPrefix: "Planifica", introPrefix: "Esta guía ayuda a planificar", sectionHeadings: ["Promesa central", "Notas de planificación", "Rutas relacionadas"], sectionBodies: ["Conecta río, rocas, memoria del pueblo y necesidades prácticas del visitante.", "Revisa temporada, acceso, tiempo, calzado, agua y si conviene guía local.", "Usa los enlaces internos para unir el tema con rutas, alojamiento, comida y lugares cercanos."], cta: "Consultar una visita", faqWhere: "¿Dónde está Aglen?", faqWhereAnswer: "Aglen es un pueblo de la provincia de Lovech, en el norte de Bulgaria, cerca de Lukovit y del valle del Vit.", faqDo: "¿Qué pueden hacer los visitantes?", faqDoAnswer: "Pueden caminar junto al río, fotografiar caliza, planear pesca, camping, historias locales y una experiencia AR.", faqWhen: "¿Cuál es la mejor época?", faqWhenAnswer: "Primavera y otoño destacan para caminar y fotografiar; el verano sirve para pausas junto al río con buena planificación.", keywordSuffixes: ["Aglen", "río Vit", "Lukovit", "región de Lovech", "turismo rural"] },
  it: { category: "Guida di viaggio", titleSeparator: " | ", metaPrefix: "Pianifica", introPrefix: "Questa guida aiuta a pianificare", sectionHeadings: ["Promessa centrale", "Note di pianificazione", "Percorsi collegati"], sectionBodies: ["Collega fiume, rocce, memoria del villaggio e bisogni pratici dei visitatori.", "Controlla stagione, accesso, tempi, scarpe, acqua e se serve una guida locale.", "Usa i link interni per collegare tema, percorsi, alloggi, cibo e luoghi vicini."], cta: "Chiedi una visita", faqWhere: "Dove si trova Aglen?", faqWhereAnswer: "Aglen è un villaggio della provincia di Lovech, nel nord della Bulgaria, vicino a Lukovit e alla valle del Vit.", faqDo: "Cosa possono fare i visitatori?", faqDoAnswer: "Possono camminare lungo il fiume, fotografare luoghi calcarei, pianificare pesca, campeggio, storie locali ed esperienza AR.", faqWhen: "Qual è il periodo migliore?", faqWhenAnswer: "Primavera e autunno sono ideali per camminare e fotografare; l'estate va bene per pause sul fiume con pianificazione.", keywordSuffixes: ["Aglen", "fiume Vit", "Lukovit", "regione Lovech", "turismo rurale"] },
  ro: { category: "Ghid de călătorie", titleSeparator: " | ", metaPrefix: "Planifică", introPrefix: "Acest ghid te ajută să planifici", sectionHeadings: ["Promisiune principală", "Note de planificare", "Trasee asociate"], sectionBodies: ["Leagă râul, stâncile, memoria satului și nevoile practice ale vizitatorilor.", "Verifică sezonul, accesul, timpul, încălțămintea, apa și dacă e util ghid local.", "Folosește linkurile interne pentru a lega tema de trasee, cazare, mâncare și locuri apropiate."], cta: "Întreabă despre vizită", faqWhere: "Unde este Aglen?", faqWhereAnswer: "Aglen este un sat din provincia Lovech, Bulgaria de Nord, aproape de Lukovit și valea râului Vit.", faqDo: "Ce pot face vizitatorii?", faqDoAnswer: "Pot merge pe trasee de râu, fotografia locuri calcaroase, planifica pescuit, camping, povești locale și experiență AR.", faqWhen: "Care este cea mai bună perioadă?", faqWhenAnswer: "Primăvara și toamna sunt excelente pentru mers și fotografie; vara merge pentru pauze la râu cu planificare atentă.", keywordSuffixes: ["Aglen", "râul Vit", "Lukovit", "regiunea Lovech", "turism rural"] },
  tr: { category: "Gezi rehberi", titleSeparator: " | ", metaPrefix: "Planla", introPrefix: "Bu rehber planlamaya yardımcı olur:", sectionHeadings: ["Temel vaat", "Planlama notları", "İlgili rotalar"], sectionBodies: ["Nehri, kayaları, köy belleğini ve ziyaretçinin pratik ihtiyaçlarını birleştirir.", "Sezonu, erişimi, süreyi, ayakkabıyı, suyu ve yerel rehber gerekip gerekmediğini kontrol et.", "İç bağlantılarla konuyu rotalar, konaklama, yemek ve yakın yerlerle bağla."], cta: "Ziyaret hakkında sor", faqWhere: "Aglen nerede?", faqWhereAnswer: "Aglen, Kuzey Bulgaristan'da Lovech ilinde, Lukovit ve Vit Nehri vadisi yakınında bir köydür.", faqDo: "Ziyaretçiler ne yapabilir?", faqDoAnswer: "Nehir rotalarında yürüyebilir, kireçtaşı yerleri fotoğraflayabilir, balıkçılık, kamp, yerel hikâyeler ve AR deneyimi planlayabilirler.", faqWhen: "En iyi zaman ne zaman?", faqWhenAnswer: "İlkbahar ve sonbahar yürüyüş ve fotoğraf için güçlüdür; yaz dikkatli planlamayla nehir molalarına uygundur.", keywordSuffixes: ["Aglen", "Vit Nehri", "Lukovit", "Lovech bölgesi", "kırsal turizm"] },
  el: { category: "Ταξιδιωτικός οδηγός", titleSeparator: " | ", metaPrefix: "Σχεδιάστε", introPrefix: "Αυτός ο οδηγός βοηθά να σχεδιάσετε", sectionHeadings: ["Κύρια υπόσχεση", "Σημειώσεις σχεδιασμού", "Σχετικές διαδρομές"], sectionBodies: ["Συνδέει ποτάμι, βράχια, μνήμη χωριού και πρακτικές ανάγκες επισκεπτών.", "Ελέγξτε εποχή, πρόσβαση, χρόνο, παπούτσια, νερό και αν χρειάζεται τοπική καθοδήγηση.", "Χρησιμοποιήστε εσωτερικούς συνδέσμους για σύνδεση με διαδρομές, διαμονή, φαγητό και κοντινά μέρη."], cta: "Ρωτήστε για επίσκεψη", faqWhere: "Πού βρίσκεται το Aglen;", faqWhereAnswer: "Το Aglen είναι χωριό στην επαρχία Lovech της Βόρειας Βουλγαρίας, κοντά στο Lukovit και την κοιλάδα του Vit.", faqDo: "Τι μπορούν να κάνουν οι επισκέπτες;", faqDoAnswer: "Μπορούν να περπατήσουν κοντά στο ποτάμι, να φωτογραφίσουν ασβεστολιθικά τοπία, να σχεδιάσουν ψάρεμα, κάμπινγκ, τοπικές ιστορίες και εμπειρία AR.", faqWhen: "Πότε είναι η καλύτερη περίοδος;", faqWhenAnswer: "Άνοιξη και φθινόπωρο είναι καλύτερα για περπάτημα και φωτογραφία, ενώ το καλοκαίρι ταιριάζει σε στάσεις στο ποτάμι με προσοχή.", keywordSuffixes: ["Aglen", "ποταμός Vit", "Lukovit", "περιοχή Lovech", "αγροτικός τουρισμός"] },
  ru: { category: "Туристический гид", titleSeparator: " | ", metaPrefix: "Планируйте", introPrefix: "Этот гид помогает планировать", sectionHeadings: ["Главная идея", "Планирование", "Связанные маршруты"], sectionBodies: ["Связывает реку, скалы, память села и практические потребности посетителей.", "Проверьте сезон, доступ, время, обувь, воду и нужна ли местная помощь.", "Используйте внутренние ссылки, чтобы связать тему с маршрутами, жильём, едой и близкими местами."], cta: "Спросить о визите", faqWhere: "Где находится Аглен?", faqWhereAnswer: "Аглен — село в области Ловеч на севере Болгарии, рядом с Луковитом и долиной реки Вит.", faqDo: "Что могут делать посетители?", faqDoAnswer: "Можно гулять у реки, фотографировать известняковые места, планировать рыбалку, кемпинг, местные истории и AR-опыт.", faqWhen: "Когда лучше ехать?", faqWhenAnswer: "Весна и осень лучше всего подходят для прогулок и фотографии, лето — для речных пауз при хорошем планировании.", keywordSuffixes: ["Аглен", "река Вит", "Луковит", "регион Ловеч", "сельский туризм"] },
  ja: { category: "旅行ガイド", titleSeparator: " | ", metaPrefix: "計画する", introPrefix: "このガイドは計画に役立ちます:", sectionHeadings: ["中心となる魅力", "計画メモ", "関連ルート"], sectionBodies: ["川、岩、村の記憶、訪問者に必要な実用情報をつなぎます。", "季節、アクセス、所要時間、靴、水、現地案内が必要かを確認します。", "内部リンクでテーマをルート、宿泊、食事、近隣地へつなぎます。"], cta: "訪問について問い合わせる", faqWhere: "アグレンはどこですか？", faqWhereAnswer: "アグレンはブルガリア北部ロヴェチ州の村で、ルコヴィトとヴィト川の谷の近くにあります。", faqDo: "訪問者は何ができますか？", faqDoAnswer: "川沿いを歩き、石灰岩の場所を撮影し、釣り、キャンプ、地元の物語、AR体験を計画できます。", faqWhen: "ベストシーズンはいつですか？", faqWhenAnswer: "春と秋は散策と写真に向き、夏は準備すれば川辺の休憩に適しています。", keywordSuffixes: ["アグレン", "ヴィト川", "ルコヴィト", "ロヴェチ地域", "農村観光"] },
  sr: { category: "Туристички водич", titleSeparator: " | ", metaPrefix: "Планирај", introPrefix: "Овај водич помаже да планираш", sectionHeadings: ["Главна идеја", "Белешке за планирање", "Повезане руте"], sectionBodies: ["Повезује реку, стене, сеоско памћење и практичне потребе посетилаца.", "Провери сезону, приступ, време, обућу, воду и да ли је корисно локално вођење.", "Користи унутрашње везе да тему повежеш са рутама, смештајем, храном и близином."], cta: "Питај за посету", faqWhere: "Где је Аглен?", faqWhereAnswer: "Аглен је село у области Ловеч, Северна Бугарска, близу Луковита и долине реке Вит.", faqDo: "Шта посетиоци могу да раде?", faqDoAnswer: "Могу да шетају речним рутама, фотографишу кречњачка места, планирају риболов, камп, локалне приче и AR искуство.", faqWhen: "Када је најбоље време?", faqWhenAnswer: "Пролеће и јесен су најбољи за шетњу и фотографију, а лето за речне паузе уз пажљиво планирање.", keywordSuffixes: ["Аглен", "река Вит", "Луковит", "регион Ловеч", "сеоски туризам"] },
  zh: { category: "旅行指南", titleSeparator: " | ", metaPrefix: "规划", introPrefix: "本指南帮助你规划", sectionHeadings: ["核心价值", "规划提示", "相关路线"], sectionBodies: ["连接河流、岩石、村庄记忆和访客的实用需求。", "确认季节、通行、时间、鞋、水以及是否需要本地引导。", "使用内部链接，把主题与路线、住宿、食物和附近地点连接起来。"], cta: "咨询访问", faqWhere: "阿格伦在哪里？", faqWhereAnswer: "阿格伦位于保加利亚北部洛维奇州，靠近卢科维特和维特河谷。", faqDo: "访客可以做什么？", faqDoAnswer: "访客可以沿河步行、拍摄石灰岩景观、规划钓鱼、露营、地方故事和 AR 体验。", faqWhen: "什么时候最好？", faqWhenAnswer: "春季和秋季最适合步行与摄影；夏季适合河边停留，但需要周密规划。", keywordSuffixes: ["阿格伦", "维特河", "卢科维特", "洛维奇地区", "乡村旅游"] },
  hu: { category: "Utazási kalauz", titleSeparator: " | ", metaPrefix: "Tervezd meg", introPrefix: "Ez a kalauz segít megtervezni", sectionHeadings: ["Fő ígéret", "Tervezési jegyzetek", "Kapcsolódó útvonalak"], sectionBodies: ["Összekapcsolja a folyót, sziklákat, falusi emlékezetet és a látogatók gyakorlati igényeit.", "Ellenőrizd az évszakot, hozzáférést, időt, cipőt, vizet és hogy kell-e helyi vezetés.", "Használd a belső linkeket, hogy a témát útvonalakkal, szállással, étellel és közeli helyekkel kösd össze."], cta: "Kérdezz a látogatásról", faqWhere: "Hol van Aglen?", faqWhereAnswer: "Aglen falu Észak-Bulgáriában, Lovech tartományban, Lukovit és a Vit folyó völgye közelében.", faqDo: "Mit tehetnek a látogatók?", faqDoAnswer: "Sétálhatnak folyóparti útvonalakon, fotózhatnak mészkőhelyeket, tervezhetnek horgászatot, kempinget, helyi történeteket és AR-élményt.", faqWhen: "Mikor a legjobb?", faqWhenAnswer: "Tavasz és ősz a legerősebb sétához és fotózáshoz; nyáron a folyóparti pihenés jó gondos tervezéssel.", keywordSuffixes: ["Aglen", "Vit folyó", "Lukovit", "Lovech régió", "falusi turizmus"] },
};

function imageAlt(lang: LanguageCode, key: LandingPageMaster["imageAltKey"]): string {
  const copy = contentByLanguage[lang];
  const byKey: Record<LandingPageMaster["imageAltKey"], string> = {
    hero: copy.hero.imageAlt,
    aerial: copy.galleryItems[3]?.alt ?? copy.landmarks.aria,
    cave: copy.galleryItems[2]?.alt ?? copy.guides.caves.text,
    church: copy.placesList[4]?.imageAlt ?? copy.stay.title,
    pool: copy.placesList[3]?.imageAlt ?? copy.guides.vitRiver.text,
    kaleto: copy.placesList[5]?.imageAlt ?? copy.about.title,
  };

  return byKey[key];
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

function buildLandingPage(lang: LanguageCode, page: LandingPageMaster): LandingPage {
  const copy = contentByLanguage[lang];
  const text = landingText[lang];
  const h1 = pageNames[lang][page.id];
  const category = text.category;
  const location = copy.hero.meta;
  const title = `${h1}${text.titleSeparator}${copy.brand.name}`;
  const metaDescription = `${text.metaPrefix} ${h1.toLocaleLowerCase()}: ${copy.landmarks.text}`;
  const intro = `${text.introPrefix} ${h1.toLocaleLowerCase()} — ${location}. ${copy.hub.text}`;
  const linkedLabels = page.internalLinkRouteIds.map((routeId) => routeLabel(lang, routeId));

  return {
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
    image: page.image,
    imageAlt: imageAlt(lang, page.imageAltKey),
    ctaLabel: text.cta,
    schemaType: page.schemaType,
    sections: [
      { heading: text.sectionHeadings[0], body: `${h1}: ${text.sectionBodies[0]} ${copy.about.text}` },
      { heading: text.sectionHeadings[1], body: `${text.sectionBodies[1]} ${copy.contact.noteTwo}` },
      { heading: text.sectionHeadings[2], body: `${text.sectionBodies[2]} ${linkedLabels.join(", ")}.` },
    ],
    faqs: [
      { question: text.faqWhere, answer: text.faqWhereAnswer },
      { question: text.faqDo, answer: text.faqDoAnswer },
      { question: text.faqWhen, answer: text.faqWhenAnswer },
    ],
    internalLinks: page.internalLinkRouteIds.map((routeId) => ({ label: routeLabel(lang, routeId), routeId })),
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
