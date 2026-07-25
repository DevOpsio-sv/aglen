# Implementation Plan — navigation, IA & entity architecture

**Execution artifact, not architecture.** Architecture is frozen
(`MASTER_ARCHITECTURE_BLUEPRINT.md`, ADR-001–013). This document plans *how* to
implement the approved `MASTER_ARCHITECTURE_REVIEW.md` and
`INFORMATION_ARCHITECTURE_REVIEW.md` against the current code — no redesign, no new
architecture, no speculative features. **No application code is changed by this
document.** It is the review gate that precedes code; per the approved sequence,
implementation begins only after this plan is reviewed.

Grounded in the live source: `routes.ts`, `landingPages.ts` (27 pages),
`guides.ts` (6 guides), `region.ts` (9 entities + Aglen), `seo.ts`,
`pageSections.ts`, `App.tsx`, `public/_redirects`, `public/robots.txt`.

**Standing rules honoured throughout:** backward compatible · no broken URLs · no
SEO regressions · reversible (301, never delete; `supersedes`, never overwrite) ·
reuse existing code (`_redirects`, `isIndexableRoute`, `supersedingGuideSlug`,
`nearbyPlaces()`, the prerender in `generate-static-routes.mjs`) · small logical
commits · validate after every milestone.

**Overriding principle (human-first).** The website is first and foremost the
**official digital home of Aglen**. SEO and the knowledge graph exist to *support*
that mission, never to replace it. Therefore every generated page — especially every
entity page (M3) — must **read as something a person wrote about a place they know**:
real prose, specific observation, warmth and voice, not a schema dump or a template
grid. A page that looks auto-generated fails this plan even if its markup is perfect.
Concretely (enforced in M3 review, not by a linter): an entity page leads with human
narrative, uses the specific over the generic (`EXPERIENCE_ARCHITECTURE.md`
principle 4), and never renders empty scaffolding or padded sections
(`CONTENT_HIERARCHY.md` §2.1 — sections vanish when their claims are absent). The
graph feeds the page; it does not *become* the page.

---

## 1. Implementation gap analysis

| # | Approved target | Current state (verified) | Gap | Milestone |
|---|---|---|---|---|
| G1 | One canonical domain (`aglen.bg`, ADR-010) | `SITE_URL="https://xn--c1aerj5d.com"` (`seo.ts:26`); `aglen.bg` a 200 duplicate | flip one constant + 301 + GSC | M0 |
| G2 | One brand entity (ADR-011) | `og:site_name`=`nav.quests`="AR мисии"; `author`="Aglen Tourism"; `alt`="unlockingbulgaria" | reconcile brand strings | M0 |
| G3 | Crawler policy by purpose (§15.4b) | repo `robots.txt` blanket-allows incl. training; Cloudflare edge block contradicts it | rewrite robots by purpose; disable CF block | M0 |
| G4 | Entity-first titles/metadata | titles lead with campaign (`home`=`hero.subtitle | nav.quests`) | rewrite title templates | M0 |
| G5 | No obsolete `meta keywords` | emitted (`seo.ts:300`, template `generate-static-routes.mjs:136`) | stop emitting | M0 |
| G6 | One primary navigation (ADR-013) | primary nav (`App.tsx:366`) + parallel guide hub (`App.tsx:380`) + landing star | collapse to one intent-shaped nav | M2 |
| G7 | Unlocking Bulgaria = integrated external product | separate site + home promo + `/quests/` + `/app/`→external; site branded as UB | one home block + `/ar-missions/` hub + place CTAs | M2 |
| G8 | One canonical home per concept | 27 landing pages, 25 near-duplicate; 6 aliases for "places" | canonical map + redirects | M1, M3 |
| G9 | Breadcrumbs = real containment | breadcrumb exists (`App.tsx:1212`) fed by flat route tree | feed from graph containment | M3 |
| G10 | Entity pages derived from the graph | 9 entities are JSON-LD nodes only (`placeNodes()`), no URLs | `/place/<slug>/` namespace from records | M3 |
| G11 | Internal links generated from relations | `internalLinkRouteIds` hand-authored (`landingPages.ts`) | derive from edges; delete arrays | M3 |
| G12 | Structured data validated (not added) | rich JSON-LD already prerendered (`generate-static-routes.mjs:173`) | validate + retype entities | M3 |
| G13 | Provenance on claims | none | claim ledger + `/sources/` | M4 |
| G14 | Build-time graph validation | `i18n-audit.mjs` only | add `graph-audit.mjs` | M3 |

