# Topical Authority Map — the Lukovit Karst

**Deliverable 1 of 10.** Status: architecture proposal, not implemented.
Companion documents: `KNOWLEDGE_GRAPH.md`, `CONTENT_HIERARCHY.md`,
`SEARCH_INTENT_MAP.md`, `PROGRAMMATIC_SEO_PLAN.md`, `INTERNAL_LINKING_GRAPH.md`,
`ENTITY_PRIORITY_MATRIX.md`, `CONTENT_GAP_ANALYSIS.md`, `EEAT_STRATEGY.md`,
`5_YEAR_SEO_ROADMAP.md`.

---

## 0. The thesis, stated once

The site currently models **a village that happens to sit near a karst region**.
Every URL is phrased as a relation to Aglen: *nature around Aglen*, *hidden places
near Aglen*, *Karlukovo travel guide* (on an Aglen domain), *Aglen from Sofia*.

That is not how the world is shaped, and Google models the world. In the real
hierarchy Aglen is a **sibling** of Karlukovo inside the Lukovit karst, not a
parent of it. A knowledge graph that inverts a real containment relation cannot
be recognised as authoritative, no matter how well it is marked up.

The correction is one sentence:

> **The brand is Aglen. The subject is the Lukovit Karst.**

Aglen stays the narrator, the base, the voice and the domain. It stops being the
root node.

This is not a demotion. It is the only move that makes the site *eligible* for
the topics that carry demand — Проходна, Карлуково, Искър–Панега, Деветашка,
Крушуна — because it stops asking Google to believe a village of a few hundred
people contains them.

### The second thesis: originate, then connect

Two kinds of entity live in this region, and the site should treat them
completely differently.

**Entities Google already knows** (Prohodna, Lovech, the Vit, Devetashka,
Krushuna) carry search demand and carry *nothing else* — there are already
hundreds of pages about them and this site will never be the best one. Their job
here is to be **anchors**: correctly identified, correctly connected, `sameAs`
Wikidata, and honestly thin.

**Entities that exist only in local memory** — Дупката, Слончето, Червена стена,
Рачков вир, Калето, Селището, Въловата дупка/Очилатата, "Двукраките сенки",
"Златната браздичка", the Иглен etymology dispute — carry no search demand today
and carry **everything else**. Nobody else will ever document them. For these the
site is not competing to be the best source; it is competing to be the **only**
source, which is the same thing as being the canonical source.

Authority flows along the edges between the two sets. A page that says *"Дупката
is a natural limestone arch above the Vit, 9 km from Prohodna, in the same
Lower-Cretaceous formation"* borrows Prohodna's entity confidence and spends it
establishing a new node. Do that forty times and the site stops being a page
about a village and becomes the place where the region is described.

Everything below is the inventory of what has to be modelled for that to work.

---

## 1. How this map is organised

Five domains, twenty-two clusters. The domain split is deliberately the shape of
a Wikipedia place article (Geography → History → Culture → Visiting), because
that shape is over-represented in the training data of every model this site
needs to be legible to.

| Domain | Question it answers | Clusters |
|---|---|---|
| **A. LAND** | What is physically here and why | A1–A5 |
| **B. TIME** | What happened here, in order | B1–B5 |
| **C. PEOPLE** | Who made it mean something | C1–C5 |
| **D. VISIT** | How a person meets it | D1–D5 |
| **E. METHOD** | How we know, and what we don't | E1–E2 |

### Verification legend

Used throughout every document in this set. The site's existing discipline —
`guides.ts` refuses to publish unverified distances — is formalised here into a
status every fact and entity carries.

| Mark | Meaning |
|---|---|
| ✅ | Present in this repository, already asserted publicly |
| 🟢 | Externally verifiable now (Wikidata / Wikipedia / official register) |
| 🔶 | Believed true from general knowledge — **must be sourced before publishing** |
| ⬜ | Unknown; requires field work, an archive visit, or an interview |
| 🔴 | Known gap where the site currently publishes nothing and should say so |

Nothing marked 🔶 may reach the public site without a citation. That rule is the
product.

---

## A. LAND

### A1 — The karst system (the root subject)

