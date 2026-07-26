import type { MouseEvent, SyntheticEvent } from "react";
import type { LanguageCode, PlaceId } from "../locales/types";
import { buildAspectPath, buildEntityPath, buildRoutePath } from "../routes";
import { imageProps } from "../images";
import { entityHeroPath } from "../seo";
import { guidesUiByLanguage } from "../guidesUi";
import { placeExperienceLinks } from "../placeLinks";
import { contentByLanguage } from "../content";
import {
  baseEntityOf,
  derivedLinks,
  entityById,
  entityBySlug,
  entityLongText,
  entityName,
  entityPoint,
  entitySameAs,
  entityShortText,
  namespaceEntities,
  placePageEntities,
  regionRootOf,
  relationsOf,
  straightLineKmBetween,
} from "./index";
import { REGIONS } from "./registry";
import { aspectPagesFor, claimsForAspect } from "./ledger";
import type { ClaimAspect } from "./claims";
import { Disputes, KnownClaims, ProvenanceFooter, TrustLine, UncertainClaims } from "./Provenance";
import { aspectLede, aspectTitle } from "./namespaces";
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
  // "От Ъглен" is composed from the region's base settlement rather than written
  // out, so Region 2's pages say "From <its own base>" with no edit here.
  factFrom: { bg: "От", en: "From" },
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
  // Aspect pages (M4): an aspect that has earned three or more claims gets its
  // own page and is announced here, so the entity page stays the front door.
  aspectSectionTitle: { bg: "Продължи по-навътре", en: "Go further in" },
  backToEntity: { bg: "Обратно към", en: "Back to" },
  periodsTitle: { bg: "Периодите поотделно", en: "The periods, one by one" },
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

/**
 * The URL of a published entity, whatever namespace it lives in. The graph
 * carries the language-agnostic path, so a place, a legend, a person and a
 * historical period are all addressed the same way (Constitution rule 1).
 */
export function entityHref(language: LanguageCode, entity: Entity): string {
  // A node-only entity has no address of its own; it renders as a section of its
  // parent (rule 15), so the fallback is the hub rather than any one region.
  return entity.page ? buildEntityPath(language, entity.page.path) : buildRoutePath(language, "guides");
}

