import type { LanguageCode, LocalizedText } from "./locales/types";

// ─────────────────────────────────────────────────────────────
// The Lukovit karst region, as an entity graph.
//
// Every entry names a real, externally documented place and carries its Wikidata
// id, its Wikipedia articles and the coordinates Wikidata publishes. That is the
// point of this file: it lets the site emit schema.org `sameAs` links to the
// entities Google already knows, instead of asserting unconnected place names —
// and it gives the internal-linking layer one list to work from.
//
// Coordinates and identifiers were read from the Wikidata API (wbgetentities,
// property P625) on 2026-07-24. Nothing here is estimated.
//
// Straight-line distances are DERIVED from those coordinates at runtime and are
// labelled as such in the UI. Driving distances and travel times are deliberately
// absent: the project has no verified source for them, and the same rule that
// governs guides.ts applies here.
// ─────────────────────────────────────────────────────────────

export type RegionPlaceKind = "village" | "town" | "cave" | "river" | "waterfall" | "geopark" | "province";

export type RegionPlace = {
  id: string;
  /** Untranslated name per language where a real exonym exists. */
  name: LocalizedText;
  kind: RegionPlaceKind;
  /** schema.org type that matches what the place actually is. */
  schemaType: string;
  latitude?: number;
  longitude?: number;
  wikidata?: string;
  wikipedia?: { bg?: string; en?: string };
  /**
   * A river or a trail is a line, not a point: Wikidata's single coordinate for
   * the Vit is its mouth, so "31 km from Aglen" would be nonsense for a river
   * that runs past the village. No distance is derived for these.
   */
  linear?: boolean;
  /** Short, factual note. Not marketing copy. */
  note: LocalizedText;
  /** Landing page or guide that covers this place on this site, if any. */
  routeId?: string;
  guideSlug?: string;
};

/** Aglen itself, from Wikidata Q550547. */
export const AGLEN = {
  latitude: 43.201151,
  longitude: 24.314943,
  wikidata: "Q550547",
  wikipedia: { bg: "Ъглен", en: "Aglen, Bulgaria" },
  postalCode: "5791",
} as const;

export const LOVECH_PROVINCE: RegionPlace = {
  id: "lovech-province",
  name: { bg: "Област Ловеч", en: "Lovech Province" },
  kind: "province",
  schemaType: "AdministrativeArea",
  wikidata: "Q6587068",
  wikipedia: { bg: "Ловеч (област)", en: "Lovech Province" },
  note: {
    bg: "Административната област, в която се намира Ъглен, заедно с Луковит, Ловеч и Деветашкото плато.",
    en: "The administrative province that contains Aglen, along with Lukovit, Lovech and the Devetaki plateau.",
  },
  routeId: "lovechRegionGuide",
};

