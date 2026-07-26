import type { LanguageCode, LocalizedText } from "../locales/types";
import type { EntityId } from "./schema";
import {
  validateClaim,
  validateDispute,
  validateEvidence,
  validateSource,
  type Claim,
  type ClaimAspect,
  type ClaimConfidence,
  type ClaimId,
  type Dispute,
  type DisputeId,
  type Evidence,
  type EvidenceId,
  type Source,
  type SourceId,
  type SourceKind,
} from "./claims";
import { entityById, entityPoint, entitySameAs } from "./index";
import { REGIONS } from "./registry";
import { pick } from "./text";

// ─────────────────────────────────────────────────────────────
// The compiled claim ledger.
//
// `index.ts` compiles the entity graph; this compiles its provenance half and
// DERIVES every reverse edge, exactly as the entity graph derives reciprocity and
// distances (Constitution rule 19). A record asserts one direction only:
//
//   Claim.entityId   ──derives──▶  claimsFor(entity)
//   Claim.sources[]  ──derives──▶  citedBy(source)  and  sourcePages()
//   Claim.disputeOf  ──derives──▶  claimsInDispute(dispute)
//   Claim.supersedes ──derives──▶  supersederOf(claim) and the /corrections/ list
//   Evidence.claims  ──derives──▶  evidenceFor(claim)
//   Evidence.source  ──derives──▶  evidenceFromSource(source)
//   the whole ledger ──derives──▶  trustSignals(entity) and lastReviewed(entity)
//
// Nothing here decides what is true. It decides what is *shown*: which claims
// belong to a page, which of them are hedged, which are contested, and when the
// page was last reviewed. Confidence is carried through untouched — no function
// in this file may turn an "uncertain" into a bare statement (rule 8 / V15).
//
// The one editorial ordering rule: within a section, claims render
// verified → reported → uncertain, so a reader meets the firm ground first and
// the doubt is never buried. Disputed claims never sit in that list at all; they
// render as a dispute, side by side, with equal prominence (rule 7 / V14).
// ─────────────────────────────────────────────────────────────

/** Problems found while loading — surfaced by graph-audit, never thrown at runtime. */
export const ledgerErrors: string[] = [];

function collect<T>(records: unknown[], validate: (record: unknown) => string[]): T[] {
  const kept: T[] = [];
  for (const record of records ?? []) {
    const problems = validate(record);
    if (problems.length > 0) {
      ledgerErrors.push(...problems);
      continue;
    }
    kept.push(record as T);
  }
  return kept;
}

// One pass per region (ADR-009 / ADR-016). The ledger partitions along the same
// boundary as the entity graph because they are the same boundary: a region is its
// data shard, its editorial unit and its physiographic subtree at once.
export const sources: Source[] = REGIONS.flatMap((region) => collect<Source>(region.sources, validateSource));
export const claims: Claim[] = REGIONS.flatMap((region) => collect<Claim>(region.claims, validateClaim));
export const disputes: Dispute[] = REGIONS.flatMap((region) => collect<Dispute>(region.disputes, validateDispute));
export const evidence: Evidence[] = REGIONS.flatMap((region) => collect<Evidence>(region.evidence, validateEvidence));

const sourceIndex = new Map<SourceId, Source>();
const sourceSlugIndex = new Map<string, Source>();
for (const source of sources) {
  if (sourceIndex.has(source.id)) ledgerErrors.push(`Duplicate source id "${source.id}".`);
  sourceIndex.set(source.id, source);
  if (sourceSlugIndex.has(source.slug)) ledgerErrors.push(`Duplicate source slug "${source.slug}" — two sources would claim /source/${source.slug}/.`);
  sourceSlugIndex.set(source.slug, source);
}

const evidenceIndex = new Map<EvidenceId, Evidence>();
for (const artifact of evidence) {
  if (evidenceIndex.has(artifact.id)) ledgerErrors.push(`Duplicate evidence id "${artifact.id}".`);
  evidenceIndex.set(artifact.id, artifact);
}

const claimIndex = new Map<ClaimId, Claim>();
for (const claim of claims) {
  if (claimIndex.has(claim.id)) ledgerErrors.push(`Duplicate claim id "${claim.id}".`);
  claimIndex.set(claim.id, claim);
}

const disputeIndex = new Map<DisputeId, Dispute>();
for (const dispute of disputes) {
  if (disputeIndex.has(dispute.id)) ledgerErrors.push(`Duplicate dispute id "${dispute.id}".`);
  disputeIndex.set(dispute.id, dispute);
}

