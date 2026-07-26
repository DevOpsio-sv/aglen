import type { LanguageCode, LocalizedText } from "../locales/types";
import type { EntityId } from "./schema";

// ─────────────────────────────────────────────────────────────
// The provenance contract — Claim, Source, Evidence, Dispute (M4).
//
// `schema.ts` is the entity contract; this is its other half. Together they are
// the whole authored data model: an Entity is a thing that exists, a Claim is one
// atomic sourced statement about it, a Source is a citable origin, Evidence is
// what we hold, a Dispute is two readings we refuse to collapse.
// `MASTER_ARCHITECTURE_BLUEPRINT.md` §3.1 names them; `EEAT_STRATEGY.md` §2 fixes
// the Claim/Source fields; this file is that shape as TypeScript plus a runtime
// validator the build gate calls.
//
// Four invariants live here rather than in prose:
//   • A claim without a source cannot render on an indexed page (rule 6 / V1).
//   • Unknown, uncertain and disputed are STATES, not absences (rule 7 / V2/V14).
//     A stated unknown is a claim with `confidence: "uncertain"` whose statement
//     says what is not known (`EEAT_STRATEGY.md` §2.3) — never a silent omission.
//   • Confidence is preserved end-to-end; nothing may flatten a hedge (rule 8).
//   • Corrections supersede, retractions are struck and kept (rule 10).
//
// Two deliberate extensions to `EEAT_STRATEGY.md` §2, recorded in ADR-014:
//   1. `sources: SourceId[]` rather than a single `source` — a claim may rest on
//      more than one origin, and the ledger must show all of them.
//   2. `SourceKind` widens the six-kind list to the source classes the region
//      actually holds (books, church records, museum publications, municipal
//      documents, datasets, photographs). No field is removed and no field
//      changes meaning, so every record written against the older shape is still
//      valid.
//
// Derivation lives in `ledger.ts`, never here: `Source.citedBy`, an entity's
// claim set, dispute membership and supersede chains are all computed from these
// records (rule 19). A record asserts one direction; the reverse is generated.
// ─────────────────────────────────────────────────────────────

export type SourceId = string; // src-<kind>-<nnnn>, stable forever
export type ClaimId = string; // clm-<entity>-<nnnn>, stable forever
export type EvidenceId = string; // evd-<yyyymmdd>-<nnn>
export type DisputeId = string; // dsp-<entity>-<nnn>

/**
 * What kind of origin this is. The distinction is not decorative: it is what
 * lets a reader weigh a church register against a village recollection without
 * the site having to editorialise about which is better.
 */
export type SourceKind =
  | "book"
  | "academic"
  | "archive"
  | "museum"
  | "municipal"
  | "church"
  | "map"
  | "oral"
  | "field"
  | "photograph"
  | "dataset"
  | "reference" // Wikidata, Wikipedia and other tertiary compilations
  | "press";

/**
 * How far this project has itself gone in checking the source.
 *   • verified   — checked against the origin itself, by us.
 *   • reported   — a real, citable origin we have not independently checked.
 *   • unverified — the provenance is not established yet; the record says so.
 * A source's verification caps what a claim citing it may assert — enforced in
 * `scripts/graph-audit.mjs`, not by discipline.
 */
export type SourceVerification = "verified" | "reported" | "unverified";

export type Source = {
  id: SourceId;
  kind: SourceKind;
  title: LocalizedText;
  author?: string;
  publisher?: string;
  /** A string, not a number: "1880", "1920s" and "n.d." are all real answers. */
  year?: string;
  language?: LanguageCode | string;
  /** Full, human-readable, one line — what a reader would put in a bibliography. */
  citation: string;
  url?: string;
  accessedAt?: string;
  /** Licence of the source material, where it has one (CC0, CC BY-SA 4.0, ©). */
  license?: string;
  verification: SourceVerification;
  /** Why this source, and its limitations. The honest half of a citation. */
  note?: LocalizedText;
};