/** A place card in the site's guide-place style, linking to an entity page. */
export function EntityCard({ entity, language, onNavigate, tag }: { entity: Entity; language: LanguageCode; onNavigate: (path: string) => void; tag?: string }) {
  const href = entityHref(language, entity);
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

/** The /place/ index, every /place/<slug>/ detail page and its aspect pages. */
export function PlacePage({
  language,
  placeSlug,
  aspect,
  onNavigate,
}: {
  language: LanguageCode;
  placeSlug?: string;
  aspect?: ClaimAspect;
  onNavigate: (path: string) => void;
}) {
  const entity = placeSlug ? entityBySlug(placeSlug) : undefined;
  if (!entity || entity.page?.status !== "published") {
    return <PlaceIndex language={language} onNavigate={onNavigate} />;
  }
  if (aspect) {
    const earned = aspectPagesFor(entity.id).some((page) => page.aspect === aspect);
    if (!earned) return <EntityDetail entity={entity} language={language} onNavigate={onNavigate} />;
    return <EntityAspectPage entity={entity} aspect={aspect} language={language} onNavigate={onNavigate} />;
  }
  return <EntityDetail entity={entity} language={language} onNavigate={onNavigate} />;
}

export function EntityDetail({
  entity,
  language,
  onNavigate,
  back,
}: {
  entity: Entity;
  language: LanguageCode;
  onNavigate: (path: string) => void;
  /** Where the "←" link goes. Defaults to the Справочник; a namespace page passes its index. */
  back?: { href: string; label: string };
}) {
  const gui = guidesUiByLanguage[language];
  const hubPath = back?.href ?? buildRoutePath(language, "guides");
  const hubLabel = back?.label ?? gui.indexTitle;
  const parent = entity.parent ? entityById(entity.parent) : undefined;
  // The settlement this region measures from — Aglen here, another region's base
  // in another partition. Asked of the graph rather than named, so the same
  // component serves Region 2 unchanged (M5, ADR-016).
  const base = baseEntityOf(entity);
  const short = entityShortText(entity, language);
  const long = entityLongText(entity, language);
  const point = entityPoint(entity);
  const kmFromBase = base && entity.id !== base.id ? straightLineKmBetween(base, entity) : undefined;
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

  // Up: the containment parent, or — for a top-level entity — its own region root.
  const regionRoot = regionRootOf(entity);
  const parentHref =
    parent && parent.page?.status === "published"
      ? entityHref(language, parent)
      : regionRoot && regionRoot.page?.status === "published"
        ? entityHref(language, regionRoot)
        : buildRoutePath(language, "guides");
  const next = related[0]?.target;
  // Aspects that have earned a page of their own (M4). Announced from the entity
  // page so the entity stays the front door and nothing is reachable only by URL.
  const aspects = aspectPagesFor(entity.id);

  const facts: { label: string; value: string }[] = [];
  if (parent) facts.push({ label: t("factRegion", language), value: entityName(parent, language) });
  if (base && kmFromBase !== undefined) {
    facts.push({
      label: `${t("factFrom", language)} ${entityName(base, language)}`,
      value: `≈ ${Math.round(kmFromBase)} ${t("straightLine", language)}`,
    });
  }

  return (
    <div className="guides-page guide-detail-page">
      <section className="guides-hero is-detail" aria-labelledby="entity-title">
        <img className="guides-hero-bg" {...imageProps(entityHeroPath(language, entity))} alt="" aria-hidden="true" fetchPriority="high" decoding="async" onError={handleImageError} />
        <div className="guides-hero-overlay" aria-hidden="true" />
        <div className="guides-hero-inner section-shell">
          <a className="guide-back" href={hubPath} onClick={onLink(hubPath, onNavigate)}>
            ← {hubLabel}
          </a>
          {parent && <p className="eyebrow guides-hero-eyebrow">{entityName(parent, language)}</p>}
          <h1 id="entity-title">{entityName(entity, language)}</h1>
          <p className="guides-hero-sub">{short}</p>
        </div>
      </section>

      <div className="section-shell guide-body">
        {/* The trust line (M4B): a few words and a date, before anything else on
            the page, so a reader knows how far to trust what follows without
            having to go to the foot of the page for it. */}
        <TrustLine entityId={entity.id} language={language} />

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
            {kmFromBase !== undefined && <p className="guide-notice" role="note">{t("straightNote", language)}</p>}
          </section>
        )}

        {/* The claim layer (M4). Firm ground first, then the open questions, then
            what is not known — none of the three is allowed to hide the others. */}
        <KnownClaims entityId={entity.id} language={language} onNavigate={onNavigate} />
        <Disputes entityId={entity.id} language={language} onNavigate={onNavigate} />
        <UncertainClaims entityId={entity.id} language={language} onNavigate={onNavigate} />

        {aspects.length > 0 && (
          <section className="guide-section aspect-links" aria-labelledby="entity-aspects-title">
            <h2 id="entity-aspects-title">{t("aspectSectionTitle", language)}</h2>
            <ul className="aspect-link-list">
              {aspects.map(({ aspect }) => {
                const href = buildAspectPath(language, entity.slug, aspect);
                return (
                  <li key={aspect}>
                    <a className="entity-inline-link" href={href} onClick={onLink(href, onNavigate)}>
                      {aspectTitle(aspect, language)} →
                    </a>
                    <span> {aspectLede(aspect, language)}</span>
                  </li>
                );
              })}
            </ul>
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

        {/* Sources, last reviewed, and the external records this is linked to —
            one block instead of two, because a reader asking "how do you know
            this?" is asking one question. */}
        <ProvenanceFooter entityId={entity.id} language={language} onNavigate={onNavigate} externalRecords={sameAs} />

        <div className="guide-ctas">
          <a className="button primary" href={hubPath} onClick={onLink(hubPath, onNavigate)}>
            {hubLabel}
          </a>
          <a className="button ghost" href={parentHref} onClick={onLink(parentHref, onNavigate)}>
            {parent ? entityName(parent, language) : t("regionCta", language)}
          </a>
          {next && next.id !== parent?.id && (
            <a className="button ghost" href={entityHref(language, next)} onClick={onLink(entityHref(language, next), onNavigate)}>
              {t("nextPlace", language)}: {entityName(next, language)}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * A depth-3 aspect page: `/place/aglen/history/`, `/place/aglen/name/`.
 *
 * An aspect earns a page only once the ledger holds three claims about it, so
 * this component never has to decide whether there is enough to say — the graph
 * decided (`CONTENT_HIERARCHY.md` §3, Constitution rules 15 and 26).
 *
 * The village history page is where the four chapters in `content.ts` finally
 * get a permanent address. They are TRANSCLUDED, not copied: the modal on the
 * home page and this page render the same strings from the same locale record,
 * so a correction to either is a correction to both (rule 2, one source of truth).
 */
export function EntityAspectPage({
  entity,
  aspect,
  language,
  onNavigate,
}: {
  entity: Entity;
  aspect: ClaimAspect;
  language: LanguageCode;
  onNavigate: (path: string) => void;
}) {
  const copy = contentByLanguage[language];
  const entityPath = entityHref(language, entity);
  const title = aspectTitle(aspect, language);
  const lede = aspectLede(aspect, language);
  // The village timeline in `content.ts` is about Aglen; the chapters with
  // sections are the long-form history and belong on the village history page.
  const chapters = aspect === "history" && entity.id === "aglen" ? copy.timeline.filter((item) => item.sections?.length) : [];
  const periods = aspect === "history" ? namespaceEntities("/history/") : [];
  const claimCount = claimsForAspect(entity.id, aspect).length;

  return (
    <div className="guides-page guide-detail-page">
      <section className="guides-hero is-detail" aria-labelledby="aspect-title">
        <img className="guides-hero-bg" {...imageProps(entityHeroPath(language, entity))} alt="" aria-hidden="true" fetchPriority="high" decoding="async" onError={handleImageError} />
        <div className="guides-hero-overlay" aria-hidden="true" />
        <div className="guides-hero-inner section-shell">
          <a className="guide-back" href={entityPath} onClick={onLink(entityPath, onNavigate)}>
            ← {entityName(entity, language)}
          </a>
          <p className="eyebrow guides-hero-eyebrow">{entityName(entity, language)}</p>
          <h1 id="aspect-title">{title}</h1>
          <p className="guides-hero-sub">{lede}</p>
        </div>
      </section>

      <div className="section-shell guide-body">
        <KnownClaims entityId={entity.id} aspect={aspect} language={language} onNavigate={onNavigate} />
        <Disputes entityId={entity.id} aspect={aspect} language={language} onNavigate={onNavigate} />
        <UncertainClaims entityId={entity.id} aspect={aspect} language={language} onNavigate={onNavigate} />

        {chapters.map((chapter) => (
          <section className="guide-section timeline-chapter" key={chapter.title}>
            <h2>{chapter.title}</h2>
            {chapter.intro && <p className="timeline-article-intro">{chapter.intro}</p>}
            {(chapter.sections ?? []).map((section) => (
              <div key={section.heading}>
                <h3>{section.heading}</h3>
                {section.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ))}
          </section>
        ))}

        {periods.length > 0 && (
          <section className="guide-places" aria-labelledby="aspect-periods-title">
            <h2 id="aspect-periods-title">{t("periodsTitle", language)}</h2>
            <div className="guide-places-grid">
              {periods.map((period) => (
                <EntityCard key={period.id} entity={period} language={language} onNavigate={onNavigate} />
              ))}
            </div>
          </section>
        )}

        {claimCount > 0 && <ProvenanceFooter entityId={entity.id} language={language} onNavigate={onNavigate} />}

        <div className="guide-ctas">
          <a className="button primary" href={entityPath} onClick={onLink(entityPath, onNavigate)}>
            {t("backToEntity", language)} {entityName(entity, language)}
          </a>
          <a className="button ghost" href={buildRoutePath(language, "history")} onClick={onLink(buildRoutePath(language, "history"), onNavigate)}>
            {t("periodsTitle", language)}
          </a>
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

/**
 * A region root page — `/karst/` for the Lukovit karst: a readable regional
 * overview, then the places within it. Which region is a prop, not a constant
 * (M5, ADR-016): Region 2's root renders through this same component the day its
 * row is added to the registry.
 */
export function RegionRootPage({
  language,
  regionRouteId,
  onNavigate,
}: {
  language: LanguageCode;
  /** The region root route being rendered. Defaults to the first declared region. */
  regionRouteId?: string;
  onNavigate: (path: string) => void;
}) {
  const region = REGIONS.find((candidate) => candidate.rootRouteId === regionRouteId) ?? REGIONS[0];
  const root = region ? entityById(region.rootEntityId) : undefined;
  if (!root) return <PlaceIndex language={language} onNavigate={onNavigate} />;
  const karst = root;
  const gui = guidesUiByLanguage[language];
  const hubPath = buildRoutePath(language, "guides");
  const long = entityLongText(karst, language);
  // The places of THIS region, so a second region's root lists its own subtree.
  const cards = placePageEntities().filter(
    (entity) => entity.page!.path.startsWith("/place/") && regionRootOf(entity)?.id === karst.id,
  );

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
        <KnownClaims entityId={karst.id} language={language} />
        <UncertainClaims entityId={karst.id} language={language} />
        <section className="guide-places" aria-labelledby="karst-places-title">
          <h2 id="karst-places-title">{t("relatedTitle", language)}</h2>
          <div className="guide-places-grid">
            {cards.map((entity) => (
              <EntityCard key={entity.id} entity={entity} language={language} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
        <ProvenanceFooter entityId={karst.id} language={language} onNavigate={onNavigate} externalRecords={entitySameAs(karst)} />
      </div>
    </div>
  );
}