export const regionPlaces: RegionPlace[] = [
  {
    id: "prohodna",
    name: { bg: "Пещера Проходна (Очите на Бога)", en: "Prohodna Cave (The Eyes of God)" },
    kind: "cave",
    schemaType: "TouristAttraction",
    latitude: 43.1758,
    longitude: 24.0731,
    wikidata: "Q3657889",
    wikipedia: { bg: "Проходна", en: "Prohodna" },
    note: {
      bg: "Проходна пещера край Карлуково, известна с двата отвора в свода си, наричани Очите на Бога.",
      en: "A through-cave near Karlukovo, known for the two openings in its roof called the Eyes of God.",
    },
    routeId: "karlukovoGuide",
    guideSlug: "caves-and-rocks",
  },
  {
    id: "karlukovo",
    name: { bg: "Карлуково", en: "Karlukovo" },
    kind: "village",
    schemaType: "Place",
    latitude: 43.163665,
    longitude: 24.067091,
    wikidata: "Q1085214",
    wikipedia: { bg: "Карлуково", en: "Karlukovo" },
    note: {
      bg: "Село в община Луковит, център на карстовия район с пещери, скални венци и Проходна.",
      en: "A village in Lukovit municipality at the centre of the karst area of caves, cliffs and Prohodna.",
    },
    routeId: "karlukovoGuide",
  },
  {
    id: "lukovit",
    name: { bg: "Луковит", en: "Lukovit" },
    kind: "town",
    schemaType: "City",
    latitude: 43.210186,
    longitude: 24.16294,
    wikidata: "Q405585",
    wikipedia: { bg: "Луковит", en: "Lukovit" },
    note: {
      bg: "Общинският център, към който принадлежи Ъглен, и най-близкият град с магазини, транспорт и услуги.",
      en: "The municipal centre Aglen belongs to, and the nearest town for shops, transport and services.",
    },
    routeId: "lukovitGuide",
  },
  {
    id: "iskar-panega",
    name: { bg: "Геопарк Искър–Панега", en: "Iskar–Panega Geopark" },
    kind: "geopark",
    schemaType: "TouristAttraction",
    linear: true,
    // The geopark follows the Zlatna Panega river; no single coordinate is
    // published for it, so none is asserted here.
    note: {
      bg: "Екопътека по течението на река Златна Панега между Златна Панега и Луковит, с извори, мостчета и карстови форми.",
      en: "An eco trail along the Zlatna Panega river between Zlatna Panega and Lukovit, with springs, footbridges and karst formations.",
    },
    routeId: "iskarPanegaGuide",
  },
  {
    id: "zlatna-panega",
    name: { bg: "Златна Панега", en: "Zlatna Panega" },
    kind: "village",
    schemaType: "Place",
    latitude: 43.091772,
    longitude: 24.150571,
    wikidata: "Q2455820",
    wikipedia: { bg: "Златна Панега", en: "Zlatna Panega (village)" },
    note: {
      bg: "Село в община Ябланица, при карстовия извор, който дава началото на река Златна Панега.",
      en: "A village in Yablanitsa municipality at the karst spring that gives rise to the Zlatna Panega river.",
    },
    routeId: "iskarPanegaGuide",
  },
  {
    id: "vit-river",
    name: { bg: "Река Вит", en: "The Vit River" },
    kind: "river",
    schemaType: "BodyOfWater",
    linear: true,
    latitude: 42.936632,
    longitude: 24.206375,
    wikidata: "Q1773449",
    wikipedia: { bg: "Вит", en: "Vit (river)" },
    note: {
      bg: "Реката, която минава край Ъглен и оформя вировете, бреговете и каньонните гледки в района.",
      en: "The river that passes Aglen and shapes the pools, banks and canyon views around it.",
    },
    guideSlug: "vit-river",
  },
  {
    id: "devetashka",
    name: { bg: "Деветашка пещера", en: "Devetashka Cave" },
    kind: "cave",
    schemaType: "TouristAttraction",
    latitude: 43.232944,
    longitude: 24.886861,
    wikidata: "Q2756370",
    wikipedia: { bg: "Деветашка пещера", en: "Devetashka Cave" },
    note: {
      bg: "Една от най-големите пещери в България, на Деветашкото плато край Ловеч.",
      en: "One of the largest caves in Bulgaria, on the Devetaki plateau near Lovech.",
    },
    routeId: "devetashkaCaveGuide",
  },
  {
    id: "krushuna",
    name: { bg: "Крушунски водопади", en: "Krushuna Falls" },
    kind: "waterfall",
    schemaType: "TouristAttraction",
    latitude: 43.243056,
    longitude: 25.033333,
    wikidata: "Q6439432",
    wikipedia: { bg: "Крушунска бигорна каскада", en: "Krushuna Falls" },
    note: {
      bg: "Бигорна каскада край село Крушуна, най-посещаваната водна атракция в Ловешка област.",
      en: "A travertine cascade near the village of Krushuna, the most visited water attraction in Lovech Province.",
    },
    routeId: "krushunaGuide",
  },
  {
    id: "lovech",
    name: { bg: "Ловеч", en: "Lovech" },
    kind: "town",
    schemaType: "City",
    latitude: 43.134777,
    longitude: 24.711535,
    wikidata: "Q189328",
    wikipedia: { bg: "Ловеч", en: "Lovech" },
    note: {
      bg: "Областният център с Покрития мост и Вароша, отправна точка за Деветашкото плато и Крушуна.",
      en: "The provincial capital with its Covered Bridge and Varosha quarter, the gateway to the Devetaki plateau and Krushuna.",
    },
    routeId: "lovechRegionGuide",
  },
];

export const regionPlaceById = new Map(regionPlaces.map((place) => [place.id, place]));

/** Localized name, falling back through English to Bulgarian. */
export function regionName(place: RegionPlace, language: LanguageCode): string {
  return place.name[language] ?? place.name.en ?? place.name.bg ?? place.id;
}

export function regionNote(place: RegionPlace, language: LanguageCode): string {
  return place.note[language] ?? place.note.en ?? place.note.bg ?? "";
}

/** Every external identifier for a place, for schema.org `sameAs`. */
export function sameAsUrls(place: Pick<RegionPlace, "wikidata" | "wikipedia">): string[] {
  return [
    place.wikidata ? `https://www.wikidata.org/wiki/${place.wikidata}` : "",
    place.wikipedia?.bg ? `https://bg.wikipedia.org/wiki/${encodeURIComponent(place.wikipedia.bg.replace(/ /g, "_"))}` : "",
    place.wikipedia?.en ? `https://en.wikipedia.org/wiki/${encodeURIComponent(place.wikipedia.en.replace(/ /g, "_"))}` : "",
  ].filter(Boolean);
}

const EARTH_RADIUS_KM = 6371;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Great-circle distance in km. Straight line, NOT road distance — every caller
 * has to label it that way, because the roads here follow the river valleys and
 * the driving distance is always longer.
 */
export function straightLineKm(
  from: { latitude: number; longitude: number },
  to: { latitude: number; longitude: number },
): number {
  const dLat = toRadians(to.latitude - from.latitude);
  const dLon = toRadians(to.longitude - from.longitude);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(from.latitude)) * Math.cos(toRadians(to.latitude)) * Math.sin(dLon / 2) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.asin(Math.sqrt(a));
}

/** Straight-line distance from Aglen, rounded to the nearest km. */
export function distanceFromAglenKm(place: RegionPlace): number | undefined {
  if (place.linear || place.latitude === undefined || place.longitude === undefined) return undefined;
  return Math.round(straightLineKm(AGLEN, { latitude: place.latitude, longitude: place.longitude }));
}