M0 needs no data work and no graph; M1 is redirects; M2 is navigation + UB; M3 is
the entity layer; M4 is provenance. Each is independently deployable and reversible.

---

## 2. Navigation audit

| Structure | Where | Problem | Action |
|---|---|---|---|
| **Primary nav** (Home · About · Landmarks · [Experiences] · [Stay] · Quests · Events · Business) | `App.tsx:366` `navItems` | labels mirror home sections, not intents; "AR мисии" is a top-level peer of Places | replace with one intent-shaped nav (§5) |
| **Guide hub** (Landmarks · Vit river · Fishing · Hiking · Caves · Food · Nearby · Seasonal) | `App.tsx:380` `guideLinks` | a *second* parallel navigation; "Landmarks" duplicated | dissolve into cluster pages |
| **Landing-page star** | `landingPages.ts` `internalLinkRouteIds` | hand-authored, points at thinnest pages; several targets are 301s | delete; derive links from relations |
| **Footer/trust links** | `App.tsx:1153`, `uiText` | fine | keep; group under `/sources/` conceptually |
| **Home-section anchors** | `pageSections.ts` | routes are crops of the scroll | routes become real destinations (M3) |

Conclusion (confirmed against code): the menu is a table of contents for one
scrolling document. One primary navigation must replace all competing structures.

---

## 3. Route classification matrix

Classes: **KEEP** · **MERGE** (content moves into a canonical home) · **REDIRECT**
(301 to nearest real node) · **DELETE** (only after a 301 exists — never a raw
removal) · **GENERATE-LATER** (a real page once its data/field-work exists).

### 3.1 The 27 landing pages (`landingPages.ts`)

| id / slug | Class | Target (canonical) | Reason |
|---|---|---|---|
| `lukovitGuide` /lukovit-travel-guide | MERGE→entity | `/place/lukovit/` | real subject; content already real ✅ |
| `karlukovoGuide` /karlukovo-travel-guide | MERGE→entity | `/place/karlukovo/` | real subject |
| `krushunaGuide` /krushuna-travel-guide | MERGE→entity | `/place/krushuna-falls/` | real subject |
| `devetashkaCaveGuide` /devetashka-cave-travel-guide | MERGE→entity | `/place/devetashka/` | real subject |
| `iskarPanegaGuide` /iskar-panega-travel-guide | MERGE→entity | `/place/iskar-panega/` | real subject |
| `lovechRegionGuide` /lovech-region-travel-guide | MERGE→entity | `/place/lovech-province/` | real subject |
| `historyOfAglen` /history-of-aglen | REDIRECT | `/place/aglen/history/` | name≠content today; unify |
| `weekendInAglen` /weekend-in-aglen | GENERATE-LATER→view | `/plan/weekend-from-sofia/` | real view once distances exist |
| `aglenFromSofia` /aglen-from-sofia | GENERATE-LATER→view | `/plan/getting-here/` | needs road distances |
| `howToGet` /how-to-get-to-aglen | GENERATE-LATER→view | `/plan/getting-here/` | needs road distances |
| `familyTrip` /family-trip-aglen | GENERATE-LATER→view | `/plan/with-children/` | needs entity attributes |
| `bestTime` /best-time-to-visit-aglen | GENERATE-LATER→view | `/plan/when-to-come/` | needs seasonal data |
| `routeMap` /aglen-route-map | REDIRECT | `/karst/map/` | keyword for the map |
| `visitAglen` /visit-aglen | REDIRECT | `/place/aglen/` | keyword for the base |
| `thingsToDo` /things-to-do-in-aglen | REDIRECT | `/plan/` | keyword for activities |
| `natureAroundAglen` /nature-around-aglen | REDIRECT | `/karst/` | keyword for nature |
| `natureTourism` /nature-tourism-aglen | REDIRECT | `/karst/` | duplicate of above |
| `hiddenPlaces` /hidden-places-near-aglen | REDIRECT | `/karst/map/` | keyword |
| `culturalTourism` /cultural-tourism-aglen | REDIRECT | `/place/aglen/history/` | marketing label |
| `adventureTourism` /adventure-tourism-aglen | REDIRECT | `/plan/` | marketing label |
| `ruralTourismBulgaria` /rural-tourism-bulgaria-aglen | REDIRECT | `/place/aglen/` | marketing label |
| `ecoTourismBulgaria` /eco-tourism-bulgaria-aglen | REDIRECT | `/karst/` | marketing label |
| `slowTravelBulgaria` /slow-travel-bulgaria-aglen | REDIRECT | `/place/aglen/` | marketing label |
| `traditionalFood` /traditional-food-aglen | REDIRECT | `/directory/food/` | it is a directory view |
| `accommodationNearAglen` /accommodation-near-aglen | REDIRECT | `/directory/stay/` | directory view |
| `campingNearAglen` /camping-near-aglen | GENERATE-LATER→view | `/plan/camping/` | legality unverified |
| `aiAnswerHub` /aglen-answer-hub | REDIRECT | `/sources/` | 0 inbound; not a source ledger |

