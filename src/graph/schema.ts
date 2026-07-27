import type { LanguageCode, LocalizedText } from "../locales/types";
import { isLocalizedText } from "./text";
import { validateMedia, type MediaAsset } from "./media";

// ─────────────────────────────────────────────────────────────
// The entity schema — the one frozen contract (ADR-001, ADR-004).
//
// Entities are authored as schema-validated JSON records under
// `src/graph/<region>/…` and compiled to an in-memory graph at build. This file
// is that schema: the TypeScript types every record must satisfy, plus a runtime
// `validateEntity()` used both by the build's graph-audit gate and by `index.ts`
// when it assembles the graph. Nothing here reads content or derives anything —
// derivation (reciprocal edges, distances, containment) lives in `index.ts`.
//
// The model is `KNOWLEDGE_GRAPH.md §1` verbatim, absorbing the `RegionPlace`
// shape of `region.ts` (ADR-002). Claims/sources are deliberately absent: the
// provenance ledger is M4. In M3 an entity's prose is transcluded from existing
// verified content (locale `placesList`, `region.ts` notes, guides) via
// `contentRef`, never duplicated (Goal 3), or carried inline for entities that
// have no existing home yet.
// ─────────────────────────────────────────────────────────────

export type EntityId = string; // stable forever, never reused (Constitution rule 12)

/** `KNOWLEDGE_GRAPH.md §2`. Kinds without a real referent stay unpopulated. */
export type EntityKind =
  | "region"
  | "province"
  | "municipality"
  | "settlement"
  | "cave"
  | "landform"
  | "waterBody"
  | "spring"
  | "protectedArea"
  | "geopark"
  | "archaeologicalSite"
  | "building"
  | "route"
  | "person"
  | "legend"
  | "event"
  | "tradition"
  | "period"
  | "business"
  | "species";

/** Google-KG familiarity, drives strategy not rendering (`KNOWLEDGE_GRAPH.md §4`). */
export type EntityConfidence = "E5" | "E4" | "E3" | "E2" | "E1";

/**
 * Typed, non-containment edges (`KNOWLEDGE_GRAPH.md §1`). Containment is the
 * separate `parent` field. A relation is asserted only when it is true in the
 * world (Constitution rule 13); symmetric relations render both ways with
 * identical values (rule 14) — reciprocity is derived in `index.ts`, so a record
 * asserts an edge once and the reverse is generated.
 */
export type RelationType =
  | "contains"
  | "containedIn"
  | "nearby"
  | "sameFormation"
  | "sameWatershed"
  | "birthPlaceOf"
  | "subjectOf"
  | "accessedFrom"
  | "combinesWellWith"
  | "supersededBy"
  | "operatedBy"
  | "locatedIn";

export type Relation = {
  type: RelationType;
  target: EntityId;
  /** Mandatory on distances (`KNOWLEDGE_GRAPH.md §1 rule 2`). */
  basis?: "straight-line" | "road";
  /** Straight-line km are DERIVED from coordinates; a hand-set km needs a basis. */
  km?: number;
  /** Required on any edge over 60 km (`KNOWLEDGE_GRAPH.md §7 rule 4`). */
  reason?: LocalizedText;
};

export type EntityGeo = { lat: number; lon: number } | { linear: true };

/** External identity — the point of the exercise (`KNOWLEDGE_GRAPH.md §1`). */
export type EntitySameAs = {
  wikidata?: string;
  wikipedia?: Partial<Record<LanguageCode, string>>;
  osm?: string;
  geonames?: string;
  natura2000?: string;
  commons?: string;
  gbif?: string;
};

/**
 * A media reference. The contract lives in `media.ts` (ADR-019) — every asset
 * carries a licence, a capture date, a credit and a depicted entity or it does
 * not render (Constitution rule 45), and `aiGenerated` assets never reach a
 * published page (V11). Re-exported here because an entity's `media` field is
 * part of the entity contract even though its shape is owned elsewhere.
 */
export type { MediaAsset, MediaRef } from "./media";

/**
 * A name this thing is also known by (M5, Part 6). Not decoration: the reason a
 * search for "Иглен" finds Ъглен, the reason `alternateName` in the JSON-LD lets
 * a knowledge base merge two records it would otherwise hold apart, and the
 * reason a visitor typing a spelling nobody standardised still arrives.
 *
 * An alias is a name, never a claim. "The village was called Иглен" is a sourced
 * statement and belongs in the ledger; the string "Иглен" belongs here so that
 * the machinery can find it. Both exist, and neither substitutes for the other.
 */
