import { languages } from "./locales/shared";
import type { LanguageCode } from "./locales/types";
import { landingPages, type LandingPageId } from "./landingPages";
import { publishedBusinesses } from "./localBusinesses";
import { guides } from "./guides";
import { namespaceEntities, placePageEntities } from "./graph";
import { aspectPagesFor, sourcePages } from "./graph/ledger";
import type { ClaimAspect } from "./graph/claims";

export type CoreRouteId =
  | "home"
  | "pillars"
  | "attractions"
  | "activities"
  | "fishing"
  | "hiking"
  | "caves"
  | "vitRiver"
  | "food"
  | "nearby"
  | "geo"
  | "stay"
  | "quests"
  | "app"
  | "arMissions"
  // The entity namespace (M3): /karst/ is the knowledge-subject root (ADR-008),
  // /place/ its index; individual entities are /place/<slug>/ detail pages that
  // hang off the "place" route the way businesses hang off "localBusinesses".
  | "karst"
  | "place"
  // The knowledge namespaces (M4). Time, people and oral tradition are entities
  // like any other; they differ only in the namespace their page lives under.
  // `/sources/` and `/corrections/` are the provenance surfaces: both are
  // generated from the claim ledger and neither is hand-maintained.
  | "history"
  | "legend"
  | "person"
  | "sources"
  | "corrections"
  // A single citable origin: /source/<slug>/ (M4B, ADR-015). `/sources/` is the
  // index of the ledger; `/source/` is one entry in it, addressed by what the
  // source is rather than by its ledger id.
  | "source"
  | "travelGuide"
  | "seasonal"
  | "events"
  | "localBusinesses"
  | "guides"
  | "trust"
  | "editorial"
  | "localSeo"
  | "crawlerPolicy"
  | "contact";

export type RouteId = CoreRouteId | LandingPageId;

export type StaticRoute = {
  id: RouteId;
  slug: string;
  sectionId: string;
};

export type ResolvedRoute = {
  language: LanguageCode;
  routeId: RouteId;
  // Set when the path addresses a single business: /<lang>/local-businesses/<slug>/
  businessSlug?: string;
  // Set when the path addresses a single guide: /<lang>/guides/<slug>/
  guideSlug?: string;
  /**
   * Set when the path addresses a single entity beneath an entity namespace:
   * /<lang>/place/<slug>/, /<lang>/history/<slug>/, /<lang>/legend/<slug>/ and
   * /<lang>/person/<slug>/ all resolve here. The routeId names the namespace, so
   * one field carries the slug for all of them.
   */
  placeSlug?: string;
  /** Set for a depth-3 aspect page: /<lang>/place/aglen/history/ (M4). */
  aspect?: ClaimAspect;
  /** Set when the path addresses one source: /<lang>/source/<slug>/ (M4B). */
  sourceSlug?: string;
};

export const BUSINESS_ROUTE_SLUG = "local-businesses";
export const GUIDES_ROUTE_SLUG = "guides";
export const PLACE_ROUTE_SLUG = "place";
export const SOURCE_ROUTE_SLUG = "source";

/**
 * The entity namespaces and the route each resolves to. `/place/` came with M3;
 * the other three come with M4 and behave identically — an index at the root and
 * one detail page per published entity.
 */
export const ENTITY_NAMESPACES: Array<{ slug: string; routeId: CoreRouteId }> = [
  { slug: PLACE_ROUTE_SLUG, routeId: "place" },
  { slug: "history", routeId: "history" },
  { slug: "legend", routeId: "legend" },
  { slug: "person", routeId: "person" },
];

/** Aspects that may appear as a depth-3 page beneath an entity (`/place/aglen/history/`). */
const ASPECT_SLUGS = new Set<string>(["history", "name"]);

export const DEFAULT_LANGUAGE: LanguageCode = "bg";

