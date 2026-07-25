# Master Architecture Review & Reconciliation

**Independent Architecture Review Board** · reviewed 2026-07-25 · against the
fourteen architecture documents, the external `SITE_AUDIT.md`, and — decisively —
the live implementation source (`src/seo.ts`, `scripts/generate-static-routes.mjs`,
`public/robots.txt`, `src/routes.ts`, `src/region.ts`, the committed asset tree).

**Board perspectives represented:** Principal Software Architect · Principal
Product Architect · Principal UX Architect · Principal SEO Architect · Knowledge
Graph Architect · Information Architect · Technical SEO · a simulated Google Search
Quality Engineer · an AI-Search architect (ChatGPT/Gemini/Claude/Perplexity) ·
Editorial Systems Architect.

**Standing this document holds.** This is a *review and reconciliation*, not a new
architecture. Per the project governance rule (root `CLAUDE.md`), architecture
changes only through ADRs against `MASTER_ARCHITECTURE_BLUEPRINT.md` §18 or
editorial RFCs. Every recommendation below is therefore written as a proposed **ADR**
or **RFC**, not as free-standing design. Nothing here is implemented.

**Method note the Board insists on.** Where the external audit made a black-box
inference (no JS rendering, PageSpeed timeouts), the Board verified against the
source and reports the source truth. *We did not trust documentation over
implementation, and we did not trust the audit over implementation either.* Marks:
✅ verified in source/live · 🔶 inferred, needs a live check · 🔴 confirmed defect ·
⚖️ a judgement call the Board is making.

---

## 1. Executive summary

This is, on the evidence, **one of the strongest small-project architectures the
Board has reviewed** — and its single most dangerous property is that its strength
is almost entirely *on paper*, while a handful of *live* misconfigurations quietly
work against the whole thesis.

The strategy is right and rare. The reframing from "a village with a region
attached" to "a karst region narrated from a village" (`TOPICAL_AUTHORITY_MAP.md`
§0) is correct and is the precondition for everything. The claim-ledger /
provenance model (`KNOWLEDGE_PIPELINE.md`, `EEAT_STRATEGY.md`) is exactly what an
AI-mediated search era rewards. The refusal to publish what cannot be verified —
already live in `guides.ts` and `region.ts` — is a genuine, durable moat that most
national tourism boards lack.

But the Board finds a **structural gap between the architecture and the running
system**, and it is not the gap the documents worry about:

1. **The whole edifice points at a domain that reads as spam.** `SITE_URL =
   "https://xn--c1aerj5d.com"` (✅ `src/seo.ts:26`). Every canonical, `og:url`,
   JSON-LD `@id`, sitemap and hreflang alternate resolves to the Cyrillic IDN
   `ъглен.com`, while `aglen.bg` serves 200 OK as a cross-canonicalised duplicate.
   No architecture document decides the canonical domain. This is the largest
   unmanaged risk in the entire programme and it is a one-constant fix.
2. **A Cloudflare edge default is sabotaging the AI-citation thesis.** The
   project's *own* `public/robots.txt` is clean and explicitly welcomes GPTBot,
   ClaudeBot, PerplexityBot, Google-Extended (✅ verified). The contradiction the
   audit found is injected by a **Cloudflare "managed robots" / AI-block feature at
   the edge** (`Content-Signal: ai-train=no`, Disallow ClaudeBot/GPTBot). The
   entire Phase-2/3 strategy is *to be cited by assistants*; an edge toggle is
   currently telling those assistants to stay out. Trivial to fix, invisible unless
   you look at the dashboard rather than the repo.
3. **The best content and the real subject still have no pages.** Confirmed and
   already the documents' central finding — the nine Wikidata-verified places are
   rich JSON-LD *nodes* (✅ `placeNodes()` in `seo.ts`) but have no URLs of their
   own, and ~4000 words of history render into a home-page modal.
4. **The live navigation exposes the implementation, and the product boundary with
   Unlocking Bulgaria is undefined** (C16). The menu mirrors the home-page sections
   rather than the visitor's questions; Unlocking Bulgaria is at once a menu category
   ("AR мисии"), a campaign, an application, and a standalone landing that repeats the
   home hero. It is an *independent national product* for which Aglen is the first
   destination — not a feature of the village, and not the village's identity. This
   must be resolved (ADR-013) *before* new entity pages are built, or every page
   inherits the ambiguity.

The Board's verdict: **APPROVE WITH CONDITIONS** (§15.12). The conditions are
mostly reconciliation and configuration, not rework — which is the correct outcome
for an evolutionary, no-rewrite programme. The paper architecture needs *less* than
it thinks (defer the governance apparatus and the incremental-build machinery); the
*live* system needs a focused fortnight it has not yet had.

---

## 2. Reconciliation with the external audit — confirm or refute

The Board was asked to either confirm the audit or prove it wrong. Verified against
source, the audit is **directionally excellent and technically imprecise in three
places that matter**. This scorecard is the most load-bearing section of the review.

