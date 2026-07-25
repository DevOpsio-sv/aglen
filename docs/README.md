# Architecture documents

Analysis and architecture only; **no code has been changed** and nothing here is
implemented.

- **Phase 1** (see `../reports/seo-audit-2026-07-24.md`) fixed the technical layer.
- **Phase 2 — Knowledge Architecture** (ten documents) asks a different question:
  not *how does this site rank*, but *does this site model the Lukovit Karst well
  enough that a search engine or an AI assistant would treat it as the source*.
- **Phase 3 — System Architecture** (four documents) turns that model into a
  buildable system: the human experience, the data pipeline, the editorial
  institution, and the master blueprint that integrates all of them.

## Phase 2 — read in this order

| # | Document | What it decides |
|---|---|---|
| 1 | [TOPICAL_AUTHORITY_MAP.md](TOPICAL_AUTHORITY_MAP.md) | The subject, the inventory (~170 entities), and the strategic thesis |
| 2 | [KNOWLEDGE_GRAPH.md](KNOWLEDGE_GRAPH.md) | The node/edge model, entity confidence, distances, `sameAs` strategy |
| 3 | [CONTENT_HIERARCHY.md](CONTENT_HIERARCHY.md) | URL architecture, page anatomy, migration from the current routes |
| 4 | [SEARCH_INTENT_MAP.md](SEARCH_INTENT_MAP.md) | 44 intents, coverage (20% served today), user journeys |
| 5 | [PROGRAMMATIC_SEO_PLAN.md](PROGRAMMATIC_SEO_PLAN.md) | What may be generated at scale, and the five gates that decide |
| 6 | [INTERNAL_LINKING_GRAPH.md](INTERNAL_LINKING_GRAPH.md) | Links derived from relations; anti-orphan rules; authority routing |
| 7 | [ENTITY_PRIORITY_MATRIX.md](ENTITY_PRIORITY_MATRIX.md) | Every entity ranked, with falsification conditions |
| 8 | [CONTENT_GAP_ANALYSIS.md](CONTENT_GAP_ANALYSIS.md) | Gap by gap, with ROI and blockers |
| 9 | [EEAT_STRATEGY.md](EEAT_STRATEGY.md) | Author, claim ledger, field evidence, institutions |
| 10 | [5_YEAR_SEO_ROADMAP.md](5_YEAR_SEO_ROADMAP.md) | Sequencing, relative impact, risks |

## Phase 3 — read after Phase 2

| # | Document | What it decides |
|---|---|---|
| 1 | [EXPERIENCE_ARCHITECTURE.md](EXPERIENCE_ARCHITECTURE.md) | How a human progressively discovers and emotionally connects with the karst; the experience layers, loops and 20 experience principles |
| 2 | [KNOWLEDGE_PIPELINE.md](KNOWLEDGE_PIPELINE.md) | The reality→evidence→claim→entity→graph→pages→AI→correction lifecycle; versioned, traceable, reversible ("Wikipedia + Git") |
| 3 | [EDITORIAL_OPERATING_SYSTEM.md](EDITORIAL_OPERATING_SYSTEM.md) | Governance, roles, trust ladder, workflows, SLAs, metrics and the 20-rule Editorial Constitution for a 20-year, multi-contributor project |
| 4 | [MASTER_ARCHITECTURE_BLUEPRINT.md](MASTER_ARCHITECTURE_BLUEPRINT.md) | The single implementation blueprint: subsystems, domain model, graph runtime, build pipeline, ADRs, roadmap and the 50-rule Architectural Constitution — integrates all thirteen documents |

## Reviews (gate artifacts, not architecture)

These review the docs and the live implementation and recommend changes. They are
**not** architecture documents: per the governance rule (root `CLAUDE.md`),
architecture changes only through ADRs against the blueprint or editorial RFCs, and
these reviews' recommendations are written in that form.

| Document | What it assesses |
|---|---|
| [SITE_AUDIT.md](SITE_AUDIT.md) | Independent external audit of the live site (technical SEO, performance, content, accessibility) |
| [MASTER_ARCHITECTURE_REVIEW.md](MASTER_ARCHITECTURE_REVIEW.md) | Architecture Review Board reconciliation of all fourteen docs against the implementation; confirms/refutes the audit; proposes ADR-010–012; ends in an approval recommendation |
| [INFORMATION_ARCHITECTURE_REVIEW.md](INFORMATION_ARCHITECTURE_REVIEW.md) | User-mental-model review of navigation and content hierarchy; the five competing hierarchies, concept de-duplication, and Unlocking Bulgaria as an integrated external product |
| [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) | Execution plan for the approved reviews: gap analysis, route classification, canonical URL map, navigation tree, breadcrumb & UB-integration specs, redirect plan, exact files, milestones (M0–M4). No code changed until reviewed |

## The three findings everything else follows from

1. **The site's subject is inverted.** It models a village with a region
   attached; the world is the other way round. Aglen is a sibling of Karlukovo
   inside the Lukovit Karst, not a parent of it. Brand stays Aglen; subject
   becomes the karst.

2. **The site has no entities.** `region.ts` correctly identifies nine
   externally-verified places with Wikidata ids and coordinates — and not one of
   them has a URL. There are 27 keyword pages, 6 guides and 13 business listings,
   and zero pages whose subject is a real-world thing.

3. **The best content is unreachable.** Roughly 4 000 words on the Lower
   Cretaceous limestones, Late Neolithic flint workshops, Thracian sanctuaries,
   the Nikopol sanjak tax registers, two competing etymologies and the writer
   Trifon Kunev sit inside `locales/bg.ts` and render into a home-page modal. No
   URL, no headings, no schema, nothing to cite. **Publishing it costs two days
   and requires no new writing.**

## Verification legend, used throughout

| Mark | Meaning |
|---|---|
| ✅ | In this repository, already published |
| 🟢 | Externally verifiable now (Wikidata / Wikipedia / official register) |
| 🔶 | Believed true from general knowledge — **must be sourced before publishing** |
| ⬜ | Unknown; needs field work, an archive, or an interview |
| 🔴 | Known gap where the site publishes nothing and should say so |

Nothing marked 🔶 in these documents has been verified. Several entity names —
the Karlukovo cave inventory, the villages of Lukovit municipality, the Natura
2000 designations — come from general knowledge and are flagged accordingly. The
project's existing discipline of refusing to publish unverified facts applies to
this analysis too.
