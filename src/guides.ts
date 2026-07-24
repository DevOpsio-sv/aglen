import type { BusinessCategory, LanguageCode, LocalizedText, PlaceId } from "./locales/types";
import { contentByLanguage } from "./content";

// ─────────────────────────────────────────────────────────────
// Tourism guides.
//
// Places are NOT duplicated here: a guide references `PlaceId`s and the copy is
// read from `contentByLanguage[lang].placesList`, which stays the single source
// of truth for every language.
//
// A guide is only `published` when it holds genuinely useful, verified content.
// Everything else stays `in-preparation`: it still gets a card and a page, but
// the page says so plainly instead of padding itself with invented facts.
//
// Deliberately absent: distances, travel times, difficulty ratings and access or
// safety permissions. The project holds no verified source for any of them, so
// the quick-facts panel simply omits what it does not know.
// ─────────────────────────────────────────────────────────────

export type GuideStatus = "published" | "in-preparation";

export type GuideSection = {
  heading: LocalizedText;
  body: LocalizedText[];
  /** Rendered as a checklist, e.g. what to bring. */
  list?: LocalizedText[];
  /** Rendered as a visible notice. Use for genuine safety or access caveats. */
  notice?: LocalizedText;
};

export type GuideQuickFacts = {
  duration?: LocalizedText;
  bestSeason?: LocalizedText;
  transport?: LocalizedText;
  childFriendly?: LocalizedText;
};

export type TourismGuide = {
  id: string;
  slug: string;
  /** Route the old hub card used to point at, so nothing links into a void. */
  legacyRouteId: string;
  title: LocalizedText;
  summary: LocalizedText;
  heroImage: string;
  heroImageAlt: LocalizedText;
  status: GuideStatus;
  /** Verified places from placesList, shown as place cards. */
  placeIds?: PlaceId[];
  /** Include the village walking sequence from `mapStops`. */
  includeRouteStops?: boolean;
  /** Pull live listings from the local-business directory. */
  businessCategories?: BusinessCategory[];
  sections?: GuideSection[];
  quickFacts?: GuideQuickFacts;
  relatedGuideIds: string[];
};

