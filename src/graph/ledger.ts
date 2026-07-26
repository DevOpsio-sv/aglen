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
  type Source,
  type SourceId,
} from "./claims";
import { entityById } from "./index";
import claimRecords from "./karst/lukovit/claims.json";
import sourceRecords from "./karst/lukovit/sources.json";

// ─────────────────────────────────────────────────────────────
// The compiled claim ledger.
//
// `index.ts` compiles the entity graph; this compiles its provenance half and
// DERIVES every reverse edge, exactly as the entity graph derives reciprocity and
// distances (Constitution rule 19). A record asserts one direction only:
//
//   Claim.entityId   ──derives──▶  claimsFor(entity)
//   Claim.sources[]  ──derives──▶  citedBy(source)
//   Claim.disputeOf  ──derives──▶  claimsInDispute(dispute)
//   Claim.supersedes ──derives──▶  correctionsOf(claim) and the /corrections/ list
//   Evidence.claims  ──derives──▶  evidenceFor(claim)
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

type SourceFile = { partition: string; sources: unknown[] };
type ClaimFile = { partition: string; claims: unknown[]; disputes?: unknown[]; evidence?: unknown[] };

const sourcePartitions: SourceFile[] = [sourceRecords as SourceFile];
const claimPartitions: ClaimFile[] = [claimRecords as ClaimFile];

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

export const sources: Source[] = sourcePartitions.flatMap((partition) => collect<Source>(partition.sources, validateSource));
export const claims: Claim[] = claimPartitions.flatMap((partition) => collect<Claim>(partition.claims, validateClaim));
export const disputes: Dispute[] = claimPartitions.flatMap((partition) => collect<Dispute>(partition.disputes ?? [], validateDispute));
export const evidence: Evidence[] = claimPartitions.flatMap((partition) => collect<Evidence>(partition.evidence ?? [], validateEvidence));

const sourceIndex = new Map<SourceId, Source>();
for (const source of sources) {
  if (sourceIndex.has(source.id)) ledgerErrors.push(`Duplicate source id "${source.id}".`);
  sourceIndex.set(source.id, source);
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

for (const artifact of evidence) {
  for (const claimId of artifact.claims) {
    const supporting = evidenceByClaim.get(claimId) ?? [];
    supporting.push(artifact);
    evidenceByClaim.set(claimId, supporting);
  }
}

// ── Lookups ──────────────────────────────────────────────────
export function sourceById(id: SourceId): Source | undefined {
  return sourceIndex.get(id);
}
export function claimById(id: ClaimId): Claim | undefined {
  return claimIndex.get(id);
}
export function disputeById(id: DisputeId): Dispute | undefined {
  return disputeIndex.get(id);
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
 * Every live claim about an entity, in render order. A claim that has been
 * superseded stays in the ledger and on `/corrections/` but leaves the page —
 * that is what "corrections supersede, they never delete" means in practice
 * (rule 10). Retractions are handled the same way and are struck, not hidden.
 */
export function claimsFor(entityId: EntityId): Claim[] {
  return (claimsByEntity.get(entityId) ?? [])
    .filter((claim) => !supersededBy.has(claim.id) && claim.retracted !== true)
    .sort(byConfidenceThenId);
}

/** Every claim about an entity including superseded and retracted ones (the ledger view). */
export function allClaimsFor(entityId: EntityId): Claim[] {
  return (claimsByEntity.get(entityId) ?? []).slice().sort(byConfidenceThenId);
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

/** The competing claims under one dispute, in a stable order. Never fewer than two. */
export function claimsInDispute(id: DisputeId): Claim[] {
  return (claimsByDispute.get(id) ?? []).slice().sort((a, b) => a.id.localeCompare(b.id));
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

// ── Corrections and retractions (`/corrections/`, generated) ──
/** Claims that corrected an earlier one, newest id last. Generated, not maintained. */
export function corrections(): Claim[] {
  return claims.filter((claim) => Boolean(claim.supersedes)).sort((a, b) => a.id.localeCompare(b.id));
}
/** Claims that were withdrawn. Struck and kept, never deleted (rule 10). */
export function retractions(): Claim[] {
  return claims.filter((claim) => claim.retracted === true).sort((a, b) => a.id.localeCompare(b.id));
}

// ── Editorial transparency (`EEAT_STRATEGY.md` §6.3) ─────────
/**
 * When a page was last reviewed: the most recent date on which a human went to
 * one of the sources it rests on. Derived from the sources' `accessedAt`, never
 * stamped by the build — a build-stamped date says only that a deploy happened.
 */
export function lastReviewed(entityId: EntityId): string | undefined {
  const dates = claimsFor(entityId)
    .flatMap((claim) => sourcesOf(claim))
    .map((source) => source.accessedAt)
    .filter((date): date is string => Boolean(date))
    .sort();
  return dates[dates.length - 1];
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
  /** True when the entity publishes its own coordinates. */
  lastReviewed?: string;
};

/** The numbers behind a page's trust line. Pure counting — no judgement. */
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
    lastReviewed: lastReviewed(entityId),
  };
}

/** Every source the site cites anywhere, with the claims that rest on it. */
export function ledgerBySource(): Array<{ source: Source; claims: Claim[] }> {
  return sources
    .map((source) => ({ source, claims: citedBy(source.id) }))
    .sort((a, b) => a.source.id.localeCompare(b.source.id));
}

// ── Localisation ─────────────────────────────────────────────
// The knowledge tier is bg + en (Constitution rule 43); other languages fall back
// to en, exactly as the entity prose already does.
function pick(text: LocalizedText, lang: LanguageCode): string {
  return text[lang] ?? text.en ?? text.bg;
}

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

export type { Claim, ClaimAspect, ClaimConfidence, Dispute, Source } from "./claims";
