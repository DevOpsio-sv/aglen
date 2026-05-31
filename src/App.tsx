import { useEffect, useMemo, useRef, useState, type MouseEvent, type SyntheticEvent } from "react";
import { contentByLanguage, languages, type Accommodation, type LanguageCode, type PlaceId, type TimelineItem } from "./content";
import { getLandingPage, getLandingPages, isLandingPageId } from "./landingPages";
import { placeExperienceLinks, type PlaceExperienceLink } from "./placeLinks";
import { buildRoutePath, getStaticRoute, resolveRoute, type RouteId, type ResolvedRoute } from "./routes";
import { updateDocumentSEO } from "./seo";
import { uiTextByLanguage } from "./uiText";

const fallbackImage = "/assets/aglen-vit-river-sunset.png";

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
  return link.kind === "activity" ? "activities" : "quests";
}

function gatewayTargetId(link: PlaceExperienceLink): string {
  return link.kind === "activity" ? `experience-${link.id}` : `quest-${link.id}`;
}

function gatewayKey(link: PlaceExperienceLink): string {
  return `${link.kind}:${link.id}`;
}

export function App() {
  const [pageRoute, setPageRoute] = useState<ResolvedRoute>(() =>
    resolveRoute(window.location.pathname, window.location.search),
  );
  const [selectedTimeline, setSelectedTimeline] = useState<TimelineItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const timelineDialogRef = useRef<HTMLElement | null>(null);
  const timelineCloseRef = useRef<HTMLButtonElement | null>(null);
  const languageSwitchRef = useRef<HTMLDivElement | null>(null);
  const languageTriggerRef = useRef<HTMLButtonElement | null>(null);
  const { language, routeId } = pageRoute;
  const copy = contentByLanguage[language];
  const localizedUi = uiTextByLanguage[language];
  const currentRoute = getStaticRoute(routeId);
  const currentLandingPage = isLandingPageId(routeId) ? getLandingPage(language, routeId) : undefined;
  const selectedLanguage = languages.find((item) => item.code === language) ?? languages[0];

  const navigateTo = (nextRoute: ResolvedRoute, replace = false, hash = "") => {
    const url = `${buildRoutePath(nextRoute.language, nextRoute.routeId)}${hash}`;
    setSelectedTimeline(null);
    setLanguageMenuOpen(false);
    setMobileMenuOpen(false);
    setPageRoute(nextRoute);

    if (replace) {
      history.replaceState(null, "", url);
      return;
    }

    history.pushState(null, "", url);
  };

  const routeHref = (nextRouteId: RouteId, nextLanguage = language) =>
    buildRoutePath(nextLanguage, nextRouteId);

  const handleRouteClick = (event: MouseEvent<HTMLAnchorElement>, nextRouteId: RouteId) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    navigateTo({ language, routeId: nextRouteId });
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

  const changeLanguage = (nextLanguage: LanguageCode) => {
    navigateTo({ language: nextLanguage, routeId }, true);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    updateDocumentSEO(language, routeId);

    const canonicalPath = buildRoutePath(language, routeId);
    if (window.location.pathname !== canonicalPath || window.location.search) {
      history.replaceState(null, "", canonicalPath);
    }
  }, [language, routeId]);

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
    const target = document.getElementById(hashTarget) ?? document.getElementById(currentRoute.sectionId);
    if (!target) return;

    window.requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start" });
    });
  }, [currentRoute.sectionId, routeId]);

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

  const navItems = useMemo(
    () => [
      [copy.nav.home, "home"],
      [copy.nav.about, "pillars"],
      [copy.nav.landmarks, "attractions"],
      [copy.experiences.eyebrow, "activities"],
      [copy.nav.stay, "stay"],
      [copy.nav.quests, "quests"],
    ],
    [copy],
  ) as Array<[string, RouteId]>;

  const guideLinks = useMemo(
    () => [
      { label: copy.landmarks.title, text: copy.landmarks.text, routeId: "attractions" },
      { label: copy.guides.vitRiver.label, text: copy.guides.vitRiver.text, routeId: "vitRiver" },
      { label: copy.guides.fishing.label, text: copy.guides.fishing.text, routeId: "fishing" },
      { label: copy.guides.hiking.label, text: copy.guides.hiking.text, routeId: "hiking" },
      { label: copy.guides.caves.label, text: copy.guides.caves.text, routeId: "caves" },
      { label: copy.stay.title, text: copy.stay.text, routeId: "stay" },
      { label: copy.guides.food.label, text: copy.guides.food.text, routeId: "food" },
      { label: copy.guides.nearby.label, text: copy.guides.nearby.text, routeId: "nearby" },
      { label: copy.guides.seasonal.label, text: copy.guides.seasonal.text, routeId: "seasonal" },
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
    <main>
      <header className="site-header" aria-label={copy.nav.home}>
        <a
          className="brand"
          href={routeHref("home")}
          aria-label={`${copy.brand.name} - ${copy.nav.home}`}
          onClick={(event) => handleRouteClick(event, "home")}
        >
          <span className="brand-mark">Ъ</span>
          <span>
            <strong>{copy.brand.name}</strong>
            <small>{copy.brand.subtitle}</small>
          </span>
        </a>
        <nav className="desktop-nav">
          {navItems.map(([label, navRouteId]) => (
            <a
              key={navRouteId}
              href={routeHref(navRouteId)}
              onClick={(event) => handleRouteClick(event, navRouteId)}
              aria-current={navRouteId === routeId ? "page" : undefined}
            >
              {label}
            </a>
          ))}
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
            {navItems.map(([label, navRouteId]) => (
              <a
                key={navRouteId}
                href={routeHref(navRouteId)}
                onClick={(event) => handleRouteClick(event, navRouteId)}
                aria-current={navRouteId === routeId ? "page" : undefined}
              >
                {label}
              </a>
            ))}
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
              <img src={currentLandingPage.image || fallbackImage} alt={currentLandingPage.imageAlt} width="1200" height="900" loading="eager" decoding="async" onError={handleImageError} />
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

      {!currentLandingPage && (
        <>
      <section id="home" className="hero">
        <img className="hero-image" src="/assets/aglen-vit-river-sunset.png" alt={copy.hero.imageAlt} width="1200" height="630" fetchPriority="high" decoding="async" onError={handleImageError} />
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
            <a className="button ghost" href={routeHref("app")} onClick={(event) => handleRouteClick(event, "app")}>
              {copy.hero.secondary}
            </a>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true">
          {copy.hero.cue}
        </div>
      </section>

      <section className="stats section-shell" aria-label={copy.statsLabel}>
        {copy.highlights.map((item) => (
          <article className="stat-card reveal" key={item.label}>
            <p>{item.label}</p>
            <h2>{item.value}</h2>
            <span>{item.detail}</span>
          </article>
        ))}
      </section>

      <section id="about" className="story section-shell">
        <div className="section-heading reveal">
          <p className="eyebrow">{copy.about.eyebrow}</p>
          <h2>{copy.about.title}</h2>
          <p>{copy.about.text}</p>
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

      <section className="legends">
        <div className="section-shell">
          <div className="section-heading reveal">
            <p className="eyebrow">{copy.legends.eyebrow}</p>
            <h2>{copy.legends.title}</h2>
            <p>{copy.legends.text}</p>
          </div>
          <div className="mystery-grid">
            {copy.mysteries.map((item) => (
              <article className="mystery-card reveal" key={item.title}>
                <img src={item.image || fallbackImage} alt={`${item.title} - ${item.description}`} width="1200" height="900" loading="lazy" decoding="async" onError={handleImageError} />
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
            <p>{selectedTimeline.detail}</p>
          </article>
        </div>
      )}

      <section id="landmarks" className="places section-shell">
        <div className="section-heading reveal">
          <p className="eyebrow">{copy.landmarks.eyebrow}</p>
          <h2>{copy.landmarks.title}</h2>
          <p>{copy.landmarks.text}</p>
        </div>
        <div className="place-grid">
          {copy.placesList.map((place) => {
            const gatewayLinks = placeExperienceLinks[place.id];

            return (
              <article className="place-card reveal" key={place.id}>
                <img src={place.image || fallbackImage} alt={place.imageAlt} width="1200" height="900" loading="lazy" decoding="async" onError={handleImageError} />
                <div>
                  <p>{place.tag}</p>
                  <h3>{place.title}</h3>
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

      <section id="media" className="gallery section-shell">
        <div className="section-heading reveal">
          <p className="eyebrow">{copy.gallery.eyebrow}</p>
          <h2>{copy.gallery.title}</h2>
        </div>
        <div className="gallery-grid" aria-label={copy.gallery.aria}>
          {copy.galleryItems.map((item) => (
            <figure className={`gallery-item ${item.size} reveal`} key={item.title}>
              <img src={item.image || fallbackImage} alt={item.alt} width="1200" height="900" loading="lazy" decoding="async" onError={handleImageError} />
              <figcaption>{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="location" className="map-section">
        <div className="section-shell map-layout">
          <div className="section-heading reveal">
            <p className="eyebrow">{copy.landmarks.aria}</p>
            <h2>{copy.landmarks.title}</h2>
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

      <section id="travel-guide" className="content-hub section-shell">
        <div className="section-heading reveal">
          <p className="eyebrow">{copy.hub.eyebrow}</p>
          <h2>{copy.hub.title}</h2>
          <p>{copy.hub.text}</p>
        </div>
        <div className="hub-grid">
          {[...guideLinks, ...landingPageLinks].map((link) => (
            <a
              className="hub-card reveal"
              href={routeHref(link.routeId)}
              key={link.routeId}
              onClick={(event) => handleRouteClick(event, link.routeId)}
            >
              {"category" in link && <small>{link.category}</small>}
              <span>{link.label}</span>
              <p>{link.text}</p>
            </a>
          ))}
        </div>
      </section>

      <section id="experiences" className="experiences section-shell">
        <div className="section-heading reveal">
          <p className="eyebrow">{copy.experiences.eyebrow}</p>
          <h2>{copy.experiences.title}</h2>
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

      <section id="stay" className="stay section-shell">
        <div className="section-heading reveal">
          <p className="eyebrow">{copy.stay.eyebrow}</p>
          <h2>{copy.stay.title}</h2>
          <p>{copy.stay.text}</p>
        </div>
        <div className="place-grid">
          {copy.accommodationList.map((item: Accommodation) => (
            <article className="place-card reveal" key={item.title}>
              <img src={item.image || fallbackImage} alt={`${item.title} - ${item.description}`} width="1200" height="900" loading="lazy" decoding="async" onError={handleImageError} />
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

      <section id="quests" className="quests">
        <div className="section-shell">
          <div className="quests-header reveal">
            <p className="eyebrow">{copy.quests.eyebrow}</p>
            <h2>{copy.quests.title}</h2>
            <p className="quests-lede">{copy.quests.text}</p>
          </div>
          <div className="quests-features">
            {copy.quests.features.map((f, i) => {
              const linkedPlaces = gatewayPlaceLabel({ kind: "quest", id: f.id });

              return (
                <article className="quest-feature reveal" id={`quest-${f.id}`} key={f.id}>
                  <span className="quest-feature-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                  {linkedPlaces && (
                    <p className="gateway-place-context">
                      {localizedUi.gateway.placeContext}: {linkedPlaces}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
          <div className="quests-cta reveal">
            <a className="button primary quests-btn" href={routeHref("app")} onClick={(event) => handleRouteClick(event, "app")}>
              {copy.quests.cta}
            </a>
          </div>
        </div>
      </section>

      <section id="ar" className="ar-section section-shell">
        <div className="section-heading reveal">
          <p className="eyebrow">{copy.ar.eyebrow}</p>
          <h2>{copy.ar.title}</h2>
          <p>{copy.ar.text}</p>
        </div>
        <ol className="ar-steps reveal">
          {copy.ar.steps.map((step, index) => (
            <li key={index}>
              <strong>{index + 1}</strong>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <div className="ar-cta reveal">
          <a className="button primary" href={routeHref("app")} onClick={(event) => handleRouteClick(event, "app")}>
            {copy.ar.cta}
          </a>
        </div>
      </section>

      <section id="app" className="app-section">
        <div className="app-panel section-shell reveal">
          <div className="app-copy">
            <p className="eyebrow">{copy.app.eyebrow}</p>
            <h2>{copy.app.title}</h2>
            <p>{copy.app.text}</p>
            <div className="app-download">
              <a
                className="button primary app-cta"
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{copy.app.badge}</span>
              </a>
            </div>
            <ul className="app-highlights" aria-label={copy.app.eyebrow}>
              {copy.quests.features.slice(0, 3).map((feature) => (
                <li key={feature.id}>{feature.title}</li>
              ))}
            </ul>
          </div>

          <div className="app-showcase" aria-hidden="true">
            <figure className="ub-banner-card">
              <img
                src="/assets/unlocking-bulgaria-quest-banner.svg"
                alt=""
                width="1024"
                height="550"
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <span>{copy.quests.eyebrow}</span>
                <strong>{copy.quests.features[0]?.title}</strong>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
        </>
      )}

      <section id="contact" className="contact section-shell">
        <div className="section-heading reveal">
          <p className="eyebrow">{copy.contact.eyebrow}</p>
          <h2>{copy.contact.title}</h2>
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
        <footer id="trust" className="site-footer">
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
  );
}
