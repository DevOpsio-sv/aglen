import type { Accommodation, LanguageCode } from "./types";

export const languages: { code: LanguageCode; label: string; short: string }[] = [
  { code: "bg", label: "Български", short: "BG" },
  { code: "en", label: "English", short: "EN" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "es", label: "Español", short: "ES" },
  { code: "it", label: "Italiano", short: "IT" },
  { code: "ro", label: "Română", short: "RO" },
  { code: "tr", label: "Türkçe", short: "TR" },
  { code: "el", label: "Ελληνικά", short: "EL" },
  { code: "ru", label: "Русский", short: "RU" },
  { code: "ja", label: "日本語", short: "JA" },
  { code: "sr", label: "Српски", short: "SR" },
  { code: "zh", label: "中文", short: "ZH" },
  { code: "hu", label: "Magyar", short: "HU" },
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

export const negotiablePrice: Record<LanguageCode, string> = {
  bg: "По договаряне",
  en: "By arrangement",
  de: "Nach Vereinbarung",
  fr: "À convenir",
  es: "A convenir",
  it: "Da concordare",
  ro: "La cerere",
  tr: "Anlaşmaya göre",
  el: "Κατόπιν συνεννόησης",
  ru: "По договорённости",
  ja: "応相談",
  sr: "По договору",
  zh: "可协商",
  hu: "Megegyezés szerint",
};

export const accommodationBg: Accommodation[] = [
  { title: "Стаи за гости", type: "Настаняване в село", description: "Тихо настаняване в местен дом, близо до природата и реката.", image: images.church },
  { title: "Лагерен терен", type: "Къмпинг", description: "Открито пространство за палатки с достъп до река Вит и природните маршрути.", image: images.aerial },
  { title: "Планинска вила", type: "Вила", description: "Уединена вила с гледка към каньона, подходяща за малки групи и уикенд бягства.", image: images.pool },
];

export const accommodationEn: Accommodation[] = [
  { title: "Guest Rooms", type: "Village stay", description: "Quiet rooms in a local home, close to nature and the river.", image: images.church },
  { title: "Campsite", type: "Camping", description: "Open space for tents with access to the Vit River and natural trails.", image: images.aerial },
  { title: "Mountain Villa", type: "Villa", description: "Secluded villa with canyon views, ideal for small groups and weekend escapes.", image: images.pool },
];

export const accommodationSr: Accommodation[] = [
  { title: "Собе за госте", type: "Смештај у селу", description: "Миран смештај у локалном дому, близу природе и реке.", image: images.church },
  { title: "Простор за камповање", type: "Камп", description: "Отворен простор за шаторе са приступом реци Вит и природним рутама.", image: images.aerial },
  { title: "Планинска вила", type: "Вила", description: "Усамљена вила са погледом на кањон, погодна за мале групе и викенд бекства.", image: images.pool },
];
