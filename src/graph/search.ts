import type { LanguageCode } from "../locales/types";
import {
  aliasesOfKind,
  entities,
  entityAliases,
  entityName,
  entityPoint,
  entityShortText,
  namespaceDefOf,
  regionOf,
} from "./index";
import { claimsFor, lastReviewed, trustSignals } from "./ledger";
import { searchKey, searchTokens } from "./text";
import type { Entity } from "./schema";

// ─────────────────────────────────────────────────────────────
// The static search index (M5, Part 6, ADR-018).
//
// `MASTER_ARCHITECTURE_BLUEPRINT.md` §10 puts internal search in Phase 2 as "a
// static prebuilt index shipped to the client", with three design rules: the
// index is derived and rebuildable, never hand-maintained; the read path adds no
// server dependency; and search never invents an entity. This module is that
// index, and it obeys all three by construction — it is a pure function of the
// graph, so it cannot contain a thing the graph does not.
//
// What M5 ships is the index, not a search box. A search field is a change to how
// people move through the site, and navigation is frozen; adding one would be a
// redesign wearing a feature's clothes. The index is the half that has to exist
// first, is useful the moment it exists (the AI export and `alternateName` read
// the same alias data), and lets the UI be added later as one component over a
// file that is already correct and already tested by the build.
//
// The folding is the substance. A site publishing Bulgarian names to a fourteen-
// language audience is asked for "Prohodna" as often as "Проходна", and for "the
// Eyes of God" more often than either. Every entry therefore carries:
//
//   • its name in each knowledge-tier language,
//   • every alias — historical names, local usage, variant spellings,
//   • both of those folded through the official Cyrillic→Latin transliteration
//     and stripped of diacritics and punctuation, as match keys.
//
// A query is folded the same way and compared against the keys, so the script a
// visitor happens to type in stops mattering.
// ─────────────────────────────────────────────────────────────

/** The languages the index carries names in — the knowledge tier (rule 43). */
export const INDEX_LANGUAGES: LanguageCode[] = ["bg", "en"];

export type SearchEntry = {
  /** The language-agnostic page path. The URL is `/<lang>` + this. */
  path: string;
  kind: string;
  /** The namespace or region root the page lives under, for grouping results. */
  group: string;
  /** The region partition, so a multi-region site can scope a search. */
  region?: string;
  /** Display name per knowledge-tier language. */
  name: Record<string, string>;
  /** One-line description per knowledge-tier language. */
  summary: Record<string, string>;
  /** Other names, per language — what makes an alias findable. */
  aliases: Record<string, string[]>;
  /** Folded match keys: names and aliases, transliterated and stripped. */
  keys: string[];
  /** Folded single words from all of the above, for prefix and partial matching. */
  tokens: string[];
  lat?: number;
  lon?: number;
  /** How much the page holds, so an index can rank a full page above a thin one. */
  claims: number;
  /** Plain-language trust signals, so a result can say how well it is held. */
  signals: string[];
  reviewed?: string;
};

export type SearchIndex = {
  /** Bumped when the entry shape changes, so a stale client can tell. */
  version: number;
  languages: LanguageCode[];
  entries: SearchEntry[];
};

const INDEX_VERSION = 1;

function entryFor(entity: Entity): SearchEntry {
  const name: Record<string, string> = {};
  const summary: Record<string, string> = {};
  const aliases: Record<string, string[]> = {};
  const keys = new Set<string>();
  const tokens = new Set<string>();

  for (const lang of INDEX_LANGUAGES) {
    name[lang] = entityName(entity, lang);
    summary[lang] = entityShortText(entity, lang);
    aliases[lang] = entityAliases(entity, lang);
    for (const value of [name[lang], ...aliases[lang]]) {
      const key = searchKey(value);
      if (key) keys.add(key);
      for (const token of searchTokens(value)) tokens.add(token);
    }
    // The summary contributes tokens but never a key: a page should be findable
    // by a word in its description, and must not be *identified* by one.
    for (const token of searchTokens(summary[lang])) tokens.add(token);
  }

  const point = entityPoint(entity);
  const namespace = namespaceDefOf(entity);
  const region = regionOf(entity);

  return {
    path: entity.page!.path,
    kind: entity.kind,
    group: namespace?.id ?? region?.rootRouteId ?? "place",
    region: region?.id,
    name,
    summary,
    aliases,
    keys: [...keys].sort(),
    tokens: [...tokens].sort(),
    ...(point ? { lat: point.lat, lon: point.lon } : {}),
    claims: claimsFor(entity.id).length,
    signals: trustSignals(entity.id),
    reviewed: lastReviewed(entity.id),
  };
}

/**
 * The whole index, in a stable order. Only published pages: search that resolves
 * to a draft is search that invents a page (`SEARCH_INTENT_MAP.md` §4 rule 4).
 */
export function buildSearchIndex(): SearchIndex {
  return {
    version: INDEX_VERSION,
    languages: INDEX_LANGUAGES,
    entries: entities
      .filter((entity) => entity.page?.status === "published")
      .map(entryFor)
      .sort((a, b) => a.path.localeCompare(b.path)),
  };
}

/**
 * Resolve a typed query against an index. Lives here rather than in the client so
 * the build can assert that the alias a record carries actually finds the page it
 * belongs to — a search index nobody has queried is a file, not a feature.
 *
 * Ranking is deliberately blunt and explainable: an exact folded name beats a
 * prefix, a prefix beats a word match, and a page holding more sourced claims
 * beats a thinner one at the same rank. Nothing here scores by popularity,
 * because the site measures none.
 */
export function searchIndexFor(index: SearchIndex, query: string, limit = 10): SearchEntry[] {
  const key = searchKey(query);
  if (!key) return [];
  const words = key.split(" ");
  const scored: Array<{ entry: SearchEntry; score: number }> = [];

  for (const entry of index.entries) {
    let score = 0;
    if (entry.keys.includes(key)) score = 100;
    else if (entry.keys.some((candidate) => candidate.startsWith(key))) score = 70;
    else if (entry.keys.some((candidate) => candidate.includes(key))) score = 50;
    else {
      const hits = words.filter((word) => entry.tokens.some((token) => token.startsWith(word))).length;
      if (hits === words.length) score = 30;
      else if (hits > 0) score = 10 * hits;
    }
    if (score > 0) scored.push({ entry, score: score + Math.min(entry.claims, 9) });
  }

  return scored.sort((a, b) => b.score - a.score || a.entry.path.localeCompare(b.entry.path)).slice(0, limit).map((row) => row.entry);
}

/**
 * Every alias in the graph with the page it should lead to. The build uses this
 * to prove the index does its job; nothing renders it.
 */
export function aliasExpectations(): Array<{ query: string; path: string; kind: string }> {
  const rows: Array<{ query: string; path: string; kind: string }> = [];
  for (const entity of entities) {
    if (entity.page?.status !== "published") continue;
    for (const kind of ["historical", "variant", "local", "official", "scientific"] as const) {
      for (const alias of aliasesOfKind(entity, kind)) {
        for (const value of Object.values(alias.name)) {
          if (typeof value === "string" && value.trim()) rows.push({ query: value, path: entity.page.path, kind });
        }
      }
    }
  }
  return rows;
}
