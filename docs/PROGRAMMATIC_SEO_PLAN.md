# Programmatic SEO Plan

**Deliverable 5 of 10.** What can legitimately be generated at scale, what
cannot, and the gate that decides.

---

## 0. This site has already run a programmatic SEO experiment, and it failed

`src/landingPages.ts` is a programmatic system. 27 page definitions × 14
languages = 378 URLs, generated from:

- one `landingText` block per language, containing **three section headings,
  three section bodies and three FAQs**,
- a per-page name substituted into a title template,
- a keyword list.

Two pages have real overrides (`lukovitGuide` in six languages, partially). The
other 25 render identical bodies under different names. The file is 825 lines and
carries, generously, four pages of information.

This is not a criticism of the decision — it is the standard first move and it is
what most tourism sites in Bulgaria still ship. But it is the reason the
programmatic plan below opens with a deletion and a gate, not with a list of
templates. **The failure mode of programmatic SEO is not "too many pages"; it is
"pages whose variables do not vary".**

The diagnostic is one question per template:

> *If I swap the entity in this template, does more than the noun change?*

For `natureAroundAglen` → `natureTourismAglen`, nothing changes. For a template
like "cave × access × season", almost everything changes. That question is the
gate.

---

## 1. The generation gate

A programmatic page may be generated **only if all five conditions hold.** This
is proposed as a build-time assertion, so it is enforced rather than intended.

| # | Condition | Threshold | Why |
|---|---|---|---|
| **G1** | **Unique data points** | ≥ 8 facts true of this page and no sibling | Below this the page is a title with a paragraph |
| **G2** | **Sourced** | ≥ 60% of those facts carry a source id | Unsourced scale is the definition of spam |
| **G3** | **Real entities** | Every entity referenced exists in the graph with coordinates or an external id | Prevents inventing places to fill a grid |
| **G4** | **Non-substitutability** | Swapping the primary entity changes ≥ 60% of rendered text | The `landingPages.ts` test |
| **G5** | **Query evidence** | Someone actually asks this — GSC impressions, a real question received, or a documented query pattern | Prevents grids generated for their own sake |

Fail any one → the page is not generated, and its content becomes a **row in a
comparison table** on the parent cluster page instead. A table row is a
legitimate, indexable, useful home for a fact that cannot carry a page.

**Corollary — the count is an output, not a target.** The plan below produces
between 40 and 180 new pages depending entirely on how much field data is
collected. Any version of this plan that names a page count first is the failed
experiment again.

---

## 2. Templates that pass the gate

Ranked by (value × feasibility). Each has an explicit data dependency, because
in every case the data is the work and the template is trivial.

### T1 — Entity × Access ★ highest value
`/place/<entity>/` — not a "programmatic" template in the SEO sense, but the
generator that matters: one page per real entity, rendered from claims.

- **Variables:** coordinates, containment, formation, access route, parking,
  road distance from 3 origins, season, hazards, light hours, photographs, 3–10
  sourced claims, graph edges.
- **Volume:** ~34 entities × 2 knowledge-tier languages = **68 pages**.
- **Gate:** G1 is the binding constraint. An entity with 3 claims becomes a
  section of its parent (see `CONTENT_HIERARCHY.md` §2.1).
- **Depends on:** the GPS/photograph field day, plus the claim ledger.
- **Why it beats everything else:** every other template on this list is a
  *composition* of these pages. Build this first or build nothing.

### T2 — Origin × Destination (the distance matrix) ★ highest ROI
`/plan/getting-here/from-<origin>/` for origins with real demand: София,
Плевен, Ловеч, Велико Търново, Русе, Варна, Враца, Ябланица.

- **Variables:** road km, drive time, route description, road quality, last
  fuel, last shop, public-transport option, whether a car is required, what
  the drive is like in winter.
- **Volume:** 8 origins × 2 languages = **16 pages**. Plus the same matrix
  rendered *inside* every entity page.
- **Gate:** passes G1–G5 comfortably **once the distances exist**. Fails G2
  completely today because they do not.
- **Depends on:** one day of driving, or a defensible routing-API source with
  the method disclosed.