| Topic | Status | Note |
|---|---|---|
| Лукoвитски карст / Lukovit Karst — extent, boundaries, definition | 🔶 | The root entity of the whole site. Needs a sourced definition of its extent. No Wikidata item exists → **create one** (see roadmap) |
| Position within Предбалкан (Fore-Balkan) and the Danubian Plain margin | 🔶 | |
| Ломешка и Априлска свита — Lower Cretaceous limestones | ✅ | Asserted in `locales/bg.ts` timeline. Needs a geological citation |
| Karst hydrology: понори, sinking streams, siphons, dry galleries | ✅ | "не са напълно картирани от спелеолозите" — an honest unknown, keep it |
| Surface karst forms: кари, въртопи/dolines, dry valleys | 🔶 | |
| Tectonic control: the Vit meanders following faults | ✅ | |
| Canyon microclimate — up to ~100 m walls, thermal inversion | ✅ | Strong, distinctive, currently buried in a timeline modal |
| Relict vegetation and karst biocenoses studied from early C20 | ✅ | Needs the actual botanical references |
| Speleogenesis — how these caves formed, in plain language | ⬜ | Nobody in the region explains this well. High authority value |
| Bigor / travertine formation (Krushuna) | 🔶 | Connects Krushuna to the same system |
| Comparison: Lukovit karst vs. Devetaki plateau vs. Iskar gorge | ⬜ | The kind of synthesis only an authority publishes |

### A2 — Caves and the underground

| Entity | Status | Note |
|---|---|---|
| **Проходна** (Q3657889) — Очите на Бога | 🟢✅ | Anchor entity. Largest karst arch in Bulgaria 🔶; dimensions 🔶 |
| **Темната дупка**, Karlukovo | 🔶 | Historic seat of Bulgarian speleology 🔶. Verify before claiming |
| **Деветашка пещера** (Q2756370) | 🟢✅ | Anchor. Bats, Natura 2000, film location 🔶 |
| **Въловата дупка / Очилатата** | ✅ | **Aglen-proprietary.** Named in `bg.ts` as the site of an Ottoman-era tragedy. Exists in no external source. Highest-value E1 entity on the site |
| Karlukovo cave district — count and names | 🔶 | Repo says "десетки пещери". A named, sourced inventory is a top-5 asset |
| Свирчовица, Банковица, Хайдушката дупка, Ученическа | 🔶 | Named from general knowledge. Verify every one |
| Caves as prehistoric shelters — chalcolithic / EBA sherds | ✅ | |
| Bat colonies, hibernation, disturbance ethics | ⬜🔴 | A responsibility page nobody in the region has written |
| Cave access, permits, guiding, equipment | ⬜🔴 | `guides.ts` correctly refuses to guess. Publishing the *verified* answer is the single biggest unlock for the caves cluster |
| Bulgarian caving school / Karlukovo home of speleology | 🔶 | If true and sourced, a whole cluster |
| Bungee jumping at Prohodna | 🔶 | Real search demand, currently unaddressed |

### A3 — Rock formations and the surface

| Entity | Status | Note |
|---|---|---|
| **Дупката** — natural arch above the Vit | ✅ | E1. Site can be canonical |
| **Слончето** — rock figure | ✅ | E1 |
| **Червена стена** — canyon viewpoint | ✅ | E1 |
| **Калето** — archaeological locality on a hill | ✅ | E1, bridges LAND and TIME |
| "Иглените скали" — the rock needles behind the name theory | ✅ | E1, bridges LAND and PEOPLE |
| Karlukovo rock cirques and cliffs | 🔶 | |
| Rock windows / natural bridges of the region as a class | ⬜ | A comparative page: every arch in the karst, one table. Nobody has it |
| Climbing routes and their status | ⬜ | |

### A4 — Water

| Entity | Status | Note |
|---|---|---|
| **Река Вит** (Q1773449) | 🟢✅ | Linear entity. Source → Danube; the Aglen reach is the site's territory |
| **Река Искър** and the Iskar gorge at Karlukovo | 🟢🔶 | |
| **Река Златна Панега** and its karst spring source | 🟢✅ | |
| **Геопарк Искър–Панега** | ✅ | Anchor, no Wikidata item found → candidate to create |
| **Рачков вир** — named river pool at Aglen | ✅ | E1 |
| Karst springs as a class; historic "healing spring" veneration | ✅ | |
| **Крушунски водопади** (Q6439432) — travertine cascade | 🟢✅ | Anchor |
| River regime, floods, seasonal levels | ⬜🔴 | Determines when half this site's content is usable |
| Water quality, swimming safety | ⬜🔴 | Explicitly unpublished today. Correct until sourced |
| Fishing regime, licences, closed season | ⬜🔴 | Same |

