import type { BusinessCategory, LanguageCode, LocalBusiness, LocalizedText } from "./locales/types";

// Public Google Form through which a business owner submits a listing.
// Submissions are NEVER published automatically — an administrator reviews each
// one and adds it to `businessData` below. Leave empty to fall back to the
// email/phone contact block in the "add your business" section.
export const ADD_BUSINESS_FORM_URL = "";

// Contact shown when no submission form is configured.
export const ADD_BUSINESS_EMAIL = "aglen@lukovit.bg";
export const ADD_BUSINESS_PHONE = "0899 136110";

// ─────────────────────────────────────────────────────────────
// The businesses of Aglen. This file is the single source of truth: there is no
// CMS and no database. To publish a listing, add an object here with
// `status: "published"` and commit — the build regenerates the listing page, the
// detail page and the sitemaps.
//
// Rules that the page relies on:
//   • only `status: "published"` entries are ever rendered;
//   • `verified: true` is set ONLY after an administrator has checked the listing;
//   • omit any field you do not have — cards and detail pages hide missing data
//     rather than showing placeholders;
//   • never add contact details the business has not agreed to publish.
//
// Template — copy, fill in, delete the fields you do not have:
//
// {
//   id: "melarnika-aglen",
//   slug: "melarnika-aglen",
//   name: "Пчеларник „Ъглен“",
//   category: "producers",
//   shortDescription: { bg: "Пчелен мед от липа и слънчоглед.", en: "Linden and sunflower honey." },
//   description: { bg: "…", en: "…" },
//   coverImage: "/assets/local-businesses/melarnika-cover.jpg",
//   coverImageAlt: { bg: "…", en: "…" },
//   phone: "+359 …",
//   address: "ул. …, с. Ъглен",
//   latitude: 43.19, longitude: 24.13,
//   openingHours: { 1: [{ open: "09:00", close: "17:00" }], 6: [{ open: "09:00", close: "13:00" }] },
//   products: [{ bg: "Липов мед", en: "Linden honey" }],
//   delivery: true, pickup: true, seasonal: false,
//   status: "published", verified: false, featured: false,
//   lastUpdated: "2026-07-24",
// }
// ─────────────────────────────────────────────────────────────
const businessData: LocalBusiness[] = [
  {
    // Category, products and images come from the photos supplied by the site
    // owner; the Facebook link is the profile they pointed to. Still to confirm
    // with the owner: the trading name shown here, plus phone, address, opening
    // hours and whether delivery/pickup is offered — none of which are guessed.
    id: "chervenokosata-eli",
    slug: "chervenokosata-eli",
    name: "Червенокосата Ели",
    category: "crafts",
    shortDescription: {
      bg: "Ръчно плетени на една кука чанти и аксесоари.",
      en: "Hand-crocheted bags and accessories.",
    },
    description: {
      bg: "Чанти и аксесоари, изплетени на една кука — всяко изделие е ръчна изработка в единичен екземпляр. Моделите се сменят според сезона и наличната прежда.",
      en: "Bags and accessories made by hand with a crochet hook — every piece is a one-off. The range changes with the season and the yarn at hand.",
    },
    coverImage: "/assets/local-businesses/chervenokosata-eli-green-bamboo-bag.jpg",
    coverImageAlt: {
      bg: "Ръчно плетена на една кука зелена чанта с бамбукови дръжки",
      en: "Hand-crocheted green bag with bamboo handles",
    },
    gallery: [
      {
        src: "/assets/local-businesses/chervenokosata-eli-blue-tote.jpg",
        alt: { bg: "Плетени чанти в сини и светлосини нюанси", en: "Crocheted bags in blue and pale blue" },
      },
      {
        src: "/assets/local-businesses/chervenokosata-eli-beige-bow-bag.jpg",
        alt: { bg: "Бежова плетена чанта с панделка", en: "Beige crocheted bag with a bow" },
      },
      {
        src: "/assets/local-businesses/chervenokosata-eli-black-shoulder-bag.jpg",
        alt: { bg: "Черна плетена чанта за рамо с плетено цвете", en: "Black crocheted shoulder bag with a crocheted flower" },
      },
      {
        src: "/assets/local-businesses/chervenokosata-eli-white-bucket-bag.jpg",
        alt: { bg: "Бяла плетена чанта тип торба с връзки", en: "White crocheted bucket bag with drawstrings" },
      },
      {
        src: "/assets/local-businesses/chervenokosata-eli-flower-earrings.jpg",
        alt: { bg: "Плетени обеци във формата на цвете", en: "Crocheted flower-shaped earrings" },
      },
    ],
    socialLinks: { facebook: "https://www.facebook.com/chervenokosataeli" },
    products: [
      { bg: "Плетени чанти за рамо", en: "Crocheted shoulder bags" },
      { bg: "Плетени чанти тип торба", en: "Crocheted bucket bags" },
      { bg: "Плетени чанти с бамбукови дръжки", en: "Crocheted bags with bamboo handles" },
      { bg: "Плетени обеци", en: "Crocheted earrings" },
    ],
    status: "published",
    verified: false,
    featured: true,
    lastUpdated: "2026-07-24",
  },
  {
    // Address, phone and facilities cross-checked against opoznai.bg and other
    // public listings for the complex. Not yet confirmed with the owner, so
    // `verified` stays false. Photos and opening hours still to come.
    id: "hotel-iglen",
    slug: "hotelski-kompleks-iglen",
    name: "Хотелски комплекс „Иглен“",
    category: "stay",
    shortDescription: {
      bg: "Хотелски комплекс с ресторант, външен бар и басейн в центъра на Ъглен.",
      en: "Hotel complex with a restaurant, outdoor bar and pool in the centre of Aglen.",
    },
    description: {
      bg: "Комплексът разполага с два апартамента и седем стаи, ресторант, външен бар, открит басейн и детски басейн, лятна градина и тераса. На място има и хранителен магазин, интернет и паркинг.",
      en: "The complex has two apartments and seven rooms, a restaurant, an outdoor bar, an open-air pool and a children's pool, a summer garden and a terrace. There is also a food shop, internet and parking on site.",
    },
    phone: "0882 299 172",
    address: "ул. Освобождение 19, с. Ъглен",
    services: [
      { bg: "Нощувки в стаи и апартаменти", en: "Rooms and apartments" },
      { bg: "Ресторант", en: "Restaurant" },
      { bg: "Външен бар", en: "Outdoor bar" },
      { bg: "Открит басейн и детски басейн", en: "Outdoor pool and children's pool" },
      { bg: "Лятна градина и тераса", en: "Summer garden and terrace" },
      { bg: "Хранителен магазин", en: "Food shop" },
    ],
    bookingRequired: true,
    status: "published",
    verified: false,
    featured: true,
    lastUpdated: "2026-07-24",
  },
  {
    // From the company's own site, iglen.eu. They publish a phone number but no
    // address or working hours, so none are listed here.
    id: "mesokombinat-iglen",
    slug: "mesokombinat-iglen",
    name: "Месокомбинат „Иглен“",
    category: "producers",
    shortDescription: {
      bg: "Месни продукти, маринати и мляно месо от местен месокомбинат.",
      en: "Meat products, marinades and minced meat from a local meat processing plant.",
    },
    description: {
      bg: "Месокомбинатът работи от март 2013 г. и произвежда продукти от пилешко, свинско и телешко месо, както и маринати и разфасовки от мляно месо. Рецептите са разработени от европейски хранителни технолози.",
      en: "Operating since March 2013, the plant produces chicken, pork and beef products, as well as marinades and minced-meat preparations. The recipes were developed by European food technologists.",
    },
    phone: "0884 558 223",
    website: "https://iglen.eu/",
    products: [
      { bg: "Продукти от пилешко месо", en: "Chicken products" },
      { bg: "Продукти от свинско месо", en: "Pork products" },
      { bg: "Продукти от телешко месо", en: "Beef products" },
      { bg: "Маринати", en: "Marinades" },
      { bg: "Мляно месо", en: "Minced meat" },
    ],
    status: "published",
    verified: false,
    featured: false,
    lastUpdated: "2026-07-24",
  },
  {
    // From the company's own site, finishart.bg. NOTE: this business is based in
    // Sofia, not in Ъглен — `locality` keeps the address honest in the listing
    // and in the structured data. If it turns out they specifically cover the
    // village, say so in `description` rather than changing the address.
    id: "finishart",
    slug: "finishart",
    name: "FinishArt",
    category: "services",
    shortDescription: {
      bg: "Боядисване и шпакловка на жилища, с гаранция до 24 месеца.",
      en: "Painting and plastering for homes, with a warranty of up to 24 months.",
    },
    description: {
      bg: "Фирмата работи от 2018 г. и предлага боядисване, шпакловка и основен ремонт на жилища. Цените са от 8 до 22 евро на кв. м според състоянието на стените, с гаранция до 24 месеца. Базирана е в София.",
      en: "Working since 2018, the company offers painting, plastering and basic home renovation. Prices run from 8 to 22 euro per square metre depending on the condition of the walls, with a warranty of up to 24 months. It is based in Sofia.",
    },
    phone: "0882 820025",
    email: "alex.finishart@gmail.com",
    website: "https://www.finishart.bg/",
    socialLinks: { facebook: "https://www.facebook.com/profile.php?id=61577536868457" },
    address: "бул. Янко Сакъзов 17, гр. София",
    locality: "София",
    services: [
      { bg: "Боядисване на жилища", en: "House painting" },
      { bg: "Шпакловка", en: "Plastering" },
      { bg: "Основен ремонт", en: "Basic renovation" },
    ],
    bookingRequired: true,
    status: "published",
    verified: false,
    featured: false,
    lastUpdated: "2026-07-24",
  },
  {
    // A content creator rather than a shop or a service, so no products,
    // services, address or opening hours are listed. The description states only
    // what is publicly verifiable from the Facebook page and the YouTube channel.
    id: "scotsman-in-bulgaria",
    slug: "scotsman-in-bulgaria",
    name: "Scotsman in Bulgaria",
    category: "other",
    shortDescription: {
      bg: "Шотландец, който снима видеа за живота в българското село и за района.",
      en: "A Scotsman filming everyday life in a Bulgarian village and the region around it.",
    },
    description: {
      bg: "Преместил се от Единбург преди няколко години, той живее в село в Ловешка област и разказва във видеата си за ежедневието на село, за хората и за красотата на района. Публикува във Facebook и в YouTube.",
      en: "Having moved from Edinburgh a few years ago, he lives in a village in Lovech province and films everyday village life, the people and the beauty of the region. He posts on Facebook and YouTube.",
    },
    website: "https://www.youtube.com/@ScotsmanInBulgaria",
    socialLinks: { facebook: "https://www.facebook.com/profile.php?id=100087489799107" },
    status: "published",
    verified: false,
    featured: false,
    lastUpdated: "2026-07-24",
  },
];

