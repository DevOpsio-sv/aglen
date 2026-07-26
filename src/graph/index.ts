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
import { pick, searchKey } from "./text";
import { galleryAssets, heroAsset, type MediaAsset } from "./media";
import {
  NAMESPACES,
  REGIONS,
  homeNamespaceOf,
  namespaceForPath,
  regionByRootPath,
  type NamespaceDef,
  type RegionDef,
} from "./registry";
import { validateEntity, type Entity, type EntityAlias, type EntityId, type Relation } from "./schema";

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

/** Problems found while loading — surfaced by graph-audit, never thrown at runtime. */
export const assembleErrors: string[] = [];

// Records arrive per region (ADR-009 / ADR-016). The loop is over the region
// registry rather than over an import list, so a second region is a row of data
// and this file never learns its name.
const rawEntities: Entity[] = [];
const regionOfEntity = new Map<EntityId, RegionDef>();
for (const region of REGIONS) {
  for (const record of region.entities) {
    const problems = validateEntity(record);
    if (problems.length > 0) {
      assembleErrors.push(...problems);
      continue;
    }
    const entity = record as Entity;
    rawEntities.push(entity);
    regionOfEntity.set(entity.id, region);
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

// ── Namespace discipline (M5, ADR-016) ───────────────────────
// A record's kind decides where its page may live. Checked here rather than in
// `schema.ts` because the answer lives in the registry and the schema is the
// frozen contract; checked at all because "which namespace does a cave go in?"
// must have exactly one answer, enforced, rather than a convention that holds
// until somebody puts a legend under /place/ and nothing complains.
for (const entity of entities) {
  const page = entity.page;
  if (!page || page.status !== "published") continue;
  const region = regionByRootPath(page.path);
  if (region) {
    if (region.rootEntityId !== entity.id) {
      assembleErrors.push(`"${entity.id}" publishes ${page.path}, which is the root page of region "${region.id}" ("${region.rootEntityId}").`);
    }
    continue;
  }
  const namespace = namespaceForPath(page.path);
  if (!namespace) {
    assembleErrors.push(`"${entity.id}" publishes ${page.path}, which is under no declared namespace or region root (registry.ts).`);
    continue;
  }
  if (!namespace.kinds.includes(entity.kind)) {
    const home = homeNamespaceOf(entity.kind);
    const expected = home ? `/${home.slug}/` : "no page namespace — another product owns that URL";
    assembleErrors.push(`"${entity.id}" is a ${entity.kind} publishing under ${namespace.prefix}; a ${entity.kind} belongs in ${expected} (registry.ts).`);
  }
}

// ── Names and aliases (M5, Part 6) ───────────────────────────
// Every string a thing answers to, folded to one key each — "Проходна",
// "Prohodna" and "prohodna" are one key, which is what makes a search across two
// scripts work and what makes a duplicate visible.
//
// A collision WITHIN one region is a gate: a region is one physiographic subtree
// under one editor (ADR-009), and two records answering to the same name inside it
// are either one thing entered twice or two things whose names need
// disambiguating — a human decides which, and until then the build stops (rule 2).
// A collision ACROSS regions is not an error: Bulgaria has many villages called
// Ново село. Those are reported by the health dashboard, never gated.
const nameOwners = new Map<string, EntityId[]>();
for (const entity of entities) {
  const region = regionOfEntity.get(entity.id);
  for (const key of new Set(nameKeysOf(entity))) {
    const owners = nameOwners.get(key) ?? [];
    const clash = owners.find((owner) => regionOfEntity.get(owner)?.id === region?.id);
    if (clash) {
      assembleErrors.push(`"${entity.id}" and "${clash}" both answer to "${key}" inside region "${region?.id}" — one thing, one record (rule 2).`);
    }
    owners.push(entity.id);
    nameOwners.set(key, owners);
  }
}

/** Every folded search key an entity answers to: its resolved names plus its aliases. */
function nameKeysOf(entity: Entity): string[] {
  const strings: string[] = ["bg", "en"].map((lang) => entityName(entity, lang as LanguageCode));
  for (const alias of entity.aliases ?? []) {
    for (const value of Object.values(alias.name)) if (typeof value === "string") strings.push(value);
  }
  return strings.map(searchKey).filter(Boolean);
}

/** Entities that answer to a folded name key, across every region. */
export function entitiesNamed(key: string): Entity[] {
  return (nameOwners.get(key) ?? []).map((id) => byId.get(id)).filter((entity): entity is Entity => Boolean(entity));
}

/** Every folded name key in the graph, with the entities that answer to it. */
export function nameKeyIndex(): Array<{ key: string; entityIds: EntityId[] }> {
  return [...nameOwners.entries()].map(([key, entityIds]) => ({ key, entityIds }));
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

// ── Derived inbound edges ────────────────────────────────────
// A record asserts an edge once, in the direction that reads true in the world:
// the village is the birthplace of Kunev, the church is the subject of the
// Revival story. Rendered from the other end those same edges are what stops a
// person, legend or period page from being a dead end (Constitution rule 23), so
// the reverse direction is DERIVED here rather than hand-authored on both sides
// (rule 19). Symmetric edges are already mirrored above and simply dedupe.
const inboundById = new Map<EntityId, Array<{ from: Entity; type: Relation["type"] }>>();
for (const entity of entities) {
  for (const relation of entity.relations) {
    if (!byId.has(relation.target)) continue; // dangling — graph-audit reports it
    const inbound = inboundById.get(relation.target) ?? [];
    inbound.push({ from: entity, type: relation.type });
    inboundById.set(relation.target, inbound);
  }
}

/** Entities that assert an edge pointing at this one, with the edge's type. */
export function inboundRelationsOf(id: EntityId): Array<{ from: Entity; type: Relation["type"] }> {
  return inboundById.get(id) ?? [];
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

/**
 * Published entities under one namespace root, e.g. "/legend/" or "/history/".
 * Ordering is by page priority, then id, so an index page is a stable function of
 * the graph rather than of the order records happen to sit in a file.
 */
export function namespaceEntities(prefix: string): Entity[] {
  return pageEntities()
    .filter((entity) => entity.page!.path.startsWith(prefix))
    .sort((a, b) => a.page!.priority - b.page!.priority || a.id.localeCompare(b.id));
}

/** The namespace root a published entity's page sits under, e.g. "/history/". */
export function namespaceOf(entity: Entity): string | undefined {
  const path = entity.page?.path;
  if (!path) return undefined;
  const match = /^\/[^/]+\//.exec(path);
  return match ? match[0] : undefined;
}

/** The declared namespace an entity publishes under, or undefined for a region root. */
export function namespaceDefOf(entity: Entity): NamespaceDef | undefined {
  return entity.page ? namespaceForPath(entity.page.path) : undefined;
}

/**
 * Namespaces that hold at least one published entity. The route table, the
 * sitemaps and the site's own indexes are all built from this rather than from
 * the full registry, so a declared-but-empty namespace ships no page at all —
 * page count follows what is known (Constitution rule 26). The day the first
 * species record publishes, `/species/` and its index appear with no code change.
 */
export function activeNamespaces(): NamespaceDef[] {
  return NAMESPACES.filter((namespace) => namespaceEntities(namespace.prefix).length > 0);
}

// ── Regions (ADR-009 / ADR-016) ──────────────────────────────

/** The region partition an entity was authored in. */
export function regionOf(entity: Entity): RegionDef | undefined {
  return regionOfEntity.get(entity.id);
}

/** Every region that actually holds records, in registry order. */
export function activeRegions(): RegionDef[] {
  return REGIONS.filter((region) => entities.some((entity) => regionOfEntity.get(entity.id)?.id === region.id));
}

/** The root entity of an entity's region — what `/karst/` is for the Lukovit karst. */
export function regionRootOf(entity: Entity): Entity | undefined {
  const region = regionOf(entity);
  return region ? byId.get(region.rootEntityId) : undefined;
}

/**
 * The settlement an entity's region measures its distances from. The village a
 * page says "≈ 12 km from here" about is a property of the region, so the render
 * layer asks for it instead of naming Aglen — which is what lets Region 2's pages
 * measure from Region 2's base without a single component knowing either name.
 */
export function baseEntityOf(entity: Entity): Entity | undefined {
  const region = regionOf(entity);
  return region?.baseEntityId ? byId.get(region.baseEntityId) : undefined;
}

// ── Aliases (M5, Part 6) ─────────────────────────────────────

/** Every other name this thing answers to, in one language, deduplicated. */
export function entityAliases(entity: Entity, lang: LanguageCode): string[] {
  const primary = entityName(entity, lang);
  const seen = new Set<string>([searchKey(primary)]);
  const out: string[] = [];
  for (const alias of entity.aliases ?? []) {
    const value = pick(alias.name, lang);
    const key = searchKey(value);
    if (!value || !key || seen.has(key)) continue;
    seen.add(key);
    out.push(value);
  }
  return out;
}

/** The aliases of one kind — historical names, variant spellings, local usage. */
export function aliasesOfKind(entity: Entity, kind: EntityAlias["kind"]): EntityAlias[] {
  return (entity.aliases ?? []).filter((alias) => alias.kind === kind);
}

// ── Media (ADR-019) ──────────────────────────────────────────
// The graph answers "which picture is this entity's" so no surface has to guess.
// An entity that carries its own renderable asset uses it; one that does not falls
// back at the call site to the kind's borrowed plate, exactly as it does today.

/** The entity's own hero photograph, if it has one rule 45 permits rendering. */
export function entityHeroAsset(entity: Entity): MediaAsset | undefined {
  return heroAsset(entity.media);
}

/** The entity's own gallery, rule 45 applied, superseded frames removed. */
export function entityGallery(entity: Entity): MediaAsset[] {
  return galleryAssets(entity.media);
}

/** Every asset the graph holds, with the entity that carries it. For the audits. */
export function allMedia(): Array<{ entity: Entity; asset: MediaAsset; index: number }> {
  return entities.flatMap((entity) => (entity.media ?? []).map((asset, index) => ({ entity, asset, index })));
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

/** "also in the Vit valley at Aglen" — the shared containment two siblings have. */
function siblingFact(parentName: string, lang: LanguageCode): string {
  return lang === "bg" ? `също в ${parentName}` : `also in ${parentName}`;
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
 * The same edge read from the other end. `aglen birthPlaceOf trifon-kunev` is
 * "born here" on the village page and "birthplace" on his; both are the one
 * asserted edge, rendered honestly from each side (rules 19–20).
 */
function inverseRelationFact(type: Relation["type"], lang: LanguageCode): string {
  const bg: Partial<Record<Relation["type"], string>> = {
    birthPlaceOf: "родно място",
    subjectOf: "разказва се за",
    contains: "част от",
    containedIn: "в него",
    accessedFrom: "води до",
    supersededBy: "предшественик",
    locatedIn: "включва",
    operatedBy: "стопанисва",
  };
  const en: Partial<Record<Relation["type"], string>> = {
    birthPlaceOf: "birthplace",
    subjectOf: "told about",
    contains: "part of",
    containedIn: "contains",
    accessedFrom: "leads to",
    supersededBy: "predecessor",
    locatedIn: "includes",
    operatedBy: "operates",
  };
  return (lang === "bg" ? bg[type] : en[type]) ?? relationFact(type, lang);
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

  const parent = entity.parent ? byId.get(entity.parent) : undefined;
  if (parent) linkTo(parent, relationFact("containedIn", lang));
  for (const child of childrenOf(entity.id)) linkTo(child, relationFact("contains", lang));

  // Siblings under an unpublished parent (M5, Part 5).
  //
  // An entity whose parent is a node — the Vit valley at Aglen holds five rock
  // forms and publishes no page of its own (rule 15) — had no containment link
  // that rendered anywhere: the parent link points at a page that does not exist,
  // and `linkTo` correctly drops it. The result was a published page nothing led
  // to, reachable only from its index. That is the isolated-content failure, and
  // it grows worse with every entity added beneath a node.
  //
  // The fix is derivation, not invention. "Дупката and Червена стена are both in
  // the Vit valley at Aglen" is not a new assertion — it is the two containment
  // edges the records already carry, read together, and it is true in the world
  // (rule 13). What renders is that shared fact, named.
  if (parent && parent.page?.status !== "published") {
    for (const sibling of childrenOf(parent.id)) {
      if (sibling.id === entity.id) continue;
      linkTo(sibling, siblingFact(entityName(parent, lang), lang));
    }
  }

  for (const relation of relationsOf(entity)) {
    if (relation.type === "nearby") continue; // nearby is derived from coordinates below
    const target = byId.get(relation.target);
    let fact = relationFact(relation.type, lang);
    if (relation.reason) fact = pick(relation.reason, lang);
    linkTo(target, fact);
  }

  // The same edges read from the far end. Without these a person, a legend or a
  // historical period would have nowhere to go: nothing points out of them, and
  // everything points in.
  for (const { from, type } of inboundRelationsOf(entity.id)) {
    linkTo(from, inverseRelationFact(type, lang));
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