export const guides: TourismGuide[] = [
  {
    id: "beautiful-places",
    slug: "beautiful-places",
    legacyRouteId: "attractions",
    title: { bg: "Най-красивите места край Ъглен", en: "The most beautiful places around Aglen" },
    summary: {
      bg: "Подбрани природни и исторически места около селото, с кратък маршрут през центъра и съвети за снимки.",
      en: "A selection of natural and historical places around the village, with a short walk through the centre and photography tips.",
    },
    heroImage: "/assets/aglen-rock-arch.png",
    heroImageAlt: {
      bg: "Скална арка над долината на река Вит край Ъглен",
      en: "A rock arch above the Vit River valley near Aglen",
    },
    status: "published",
    placeIds: ["dupkata", "sloncheto", "chervena-stena", "rachkov-vir", "st-archangel-michael", "kaleto"],
    includeRouteStops: true,
    quickFacts: {
      duration: { bg: "Половин ден за пешеходната част", en: "Half a day for the walking part" },
      bestSeason: { bg: "Пролет и есен", en: "Spring and autumn" },
      childFriendly: {
        bg: "Центърът и брегът са подходящи за деца; скалите изискват внимание",
        en: "The centre and the riverbank suit children; the rocks need care",
      },
    },
    sections: [
      {
        heading: { bg: "Какво ще видите", en: "What you will see" },
        body: [
          {
            bg: "Ъглен събира на малко разстояние три различни пейзажа: варовиковите скали над долината, самата река Вит с нейните вирове и селската памет в центъра — църквата, каменните улици и старите къщи.",
            en: "Aglen packs three different landscapes into a small area: the limestone rocks above the valley, the Vit River with its pools, and the village memory in the centre — the church, the stone streets and the old houses.",
          },
          {
            bg: "Местата по-долу са описани така, както са известни в селото. Разстоянията и достъпът се променят според сезона и състоянието на пътеките, затова е добре да попитате на място, преди да тръгнете към по-отдалечените скали.",
            en: "The places below are described as they are known in the village. Distances and access change with the season and the state of the paths, so it is worth asking locally before setting off towards the more remote rocks.",
          },
        ],
      },
      {
        heading: { bg: "Съвети за снимки", en: "Photography tips" },
        body: [
          {
            bg: "Скалите и арките се снимат най-добре в първия и последния час светлина, когато варовикът поема топъл тон, а сенките подчертават формите. По обяд контрастът е твърде силен.",
            en: "The rocks and arches photograph best in the first and last hour of light, when the limestone takes on a warm tone and the shadows bring out the shapes. At midday the contrast is too harsh.",
          },
          {
            bg: "Реката е най-спокойна рано сутрин — тогава отраженията са най-чисти, а над водата често има мъгла.",
            en: "The river is calmest early in the morning — reflections are cleanest then, and mist often sits over the water.",
          },
        ],
      },
      {
        heading: { bg: "Какво да носите", en: "What to bring" },
        body: [],
        list: [
          { bg: "Удобни обувки за неравен терен", en: "Comfortable shoes for uneven ground" },
          { bg: "Вода за целия маршрут", en: "Water for the whole walk" },
          { bg: "Защита от слънце", en: "Sun protection" },
          { bg: "Уважение към частните дворове и към тишината на селото", en: "Respect for private yards and for the quiet of the village" },
        ],
        notice: {
          bg: "Скалните ръбове над долината не са обезопасени. Дръжте децата на разстояние от ръба и не се приближавайте при мокро или заледено време.",
          en: "The rock edges above the valley have no barriers. Keep children away from the edge and do not approach in wet or icy conditions.",
        },
      },
    ],
    relatedGuideIds: ["vit-river", "caves-and-rocks", "local-food"],
  },
  {
    id: "vit-river",
    slug: "vit-river",
    legacyRouteId: "vitRiver",
    title: { bg: "Ръководство за река Вит", en: "Guide to the Vit River" },
    summary: {
      bg: "Реката край Ъглен — вировете, брегът и разходките покрай водата.",
      en: "The river at Aglen — its pools, its bank and the walks along the water.",
    },
    heroImage: "/assets/aglen-vit-river-sunset.png",
    heroImageAlt: { bg: "Река Вит при залез край Ъглен", en: "The Vit River at sunset near Aglen" },
    status: "in-preparation",
    placeIds: ["rachkov-vir"],
    sections: [
      {
        heading: { bg: "Реката край Ъглен", en: "The river at Aglen" },
        body: [
          {
            bg: "Вит минава покрай селото и оформя вировете и бреговете, по които тръгват повечето разходки. Пътеката покрай реката е част от обиколката на центъра.",
            en: "The Vit passes the village and shapes the pools and banks where most walks begin. The riverside path is part of the walk around the centre.",
          },
        ],
        notice: {
          bg: "Не разполагаме с проверена информация за безопасни места за къпане, за режима на риболова и за достъпа до брега. Не приемайте нито едно място за разрешено, преди да проверите на място.",
          en: "We hold no verified information about safe swimming spots, fishing rules or bank access. Do not assume any spot is permitted before checking locally.",
        },
      },
    ],
    relatedGuideIds: ["beautiful-places", "caves-and-rocks", "seasonal-guide"],
  },
  {
    id: "caves-and-rocks",
    slug: "caves-and-rocks",
    legacyRouteId: "caves",
    title: { bg: "Пещери и скални форми", en: "Caves and rock formations" },
    summary: {
      bg: "Карстовият релеф около Ъглен и Карлуково — скални арки, пещери и варовикови образувания.",
      en: "The karst landscape around Aglen and Karlukovo — rock arches, caves and limestone formations.",
    },
    heroImage: "/assets/aglen-cave-mystery.png",
    heroImageAlt: { bg: "Пещерен вход във варовикова скала край Ъглен", en: "A cave entrance in limestone rock near Aglen" },
    status: "in-preparation",
    placeIds: ["dupkata", "sloncheto"],
    sections: [
      {
        heading: { bg: "Открити скални форми и пещери", en: "Open rock formations and caves" },
        body: [
          {
            bg: "Скалните арки и фигури около селото се разглеждат отвън и отблизо, без специална подготовка. Пещерите в Луковитския карст са друго нещо: те се различават силно по дълбочина, достъп и риск.",
            en: "The rock arches and figures around the village can be viewed from outside, up close, with no special preparation. The caves of the Lukovit karst are a different matter: they vary widely in depth, access and risk.",
          },
        ],
        notice: {
          bg: "Не влизайте в пещера без екипировка и без опитен водач. Тук не публикуваме кои пещери са свободно достъпни, защото нямаме проверена информация за това — потърсете местна насока преди посещение.",
          en: "Do not enter a cave without equipment and an experienced guide. We do not publish which caves are freely accessible, because we have no verified information about it — seek local guidance before visiting.",
        },
      },
    ],
    relatedGuideIds: ["beautiful-places", "nearby-destinations", "vit-river"],
  },
  {
    id: "local-food",
    slug: "local-food",
    legacyRouteId: "food",
    title: { bg: "Храна и местни продукти", en: "Food and local products" },
    summary: {
      bg: "Кой какво предлага в Ъглен — местни производители, продукти и места за хапване.",
      en: "Who offers what in Aglen — local producers, products and places to eat.",
    },
    heroImage: "/assets/aglen-village-church.png",
    heroImageAlt: { bg: "Селска улица и къщи в Ъглен", en: "A village street and houses in Aglen" },
    status: "published",
    businessCategories: ["food", "producers", "farming", "shops"],
    sections: [
      {
        heading: { bg: "Откъде да купите местно", en: "Where to buy local" },
        body: [
          {
            bg: "Списъкът по-долу се води от регистъра на местния бизнес и се обновява заедно с него. Показани са само реални обекти — когато няма вписан обект в дадена категория, тук не се появява нищо.",
            en: "The list below is driven by the local business directory and updates along with it. Only real listings appear — when a category holds no listing, nothing is shown here.",
          },
        ],
      },
    ],
    relatedGuideIds: ["beautiful-places", "seasonal-guide", "nearby-destinations"],
  },
  {
    id: "nearby-destinations",
    slug: "nearby-destinations",
    legacyRouteId: "nearby",
    title: { bg: "Близки дестинации", en: "Nearby destinations" },
    summary: {
      bg: "Какво да съчетаете с Ъглен — Карлуково, Луковит и околните забележителности.",
      en: "What to combine with Aglen — Karlukovo, Lukovit and the sights around them.",
    },
    heroImage: "/assets/aglen-aerial-river.png",
    heroImageAlt: { bg: "Въздушна гледка към река Вит и долината", en: "An aerial view of the Vit River and the valley" },
    status: "in-preparation",
    sections: [
      {
        heading: { bg: "Посоките около Ъглен", en: "The directions around Aglen" },
        body: [
          {
            bg: "Посещението на Ъглен се съчетава най-често с Проходна, Карлуково, Искър–Панега и Луковит.",
            en: "A visit to Aglen is most often combined with Prohodna, Karlukovo, Iskar–Panega and Lukovit.",
          },
        ],
        notice: {
          bg: "Времената за пътуване и препоръчителната продължителност на посещенията още не са проверени, затова не са публикувани тук.",
          en: "Travel times and recommended visit durations have not been verified yet, so they are not published here.",
        },
      },
    ],
    relatedGuideIds: ["caves-and-rocks", "beautiful-places", "seasonal-guide"],
  },
  {
    id: "seasonal-guide",
    slug: "seasonal-guide",
    legacyRouteId: "seasonal",
    title: { bg: "Сезонен наръчник", en: "Seasonal guide" },
    summary: {
      bg: "Кога кое място си струва — обща сезонна насока за пролетта, лятото, есента и зимата.",
      en: "When each place is worth it — general seasonal guidance for spring, summer, autumn and winter.",
    },
    heroImage: "/assets/aglen-hero-river-canyon.png",
    heroImageAlt: { bg: "Каньонът на река Вит край Ъглен", en: "The Vit River canyon near Aglen" },
    status: "in-preparation",
    sections: [
      {
        heading: { bg: "Обща сезонна насока", en: "General seasonal guidance" },
        body: [
          {
            bg: "Пролетта и есента са най-удобни за ходене — светлината е мека, а горещината не пречи. Лятото е за реката и за ранните часове. Зимата стеснява избора до центъра на селото и до гледките отдалеч.",
            en: "Spring and autumn are the easiest for walking — the light is soft and the heat is not in the way. Summer is for the river and the early hours. Winter narrows the choice to the village centre and to the views from a distance.",
          },
        ],
        notice: {
          bg: "Това е обща насока, а не актуална информация. Сайтът няма връзка с метеорологичен източник и не следи състоянието на пътеките — проверявайте прогнозата и питайте на място.",
          en: "This is general guidance, not live information. The site has no weather source and does not track path conditions — check the forecast and ask locally.",
        },
      },
    ],
    relatedGuideIds: ["beautiful-places", "vit-river", "nearby-destinations"],
  },
];

