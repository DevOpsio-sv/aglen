import { useMemo, type SyntheticEvent } from "react";
import type { LanguageCode } from "./locales/types";
import { contentByLanguage } from "./content";
import {
  findGuide,
  guidePlaces,
  guides,
  localizeGuide,
  readingMinutes,
  type GuideSection,
  type TourismGuide,
} from "./guides";
import { guidesUiByLanguage, type GuidesUiText } from "./guidesUi";
import { localizeText, publishedBusinesses } from "./localBusinesses";
import { buildBusinessPath, buildGuidePath, buildRoutePath } from "./routes";

const fallbackImage = "/assets/aglen-hero-river-canyon.png";

function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  if (image.src.endsWith(fallbackImage)) return;
  image.src = fallbackImage;
}

export default function GuidesPage({
  language,
  guideSlug,
  onNavigate,
}: {
  language: LanguageCode;
  guideSlug?: string;
  onNavigate: (path: string) => void;
}) {
  const ui = guidesUiByLanguage[language];
  const guide = guideSlug ? findGuide(guideSlug) : undefined;

  if (guideSlug && !guide) {
    // Unknown slug: show the index rather than a blank page.
    return <GuideIndex ui={ui} language={language} onNavigate={onNavigate} />;
  }

  return guide ? (
    <GuideDetail ui={ui} language={language} guide={guide} onNavigate={onNavigate} />
  ) : (
    <GuideIndex ui={ui} language={language} onNavigate={onNavigate} />
  );
}

// ── Index ────────────────────────────────────────────────────
function GuideIndex({
  ui,
  language,
  onNavigate,
}: {
  ui: GuidesUiText;
  language: LanguageCode;
  onNavigate: (path: string) => void;
}) {
  return (
    <div className="guides-page">
      <section className="guides-hero" aria-labelledby="guides-hero-title">
        <img
          className="guides-hero-bg"
          src="/assets/aglen-aerial-river.png"
          alt=""
          aria-hidden="true"
          decoding="async"
          onError={handleImageError}
        />
        <div className="guides-hero-overlay" aria-hidden="true" />
        <div className="guides-hero-inner section-shell">
          <p className="eyebrow guides-hero-eyebrow">{ui.indexEyebrow}</p>
          <h1 id="guides-hero-title">{ui.indexTitle}</h1>
          <p className="guides-hero-sub">{ui.indexSubtitle}</p>
        </div>
      </section>

      <section className="section-shell guides-list" aria-label={ui.indexTitle}>
        <div className="guides-grid">
          {guides.map((guide) => (
            <GuideCard key={guide.id} ui={ui} language={language} guide={guide} onNavigate={onNavigate} />
          ))}
        </div>
      </section>
    </div>
  );
}

