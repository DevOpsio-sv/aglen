# Content Hierarchy

**Deliverable 3 of 10.** Hierarchy, not navigation. Navigation is a rendering
decision made later, and is allowed to disagree with this document; the URL
structure and the parent–child relations are not.

---

## 0. The rule that generates the hierarchy

> **A URL exists for a thing, at the level where that thing is true.**

Three corollaries that decide every case below:

1. If a subject is only true *as part of* another subject, it is a section, not a
   page. (The Иглен etymology is true only about Ъглен → it is `/place/aglen/name/`
   or a section of it, never `/etymology-of-aglen/`.)
2. If a subject is true independently of the site's base, it must not be
   namespaced under the base. (Карлуково is true whether or not Ъглен exists →
   `/place/karlukovo/`, never `/karlukovo-near-aglen/`.)
3. A composition of subjects shaped by a traveller's question is a **view**, and
   views live in their own namespace so they can never be mistaken for entities.
   (`/plan/weekend-from-sofia/`, not `/weekend-in-aglen/`.)

The current site violates all three, systematically, because it grew from a
keyword list rather than from a world model.

---

## 1. Canonical hierarchy

```
ROOT  ─ the region
│
├── /karst/                                    Лукoвитски карст     [region]
│   ├── /karst/geology/                        formation, strata, hydrology
│   ├── /karst/caves/                          the cave system as a class
│   ├── /karst/landforms/                      arches, needles, dolines
│   ├── /karst/water/                          rivers, springs, the canyon
│   ├── /karst/life/                           biodiversity, seasons
│   └── /karst/map/                            the whole graph, on one map
│
├── /place/<slug>/                             EVERY ENTITY, one namespace
│   │
│   ├── administrative branch
│   │   ├── /place/lovech-province/
│   │   ├── /place/lukovit-municipality/
│   │   ├── /place/lukovit/                    [town]  ── gateway
│   │   ├── /place/aglen/                      [village] ★ base
│   │   │   ├── /place/aglen/history/          ← the four timeline chapters, finally addressable
│   │   │   ├── /place/aglen/name/             ← the "Ъ" fact + both etymologies
│   │   │   ├── /place/aglen/walk/             ← the village route (mapStops)
│   │   │   └── /place/aglen/gallery/
│   │   ├── /place/karlukovo/
│   │   ├── /place/zlatna-panega/
│   │   └── /place/lovech/  /place/devetaki/  /place/krushuna-village/
│   │
│   ├── natural branch
│   │   ├── /place/prohodna/                   [cave]     E5 anchor
│   │   ├── /place/temnata-dupka/              [cave]
│   │   ├── /place/valovata-dupka/             [cave]     E1 ★ proprietary
│   │   ├── /place/devetashka/                 [cave]
│   │   ├── /place/dupkata/                    [landform] E1 ★
│   │   ├── /place/sloncheto/                  [landform] E1
│   │   ├── /place/chervena-stena/             [landform] E1
│   │   ├── /place/vit-river/                  [waterBody]
│   │   │   └── /place/vit-river/aglen-reach/  ← the canyon section; the site's territory
│   │   ├── /place/rachkov-vir/                [waterBody] E1
│   │   ├── /place/iskar-panega/               [geopark]
│   │   ├── /place/zlatna-panega-spring/       [spring]
│   │   └── /place/krushuna-falls/             [waterfall]
│   │
│   └── built / archaeological branch
│       ├── /place/kaleto/                     [archaeologicalSite] E1
│       ├── /place/selishteto/                 [archaeologicalSite] E1
│       └── /place/st-archangel-michael/       [church, 1888] E1
│
├── /history/<slug>/                           TIME as entities
│   ├── /history/deep-time/                    limestone → canyon
│   ├── /history/prehistory/
│   │   └── /history/flint-workshops/          ★ the most under-used fact on the site
│   ├── /history/thracians/                    трибали, rock sanctuaries
│   ├── /history/roman/
│   ├── /history/ottoman-registers/            Никополски санджак, C15–C16
│   ├── /history/kardzhali-period/             retreat to the caves, Селището
│   ├── /history/revival/                      the descent to the terraces, 1888 church
│   └── /history/twentieth-century/
│
├── /person/<slug>/
│   └── /person/trifon-kunev/                  ★ highest-value single new page
│
├── /story/<slug>/                             oral tradition, one per legend
│   ├── /story/ochite-na-boga/
│   ├── /story/dvukrakite-senki/               ★ E1, exists nowhere else
│   ├── /story/zlatnata-brazdichka/            ★ E1
│   └── /story/iglen-grad-golyama/
│
├── /tradition/<slug>/
│   ├── /tradition/panair/                     EventSeries
│   ├── /tradition/lazaruvane/
│   └── /tradition/horse-race/
│
├── /route/<slug>/                             movement
│   ├── /route/village-walk/
│   ├── /route/canyon-walk/
│   ├── /route/iskar-panega-trail/
│   └── /route/karlukovo-caves-loop/
│
├── /events/                                   dated, already implemented ✅
│   └── /events/<id>/
│
├── /directory/                                businesses, already implemented ✅
│   ├── /directory/<category>/
│   └── /directory/<category>/<slug>/          (currently /local-businesses/<slug>/)
│
├── /plan/<intent>/                            VIEWS — compositions, not entities
│   ├── /plan/weekend-from-sofia/
│   ├── /plan/one-day/
│   ├── /plan/with-children/
│   ├── /plan/photography/
│   ├── /plan/caving/
│   ├── /plan/school-trip/
│   ├── /plan/getting-here/
│   ├── /plan/when-to-come/
│   └── /plan/accessibility/
│
└── /sources/                                  METHOD, public
    ├── /sources/                              the claim ledger, browsable
    ├── /about/                                ✅ exists
    ├── /editorial-policy/                     ✅ exists
    ├── /crawler-policy/                       ✅ exists
    ├── /corrections/                          ← new: every correction, dated
    └── /field-notes/                          ← new: dated verification log
```

