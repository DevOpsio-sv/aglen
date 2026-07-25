# Information Architecture Review

**A user-mental-model review of navigation and content hierarchy.** Reviewed
2026-07-25 against the live implementation (`src/App.tsx`, `src/routes.ts`,
`src/pageSections.ts`, `src/seo.ts`, `src/landingPages.ts`) and reconciled with
`CONTENT_HIERARCHY.md`, `EXPERIENCE_ARCHITECTURE.md`, `KNOWLEDGE_GRAPH.md` and
`MASTER_ARCHITECTURE_BLUEPRINT.md`.

**Standing.** This is a *review/gate artifact*, not a redesign and not a new
architecture document. Its recommendations take effect only as ADRs against the
blueprint (§18) or by extending `CONTENT_HIERARCHY.md`, per the project governance
rule. It does **not** propose visual design, components, or a nav bar layout — it
proposes the single *conceptual hierarchy* the navigation must express.

> **The one question it answers:** does a visitor, at any point, know *where they
> are, where they came from, and what to do next* — and do they experience one
> coherent product, or several websites wearing one banner?

Today, the answer is: **several websites.** The evidence is below, then the
reconciliation, then an evolutionary migration that requires no rewrite.

---

## 1. The mental-model problem, stated once

A person navigates by building a *map in their head*. A coherent product gives them
one map; every page they visit adds a landmark to it. This site gives them **five
maps at once**, and they contradict each other. The visitor cannot form a stable
model of "what is this place and how is it organised," so every click feels like
starting over — which is the precise mechanism by which `EXPERIENCE_ARCHITECTURE.md`
§6.1 says the experience dies "at minute 2."

The five competing hierarchies, all live simultaneously:

| # | Hierarchy | Where it lives | Organising logic |
|---|---|---|---|
| H1 | **The home scroll** | `pageSections.ts` — 13 fixed sections | narrative/marketing order |
| H2 | **The route/keyword tree** | `routes.ts` — ~50 slugs | SEO keywords |
| H3 | **The guide hub** | `App.tsx:380` `guideLinks` | editorial topics |
| H4 | **The landing-page set** | `landingPages.ts` — 27 pages | keyword permutations |
| H5 | **The knowledge graph** | `CONTENT_HIERARCHY.md` (proposed, unbuilt) | the real world |
| + | **A sixth, off-site** | `unlockingbulgaria.com` (`App.tsx:449`) | a separate product |

H1–H4 all describe the *same content* by different logics, and none of them is H5 —
the hierarchy of the actual region. The IA task is not to add a sixth map. It is to
**delete four of them and make the navigation express H5**, with Unlocking
Bulgaria integrated as a clearly-identified *external experience available at
places* — not a sixth map, and not the village's identity (§3.3).

---

## 2. Findings — the seven pathologies the brief names

### 2.1 Duplicated navigation structures

At least **four parallel navigations** present overlapping concepts:

- **Primary nav** (`App.tsx:366`): Home · About · Landmarks · [Experiences] · [Stay]
  · Quests · Events · Business.
- **Guide hub** (`App.tsx:380` `guideLinks`): Landmarks · Vit river · [Fishing] ·
  [Hiking] · Caves · [Stay] · Food · Nearby · Seasonal.
- **Landing-page cross-links** (`landingPages.ts` `internalLinkRouteIds`): a
  hand-authored star.
- **Footer trust links** + **home-section anchors**.

"Landmarks/attractions" appears in the primary nav *and* the guide hub. "Stay"
appears in the nav, the guide hub, and as a flag-gated section. A concept the user
meets in two menus reads as two different things — or as a site that cannot decide
what it is. **One concept must appear in exactly one navigation.**

### 2.2 Competing information hierarchies

H1–H4 (§1) are four answers to "how is this site organised," and the *routes are
literally crops of the home scroll*: `pageSections.ts` states it outright — "Every
route here used to render the entire home page and merely scroll to a section." So
H2 (routes) is not an independent hierarchy at all; it is H1 (the scroll) re-sliced.
The user senses this: moving between `/attractions/`, `/activities/`, `/location/`
feels like scrolling one page to anchors, because that is what it is. There is no
sense of *travelling through a place*, only of re-framing one document.