function GuideCard({
  ui,
  language,
  guide,
  onNavigate,
}: {
  ui: GuidesUiText;
  language: LanguageCode;
  guide: TourismGuide;
  onNavigate: (path: string) => void;
}) {
  const href = buildGuidePath(language, guide.slug);
  const places = guidePlaces(guide, language);
  const minutes = readingMinutes(guide, language);
  const inPreparation = guide.status === "in-preparation";

  // Counts are derived from real content, so nothing is shown when there is none.
  const meta: string[] = [];
  if (places.length > 0) meta.push(ui.placesCount.replace("{n}", String(places.length)));
  if (guide.includeRouteStops) {
    meta.push(ui.stopsCount.replace("{n}", String(contentByLanguage[language].mapStops.length)));
  }
  if (minutes > 0) meta.push(ui.readingTime.replace("{n}", String(minutes)));

  return (
    <article className={`guide-card${inPreparation ? " is-preparing" : ""}`}>
      <a
        className="guide-card-link"
        href={href}
        onClick={(event) => {
          event.preventDefault();
          onNavigate(href);
        }}
      >
        <div className="guide-card-media">
          <img
            src={guide.heroImage}
            alt={localizeGuide(guide.heroImageAlt, language)}
            loading="lazy"
            decoding="async"
            onError={handleImageError}
          />
          {inPreparation && <span className="guide-card-flag">{ui.inPreparation}</span>}
        </div>
        <div className="guide-card-body">
          <h2>{localizeGuide(guide.title, language)}</h2>
          <p className="guide-card-summary">{localizeGuide(guide.summary, language)}</p>
          {meta.length > 0 && (
            <ul className="guide-card-meta">
              {meta.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          <span className="guide-card-cta">{places.length > 0 ? ui.ctaPlaces : ui.ctaExplore} →</span>
        </div>
      </a>
    </article>
  );
}

// ── Detail ───────────────────────────────────────────────────
function GuideDetail({
  ui,
  language,
  guide,
  onNavigate,
}: {
  ui: GuidesUiText;
  language: LanguageCode;
  guide: TourismGuide;
  onNavigate: (path: string) => void;
}) {
  const copy = contentByLanguage[language];
  const indexPath = buildRoutePath(language, "guides");
  const places = guidePlaces(guide, language);
  const minutes = readingMinutes(guide, language);
  const inPreparation = guide.status === "in-preparation";

  const listings = useMemo(() => {
    if (!guide.businessCategories) return [];
    return publishedBusinesses().filter((business) => guide.businessCategories!.includes(business.category));
  }, [guide]);

  const related = guide.relatedGuideIds
    .map((id) => guides.find((item) => item.id === id))
    .filter((item): item is TourismGuide => Boolean(item));

  const facts: { label: string; value: string }[] = [];
  if (guide.quickFacts?.duration) facts.push({ label: ui.factDuration, value: localizeGuide(guide.quickFacts.duration, language) });
  if (guide.quickFacts?.bestSeason) facts.push({ label: ui.factSeason, value: localizeGuide(guide.quickFacts.bestSeason, language) });
  if (guide.quickFacts?.childFriendly) facts.push({ label: ui.factChildren, value: localizeGuide(guide.quickFacts.childFriendly, language) });

  return (
    <div className="guides-page guide-detail-page">
      <section className="guides-hero is-detail" aria-labelledby="guide-title">
        <img
          className="guides-hero-bg"
          src={guide.heroImage}
          alt=""
          aria-hidden="true"
          decoding="async"
          onError={handleImageError}
        />
        <div className="guides-hero-overlay" aria-hidden="true" />
        <div className="guides-hero-inner section-shell">
          <a
            className="guide-back"
            href={indexPath}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(indexPath);
            }}
          >
            ← {ui.backToGuides}
          </a>
          <h1 id="guide-title">{localizeGuide(guide.title, language)}</h1>
          <p className="guides-hero-sub">{localizeGuide(guide.summary, language)}</p>
          <ul className="guide-hero-meta">
            {places.length > 0 && <li>{ui.placesCount.replace("{n}", String(places.length))}</li>}
            {guide.includeRouteStops && <li>{ui.stopsCount.replace("{n}", String(copy.mapStops.length))}</li>}
            {minutes > 0 && <li>{ui.readingTime.replace("{n}", String(minutes))}</li>}
          </ul>
        </div>
      </section>

      <div className="section-shell guide-body">
        {inPreparation && (
          <p className="guide-preparing" role="note">
            <strong>{ui.inPreparation}.</strong> {ui.inPreparationNote}
          </p>
        )}

        {facts.length > 0 && (
          <aside className="guide-facts" aria-label={ui.quickFacts}>
            <h2>{ui.quickFacts}</h2>
            <dl>
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        )}

        {(guide.sections ?? []).map((section, index) => (
          <GuideSectionBlock key={index} ui={ui} section={section} language={language} />
        ))}

        {places.length > 0 && (
          <section className="guide-places" aria-labelledby="guide-places-title">
            <h2 id="guide-places-title">{ui.placesTitle}</h2>
            <div className="guide-places-grid">
              {places.map((place) => (
                <article className="guide-place" key={place.id}>
                  <img src={place.image} alt={place.imageAlt} loading="lazy" decoding="async" onError={handleImageError} />
                  <div className="guide-place-body">
                    <p className="guide-place-tag">{place.tag}</p>
                    <h3>{place.title}</h3>
                    <p>{place.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {guide.includeRouteStops && (
          <section className="guide-route" aria-labelledby="guide-route-title">
            <h2 id="guide-route-title">{ui.routeTitle}</h2>
            <ol className="guide-route-list">
              {copy.mapStops.map((stop, index) => (
                <li key={stop.title}>
                  <span className="guide-route-num" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <strong>{stop.title}</strong>
                    <p>{stop.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {guide.businessCategories && (
          <section className="guide-businesses" aria-labelledby="guide-businesses-title">
            <h2 id="guide-businesses-title">{ui.businessesTitle}</h2>
            {listings.length > 0 ? (
              <ul className="guide-business-list">
                {listings.map((business) => {
                  const href = buildBusinessPath(language, business.slug);
                  return (
                    <li key={business.id}>
                      <a
                        href={href}
                        onClick={(event) => {
                          event.preventDefault();
                          onNavigate(href);
                        }}
                      >
                        <strong>{business.name}</strong>
                        <span>{localizeText(business.shortDescription, language)}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="guide-empty">{ui.businessesEmpty}</p>
            )}
          </section>
        )}

        <div className="guide-ctas">
          <a
            className="button primary"
            href={buildRoutePath(language, "localBusinesses")}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(buildRoutePath(language, "localBusinesses"));
            }}
          >
            {ui.ctaBusinesses}
          </a>
          <a
            className="button ghost"
            href={buildRoutePath(language, "events")}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(buildRoutePath(language, "events"));
            }}
          >
            {ui.ctaEvents}
          </a>
        </div>

        {related.length > 0 && (
          <section className="guide-related" aria-labelledby="guide-related-title">
            <h2 id="guide-related-title">{ui.relatedTitle}</h2>
            <div className="guides-grid">
              {related.map((item) => (
                <GuideCard key={item.id} ui={ui} language={language} guide={item} onNavigate={onNavigate} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function GuideSectionBlock({
  ui,
  section,
  language,
}: {
  ui: GuidesUiText;
  section: GuideSection;
  language: LanguageCode;
}) {
  return (
    <section className="guide-section">
      <h2>{localizeGuide(section.heading, language)}</h2>
      {section.body.map((paragraph, index) => (
        <p key={index}>{localizeGuide(paragraph, language)}</p>
      ))}
      {section.list && (
        <ul className="guide-checklist">
          {section.list.map((item, index) => (
            <li key={index}>{localizeGuide(item, language)}</li>
          ))}
        </ul>
      )}
      {section.notice && (
        <p className="guide-notice" role="note">
          <strong>{ui.noticeLabel}:</strong> {localizeGuide(section.notice, language)}
        </p>
      )}
    </section>
  );
}
