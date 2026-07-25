# Knowledge Graph — the Lukovit Karst as a machine-readable region

**Deliverable 2 of 10.** Reads with `TOPICAL_AUTHORITY_MAP.md` (inventory) and
`ENTITY_PRIORITY_MATRIX.md` (ranking). Verification legend is defined there.

---

## 0. What a knowledge graph has to do that a website does not

A website answers a query. A knowledge graph answers a *question about the
relationship between two things*, which is what every AI assistant is actually
doing when it summarises a region.

The test this document is written against:

> Given only this site, can a machine correctly answer:
> *"What is the Lukovit Karst, what is in it, how are those things related to
> each other and to things I already know about, and how confident should I be?"*

Today the answer is no, for a mechanical reason: **the site has no nodes.**
`region.ts` holds nine correctly-identified entities with Wikidata ids and
coordinates — an excellent foundation, and the best piece of work in the
repository — but every one of them is rendered as a *mention* inside a page
about something else. A mention is an edge with no node at the far end. Graphs
built from edges without nodes do not resolve.

---

## 1. Node model

Every entity in the graph carries the following. This is proposed directly as a
TypeScript type to replace and absorb `RegionPlace` in `src/region.ts`.

```ts
type EntityId = string;              // stable forever, never reused

type Entity = {
  id: EntityId;
  kind: EntityKind;                  // see §2
  name: LocalizedText;
  /** schema.org type that matches what the thing IS, not what we want it to rank for. */
  schemaType: string;
  /** Containment. Exactly one, or none for the root. */
  parent?: EntityId;
  /** Non-containment relations, typed. */
  relations: Relation[];
  geo?: { lat: number; lon: number } | { linear: true };
  /** External identity. The point of the whole exercise. */
  sameAs: {
    wikidata?: string;
    wikipedia?: Partial<Record<LanguageCode, string>>;
    osm?: string;                    // "way/123456" | "relation/9876"
    geonames?: string;
    natura2000?: string;
    commons?: string;                // Wikimedia Commons category
    gbif?: string;
  };
  /** How well Google already knows this thing. Drives strategy, see §4. */
  confidence: "E5" | "E4" | "E3" | "E2" | "E1";
  /** Claims about this entity, each sourced. See EEAT_STRATEGY.md §3. */
  claims: ClaimId[];
  page?: { path: string; priority: 1 | 2 | 3 | 4 };
};

type Relation =
  | { type: "containedIn";      target: EntityId }
  | { type: "contains";         target: EntityId }
  | { type: "nearby";           target: EntityId; km: number; basis: "straight-line" | "road" }
  | { type: "sameFormation";    target: EntityId }   // shares the geology
  | { type: "sameWatershed";    target: EntityId }
  | { type: "birthPlaceOf";     target: EntityId }
  | { type: "subjectOf";        target: EntityId }   // legend, event, artwork
  | { type: "accessedFrom";     target: EntityId }
  | { type: "combinesWellWith"; target: EntityId; reason: LocalizedText }
  | { type: "supersededBy";     target: EntityId }   // Селището → Ъглен
  | { type: "operatedBy";       target: EntityId };
```

Two rules that matter more than the type:

**Rule 1 — a relation is asserted only when it is true in the world.** No
`nearby` edge to something 60 km away because it helps a page. Google's models
are extremely good at detecting geographic incoherence, and an incoherent graph
is worse than a sparse one.

**Rule 2 — `basis` is mandatory on every distance.** The site already refuses to
publish unverified drive times. The graph must carry the same distinction in its
data, not just its prose: `straight-line` distances are derived from coordinates
and are honest; `road` distances require a source and today there is none.

---

## 2. Entity kinds and their schema types