- **Why:** "how far is X from Sofia" is the single highest-volume travel query
  pattern in Bulgaria and this site answers it for nowhere.

### T3 — Cave × Access class
`/karst/caves/` cluster page + `/place/<cave>/` for those that qualify.

- **Variables per cave:** entrance coordinates, length, depth, whether it can be
  entered without equipment, whether a guide is required, protection status,
  bat sensitivity and closed season, difficulty, nearest parking, source.
- **Volume:** 6–12 caves that survive verification.
- **Gate:** G3 is binding — a cave without verified coordinates and access
  status must not get a page. **This is a safety constraint before it is an SEO
  one.**
- **Why:** "which caves near X can I enter without a guide" has genuine demand,
  is dangerous to answer wrongly, and is answered honestly by nobody. Getting it
  right is a citation magnet.

### T4 — Place × Season × Light (photography) ★ unique, cheap
`/plan/photography/<entity>/` for the 8–10 most photogenic entities.

- **Variables:** golden-hour bearing and time by month, which wall is in shadow
  when, water level by season, mist frequency, best access time, focal lengths
  that work, whether a drone is legal there.
- **Volume:** 10 × 2 = **20 pages**.
- **Gate:** passes G4 spectacularly — every entity has a different aspect and a
  different valley orientation, so *no two pages resemble each other*.
- **Depends on:** four visits (one per season) with timestamps, plus sun-position
  computation from the coordinates, which is arithmetic once coordinates exist.
- **Why:** the beautiful-places guide already contains the best writing on the
  site and it is exactly this. It is also the single content type most likely to
  earn organic links from photographers.

### T5 — Month × Region
`/plan/when-to-come/<month>/` — 12 pages per knowledge language.

- **Variables:** water level, trail condition, what is flowering/nesting, light
  duration, temperature range, crowding, which events fall in the month, which
  entities are unreachable, what to bring.
- **Volume:** **24 pages**.
- **Gate:** G1 fails today (nothing is observed), passes after one year of
  seasonal field notes. **Do not build this before the observations exist** —
  a 12-page month grid written from imagination is the archetypal thin
  programmatic set.
- **Mitigation:** ship 4 season pages first (passes on partial data), expand to
  12 months in year 2.

### T6 — Route × Difficulty
`/route/<slug>/` — one per real walked route.

- **Variables:** GPX, length, ascent, surface, waymarking, time, hazards,
  season, water availability, exit points, what you see in order.
- **Volume:** 6–10 routes.
- **Gate:** G3 binding — no route without a recorded track. **A route page
  without a GPX is a liability, not a page.**
- **Why:** trail pages attract links from hiking communities and are directly
  citable by assistants answering "is there a walk near X".

### T7 — Audience × Region
`/plan/with-children/`, `/plan/school-trip/`, `/plan/accessibility/`,
`/plan/without-a-car/`, `/plan/one-day/`, `/plan/weekend/`.

- **Variables:** a *filtered and re-ordered* subset of entities with
  audience-specific attributes (step-free? supervision needed? duration?
  toilets? bus?).
- **Volume:** 6 × 2 = **12 pages**.
- **Gate:** passes only when entities carry audience attributes. Today they
  don't, which is exactly why the existing `familyTrip` page is generic prose.
- **Why `/plan/accessibility/` specifically:** no site in this region publishes
  it, the audience has almost no alternative source, and the field survey is
  half a day.

### T8 — Historical period × Place
`/history/<period>/` ×8, cross-linked to the entities that evidence them.

- **Variables:** entirely different per period — evidence type, archive, dates,
  the specific finds, the specific registers.
- **Volume:** **16 pages**, and **the text already exists.**
- **Gate:** passes G1, G3, G4 today. G2 (sourcing) is the work: the material in
  `bg.ts` references Ottoman registers, archaeological reports and 1920s
  folklore collections without naming any of them.
- **Why:** highest content-value-per-hour on the entire list, because the
  writing is done and only the citations are missing.

### T9 — Business × Category × Place ✅ already correct
The directory. Already entity-based, already `LocalBusiness`-schema'd, already
gated on `status: "published"`. **No change recommended** beyond adding opening
hours and proximity edges.

---

## 3. Templates that fail the gate — do not build

