# Knowledge Pipeline — how reality becomes trusted knowledge

**Phase 3 — System Architecture (2 of 4).** The operating system through which an observation on the
ground becomes a sourced claim, an addressable entity, a link in a graph, a line
of JSON-LD, a page, a sentence an assistant quotes, and — when it is wrong — a
correction that flows back into the graph and rewrites everything downstream.

Reads on top of `KNOWLEDGE_GRAPH.md` (the node/edge model, the `Entity` and
`Relation` types, entity confidence E1–E5, the ten graph-health rules),
`EEAT_STRATEGY.md` §2 (the `Claim`/`Source` types — the claim ledger) and
`PROGRAMMATIC_SEO_PLAN.md` §5 (the `src/graph/` file layout and
`graph-audit.mjs`). It **extends** those types; it does not restate or contradict
them. Where this document adds `Observation`, `Evidence`, `MediaAsset` and
`Revision`, they attach to the existing spine rather than replacing it.

**Scope boundary, stated once.** This is the *machine*: the lifecycle of data and
artifacts, and the automation around them. It is **not** the people-governance —
who is allowed to approve what, escalation, editorial authority, informant
consent policy, the review rota. That is the **Editorial Operating System**
(`EDITORIAL_OPERATING_SYSTEM.md`, sibling deliverable). Wherever a human decision
or a permission appears below, the Pipeline names the *point* at which a human
ratifies and moves on; *who* that human is and *by what rule* they decide is
deferred to the Editorial OS by cross-reference. The Pipeline says "a Reviewer
ratifies here." The Editorial OS says "here is who may be a Reviewer, and here is
what disqualifies them."

---

## 0. The one-paragraph thesis

The current codebase has **surfaces** and **views** but no **entities** and no
**claims** (`TOPICAL_AUTHORITY_MAP.md` §4). Its editorial *disposition* is already
correct — `guides.ts` omits what it cannot verify, `region.ts` refuses to derive a
road distance to a river's mouth, `trustPages.ts` states where each kind of fact
comes from — but none of it is *evidenced*, *versioned* or *reversible*. The
pipeline below turns that disposition into infrastructure. It resembles
**Wikipedia combined with Git**: every artifact has a stable id, a revision
history, a diff, a blame/lineage chain, a talk-page-style dispute record, and a
revert. Nothing published is hand-maintained downstream of the graph; the graph,
the links, the schema, the sitemap and the search index are all **derived** and
**regenerated** from the same sourced facts. A fact is written once and corrected
once.

---

## 1. The spine — twelve transitions from reality to reader and back

Reality enters at the top, flows down into published surfaces, out to machines and
readers, and returns as corrections. **Each transition either originates data or
derives it.** Sourced things are authored by a human (or ratified from an AI
proposal); derived things are computed by the build and may never be hand-edited.

| # | From → To | What crosses | Originated / Derived | Gate to cross | Reversible by |
|---|---|---|---|---|---|
| T1 | Reality → **Observation** | A person present on the ground records what they saw | Originated | Recorded with who/when/where | Deleting the observation (never silent) |
| T2 | Observation → **Evidence** | The observation is captured as an inspectable artifact: photo+EXIF, GPX, audio, scan, screenshot, API response | Originated | Artifact stored, hashed, dated | Re-capture; supersede |
| T3 | Evidence → **Verification** | A human (or a check) judges the evidence sufficient for a stated confidence | Originated (judgement) | Method + verifier recorded | Re-verification; downgrade |
| T4 | Verification → **Claim** | One atomic sourced statement enters the ledger | Originated | Has `source`, `confidence`, passes gate G2 | `supersedes` (keeps history) |
| T5 | Claim → **Entity** | Claims aggregate onto a stable node; ≥3 unique claims earns a page | Originated node, derived aggregation | Node has id, `sameAs` or coordinates | Merge / split / retire (tombstone) |
| T6 | Entity → **Knowledge Graph** | Nodes + typed edges resolve into one graph | **Derived** | Edges reciprocal, acyclic containment | Regenerate |
| T7 | Graph → **Internal Links** | Every link is the rendering of an edge | **Derived** | Anti-orphan rules (`INTERNAL_LINKING_GRAPH.md` §5) | Regenerate |
| T8 | Graph + Claims → **Structured Data** | JSON-LD nodes, `sameAs`, claim provenance, confidence | **Derived** | One `FAQPage`/URL; confidence preserved | Regenerate |
| T9 | All of the above → **Pages** | Surfaces render entities/claims per language/device | **Derived** | No unsourced claim on an indexed page | Regenerate |
| T10 | Pages → **AI / Search Engines** | Crawlers retrieve; `llms.txt`, sitemaps, citation policy | Derived export | Uncertainty survives into the export | Re-crawl |
| T11 | Machines → **Visitors** | An assistant quotes, or a person reads and visits | External | — | — |
| T12 | Visitors → **Corrections** → graph | A reader or model reports an error; it enters as a claim | Originated | Enters as `method:"interview"` claim | Re-enters at T4 |

**The loop closes at T12→T4.** A correction is not an edit to a page. It is a new
observation (or a challenge to an old claim) that re-enters the spine at
verification and propagates back down through every derived layer. This is the
whole design: **the page is never the source of truth, so the page is never
edited to fix a fact.** The claim is superseded and everything regenerates.

Two properties fall out of the table and are worth stating as law:

- **Everything above T5 is originated and carries provenance.** Everything from T6
  down is derived and carries none of its own — it inherits lineage from what it
  was computed from. A derived artifact with hand-edits in it is a bug the build
  must catch (rule **V12**).
- **The pipeline is a DAG with one back-edge.** T1→T10 is acyclic. T12 is the only
  cycle, and it re-enters at T4, never lower. There is no path by which a page
  edits a claim, or a link edits an entity. That is what makes the whole thing
  reversible.

---

## 2. Identifiers and lineage — the Git layer

Every artifact has a **stable id, never reused**, and a **monotonic revision
number**. Ids are the primary key of trust: a claim quoted by an assistant in 2027
must resolve to the same statement, or its correction, in 2031.

### 2.1 Id conventions