// ── Derived reverse edges (provenance is bidirectional and total, rule 11/V4) ──
const claimsByEntity = new Map<EntityId, Claim[]>();
const claimsBySource = new Map<SourceId, Claim[]>();
const claimsByDispute = new Map<DisputeId, Claim[]>();
const supersededBy = new Map<ClaimId, Claim>();
const evidenceByClaim = new Map<ClaimId, Evidence[]>();

for (const claim of claims) {
  const forEntity = claimsByEntity.get(claim.entityId) ?? [];
  forEntity.push(claim);
  claimsByEntity.set(claim.entityId, forEntity);

  for (const sourceId of claim.sources) {
    const cited = claimsBySource.get(sourceId) ?? [];
    cited.push(claim);
    claimsBySource.set(sourceId, cited);
  }

  if (claim.disputeOf) {
    const inDispute = claimsByDispute.get(claim.disputeOf) ?? [];
    inDispute.push(claim);
    claimsByDispute.set(claim.disputeOf, inDispute);
  }

  if (claim.supersedes) supersededBy.set(claim.supersedes, claim);
}

const evidenceBySource = new Map<SourceId, Evidence[]>();
for (const artifact of evidence) {
  for (const claimId of artifact.claims) {
    const supporting = evidenceByClaim.get(claimId) ?? [];
    supporting.push(artifact);
    evidenceByClaim.set(claimId, supporting);
  }
  const held = evidenceBySource.get(artifact.source) ?? [];
  held.push(artifact);
  evidenceBySource.set(artifact.source, held);
}

// ── Lookups ──────────────────────────────────────────────────
export function sourceById(id: SourceId): Source | undefined {
  return sourceIndex.get(id);
}
export function claimById(id: ClaimId): Claim | undefined {
  return claimIndex.get(id);
}
/** A source by its public slug — how `/source/<slug>/` resolves (ADR-015). */
export function sourceBySlug(slug: string): Source | undefined {
  return sourceSlugIndex.get(slug);
}
export function evidenceById(id: EvidenceId): Evidence | undefined {
  return evidenceIndex.get(id);
}
/** The artifacts held under one source — the reverse of `Evidence.source` (V4). */
export function evidenceFromSource(id: SourceId): Evidence[] {
  return evidenceBySource.get(id) ?? [];
}
export function sourcesOf(claim: Claim): Source[] {
  return claim.sources.map((id) => sourceIndex.get(id)).filter((source): source is Source => Boolean(source));
}
/** Every claim that cites this source — the reverse of `Claim.sources` (V4). */
export function citedBy(id: SourceId): Claim[] {
  return claimsBySource.get(id) ?? [];
}
export function evidenceFor(id: ClaimId): Evidence[] {
  return evidenceByClaim.get(id) ?? [];
}
/** The claim that corrected this one, if any. */
export function supersederOf(id: ClaimId): Claim | undefined {
  return supersededBy.get(id);
}

// ── What a page shows ────────────────────────────────────────
// `CONFIDENCE_ORDER` is a rendering order, never a filter: nothing is dropped for
// being uncertain, and nothing is promoted for being verified.
const CONFIDENCE_ORDER: Record<ClaimConfidence, number> = { verified: 0, reported: 1, uncertain: 2, disputed: 3 };

function byConfidenceThenId(a: Claim, b: Claim): number {
  const order = CONFIDENCE_ORDER[a.confidence] - CONFIDENCE_ORDER[b.confidence];
  return order !== 0 ? order : a.id.localeCompare(b.id);
}

/**
 * The one place publication state is decided (M4B). A claim is live when it is
 * published, not superseded and not retracted. Everything a reader, a crawler or
 * an AI export can see passes through here, so a `draft` claim cannot leak onto a
 * page by being imported somewhere else — there is nowhere else to import it from.
 *
 * Note what this does NOT filter: confidence. An uncertain claim is live, because
 * stating an unknown is the point (rule 7).
 */
function isLive(claim: Claim): boolean {
  return claim.status === "published" && !supersededBy.has(claim.id) && claim.retracted !== true;
}

/**
 * Every live claim about an entity, in render order. A claim that has been
 * superseded stays in the ledger and on `/corrections/` but leaves the page —
 * that is what "corrections supersede, they never delete" means in practice
 * (rule 10). Retractions are handled the same way and are struck, not hidden.
 */
export function claimsFor(entityId: EntityId): Claim[] {
  return (claimsByEntity.get(entityId) ?? []).filter(isLive).sort(byConfidenceThenId);
}