| Kind | schema.org | Example | Note |
|---|---|---|---|
| `region` | `LandformFeature` + `Place` | Lukovit Karst | Root. `Landform` is the honest type; `TouristDestination` is a *view* type, not an entity type |
| `province` | `AdministrativeArea` | Област Ловеч | |
| `municipality` | `AdministrativeArea` | Община Луковит | Missing today |
| `settlement` | `City` / `Place` | Луковит / Ъглен | Village → `Place`, town → `City` |
| `cave` | `Cave` (extension) → `TouristAttraction` + `Place` | Проходна | schema.org has no `Cave`; use `TouristAttraction`+`Landform` and `additionalType` to a Wikidata URI |
| `landform` | `Landform` | Дупката, Слончето | The correct type for an arch. Do not use `TouristAttraction` for a rock nobody sells tickets to |
| `waterBody` | `BodyOfWater` / `RiverBodyOfWater` | Вит | |
| `spring` | `BodyOfWater` | Златна Панега извор | |
| `protectedArea` | `Park` / `Place` | Natura 2000 zone | |
| `geopark` | `TouristAttraction` + `Park` | Искър–Панега | |
| `archaeologicalSite` | `LandmarksOrHistoricalBuildings` | Калето, Селището | |
| `building` | `Church` / `CivicStructure` | Св. Архангел Михаил | `Church` is a real schema.org type — use it |
| `route` | `Trail`† / `TouristTrip` | Village walk | †no `Trail` in schema.org core; `TouristTrip` + `itinerary` is what the site already emits, correctly |
| `person` | `Person` | Трифон Кунев | |
| `legend` | `CreativeWork` | Двукраките сенки | With `genre: "folklore"` and an explicit `dateCreated` unknown |
| `event` | `Event` | Панаир на Ъглен | Recurring → `EventSeries` |
| `tradition` | `CreativeWork` / `Event` | Лазаруване | |
| `period` | `Event` (historical) | Никополски санджак era | |
| `business` | `LocalBusiness` subtypes | already implemented ✅ | The one part of the site already doing this right |
| `species` | `Taxon` | bats, relict flora | Only once actually sourced |

---

## 3. The graph

### 3.1 The spine (containment — one parent each, no cycles)

```
Bulgaria (Q219)
└── Северна България / Дунавска равнина ─ Предбалкан margin
    └── Област Ловеч (Q6587068)                          [province]
        ├── Община Луковит                               [municipality]  ← MISSING TODAY
        │   ├── Луковит (Q405585)                        [settlement, town]
        │   ├── Ъглен (Q550547)                          [settlement, village]  ★ base
        │   ├── Карлуково (Q1085214)                     [settlement, village]
        │   ├── Румянцево · Дерманци · Тодоричене · Бежаново
        │   │   · Петревене · Беленци · Дъбен · Торос · Пещерна   [🔶 verify list]
        │   └── (municipal territory)
        ├── Ловеч (Q189328)                              [settlement, town]
        ├── Деветаки · Крушуна          (Летница)        [settlement]
        └── …
```

Crossing that administrative tree is the **physiographic tree**, which is the one
the site is actually about:

```
Предбалкан (Fore-Balkan)
└── ЛУКОВИТСКИ КАРСТ  ★ ROOT SUBJECT      [region] — no Wikidata item exists
    ├── Карлуковски карстов район         [region]
    │   ├── Проходна (Q3657889)           [cave]      ← anchor, E5
    │   ├── Темната дупка                 [cave] 🔶
    │   ├── Свирчовица · Банковица · Хайдушката дупка · Ученическа  🔶
    │   ├── Карлуковски скални венци      [landform]
    │   └── Карлуковски манастир          [building] 🔶
    ├── Долина на Вит при Ъглен           [region]    ★ THE SITE'S TERRITORY
    │   ├── Дупката                       [landform]  E1
    │   ├── Слончето                      [landform]  E1
    │   ├── Червена стена                 [landform]  E1
    │   ├── Рачков вир                    [waterBody] E1
    │   ├── Калето                        [archaeologicalSite] E1
    │   ├── Селището / Старо село         [archaeologicalSite] E1
    │   ├── Въловата дупка / Очилатата    [cave]      E1  ★ most valuable proprietary node
    │   └── Иглените скали                [landform]  E1
    ├── Искър–Панега                      [geopark]
    │   ├── Златна Панега (извор)         [spring]
    │   └── Река Златна Панега            [waterBody]
    └── (adjacent karst systems, related not contained)
        ├── Деветашко плато → Деветашка пещера (Q2756370)
        └── Крушунска бигорна каскада (Q6439432)
```