### 2.3 Repeated landing experiences

- **25 of 27 landing pages render the same three section bodies** under different
  names (`PROGRAMMATIC_SEO_PLAN.md` §0; only `lukovitGuide` has real overrides). A
  visitor who follows two internal links lands twice on the same page wearing a
  different title. The seam is *felt*, and each time it is felt, trust cracks.
- Every core route is a subset of `HOME_SECTIONS` (`sectionsByRoute`), so
  `/tourism/`, `/activities/`, `/location/` are the same scroll, cropped.

The mental-model cost: the user cannot tell whether they have been somewhere before.
A product where "back" and "forward" land on the same content teaches the user that
exploration is pointless.

### 2.4 The same concept under different names (concept aliasing)

The single clearest symptom. One real concept, many URLs and labels:

| Real concept | Aliases live today | Canonical home (target) |
|---|---|---|
| **Nature of the area** | `natureAroundAglen`, `natureTourismAglen`, `ecoTourismBulgaria`, `ruralTourismBulgaria`, `slowTravelBulgaria`, `culturalTourismAglen`, `adventureTourism` | one `/karst/` + its clusters; the rest 301 |
| **Places to see** | `attractions` (nav), `landmarks` (section), `beautiful-places` (guide), `places` (home section), `hiddenPlaces` (landing) | `/karst/map/` + `/place/<slug>/` |
| **Things to do** | `activities`, `experiences` (section/eyebrow), `thingsToDo` (landing) | `/plan/*` views over real entities |
| **The caves** | `caves` (route→301), `caves-and-rocks` (guide), a home card, cave mentions in landings | `/karst/caves/` + `/place/<cave>/` |
| **The river** | `vitRiver` (route→301), `vit-river` (guide), a home card | `/place/vit-river/` |
| **Getting there / trips** | `weekendInAglen`, `aglenFromSofia`, `howToGet`, `familyTrip`, `routeMap` | `/plan/*` views |
| **History** | `historyOfAglen` (landing) vs the actual history text (a home-section modal) | `/place/aglen/history/` + `/history/*` |
| **The AR experience** | `quests` (nav, slug `unlockingbulgaria`), `ar` (section), `app` (route→external), `og:site_name`="AR мисии" | one `/quests/` feature over entities (§3.3) |

The `historyOfAglen` row is the sharpest: **the page named for the content does not
contain the content** — the history renders into a modal on the home page, while the
`/history-of-aglen/` landing page is generic. The name and the thing have come
apart. That is concept-aliasing in its purest form.

### 2.5 Pages that behave like separate websites

Three sub-products currently read as separate sites bolted to one banner:

1. **Unlocking Bulgaria — an actually separate website.** `appUrl =
   "https://unlockingbulgaria.com/${language}/"` (`App.tsx:449`); the `/app/` page
   links *out* to it, and the village site brands *itself* as the campaign
   (`og:site_name` = `nav.quests` = "AR мисии", `seo.ts:361`). The relationship is
   **inverted and doubled**: Unlocking Bulgaria is an *independent national product*,
   but on aglen.bg it appears as a **duplicate mini-site** while the village brands
   *itself* as the campaign. A visitor cannot tell which site they are on or which is
   the "main" one.
2. **The AR/quests block** feels like a product tour dropped into a village site —
   disconnected from any place a person can actually stand.
3. **The business directory** uses its own hero, its own card paradigm, its own
   detail-page shape — closer to a mini-app than a part of the same product. (It is
   the best-built part; the point is only that it does not *feel* continuous with the
   rest.)

The corrected north star (§3.3) — *Unlocking Bulgaria is an independent national
product, integrated on aglen.bg as an external experience available at places, never
as the village's identity or a duplicate mini-site* — is currently violated at the
level of domain, brand, and navigation simultaneously.