**Summary:** 6 MERGE→entity · 1 REDIRECT→history · 6 GENERATE-LATER→plan views ·
14 REDIRECT→existing real nodes. The GENERATE-LATER views stay `noindex` (existing
`isIndexableRoute` pattern) until their data exists — no thin page ships.

### 3.2 The 6 guides (`guides.ts`)

| slug / status | Class | Target | Reason (`CONTENT_HIERARCHY.md` §4) |
|---|---|---|---|
| `beautiful-places` (published) | MERGE | `/karst/landforms/` + entity pages | split; 301 index to cluster |
| `vit-river` (in-prep) | MERGE→entity | `/place/vit-river/` | content moves |
| `caves-and-rocks` (in-prep) | MERGE | `/karst/caves/` | cluster |
| `local-food` (published) | REDIRECT | `/directory/food/` | a directory view, not a guide |
| `nearby-destinations` (in-prep) | MERGE | `/karst/map/` | graph edges |
| `seasonal-guide` (in-prep) | GENERATE-LATER→view | `/plan/when-to-come/` | needs seasonal data |

### 3.3 Core routes (`routes.ts`)

| route (slug) | Class | Target / note |
|---|---|---|
| `home` ("") | KEEP | the Aglen front door |
| `pillars` (tourism) | MERGE | into `/place/aglen/history/` + `/story/*` |
| `attractions`,`vitRiver`,`caves`,`food`,`nearby`,`seasonal` | KEEP redirects | already 301→guides (`_redirects`); re-point to entities/clusters in M3 |
| `activities` (flag off) | KEEP dormant | → `/plan/` when re-enabled |
| `geo` (location) | MERGE | `/karst/map/` |
| `stay` (flag off) | KEEP dormant | → `/directory/stay/` |
| `quests` (unlockingbulgaria) | MERGE→rename | `/ar-missions/` (UB local hub, §7) |
| `app` | MERGE | into `/ar-missions/` (the open/download CTA) |
| `travelGuide` (hub) | KEEP | guides index / cluster hub |
| `events` | **KEEP top-level** | distinct dynamic intent (ADR-013) |
| `localBusinesses` | **KEEP top-level** | distinct intent; optional `/directory/` alias |
| `guides` | KEEP | index |
| `trust`(about),`editorial`,`localSeo`,`crawlerPolicy`,`contact` | KEEP | group under `/sources/` conceptually; URLs unchanged |