### A5 — Living systems

| Topic | Status | Note |
|---|---|---|
| Natura 2000 designations covering the karst | 🔶 | Karlukovo zone believed designated. Verify code and boundaries |
| Bats — species, roosts, protection status | 🔶 | |
| Cliff-nesting raptors | 🔶 | |
| Relict and endemic flora of the canyon | ✅🔶 | Asserted generally in `bg.ts`; needs species |
| Herbs and traditional plant knowledge | ✅ | Exists as an "experience"; is really an ethnobotany topic |
| River fauna of the Vit | ⬜ | |
| Seasonal ecology — what is visible, month by month | ⬜ | Feeds the strongest programmatic template in the plan |
| Invertebrate / troglobitic cave fauna | ⬜ | Extremely citable if ever obtained |

---

## B. TIME

### B1 — Deep time
Geological formation of the limestones · uplift and canyon incision · the Vit's
capture of the fault line · cave formation phases. Status ✅🔶, all sourced from
one paragraph in `bg.ts` that deserves a page.

### B2 — Prehistory
Late Neolithic **flint workshops on the terraces** ✅ — the single most
under-used fact on this site; it makes the area an *industrial* centre of early
prehistory, not a scenic one · Chalcolithic and Early Bronze Age sherds in the
caves ✅ · caves as seasonal hunter shelters ✅ · the transition to copper ✅ ·
the "river corridor" thesis linking the Danubian plain to the Balkan passes ✅.

### B3 — Antiquity
**Трибали** — Thracian tribe of the region ✅ · open-air rock sanctuaries on
inaccessible terraces ✅ · cults of water, rock and the underworld ✅ · Roman
Moesia, road security, use of the river terraces ✅ · Калето as a control point 🔶.

### B4 — The written past
Ottoman **Никополски санджак** tax registers, C15–C16 ✅ — the earliest secure
written attestation of Aglen · timar holdings ✅ · taxation in kind: grain,
livestock, beekeeping ✅ · the Кърджалии period and settlement retreat to the
caves ✅ · **Селището / Старо село** — the abandoned earlier settlement ✅ (E1
entity) · the C19 descent to the river terraces ✅ · caravan-route function of the
village, natural rock shelters used as caravan protection ✅ · church **Св.
Архангел Михаил, 1888**, built in memory of villagers killed in Ottoman raids ✅ ·
the Въловата дупка tragedy ✅ · post-1944 and the labour camps (via Kunev) ✅ ·
depopulation and the present ⬜.

### B5 — Events as entities
Панаир на Ъглен, 28 August ✅ (recurring, `Event` schema already supported) ·
Детски фотографски конкурс ✅ · Лазаруване ✅ · horse race ✅ · the ritual bread
welcome ✅ · calendar customs across the year ⬜.

---

## C. PEOPLE

### C1 — Persons

| Person | Status | Note |
|---|---|---|
| **Трифон Кунев** (1880–1954), writer, publicist, born in Aglen | ✅🟢 | **The site's most valuable unexploited entity.** Has Wikidata and Bulgarian Wikipedia coverage. Currently a paragraph inside a timeline modal. Deserves a `Person` page, a `birthPlace` edge to Aglen, and a `sameAs` — this is the strongest single authority edge available |
| The teachers and краеведи who collected the folklore in the 1920s–30s | ✅ | Named sources would convert oral tradition into citable ethnography |
| Speleologists who mapped the Karlukovo caves | 🔶 | |
| Living residents who hold the knowledge | ⬜ | Named, consenting interviewees are the EEAT engine (see `EEAT_STRATEGY.md`) |
| The site's own named author | 🔴 | Does not exist. Everything is attributed to an organisation |

