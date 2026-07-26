import type { MouseEvent, SyntheticEvent } from "react";
import type { LanguageCode } from "../locales/types";
import { buildRoutePath, buildSourcePath, type CoreRouteId } from "../routes";
import { imageProps } from "../images";
import { entityById, entityBySlug, entityName, namespaceEntities } from "./index";
import { EntityCard, EntityDetail, entityHref } from "./EntityPages";
import { SourceEntry, confidenceLabel, sourceKindLabel } from "./Provenance";
import { NAMESPACE_CHROME, PROVENANCE_CHROME, SOURCE_CHROME, localizeChrome, namespacePrefix, namespaceTitle, type NamespaceKind } from "./namespaces";
import {
  claimById,
  claimCorrectionNote,
  claimNote,
  claimRetractionNote,
  claimStatement,
  claims as allClaims,
  corrections,
  disputes,
  evidenceFromSource,
  evidenceNote,
  evidenceTitle,
  ledgerBySource,
  liveClaims,
  liveClaimsFromSource,
  retractions,
  sourceBySlug,
  sourceNote,
  sourceTitle,
  sources as allSources,
  type Source,
} from "./ledger";

// ─────────────────────────────────────────────────────────────
// The knowledge namespaces and the provenance surfaces (M4).
//
//   /history/  /legend/  /person/   — namespace indexes; each entity beneath
//                                     them renders through the same EntityDetail
//                                     the /place/ pages use. A historical period
//                                     is an entity; it does not get its own page
//                                     template just for living somewhere else.
//   /sources/                       — the browsable claim ledger: every source,
//                                     every claim resting on it, in both
//                                     directions (EEAT_STRATEGY §6.1).
//   /corrections/                   — generated from `supersedes`, never
//                                     maintained by hand (§6.2). When it is
//                                     empty it says so and says what it will
//                                     contain, because an empty corrections page
//                                     is a promise, not a blank.
//
// All of it reuses the guides visual system. Nothing here authors a fact: every
// string is either chrome or a transcluded claim.
// ─────────────────────────────────────────────────────────────

const fallbackImage = "/assets/aglen-hero-river-canyon.webp";
function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  if (image.src.endsWith(fallbackImage)) return;
  image.src = fallbackImage;
}

