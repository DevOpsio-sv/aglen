# Internal Linking Graph

**Deliverable 6 of 10.** How authority circulates, why the current linking
cannot circulate it, and the rules that fix it.

---

## 0. The current link graph, measured

From `landingPages.ts`, every landing page declares
`internalLinkRouteIds: [3–5 targets]`, hand-written. Counting inbound references
across all 27 pages:

| Target | Inbound links from landing pages |
|---|---|
| `visitAglen` | 5 |
| `accommodationNearAglen`, `weekendInAglen` | 4 each |
| `vitRiver`, `caves`, `nearby`, `hiking` | 3–4 each |
| `attractions`, `quests`, `contact` | 3 each |
| **`aiAnswerHub`** | **0** |
| **`familyTrip`, `routeMap`, `bestTime`, `historyOfAglen`, `thingsToDo`, `hiddenPlaces`, `natureTourism`, `adventureTourism`, `culturalTourism`, `slowTravelBulgaria`, `ecoTourismBulgaria`, `traditionalFood`, `campingNearAglen`, `howToGet`** | **0–1 each** |
| Guide detail pages (`/guides/<slug>/`) | **0 from landing pages** |
| Business detail pages | **0 from landing pages** |

Three structural problems, in order of severity:

**1. Four of the link targets are 301s.** `attractions`, `vitRiver`, `caves`,
`nearby`, `food`, `seasonal` were redirected to `/guides/` pages in Phase 1.
Roughly a third of all internal landing-page links now pass through a redirect,
which dissipates a portion of the signal and, more importantly, means the
declared graph and the served graph disagree.

**2. The link graph is a star, not a mesh.** Everything points at
`visitAglen`/`weekendInAglen`/`accommodationNearAglen`. Those three pages are the
thinnest on the site. Internal PageRank is being concentrated on the least
valuable nodes — precisely inverted.

**3. Detail pages are near-orphans.** Guide and business detail pages are
reachable only from their index. Phase 1 fixed their sitemap absence and their
hreflang/schema wipe, but not their inbound link count, which is still ~1.

And one thing already done right: `guides.ts` has `relatedGuideIds` and
`regionPlaceIds`, and `region.ts` has `nearbyPlaces()`. Those are **derived**
edges — computed from the data, not hand-listed. That is the correct pattern and
everything below generalises it.

---

## 1. Principle: links are derived from relations, never authored

> **Every internal link on the site is the rendering of a typed edge in the
> graph. If there is no edge, there is no link. If there is an edge, the link is
> automatic.**

Consequences:

- Hand-maintained `internalLinkRouteIds` arrays are deleted. They rot, they
  create stars, and they encode someone's guess instead of the world.
- A link to a redirected route becomes structurally impossible — the graph
  resolves entity ids, not paths.
- Adding an entity automatically links it *both ways* into the mesh.
- The link graph and the schema graph are the same graph, so `nearbyAttraction`,
  `containedInPlace` and `about` in JSON-LD always match what the HTML actually
  links to. Google checks this. Most sites fail it.

---

## 2. Link blocks per page type

Each block is generated from a specific relation type. Counts are targets, not
minimums to pad to — a block with nothing in it does not render.

### 2.1 Entity page (`/place/<slug>/`)

| Block | Edge type | Links | Notes |
|---|---|---|---|
| Breadcrumb | `containedIn` chain | 2–3 | ✅ implemented in Phase 1 |
| Contains | `contains` | 0–10 | Only for regions/settlements |
| **Nearby** | `nearby`, sorted by km | 4–6 | **Real distances, labelled straight-line** ✅ pattern exists |
| **Same formation** | `sameFormation` | 2–4 | ★ the authority-transfer edge: E1 landforms ↔ E5 caves |
| Same watershed | `sameWatershed` | 2–3 | |
| History | `subjectOf` → `/history/` | 1–3 | |
| Stories | `subjectOf` → `/story/` | 0–2 | |
| People | `birthPlaceOf` etc. | 0–1 | Kunev from Aglen |
| Routes passing here | `route.stops` reverse | 0–3 | |
| Businesses here | proximity + `directory` | 0–6 | ✅ pattern exists in `guides.ts` |
| Events here | `Event.location` reverse | 0–3 | |
| Plan views featuring it | reverse of view composition | 2–4 | **Auto-generated reverse links — this is what un-orphans the views** |
| Sources | `claim.source` | all | |

**Target out-degree: 18–35.** Current entity-equivalent pages (guide details):
~6.

### 2.2 Cluster page (`/karst/<cluster>/`)
Links to every entity in the cluster (10–20), the sibling clusters (5), the
root, and the relevant plan views. Clusters are the **hubs** of the mesh: high
out-degree, high in-degree, and the shortest path between any two entities in
different branches.

### 2.3 Plan view (`/plan/<intent>/`)
Links only to entities it composes (5–12), plus 2–3 sibling views. **A view never
links to another view as a substitute for linking to entities** — that is how the
current star formed.

### 2.4 History / story / person pages
Link to every entity they touch (3–8), to adjacent periods (2), and to sources.
`/person/trifon-kunev/` links to `/place/aglen/`, `/place/aglen/history/`,
`/history/twentieth-century/`, `/plan/school-trip/`, and out to Wikidata.

