import type { MouseEvent } from "react";
import type { LanguageCode } from "../locales/types";
import { buildRoutePath, buildSourcePath } from "../routes";
import type { EntityId } from "./schema";
import { SOURCE_KIND_LABELS, TRUST_SIGNAL_LABELS, localizeChrome } from "./namespaces";
import {
  claimInterpretation,
  claimNote,
  claimStatement,
  claimsInDispute,
  disputeQuestion,
  disputeResolutionTest,
  disputesFor,
  evidenceFor,
  evidenceTitle,
  knownClaims,
  provenanceSummary,
  sourceHasPage,
  sourceNote,
  sourceTitle,
  sourcesOf,
  uncertainClaims,
  type Claim,
  type ClaimAspect,
  type ClaimConfidence,
  type Source,
  type TrustSignal,
} from "./ledger";

// ─────────────────────────────────────────────────────────────
// The provenance surface — how a claim looks to a reader (M4).
//
// These blocks are the visible half of the ledger and the only place the site
// speaks about its own certainty. Three rules shape every one of them:
//
//   1. Confidence is never flattened (Constitution rule 8 / V15). A hedged claim
//      renders with its hedge attached, in the same type size as a firm one.
//   2. Unknown and disputed are states, not silences (rule 7 / V2 / V14). The
//      "what is not known" block is a normal section, not an apology, and the two
//      readings of a disputed question sit side by side with equal prominence.
//   3. The apparatus stays quiet. A reader who does not care about provenance
//      sees one line of small type and a list of sources at the foot; a reader
//      who does care can follow every statement to its origin.
//
// No new visual language: these reuse the guide system's `guide-section`,
// `guide-notice` and `guide-facts` shapes, with a handful of provenance-specific
// classes added in `styles.css`.
// ─────────────────────────────────────────────────────────────

const L = {
  knownTitle: { bg: "Какво се знае", en: "What is known" },
  uncertainTitle: { bg: "Какво не се знае", en: "What is not known" },
  uncertainNote: {
    bg: "Тези редове са тук нарочно. Сайтът предпочита да каже какво не е установено, вместо да мълчи за него.",
    en: "These lines are here on purpose. The site would rather say what is unestablished than go quiet about it.",
  },
  disputeTitle: { bg: "Отворен въпрос", en: "An open question" },
  disputeNote: {
    bg: "Двете обяснения се представят едно до друго. Сайтът не избира между тях.",
    en: "The two explanations are presented side by side. The site does not choose between them.",
  },
  resolutionLabel: { bg: "Какво би решило въпроса", en: "What would settle it" },
  sourcesTitle: { bg: "Източници", en: "Sources" },
  sourcesNote: {
    bg: "Всяко твърдение по-горе почива на един от тези източници. Ако някой е сгрешен, пишете ни и поправката се публикува.",
    en: "Every statement above rests on one of these sources. If one is wrong, write to us and the correction is published.",
  },
  externalTitle: { bg: "Външни записи", en: "External records" },
  externalNote: {
    bg: "Записите в отворените бази данни, с които това е свързано.",
    en: "The open-data records this is linked to.",
  },
  reviewedLabel: { bg: "Последен преглед", en: "Last reviewed" },
  ledgerCta: { bg: "Виж целия регистър на източниците", en: "See the full source ledger" },
  correctionsCta: { bg: "Поправки", en: "Corrections" },
  suggestCta: { bg: "Съобщете за грешка", en: "Suggest a correction" },
  trustLineLabel: { bg: "За тази страница", en: "About this page" },
  aboutSource: { bg: "За източника", en: "About this source" },
  heldEvidence: { bg: "Какво държим", en: "What we hold" },
  confidence: {
    verified: { bg: "проверено", en: "verified" },
    reported: { bg: "предава се", en: "reported" },
    uncertain: { bg: "несигурно", en: "uncertain" },
    disputed: { bg: "оспорвано", en: "disputed" },
  },
  verification: {
    verified: { bg: "проверен източник", en: "verified source" },
    reported: { bg: "непроверен от нас", en: "not checked by us" },
    unverified: { bg: "неустановен произход", en: "provenance not established" },
  },
};

function pickLabel(entry: { bg: string; en: string }, lang: LanguageCode): string {
  return (entry as Record<string, string>)[lang] ?? entry.en;
}

