import { useCallback, useEffect, useMemo, useState, type SyntheticEvent } from "react";
import type { BusinessCategory, LanguageCode, LocalBusiness } from "./locales/types";
import {
  ADD_BUSINESS_EMAIL,
  ADD_BUSINESS_FORM_URL,
  ADD_BUSINESS_PHONE,
  activeCategories,
  businessStories,
  findBusiness,
  isOpenNow,
  localizeText,
  localProducts,
  mapUrl,
  publishedBusinesses,
  WEEKDAYS,
} from "./localBusinesses";
import { businessesUiByLanguage, categoryEmoji, categoryLabel, type BusinessesUiText } from "./localBusinessesUi";
import { buildBusinessPath, buildRoutePath } from "./routes";

const fallbackImage = "/assets/aglen-hero-river-canyon.png";

function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  if (image.src.endsWith(fallbackImage)) return;
  image.src = fallbackImage;
}

type Filters = {
  category: BusinessCategory | "all";
  query: string;
};

const EMPTY_FILTERS: Filters = { category: "all", query: "" };

export default function LocalBusinessesPage({
  language,
  businessSlug,
  onNavigate,
}: {
  language: LanguageCode;
  businessSlug?: string;
  onNavigate: (path: string) => void;
}) {
  const ui = businessesUiByLanguage[language];

  if (businessSlug) {
    return <BusinessDetail ui={ui} language={language} slug={businessSlug} onNavigate={onNavigate} />;
  }

  return <BusinessDirectory ui={ui} language={language} onNavigate={onNavigate} />;
}