**Two trees, one graph.** A village belongs to a municipality *and* sits in a
karst district; both edges are true and both must be emitted. Sites that pick
one and hide the other are the reason regional search results are incoherent.

### 3.2 Cross-cutting edges (the part that creates authority)

| From | Relation | To | Why it matters |
|---|---|---|---|
| Ъглен | `birthPlaceOf` | Трифон Кунев (Person, has Wikidata) | **The single strongest authority edge available to this site.** A Wikidata-known person born in an E1 village pulls the village into the graph |
| Дупката | `sameFormation` | Проходна | Transfers geological context from an E5 node to an E1 node. This edge is the mechanism of the entire strategy |
| Въловата дупка | `subjectOf` | the Ottoman-raid tragedy | Ties an unknown cave to a documented historical period |
| Селището | `supersededBy` | Ъглен | Explains why there are two settlement sites — the kind of relation only a real source models |
| Река Вит | `sameWatershed` | Рачков вир, the canyon, the Danube | |
| Луковит | `accessedFrom` | Ъглен, Карлуково, Искър–Панега | Lukovit is the region's gateway; the site should say so plainly instead of competing with it |
| Карлуково | `nearby` 20.5 km | Ъглен | Real, derived, honest |
| Кремъчни работилници (period) | `locatedIn` | terraces above the Vit | Makes the prehistory addressable |
| Панаир на Ъглен | `EventSeries` | Ъглен | Recurring events are one of the few Discover-eligible surfaces here |

### 3.3 Distance matrix (straight-line, derived from Wikidata coordinates)

Computed from the coordinates already in `region.ts`. **These are straight-line
km and must be labelled as such everywhere they appear** — the roads follow the
river valleys and every road distance is larger.

| From ↓ / To → | Ъглен | Луковит | Проходна | Карлуково | Зл. Панега | Ловеч | Деветашка | Крушуна |
|---|---|---|---|---|---|---|---|---|
| **Ъглен** | — | 12.4 | 19.8 | 20.5 | 18.0 | 33.0 | 46.5 | 58.4 |
| **Проходна** | 19.8 | 8.2 | — | 1.4 | 11.3 | 52.0 | 66.3 | 78.2 |

Other useful straight-line anchors from Ъглен: **София 98.3 km**, **Плевен
33.7 km**, **Ябланица 25.3 km**, **Тетевен 31.9 km**, mouth of the Vit 30.7 km.

🔴 **Road distances and drive times exist nowhere on this site.** Every one of
the numbers above needs a road counterpart before the travel-planning half of
the graph functions. See `CONTENT_GAP_ANALYSIS.md` — it is the highest ROI item
in this entire programme and it costs one day of driving.

---

## 4. Entity confidence — the strategic axis

Five levels. This drives what kind of page each entity gets and what the page is
*for*.

| Level | Definition | Strategy | Count |
|---|---|---|---|
| **E5** | In Google's Knowledge Graph with a panel; high query volume | **Be correct and be connected.** Never try to out-rank the encyclopaedias. Win the *long tail* around it: access, season, combination, photography hours | 4 |
| **E4** | Wikidata + Wikipedia in ≥2 languages | **Be the best practical page.** Encyclopaedias don't say when the light is good | 5 |
| **E3** | Wikidata or OSM only, no article | **Be the article.** Then feed the source back | ~8 |
| **E2** | Named in third-party sources, unstructured | **Structure it first.** Whoever structures an entity first tends to become its reference | ~15 |
| **E1** | Exists only in local memory | **Originate it.** Being the only source is the same as being the canonical source | ~20 |

Per-entity assignment:

