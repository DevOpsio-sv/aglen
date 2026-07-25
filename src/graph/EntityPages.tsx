import type { MouseEvent } from "react";
import type { LanguageCode } from "../locales/types";
import { buildPlacePath, buildRoutePath } from "../routes";
import { imageProps } from "../images";
import { entityHeroPath } from "../seo";
import { placeExperienceLinks } from "../placeLinks";
import type { PlaceId } from "../locales/types";
import {
  derivedLinks,
  entityById,
  entityBySlug,
  entityLongText,
  entityName,
  entitySameAs,
  entityShortText,
  placePageEntities,
} from "./index";
import type { Entity } from "./schema";

// ─────────────────────────────────────────────────────────────
// Entity pages (M3) — the rendered surface of the knowledge graph.
//
// /karst/ is the knowledge-subject root; /place/<slug>/ is one entity. Every
// paragraph is transcluded from existing verified content (the graph is the
// source of truth); the "Related" grid is the rendering of typed edges, not a
// hand-authored link list (Constitution rules 19–20). A place that carries an
// Unlocking Bulgaria mission shows the contextual affordance ADR-013 requires:
// place → available experience → the external product, never a mini-site.
// ─────────────────────────────────────────────────────────────

const LABELS = {
  places: { bg: "Места и природа", en: "Places & nature" },
  placesLede: {
    bg: "Реалните места в Луковитския карст около Ъглен — всяко като отделна единица със своя страница.",
    en: "The real places of the Lukovit Karst around Aglen — each a first-class entity with its own page.",
  },
  related: { bg: "Свързани места", en: "Related places" },
  sources: { bg: "Външни източници", en: "External sources" },
  arMission: { bg: "Налична AR мисия", en: "AR mission available" },
  startMission: { bg: "Започни мисията", en: "Start the mission" },
  backToKarst: { bg: "Към Луковитския карст", en: "To the Lukovit Karst" },
};

function label(key: keyof typeof LABELS, lang: LanguageCode): string {
  const entry = LABELS[key] as Record<string, string>;
  return entry[lang] ?? entry.en;
}

function hostLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function internalHandler(href: string, onNavigate: (path: string) => void) {
  return (event: MouseEvent) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(href);
  };
}

function RelatedGrid({ entity, language, onNavigate }: { entity: Entity; language: LanguageCode; onNavigate: (path: string) => void }) {
  const links = derivedLinks(entity, language);
  if (links.length === 0) return null;
  return (
    <div className="content-hub">
      <div className="section-heading">
        <h2>{label("related", language)}</h2>
      </div>
      <div className="hub-grid">
        {links.map((link) => {
          const href = `/${language}${link.path}`;
          return (
            <a key={link.entityId} className="hub-card" href={href} onClick={internalHandler(href, onNavigate)}>
              <span>{link.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

/** The /place/ index and every /place/<slug>/ detail page. */
export function PlacePage({
  language,
  placeSlug,
  onNavigate,
}: {
  language: LanguageCode;
  placeSlug?: string;
  onNavigate: (path: string) => void;
}) {
  const entity = placeSlug ? entityBySlug(placeSlug) : undefined;

  // Unknown or unpublished slug → the index, so a stale link never dead-ends.
  if (!entity || entity.page?.status !== "published") {
    return <PlaceIndex language={language} onNavigate={onNavigate} />;
  }

  const parent = entity.parent ? entityById(entity.parent) : undefined;
  const karst = entityById("karst-lukovit");
  const name = entityName(entity, language);
  const short = entityShortText(entity, language);
  const long = entityLongText(entity, language);
  const sameAs = entitySameAs(entity);
  const heroPath = entityHeroPath(language, entity);
  const placeId = entity.contentRef?.placeId as PlaceId | undefined;
  const hasMission = Boolean(placeId && (placeExperienceLinks[placeId] ?? []).some((link) => link.kind === "quest"));
  const missionHref = buildRoutePath(language, "arMissions");
  const karstHref = buildRoutePath(language, "karst");

  return (
    <section id="place" className="content-hub section-shell">
      <div className="section-heading reveal">
        <p className="eyebrow">{parent ? entityName(parent, language) : karst ? entityName(karst, language) : ""}</p>
        <h1>{name}</h1>
        <p>{short}</p>
      </div>

      <img
        className="place-hero"
        {...imageProps(heroPath, { sizes: "(max-width: 900px) 92vw, 60vw" })}
        alt={name}
        loading="eager"
        decoding="async"
      />

      {long && <p className="place-long">{long}</p>}

      {hasMission && (
        <div className="place-ar reveal">
          <span>{label("arMission", language)}</span>
          <a className="button primary" href={missionHref} onClick={internalHandler(missionHref, onNavigate)}>
            {label("startMission", language)}
          </a>
        </div>
      )}

      <RelatedGrid entity={entity} language={language} onNavigate={onNavigate} />

      {sameAs.length > 0 && (
        <aside className="place-sources" aria-label={label("sources", language)}>
          <div className="section-heading">
            <h2>{label("sources", language)}</h2>
          </div>
          <ul>
            {sameAs.map((url) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer nofollow">
                  {hostLabel(url)}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <a href={karstHref} onClick={internalHandler(karstHref, onNavigate)}>
        {karst ? entityName(karst, language) : label("backToKarst", language)}
      </a>
    </section>
  );
}

function placeCards(language: LanguageCode, onNavigate: (path: string) => void) {
  return placePageEntities()
    .filter((entity) => entity.page!.path.startsWith("/place/"))
    .map((entity) => {
      const href = buildPlacePath(language, entity.slug);
      return (
        <a key={entity.id} className="hub-card" href={href} onClick={internalHandler(href, onNavigate)}>
          <strong>{entityName(entity, language)}</strong>
          <span>{entityShortText(entity, language)}</span>
        </a>
      );
    });
}

/** The /place/ index — every published entity as a card. */
export function PlaceIndex({ language, onNavigate }: { language: LanguageCode; onNavigate: (path: string) => void }) {
  return (
    <section id="place" className="content-hub section-shell">
      <div className="section-heading reveal">
        <p className="eyebrow">{label("places", language)}</p>
        <h1>{label("places", language)}</h1>
        <p>{label("placesLede", language)}</p>
      </div>
      <div className="hub-grid">{placeCards(language, onNavigate)}</div>
    </section>
  );
}

/** /karst/ — the knowledge-subject root: what the landscape is, then its places. */
export function KarstPage({ language, onNavigate }: { language: LanguageCode; onNavigate: (path: string) => void }) {
  const karst = entityById("karst-lukovit");
  if (!karst) return <PlaceIndex language={language} onNavigate={onNavigate} />;
  return (
    <section id="karst" className="content-hub section-shell">
      <div className="section-heading reveal">
        <p className="eyebrow">{label("places", language)}</p>
        <h1>{entityName(karst, language)}</h1>
        <p>{entityShortText(karst, language)}</p>
      </div>
      <div className="hub-grid">{placeCards(language, onNavigate)}</div>
    </section>
  );
}
