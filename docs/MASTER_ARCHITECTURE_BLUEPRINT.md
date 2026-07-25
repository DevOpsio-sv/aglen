# Master Architecture Blueprint — the Aglen Knowledge System

**Phase 3 — System Architecture (4 of 4).** The single implementation blueprint.
This document is the bridge between vision and code. It integrates all thirteen
prior architecture documents into one coherent system architecture and defines how
the *current* codebase evolves into the final one — additively, without a rewrite.

It answers exactly one question: **how is the entire system built?**

It is not a redesign. The current site keeps running. Every section below assumes
the existing implementation continues to exist and describes the next state it
grows into.

## How to read this with the other documents

This blueprint references rather than duplicates. When a decision is fully argued
elsewhere, this document states the decision and points to the argument. It is
**subordinate** to reality and to the thirteen documents it integrates, and
**superior** to any individual feature.

| Layer | Owning documents | This blueprint's job |
|---|---|---|
| **Subject & strategy** | `TOPICAL_AUTHORITY_MAP.md`, `ENTITY_PRIORITY_MATRIX.md`, `CONTENT_GAP_ANALYSIS.md`, `5_YEAR_SEO_ROADMAP.md` | Encode the thesis as system invariants |
| **Knowledge model** | `KNOWLEDGE_GRAPH.md`, `EEAT_STRATEGY.md` | Turn the node/edge/claim model into the domain model and the graph runtime |
| **Content structure** | `CONTENT_HIERARCHY.md`, `SEARCH_INTENT_MAP.md`, `PROGRAMMATIC_SEO_PLAN.md`, `INTERNAL_LINKING_GRAPH.md` | Turn URL/link/intent rules into the content-generation and navigation engines |
| **Human experience** | `EXPERIENCE_ARCHITECTURE.md` (layers L0–L8, seven loops, 20 principles) | Turn the experience layers into a runtime engine |
| **Data lifecycle** | `KNOWLEDGE_PIPELINE.md` (12-transition spine T1–T12, rules V1–V15) | Turn the reality→knowledge pipeline into data flow and the build pipeline |
| **Governance** | `EDITORIAL_OPERATING_SYSTEM.md` (trust ladder T0–T5, the 20-rule Constitution) | Turn roles/workflows into the editorial engine |

The vocabulary is fixed by `TOPICAL_AUTHORITY_MAP.md` §4 and used unchanged
throughout: **Entity** (a real-world thing; permanent id + URL + schema node),
**View** (a composition over entities shaped by an intent), **Claim** (one atomic
sourced statement — the unit of trust), **Surface** (a rendering for a language
and device; never a source of truth). The entity-confidence ladder **E1–E5** is
fixed by `KNOWLEDGE_GRAPH.md` §4; the claim-confidence set **verified | reported |
uncertain | disputed** by `EEAT_STRATEGY.md` §2. The verification legend — ✅
published · 🟢 externally verifiable · 🔶 believed, unsourced · ⬜ unknown · 🔴
known gap — is used throughout.

**Four constitutions govern this system, each supreme in its domain** (precedence
resolved in §20.6): the Architectural Constitution here (§20), the twenty
Experience Principles (`EXPERIENCE_ARCHITECTURE.md` §10), the Pipeline principles
(`KNOWLEDGE_PIPELINE.md` §11), and the Editorial Constitution
(`EDITORIAL_OPERATING_SYSTEM.md` §16).

---

## 1. System philosophy

### 1.1 What we are building

A **regional knowledge system** for the Lukovit Karst, narrated from the village
of Ъглен, whose primary artifact is a versioned graph of real-world entities and
sourced claims, and whose website, AR app, maps, machine exports and future
surfaces are all *renderings* of that graph.

The website is the first surface, not the system. `TOPICAL_AUTHORITY_MAP.md` §4
states the architectural problem in four words: *the current codebase has surfaces
and views but no entities and no claims.* This blueprint is the plan to grow the
missing two layers underneath the two that already exist, and to make the existing
two derive from them.

### 1.2 Why it exists

Because the knowledge it will hold exists nowhere else and is disappearing. Nine
named places have no coordinates; a national writer's birthplace is a paragraph in
a modal; the oral tradition lives in the memory of people who are old
(`EEAT_STRATEGY.md` §7 — the one deadline that is real and irreversible). The
system exists to *originate* that knowledge, structure it so machines and people
can use it, and preserve it with its provenance intact. The commercial layer
(directory, events, stays) is real and funds the mission, but it is downstream of
it.

### 1.3 What makes it fundamentally different from a tourism website

| A tourism website | This system |
|---|---|
| Pages are the unit | Claims are the unit; pages are derived |
| Publishes to attract | Publishes only what it can source; states its unknowns |
| Optimises for *exit* (the fast answer) | Optimises for *the next step inward* (`EXPERIENCE_ARCHITECTURE.md` §1.2) |
| Text is authored per page | A fact is written once and transcluded everywhere |
| Freshness is a `dateModified` stamp | Freshness is a dated on-site verification by a named person |
| Presents as finished | Presents as deliberately unfinished — the reason to return |
| Success = traffic | Success = being the cited source, in Google's graph, in Wikidata, in an assistant's answer |
| The site is the product | The graph is the product; the site is one reader of it |

### 1.4 Immutable architectural principles

These govern every later section. The full list of fifty enforceable rules is
§20; these six are the axioms the rest derive from.

1. **The graph is the single source of truth.** Every page, internal link,
   JSON-LD block, sitemap entry, search-index record and AI export is a pure
   function of the graph. If two surfaces disagree, the graph is right and both
   surfaces are regenerated.
2. **Nothing indexed is unsourced.** A claim without a `source` cannot render on
   an indexable page except inside an explicit "not yet verified" block
   (`KNOWLEDGE_GRAPH.md` §7 rule 3; enforced as `KNOWLEDGE_PIPELINE.md` V1).
3. **Unknown, uncertain and disputed are states, not absences.** They render, they
   export, they are load-bearing — for trust *and* for the experience loops that
   run on them (`KNOWLEDGE_PIPELINE.md` §7; `EXPERIENCE_ARCHITECTURE.md` §5.4).
   Silent omission is a build failure (V2).
4. **Derive, never author, what can be derived.** Distances from coordinates,
   links from relations, JSON-LD from claims, breadcrumbs from containment. Hand-
   authoring a derivable artifact is a defect (V12).
5. **Evolve, never rewrite.** Every change ships additively alongside the running
   site. No phase requires a rewrite of `App.tsx` or a big-bang migration.
6. **Reversibility is mandatory.** Corrections supersede, they do not delete;
   retirements are 301s, not removals; the graph lives in Git so every state is
   recoverable. Reality changes and the record of how we knew it must survive.

---

## 2. System context — the subsystems

Twelve subsystems. Each has one owner concept, a clear responsibility, and
declared dependencies. The dependency arrows all point *toward the graph*: the
Knowledge System depends on nothing above it, and everything depends on it.

```
                         ┌─────────────────────────┐
                         │     EDITORIAL SYSTEM     │  (people + governance)
                         │  proposes & ratifies →   │
                         └───────────┬─────────────┘
                                     │ writes (only via review)
                                     ▼
   ┌───────────────────────────────────────────────────────────────┐
   │                       KNOWLEDGE SYSTEM                          │
   │   entities · claims · sources · evidence · relations · graph   │  ← source of truth
   └───────────────────────────────────────────────────────────────┘
        │ derived at build ─ everything below is READ-ONLY on the graph
   ┌────┴───────┬───────────┬──────────┬──────────┬───────────┬─────────────┐
   ▼            ▼           ▼          ▼          ▼           ▼             ▼
EXPERIENCE   SEARCH    LOCALIZATION  MEDIA      MAPS      DIRECTORY /    AI /
 SYSTEM     SYSTEM      SYSTEM      LIBRARY    SYSTEM    EVENTS         EXPORT
   │            │           │          │          │           │             │
   └────────────┴───────────┴──────────┴──────────┴───────────┴─────────────┘
                                     │
                             ANALYTICS · ADMINISTRATION  (observe / operate)
```

| Subsystem | Owns | Responsibility | Depends on | Status today |
|---|---|---|---|---|
| **Knowledge System** | entities, claims, sources, evidence, relations | Be the correct, versioned, sourced model of the region | nothing | 🔴 absent (`region.ts` is a seed) |
| **Editorial System** | contributors, reviews, decisions | Turn reality into ratified graph changes; keep the graph consistent for 20 years (`EDITORIAL_OPERATING_SYSTEM.md`) | Knowledge System | 🟡 disposition exists (`guides.ts`, `trustPages.ts`), no process |
| **Experience System** | the runtime discovery engine | Make a human progressively discover and connect (`EXPERIENCE_ARCHITECTURE.md`) | Knowledge, Media, Maps | 🟡 a 13-section scroll |
| **Search System** | internal + entity + semantic search | Let people and machines find any entity by name, intent or meaning | Knowledge | 🔴 none |
| **Business Directory** | listings | Verified local commerce | Knowledge (proximity) | ✅ best-built part |
| **Events** | dated events, `EventSeries` | Recurring calendar | Knowledge (location) | ✅ real, thin |
| **Media Library** | photos, drone, 360, audio, AR, video | Hold licensed, dated, credited media with provenance | Knowledge (subject) | 🔴 ad-hoc, some AI-looking |
| **Maps System** | geographic rendering | Show the graph as geography | Knowledge (geo) | 🟡 a map section |
| **AI / Export System** | machine legibility | Serve the graph to assistants and crawlers with sources and uncertainty intact | Knowledge | 🟡 `llms.txt` ✅ |
| **Localization System** | languages, translation lifecycle | Two-tier language policy; human-reviewed knowledge translation | Knowledge, Editorial | 🟡 14 shallow locales |
| **Analytics System** | measurement | GSC, Core Web Vitals, AI-citation audits, graph-health metrics | all | 🔴 none |
| **Administration** | build, deploy, feature flags, contributor access | Operate the system; run the build pipeline; guard the gates | all | 🟡 SSG + flags exist |