function t(key: Exclude<keyof typeof L, "confidence" | "verification">, lang: LanguageCode): string {
  return pickLabel(L[key] as { bg: string; en: string }, lang);
}

export function confidenceLabel(confidence: ClaimConfidence, lang: LanguageCode): string {
  return pickLabel(L.confidence[confidence], lang);
}

function verificationLabel(source: Source, lang: LanguageCode): string {
  return pickLabel(L.verification[source.verification], lang);
}

export function sourceKindLabel(source: Source, lang: LanguageCode): string {
  const label = SOURCE_KIND_LABELS[source.kind];
  return label ? localizeChrome(label, lang) : source.kind;
}

export function trustSignalLabel(signal: TrustSignal, lang: LanguageCode): string {
  const label = TRUST_SIGNAL_LABELS[signal];
  return label ? localizeChrome(label, lang) : signal;
}

function onLink(href: string, onNavigate: (path: string) => void) {
  return (event: MouseEvent) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(href);
  };
}

/**
 * Where a source is addressed from a claim. A source that has earned a page gets
 * its canonical URL; the rest anchor to the citation at the foot of the page. In
 * neither case does a ledger id reach the markup — the fragment is the source's
 * slug, because a visitor who copies a link should not be copying a database key.
 */
function sourceAnchor(source: Source, language: LanguageCode): string {
  return sourceHasPage(source.id) ? buildSourcePath(language, source.slug) : `#source-${source.slug}`;
}

/** The list of origins under one statement, as titles a reader can follow. */
function CitedSources({ claim, language, onNavigate }: { claim: Claim; language: LanguageCode; onNavigate?: (path: string) => void }) {
  const cited = sourcesOf(claim);
  if (cited.length === 0) return null;
  return (
    <p className="claim-sources">
      {cited.map((source) => {
        const href = sourceAnchor(source, language);
        const isPage = href.startsWith("/");
        return (
          <a
            key={source.id}
            className="claim-source"
            href={href}
            onClick={isPage && onNavigate ? onLink(href, onNavigate) : undefined}
          >
            {sourceTitle(source, language)}
          </a>
        );
      })}
    </p>
  );
}

/**
 * One claim. The confidence word is part of the sentence's furniture, not a
 * badge that can be styled away: a reader must not be able to read the statement
 * without meeting the hedge (rule 8). Where an artifact backs the statement, it
 * is named in the same breath — held evidence is the strongest thing this site
 * can say, and it says it in one short line rather than in a table.
 */
export function ClaimLine({ claim, language, onNavigate }: { claim: Claim; language: LanguageCode; onNavigate?: (path: string) => void }) {
  const note = claimNote(claim, language);
  const held = evidenceFor(claim.id);
  return (
    <li className={`claim claim--${claim.confidence}`}>
      <p className="claim-statement">
        {claimStatement(claim, language)}{" "}
        <span className="claim-confidence" data-confidence={claim.confidence}>
          {confidenceLabel(claim.confidence, language)}
        </span>
      </p>
      {note && <p className="claim-note">{note}</p>}
      {held.length > 0 && (
        <p className="claim-evidence">
          {t("heldEvidence", language)}: {held.map((artifact) => evidenceTitle(artifact, language)).join("; ")}
        </p>
      )}
      <CitedSources claim={claim} language={language} onNavigate={onNavigate} />
    </li>
  );
}

/** The "what is known" block. Absent when the entity has no firm claim yet. */
export function KnownClaims({
  entityId,
  aspect,
  language,
  onNavigate,
}: {
  entityId: EntityId;
  aspect?: ClaimAspect;
  language: LanguageCode;
  onNavigate?: (path: string) => void;
}) {
  const claims = knownClaims(entityId, aspect);
  if (claims.length === 0) return null;
  return (
    <section className="guide-section claim-block" aria-labelledby={`known-${entityId}-${aspect ?? "all"}`}>
      <h2 id={`known-${entityId}-${aspect ?? "all"}`}>{t("knownTitle", language)}</h2>
      <ul className="claim-list">
        {claims.map((claim) => (
          <ClaimLine key={claim.id} claim={claim} language={language} onNavigate={onNavigate} />
        ))}
      </ul>
    </section>
  );
}

