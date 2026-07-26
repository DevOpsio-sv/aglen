import type { MouseEvent } from "react";
import type { LanguageCode } from "../locales/types";
import { buildRoutePath, buildSourcePath } from "../routes";
import type { EntityId } from "./schema";
import { SOURCE_KIND_LABELS, TRUST_SIGNAL_LABELS, localizeChrome } from "./namespaces";
import { editorialClaims, narrate } from "./editorial";
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
        )}
      </p>
      <p className="source-meta">
        {[sourceKindLabel(source, language), verificationLabel(source, language), source.license, source.accessedAt]
          .filter(Boolean)
          .join(" · ")}
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