### C2 — Oral tradition (each legend is an entity)
"Очите на Бога" ✅ · **"Двукраките сенки"** ✅ — the silent cave people who lit
smokeless fires; an oral memory that describes Palaeolithic behaviour with
uncomfortable accuracy · **"Златната браздичка"** ✅ — the first furrow at the
river's sharpest bend, "kissed by the lords of the underworld" · "Иглен град
голяма" ✅ · the charcoal-burning etymology ✅ · "Пазителят" ✅ (the AR quest
character — a *modern* creation and must be labelled as one, never mixed with
collected folklore).

### C3 — Settlements

| Entity | Status |
|---|---|
| **Ъглен** (Q550547) — the only settlement in Bulgaria beginning with "Ъ" ✅ | 🟢 |
| **Луковит** (Q405585) — municipal centre | 🟢 |
| **Карлуково** (Q1085214) | 🟢 |
| **Златна Панега** (Q2455820) | 🟢 |
| **Ловеч** (Q189328) | 🟢 |
| Румянцево, Дерманци, Тодоричене, Бежаново, Петревене, Беленци, Дъбен, Торос, Пещерна and the rest of Lukovit municipality | 🔶 | Names from general knowledge — verify against the official register. Each is a legitimate node; most need one paragraph, not a page |
| Деветаки, Крушуна (Letnitsa municipality) | 🔶 |
| Ябланица | 🔶 |

### C4 — Living culture
Village fair and its programme ✅ · folk song and dance ✅ · Lazaruvane ✅ ·
horse racing ✅ · ritual breads ✅ · crafts ✅ (`crafts` category already in the
directory) · food traditions and local products ✅ · the depopulation question ⬜.

### C5 — Economy and the directory
Categories already modelled in `locales/types.ts`: `food` · `shops` ·
`producers` · `stay` · `crafts` · `services` · `farming` · `other` ✅.
Accommodation sub-types needed: къща за гости, хотел, къмпинг, места за
палатки, glamping ⬜ (only `stay` exists today, and `SHOW_STAY` is off).
Missing categories the region actually has: guides, transport, rentals
(kayak/bike), producers with farm-gate sales ⬜.

---

## D. VISIT

### D1 — Movement and access
Sofia → Lukovit → Aglen 🔴 (**no verified distance or drive time anywhere on the
site**) · Pleven and Lovech approaches ⬜ · public transport, bus lines,
Karlukovo railway station 🔶 · parking at each trailhead ⬜ · road quality ⬜ ·
which places need a car ⬜.

### D2 — Routes and trails
The village walking sequence ✅ (`mapStops`) · the Iskar–Panega eco trail ✅ ·
canyon walk ✅ · photo tour ✅ · trail waymarking, surface, gradient, GPX ⬜🔴 ·
**no route on this site has a GPX file, a length or an elevation profile** —
this is the largest single content gap in the VISIT domain.

### D3 — Time and season
Best time per place ✅ (generic) · month-by-month ⬜ · light and photography
hours ✅ (genuinely good in the beautiful-places guide) · water level and
swimming season ⬜ · winter access ✅ (partial) · festival calendar ✅.

### D4 — Audience
Families ✅ · photographers ✅ · school groups ✅ · researchers and geologists ⬜ ·
cavers ⬜ · cyclists ⬜ · birdwatchers ⬜ · campers ✅ · foreign vs Bulgarian
visitors ✅ (14 languages, see the language-tier recommendation) · accessibility
and mobility ⬜🔴.

### D5 — Practicalities
Stay ✅ (flag off) · food ✅ · shops and supplies ⬜ · water and refill points ⬜ ·
phone signal ⬜ · **safety**: unfenced cliff edges ✅ (published, correctly),
caves ✅, river ✅, ticks and snakes ⬜, emergency numbers and the nearest medical
help ⬜🔴 · what is private property and how to behave ✅.

---

## E. METHOD

### E1 — Provenance
Where each *kind* of fact comes from ✅ (`trustPages.ts` already does this well) ·
per-claim sourcing 🔴 (does not exist — see `EEAT_STRATEGY.md`) · field
verification log 🔴 · correction history 🔴 · what is deliberately not published ✅.

### E2 — Machine legibility
Crawler and citation policy ✅ · `llms.txt` ✅ · structured data ✅ (strong after
Phase 1) · an addressable claim layer 🔴 · licensing of text and images for reuse
and citation 🔴.