No route is DELETEd outright; retirement is always a 301 first, monitored, reversible.

---

## 4. Canonical URL map (one concept → one home)

| Concept | Canonical home | Aliases that 301 in |
|---|---|---|
| The karst (nature/subject) | `/karst/` | nature-around, nature-tourism, eco-tourism |
| Places browser | `/karst/map/` | aglen-route-map, hidden-places, nearby-destinations |
| A place | `/place/<slug>/` | the 6 guide-landing subjects; `#place-*` schema nodes get URLs |
| Caves cluster | `/karst/caves/` | caves route, caves-and-rocks guide |
| Landforms cluster | `/karst/landforms/` | beautiful-places guide (index) |
| The river | `/place/vit-river/` | vitRiver route, vit-river guide |
| Aglen (base) | `/place/aglen/` | visit-aglen, rural/slow-travel labels |
| History | `/place/aglen/history/` → `/history/*` | history-of-aglen, cultural-tourism, pillars |
| Stories/legends | `/story/<slug>/` | (new; from the modal) |
| Plans | `/plan/*` | weekend, from-sofia, how-to-get, family, best-time, camping, things-to-do, adventure |
| Food (commerce) | `/directory/food/` | local-food guide, traditional-food landing |
| Stay (commerce) | `/directory/stay/` | accommodation-near, camping (partly) |
| AR missions (UB) | `/ar-missions/` | quests (unlockingbulgaria), app, ar |
| Sources/method | `/sources/` | aglen-answer-hub; about/editorial/crawler-policy group here |
| Events | `/events/` | unchanged ✅ |
| Local business | `/local-businesses/` (or `/directory/`) | unchanged ✅ |

Rule enforced by `graph-audit.mjs` (M3): no two indexable pages share a subject.

---

## 5. Navigation tree (ADR-013 — village-first, intent-shaped)

Illustrative, not a visual design. One primary navigation; Unlocking Bulgaria is a
sub-item of Visit, not a peer of Places; Events and Local Business remain top-level.

```
Начало / Home
Ъглен                     → /place/aglen/   (village, history, the "Ъ" fact, identity)
Места и природа           → /karst/map/ · /karst/ · /place/<slug>/   (entities + karst as content)
Посети Ъглен / Visit      → /plan/
   ├── Как да стигна        /plan/getting-here/
   ├── Маршрути             /route/*
   ├── С деца               /plan/with-children/
   ├── AR мисии с UB        /ar-missions/     (the mission hub; §7)
   └── Кога да посетя       /plan/when-to-come/
Събития / Events          → /events/         (top-level)
Местен бизнес / Business   → /local-businesses/ (top-level)
Footer: Sources · Corrections · Editorial policy · Contact · Language
```

`/karst/` remains the knowledge *subject* root (ADR-008) and is reachable from
"Места и природа"; it is **not** the front-door label (avoids the geology-portal
read). The primary nav is derived from this hierarchy, not from `HOME_SECTIONS`.

---

## 6. Breadcrumb specification (real-world containment, not routes)

Breadcrumbs render the `containedIn` chain of the graph, never the URL/route tree.

| Page | Breadcrumb (containment) |
|---|---|
| `/place/prohodna/` | Начало ▸ Карст ▸ Карлуковски район ▸ Проходна |
| `/place/dupkata/` | Начало ▸ Карст ▸ Долина на Вит при Ъглен ▸ Дупката |
| `/place/aglen/history/` | Начало ▸ Ъглен ▸ История |
| `/karst/caves/` | Начало ▸ Карст ▸ Пещери |
| `/ar-missions/` | Начало ▸ Посети Ъглен ▸ AR мисии |
| business detail | Начало ▸ Местен бизнес ▸ <name> |

Rules: (1) breadcrumb items come from the entity's `parent` chain, not from the
path segments; (2) the last crumb is the page and is not a link; (3) a crumb never
repeats the page `<title>` (acceptance criterion §15.8.1). Reuse the existing
breadcrumb component (`App.tsx:1212`); change only its data source.