/** Every live claim on the site, in id order — what the machine surfaces export. */
export function liveClaims(): Claim[] {
  return claims.filter(isLive).sort((a, b) => a.id.localeCompare(b.id));
}

/** Live claims resting on one source — what a `/source/<slug>/` page renders. */
export function liveClaimsFromSource(id: SourceId): Claim[] {
  return citedBy(id).filter(isLive).sort(byConfidenceThenId);
}

/** Live claims of one aspect — what a depth-3 aspect page renders. */
export function claimsForAspect(entityId: EntityId, aspect: ClaimAspect): Claim[] {
  return claimsFor(entityId).filter((claim) => claim.aspect === aspect);
}

/** Live claims that are neither hedged nor contested — the "what is known" block. */
export function knownClaims(entityId: EntityId, aspect?: ClaimAspect): Claim[] {
  return claimsFor(entityId).filter(
    (claim) => (claim.confidence === "verified" || claim.confidence === "reported") && (!aspect || claim.aspect === aspect),
  );
}

/** Live claims that state a doubt or a gap — never omitted, never merged away (rule 7). */
export function uncertainClaims(entityId: EntityId, aspect?: ClaimAspect): Claim[] {
  return claimsFor(entityId).filter((claim) => claim.confidence === "uncertain" && (!aspect || claim.aspect === aspect));
}

/** Open questions about an entity, each with its competing readings (V14). */
export function disputesFor(entityId: EntityId, aspect?: ClaimAspect): Dispute[] {
  return disputes.filter((dispute) => {
    if (dispute.entityId !== entityId) return false;
    if (!aspect) return true;
    return claimsInDispute(dispute.id).some((claim) => claim.aspect === aspect);
  });
}

/** The competing readings under one dispute, in a stable order. Never fewer than two. */
export function claimsInDispute(id: DisputeId): Claim[] {
  return (claimsByDispute.get(id) ?? [])
    .filter((claim) => claim.status === "published" && claim.retracted !== true)
    .sort((a, b) => a.id.localeCompare(b.id));
}

/** Whether an entity has earned a page at all (Constitution rule 15). */
export function claimCount(entityId: EntityId): number {
  return claimsFor(entityId).length;
}

// ── Aspect pages (depth 3, `CONTENT_HIERARCHY.md` §3) ────────
// An aspect earns its own page only when it holds at least three live claims;
// below that it stays a section of the entity page. The set is derived, so a
// page appears when the knowledge does and never before (rule 26).
export const ASPECT_PAGE_KINDS: ClaimAspect[] = ["history", "name"];
export const ASPECT_PAGE_THRESHOLD = 3;

export type AspectPage = { entityId: EntityId; aspect: ClaimAspect };

/**
 * The aspect pages an entity has earned. An aspect is an aspect *of a place*: a
 * historical period is already history and does not get a history page beneath
 * itself, so only entities that publish a `/place/` page qualify. Depth 3 is an
 * aspect of something at depth 2, never a page in its own right.
 */
export function aspectPagesFor(entityId: EntityId): AspectPage[] {
  const entity = entityById(entityId);
  if (!entity || entity.page?.status !== "published" || !entity.page.path.startsWith("/place/")) return [];
  return ASPECT_PAGE_KINDS.filter((aspect) => claimsForAspect(entityId, aspect).length >= ASPECT_PAGE_THRESHOLD).map((aspect) => ({
    entityId,
    aspect,
  }));
}

// ── Source pages (`/source/<slug>/`, ADR-015) ────────────────
// Rule 15 applied to the source namespace: a source earns its own address once
// three live claims rest on it. Below that it is a row in the ledger index, not a
// page, exactly as an entity with two claims is a section of its parent. The set
// is derived, so a source page appears when the citing does and never before.
export const SOURCE_PAGE_THRESHOLD = 3;

/** Whether this source has earned `/source/<slug>/`. */
export function sourceHasPage(id: SourceId): boolean {
  return liveClaimsFromSource(id).length >= SOURCE_PAGE_THRESHOLD;
}

/** The sources that publish a page, in ledger order. */
export function sourcePages(): Source[] {
  return sources.filter((source) => sourceHasPage(source.id)).sort((a, b) => a.slug.localeCompare(b.slug));
}

/** The language-agnostic path of a source page, or undefined when it has none. */
export function sourcePagePath(source: Source): string | undefined {
  return sourceHasPage(source.id) ? `/source/${source.slug}/` : undefined;
}