/** `EEAT_STRATEGY.md` §2, unchanged. Never collapsed in any rendering (rule 8). */
export type ClaimConfidence = "verified" | "reported" | "uncertain" | "disputed";

export type ClaimMethod = "field" | "archive" | "interview" | "publication" | "official" | "derived";

/**
 * Which page section a claim belongs to. This is authored placement, not
 * derivation: the same fact is a different kind of answer depending on whether
 * the reader asked "what is it" or "where does the name come from".
 * `history` and `name` additionally decide whether an entity earns a depth-3
 * aspect page (`/place/aglen/history/`, `/place/aglen/name/`).
 */
export type ClaimAspect = "identity" | "nature" | "history" | "name" | "meaning" | "access";

export type Claim = {
  id: ClaimId;
  entityId: EntityId;
  /** One atomic factual assertion. Two facts are two claims. */
  statement: LocalizedText;
  /** At least one. A claim with none may not render on an indexed page (V1). */
  sources: SourceId[];
  confidence: ClaimConfidence;
  method?: ClaimMethod;
  aspect?: ClaimAspect;
  /** ISO — when the claim was true, for anything that can change. */
  observedAt?: string;
  /** Who ratified it. An organisation until a named human author exists. */
  verifiedBy?: string;
  /** Corrections supersede; the superseded claim is kept and rendered (rule 10). */
  supersedes?: ClaimId;
  /** What was wrong — published, because publishing your own errors is the signal. */
  correctionNote?: LocalizedText;
  /** Membership in a Dispute. Two claims here render side by side (V14). */
  disputeOf?: DisputeId;
  /** The short label of this reading inside a dispute ("charcoal", "rock needles"). */
  interpretation?: LocalizedText;
  evidence?: EvidenceId[];
  /** Scope, caveat, or what the claim explicitly does NOT assert. */
  note?: LocalizedText;
  /** A retraction is struck and kept and announced — never deleted (rule 10). */
  retracted?: boolean;
  retractionNote?: LocalizedText;
};

/**
 * Two or more competing claims, presented side by side with equal prominence and
 * possibly never resolved (rule 7 / V14). `supersedes` says "one truth, history
 * kept"; a Dispute says "two truths, both shown" — the author chooses, and the
 * site never decides an open question on the reader's behalf.
 */
export type Dispute = {
  id: DisputeId;
  /** The entity the question is about; the dispute renders on its page. */
  entityId: EntityId;
  question: LocalizedText;
  status: "open" | "resolved";
  /** What would settle it. A dispute with a stated test is a research agenda. */
  resolutionTest?: LocalizedText;
};

/**
 * A concrete artifact supporting a claim — a photograph with EXIF, a GPX track,
 * an archive scan, a recording. Distinct from a Source: a Source is what you
 * cite, Evidence is what you hold (`MASTER_ARCHITECTURE_BLUEPRINT.md` §3.2).
 *
 * The type is part of the contract from M4 so that field records have a shape to
 * enter into; no evidence records ship yet, because originals move to object
 * storage in a later milestone (ADR-012) and an evidence record without its
 * artifact is exactly the unbacked assertion this system exists to refuse.
 */
export type Evidence = {
  id: EvidenceId;
  kind: "photograph" | "scan" | "recording" | "track" | "measurement";
  /** Claims this artifact supports. The reverse edge is derived in `ledger.ts`. */
  claims: ClaimId[];
  /** Who was on the ground, and when. */
  observer: string;
  observedAt: string;
  /** Content hash — a mutated artifact must fail the build (V-hash). */
  hash?: string;
  href?: string;
  note?: LocalizedText;
};

// ── Validation ───────────────────────────────────────────────
// Structural only, exactly as in `schema.ts`: shape, enums, required fields and
// the internal consistency of a single record. Cross-record rules (dangling
// source ids, disputes with one side, claims on entities that do not exist,
// unsourced claims on indexed pages) are graph-level and live in
// `scripts/graph-audit.mjs`, which runs on the assembled ledger.

