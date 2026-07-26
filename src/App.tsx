import { useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode, type SyntheticEvent } from "react";
import { contentByLanguage, languages, type Accommodation, type LanguageCode, type PlaceId, type TimelineItem } from "./content";
import { getLandingPage, getLandingPages, isLandingPageId } from "./landingPages";
import { placeExperienceLinks, type PlaceExperienceLink } from "./placeLinks";
import { buildBusinessPath, buildGuidePath, buildPlacePath, buildRoutePath, getStaticRoute, resolveRoute, type RouteId, type ResolvedRoute } from "./routes";
import { guideByLegacyRoute, guides, localizeGuide } from "./guides";
import { publishedBusinesses } from "./localBusinesses";
import GuidesPage from "./GuidesPage";
import { KarstPage, PlacePage } from "./graph/EntityPages";
import { breadcrumbTrail, entityBySlug, entityForPlaceId, entityName as graphEntityName } from "./graph";
import { imageProps } from "./images";
import { updateDocumentSEO } from "./seo";
import { uiTextByLanguage } from "./uiText";
import { guidesUiByLanguage } from "./guidesUi";
import EventsPage from "./EventsPage";
import LocalBusinessesPage from "./LocalBusinessesPage";
import TrustPage from "./TrustPage";
import { isTrustRouteId } from "./trustPages";
import { SHOW_EXPERIENCES, SHOW_STAY } from "./featureFlags";
import { sectionsForRoute, type HomeSection } from "./pageSections";

const fallbackImage = "/assets/aglen-hero-river-canyon.webp";

// Contextual links from homepage sections into the entity layer (M3 integration).
// Knowledge tier is bg + en (rule 43); other languages fall back to en.
const HOME_ENTITY_LINKS = {
  village: { bg: "Отвори страницата на Ъглен", en: "Open the village page" },
  karst: { bg: "Опознай Луковитския карст", en: "Explore the Lukovit Karst" },
  river: { bg: "Виж страницата на река Вит", en: "See the Vit River page" },
  place: { bg: "Виж мястото", en: "See the place" },
};
function homeEntityLink(key: keyof typeof HOME_ENTITY_LINKS, lang: LanguageCode): string {
  const entry = HOME_ENTITY_LINKS[key] as Record<string, string>;
  return entry[lang] ?? entry.en;
}
const curatedLandingPageRouteIds = [
  "visitAglen",
  "weekendInAglen",
  "thingsToDo",
  "natureAroundAglen",
  "karlukovoGuide",
  "aglenFromSofia",
] as const;

/**
 * The heading of a route's first section is that page's h1; every other heading
 * stays an h2. Printing a separate page title above the section would state the
 * same words twice, since each section already names its subject.
 */
function SectionTitle({
  level,
  id,
  children,
}: {
  level: "h1" | "h2";
  id?: string;
  children: ReactNode;
}) {
  // h1.section-title is styled to match h2 exactly, so promoting a heading
  // changes the document outline and nothing about the design.
  return level === "h1" ? (
    <h1 className="section-title" id={id}>
      {children}
    </h1>
  ) : (
    <h2 id={id}>{children}</h2>
  );
}

function LanguageIcon() {
  return (
    <svg className="language-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4.75 12h14.5" />
      <path d="M12 4.75c2.15 2 3.25 4.42 3.25 7.25S14.15 17.25 12 19.25" />
      <path d="M12 4.75C9.85 6.75 8.75 9.17 8.75 12s1.1 5.25 3.25 7.25" />
      <path d="M6.35 7.35c1.35.8 3.26 1.25 5.65 1.25s4.3-.45 5.65-1.25" />
      <path d="M6.35 16.65c1.35-.8 3.26-1.25 5.65-1.25s4.3.45 5.65 1.25" />
      <circle cx="12" cy="12" r="7.25" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg className="language-chevron" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="m4.5 6.25 3.5 3.5 3.5-3.5" />
    </svg>
  );
}

function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  if (image.dataset.fallbackApplied === "true") return;
  image.dataset.fallbackApplied = "true";
  image.src = fallbackImage;
}

function gatewayRouteId(link: PlaceExperienceLink): RouteId {
  return link.kind === "activity" ? "activities" : "arMissions";
}

function gatewayTargetId(link: PlaceExperienceLink): string {
  return link.kind === "activity" ? `experience-${link.id}` : `quest-${link.id}`;
}

function gatewayKey(link: PlaceExperienceLink): string {
  return `${link.kind}:${link.id}`;
}

// The one primary navigation. A leaf links to a route; a group opens a small
// set of leaves (only "Посети Ъглен" uses this); an anchor scrolls to a section
// on the homepage (only "AR мисии" uses this).
type NavLeaf = { label: string; routeId: RouteId; accent?: boolean };
type NavGroup = { label: string; children: NavLeaf[] };
type NavAnchor = { label: string; anchor: string };
type NavEntry = NavLeaf | NavGroup | NavAnchor;
const isNavGroup = (entry: NavEntry): entry is NavGroup => "children" in entry;
const isNavAnchor = (entry: NavEntry): entry is NavAnchor => "anchor" in entry;

