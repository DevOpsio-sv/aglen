import type { LanguageCode, LocalizedText } from "../locales/types";
import type { ClaimAspect } from "./claims";

// ─────────────────────────────────────────────────────────────
// The chrome of the knowledge namespaces and the aspect pages (M4).
//
// A page title appears in four places — the visible <h1>, the <title>, the
// breadcrumb and the JSON-LD — and those four must never disagree
// (Constitution rule 33 in spirit: the rendering and the machine surface state
// the same thing). Holding the strings once, in a plain module with no React and
// no imports from `seo.ts`, is what makes that automatic instead of a discipline
// problem; it also keeps the render layer and the SEO layer free of an import
// cycle.
//
// The knowledge tier is bg + en (rule 43); other languages fall back to en.
// ─────────────────────────────────────────────────────────────

export type NamespaceKind = "history" | "legend" | "person";

export type NamespaceChrome = {
  /** The path prefix a published entity of this namespace carries. */
  prefix: string;
  eyebrow: LocalizedText;
  title: LocalizedText;
  lede: LocalizedText;
  /** An existing asset; no new media ships in M4 (ADR-012 is a later milestone). */
  hero: string;
};

export const NAMESPACE_CHROME: Record<NamespaceKind, NamespaceChrome> = {
  history: {
    prefix: "/history/",
    eyebrow: { bg: "Време", en: "Time" },
    title: { bg: "Историята на Ъглен и Луковитския карст", en: "The history of Aglen and the Lukovit Karst" },
    lede: {
      bg: "Хронология от варовиковото море до XX век. Всеки период е отделна страница със своите източници — и със своите празнини.",
      en: "A chronology from the limestone sea to the twentieth century. Each period is its own page with its own sources — and its own gaps.",
    },
    hero: "/assets/aglen-kaleto-ruins.png",
  },
  legend: {
    prefix: "/legend/",
    eyebrow: { bg: "Устно предание", en: "Oral tradition" },
    title: { bg: "Легендите на Ъглен", en: "The legends of Aglen" },
    lede: {
      bg: "Преданията от землището на селото, записани както се разказват. Твърдението тук е, че историята се разказва — не че описаното се е случило.",
      en: "The traditions of the village land, recorded as they are told. The claim here is that the story is told — not that what it describes happened.",
    },
    hero: "/assets/aglen-cave-mystery.png",
  },
  person: {
    prefix: "/person/",
    eyebrow: { bg: "Хора", en: "People" },
    title: { bg: "Хората на Ъглен", en: "The people of Aglen" },
    lede: {
      bg: "Хората, чиито живот е свързан със селото и които стоят в националната памет.",
      en: "The people whose lives are tied to the village and who stand in the national record.",
    },
    hero: "/assets/aglen-village-church.png",
  },
};

/**
 * The two provenance surfaces. They are not entity namespaces — nothing in the
 * world is "a corrections page" — so they carry their chrome directly.
 */
export const PROVENANCE_CHROME: Record<"sources" | "corrections", { eyebrow: LocalizedText; title: LocalizedText; lede: LocalizedText; hero: string }> = {
  sources: {
    eyebrow: { bg: "Прозрачност", en: "Transparency" },
    title: { bg: "Регистър на източниците", en: "The source ledger" },
    lede: {
      bg: "Всичко, което сайтът твърди, и това, на което всяко твърдение почива. Регистърът се генерира от данните — не се поддържа на ръка.",
      en: "Everything the site asserts, and what each assertion rests on. The ledger is generated from the data — it is not maintained by hand.",
    },
    hero: "/assets/aglen-village-church.png",
  },
  corrections: {
    eyebrow: { bg: "Прозрачност", en: "Transparency" },
    title: { bg: "Поправки", en: "Corrections" },
    lede: {
      bg: "Всяка поправка, с дата, с това какво е било сгрешено. Страницата се генерира от регистъра — поправка се публикува, като старото твърдение се замести, а не изтрие.",
      en: "Every correction, dated, with what was wrong. This page is generated from the ledger — a correction is published by superseding the old claim, never by deleting it.",
    },
    hero: "/assets/aglen-village-church.png",
  },
};

export type AspectChrome = { title: LocalizedText; lede: LocalizedText; crumb: LocalizedText };

/** Chrome for the depth-3 aspect pages that the ledger can earn. */
export const ASPECT_CHROME: Partial<Record<ClaimAspect, AspectChrome>> = {
  history: {
    title: { bg: "Историята на мястото", en: "The history of this place" },
    lede: {
      bg: "Хронологията пласт по пласт — какво е засвидетелствано, какво се предполага и къде свършва документираното.",
      en: "The chronology layer by layer — what is attested, what is inferred, and where the documented record stops.",
    },
    crumb: { bg: "История", en: "History" },
  },
  name: {
    title: { bg: "Името и произходът му", en: "The name and where it comes from" },
    lede: {
      bg: "Буквата „Ъ“, двете обяснения за произхода на името и това, което никой все още не е доказал.",
      en: "The letter “Ъ”, the two explanations of where the name comes from, and what nobody has yet proved.",
    },
    crumb: { bg: "Името", en: "The name" },
  },
};

export function localizeChrome(text: LocalizedText, lang: LanguageCode): string {
  return text[lang] ?? text.en ?? text.bg;
}

export function namespaceTitle(kind: NamespaceKind, lang: LanguageCode): string {
  return localizeChrome(NAMESPACE_CHROME[kind].title, lang);
}

export function aspectTitle(aspect: ClaimAspect, lang: LanguageCode): string {
  const chrome = ASPECT_CHROME[aspect];
  return chrome ? localizeChrome(chrome.title, lang) : aspect;
}

export function aspectLede(aspect: ClaimAspect, lang: LanguageCode): string {
  const chrome = ASPECT_CHROME[aspect];
  return chrome ? localizeChrome(chrome.lede, lang) : "";
}

export function aspectCrumb(aspect: ClaimAspect, lang: LanguageCode): string {
  const chrome = ASPECT_CHROME[aspect];
  return chrome ? localizeChrome(chrome.crumb, lang) : aspect;
}