| Audit claim | Board verdict | Evidence |
|---|---|---|
| Canonical domain is the Cyrillic IDN `ъглен.com`; `aglen.bg` is a duplicate | **CONFIRMED 🔴** | `SITE_URL="https://xn--c1aerj5d.com"` (`seo.ts:26`); every canonical/og/schema/sitemap derives from it |
| Default canonical should be Latin `aglen.bg`; 301 the other | **CONFIRMED ⚖️** | Reinforced by `TOPICAL_AUTHORITY_MAP.md` §0 — "the brand is Aglen." IDN punycode reads as phishing to 13 non-Cyrillic audiences. Board concurs strongly |
| robots.txt is self-contradictory for AI crawlers | **CONFIRMED at the live layer, ROOT CAUSE CORRECTED 🔴** | The *repo* `public/robots.txt` is clean and Allows all AI bots (✅). The contradictory block is **Cloudflare-injected** at the edge. Fix is a dashboard toggle, not a file edit — the audit didn't identify the source |
| Title tags lead with the campaign ("AR мисии"), not the query | **CONFIRMED 🔴** | `home` title = `hero.subtitle | nav.quests` (`seo.ts:261`); `siteName = nav.quests` (`seo.ts:361`) |
| Brand is fragmented | **CONFIRMED 🔴** | `og:site_name`="AR мисии" (`nav.quests`), `author`/`Organization`="Aglen Tourism / Ъглен Туризъм", `alternateName`="unlockingbulgaria" (`seo.ts:361,360,817`) |
| `meta keywords` present and obsolete | **CONFIRMED** | `keywordsForRoute()` emits a stuffed keywords tag (`seo.ts:300,136`). Drop it |
| The nine region entities have no pages | **CONFIRMED** (matches Phase-2 #2) | `regionPlaceNode()` sets `url` → a guide/landing page, never a dedicated entity URL (`seo.ts:524`) |
| **JSON-LD is likely missing; add it** | **REFUTED ✅** | `generate-static-routes.mjs:173` injects the full `buildJSONLD()` graph into the prerendered `<head>`. Schema is comprehensive, Wikidata-linked, one-`FAQPage`-per-page, correct `LocalBusiness` subtypes. **Action is validate, not add** |
| **hreflang possibly missing** | **REFUTED ✅** | `alternates` includes `x-default` + all 14 languages, rendered at build (`renderAlternateLinks`, `seo.ts:378`). Action: verify live + reconcile with the two-tier language plan |
| `og:locale:alternate` lists only `hu_HU` | **PARTLY REFUTED 🔶** | Source generates *all* alternates (`ogLocaleAlternates`, `seo.ts:382`). Live showing one suggests a stale deploy or an insert bug — verify the deployed build matches HEAD |
| Structured data "is how entities become citable" | **CONFIRMED as intent, already partly built** | The schema exists; what's missing is the *pages* the schema should describe, not the schema itself |

**The audit's meta-error, stated plainly:** a black-box audit with no JS rendering
under-credited a genuinely strong prerendered SSG implementation and over-stated
technical gaps (schema, hreflang), while correctly identifying the *strategic*
ones (domain, robots, brand, titles, entity pages). The Board's guidance: **act on
the strategic findings with confidence; do not "add JSON-LD" — validate the rich
JSON-LD that already ships, and give it entities to describe.**

---

## 3. Architectural consistency — contradictions found

The mission was to find every inconsistency across the documents *and* between the
documents and the implementation. Fifteen, ranked by consequence.

| # | Contradiction | Between | Why it exists | Resolution |
|---|---|---|---|---|
| C1 | **Canonical domain undecided** | all docs assume "aglen.bg" ↔ `seo.ts` hardcodes the IDN | The docs were written about strategy; the implementation predates them and chose the Cyrillic name | **ADR-010** (§13): choose `aglen.bg`, 301 the IDN, flip `SITE_URL` |
| C2 | **AI-crawler access** | Phase-2/3 "be cited by AI" ↔ Cloudflare edge block | Cloudflare's managed-robots/AI-block default was left on | **RFC (§15.4b)**: disable the Cloudflare AI-block and decide access by *purpose* — search/citation vs user-retrieval vs training — not by a blanket allow |
| C3 | **Brand identity** | `TOPICAL_AUTHORITY_MAP` "brand is Aglen" ↔ `og:site_name`="AR мисии" ↔ `unlockingbulgaria` | Two distinct products (the village site and the national AR product) share one codebase and never resolved which is the site identity | **ADR-011** (brand strings): `Organization`/`og:site_name` = "Aglen Tourism / Ъглен Туризъм"; "AR мисии / Unlocking Bulgaria" is never `siteName`. The product model is **ADR-013** — Unlocking Bulgaria is an independent `SoftwareApplication`, **not** a `subOrganization` |
| C4 | **Entity count is stated three ways** | ~170 (`TOPICAL` inventory) ↔ ~34 pages (`CONTENT_HIERARCHY`) ↔ 9 (audit) | Three different denominators (all real-world things / things earning a page / externally-verified anchors) never put on one axis | One number line in the blueprint: 9 anchors ⊂ ~34 page-worthy ⊂ ~170 modelled. Not a real contradiction; a labelling gap |
| C5 | **Language strategy** | Two-tier bg+en (`TOPICAL` §3.3) ↔ live indexes all 14 ↔ audit assumes 14 need hreflang | The tiering plan is unbuilt; hreflang currently advertises 12 unreviewed machine languages as indexable | Reconcile: implement tiering *before* fixing hreflang, so hreflang points only at indexable tiers |
| C6 | **`TouristDestination` as an entity type** | `seo.ts` emits `TouristDestination` per landing page ↔ `KNOWLEDGE_GRAPH` §2 "`TouristDestination` is a *view* type, not an entity type" | The schema was written before the entity/view distinction was formalised | Low priority: migrate entity schema to `Landform`/`Place`/`Cave` types as entity pages are built |
| C7 | **`dateModified` still emitted** | `seo.ts` stamps `SITE_CONTENT_UPDATED` ↔ EEAT/OS "per-page provenance, not a build stamp" | Half-migrated: hand-stamped (good) but still a single global date (not per-page) | Replace with the provenance footer as the claim ledger lands |
| C8 | **"No server" ↔ a `_worker.js` exists** | blueprint ADR-003 ↔ `public/_worker.js`, `/cdn-cgi/` | The worker does edge routing (`/`→`/bg`), not knowledge serving | Clarify ADR-003: "no request-time rendering of *knowledge*"; edge routing is permitted |
| C9 | **Media in Git ↔ longitudinal photography at scale** | 166 committed image files ↔ EEAT "same viewpoint, same date, across years" × thousands of entities | Static-site instinct put assets in the repo; the knowledge model wants far more | **ADR-012**: media to object storage (R2), graph holds `uri`+`hash` |
| C10 | **Star-shaped internal linking** | `INTERNAL_LINKING_GRAPH` §0 ↔ live `internalLinkRouteIds` still hand-authored | Linking predates the derive-from-relations rule | Already scheduled (delete the arrays); confirm in Phase 2 |
| C11 | **Karst-as-root ↔ brand visibility** | `CONTENT_HIERARCHY` §6 objection ↔ `ENTITY_PRIORITY` §6 falsifier 5 | The docs themselves flag it as an open tension | Keep `/` as Aglen home, `/karst/` as first-class hub (the documented fallback); revisit on data |
| C12 | **AR "quests" as `siteName` ↔ AR as a modern invention** | `seo.ts` elevates AR to brand ↔ `TOPICAL` C2 "Пазителят is modern, never mixed with folklore" | Marketing prominence vs knowledge discipline | Demote AR to campaign sub-brand (see C3) |
| C13 | **Governance apparatus vs one contributor** | `EDITORIAL_OPERATING_SYSTEM` 6 bodies + T0–T5 + federation ↔ one author today | The OS admits this (§2.1) | Defer the apparatus; keep the *rules* as build gates (§12) |
| C14 | **Incremental-build machinery vs 170 entities** | `KNOWLEDGE_PIPELINE` §9.4 frontier ↔ a full rebuild of 170 entities is trivial | Designed for 10⁵ before 10² exists | Defer the frontier; full rebuild until it hurts (§12) |
| C15 | **"strong structured data ✅" (internal Phase-1) ↔ "likely missing" (external audit)** | two audits disagree | One read the source, one couldn't render | Resolved by §2: schema is present; validate it |
| C16 | **Live navigation duplicates and flattens different domain concepts** | Knowledge Graph + Experience Arch ↔ the live menu (`App.tsx:366`) and Unlocking Bulgaria routes | The nav was derived from the home sections, and Unlocking Bulgaria is at once a menu category ("AR мисии"), a campaign, an application, and a standalone landing experience on `unlockingbulgaria.com` | **ADR-013** (§15.4a): Places, experiences, events and businesses are *different kinds* of thing and must not be parallel top-level destinations; Unlocking Bulgaria has one defined product role |

None of these is fatal. C1, C2, C3 are urgent and cheap. C13, C14 are the Board
telling the architecture to *do less now*. The rest are scheduled or cosmetic.

---

## 4. Domain model review

The domain model (`MASTER_ARCHITECTURE_BLUEPRINT.md` §3, `KNOWLEDGE_PIPELINE.md` §3)
is **sound, expressive, and correctly normalised**. The Board challenged every
concept for duplication and scale.

**Every concept is represented and each earns its place.** The `Observation →
Evidence → Claim → Entity` spine with bidirectional provenance is the right shape;
the `Source` vs `Evidence` split (what you cite vs what you hold) is precisely what
lets this project prove *Experience*, which no competitor can. `Dispute` /
`disputeOf` vs `supersedes` is not over-modelling — it is demanded by a real case
(the two Ъглен etymologies).

**Challenges the Board raised, and their resolution:**

- *Is `Observation` distinct from `Evidence` over-modelled?* No — one visit
  produces many artifacts; keep it. But at 10² entities, **do not build the
  `Observation` layer until the first field day exists**; it is a Phase-2 type, not
  a Phase-1 one.
- *`Media` is `Evidence` is also a renderable — three roles, one record.* Correct
  and elegant. The risk is not the model; it is *storage* (C9): binary blobs do not
  belong in Git at scale. → ADR-012.
- *`Contribution`/`Review` vs Git commits — duplication?* Mild. A Contribution *is*
  a proposed commit; a Review *is* an approval. The Board's guidance: **do not build
  `Contribution`/`Review` as data types until there is a second contributor** — until
  then a PR *is* the Contribution and a merge *is* the Review. Model them when the
  authoring UI arrives (blueprint ADR-004), not before.

**Scale test — the Board's explicit ask:**

| Scale | Verdict | Constraint that binds first |
|---|---|---|
| 100 entities | ✅ trivial | none; a full rebuild is milliseconds |
| 1,000 | ✅ fine | build time; still full-rebuild |
| 10,000 | ✅ with the frontier | full rebuild starts to hurt → turn on incremental (defer until here) |
| 100,000 claims | ✅ with partitioning | Git repo weight if media is co-located (C9); regional partitioning (ADR-009) |
| **The real limit** | **⚖️ human, not machine** | review throughput and field-work capacity, not the data model |

The model scales. The bottleneck at every real horizon is *people who verify*, not
bytes — which is why the Board's scaling advice (§10) is about deferring machinery
and protecting reviewer capacity, not about the schema.

---

## 5. Knowledge graph review

The graph architecture (`KNOWLEDGE_GRAPH.md`, blueprint §4) answers the Board's six
tests:

- **Can every page derive from the graph?** ✅ For entity, cluster, view, history,
  route pages — yes, and the current `placeNodes()`/`regionPlaceNode()` code already
  derives schema from `region.ts`, proving the pattern. The one honest exception is
  handcrafted narrative (history/legend prose), which is correctly modelled as *an
  entity with claims* rather than as free text.
- **Is provenance preserved?** ✅ By design, bidirectionally (V4). This is the
  strongest part of the whole architecture.
- **Are relationships expressive enough?** ✅ The typed `Relation` set covers
  containment, proximity, formation, watershed, birthplace, supersession. The Board
  found one gap: **no `partOf`/`memberOf` for a route's ordered stops beyond
  `stops[]`, and no temporal edge** (period → period succession). Minor; add when
  the history cluster is built.
- **Can AI consume it?** ✅ Claims-with-sources + confidence is the ideal RAG
  substrate; the MCP surface (deferred) is the right endpoint.
- **Can Google understand it?** ✅ The live JSON-LD already speaks Google's dialect
  (Wikidata `sameAs`, `containedInPlace`, `geo`). The gap is entity *pages*, not
  entity *markup*.
- **Can humans edit it?** ⚖️ **This is the graph's weakest axis.** Today it requires
  editing TypeScript (`region.ts`). The blueprint's ADR-004 (authoring surface
  evolves PR→forms→UI over a fixed schema) is the right answer, but it is a promise,
  not a mechanism. Until the schema moves from hand-written TS to
  schema-validated records (blueprint's own recommended improvement), non-engineers
  cannot contribute — which throttles the entire Editorial OS. **The Board elevates
  this: the JSON-records-validated-by-schema migration is not a nice-to-have; it is
  the unlock for every human-contribution goal in the programme.**

Weakness identified: the graph is *machine-excellent and human-hostile* today, and
the documents under-weight how much the second problem gates the first.

---

## 6. Experience architecture review

`EXPERIENCE_ARCHITECTURE.md` is, in the Board's assessment, the **most original
document in the set** and the one most likely to be ignored under delivery pressure —
which would be the costliest possible mistake.

- **Does it create curiosity/exploration/wonder/return, or merely information?** The
  *design* creates all four; the *live site* creates none of them, and the document
  diagnoses exactly why: "minute 5 never arrives" — there is nothing to discover, so
  curiosity felt at minute 1 goes out at minute 2. The Board confirms this against
  the implementation: the home page is a 13-section scroll (`pageSections.ts`) and
  every route is a crop of it, so navigation *is* scrolling one document to anchors.
- **Dead ends:** confirmed — the "Ъ" fact is an inert stat tile; the history is a
  modal with no URL; the internal-link star funnels toward the thinnest pages.
- **Repetitive experiences:** confirmed — 25 of 27 landing pages share three section
  bodies (`landingPages.ts`).
- **Missed opportunities:** the AR quests (`quests`/`ar`/`app` sections) are a
  *working L5 surface* already shipped, but disconnected from any entity graph — the
  single highest-leverage integration nobody has scheduled.

The Board's one caution to the experience document: its principles 3 ("never end on
a full stop") and 4 ("specificity over adjective") are *editorial* obligations that
will collide with volume pressure. They must be enforced as review-gate checklist
items (Editorial OS §5), or they will erode. **The experience architecture is only
as real as the editorial gate that defends it.**

---

## 7. Implementation architecture review

**Can a small team realistically build this?** ✅ Yes — *if* it builds the phases
in order and resists the two temptations below. The evolutionary strategy (additive
routes beside the running site; absorb `region.ts`; never rewrite `App.tsx`) is
correct and the codebase is unusually well-disciplined (the existing
`i18n-audit.mjs`, the honest `region.ts` geometry, the publication state machine)
which means the team demonstrably *can* hold invariants.

**Where complexity will explode, and the Board's ruling:**

| Risk area | Verdict | Ruling |
|---|---|---|
| The frontier / incremental build (`KNOWLEDGE_PIPELINE` §9.4) | over-engineered *for now* | **Defer.** Full rebuild until it exceeds ~60s. Do not build cache-invalidation machinery for 170 entities |
| The full editorial governance (6 bodies, T0–T5, federation) | over-engineered *for now* | **Defer the org chart; keep the rules.** Implement the two-person rule and the confidence gates as `graph-audit.mjs` checks; do not staff a Board of one person wearing six hats |
| `graph-audit.mjs` enforcing 4 rule-sets (health + G1–G5 + anti-orphan + V1–V15) | correctly engineered | **Build it early.** This is the load-bearing invariant engine; it is worth its weight |
| The JSON-records-over-schema migration | correctly engineered, under-prioritised | **Elevate.** It is the human-editability unlock (§5) |
| MCP server, vector search | correctly deferred to Phase 4 | leave deferred |

**Under-engineered / missing plumbing** (§11 missing pieces): media storage (C9),
measurement (GSC still unverified — a Phase-1 leftover), and the authoring surface.

The Board's summary judgement: the architecture is *over-specified for today and
correctly specified for 2031*. The danger is building 2031's machinery in 2026. The
phasing (blueprint §17) already says this; the review's job is to make the deferrals
explicit and permission-ed, which §12 does.

---

## 8. SEO review (architecture + audit)

Covered forensically in §2. The Board's consolidated SEO position:

- **Canonical domain (C1) is the highest-value SEO action in the entire programme**
  and it is not in any roadmap. It gates everything else: entity pages built on a
  spam-reading IDN inherit the IDN's trust deficit. Fix first (ADR-010).
- **AI-crawler access (C2)** is the highest-value *AI-SEO* action and is a free
  dashboard toggle.
- **Entity pages (Phase-2 #2)** remain the largest content opportunity; the schema
  to describe them already exists (§2) — the pages do not.
- **Titles, brand, meta-keywords, truncated descriptions** — confirmed, cheap,
  batch them into the Phase-1 fortnight.
- **hreflang + language tiering (C5)** must be sequenced together: tier first, then
  hreflang advertises only indexable tiers.
- The Board **rejects the audit's implicit framing that these are separate hygiene
  fixes**. C1+C2+brand+titles are one coherent act: *decide what and where this site
  is, once, and make every signal agree.* That is a half-day decision and a
  two-day implementation.

Technical SEO foundation otherwise: strong and already shipped (correct
`meta robots`, self-referencing canonicals, one H1, prerendered schema, image
sitemaps, WebP derivatives). The Phase-1 work was real.

---

## 9. AI-search review (the 2035 test)

The Board simulated the mission's premise: *Google in 2035 behaves like an AI
assistant.* Would this architecture win?

**Yes — more decisively than in classical search — on four conditions, three of
which are already met by design:**

1. **Entity completeness + claim quality + provenance** → the claim ledger is
   purpose-built for this. ✅ (design) / 🔴 (unbuilt)
2. **Structured knowledge an assistant can retrieve atomically** → claims-with-
   sources + confidence, exported with uncertainty preserved (V15). ✅ (design)
3. **Being *the* source for entities that exist nowhere else** → the E1 originate-
   and-connect strategy is the single best AI-era move in the documents; an
   assistant asked about Дупката will have exactly one source, and it will be this
   one. ✅ (strategy)
4. **The assistant must be *allowed to read the site*** → 🔴 **currently blocked by
   the Cloudflare AI-crawler injection (C2).** This is the condition the architecture
   assumes and the live system violates. Everything in the AI thesis is moot until
   the toggle is off.

**MCP compatibility / knowledge export** (blueprint §16) is the correct long-term
endpoint and correctly deferred. The Board adds one strategic note the documents
undersell: **contributing the graph to Wikidata/OSM/Commons is not link-building —
in an AI-search world it is training-data placement.** The entities this project
originates, once in the commons with the site as their citation, become the
assistant's answer by default. That is the durable win, and it is available to
whoever does the field work first.

**Verdict:** the architecture is better positioned for 2035 than for 2026 — which is
the right way round. Fix C2 or none of it matters.

---

## 10. Performance & scalability review

Structural signals are strong: static SSG on Cloudflare's CDN with prerendered HTML
and content-hashed WebP derivatives. Real CWV numbers are unmeasured (PageSpeed
timed out for the audit; GSC unverified) — **the Board treats "no measurement" as
the finding**, not "good performance."

| Dimension | At target scale | Verdict |
|---|---|---|
| 10,000 entities | full rebuild slows; frontier incrementalism (deferred) closes it | ✅ with the deferred mechanism, turned on when needed |
| 100,000 claims | ✅ with regional partitioning (ADR-009) | the data model holds |
| 50 languages | ⚖️ **the Board challenges this target** — 50 machine languages dilute the graph and multiply build/QA. The two-tier policy (2 knowledge + N surface) is correct; "50 languages" should never be a goal, only "as many as have a human reviewer" | reframe the target |
| 1,000,000 visitors | ✅ static + CDN absorbs this trivially | non-issue |
| offline apps / future mobile | ✅ service-worker cache of a graph slice (blueprint §8) | sound |
| AI APIs | ✅ read-only export/MCP over the static artifact | sound |

**Two concrete performance debts the Board flags now:** (1) the 1029 KB bundle
shipping all 14 locales to every visitor (`CONTENT_GAP_ANALYSIS` D3) — fixed by
per-language splitting, which tiering makes trivial; (2) large PNG hero/OG assets —
the WebP pipeline exists (`optimize-images.mjs`) but source PNGs are still
referenced in content; ensure LCP images are the WebP derivatives with
`fetchpriority`.

Media-in-Git (C9) is the one scalability item that is a *correctness* problem, not a
tuning one: 166 files today, but the longitudinal-photography strategy implies tens
of thousands. Git is the wrong store for that. → ADR-012.

---

## 11. Risk analysis

Probability × Impact × Mitigation, across all seven risk classes the mission named.
Ordered by the Board's priority.

| # | Risk | Class | Prob. | Impact | Mitigation |
|---|---|---|---|---|---|
| R1 | **Field work never happens** (the whole graph is gated on one driving + one walking day) | Operational | **High** | **Critical** | Book both days in month 1, before anything with a dependency; the pipeline renders the gap honestly (V2) so emptiness is visible, not faked |
| R2 | **Oral informants die before being recorded** | Knowledge | **High** | **Irreversible** | The only item with a real deadline; start interviews month 1, not month 6 (Editorial OS §6.3) |
| R3 | **Wrong domain accrues authority / IDN reads as spam** | SEO | **High (now)** | High | ADR-010: pick `aglen.bg`, 301 the IDN, GSC change-of-address — this week |
| R4 | **AI crawlers stay blocked by the Cloudflare toggle** | AI | **High (now)** | High | Disable the managed-robots/AI-block feature; the repo policy already welcomes them |
| R5 | **No named human author** → E-E-A-T capped permanently | Editorial | Medium | High | A constitutional commitment (Editorial OS rules 1/4/15); even a first name + role beats an org |
| R6 | **Media-in-Git bloats the repo and breaks at scale** | Technical | Medium | High | ADR-012: object storage + graph `uri`/`hash` before the media library grows |
| R7 | **Governance/machinery over-build stalls a one-person project** | Product | Medium | Medium | Defer federation, bodies, frontier, `Contribution`/`Review` types (§12) |
| R8 | **Effort goes to volume over depth** (the `landingPages.ts` failure at scale) | SEO/Product | Medium | High | The five generation gates enforced in `graph-audit.mjs`; page count is an output, never a target |
| R9 | **Cave/river safety advice is wrong** | Knowledge/Legal | Low | **Someone gets hurt** | Never publish access/safety without an authoritative source; the current refusal is correct and entrenched (Editorial rule 3) |
| R10 | **Region-first inversion confuses returning visitors / dilutes brand** | Product | Low–Med | Medium | Keep `/` as Aglen home, `/karst/` as a hub (documented fallback); test the nav change |
| R11 | **Framework churn (React/Vite disappear)** | Technical | Low (slow) | Low | The graph is JSON-in-Git, renderer-agnostic; a framework swap regenerates surfaces without touching truth — the architecture's strongest future-proofing (§14) |
| R12 | **Vendor lock-in (Cloudflare Pages/Workers)** | Technical | Low | Low | Static output is portable; the worker does only edge routing (C8) |

R1 and R2 are the existential ones and neither is technical. The architecture's job
is to be *ready* for the field work; it cannot substitute for it.

---

## 12. Over-engineering review — be ruthless

The Board was asked to be ruthless about what exists because architects like
diagrams. Findings, with a defer/keep/remove ruling each.

| Artifact | Ruling | Reason |
|---|---|---|
| Incremental "regeneration frontier" (`KNOWLEDGE_PIPELINE` §9.4) | **DEFER** | Full rebuild of 170 entities is trivial; build the frontier only when a rebuild exceeds ~60s |
| Editorial federation (regions, charters, Regional Editors) | **DEFER** | Specifying it now is cheap and correct (so region 1 is copyable); *activating* it before region 1 is proven is waste |
| The six governance bodies + T0–T5 trust ladder as *staffed roles* | **DEFER the staffing, KEEP the rules** | One person cannot be a six-body institution; but the two-person rule and confidence gates must live now as build checks |
| `Contribution` / `Review` as data types | **DEFER** | Until a second contributor, a PR is the Contribution and a merge is the Review; don't model what Git already models |
| `Observation` layer | **DEFER to first field day** | No observations exist until someone walks the ground |
| MCP server, vector/semantic search | **KEEP DEFERRED** (Phase 4) | Correct as written |
| `Dispute` / `disputeOf` type | **KEEP** | Justified by the real etymology case; cheap; prevents laundering contested claims into facts |
| `graph-audit.mjs` (4 rule-sets) | **KEEP, build early** | The invariant engine; the one piece of "machinery" worth building before scale |
| JSON-records-over-schema migration | **KEEP, elevate** | The human-editability unlock (§5); not deferrable if contribution is a goal |
| The 50-rule + 20-rule + 20-principle constitutions | **KEEP, but treat as checklists** | Their value is as review gates, not as prose; wire the mechanical ones into the build |

**The Board's one-sentence ruling on over-engineering:** *the architecture is not
over-engineered — it is over-scheduled.* Almost nothing should be removed; a great
deal should be deferred. The documents already know this (every Phase-3 doc carries
a self-objection admitting it); this review makes the deferrals explicit and grants
permission for them.

**One thing the Board would genuinely simplify:** the entity-schema currently emits
`TouristDestination` per landing page (C6) — a *view* type masquerading as an entity
type. As entity pages are built, collapse to honest `Place`/`Landform`/`Cave` types
and stop emitting `TouristDestination` for keyword pages that are being retired
anyway.

---

## 13. Missing pieces — only where absence is a real risk

The mission forbade inventing documents. The Board recommends **no new documents** —
consistent with the governance rule — and instead names the missing *decisions and
mechanisms*, each as an ADR or RFC against the existing blueprint.

| Missing | Why its absence is a risk | Form |
|---|---|---|
| **A canonical-domain decision** | The single largest unmanaged SEO risk; nothing in 14 docs decides it | **ADR-010** |
| **An AI-crawler / edge-config policy** | The AI-citation thesis is silently blocked at the edge | **RFC** (disable Cloudflare AI-block; document the toggle so it can't regress) |
| **A brand-identity decision** | Three brands fight across the schema (C3) | **ADR-011** |
| **A media-storage decision** | Git is the wrong store for longitudinal media at scale (C9) | **ADR-012** |
| **A measurement mechanism** | GSC/Bing unverified; the whole programme is unfalsifiable without it (a Phase-1 leftover) | task, this week |
| **The JSON-records schema migration** | Gates all human contribution (§5) | ADR against blueprint ADR-004 |
| **A navigation, domain & product-boundary decision** | The live menu duplicates and flattens concepts (C16) and leaves the relationship between Aglen, AR missions and Unlocking Bulgaria undefined; every new entity page inherits the ambiguity | **ADR-013** |
| **A crawler-purpose matrix** | Search retrieval, user-triggered access and AI training are currently one blanket decision | **Amendment to the Cloudflare crawler RFC (§15.4b)** |

That is the complete list. Everything else the architecture needs, it already
specifies. The Board explicitly declines to recommend any further design documents —
the document set is, if anything, ahead of the implementation, and more paper is not
the constraint.

---

## 14. Future-proofing

Assume Google, AI, React, frameworks and search all change. Does the architecture
survive?

- **Framework change (React/Vite die):** ✅ **survives best of all.** Truth is JSON
  records in Git; surfaces are derived. A renderer swap regenerates pages without
  touching a single fact. This is the payoff of "the graph is the source of truth."
- **Search-engine change:** ✅ the site optimises for *entity coherence and
  provenance*, which every generation of ranking (classical → AI) has rewarded more,
  not less.
- **AI change:** ✅ claims-with-sources is model-agnostic; MCP/export adapt to
  whatever protocol wins.
- **Vendor change (Cloudflare):** ✅ static output is portable; only edge routing is
  vendor-specific and trivially reproducible.
- **The one genuine fragility:** ⚖️ **institutional continuity.** The architecture
  survives technology change far better than it survives *the one person leaving*.
  Every future-proofing mechanism is technical; the human-continuity mechanism (the
  Editorial OS) is the least-built. The Board's future-proofing recommendation is
  therefore *not* technical: **name a second human, and record decisions as EDRs, so
  the institution survives its founder.** That is the real 20-year risk.

---

## 15. Final reconciliation

### 15.1 Strengths (protect these)

1. The region-first thesis — correct, and the precondition for everything.
2. The claim-ledger / provenance model — exactly what the AI era rewards.
3. The refusal to publish the unverified — a live, durable moat (`guides.ts`,
   `region.ts`).
4. A genuinely strong prerendered SSG implementation with rich, Wikidata-linked
   JSON-LD already shipping (the audit missed this).
5. The originate-and-connect (E1↔E5) strategy — the best AI-search move available.
6. Documentation discipline that is *ahead* of the implementation.

### 15.2 Weaknesses (fix these)

1. Everything points at a spam-reading IDN; no domain decision exists (C1).
2. A Cloudflare edge toggle blocks the AI crawlers the strategy courts (C2).
3. Fragmented brand identity across the schema (C3).
4. The graph is human-hostile to edit; contribution is gated on an unbuilt schema
   migration (§5).
5. Media in Git will not scale (C9).
6. The architecture is over-scheduled — 2031 machinery risks being built in 2026
   (§12).
7. No measurement; the programme is currently unfalsifiable.

### 15.3 Architecture contradictions
Fifteen, catalogued in §3. Urgent: C1, C2, C3. Deferrals: C13, C14. The rest
scheduled or cosmetic.

### 15.4 Architecture decisions the Board ratifies (proposed ADRs)
- **ADR-010** — Canonical domain = `aglen.bg`; 301 the Cyrillic IDN; flip `SITE_URL`.
- **ADR-011** — *Brand strings only:* `Organization`/`og:site_name` = "Aglen
  Tourism / Ъглен Туризъм"; "AR мисии / Unlocking Bulgaria" is never the `siteName`.
  The *product model* (what Unlocking Bulgaria is, and how it relates to Aglen) is
  ADR-013 — and it is **not** a `subOrganization`.
- **ADR-012** — Media to object storage (R2); the graph holds `uri` + content hash;
  Git holds records, not blobs.
- **ADR-013 — Navigation, Domain & Product Boundaries** (§15.4a) — two products, two
  domains, two canonical roles; Unlocking Bulgaria is an independent national
  `SoftwareApplication` for which Aglen is the first live destination.
- **Amendment to ADR-003** — "no server" means no request-time rendering of
  *knowledge*; edge routing via `_worker.js` is permitted.
- **Amendment to ADR-004** — the JSON-records-over-schema migration is elevated from
  "later" to a Phase-2 prerequisite for human contribution.
- **RFC (crawler-purpose matrix, §15.4b)** — disable the Cloudflare managed AI-block,
  and decide crawler access by purpose (search/citation · user-retrieval · training)
  rather than by a blanket allow.

### 15.4a ADR-013 — Navigation, Domain & Product Boundaries

**Status:** proposed — the highest-priority boundary decision; it blocks new entity
pages, because every page built before it is decided inherits the current confusion.
**Decision.** Resolve the *models* before any menu is redrawn.

1. **Two products, two domains, two canonical roles.**
   - `aglen.bg` owns the *place*: village, place, history, event, business and visit
     content. Identity: **Aglen / Ъглен Туризъм**.
   - `unlockingbulgaria.com` owns the *product*: an **independent national AR/GPS
     mission platform and application**, beginning around Ъглен and extending across
     Bulgaria. Identity: **Unlocking Bulgaria**.
   - Relationship: **Aglen is Unlocking Bulgaria's first live destination** — not its
     owner, and not its subordinate.
2. **Schema / product model.** Unlocking Bulgaria is a `SoftwareApplication` /
   `MobileApplication` (a product / `CreativeWork`), **not** a `subOrganization` of
   Aglen Tourism. Mission metadata may be shared across the two domains (a mission
   references a place entity), but each domain keeps a distinct canonical role. *This
   supersedes the `subOrganization` idea floated earlier; ADR-011 now governs only
   the brand strings.*
3. **How Unlocking Bulgaria appears on aglen.bg** — as an *integrated external
   experience available in Aglen*, and **never** as: the village site's identity; a
   duplicate mini-site; a sibling geographic category beside Places (C16); or a
   product owned by Aglen. It appears as an available experience *at selected places*,
   a clearly identified external application, a contextual CTA inside visit/place
   journeys, and a consistent cross-domain handoff.
4. **The concrete integration** (removes the duplicate promo the screenshots show):
   - Home: **one** compact block — "Открий Ъглен чрез Unlocking Bulgaria" (AR/GPS
     missions at real places), with two CTAs (*see active missions* / *open the
     app*). No second full hero.
   - **One** local mission hub on aglen.bg (e.g. `/ar-missions/`): what Unlocking
     Bulgaria is, which missions are available around Ъглен, at which places, what is
     needed, and a button to open/download the app. A single role — not a repeat of
     the home hero, not a site-within-a-site.
   - Each place page carries a contextual affordance: "Налична AR мисия — [Започни
     мисията]". The chain is **place → available experience → Unlocking Bulgaria**,
     never **Aglen site → UB mini-site → external UB site**.
5. **Navigation model** (resolves C16 without prescribing a bar): Places, AR missions,
   Events and Businesses are *different kinds* of thing — an entity, an experience at
   a place, a time-bound thing at a place, a service at a place — and must not be
   flattened into identical parallel top-level geographies. AR missions are an
   experience layer surfaced *within* visit/place journeys, not a peer of "Места".
   The site's front door stays **village-first** (not karst-first — see §15.5);
   region-first remains correct only for the knowledge *subject* and URL namespace
   (ADR-008). Events and Local Business may remain top-level, given their distinct,
   high-value, dynamic intent.

**Consequence.** aglen.bg stays the village's digital home; Unlocking Bulgaria keeps
a national identity a village site cannot contain; and at every point a visitor knows
whether they are on the village site, exploring a place, or opening the external
application. Fixing Aglen's navigation no longer risks breaking Unlocking Bulgaria's
long-term identity.

### 15.4b RFC — Crawler-purpose matrix (replaces "allow all AI bots")

The AI-crawler decision is **three decisions, not one.** `robots.txt` and the
Cloudflare edge policy must address crawlers by *purpose*, not lump them together.
(Exact bot→purpose mapping must be verified against each vendor's current
documentation; names and roles change.)

| Purpose | Representative crawlers | Decision |
|---|---|---|
| **Search discovery / indexing / citation** | Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, Applebot, DuckDuckBot, Claude-SearchBot | **Allow** — this *is* the "be cited by assistants" goal |
| **User-triggered retrieval** | ChatGPT-User, Perplexity-User, Claude-User / Claude-Web | **Allow** — a human asked; serve them |
| **AI model training** | GPTBot, Google-Extended, Applebot-Extended, ClaudeBot, CCBot | **Explicit editorial/business decision — legitimately may be "no"** |

Three clarifications the current repo `robots.txt` blurs:
- **Google-Extended does not control Google Search indexing or ranking** — Googlebot
  does that regardless. Google-Extended governs use by certain Gemini systems only;
  disallowing it costs no search visibility.
- The repo currently **blanket-allows training** (GPTBot, Google-Extended, CCBot).
  That should be a *deliberate* choice, not a default: allowing search discovery and
  citation while withholding blanket training consent is a coherent, common position.
- The contradictory Disallow block is Cloudflare-injected at the edge (C2); the fix
  is disabling that managed feature so the deliberate matrix above is what ships.

### 15.5 Rejected alternatives (with reasons)
- **Keep the Cyrillic IDN as primary** — rejected: punycode reads as phishing to 13
  of 14 audiences and contradicts the "brand is Aglen" thesis. (A minor entity-match
  benefit in Bulgarian search does not outweigh reach + trust loss.)
- **Add JSON-LD (per the audit)** — rejected as already done; the action is validate,
  not add.
- **Build the incremental frontier / federation / governance bodies now** — rejected
  as premature; defer until scale/contributors justify them.
- **Move to SSR/ISR or a headless CMS** — rejected: adds a server and a second source
  of truth for content that changes on the order of days; the static Git-graph model
  is superior here (blueprint ADR-001/003 upheld).
- **A 50-language target** — rejected: languages without a human reviewer dilute the
  graph; the target is "languages with a reviewer," not a number.
- **Model Unlocking Bulgaria as a `subOrganization` of Aglen / "a feature of Aglen"**
  — rejected: it is an independent national product; subordinating it to a village
  site fixes Aglen's navigation while breaking Unlocking Bulgaria's long-term
  identity. Correct type is `SoftwareApplication` (ADR-013).
- **Blanket "allow all AI bots"** — rejected: search/citation, user-retrieval and
  training are separate decisions (§15.4b); a site may welcome citation and still
  withhold blanket training consent.
- **Karst-first home navigation** (making "Карстът" the first menu item) — rejected as
  the *front door*: it makes the village's digital home read as a regional geology
  portal. Region-first is upheld for the knowledge *subject* and URL namespace
  (ADR-008), not for the site's identity — the documented `CONTENT_HIERARCHY.md` §6
  fallback (keep `/` as the Aglen home).
- **Folding Events and Local Business out of the top menu** — rejected: they carry
  distinct, dynamic, high-value intent ("what's on?", "where to eat / who to hire?")
  and may legitimately remain primary navigation.
- **A second full Unlocking Bulgaria promotional hero on aglen.bg** — rejected: it is
  exactly the mini-site-within-a-site of C16; one compact block + one mission hub is
  enough (ADR-013 §4).
- **New architecture documents** — rejected per governance; recommendations land as
  ADRs/RFCs.

### 15.6 Technical debt (ranked)
1. `SITE_URL` hardcoded to the IDN (C1) — one constant, high blast radius.
2. Cloudflare edge-injected robots contradiction (C2) — dashboard, not code.
3. Brand strings split across `nav.quests` / `organizationName` / `alternateName`
   (C3).
4. `internalLinkRouteIds` hand-authored (C10); 25 near-duplicate landing pages.
5. Media committed to Git (C9).
6. `TouristDestination` emitted as an entity type (C6); global `dateModified` (C7).
7. `meta keywords` emitted (obsolete); some content still references source PNGs.
8. GSC/Bing unverified — no measurement.

### 15.7 Migration strategy (evolutionary, no rewrite)
The blueprint's four phases stand, with the Board's reordering: **the domain,
robots, brand and measurement fixes (C1, C2, C3, GSC) move to the front of Phase 1**,
because they are cheap, they gate the value of everything downstream, and they
require no data-layer work. `region.ts` is absorbed, not replaced (blueprint
ADR-002). The JSON-records migration is pulled into Phase 2 as the contribution
unlock. Nothing rewrites `App.tsx`.

### 15.8 Implementation priorities (the Board's ordering)
1. **This week (decisions + config, no data work):** ADR-010 domain + 301; the
   crawler-purpose matrix + disable the Cloudflare AI-block (§15.4b); ADR-011 brand;
   fix titles/meta-keywords/description; verify GSC/Bing. *This is the highest-ROI
   week in the programme and it is almost entirely configuration.*
2. **Immediately after the brand decision, before any new entity page ships:** ratify
   **ADR-013** and audit and reconcile the live navigation, route ownership,
   breadcrumbs and Unlocking Bulgaria entry points. Otherwise every new page inherits
   the current product-boundary confusion. This must pass the acceptance criteria in
   §15.8.1 before Phase-2 entity work begins.
3. **Weeks 2–4:** publish the history + legends + Kunev + the "Ъ" fact (no field
   work, no new writing); retire the 18 thin pages; language tiering + per-language
   splitting; then hreflang reconciled to the tiers.
4. **The two field days (month 1–2):** coordinates + road distances — the cheapest
   unlock of the whole graph.
5. **Phase 2:** the `src/graph/` schema-record layer (absorbing `region.ts`), entity
   pages, the claim ledger, `graph-audit.mjs`, derived internal links; ADR-012 media
   move.
6. **Later, when justified by scale/contributors:** the frontier, the governance
   apparatus, MCP/vector, the authoring UI.

### 15.8.1 Navigation acceptance criteria (Phase-2 entry gate)

New entity pages may not begin until the live navigation satisfies all of the
following. Proposed as `graph-audit.mjs` / manual-review gates.

- Every top-level navigation item represents **one distinct user intent**.
- Every concept has **one canonical entry point** (no concept reachable under two
  competing names — §2.4).
- Breadcrumbs **describe the hierarchy**, not repeat the page title.
- Unlocking Bulgaria has **one defined product role** (ADR-013) and is never the
  village site's identity.
- An AR mission is **always connected to a place**.
- A user can **always tell** whether they are browsing the village site, exploring a
  place, or opening the external / mobile Unlocking Bulgaria experience.
- **No page begins with two consecutive promotional introductions** to the same
  product.

### 15.9 Measurement of success
Adopt the Editorial OS §12.5 dashboard and the quarterly AI-citation audit (20
questions × 4 assistants). The single most diagnostic metric: **is the site cited by
an assistant for the Lukovit Karst.** Everything else is a leading indicator of that.

### 15.10 Final risk assessment
The programme's survival depends on two non-technical events — the field work
happening (R1) and the informants being recorded before they are gone (R2) — and on
one week of configuration (R3, R4). The technology risk is low and well-mitigated.
**The architecture is sound; the risk is execution and the calendar, not the design.**

### 15.11 What the Board explicitly affirms
- The evolutionary, no-rewrite strategy: **upheld.**
- Static Git-graph over CMS/SSR: **upheld** (ADR-001/003).
- The refusal-to-guess discipline: **upheld and entrenched** — protect it against
  all pressure to fill a page.
- The audit's strategic findings (domain, robots, brand, titles, entity pages):
  **confirmed.**
- The audit's technical findings (JSON-LD missing, hreflang missing): **refuted** —
  both already ship; validate rather than build.

### 15.12 Approval recommendation

> **APPROVE WITH CONDITIONS.**
>
> The architecture is approved as the basis for a multi-year build. It is
> strategically excellent, technically sound, and — importantly — evolutionary: it
> demands almost no rewrites. Approval is conditioned on:
>
> 1. **Ratifying ADR-010 (domain), the crawler-purpose RFC (§15.4b), ADR-011 (brand)
>    and ADR-013 (navigation & product boundary) before any new content work** —
>    these gate the value of everything downstream and cost about a week; ADR-013 in
>    particular must pass the §15.8.1 navigation acceptance criteria before Phase-2
>    entity pages begin.
> 2. **Turning on measurement (GSC/Bing) in the same week** — the programme is
>    unfalsifiable without it.
> 3. **Deferring the over-scheduled machinery** (frontier, federation, governance
>    bodies, `Contribution`/`Review` types) until scale or contributors justify them,
>    per §12.
> 4. **Elevating the JSON-records schema migration and ADR-012 (media storage)** as
>    the human-contribution and scale unlocks.
> 5. **Booking the two field days and the first interviews in month 1** — the two
>    existential, non-technical risks (R1, R2).
>
> With these conditions, the Board's assessment is that a small team can, over
> several years, build the reference source for the Lukovit Karst — and that the
> design is worthy of the historian, the Principal Engineer, the CTO, and Google's
> Search Quality team who will read it.

---

*This review is a gate artifact, not an architecture document. Its recommendations
take effect only as ADRs against `MASTER_ARCHITECTURE_BLUEPRINT.md` §18 and RFCs per
`EDITORIAL_OPERATING_SYSTEM.md` §11.2. It reflects the documents and the live
implementation as of 2026-07-25; re-review after the Phase-1 configuration fixes and
the first field days, when the assumptions marked 🔶 can be closed.*
