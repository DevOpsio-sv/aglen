# Entity Priority Matrix

**Deliverable 7 of 10.** Every entity ranked, with the reasoning made explicit
and falsifiable.

---

## 0. Scoring model

Six criteria, each 1–5. Weights reflect what actually moves a regional knowledge
site, not what is easiest to measure.

| Criterion | Weight | Definition |
|---|---|---|
| **SD — Search demand** | ×2 | Estimated query volume for the entity across bg + en. Estimated, not measured — the site has no GSC history yet, so every SD score is a hypothesis to be replaced with data within 90 days |
| **AU — Authority potential** | ×3 | How likely this site is to become *the* reference for it. Inversely related to how well-covered it already is |
| **AI — AI citation potential** | ×3 | Would an assistant answering a question quote this page? Requires specificity, sourcing and completeness |
| **UQ — Uniqueness** | ×2 | Does it exist anywhere else in structured form |
| **TV — Tourism value** | ×2 | Does it convert into a visit, a booking, a contact |
| **HS — Historical/scientific significance** | ×1 | Intrinsic importance independent of traffic |

**Score = 2·SD + 3·AU + 3·AI + 2·UQ + 2·TV + HS.** Range 13–65.

Priority bands: **P1 ≥ 48** · **P2 40–47** · **P3 30–39** · **P4 < 30**.

The two ×3 weights are the design decision worth defending. Search demand is
weighted lowest of the three because demand for an entity this site cannot win
(Prohodna) is worth less than demand it can own (Дупката, the Aglen history).
Authority and citation potential are weighted highest because they compound and
demand does not.

---

## 1. Priority 1 — build first

| # | Entity | SD | AU | AI | UQ | TV | HS | Score | Why |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **История на Ъглен** (4 chapters) | 2 | 5 | 5 | 5 | 2 | 5 | **59** | The text is written and unpublished. Ottoman registers, flint workshops, Tribali sanctuaries, etymology — material of genuine scholarly interest that exists in no other online source. Zero writing cost, maximum uniqueness. **Nothing else on this list has a better effort-to-value ratio** |
| 2 | **Лукoвитски карст** (root) | 3 | 5 | 5 | 4 | 3 | 4 | **58** | The subject of the site has no page. Every other entity hangs from it. No Wikidata item exists — creating one makes the site the reference by construction |
| 3 | **Трифон Кунев** | 3 | 4 | 5 | 3 | 2 | 5 | **53** | A Wikidata-known national literary figure born in the village. The strongest available edge from an E1 place into the existing knowledge graph. Currently one paragraph in a modal |
| 4 | **Ъглен** (Q550547) | 3 | 5 | 4 | 3 | 4 | 3 | **53** | The base. Only settlement in Bulgaria starting with "Ъ" — a genuinely memorable, genuinely unique, endlessly citable fact that the site mentions once, in a stats block |
| 5 | **Проходна** (Q3657889) | 5 | 2 | 4 | 1 | 5 | 4 | **50** | The region's demand magnet. The site will never beat Wikipedia on description — it can win on access, light, safety and combination, which Wikipedia does not carry. Entry point for journey J2 |
| 6 | **Въловата дупка / Очилатата** | 1 | 5 | 5 | 5 | 2 | 4 | **50** | A named cave tied to a documented historical tragedy, appearing in no external source. The purest example of an entity this site can originate |
| 7 | **Дупката** (rock arch) | 2 | 5 | 4 | 5 | 4 | 2 | **50** | The most photogenic proprietary entity. Needs a GPS fix and a dated photograph and then it exists in the world's graph |
| 8 | **Река Вит при Ъглен** | 3 | 4 | 4 | 4 | 4 | 3 | **49** | The river is E4; *this reach of it* is E1. Modelling the reach rather than the river is what makes the page ownable |
| 9 | **Карлуково** (Q1085214) | 4 | 3 | 4 | 2 | 4 | 3 | **47→P1** | 1.4 km from Prohodna; the cave district's centre. Rounds up: it is the bridge between the demand entity and the site's territory |
| 10 | **Луковит** (Q405585) | 4 | 3 | 4 | 2 | 4 | 2 | **45→P1** | The municipal gateway and the one landing page with real content already ✅. Rounds up on readiness |
| 11 | **Пътни разстояния** (the distance matrix) | 5 | 4 | 5 | 4 | 5 | 1 | **57** | Not a place but treated as an entity because it is a dataset that unblocks eight pages and three journeys. One day of driving. **Highest ROI item in the entire programme** |
| 12 | **Искър–Панега геопарк** | 4 | 4 | 4 | 3 | 5 | 2 | **48** | High tourism value, no Wikidata item, no authoritative online page. Genuinely winnable |

### Why these twelve and not others

They divide into three groups doing three different jobs:

- **Already written, not published** (1, 3): pure publication cost. Do in week 1.
- **The graph's load-bearing nodes** (2, 4, 8, 9, 10, 12): without these there is
  no structure for anything else to attach to.
- **The originate-and-connect pairs** (5↔6, 5↔7): an E5 demand entity linked by a
  real geological relation to an E1 entity only this site can document. This is
  the mechanism, and it needs both ends built simultaneously to work at all.

---

## 2. Priority 2 — build second