export type AliasKind =
  | "historical" // a name it went by, no longer current
  | "variant" // a spelling or transliteration of the current name
  | "local" // what people here call it, unofficially
  | "official" // a formal or administrative designation
  | "scientific"; // a binomial or taxonomic name

export type EntityAlias = {
  name: LocalizedText;
  kind: AliasKind;
  /** When the name was in use: "XV–XVI в.", "until 1934". Free text, not a date. */
  period?: string;
  note?: LocalizedText;
};

/**
 * Where an entity's prose comes from without duplicating it (Goal 3). Exactly
 * one source is resolved by `index.ts`:
 *   • placeId    → `contentByLanguage[lang].placesList` (the six E1 places)
 *   • regionId   → the `RegionPlace.note` in `region.ts` (the nine E4/E5 places)
 *   • guideSlug  → the guide's summary (supplementary)
 */
export type ContentRef = {
  placeId?: string;
  regionId?: string;
  guideSlug?: string;
};

export type PublicationStatus =
  | "published" // a real `/place/<slug>/` (or `/karst/`) page ships
  | "draft" // record exists, page held back
  | "node"; // graph node only — rendered as a section of its parent (rule 15)

export type EntityPage = {
  /** Language-agnostic path, e.g. "/place/dupkata/". Slug may change via 301. */
  path: string;
  priority: 1 | 2 | 3 | 4;
  status: PublicationStatus;
  /**
   * A breadcrumb starts (after Home) at the nearest ancestor flagged here — the
   * karst is the knowledge-subject root, the village its own front door
   * (village-first nav, ADR-013). Without a flagged ancestor the chain walks to
   * the parent-less root.
   */
  breadcrumbRoot?: boolean;
};

/** The canonical entity record. `KNOWLEDGE_GRAPH.md §1`, absorbing `RegionPlace`. */
export type Entity = {
  id: EntityId;
  kind: EntityKind;
  slug: string;
  /** schema.org type that matches what the thing IS (drops `TouristDestination`, C6). */
  schemaType: string;
  /** A Wikidata/other URI for a type schema.org lacks (e.g. Cave → Q35509). */
  additionalType?: string;
  /** Localized name. Omitted when `contentRef` supplies it. */
  name?: LocalizedText;
  /** Other names this thing answers to — historical, local, variant spellings. */
  aliases?: EntityAlias[];
  /** Exactly one containment parent, or none for the root subject. */
  parent?: EntityId;
  relations: Relation[];
  geo?: EntityGeo;
  sameAs?: EntitySameAs;
  confidence: EntityConfidence;
  media?: MediaAsset[];
  contentRef?: ContentRef;
  shortDescription?: LocalizedText;
  longDescription?: LocalizedText;
  /**
   * Authored prose for the "За мястото" section, replacing the machine narration
   * of this entity's claims on the entity page (ADR-018). The claims stay in the
   * ledger and keep feeding JSON-LD, `/sources/` and the aspect pages; what
   * changes is only who writes the paragraph a visitor reads.
   */
  story?: LocalizedText;
  page?: EntityPage;
};

// ── Validation ───────────────────────────────────────────────
// Structural validation only: shape, enums, required fields, internal
// consistency of a single record. Cross-entity rules (dangling targets,
// reciprocity, orphans, coordinate inheritance) are graph-level and live in
// `scripts/graph-audit.mjs`, which runs on the assembled graph.

const ENTITY_KINDS = new Set<EntityKind>([
  "region", "province", "municipality", "settlement", "cave", "landform",
  "waterBody", "spring", "protectedArea", "geopark", "archaeologicalSite",
  "building", "route", "person", "legend", "event", "tradition", "period",
  "business", "species",
]);

const RELATION_TYPES = new Set<RelationType>([
  "contains", "containedIn", "nearby", "sameFormation", "sameWatershed",
  "birthPlaceOf", "subjectOf", "accessedFrom", "combinesWellWith",
  "supersededBy", "operatedBy", "locatedIn",
]);

const CONFIDENCES = new Set<EntityConfidence>(["E5", "E4", "E3", "E2", "E1"]);

const ALIAS_KINDS = new Set<AliasKind>(["historical", "variant", "local", "official", "scientific"]);

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Validate one record's structure. Returns a list of human-readable problems;
 * an empty list means the record is well-formed. Never throws.
 */