// Sample entries rendered only on a local development host, so the layout can
// be reviewed before real listings exist. They are never part of the generated
// static pages or sitemaps, so no invented business can reach the live site.
const devPreviewData: LocalBusiness[] = [
  {
    id: "preview-producer",
    slug: "primer-mesten-proizvoditel",
    name: "ПРИМЕР · Местен производител",
    category: "producers",
    shortDescription: {
      bg: "Примерен запис — вижда се само в режим на разработка.",
      en: "Sample entry — visible in development mode only.",
    },
    description: {
      bg: "Този запис съществува само за да се прегледа оформлението на страницата, преди да бъдат добавени истинските местни бизнеси. Не се публикува.",
      en: "This entry exists only so the page layout can be reviewed before the real local businesses are added. It is never published.",
    },
    coverImage: "/assets/aglen-village-church.png",
    address: "с. Ъглен",
    products: [
      { bg: "Пример за продукт", en: "Sample product" },
      { bg: "Пример за продукт", en: "Sample product" },
    ],
    openingHours: { 1: [{ open: "09:00", close: "17:00" }], 6: [{ open: "09:00", close: "13:00" }] },
    delivery: true,
    pickup: true,
    status: "published",
    verified: false,
    featured: true,
    lastUpdated: "2026-07-24",
  },
  {
    id: "preview-food",
    slug: "primer-hrana-i-napitki",
    name: "ПРИМЕР · Механа",
    category: "food",
    shortDescription: {
      bg: "Примерен запис — вижда се само в режим на разработка.",
      en: "Sample entry — visible in development mode only.",
    },
    coverImage: "/assets/aglen-vit-river-sunset.png",
    address: "с. Ъглен",
    seasonal: true,
    status: "published",
    verified: false,
    featured: false,
  },
];

