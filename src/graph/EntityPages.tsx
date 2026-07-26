import type { MouseEvent, SyntheticEvent } from "react";
import type { LanguageCode, PlaceId } from "../locales/types";
import { buildPlacePath, buildRoutePath } from "../routes";
import { imageProps } from "../images";
import { entityHeroPath } from "../seo";
import { guidesUiByLanguage } from "../guidesUi";
import { placeExperienceLinks } from "../placeLinks";
import {
  derivedLinks,
  entityById,
  entityBySlug,
  entityLongText,
  entityName,
  entityPoint,
  entitySameAs,
  entityShortText,
  placePageEntities,
  relationsOf,
  straightLineKmBetween,
} from "./index";
import type { Entity } from "./schema";

// ─────────────────────────────────────────────────────────────
// Entity pages, rendered in the site's existing guide visual system
// (guides-hero → guide-body → guide-facts/guide-section/guide-places). No new
// visual language: the same hero, typography, widths, cards and spacing as the
// guides. Every paragraph is transcluded from verified content; the "nearby"
// cards are the rendering of typed edges. No dead ends — every page links back to
// the Справочник, to its region and to a next place.
// ─────────────────────────────────────────────────────────────

const fallbackImage = "/assets/aglen-hero-river-canyon.webp";
function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  if (image.src.endsWith(fallbackImage)) return;
  image.src = fallbackImage;
}

// Chrome labels. The knowledge tier is bg + en (Constitution rule 43); other
// languages fall back to en, exactly as the region prose already does.
const L = {
  knowledgeEyebrow: { bg: "Знание", en: "Knowledge" },
  knowledgeTitle: { bg: "Ъглен и Луковитският карст", en: "Aglen & the Lukovit Karst" },
  knowledgeSub: {
    bg: "Реалните места около селото — селото, реката, скалите и района — всяко със своя страница.",
    en: "The real places around the village — the village, the river, the rocks and the region — each with its own page.",
  },
  allPlaces: { bg: "Виж всички места", en: "See all places" },
  factRegion: { bg: "В района на", en: "Within" },
  factFromAglen: { bg: "От Ъглен", en: "From Aglen" },
  straightLine: { bg: "км по права линия", en: "km in a straight line" },
  whereTitle: { bg: "Къде се намира", en: "Where it is" },
  mapCta: { bg: "Виж на картата", en: "View on the map" },
  straightNote: {
    bg: "Разстоянието е по въздушна линия, изчислено от публикуваните координати. По път е по-голямо.",
    en: "The distance is straight-line, computed from the published coordinates. By road it is greater.",
  },
  meaningTitle: { bg: "История и памет", en: "History & meaning" },
  relatedTitle: { bg: "Наблизо и свързани места", en: "Nearby & related places" },
  sourcesTitle: { bg: "Източници", en: "Sources" },
  sourcesNote: {
    bg: "Външни записи, с които това място е свързано.",
    en: "External records this place is linked to.",
  },
  regionCta: { bg: "Обратно към района", en: "Back to the region" },
  nextPlace: { bg: "Следващо място", en: "Next place" },
  arTitle: { bg: "Налична AR мисия", en: "AR mission available" },
  arCta: { bg: "Започни мисията", en: "Start the mission" },
};

function t(key: keyof typeof L, lang: LanguageCode): string {
  const entry = L[key] as Record<string, string>;
  return entry[lang] ?? entry.en;
}

function onLink(href: string, onNavigate: (path: string) => void) {
  return (event: MouseEvent) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(href);
  };
}

function hostLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** A place card in the site's guide-place style, linking to an entity page. */
function EntityCard({ entity, language, onNavigate, tag }: { entity: Entity; language: LanguageCode; onNavigate: (path: string) => void; tag?: string }) {
  const href = entity.page?.path === "/karst/" ? buildRoutePath(language, "karst") : buildPlacePath(language, entity.slug);
  return (
    <article className="guide-place">
      <a className="entity-card-link" href={href} onClick={onLink(href, onNavigate)}>
        <img {...imageProps(entityHeroPath(language, entity), { variant: "card" })} alt={entityName(entity, language)} loading="lazy" decoding="async" onError={handleImageError} />
        <div className="guide-place-body">
          {tag && <p className="guide-place-tag">{tag}</p>}
          <h3>{entityName(entity, language)}</h3>
          <p>{entityShortText(entity, language)}</p>
        </div>
      </a>
    </article>
  );
}

/** The /place/ index and every /place/<slug>/ detail page. */
export function PlacePage({ language, placeSlug, onNavigate }: { language: LanguageCode; placeSlug?: string; onNavigate: (path: string) => void }) {
  const entity = placeSlug ? entityBySlug(placeSlug) : undefined;
  if (!entity || entity.page?.status !== "published") {
    return <PlaceIndex language={language} onNavigate={onNavigate} />;
  }
  return <EntityDetail entity={entity} language={language} onNavigate={onNavigate} />;
}