---

## 7. Unlocking Bulgaria integration specification

Satisfies ADR-013 and the review's acceptance criteria. UB is an independent
national product; Aglen is its first live destination.

**Home (one compact block, replacing the promotional hero):**
- Heading: "Открий Ъглен чрез Unlocking Bulgaria" — AR/GPS missions at real places.
- Two CTAs: **[Виж активните мисии]** → `/ar-missions/` · **[Отвори приложението]** →
  `unlockingbulgaria.com/<lang>/` (external, clearly labelled).
- No second hero anywhere.

**One local mission hub — `/ar-missions/`** (re-homes the current `quests`+`ar`+`app`):
- What Unlocking Bulgaria is (one short paragraph; it is a national product).
- Which missions are available around Ъглен, and **at which places** (each links to
  its `/place/<slug>/`).
- What is needed (phone, GPS, the app).
- One button to open/download the app (the only external handoff).

**Each place page** with a mission shows a contextual affordance:
- "Налична AR мисия — [Започни мисията]" → the mission on `/ar-missions/` or the app.

**Data model:** a mission references a place (`mission.placeId`); a place surfaces
its missions by reverse lookup — **every mission belongs to a place, never the
reverse.** Modeled as `SoftwareApplication` in schema, **not** `subOrganization`.

**Cross-domain handoff:** the only jump to `unlockingbulgaria.com` is the explicit
"open the app" CTA; it is labelled as an external application, so the transition is
intentional and the visitor never feels they slipped into a second website.

---

## 8. Redirect plan (backward compatible, reversible)

Additions to `public/_redirects` (the existing mechanism; `:lang` covers all 14
languages in one rule). Order: specific before general. Existing 6 legacy rules stay.

```
# ── Domain consolidation (ADR-010) — handled at DNS/Cloudflare + SITE_URL flip ──
#   ъглен.com/*  →  https://aglen.bg/:splat   301   (host-level rule)

# ── Landing pages → canonical nodes (301, all languages) ──
/:lang/visit-aglen/                  /:lang/place/aglen/            301
/:lang/things-to-do-in-aglen/        /:lang/plan/                   301
/:lang/nature-around-aglen/          /:lang/karst/                  301
/:lang/nature-tourism-aglen/         /:lang/karst/                  301
/:lang/eco-tourism-bulgaria-aglen/   /:lang/karst/                  301
/:lang/hidden-places-near-aglen/     /:lang/karst/map/              301
/:lang/aglen-route-map/              /:lang/karst/map/              301
/:lang/cultural-tourism-aglen/       /:lang/place/aglen/history/    301
/:lang/rural-tourism-bulgaria-aglen/ /:lang/place/aglen/            301
/:lang/slow-travel-bulgaria-aglen/   /:lang/place/aglen/            301
/:lang/adventure-tourism-aglen/      /:lang/plan/                   301
/:lang/traditional-food-aglen/       /:lang/local-businesses/       301   # until /directory/food/
/:lang/accommodation-near-aglen/     /:lang/local-businesses/       301
/:lang/aglen-answer-hub/             /:lang/about/                  301   # until /sources/
/:lang/history-of-aglen/             /:lang/place/aglen/history/    301
/:lang/lukovit-travel-guide/         /:lang/place/lukovit/          301
/:lang/karlukovo-travel-guide/       /:lang/place/karlukovo/        301
/:lang/krushuna-travel-guide/        /:lang/place/krushuna-falls/   301
/:lang/devetashka-cave-travel-guide/ /:lang/place/devetashka/       301
/:lang/iskar-panega-travel-guide/    /:lang/place/iskar-panega/     301
/:lang/lovech-region-travel-guide/   /:lang/place/lovech-province/  301
```

