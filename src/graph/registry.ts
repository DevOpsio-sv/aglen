import type { LocalizedText } from "../locales/types";
import type { EntityId, EntityKind } from "./schema";
import lukovitEntities from "./karst/lukovit/entities.json";
import lukovitClaims from "./karst/lukovit/claims.json";
import lukovitSources from "./karst/lukovit/sources.json";

// ─────────────────────────────────────────────────────────────
// The graph's own shape, declared once (M5, ADR-016).
//
// Before this file, three facts about the graph were spelled out in eight places:
// that there are four entity namespaces (`namespaces.ts`, `routes.ts` twice,
// `seo.ts` twice, `graph-audit.mjs` twice), that there is one region rooted at
// `karst-lukovit` (`index.ts`, `ledger.ts`, `graph-audit.mjs`, `EntityPages.tsx`),
// and that distances are measured from Aglen. They agreed, but nothing made them:
// adding a second region meant editing eleven files across four layers, and the
// day one of them was missed the site would have shipped a page the audit did not
// know to check.
//
// This module is the answer to "where does new knowledge belong?" in a form the
// build can read. It declares three tables and nothing else:
//
//   REGIONS     — one row per region: its records, its root entity, its base
//                 settlement (ADR-009: one boundary, three coinciding roles).
//   NAMESPACES  — one row per URL namespace: which kinds publish there, whether
//                 it is knowledge tier, whether rule 15 gates or warns.
//   KIND_HOME   — one row per entity kind: the namespace it publishes under.
//
// Two consequences follow, and they are the whole point of M5:
//
//   • Adding Region 2 is one REGIONS row plus one directory of JSON. No page
//     component, no route branch, no audit change.
//   • Adding a species, a route or a tradition is a record. Its namespace already
//     exists here, its index page materialises the day the first entity publishes
//     it, and until then no empty page ships (Constitution rule 26).
//
// Nothing here derives anything. Derivation stays in `index.ts` and `ledger.ts`.
// ─────────────────────────────────────────────────────────────

// ── Regions (ADR-009) ────────────────────────────────────────

/**
 * A region's root route. Each region publishes one root page at a path of its
 * own choosing — the Lukovit Karst has held `/karst/` since M3 and keeps it
 * forever (Constitution rule 12: a URL is never broken). A second region declares
 * its own root path and adds its id here; that is the only type-level edit a new
 * region costs.
 */
export type RegionRouteId = "karst";

export type RegionDef = {
  /** The partition path under `src/graph/`, and the region's stable id. */
  id: string;
  name: LocalizedText;
  /** The physiographic subtree root — every entity in the partition hangs off it. */
  rootEntityId: EntityId;
  /** The root page's language-agnostic path, e.g. "/karst/". */
  rootPath: string;
  /** The route id the root page resolves to. */
  rootRouteId: RegionRouteId;
  /**
   * The settlement this region's "how far is it" facts are measured from. It is a
   * property of the region, not a constant of the codebase: Region 2 measures from
   * its own base, and nothing in the render layer needs to know which.
   */
  baseEntityId?: EntityId;
  /** The authored records. Parsed JSON, validated downstream — never trusted here. */
  entities: unknown[];
  claims: unknown[];
  disputes: unknown[];
  evidence: unknown[];
  sources: unknown[];
};

type EntityFile = { entities?: unknown[] };
type ClaimFile = { claims?: unknown[]; disputes?: unknown[]; evidence?: unknown[] };
type SourceFile = { sources?: unknown[] };

export const REGIONS: RegionDef[] = [
  {
    id: "karst/lukovit",
    name: { bg: "Луковитски карст", en: "The Lukovit Karst" },
    rootEntityId: "karst-lukovit",
    rootPath: "/karst/",
    rootRouteId: "karst",
    baseEntityId: "aglen",
    entities: (lukovitEntities as EntityFile).entities ?? [],
    claims: (lukovitClaims as ClaimFile).claims ?? [],
    disputes: (lukovitClaims as ClaimFile).disputes ?? [],
    evidence: (lukovitClaims as ClaimFile).evidence ?? [],
    sources: (lukovitSources as SourceFile).sources ?? [],
  },
];

/** The region a root path belongs to, or undefined for a path outside any region. */
export function regionByRootPath(path: string): RegionDef | undefined {
  return REGIONS.find((region) => region.rootPath === path);
}

/** Every region root path — the paths a published page may occupy besides a namespace. */
const REGION_ROOT_PATHS: string[] = REGIONS.map((region) => region.rootPath);

// ── Namespaces ───────────────────────────────────────────────

/**
 * The URL namespaces an entity page may live under. Four carry entities today;
 * three are declared and dormant. A dormant namespace costs one row and its
 * chrome, and buys the answer to "where does a new species/route/tradition go?"
 * without a redesign when the first one arrives. It publishes NO page until an
 * entity claims it — an index with nothing in it would be exactly the empty
 * scaffolding rule 26 forbids.
 */
export type NamespaceId = "place" | "history" | "legend" | "person" | "route" | "tradition" | "species";

export type NamespaceDef = {
  id: NamespaceId;
  /** The language-agnostic page-path prefix, e.g. "/history/". */
  prefix: string;
  /** The URL segment beneath /<lang>/. Identical to the prefix without slashes. */
  slug: string;
  /** The kinds allowed to publish here. A record in the wrong namespace is a gate. */
  kinds: EntityKind[];
  /**
   * Knowledge tier: indexed in bg and en only (Constitution rule 43). `/place/`
   * is not — it predates the tier and its pages are indexed in all fourteen.
   */
  knowledgeTier: boolean;
  /**
   * Whether rule 15 (three sourced claims earn a page) is a build gate here or a
   * warning. It gates in namespaces built on the ledger; `/place/` predates the
   * ledger and warns, so a page that already ranks is never unpublished by an
   * audit finding rather than by an editorial decision.
   */
  claimGate: boolean;
};

