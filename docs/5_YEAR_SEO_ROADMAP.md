# Five-Year Roadmap

**Deliverable 10 of 10.** From a village website with good technical SEO to the
reference source for the Lukovit Karst.

Impact is scored **1–10 relative to each other**, not in absolute traffic. Effort
is wall-clock for one competent person unless stated. Everything assumes Phase 1
(technical) is deployed.

---

## Quick wins — the first two weeks

No field work, no research, no external dependency. This fortnight is worth more
than the following six months.

| # | Action | Impact | Effort | Depends on |
|---|---|---|---|---|
| Q1 | **Publish the history.** Move the four timeline chapters out of the home-page modal into `/place/aglen/history/` and `/history/<period>/` ×8, with headings, schema and internal links | **10** | 2 days | nothing |
| Q2 | **Verify GSC and Bing, submit the sitemap.** Still outstanding from the Phase-1 audit; everything downstream is unmeasurable without it | **9** | 1 h | domain access |
| Q3 | **Create `/person/trifon-kunev/`** with a `Person` node, `sameAs` Wikidata, and a `birthPlace` edge to Aglen | **8** | 4 h | nothing |
| Q4 | **Retire the eighteen thin landing pages.** 301 to the nearest real node; drop from sitemaps | **8** | 4 h | nothing |
| Q5 | **Name an author.** Byline and review-date every substantive page | **8** | decision + 1 day | a willing person |
| Q6 | **Publish the legends** as `/story/*` pages, hedged and attributed to the 1920s–30s collections | **7** | 1 day | nothing |
| Q7 | **Promote the "only Ъ village" fact** from a stats tile to a sourced, linkable statement on `/place/aglen/name/` | **6** | 2 h | nothing |
| Q8 | **Language tiering.** `bg` + `en` full; the other twelve reduced to a fixed small surface, rest `noindex` | **7** | 1 day | decision |
| Q9 | **Google Business Profile** with the corrected coordinates | **7** | 2 h | owner verification |

**Cumulative: ~8 working days.** Expected effect: roughly 30 new real pages,
~180 thin URLs removed, the site's best content addressable for the first time,
and measurement switched on.

---

## 90 days — the graph exists

| # | Action | Impact | Effort |
|---|---|---|---|
| 1 | **The driving day.** Road distances and times: Sofia→Aglen, Lukovit→Aglen, Aglen→Prohodna/Karlukovo/Iskar-Panega/Krushuna/Devetashka/Lovech. Record fuel, shops, road quality | **10** | 1 day |
| 2 | **The walking day.** GPS-fix all nine named local places; photograph each with a retained capture date | **10** | half a day |
| 3 | **`/karst/` root page** + the six cluster pages | **9** | 3 days |
| 4 | **Entity namespace** `/place/<slug>/`, built additively; migrate the five real landing pages into it | **9** | 2 weeks dev |
| 5 | **Claim ledger + `/sources/` + `/corrections/`** | **9** | 1 week dev |
| 6 | **`graph-audit.mjs`** enforcing the ten health rules and the five generation gates | **7** | 1 day |
| 7 | **Internal linking from relations**; delete `internalLinkRouteIds`; eliminate the 301-hop internal links | **8** | 3 days |
| 8 | **Real photographs** of the named places, replacing the generated-looking imagery | **8** | 2 days |
| 9 | **First OSM contributions** — waypoints, trails, cave entrances | **7** | 1 day |
| 10 | **Per-language code splitting** — the ~60% JS reduction identified in the Phase-1 audit | **4** | 1 day |

**Milestone:** ~34 entity pages live, every fact sourced, every distance real,
zero orphans, and the site's subject is finally the region.

---

## 6 months — specialisation and the first authority signals

| # | Action | Impact | Effort |
|---|---|---|---|
| 1 | **Cave access and safety facts**, obtained from the municipality and a caving club, published with sources | **9** | 2 days + calls |
| 2 | **6–10 routes with GPX**, length, ascent, surface, waymarking | **8** | 3 days |
| 3 | **Photography pages** — light hours per entity, computed from coordinates, verified on site | **7** | 3 days + visits |
| 4 | **Planner views** `/plan/*` ×9, transcluding claims | **7** | 1 week |
| 5 | **`/plan/school-trip/`** — geology + prehistory + Kunev as a field-trip syllabus | **7** | 2 days |
| 6 | **`/plan/accessibility/`** — nobody in the region publishes this | **6** | 1 day |
| 7 | **First Wikidata items**: Lukovit Karst, Iskar–Panega geopark, the documented E1 entities | **9** | 3 days |
| 8 | **Wikimedia Commons uploads**, CC-BY-SA, credited | **8** | 1 day |
| 9 | **River safety and fishing regime**, from the authority | **6** | 2 days |
| 10 | **Accommodation**: flip `SHOW_STAY`, recruit 5–10 listings, add opening hours | **7** | ongoing |
| 11 | **First resident interviews**, consented, dated, credited | **7** | ongoing |
| 12 | **First AI-citation audit** — 20 questions × 4 assistants, recorded as a baseline | **5** | 1 h |

