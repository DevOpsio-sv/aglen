# Aglen / Unlocking Bulgaria — project instructions

The architecture library in `docs/` is the standing source of truth: **Phase 2 —
Knowledge Architecture** (ten documents) and **Phase 3 — System Architecture**
(`EXPERIENCE_ARCHITECTURE.md`, `KNOWLEDGE_PIPELINE.md`,
`EDITORIAL_OPERATING_SYSTEM.md`, and the integrating
`docs/MASTER_ARCHITECTURE_BLUEPRINT.md`). See `docs/README.md` for the index and
reading order.

## Architectural governance (non-negotiable)

1. **Every new feature, page, component and pull request must comply with
   `docs/MASTER_ARCHITECTURE_BLUEPRINT.md`** — in particular its Architectural
   Constitution (§20, the 50 rules) and its ADRs (§18). Before adding or changing
   anything, check the relevant constitution rules and ADRs. A change that violates
   a rule is wrong regardless of its merits until the rule is deliberately amended.

2. **No new architecture documents may be created.** Architecture is changed only
   by *extending or amending the blueprint through a new ADR* in §18 (and, where
   the change is about people/process, an editorial RFC per
   `docs/EDITORIAL_OPERATING_SYSTEM.md` §11.2). Do not add sibling design docs that
   sit outside this structure.

3. **The four constitutions are supreme in their domains** and settle conflicts by
   the precedence in `MASTER_ARCHITECTURE_BLUEPRINT.md` §20.6: the Architectural
   Constitution (blueprint §20), the Experience Principles
   (`EXPERIENCE_ARCHITECTURE.md` §10), the Pipeline principles
   (`KNOWLEDGE_PIPELINE.md` §11), and the Editorial Constitution
   (`EDITORIAL_OPERATING_SYSTEM.md` §16). Safety and reality win over everything;
   unresolved conflicts are settled by RFC, never by drift.

## The load-bearing invariants (blueprint §1.4 — check work against these first)

- The graph is the single source of truth; pages, links, JSON-LD, sitemaps, the
  search index and the AI export are **derived**, never hand-authored.
- Nothing indexed is unsourced; unknown/uncertain/disputed are rendered states,
  not silent omissions.
- Evolve, never rewrite: ship additively beside the running site; no phase rewrites
  `App.tsx`.
- Reversibility is mandatory: corrections supersede (never delete), retirements are
  301s, the graph lives in Git.

Treat the documents as the spec that new implementation work must satisfy. As of
M5 (2026-07-26) that spec is implemented through Phase 2 of the roadmap: the entity
graph, the claim ledger, the trust layer, the region registry and the build gates
are live. `docs/IMPLEMENTATION_PLAN.md` §13 records what shipped and where the
implementation deliberately diverged.

## Where new work goes (M5, ADR-016)

`src/graph/registry.ts` declares the graph's shape: the regions, the URL
namespaces and which entity kind belongs in which. It is the answer to "where does
this go?", and `reports/authoring-map.md` is that answer generated for a human.
**Adding a region, a namespace or a kind means editing that table — never
scattering the knowledge of it across routes, SEO, chrome and the audits again.**

Four checks run in the build, and the split between them is deliberate (ADR-017):

| Command | Subject | Fails the build? |
|---|---|---|
| `npm run validate` | records only, in seconds | yes |
| `npm run graph:audit` | the knowledge graph | yes |
| `npm run site:audit` | the rendered HTML in `dist/` | yes |
| `npm run health` | quality: thin pages, weak titles, gaps | **never** |

Correctness gates. Quality reports. Do not move a check across that line without
an ADR — a gate that fires on thin content acquires exceptions and stops being a
gate.
