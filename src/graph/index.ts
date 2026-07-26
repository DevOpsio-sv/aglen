import type { LanguageCode } from "../locales/types";
import { contentByLanguage } from "../content";
import {
  LOVECH_PROVINCE,
  regionPlaceById,
  regionName,
  regionNote,
  sameAsUrls as regionSameAsUrls,
  straightLineKm,
  type RegionPlace,
} from "../region";
import { findGuide, localizeGuide } from "../guides";
import lukovitRecords from "./karst/lukovit/entities.json";
import { validateEntity, type Entity, type EntityId, type Relation } from "./schema";

// ─────────────────────────────────────────────────────────────
// The compiled knowledge graph.
//
// Records are authored as JSON (schema.ts is the contract); this module loads
// every partition, validates it, assembles the in-memory graph and DERIVES
// everything the rest of the site reads: reciprocal edges (Constitution rule 14),
// straight-line distances from coordinates (rule 19 / §1.4.4), containment chains
// for breadcrumbs, and the internal links that replace the hand-authored
// `internalLinkRouteIds`. Pages, JSON-LD, sitemaps and the AI export are all pure
// functions of this graph — if a surface disagrees with it, the surface is wrong
// (rule 1). Nothing here is a target; page count follows what is known (rule 26).
//
// Prose is transcluded from existing verified content (rule 3, one source of
// truth): `contentRef.placeId` → the locale `placesList`, `contentRef.regionId`
// → the `region.ts` note, `contentRef.guideSlug` → the guide summary. It is never
// copied into the records.
// ─────────────────────────────────────────────────────────────

const partitions: Array<{ partition: string; entities: unknown[] }> = [
  lukovitRecords as { partition: string; entities: unknown[] },
];

/** Problems found while loading — surfaced by graph-audit, never thrown at runtime. */
export const assembleErrors: string[] = [];

const rawEntities: Entity[] = [];
for (const partition of partitions) {
  for (const record of partition.entities ?? []) {
    const problems = validateEntity(record);
    if (problems.length > 0) {
      assembleErrors.push(...problems);
      continue;
    }
    rawEntities.push(record as Entity);
  }
}

export const entities: Entity[] = rawEntities;

const byId = new Map<EntityId, Entity>();
const bySlug = new Map<string, Entity>();
const byPath = new Map<string, Entity>();
for (const entity of entities) {
  if (byId.has(entity.id)) assembleErrors.push(`Duplicate entity id "${entity.id}".`);
  byId.set(entity.id, entity);
  if (bySlug.has(entity.slug)) assembleErrors.push(`Duplicate slug "${entity.slug}" (ids ${bySlug.get(entity.slug)!.id}, ${entity.id}).`);
  bySlug.set(entity.slug, entity);
  if (entity.page) {
    if (byPath.has(entity.page.path)) assembleErrors.push(`Duplicate page path "${entity.page.path}".`);
    byPath.set(entity.page.path, entity);
  }
}

// ── Derived containment ──────────────────────────────────────
const childrenById = new Map<EntityId, Entity[]>();
for (const entity of entities) {
  if (!entity.parent) continue;
  if (!byId.has(entity.parent)) {
    assembleErrors.push(`Entity "${entity.id}" has parent "${entity.parent}" which does not exist.`);
    continue;
  }
  const siblings = childrenById.get(entity.parent) ?? [];
  siblings.push(entity);
  childrenById.set(entity.parent, siblings);
}

// ── Derived reciprocity (Constitution rule 14 / V7) ──────────
// A symmetric relation asserted once renders both ways with identical values.
// The reverse edge is derived here so a record never hand-authors both sides.
const SYMMETRIC = new Set<Relation["type"]>(["sameFormation", "sameWatershed", "combinesWellWith", "nearby"]);
const derivedRelationsById = new Map<EntityId, Relation[]>();
for (const entity of entities) derivedRelationsById.set(entity.id, [...entity.relations]);
for (const entity of entities) {
  for (const relation of entity.relations) {
    if (!SYMMETRIC.has(relation.type)) continue;
    const targetEdges = derivedRelationsById.get(relation.target);
    if (!targetEdges) continue; // dangling target — graph-audit reports it
    const already = targetEdges.some((edge) => edge.type === relation.type && edge.target === entity.id);
    if (!already) targetEdges.push({ ...relation, target: entity.id });
  }
}