// ── Listing ──────────────────────────────────────────────────
function BusinessDirectory({
  ui,
  language,
  onNavigate,
}: {
  ui: BusinessesUiText;
  language: LanguageCode;
  onNavigate: (path: string) => void;
}) {
  const all = useMemo(() => publishedBusinesses(), []);
  const categories = useMemo(() => activeCategories(), []);
  const stories = useMemo(() => businessStories(), []);
  const products = useMemo(() => localProducts(language), [language]);

  const readFilters = useCallback((): Filters => {
    if (typeof window === "undefined") return EMPTY_FILTERS;
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    return {
      category: categories.includes(category as BusinessCategory) ? (category as BusinessCategory) : "all",
      query: params.get("q") ?? "",
    };
  }, [categories]);

  const [filters, setFilters] = useState<Filters>(readFilters);

  // Filter state lives in the URL, so back/forward/refresh restore the view.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const set = (key: string, value: string | null) => (value ? params.set(key, value) : params.delete(key));
    set("category", filters.category === "all" ? null : filters.category);
    set("q", filters.query.trim() || null);
    const search = params.toString();
    const next = `${window.location.pathname}${search ? `?${search}` : ""}`;
    if (next !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState(null, "", next);
    }
  }, [filters]);

  useEffect(() => {
    const onPop = () => setFilters(readFilters());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [readFilters]);

  const results = useMemo(() => {
    const needle = filters.query.trim().toLowerCase();
    return all.filter((business) => {
      if (filters.category !== "all" && business.category !== filters.category) return false;
      if (!needle) return true;
      const haystack = [
        business.name,
        localizeText(business.shortDescription, language),
        business.description ? localizeText(business.description, language) : "",
        business.address ?? "",
        categoryLabel(ui, business.category),
        ...(business.products ?? []).map((product) => localizeText(product, language)),
        ...(business.services ?? []).map((service) => localizeText(service, language)),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [all, filters, language, ui]);

  const isFiltered = filters.category !== "all" || filters.query.trim() !== "";

  return (
    <div className="businesses-page">
      <BusinessHero ui={ui} onAdd={() => scrollToId("businesses-add")} onExplore={() => scrollToId("businesses-list")} />

      <section className="section-shell businesses-listing" id="businesses-list" aria-labelledby="businesses-list-title">
        <header className="businesses-head">
          <h2 id="businesses-list-title">{ui.listTitle}</h2>
        </header>

        <div className="businesses-controls">
          <div className="businesses-search">
            <label className="sr-only" htmlFor="businesses-search-input">
              {ui.searchLabel}
            </label>
            <span className="businesses-search-icon" aria-hidden="true">
              ⌕
            </span>
            <input
              id="businesses-search-input"
              type="search"
              value={filters.query}
              placeholder={ui.searchPlaceholder}
              onChange={(event) => setFilters((current) => ({ ...current, query: event.target.value }))}
            />
          </div>

          {categories.length > 0 && (
            <div className="businesses-chips" role="group" aria-label={ui.categoriesAria}>
              <button
                type="button"
                className={`businesses-chip${filters.category === "all" ? " is-active" : ""}`}
                aria-pressed={filters.category === "all"}
                onClick={() => setFilters((current) => ({ ...current, category: "all" }))}
              >
                {ui.filterAll}
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`businesses-chip${filters.category === category ? " is-active" : ""}`}
                  aria-pressed={filters.category === category}
                  onClick={() => setFilters((current) => ({ ...current, category }))}
                >
                  <span aria-hidden="true">{categoryEmoji[category]}</span> {categoryLabel(ui, category)}
                </button>
              ))}
            </div>
          )}

          {isFiltered && (
            <div className="businesses-toggles">
              <button type="button" className="businesses-clear" onClick={() => setFilters(EMPTY_FILTERS)}>
                {ui.clearFilters}
              </button>
            </div>
          )}
        </div>

        {/* Announced to screen readers whenever the result count changes. */}
        <p className="businesses-count" role="status" aria-live="polite">
          {results.length > 0 ? ui.resultsCount.replace("{count}", String(results.length)) : ""}
        </p>

        {results.length > 0 ? (
          <div className="businesses-grid">
            {results.map((business) => (
              <BusinessCard key={business.id} ui={ui} language={language} business={business} onNavigate={onNavigate} />
            ))}
          </div>
        ) : (
          <EmptyState
            message={all.length === 0 ? ui.emptyAll : isFiltered && filters.query.trim() ? ui.emptyResults : ui.emptyCategory}
            actionLabel={isFiltered ? ui.clearFilters : undefined}
            onAction={isFiltered ? () => setFilters(EMPTY_FILTERS) : undefined}
          />
        )}
      </section>

      {stories.length > 0 && (
        <section className="section-shell businesses-stories" aria-labelledby="businesses-stories-title">
          <header className="businesses-head is-center">
            <p className="eyebrow">{ui.storiesEyebrow}</p>
            <h2 id="businesses-stories-title">{ui.storiesTitle}</h2>
          </header>
          <div className="businesses-stories-grid">
            {stories.map((business) => {
              const story = business.story!;
              return (
                <figure className="business-story" key={business.id}>
                  {story.image && (
                    <img src={story.image} alt={story.person} loading="lazy" decoding="async" onError={handleImageError} />
                  )}
                  <blockquote>„{localizeText(story.quote, language)}“</blockquote>
                  <figcaption>
                    <strong>{story.person}</strong>
                    {story.role && <span>{localizeText(story.role, language)}</span>}
                    <a
                      href={buildBusinessPath(language, business.slug)}
                      onClick={(event) => {
                        event.preventDefault();
                        onNavigate(buildBusinessPath(language, business.slug));
                      }}
                    >
                      {business.name} →
                    </a>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      )}

      {products.length > 0 && (
        <section className="section-shell businesses-products" aria-labelledby="businesses-products-title">
          <header className="businesses-head is-center">
            <p className="eyebrow">{ui.productsEyebrow}</p>
            <h2 id="businesses-products-title">{ui.productsTitle}</h2>
            <p className="businesses-head-note">{ui.productsNote}</p>
          </header>
          <ul className="businesses-products-list">
            {products.map((product, index) => (
              <li key={`${product.business.id}-${index}`}>
                <a
                  href={buildBusinessPath(language, product.business.slug)}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(buildBusinessPath(language, product.business.slug));
                  }}
                >
                  <strong>{product.label}</strong>
                  <span>{product.business.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <AddBusiness ui={ui} />
    </div>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "smooth" });
}

// ── Hero ─────────────────────────────────────────────────────
function BusinessHero({ ui, onExplore, onAdd }: { ui: BusinessesUiText; onExplore: () => void; onAdd: () => void }) {
  return (
    <section className="businesses-hero" aria-labelledby="businesses-hero-title">
      <img
        className="businesses-hero-bg"
        src="/assets/local-businesses-hero.jpg"
        alt=""
        aria-hidden="true"
        decoding="async"
        onError={handleImageError}
      />
      <div className="businesses-hero-overlay" aria-hidden="true" />
      <div className="businesses-hero-inner section-shell">
        <p className="eyebrow businesses-hero-eyebrow">{ui.heroEyebrow}</p>
        <h1 id="businesses-hero-title">{ui.heroTitle}</h1>
        <p className="businesses-hero-sub">{ui.heroSubtitle}</p>
        <p className="businesses-hero-tagline">{ui.heroTagline}</p>
        <div className="businesses-hero-actions">
          <button type="button" className="button primary" onClick={onExplore}>
            {ui.heroCtaExplore}
          </button>
          <button type="button" className="button ghost businesses-hero-ghost" onClick={onAdd}>
            {ui.heroCtaAdd}
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Card ─────────────────────────────────────────────────────
function BusinessCard({
  ui,
  language,
  business,
  onNavigate,
}: {
  ui: BusinessesUiText;
  language: LanguageCode;
  business: LocalBusiness;
  onNavigate: (path: string) => void;
}) {
  const href = buildBusinessPath(language, business.slug);
  const openState = business.openingHours ? isOpenNow(business) : undefined;

  return (
    <article className="business-card">
      <a
        className="business-card-link"
        href={href}
        onClick={(event) => {
          event.preventDefault();
          onNavigate(href);
        }}
      >
        <div className="business-card-media">
          {business.coverImage ? (
            <img
              src={business.coverImage}
              alt={business.coverImageAlt ? localizeText(business.coverImageAlt, language) : business.name}
              loading="lazy"
              decoding="async"
              onError={handleImageError}
            />
          ) : (
            <span className="business-card-placeholder" aria-hidden="true">
              {categoryEmoji[business.category]}
            </span>
          )}
          {business.logo && <img className="business-card-logo" src={business.logo} alt="" aria-hidden="true" loading="lazy" />}
        </div>

        <div className="business-card-body">
          <p className="business-card-category">
            <span aria-hidden="true">{categoryEmoji[business.category]}</span> {categoryLabel(ui, business.category)}
          </p>
          <h3>{business.name}</h3>
          <p className="business-card-desc">{localizeText(business.shortDescription, language)}</p>

          <BusinessBadges ui={ui} business={business} language={language} openState={openState} />

          <dl className="business-card-facts">
            {business.address && (
              <div>
                <dt>
                  <span aria-hidden="true">📍</span> {ui.detailLocation}
                </dt>
                <dd>{business.address}</dd>
              </div>
            )}
            {business.phone && (
              <div>
                <dt>
                  <span aria-hidden="true">☎</span> {ui.call}
                </dt>
                <dd>{business.phone}</dd>
              </div>
            )}
          </dl>

          <span className="business-card-cta">{ui.viewDetails} →</span>
        </div>
      </a>
    </article>
  );
}

function BusinessBadges({
  ui,
  business,
  language,
  openState,
}: {
  ui: BusinessesUiText;
  business: LocalBusiness;
  language: LanguageCode;
  openState?: boolean;
}) {
  const badges: { key: string; label: string; tone?: string }[] = [];
  if (business.highlight) badges.push({ key: "highlight", label: localizeText(business.highlight, language), tone: "highlight" });
  if (business.verified) badges.push({ key: "verified", label: `✓ ${ui.badgeVerified}`, tone: "verified" });
  if (business.status === "temporarily_closed") badges.push({ key: "closed", label: ui.badgeTemporarilyClosed, tone: "closed" });
  else if (openState === true) badges.push({ key: "open", label: ui.badgeOpenNow, tone: "open" });
  else if (openState === false) badges.push({ key: "shut", label: ui.badgeClosedNow, tone: "muted" });
  if (business.delivery) badges.push({ key: "delivery", label: ui.badgeDelivery });
  if (business.pickup) badges.push({ key: "pickup", label: ui.badgePickup });
  if (business.bookingRequired) badges.push({ key: "booking", label: ui.badgeBooking });
  if (business.seasonal) badges.push({ key: "seasonal", label: ui.badgeSeasonal });

  if (badges.length === 0) return null;
  return (
    <ul className="business-badges">
      {badges.map((badge) => (
        <li key={badge.key} className="business-badge" data-tone={badge.tone}>
          {badge.label}
        </li>
      ))}
    </ul>
  );
}

// ── Detail ───────────────────────────────────────────────────
function BusinessDetail({
  ui,
  language,
  slug,
  onNavigate,
}: {
  ui: BusinessesUiText;
  language: LanguageCode;
  slug: string;
  onNavigate: (path: string) => void;
}) {
  const business = useMemo(() => findBusiness(slug), [slug]);
  const listPath = buildRoutePath(language, "localBusinesses");
  const related = useMemo(
    () =>
      business
        ? publishedBusinesses()
            .filter((item) => item.id !== business.id && item.category === business.category)
            .slice(0, 3)
        : [],
    [business],
  );

  if (!business) {
    return (
      <div className="businesses-page">
        <section className="section-shell businesses-notfound">
          <EmptyState
            message={ui.notFound}
            actionLabel={ui.backToList}
            onAction={() => onNavigate(listPath)}
          />
        </section>
      </div>
    );
  }

  const maps = mapUrl(business);
  const openState = business.openingHours ? isOpenNow(business) : undefined;
  const weekdayFmt = new Intl.DateTimeFormat(language, { weekday: "long" });

  return (
    <div className="businesses-page business-detail-page">
      <div className="section-shell business-detail-top">
        <a
          className="business-back"
          href={listPath}
          onClick={(event) => {
            event.preventDefault();
            onNavigate(listPath);
          }}
        >
          ← {ui.backToList}
        </a>
      </div>

      <article className="section-shell business-detail">
        <header className="business-detail-head">
          <p className="business-card-category">
            <span aria-hidden="true">{categoryEmoji[business.category]}</span> {categoryLabel(ui, business.category)}
          </p>
          <h1>{business.name}</h1>
          <p className="business-detail-lead">{localizeText(business.shortDescription, language)}</p>
          {business.highlight && (
            <p className="business-detail-highlight">
              <span aria-hidden="true">★</span> {localizeText(business.highlight, language)}
            </p>
          )}
          <BusinessBadges ui={ui} business={business} language={language} openState={openState} />
          <div className="business-detail-actions">
            {business.phone && (
              <a className="button primary" href={`tel:${business.phone.replace(/\s+/g, "")}`}>
                <span aria-hidden="true">☎</span> {ui.call}
              </a>
            )}
            {maps && (
              <a className="button ghost" href={maps} target="_blank" rel="noopener noreferrer">
                <span aria-hidden="true">📍</span> {ui.openMap}
              </a>
            )}
            {business.website && (
              <a className="button ghost" href={business.website} target="_blank" rel="noopener noreferrer">
                {ui.visitWebsite}
              </a>
            )}
          </div>
        </header>

        {business.coverImage && (
          <img
            className="business-detail-cover"
            src={business.coverImage}
            alt={business.coverImageAlt ? localizeText(business.coverImageAlt, language) : business.name}
            loading="lazy"
            decoding="async"
            onError={handleImageError}
          />
        )}

        <div className="business-detail-grid">
          <div className="business-detail-main">
            {business.description && (
              <section aria-labelledby="business-about">
                <h2 id="business-about">{ui.detailAbout}</h2>
                {localizeText(business.description, language)
                  .split("\n\n")
                  .map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
              </section>
            )}

            {business.story && (
              <section className="business-detail-story" aria-labelledby="business-story">
                <h2 id="business-story">{ui.detailStory}</h2>
                <blockquote>„{localizeText(business.story.quote, language)}“</blockquote>
                <p className="business-detail-story-by">
                  <strong>{business.story.person}</strong>
                  {business.story.role && <> · {localizeText(business.story.role, language)}</>}
                </p>
              </section>
            )}

            {business.products && business.products.length > 0 && (
              <section aria-labelledby="business-products">
                <h2 id="business-products">{ui.detailProducts}</h2>
                <ul className="business-detail-list">
                  {business.products.map((product, index) => (
                    <li key={index}>{localizeText(product, language)}</li>
                  ))}
                </ul>
              </section>
            )}

            {business.services && business.services.length > 0 && (
              <section aria-labelledby="business-services">
                <h2 id="business-services">{ui.detailServices}</h2>
                <ul className="business-detail-list">
                  {business.services.map((service, index) => (
                    <li key={index}>{localizeText(service, language)}</li>
                  ))}
                </ul>
              </section>
            )}

            {business.gallery && business.gallery.length > 0 && (
              <section aria-labelledby="business-gallery">
                <h2 id="business-gallery">{ui.detailGallery}</h2>
                <div className="business-detail-gallery">
                  {business.gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image.src}
                      alt={localizeText(image.alt, language)}
                      loading="lazy"
                      decoding="async"
                      onError={handleImageError}
                    />
                  ))}
                </div>
              </section>
            )}

            {business.accessibility && business.accessibility.length > 0 && (
              <section aria-labelledby="business-accessibility">
                <h2 id="business-accessibility">{ui.detailAccessibility}</h2>
                <ul className="business-detail-list">
                  {business.accessibility.map((item, index) => (
                    <li key={index}>{localizeText(item, language)}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="business-detail-aside" aria-label={ui.detailContact}>
            {(business.phone || business.email || business.website || business.socialLinks) && (
              <section>
                <h2>{ui.detailContact}</h2>
                <ul className="business-detail-contact">
                  {business.phone && (
                    <li>
                      <a href={`tel:${business.phone.replace(/\s+/g, "")}`}>{business.phone}</a>
                    </li>
                  )}
                  {business.email && (
                    <li>
                      <a href={`mailto:${business.email}`}>{business.email}</a>
                    </li>
                  )}
                  {business.website && (
                    <li>
                      <a href={business.website} target="_blank" rel="noopener noreferrer">
                        {ui.visitWebsite}
                      </a>
                    </li>
                  )}
                  {business.socialLinks?.facebook && (
                    <li>
                      <a href={business.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                        Facebook
                      </a>
                    </li>
                  )}
                  {business.socialLinks?.instagram && (
                    <li>
                      <a href={business.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                        Instagram
                      </a>
                    </li>
                  )}
                </ul>
              </section>
            )}

            {business.openingHours && (
              <section>
                <h2>{ui.detailHours}</h2>
                <dl className="business-detail-hours">
                  {WEEKDAYS.map((day) => {
                    const slots = business.openingHours?.[day] ?? [];
                    // 2024-01-01 is a Monday, so day 1..7 maps to the right weekday name.
                    const name = weekdayFmt.format(new Date(2024, 0, day));
                    return (
                      <div key={day}>
                        <dt>{name}</dt>
                        <dd>{slots.length > 0 ? slots.map((slot) => `${slot.open}–${slot.close}`).join(", ") : ui.closedDay}</dd>
                      </div>
                    );
                  })}
                </dl>
                {business.seasonalNote && <p className="business-detail-note">{localizeText(business.seasonalNote, language)}</p>}
              </section>
            )}

            {(business.address || maps) && (
              <section>
                <h2>{ui.detailLocation}</h2>
                {business.address && <p>{business.address}</p>}
                {maps && (
                  <a className="button ghost" href={maps} target="_blank" rel="noopener noreferrer">
                    <span aria-hidden="true">📍</span> {ui.openMap}
                  </a>
                )}
              </section>
            )}

            <p className="business-detail-meta">
              {business.lastUpdated && (
                <span>
                  {ui.lastUpdated} {business.lastUpdated}
                </span>
              )}
              <a href={`mailto:${ADD_BUSINESS_EMAIL}?subject=${encodeURIComponent(`${business.name} — ${ui.reportIssue}`)}`}>
                {ui.reportIssue}
              </a>
            </p>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="business-detail-related" aria-labelledby="business-related">
            <h2 id="business-related">{ui.detailRelated}</h2>
            <div className="businesses-grid">
              {related.map((item) => (
                <BusinessCard key={item.id} ui={ui} language={language} business={item} onNavigate={onNavigate} />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}

// ── Add your business ────────────────────────────────────────
function AddBusiness({ ui }: { ui: BusinessesUiText }) {
  return (
    <section className="section-shell businesses-add" id="businesses-add" aria-labelledby="businesses-add-title">
      <div className="businesses-add-card">
        <p className="eyebrow">{ui.addEyebrow}</p>
        <h2 id="businesses-add-title">{ui.addTitle}</h2>
        <p>{ui.addText}</p>
        {ADD_BUSINESS_FORM_URL ? (
          <a className="button primary" href={ADD_BUSINESS_FORM_URL} target="_blank" rel="noopener noreferrer">
            {ui.addCta}
          </a>
        ) : (
          <p className="businesses-add-contact">
            {ui.addContactIntro} <a href={`mailto:${ADD_BUSINESS_EMAIL}`}>{ADD_BUSINESS_EMAIL}</a> ·{" "}
            <a href={`tel:${ADD_BUSINESS_PHONE.replace(/\s+/g, "")}`}>{ADD_BUSINESS_PHONE}</a>
          </p>
        )}
        <p className="businesses-add-note">{ui.addReviewNote}</p>
      </div>
    </section>
  );
}

// ── Empty state ──────────────────────────────────────────────
function EmptyState({
  message,
  actionLabel,
  onAction,
}: {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="businesses-empty">
      <span className="businesses-empty-icon" aria-hidden="true">
        🏡
      </span>
      <p>{message}</p>
      {actionLabel && onAction && (
        <button type="button" className="button ghost" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