// No `window` during static generation, and a real hostname in production —
// both cases fall through to the real data only.
function isLocalPreviewHost(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1" || host === "[::1]" || host.endsWith(".local");
}

function allBusinesses(): LocalBusiness[] {
  return isLocalPreviewHost() ? [...businessData, ...devPreviewData] : businessData;
}

export const categoryOrder: BusinessCategory[] = [
  "food",
  "shops",
  "producers",
  "stay",
  "crafts",
  "services",
  "farming",
  "other",
];

/** Listings that may be shown publicly, ordered featured-first then by name. */
export function publishedBusinesses(): LocalBusiness[] {
  return allBusinesses()
    .filter((business) => business.status === "published" || business.status === "temporarily_closed")
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name, "bg"));
}

export function findBusiness(slug: string): LocalBusiness | undefined {
  return publishedBusinesses().find((business) => business.slug === slug);
}

/** Only the categories that actually hold a listing — no decorative filters. */
export function activeCategories(): BusinessCategory[] {
  const present = new Set(publishedBusinesses().map((business) => business.category));
  return categoryOrder.filter((category) => present.has(category));
}

export function featuredBusinesses(): LocalBusiness[] {
  return publishedBusinesses().filter((business) => business.featured).slice(0, 3);
}

/** Businesses that told a story we may quote — never invented. */
export function businessStories(): LocalBusiness[] {
  return publishedBusinesses().filter((business) => business.story);
}