const coreRoutes: StaticRoute[] = [
  { id: "home", slug: "", sectionId: "home" },
  { id: "pillars", slug: "tourism", sectionId: "about" },
  { id: "attractions", slug: "attractions", sectionId: "landmarks" },
  { id: "activities", slug: "activities", sectionId: "experiences" },
  { id: "fishing", slug: "activities/fishing-vit-river", sectionId: "experiences" },
  { id: "hiking", slug: "activities/hiking-canyon-routes", sectionId: "experiences" },
  { id: "caves", slug: "attractions/caves-rock-forms", sectionId: "landmarks" },
  { id: "vitRiver", slug: "attractions/vit-river", sectionId: "location" },
  { id: "food", slug: "travel-guide/food-local-products", sectionId: "travel-guide" },
  { id: "nearby", slug: "nearby-destinations", sectionId: "travel-guide" },
  { id: "geo", slug: "location", sectionId: "location" },
  { id: "stay", slug: "stay", sectionId: "stay" },
  // The one local Unlocking Bulgaria hub (ADR-013). `quests` and `app` are the
  // legacy standalone UB pages; they now merge into /ar-missions/ (canonical +
  // 301, see seo.ts and public/_redirects) and are kept only so old links resolve.
  { id: "arMissions", slug: "ar-missions", sectionId: "ar-missions" },
  { id: "quests", slug: "unlockingbulgaria", sectionId: "ar-missions" },
  { id: "app", slug: "app", sectionId: "ar-missions" },
  // The entity namespace (M3). Detail pages /place/<slug>/ resolve to routeId
  // "place" with a placeSlug, like businesses and guides.
  { id: "karst", slug: "karst", sectionId: "karst" },
  { id: "place", slug: "place", sectionId: "place" },
  // The knowledge namespaces and the two provenance surfaces (M4).
  { id: "history", slug: "history", sectionId: "history" },
  { id: "legend", slug: "legend", sectionId: "legend" },
  { id: "person", slug: "person", sectionId: "person" },
  { id: "sources", slug: "sources", sectionId: "sources" },
  { id: "corrections", slug: "corrections", sectionId: "corrections" },
  // /source/ has no index of its own — /sources/ is that index. The bare path
  // resolves here so a hand-typed /source/ still lands somewhere sensible; every
  // real page beneath it is /source/<slug>/.
  { id: "source", slug: "source", sectionId: "sources" },
  { id: "travelGuide", slug: "travel-guide", sectionId: "travel-guide" },
  { id: "seasonal", slug: "travel-guide/seasonal-guide", sectionId: "travel-guide" },
  { id: "events", slug: "events", sectionId: "events" },
  { id: "localBusinesses", slug: "local-businesses", sectionId: "local-businesses" },
  { id: "guides", slug: "guides", sectionId: "guides" },
  { id: "trust", slug: "about", sectionId: "trust" },
  { id: "editorial", slug: "editorial-policy", sectionId: "trust" },
  { id: "localSeo", slug: "local-presence", sectionId: "trust" },
  { id: "crawlerPolicy", slug: "crawler-policy", sectionId: "trust" },
  { id: "contact", slug: "contact", sectionId: "contact" },
];

export const staticRoutes: StaticRoute[] = [
  ...coreRoutes,
  ...landingPages.map((page) => ({
    id: page.id,
    slug: page.slug,
    sectionId: page.sectionId,
  })),
];

const languageCodes = new Set(languages.map((language) => language.code));

const routesById = new Map(staticRoutes.map((route) => [route.id, route]));
const routesBySlug = new Map(staticRoutes.map((route) => [route.slug, route]));

export const allLanguageCodes = languages.map((language) => language.code);

export function isLanguageCode(value: string | null | undefined): value is LanguageCode {
  return Boolean(value && languageCodes.has(value as LanguageCode));
}

export function getStaticRoute(routeId: RouteId): StaticRoute {
  const route = routesById.get(routeId);
  if (!route) {
    return routesById.get("home")!;
  }

  return route;
}

export function buildRoutePath(language: LanguageCode, routeId: RouteId): string {
  const route = getStaticRoute(routeId);
  const prefix = `/${language}`;
  return route.slug ? `${prefix}/${route.slug}/` : `${prefix}/`;
}

export function resolveRoute(pathname: string, search = ""): ResolvedRoute {
  const legacyLang = new URLSearchParams(search).get("lang");
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  const language = isLanguageCode(firstSegment)
    ? firstSegment
    : isLanguageCode(legacyLang)
      ? legacyLang
      : DEFAULT_LANGUAGE;

  const slug = isLanguageCode(firstSegment) ? segments.slice(1).join("/") : "";

  // Business detail pages hang off the listing route: they share its component
  // and differ only by the trailing slug.
  if (slug.startsWith(`${BUSINESS_ROUTE_SLUG}/`)) {
    const businessSlug = slug.slice(BUSINESS_ROUTE_SLUG.length + 1).replace(/\/$/, "");
    if (businessSlug) return { language, routeId: "localBusinesses", businessSlug };
  }

  // Guide detail pages hang off the guide index in the same way.
  if (slug.startsWith(`${GUIDES_ROUTE_SLUG}/`)) {
    const guideSlug = slug.slice(GUIDES_ROUTE_SLUG.length + 1).replace(/\/$/, "");
    if (guideSlug) return { language, routeId: "guides", guideSlug };
  }

  // One source: /<lang>/source/<slug>/. It is not an entity namespace — a source
  // is not a thing in the world, it is what we read about one — so it resolves on
  // its own rather than through ENTITY_NAMESPACES.
  if (slug.startsWith(`${SOURCE_ROUTE_SLUG}/`)) {
    const sourceSlug = slug.slice(SOURCE_ROUTE_SLUG.length + 1).replace(/\/$/, "");
    if (sourceSlug && !sourceSlug.includes("/")) return { language, routeId: "source", sourceSlug };
  }

  // Entity detail pages hang off their namespace index the same way in every
  // namespace: /<lang>/place/<slug>/, /<lang>/history/<slug>/ and so on. A second
  // segment beneath /place/ is a depth-3 aspect page (/place/aglen/history/) and
  // never a second entity — the hierarchy stops at three levels
  // (`CONTENT_HIERARCHY.md` §3).
  for (const namespace of ENTITY_NAMESPACES) {
    if (!slug.startsWith(`${namespace.slug}/`)) continue;
    const rest = slug.slice(namespace.slug.length + 1).replace(/\/$/, "");
    if (!rest) break;
    const [entitySlug, aspectSlug] = rest.split("/");
    if (!entitySlug) break;
    if (namespace.routeId === "place" && aspectSlug && ASPECT_SLUGS.has(aspectSlug)) {
      return { language, routeId: "place", placeSlug: entitySlug, aspect: aspectSlug as ClaimAspect };
    }
    if (aspectSlug) break; // depth 4 is not a route; fall through to the 404-ish home
    return { language, routeId: namespace.routeId, placeSlug: entitySlug };
  }

  const route = routesBySlug.get(slug) ?? getStaticRoute("home");

  return { language, routeId: route.id };
}