### 2.6 Inconsistencies between the Knowledge Graph, the Experience Architecture, and the actual navigation

| Layer | Says the hierarchy is… | The live nav does… |
|---|---|---|
| **Knowledge Graph** (`KNOWLEDGE_GRAPH.md` §3) | containment: karst ⊃ districts ⊃ places; a mesh of typed edges | flat keyword list; no entities to contain anything |
| **Experience Arch** (`EXPERIENCE_ARCHITECTURE.md` §2,§4) | layers and loops; every step carries to a *next* entity | anchored scroll; every step returns to the same scroll |
| **Content Hierarchy** (`CONTENT_HIERARCHY.md` §5) | 5 intentional items: Карстът · Места · История · Планирай · Ъглен | 8 section-shaped items: Home · About · Landmarks · Quests · Events · Business |
| **Actual nav** (`App.tsx:366`) | — | mirrors `HOME_SECTIONS`, not the world |

All three design layers agree with each other and **all three disagree with the
running navigation**. The nav is the odd one out because it was derived from the
implementation (the home sections), not from any of the three models. Note too that
`CONTENT_HIERARCHY.md` §5 already flags that the proposed "Места" item "points at a
route that Phase 1 turned into a 301" — the plan and the code have already drifted.

### 2.7 Where navigation follows implementation instead of user intent

The root cause of all of the above, in one line from the code:

> `sectionsForRoute(routeId)` returns a slice of `HOME_SECTIONS`, and `navItems`
> labels are the section names.

The navigation is a **table of contents for a single scrolling document**, because
that is what the site technically is. Users do not think in "hero / stats / story /
legends / places / gallery / map / hub" — that is the *build's* structure, exposed
as the *user's* structure. Intent-shaped questions ("what is this place?", "what can
I see?", "how do I get there?", "what's its story?") have no home, because the nav
answers a different question: "which section of the home page do you want to scroll
to?"

---

## 3. The reconciliation — one hierarchy, one product

The fix is not a new map. It is to **make the navigation express the one hierarchy
that is already agreed** (the knowledge graph, H5) and delete the four that compete
with it. Four principles, each a testable IA guarantee.

### 3.1 Every concept exists exactly once

Each real concept gets **one canonical home** (a `/place/`, `/karst/`, `/history/`,
`/story/`, `/plan/` node); every alias 301s to it (§2.4 table, right column). This
is the `CONTENT_HIERARCHY.md` §0 rule — *a URL exists for a thing, at the level where
that thing is true* — applied as an IA de-duplication. The test: **search the site
for a concept; it must resolve to one page, not a family of near-duplicates.**

### 3.2 Every page has one clear purpose

The generation classes of `MASTER_ARCHITECTURE_BLUEPRINT.md` §5 give each page a
single job: an **entity page** describes a thing; a **view** answers an intent; a
**cluster** compares things; a **narrative** tells a story. A page may not be two of
these at once. The test: **name a page's job in one sentence without "and."** Today
`/history-of-aglen/` fails (it is a keyword page *and* supposedly the history *and*
neither); tomorrow `/place/aglen/history/` passes.

### 3.3 Unlocking Bulgaria — an independent product, contextually integrated in Aglen

**A correction to the original framing.** Unlocking Bulgaria is *not* "a feature of
Aglen." It is an **independent national experience platform and application** whose
missions begin around Ъглен but will extend across Bulgaria. Aglen is its **first
live destination**, not its owner. Subordinating the product to the village site
would be right for today's single location and wrong for the product's identity.

The correct model is two products, two domains, one relationship:

| | Owns | Identity |
|---|---|---|
| **aglen.bg** | village, place, history, event, business, visit/tourism content | "Aglen / Ъглен Туризъм" |
| **unlockingbulgaria.com** | the national AR/GPS mission platform & app | "Unlocking Bulgaria" — a `SoftwareApplication`/product, **not** a `subOrganization` of Aglen |
| **relationship** | Aglen is Unlocking Bulgaria's first live destination | mission metadata may be shared; each domain keeps a distinct canonical role |

