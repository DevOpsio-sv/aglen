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

Nothing in `docs/` is implemented yet — the documents are architecture and analysis
only. Treat them as the spec that new implementation work must satisfy.