function EntityDetail({ entity, language, onNavigate }: { entity: Entity; language: LanguageCode; onNavigate: (path: string) => void }) {
  const gui = guidesUiByLanguage[language];
  const hubPath = buildRoutePath(language, "guides");
  const parent = entity.parent ? entityById(entity.parent) : undefined;
  const aglen = entityById("aglen");
  const short = entityShortText(entity, language);
  const long = entityLongText(entity, language);
  const point = entityPoint(entity);
  const kmFromAglen = aglen && entity.id !== "aglen" ? straightLineKmBetween(aglen, entity) : undefined;
  const sameAs = entitySameAs(entity);

  // "History & meaning": node relations that have no page of their own render as
  // context here (a section of their parent, rule 15) — never as raw edges.
  const meaning = relationsOf(entity)
    .filter((relation) => relation.type === "birthPlaceOf" || relation.type === "subjectOf" || relation.type === "supersededBy")
    .map((relation) => entityById(relation.target))
    .filter((node): node is Entity => Boolean(node) && (!node!.page || node!.page.status !== "published"));

  // Related & nearby: the derived links that point at a real place page.
  const related = derivedLinks(entity, language)
    .map((link) => ({ link, target: entityById(link.entityId) }))
    .filter((entry) => entry.target?.page?.status === "published")
    .map((entry) => ({ link: entry.link, target: entry.target as Entity }));

  const placeId = entity.contentRef?.placeId as PlaceId | undefined;
  const hasMission = Boolean(placeId && (placeExperienceLinks[placeId] ?? []).some((link) => link.kind === "quest"));
  const missionHref = buildRoutePath(language, "arMissions");

  const parentHref = parent
    ? parent.page?.path === "/karst/"
      ? buildRoutePath(language, "karst")
      : parent.page?.status === "published"
        ? buildPlacePath(language, parent.slug)
        : buildRoutePath(language, "karst")
    : buildRoutePath(language, "karst");
  const next = related[0]?.target;

  const facts: { label: string; value: string }[] = [];
  if (parent) facts.push({ label: t("factRegion", language), value: entityName(parent, language) });
  if (kmFromAglen !== undefined) facts.push({ label: t("factFromAglen", language), value: `≈ ${Math.round(kmFromAglen)} ${t("straightLine", language)}` });

  return (
    <div className="guides-page guide-detail-page">
      <section className="guides-hero is-detail" aria-labelledby="entity-title">
        <img className="guides-hero-bg" {...imageProps(entityHeroPath(language, entity))} alt="" aria-hidden="true" fetchPriority="high" decoding="async" onError={handleImageError} />
        <div className="guides-hero-overlay" aria-hidden="true" />
        <div className="guides-hero-inner section-shell">
          <a className="guide-back" href={hubPath} onClick={onLink(hubPath, onNavigate)}>
            ← {gui.indexTitle}
          </a>
          {parent && <p className="eyebrow guides-hero-eyebrow">{entityName(parent, language)}</p>}
          <h1 id="entity-title">{entityName(entity, language)}</h1>
          <p className="guides-hero-sub">{short}</p>
        </div>
      </section>

      <div className="section-shell guide-body">
        {facts.length > 0 && (
          <aside className="guide-facts" aria-label={t("factRegion", language)}>
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

        {long && (
          <section className="guide-section">
            {long.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>
        )}

        {hasMission && (
          <p className="guide-notice entity-ar" role="note">
            <strong>{t("arTitle", language)}</strong> —{" "}
            <a className="entity-inline-link" href={missionHref} onClick={onLink(missionHref, onNavigate)}>
              {t("arCta", language)} →
            </a>
          </p>
        )}

        {point && (
          <section className="guide-section">
            <h2>{t("whereTitle", language)}</h2>
            <p>
              <a className="entity-inline-link" href={`https://www.google.com/maps/search/?api=1&query=${point.lat},${point.lon}`} target="_blank" rel="noopener noreferrer">
                {t("mapCta", language)} →
              </a>
            </p>
            {kmFromAglen !== undefined && <p className="guide-notice" role="note">{t("straightNote", language)}</p>}
          </section>
        )}

        {meaning.length > 0 && (
          <section className="guide-section">
            <h2>{t("meaningTitle", language)}</h2>
            {meaning.map((node) => (
              <p key={node.id}>
                <strong>{entityName(node, language)}.</strong> {entityShortText(node, language)}
              </p>
            ))}
          </section>
        )}

        {related.length > 0 && (
          <section className="guide-places" aria-labelledby="entity-related-title">
            <h2 id="entity-related-title">{t("relatedTitle", language)}</h2>
            <div className="guide-places-grid">
              {related.map(({ link, target }) => {
                const tag = link.label.includes(" — ") ? link.label.split(" — ").slice(1).join(" — ") : undefined;
                return <EntityCard key={target.id} entity={target} language={language} onNavigate={onNavigate} tag={tag} />;
              })}
            </div>
          </section>
        )}

        {sameAs.length > 0 && (
          <section className="guide-section entity-sources" aria-labelledby="entity-sources-title">
            <h2 id="entity-sources-title">{t("sourcesTitle", language)}</h2>
            <p className="guide-notice" role="note">{t("sourcesNote", language)}</p>
            <ul className="entity-sources-list">
              {sameAs.map((url) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noopener noreferrer nofollow">
                    {hostLabel(url)}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="guide-ctas">
          <a className="button primary" href={hubPath} onClick={onLink(hubPath, onNavigate)}>
            {gui.indexTitle}
          </a>
          <a className="button ghost" href={parentHref} onClick={onLink(parentHref, onNavigate)}>
            {parent ? entityName(parent, language) : t("regionCta", language)}
          </a>
          {next && next.id !== parent?.id && (
            <a className="button ghost" href={next.page!.path === "/karst/" ? buildRoutePath(language, "karst") : buildPlacePath(language, next.slug)} onClick={onLink(next.page!.path === "/karst/" ? buildRoutePath(language, "karst") : buildPlacePath(language, next.slug), onNavigate)}>
              {t("nextPlace", language)}: {entityName(next, language)}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/** Cards for the published /place/ entities, ordered village → region → nature. */
function publishedPlaceCards(language: LanguageCode, onNavigate: (path: string) => void) {
  return placePageEntities()
    .filter((entity) => entity.page!.path.startsWith("/place/"))
    .map((entity) => <EntityCard key={entity.id} entity={entity} language={language} onNavigate={onNavigate} />);
}

/** The /place/ index — every published entity as a card, in the guide style. */
export function PlaceIndex({ language, onNavigate }: { language: LanguageCode; onNavigate: (path: string) => void }) {
  const gui = guidesUiByLanguage[language];
  const hubPath = buildRoutePath(language, "guides");
  return (
    <div className="guides-page">
      <section className="guides-hero" aria-labelledby="places-title">
        <img className="guides-hero-bg" {...imageProps("/assets/aglen-aerial-river.png")} alt="" aria-hidden="true" fetchPriority="high" decoding="async" onError={handleImageError} />
        <div className="guides-hero-overlay" aria-hidden="true" />
        <div className="guides-hero-inner section-shell">
          <a className="guide-back" href={hubPath} onClick={onLink(hubPath, onNavigate)}>
            ← {gui.indexTitle}
          </a>
          <p className="eyebrow guides-hero-eyebrow">{t("knowledgeEyebrow", language)}</p>
          <h1 id="places-title">{t("knowledgeTitle", language)}</h1>
          <p className="guides-hero-sub">{t("knowledgeSub", language)}</p>
        </div>
      </section>
      <section className="section-shell guides-list" aria-labelledby="places-title">
        <div className="guide-places-grid">{publishedPlaceCards(language, onNavigate)}</div>
      </section>
    </div>
  );
}

/** /karst/ — a readable regional overview, then the places within it. */
export function KarstPage({ language, onNavigate }: { language: LanguageCode; onNavigate: (path: string) => void }) {
  const karst = entityById("karst-lukovit");
  if (!karst) return <PlaceIndex language={language} onNavigate={onNavigate} />;
  const gui = guidesUiByLanguage[language];
  const hubPath = buildRoutePath(language, "guides");
  const long = entityLongText(karst, language);
  // Places grouped by their containment subtree keeps the overview meaningful.
  const cards = placePageEntities().filter((entity) => entity.page!.path.startsWith("/place/"));

  return (
    <div className="guides-page guide-detail-page">
      <section className="guides-hero is-detail" aria-labelledby="karst-title">
        <img className="guides-hero-bg" {...imageProps("/assets/aglen-hero-river-canyon.png")} alt="" aria-hidden="true" fetchPriority="high" decoding="async" onError={handleImageError} />
        <div className="guides-hero-overlay" aria-hidden="true" />
        <div className="guides-hero-inner section-shell">
          <a className="guide-back" href={hubPath} onClick={onLink(hubPath, onNavigate)}>
            ← {gui.indexTitle}
          </a>
          <p className="eyebrow guides-hero-eyebrow">{t("knowledgeEyebrow", language)}</p>
          <h1 id="karst-title">{entityName(karst, language)}</h1>
          <p className="guides-hero-sub">{entityShortText(karst, language)}</p>
        </div>
      </section>
      <div className="section-shell guide-body">
        {long && (
          <section className="guide-section">
            {long.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>
        )}
        <section className="guide-places" aria-labelledby="karst-places-title">
          <h2 id="karst-places-title">{t("relatedTitle", language)}</h2>
          <div className="guide-places-grid">
            {cards.map((entity) => (
              <EntityCard key={entity.id} entity={entity} language={language} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