// ── Corrections and retractions (`/corrections/`, generated) ──
/** Claims that corrected an earlier one, newest id last. Generated, not maintained. */
export function corrections(): Claim[] {
  return claims
    .filter((claim) => Boolean(claim.supersedes) && claim.status === "published")
    .sort((a, b) => (a.correctedAt ?? "").localeCompare(b.correctedAt ?? "") || a.id.localeCompare(b.id));
}
/** Claims that were withdrawn. Struck and kept, never deleted (rule 10). */
export function retractions(): Claim[] {
  return claims
    .filter((claim) => claim.retracted === true && claim.status === "published")
    .sort((a, b) => (a.retractedAt ?? "").localeCompare(b.retractedAt ?? "") || a.id.localeCompare(b.id));
}

// ── Editorial transparency (`EEAT_STRATEGY.md` §6.3) ─────────
/**
 * When a page was last reviewed: the most recent date on which a human went back
 * to the sources and checked that what the page says still holds. It is a claim's
 * `reviewedAt`, falling back to the access date of the sources it rests on — never
 * the build date, which would say only that a deploy happened.
 */
export function lastReviewed(entityId: EntityId): string | undefined {
  const live = claimsFor(entityId);
  const dates = [
    ...live.map((claim) => claim.reviewedAt),
    ...live.flatMap((claim) => sourcesOf(claim)).map((source) => source.accessedAt),
  ]
    .filter((date): date is string => Boolean(date))
    .sort();
  return dates[dates.length - 1];
}

// ── Trust signals (M4B, Parts 6 and 12) ──────────────────────
// A page's trust line is a handful of plain sentences, never a count. "39
// verified claims from 15 sources" is a database talking about itself; "checked
// against open records · contains oral tradition · last reviewed 26 July 2026"
// is a magazine telling a reader how far to trust it. Both are derived from the
// same ledger; only one of them a visitor can use.
//
// Every signal is a fact about the records, computed here and never asserted by
// hand. A signal that is off is off because the sourcing does not support it yet
// — which makes the missing ones a research agenda rather than a marketing gap.

/** Source kinds that are primary: somebody's own record of the thing itself. */
const PRIMARY_KINDS = new Set<SourceKind>(["archive", "church", "municipal", "museum", "map", "academic", "book"]);
/** Source kinds that are open, machine-checkable records. */
const OPEN_RECORD_KINDS = new Set<SourceKind>(["reference", "dataset"]);

export type TrustSignal =
  | "primarySources" // a verified claim rests on a verified primary source
  | "openRecords" // checked against open data (Wikidata, datasets)
  | "fieldChecked" // somebody from this project went and looked
  | "coordinatesVerified" // the published fix is vouched for by a verified source
  | "oralTradition" // village memory is among the origins
  | "historicalUncertainty" // a stated unknown about history, the name or meaning
  | "openQuestion" // an unresolved dispute renders on the page
  | "corrected"; // this page has published a correction to itself

/**
 * The signals a page has actually earned, in the order they should be read: what
 * is solid first, what is soft second, what is open last. Never counts, never ids.
 */
export function trustSignals(entityId: EntityId): TrustSignal[] {
  const live = claimsFor(entityId);
  if (live.length === 0) return [];
  const cited = new Map<SourceId, Source>();
  for (const claim of live) for (const source of sourcesOf(claim)) cited.set(source.id, source);
  const citedList = [...cited.values()];
  const signals: TrustSignal[] = [];

  const restsOnVerified = (claim: Claim, kinds: Set<SourceKind>) =>
    sourcesOf(claim).some((source) => kinds.has(source.kind) && source.verification === "verified");

  if (live.some((claim) => claim.confidence === "verified" && restsOnVerified(claim, PRIMARY_KINDS))) signals.push("primarySources");
  if (live.some((claim) => claim.confidence === "verified" && restsOnVerified(claim, OPEN_RECORD_KINDS))) signals.push("openRecords");
  if (live.some((claim) => claim.method === "field")) signals.push("fieldChecked");
  // "Coordinates checked" is only true when the entity publishes its own fix, is
  // linked to the open record that fix came from, and has a verified identity
  // claim resting on a source we checked ourselves. Two of the three would be a
  // plausible-sounding half-truth, which is worse here than no signal at all.
  const entity = entityById(entityId);
  if (
    entity &&
    entityPoint(entity) &&
    entitySameAs(entity).length > 0 &&
    live.some((claim) => claim.aspect === "identity" && claim.confidence === "verified" && sourcesOf(claim).some((source) => source.verification === "verified"))
  ) {
    signals.push("coordinatesVerified");
  }
  if (citedList.some((source) => source.kind === "oral")) signals.push("oralTradition");
  if (live.some((claim) => claim.confidence === "uncertain" && (claim.aspect === "history" || claim.aspect === "name" || claim.aspect === "meaning"))) {
    signals.push("historicalUncertainty");
  }
  if (disputesFor(entityId).some((dispute) => dispute.status === "open")) signals.push("openQuestion");
  if (live.some((claim) => Boolean(claim.supersedes))) signals.push("corrected");

  return signals;
}