export const NAMESPACES: NamespaceDef[] = [
  {
    id: "place",
    prefix: "/place/",
    slug: "place",
    kinds: [
      "region", "province", "municipality", "settlement", "cave", "landform",
      "waterBody", "spring", "protectedArea", "geopark", "archaeologicalSite", "building",
    ],
    knowledgeTier: false,
    claimGate: false,
  },
  { id: "history", prefix: "/history/", slug: "history", kinds: ["period", "event"], knowledgeTier: true, claimGate: true },
  { id: "legend", prefix: "/legend/", slug: "legend", kinds: ["legend"], knowledgeTier: true, claimGate: true },
  { id: "person", prefix: "/person/", slug: "person", kinds: ["person"], knowledgeTier: true, claimGate: true },
  { id: "route", prefix: "/route/", slug: "route", kinds: ["route"], knowledgeTier: true, claimGate: true },
  { id: "tradition", prefix: "/tradition/", slug: "tradition", kinds: ["tradition"], knowledgeTier: true, claimGate: true },
  { id: "species", prefix: "/species/", slug: "species", kinds: ["species"], knowledgeTier: true, claimGate: true },
];

const namespaceById = new Map(NAMESPACES.map((namespace) => [namespace.id, namespace]));

export function namespaceDef(id: NamespaceId): NamespaceDef {
  return namespaceById.get(id)!;
}

/** The namespace a page path sits under, or undefined for a region root. */
export function namespaceForPath(path: string): NamespaceDef | undefined {
  return NAMESPACES.find((namespace) => path.startsWith(namespace.prefix));
}

/** Every path prefix a published page may occupy: the region roots and the namespaces. */
export const PUBLISHED_PATH_PREFIXES: string[] = [...REGION_ROOT_PATHS, ...NAMESPACES.map((namespace) => namespace.prefix)];

// ── Kinds ────────────────────────────────────────────────────

/**
 * Where a record of each kind belongs. `Record<EntityKind, …>` rather than a
 * partial map on purpose: TypeScript then refuses to compile a new kind that
 * nobody has decided a home for, which is precisely the decision a contributor
 * must not be allowed to skip.
 *
 * `undefined` is a real answer, not a gap. A business is published by the
 * directory at `/local-businesses/<slug>/` and a calendar event by `/events/`;
 * both are products that owned their URLs before the graph existed, and giving
 * them a second home would be the duplicate-subject defect this project spent M1
 * removing. Those records live in the graph as nodes and render as sections of
 * their parent (rule 15).
 */
export const KIND_HOME: Record<EntityKind, NamespaceId | undefined> = {
  region: "place",
  province: "place",
  municipality: "place",
  settlement: "place",
  cave: "place",
  landform: "place",
  waterBody: "place",
  spring: "place",
  protectedArea: "place",
  geopark: "place",
  archaeologicalSite: "place",
  building: "place",
  route: "route",
  person: "person",
  legend: "legend",
  period: "history",
  event: "history",
  tradition: "tradition",
  species: "species",
  business: undefined, // the directory owns this URL
};

/**
 * Whether a kind occupies ground. Only these can be missing a GPS fix; reporting
 * a legend for having no coordinates would train a reader of the audit to ignore
 * it. Exhaustive for the same reason `KIND_HOME` is.
 */
export const KIND_IS_SITED: Record<EntityKind, boolean> = {
  region: true, province: true, municipality: true, settlement: true, cave: true,
  landform: true, waterBody: true, spring: true, protectedArea: true, geopark: true,
  archaeologicalSite: true, building: true, route: true, business: true,
  person: false, legend: false, event: false, period: false, tradition: false, species: false,
};

/**
 * The schema.org type a kind carries when a record does not name its own. Never
 * `TouristDestination` — that is a view type, not a thing in the world (C6).
 */
export const KIND_SCHEMA_TYPE: Record<EntityKind, string> = {
  region: "Landform", province: "AdministrativeArea", municipality: "AdministrativeArea",
  settlement: "Place", cave: "Place", landform: "Landform", waterBody: "BodyOfWater",
  spring: "BodyOfWater", protectedArea: "Park", geopark: "Park",
  archaeologicalSite: "LandmarksOrHistoricalBuildings", building: "Place",
  route: "Trail", person: "Person", legend: "CreativeWork", event: "Event",
  period: "Event", tradition: "CreativeWork", species: "Taxon", business: "LocalBusiness",
};

/**
 * The hero a kind borrows when a record carries no media of its own. Existing
 * assets only — no new photography ships with a schema (ADR-012 is a later
 * milestone), and a kind with nothing appropriate falls back at the call site.
 */
export const KIND_HERO: Partial<Record<EntityKind, string>> = {
  region: "/assets/aglen-hero-river-canyon.png",
  province: "/assets/aglen-aerial-river.png",
  municipality: "/assets/aglen-aerial-river.png",
  settlement: "/assets/aglen-village-church.png",
  cave: "/assets/aglen-cave-mystery.png",
  landform: "/assets/aglen-rock-arch.png",
  waterBody: "/assets/aglen-vit-river-sunset.png",
  spring: "/assets/aglen-river-pool.png",
  geopark: "/assets/aglen-aerial-river.png",
  archaeologicalSite: "/assets/aglen-kaleto-ruins.png",
  building: "/assets/aglen-village-church.png",
  route: "/assets/aglen-aerial-river.png",
};

/** The namespace a kind publishes under, or undefined when another product owns it. */
export function homeNamespaceOf(kind: EntityKind): NamespaceDef | undefined {
  const id = KIND_HOME[kind];
  return id ? namespaceById.get(id) : undefined;
}