### 2.5 Business detail ✅
Already good. Add: `nearby` entities within 5 km (currently zero), the category
sibling listings, and the cluster the business serves.

---

## 3. The reciprocity rule

For every edge type, either the reverse renders automatically or the edge is
invalid:

| Forward | Reverse renders on | Automatic |
|---|---|---|
| `contains` | child's breadcrumb | ✅ |
| `nearby` A→B | B's nearby block, same km | must be enforced |
| `sameFormation` | both | ✅ symmetric |
| view composes entity | entity's "featured in" block | ★ **the anti-orphan mechanism** |
| claim cites source | source's "cited by" list | ★ makes `/sources/` a hub |
| route passes entity | entity's "routes" block | |
| business near entity | entity's "businesses" block | |
| story about entity | entity's "stories" block | |

The starred two matter most. Reverse links from entities to the views that use
them mean **no view can be an orphan by construction**, which is the failure
mode `aiAnswerHub` (0 inbound) currently demonstrates. And reverse links from
sources to claims turn `/sources/` from a policy page into a genuine hub with
high in-degree — the single most useful page for an AI crawler trying to decide
whether this site is trustworthy.

---

## 4. Authority routing — where PageRank should go

Internal PageRank should concentrate where external authority is weakest and
strategic value is highest. That is the E1 entities. They have no external links
and never will; internal linking is the *only* signal they can receive.

Target distribution of internal link equity:

| Tier | Pages | Share | Rationale |
|---|---|---|---|
| `/karst/` + clusters | 7 | 15% | Hubs; they distribute, they don't hoard |
| E5/E4 anchor entities | 9 | 20% | Receive external links naturally; need less internally |
| **E1 proprietary entities** | ~14 | **30%** | ★ **Receive nothing externally. Internal links are their entire signal** |
| History / person / story | ~14 | 15% | Deep-engagement, link-earning content |
| Plan views | ~12 | 10% | Convert; don't need to rank on their own strength |
| Directory | ~20 | 8% | Have their own local signals |
| Method / sources | ~6 | 2% | High in-degree by design, low equity need |

The practical instruction that follows: **every E5 entity page must link to at
least two E1 entities, with a stated real-world reason.** Prohodna → Дупката
("same Lower-Cretaceous formation, 19.8 km east"). Devetashka → Въловата дупка
("both used as refuge caves; the Aglen one is undocumented outside local
memory"). This is the authority-transfer mechanism from
`TOPICAL_AUTHORITY_MAP.md` §0, expressed as a linking rule.

---

## 5. Anti-orphan guarantees

Enforced in `scripts/graph-audit.mjs`; build fails on violation.

1. **Every entity ≥3 inbound internal links** from distinct page types.
2. **Every page ≤3 clicks from `/`** and ≤2 from its cluster.
3. **Zero internal links to a redirecting path** — links resolve entity ids to
   current paths at build time. (Fixes the existing 301-link problem outright.)
4. **Every view has ≥5 reverse links** from the entities it composes.
5. **Every claim's source is linked from the claim and back.**
6. **No page with out-degree < 5** — a dead end wastes the crawl and the reader.
7. **No page with out-degree > 60** — beyond that each link carries too little.
8. **Reciprocity holds** for all symmetric edge types, with identical distances.
9. **hreflang, JSON-LD and rendered links agree** for every route, including
   detail routes. (Phase 1 fixed the client-side divergence; this keeps it fixed.)
10. **Every language tier links to its knowledge-tier parent** rather than
    publishing an unreviewed duplicate.

---

## 6. Anchor text

Anchor text is generated from the entity's canonical name plus a
relation-derived qualifier — never from a keyword list.

| Edge | Rendered anchor |
|---|---|
| `nearby` | «Проходна — 19,8 км по права линия» |
| `sameFormation` | «Дупката — същите долнокредни варовици» |
| `containedIn` | «Луковитски карст» |
| `birthPlaceOf` | «Трифон Кунев, роден в Ъглен през 1880 г.» |
| view→entity | «Река Вит при Ъглен» |

Two properties: the anchor is always *informative* (it carries a fact, so the
link is worth clicking), and it is always *varied* without being manipulated,
because the qualifier comes from the relation rather than from a synonym list.

---

## 7. Migration

| Step | Action | Effort |
|---|---|---|
| 1 | Delete `internalLinkRouteIds` from `landingPages.ts` | 1 h |
| 2 | Add `relations` to entities; render `nearby` from coordinates | 1 day — `nearbyPlaces()` in `region.ts` is 80% of it ✅ |
| 3 | Generate reverse edges at build; render "featured in" blocks | 1 day |
| 4 | Resolve all internal links through entity ids | half a day; **removes every 301-hop internal link** |
| 5 | Add `sameFormation` edges between the E1 landforms and the E5 caves | 2 h once the geology claim is sourced |
| 6 | Ship `graph-audit.mjs` with rules 1–10 | 1 day |

Six days total, and step 4 alone recovers signal currently being lost on every
page of the site.
