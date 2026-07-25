# Content Gap Analysis

**Deliverable 8 of 10.** Current site vs. the authority site, gap by gap, with
effort and expected return.

---

## 0. Method

Each gap is scored on:

- **SEO** — effect on classical search visibility (1–5)
- **AI** — effect on being retrieved and cited by assistants (1–5)
- **Diff** — difficulty (1 trivial → 5 requires expertise or access the project
  does not have)
- **Time** — realistic wall-clock for one competent person
- **ROI** = (SEO + AI) ÷ Diff

Blockers are named explicitly. Roughly half the gaps below are blocked on
**field work, not writing**, which is the most important finding in this
document: this project's constraint is not content production capacity. It is
that nobody has walked the ground with a GPS, a camera and a notebook.

---

## 1. The scoreboard

### Tier A — publish what already exists (ROI 4.0+)

| # | Gap | SEO | AI | Diff | Time | ROI | Blocker |
|---|---|---|---|---|---|---|---|
| A1 | **History content has no URL.** ~4 000 words on geology, prehistory, Thracians, Ottoman registers, etymology and Kunev live inside `locales/bg.ts` and render into a home-page modal | 5 | 5 | 1 | 2 days | **10.0** | none |
| A2 | **Trifon Kunev has no page.** A Wikidata-known writer born in the village | 4 | 5 | 1 | 4 h | **9.0** | none |
| A3 | **The legends have no pages.** Двукраките сенки, Златната браздичка, the Иглен etymology | 3 | 5 | 1 | 1 day | **8.0** | none |
| A4 | **The "only Ъ village" fact is buried** in a stats block. It is the most memorable, most repeatable fact the site owns | 4 | 4 | 1 | 2 h | **8.0** | none |
| A5 | **No root page for the karst.** The subject of the site does not exist as a URL | 5 | 5 | 2 | 2 days | **5.0** | one geological source |
| A6 | **Eighteen thin landing pages** ×14 languages still indexed | 4 | 3 | 1 | 4 h | **7.0** | none — a `_redirects` edit |

Tier A is six items, about a week of work, no field dependencies, no new
research. **It is the single most under-exploited position I have seen in a
project of this size**: the hard part — writing genuinely rare material about an
obscure region — is done, and the material is not addressable by any search
engine or assistant.

### Tier B — one day of field work unblocks each (ROI 2.5–4.0)

| # | Gap | SEO | AI | Diff | Time | ROI | Blocker |
|---|---|---|---|---|---|---|---|
| B1 | **No road distances or drive times anywhere.** Sofia→Aglen, Lukovit→Aglen, Aglen→Prohodna/Karlukovo/Iskar-Panega/Krushuna | 5 | 5 | 2 | 1 driving day | **5.0** | one day |
| B2 | **Nine named places have no coordinates.** Дупката, Слончето, Червена стена, Рачков вир, Калето, Селището, Въловата дупка, Иглените скали, the church | 4 | 5 | 2 | half a day walking | **4.5** | one walk |
| B3 | **No route has a length, a GPX or a waymarking status** | 4 | 4 | 2 | 1 day | **4.0** | one walk |
| B4 | **Cave access and safety facts unknown.** Which caves can be entered, which need a guide, which are closed for bats | 4 | 5 | 3 | 2 days + calls | **3.0** | municipality / caving club |
| B5 | **River safety, swimming and fishing regime unknown** | 3 | 4 | 3 | 1 day + calls | **2.3** | authority contact |
| B6 | **No accessibility information** for any place in the region | 2 | 4 | 2 | half a day | **3.0** | one survey |
| B7 | **Photographs look AI-generated.** For a place-based site this undermines every other trust signal simultaneously | 5 | 3 | 2 | 2 days shooting | **4.0** | a camera and four visits |

### Tier C — research and relationships (ROI 1.5–2.5)

| # | Gap | SEO | AI | Diff | Time | ROI | Blocker |
|---|---|---|---|---|---|---|---|
| C1 | **No citations behind the history.** Ottoman registers, archaeological reports and 1920s folklore collections are referenced without being named | 3 | 5 | 4 | 1–2 weeks | **2.0** | archive access, a historian |
| C2 | **No named cave inventory** for the Karlukovo district | 4 | 4 | 4 | 1 week | **2.0** | speleological register |
| C3 | **Biodiversity cluster entirely absent** — bats, raptors, relict flora, Natura 2000 status | 3 | 4 | 4 | 1 week | **1.8** | a biologist or published surveys |
| C4 | **No named human author** anywhere on the site | 4 | 5 | 2 | ongoing | **4.5** | a person willing to be named — *this one is a decision, not a task* |
| C5 | **No claim-level sourcing infrastructure** | 3 | 5 | 3 | 1 week dev | **2.7** | none technical |
| C6 | **No corrections mechanism or log** | 2 | 4 | 2 | 2 days | **3.0** | none |
| C7 | **No interviews with residents.** The oral tradition has no living named informants | 3 | 5 | 3 | ongoing | **2.7** | consent, time, care |

### Tier D — structural and technical (ROI varies)