/**
 * The "what is not known" block. It renders whenever there is a stated unknown,
 * and it is deliberately not visually demoted — an admission printed in grey is
 * an admission the reader is being invited to skip.
 */
export function UncertainClaims({
  entityId,
  aspect,
  language,
  onNavigate,
}: {
  entityId: EntityId;
  aspect?: ClaimAspect;
  language: LanguageCode;
  onNavigate?: (path: string) => void;
}) {
  const claims = uncertainClaims(entityId, aspect);
  if (claims.length === 0) return null;
  return (
    <section className="guide-section claim-block claim-block--uncertain" aria-labelledby={`unknown-${entityId}-${aspect ?? "all"}`}>
      <h2 id={`unknown-${entityId}-${aspect ?? "all"}`}>{t("uncertainTitle", language)}</h2>
      <p className="guide-notice" role="note">{t("uncertainNote", language)}</p>
      <ul className="claim-list">
        {claims.map((claim) => (
          <ClaimLine key={claim.id} claim={claim} language={language} onNavigate={onNavigate} />
        ))}
      </ul>
    </section>
  );
}

/**
 * A dispute: two or more readings of one question, rendered side by side with
 * identical treatment. Nothing in the markup or the styling ranks them, and the
 * site states in the open what would settle the question (V14).
 */
export function Disputes({
  entityId,
  aspect,
  language,
  onNavigate,
}: {
  entityId: EntityId;
  aspect?: ClaimAspect;
  language: LanguageCode;
  onNavigate?: (path: string) => void;
}) {
  const open = disputesFor(entityId, aspect);
  if (open.length === 0) return null;
  return (
    <>
      {open.map((dispute) => {
        const readings = claimsInDispute(dispute.id);
        const test = disputeResolutionTest(dispute, language);
        return (
          <section key={dispute.id} className="guide-section dispute" aria-labelledby={`dispute-${dispute.id}`}>
            <p className="eyebrow">{t("disputeTitle", language)}</p>
            <h2 id={`dispute-${dispute.id}`}>{disputeQuestion(dispute, language)}</h2>
            <p className="guide-notice" role="note">{t("disputeNote", language)}</p>
            <div className="dispute-readings">
              {readings.map((claim) => {
                const note = claimNote(claim, language);
                return (
                  <article className="dispute-reading" key={claim.id}>
                    <h3>{claimInterpretation(claim, language)}</h3>
                    <p>{claimStatement(claim, language)}</p>
                    {/* Each reading says how well it is itself held. Without this
                        the two sit side by side looking equally supported, which
                        is its own kind of editorialising. */}
                    {claim.interpretationConfidence && (
                      <p className="dispute-strength">
                        <span className="claim-confidence" data-confidence={claim.interpretationConfidence}>
                          {confidenceLabel(claim.interpretationConfidence, language)}
                        </span>
                      </p>
                    )}
                    {note && <p className="claim-note">{note}</p>}
                    <CitedSources claim={claim} language={language} onNavigate={onNavigate} />
                  </article>
                );
              })}
            </div>
            {test && (
              <p className="dispute-test">
                <strong>{t("resolutionLabel", language)}:</strong> {test}
              </p>
            )}
          </section>
        );
      })}
    </>
  );
}

/**
 * The trust line: three or four short phrases and a date, sitting quietly under a
 * page's heading. It is the whole visible surface of the provenance layer for a
 * reader who does not go looking — and it must stay that: no counts, no ids, no
 * vocabulary from this codebase (Part 12). A page with nothing earned renders
 * nothing at all rather than an empty row of reassurances.
 */
export function TrustLine({ entityId, language }: { entityId: EntityId; language: LanguageCode }) {
  const summary = provenanceSummary(entityId);
  if (summary.signals.length === 0 && !summary.lastReviewed) return null;
  return (
    <p className="trust-line" aria-label={t("trustLineLabel", language)}>
      {summary.signals.map((signal) => (
        <span key={signal} className="trust-signal" data-signal={signal}>
          {trustSignalLabel(signal, language)}
        </span>
      ))}
      {summary.lastReviewed && (
        <span className="trust-signal trust-signal--date">
          {t("reviewedLabel", language)} <time dateTime={summary.lastReviewed}>{summary.lastReviewed}</time>
        </span>
      )}
    </p>
  );
}