export function App() {
  const [pageRoute, setPageRoute] = useState<ResolvedRoute>(() =>
    resolveRoute(window.location.pathname, window.location.search),
  );
  const [selectedTimeline, setSelectedTimeline] = useState<TimelineItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [visitMenuOpen, setVisitMenuOpen] = useState(false);
  const visitMenuRef = useRef<HTMLDivElement | null>(null);
  const visitTriggerRef = useRef<HTMLButtonElement | null>(null);
  const timelineDialogRef = useRef<HTMLElement | null>(null);
  const timelineCloseRef = useRef<HTMLButtonElement | null>(null);
  const languageSwitchRef = useRef<HTMLDivElement | null>(null);
  const languageTriggerRef = useRef<HTMLButtonElement | null>(null);
  const { language, routeId, businessSlug, guideSlug, placeSlug } = pageRoute;
  const copy = contentByLanguage[language];
  const localizedUi = uiTextByLanguage[language];
  const currentRoute = getStaticRoute(routeId);
  const currentLandingPage = isLandingPageId(routeId) ? getLandingPage(language, routeId) : undefined;
  const isEventsPage = routeId === "events";
  const isBusinessPage = routeId === "localBusinesses";
  const isGuidesPage = routeId === "guides";
  const isTrustPage = isTrustRouteId(routeId);
  // The one local Unlocking Bulgaria hub. The legacy `quests` and `app` pages
  // resolve here too — they 301 to /ar-missions/ and canonicalise to it, and
  // render the same hub so a direct hit before the redirect never shows the old
  // standalone promo (ADR-013).
  const isArMissionsPage = routeId === "arMissions" || routeId === "quests" || routeId === "app";
  // The entity namespace (M3): /karst/ is the subject root, /place/<slug>/ an entity.
  const isKarstPage = routeId === "karst";
  const isPlacePage = routeId === "place";
  // Routes whose query string is shareable state rather than tracking noise.
  const keepsSearch = isEventsPage || (isBusinessPage && !businessSlug);
  const selectedLanguage = languages.find((item) => item.code === language) ?? languages[0];

  // The home-page sections this route owns, from pageSections.ts. A legacy
  // duplicate route falls back to the full set so it still shows something if its
  // 301 has not applied yet; the noindex keeps it out of the index either way.
  const hasOwnComponent = Boolean(currentLandingPage) || isEventsPage || isBusinessPage || isGuidesPage || isTrustPage || isArMissionsPage || isKarstPage || isPlacePage;
  // Already in document order and with feature flags applied.
  const visibleSections = hasOwnComponent ? [] : sectionsForRoute(routeId);
  const showSection = (section: HomeSection) => visibleSections.includes(section);
  const isHomeRoute = !hasOwnComponent && routeId === "home";

  // The first section in document order carries the h1. The home page keeps its
  // hero h1, and a route left with no sections of its own falls through to the
  // contact section, which renders on every page.
  const titleSection = isHomeRoute || hasOwnComponent ? undefined : visibleSections[0];
  const headingLevel = (section: HomeSection): "h1" | "h2" => (section === titleSection ? "h1" : "h2");
  const contactHeadingLevel: "h1" | "h2" = !hasOwnComponent && !titleSection && !isHomeRoute ? "h1" : "h2";

  const routePath = (route: ResolvedRoute) => {
    if (route.businessSlug) return buildBusinessPath(route.language, route.businessSlug);
    if (route.guideSlug) return buildGuidePath(route.language, route.guideSlug);
    if (route.placeSlug) return buildPlacePath(route.language, route.placeSlug);
    return buildRoutePath(route.language, route.routeId);
  };

  const navigateTo = (nextRoute: ResolvedRoute, replace = false, hash = "") => {
    const url = `${routePath(nextRoute)}${hash}`;
    setSelectedTimeline(null);
    setLanguageMenuOpen(false);
    setMobileMenuOpen(false);
    setVisitMenuOpen(false);
    setPageRoute(nextRoute);

    if (replace) {
      history.replaceState(null, "", url);
      return;
    }

    history.pushState(null, "", url);

    // A new page always starts at its hero. Skipped when a hash is given, since
    // the caller scrolls to that section itself, and on replace (language
    // switches), where the reader should stay where they were.
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  // A link to a legacy topic route resolves to the guide that replaced it, so no
  // internal link points at a 301. This covers the main navigation ("Места" →
  // attractions) and the hero call to action, which both did.
  const routeHref = (nextRouteId: RouteId, nextLanguage = language) => {
    const guide = guideByLegacyRoute(nextRouteId);
    return guide ? buildGuidePath(nextLanguage, guide.slug) : buildRoutePath(nextLanguage, nextRouteId);
  };

  const handleRouteClick = (event: MouseEvent<HTMLAnchorElement>, nextRouteId: RouteId) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    const guide = guideByLegacyRoute(nextRouteId);
    navigateTo(guide ? { language, routeId: "guides", guideSlug: guide.slug } : { language, routeId: nextRouteId });
  };

  const handleGatewayClick = (event: MouseEvent<HTMLAnchorElement>, link: PlaceExperienceLink) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    const targetId = gatewayTargetId(link);
    navigateTo({ language, routeId: gatewayRouteId(link) }, false, `#${targetId}`);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({ block: "start" });
      });
    });
  };

  // "AR мисии": from the homepage, scroll straight to the banner; from any other
  // page, go to the localized homepage first, then to the same #ar-missions
  // anchor. Reuses the existing hash-navigation + double-rAF scroll pattern.
  const handleBannerClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    navigateTo({ language, routeId: "home" }, false, "#ar-missions");
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById("ar-missions")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  const changeLanguage = (nextLanguage: LanguageCode) => {
    navigateTo({ language: nextLanguage, routeId, businessSlug, guideSlug }, true);
  };

  // Used by the local-businesses page, whose detail pages are addressed by slug
  // rather than by route id.
  const navigateToPath = (path: string) => {
    navigateTo(resolveRoute(path));
  };

  useEffect(() => {
    document.documentElement.lang = language;
    updateDocumentSEO(language, routeId, businessSlug ?? guideSlug ?? placeSlug);

    const canonicalPath = businessSlug
      ? buildBusinessPath(language, businessSlug)
      : guideSlug
        ? buildGuidePath(language, guideSlug)
        : placeSlug
          ? buildPlacePath(language, placeSlug)
          : buildRoutePath(language, routeId);
    // Preserve query params where they carry shareable state (events views,
    // business filters); strip them everywhere else so canonicals stay clean.
    const keepSearch = keepsSearch ? window.location.search : "";
    if (window.location.pathname !== canonicalPath || (!keepsSearch && window.location.search)) {
      history.replaceState(null, "", canonicalPath + keepSearch);
    }
  }, [language, routeId, businessSlug, guideSlug, placeSlug, keepsSearch]);

  useEffect(() => {
    const onPopState = () => {
      setSelectedTimeline(null);
      setPageRoute(resolveRoute(window.location.pathname, window.location.search));
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const hashTarget = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : "";
    // Only an explicit hash scrolls now. The old fallback to the route's
    // sectionId existed because every route rendered the whole home page and had
    // to be scrolled to the right part; each route renders its own content from
    // the top instead. The fallback was also actively wrong for the four trust
    // routes, whose sectionId "trust" matches the footer's id — they opened
    // scrolled to the bottom of the page.
    const target = hashTarget ? document.getElementById(hashTarget) : null;
    if (!target) return;

    window.requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start" });
    });
  }, [currentRoute.sectionId, routeId, hasOwnComponent]);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const animationFrame = window.requestAnimationFrame(() => {
      const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        revealElements.forEach((element) => element.classList.add("revealed"));
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("revealed");
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.12 },
      );

      revealElements.forEach((element) => {
        if (element.classList.contains("revealed")) return;
        observer?.observe(element);
      });
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer?.disconnect();
    };
  }, [routeId]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!visitMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVisitMenuOpen(false);
        visitTriggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visitMenuOpen]);

  useEffect(() => {
    if (!languageMenuOpen || !languageSwitchRef.current) return;
    const languageSwitch = languageSwitchRef.current;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLanguageMenuOpen(false);
        languageTriggerRef.current?.focus();
        return;
      }

      if (e.key !== "Tab") return;

      const focusable = Array.from(
        languageSwitch.querySelectorAll<HTMLButtonElement>(".language-popover button:not([disabled])"),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (document.activeElement === languageTriggerRef.current) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    languageSwitch.addEventListener("keydown", onKey);
    return () => languageSwitch.removeEventListener("keydown", onKey);
  }, [languageMenuOpen]);

  useEffect(() => {
    if (!selectedTimeline) return;
    timelineCloseRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedTimeline(null);
        return;
      }

      if (e.key !== "Tab" || !timelineDialogRef.current) return;

      const focusable = Array.from(
        timelineDialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selectedTimeline]);

  // One primary, village-first navigation (ADR-013). Six top-level intents;
  // Unlocking Bulgaria lives as a sub-item of "Посети Ъглен", not a peer of
  // Places; Events and Local Business stay top-level. Each target is the best
  // existing valid page until its canonical /place/ or /plan/ home ships (M3) —
  // no link points at an unbuilt destination.
  const primaryNav = useMemo<NavEntry[]>(
    () => [
      { label: copy.nav.home, routeId: "home" },
      // "Справочник" opens the existing guides homepage ("Ръководства за Ъглен").
      { label: copy.nav.guide, routeId: "guides" },
      {
        label: copy.nav.visit,
        children: [
          { label: copy.nav.visitGettingHere, routeId: "howToGet" },
          { label: copy.nav.visitRoutes, routeId: "geo" },
          { label: copy.nav.visitChildren, routeId: "familyTrip" },
          { label: copy.nav.visitMissions, routeId: "arMissions" },
          { label: copy.nav.visitWhen, routeId: "bestTime" },
        ],
      },
      // "AR мисии" scrolls to the Unlocking Bulgaria banner on the homepage
      // (#ar-missions), not the /ar-missions/ hub and not the external app.
      { label: copy.nav.arMissions, anchor: "ar-missions" },
      { label: copy.nav.events, routeId: "events", accent: true },
      { label: copy.nav.business, routeId: "localBusinesses" },
    ],
    [copy],
  );

  // Active state that survives the legacy-route→guide indirection: "Места и
  // природа" points at `attractions`, which resolves to the beautiful-places
  // guide, so the item must light up on that guide's URL too.
  const isRouteActive = (navRouteId: RouteId): boolean => {
    if (navRouteId === routeId) return true;
    const guide = guideByLegacyRoute(navRouteId);
    if (guide && guideSlug === guide.slug) return true;
    // The two legacy UB routes render the hub, so "AR мисии" stays active there.
    if (navRouteId === "arMissions" && (routeId === "quests" || routeId === "app")) return true;
    return false;
  };
  const isGroupActive = (group: NavGroup): boolean => group.children.some((child) => isRouteActive(child.routeId));

  const guideLinks = useMemo(
    () => [
      { label: copy.landmarks.title, text: copy.landmarks.text, routeId: "attractions" as RouteId },
      { label: copy.guides.vitRiver.label, text: copy.guides.vitRiver.text, routeId: "vitRiver" as RouteId },
      ...(SHOW_EXPERIENCES
        ? [
            { label: copy.guides.fishing.label, text: copy.guides.fishing.text, routeId: "fishing" as RouteId },
            { label: copy.guides.hiking.label, text: copy.guides.hiking.text, routeId: "hiking" as RouteId },
          ]
        : []),
      { label: copy.guides.caves.label, text: copy.guides.caves.text, routeId: "caves" as RouteId },
      ...(SHOW_STAY ? [{ label: copy.stay.title, text: copy.stay.text, routeId: "stay" as RouteId }] : []),
      { label: copy.guides.food.label, text: copy.guides.food.text, routeId: "food" as RouteId },
      { label: copy.guides.nearby.label, text: copy.guides.nearby.text, routeId: "nearby" as RouteId },
      { label: copy.guides.seasonal.label, text: copy.guides.seasonal.text, routeId: "seasonal" as RouteId },
    ] satisfies Array<{ label: string; text: string; routeId: RouteId }>,
    [copy],
  );

  const trustLinks = useMemo(
    () => localizedUi.trustLinks.map((link) => ({ ...link, routeId: link.routeId as RouteId })),
    [localizedUi],
  );

  const landingPageLinks = useMemo(
    () => getLandingPages(language).map((page) => ({
      label: page.h1,
      text: page.metaDescription,
      routeId: page.id,
      category: page.category,
    })),
    [language],
  );

  const experienceById = useMemo(
    () => new Map(copy.experiencesList.map((experience) => [experience.id, experience] as const)),
    [copy.experiencesList],
  );

  const questFeatureById = useMemo(
    () => new Map(copy.quests.features.map((feature) => [feature.id, feature] as const)),
    [copy.quests.features],
  );

  const gatewayPlaceLabelsByKey = useMemo(() => {
    const placeTitleById = new Map(copy.placesList.map((place) => [place.id, place.title] as const));
    const labels = new Map<string, string[]>();

    (Object.entries(placeExperienceLinks) as Array<[PlaceId, PlaceExperienceLink[]]>).forEach(([placeId, links]) => {
      const placeTitle = placeTitleById.get(placeId);
      if (!placeTitle) return;

      links.forEach((link) => {
        const key = gatewayKey(link);
        labels.set(key, [...(labels.get(key) ?? []), placeTitle]);
      });
    });

    return labels;
  }, [copy.placesList]);

  const gatewayLabel = (link: PlaceExperienceLink) =>
    link.kind === "activity"
      ? experienceById.get(link.id)?.title ?? link.id
      : questFeatureById.get(link.id)?.title ?? link.id;

  const gatewayPlaceLabel = (link: PlaceExperienceLink) =>
    (gatewayPlaceLabelsByKey.get(gatewayKey(link)) ?? []).join(", ");

  const appUrl = `https://unlockingbulgaria.com/${language}/`;

  return (
    // The whole page used to sit inside <main>, header and navigation included,
    // so a screen reader found no banner landmark and one enormous main. The
    // header is now a sibling and <main> holds only the page content.
    <>
      <a className="skip-link" href="#main-content">
        {localizedUi.aria.skipToContent}
      </a>
      <header className="site-header" aria-label={copy.nav.home}>
        <a
          className="brand"
          href={routeHref("home")}
          aria-label={`${copy.brand.name} - ${copy.nav.home}`}
          onClick={(event) => handleRouteClick(event, "home")}
        >
          <img className="brand-mark" src="/assets/brand-mark-96.webp" alt="" width="44" height="44" decoding="async" />
          <span>
            <strong>{copy.brand.name}</strong>
            <small>{copy.brand.subtitle}</small>
          </span>
        </a>
        <nav className="desktop-nav">
          {primaryNav.map((entry) =>
            isNavGroup(entry) ? (
              <div
                key={entry.label}
                ref={visitMenuRef}
                className={`nav-dropdown ${visitMenuOpen ? "open" : ""}`}
                onBlur={(event) => {
                  const nextTarget = event.relatedTarget;
                  if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
                    setVisitMenuOpen(false);
                  }
                }}
              >
                <button
                  ref={visitTriggerRef}
                  type="button"
                  className="nav-dropdown-trigger"
                  aria-expanded={visitMenuOpen}
                  aria-haspopup="true"
                  aria-current={isGroupActive(entry) ? "true" : undefined}
                  onClick={() => setVisitMenuOpen((open) => !open)}
                >
                  {entry.label}
                  <ChevronDownIcon />
                </button>
                {visitMenuOpen && (
                  <div className="nav-dropdown-panel">
                    {entry.children.map((child) => (
                      <a
                        key={child.routeId}
                        href={routeHref(child.routeId)}
                        onClick={(event) => handleRouteClick(event, child.routeId)}
                        aria-current={isRouteActive(child.routeId) ? "page" : undefined}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : isNavAnchor(entry) ? (
              <a
                key={entry.anchor}
                href={`${buildRoutePath(language, "home")}#${entry.anchor}`}
                onClick={handleBannerClick}
              >
                {entry.label}
              </a>
            ) : (
              <a
                key={entry.routeId}
                href={routeHref(entry.routeId)}
                className={entry.accent ? "is-accent" : undefined}
                onClick={(event) => handleRouteClick(event, entry.routeId)}
                aria-current={isRouteActive(entry.routeId) ? "page" : undefined}
              >
                {entry.label}
              </a>
            ),
          )}
        </nav>
        <div
          ref={languageSwitchRef}
          className={`language-switch ${languageMenuOpen ? "open" : ""}`}
          onBlur={(event) => {
            const nextTarget = event.relatedTarget;
            if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
              setLanguageMenuOpen(false);
            }
          }}
        >
          <span id="language-switch-label" className="language-switch-label">{copy.ui.languageLabel}</span>
          <button
            ref={languageTriggerRef}
            className="language-trigger"
            type="button"
            aria-label={`${copy.ui.languageSelectAria}: ${selectedLanguage.label}`}
            aria-expanded={languageMenuOpen}
            aria-haspopup="listbox"
            onClick={() => setLanguageMenuOpen((open) => !open)}
          >
            <span className="language-icon-shell">
              <LanguageIcon />
            </span>
            <span className="language-current">
              <span className="language-current-code">{selectedLanguage.short}</span>
              <span className="language-current-separator" aria-hidden="true">·</span>
              <span>{selectedLanguage.label}</span>
            </span>
            <ChevronDownIcon />
          </button>
          {languageMenuOpen && (
            <div className="language-popover" role="listbox" aria-label={copy.ui.languageSelectAria}>
              {languages.map((item) => (
                <button
                  key={item.code}
                  className={item.code === language ? "active" : ""}
                  type="button"
                  role="option"
                  aria-selected={item.code === language}
                  onClick={() => changeLanguage(item.code)}
                >
                  <strong>{item.short}</strong>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          className={`hamburger${mobileMenuOpen ? " hamburger--open" : ""}`}
          type="button"
          aria-label={copy.ui.mobileMenuAria}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {mobileMenuOpen && (
        <>
          <div className="mobile-menu-backdrop" aria-hidden="true" onClick={() => setMobileMenuOpen(false)} />
          <nav id="mobile-nav" className="mobile-menu" aria-label={localizedUi.aria.mobileNav}>
            <button
              className="mobile-menu-close"
              type="button"
              aria-label={copy.ui.modalCloseAria}
              onClick={() => setMobileMenuOpen(false)}
            >
              ×
            </button>
            {primaryNav.map((entry) =>
              isNavGroup(entry) ? (
                // The Visit sub-items stay fully visible in the mobile sheet — no
                // collapse — so no essential link is ever hidden.
                <div key={entry.label} className="mobile-nav-group" role="group" aria-label={entry.label}>
                  <p className="mobile-nav-group-label">{entry.label}</p>
                  {entry.children.map((child) => (
                    <a
                      key={child.routeId}
                      className="mobile-nav-subitem"
                      href={routeHref(child.routeId)}
                      onClick={(event) => handleRouteClick(event, child.routeId)}
                      aria-current={isRouteActive(child.routeId) ? "page" : undefined}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              ) : isNavAnchor(entry) ? (
                // navigateTo (inside handleBannerClick) closes the sheet, then the
                // double-rAF scroll brings the banner into view.
                <a
                  key={entry.anchor}
                  href={`${buildRoutePath(language, "home")}#${entry.anchor}`}
                  onClick={handleBannerClick}
                >
                  {entry.label}
                </a>
              ) : (
                <a
                  key={entry.routeId}
                  href={routeHref(entry.routeId)}
                  className={entry.accent ? "is-accent" : undefined}
                  onClick={(event) => handleRouteClick(event, entry.routeId)}
                  aria-current={isRouteActive(entry.routeId) ? "page" : undefined}
                >
                  {entry.label}
                </a>
              ),
            )}
            <div className="mobile-language" aria-labelledby="mobile-language-title">
              <strong id="mobile-language-title">{copy.ui.languageLabel}</strong>
              <div className="mobile-language-grid" role="listbox" aria-label={copy.ui.languageSelectAria}>
                {languages.map((item) => (
                  <button
                    key={item.code}
                    className={item.code === language ? "active" : ""}
                    type="button"
                    role="option"
                    aria-selected={item.code === language}
                    onClick={() => {
                      changeLanguage(item.code);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <strong>{item.short}</strong>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </>
      )}

      <main id="main-content">
      {!isHomeRoute && (
        <Breadcrumbs
          language={language}
          routeId={routeId}
          businessSlug={businessSlug}
          guideSlug={guideSlug}
          placeSlug={placeSlug}
          onNavigate={navigateToPath}
        />
      )}

      {currentLandingPage && (
        <section id="seo-guide" className="seo-landing route-landing section-shell">
          <article className="seo-landing-panel reveal">
            <div className="seo-landing-hero">
              <div>
                <p className="eyebrow">{currentLandingPage.category}</p>
                <h1>{currentLandingPage.h1}</h1>
                <p>{currentLandingPage.intro}</p>
                <div className="seo-landing-actions">
                  <a className="button primary" href={routeHref("contact")} onClick={(event) => handleRouteClick(event, "contact")}>
                    {currentLandingPage.ctaLabel}
                  </a>
                  <a className="button ghost" href={routeHref("routeMap")} onClick={(event) => handleRouteClick(event, "routeMap")}>
                    {localizedUi.landing.routeMap}
                  </a>
                </div>
              </div>
              <img
                {...imageProps(currentLandingPage.image || fallbackImage, { sizes: "(max-width: 900px) 92vw, 42vw" })}
                alt={currentLandingPage.imageAlt}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                onError={handleImageError}
              />
            </div>

            <div className="seo-section-grid">
              {currentLandingPage.sections.map((section) => (
                <section className="seo-section-card" key={section.heading}>
                  <h2>{section.heading}</h2>
                  <p>{section.body}</p>
                </section>
              ))}
            </div>

            <div className="seo-faq-links">
              <div className="seo-faq">
                <p className="eyebrow">{localizedUi.landing.visitorAnswers}</p>
                <h2>{localizedUi.landing.visitorAnswers}</h2>
                {currentLandingPage.faqs.map((faq) => (
                  <details key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
              <aside className="seo-related" aria-label={localizedUi.landing.relatedGuidesAria}>
                <p className="eyebrow">{localizedUi.landing.internalLinks}</p>
                <h2>{localizedUi.landing.relatedGuides}</h2>
                {currentLandingPage.internalLinks.map((link) => (
                  <a
                    href={routeHref(link.routeId as RouteId)}
                    key={`${link.routeId}-${link.label}`}
                    onClick={(event) => handleRouteClick(event, link.routeId as RouteId)}
                  >
                    {link.label}
                  </a>
                ))}
              </aside>
            </div>
          </article>
        </section>
      )}

      {!hasOwnComponent && (
        <>
      {showSection("hero") && (
      <section id="home" className="hero">
        <img className="hero-image" {...imageProps("/assets/aglen-hero-river-canyon.png")} alt={copy.hero.imageAlt} fetchPriority="high" decoding="async" onError={handleImageError} />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-copy section-shell reveal">
          <p className="eyebrow">{copy.hero.meta}</p>
          <h1>{copy.hero.title}</h1>
          <p className="hero-title">{copy.hero.subtitle}</p>
          <p className="hero-lede">{copy.hero.lede}</p>
          <div className="hero-actions">
            <a className="button primary" href={routeHref("attractions")} onClick={(event) => handleRouteClick(event, "attractions")}>
              {copy.hero.primary}
            </a>
            <a className="button ghost" href={routeHref("arMissions")} onClick={(event) => handleRouteClick(event, "arMissions")}>
              {copy.hero.secondary}
            </a>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true">
          {copy.hero.cue}
        </div>
      </section>
      )}

      {showSection("stats") && (
      <section className="stats section-shell" aria-label={copy.statsLabel}>
        {copy.highlights.map((item) => (
          <article className="stat-card reveal" key={item.label}>
            <p>{item.label}</p>
            <h2>{item.value}</h2>
            <span>{item.detail}</span>
          </article>
        ))}
      </section>
      )}

      {showSection("story") && (
      <section id="about" className="story section-shell">
        <div className="section-heading reveal">
          <p className="eyebrow">{copy.about.eyebrow}</p>
          <SectionTitle level={headingLevel("story")}>{copy.about.title}</SectionTitle>
          <p>{copy.about.text}</p>
          <p>
            <a className="entity-inline-link" href={buildPlacePath(language, "aglen")} onClick={(event) => { event.preventDefault(); navigateToPath(buildPlacePath(language, "aglen")); }}>
              {homeEntityLink("village", language)} →
            </a>
          </p>
        </div>
        <ol className="timeline">
          {copy.timeline.map((event) => (
            <li className="reveal" key={event.title}>
              <span />
              <button type="button" onClick={() => setSelectedTimeline(event)}>
                {event.title}
              </button>
            </li>
          ))}
        </ol>
      </section>
      )}

      {showSection("legends") && (
      <section className="legends">
        <div className="section-shell">
          <div className="section-heading reveal">
            <p className="eyebrow">{copy.legends.eyebrow}</p>
            <SectionTitle level={headingLevel("legends")}>{copy.legends.title}</SectionTitle>
            <p>{copy.legends.text}</p>
          </div>
          <div className="mystery-grid">
            {copy.mysteries.map((item) => (
              <article className="mystery-card reveal" key={item.title}>
                <img {...imageProps(item.image || fallbackImage, { variant: "card" })} alt={`${item.title} - ${item.description}`} loading="lazy" decoding="async" onError={handleImageError} />
                <div>
                  <p>{item.tag}</p>
                  <h3>{item.title}</h3>
                  <span>{item.description}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      )}

      {selectedTimeline && (
        <div className="timeline-modal" onClick={() => setSelectedTimeline(null)}>
          <article
            className="timeline-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="timeline-dialog-title"
            ref={timelineDialogRef}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              ref={timelineCloseRef}
              onClick={() => setSelectedTimeline(null)}
              aria-label={copy.ui.modalCloseAria}
            >
              ×
            </button>
            <p className="eyebrow">{copy.about.eyebrow}</p>
            <h3 id="timeline-dialog-title">{selectedTimeline.title}</h3>
            {selectedTimeline.sections ? (
              <div className="timeline-article">
                {selectedTimeline.intro && <p className="timeline-article-intro">{selectedTimeline.intro}</p>}
                {selectedTimeline.sections.map((section) => (
                  <section key={section.heading}>
                    <h4>{section.heading}</h4>
                    {section.body.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </section>
                ))}
              </div>
            ) : (
              <p>{selectedTimeline.detail}</p>
            )}
          </article>
        </div>
      )}

      {showSection("places") && (
      <section id="landmarks" className="places section-shell">
        <div className="section-heading reveal">
          <p className="eyebrow">{copy.landmarks.eyebrow}</p>
          <SectionTitle level={headingLevel("places")}>{copy.landmarks.title}</SectionTitle>
          <p>{copy.landmarks.text}</p>
          <p>
            <a className="entity-inline-link" href={buildRoutePath(language, "karst")} onClick={(event) => { event.preventDefault(); navigateToPath(buildRoutePath(language, "karst")); }}>
              {homeEntityLink("karst", language)} →
            </a>
          </p>
        </div>
        <div className="place-grid">
          {copy.placesList.map((place) => {
            const gatewayLinks = placeExperienceLinks[place.id].filter(
              (link) => SHOW_EXPERIENCES || link.kind !== "activity",
            );
            // Each landmark links to its canonical /place/<slug>/ entity page (M3).
            const placeEntity = entityForPlaceId(place.id);
            const placeHref = placeEntity ? buildPlacePath(language, placeEntity.slug) : undefined;

            return (
              <article className="place-card reveal" key={place.id}>
                <img {...imageProps(place.image || fallbackImage, { variant: "card" })} alt={place.imageAlt} loading="lazy" decoding="async" onError={handleImageError} />
                <div>
                  <p>{place.tag}</p>
                  <h3>
                    {placeHref ? (
                      <a href={placeHref} onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); navigateToPath(placeHref); }}>
                        {place.title}
                      </a>
                    ) : (
                      place.title
                    )}
                  </h3>
                  <span>{place.description}</span>
                  {gatewayLinks.length > 0 && (
                    <nav className="place-card-links" aria-label={`${localizedUi.gateway.exploreFrom} ${place.title}`}>
                      {gatewayLinks.map((link) => (
                        <a
                          href={`${routeHref(gatewayRouteId(link))}#${gatewayTargetId(link)}`}
                          key={`${link.kind}-${link.id}`}
                          onClick={(event) => handleGatewayClick(event, link)}
                        >
                          {gatewayLabel(link)}
                        </a>
                      ))}
                    </nav>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
      )}

      {showSection("gallery") && (
      <section id="media" className="gallery section-shell">
        <div className="section-heading reveal">
          <p className="eyebrow">{copy.gallery.eyebrow}</p>
          <SectionTitle level={headingLevel("gallery")}>{copy.gallery.title}</SectionTitle>
        </div>
        <div className="gallery-grid" aria-label={copy.gallery.aria}>
          {copy.galleryItems.map((item) => (
            <figure className={`gallery-item ${item.size} reveal`} key={item.title}>
              <img {...imageProps(item.image || fallbackImage, { variant: "card", sizes: "(max-width: 700px) 92vw, 46vw" })} alt={item.alt} loading="lazy" decoding="async" onError={handleImageError} />
              <figcaption>{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      )}

      {showSection("map") && (
      <section id="location" className="map-section">
        <div className="section-shell map-layout">
          <div className="section-heading reveal">
            <p className="eyebrow">{copy.landmarks.aria}</p>
            <SectionTitle level={headingLevel("map")}>{copy.landmarks.title}</SectionTitle>
            <p>
              <a className="entity-inline-link" href={buildPlacePath(language, "vit-river")} onClick={(event) => { event.preventDefault(); navigateToPath(buildPlacePath(language, "vit-river")); }}>
                {homeEntityLink("river", language)} →
              </a>
            </p>
          </div>
          <div className="route-map reveal" aria-label={copy.landmarks.aria}>
            {copy.mapStops.map((stop, index) => (
              <article className="map-stop" key={stop.title}>
                <strong>{index + 1}</strong>
                <div>
                  <h3>{stop.title}</h3>
                  <p>{stop.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      )}

      {showSection("hub") && (
      <section id="travel-guide" className="content-hub section-shell">
        <div className="section-heading reveal">
          <p className="eyebrow">{copy.hub.eyebrow}</p>
          <SectionTitle level={headingLevel("hub")}>{copy.hub.title}</SectionTitle>
          <p>{copy.hub.text}</p>
        </div>
        <div className="hub-grid">
          {guideLinks.map((link) => {
            // Cards whose topic has a real guide page open that guide; the rest
            // keep their existing route rather than losing their destination.
            const guide = guideByLegacyRoute(link.routeId);
            const href = guide ? buildGuidePath(language, guide.slug) : routeHref(link.routeId);
            return (
              <a
                className="hub-card reveal"
                href={href}
                key={link.routeId}
                onClick={(event) => {
                  if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  if (!guide) {
                    handleRouteClick(event, link.routeId);
                    return;
                  }
                  event.preventDefault();
                  navigateToPath(href);
                }}
              >
                <span>{guide ? localizeGuide(guide.title, language) : link.label}</span>
                <p>{guide ? localizeGuide(guide.summary, language) : link.text}</p>
              </a>
            );
          })}
        </div>

        <div className="section-heading reveal">
          <p className="eyebrow">{copy.hub.eyebrow}</p>
          <h2>{localizedUi.landing.relatedGuides}</h2>
        </div>
        <div className="hub-grid">
          {curatedLandingPageRouteIds
            .map((routeId) => landingPageLinks.find((link) => link.routeId === routeId))
            .filter((link): link is NonNullable<typeof link> => Boolean(link))
            .map((link) => (
              <a
                className="hub-card reveal"
                href={routeHref(link.routeId)}
                key={link.routeId}
                onClick={(event) => handleRouteClick(event, link.routeId)}
              >
                <small>{link.category}</small>
                <span>{link.label.split(" | ")[0]}</span>
                <p>{link.text}</p>
              </a>
            ))}
        </div>
        {landingPageLinks
          .filter((link) => link.routeId === "visitAglen")
          .map((link) => (
            <p className="reveal" key={`${link.routeId}-all-guides`}>
              <a href={routeHref(link.routeId)} onClick={(event) => handleRouteClick(event, link.routeId)}>
                {localizedUi.landing.relatedGuides}: {link.label.split(" | ")[0]}
              </a>
            </p>
          ))}
      </section>
      )}

      {SHOW_EXPERIENCES && showSection("experiences") && (
      <section id="experiences" className="experiences section-shell">
        <div className="section-heading reveal">
          <p className="eyebrow">{copy.experiences.eyebrow}</p>
          <SectionTitle level={headingLevel("experiences")}>{copy.experiences.title}</SectionTitle>
          <p>{copy.experiences.text}</p>
        </div>
        <div className="experience-grid">
          {copy.experiencesList.map((experience) => {
            const linkedPlaces = gatewayPlaceLabel({ kind: "activity", id: experience.id });

            return (
              <article className="experience-card reveal" id={`experience-${experience.id}`} key={experience.id}>
                <div>
                  <p>
                    {experience.duration} · {experience.bestFor}
                  </p>
                  <h3>{experience.title}</h3>
                  <span>{experience.description}</span>
                  {linkedPlaces && (
                    <p className="gateway-place-context">
                      {localizedUi.gateway.placeContext}: {linkedPlaces}
                    </p>
                  )}
                </div>
                <strong className="experience-card-price">{experience.price}</strong>
                <a
                  href={routeHref("contact")}
                  aria-label={`${copy.experiences.cta}: ${experience.title}`}
                  onClick={(event) => handleRouteClick(event, "contact")}
                >
                  {copy.experiences.cta}
                </a>
              </article>
            );
          })}
        </div>
      </section>
      )}

      {SHOW_STAY && showSection("stay") && (
      <section id="stay" className="stay section-shell">
        <div className="section-heading reveal">
          <p className="eyebrow">{copy.stay.eyebrow}</p>
          <SectionTitle level={headingLevel("stay")}>{copy.stay.title}</SectionTitle>
          <p>{copy.stay.text}</p>
        </div>
        <div className="place-grid">
          {copy.accommodationList.map((item: Accommodation) => (
            <article className="place-card reveal" key={item.title}>
              <img {...imageProps(item.image || fallbackImage, { variant: "card" })} alt={`${item.title} - ${item.description}`} loading="lazy" decoding="async" onError={handleImageError} />
              <div>
                <p>{item.type}</p>
                <h3>{item.title}</h3>
                <span>{item.description}</span>
              </div>
            </article>
          ))}
        </div>
        <div className="stay-contact reveal">
          <a className="button ghost" href={routeHref("contact")} onClick={(event) => handleRouteClick(event, "contact")}>
            {copy.contact.cta}
          </a>
        </div>
      </section>
      )}

      {/* One compact Unlocking Bulgaria block (ADR-013): one heading, one short
          explanation, a CTA to the local /ar-missions/ hub, and a clearly-
          labelled external CTA to the app. It reuses the original app-section
          banner (copy beside the phone mockup) so it stays a single block —
          no second hero, no repeated product introduction. */}
      {showSection("ub") && (
      <section id="ar-missions" className="app-section">
        <div className="app-panel section-shell reveal">
          <div className="app-copy">
            <p className="eyebrow">{copy.quests.eyebrow}</p>
            <SectionTitle level={headingLevel("ub")}>{copy.ub.homeHeading}</SectionTitle>
            <p>{copy.ub.homeText}</p>
            <div className="ub-actions">
              <a className="button primary" href={routeHref("arMissions")} onClick={(event) => handleRouteClick(event, "arMissions")}>
                {copy.ub.seeMissions}
              </a>
              <a className="button ghost" href={appUrl} target="_blank" rel="noopener noreferrer">
                {copy.app.badge}
              </a>
            </div>
            <p className="ub-external-note">{copy.ub.externalLabel}</p>
          </div>

          <div className="app-showcase" aria-hidden="true">
            <figure className="phone-mockup">
              <div className="phone-frame">
                <div className="phone-screen">
                  <div className="phone-dynamic-island" />
                  <img
                    {...imageProps("/assets/unlocking-bulgaria-quest-banner.png", { variant: "card", sizes: "(max-width: 900px) 60vw, 320px" })}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onError={handleImageError}
                  />
                  <div className="phone-home-indicator" />
                </div>
                <div className="phone-btn phone-btn-vol-up" />
                <div className="phone-btn phone-btn-vol-down" />
                <div className="phone-btn phone-btn-power" />
              </div>
              <figcaption>
                <span>{copy.quests.eyebrow}</span>
                <strong>{copy.quests.features[0]?.title}</strong>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      )}

        </>
      )}

      {isEventsPage && <EventsPage language={language} />}

      {isBusinessPage && (
        <LocalBusinessesPage language={language} businessSlug={businessSlug} onNavigate={navigateToPath} />
      )}

      {isGuidesPage && <GuidesPage language={language} guideSlug={guideSlug} onNavigate={navigateToPath} />}

      {isKarstPage && <KarstPage language={language} onNavigate={navigateToPath} />}

      {isPlacePage && <PlacePage language={language} placeSlug={placeSlug} onNavigate={navigateToPath} />}

      {isTrustPage && <TrustPage language={language} routeId={routeId} onNavigate={navigateToPath} />}

      {/* The one local Unlocking Bulgaria hub. Its whole job: say what UB is (an
          independent national app), that Aglen is its first active destination,
          which missions are available and at which places, what a visitor needs,
          and how to open the external app — the only cross-domain handoff. */}
      {isArMissionsPage && (
        <section id="ar-missions" className="ar-missions section-shell">
          <div className="section-heading reveal">
            <p className="eyebrow">{copy.quests.eyebrow}</p>
            <SectionTitle level="h1">{copy.ub.hubTitle}</SectionTitle>
            <p>{copy.ub.whatText}</p>
          </div>

          <div className="ar-missions-external reveal">
            <a className="button primary" href={appUrl} target="_blank" rel="noopener noreferrer">
              {copy.app.badge}
            </a>
            <span className="ub-external-note">{copy.ub.externalLabel}</span>
          </div>

          <div className="section-heading reveal">
            <h2>{copy.ub.missionsHeading}</h2>
          </div>
          <div className="ar-missions-grid">
            {copy.quests.features.map((feature, index) => {
              const linkedPlaces = gatewayPlaceLabel({ kind: "quest", id: feature.id });
              return (
                <article className="ar-mission-card reveal" id={`quest-${feature.id}`} key={feature.id}>
                  <span className="ar-mission-num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                  {linkedPlaces && (
                    <p className="gateway-place-context">
                      {localizedUi.gateway.placeContext}: {linkedPlaces}
                    </p>
                  )}
                </article>
              );
            })}
          </div>

          <div className="ar-missions-need reveal">
            <h2>{copy.ub.needHeading}</h2>
            <ul className="ar-missions-need-list">
              {copy.ub.needItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>{copy.app.text}</p>
            <div className="ar-missions-external">
              <a className="button primary" href={appUrl} target="_blank" rel="noopener noreferrer">
                {copy.app.badge}
              </a>
              <span className="ub-external-note">{copy.ub.externalLabel}</span>
            </div>
          </div>
        </section>
      )}

      <section id="contact" className="contact section-shell">
        <div className="section-heading reveal">
          <p className="eyebrow">{copy.contact.eyebrow}</p>
          <SectionTitle level={contactHeadingLevel}>{copy.contact.title}</SectionTitle>
          <p>{copy.contact.text}</p>
        </div>
        <div className="contact-card reveal">
          <div>
            <strong>{copy.contact.notesTitle}</strong>
            <span>{copy.contact.noteOne}</span>
            <span>{copy.contact.noteTwo}</span>
          </div>
          <a className="button primary" href="mailto:info.aglen@gmail.com">
            {copy.contact.cta}
          </a>
        </div>
        {/* role="contentinfo" promotes this to the page's footer landmark. It
            stays inside the contact section so the layout is untouched. */}
        <footer id="trust" className="site-footer" role="contentinfo">
          {copy.sourceNotes.map((note) => (
            <span key={note}>{note}</span>
          ))}
          <nav className="footer-links" aria-label={localizedUi.aria.footerPolicy}>
            {trustLinks.map((link) => (
              <a
                href={routeHref(link.routeId)}
                key={link.routeId}
                onClick={(event) => handleRouteClick(event, link.routeId)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </footer>
      </section>
      </main>
    </>
  );
}

/**
 * Visible breadcrumb trail. Matches the BreadcrumbList in the page's JSON-LD —
 * Google wants the markup to describe a trail the reader can actually see.
 */
function Breadcrumbs({
  language,
  routeId,
  businessSlug,
  guideSlug,
  placeSlug,
  onNavigate,
}: {
  language: LanguageCode;
  routeId: RouteId;
  businessSlug?: string;
  guideSlug?: string;
  placeSlug?: string;
  onNavigate: (path: string) => void;
}) {
  const copy = contentByLanguage[language];
  const ui = uiTextByLanguage[language];

  // Entity pages (M3) render the containment chain of the graph, never the route
  // tree (Constitution rule 19). The chain matches the JSON-LD BreadcrumbList.
  const entityTrail = entityBreadcrumbTrail(language, routeId, placeSlug);
  const trail = entityTrail ?? (() => {
    const parentLabel = crumbLabel(language, routeId);
    if (!parentLabel) return null;
    // A detail page is three levels deep, matching the BreadcrumbList in its
    // JSON-LD: home → index → this page.
    const guide = guideSlug ? guides.find((item) => item.slug === guideSlug) : undefined;
    const business = businessSlug ? publishedBusinesses().find((item) => item.slug === businessSlug) : undefined;
    const leaf = guide ? localizeGuide(guide.title, language) : business ? business.name : undefined;
    return [
      { label: copy.nav.home, href: buildRoutePath(language, "home") },
      leaf ? { label: parentLabel, href: buildRoutePath(language, routeId) } : { label: parentLabel },
      ...(leaf ? [{ label: leaf }] : []),
    ] as Array<{ label: string; href?: string }>;
  })();
  if (!trail) return null;

  return (
    <nav className="breadcrumbs section-shell" aria-label={ui.aria.breadcrumbs}>
      <ol>
        {trail.map((crumb) =>
          crumb.href ? (
            <li key={crumb.label}>
              <a
                href={crumb.href}
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  onNavigate(crumb.href!);
                }}
              >
                {crumb.label}
              </a>
            </li>
          ) : (
            <li key={crumb.label} aria-current="page">
              {crumb.label}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}

// The breadcrumb of an entity page, walked from the graph's containment chain
// (Constitution rule 19). Returns null for non-entity routes so the caller uses
// its route-tree fallback. The trail mirrors the JSON-LD BreadcrumbList in seo.ts.
function entityBreadcrumbTrail(
  language: LanguageCode,
  routeId: RouteId,
  placeSlug?: string,
): Array<{ label: string; href?: string }> | null {
  const home = { label: contentByLanguage[language].nav.home, href: buildRoutePath(language, "home") };
  if (routeId === "karst") {
    const karst = entityBySlug("karst");
    return karst ? [home, { label: graphEntityName(karst, language) }] : null;
  }
  if (routeId === "place") {
    const entity = placeSlug ? entityBySlug(placeSlug) : undefined;
    if (!entity || entity.page?.status !== "published") return null;
    return [
      home,
      ...breadcrumbTrail(entity).map((node) => {
        const isSelf = node.id === entity.id;
        const href =
          !isSelf && node.page?.status === "published"
            ? node.page.path === "/karst/"
              ? buildRoutePath(language, "karst")
              : buildPlacePath(language, node.slug)
            : undefined;
        return { label: graphEntityName(node, language), href };
      }),
    ];
  }
  return null;
}

function crumbLabel(language: LanguageCode, routeId: RouteId): string | undefined {
  const copy = contentByLanguage[language];
  const ui = uiTextByLanguage[language];
  const landing = isLandingPageId(routeId) ? getLandingPage(language, routeId) : undefined;
  if (landing) return landing.h1.split(" | ")[0];
  const trust = ui.trustLinks.find((link) => link.routeId === routeId)?.label;
  if (trust) return trust;
  const byRoute: Partial<Record<RouteId, string>> = {
    pillars: copy.about.title,
    activities: copy.experiences.title,
    geo: copy.landmarks.aria,
    stay: copy.stay.title,
    quests: copy.quests.title,
    app: copy.app.title,
    // Concise leaf label — not the hub h1 (copy.ub.hubTitle), so the breadcrumb
    // never repeats the page title.
    arMissions: copy.nav.quests,
    travelGuide: copy.hub.title,
    contact: copy.contact.title,
    events: copy.events.title,
    localBusinesses: copy.nav.business,
    guides: guidesUiByLanguage[language].indexTitle,
  };
  return byRoute[routeId];
}
