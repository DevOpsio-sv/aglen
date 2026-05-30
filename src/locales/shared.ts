import type { Accommodation, LanguageCode } from "./types";

export const languages: { code: LanguageCode; label: string; short: string }[] = [
  { code: "bg", label: "Български", short: "BG" },
  { code: "en", label: "English", short: "EN" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "ru", label: "Русский", short: "RU" },
  { code: "ja", label: "日本語", short: "JA" },
  { code: "es", label: "Español", short: "ES" },
];

export const images = {
  hero: "/assets/aglen-hero-river-canyon.png",
  arch: "/assets/aglen-rock-arch.png",
  cave: "/assets/aglen-cave-mystery.png",
  aerial: "/assets/aglen-aerial-river.png",
  pool: "/assets/aglen-river-pool.png",
  church: "/assets/aglen-village-church.png",
  kaleto: "/assets/aglen-kaleto-ruins.png",
};

export const prices = ["€26", "€41", "€10", "€61", "€20", "€36"];

export const accommodationBg: Accommodation[] = [
  { title: "Стаи за гости", type: "Настаняване в село", description: "Тихо настаняване в местен дом, близо до природата и реката.", image: images.church },
  { title: "Лагерен терен", type: "Кемпинг", description: "Открито пространство за палатки с достъп до река Вит и природните маршрути.", image: images.aerial },
  { title: "Планинска вила", type: "Вила", description: "Уединена вила с гледка към каньона, подходяща за малки групи и уикенд бягства.", image: images.pool },
];

export const accommodationEn: Accommodation[] = [
  { title: "Guest Rooms", type: "Village stay", description: "Quiet rooms in a local home, close to nature and the river.", image: images.church },
  { title: "Campsite", type: "Camping", description: "Open space for tents with access to the Vit River and natural trails.", image: images.aerial },
  { title: "Mountain Villa", type: "Villa", description: "Secluded villa with canyon views, ideal for small groups and weekend escapes.", image: images.pool },
];