On aglen.bg, Unlocking Bulgaria must be experienced as an **integrated external
experience available in Aglen** — and must **not** appear as any of:

- the identity of the village website (today `og:site_name` = "AR мисии" — wrong);
- a duplicate mini-site (today: a full promo hero on the home page → a second
  standalone landing that repeats it → an external site, all restating the same
  thing);
- a sibling geographic category beside Places (C16 — it is an *experience layer*, not
  a parallel geography);
- a product owned by Aglen.

It should appear as: an available experience *at selected places*; a clearly
identified external application; a contextual CTA inside visit and place journeys;
and a separate product reached by a consistent, honest cross-domain handoff. The
chain is **Place in Aglen → available experience → Unlocking Bulgaria**, never
**Aglen site → UB mini-site → external UB site**. This is ADR-013
(`MASTER_ARCHITECTURE_REVIEW.md` §15.4a).

### 3.4 Every navigation path feels intentional — the orientation guarantees

*Where am I · where did I come from · what do I do next* — each maps to a graph
mechanism the code already partly has:

| Question | Mechanism | Already in code |
|---|---|---|
| **Where am I?** | Breadcrumb = the `containedIn` chain (karst ▸ district ▸ place) | ✅ `breadcrumbs` nav exists (`App.tsx:1212`); it must be fed by real containment, not the flat route tree |
| **Where did I come from?** | Loop/route context — the entity I arrived from stays visible ("from Проходна, along the same formation") | ✅ the "explore from" place-card links exist (`App.tsx:814`); generalise them into arrival context |
| **What do I do next?** | Forward edges — every page ends on ≥1 typed relation to a next entity (`INTERNAL_LINKING_GRAPH.md`; Experience principle 3, "never end on a full stop") | 🔴 today every path returns to the home scroll |

The test for "intentional": **from any page, the three questions have visible
answers, and "next" is always a real place the user did not arrive from.** A path
that loops back to where it started is the definition of a browse, not an
exploration.

### 3.5 The primary navigation — village-first, intent-shaped

The IA endorses **one** primary navigation shaped by the visitor's questions, not the
home-page sections. It does **not** prescribe the exact bar (a design task); it fixes
the *model*. Two corrections to an earlier "karst-first" proposal:

- **The front door stays the village, not the karst.** Leading with "Карстът" makes
  the site read as a regional geology portal rather than Ъглен's digital home.
  Region-first is correct for the knowledge *subject* and the URL namespace (ADR-008),
  not for the site's identity — the documented `CONTENT_HIERARCHY.md` §6 fallback
  (keep `/` as the Aglen home).
- **Events and Local Business may remain top-level.** They carry distinct, dynamic,
  high-value intent ("what's on?", "where to eat / who to hire?"), and folding them
  away would hurt the people who use them most.

A balanced structure — illustrative, not prescriptive:

| Item | User question | Note |
|---|---|---|
| **Начало / Home** | "where am I?" | the village's front door |
| **Ъглен** | "what is this place?" | village, history, the "Ъ" fact, identity |
| **Места и природа / Places & nature** | "what can I see?" | entities + the karst as *content*, not as the site's name |
| **Посети Ъглен / Visit** | "how do I visit?" | getting here, routes, when, with children, **and AR missions with Unlocking Bulgaria** |
| **Събития / Events** | "what's happening?" | may stay top-level |
| **Местен бизнес / Local business** | "where to eat / who to hire?" | may stay top-level |

Unlocking Bulgaria is **not** a permanent top-level item and **not** a peer of
"Места". It is a clearly visible CTA / sub-item inside *Visit*:

> Посети Ъглен → Как да стигна · Маршрути · С деца · **AR мисии с Unlocking
> Bulgaria** (→ the local mission hub, §3.3 / §5) · Кога да посетя

So the site stays Aglen's, the regional themes stay reachable, AR does not compete
with "Места", and the app has one clear place in the visit journey. Everything else —
the guide hub, the 27 landing pages — folds into these items or retires.