| Artifact | Id form | Example | Rule |
|---|---|---|---|
| **Entity** | `<kebab-slug>` (matches URL) | `dupkata`, `trifon-kunev`, `lukovit-karst` | Stable forever. Never reused even after retirement — retired ids are **tombstoned**, not freed |
| **Claim** | `clm-<entityId>-<nnnn>` | `clm-dupkata-0007` | Sequential per entity, zero-padded. A superseded claim keeps its id forever |
| **Source** | `src-<kind>-<nnnn>` | `src-archive-0003` | `kind` from the `Source` union in `EEAT_STRATEGY.md` §2 |
| **Evidence** | `evd-<yyyymmdd>-<nnn>` | `evd-20260412-004` | Dated by capture, not by import |
| **Observation** | `obs-<yyyymmdd>-<nnn>` | `obs-20260412-001` | Dated by the visit |
| **Media** | `med-<yyyymmdd>-<nnn>` | `med-20261014-012` | A subtype of Evidence; same date rule |
| **Relation edge** | `rel-<from>--<type>--<to>` | `rel-dupkata--sameFormation--prohodna` | **Derived, deterministic** — computed, never hand-numbered |
| **Person** | Entity with `kind:"person"` | `trifon-kunev` | Persons are entities; no separate namespace |
| **Revision** | `<artifactId>@<n>` | `clm-dupkata-0007@3` | `n` monotonic per artifact; the global commit is the Git SHA |

The slug is the human-facing key precisely because it appears in URLs and in
`sameAs`; the prefixed ids are internal and stable against renaming. **A slug may
be aliased but never re-pointed:** if `dupkata` is later understood to be two
arches, it splits into `dupkata-upper` / `dupkata-lower` and `dupkata` becomes a
permanent redirect (rule V9), never a reassignment.

### 2.2 Provenance chains — bidirectional, both ends stored

The load-bearing invariant. Every fact can be walked upward to the moment a person
stood on the ground, and every observation can be walked downward to everything it
supports.

```
Observation ──produces──▶ Evidence ──verifiedInto──▶ Claim ──assertedOn──▶ Entity
    obs-…    ◀──capturedBy──  evd-…  ◀──evidences──   clm-…  ◀──claims[]──  slug
```

Every arrow is stored in **both directions** (rule V4): `Claim.evidence: EvidenceId[]`
*and* `Evidence.claims: ClaimId[]`; `Entity.claims: ClaimId[]` *and*
`Claim.entityId`. A one-directional link is an orphan waiting to happen and fails
the build. `/sources/` renders the chain forward (source → claims it backs);
`/field-notes/` renders it from the observation end (visit → what it established);
every entity page renders it inward (claim → its source and date). Same data,
three windows, all derived.

### 2.3 Revisions, diffs, blame

- **Every artifact is append-mostly.** A claim is corrected by writing a *new*
  claim with `supersedes: <oldId>`; the old claim is retained with
  `status:"superseded"`. Nothing is deleted to fix a fact — deletion is reserved
  for retraction (T-retirement, §6.10).
- **A revision is a commit.** The Git history *is* the revision log. `clm-…@3`
  means the third committed state of that claim. `graph-audit.mjs` can diff two
  commits and emit the set of entities whose rendered output changed — the
  regeneration frontier (§9.4).
- **Blame is lineage.** "Who asserted that Дупката is Lower-Cretaceous, on what
  evidence, verified by whom, on what date" is answerable for every sentence on
  the site because `Claim` carries `source`, `verifiedBy`, `observedAt`, `method`
  and now `evidence[]`. This is `git blame` for facts.
- **The talk page is the dispute record.** Contradictions are not resolved by
  overwriting; they are recorded as competing claims plus a `Dispute` note (§7).
  `/corrections/` and the per-entity "disputed" block are the rendered talk pages.

---

## 3. The artifact types — extending the ledger

Building directly on the `Claim` and `Source` types in `EEAT_STRATEGY.md` §2 and
the `Entity`/`Relation` types in `KNOWLEDGE_GRAPH.md` §1. New types added here:
`Observation`, `Evidence`, `MediaAsset`, `Revision`, `Dispute`. Extended fields on
`Claim` are marked `// +`.

```ts
// ── Reality entry point ────────────────────────────────────────
type Observation = {
  id: ObservationId;                 // obs-YYYYMMDD-NNN
  observedAt: string;                // ISO — when the observer was present
  observer: PersonId;                // who was on the ground (a real entity)
  where: { lat: number; lon: number } | { entityId: EntityId } | { linear: true };
  note: LocalizedText;               // what was seen, in words — incl. failures
  evidence: EvidenceId[];            // artifacts captured during this observation
  supersedes?: ObservationId;        // a re-visit that corrects an earlier one
};

// ── The inspectable artifact ───────────────────────────────────
type Evidence = {
  id: EvidenceId;                    // evd-YYYYMMDD-NNN
  kind: "photo" | "gpx" | "audio" | "scan" | "screenshot" | "apiResponse"
      | "document" | "measurement";
  observation?: ObservationId;       // present for field evidence; absent for archive/API
  source?: SourceId;                 // present for publication/archive/official/map evidence
  capturedAt: string;                // ISO — EXIF date for photos, log date for API
  hash: string;                      // content hash — detects silent mutation
  uri: string;                       // where the artifact lives (asset path / archive ref)
  claims: ClaimId[];                 // + reverse link: what this evidence supports
  exif?: Record<string, string>;     // retained for photos — the trust signal (EEAT §3)
  license?: string;                  // CC-BY-SA etc., for Commons contribution
  note?: LocalizedText;
};

// ── Media is Evidence that also renders ────────────────────────
type MediaAsset = Evidence & {
  kind: "photo";
  alt: LocalizedText;                // required — never derived, never empty
  credit: PersonId;
  provenance: "original" | "licensed" | "commons";
  aiGenerated: false;                // hard-coded false; V11 forbids true on a place page
  supersedes?: EvidenceId;           // replacing the AI-looking imagery keeps the record
};

// ── The unit of trust (EEAT §2), extended ──────────────────────
type Claim = {
  id: ClaimId;
  entityId: EntityId;
  statement: LocalizedText;          // one atomic factual assertion
  source: SourceId;
  confidence: "verified" | "reported" | "uncertain" | "disputed";
  evidence?: EvidenceId[];           // + provenance to the artifact(s)
  observedAt?: string;
  verifiedBy?: PersonId;
  method?: "field" | "archive" | "interview" | "publication" | "official" | "derived";
  supersedes?: ClaimId;
  status?: "active" | "superseded" | "retracted";   // + lifecycle state (§6.2)
  disputeOf?: ClaimId;               // + this claim competes with that one (§7)
  proposedBy?: "human" | AiAgentId;  // + AI may propose; a human ratifies (§8)
  ratifiedBy?: PersonId;             // + who accepted it into the ledger
};

// ── The Git layer, made explicit ───────────────────────────────
type Revision = {
  ref: string;                       // artifactId@n
  commit: string;                    // Git SHA
  at: string;                        // ISO
  by: PersonId | AiAgentId;
  action: "create" | "amend" | "supersede" | "retract" | "restore";
  note?: string;                     // the commit message; the "why"
};

// ── The talk page ──────────────────────────────────────────────
type Dispute = {
  id: DisputeId;
  entityId: EntityId;
  claims: ClaimId[];                 // ≥2 competing claims, presented side by side
  status: "open" | "resolved" | "unresolvable";
  resolution?: { winner?: ClaimId; note: LocalizedText };  // may stay null forever
};
```