export function localizeGuide(text: LocalizedText, language: LanguageCode): string {
  return text[language] ?? text.en ?? text.bg;
}

export function findGuide(slug: string): TourismGuide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function guideByLegacyRoute(routeId: string): TourismGuide | undefined {
  return guides.find((guide) => guide.legacyRouteId === routeId);
}

/** Places for a guide, read from the locale content so nothing is duplicated. */
export function guidePlaces(guide: TourismGuide, language: LanguageCode) {
  const list = contentByLanguage[language].placesList;
  return (guide.placeIds ?? [])
    .map((id) => list.find((place) => place.id === id))
    .filter((place): place is (typeof list)[number] => Boolean(place));
}

/**
 * Reading time from the guide's own words, rounded up to whole minutes at
 * 200 wpm. Returns 0 when the guide has no body text, so no number is shown.
 */
export function readingMinutes(guide: TourismGuide, language: LanguageCode): number {
  const words = (guide.sections ?? [])
    .flatMap((section) => [
      localizeGuide(section.heading, language),
      ...section.body.map((paragraph) => localizeGuide(paragraph, language)),
      ...(section.list ?? []).map((item) => localizeGuide(item, language)),
      section.notice ? localizeGuide(section.notice, language) : "",
    ])
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return words === 0 ? 0 : Math.max(1, Math.round(words / 200));
}