---

## 4. The concept-to-canonical reconciliation (the master de-duplication)

The complete map from today's fragments to tomorrow's single homes. This *is* the IA,
expressed as "one concept, one place."

| Fragment(s) today | Behaviour today | Canonical home | Disposition |
|---|---|---|---|
| `attractions`, `landmarks`, `beautiful-places` guide, `places` section, `hiddenPlaces` | 4–5 aliases for "places" | `/karst/map/` + `/place/<slug>/` | merge; 301 aliases |
| `activities`, `experiences`, `thingsToDo` | 3 aliases for "things to do" | `/plan/*` views | merge; 301 |
| `natureAround*`, `natureTourism*`, `eco/rural/slow/cultural/adventure` | 7 keyword skins of "nature" | `/karst/` + clusters | 301 the 7; keep one subject |
| `caves`, `caves-and-rocks` guide, cave cards | route → 301 already | `/karst/caves/`, `/place/<cave>/` | consolidate |
| `vitRiver`, `vit-river` guide | route → 301 already | `/place/vit-river/` | consolidate |
| `historyOfAglen` landing **vs** the history modal | name ≠ content | `/place/aglen/history/` + `/history/*` | unify name and content — free (`CONTENT_GAP_ANALYSIS.md` A1) |
| `weekendInAglen`, `aglenFromSofia`, `howToGet`, `familyTrip`, `routeMap`, `bestTime`, `camping` | intent skins | `/plan/*` | become real views once distances exist; 301 until then |
| `aiAnswerHub` (0 inbound links) | orphan keyword | `/sources/` | 301 |
| `quests` (slug `unlockingbulgaria`), `ar`, `app`→external, the home promo hero | duplicated mini-site + separate-product confusion | one local mission hub `/ar-missions/` + contextual CTAs on place pages | integrate as an external experience (ADR-013); collapse the duplicate promo; keep the app on its own domain |
| guide hub (`guideLinks`) | parallel nav | `/karst/<cluster>/` pages | dissolve into clusters |
| primary nav (8 section-shaped items) | mirrors home scroll | the 5 world-shaped items (§3.5) | replace |

Two properties this table guarantees: **nothing is deleted without a 301** (every
alias keeps resolving — reversible, no lost links), and **every surviving page is a
real thing** (a place, a story, a plan, the karst), never a keyword.

---

## 5. Migration plan — evolutionary, no rewrite

The site keeps running throughout. Nothing here rewrites `App.tsx`; the breadcrumb
(`App.tsx:1212`), the place-card "explore from" links (`App.tsx:814`), the 301
mechanism (`public/_redirects`), and the noindex logic (`seo.ts:isIndexableRoute`)
already exist and are reused. Five waves, each independently shippable.

### Wave 0 — Stop the bleeding (config + copy, days)
- **Fix the brand inversion** (`MASTER_ARCHITECTURE_REVIEW.md` ADR-011): set
  `og:site_name`/`Organization` to "Aglen Tourism"; demote "AR мисии / Unlocking
  Bulgaria" to a program name. One change to `siteName`/`organizationName` sources.
- **Rename the concept that lies:** point the history nav/label at the real history,
  not the empty landing page.
- *Effect:* the site stops presenting itself as the AR campaign; Unlocking Bulgaria
  starts reading as a feature.

### Wave 1 — One primary navigation (additive, days)
- Introduce the five world-shaped nav items (§3.5) **alongside** the existing
  routes; retire the parallel `guideLinks` hub into a cluster page.
- The five items can point at *existing* pages initially (e.g. "История" → the
  history once freed from the modal), then re-point to `/karst/`, `/place/` as those
  are built. Nav changes before the full tree exists; it just points at the best
  current home for each question.
- *Effect:* users get one map. The `CONTENT_HIERARCHY.md` §5 nav becomes real.

### Wave 2 — Give concepts their single home (additive routes, weeks)
- Build the `/place/<slug>/`, `/karst/`, `/history/*`, `/story/*` namespace
  *additively* beside current routes (blueprint §17 Phase 1–2). The history, legends,
  Kunev, and the "Ъ" fact publish first — no field work, no new writing.