**Ownership rule:** a subsystem may *read* the graph freely and may *write* it
only through the Editorial System's review workflow. No subsystem holds private
truth. The Directory's listings, the Events' dates and the Media's captions are
all claims or claim-adjacent records in the one graph, not separate databases —
which is why "businesses near this entity" is a graph query, not an integration.

---

## 3. Master domain model

Domain models, not tables. Each is a concept with identity, relations and a
lifecycle (the lifecycles themselves are owned by `KNOWLEDGE_PIPELINE.md` §6). The
canonical typed schema for the core three (`Entity`, `Claim`, `Source`) lives in
`KNOWLEDGE_GRAPH.md` §1 and `EEAT_STRATEGY.md` §2; the reality-entry types
(`Observation`, `Evidence`, `MediaAsset`, `Revision`, `Dispute`) live in
`KNOWLEDGE_PIPELINE.md` §3. This section defines the *whole* model and how the
pieces relate.

### 3.1 The models and their identity

| Model | Identity | One-line definition | Key relations |
|---|---|---|---|
| **Entity** | `EntityId` slug, stable forever | A thing that exists in the world independent of this site | `parent`, typed `Relation[]`, `claims[]`, `sameAs` |
| **Claim** | `clm-<entity>-<nnnn>` | One atomic sourced statement about an entity — the unit of trust | `entityId`, `source`, `supersedes`, `disputeOf`, `evidence[]` |
| **Evidence** | `evd-<yyyymmdd>-<nnn>` | A concrete artifact supporting a claim (photo+EXIF, GPX, scan, recording) | `supports/claims[]`, `observation`, `hash` |
| **Observation** | `obs-<yyyymmdd>-<nnn>` | A dated record that a named person was on the ground | `observer`, `evidence[]` |
| **Source** | `src-<kind>-<nnnn>` | A citable origin of a claim | `citedBy: ClaimId[]` |
| **Media** | `med-<yyyymmdd>-<nnn>` | A licensed, dated, credited asset; a subtype of Evidence that also renders | `depicts`, `credit`, `alt`, `aiGenerated:false` |
| **Location** | value on an Entity | `GeoCoordinates` or `linear` — never inherited (health-rule 8) | belongs to one Entity |
| **Route** | `EntityId` (kind `route`) | An ordered traversal with GPX, length, ascent | `stops: EntityId[]` |
| **Business** | `EntityId` (kind `business`) | A verified local enterprise | `nearby`, `operatedBy`, category |
| **Event** | `EntityId` (kind `event`) | A dated happening; recurring → `EventSeries` | `location: EntityId` |
| **Person** | `EntityId` (kind `person`) | A real person tied to the region (Kunev; also every contributor) | `birthPlaceOf`, `sameAs` |
| **Legend** | `EntityId` (kind `legend`) | An item of oral tradition, asserted as *told*, never as true | `subjectOf` → place; `collectedBy` |
| **Historical period** | `EntityId` (kind `period`) | A bounded era with evidence | `locatedIn`, entities that evidence it |
| **Translation** | value on `LocalizedText` | A per-language rendering bound to a claim revision, with review state | belongs to a Claim/Entity field |
| **Revision** | `<artifactId>@<n>` | An immutable prior state; the Git commit is the global revision | `of: recordId`, `action`, `by` |
| **Contribution** | a proposed change | The unit the Editorial System processes (human or AI) | `by: PersonId | AiAgentId`, `touches[]` |
| **Review** | a ratification decision | A signed verdict on a Contribution | `of`, `by: PersonId`, verdict |
| **Relationship** | value (`Relation`) on an Entity | A typed, world-true edge | see `KNOWLEDGE_GRAPH.md` §1 |
| **Dispute** | `DisputeId` | Two+ competing claims presented side by side, maybe never resolved | `claims[]`, `status` |

### 3.2 How they relate — the load-bearing shape

```
     Reality
        │ observed by a Role (a Person)
        ▼
    Observation ──produces──▶ Evidence ──supports──▶ Claim ──about──▶ Entity ──relation──▶ Entity
        obs-…                    evd-…    (source)     clm-…            slug          slug
        │                          │                    │                │
   observer (Person)           hash + EXIF          confidence         sameAs ─▶ Wikidata / OSM / Commons
        │                          │                    │                │
        └── every write is a Contribution ──▶ Review ──▶ Revision (immutable, in Git)
```

Four invariants make this model correct rather than merely tidy:

1. **A Claim is meaningless without a Source; an Entity page is meaningless
   without Claims.** Below three unique claims an entity is a *section of its
   parent*, not a page (`KNOWLEDGE_GRAPH.md` §7 rule 5). The model enforces the
   hierarchy of `CONTENT_HIERARCHY.md` at the data level.
2. **Evidence is distinct from Source.** A Source is what you cite; Evidence is
   what you hold. A photograph *is* Evidence and *has* a Source (the photographer,
   a field method). This separation is what lets the site *prove* experience
   (`EEAT_STRATEGY.md` §3), and it is where this system goes further than
   Wikipedia, whose provenance stops at "cited to a publication" and cannot hold
   original field observation (`KNOWLEDGE_PIPELINE.md` §10).
3. **Provenance is bidirectional and total.** Every arrow is stored both ways
   (`Claim.evidence[]`↔`Evidence.claims[]`, `Entity.claims[]`↔`Claim.entityId`); a
   one-way link fails the build (V4). Every fact walks up to the moment a person
   stood on the ground; every observation walks down to everything it supports.
4. **Contradiction is modelled, not resolved.** Two genuinely competing claims
   (the two Ъглен etymologies) are linked by `disputeOf` under a `Dispute` and
   rendered side by side with equal prominence (V14) — never silently merged.
   `supersedes` (one truth, history kept) and `disputeOf` (two truths, both shown)
   are different operations and the author must choose (`KNOWLEDGE_PIPELINE.md`
   §7.1).

### 3.3 Why not more models

Deliberately absent: a `Page` model, a `Link` model, a `Menu` model. These are
*derived* and holding them as data would create the second-source-of-truth defect
this whole architecture exists to remove. A page is a function of an entity; a
link is a function of a relation; the menu is a function of the hierarchy.

---

## 4. The master knowledge graph

The graph is not a feature of the system; it is the system. This section defines
its runtime — how it is generated, validated, versioned, evolved, and consumed.
The node/edge model itself is `KNOWLEDGE_GRAPH.md`; the lifecycle of each record
is `KNOWLEDGE_PIPELINE.md` §6.

### 4.1 Where the graph lives

**In Git, as schema-validated records — one logical record per entity / claim /
source / evidence / media — sharded by kind and (at scale) by region.** Compiled
into an in-memory graph at build. This choice is argued in ADR-001 (§18); the
short form: Git gives revisions, diffs, blame and reversibility natively — the
"Wikipedia + Git" model of `KNOWLEDGE_PIPELINE.md` §10 is *literal*, not metaphor —
and it keeps the system static and serverless, which the current deployment
already is.

`region.ts` is the seed of this. It already holds nine externally-verified
entities with Wikidata ids, coordinates, and honest `linear` markers, and already
derives `nearbyPlaces()` and `sameAsUrls()`. It is absorbed into the graph
(ADR-002), not discarded.

### 4.2 Graph generation

At build, a deterministic pipeline (the derived half of the spine,
`KNOWLEDGE_PIPELINE.md` §1 T6):

```
records (JSON) ──▶ validate (schema) ──▶ assemble in-memory graph
   ──▶ derive reciprocal edges  (nearby A→B implies B→A, same km; V7)
   ──▶ derive distances         (straight-line from coordinates, labelled)
   ──▶ derive containment paths (breadcrumbs)
   ──▶ compute per-entity neighbourhood (the "related" set)
   ──▶ freeze the derived graph as an immutable, content-hashed build artifact
```

The frozen artifact is what every downstream generator reads. It is content-
addressed by a hash of its inputs, so an unchanged neighbourhood yields an
unchanged artifact — the basis of incremental builds (§4.6).

### 4.3 Graph validation

Validation is a build gate, not a lint suggestion. It composes four rule sets,
each promoted to a build failure and all consolidated into one enforcement point,
`scripts/graph-audit.mjs`:

