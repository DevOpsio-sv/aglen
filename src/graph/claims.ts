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
// M4B adds three separations the first shape conflated, recorded in ADR-015:
//   1. Publication state (`Claim.status`) is not confidence. A draft claim does
//      not render however certain it is; an uncertain claim does render, because
//      stating an unknown is the point.
//   2. A claim carries its own dates — `created`, `reviewedAt` — so "last
//      reviewed" is when a human last checked, not when a deploy last ran.
//   3. Evidence belongs to exactly one Source, and a Source carries a `slug`, so
//      a source has a canonical address that is not its ledger id.
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
  /**
   * The canonical URL segment of `/source/<slug>/` (ADR-015). A reader and a
   * crawler address a source by what it is, never by its ledger id: `src-oral-0001`
   * is an implementation detail and must not appear in a URL, a heading or a link.
   */
  slug: string;
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

/**
 * Publication state, which is a different axis from confidence and must not be
 * confused with it (M4B). Confidence says how well a statement is held; status
 * says whether the statement may be shown at all.
 *   • published — renders, exports, and is indexed.
 *   • draft     — authored, held back; reaches no page, no JSON-LD, no llms.txt.
 *   • internal  — a working note that is never intended to publish.
 * An uncertain claim is published (stating an unknown is the point); a draft claim
 * is not, however certain it is. Only `claimsFor()` decides this, once.
 */
export type ClaimStatus = "published" | "draft" | "internal";