/** Every listed product, linked back to the producer that offers it. */
export function localProducts(language: LanguageCode): { label: string; business: LocalBusiness }[] {
  return publishedBusinesses().flatMap((business) =>
    (business.products ?? []).map((product) => ({ label: localizeText(product, language), business })),
  );
}

export function localizeText(text: LocalizedText, language: LanguageCode): string {
  return text[language] ?? text.en ?? text.bg;
}

/** Google Maps link for a business, by coordinates when known, else by address. */
export function mapUrl(business: LocalBusiness): string | undefined {
  if (business.latitude !== undefined && business.longitude !== undefined) {
    return `https://www.google.com/maps/search/?api=1&query=${business.latitude},${business.longitude}`;
  }
  if (business.address) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.address}, Bulgaria`)}`;
  }
  return undefined;
}

const WEEKDAYS = [1, 2, 3, 4, 5, 6, 7] as const;

/** True only when opening hours were supplied and the business is open now. */
export function isOpenNow(business: LocalBusiness, now = new Date()): boolean {
  const hours = business.openingHours;
  if (!hours || business.status === "temporarily_closed") return false;
  const weekday = (now.getDay() === 0 ? 7 : now.getDay()) as (typeof WEEKDAYS)[number];
  const minutes = now.getHours() * 60 + now.getMinutes();
  return (hours[weekday] ?? []).some((slot) => toMinutes(slot.open) <= minutes && minutes < toMinutes(slot.close));
}

/** Whether "open now" filtering can be offered at all for the current data. */
export function hasOpeningHours(): boolean {
  return publishedBusinesses().some((business) => business.openingHours);
}

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

export { WEEKDAYS };
