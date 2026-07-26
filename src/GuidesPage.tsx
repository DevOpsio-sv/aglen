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
import { buildBusinessPath, buildGuidePath, buildPlacePath, buildRoutePath } from "./routes";
import { imageProps } from "./images";
import { distanceFromAglenKm, regionName, regionNote, regionPlaceById } from "./region";
import { entityById, entityForPlaceId, entityForRegionId, entityName, entityShortText } from "./graph";
import { entityHeroPath } from "./seo";
import type { Entity } from "./graph/schema";

const fallbackImage = "/assets/aglen-hero-river-canyon.webp";

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
          {...imageProps("/assets/aglen-aerial-river.png")}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
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

      <KnowledgeGateway language={language} onNavigate={onNavigate} />

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

// The gateway from the Справочник into the entity layer — the one visible entry
// to the /place/<slug>/ and /karst/ pages. Not a second hub: it lives inside the
// existing guide index and uses its card style.
const KNOWLEDGE = {
  title: { bg: "Знание за Ъглен и района", en: "Knowledge: Aglen and its region" },
  sub: {
    bg: "Отделни страници за селото, реката, скалите, пещерите и Луковитския карст — реалните места зад ръководствата.",
    en: "Dedicated pages for the village, the river, the rocks, the caves and the Lukovit Karst — the real places behind the guides.",
  },
  all: { bg: "Виж всички места", en: "See all places" },
};
function kt(key: keyof typeof KNOWLEDGE, lang: LanguageCode): string {
  const entry = KNOWLEDGE[key] as Record<string, string>;
  return entry[lang] ?? entry.en;
}

function KnowledgeGateway({ language, onNavigate }: { language: LanguageCode; onNavigate: (path: string) => void }) {
  const featuredIds = ["karst-lukovit", "aglen", "prohodna", "karlukovo", "vit-river", "dupkata"];
  const featured = featuredIds.map((id) => entityById(id)).filter((entity): entity is Entity => Boolean(entity) && entity!.page?.status === "published");
  if (featured.length === 0) return null;
  const allPath = buildRoutePath(language, "place"); // /<lang>/place/
  const hrefFor = (entity: Entity) => (entity.page!.path === "/karst/" ? buildRoutePath(language, "karst") : buildPlacePath(language, entity.slug));

  return (
    <section className="section-shell guides-list" aria-labelledby="knowledge-title">
      <div className="section-heading">
        <p className="eyebrow">{kt("title", language).split(":")[0]}</p>
        <h2 id="knowledge-title">{kt("title", language)}</h2>
        <p>{kt("sub", language)}</p>
      </div>
      <div className="guide-places-grid">
        {featured.map((entity) => {
          const href = hrefFor(entity);
          return (
            <article className="guide-place" key={entity.id}>
              <a className="entity-card-link" href={href} onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); onNavigate(href); }}>
                <img {...imageProps(entityHeroPath(language, entity), { variant: "card" })} alt={entityName(entity, language)} loading="lazy" decoding="async" onError={handleImageError} />
                <div className="guide-place-body">
                  <h3>{entityName(entity, language)}</h3>
                  <p>{entityShortText(entity, language)}</p>
                </div>
              </a>
            </article>
          );
        })}
      </div>
      <div className="guide-ctas">
        <a className="button ghost" href={allPath} onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); onNavigate(allPath); }}>
          {kt("all", language)} →
        </a>
      </div>
    </section>
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
            {...imageProps(guide.heroImage, { variant: "card" })}
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
          {...imageProps(guide.heroImage)}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
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
              {places.map((place) => {
                // Link the card to its canonical /place/<slug>/ entity page (M3)
                // where one exists; the guide keeps the prose, the entity owns it.
                const entity = entityForPlaceId(place.id);
                const inner = (
                  <>
                    <img {...imageProps(place.image, { variant: "card" })} alt={place.imageAlt} loading="lazy" decoding="async" onError={handleImageError} />
                    <div className="guide-place-body">
                      <p className="guide-place-tag">{place.tag}</p>
                      <h3>{place.title}</h3>
                      <p>{place.description}</p>
                    </div>
                  </>
                );
                if (!entity) return <article className="guide-place" key={place.id}>{inner}</article>;
                const href = buildPlacePath(language, entity.slug);
                return (
                  <article className="guide-place" key={place.id}>
                    <a className="entity-card-link" href={href} onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); onNavigate(href); }}>
                      {inner}
                    </a>
                  </article>
                );
              })}
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

        {(guide.regionPlaceIds ?? []).length > 0 && (
          <GuideRegionPlaces guide={guide} language={language} onNavigate={onNavigate} />
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

/**
 * The places in the wider region this guide covers, each linking to the page
 * that handles it and to the external record it comes from. This is the visible
 * counterpart of the `mentions` links in the guide's JSON-LD — the same list,
 * from the same data, so markup and page agree.
 */
function GuideRegionPlaces({
  guide,
  language,
  onNavigate,
}: {
  guide: TourismGuide;
  language: LanguageCode;
  onNavigate: (path: string) => void;
}) {
  const ui = guidesUiByLanguage[language];
  const places = (guide.regionPlaceIds ?? [])
    .map((id) => regionPlaceById.get(id))
    .filter((place): place is NonNullable<typeof place> => Boolean(place))
    .sort((a, b) => (distanceFromAglenKm(a) ?? Infinity) - (distanceFromAglenKm(b) ?? Infinity));

  if (places.length === 0) return null;

  return (
    <section className="guide-places" aria-labelledby="guide-region-title">
      <h2 id="guide-region-title">{ui.nearbyTitle}</h2>
      <p className="guide-notice" role="note">
        {ui.nearbyNote}
      </p>
      <ul className="trust-nearby">
        {places.map((place) => {
          const km = distanceFromAglenKm(place);
          // Prefer the canonical /place/<slug>/ entity page (M3); fall back to the
          // guide/landing only while an entity page does not exist.
          const entity = entityForRegionId(place.id);
          const href = entity
            ? buildPlacePath(language, entity.slug)
            : place.guideSlug
              ? buildGuidePath(language, place.guideSlug)
              : place.routeId
                ? buildRoutePath(language, place.routeId as Parameters<typeof buildRoutePath>[1])
                : undefined;
          return (
            <li key={place.id}>
              <div>
                <strong>
                  {href && place.guideSlug !== guide.slug ? (
                    <a
                      href={href}
                      onClick={(event) => {
                        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                        event.preventDefault();
                        onNavigate(href);
                      }}
                    >
                      {regionName(place, language)}
                    </a>
                  ) : (
                    regionName(place, language)
                  )}
                </strong>
                {km !== undefined && <span className="trust-nearby-km">≈ {km} km</span>}
              </div>
              <p>{regionNote(place, language)}</p>
            </li>
          );
        })}
      </ul>
    </section>
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