---

## 2. Cluster summary and where the site stands

| Cluster | Entities | Covered today | Real gap |
|---|---|---|---|
| A1 Karst system | 11 | 2, inside a modal | **Root subject has no page** |
| A2 Caves | 12 | 1 unfinished guide | Access facts; named inventory |
| A3 Rock forms | 8 | 4 as cards | No entity pages |
| A4 Water | 10 | 1 unfinished guide | Safety, regime, fishing |
| A5 Life | 8 | 0 | Whole cluster absent |
| B1–B4 History | 30+ | Excellent text, 1 modal | Not addressable, not linkable, invisible to search |
| B5 Events | 6 | 2 published | Recurring calendar |
| C1 Persons | 5 | 1 paragraph | **Kunev has no page** |
| C2 Legends | 6 | 3 in prose | No entity pages |
| C3 Settlements | 15+ | 5 in `region.ts` | No pages of their own |
| C4 Culture | 8 | Photos + fair | |
| C5 Economy | 8 categories, 13 listings | Good | Best-executed part of the site |
| D1 Access | 6 | 0 verified | **Highest-value hour of work on the project** |
| D2 Routes | 5 | 1 stop list | No GPX, no lengths |
| D3 Season | 5 | Generic prose | |
| D4 Audience | 9 | Templated pages | 25 thin pages pretending to cover this |
| D5 Practical | 9 | Safety good | Emergency info missing |
| E1–E2 Method | 10 | Strong | No claim layer |

**Total distinct entities identified: ~170.**
**Entities with a page of their own today: 0** — the site has 27 keyword pages, 6
guides, 13 business listings and 1 home page, and not one URL whose subject is a
real-world entity.

That sentence is the finding.

---

## 3. What this map implies for the existing site

Three consequences, each unwelcome, each correct.

**3.1 `landingPages.ts` should be dissolved, not improved.** 27 pages × 14
languages = 378 URLs built from a keyword list, 25 of which share three
identical section bodies. Five of them are real subjects wearing keyword clothes
(`lukovitGuide`, `karlukovoGuide`, `krushunaGuide`, `devetashkaCaveGuide`,
`iskarPanegaGuide`) and become **entity pages**. Four are legitimate intent
views (`weekendInAglen`, `familyTrip`, `aglenFromSofia`, `bestTime`) and become
**planner views** once real data exists to fill them. The remaining eighteen have
no referent and should 301 into the entity or view that covers them.

**3.2 The history content is the site's best asset and is architecturally
invisible.** Four thousand words of genuinely rare material — Ottoman registers,
flint workshops, Tribali sanctuaries, the Kunev connection — sit inside a
JavaScript object rendered into a modal on the home page. It has no URL, no
heading structure, no schema, no citation target. An LLM crawling this site
cannot retrieve it as an answer to "who was born in Ъглен" because there is
nothing to retrieve. **Publishing this material as addressable pages is the
highest-value single action available and requires no new writing.**

**3.3 Fourteen languages is a dilution strategy for a knowledge site.** The
locale files are 469 KB and every visitor downloads all of them. More
importantly, a machine-shaped Japanese paraphrase of a paragraph about the
Никополски санджак adds no knowledge and 13 near-duplicate claims to the graph.
Recommendation: a **two-tier language policy** — `bg` + `en` carry the full
knowledge layer; the other twelve carry a fixed, small surface (home, how to get
here, what to see, contact, safety) and `noindex` everything else until a human
speaker reviews it. This reduces the URL count from ~590 to ~200 real ones and
raises the average page quality by roughly the factor you would expect. It is
also reversible per language, one at a time, as translations become real.

---

## 4. Naming discipline for everything downstream

Adopted for all ten documents and proposed for the codebase:

- **Entity** — a thing that exists in the world independently of this website.
  Gets a URL, a schema node, a stable id, and lives forever.
- **View** — a composition over entities shaped by an intent. Gets a URL only if
  it composes entities that are not composed elsewhere.
- **Claim** — one atomic factual statement with a source, a date and a
  confidence. The unit of trust.
- **Surface** — a rendering of entities/claims for a given language and device.
  Never a source of truth.

The current codebase has surfaces and views but no entities and no claims. That
is the architectural problem, stated in four words.
