import type { LanguageCode, LocalizedText } from "../locales/types";
import type { EntityId } from "./schema";
import { claimStatement, claimsFor, disputesFor, claimsInDispute, sourcesOf, type Claim, type ClaimAspect } from "./ledger";
import { nameKeyIndex } from "./index";
import { searchKey } from "./text";

// ─────────────────────────────────────────────────────────────
// The editorial layer — the only place a record becomes prose.
//
// This module exists because of a defect, and the defect is worth stating plainly:
// the site rendered `Claim.confidence` onto the page. A visitor arriving at
// /bg/place/aglen/ read sentences ending in "[verified]" and "[uncertain]",
// followed by eleven statements about our own research method — which register we
// had not consulted, which measurement we had not taken, what we decline to
// publish. Every one of those was true. None of them was about Ъглен.
//
// The rule this establishes:
//
//   **No renderer may read `Claim.confidence`, `Claim.status`, `Claim.audience`,
//   a source id, a verification state or a relation type. Renderers call this
//   module and receive Bulgarian sentences.**
//
// That is enforced, not requested: `scripts/entity-ui-test.mjs` fails the build if
// a confidence word reaches visitor-facing HTML.
//
// Nothing is weakened by this. The ledger is untouched, every claim keeps its
// confidence, the audits still see all 109, and the machine surfaces still carry
// the enum. What changes is that a *hedge is spoken in the sentence* rather than
// stamped beside it — which is how a person writes when they are being careful,
// and how this site should have been writing all along.
// ─────────────────────────────────────────────────────────────

/** The site's own editorial record. A claim resting only on it is a note to us. */
const EDITORIAL_SOURCE_KIND = "field";

function pickText(text: LocalizedText, lang: LanguageCode): string {
  return text[lang] ?? text.en ?? text.bg;
}

/**
 * Whether a claim is addressed to a visitor. Explicit `audience` wins; otherwise a
 * claim whose every source is the site's own editorial record is treated as a note
 * to ourselves, because that is what it has always turned out to be.
 */
export function isPublic(claim: Claim): boolean {
  if (claim.audience) return claim.audience === "public";
  const cited = sourcesOf(claim);
  return cited.length === 0 || !cited.every((source) => source.kind === EDITORIAL_SOURCE_KIND);
}

/** Live claims a visitor should meet, in render order. */
export function publicClaims(entityId: EntityId, aspect?: ClaimAspect): Claim[] {
  return claimsFor(entityId).filter((claim) => isPublic(claim) && (!aspect || claim.aspect === aspect));
}

/** Live claims that belong only in the collapsed disclosure and the ledger. */
export function editorialClaims(entityId: EntityId, aspect?: ClaimAspect): Claim[] {
  return claimsFor(entityId).filter((claim) => !isPublic(claim) && (!aspect || claim.aspect === aspect));
}

// ── Confidence → phrasing ────────────────────────────────────
// The mapping is a table rather than a chain of ifs so that adding a language is
// adding rows, and so that a reviewer can read the whole editorial policy in
// twenty lines. Each lead-in is written to sit in front of an existing statement
// and produce a grammatical Bulgarian sentence.

type LeadIn = LocalizedText | null;

/** Stated plainly. A checked fact does not announce that it was checked. */
const PLAIN: LeadIn = null;

const REPORTED: LeadIn = {
  bg: "Според публикувани сведения",
  en: "According to published records",
};

/** Village memory. Named as memory, never dressed as documentation. */
const ORAL: LeadIn = {
  bg: "Според местните разкази",
  en: "As the village tells it",
};

/** A real gap in what is known, said in a reader's words rather than a status. */
const OPEN: LeadIn = {
  bg: "Не е установено със сигурност",
  en: "It is not established with certainty",
};

function leadInFor(claim: Claim): LeadIn {
  const cited = sourcesOf(claim);
  // Village memory governs only when it is the ONLY thing the statement rests on.
  // Trifon Kunev's birth is in the Bulgarian Wikipedia as well as in local memory;
  // attributing it to "местните разкази" would understate what is actually known.
  const isOral = cited.length > 0 && cited.every((source) => source.kind === "oral");
  if (claim.confidence === "verified") return isOral ? ORAL : PLAIN;
  if (claim.confidence === "reported") return isOral ? ORAL : REPORTED;
  if (claim.confidence === "uncertain") return isOral ? ORAL : OPEN;
  return PLAIN; // a disputed reading is narrated by `nameQuestion`, never alone
}

/**
 * Whether a statement's first word is a name. The graph already knows every name
 * in the region — entities, aliases, historical forms, in both scripts — so the
 * question is answered by asking it rather than by a word list.
 *
 * This matters because the alternative fails in both directions. Lower-casing
 * everything produced "Според публикувани сведения ъглен е…", a village name
 * destroyed by a formatting rule. Lower-casing nothing produced "Според
 * публикувани сведения Два отвора…" and "Според местните разкази Арката…",
 * ordinary nouns left capitalised in the middle of a sentence.
 */
let properNouns: Set<string> | undefined;
function isProperNoun(word: string): boolean {
  if (!properNouns) {
    // The FIRST token of each name only. Splitting names into all their words
    // made every preposition inside a multi-word name a proper noun — "Долина на
    // Вит при Ъглен" contributed "на", "при" and "в", so a statement opening with
    // "В Ъглен…" kept its capital in the middle of a sentence. A name can only
    // ever open a sentence with the word it itself opens with.
    properNouns = new Set<string>();
    for (const { key } of nameKeyIndex()) {
      const first = key.split(" ")[0];
      if (first) properNouns.add(first);
    }
  }
  return properNouns.has(searchKey(word));
}

