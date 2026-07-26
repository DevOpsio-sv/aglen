import type { MouseEvent, SyntheticEvent } from "react";
import type { LanguageCode } from "../locales/types";
import { buildRoutePath, type CoreRouteId } from "../routes";
import { imageProps } from "../images";
import { entityById, entityBySlug, entityName, namespaceEntities } from "./index";
import { EntityCard, EntityDetail, entityHref } from "./EntityPages";
import { SourceEntry, confidenceLabel } from "./Provenance";
import { NAMESPACE_CHROME, PROVENANCE_CHROME, localizeChrome, namespaceTitle, type NamespaceKind } from "./namespaces";
import {
  claimById,
  claimCorrectionNote,
  claimRetractionNote,
  claimStatement,
  claims as allClaims,
  corrections,
  disputes,
  ledgerBySource,
  retractions,
  sources as allSources,
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
  const indexHref = buildRoutePath(language, kind as CoreRouteId);
  const entity = entitySlug ? entityBySlug(entitySlug) : undefined;

  if (entity && entity.page?.status === "published" && entity.page.path.startsWith(chrome.prefix)) {
    return (
      <EntityDetail
        entity={entity}
        language={language}
        onNavigate={onNavigate}
        back={{ href: indexHref, label: namespaceTitle(kind, language) }}
      />
    );
  }

  const listed = namespaceEntities(chrome.prefix);
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
                <dd>{allClaims.length}</dd>
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

        {ledger.map(({ source, claims }) => (
          <section className="guide-section ledger-entry" key={source.id} aria-labelledby={`heading-${source.id}`}>
            <h2 id={`heading-${source.id}`}>{source.title[language] ?? source.title.en ?? source.title.bg}</h2>
            <ul className="source-list">
              <SourceEntry source={source} language={language} />
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
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="guide-section">
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