| Entity | Wikidata | Coordinates | Conf. | Priority | Page |
|---|---|---|---|---|---|
| Проходна | Q3657889 | 43.1758, 24.0731 | **E5** | P1 | `/place/prohodna/` |
| Ловеч | Q189328 | 43.1348, 24.7115 | **E5** | P3 | `/place/lovech/` |
| Крушунски водопади | Q6439432 | 43.2431, 25.0333 | **E5** | P2 | `/place/krushuna/` |
| Деветашка пещера | Q2756370 | 43.2329, 24.8869 | **E5** | P2 | `/place/devetashka/` |
| Река Вит | Q1773449 | linear | **E4** | P1 | `/place/vit-river/` |
| Луковит | Q405585 | 43.2102, 24.1629 | **E4** | P1 | `/place/lukovit/` |
| Карлуково | Q1085214 | 43.1637, 24.0671 | **E4** | P1 | `/place/karlukovo/` |
| Златна Панега | Q2455820 | 43.0918, 24.1506 | **E4** | P3 | `/place/zlatna-panega/` |
| Област Ловеч | Q6587068 | — | **E4** | P4 | section only |
| **Ъглен** | Q550547 | 43.2012, 24.3149 | **E3** | **P1** | `/place/aglen/` |
| **Трифон Кунев** | 🟢 exists — confirm id | — | **E4** | **P1** | `/person/trifon-kunev/` ★ |
| Искър–Панега геопарк | none | linear | **E3** | P1 | `/place/iskar-panega/` + **create Wikidata item** |
| Община Луковит | 🔶 | — | E3 | P3 | `/place/lukovit-municipality/` |
| Темната дупка | 🔶 | ⬜ | E2 | P2 | `/place/temnata-dupka/` |
| **Лукoвитски карст** | **none** | region | **E2** | **P1** | `/karst/` ★ **root subject, create item** |
| Дупката | none | ⬜ needs GPS | **E1** | **P1** | `/place/dupkata/` ★ |
| Слончето | none | ⬜ | **E1** | P1 | `/place/sloncheto/` |
| Червена стена | none | ⬜ | **E1** | P2 | `/place/chervena-stena/` |
| Рачков вир | none | ⬜ | **E1** | P2 | `/place/rachkov-vir/` |
| Калето | none | ⬜ | **E1** | P2 | `/place/kaleto/` |
| Селището | none | ⬜ | **E1** | P2 | `/place/selishteto/` |
| Въловата дупка / Очилатата | none | ⬜ | **E1** | **P1** | `/place/valovata-dupka/` ★ |
| Св. Архангел Михаил (1888) | none | ⬜ | **E1** | P2 | `/place/st-archangel-michael/` |
| Иглените скали | none | ⬜ | E1 | P3 | within `/place/aglen/name/` |
| Двукраките сенки | none | n/a | **E1** | P2 | `/story/dvukrakite-senki/` |
| Златната браздичка | none | n/a | **E1** | P2 | `/story/zlatnata-brazdichka/` |
| Панаир на Ъглен | none | n/a | E1 | P2 | `/event/panair-aglen/` |
| Кремъчни работилници | none | ⬜ | E2 | P2 | `/history/flint-workshops/` |

⬜ **Nine E1 entities have no coordinates.** Every one of them needs a GPS fix.
A person with a phone walking to each named place and recording a waypoint
converts nine unlocatable names into nine mappable entities that can carry
`GeoCoordinates`, appear on maps, be contributed to OpenStreetMap, and be
`nearby` to Prohodna. **Half a day of walking. It is the cheapest entity
creation available anywhere in this project.**

---

## 5. `sameAs` opportunities, ranked

`sameAs` is the only mechanism by which a website's node merges with a search
engine's node. The site currently emits Wikidata and Wikipedia for nine
entities — good. The unexploited registers are worth more.