| Entity | Score | Note |
|---|---|---|
| Кремъчни работилници (flint workshops) | 46 | Reframes the region from scenic to *industrially significant in prehistory*. Enormous AI-citation value; needs an archaeological citation |
| Селището / Старо село | 45 | The abandoned predecessor settlement. Explains the whole settlement pattern |
| Калето | 44 | Archaeology + viewpoint + the only fortification node |
| Деветашка пещера (Q2756370) | 44 | Real demand, 46.5 km away. Anchor value; the site should be honest that it is a neighbour, not a host |
| Крушунски водопади (Q6439432) | 43 | Highest-visited attraction in the province at 58.4 km. Include for the graph, don't pretend proximity |
| Темната дупка | 43 | If the Bulgarian-speleology-home claim verifies, this becomes P1 |
| Двукраките сенки (legend) | 42 | Oral memory that plausibly encodes Palaeolithic behaviour. Extraordinary if handled with proper hedging; embarrassing if overclaimed |
| Златната браздичка (legend) | 41 | Same class |
| Св. Архангел Михаил (1888) | 41 | Dated, documented, tied to the raids. The most *verifiable* proprietary entity |
| Рачков вир | 41 | High visit intent, blocked on swimming-safety verification |
| Слончето | 40 | Photogenic, needs GPS |
| Панаир на Ъглен (EventSeries) | 40 | Recurring, dated, photographed ✅ — the site's only Discover-eligible content |
| `/karst/geology/` | 45 | The strata content deserves its own page; U3 researchers are the highest-citation audience |
| Пътища и достъп per entity | 44 | Access facts; safety-critical for caves |
| Маршрути с GPX | 43 | Link-earning; blocked on one day of walking |

---

## 3. Priority 3 — build when the data arrives

Червена стена (38) · Златна Панега village + spring (37) · Ловеч (36 — real
demand, 33 km, genuinely someone else's subject) · Община Луковит (35) · the
other karst caves once verified (32–38 each) · Иглените скали / etymology (36,
folds into `/place/aglen/name/`) · Лазаруване and the calendar customs (34) ·
biodiversity entities (30–38, blocked on sources) · Област Ловеч (32) · the
remaining villages of the municipality (30–34, one paragraph each, not pages) ·
seasonal month pages (33, blocked on a year of observation) · Карлуковски
манастир (35 if verified).

---

## 4. Priority 4 — index only, do not build pages

Generic tourism-category labels (cultural/eco/rural/adventure/slow tourism) — 18
to 24. **These are the eighteen landing pages recommended for retirement.** They
score low on every criterion simultaneously, which is the signature of a keyword
rather than a subject.

Also here: distant destinations included for completeness only (Плевен, Тетевен,
Велико Търново) — link out, never host; and "Bulgaria"-level topics, which this
site has no standing to own.

---

## 5. The matrix as a picture

```
        HIGH AUTHORITY POTENTIAL
                  │
   Дупката ●      │      ● История на Ъглен
   Въловата ●     │   ● Луковитски карст
   Селището ●     │   ● Трифон Кунев
   Двукраките ●   │      ● Ъглен
  ────────────────┼──────────────────────────  HIGH SEARCH DEMAND
   Иглените ○     │   ● Искър–Панега
   Червена стена ○│      ● Карлуково  ● Луковит
                  │         ● Проходна
                  │      ● Деветашка  ● Крушуна
                  │   ○ eco/rural/slow tourism labels
        LOW AUTHORITY POTENTIAL
```

Four quadrants, four strategies:

- **Top-left (high authority, low demand)** — *originate*. Build the page, create
  the Wikidata item, contribute the OSM node, upload the Commons photograph.
  Demand follows existence, slowly, and the position is permanent.
- **Top-right (high both)** — *own*. This is where the site's identity lives.
  Everything in §1 groups 1 and 2.
- **Bottom-right (high demand, low authority)** — *connect and be useful*. Do not
  compete on description. Compete on access, light, safety, combination — the
  facts encyclopaedias never carry.
- **Bottom-left** — *delete*. The eighteen retirements.

The strategic move the whole architecture encodes is the diagonal: **route
readers from bottom-right (Prohodna) to top-left (Дупката) along a true
geological relation.** Demand enters where it exists; authority accumulates where
it can be owned.

---

## 6. Falsification — what would prove this ranking wrong

A priority matrix with no failure condition is decoration. Within 90 days of
Search Console data, revisit against these:

1. **If `/place/aglen/history/` gets < 50 impressions/month after 90 days**, then
   demand for local history is lower than assumed and items 1 and 3 should be
   re-weighted — though their AI-citation value would still stand, and that is
   measurable separately by asking the assistants directly.
2. **If Prohodna queries never surface this site above position 50**, the
   "compete on access and light" thesis for E5 entities fails, and effort should
   move entirely to the top-left quadrant.
3. **If the distance matrix does not lift `/plan/*` impressions within 60 days**
   of publication, the travel-planning intent family is served well enough
   elsewhere and P1 item 11 was overrated.
4. **If E1 entity pages attract zero external links in 12 months**, the
   originate strategy is not self-sustaining and needs an active outreach
   component (regional press, caving clubs, Wikipedia contribution) rather than
   relying on discovery.
5. **If AI assistants cite the site for the karst but not for Aglen**, the
   region-first inversion worked and should be pushed further — up to and
   including making `/karst/` the actual home page.

Each of these is checkable, and each has a different remedy. That is the point
of writing them down before the data arrives rather than after.