// ── Public lookups ───────────────────────────────────────────
export function entityById(id: EntityId): Entity | undefined {
  return byId.get(id);
}
export function entityBySlug(slug: string): Entity | undefined {
  return bySlug.get(slug);
}
/** Look up by language-agnostic page path, e.g. "/place/dupkata/". */
export function entityByPath(path: string): Entity | undefined {
  return byPath.get(path);
}
export function childrenOf(id: EntityId): Entity[] {
  return childrenById.get(id) ?? [];
}
export function relationsOf(entity: Entity): Relation[] {
  return derivedRelationsById.get(entity.id) ?? entity.relations;
}

/** Entities that ship a real page (status "published"). */
export function pageEntities(): Entity[] {
  return entities.filter((entity) => entity.page?.status === "published");
}
/** Published entities whose page lives under /place/. */
export function placePageEntities(): Entity[] {
  return pageEntities().filter((entity) => entity.page!.path.startsWith("/place/"));
}

/** The published entity that transcludes a given locale placeId, if any. */
export function entityForPlaceId(placeId: string): Entity | undefined {
  return entities.find((entity) => entity.contentRef?.placeId === placeId && entity.page?.status === "published");
}

/** The published entity that absorbs a given region.ts id, if any. */
export function entityForRegionId(regionId: string): Entity | undefined {
  return entities.find((entity) => entity.contentRef?.regionId === regionId && entity.page?.status === "published");
}

// ── Transcluded text (one source of truth) ───────────────────
function pick(text: { bg: string } & Partial<Record<LanguageCode, string>>, lang: LanguageCode): string {
  return text[lang] ?? text.en ?? text.bg;
}

/** The absorbed `region.ts` record for a contentRef.regionId, incl. the province. */
function regionRecord(id: string): RegionPlace | undefined {
  if (id === LOVECH_PROVINCE.id) return LOVECH_PROVINCE;
  return regionPlaceById.get(id);
}

export function entityName(entity: Entity, lang: LanguageCode): string {
  if (entity.name) return pick(entity.name, lang);
  if (entity.contentRef?.placeId) {
    const place = contentByLanguage[lang].placesList.find((p) => p.id === entity.contentRef!.placeId);
    if (place) return place.title;
  }
  if (entity.contentRef?.regionId) {
    const region = regionRecord(entity.contentRef.regionId);
    if (region) return regionName(region, lang);
  }
  return entity.slug;
}

/** Short description, transcluded from the record or the referenced content. */
export function entityShortText(entity: Entity, lang: LanguageCode): string {
  if (entity.shortDescription) return pick(entity.shortDescription, lang);
  if (entity.contentRef?.placeId) {
    const place = contentByLanguage[lang].placesList.find((p) => p.id === entity.contentRef!.placeId);
    if (place) return place.description;
  }
  if (entity.contentRef?.regionId) {
    const region = regionRecord(entity.contentRef.regionId);
    if (region) return regionNote(region, lang);
  }
  if (entity.contentRef?.guideSlug) {
    const guide = findGuide(entity.contentRef.guideSlug);
    if (guide) return localizeGuide(guide.summary, lang);
  }
  return "";
}

export function entityLongText(entity: Entity, lang: LanguageCode): string | undefined {
  return entity.longDescription ? pick(entity.longDescription, lang) : undefined;
}

// ── Identity / geo ───────────────────────────────────────────
export function entitySameAs(entity: Entity): string[] {
  const s = entity.sameAs;
  if (!s) {
    if (entity.contentRef?.regionId) {
      const region = regionRecord(entity.contentRef.regionId);
      if (region) return regionSameAsUrls(region);
    }
    return [];
  }
  const urls: string[] = [];
  if (s.wikidata) urls.push(`https://www.wikidata.org/wiki/${s.wikidata}`);
  if (s.wikipedia?.bg) urls.push(`https://bg.wikipedia.org/wiki/${encodeURIComponent(s.wikipedia.bg.replace(/ /g, "_"))}`);
  if (s.wikipedia?.en) urls.push(`https://en.wikipedia.org/wiki/${encodeURIComponent(s.wikipedia.en.replace(/ /g, "_"))}`);
  if (s.commons) urls.push(`https://commons.wikimedia.org/wiki/${encodeURIComponent(s.commons)}`);
  if (s.osm) urls.push(`https://www.openstreetmap.org/${s.osm}`);
  if (s.geonames) urls.push(`https://www.geonames.org/${s.geonames}`);
  return urls;
}

type Point = { lat: number; lon: number };
export function entityPoint(entity: Entity): Point | undefined {
  if (entity.geo && "lat" in entity.geo) return { lat: entity.geo.lat, lon: entity.geo.lon };
  return undefined;
}