| Register | What it gives | Effort | Value |
|---|---|---|---|
| **Wikidata** (existing items) | Already done for 9 ✅ | — | done |
| **Wikidata** (new items for E1/E2) | Creates the node in the graph everyone reads. A sourced item for Дупката, the Lukovit Karst, Iskar–Panega geopark makes them *exist* for every AI system simultaneously | Medium — needs a citable source per item, which the site can be once its claims are sourced | **Highest** |
| **OpenStreetMap** | Trails, waypoints, cave entrances, parking. OSM is the base map for Apple Maps, Facebook, most apps, and is heavily used in model training | Low — one mapping session per feature | **Highest** |
| **Wikimedia Commons** | CC-licensed photographs of the named places become the images Google and every AI system shows for the entity. Currently *nobody's* photographs of Дупката exist there | Low, once real photographs exist | **Very high** |
| **Bulgarian Wikipedia** | An article on Ъглен exists; the Lukovit Karst and Trifon Kunev's birthplace edge can be strengthened with sources | Medium. **Must be done as neutral, sourced contribution — never as promotion. Declare the connection.** | High |
| **Natura 2000 / EUNIS** | Authoritative environmental identity | Low (lookup) | Medium |
| **GeoNames** | Feeds many geocoders | Low | Medium |
| **GBIF / iNaturalist** | Species observations tie the biodiversity cluster to real data | Medium | Medium |
| **Registry of Cultural Monuments (НИНКН)** | Statutory identity for the church and Калето | Medium | Medium |
| **Google Business Profile** per listed business | Already flagged in the Phase-1 audit | Low | High (commercial, not graph) |

**The strategic point about Wikidata and OSM:** they are not link-building. They
are *the graph itself*. A site that contributes correct, sourced entities to the
commons becomes the citation behind those entities — which is precisely the
position "the definitive source" describes. This is the one lever in this
document that no competitor can take away once it is pulled.

---

## 6. Search intent per node (summary — full treatment in `SEARCH_INTENT_MAP.md`)

| Node class | Dominant intent | What the page must therefore lead with |
|---|---|---|
| E5 caves (Prohodna) | Navigational + logistical: *how do I get in, is it free, is it safe* | Access, parking, hours, safety — **not** description |
| E4 towns (Lukovit) | Planning hub: *what do I do from here* | A day structure with real distances |
| Karst root | Informational/educational: *what is this landscape* | Definition, formation, extent, map |
| E1 landforms | Discovery: *what is this thing in this photo* | Name, location, photograph, how to reach, what it is made of |
| Person (Kunev) | Biographical: *who was he, where from* | Life, work, the birthplace edge, sources |
| Legends | Cultural: *what is the story* | The story as told, who collected it, when, and what is not known |
| History periods | Educational + genealogical | Chronology, evidence, archive references |
| Routes | Transactional-adjacent: *can I walk it today* | Length, surface, GPX, season, hazards |
| Businesses | Local commercial | NAP, hours, offer, photo ✅ already correct |
| Intent views | Planning | Composition of the above with a decision, not a description |

---

## 7. Graph health rules (enforceable in the build)

These are proposed as build-time assertions, in the spirit of the existing
`i18n-audit.mjs` and the dangling-reference check the Phase-1 work introduced.

1. **No orphan node** — every entity is reachable from `/karst/` in ≤3 clicks.
2. **No dangling `sameAs`** — every external id resolves (checked quarterly, not
   per build).
3. **No unsourced claim on an indexed page** — a claim without a `source` cannot
   render outside a "not yet verified" block.
4. **No `nearby` edge over 60 km** without an explicit `reason`.
5. **No entity page with fewer than 3 claims unique to it** — it becomes a
   section of its parent instead. This is the rule that prevents the
   `landingPages.ts` failure from recurring.
6. **Exactly one `FAQPage` per URL** ✅ (already enforced after Phase 1).
7. **Every `road` distance carries a source id**; straight-line distances are
   derived and labelled.
8. **Coordinates required** for any entity claiming `geo` in schema — no
   inherited village coordinates standing in for a rock 4 km away. (This is the
   same class of error as the 10.6 km village-coordinate bug Phase 1 fixed.)
9. **Reciprocity** — if A `nearby` B then B `nearby` A, with the same km.
10. **Language tiering respected** — a tier-2 language may not emit an entity
    page that has no reviewed translation; it links to the `bg`/`en` node with
    correct `hreflang` instead of publishing a machine paraphrase.
