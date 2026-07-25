import { SHOW_EXPERIENCES, SHOW_STAY } from "./featureFlags";
import type { RouteId } from "./routes";

// ─────────────────────────────────────────────────────────────
// Which home-page sections each route renders.
//
// Every route here used to render the *entire* home page and merely scroll to a
// section, so /bg/stay/, /bg/location/, /bg/app/ and a dozen more served
// byte-identical HTML under different URLs — the same duplication repeated in 14
// languages. Each route now renders only the sections that are its subject.
//
// The order inside a list is irrelevant: sections appear in the fixed order of
// HOME_SECTIONS, which is the order they sit in App.tsx. The first rendered
// section supplies the page's h1, so a list is written with its subject first for
// readability and resolved against HOME_SECTIONS for correctness.
//
// Routes absent from the map (attractions, vitRiver, caves, food, nearby,
// seasonal) duplicate a /guides/ page and 301 there — see public/_redirects and
// `supersedingGuideSlug` in seo.ts.
//
// Shared with seo.ts so a route whose only section is switched off by a feature
// flag can be kept out of the index instead of shipping an empty page.
// ─────────────────────────────────────────────────────────────

export type HomeSection =
  | "hero"
  | "stats"
  | "story"
  | "legends"
  | "places"
  | "gallery"
  | "map"
  | "hub"
  | "experiences"
  | "stay"
  | "quests"
  | "ar"
  | "app";

/** Document order of the sections in App.tsx. */
export const HOME_SECTIONS: HomeSection[] = [
  "hero",
  "stats",
  "story",
  "legends",
  "places",
  "gallery",
  "map",
  "hub",
  "experiences",
  "stay",
  "quests",
  "ar",
  "app",
];

export const sectionsByRoute: Partial<Record<RouteId, HomeSection[]>> = {
  home: HOME_SECTIONS,
  pillars: ["story", "legends"],
  activities: ["experiences"],
  geo: ["map"],
  stay: ["stay"],
  quests: ["quests", "ar", "app"],
  app: ["app"],
  travelGuide: ["hub"],
  // The contact section renders on every page, so this route adds nothing and
  // simply lets that section supply its h1.
  contact: [],
};

/** True unless a feature flag has switched this section off site-wide. */
export function sectionEnabled(section: HomeSection): boolean {
  if (section === "experiences") return SHOW_EXPERIENCES;
  if (section === "stay") return SHOW_STAY;
  return true;
}

/** The sections a route renders, in document order, flags applied. */
export function sectionsForRoute(routeId: RouteId): HomeSection[] {
  const wanted = sectionsByRoute[routeId] ?? HOME_SECTIONS;
  return HOME_SECTIONS.filter((section) => wanted.includes(section) && sectionEnabled(section));
}

/**
 * Whether this route still has content of its own.
 *
 * With SHOW_EXPERIENCES and SHOW_STAY both off, /activities/ and /stay/ render
 * nothing but the shared contact block. Those URLs are prerendered and were
 * listed in every sitemap; they are now marked noindex and dropped from the
 * sitemaps until the flag comes back, rather than being served as empty pages.
 */
export function routeHasOwnSections(routeId: RouteId): boolean {
  return sectionsByRoute[routeId] !== undefined
    ? sectionsForRoute(routeId).length > 0 || routeId === "contact"
    : true;
}