---

## 2. Page anatomy — what every level renders

The strength of a hierarchy is that each level has a *job* and never does
another level's job.

### 2.1 Entity page (`/place/<slug>/`) — the workhorse

Fixed section order. Sections vanish when their data is absent; nothing is ever
padded.

| # | Section | Source | Omitted when |
|---|---|---|---|
| 1 | **Identity** — name, alternate names, one-sentence definition, type | entity | never |
| 2 | **Where** — coordinates, map, containment breadcrumb, straight-line distances to 3 nearest known entities | graph | no coordinates → shows "location not yet recorded" |
| 3 | **What it is** — the physical/factual description, claim-by-claim | claims | fewer than 3 claims → the entity is a section of its parent instead |
| 4 | **Getting there** — access, parking, from which settlement, road distance | claims | unverified → renders the explicit "we don't know this yet" block |
| 5 | **When** — season, light, water level, hours | claims | |
| 6 | **Safety and responsibility** | claims | never omitted where a hazard is known ✅ |
| 7 | **History and meaning** — links to `/history/`, `/story/`, `/person/` | edges | |
| 8 | **Photographs** — dated, credited, with capture date | media | |
| 9 | **Nearby** — real graph edges with real distances | graph | |
| 10 | **Combine with** — `combinesWellWith` edges, each with a stated reason | graph | |
| 11 | **Businesses here** — directory filtered by proximity | directory | |
| 12 | **Sources** — every claim's citation, and every known unknown | ledger | **never** |
| 13 | **FAQ** — only questions actually answerable from the claims above | claims | |

Section 12 is the differentiator. No competing site in this region publishes its
sources. It costs nothing to render and it is the thing an AI system uses to
decide whether to cite you.

### 2.2 Cluster page (`/karst/<cluster>/`)
Definition → how it works → the entities in it, as a **table with real
attributes** (not a card grid) → what is not known → sources. A cluster page's
value is that it is the only place the entities can be *compared*.

### 2.3 View page (`/plan/<intent>/`)
Decision-shaped, not description-shaped: a recommendation, a sequence, a
timing, a caveat, and links out. **A view never contains a fact of its own** —
every fact it shows is transcluded from a claim, so a correction in one place
propagates everywhere. This is what stops views from becoming the thin pages
`landingPages.ts` became.

### 2.4 Person, story, history, route pages
- **Person**: life → connection to the region → work → why it matters here →
  sources → `sameAs`.
- **Story**: the story as told → who told it, who recorded it, when → what it may
  reflect (with hedging) → what is *not* claimed → related entities.
  **A legend page must never assert a legend as fact.** It asserts that the
  legend is told, which is a different and verifiable claim.
- **History**: chronology → evidence → what is inferred vs attested → archive
  references → the entities involved.
- **Route**: length, ascent, surface, waymarking, GPX, season, hazards, then
  narrative. Numbers first, because that is the query.

---

## 3. Depth rules

| Depth | Allowed | Example |
|---|---|---|
| 1 | Domain roots | `/karst/`, `/place/`, `/plan/` |
| 2 | Entities and clusters | `/place/prohodna/`, `/karst/geology/` |
| 3 | Aspects of an entity, only when the aspect has ≥3 unique claims | `/place/aglen/history/` |
| 4 | **Forbidden** | — |

Maximum click depth from `/` to any node: **3**. Maximum from `/karst/`: **2**.

The 4-level ban is not aesthetic. Every additional level halves the internal
PageRank arriving at a node and doubles the chance an entity is discovered only
by crawling. Anything that wants to be at depth 4 is really a section.

---

## 4. Migration from the current structure

Nothing below requires new writing except where marked. Redirects use the
existing `public/_redirects` mechanism, which Phase 1 already exercised.

