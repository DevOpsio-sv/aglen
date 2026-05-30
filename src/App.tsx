import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { contentByLanguage, languages, type Accommodation, type LanguageCode, type TimelineItem } from "./content";
import { getLandingPage, getLandingPages, isLandingPageId } from "./landingPages";
import { buildRoutePath, getStaticRoute, resolveRoute, type RouteId, type ResolvedRoute } from "./routes";
import { updateDocumentSEO } from "./seo";
import { uiTextByLanguage } from "./uiText";

export function App() {
  const [pageRoute, setPageRoute] = useState<ResolvedRoute>(() =>
    resolveRoute(window.location.pathname, window.location.search),
  );
  const [selectedTimeline, setSelectedTimeline] = useState<TimelineItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const timelineDialogRef = useRef<HTMLElement | null>(null);
  const timelineCloseRef = useRef<HTMLButtonElement | null>(null);
  const { language, routeId } = pageRoute;
  const copy = contentByLanguage[language];
  const localizedUi = uiTextByLanguage[language];
  const currentRoute = getStaticRoute(routeId);
  const currentLandingPage = isLandingPageId(routeId) ? getLandingPage(language, routeId) : undefined;
  const selectedLanguage = languages.find((item) => item.code === language) ?? languages[0];

  const navigateTo = (nextRoute: ResolvedRoute, replace = false) => {
    const url = buildRoutePath(nextRoute.language, nextRoute.routeId);
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
    const target = document.getElementById(currentRoute.sectionId);
    if (!target) return;

    window.requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start" });
    });
  }, [currentRoute.sectionId]);

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

  return (
    <main lang={language}>
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
            className="language-trigger"
            type="button"
            aria-label={`${copy.ui.languageSelectAria}: ${selectedLanguage.label}`}
            aria-expanded={languageMenuOpen}
            aria-haspopup="listbox"
            onClick={() => setLanguageMenuOpen((open) => !open)}
          >
            <span className="language-globe" aria-hidden="true" />
            <span>{selectedLanguage.short} · {selectedLanguage.label}</span>
            <span className="language-chevron" aria-hidden="true" />
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
          className="hamburger"
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

      <section id="home" className="hero">
        <img className="hero-image" src="/assets/aglen-hero-river-canyon.png" alt={copy.hero.imageAlt} width="1200" height="630" fetchPriority="high" decoding="async" />
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

      {currentLandingPage && (
        <section id="seo-guide" className="seo-landing section-shell">
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
              <img src={currentLandingPage.image} alt={currentLandingPage.imageAlt} loading="eager" />
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
                <img src={item.image} alt="" aria-hidden="true" width="1200" height="900" loading="lazy" />
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
          {copy.placesList.map((place) => (
            <article className="place-card reveal" key={place.title}>
              <img src={place.image} alt={place.imageAlt} width="1200" height="900" loading="lazy" />
              <div>
                <p>{place.tag}</p>
                <h3>{place.title}</h3>
                <span>{place.description}</span>
              </div>
            </article>
          ))}
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
              <img src={item.image} alt={item.alt} width="1200" height="900" loading="lazy" />
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
          {copy.experiencesList.map((experience) => (
            <article className="experience-card reveal" key={experience.title}>
              <div>
                <p>
                  {experience.duration} · {experience.bestFor}
                </p>
                <h3>{experience.title}</h3>
                <span>{experience.description}</span>
              </div>
              <strong>{experience.price}</strong>
              <a
                href={routeHref("contact")}
                aria-label={`${copy.experiences.cta}: ${experience.title}`}
                onClick={(event) => handleRouteClick(event, "contact")}
              >
                {copy.experiences.cta}
              </a>
            </article>
          ))}
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
              <img src={item.image} alt="" aria-hidden="true" width="1200" height="900" loading="lazy" />
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
            {copy.quests.features.map((f, i) => (
              <article className="quest-feature reveal" key={f.title}>
                <span className="quest-feature-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
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
                className="app-store-badge"
                href="https://play.google.com/store/apps/details?id=com.hiddenBulgaria.quests"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="play-icon" aria-hidden="true" />
                <span>{copy.app.badge}</span>
              </a>
              <p className="app-note">{copy.app.note}</p>
            </div>
            <ul className="app-highlights" aria-label={copy.app.eyebrow}>
              {copy.ar.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>

          <div className="app-showcase" aria-hidden="true">
            <div className="app-glow" />
            <div className="phone-mockup">
              <div className="phone-speaker" />
              <div className="phone-screen">
                <div className="phone-map">
                  <span className="map-line one" />
                  <span className="map-line two" />
                  <span className="map-line three" />
                  <span className="quest-pin main" />
                  <span className="quest-pin secondary" />
                  <span className="quest-pin tertiary" />
                </div>
                <div className="phone-card">
                  <span>{copy.quests.eyebrow}</span>
                  <strong>{copy.ar.title}</strong>
                  <small>{copy.quests.cta}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