**Milestone:** the site answers the questions encyclopaedias cannot, and its
entities have begun to exist in the commons.

---

## 12 months — the reference for the region

| # | Action | Impact | Effort |
|---|---|---|---|
| 1 | **Archive research**: name the Ottoman registers, the archaeological reports, the folklore collections. Converts strong prose into scholarship | **9** | 2 weeks + archive access |
| 2 | **Named cave inventory** for the Karlukovo district, with coordinates and access status | **9** | 1 week + register access |
| 3 | **Biodiversity cluster** — bats, raptors, relict flora, Natura 2000, with real sources | **7** | 1 week + a biologist |
| 4 | **Sourced Bulgarian Wikipedia contributions** on Aglen, the karst, Kunev's birthplace — neutral, cited, connection declared | **9** | ongoing |
| 5 | **Institutional relationships**: municipality, geopark, regional museum, НИНКН | **8** | ongoing |
| 6 | **Twelve month pages**, from a full year of seasonal observation | **6** | 4 days |
| 7 | **Expert review** of geology and archaeology, credited by name | **8** | ongoing |
| 8 | **Second and third languages promoted to knowledge tier** — whichever GSC shows real demand for, with human review | **5** | per language |
| 9 | **Recurring events published as `EventSeries`**; Discover candidacy for the fair and the contest | **5** | 2 days |
| 10 | **Caving and hiking community outreach** | **6** | ongoing |

**Milestone:** every 🔶 in these documents is 🟢 or honestly 🔴. The site is
cited by institutions and by assistants.

---

## 24 months — compounding

| Initiative | Impact |
|---|---|
| **Full claim coverage** — 300+ sourced claims; every page carries provenance | 9 |
| **The regional archive** — the site holds material that exists nowhere else: interviews, photographs across seasons and years, archive transcriptions, the oral tradition recorded from named informants | **10** |
| **Second author / contributor network** — residents, a historian, a caver, a biologist | 8 |
| **Wikidata items for every documented entity**, each citing the site | 9 |
| **Complete OSM coverage** of the karst's trails, caves and viewpoints | 8 |
| **Academic contact** — one citation in a paper is worth a hundred directory links | 7 |
| **Longitudinal photography** — the same viewpoints, same date, several years. Nobody can replicate it retroactively | 7 |
| **Structured data for events, routes and species** at full fidelity | 6 |
| **Directory maturity** — 40+ verified listings with hours, an actual commercial engine | 7 |
| **Regional press and literary-society coverage** via the Kunev connection | 6 |

**Milestone:** the site is the source others cite, including Wikipedia.

---

## Five-year vision

By 2031 the objective is a position, not a ranking:

1. **The Lukovit Karst is a recognised entity** in Wikidata, Wikipedia,
   OpenStreetMap and Google's Knowledge Graph — and the site is the reference
   behind it. **Today that entity does not exist anywhere.** It is the single
   most consequential thing on this roadmap: creating a real, sourced, accepted
   entity for a geographic region is permanent, and it is available to whoever
   does the work first.
2. **Every named place in the region has coordinates, a photograph, a description
   and a source** — roughly 60 entities, most of which currently exist only in
   the memory of people who live there.
3. **An assistant asked about caves, karst or weekend trips in northern Bulgaria
   quotes this site by name**, because it is the only source that is specific,
   dated, sourced and honest about its unknowns.
4. **The oral tradition is recorded** from named informants, before the people
   who hold it are gone. This is the part with a real deadline.
5. **The village has a functioning tourism economy** — the directory, the events
   and the accommodation converting the visibility into visits.
6. **The site is maintained by more than one person**, with an editorial process
   that survives any one of them leaving.

---

## Relative impact, all initiatives ranked