const L = {
  sourcesIntro: {
    bg: "Един източник е това, което трябва да отидете и да погледнете, за да ни проверите. Тук са всички, които сайтът цитира, заедно с твърденията, които почиват на тях. Източниците с неустановен произход са отбелязани като такива и никое твърдение, което почива само на тях, не е „проверено“.",
    en: "A source is what you would have to go and look at in order to check us. Here are all of them, with the claims that rest on each. Sources whose provenance is not established are marked as such, and no claim resting on one alone is “verified”.",
  },
  ledgerCounts: { bg: "В регистъра", en: "In the ledger" },
  countSources: { bg: "източника", en: "sources" },
  countClaims: { bg: "твърдения", en: "claims" },
  countDisputes: { bg: "отворени въпроса", en: "open questions" },
  countCorrections: { bg: "поправки", en: "corrections" },
  restingClaims: { bg: "Твърдения, които почиват на този източник", en: "Claims resting on this source" },
  noClaims: { bg: "Нито едно твърдение не почива на този източник в момента.", en: "No claim currently rests on this source." },
  correctionsEmptyTitle: { bg: "Публикувани поправки: няма", en: "Published corrections: none" },
  correctionsEmpty: {
    bg: "Откакто регистърът на твърденията съществува, нито едно публикувано твърдение не е било поправяно. Това не значи, че всичко е вярно — значи, че още никой не ни е хванал в грешка и че ние самите не сме открили такава. Когато това се случи, поправката се появява тук: какво е било казано, какво е сгрешено, какво го замества и от коя дата.",
    en: "Since the claim ledger began, no published claim has been corrected. That does not mean everything is right — it means nobody has yet caught us in an error and we have not found one ourselves. When that happens, the correction appears here: what was said, what was wrong with it, what replaces it and from what date.",
  },
  correctionsHow: { bg: "Как да съобщите за грешка", en: "How to report an error" },
  correctionsHowText: {
    bg: "Пишете на info.aglen@gmail.com с адреса на страницата и какво е сгрешено. Всяко съобщение се проверява. Ако сте прави, твърдението се замества и поправката се появява на тази страница със заслуга към вас, ако желаете.",
    en: "Write to info.aglen@gmail.com with the page address and what is wrong. Every report is checked. If you are right, the claim is superseded and the correction appears on this page, credited to you if you wish.",
  },
  supersededLabel: { bg: "Заместено твърдение", en: "Superseded claim" },
  replacementLabel: { bg: "Ново твърдение", en: "Replacement claim" },
  whatWasWrong: { bg: "Какво беше сгрешено", en: "What was wrong" },
  retractionsTitle: { bg: "Оттеглени твърдения", en: "Retracted claims" },
  retractionsNote: {
    bg: "Оттегленото твърдение се зачерква и се запазва. То не се изтрива, защото читателят, който го е прочел, заслужава да види, че сме го оттеглили.",
    en: "A retracted claim is struck through and kept. It is not deleted, because a reader who saw it deserves to see that we withdrew it.",
  },
  backToLedger: { bg: "Регистър на източниците", en: "The source ledger" },
  backToCorrections: { bg: "Поправки", en: "Corrections" },
  backToGuide: { bg: "Справочник", en: "Guide" },
  emptyNamespace: { bg: "Тук още няма публикувани страници.", en: "No pages are published here yet." },
  correctionDate: { bg: "Публикувана поправка", en: "Correction published" },
  correctionCredit: { bg: "Съобщено от", en: "Reported by" },
  retractionDate: { bg: "Оттеглено на", en: "Withdrawn on" },
  reportHeading: { bg: "Как да съобщите за грешка", en: "How to report an error" },
  // The source page
  sourceOpen: { bg: "Отвори източника", en: "Open the source" },
  sourceRests: { bg: "Какво почива на този източник", en: "What rests on this source" },
  sourceEntities: { bg: "Страници, които го използват", en: "Pages that use it" },
  sourceHeld: { bg: "Какво държим от него", en: "What we hold from it" },
  sourceHeldNone: {
    bg: "От този източник не се съхранява собствен материал — снимка, сканиран документ или запис. Когато такъв постъпи, той се появява тук с дата и с този, който го е направил.",
    en: "No material of our own is held from this source — no photograph, scan or recording. When one is taken, it appears here with its date and with the person who made it.",
  },
  sourceLimits: { bg: "Докъде стига този източник", en: "How far this source reaches" },
  sourceMissing: {
    bg: "Такъв източник не е намерен. Регистърът на източниците е тук.",
    en: "No such source was found. The source ledger is here.",
  },
  observedBy: { bg: "Записано от", en: "Recorded by" },
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
 * One namespace: its index when no slug is addressed, otherwise the entity
 * itself — rendered by the same `EntityDetail` the `/place/` pages use, with its
 * back link pointing at this index rather than at the Справочник.
 */
export function KnowledgePage({
  kind,
  language,
  entitySlug,
  onNavigate,
}: {
  kind: NamespaceKind;
  language: LanguageCode;
  entitySlug?: string;
  onNavigate: (path: string) => void;
}) {
  const chrome = NAMESPACE_CHROME[kind];
  const prefix = namespacePrefix(kind);
  const indexHref = buildRoutePath(language, kind as CoreRouteId);
  const entity = entitySlug ? entityBySlug(entitySlug) : undefined;

  if (entity && entity.page?.status === "published" && entity.page.path.startsWith(prefix)) {
    return (
      <EntityDetail
        entity={entity}
        language={language}
        onNavigate={onNavigate}
        back={{ href: indexHref, label: namespaceTitle(kind, language) }}
      />
    );
  }

  const listed = namespaceEntities(prefix);
  const guideHref = buildRoutePath(language, "guides");

  return (
    <div className="guides-page">
      <section className="guides-hero" aria-labelledby={`${kind}-title`}>
        <img className="guides-hero-bg" {...imageProps(chrome.hero)} alt="" aria-hidden="true" fetchPriority="high" decoding="async" onError={handleImageError} />
        <div className="guides-hero-overlay" aria-hidden="true" />
        <div className="guides-hero-inner section-shell">
          <a className="guide-back" href={guideHref} onClick={onLink(guideHref, onNavigate)}>
            ← {t("backToGuide", language)}
          </a>
          <p className="eyebrow guides-hero-eyebrow">{localizeChrome(chrome.eyebrow, language)}</p>
          <h1 id={`${kind}-title`}>{namespaceTitle(kind, language)}</h1>
          <p className="guides-hero-sub">{localizeChrome(chrome.lede, language)}</p>
        </div>
      </section>
      <section className="section-shell guides-list" aria-labelledby={`${kind}-title`}>
        {listed.length === 0 ? (
          <p className="guide-notice" role="note">{t("emptyNamespace", language)}</p>
        ) : (
          <div className="guide-places-grid">
            {listed.map((item) => (
              <EntityCard key={item.id} entity={item} language={language} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/** `/sources/` — the whole ledger, source by source, with what rests on each. */
export function SourcesPage({ language, onNavigate }: { language: LanguageCode; onNavigate: (path: string) => void }) {
  const ledger = ledgerBySource();
  const guideHref = buildRoutePath(language, "guides");
  const correctionsHref = buildRoutePath(language, "corrections");

  return (
    <div className="guides-page guide-detail-page">
      <section className="guides-hero is-detail" aria-labelledby="sources-title">
        <img className="guides-hero-bg" {...imageProps("/assets/aglen-village-church.png")} alt="" aria-hidden="true" fetchPriority="high" decoding="async" onError={handleImageError} />
        <div className="guides-hero-overlay" aria-hidden="true" />
        <div className="guides-hero-inner section-shell">
          <a className="guide-back" href={guideHref} onClick={onLink(guideHref, onNavigate)}>
            ← {t("backToGuide", language)}
          </a>
          <p className="eyebrow guides-hero-eyebrow">{localizeChrome(PROVENANCE_CHROME.sources.eyebrow, language)}</p>
          <h1 id="sources-title">{localizeChrome(PROVENANCE_CHROME.sources.title, language)}</h1>
          <p className="guides-hero-sub">{localizeChrome(PROVENANCE_CHROME.sources.lede, language)}</p>
        </div>
      </section>

      <div className="section-shell guide-body">
        <section className="guide-section">
          <p>{t("sourcesIntro", language)}</p>
          <aside className="guide-facts" aria-label={t("ledgerCounts", language)}>
            <dl>
              <div>
                <dt>{t("countSources", language)}</dt>
                <dd>{allSources.length}</dd>
              </div>
              <div>
                <dt>{t("countClaims", language)}</dt>
                <dd>{liveClaims().length}</dd>
              </div>
              <div>
                <dt>{t("countDisputes", language)}</dt>
                <dd>{disputes.filter((dispute) => dispute.status === "open").length}</dd>
              </div>
              <div>
                <dt>{t("countCorrections", language)}</dt>
                <dd>{corrections().length}</dd>
              </div>
            </dl>
          </aside>
        </section>

        {ledger.map(({ source, claims, path }) => (
          <section className="guide-section ledger-entry" key={source.id} aria-labelledby={`heading-${source.slug}`}>
            <h2 id={`heading-${source.slug}`}>
              {path ? (
                <a href={buildSourcePath(language, source.slug)} onClick={onLink(buildSourcePath(language, source.slug), onNavigate)}>
                  {sourceTitle(source, language)}
                </a>
              ) : (
                sourceTitle(source, language)
              )}
            </h2>
            <ul className="source-list">
              <SourceEntry source={source} language={language} onNavigate={onNavigate} />
            </ul>
            <h3>{t("restingClaims", language)}</h3>
            {claims.length === 0 ? (
              <p className="guide-notice" role="note">{t("noClaims", language)}</p>
            ) : (
              <ul className="claim-list ledger-claims">
                {claims.map((claim) => {
                  const target = entityById(claim.entityId);
                  const href = target?.page?.status === "published" ? entityHref(language, target) : undefined;
                  return (
                    <li className={`claim claim--${claim.confidence}`} key={claim.id}>
                      <p className="claim-statement">
                        {claimStatement(claim, language)}{" "}
                        <span className="claim-confidence" data-confidence={claim.confidence}>
                          {confidenceLabel(claim.confidence, language)}
                        </span>
                      </p>
                      {target && (
                        <p className="claim-sources">
                          {href ? (
                            <a className="claim-source" href={href} onClick={onLink(href, onNavigate)}>
                              {entityName(target, language)}
                            </a>
                          ) : (
                            <span className="claim-source">{entityName(target, language)}</span>
                          )}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        ))}

        <div className="guide-ctas">
          <a className="button primary" href={correctionsHref} onClick={onLink(correctionsHref, onNavigate)}>
            {t("backToCorrections", language)}
          </a>
          <a className="button ghost" href={guideHref} onClick={onLink(guideHref, onNavigate)}>
            {t("backToGuide", language)}
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * `/source/<slug>/` — one citable origin (M4B, ADR-015).
 *
 * The page answers four questions in order, and they are the four a researcher or
 * a model actually asks: what is this, what has the site drawn from it, what do we
 * physically hold from it, and how far does it reach before it stops being
 * evidence. The fourth is the one that matters — a source page that only
 * advertised a source's strengths would be a bibliography entry with a marketing
 * voice. Everything on it is derived; nothing is authored here.
 *
 * It is not a stop on the visitor journey. A reader arrives from a citation at the
 * foot of a page, checks one thing and leaves, and the page is built for exactly
 * that — no hero photography of its own beyond the shared plate, no prose.
 */
export function SourcePage({
  sourceSlug,
  language,
  onNavigate,
}: {
  sourceSlug?: string;
  language: LanguageCode;
  onNavigate: (path: string) => void;
}) {
  const source = sourceSlug ? sourceBySlug(sourceSlug) : undefined;
  const sourcesHref = buildRoutePath(language, "sources");

  if (!source) {
    return (
      <div className="guides-page guide-detail-page">
        <div className="section-shell guide-body">
          <section className="guide-section">
            <p className="guide-notice" role="note">{t("sourceMissing", language)}</p>
            <p>
              <a className="entity-inline-link" href={sourcesHref} onClick={onLink(sourcesHref, onNavigate)}>
                {t("backToLedger", language)} →
              </a>
            </p>
          </section>
        </div>
      </div>
    );
  }

  const resting = liveClaimsFromSource(source.id);
  const held = evidenceFromSource(source.id);
  const limits = sourceNote(source, language);
  const correctionsHref = buildRoutePath(language, "corrections");
  // Which pages lean on this source, so a reader can see its reach at a glance.
  const usedBy = [...new Map(resting.map((claim) => [claim.entityId, entityById(claim.entityId)])).values()].filter(
    (entity): entity is NonNullable<typeof entity> => Boolean(entity) && entity!.page?.status === "published",
  );

  return (
    <div className="guides-page guide-detail-page">
      <section className="guides-hero is-detail" aria-labelledby="source-title">
        <img className="guides-hero-bg" {...imageProps(SOURCE_CHROME.hero)} alt="" aria-hidden="true" fetchPriority="high" decoding="async" onError={handleImageError} />
        <div className="guides-hero-overlay" aria-hidden="true" />
        <div className="guides-hero-inner section-shell">
          <a className="guide-back" href={sourcesHref} onClick={onLink(sourcesHref, onNavigate)}>
            ← {t("backToLedger", language)}
          </a>
          <p className="eyebrow guides-hero-eyebrow">
            {localizeChrome(SOURCE_CHROME.eyebrow, language)} · {sourceKindLabel(source, language)}
          </p>
          <h1 id="source-title">{sourceTitle(source, language)}</h1>
          <p className="guides-hero-sub">{localizeChrome(SOURCE_CHROME.lede, language)}</p>
        </div>
      </section>

      <div className="section-shell guide-body">
        <section className="guide-section">
          <ul className="source-list">
            <SourceEntry source={source} language={language} />
          </ul>
          {source.url && (
            <p className="guide-ctas">
              <a className="button ghost" href={source.url} target="_blank" rel="noopener noreferrer">
                {t("sourceOpen", language)}
              </a>
            </p>
          )}
        </section>

        <section className="guide-section" aria-labelledby="source-resting">
          <h2 id="source-resting">{t("sourceRests", language)}</h2>
          {resting.length === 0 ? (
            <p className="guide-notice" role="note">{t("noClaims", language)}</p>
          ) : (
            <ul className="claim-list ledger-claims">
              {resting.map((claim) => {
                const target = entityById(claim.entityId);
                const href = target?.page?.status === "published" ? entityHref(language, target) : undefined;
                const note = claimNote(claim, language);
                return (
                  <li className={`claim claim--${claim.confidence}`} key={claim.id}>
                    <p className="claim-statement">
                      {claimStatement(claim, language)}{" "}
                      <span className="claim-confidence" data-confidence={claim.confidence}>
                        {confidenceLabel(claim.confidence, language)}
                      </span>
                    </p>
                    {note && <p className="claim-note">{note}</p>}
                    {target && (
                      <p className="claim-sources">
                        {href ? (
                          <a className="claim-source" href={href} onClick={onLink(href, onNavigate)}>
                            {entityName(target, language)}
                          </a>
                        ) : (
                          <span className="claim-source">{entityName(target, language)}</span>
                        )}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {usedBy.length > 0 && (
          <section className="guide-section" aria-labelledby="source-entities">
            <h2 id="source-entities">{t("sourceEntities", language)}</h2>
            <ul className="entity-sources-list">
              {usedBy.map((entity) => {
                const href = entityHref(language, entity);
                return (
                  <li key={entity.id}>
                    <a href={href} onClick={onLink(href, onNavigate)}>
                      {entityName(entity, language)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <section className="guide-section" aria-labelledby="source-held">
          <h2 id="source-held">{t("sourceHeld", language)}</h2>
          {held.length === 0 ? (
            <p className="guide-notice" role="note">{t("sourceHeldNone", language)}</p>
          ) : (
            <ul className="source-list">
              {held.map((artifact) => {
                const note = evidenceNote(artifact, language);
                return (
                  <li className="source-entry" key={artifact.id}>
                    <p className="source-citation">{evidenceTitle(artifact, language)}</p>
                    <p className="source-meta">
                      {t("observedBy", language)} {artifact.observer} · <time dateTime={artifact.observedAt}>{artifact.observedAt}</time>
                    </p>
                    {note && <p className="source-note">{note}</p>}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {limits && (
          <section className="guide-section" aria-labelledby="source-limits">
            <h2 id="source-limits">{t("sourceLimits", language)}</h2>
            <p>{limits}</p>
          </section>
        )}

        <div className="guide-ctas">
          <a className="button primary" href={sourcesHref} onClick={onLink(sourcesHref, onNavigate)}>
            {t("backToLedger", language)}
          </a>
          <a className="button ghost" href={correctionsHref} onClick={onLink(correctionsHref, onNavigate)}>
            {t("backToCorrections", language)}
          </a>
        </div>
      </div>
    </div>
  );
}

/** `/corrections/` — generated from `supersedes`; empty is a state, not a blank. */
export function CorrectionsPage({ language, onNavigate }: { language: LanguageCode; onNavigate: (path: string) => void }) {
  const published = corrections();
  const withdrawn = retractions();
  const guideHref = buildRoutePath(language, "guides");
  const sourcesHref = buildRoutePath(language, "sources");

  return (
    <div className="guides-page guide-detail-page">
      <section className="guides-hero is-detail" aria-labelledby="corrections-title">
        <img className="guides-hero-bg" {...imageProps("/assets/aglen-village-church.png")} alt="" aria-hidden="true" fetchPriority="high" decoding="async" onError={handleImageError} />
        <div className="guides-hero-overlay" aria-hidden="true" />
        <div className="guides-hero-inner section-shell">
          <a className="guide-back" href={sourcesHref} onClick={onLink(sourcesHref, onNavigate)}>
            ← {t("backToLedger", language)}
          </a>
          <p className="eyebrow guides-hero-eyebrow">{localizeChrome(PROVENANCE_CHROME.corrections.eyebrow, language)}</p>
          <h1 id="corrections-title">{localizeChrome(PROVENANCE_CHROME.corrections.title, language)}</h1>
          <p className="guides-hero-sub">{localizeChrome(PROVENANCE_CHROME.corrections.lede, language)}</p>
        </div>
      </section>

      <div className="section-shell guide-body">
        {published.length === 0 ? (
          <section className="guide-section">
            <h2>{t("correctionsEmptyTitle", language)}</h2>
            <p>{t("correctionsEmpty", language)}</p>
          </section>
        ) : (
          <section className="guide-section">
            <ul className="claim-list">
              {published.map((claim) => {
                const superseded = claim.supersedes ? claimById(claim.supersedes) : undefined;
                const target = entityById(claim.entityId);
                return (
                  <li className="claim correction" key={claim.id}>
                    {target && <p className="eyebrow">{entityName(target, language)}</p>}
                    {superseded && (
                      <p className="claim-statement correction-old">
                        <strong>{t("supersededLabel", language)}:</strong> <s>{claimStatement(superseded, language)}</s>
                      </p>
                    )}
                    <p className="claim-statement">
                      <strong>{t("replacementLabel", language)}:</strong> {claimStatement(claim, language)}
                    </p>
                    <p className="claim-note">
                      <strong>{t("whatWasWrong", language)}:</strong> {claimCorrectionNote(claim, language)}
                    </p>
                    {/* Date and credit: a correction with neither is an edit. */}
                    <p className="source-meta">
                      {claim.correctedAt && (
                        <>
                          {t("correctionDate", language)} <time dateTime={claim.correctedAt}>{claim.correctedAt}</time>
                        </>
                      )}
                      {claim.correctionCredit && ` · ${t("correctionCredit", language)} ${claim.correctionCredit}`}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {withdrawn.length > 0 && (
          <section className="guide-section">
            <h2>{t("retractionsTitle", language)}</h2>
            <p className="guide-notice" role="note">{t("retractionsNote", language)}</p>
            <ul className="claim-list">
              {withdrawn.map((claim) => (
                <li className="claim retraction" key={claim.id}>
                  <p className="claim-statement">
                    <s>{claimStatement(claim, language)}</s>
                  </p>
                  <p className="claim-note">{claimRetractionNote(claim, language)}</p>
                  {claim.retractedAt && (
                    <p className="source-meta">
                      {t("retractionDate", language)} <time dateTime={claim.retractedAt}>{claim.retractedAt}</time>
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Every provenance footer on the site links here by name. */}
        <section className="guide-section" id="report">
          <h2>{t("correctionsHow", language)}</h2>
          <p>{t("correctionsHowText", language)}</p>
        </section>

        <div className="guide-ctas">
          <a className="button primary" href={sourcesHref} onClick={onLink(sourcesHref, onNavigate)}>
            {t("backToLedger", language)}
          </a>
          <a className="button ghost" href={guideHref} onClick={onLink(guideHref, onNavigate)}>
            {t("backToGuide", language)}
          </a>
        </div>
      </div>
    </div>
  );
}