export type ProvenanceSummary = {
  claims: number;
  verified: number;
  reported: number;
  uncertain: number;
  disputes: number;
  sources: Source[];
  /** True when any cited source is village memory whose provenance is not established. */
  containsOralTradition: boolean;
  /** The plain-language trust signals this page has earned. */
  signals: TrustSignal[];
  /** When a human last checked this against its sources. */
  lastReviewed?: string;
};

/**
 * The provenance behind a page. The counts are here because the audit, the
 * `/sources/` ledger and the machine export all need them; the rendered page
 * uses `signals` and `sources` and shows no number but a date (Part 12).
 */
export function provenanceSummary(entityId: EntityId): ProvenanceSummary {
  const live = claimsFor(entityId);
  const cited = new Map<SourceId, Source>();
  for (const claim of live) for (const source of sourcesOf(claim)) cited.set(source.id, source);
  return {
    claims: live.length,
    verified: live.filter((claim) => claim.confidence === "verified").length,
    reported: live.filter((claim) => claim.confidence === "reported").length,
    uncertain: live.filter((claim) => claim.confidence === "uncertain").length,
    disputes: disputesFor(entityId).length,
    sources: [...cited.values()].sort((a, b) => a.id.localeCompare(b.id)),
    containsOralTradition: [...cited.values()].some((source) => source.kind === "oral"),
    signals: trustSignals(entityId),
    lastReviewed: lastReviewed(entityId),
  };
}

/** Every source the site cites anywhere, with the live claims that rest on it. */
export function ledgerBySource(): Array<{ source: Source; claims: Claim[]; path?: string }> {
  return sources
    .map((source) => ({ source, claims: liveClaimsFromSource(source.id), path: sourcePagePath(source) }))
    .sort((a, b) => b.claims.length - a.claims.length || a.source.id.localeCompare(b.source.id));
}

// ── Localisation ─────────────────────────────────────────────
// The knowledge tier is bg + en (Constitution rule 43); other languages fall back
// to en, exactly as the entity prose already does. The fallback itself lives in
// `text.ts` so the ledger, the graph and the audits cannot drift apart about it.

export function claimStatement(claim: Claim, lang: LanguageCode): string {
  return pick(claim.statement, lang);
}
export function claimNote(claim: Claim, lang: LanguageCode): string | undefined {
  return claim.note ? pick(claim.note, lang) : undefined;
}
export function claimInterpretation(claim: Claim, lang: LanguageCode): string | undefined {
  return claim.interpretation ? pick(claim.interpretation, lang) : undefined;
}
export function claimCorrectionNote(claim: Claim, lang: LanguageCode): string | undefined {
  return claim.correctionNote ? pick(claim.correctionNote, lang) : undefined;
}
export function claimRetractionNote(claim: Claim, lang: LanguageCode): string | undefined {
  return claim.retractionNote ? pick(claim.retractionNote, lang) : undefined;
}
export function sourceTitle(source: Source, lang: LanguageCode): string {
  return pick(source.title, lang);
}
export function sourceNote(source: Source, lang: LanguageCode): string | undefined {
  return source.note ? pick(source.note, lang) : undefined;
}
export function disputeQuestion(dispute: Dispute, lang: LanguageCode): string {
  return pick(dispute.question, lang);
}
export function disputeResolutionTest(dispute: Dispute, lang: LanguageCode): string | undefined {
  return dispute.resolutionTest ? pick(dispute.resolutionTest, lang) : undefined;
}
export function evidenceTitle(artifact: Evidence, lang: LanguageCode): string {
  return pick(artifact.title, lang);
}
export function evidenceNote(artifact: Evidence, lang: LanguageCode): string | undefined {
  return artifact.note ? pick(artifact.note, lang) : undefined;
}

export type { Claim, ClaimAspect, ClaimConfidence, ClaimStatus, Dispute, Evidence, EvidenceKind, Source, SourceKind } from "./claims";