- **Graph health** — the ten rules of `KNOWLEDGE_GRAPH.md` §7.
- **Generation gates** — the five gates G1–G5 of `PROGRAMMATIC_SEO_PLAN.md` §1.
  Fail → the record renders as a *table row on its parent*, not a page.
- **Linking guarantees** — the ten anti-orphan rules of
  `INTERNAL_LINKING_GRAPH.md` §5.
- **Pipeline rules** — `V1–V15`, `V-hash`, `V-gate`, `V-schema` of
  `KNOWLEDGE_PIPELINE.md` §13 (provenance both-ways, no orphan evidence, confidence
  never flattened, disputes rendered whole, no AI-authored fact, evidence-hash
  integrity, derived==regenerate).

This is built in the proven shape of the existing `scripts/i18n-audit.mjs` — which
already demonstrated in this repo that a build-time invariant can even catch its
own false positives. `graph-audit.mjs` is the *single* home for all four rule
sets so their numbering never drifts or duplicates.

### 4.4 Graph versioning

Every record is versioned by Git. Beyond that, the model carries *semantic*
version state that Git alone cannot express:

- A **Claim** is never edited in place when its meaning changes; a new claim
  `supersedes` the old one, and both persist. `/corrections/` is generated from
  the `supersedes` chain (`EEAT_STRATEGY.md` §2; `KNOWLEDGE_PIPELINE.md` §6.8).
- An **Entity id** is immutable; its slug may change with a 301; its claims turn
  over beneath a stable identity. A retired id is tombstoned, never freed (V9).
- The derived graph artifact is stamped with the input hash, so any built page can
  name exactly which graph state produced it. `artifactId@n` names any record's
  nth committed state.

### 4.5 Graph evolution

The graph grows by the priority order of `ENTITY_PRIORITY_MATRIX.md` and the waves
of `PROGRAMMATIC_SEO_PLAN.md` §4. Evolution is monotonic and additive: new
entities attach to existing ones by relations; no existing id is repurposed. The
strategic mechanism — `TOPICAL_AUTHORITY_MAP.md` §0 — is expressed structurally:
an E1 entity (Дупката) becomes real by acquiring a true `sameFormation` edge to an
E5 entity (Проходна), inheriting graph context without inheriting a false claim.
This "originate an E1, connect it to an E5" operation is *fractal* — identical at
village scale and at national scale (`KNOWLEDGE_PIPELINE.md` §14.3), which is the
whole reason to build a machine rather than a set of pages.

### 4.6 How graph updates propagate — the regeneration frontier

A change to one record touches only its **regeneration frontier**: the transitive
closure of entities reachable from the changed artifact through one hop of
derivation (the entity, its edge-neighbours, the views that transclude its claims,
its cluster page) — defined precisely in `KNOWLEDGE_PIPELINE.md` §9.4.

```
edit claim C on entity E
  → E's JSON-LD regenerates            (C is transcluded)
  → E's page regenerates
  → entities edge-adjacent to E regenerate   (their anchor text may carry C)
  → any View transcluding C regenerates      (e.g. /plan/weekend-from-sofia/)
  → E's search-index entry + sitemap lastmod + AI export update
Nothing outside the frontier rebuilds.
```

Because a fact is written once and transcluded (`EEAT_STRATEGY.md` §2 point 4),
correcting the drive time from Sofia corrects sixteen pages, every language, the
schema and `llms.txt` in one edit — and touches nothing outside that set. The
frontier is the property that keeps the build tractable at 10⁵ claims (§19).

### 4.7 How pages derive from the graph

A page is `render(entity, neighbourhood, surface)`. The section order of an entity
page is fixed by `CONTENT_HIERARCHY.md` §2.1; sections vanish when their claims are
absent and are never padded. No page has prose of its own that is not a
transcluded claim, except clearly-authored narrative on story/history/person pages
— which are themselves entities with claims.

### 4.8 How AI consumes the graph

Through a dedicated export (§16): per-entity JSON-LD, a browsable claim ledger at
`/sources/`, a machine dump of claims-with-sources, and a future read-only MCP
surface. The contract is that an assistant receives *atomic statements, each with
a source, a date and a confidence* — the single most citation-friendly structure a
site can offer (`EEAT_STRATEGY.md` §2 point 5) — and receives explicit unknowns
and disputes rather than silence, with confidence preserved end-to-end and never
flattened (V15).

---

## 5. Content generation

Every URL on the final site falls into exactly one generation class. The class
determines who writes it, what gates it, and whether it may exist at all.

| Class | Source | Who authors | Gate | Examples |
|---|---|---|---|---|
| **Handcrafted** | narrative written by a named author, then decomposed into claims | Editor/Historian | review + sourcing | `/history/*`, `/person/trifon-kunev/`, `/story/*` |
| **Graph-generated (entity)** | `render(entity)` from claims | nobody — derived | the 5 gates; ≥8 sourced facts | `/place/<slug>/`, `/karst/<cluster>/` |
| **Intent-generated (view)** | `compose(entities, intent)` — transcludes claims, authors no fact | Editor defines composition | non-substitutability (G4) | `/plan/weekend-from-sofia/`, `/plan/getting-here/from-<origin>/` |
| **Experience-generated** | assembled at runtime from the graph + client state | nobody — runtime | must resolve to real entities | the discovery feed, "nearby", "continue" (§11) |
| **Directory / events** | verified listing records | owner-submitted, editor-verified | `status: published` | `/directory/**`, `/events/**` ✅ |
| **Never exists** | keyword with no referent | — | fails G1/G4 | "eco tourism in Aglen", "hidden places in Bulgaria" — the 18 retirements |

Rules that make the classes safe:

- **Handcrafted ≠ unsourced.** A handcrafted narrative page is still decomposed
  into sourced claims; the prose is the surface, the claims are the truth. This is
  how `/place/aglen/history/` — the highest-ROI page in the whole programme
  (`CONTENT_GAP_ANALYSIS.md` A1) — ships: the ~4000 words already exist; only
  citation and addressability are missing.
- **A view never holds a fact** (`CONTENT_HIERARCHY.md` §2.3; Editorial OS §5.1:
  "no entity skips CLAIMS-ATTACHED"). It transcludes, so it cannot drift. This is
  the structural fix for the `landingPages.ts` failure.
- **Rendering strategy per class:** all six classes are **statically generated**
  (§6). Experience-generated surfaces are static shells hydrated with client-side
  graph traversal; nothing requires per-request server rendering.
- **The count is an output, not a target** (`PROGRAMMATIC_SEO_PLAN.md` §1). The
  system generates between ~40 and ~180 pages depending entirely on how much field
  data exists. A page whose data does not exist is not generated — and its absence
  is rendered as a stated unknown, not hidden (Experience principle 12).

---

## 6. Frontend architecture

The current frontend is a Vite + React + TypeScript SPA, prerendered to static
HTML for Cloudflare Pages, hydrated on the client, with feature-flagged sections
and 14 locale bundles. This does not get rewritten. It gets a data layer beneath
it and new route families beside it. (Per the brief: no React code, no CSS — this
is the architecture, not the components.)

### 6.1 Rendering strategy — the decision

| Concern | Strategy | Why |
|---|---|---|
| Entity, karst, history, person, story, route pages | **SSG (prerender)** | Change rarely, must be instantly crawlable and citable, cost ~0 to serve |
| Views (`/plan/*`) | **SSG**, rebuilt when transcluded claims change | Deterministic from the graph |
| Directory, events | **SSG**, rebuilt on record change | Already the model ✅ |
| Map, internal search, AR, discovery feed | **Client islands** hydrated over static shells | Interactive, personal, offline-capable |
| Per-request personalization | **None on the server** | Memory/season/progress are client-side (§8, §11) |

There is **no SSR server and no ISR runtime**. The current deployment is static
and stays static (ADR-003). "ISR-like" freshness is achieved by *regeneration on
graph change* — a Git push to the graph triggers an incremental (frontier)
rebuild and redeploy. This is the pipeline of `KNOWLEDGE_PIPELINE.md` made
operational, and it is strictly more debuggable than request-time regeneration.

### 6.2 Component hierarchy (conceptual, not code)

```
AppShell  (nav, footer, language, Organization schema — on every surface)
  └─ RouteSurface  (chooses a template from the resolved route + graph)
       ├─ EntityTemplate      → section blocks from CONTENT_HIERARCHY §2.1, each
       │                         block a pure function of a claim group
       ├─ ClusterTemplate     → comparison table over an entity set
       ├─ ViewTemplate        → decision-shaped composition; transcludes claims
       ├─ NarrativeTemplate   → history / person / story / legend
       ├─ RouteTemplate       → numbers-first, then narrative, + GPX
       ├─ DirectoryTemplate ✅ / EventsTemplate ✅
       └─ ExperienceSurfaces  → Map · Search · DiscoveryFeed · AR-bridge (islands)
  Shared blocks (graph-driven, reused by every template):
    Identity · Where(map+distances) · WhatItIs(claims) · GettingThere ·
    When · Safety · Meaning(edges) · Media · Nearby · CombineWith ·
    BusinessesHere · Sources · FAQ · ProvenanceFooter
```

