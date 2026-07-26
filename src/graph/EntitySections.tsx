import type { MouseEvent, SyntheticEvent } from "react";
import type { LanguageCode, LocalizedText } from "../locales/types";
import { buildAspectPath, buildRoutePath } from "../routes";
import { imageProps } from "../images";
import { entityHeroAlt, entityHeroPath } from "../seo";
import { findGuide, localizeGuide } from "../guides";
import {
  approximateDistance,
  editorialClaims,
  groupTitle,
  nameQuestion,
  narrateClaims,
  publicClaims,
  voiceForPath,
  type RelationVoice,
} from "./editorial";
import { aspectPagesFor, provenanceSummary } from "./ledger";
import { aspectTitle } from "./namespaces";
import { SourceEntry, trustSignalLabel } from "./Provenance";
import {
  baseEntityOf,
  derivedLinks,
  entityById,
  entityName,
  entityShortText,
  namespaceEntities,
  regionRootOf,
  straightLineKmBetween,
} from "./index";
import type { Entity } from "./schema";

// ─────────────────────────────────────────────────────────────
// The visitor-facing entity page (M5.1 repair).
//
// What was here before was one section per data structure: a block of "known"
// claims, a block of "unknown" claims, a dispute widget, a source ledger. Each
// was faithful to the graph and none of them was a page. A visitor arriving at
// Ъглен met a trust line of six grey chips, a facts box holding one fact, a
// heading called "Къде се намира" containing a single link, and eleven sentences
// about which registers this site had not consulted.
//
// These components are one section per thing a reader wants to know: what this
// place is, what is kept here, where its name comes from, who belongs to it, what
// is near it, and where to go next. The graph feeds every one of them — nothing
// here authors a fact — but the graph is no longer the page.
//
// Two rules hold throughout:
//
//   1. No component in this file reads `confidence`, `status`, `audience`, a
//      source id or a relation type. Prose comes from `editorial.ts`. This is
//      enforced by `scripts/entity-ui-test.mjs`, not by discipline.
//   2. A section that has nothing to say renders nothing — no heading over an
//      empty box, no card grid with one card (`CONTENT_HIERARCHY.md` §2.1).
//
// No new visual language: every class already exists in the guide system.
// ─────────────────────────────────────────────────────────────

const fallbackImage = "/assets/aglen-hero-river-canyon.webp";
function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  if (image.src.endsWith(fallbackImage)) return;
  image.src = fallbackImage;
}

export function onLink(href: string, onNavigate: (path: string) => void) {
  return (event: MouseEvent) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(href);
  };
}

const L = {
  storyTitle: { bg: "За мястото", en: "About this place" },
  nameTitle: { bg: "Откъде идва името", en: "Where the name comes from" },
  highlightsTitle: { bg: "Продължи навътре", en: "Go further in" },
  nearbyTitle: { bg: "Наблизо", en: "Nearby" },
  sourcesSummary: { bg: "Източници и редакционни бележки", en: "Sources and editorial notes" },
  sourcesIntro: {
    bg: "Всяко твърдение на тази страница почива на изброените по-долу източници. Тук са и бележките за това какво още не е проверено.",
    en: "Every statement on this page rests on the sources listed below. The notes on what is not yet checked are here too.",
  },
  editorialTitle: { bg: "Какво още не е проверено", en: "What is not yet checked" },
  reviewed: { bg: "Последен преглед", en: "Last reviewed" },
  distanceNote: {
    bg: "Разстоянията са по права линия, изчислени от публикуваните координати. По път са по-големи.",
    en: "Distances are straight-line, computed from published coordinates. By road they are longer.",
  },
  ctaTitle: { bg: "Продължи из Ъглен", en: "Keep exploring Aglen" },
  onTheMap: { bg: "Виж на картата", en: "Open the map" },
  // Highlight labels. Each names a real destination that already exists.
  hlRegion: { bg: "Скалите и пещерите наоколо", en: "The rocks and caves around" },
  hlHistory: { bg: "История и местна памет", en: "History and local memory" },
  hlPeople: { bg: "Хората", en: "The people" },
  hlStories: { bg: "Местните истории", en: "The local stories" },
  hlPlaces: { bg: "Всички места", en: "Every place" },
};