**Sequencing rule (no broken URLs):** a `/place/...` or `/karst/...` target must
exist (M3) *before* its 301 goes live. Until then the landing page stays served and
`noindex`, or 301s to an existing node (the pure-keyword pages above 301 to
`/karst/`, `/place/aglen/`, `/plan/` which exist earlier). The GENERATE-LATER views
keep serving `noindex` until their data lands. Every redirect is one line, reversible
by deletion; monitor 60 days (`5_YEAR_SEO_ROADMAP.md` risk row).

---

## 9. Structured-data validation & graph-validation plans

### 9.1 Validate (do NOT re-add) the existing JSON-LD
The schema is already rich and prerendered (`seo.ts` → `generate-static-routes.mjs:173`).
Actions:
- Run Rich Results Test on home, a guide, a business, and (once built) a place page.
- Confirm the graph resolves: `#organization`, `#website`, `#aglen-village`,
  `#lovech-province`, `#place-*` nodes have no dangling `@id` (the code already
  defines them on every page — verify no regressions).
- Retype entity pages away from `TouristDestination` (a *view* type, C6) to
  `Place`/`Landform`/`Cave` as `/place/<slug>/` pages ship.
- Each entity page must expose: `Place`+`GeoCoordinates`, `BreadcrumbList`,
  `ImageObject`, `sameAs` (Wikidata/Wikipedia), `containedInPlace`, `Organization`,
  and `FAQPage` only where real Q&A exists.

### 9.2 `graph-audit.mjs` (M3) — build fails on violation
Duplicate entities · broken relations · missing parents · missing coordinates (where
`geo` claimed) · broken internal links (resolve ids→current paths; zero 301-hops) ·
orphan pages (≥3 inbound) · missing/`>1` schema per URL · broken redirects · the 5
generation gates (G1–G5) · confidence never flattened (V15). Built in the shape of
the existing `i18n-audit.mjs`.

---

## 10. Page-purpose specification (representative pages)

| Page | Primary purpose | User intent | KG role | Experience role | SEO role | Nav parent | Canonical |
|---|---|---|---|---|---|---|---|
| `/place/aglen/` | the base identity | "what is this place?" | root village entity | L0 orientation | brand + "Ъ" fact | Home | `/place/aglen/` |
| `/place/aglen/history/` | tell the history | "history of my village" | period edges | L3 understanding | high-uniqueness content | Ъглен | `/place/aglen/history/` |
| `/place/prohodna/` | the demand cave | "Eyes of God cave" | E5 anchor | L1→L3 (→ Дупката) | access/light/safety | Карст ▸ Карлуково | `/place/prohodna/` |
| `/place/dupkata/` | originate the arch | "arch over the Vit" | E1, `sameFormation`→Prohodna | L1 discovery | canonical source | Карст ▸ Вит | `/place/dupkata/` |
| `/karst/` | define the subject | "what is this landscape" | region root | L0 frame | topical authority | Места и природа | `/karst/` |
| `/ar-missions/` | the UB local hub | "AR missions here" | missions↔places | L5 participation | product page | Посети Ъглен | `/ar-missions/` |
| `/plan/weekend-from-sofia/` | a decision | "weekend near Sofia" | composes entities | L4 planning | high-volume intent | Посети Ъглен | `/plan/weekend-from-sofia/` |

Rule: no page has more than one primary purpose; multi-purpose pages split (e.g.
`beautiful-places` → cluster + entities).

---

## 11. Exact files to modify (by milestone)

**M0 — config/copy (no data, no graph):**
- `src/seo.ts` — `SITE_URL` (l.26 → `https://aglen.bg`); `siteName` (l.361 → org name);
  title templates in `routeText` (l.259–295, home first); stop building `keywords`
  (l.300 `keywordsForRoute`); `seoTextByLanguage.organizationName` if brand copy changes.
- `scripts/generate-static-routes.mjs` — remove the `meta keywords` insert (l.136);
  keep the JSON-LD/alternates inserts.
- `public/robots.txt` — rewrite by purpose (§15.4b); `Sitemap:` → aglen.bg.
- `public/_redirects` — add the host-level `ъглен.com → aglen.bg` rule.
- `index.html` — drop the static `meta keywords` tag if present.
- Cloudflare dashboard — disable managed AI-block (not a repo change; document it).