Nothing above lets a page hold a fact. A page is a projection; it has an id-free
existence and dies on the next regenerate.

---

## 4. Roles — who feeds the machine

The Pipeline cares about roles only as **producers and consumers of artifacts**.
Authority, permissions and the approval matrix belong to the Editorial OS; the
table below says *what each role puts into and takes out of the spine*.

| Role | Originates | Consumes | Enters the spine at | Ratifies? |
|---|---|---|---|---|
| **Researcher** | `Source`, archive `Evidence`, `Claim` (publication/archive/official) | Graph, disputes | T2–T4 | Proposes; Reviewer ratifies scholarly claims |
| **Photographer** | `MediaAsset`, EXIF, `Observation` | Entities needing media | T1–T2 | Ratifies own media; alt/credit required |
| **Historian** | Archive `Source`s, dated `Claim`s, `Dispute`s (e.g. the two etymologies) | History entities, registers | T3–T4, T7 | Ratifies historical claims |
| **Local resident** | Oral-tradition `Claim` (`method:"interview"`), `Observation`, corrections | Story/legend entities | T1, T12 | Consents; never self-ratifies to `verified` |
| **Volunteer** | GPS `Observation`, GPX `Evidence`, corrections, OSM contributions | E1 entities lacking coordinates | T1–T2, T12 | Proposes; Editor ratifies |
| **Editor** | `Claim`s, entity merges/splits, retirements, publication decisions | The whole graph | T3–T5, T-retire | Ratifies most claims; publishes |
| **Reviewer** | Verification judgements, `verifiedBy` stamps, review outcomes | Claims awaiting review | T3, T-review | **The ratifying role for high-risk claims** |
| **Architect** | Types, `graph-audit.mjs` rules, the file layout, id conventions | The pipeline itself | Meta | Ratifies schema changes |
| **AI assistant** | *Proposals only* — draft claims, extracted candidates, translations, suggested edges, questions | Everything, read-only until ratified | Alongside T2–T8 as proposals | **Never.** Every AI output is a proposal a human ratifies (§8) |

The one hard rule visible in this table: **the AI assistant is the only role that
can never ratify.** Every other role can, for some class of artifact, be the human
who accepts something into the ledger; the Editorial OS says which class for whom.
The AI can propose at almost every stage and ratify at none.

---

## 5. Per-stage specification

For each stage of the spine: **Inputs · Outputs · Quality gates · Confidence ·
Automation · Human approval · Conflict resolution.** Gates reference the five
generation gates G1–G5 (`PROGRAMMATIC_SEO_PLAN.md` §1), the ten graph-health rules
(`KNOWLEDGE_GRAPH.md` §7) and the build rules V1–V15 (§13 below).

### 5.1 Observation (T1)

- **Inputs:** a person on the ground; a phone; a notebook. Nothing else.
- **Outputs:** an `Observation` with observer, timestamp, location, note —
  including failures ("the path from the church was overgrown; we turned back",
  `EEAT_STRATEGY.md` §3).
- **Quality gates:** observer is a real `PersonId`; `where` resolves; timestamp
  present.
- **Confidence:** n/a — an observation is raw, pre-judgement.
- **Automation:** EXIF/GPS auto-fills `where` and `observedAt` from the first
  photo of the visit. A watcher ingests dropped files into the observation.
- **Human approval:** none to *record*; recording is not publishing.
- **Conflict resolution:** a re-visit that contradicts an earlier one uses
  `supersedes` and both are retained. The ground can change; the record shows it.

### 5.2 Evidence (T2)

- **Inputs:** an `Observation`, or an external `Source` (archive, publication,
  API).
- **Outputs:** an `Evidence`/`MediaAsset` — hashed, dated, licensed, with EXIF
  retained for photos.
- **Quality gates:** `hash` computed; `capturedAt` present; media carries `alt`
  and `credit`; `aiGenerated:false`.
- **Confidence:** derived from `kind` — a timestamped field photo is stronger than
  a screenshot, which is stronger than an unsourced note.
- **Automation:** hashing, EXIF extraction, thumbnail/`srcset` generation
  (`optimize-images.mjs` already exists), sun-position computation from
  coordinates for photography claims.
- **Human approval:** none to store. Approval happens at verification.
- **Conflict resolution:** two photos disagreeing (water level, path state) are
  both kept and dated; the disagreement becomes seasonal data, not an error.

### 5.3 Verification (T3)

- **Inputs:** `Evidence` + a proposed statement.
- **Outputs:** a judged `confidence` and a `verifiedBy` + `method` stamp.
- **Quality gates:** evidence sufficient for the claimed confidence — `verified`
  requires field/archive/official/publication method; `reported` allows
  interview; `uncertain` requires the unknown be *nameable*; `disputed` requires
  ≥2 competing claims.
- **Confidence:** this is the stage that assigns it. The four levels map to
  evidence, not to tone.
- **Automation:** the build can *downgrade* automatically (evidence hash changed →
  `uncertain`), never *upgrade*. Upgrades are human.
- **Human approval:** **required.** This is the first hard human gate. A Reviewer
  (Editorial OS decides who, for what) stamps `verifiedBy`.
- **Conflict resolution:** if evidence supports two readings, verification emits a
  `Dispute`, not a coin-flip.

### 5.4 Claim (T4)