function t(key: keyof typeof L, lang: LanguageCode): string {
  const entry = L[key] as Record<string, string>;
  return entry[lang] ?? entry.en;
}

function localize(text: LocalizedText, lang: LanguageCode): string {
  return text[lang] ?? text.en ?? text.bg;
}

// ── Hero ─────────────────────────────────────────────────────

export type HeroAction = { href: string; label: string; primary?: boolean };

/**
 * The opening. An image, where you are, what this is, and one or two ways in.
 * No coordinates, no review date, no trust chips — the hero's whole job is to
 * make somebody want to read the next paragraph.
 */
export function EntityHero({
  entity,
  language,
  locationLabel,
  back,
  actions,
  onNavigate,
}: {
  entity: Entity;
  language: LanguageCode;
  locationLabel?: string;
  back: { href: string; label: string };
  actions: HeroAction[];
  onNavigate: (path: string) => void;
}) {
  return (
    <section className="guides-hero is-detail entity-hero" aria-labelledby="entity-title">
      <img
        className="guides-hero-bg"
        {...imageProps(entityHeroPath(language, entity))}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        onError={handleImageError}
      />
      <div className="guides-hero-overlay" aria-hidden="true" />
      <div className="guides-hero-inner section-shell">
        <a className="guide-back" href={back.href} onClick={onLink(back.href, onNavigate)}>
          ← {back.label}
        </a>
        {locationLabel && <p className="eyebrow guides-hero-eyebrow">{locationLabel}</p>}
        <h1 id="entity-title">{entityName(entity, language)}</h1>
        <p className="guides-hero-sub">{entityShortText(entity, language)}</p>
        {actions.length > 0 && (
          <div className="entity-hero-actions">
            {actions.map((action) => (
              <a
                key={action.href}
                className={`button ${action.primary ? "primary" : "ghost"}`}
                href={action.href}
                onClick={onLink(action.href, onNavigate)}
              >
                {action.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ── Intro and story ──────────────────────────────────────────

/** The authored opening paragraphs, when the record carries them. */
export function EntityIntro({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <section className="guide-section entity-intro">
      {text.split("\n\n").map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

/**
 * What is known about the place, narrated. One list, not two: separating "what is
 * known" from "what is not known" made the page argue with itself, and a reader
 * does not think in those categories. A hedge now lives inside its own sentence.
 */
export function EntityStory({
  entityId,
  aspect,
  language,
  onNavigate,
  title,
}: {
  entityId: string;
  aspect?: Parameters<typeof narrateClaims>[1];
  language: LanguageCode;
  onNavigate?: (path: string) => void;
  title?: string;
}) {
  const lines = narrateClaims(entityId, aspect);
  if (lines.length === 0) return null;
  return (
    <section className="guide-section entity-story" aria-labelledby={`story-${entityId}-${aspect ?? "all"}`}>
      <h2 id={`story-${entityId}-${aspect ?? "all"}`}>{title ?? t("storyTitle", language)}</h2>
      {lines.map((line) => (
        <p key={line.id}>{line.text(language)}</p>
      ))}
      {onNavigate ? null : null}
    </section>
  );
}

/**
 * An open question, told the way somebody would tell it: the question, the two
 * traditions, and a line letting both stand. No side-by-side panels, no strength
 * markers, and — deliberately — no sentence about the site declining to choose.
 */
export function NameQuestion({ entityId, language }: { entityId: string; language: LanguageCode }) {
  const question = nameQuestion(entityId);
  if (!question) return null;
  return (
    <section className="guide-section entity-name-question" aria-labelledby={`name-${entityId}`}>
      <h2 id={`name-${entityId}`}>{question.question(language)}</h2>
      {question.readings.map((reading) => (
        <p key={reading.id}>
          {reading.label(language) && <strong>{reading.label(language)}. </strong>}
          {reading.text(language)}
        </p>
      ))}
      <p>{question.coda(language)}</p>
    </section>
  );
}

// ── Highlights ───────────────────────────────────────────────

export type Highlight = { href: string; label: string; blurb?: string };

/**
 * Ways further into the site, derived from what this entity actually connects to
 * and from destinations that already exist. Nothing here is a new page: the karst
 * root, the aspect pages, the two knowledge indexes and the guides were all built
 * in earlier milestones and were reachable only from the footer.
 */
export function entityHighlights(entity: Entity, language: LanguageCode): Highlight[] {
  const out: Highlight[] = [];
  const related = derivedLinks(entity, language)
    .map((link) => entityById(link.entityId))
    .filter((target): target is Entity => Boolean(target));

  const root = regionRootOf(entity);
  if (root?.page?.status === "published" && root.id !== entity.id) {
    out.push({ href: `/${language}${root.page.path}`, label: t("hlRegion", language), blurb: entityShortText(root, language) });
  }
  for (const { aspect } of aspectPagesFor(entity.id)) {
    out.push({ href: buildAspectPath(language, entity.slug, aspect), label: aspectTitle(aspect, language) });
  }
  if (related.some((target) => target.page?.path.startsWith("/person/"))) {
    out.push({ href: buildRoutePath(language, "person"), label: t("hlPeople", language) });
  }
  if (related.some((target) => target.page?.path.startsWith("/legend/"))) {
    out.push({ href: buildRoutePath(language, "legend"), label: t("hlStories", language) });
  }
  const guideSlug = entity.contentRef?.guideSlug;
  const guide = guideSlug ? findGuide(guideSlug) : undefined;
  if (guide) {
    out.push({
      href: `/${language}/guides/${guide.slug}/`,
      label: localizeGuide(guide.title, language),
      blurb: localizeGuide(guide.summary, language),
    });
  }
  out.push({ href: buildRoutePath(language, "place"), label: t("hlPlaces", language) });
  return out;
}

/** The highlight grid. Hidden below two entries — one card is not a grid. */
export function EntityHighlights({
  highlights,
  language,
  onNavigate,
}: {
  highlights: Highlight[];
  language: LanguageCode;
  onNavigate: (path: string) => void;
}) {
  if (highlights.length < 2) return null;
  return (
    <section className="guide-section entity-highlights" aria-labelledby="entity-highlights-title">
      <h2 id="entity-highlights-title">{t("highlightsTitle", language)}</h2>
      <div className="entity-highlight-grid">
        {highlights.map((highlight) => (
          <a key={highlight.href} className="entity-highlight" href={highlight.href} onClick={onLink(highlight.href, onNavigate)}>
            <span className="entity-highlight-label">{highlight.label}</span>
            {highlight.blurb && <span className="entity-highlight-blurb">{highlight.blurb}</span>}
          </a>
        ))}
      </div>
    </section>
  );
}

// ── Related entities and nearby places ───────────────────────

/** A card. Its own name, its own sentence, its own picture — never a relation type. */
export function EntityCard({
  entity,
  language,
  onNavigate,
  note,
}: {
  entity: Entity;
  language: LanguageCode;
  onNavigate: (path: string) => void;
  /** A short visitor-facing line, e.g. an approximate distance. Never a graph term. */
  note?: string;
}) {
  const href = entity.page ? `/${language}${entity.page.path}` : buildRoutePath(language, "place");
  return (
    <article className="guide-place">
      <a className="entity-card-link" href={href} onClick={onLink(href, onNavigate)}>
        <img
          {...imageProps(entityHeroPath(language, entity), { variant: "card" })}
          alt={entityHeroAlt(language, entity)}
          loading="lazy"
          decoding="async"
          onError={handleImageError}
        />
        <div className="guide-place-body">
          {note && <p className="guide-place-tag">{note}</p>}
          <h3>{entityName(entity, language)}</h3>
          <p>{entityShortText(entity, language)}</p>
        </div>
      </a>
    </article>
  );
}

/**
 * Related entities, grouped under headings a person would write — "Хората на това
 * място", "Разказите, които се пазят тук" — instead of captioned with the edge
 * that produced them. The grouping IS the relationship, said in Bulgarian.
 */
export function RelatedEntityGroups({
  entity,
  language,
  onNavigate,
}: {
  entity: Entity;
  language: LanguageCode;
  onNavigate: (path: string) => void;
}) {
  const groups = new Map<RelationVoice, Entity[]>();
  for (const link of derivedLinks(entity, language)) {
    const target = entityById(link.entityId);
    if (!target || target.page?.status !== "published") continue;
    const voice = voiceForPath(target.page.path);
    if (voice === "nearby") continue; // nearby has a section of its own, with distances
    const bucket = groups.get(voice) ?? [];
    if (!bucket.some((existing) => existing.id === target.id)) bucket.push(target);
    groups.set(voice, bucket);
  }
  const order: RelationVoice[] = ["people", "stories", "history"];
  const rendered = order.filter((voice) => (groups.get(voice) ?? []).length > 0);
  if (rendered.length === 0) return null;

  return (
    <>
      {rendered.map((voice) => (
        <section className="guide-places" key={voice} aria-labelledby={`related-${voice}`}>
          <h2 id={`related-${voice}`}>{groupTitle(voice, language)}</h2>
          <div className="guide-places-grid">
            {(groups.get(voice) ?? []).map((target) => (
              <EntityCard key={target.id} entity={target} language={language} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

/** Places to go from here, with an approximate distance and no methodology. */
export function NearbyPlaces({
  entity,
  language,
  onNavigate,
}: {
  entity: Entity;
  language: LanguageCode;
  onNavigate: (path: string) => void;
}) {
  const nearby: Array<{ target: Entity; note?: string }> = [];
  for (const link of derivedLinks(entity, language)) {
    const target = entityById(link.entityId);
    if (!target || target.page?.status !== "published") continue;
    if (voiceForPath(target.page.path) !== "nearby") continue;
    if (nearby.some((entry) => entry.target.id === target.id)) continue;
    const km = straightLineKmBetween(entity, target);
    nearby.push({ target, note: km !== undefined ? approximateDistance(km, language) : undefined });
  }
  if (nearby.length === 0) return null;
  return (
    <section className="guide-places" aria-labelledby="entity-nearby">
      <h2 id="entity-nearby">{t("nearbyTitle", language)}</h2>
      <div className="guide-places-grid">
        {nearby.map(({ target, note }) => (
          <EntityCard key={target.id} entity={target} language={language} onNavigate={onNavigate} note={note} />
        ))}
      </div>
    </section>
  );
}

// ── Closing ──────────────────────────────────────────────────

/** The way back into the rest of the site. A page never ends on a full stop. */
export function EntityCTA({
  language,
  actions,
  onNavigate,
}: {
  language: LanguageCode;
  actions: HeroAction[];
  onNavigate: (path: string) => void;
}) {
  if (actions.length === 0) return null;
  return (
    <section className="guide-section entity-cta" aria-labelledby="entity-cta-title">
      <h2 id="entity-cta-title">{t("ctaTitle", language)}</h2>
      <div className="guide-ctas">
        {actions.map((action) => (
          <a
            key={action.href}
            className={`button ${action.primary ? "primary" : "ghost"}`}
            href={action.href}
            onClick={onLink(action.href, onNavigate)}
          >
            {action.label}
          </a>
        ))}
      </div>
    </section>
  );
}

// ── Source disclosure ────────────────────────────────────────

/**
 * Everything the apparatus used to say, folded into one control a visitor can
 * ignore (§7). `<details>` rather than a scripted accordion: it is keyboard
 * accessible, screen-reader announced and open-on-print for free, and it works
 * in the prerendered HTML before any JavaScript has run.
 *
 * The editorial notes — what has not been checked against which register, what
 * this site declines to publish — live here and only here. They are the most
 * unusual thing this project does and they deserve to be readable; they simply do
 * not belong in the middle of a paragraph about a village.
 */
export function SourceDisclosure({
  entityId,
  language,
  onNavigate,
  externalRecords = [],
}: {
  entityId: string;
  language: LanguageCode;
  onNavigate: (path: string) => void;
  externalRecords?: string[];
}) {
  const summary = provenanceSummary(entityId);
  const notes = editorialClaims(entityId);
  const hasDistanceNote = publicClaims(entityId).length > 0;
  if (summary.sources.length === 0 && notes.length === 0 && externalRecords.length === 0) return null;

  return (
    <details className="entity-sources">
      <summary>{t("sourcesSummary", language)}</summary>
      <div className="entity-sources-body">
        <p className="entity-sources-intro">{t("sourcesIntro", language)}</p>
        {summary.signals.length > 0 && (
          <p className="trust-line">
            {summary.signals.map((signal) => (
              <span key={signal} className="trust-signal">
                {trustSignalLabel(signal, language)}
              </span>
            ))}
            {summary.lastReviewed && (
              <span className="trust-signal trust-signal--date">
                {t("reviewed", language)} <time dateTime={summary.lastReviewed}>{summary.lastReviewed}</time>
              </span>
            )}
          </p>
        )}
        {summary.sources.length > 0 && (
          <ul className="source-list">
            {summary.sources.map((source) => (
              <SourceEntry key={source.id} source={source} language={language} onNavigate={onNavigate} />
            ))}
          </ul>
        )}
        {notes.length > 0 && (
          <div className="entity-editorial-notes">
            <h3>{t("editorialTitle", language)}</h3>
            <ul>
              {notes.map((claim) => (
                <li key={claim.id}>{claim.statement[language] ?? claim.statement.en ?? claim.statement.bg}</li>
              ))}
            </ul>
          </div>
        )}
        {hasDistanceNote && <p className="entity-sources-note">{t("distanceNote", language)}</p>}
        {externalRecords.length > 0 && (
          <ul className="entity-sources-list">
            {externalRecords.map((url) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer nofollow">
                  {hostLabel(url)}
                </a>
              </li>
            ))}
          </ul>
        )}
        <p className="provenance-ctas">
          <a
            className="entity-inline-link"
            href={buildRoutePath(language, "sources")}
            onClick={onLink(buildRoutePath(language, "sources"), onNavigate)}
          >
            {language === "bg" ? "Целият регистър на източниците" : "The full source ledger"} →
          </a>
          <a
            className="entity-inline-link"
            href={`${buildRoutePath(language, "corrections")}#report`}
            onClick={onLink(`${buildRoutePath(language, "corrections")}#report`, onNavigate)}
          >
            {language === "bg" ? "Съобщете за грешка" : "Report an error"} →
          </a>
        </p>
      </div>
    </details>
  );
}

function hostLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

// ── Shared helpers for the page shells ───────────────────────

/** "Община Луковит · Област Ловеч" — where you are, in words, not coordinates. */
export function locationLabelFor(entity: Entity, language: LanguageCode): string | undefined {
  const trail: string[] = [];
  let current: Entity | undefined = entity.parent ? entityById(entity.parent) : undefined;
  const guard = new Set<string>();
  while (current && trail.length < 2) {
    if (guard.has(current.id)) break;
    guard.add(current.id);
    trail.push(entityName(current, language));
    current = current.parent ? entityById(current.parent) : undefined;
  }
  return trail.length > 0 ? trail.join(" · ") : undefined;
}

/** The map link, when the entity publishes its own fix. Plain, unhedged, useful. */
export function mapHref(entity: Entity): string | undefined {
  const geo = entity.geo && "lat" in entity.geo ? entity.geo : undefined;
  return geo ? `https://www.google.com/maps/search/?api=1&query=${geo.lat},${geo.lon}` : undefined;
}

export function mapLabel(language: LanguageCode): string {
  return t("onTheMap", language);
}

/** The village a region measures from, for a "back to the base" action. */
export function baseFor(entity: Entity): Entity | undefined {
  const base = baseEntityOf(entity);
  return base && base.id !== entity.id ? base : undefined;
}

/** Published entities of a namespace, for an index CTA. */
export function namespaceCount(prefix: string): number {
  return namespaceEntities(prefix).length;
}