**M1 — redirects for pure-keyword pages (targets already exist):**
- `public/_redirects` — the 301s whose targets are `/karst/`, `/place/aglen/`,
  `/plan/`, `/local-businesses/`, `/about/`.
- `src/landingPages.ts` / `src/routes.ts` — mark retired ids `noindex` via existing
  `isIndexableRoute` until their 301 lands; delete `internalLinkRouteIds` in M3.

**M2 — one navigation + UB integration:**
- `src/App.tsx` — `navItems` (l.366) → the intent-shaped nav; dissolve `guideLinks`
  (l.380); replace the home quests promo with the one compact block; `appUrl` (l.449)
  used only in the `/ar-missions/` hub's external CTA.
- `src/routes.ts` — add `/ar-missions/`; re-home `quests`/`app` under it.
- `src/pageSections.ts` — routes stop being section crops for migrated concepts.

**M3 — entity layer (the additive namespace):**
- `src/graph/` (new dir) — `entities.ts` (absorb `region.ts`), `relations.ts`,
  `claims.ts`, `sources.ts` (`PROGRAMMATIC_SEO_PLAN.md` §5).
- `src/seo.ts` — entity-page schema (retype from `TouristDestination`).
- render layer for `/place/`, `/karst/`, `/history/`, `/story/`, `/plan/`.
- `scripts/graph-audit.mjs` (new); wire into build.
- `public/_redirects` — the entity-target 301s (guides + 6 landing subjects).

**M4 — provenance:** claim ledger render, `/sources/`, `/corrections/`,
per-page provenance footer.

---

## 12. Implementation checklist & order (validate after each)

| M | Milestone | Ships | Validate |
|---|---|---|---|
| **M0** | Domain, brand, robots, titles, keywords, measurement | config only; no URL changes except host 301 | canonical=aglen.bg everywhere; robots coherent; GSC verified; titles lead with entities; no `keywords` tag; Rich Results still valid |
| **M1** | Retire pure-keyword landing pages | 14 301s to existing nodes | no broken URLs; 301 (not 302); no orphan; sitemap drops retired; monitor 60 days |
| **M2** | One navigation + UB hub | new nav; `/ar-missions/`; one home block | one menu; breadcrumbs sane; UB is not the identity; every mission → a place; no double promo |
| **M3** | Entity namespace + derived links + graph audit | `/place/*`, `/karst/*`, `/history/*`; entity 301s; `graph-audit.mjs` | zero orphans; links=edges; entity schema valid; parents/coords present; redirects resolve; sitemap correct |
| **M4** | Provenance | claim ledger, `/sources/`, footer | every indexed claim sourced; `/corrections/` generates |

**Per-milestone validation gate (run before the next milestone):** navigation
consistency · breadcrumbs · internal links · canonical URLs · no broken routes · SEO
integrity (titles, canonicals, hreflang, sitemap) · structured data (Rich Results) ·
redirects · performance (CWV) · accessibility (axe/Lighthouse) · user orientation
(where am I / from / next). Do not proceed until the current milestone is green.

**Commit discipline:** one logical change per commit (e.g. "flip SITE_URL to
aglen.bg", "rewrite robots.txt by crawler purpose", "retire 14 keyword landing
pages via 301"). Never rewrite `App.tsx` wholesale — edit `navItems`/`guideLinks`
in place.

---

## 13. Recommended first step

**M0 is the highest-ROI, lowest-risk milestone** and touches no data and no graph:
domain flip, brand strings, robots-by-purpose, entity-first titles, drop `meta
keywords`, verify GSC. It is almost entirely configuration and is fully reversible.

> **Awaiting your review of this plan before any application code is written.** On
> approval, I will begin with M0 as small, individually-reversible commits on a new
> branch, and stop for validation and your sign-off after M0 before touching
> navigation (M2) or the entity layer (M3).