- **Inputs:** verified statement + `Source` + `Evidence`.
- **Outputs:** a `Claim` in `src/graph/claims.ts`.
- **Quality gates:** **G2** — has a `source`; V1 — no unsourced claim reaches an
  indexed page; atomicity — one assertion per claim (V13).
- **Confidence:** carried from verification, preserved end-to-end (§7.3).
- **Automation:** AI may *propose* a claim by extracting it from `bg.ts` prose or
  an archive scan (§8); the proposal lands as `proposedBy:<ai>`, `status` withheld
  from render until `ratifiedBy` is set.
- **Human approval:** required to move from proposed → active.
- **Conflict resolution:** a new claim contradicting an active one either
  `supersedes` it (correction) or `disputeOf` it (genuine disagreement). The two
  are different and the author must choose (§7.1).

### 5.5 Entity (T5)

- **Inputs:** claims sharing an `entityId`; `sameAs` ids or coordinates.
- **Outputs:** an `Entity` node in `src/graph/entities.ts` (absorbing
  `region.ts`).
- **Quality gates:** **G1/G3** and health-rule 5 — **≥3 unique claims** or the
  entity renders as a section of its parent, no URL (`CONTENT_HIERARCHY.md` §2.1);
  coordinates required to emit `geo` (health-rule 8).
- **Confidence:** the *entity* confidence axis E1–E5 (`KNOWLEDGE_GRAPH.md` §4) —
  orthogonal to claim confidence. E1 = local memory only; E5 = in Google's KG.
- **Automation:** page-eligibility (≥3 claims), `nearby` edge derivation from
  coordinates (`nearbyPlaces()` already exists), `sameAs` assembly (`sameAsUrls()`
  already exists).
- **Human approval:** required to *create* a node and to merge/split.
- **Conflict resolution:** two nodes found to be one thing → **merge** (§6.5); one
  node found to be two → **split**. Both preserve ids by tombstone/redirect.

### 5.6 Graph → Links → Structured Data → Pages (T6–T9)

These four are **wholly derived** and share one specification:

- **Inputs:** the entity + claim + relation + source tables.
- **Outputs:** the resolved graph; rendered internal links; JSON-LD; HTML per
  language/device.
- **Quality gates:** the ten health rules and V1–V15 — reciprocity, no orphan, no
  dangling `sameAs`, one `FAQPage`/URL, hreflang/JSON-LD/rendered-link agreement,
  language tiering, uncertainty preserved into JSON-LD.
- **Confidence:** *preserved, never flattened* — a `disputed` claim renders as two
  statements and emits both; an `uncertain` claim renders as a stated unknown and
  emits it (§7.3). This is the differentiator.
- **Automation:** **total.** Nothing here is hand-authored. Hand-edits are a build
  failure (V12).
- **Human approval:** none — you cannot approve a derivation, only its inputs.
- **Conflict resolution:** none at this layer — conflicts were resolved upstream at
  T4/T5 or are deliberately carried as disputes.

### 5.7 Export → Machines → Visitors → Corrections (T10–T12)

- **Inputs:** the rendered site.
- **Outputs:** sitemaps, `llms.txt`, robots policy, the citation policy already in
  `trustPages.ts`; and, returning, correction reports.
- **Quality gates:** the citation policy's distinctions survive (legends cited as
  local memory, no fabricated distances attributed to Aglen); corrections enter as
  claims, not as page edits.
- **Confidence:** exported explicitly so an assistant can quote the confidence.
- **Automation:** export generation; correction intake triaged and de-duplicated
  by an AI proposal (§8) that a human ratifies.
- **Human approval:** required to accept a correction into the ledger.
- **Conflict resolution:** a correction re-enters at T4 and runs the full
  verification path. A reader's assertion is `reported` until evidenced — it does
  not overwrite a `verified` claim; it opens a `Dispute` or supersedes on
  evidence.

---

## 6. The ten lifecycles

Each is a state machine: **states** (nouns) and **transitions** (verbs, with the
role/automation that fires them). A superseded/retired state is never deleted — it
is the Git history that makes the whole thing reversible.

### 6.1 Knowledge lifecycle (the meta-cycle)

The lifecycle every fact travels; the other nine are its sub-machines.

```
unknown ─observe─▶ observed ─capture─▶ evidenced ─verify─▶ claimed
   ▲                                                          │
   │                                                     aggregate
   │                                                          ▼
 retract◀─────── published ◀──regenerate── entity-linked ─gate(≥3)─▶ …
                     │
                  correct ──▶ (re-enters at "verify")
```