const SOURCE_KINDS = new Set<SourceKind>([
  "book", "academic", "archive", "museum", "municipal", "church", "map",
  "oral", "field", "photograph", "dataset", "reference", "press",
]);

const SOURCE_VERIFICATIONS = new Set<SourceVerification>(["verified", "reported", "unverified"]);

const CLAIM_CONFIDENCES = new Set<ClaimConfidence>(["verified", "reported", "uncertain", "disputed"]);

const CLAIM_METHODS = new Set<ClaimMethod>(["field", "archive", "interview", "publication", "official", "derived"]);

const CLAIM_ASPECTS = new Set<ClaimAspect>(["identity", "nature", "history", "name", "meaning", "access"]);

const SOURCE_ID_RE = /^src-[a-z0-9]+-\d{4}$/;
const CLAIM_ID_RE = /^clm-[a-z0-9-]+-\d{4}$/;
const DISPUTE_ID_RE = /^dsp-[a-z0-9-]+-\d{3}$/;

function isLocalizedText(value: unknown): value is LocalizedText {
  return Boolean(value) && typeof value === "object" && typeof (value as { bg?: unknown }).bg === "string";
}

/** Validate one source record. Returns human-readable problems; never throws. */
export function validateSource(source: unknown): string[] {
  const problems: string[] = [];
  const s = source as Partial<Source>;
  const id = typeof s?.id === "string" ? s.id : "<no id>";

  if (!s || typeof s !== "object") return [`${id}: source record is not an object.`];
  if (typeof s.id !== "string" || !SOURCE_ID_RE.test(s.id)) problems.push(`${id}: source id must look like "src-<kind>-0001".`);
  if (!s.kind || !SOURCE_KINDS.has(s.kind)) problems.push(`${id}: invalid source kind "${s.kind}".`);
  if (!isLocalizedText(s.title)) problems.push(`${id}: source title is not localized text with a bg fallback.`);
  if (typeof s.citation !== "string" || s.citation.trim().length === 0) problems.push(`${id}: source has no citation.`);
  if (!s.verification || !SOURCE_VERIFICATIONS.has(s.verification)) problems.push(`${id}: invalid verification "${s.verification}".`);
  if (s.url !== undefined && !/^https?:\/\//.test(s.url)) problems.push(`${id}: url "${s.url}" is not absolute.`);
  if (s.note !== undefined && !isLocalizedText(s.note)) problems.push(`${id}: note is malformed.`);
  // An unverified source must say why, or a reader cannot weigh it.
  if (s.verification === "unverified" && !isLocalizedText(s.note)) {
    problems.push(`${id}: an unverified source must carry a note saying what is not established.`);
  }
  return problems;
}

/** Validate one claim record. Returns human-readable problems; never throws. */
export function validateClaim(claim: unknown): string[] {
  const problems: string[] = [];
  const c = claim as Partial<Claim>;
  const id = typeof c?.id === "string" ? c.id : "<no id>";

  if (!c || typeof c !== "object") return [`${id}: claim record is not an object.`];
  if (typeof c.id !== "string" || !CLAIM_ID_RE.test(c.id)) problems.push(`${id}: claim id must look like "clm-<entity>-0001".`);
  if (typeof c.entityId !== "string" || c.entityId.length === 0) problems.push(`${id}: claim has no entityId.`);
  if (!isLocalizedText(c.statement)) problems.push(`${id}: statement is not localized text with a bg fallback.`);
  if (!c.confidence || !CLAIM_CONFIDENCES.has(c.confidence)) problems.push(`${id}: invalid confidence "${c.confidence}".`);
  if (c.method !== undefined && !CLAIM_METHODS.has(c.method)) problems.push(`${id}: invalid method "${c.method}".`);
  if (c.aspect !== undefined && !CLAIM_ASPECTS.has(c.aspect)) problems.push(`${id}: invalid aspect "${c.aspect}".`);

  if (!Array.isArray(c.sources) || c.sources.length === 0) {
    problems.push(`${id}: a claim carries at least one source (rule 6).`);
  } else {
    c.sources.forEach((sourceId, index) => {
      if (typeof sourceId !== "string" || !SOURCE_ID_RE.test(sourceId)) problems.push(`${id}: sources[${index}] "${sourceId}" is not a source id.`);
    });
  }

  if (c.disputeOf !== undefined && !DISPUTE_ID_RE.test(c.disputeOf)) problems.push(`${id}: disputeOf "${c.disputeOf}" is not a dispute id.`);
  // A claim inside a dispute must be rendered as one reading among several, and
  // it needs a label to be rendered that way.
  if (c.disputeOf !== undefined && c.confidence !== "disputed") problems.push(`${id}: belongs to a dispute but its confidence is "${c.confidence}", not "disputed" (rule 8).`);
  if (c.disputeOf !== undefined && !isLocalizedText(c.interpretation)) problems.push(`${id}: a claim inside a dispute needs an interpretation label.`);
  if (c.confidence === "disputed" && c.disputeOf === undefined) problems.push(`${id}: is marked disputed but names no dispute — a disputed claim must be shown beside its counterpart (V14).`);

  if (c.supersedes !== undefined && !CLAIM_ID_RE.test(c.supersedes)) problems.push(`${id}: supersedes "${c.supersedes}" is not a claim id.`);
  if (c.supersedes !== undefined && !isLocalizedText(c.correctionNote)) problems.push(`${id}: a correction must publish what was wrong (rule 10).`);
  if (c.retracted === true && !isLocalizedText(c.retractionNote)) problems.push(`${id}: a retraction is struck, kept and announced — it needs a note (rule 10).`);

  if (c.note !== undefined && !isLocalizedText(c.note)) problems.push(`${id}: note is malformed.`);
  if (c.correctionNote !== undefined && !isLocalizedText(c.correctionNote)) problems.push(`${id}: correctionNote is malformed.`);
  if (c.interpretation !== undefined && !isLocalizedText(c.interpretation)) problems.push(`${id}: interpretation is malformed.`);

  return problems;
}

/** Validate one dispute record. Returns human-readable problems; never throws. */
export function validateDispute(dispute: unknown): string[] {
  const problems: string[] = [];
  const d = dispute as Partial<Dispute>;
  const id = typeof d?.id === "string" ? d.id : "<no id>";

  if (!d || typeof d !== "object") return [`${id}: dispute record is not an object.`];
  if (typeof d.id !== "string" || !DISPUTE_ID_RE.test(d.id)) problems.push(`${id}: dispute id must look like "dsp-<entity>-001".`);
  if (typeof d.entityId !== "string" || d.entityId.length === 0) problems.push(`${id}: dispute has no entityId.`);
  if (!isLocalizedText(d.question)) problems.push(`${id}: dispute question is not localized text with a bg fallback.`);
  if (d.status !== "open" && d.status !== "resolved") problems.push(`${id}: invalid dispute status "${d.status}".`);
  if (d.resolutionTest !== undefined && !isLocalizedText(d.resolutionTest)) problems.push(`${id}: resolutionTest is malformed.`);
  return problems;
}

/** Validate one evidence record. Returns human-readable problems; never throws. */
export function validateEvidence(evidence: unknown): string[] {
  const problems: string[] = [];
  const e = evidence as Partial<Evidence>;
  const id = typeof e?.id === "string" ? e.id : "<no id>";

  if (!e || typeof e !== "object") return [`${id}: evidence record is not an object.`];
  if (typeof e.id !== "string" || !/^evd-\d{8}-\d{3}$/.test(e.id)) problems.push(`${id}: evidence id must look like "evd-20260726-001".`);
  if (!Array.isArray(e.claims) || e.claims.length === 0) problems.push(`${id}: evidence supports no claim (V6, no orphan evidence).`);
  if (typeof e.observer !== "string" || e.observer.length === 0) problems.push(`${id}: evidence names no observer.`);
  if (typeof e.observedAt !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(e.observedAt ?? "")) problems.push(`${id}: evidence needs an ISO observation date.`);
  return problems;
}