| Rank | Initiative | Impact | Effort | When |
|---|---|---|---|---|
| 1 | Publish the existing history | 10 | 2 d | now |
| 2 | The driving day (road distances) | 10 | 1 d | 90 d |
| 3 | The walking day (coordinates + photographs) | 10 | 0.5 d | 90 d |
| 4 | Create the Lukovit Karst entity in the commons | 10 | 3 d | 6 mo |
| 5 | The regional archive (interviews, longitudinal record) | 10 | years | ongoing |
| 6 | `/karst/` root and cluster pages | 9 | 3 d | 90 d |
| 7 | Entity namespace | 9 | 2 wk | 90 d |
| 8 | Claim ledger and `/sources/` | 9 | 1 wk | 90 d |
| 9 | Archive research and citations | 9 | 2 wk | 12 mo |
| 10 | Wikidata + Wikipedia contributions | 9 | ongoing | 6–12 mo |
| 11 | Cave access and safety facts | 9 | 2 d | 6 mo |
| 12 | GSC and Bing verification | 9 | 1 h | now |
| 13 | Named cave inventory | 9 | 1 wk | 12 mo |
| 14 | A named author | 8 | decision | now |
| 15 | Kunev page | 8 | 4 h | now |
| 16 | Retire the thin pages | 8 | 4 h | now |
| 17 | Real photographs | 8 | 2 d | 90 d |
| 18 | Relation-derived internal linking | 8 | 3 d | 90 d |
| 19 | Institutional relationships | 8 | ongoing | 12 mo |
| 20 | Expert review | 8 | ongoing | 12 mo |
| 21 | GPX routes | 8 | 3 d | 6 mo |
| 22 | OSM and Commons contributions | 8 | 2 d | 6 mo |
| 23 | Language tiering | 7 | 1 d | now |
| 24 | Legends as pages | 7 | 1 d | now |
| 25 | Planner views | 7 | 1 wk | 6 mo |
| 26 | Accommodation listings | 7 | ongoing | 6 mo |
| 27 | Resident interviews | 7 | ongoing | 6 mo |
| 28 | School-trip page | 7 | 2 d | 6 mo |
| 29 | Photography pages | 7 | 3 d | 6 mo |
| 30 | Google Business Profile | 7 | 2 h | now |
| 31 | Biodiversity cluster | 7 | 1 wk | 12 mo |
| 32 | `graph-audit.mjs` | 7 | 1 d | 90 d |
| 33 | Accessibility page | 6 | 1 d | 6 mo |
| 34 | Month pages | 6 | 4 d | 12 mo |
| 35 | Per-language code splitting | 4 | 1 d | 90 d |

---

## Risks

| Risk | Likelihood | Consequence | Mitigation |
|---|---|---|---|
| **The field work never happens** | **High** | The entire architecture is gated on one driving day and one walking day. Without them the site remains structurally excellent and factually empty | Do them in the first month, before anything else with a dependency. They are two days |
| **No one will be named as author** | Medium | E-E-A-T capped permanently | Even a first name and a role beats an organisation. Revisit until resolved |
| **Retiring 18 pages loses traffic** | Low | The pages are near-duplicates with negligible standing | 301 rather than delete; monitor 60 days; reversible |
| **The region-first inversion confuses returning visitors** | Low–Medium | Brand dilution | Aglen keeps the domain, header, footer and `Organization` node. Test the nav change; the fallback in `CONTENT_HIERARCHY.md` §6 costs 20% of the effect |
| **Wikipedia contributions read as promotional** | Medium | Reputational damage, reverted edits | Declare the connection, cite everything, contribute facts not links, never link the site from an article you edit |
| **Oral informants die before being recorded** | **High and irreversible** | The site's most unique asset is lost permanently | Start interviews in month 1, not month 6. This is the only item on the roadmap with a real deadline |
| **Effort goes to volume instead of depth** | Medium | Repeats the `landingPages.ts` failure at greater scale | The five generation gates, enforced in the build |
| **Cave access advice is wrong** | Low | **Someone gets hurt** | Never publish access without an authoritative source. The current refusal to guess is correct and must survive the pressure to fill the page |

---

## The one-paragraph version

The technical foundation is done and does not need more work. The site's problem
is that its subject is a village rather than a region, that its best content —
four thousand words on Ottoman registers, prehistoric flint workshops and a
national writer born in the village — has no URL, and that nobody has yet walked
the ground with a GPS and a camera. Fixing the first is an architecture change,
the second is two days of publication, and the third is two days of field work.
Do those three things and the site is competitive within a quarter. Then spend
five years recording what only this project is positioned to record, and
contributing it to the commons until the region's entities cite it by name.