export type Claim = {
  id: ClaimId;
  entityId: EntityId;
  /** One atomic factual assertion. Two facts are two claims. */
  statement: LocalizedText;
  /** At least one. A claim with none may not render on an indexed page (V1). */
  sources: SourceId[];
  confidence: ClaimConfidence;
  /** Whether this may be shown. Orthogonal to `confidence` — see `ClaimStatus`. */
  status: ClaimStatus;
  method?: ClaimMethod;
  aspect?: ClaimAspect;
  /** ISO — when the record entered the ledger. Immutable once written. */
  created: string;
  /**
   * ISO — when a human last went back to the sources and checked this still
   * holds. It is the honest input to "last reviewed": a build date says only that
   * a deploy happened, and a source's access date says only when we first read it.
   */
  reviewedAt?: string;
  /** ISO — when the claim was true, for anything that can change. */
  observedAt?: string;
  /** Who ratified it. An organisation until a named human author exists. */
  verifiedBy?: string;
  /**
   * Editorial working note: what still has to be checked, which archive to write
   * to, why this wording was chosen. Internal by construction — it is a plain
   * string rather than localized text because nothing renders it, and no surface
   * in this codebase may (M4B, Part 12).
   */
  editorialNote?: string;
  /** Corrections supersede; the superseded claim is kept and rendered (rule 10). */
  supersedes?: ClaimId;
  /** What was wrong — published, because publishing your own errors is the signal. */
  correctionNote?: LocalizedText;
  /** ISO — the date the correction was published. Required with `supersedes`. */
  correctedAt?: string;
  /** Who caught it. A reader who reports an error is credited by name if they wish. */
  correctionCredit?: string;
  /** Membership in a Dispute. Two claims here render side by side (V14). */
  disputeOf?: DisputeId;
  /** The short label of this reading inside a dispute ("charcoal", "rock needles"). */
  interpretation?: LocalizedText;
  /**
   * How well this one reading is held, were it standing alone. A disputed claim's
   * `confidence` is "disputed" — that is the state of the question, not of the
   * reading — so without this field every interpretation looks equally supported
   * when they are not. Only meaningful inside a dispute.
   */
  interpretationConfidence?: Exclude<ClaimConfidence, "disputed">;
  evidence?: EvidenceId[];
  /** Scope, caveat, or what the claim explicitly does NOT assert. */
  note?: LocalizedText;
  /** A retraction is struck and kept and announced — never deleted (rule 10). */
  retracted?: boolean;
  retractionNote?: LocalizedText;
  retractedAt?: string;
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
 * an archive scan, a recording, a computed measurement. Distinct from a Source: a
 * Source is what you *cite*, Evidence is what you *hold*
 * (`MASTER_ARCHITECTURE_BLUEPRINT.md` §3.2).
 *
 * Every evidence record belongs to exactly one source — the origin under whose
 * authority the artifact was produced. A photograph belongs to the field record
 * of the day it was taken; a scan belongs to the archive it came out of. Without
 * that link an artifact is a file, not evidence.
 *
 * The layer is fully implemented and gated, and it holds only what this project
 * actually has. Photographic and archival originals move to object storage in a
 * later milestone (ADR-012); until then an evidence record for one would be the
 * unbacked assertion this whole system exists to refuse.
 */
export type EvidenceKind =
  | "photograph"
  | "scan" // an archive or museum scan
  | "recording"
  | "track" // a GPS track or waypoint set
  | "measurement" // something measured or computed, with a published method
  | "observation" // a dated observation in the field, without an artifact to store
  | "clipping" // a newspaper or periodical cutting
  | "interview";

export type Evidence = {
  id: EvidenceId;
  kind: EvidenceKind;
  /** What the artifact is, in a reader's words. Rendered; never the id. */
  title: LocalizedText;
  /** The one source this artifact belongs to. Exactly one, always (M4B, Part 3). */
  source: SourceId;
  /** Claims this artifact supports. The reverse edge is derived in `ledger.ts`. */
  claims: ClaimId[];
  /** Who was on the ground, and when. */
  observer: string;
  observedAt: string;
  /**
   * Content hash of the artifact. Where the artifact is regenerable — a computed
   * measurement table — the build recomputes it and fails on a mismatch (V-hash),
   * so a coordinate edited without re-checking the measurement cannot ship.
   */
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

const CLAIM_STATUSES = new Set<ClaimStatus>(["published", "draft", "internal"]);

const EVIDENCE_KINDS = new Set<EvidenceKind>([
  "photograph", "scan", "recording", "track", "measurement", "observation", "clipping", "interview",
]);

const SOURCE_ID_RE = /^src-[a-z0-9]+-\d{4}$/;
const CLAIM_ID_RE = /^clm-[a-z0-9-]+-\d{4}$/;
const DISPUTE_ID_RE = /^dsp-[a-z0-9-]+-\d{3}$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

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
  // The slug is what a reader sees; an id-shaped slug would leak the ledger into
  // the URL bar, which is exactly what the provenance layer must not do.
  if (typeof s.slug !== "string" || !SLUG_RE.test(s.slug)) problems.push(`${id}: source slug "${s.slug}" is not a kebab-case slug.`);
  else if (/^src-/.test(s.slug)) problems.push(`${id}: source slug "${s.slug}" repeats the record id; a slug names the source, not the row.`);
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
  if (!c.status || !CLAIM_STATUSES.has(c.status)) problems.push(`${id}: invalid publication status "${c.status}" (published, draft or internal).`);
  if (c.method !== undefined && !CLAIM_METHODS.has(c.method)) problems.push(`${id}: invalid method "${c.method}".`);
  if (c.aspect !== undefined && !CLAIM_ASPECTS.has(c.aspect)) problems.push(`${id}: invalid aspect "${c.aspect}".`);

  // Dates. A claim with no creation date cannot be placed in the ledger's own
  // history, and "last reviewed" would then be a guess.
  if (typeof c.created !== "string" || !ISO_DATE_RE.test(c.created)) problems.push(`${id}: created must be an ISO date (yyyy-mm-dd).`);
  for (const [field, value] of [["reviewedAt", c.reviewedAt], ["observedAt", c.observedAt], ["correctedAt", c.correctedAt], ["retractedAt", c.retractedAt]] as const) {
    if (value !== undefined && !ISO_DATE_RE.test(value)) problems.push(`${id}: ${field} "${value}" is not an ISO date.`);
  }
  if (c.reviewedAt !== undefined && c.created !== undefined && c.reviewedAt < c.created) {
    problems.push(`${id}: reviewedAt (${c.reviewedAt}) precedes created (${c.created}).`);
  }
  if (c.editorialNote !== undefined && (typeof c.editorialNote !== "string" || c.editorialNote.trim().length === 0)) {
    problems.push(`${id}: editorialNote must be a non-empty string (it is internal, so it is not localized).`);
  }

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
  // Each reading of an open question states how well it is itself held, or the
  // page silently presents two unequal readings as equally supported.
  if (c.disputeOf !== undefined && (c.interpretationConfidence === undefined || !CLAIM_CONFIDENCES.has(c.interpretationConfidence))) {
    problems.push(`${id}: a reading inside a dispute must say how well it is itself held (interpretationConfidence).`);
  }
  // The type already excludes it; the JSON does not, so the check is real.
  if ((c.interpretationConfidence as string) === "disputed") problems.push(`${id}: interpretationConfidence names the strength of one reading; "disputed" is the state of the question.`);
  if (c.interpretationConfidence !== undefined && c.disputeOf === undefined) problems.push(`${id}: carries an interpretationConfidence but belongs to no dispute.`);

  if (c.supersedes !== undefined && !CLAIM_ID_RE.test(c.supersedes)) problems.push(`${id}: supersedes "${c.supersedes}" is not a claim id.`);
  if (c.supersedes !== undefined && !isLocalizedText(c.correctionNote)) problems.push(`${id}: a correction must publish what was wrong (rule 10).`);
  if (c.supersedes !== undefined && c.correctedAt === undefined) problems.push(`${id}: a correction must publish the date it was made (rule 10).`);
  if (c.supersedes === c.id && c.id !== undefined) problems.push(`${id}: supersedes itself.`);
  if (c.retracted === true && !isLocalizedText(c.retractionNote)) problems.push(`${id}: a retraction is struck, kept and announced — it needs a note (rule 10).`);
  if (c.retracted === true && c.retractedAt === undefined) problems.push(`${id}: a retraction must publish the date it was withdrawn (rule 10).`);

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
  if (!e.kind || !EVIDENCE_KINDS.has(e.kind)) problems.push(`${id}: invalid evidence kind "${e.kind}".`);
  if (!isLocalizedText(e.title)) problems.push(`${id}: evidence has no localized title to render.`);
  // Exactly one source, always: an artifact with no origin is a file.
  if (typeof e.source !== "string" || !SOURCE_ID_RE.test(e.source)) problems.push(`${id}: evidence must belong to exactly one source (got "${e.source}").`);
  if (!Array.isArray(e.claims) || e.claims.length === 0) problems.push(`${id}: evidence supports no claim (V6, no orphan evidence).`);
  else e.claims.forEach((claimId, index) => {
    if (typeof claimId !== "string" || !CLAIM_ID_RE.test(claimId)) problems.push(`${id}: claims[${index}] "${claimId}" is not a claim id.`);
  });
  if (typeof e.observer !== "string" || e.observer.length === 0) problems.push(`${id}: evidence names no observer.`);
  if (typeof e.observedAt !== "string" || !ISO_DATE_RE.test(e.observedAt ?? "")) problems.push(`${id}: evidence needs an ISO observation date.`);
  if (e.href !== undefined && !/^(https?:\/\/|\/)/.test(e.href)) problems.push(`${id}: href "${e.href}" is neither absolute nor site-rooted.`);
  if (e.note !== undefined && !isLocalizedText(e.note)) problems.push(`${id}: note is malformed.`);
  return problems;
}