/**
 * One source, as a citation a reader could actually follow. Anchored by its slug,
 * never by its record id, so a copied link carries a name rather than a key. Where
 * the source has earned a page, the citation links to it.
 */
export function SourceEntry({
  source,
  language,
  onNavigate,
}: {
  source: Source;
  language: LanguageCode;
  onNavigate?: (path: string) => void;
}) {
  const note = sourceNote(source, language);
  const pagePath = sourceHasPage(source.id) ? buildSourcePath(language, source.slug) : undefined;
  return (
    <li className={`source-entry source-entry--${source.verification}`} id={`source-${source.slug}`}>
      <p className="source-citation">
        {source.url ? (
          <a href={source.url} target="_blank" rel="noopener noreferrer">
            {source.citation}
          </a>
        ) : (
          source.citation
        )}{" "}
        <span className="source-verification" data-verification={source.verification}>
          {verificationLabel(source, language)}
        </span>
      </p>
      <p className="source-meta">
        {[sourceKindLabel(source, language), source.license, source.accessedAt].filter(Boolean).join(" · ")}
      </p>
      {note && <p className="source-note">{note}</p>}
      {pagePath && onNavigate && (
        <p className="source-more">
          <a className="entity-inline-link" href={pagePath} onClick={onLink(pagePath, onNavigate)}>
            {t("aboutSource", language)} →
          </a>
        </p>
      )}
    </li>
  );
}

/**
 * The per-page provenance footer (`EEAT_STRATEGY.md` §6.3): what this page rests
 * on, how far it was checked, when a human last looked, and how to tell us we are
 * wrong. It renders on every page that has claims and is the last thing on the
 * page for a reason — it is the apparatus, not the content.
 *
 * M4B removed the counts that used to open it ("N claims · N sources"). They were
 * true and they were the wrong register: a number about itself is a database
 * talking, and the moment a reader notices the machinery the machinery has failed
 * (the absolute rule). What replaced them is the same information in a form a
 * reader can act on — signals in words, a date, the citations themselves, and an
 * invitation to correct us. The counts still exist, on `/sources/`, where a
 * researcher who wants them has gone looking.
 */
export function ProvenanceFooter({
  entityId,
  language,
  onNavigate,
  externalRecords = [],
}: {
  entityId: EntityId;
  language: LanguageCode;
  onNavigate: (path: string) => void;
  externalRecords?: string[];
}) {
  const summary = provenanceSummary(entityId);
  if (summary.claims === 0 && externalRecords.length === 0) return null;
  const ledgerHref = buildRoutePath(language, "sources");
  const correctionsHref = buildRoutePath(language, "corrections");

  return (
    <section className="guide-section provenance" aria-labelledby={`provenance-${entityId}`}>
      <h2 id={`provenance-${entityId}`}>{t("sourcesTitle", language)}</h2>
      <TrustLine entityId={entityId} language={language} />
      {summary.sources.length > 0 && (
        <>
          <p className="guide-notice" role="note">{t("sourcesNote", language)}</p>
          <ul className="source-list">
            {summary.sources.map((source) => (
              <SourceEntry key={source.id} source={source} language={language} onNavigate={onNavigate} />
            ))}
          </ul>
        </>
      )}
      {externalRecords.length > 0 && (
        <div className="provenance-external">
          <h3>{t("externalTitle", language)}</h3>
          <p className="guide-notice" role="note">{t("externalNote", language)}</p>
          <ul className="entity-sources-list">
            {externalRecords.map((url) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer nofollow">
                  {hostLabel(url)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="provenance-ctas">
        <a className="entity-inline-link" href={ledgerHref} onClick={onLink(ledgerHref, onNavigate)}>
          {t("ledgerCta", language)} →
        </a>
        <a className="entity-inline-link" href={correctionsHref} onClick={onLink(correctionsHref, onNavigate)}>
          {t("correctionsCta", language)} →
        </a>
        {/* The invitation is the point of the whole layer: a site that can be
            corrected is a different kind of object from one that cannot. */}
        <a className="entity-inline-link" href={`${correctionsHref}#report`} onClick={onLink(`${correctionsHref}#report`, onNavigate)}>
          {t("suggestCta", language)} →
        </a>
      </p>
    </section>
  );
}

function hostLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