- As each canonical home goes live, 301 its aliases per the §4 table. The landing
  pages retire in batches; each retirement is one `_redirects` line, reversible,
  monitored 60 days.
- *Effect:* concept-aliasing (§2.4) dissolves; repeated landings (§2.3) disappear.

### Wave 3 — Define the product boundary; integrate Unlocking Bulgaria contextually (weeks)

**Before touching the global navigation, define the product boundary** (ADR-013):

1. `aglen.bg` owns village, place, history, event, business and visit content.
2. `unlockingbulgaria.com` owns the national application and mission platform.
3. Mission metadata may be shared (a mission references a place), but each domain has a
   distinct canonical role.
4. `aglen.bg` links to missions **contextually**, from places and visit planning.
5. The current duplicate Unlocking Bulgaria promotional experience is reduced to **one**
   local mission hub plus contextual CTAs.

Then integrate, concretely:
- Home: one compact block — "Открий Ъглен чрез Unlocking Bulgaria" (AR/GPS missions at
  real places) — with two CTAs (*see active missions* / *open the app*). No second hero.
- One local mission hub on aglen.bg (e.g. `/ar-missions/`): what Unlocking Bulgaria is,
  which missions are available around Ъглен, at which places, what is needed, and a
  button to open/download the app. Not a repeat of the home hero.
- Each place page shows a contextual affordance: "Налична AR мисия — [Започни мисията]".
- *Effect:* the chain becomes **place → available experience → Unlocking Bulgaria**, and
  the mini-site-within-a-site disappears. Unlocking Bulgaria keeps its independent
  national identity; Aglen keeps its own.

### Wave 4 — Make every path intentional (with the graph, ongoing)
- Feed the existing breadcrumb from real `containedIn`; generalise "explore from"
  into persistent arrival context; ensure every page ends on forward edges
  (derived from relations, `INTERNAL_LINKING_GRAPH.md`).
- Retire the last home-scroll-as-navigation crops; routes stop being section anchors
  and become real destinations.
- *Effect:* where-am-I / where-from / what-next are answered on every page; the
  scroll stops being the site's spine.

### Migration invariants (do not violate during any wave)
1. **No concept loses its URL without a 301** — every alias keeps resolving.
2. **The nav may point at the best current home** for a question before the ideal
   home exists — navigation leads, content follows, nothing waits on everything.
3. **No wave rewrites `App.tsx`** — all changes are additive routes, copy/config, and
   `_redirects` lines.
4. **One concept, one home, enforced** — `graph-audit.mjs` (blueprint §15) gains a
   check: no two indexable pages share a subject.

---

## 6. What "done" looks like (the acceptance test)

The IA is coherent when a stranger can pass this test on the live site:

- **Once:** search any concept (caves, the river, history, a trip) → exactly one
  canonical page, no near-duplicate family.
- **Purpose:** name any page's job in one sentence without "and."
- **Orientation:** from any page, point to where you are (breadcrumb), where you came
  from (arrival context), and three real places you could go next.
- **Clear boundaries:** a visitor always knows whether they are on the village site,
  exploring a place, or opening the external Unlocking Bulgaria app; they never meet a
  duplicate mini-site, two consecutive promos for the same product, or a page named for
  content it does not contain.
- **Intent, not implementation:** the primary navigation answers "what is this
  place / what can I see / what happened here / how do I visit / the base," and names
  nothing after a home-page section.

When all five hold, the five competing maps have become one, Unlocking Bulgaria reads
as an independent product integrated at Aglen's places rather than a sibling site, and
the navigation expresses the region instead of the build.

---

*This review is a gate artifact. Its recommendations take effect only as ADRs against
`MASTER_ARCHITECTURE_BLUEPRINT.md` §18 and by extending `CONTENT_HIERARCHY.md`; it
proposes no visual design and no rewrite. It reflects the implementation as of
2026-07-25.*
