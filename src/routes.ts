import { languages } from "./locales/shared";
import type { LanguageCode } from "./locales/types";

export type RouteId =
  | "home"
  | "pillars"
  | "attractions"
  | "activities"
  | "geo"
  | "stay"
  | "quests"
  | "app"
  | "contact";

export type StaticRoute = {
  id: RouteId;
  slug: string;
  sectionId: string;
};

export type ResolvedRoute = {
  language: LanguageCode;
  routeId: RouteId;
};

export const DEFAULT_LANGUAGE: LanguageCode = "bg";

export const staticRoutes: StaticRoute[] = [
  { id: "home", slug: "", sectionId: "home" },
  { id: "pillars", slug: "tourism", sectionId: "about" },
  { id: "attractions", slug: "attractions", sectionId: "landmarks" },
  { id: "activities", slug: "activities", sectionId: "experiences" },
  { id: "geo", slug: "location", sectionId: "location" },
  { id: "stay", slug: "stay", sectionId: "stay" },
  { id: "quests", slug: "hidden-bulgaria-quests", sectionId: "quests" },
  { id: "app", slug: "app", sectionId: "app" },
  { id: "contact", slug: "contact", sectionId: "contact" },
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
  const route = routesBySlug.get(slug) ?? getStaticRoute("home");

  return { language, routeId: route.id };
}

export function getAllStaticRoutePaths(): string[] {
  return allLanguageCodes.flatMap((language) =>
    staticRoutes.map((route) => buildRoutePath(language, route.id)),
  );
}