export function validateEntity(entity: unknown): string[] {
  const problems: string[] = [];
  const e = entity as Partial<Entity>;
  const id = typeof e?.id === "string" ? e.id : "<no id>";

  if (!e || typeof e !== "object") return [`${id}: record is not an object.`];
  if (typeof e.id !== "string" || e.id.length === 0) problems.push(`${id}: missing id.`);
  if (typeof e.slug !== "string" || !SLUG_RE.test(e.slug)) problems.push(`${id}: slug "${e.slug}" is not a kebab-case slug.`);
  if (typeof e.schemaType !== "string" || e.schemaType.length === 0) problems.push(`${id}: missing schemaType.`);
  if (!e.kind || !ENTITY_KINDS.has(e.kind)) problems.push(`${id}: invalid kind "${e.kind}".`);
  if (!e.confidence || !CONFIDENCES.has(e.confidence)) problems.push(`${id}: invalid confidence "${e.confidence}".`);

  if (e.name !== undefined && !isLocalizedText(e.name)) problems.push(`${id}: name is not localized text with a bg fallback.`);
  if (e.shortDescription !== undefined && !isLocalizedText(e.shortDescription)) problems.push(`${id}: shortDescription is malformed.`);
  if (e.longDescription !== undefined && !isLocalizedText(e.longDescription)) problems.push(`${id}: longDescription is malformed.`);
  if (e.story !== undefined && !isLocalizedText(e.story)) problems.push(`${id}: story is malformed.`);

  // A record must resolve a name somehow: inline name, or a contentRef.
  const hasContentRef = Boolean(e.contentRef && (e.contentRef.placeId || e.contentRef.regionId || e.contentRef.guideSlug));
  if (!e.name && !hasContentRef) problems.push(`${id}: has neither an inline name nor a contentRef to resolve one.`);

  if (!Array.isArray(e.relations)) {
    problems.push(`${id}: relations must be an array.`);
  } else {
    e.relations.forEach((relation, index) => {
      if (!relation || !RELATION_TYPES.has(relation.type)) problems.push(`${id}: relation[${index}] has invalid type "${relation?.type}".`);
      if (typeof relation?.target !== "string" || relation.target.length === 0) problems.push(`${id}: relation[${index}] has no target.`);
      if (relation?.km !== undefined && relation.basis === undefined) problems.push(`${id}: relation[${index}] carries a km with no basis.`);
    });
  }

  if (e.geo !== undefined) {
    const point = e.geo as { lat?: unknown; lon?: unknown; linear?: unknown };
    const isLinear = point.linear === true;
    const isPoint = typeof point.lat === "number" && typeof point.lon === "number";
    if (!isLinear && !isPoint) problems.push(`${id}: geo must be {lat,lon} or {linear:true}.`);
  }

  if (e.page !== undefined) {
    if (typeof e.page.path !== "string" || !e.page.path.startsWith("/")) problems.push(`${id}: page.path must be an absolute path.`);
    if (![1, 2, 3, 4].includes(e.page.priority as number)) problems.push(`${id}: page.priority must be 1–4.`);
    if (!["published", "draft", "node"].includes(e.page.status as string)) problems.push(`${id}: page.status is invalid.`);
  }

  if (e.aliases !== undefined) {
    if (!Array.isArray(e.aliases)) {
      problems.push(`${id}: aliases must be an array.`);
    } else {
      e.aliases.forEach((alias, index) => {
        if (!isLocalizedText(alias?.name)) problems.push(`${id}: aliases[${index}] has no localized name.`);
        if (!alias || !ALIAS_KINDS.has(alias.kind)) problems.push(`${id}: aliases[${index}] has invalid kind "${alias?.kind}".`);
        if (alias?.note !== undefined && !isLocalizedText(alias.note)) problems.push(`${id}: aliases[${index}] note is malformed.`);
      });
    }
  }

  // Rule 45 and V11 in the one place a single record can be judged: a machine-made
  // image may not sit on a published page whatever else it carries. The rest of
  // rule 45 — licence, date, credit, depicted entity — is a rendering decision
  // (`media.isRenderable`) and a build gate, not a reason to reject the record.
  (e.media ?? []).forEach((asset, index) => {
    problems.push(...validateMedia(asset, id, index));
    if (asset?.aiGenerated === true && e.page?.status === "published") {
      problems.push(`${id}: media[${index}] is aiGenerated and may not render on a published page (rule 45 / V11).`);
    }
  });

  return problems;
}