- **`unknown` is a first-class state, not an absence.** An entity with a nameable
  gap carries an `uncertain` claim ("we do not know whether swimming at Рачков вир
  is safe") and *renders* it (§7.2). Silence is forbidden (V2).
- Terminal states: `published` (with continuous re-verification) and `retract`.
  Nothing else terminates.

### 6.2 Claim lifecycle

```
proposed ─ratify─▶ active ─supersede─▶ superseded (retained forever)
   │                  │
 reject             dispute
   │                  ▼
 discarded         disputed ◀──resolve── active
                      │
                   retract ──▶ retracted (retained, tombstoned)
```

- `proposed` covers AI-drafted and reader-reported claims (§8, §5.7).
- `superseded` is how corrections keep history (`supersedes`, `EEAT` §2.2).
- `retracted` ≠ `superseded`: retraction means *the statement should never have
  been made*; supersession means *a better statement replaces it*. Both are
  retained; only retraction is de-rendered site-wide.

### 6.3 Evidence lifecycle

```
captured ─hash─▶ stored ─attach─▶ cited ─(hash mismatch)─▶ invalidated
                    │                                          │
                 orphaned (no claim) ── V6 build failure       └─▶ re-capture
```

- `orphaned` evidence (stored, cited by nothing) is a **build failure** (V6): it
  means work was done and thrown away, or a claim was deleted without cleaning up.
- `invalidated` fires automatically when a stored artifact's hash no longer matches
  its record — silent mutation is caught, not trusted.

### 6.4 Media lifecycle

```
shot ─exif─▶ described(alt+credit) ─ratify─▶ published
                                                 │
                              ┌──────────────────┤
                          contribute          supersede
                              ▼                  ▼
                        commons-uploaded    replaced (old retained in history)
```

- The **AI-looking imagery** (`EEAT` §3, `CONTENT_GAP_ANALYSIS.md` B7) is not
  deleted; each replacement `supersedes` its predecessor so the record shows the
  upgrade. `aiGenerated:true` may never reach a place page (V11).
- `commons-uploaded` is the authority move: the CC-BY-SA original becomes the
  image the graph shows for the entity (`EEAT` §5).

### 6.5 Entity lifecycle

```
candidate ─gate(≥3 claims + id)─▶ node ─render─▶ page
   │                               │  ▲
 folds-into-parent (§CH 2.1)    merge│split
                                     ▼  │
                              tombstone(redirect) ── retire ──▶ retired
```

- **Merge:** two ids resolve to one thing → survivor keeps its slug; the other
  becomes a permanent redirect (V9). Claims re-point via `entityId` rewrite,
  recorded as revisions.
- **Split:** one id is two things → new slugs; the original tombstones to a
  disambiguation. The `dupkata`→`dupkata-upper`/`-lower` case.
- No id is ever reused (§2.1).

### 6.6 Relationship lifecycle

```
asserted ─validate(reciprocity, no-60km, basis)─▶ active ─(entity retired)─▶ dangling ─prune─▶ removed
```

- Edges are **derived where they can be** (`nearby` from coordinates) and
  **asserted where they must be** (`sameFormation`, `birthPlaceOf`). Asserted
  edges are claims and carry sources.
- **Reciprocity is enforced** (health-rule 9, V7): `A nearby B` ⇒ `B nearby A`,
  same km. A `nearby` >60 km without a `reason` fails (health-rule 4).
- When an endpoint retires, its edges go `dangling` and are pruned; the reverse
  links regenerate (T7).

### 6.7 Translation lifecycle

```
source(bg/en) ─draft(AI)─▶ machine-draft ─review(human speaker)─▶ reviewed ─publish─▶ indexed
     │                                            │
  (no reviewer)                              (drift detected)
     ▼                                            ▼
  tier-2: link to bg/en parent, noindex     re-review
```

- Enforces the **two-tier language policy** (`TOPICAL_AUTHORITY_MAP.md` §3.3):
  `bg`+`en` carry the knowledge layer; the other twelve carry a fixed small
  surface and **link to the knowledge-tier parent rather than publish an
  unreviewed paraphrase** (health-rule 10, V8).
- **Translation drift** (§12) is caught because a translated `statement` is bound
  to a `Claim` revision; if the claim supersedes, the translation reverts to
  `machine-draft` until re-reviewed. A stale translation cannot masquerade as
  current.
- An AI translation is a **proposal** (§8); a human speaker ratifies before a
  tier-2 language indexes it.

### 6.8 Correction lifecycle

```
reported ─triage(dedupe)─▶ accepted ─verify─▶ (supersede | dispute | reject)
    │                          │
 spam/dup                   logged to /corrections/ (dated, with who reported)
    ▼
 discarded
```

- A correction is **not a page edit**; it re-enters the spine at T4 (§1).
- `/corrections/` is **generated from the ledger**, never maintained by hand
  (`EEAT` §2, §6): every `supersedes` with a reader-attributed source is a row.
- Publishing your own errors is the trust signal (`EEAT` §6.2); the lifecycle
  makes it automatic, so it cannot be quietly skipped.

### 6.9 Review lifecycle

```
due(schedule) ─assign─▶ in-review ─(field revisit | archive check | expert read)─▶ outcome
                                                                                      │
                        ┌──────────────────────┬──────────────────────┬──────────────┘
                     confirmed              corrected              downgraded
                     (bump verifiedAt)      (supersede)            (→ uncertain)
```

- Driven by the **update policy cadence** in `EEAT` §8: access/safety every 6
  months and after severe weather; distances annually; coordinates never (they do
  not move — correction only).
- The outcome is always one of three ledger operations; there is no "reviewed, no
  change to the record" that leaves nothing behind — at minimum `verifiedAt`
  advances, which is itself a published trust signal.

### 6.10 Retirement lifecycle

```
active ─(entity gone | claim retracted | page redundant)─▶ deprecated ─301─▶ tombstoned ─(never)─▶ deleted
```

- **Tombstone, don't delete.** The eighteen thin landing pages
  (`TOPICAL_AUTHORITY_MAP.md` §3.1) retire by 301 to the nearest real node, not by
  deletion — reversible, monitored 60 days (`5_YEAR_SEO_ROADMAP.md` risks).
- An id is *never* freed (§2.1). A retired entity keeps its slug as a redirect
  forever so old citations and `sameAs` links never break (V9).
- Retraction of a *claim* de-renders it site-wide but retains it in history —
  reversible by `restore` if the retraction was itself wrong.

---

## 7. Contradiction, unknown, uncertainty — the hard cases, first-class

The pipeline's whole reason to exist is that a village's knowledge is
*incomplete*, *contested* and *partly unknowable*, and an honest machine must
carry all three states without flattening them. This is the section that
distinguishes this site from every tourism board.

### 7.1 Contradiction — competing claims, side by side

The canonical case is already in `bg.ts`: **two etymologies of Ъглен** —
charcoal-burning (въглен) vs. the rock needles (иглен). The site already presents
both without forcing a resolution (`EEAT` §4); the pipeline makes that structural.

- Two claims that genuinely disagree are linked by `disputeOf` and grouped under a
  `Dispute` node (§3). Neither supersedes the other.
- The entity page renders **both, adjacent, with equal prominence**, each with its
  source and confidence. Rule V14: a `Dispute` with `status:"open"` must render
  all its claims or the build fails — you cannot show one side.
- The JSON-LD emits both as separate claim nodes; the AI export (§7.3) marks them
  as competing so an assistant says "two etymologies are proposed" rather than
  picking one.
- **`supersedes` vs `disputeOf` is the author's most consequential choice.**
  `supersedes` = "the old statement was wrong, here is the right one" (one truth,
  history kept). `disputeOf` = "reasonable sources disagree and may never agree"
  (two truths, both shown). Choosing supersede where you should dispute is how a
  site quietly launders a contested claim into a fact. V13 flags a supersede whose
  superseded claim had a different, still-cited source as a candidate mis-choice.

### 7.2 Unknown — the stated gap

`guides.ts` already does this by hand: the Vit guide *states* it holds no verified
swimming-safety information rather than omitting the topic. The pipeline promotes
it from a hand-written notice to a rendered `uncertain` claim.

- An `uncertain` claim has a `statement` that names what is *not* known and,
  ideally, who to ask: *"Whether swimming at Рачков вир is safe is not
  established; the municipality is the authority."*
- It renders in the same section, at the same prominence, as a `verified` claim —
  **never in a de-emphasised footnote** (`SEARCH_INTENT_MAP.md` §4, rule 4).
- **Silent omission is a build failure (V2).** If an entity's parent cluster
  expects a datum (e.g. every cave should state access status) and the entity has
  neither a `verified` nor an `uncertain` claim for it, the build fails. You must
  either know it or say you don't. There is no third option.
- This is defensible precisely because it looks like weakness: a page that says
  "we don't know, ask here" outperforms one that guesses, on every surface, and is
  the only page a careful person forwards to someone else.

### 7.3 Uncertainty preserved end-to-end — into JSON-LD and the AI layer

Confidence is not a UI decoration that gets dropped at export. It travels the full
spine (T4→T10) and lands in machine-readable form.

| Layer | How confidence appears |
|---|---|
| Claim | `confidence` field, one of four values |
| Entity page | `verified` → plain statement; `reported` → "as told locally"; `uncertain` → stated gap; `disputed` → both sides |
| JSON-LD | each claim a node; `uncertain`/`disputed` emitted with a confidence annotation, not silently dropped |
| `llms.txt` / export | claims listed with their confidence word, so an assistant can quote *"reported locally, not archivally confirmed"* |
| Citation policy | `trustPages.ts` already instructs machines to cite legends as local memory — the export enforces it per-claim |

Rule V15: a rendering or export that **collapses** a non-`verified` claim to an
unqualified assertion fails the build. The uncertainty is load-bearing; dropping it
is the one transformation the pipeline forbids most strictly, because it is exactly
how a hedge becomes a lie in transit.

---

## 8. How AI participates without inventing knowledge

The governing rule, stated once and enforced structurally:

> **AI may draft, extract, translate, link and question. It may never author a
> `Claim` that lacks `Evidence`, and every AI action is a proposal a human
> ratifies.**

### 8.1 What AI may propose

| AI action | Produces | Constraint | Ratified by |
|---|---|---|---|
| **Draft** | Prose for an entity section | From ratified claims only; no new facts | Editor |
| **Extract** | Candidate claims from `bg.ts` prose, an archive scan, an interview transcript | Must cite the passage as `Evidence`; lands `proposed` | Historian/Editor |
| **Translate** | Tier-2 language drafts | Bound to a claim revision; `machine-draft` until reviewed | Human speaker |
| **Link** | Suggested `Relation` edges | Only geographically/factually coherent; `nearby` derived not invented | Editor (asserted edges) |
| **Question** | Flags a gap, a likely contradiction, a stale claim, a missing source | Produces a task, never a fact | Whoever owns the entity |

### 8.2 What AI may never do

- Author a `Claim` with no `Evidence`. `proposedBy:<ai>` + empty `evidence[]` is a
  build failure (V10).
- Set `ratifiedBy` or `verifiedBy` — those are `PersonId` fields; an `AiAgentId`
  in them fails the build.
- Upgrade a confidence level (evidence judgement is human, §5.3).
- Reach an indexed page while `proposed`. Un-ratified proposals are `noindex` and
  excluded from JSON-LD, sitemaps and `llms.txt`.
- Invent an entity to fill a programmatic grid (G3, the `landingPages.ts` failure).

### 8.3 The proposal state machine

```
ai-proposed ─human-review─▶ ratified ─▶ (enters the claim/edge/translation lifecycle)
     │
   rejected ──▶ discarded (retained in history; the AI's misses are auditable too)
```

Every AI proposal is a `Revision` with `by:<AiAgentId>` and `action:"create"`,
sitting in a `proposed` state that no derivation reads. The human who ratifies
writes the second revision. This means the Git history distinguishes *what the AI
suggested* from *what a human accepted* — which is the auditability an assistant
needs before it will trust the site, and the record the Editorial OS needs to
judge whether the AI is proposing well. The AI is a tireless research assistant
with no signing authority. That is exactly the right amount of power.

---

## 9. Regeneration — what is derived, and how it rebuilds

Everything from T6 down (§1) is **derived** and regenerates deterministically from
the sourced tables. Hand-authoring a derived artifact is a build failure (V12).

### 9.1 What is sourced vs derived

| Sourced (authored, carries provenance) | Derived (computed, regenerated) |
|---|---|
| `Observation`, `Evidence`, `MediaAsset` | The resolved knowledge graph |
| `Claim`, `Source`, `Dispute` | Internal links + anchor text |
| `Entity` node identity + `sameAs` | JSON-LD / structured data |
| Asserted `Relation` edges | `nearby` edges (from coordinates) |
| Translations (reviewed) | Sitemaps, `hreflang`, `llms.txt` |
| — | Search index, `/sources/`, `/corrections/`, `/field-notes/` |

### 9.2 The five regenerations, and their triggers

| Regeneration | Triggered by a change to | Output | Cost |
|---|---|---|---|
| **Graph** | any entity / claim / edge | resolved node+edge set, reciprocity closed | incremental — only touched partition |
| **JSON-LD** | any claim / entity / `sameAs` / confidence | per-URL schema with preserved confidence | per touched entity |
| **Internal links** | any edge / new entity / retirement | rendered links + reverse "featured in" blocks | per touched entity + its neighbours |
| **Sitemap** | any URL added / retired / tiered | `sitemap.xml` + per-language sitemaps | append/prune only |
| **Search index** | any published claim text | client search index | per touched entity |

### 9.3 The cardinal rule of regeneration

**A fact is written once and propagates everywhere derived.** Correcting the drive
time from Sofia corrects it on the `/plan/getting-here/from-sofia/` page, inside
every entity page that transcludes it, in the JSON-LD, in `llms.txt`, and in the
16 origin pages — because none of those *hold* the fact; they all render the same
`Claim` (`PROGRAMMATIC_SEO_PLAN.md` §5). Views transclude, never author
(`CONTENT_HIERARCHY.md` §2.3). This is what makes drift impossible rather than
merely discouraged.

### 9.4 Incremental regeneration — the frontier

On any commit, `graph-audit.mjs` diffs the changed sourced artifacts and computes
the **regeneration frontier**: the transitive closure of entities reachable from a
changed artifact through one hop of derivation (the entity, its edge-neighbours,
the views that transclude its claims, its cluster page). Only the frontier
rebuilds. A one-claim correction on `dupkata` does not rebuild `prohodna`'s
JSON-LD unless an edge between them changed. This is the property that lets the
graph scale (§14).

---

## 10. The Wikipedia-plus-Git model, made structural

Not decoration — the five properties are each realised by a named mechanism above.

| Wikipedia/Git property | Mechanism in this pipeline |
|---|---|
| **Stable article identity** | `EntityId` slug, never reused, tombstoned on retire (§2.1, §6.10) |
| **Revision history** | Git history = the `Revision` log; `artifactId@n` per artifact (§2.3) |
| **Diff** | `graph-audit.mjs` diffs two commits → the regeneration frontier (§9.4) |
| **Blame / lineage** | `Claim.source`+`verifiedBy`+`evidence[]` → provenance chain, both directions (§2.2) |
| **Revert / reversibility** | `supersedes`/`restore`; tombstone-not-delete; 301-not-remove (§6.2, §6.10) |
| **Talk page** | `Dispute` nodes + `/corrections/`, generated, dated, attributed (§6.8, §7.1) |
| **Merge / conflict** | entity merge/split (§6.5); `supersedes` vs `disputeOf` (§7.1) |
| **Neutral point of view** | competing claims rendered side by side, equal prominence (§7.1) |
| **Verifiability** | no unsourced claim on an indexed page (V1); `/sources/` renders the ledger |
| **Citation needed** | an `uncertain` claim is a rendered "citation needed" that never gets silently filled (§7.2) |

The one place this site goes **further** than Wikipedia: Wikipedia's provenance
stops at "cited to a published source." This pipeline's provenance stops at "a
named person stood here on this date and this is the photograph" — the
`Observation`→`Evidence` layer Wikipedia structurally cannot have, because
Wikipedia forbids original research and this site's entire value *is* original
research about places that exist in no other source (`TOPICAL_AUTHORITY_MAP.md`
§0).

---

## 11. Architecture principles

1. **Reality is the source, the page is a projection.** Nothing downstream of the
   graph is ever the truth; editing a page to fix a fact is a category error the
   build forbids (V12).
2. **A fact is written once.** All duplication is derivation; drift is therefore
   impossible, not merely discouraged (§9.3).
3. **Everything has a stable id and a revision; nothing is deleted to fix it.**
   Supersede, tombstone, redirect — never destroy the record (§2, §6).
4. **Provenance is bidirectional and total.** Every fact walks up to an observation;
   every observation walks down to what it supports (§2.2). One-way links fail.
5. **Unknown and disputed are states, not absences.** They render, they export,
   they are load-bearing (§7).
6. **Confidence is preserved in transit.** The one transformation forbidden most
   strictly is collapsing a hedge to an assertion (V15).
7. **AI proposes; humans ratify; the machine derives.** Three powers, never
   confused. The AI signs nothing (§8).
8. **Derivation is deterministic and incremental.** Same inputs, same output; a
   one-claim edit rebuilds a frontier, not the site (§9.4).
9. **Gates are code, not intentions.** Every rule in these eleven documents is a
   `graph-audit.mjs` assertion or it does not exist (§13).
10. **Honesty is cheaper than fabrication and ranks better.** The site's existing
    refusal to guess is not a limitation to overcome; it is the moat, formalised.

---

## 12. Failure modes and mitigations

| # | Failure | How it happens | Mitigation (build rule) |
|---|---|---|---|
| F1 | **Unsourced claim reaches an indexed page** | A claim authored without `source`, or a `proposed` AI claim leaks to render | V1: no `source` ⇒ not indexable; `proposed` ⇒ `noindex` (§8) |
| F2 | **Orphan evidence** | Evidence captured, its claim later deleted, artifact left dangling | V6: stored evidence with empty `claims[]` fails the build (§6.3) |
| F3 | **Lineage break** | A claim points to a deleted evidence/source id; a one-way link | V4: every provenance link resolves in both directions or fails |
| F4 | **Translation drift** | `bg` claim superseded; the 12 translations still show the old text | V8 + §6.7: translation bound to a claim revision; reverts to `machine-draft` on supersede |
| F5 | **Silent contradiction** | Two active claims disagree and both render as fact | V14: disagreeing claims must be `disputeOf`+`Dispute` and render both (§7.1) |
| F6 | **Silent omission of the unknown** | A gap is left blank instead of stated | V2: an expected datum with neither `verified` nor `uncertain` claim fails (§7.2) |
| F7 | **Confidence flattening** | A `reported`/`uncertain` claim exported as a bare assertion | V15: collapsing non-`verified` confidence fails (§7.3) |
| F8 | **AI-authored fact** | An AI proposal ratified without evidence, or auto-ratified | V10: `proposedBy:<ai>` + empty `evidence[]` fails; `ratifiedBy` must be a `PersonId` (§8.2) |
| F9 | **Id reuse / broken citation** | A retired slug reassigned; an old `sameAs` now points at the wrong thing | V9: retired ids are permanent redirects; reassignment fails (§2.1, §6.10) |
| F10 | **Derived artifact hand-edited** | Someone edits generated JSON-LD or a link block directly | V12: derived outputs are checked against a fresh regenerate; divergence fails |
| F11 | **Evidence silently mutated** | A stored photo/scan swapped without a new id | V-hash + §6.3: content hash mismatch ⇒ `invalidated`, build fails |
| F12 | **Thin page / substitutable template** | The `landingPages.ts` failure recurs at scale | G1–G5 enforced in the build (`PROGRAMMATIC_SEO_PLAN.md` §1) |
| F13 | **AI-generated imagery on a place page** | Stock/generated image passes as an original | V11: `aiGenerated:true` on an entity `MediaAsset` fails; EXIF expected (§6.4) |
| F14 | **The field work never happens** | The whole graph is gated on one driving + one walking day and they slip | Not a build rule — a project risk (`5_YEAR_SEO_ROADMAP.md`). The pipeline *renders the gap honestly* (F6) so the emptiness is visible, not hidden |

F14 is the honest one: the pipeline cannot manufacture observations. What it can do
is make the absence of them a *stated unknown* rather than a fabricated fact — so a
factually empty site is visibly empty, not falsely full.

---

## 13. Build-time validation rules

Concrete assertions in `scripts/graph-audit.mjs`, in the spirit of the existing
`scripts/i18n-audit.mjs` (which already proved the pattern — it parses the TS
source, cross-checks derived output against source, and fails the build, even
catching its own false positives). **Each rule below is a build failure.**

| Rule | Assertion | Fixes failure |
|---|---|---|
| **V1** | No claim renders on an indexable page without a resolving `source`. | F1 |
| **V2** | Every entity has, for each datum its cluster expects, a `verified` **or** an `uncertain` claim — never a blank. | F6 |
| **V3** | Every `Claim.entityId`, `.source`, `.supersedes`, `.disputeOf` and every `Evidence`/`Observation` id **resolves**. No dangling reference. | F3 |
| **V4** | Every provenance link resolves **both ways** (`Claim.evidence[]`↔`Evidence.claims[]`, `Entity.claims[]`↔`Claim.entityId`). | F3 |
| **V5** | ≥3 unique claims per entity page, or it renders as a section of its parent (health-rule 5, G1). | F12 |
| **V6** | No stored `Evidence` with an empty `claims[]` (no orphan evidence). | F2 |
| **V7** | Reciprocity holds for symmetric edges, same km; no `nearby` >60 km without a `reason` (health-rules 4, 9). | — |
| **V8** | No tier-2 language emits an unreviewed entity page; it links to its knowledge-tier parent (health-rule 10). | F4 |
| **V9** | Retired entity ids exist only as permanent redirects; no id reassignment; no internal link to a redirecting path. | F9 |
| **V10** | No claim with `proposedBy:<ai>` and empty `evidence[]`; no `AiAgentId` in `ratifiedBy`/`verifiedBy`. | F8 |
| **V11** | No `MediaAsset` with `aiGenerated:true` on an entity page; place photos carry EXIF `capturedAt`. | F13 |
| **V12** | Derived outputs (JSON-LD, link blocks, sitemaps) equal a fresh regenerate — no hand-edits survive. | F10 |
| **V13** | One assertion per `Claim` (atomicity heuristic); a `supersedes` across a different still-cited source is flagged for review. | §7.1 |
| **V14** | Every `Dispute` with `status:"open"` renders **all** its claims; no single-sided render of a contested fact. | F5 |
| **V15** | No rendering/export collapses a non-`verified` claim to an unqualified assertion; confidence word present in `llms.txt`. | F7 |
| **V-hash** | Every `Evidence.hash` matches its stored artifact; mismatch fails. | F11 |
| **V-gate** | G1–G5 hold for every programmatic page (`PROGRAMMATIC_SEO_PLAN.md` §1). | F12 |
| **V-schema** | Exactly one `FAQPage` per URL; `hreflang`/JSON-LD/rendered-link agree (health-rule 6, `INTERNAL_LINKING_GRAPH.md` §5.9). | — |

The rules run on every build. A recommendation that is not one of these rules is,
by principle 9, not part of the architecture — it is a hope.

---

## 14. Scaling to hundreds of thousands of claims

The site starts at one village (~170 entities, a few hundred claims once the field
work is done). The design target is **all of Bulgaria**: tens of thousands of
entities, hundreds of thousands of claims, contributed by many hands. What holds,
and what must change:

### 14.1 What stays O(1) per edit

- **Authoring a claim** — appending to `claims.ts` (or its partition) is constant;
  ids are per-entity sequential, no global renumber.
- **Provenance lookup** — id → artifact is a map lookup; bidirectional links are
  stored, not searched.
- **Regeneration of one entity** — bounded by the regeneration frontier (§9.4),
  which is the entity plus its edge-neighbours and transcluding views, not the
  site. A one-claim correction touches O(degree), not O(N).

### 14.2 What must be incremental, not full-rebuild

- **Graph resolution, JSON-LD, link generation, search index** all move from
  whole-site rebuilds to **frontier rebuilds** keyed off the commit diff (§9.4).
  At one village a full rebuild is fine; at 10⁵ claims it is not, and the frontier
  mechanism is what makes the difference. Build V12 (derived == regenerate) must
  itself become incremental — verify only the frontier, trust cached hashes for
  the rest.
- **`sameAs` liveness** checks are already quarterly, not per-build
  (`KNOWLEDGE_GRAPH.md` §7.2) — the right call at any scale; batch and sample.
- **The audit** runs per-partition in CI, in parallel, not as one monolith.

### 14.3 Partitioning by entity / region

- **Partition the ledger by region**, mirroring the physiographic tree
  (`KNOWLEDGE_GRAPH.md` §3.1): `src/graph/karst/lukovit/{entities,claims,…}.ts`,
  then `…/iskar-gorge/`, `…/devetaki/`, and eventually one partition per karst
  district / municipality nationally. A partition is an independently buildable,
  independently reviewable unit — the Aglen team's edits never rebuild or block
  Rila's.
- **Ids stay globally unique** (slugs are already global); only *storage* and
  *build* partition. Cross-partition edges (`nearby`, `sameFormation`) are the
  seams and are validated at the partition boundary, not inside it.
- **Contributor scaling is a governance question, not a data one** — how many
  hands, what review load, what trust tiers among contributors — and belongs to
  the Editorial OS. The Pipeline's contribution is that the *data* model already
  supports it: every claim is atomic, sourced, attributed and revertible, so a
  bad contribution is a single superseded claim, never a corrupted page.
- **The E1→E5 strategy is fractal.** "Originate an E1 local entity, connect it by a
  true edge to an E5 anchor" (`TOPICAL_AUTHORITY_MAP.md` §0) is the same operation
  at village scale and at national scale. Дупката→Проходна in Lukovit is
  structurally identical to any village arch → its regional anchor cave. The
  pipeline that documents one village is, unchanged, the pipeline that documents a
  country — which is the entire reason to build it as a machine rather than as a
  set of pages.

---

### Coda

The site already refuses to publish what it cannot verify. The pipeline's only job
is to make that refusal *scale*, *survive a year of edits*, and *propagate a
correction to every place a fact appears* — while keeping the one property that no
competitor can copy: a named person stood on this ground, on this date, and here is
the photograph. Build the machine once; document the region forever.