/** Straight-line km between two point-geo entities, or undefined for linear ones. */
export function straightLineKmBetween(a: Entity, b: Entity): number | undefined {
  const pa = entityPoint(a);
  const pb = entityPoint(b);
  if (!pa || !pb) return undefined;
  return straightLineKm({ latitude: pa.lat, longitude: pa.lon }, { latitude: pb.lat, longitude: pb.lon });
}

// ── Breadcrumb trail (containment, Constitution rule 19) ─────
// Ordered ancestors including the entity itself, from the nearest breadcrumbRoot
// (the karst subject root or the village front door) down to the entity. The
// caller prefixes Home and resolves names per language.
export function breadcrumbTrail(entity: Entity): Entity[] {
  const chain: Entity[] = [];
  let current: Entity | undefined = entity;
  const guard = new Set<EntityId>();
  while (current) {
    if (guard.has(current.id)) break; // cycle guard — graph-audit reports it
    guard.add(current.id);
    chain.unshift(current);
    if (current.page?.breadcrumbRoot) break;
    current = current.parent ? byId.get(current.parent) : undefined;
  }
  return chain;
}

// ── Derived internal links (replaces internalLinkRouteIds) ───
// Every link is the rendering of a typed edge; anchor text is generated from the
// relation and carries a fact (Constitution rules 19–20). Only targets that ship
// a page are linked; a nodes-only target renders as a section of its parent.
export type DerivedLink = { path: string; label: string; entityId: EntityId };

function distanceFact(km: number, lang: LanguageCode): string {
  const rounded = Math.round(km * 10) / 10;
  return lang === "bg" ? `${rounded} км по права линия` : `${rounded} km in a straight line`;
}

function relationFact(type: Relation["type"], lang: LanguageCode): string {
  const bg: Partial<Record<Relation["type"], string>> = {
    sameFormation: "обща геология",
    sameWatershed: "същия водосбор",
    combinesWellWith: "съчетава се добре",
    accessedFrom: "оттук се стига",
    birthPlaceOf: "роден тук",
    subjectOf: "свързана история",
    supersededBy: "наследено от",
    locatedIn: "в границите на",
    contains: "в него",
    containedIn: "част от",
    operatedBy: "стопанисва се от",
    nearby: "наблизо",
  };
  const en: Partial<Record<Relation["type"], string>> = {
    sameFormation: "same geology",
    sameWatershed: "same watershed",
    combinesWellWith: "combines well",
    accessedFrom: "reached from here",
    birthPlaceOf: "born here",
    subjectOf: "related story",
    supersededBy: "succeeded by",
    locatedIn: "within",
    contains: "contains",
    containedIn: "part of",
    operatedBy: "operated by",
    nearby: "nearby",
  };
  return (lang === "bg" ? bg[type] : en[type]) ?? "";
}

/**
 * Links for an entity page, derived from its edges. Order: containment (parent,
 * then children), typed relations, then derived nearby — each carrying a fact,
 * each pointing at a page that exists (zero 301-hops, the id resolves to the
 * entity's own path).
 */
export function derivedLinks(entity: Entity, lang: LanguageCode, nearbyLimit = 3): DerivedLink[] {
  const links: DerivedLink[] = [];
  const seen = new Set<EntityId>([entity.id]);

  const linkTo = (target: Entity | undefined, fact: string) => {
    if (!target || seen.has(target.id) || target.page?.status !== "published") return;
    seen.add(target.id);
    links.push({ path: target.page.path, entityId: target.id, label: `${entityName(target, lang)} — ${fact}` });
  };

  if (entity.parent) linkTo(byId.get(entity.parent), relationFact("containedIn", lang));
  for (const child of childrenOf(entity.id)) linkTo(child, relationFact("contains", lang));

  for (const relation of relationsOf(entity)) {
    if (relation.type === "nearby") continue; // nearby is derived from coordinates below
    const target = byId.get(relation.target);
    let fact = relationFact(relation.type, lang);
    if (relation.reason) fact = pick(relation.reason, lang);
    linkTo(target, fact);
  }

  // Derived nearby: nearest point-geo pages by straight-line distance.
  const here = entityPoint(entity);
  if (here) {
    const ranked = entities
      .filter((other) => other.id !== entity.id && other.page?.status === "published" && entityPoint(other))
      .map((other) => ({ other, km: straightLineKmBetween(entity, other)! }))
      .sort((a, b) => a.km - b.km)
      .slice(0, nearbyLimit);
    for (const { other, km } of ranked) linkTo(other, distanceFact(km, lang));
  }

  return links;
}
