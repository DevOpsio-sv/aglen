import type { LanguageCode } from "./types";

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