The shared blocks are the important part: each is a single component fed by a
graph query, so "Nearby" on an entity page, "Businesses here", and the breadcrumb
are *the same three components* everywhere, guaranteeing the rendered links equal
the schema edges (`INTERNAL_LINKING_GRAPH.md` §1). The `ProvenanceFooter` renders
author, reviewer, last on-site verification and known unknowns — never a
build-stamped `dateModified` (`EDITORIAL_OPERATING_SYSTEM.md` §6.9).

### 6.3 State boundaries, lazy loading, caching

- **State boundaries** are §8's job; the frontend rule is that templates are pure
  over (graph slice, surface, client state) and hold no private truth.
- **Lazy loading:** the map, search index, AR bridge and non-visible locales load
  on demand. The current bundle regression — 1029 KB, every visitor downloading
  all 14 locales (`CONTENT_GAP_ANALYSIS.md` D3) — is fixed by per-language code
  splitting (`5_YEAR_SEO_ROADMAP.md`, 90-day item 10), which the two-tier language
  policy makes trivial.
- **Caching:** static assets are immutable and hashed; the graph artifact and
  search index are versioned by content hash so a redeploy invalidates precisely
  what changed. Client experience-state persists in local storage (§8).

---

## 7. Data flow — reality to correction and back

The complete lifecycle. This blueprint adopts the **12-transition spine T1–T12** of
`KNOWLEDGE_PIPELINE.md` §1 verbatim as the system's data flow; the table below is
the end-to-end view with each transition's actor and gate. The per-record state
machines (claim, evidence, media, translation, correction, review, retirement,
relationship, entity, knowledge) are `KNOWLEDGE_PIPELINE.md` §6; the human
authority at each ratification point is `EDITORIAL_OPERATING_SYSTEM.md`.

| T | Transition | Trigger | Actor | Gate | Kind |
|---|---|---|---|---|---|
| T1 | Reality → **Observation** | someone goes and looks | Researcher/Photographer/Resident | who/when/where recorded | Originated |
| T2 | Observation → **Evidence** | the observation is captured | same | hashed, dated, EXIF retained | Originated |
| T3 | Evidence → **Verification** | evidence judged sufficient for a confidence | Reviewer | method + verifier; **two-person rule** (OS §2.2) | Originated |
| T4 | Verification → **Claim** | one atomic sourced statement enters the ledger | Editor / ratified AI proposal | G2; has `source`; V1 | Originated |
| T5 | Claim → **Entity** | claims aggregate onto a stable node | Reviewer/Editor | ≥3 unique claims to earn a page | Originated |
| T6 | Entity → **Knowledge Graph** | relations resolve | build | reciprocity; acyclic containment | **Derived** |
| T7 | Graph → **Internal Links** | every link renders an edge | build | anti-orphan rules | **Derived** |
| T8 | Graph+Claims → **Structured Data** | JSON-LD emitted | build | one `FAQPage`/URL; confidence preserved | **Derived** |
| T9 | → **Pages** | surfaces render | build | no unsourced claim on an indexed page | **Derived** |
| T10 | Pages → **AI / Search** | crawlers retrieve; export | build | uncertainty survives into export | Derived export |
| T11 | Machines → **Visitor** | a person or assistant arrives | — | — | External |
| T12 | Visitor → **Correction** → graph | an error is reported | Visitor/Volunteer | consent, attribution | Originated |

**The loop closes at T12 → T4, never lower.** A correction is not a page edit; it
is a new observation (or a challenge to an old claim) that re-enters at
verification and propagates back down through every derived layer. The page is
never the source of truth, so the page is never edited to fix a fact — the claim
is superseded and everything in the frontier regenerates. The pipeline is a DAG
with exactly one back-edge, which is what makes the whole thing reversible.

**Where AI sits in this flow:** only at T4 (draft/propose), T8–T10
(consume/export) and as an *assistant* at T3/T12 (surface contradictions, suggest
sources, triage corrections). It never performs the ratification at T3/T4/T5 and
never the acceptance at T12 — it enters exactly where a T0 anonymous submission
enters, as a proposal a named human ratifies (§16; `EDITORIAL_OPERATING_SYSTEM.md`
§10.3).

---

## 8. State architecture

Ten kinds of state, each with exactly one owner. The governing rule: **truth lives
in the graph at build time; only the ephemeral and the personal live at runtime.**

| State | Owner | Where it lives | Lifetime |
|---|---|---|---|
| **Server state** | (none) | there is no server | — |
| **Knowledge state** | Knowledge System | the graph, in Git → frozen build artifact | permanent, versioned |
| **Derived state** | build | generated pages/links/JSON-LD/index | rebuilt from graph |
| **Client state** | the browser | React runtime | page session |
| **Experience state** | Experience System | local storage (visited, saved, quest progress) | across visits, per device |
| **Session state** | the browser | memory/URL | one visit |
| **Navigation state** | the router | URL (the router is the state) | per navigation |
| **Map state** | Maps island | client (viewport, selected entity) | session, shareable via URL |
| **Search state** | Search island | client (query, filters) | session |
| **Offline state** | service worker | cache storage (graph slice, tiles, media) | until evicted |

Consequences of this partition:

- **No accounts are required for the core experience.** Memory is device-local
  first (§11). Optional accounts to sync memory across devices are a *later*
  additive layer, not a dependency — and the day they exist, they store only
  experience state, never knowledge.
- **The URL is the primary state container.** Entity, language, map viewport and
  search query are all expressible in the URL, so any state is shareable and
  crawlable — which is also what makes navigation legible to machines (§9).
- **Offline is a first-class state** because the field and the AR app need it: a
  visitor standing in the canyon with no signal still has the entity, its map and
  its media, served from cache.

---

## 9. Navigation architecture

Not a redesign — principles. The proposed five-item nav is
`CONTENT_HIERARCHY.md` §5; this section defines how *every kind of agent*
traverses the system, because the site now has three distinct audiences moving
through it (humans, assistants, crawlers) and they must all traverse the same
graph.

### 9.1 The single traversal principle

**All navigation is graph traversal.** A breadcrumb walks `containedIn`; "nearby"
walks `nearby`; "same formation" walks `sameFormation`; "featured in" walks the
reverse of view-composition. There is no navigation that is not an edge, which is
why the hand-authored `internalLinkRouteIds` arrays are deleted
(`INTERNAL_LINKING_GRAPH.md` §1) and why the rendered links always equal the
schema edges. Experientially this is Experience principle 3 — **never end on a full
stop**: every fact, place and answer ends on an edge to a next thing.

### 9.2 How each agent traverses

| Agent | Enters at | Traverses by | Needs |
|---|---|---|---|
| **Human — knowledge** | an entity or the karst root | curiosity edges: story→place→nearby→route (the seven loops of `EXPERIENCE_ARCHITECTURE.md` §4) | a reason to click carried in the anchor text |
| **Human — planning** | a `/plan/*` view or search | decision → composed entities → directory | real distances, a yes/no in the first screen |
| **Human — history** | `/place/aglen/history/` or Wikipedia | period → evidence → entity → person → correction | addressable, cited chapters |
| **Human — commerce** | directory or map | category → listing → nearby entity | NAP, hours, proximity |
| **AI assistant** | the AI export / `/sources/` | claims-with-sources; entity → related entities | atomic statements, confidence, unknowns |
| **Crawler** | sitemap → any page | rendered links = schema edges; ≤3 clicks to any node | no orphans, no 301-hops, correct hreflang |

### 9.3 Invariants navigation must preserve

- Every entity is reachable from `/karst/` in ≤3 clicks and from `/` in ≤3
  (`CONTENT_HIERARCHY.md` §3).
- Anchor text is generated from the relation and always carries a fact
  (`INTERNAL_LINKING_GRAPH.md` §6): «Проходна — 19,8 км по права линия», not
  "click here".
- Internal PageRank is routed deliberately toward E1 entities, which receive no
  external links and for which internal linking is the *only* signal
  (`INTERNAL_LINKING_GRAPH.md` §4). Every E5 page links to ≥2 E1 entities with a
  stated real-world reason — the famous introduces the local (Experience principle
  10). Navigation is thus also the authority-transfer mechanism.

---

## 10. Search architecture

Search is a read model over the graph. It has an internal face (the site's own
search) and an external face (Google, assistants). Both are fed by the same
generated index.

| Layer | What it does | How it's built | When |
|---|---|---|---|
| **Google / web** | classical retrieval | rendered pages + JSON-LD + sitemap | now (Phase-1 base) |
| **Internal name search** | find any entity by name/alias in any language | static prebuilt index shipped to the client | Phase 2 |
| **Entity search** | resolve a query to an entity node | index keyed by name + `sameAs` + coordinates | Phase 2 |
| **Intent search** | route a query to the owning view | index of intents → views (`SEARCH_INTENT_MAP.md`) | Phase 2 |
| **Related entities** | "you may also want" | precomputed neighbourhood per entity (build) | Phase 2 |
| **Autocomplete** | typeahead over entity names + intents | the same static index | Phase 2 |
| **Recommendations** | discovery feed ordering | graph edges filtered by client experience state (§11) | Phase 3 |
| **Semantic / vector search** | "caves I can enter without a guide" | embeddings precomputed at build over claim text; static or Worker-served vector index | Phase 4 |
| **AI search** | assistant answers | the AI export (§16) | Phase 2→4 |

