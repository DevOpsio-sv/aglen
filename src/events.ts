import type { EventItem, LanguageCode, LocalizedText } from "./locales/types";
import { childrenPhotoContestDetails } from "./eventDetails";

// Public Google Form for the children's photography contest.
// (This is a temporary link — the contest page will be refined later.)
// To change it, replace this URL (Send button in the form → copy link).
export const CHILDREN_PHOTO_CONTEST_URL = "https://forms.gle/Tkmgx1tr2NLgCALRA";

// Events shown on the /events page.
// Add a new event by copying one of the objects below.
// `title` / `description` (and optional `ctaLabel`) are localized: `bg` is required,
// other languages are optional and fall back to English, then Bulgarian.
export const eventsData: EventItem[] = [
  {
    id: "panair-aglen-2026",
    startDate: "2026-08-28",
    dateLabel: "28 август 2026",
    location: "Ъглен",
    admission: "free",
    category: "traditions",
    season: "summer",
    image: "/assets/aglen-village-church.png",
    imageAlt: "Село Ъглен по време на традиционния събор",
    title: {
      bg: "Панаир на село Ъглен",
      en: "Aglen Village Fair",
    },
    description: {
      bg: "Традиционният събор на село Ъглен — ден на музика, местни вкусове и обща веселба. Заповядайте на 28 август.",
      en: "The traditional village fair of Aglen — a day of music, local food and community celebration. Join us on 28 August.",
    },
    gallery: [
      "/assets/aglen-village-church.png",
      "/assets/aglen-vit-river-sunset.png",
      "/assets/aglen-river-pool.png",
    ],
  },
  {
    id: "detski-fotokonkurs-2026",
    startDate: "2026-08-20",
    endDate: "2026-08-28",
    dateLabel: "20 – 28 август 2026",
    location: "зала Ъглен",
    admission: "free",
    category: "contest",
    season: "summer",
    image: "/assets/aglen-photo-contest-poster-card.jpg",
    poster: "/assets/aglen-photo-contest-poster.jpg",
    imageAlt: "Плакат на детския фотографски конкурс в село Ъглен — снимки до 20 август, награждаване на 28 август 2026",
    title: {
      bg: "Детски фотографски конкурс",
      en: "Children's Photography Contest",
    },
    description: {
      bg: "Твори и открий природата! Изпрати снимките си до 20 август на aglen@lukovit.bg или тук на сайта. Изложба с всички фотографии ще има от 20 до 28 август, в зала Ъглен, с награждаване на 28 август от 19:30 ч. по време на традиционния панаир. Голямата награда е семеен билет за „Музея на илюзиите“ в гр. София.",
      en: "Create and discover nature! Send your photos by 20 August to aglen@lukovit.bg or here on the site. An exhibition of all the photographs will be held from 20 to 28 August in the Aglen hall, with the award ceremony on 28 August at 19:30 during the traditional village fair. The grand prize is a family ticket to the Museum of Illusions in Sofia.",
    },
    ctaLabel: {
      bg: "Участвай в конкурса",
      en: "Enter the contest",
    },
    ctaUrl: CHILDREN_PHOTO_CONTEST_URL,
    details: childrenPhotoContestDetails,
  },
];

// Curated archive photos for the "Memories from past years" section on /events.
const M = "/assets/old-memories";
export const memoriesGallery: { src: string; title: LocalizedText }[] = [
  { src: `${M}/475440464_1945932552562093_8748014776426598727_n.jpg`, title: { bg: "Лазаруване напролет", en: "Lazaruvane in spring" } },
  { src: `${M}/494135838_4274657496088729_4809060633886247319_n.jpg`, title: { bg: "Народни песни", en: "Folk songs" } },
  { src: `${M}/494169328_4274657789422033_4468865820243846033_n.jpg`, title: { bg: "Народни танци", en: "Folk dances" } },
  { src: `${M}/495446491_4285609648326847_2316341041799772376_n.jpg`, title: { bg: "Възстановка на историята", en: "Historical reenactment" } },
  { src: `${M}/496428518_4285609811660164_2117929537604141280_n.jpg`, title: { bg: "Живата традиция", en: "Living tradition" } },
  { src: `${M}/496193949_4285609634993515_5924344110698771412_n.jpg`, title: { bg: "Децата на Ъглен", en: "The children of Aglen" } },
  { src: `${M}/671225006_10233855959523964_2866830724554504561_n.jpg`, title: { bg: "Конно надбягване", en: "Horse race" } },
  { src: `${M}/672150924_10233855919882973_150324188813194029_n.jpg`, title: { bg: "Празнично посрещане с питка", en: "Festive welcome with ritual bread" } },
  { src: `${M}/516693342_3218789041619577_8970499632648754389_n.jpg`, title: { bg: "Ъглен край река Вит", en: "Aglen by the Vit River" } },
];

export function localize(text: LocalizedText, language: LanguageCode): string {
  return text[language] ?? text.en ?? text.bg;
}

// Upcoming events first, sorted by start date.
export function sortedEvents(): EventItem[] {
  return [...eventsData].sort((a, b) => a.startDate.localeCompare(b.startDate));
}
