import type { LanguageCode, LocalizedText } from "../locales/types";

// ─────────────────────────────────────────────────────────────
// Localized text, in one place (M5, Part 11).
//
// Four modules held their own private copy of the same six-line `pick()` and two
// held their own `isLocalizedText()`. They agreed, which is exactly the problem:
// nothing forced them to, and the day one of them started falling back to `bg`
// before `en` the graph, the ledger, the JSON-LD and the audit would have quietly
// disagreed about what a page says. The knowledge tier is bg + en (Constitution
// rule 43) and every other language falls back through en to bg — one rule, one
// implementation, imported everywhere.
//
// The normalisation half of this file exists for the derived search index (M5,
// Part 6). It is here rather than in `search.ts` because the same folding is what
// makes an alias collision detectable at build time: "Проходна", "Prohodna" and
// "prohodna" must fold to the same key for the audit to see them as one name.
// ─────────────────────────────────────────────────────────────

/** The one fallback chain: the asked-for language, then English, then Bulgarian. */
export function pick(text: LocalizedText, lang: LanguageCode): string {
  return text[lang] ?? text.en ?? text.bg;
}

/** The one shape test: an object carrying at least the Bulgarian source string. */
export function isLocalizedText(value: unknown): value is LocalizedText {
  return Boolean(value) && typeof value === "object" && typeof (value as { bg?: unknown }).bg === "string";
}

/** Every string a localized value holds, in no particular order. For indexing. */
export function localizedValues(text: LocalizedText | undefined): string[] {
  if (!text) return [];
  return Object.values(text).filter((value): value is string => typeof value === "string" && value.trim().length > 0);
}

// ── Search normalisation ─────────────────────────────────────
// A visitor typing "prohodna", "Проходна", "Prohodná" or "PROHODNA" is asking one
// question. Without folding, a static index answers three of the four with
// nothing — and the fourth only if they happened to pick the right script. The
// site publishes Bulgarian names to a fourteen-language audience, so the script
// boundary is the common case here, not an edge case.

/**
 * Bulgarian Cyrillic → Latin, in the official transliteration (Закон за
 * транслитерацията, 2009): "щ"→"sht", "ъ"→"a", "ю"→"yu", "я"→"ya". The village's
 * own name is the reason the "ъ"→"a" row matters: "Ъглен" transliterates to
 * "Aglen", which is the Latin name the site already publishes under.
 */
const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ж: "zh", з: "z", и: "i",
  й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s",
  т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sht",
  ъ: "a", ь: "y", ю: "yu", я: "ya",
};

/** Bulgarian Cyrillic transliterated to Latin. Non-Cyrillic passes through. */
export function transliterate(value: string): string {
  let out = "";
  for (const char of value.toLowerCase()) out += CYRILLIC_TO_LATIN[char] ?? char;
  return out;
}

/**
 * The index key of a string: lower-cased, diacritics stripped, transliterated,
 * punctuation reduced to single spaces. Two strings sharing a key are the same
 * name as far as search — and as far as the duplicate-alias gate — is concerned.
 */
export function searchKey(value: string): string {
  return transliterate(value)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** The distinct words of a string, folded. Empty for a string of punctuation. */
export function searchTokens(value: string): string[] {
  const key = searchKey(value);
  return key ? [...new Set(key.split(" "))] : [];
}