Design rules:

- **The index is derived and rebuildable**, never hand-maintained. It is a build
  artifact keyed by the graph hash.
- **Vector search adds no server dependency at read time**: embeddings are
  computed once at build; the read path is a static index or a thin Cloudflare
  Worker over generated vectors (ADR-006). No live model in the request path.
- **Search never invents entities**: a query that resolves to nothing returns "we
  don't have this yet — here is who might," the same honest-unknown pattern the
  content uses (`SEARCH_INTENT_MAP.md` §4 rule 4).

---

## 11. Experience engine

The runtime that makes `EXPERIENCE_ARCHITECTURE.md` happen. It is not UX; it is the
mechanism by which its nine layers (**L0 Orientation → L8 Return**) and seven loops
are produced from the graph and client state. Every mechanism below is graph
traversal plus local state — no server, no profiling.

| Mechanism | How it works | Substrate | Layer/loop |
|---|---|---|---|
| **Curiosity propagation** | every entity surfaces 3+ edges out, ≥1 to something unknown (an E1 reached from an E5), the reason in the anchor | `sameFormation`, `nearby`, `subjectOf` edges | L0→L1, principle 3 |
| **Discovery** | a photo or map pin resolves to an entity → its story → its place → a nearby place | entity + media + edges | the master loop §4.1 |
| **Recommendations** | rank an entity's neighbourhood by edge type × unseen × season, client-side | precomputed neighbourhood + local state | L1–L3 |
| **Nearby entities** | straight-line distance from coordinates, labelled; road distance when sourced | `geo` + derived distances | L3 |
| **Memory** | visited/saved entities and quest progress kept in local storage; not re-offered | experience state (§8) | L7 |
| **Return visits** | second/third-visit surfaces differ because memory filters the feed and season changes the content | local state + seasonal claims | L8, the season loop §4.4 |
| **Progress** | AR quests and route completion tracked locally; a visit becomes a record the visitor owns | experience state + AR bridge | L5 |
| **Seasonal content** | claims tagged with an applicable season/month render or recede by current date | claims with `observedAt`/season, client date | the season/return loop |

Three hard constraints keep this honest:

- **Personalization is client-side and privacy-preserving by construction.** The
  server knows nothing; memory lives on the device. This is the only design that
  is both static and private.
- **The engine can only offer what the graph contains.** Seasonal content that has
  not been observed does not exist to be shown (`PROGRAMMATIC_SEO_PLAN.md` T5); the
  engine never fabricates a recommendation to fill a slot.
- **Incompleteness is shown, not hidden** (Experience principle 12). The engine
  surfaces the unreached path, the unseen season, the stated unknown — because a
  memory needs an unfinished edge to become a return. The current site's failure,
  in this frame: **minute 5 never arrives** (`EXPERIENCE_ARCHITECTURE.md` §6.1) —
  there is nothing to discover, so curiosity felt at minute 1 goes out at minute 2.
  The engine exists to make minute 5 arrive.

---

## 12. Editorial engine

How people and AI change the graph. The governance, roles, trust ladder, SLAs and
conflict resolution are owned by `EDITORIAL_OPERATING_SYSTEM.md`; this section is
the *system interface* — the machine-side of how an edit happens.

### 12.1 The contribution pipeline

```
Contribution (proposal, human or AI)
   → automated checks (schema valid · claim atomic · source present · G1–G5)
   → human review (independent reviewer of sufficient tier for the confidence)
   → ratification (a signed Review; the two-person rule for anything > uncertain)
   → merge to graph (Git) → Revision created
   → incremental (frontier) rebuild → deploy
```

Two governance rules bind this pipeline and are enforced, not trusted:

- **The two-person rule** (`EDITORIAL_OPERATING_SYSTEM.md` §2.2): no one approves
  their own claim onto an indexed page. An `uncertain` claim may self-publish (it
  advertises its own doubt); a `verified` claim waits for a second human and until
  then renders in the "not yet verified" block.
- **Confidence-tiered publish gates** (OS §2.3): `verified` needs a T4 reviewer;
  `disputed` needs a T4 reviewer plus the Managing Editor plus an EDR. Trust is
  earned by accuracy, is per-domain, and decays (the T0–T5 ladder, OS §3).

### 12.2 Workflows (system view)

- **Publishing** — a record reaches `published` only after review; no entity skips
  `CLAIMS-ATTACHED` (OS §5.1). The directory's existing `status` state machine
  (`localBusinesses.ts`) is the proven pattern, generalised to every entity.
- **Review** — routed by content class and domain to a qualified, independent
  reviewer; the verdict is signed (`Claim.verifiedBy`) so a reviewer's own
  accuracy is measurable and their tier can decay.
- **Correction** — a `supersedes` claim; `/corrections/` is generated, not
  maintained. **Retraction** ≠ correction: a retracted claim is struck, kept, and
  a notice published (OS §6.6).
- **Version history & decisions** — Git + the `Revision` model; precedent-setting
  editorial decisions are recorded as **EDRs**, process changes as **RFCs** (OS
  §11). The ledger *is* the changelog.

### 12.3 How AI assists here