export function buildBusinessPath(language: LanguageCode, businessSlug: string): string {
  return `/${language}/${BUSINESS_ROUTE_SLUG}/${businessSlug}/`;
}

export function buildGuidePath(language: LanguageCode, guideSlug: string): string {
  return `/${language}/${GUIDES_ROUTE_SLUG}/${guideSlug}/`;
}

export function buildPlacePath(language: LanguageCode, placeSlug: string): string {
  return `/${language}/${PLACE_ROUTE_SLUG}/${placeSlug}/`;
}

/**
 * The URL of any published entity in any namespace. `page.path` is the
 * language-agnostic path the graph itself carries, so this is the one function
 * every surface uses and there is nothing to keep in sync (Constitution rule 1).
 */
export function buildEntityPath(language: LanguageCode, pagePath: string): string {
  return `/${language}${pagePath}`;
}

/** A depth-3 aspect page beneath an entity: /<lang>/place/aglen/history/ (M4). */
export function buildAspectPath(language: LanguageCode, entitySlug: string, aspect: ClaimAspect): string {
  return `/${language}/${PLACE_ROUTE_SLUG}/${entitySlug}/${aspect}/`;
}

/** One source page: /<lang>/source/<slug>/ (M4B). */
export function buildSourcePath(language: LanguageCode, sourceSlug: string): string {
  return `/${language}/${SOURCE_ROUTE_SLUG}/${sourceSlug}/`;
}

/** Published entity pages under /place/, one detail route per entity. */
export const placeRouteSlugs: string[] = placePageEntities().map((entity) => entity.slug);

/** Published entity pages in the M4 namespaces, as `{ routeId, slug }` pairs. */
export const knowledgeRouteEntities: Array<{ routeId: CoreRouteId; slug: string }> = ENTITY_NAMESPACES.filter(
  (namespace) => namespace.routeId !== "place",
).flatMap((namespace) => namespaceEntities(`/${namespace.slug}/`).map((entity) => ({ routeId: namespace.routeId, slug: entity.slug })));

/**
 * Aspect pages, derived: an aspect earns a page only where the ledger holds
 * enough claims for it, so the route table is a function of what is known
 * (Constitution rule 26) rather than a list somebody keeps up to date.
 */
export const aspectRoutes: Array<{ slug: string; aspect: ClaimAspect }> = placePageEntities().flatMap((entity) =>
  aspectPagesFor(entity.id).map((page) => ({ slug: entity.slug, aspect: page.aspect })),
);

/**
 * Source pages, derived the same way: a source publishes a page once three live
 * claims rest on it, and is a row in the `/sources/` ledger below that. Nobody
 * maintains this list either (Constitution rule 26).
 */
export const sourceRouteSlugs: string[] = sourcePages().map((source) => source.slug);

export function getAllStaticRoutePaths(): string[] {
  const businesses = publishedBusinesses();
  return allLanguageCodes.flatMap((language) => [
    ...staticRoutes.map((route) => buildRoutePath(language, route.id)),
    ...businesses.map((business) => buildBusinessPath(language, business.slug)),
    ...guides.map((guide) => buildGuidePath(language, guide.slug)),
    ...placeRouteSlugs.map((slug) => buildPlacePath(language, slug)),
    ...knowledgeRouteEntities.map((entry) => `/${language}/${getStaticRoute(entry.routeId).slug}/${entry.slug}/`),
    ...aspectRoutes.map((entry) => buildAspectPath(language, entry.slug, entry.aspect)),
    ...sourceRouteSlugs.map((slug) => buildSourcePath(language, slug)),
  ]);
}