Written out because these are the ones that get proposed in every programmatic
SEO plan and every one of them would repeat the `landingPages.ts` failure.

| Proposed | Fails | Verdict |
|---|---|---|
| "Best caves near Sofia" / "Top 10 X in Bulgaria" | G1, G3 — the site has no data on caves outside its own region | **No.** Being 40th listicle about Bulgarian caves adds nothing. Rank instead on `/karst/caves/` for caves it can actually document |
| "Hidden places in Bulgaria" | G1, G5 — a keyword, not a subject | **No** (currently exists as `hiddenPlaces`; retire) |
| "Nature near Pleven" / "near Lovech" / near every town | G4 — swapping the town changes one noun | **No.** Serve this via T2, which changes *everything* when the origin changes |
| Cultural / nature / adventure / eco / rural / slow tourism "in Aglen" | G1, G4 — six labels for one place | **No.** These are six of the eighteen pages to retire. They are marketing categories, not subjects |
| Language × page for all 14 languages | G2 — machine-shaped translations of unsourced claims | **No.** See the two-tier language policy |
| "X vs Y" comparisons of nearby attractions | G5 — nobody asks | **No**, with one exception: *Prohodna vs Devetashka* has genuine demand and genuinely different answers |
| Auto-generated FAQ per page | G1 — questions nobody asked, answered from the page above them | **No.** FAQ entries must come from questions actually received. The site has a contact address; use it as the source |
| Event × year archive pages | G1 for past years with no photographs | **Conditionally** — only years with a real gallery, which the `memoriesGallery` data partly supports ✅ |

---

## 4. Volume projection

| Wave | Templates | Pages (bg+en) | Blocked on | Wall time |
|---|---|---|---|---|
| **0 — publish what exists** | T8 history, person, stories, name | **~30** | nothing | 1–2 weeks |
| **1 — entities** | T1 for entities with ≥8 claims | **~40** | GPS day + photographs | 1 month |
| **2 — access** | T2 distance matrix | **~16** | 1 driving day | 1 week after wave 1 |
| **3 — specialist** | T3 caves, T6 routes, T4 photography | **~40** | field work, cave access verification | 3–6 months |
| **4 — audience** | T7 planners | **~12** | entity attributes from waves 1–3 | 6 months |
| **5 — temporal** | T5 months | **~24** | 12 months of observation | year 2 |
| | **Total** | **~162 pages, bg + en** | | |

Against roughly 122 URLs retired (18 landing pages × 14 languages ÷ tiering, plus
the empty flag-gated routes), the site ends with **more real pages and fewer
total URLs**. That is the correct direction and the opposite of what programmatic
SEO usually produces.

---

## 5. Implementation shape

Concretely, in this codebase:

```
src/graph/
  entities.ts        ← absorbs region.ts; the node table
  relations.ts       ← typed edges, validated for reciprocity
  claims.ts          ← { id, entityId, statement: LocalizedText,
                         source: SourceId, observedAt, confidence, method }
  sources.ts         ← { id, kind: 'wikidata'|'archive'|'field'|'interview'|
                         'publication'|'official', citation, url?, accessedAt }
src/render/
  entityPage.ts      ← T1
  clusterPage.ts     ← karst clusters
  planView.ts        ← T2, T4, T5, T7 — transclude claims, never author facts
scripts/
  graph-audit.mjs    ← enforces G1–G5 and the ten health rules; fails the build
```

Three properties this shape buys, each of which the current architecture lacks:

- **A fact is written once.** Correcting the drive time from Sofia corrects it on
  sixteen pages, in every language, in the schema, and in `llms.txt`.
- **A page cannot exist without its data.** The gate runs in the build, so the
  thin-page failure becomes mechanically impossible rather than a matter of
  discipline.
- **Views cannot drift from entities.** `/plan/weekend-from-sofia/` transcludes;
  it has no prose of its own that can go stale.

`scripts/graph-audit.mjs` is the important one. `scripts/i18n-audit.mjs` already
proved the pattern works in this repository — including catching its own false
positives. The same treatment applied to the graph turns every rule in these ten
documents from a recommendation into a build failure, which is the only form in
which architecture survives contact with a year of edits.