AI drafts claims from evidence, extracts candidate facts from archive scans,
proposes translations, flags contradictions, and finds gaps ("this entity has no
coordinate"). Each output is a *proposal* entering the same pipeline as a human
contribution, tagged `proposedBy:<ai>` and awaiting ratification. **AI has no
trust tier; it enters where a T0 anonymous submission enters** (OS §10.3) and can
ratify nothing. An AI-drafted claim a human approves becomes that *human's* claim —
they are `verifiedBy`, accountable, and their tier decays if it was wrong.

---

## 13. Localization

Language policy is fixed by `TOPICAL_AUTHORITY_MAP.md` §3.3: **two tiers.**

| Tier | Languages | Carries | Indexing |
|---|---|---|---|
| **Knowledge** | `bg`, `en` | the full graph — every entity, claim, view | indexed |
| **Surface** | the other 12 | a fixed small set (home, getting here, what to see, contact, safety) | `noindex` until human-reviewed |

Mechanics:

- **`LocalizedText` is the unit of translation**, attached to claims and entity
  names, and **bound to a claim revision**: if the claim supersedes, the
  translation reverts to `machine-draft` until re-reviewed, so a stale translation
  cannot masquerade as current (`KNOWLEDGE_PIPELINE.md` §6.7; drift is failure F4).
- **Fallback:** a surface-tier language links to the `bg`/`en` node with correct
  `hreflang` rather than publishing a machine paraphrase of a sourced claim
  (`KNOWLEDGE_GRAPH.md` §7 rule 10; V8).
- **Machine assistance, human ratification:** AI proposes translations; a human
  speaker promotes a language to knowledge tier only when real demand appears
  (`5_YEAR_SEO_ROADMAP.md`, 12-month item 8). Editorial and consent documents are
  never machine-translated (`EDITORIAL_OPERATING_SYSTEM.md` §5.6).

The immediate engineering win: tiering plus per-language code splitting removes
most of the 469 KB locale payload every visitor currently downloads.

---

## 14. Media system

Media is knowledge with provenance. The rare trust signal available to this
project is that its photographs can be *dated, credited and proven*
(`EEAT_STRATEGY.md` §3) — the current AI-looking imagery quietly discredits
everything else and is replaced (`CONTENT_GAP_ANALYSIS.md` B7).

| Media kind | Role | Metadata required | Also Evidence? |
|---|---|---|---|
| **Photo** | depict + prove | EXIF capture date, author, entity, license | often yes (proves presence, coordinate) |
| **Drone** | depict landform/canyon scale | capture date, author, legality note, entity | yes |
| **360 / panorama** | immersive place | capture date, author, entity, viewpoint | yes |
| **Audio** | oral history, ambience | recording date, informant (consented), entity | yes (interview evidence) |
| **Video** | route, event | capture date, author, entity | sometimes |
| **AR asset** | the quest layer | author, entity anchor, "modern creation" label | no — never mixed with collected folklore |

Rules:

- **Every media record carries a license, a date, a credit and a depicted
  entity**, or it does not render. `aiGenerated:true` may never reach a place page
  (V11); an image attached to an entity must actually depict that entity (image
  workflow, `EDITORIAL_OPERATING_SYSTEM.md` §5.5).
- **Media provenance flows into claims.** A dated photo of Дупката `supports` its
  coordinate and existence claims — the mechanism that turns a photograph into
  E-E-A-T Experience. Content-hash integrity is enforced (V-hash): a silently
  swapped asset is caught, not trusted.
- **Reuse is licensed for the commons.** CC-BY-SA uploads to Wikimedia Commons make
  these the images shown for the entity across Wikipedia and assistants
  (`EEAT_STRATEGY.md` §5) — media is an authority instrument, not decoration.
- **Compression and formats** are a build concern (§15): originals retained with
  metadata, derivatives generated (`optimize-images.mjs` already exists).

---

## 15. Build pipeline

The build is where the graph becomes the site and where every architectural rule
becomes an enforced invariant. It extends — does not replace — the current
prerender build and the proven `i18n-audit.mjs`.

### 15.1 The stages, in order (build fails on any gate)

```
1. VALIDATE RECORDS        schema-valid; ids unique & never-reused; refs resolve (V3)
2. ASSEMBLE GRAPH          build in-memory graph; derive reciprocal edges & distances
3. GRAPH AUDIT             KNOWLEDGE_GRAPH §7 (10 health rules)                 ── gate
4. GENERATION GATES        PROGRAMMATIC_SEO_PLAN §1 (G1–G5 / V-gate)            ── gate
                           fail → record demoted to a parent table row (not a page)
5. LINK AUDIT              INTERNAL_LINKING_GRAPH §5 (10 anti-orphan)           ── gate
6. PIPELINE AUDIT          KNOWLEDGE_PIPELINE §13 (V1–V15, V-hash, V-schema):   ── gate
                           no unsourced indexed claim (V1); stated-unknown present (V2);
                           provenance both-ways (V4); no orphan evidence (V6);
                           disputes rendered whole (V14); confidence never flattened (V15);
                           no AI-authored fact (V10); evidence-hash integrity (V-hash)
7. TRANSLATION AUDIT       tier rules; no unreviewed indexed paraphrase (V8)    ── gate
8. COORDINATE AUDIT        no inherited coordinates; geo has a fix (health-rule 8) ── gate
9. GENERATE JSON-LD        per entity, from claims (uncertainty & disputes preserved)
10. GENERATE PAGES         SSG per surface × knowledge-tier language
11. GENERATE INTERNAL LINKS from edges (resolve ids → current paths; zero 301-hops)
12. GENERATE SITEMAPS      only real, indexable URLs; lastmod from graph
13. GENERATE SEARCH INDEX  static index (+ embeddings in Phase 4)
14. GENERATE AI EXPORT     claims dump + llms.txt (confidence words) + MCP manifest
15. VERIFY DERIVED == REGENERATE   hand-edits to derived artifacts fail (V12)
16. OPTIMIZE MEDIA         derivatives from retained originals; keep EXIF dates
17. BUNDLE                 per-language code splitting; hashed, immutable assets
18. DEPLOY                 Cloudflare Pages; atomic; previous build recoverable
```

### 15.2 Properties the pipeline guarantees

- **A page cannot exist without its data.** The gate runs in the build, so the
  thin-page failure is mechanically impossible, not a matter of discipline.
- **Every derived artifact agrees with every other**, because all are functions of
  one frozen graph: rendered links = schema edges = sitemap = search index = AI
  export.
- **The build is incremental** — stages 9–15 are pure per-entity functions over
  the regeneration frontier (§4.6), so only the touched neighbourhood
  regenerates; at 10⁵ claims the audit itself runs per-partition, in parallel
  (`KNOWLEDGE_PIPELINE.md` §14).
- **Broken-graph detection is a build failure, not a runtime surprise.** Dangling
  references, orphans, reciprocity breaks, unsourced indexed claims, coordinate
  inheritance, confidence flattening and silently-mutated evidence all stop the
  deploy. A recommendation that is not one of these rules is, by pipeline principle
  9, not part of the architecture — it is a hope.

---

## 16. AI architecture

AI is a first-class *consumer* and a supervised *proposer* of the graph. It is
never an author of record. The governing rule holds at the system level: **AI may
draft, extract, translate, link and question; it may never ratify a claim, and it
may never emit a fact that is not a transcluded, sourced claim**
(`KNOWLEDGE_PIPELINE.md` §8; `EDITORIAL_OPERATING_SYSTEM.md` §10). On the reading
side, the on-site companion is not a chatbot in a corner but **five faces of one
companion** — Guide, Storyteller, Planner, Local, Memory-keeper
(`EXPERIENCE_ARCHITECTURE.md` §7) — each drawing on the one substrate.

| Capability | How it works | Guardrail |
|---|---|---|
| **Grounded answering (the companion)** | RAG over the claim ledger; retrieves claims with sources and answers with citations | no claim → states the unknown, offers who to ask; never fabricates a distance/safety/access fact |
| **Citing sources** | every AI statement carries the `SourceId`(s) of the claims it used | an uncited assertion is a bug, blocked in output |
| **Explaining uncertainty** | renders `confidence`; presents `disputed` claims side by side | uncertainty preserved end-to-end from claim → JSON-LD → answer; flattening it fails (V15) |
| **Never inventing facts** | constrained to the retrieved claim set; extractive/compositional, not inventive | contradicts a claim → refuse; beyond the graph → "not documented" |
| **Drafting for editors** | proposes claims from evidence, extracts from scans, suggests translations, flags contradictions and gaps | output is a Contribution at T0-equivalent, awaiting human review; `proposedBy:<ai>` + empty `evidence[]` fails (V10) |
| **Machine export / MCP** | per-entity JSON-LD, a claims dump, `llms.txt` ✅, and a future read-only **MCP server** exposing entities/claims as resources | read-only; sources and confidence attached; no write path |
| **Knowledge export** | the graph is publishable as a licensed dataset (the "become the source" strategy) | licensing explicit; provenance intact; never circular self-citation (OS §5.4) |

The MCP surface is the strategic endpoint: it lets external assistants query the
Lukovit Karst graph *directly*, with sources and uncertainty, making this system
the retrieval target rather than one more page to scrape. It is a Cloudflare
Worker over the same generated graph artifact — no new source of truth (ADR-007).

---

## 17. Implementation roadmap

Four phases, each independently deployable, each additive, none a rewrite. This
compresses `5_YEAR_SEO_ROADMAP.md` into engineering milestones and inherits its
sequencing and risks.

### Phase 1 — Publish what exists + switch on measurement (weeks, no field work)
*Deployable value without touching the data layer.*
- Publish the history and legends as addressable, cited pages; create
  `/person/trifon-kunev/`; promote the "only Ъ village" fact (`5_YEAR` Q1,Q3,Q6,Q7)
  — these free L1/L3 of the experience for the first time.
- Retire the 18 thin landing pages via `_redirects`; verify GSC/Bing.
- **Name an author** — now a *constitutional* commitment, not a task
  (`EDITORIAL_OPERATING_SYSTEM.md` Constitution rules 1, 4, 15; everything is
  attributed to the "DevOpsio" org today). Add provenance footers.
- Language tiering + per-language code splitting.
- **Exit:** the best content is addressable; ~180 thin URLs gone; measurement on.
  No graph yet — these ship on the current architecture.

### Phase 2 — Stand up the knowledge layer (the graph exists)
*The core evolution. Built additively beside the running routes.*
- Introduce `src/graph/` (records + schema + generated types); **absorb
  `region.ts`** (ADR-002). Partition from day one under `src/graph/karst/lukovit/`
  (ADR-009).
- The field days: coordinates for the nine E1 places; road distances.
- `/karst/` root + clusters; `/place/<slug>/` entity namespace; claim ledger +
  `/sources/` + `/corrections/`; the `Observation`/`Evidence` layer.
- `graph-audit.mjs` enforcing §15's gates (health + G1–G5 + anti-orphan + V1–V15);
  internal links derived from relations (delete `internalLinkRouteIds`, kill
  301-hops). Internal search over the static index.
- **Exit:** ~34 entity pages, every fact sourced, zero orphans, subject is the
  region.

### Phase 3 — Specialise, and open contribution
*Depth and the first non-engineer authoring.*
- Routes with GPX; photography pages; `/plan/*` views transcluding claims;
  school-trip and accessibility views.
- Media library with EXIF-dated originals replacing AI-looking imagery; first
  OSM/Commons/Wikidata contributions.
- The Experience engine (discovery feed, memory, seasonal content) — L1–L8 loops
  live.
- Structured authoring templates → the first resident/historian contributions; the
  trust ladder begins to gate (`EDITORIAL_OPERATING_SYSTEM.md` §3).
- **Exit:** the site answers what encyclopaedias cannot; its entities begin to
  exist in the commons; contribution is open beyond engineers.

### Phase 4 — Scale and machine-native
*Turn the reference into infrastructure.*
- Archive citations; named cave inventory; biodiversity cluster; interviews at
  scale (the deadline item).
- Vector/semantic search; the read-only **MCP server**; licensed knowledge export.
- Web authoring UI over the same records; **per-region partitioning and editorial
  federation** as the graph grows past one village (ADR-009).
- **Exit:** the Lukovit Karst is a recognised entity in Wikidata/Wikipedia/OSM and
  Google's graph, and this system is the source behind it.

---

## 18. Architectural decision records

Each ADR states the decision, the rejected alternatives, the trade-off, and the
long-term consequence. These are the decisions a Principal review will interrogate.

### ADR-001 — The graph lives in Git as validated records, not in a database
**Decision.** Store entities/claims/sources/evidence/media as schema-validated
JSON records in the repository; compile to an in-memory graph at build.
**Rejected.** (a) A headless CMS/DB — adds a server, a runtime dependency and a
second source of truth; loses free diff/blame/revert. (b) Hand-written TS modules
only — engineer-only, un-authorable by historians.
**Trade-off.** We lose live editing and pay a rebuild per change; we gain native
versioning, reversibility, reviewability (PRs), and a serverless deployment.
**Consequence.** The "Wikipedia + Git" model of `KNOWLEDGE_PIPELINE.md` §10 is
literal. Scale is handled by the frontier and partitioning (ADR-005, ADR-009).

### ADR-002 — Absorb `region.ts`; do not replace it
**Decision.** The graph subsumes the existing nine-entity `region.ts`, preserving
its Wikidata ids, coordinates, `linear` markers and `nearbyPlaces()`/`sameAsUrls()`.
**Rejected.** A greenfield data model ignoring the current file.
**Trade-off.** Slight migration effort vs. discarding the best-built, most honest
data in the repo.
**Consequence.** Continuity of the existing derivation, which is already 80% of
relation-based linking (`INTERNAL_LINKING_GRAPH.md` §7).

### ADR-003 — Static generation only; no SSR/ISR server
**Decision.** Every page is SSG; interactivity is client islands; freshness comes
from frontier regeneration on graph change, not request-time rendering.
**Rejected.** SSR or ISR — a server, a cache-coherence problem, a per-request cost,
for content that changes on the order of days.
**Trade-off.** A graph change requires a rebuild+deploy (seconds-to-minutes)
rather than being instant; in exchange the system is cheap, reliable, reproducible.
**Consequence.** The deployment stays exactly what it is today on Cloudflare Pages.

### ADR-004 — The authoring surface evolves; the data format is the fixed contract
**Decision.** PRs → structured templates → web UI, all producing the same
validated records through the same review pipeline.
**Rejected.** Committing now to a specific CMS or admin UI.
**Trade-off.** Early contributors use developer tooling.
**Consequence.** Non-engineers are onboarded later with zero data migration and no
`App.tsx` rewrite — the core of "evolve, never rewrite."

### ADR-005 — Generators are pure functions of an entity + its neighbourhood
**Decision.** JSON-LD, page, links, index and export for an entity depend only on
that entity and its regeneration frontier; the build is incremental and
content-hashed.
**Rejected.** Whole-site regeneration per change.
**Trade-off.** More generator discipline (no global reads in a generator).
**Consequence.** The build stays tractable from tens of entities to hundreds of
thousands of claims (`KNOWLEDGE_PIPELINE.md` §14).

### ADR-006 — Semantic search adds no read-time model dependency
**Decision.** Precompute embeddings at build; serve via a static index or a thin
Worker over generated vectors.
**Rejected.** A live vector database / embedding call in the request path.
**Trade-off.** Embeddings refresh on rebuild, not instantly.
**Consequence.** Search inherits the reliability and cost profile of the static
site; no new always-on infrastructure.

### ADR-007 — AI is a consumer and a supervised proposer, never an author of record
**Decision.** AI grounds strictly on claims-with-sources, states unknowns, and
submits proposals to human review (entering at the T0-equivalent); a future MCP
surface is read-only over the generated graph.
**Rejected.** Autonomous AI content generation or an AI that can publish.
**Trade-off.** Slower content growth than an unsupervised generator.
**Consequence.** Trustworthiness — the entire Phase-2 objective — is structurally
protected; the failure mode of "plausible invented fact" cannot occur.

### ADR-008 — Region-first subject, brand-second — encoded as a data invariant
**Decision.** The root subject is the Lukovit Karst; Aglen is the base and the
voice. Entities are never namespaced under the village (`CONTENT_HIERARCHY.md` §0).
**Rejected.** Keeping the village as the root node.
**Trade-off.** The brand does not own the URL root (mitigation in
`CONTENT_HIERARCHY.md` §6).
**Consequence.** The site becomes *eligible* for the region's demand and coherent
to Google's world model — the precondition for everything else.

### ADR-009 — The region is one boundary with three roles
**Decision.** A **region** is simultaneously (a) the data-partition boundary of the
graph (`src/graph/karst/<region>/…`, `KNOWLEDGE_PIPELINE.md` §14.3), (b) the
governance-federation unit with its own Regional Editor and calendar
(`EDITORIAL_OPERATING_SYSTEM.md` §8), and (c) a physiographic subtree of the graph
(`KNOWLEDGE_GRAPH.md` §3.1). These three boundaries are defined to *coincide*.
**Rejected.** Independent partitioning schemes for storage, governance and
geography — which would let a data shard, an editorial team and a karst district
disagree about where one region ends and the next begins.
**Trade-off.** Regions must be drawn along physiographic lines even when an
administrative or traffic line would be more convenient; cross-region entities
(a river spanning two) are the seams and are edited by agreement, validated at the
partition boundary.
**Consequence.** "One village → all of Bulgaria" scales in **data, people and
subject at once**, along a single boundary. Entity ids stay globally unique; only
storage, build and editorial ownership partition. A new region is chartered by
adopting the Constitution verbatim, inheriting every workflow, and may set its
priorities but not its rules of trust — so thousands of entities across dozens of
regions remain one coherent graph.

### ADR-010 — Canonical domain is `aglen.bg`; the Cyrillic IDN redirects to it
**Decision.** `aglen.bg` (Latin) is the single canonical domain. `SITE_URL` (today
`https://xn--c1aerj5d.com`, `seo.ts:26`) becomes `https://aglen.bg`; `ъглен.com`
301-redirects to `aglen.bg`; both are verified in GSC and the sitemap is resubmitted
on the primary.
**Rejected.** Keeping the Cyrillic IDN `ъглен.com` — it renders as punycode
(`xn--c1aerj5d.com`) in browsers, bots and link previews, reads as phishing/spam to
the 13 non-Cyrillic audiences, and is untypable for them; a minor Bulgarian
entity-match benefit does not outweigh the reach and trust cost.
**Trade-off.** A one-time consolidation and GSC change-of-address; a short signal
migration.
**Consequence.** Every canonical, `og:url`, JSON-LD `@id`, hreflang alternate and
sitemap URL resolves to one trustworthy Latin domain that matches "brand is Aglen"
(ADR-008). Highest-value single SEO action (`MASTER_ARCHITECTURE_REVIEW.md` §2/C1).

### ADR-011 — Brand strings: the site is "Aglen Tourism"; Unlocking Bulgaria is never the site name
**Decision.** `Organization` and `og:site_name` = "Aglen Tourism / Ъглен Туризъм".
"AR мисии / Unlocking Bulgaria" is removed from `siteName` (today `og:site_name` =
`nav.quests` = "AR мисии", `seo.ts:361`).
**Rejected.** Branding the village site as the AR campaign — it inverts the identity
and fragments the entity across `og:site_name`, `author` and `alternateName`.
**Trade-off.** A copy/config change across the `seo.ts` brand sources.
**Consequence.** One consistent brand entity for Google and assistants. This ADR
governs the brand *strings* only; the product model is ADR-013.

### ADR-012 — Media lives in object storage, not Git
**Decision.** Original media (photo, drone, 360, audio, video) live in object storage
(Cloudflare R2 or equivalent); the graph holds a `uri` + content hash + EXIF
(`KNOWLEDGE_PIPELINE.md` §3 `MediaAsset`). Git holds records and references, not binary
originals at scale.
**Rejected.** Continuing to commit media to `public/assets` (166 files today) — Git
handles binary blobs poorly, and the longitudinal-photography strategy
(`EEAT_STRATEGY.md` §3) implies tens of thousands of assets across seasons and years.
**Trade-off.** An object-store dependency and an upload/reference step.
**Consequence.** Media scales with the graph; V-hash integrity still holds;
derivatives are generated at build from referenced originals.

### ADR-013 — Navigation, Domain & Product Boundaries
**Decision.** Two products, two domains, two canonical roles, one relationship:
- `aglen.bg` owns the *place* — village, place, history, event, business, visit
  content. Identity: "Aglen / Ъглен Туризъм".
- `unlockingbulgaria.com` owns the *product* — an independent national AR/GPS mission
  platform and application, beginning around Ъглен and extending across Bulgaria.
  Identity: "Unlocking Bulgaria".
- Relationship: **Aglen is Unlocking Bulgaria's first live destination** — not its
  owner and not its subordinate.
Unlocking Bulgaria is modelled as a `SoftwareApplication`/`MobileApplication`, **not**
a `subOrganization` of Aglen Tourism. On `aglen.bg` it appears as an integrated
external experience *available at selected places* — never as the site's identity, a
duplicate mini-site, or a sibling geographic category beside Places (C16). The chain is
**place → available experience → Unlocking Bulgaria**: one compact home block, one
local mission hub (`/ar-missions/`), and a contextual affordance on each place page.
Navigation stays village-first (region-first governs only the knowledge subject and URL
namespace, ADR-008); Events and Local Business may remain top-level.
**Rejected.** (a) "Unlocking Bulgaria is a feature of Aglen" / a `subOrganization` —
subordinates an independent national product to a village site and breaks its identity.
(b) Karst-first front-door navigation — makes the village's home read as a geology
portal. (c) A second full UB promo hero on `aglen.bg` — the mini-site-within-a-site of
C16.
**Trade-off.** A cross-domain handoff to maintain and an IA reconciliation to do
*before* entity pages.
**Consequence.** A visitor always knows whether they are on the village site, exploring
a place, or opening the external application. Gated by the navigation acceptance
criteria (`MASTER_ARCHITECTURE_REVIEW.md` §15.8.1) before Phase-2 entity work. Full
model: `INFORMATION_ARCHITECTURE_REVIEW.md`.

### ADR-003 (amended, 2026-07-25)
"No server" bars request-time rendering of *knowledge*, not all edge logic. Cloudflare
edge routing via `_worker.js` (the `/` → `/bg` route, `/cdn-cgi/`) is permitted.

### ADR-004 (amended, 2026-07-25)
The JSON-records-over-schema migration (graph moves from hand-written `region.ts` TS to
schema-validated records with generated types) is elevated from "later" to a **Phase-2
prerequisite** — it is the unlock for all non-engineer contribution
(`MASTER_ARCHITECTURE_REVIEW.md` §5).

---

## 19. Non-functional requirements

| Attribute | Requirement | How it is met |
|---|---|---|
| **Performance** | fast on a phone in a village with poor signal | SSG, hashed immutable assets, per-language splitting (fix the 1029 KB regression), lazy islands |
| **Scalability** | one village → all of Bulgaria; tens → hundreds of thousands of claims | frontier rebuilds (ADR-005), region partitioning along the ADR-009 boundary, static read path |
| **Accessibility** | usable by the audience `SEARCH_INTENT_MAP.md` U8 names, and content *about* accessibility that nobody else publishes | semantic structure, `/plan/accessibility/`, field-surveyed step-free data |
| **SEO** | entity coherence, no orphans, correct hreflang, real sitemaps | the build gates (§15); Phase-1 technical base already ✅ |
| **AI discoverability** | be retrievable and citable | claims-with-sources export, MCP, uncertainty preserved (§16) |
| **Reliability** | a static site is a very reliable one | serverless static hosting; Git as backup; atomic deploys |
| **Maintainability** | survives a year of edits and any one contributor leaving | invariants-as-build-failures; derived-not-authored; one source of truth; EDR case-law (OS §11) |
| **Observability** | know whether the objective is met | GSC + CWV + quarterly AI-citation audit + the knowledge-health dashboard (`EDITORIAL_OPERATING_SYSTEM.md` §12.5) |
| **Offline support** | the field and the AR app work without signal | service-worker cache of graph slice, tiles, media (§8) |
| **Security** | small attack surface; contributions are safe | static hosting; no user data in the core; contributions gated by review, not raw writes; a bad contribution is one superseded claim, never a corrupted page |

The measurement that matters most is the cheapest: twenty fixed regional questions
asked of four assistants each quarter, recording whether the system is cited
(`EEAT_STRATEGY.md` §10; `EDITORIAL_OPERATING_SYSTEM.md` §12.5). It measures the
actual objective more directly than any ranking report. One deliberate,
counter-intuitive target: **known-unknowns published > 0** — a knowledge site
claiming to know everything is lying, and the machines can tell.

---

## 20. Architectural constitution

Fifty immutable rules. Every future developer, AI assistant and contributor must
satisfy all of them; a change that violates one is wrong regardless of its merits.

**I. Source of truth**
1. The graph is the single source of truth; every other artifact is derived from
   it and may be regenerated at will.
2. There is exactly one source of truth for any fact; a second copy is a defect.
3. A fact is written once, as a claim, and transcluded everywhere it appears.
4. No subsystem holds private truth; the directory, events, media and maps all
   read the one graph.
5. If a surface and the graph disagree, the graph is right and the surface is
   regenerated.

**II. Claims, sources, evidence**
6. Every claim carries a source, a confidence and a method; a claim without a
   source cannot render on an indexed page (V1).
7. Unknown, uncertain and disputed are states, not absences: they render as stated
   unknowns and side-by-side disputes with equal prominence, never as silence (V2,
   V14). This is load-bearing for trust and for the experience loops.
8. Confidence is preserved end-to-end; collapsing a hedge to an assertion in any
   rendering or export is the one transformation forbidden most strictly (V15).
9. Evidence is distinct from source; presence is proven by dated, hash-checked
   evidence, not asserted by tone (V-hash).
10. Corrections supersede; they never delete. Retractions are struck and kept and
    announced. History is preserved.
11. Provenance is bidirectional and total; every fact walks up to an observation
    and every observation down to what it supports (V4).

**III. Entities and the graph**
12. Entity ids are stable forever and never reused; retired ids are tombstoned
    redirects; slugs may change with a 301 (V9).
13. A relation is asserted only when it is true in the world; no edge exists to
    help a page.
14. Reciprocity holds: a symmetric edge renders both ways with identical values (V7).
15. An entity with fewer than three unique sourced claims is a section of its
    parent, not a page.
16. Coordinates are never inherited; an entity claiming `geo` has its own fix.
17. Every entity is reachable from `/karst/` in ≤3 clicks; there are no orphans.
18. The root subject is the Lukovit Karst; entities are never namespaced under the
    village.

**IV. Derivation**
19. Anything derivable — links, distances, breadcrumbs, JSON-LD, sitemaps, the
    search index, the AI export — is derived, never hand-authored (V12).
20. Every internal link is the rendering of a typed edge; if there is no edge there
    is no link. Anchor text is generated from the relation and carries a fact.
21. Rendered links, schema edges, sitemap and AI export are all functions of one
    frozen graph and always agree.
22. Generators are pure functions of an entity and its regeneration frontier; no
    global reads.
23. Navigation and experience never end on a full stop; every fact ends on an edge
    to a next thing.

**V. Pages and generation**
24. A page cannot exist without its data; the generation gates run in the build.
25. A view transcludes claims and authors no fact of its own.
26. Page count is an output of how much is known, never a target; incompleteness is
    shown, not hidden.
27. A keyword with no real-world referent never becomes a page.
28. The fixed entity-page section order is honoured; empty sections vanish and are
    never padded.

**VI. Build and validation**
29. Every architectural rule is a build-time assertion in `graph-audit.mjs`; the
    build fails on violation rather than trusting discipline.
30. The build is incremental: only a changed entity's frontier regenerates.
31. No deploy ships a dangling reference, an orphan, an unsourced indexed claim, a
    flattened confidence, a coordinate inheritance, a mutated-evidence hash, or a
    301-hop internal link.
32. Deploys are atomic and the previous build is recoverable.
33. `llms.txt`, JSON-LD and the rendered page never disagree about a fact.

**VII. Rendering and state**
34. All knowledge pages are statically generated; there is no request-time server
    rendering of knowledge.
35. Truth lives at build time; only the ephemeral and the personal live at runtime.
36. Experience state (memory, progress, saved places) is client-side and
    privacy-preserving; the server profiles no one.
37. The URL is a first-class state container; any shareable state is expressible in
    it and is crawlable.
38. Offline is a supported state for entities, maps and media used in the field.

**VIII. AI**
39. AI never authors a claim that lacks evidence and never ratifies; it proposes,
    a human decides (V10).
40. AI answers only from sourced claims, cites them, and states the unknown when no
    claim exists.
41. AI has no trust tier; it enters where a T0 anonymous submission enters and can
    approve, publish or merge nothing.
42. The machine export preserves source and confidence on every statement; the MCP
    surface is read-only over the generated graph.

**IX. Localization and media**
43. Only `bg` and `en` carry the full knowledge tier; other languages publish a
    fixed surface and `noindex` until human-reviewed.
44. A translation is bound to a claim revision and reverts to draft on supersede; an
    unreviewed machine translation is never authoritative and never indexed (V8).
45. Every media asset carries a license, a capture date, a credit and a depicted
    entity, or it does not render; `aiGenerated:true` never reaches a place page.
46. AR and any modern creation are labelled as such and never mixed with collected
    tradition.

**X. Evolution and governance**
47. Evolve, never rewrite; every change ships additively beside the running site
    and no phase rewrites `App.tsx`.
48. The data format and review pipeline are the fixed contract; the authoring
    surface may evolve freely over them.
49. A region is one boundary with three coinciding roles — data partition,
    governance unit, physiographic subtree (ADR-009); a new region adopts the
    Constitution verbatim and may not fork the schema or the rules of trust.
50. The system protects its rarest trait — refusing to publish what it cannot
    verify — against all pressure to fill a page; and every future feature must
    satisfy this constitution, the Experience Principles, the Pipeline principles
    and the Editorial Constitution.

### 20.6 Precedence among the four constitutions

Each constitution is supreme in its own domain. Where they meet at an edge:

1. **Safety and reality win over everything.** No rule in any document licenses
   publishing an unsourced safety fact or a fabricated claim
   (`EDITORIAL_OPERATING_SYSTEM.md` Constitution rules 1–3, entrenched).
2. **On data and derivation**, this Architectural Constitution governs; the
   Pipeline principles are its mechanism.
3. **On what a human feels and how they move**, the Experience Principles govern.
4. **On who may act and how trust is earned**, the Editorial Constitution governs.
5. A conflict that cannot be resolved by domain is settled by RFC
   (`EDITORIAL_OPERATING_SYSTEM.md` §11.2), never by drift. Until an amendment
   passes, the stricter rule holds.

---

*This blueprint is the single source of truth connecting product, experience,
knowledge, implementation and engineering. It is subordinate to reality and to the
thirteen documents it integrates, and superior to any individual feature. Amend it
by RFC — never by drift.*