/**
 * A lead-in in front of a statement. No comma: a short adverbial phrase in
 * Bulgarian takes none, and adding one before a clause that already carries its
 * own punctuation reads as a stammer. The first letter is lowered unless it
 * opens a name.
 */
function joinSentence(lead: string, statement: string): string {
  const firstWord = statement.split(/\s+/, 1)[0]?.replace(/[^\p{L}]/gu, "") ?? "";
  const body = isProperNoun(firstWord)
    ? statement
    : statement.charAt(0).toLocaleLowerCase("bg") + statement.slice(1);
  return `${lead} ${body}`;
}

/**
 * One claim as a sentence a person would write. The hedge is inside the prose:
 * "Според местните разкази в землището се сочат местности…" carries exactly the
 * caution "[uncertain]" carried, and carries it in a form a reader can use.
 */
export function narrate(claim: Claim, lang: LanguageCode): string {
  const statement = claimStatement(claim, lang);
  const lead = leadInFor(claim);
  if (!lead) return statement;
  return joinSentence(pickText(lead, lang), statement);
}

/**
 * Narrated public claims for a page section, firm ground first. Aspect-filtered
 * where a section is about one aspect; the name question is handled separately by
 * `nameQuestion` and is removed here so it is never told twice.
 */
export function narrateClaims(entityId: EntityId, aspect?: ClaimAspect): Array<{ id: string; text: (lang: LanguageCode) => string }> {
  return publicClaims(entityId, aspect)
    .filter((claim) => claim.confidence !== "disputed")
    .map((claim) => ({ id: claim.id, text: (lang: LanguageCode) => narrate(claim, lang) }));
}

// ── Open questions, as a paragraph rather than an argument ───

export type NameQuestion = {
  question: (lang: LanguageCode) => string;
  /** The readings, each a short label and a sentence. Never ranked, never marked. */
  readings: Array<{ id: string; label: (lang: LanguageCode) => string; text: (lang: LanguageCode) => string }>;
  /** The closing line: both are part of the village's memory. */
  coda: (lang: LanguageCode) => string;
};

const CODA: LocalizedText = {
  bg: "И двете версии са част от паметта и разказите за селото.",
  en: "Both versions are part of the village's memory and of the stories told about it.",
};

/**
 * An open question rendered as something a person would say out loud: the
 * question, the readings side by side, and a closing line that lets both stand.
 *
 * What it deliberately does NOT render is the sentence the site used to print
 * here — "този сайт не избира между тях". Refusing to choose is the right
 * editorial position and the wrong thing to tell a visitor: it is a statement
 * about our policy, in the middle of a paragraph about a village. Presenting two
 * traditions side by side already says it, without talking about ourselves.
 */
export function nameQuestion(entityId: EntityId): NameQuestion | undefined {
  const open = disputesFor(entityId).filter((dispute) => dispute.status === "open");
  const dispute = open[0];
  if (!dispute) return undefined;
  const readings = claimsInDispute(dispute.id);
  if (readings.length < 2) return undefined;
  return {
    question: (lang) => pickText(dispute.question, lang),
    readings: readings.map((claim) => ({
      id: claim.id,
      label: (lang) => (claim.interpretation ? pickText(claim.interpretation, lang) : ""),
      text: (lang) => claimStatement(claim, lang),
    })),
    coda: (lang) => pickText(CODA, lang),
  };
}

// ── Relationships, as Bulgarian rather than as edges ─────────
// A card never says "born here", "subjectOf" or "contained by". It says what a
// person would say, or it says nothing — an empty caption is better than a graph
// term, because a graph term tells a visitor they have wandered into the machine.

export type RelationVoice = "people" | "stories" | "history" | "nearby" | "within";

/** Which human group a related entity belongs to, from the namespace it publishes in. */
export function voiceForPath(path: string | undefined): RelationVoice {
  if (!path) return "nearby";
  if (path.startsWith("/person/")) return "people";
  if (path.startsWith("/legend/")) return "stories";
  if (path.startsWith("/history/")) return "history";
  return "nearby";
}

const GROUP_TITLES: Record<RelationVoice, LocalizedText> = {
  people: { bg: "Хората на това място", en: "The people of this place" },
  stories: { bg: "Разказите, които се пазят тук", en: "The stories kept here" },
  history: { bg: "Пластовете на историята", en: "The layers of its history" },
  nearby: { bg: "Наблизо", en: "Nearby" },
  within: { bg: "В границите на", en: "Within" },
};

export function groupTitle(voice: RelationVoice, lang: LanguageCode): string {
  return pickText(GROUP_TITLES[voice], lang);
}

/**
 * An approximate distance in a visitor's words. The straight-line method is real
 * and is disclosed once, in the collapsed notes — not appended to every card,
 * where it reads as a caveat about a number nobody asked to be precise.
 */
export function approximateDistance(km: number, lang: LanguageCode): string {
  const rounded = km < 10 ? Math.round(km * 2) / 2 : Math.round(km);
  return lang === "bg" ? `На около ${rounded} км` : `About ${rounded} km away`;
}