| # | Gap | SEO | AI | Diff | Time | ROI | Note |
|---|---|---|---|---|---|---|---|
| D1 | **No entity namespace.** Zero URLs whose subject is a real-world entity | 5 | 5 | 3 | 2 weeks dev | **3.3** | The architecture in `CONTENT_HIERARCHY.md` |
| D2 | **14 languages of unsourced machine-shaped content** | 3 | 4 | 2 | 1 day to tier | **3.5** | Tiering is a config change; the JS-bundle win comes free |
| D3 | **JS bundle 1 029 KB**; every visitor downloads all 14 locales | 3 | 1 | 3 | 1 day | **1.3** | Known regression from Phase 1, already documented |
| D4 | **`/stay/` and `/activities/` empty behind feature flags** while accommodation is a top-3 commercial intent | 4 | 2 | 3 | recruitment | **2.0** | needs listings, not code |
| D5 | **No Wikidata/OSM/Commons contribution** | 4 | 5 | 3 | ongoing | **3.0** | The highest-leverage external action available |
| D6 | **No GSC/Bing verification, no measurement at all** | 5 | 2 | 1 | 1 h | **7.0** | Already flagged in the Phase-1 audit; still outstanding |

---

## 2. Ranked by ROI

| Rank | Gap | ROI | Time |
|---|---|---|---|
| 1 | A1 — publish the history | 10.0 | 2 days |
| 2 | A2 — Kunev page | 9.0 | 4 h |
| 3 | A3 — legend pages | 8.0 | 1 day |
| 4 | A4 — the "Ъ" fact | 8.0 | 2 h |
| 5 | A6 — retire 18 thin pages | 7.0 | 4 h |
| 6 | D6 — verify GSC/Bing | 7.0 | 1 h |
| 7 | A5 — karst root page | 5.0 | 2 days |
| 8 | B1 — road distances | 5.0 | 1 day |
| 9 | B2 — GPS the nine places | 4.5 | half a day |
| 10 | C4 — a named author | 4.5 | decision |
| 11 | B3 — GPX routes | 4.0 | 1 day |
| 12 | B7 — real photographs | 4.0 | 2 days |

**The first six cost about a week combined and require no field work, no
research, no new writing and no dependency on anyone outside the project.**

---

## 3. Current vs. authority site, side by side

| Dimension | Now | Authority site | Gap |
|---|---|---|---|
| Subject | A village, with a region attached | A karst region, narrated from a village | **Inverted** |
| Entity pages | 0 | ~34 | **Total** |
| Sourced claims | 0 | 200+ | **Total** |
| Named author | none | 1+, with credentials | **Total** |
| Coordinates for named places | 9 external, 0 local | all | **9 missing** |
| Road distances | 0 | ~20 | **Total** |
| GPX routes | 0 | 6–10 | **Total** |
| Original photographs, dated | few/uncertain | 200+ | **Large** |
| History depth | excellent, unpublished | excellent, published, cited | **Publication + citation** |
| External identity (`sameAs`) | 9 entities ✅ | 30+, several contributed by the site | **Medium** |
| Structured data | strong ✅ | strong + claim-level | **Small** ✅ |
| Technical SEO | strong ✅ | strong | **None** ✅ |
| Business directory | good ✅ | good + hours + proximity | **Small** ✅ |
| Editorial policy | written ✅ | written + enforced + logged | **Enforcement** |
| Languages | 14 shallow | 2 deep + 12 shallow, honestly labelled | **Policy** |
| Events | 2 real ✅ | recurring calendar | **Medium** |
| Measurement | none | GSC, Bing, CWV, AI-citation audits | **Total** |

Four rows are already at the target ✅ — all of them from Phase 1. The technical
foundation is not the problem and does not need more work.

---

## 4. What the site is *already better at* than the authority site would be

Worth stating, because a gap analysis that only lists deficits gives a false
picture of where this project stands, and because these are the traits worth
protecting during everything above.

- **It refuses to publish what it does not know.** `guides.ts` omits distances,
  difficulty and access rather than guessing; four guides are openly marked "in
  preparation". Almost no tourism site in Bulgaria does this, and it is the
  single trait most likely to make an AI assistant treat this site as reliable.
- **It states where each *kind* of fact comes from.** `trustPages.ts` is better
  than the equivalent page on most national tourism boards.
- **Its entity data is honest about geometry.** `region.ts` marks rivers and
  trails as `linear` and refuses to derive a distance to them, because a river's
  single Wikidata coordinate is its mouth. That is a level of care that shows.
- **Its business directory only renders verified, published listings**, with an
  explicit publication state machine.
- **The Phase-1 audit reported its own regression.** A project that documents the
  bundle size it made worse is a project whose claims can be trusted.

The gap, restated in one sentence: **this project has an unusually strong sense
of what it does not know, and has not yet gone and found out.**

---

## 5. The critical path

```
week 1   A1 A2 A3 A4 A6 D6        publish the history, retire the thin pages, measure
week 2   A5 + one field day       karst root page; B1 distances + B2 coordinates
week 3   D1 begins                entity namespace, additive alongside current routes
week 4   B3 B7                    GPX + photographs
month 2  C5 C6 + D5               claim ledger, corrections log, first Wikidata items
month 3  B4 B5 B6                 access, safety, accessibility — the calls and surveys
month 4+ C1 C2 C3 C7              archives, cave register, biodiversity, interviews
ongoing  C4                       a named author — the sooner the decision, the better
```

Two dependencies dominate and both are cheap:

- **One driving day** unblocks eight pages and three of the four highest-volume
  journeys.
- **One walking day** with a phone and a camera converts nine names into nine
  mappable, photographable, contributable entities.

Everything in Tier C is real work with real cost. Everything above it is
approximately a fortnight, and it is the fortnight that decides whether this
site is a village website with good technical SEO or the reference for a region.