| Current | Becomes | Mechanism |
|---|---|---|
| `/guides/beautiful-places/` | `/karst/landforms/` + four entity pages | Split; 301 the index to the cluster |
| `/guides/vit-river/` | `/place/vit-river/` | 301, content moves |
| `/guides/caves-and-rocks/` | `/karst/caves/` | 301 |
| `/guides/local-food/` | `/directory/food/` | 301 — it is a directory view, not a guide |
| `/guides/nearby-destinations/` | `/karst/map/` + graph edges | 301 |
| `/guides/seasonal-guide/` | `/plan/when-to-come/` | 301 |
| `/lukovit-travel-guide/` | `/place/lukovit/` | 301, **content already real** ✅ |
| `/karlukovo-travel-guide/` | `/place/karlukovo/` | 301 |
| `/krushuna-travel-guide/` | `/place/krushuna-falls/` | 301 |
| `/devetashka-cave-travel-guide/` | `/place/devetashka/` | 301 |
| `/iskar-panega-travel-guide/` | `/place/iskar-panega/` | 301 |
| `/lovech-region-travel-guide/` | `/place/lovech-province/` | 301 |
| `/weekend-in-aglen/`, `/family-trip-aglen/`, `/aglen-from-sofia/`, `/best-time-to-visit-aglen/`, `/how-to-get-to-aglen/`, `/camping-near-aglen/` | `/plan/*` views | 301 — **but only once the underlying claims exist.** Until then they stay `noindex` |
| `/visit-aglen/`, `/things-to-do-in-aglen/`, `/nature-around-aglen/`, `/hidden-places-near-aglen/`, `/cultural-tourism-aglen/`, `/nature-tourism-aglen/`, `/adventure-tourism-aglen/`, `/rural-tourism-bulgaria-aglen/`, `/eco-tourism-bulgaria-aglen/`, `/slow-travel-bulgaria-aglen/`, `/traditional-food-aglen/`, `/aglen-route-map/`, `/accommodation-near-aglen/` | **retired** | 301 to the nearest real node. Thirteen pages × 14 languages = **182 URLs removed** |
| `/history-of-aglen/` | `/place/aglen/history/` | 301 — **and the four timeline chapters finally get published here.** This is the largest content win in the migration and requires zero new writing |
| `/aglen-answer-hub/` | `/sources/` | 301 — an "answer hub" that isn't a source ledger is a keyword page |
| `/local-businesses/**` | `/directory/**` | Optional. Low value, real cost. **Recommendation: keep the current path.** ✅ |
| `/events/**` | unchanged ✅ | |
| `/about/`, `/editorial-policy/`, `/local-presence/`, `/crawler-policy/` | unchanged ✅ | Move under `/sources/` conceptually, keep URLs |

**Net URL effect, per language:** −18 landing pages, +~34 entity pages,
+8 history, +1 person, +4 story, +3 tradition, +4 route, +9 plan views,
+6 karst cluster pages. Roughly 61 → 110 URLs per language — but under the
two-tier language policy proposed in `TOPICAL_AUTHORITY_MAP.md` §3.3, only
`bg` and `en` carry the full set, so the site total moves from ~590 indexed URLs
to **~260 indexed URLs, every one of which is about something real.**

Fewer, heavier, real. That is the whole trade.

---

## 5. Navigation (a rendering of the hierarchy, deliberately simpler than it)

Primary nav, five items — the current nav is keyword-shaped and should be
replaced:

| Label (bg) | Target | Why |
|---|---|---|
| Карстът | `/karst/` | The subject. First position states what the site is about |
| Места | `/karst/map/` | Entity browser, on a map, because the graph is geographic |
| История | `/place/aglen/history/` | The site's strongest content, currently unreachable |
| Планирай | `/plan/` | Where every commercial and logistical intent lands |
| Ъглен | `/place/aglen/` | The base, the village, the directory, the events |

Secondary/footer: Events · Directory · Sources · Corrections · Editorial policy ·
Contact · Language.

The current "Места" entry points at a route that Phase 1 turned into a 301; this
replaces that fix with something structural.

---

## 6. Where this hierarchy could be wrong

Stated because a design review should include its own objections.

**Objection 1: `/karst/` as root buries the brand.** True. The counter-argument
is that the brand lives in the domain, the header, the footer and the
`Organization` node on every page; it does not need to own the URL space. If
this is judged unacceptable, the fallback is to keep `/` as the Aglen home and
make `/karst/` a first-class second hub — losing perhaps 20% of the effect and
none of the coherence.

**Objection 2: entity pages for E1 landforms with three claims each are thin.**
Also true, *today*. The rule in `KNOWLEDGE_GRAPH.md` §7.5 handles it: below three
unique claims an entity renders as a section of its parent and gets no URL. Дупката
qualifies for a page only once someone has walked to it with a GPS and a camera.
**The hierarchy is therefore gated on field work, not on writing** — which is the
correct dependency and the opposite of how the current site was built.

**Objection 3: this is a lot of migration for a site that just finished one.**
Correct, and the sequencing in `5_YEAR_SEO_ROADMAP.md` reflects it: the history
publication and the Kunev page are week 1 and need no migration at all; the
landing-page retirement is a single `_redirects` change; the `/place/` namespace
can be built additively alongside the existing routes and switched over once
populated. Nothing here requires a rewrite of `App.tsx`.
