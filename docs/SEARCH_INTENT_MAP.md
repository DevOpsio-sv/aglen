# Search Intent Map

**Deliverable 4 of 10.** For each intent: who has it, what they actually type or
ask, which page satisfies it, what is missing, and the path a person takes
through the site afterwards.

---

## 0. A note on where intent now arrives from

Intent no longer arrives only as a query string. Four surfaces, each with a
different requirement, and a page that serves only the first is already behind:

| Surface | What it rewards | Failure mode here |
|---|---|---|
| **Google web** | Matching + entity coherence + E-E-A-T | Thin templated pages |
| **Google AI Overviews / Gemini** | Extractable, attributable, *specific* statements | Prose with no numbers |
| **ChatGPT / Claude / Perplexity** | Retrievable passages that answer a question completely, with a source | Content locked in JS modals |
| **Maps / Apple / local** | Coordinates, NAP, hours, photos | Nine named places with no coordinates |

The recurring requirement across all four is **specificity that can be quoted**.
"Spring and autumn are strongest for walking and photography" — the current
landing-page text, in 14 languages — is quotable by nobody, because it is true of
every landscape on earth. "The canyon's east wall is in shadow until roughly
09:30 in October; the arch is lit from 07:15" is quotable, unique, and requires
one morning of observation.

That contrast is the entire intent strategy.

---

## 1. Intent taxonomy

Twenty-two intents in five families.

### Family I — Informational / educational

| # | Intent | Typical query (bg / en) | Satisfied by | Status |
|---|---|---|---|---|
| I1 | **What is this landscape** | „луковитски карст", "karst northern Bulgaria" | `/karst/`, `/karst/geology/` | 🔴 **no page exists** |
| I2 | **What is this cave** | „проходна пещера", "eyes of god cave" | `/place/prohodna/` | 🔴 no entity page |
| I3 | **What is this rock/place I photographed** | „скална арка река вит", reverse image | `/place/dupkata/` | 🔴 no page, no coordinates |
| I4 | **How did it form** | „как се образуват пещерите", "karst formation" | `/karst/geology/` | 🔴 |
| I5 | **What lives here** | „прилепи пещери", "birds Lovech region" | `/karst/life/` | 🔴 whole cluster absent |
| I6 | **Village history** | „история на село Ъглен" | `/place/aglen/history/` | 🟡 **content exists, has no URL** |
| I7 | **Where does the name come from** | „защо Ъглен се пише с Ъ" | `/place/aglen/name/` | 🟡 in a modal |
| I8 | **Who was born here** | „Трифон Кунев роден" | `/person/trifon-kunev/` | 🟡 one paragraph, no page |
| I9 | **Local legends** | „легенди Ъглен", "Bulgarian folklore caves" | `/story/*` | 🟡 in prose |
| I10 | **Archaeology** | „тракийски светилища Ловешко", „кремъчни работилници" | `/history/*` | 🟡 |

Six of ten are 🟡 — **the content exists and is unreachable.** No writing
required; only publication. This is the cheapest large win in the document.

### Family II — Travel planning

| # | Intent | Query | Satisfied by | Status |
|---|---|---|---|---|
| P1 | **Weekend near Sofia** | „уикенд близо до София", "weekend trip from Sofia" | `/plan/weekend-from-sofia/` | 🔴 page exists, **has no distance or drive time** |
| P2 | **One-day trip** | „еднодневна екскурзия от София/Плевен" | `/plan/one-day/` | 🔴 same |
| P3 | **How do I get there** | „как да стигна до Ъглен", "Karlukovo by train" | `/plan/getting-here/` | 🔴 **no verified route anywhere on the site** |
| P4 | **When should I come** | „кога е най-добре", "best time to visit" | `/plan/when-to-come/` | 🟡 generic |
| P5 | **What do I combine** | „какво да видя около Луковит" | graph `combinesWellWith` | 🟡 asserted without distances |
| P6 | **Where do I sleep** | „нощувка Луковит", "guest house near Prohodna" | `/directory/stay/` | 🔴 `SHOW_STAY` is off; one hotel listed |
| P7 | **Where do I eat** | „ресторант Луковит" | `/directory/food/` | 🟢 works |
| P8 | **Can I camp** | „къмпинг край река Вит" | `/plan/camping/` | 🔴 legality unknown, correctly unpublished |

P1–P3 are the highest-volume intents this region has, and all three fail on the
same missing datum: **road distance and drive time.** One day of driving fixes
eight pages.

### Family III — Activity

| # | Intent | Query | Page | Status |
|---|---|---|---|---|
| A1 | **Hiking** | „маршрут пеша Карлуково", "hiking trails Lukovit" | `/route/*` | 🔴 no length, no GPX, no waymarking |
| A2 | **Caving** | „пещери с водач", "caving Karlukovo" | `/plan/caving/`, `/karst/caves/` | 🔴 access facts unknown |
| A3 | **Photography** | „места за снимки река Вит", "photo spots Bulgaria caves" | `/plan/photography/` | 🟡 **the best real content on the site is here** — light hours in the beautiful-places guide. Extend it |
| A4 | **Fishing** | „риболов река Вит" | `/plan/fishing/` | 🔴 licence and regime unknown |
| A5 | **Swimming / river** | „вирове за къпане" | `/place/rachkov-vir/` | 🔴 safety unverified, correctly withheld |
| A6 | **Cycling** | „велосипед Ловешко" | `/plan/cycling/` | 🔴 absent |
| A7 | **Birdwatching** | „наблюдение на птици", "birding Bulgaria karst" | `/plan/birding/` | 🔴 absent |
| A8 | **Climbing / bungee** | „бънджи Проходна" | `/place/prohodna/` | 🔴 absent, and it has real volume |
| A9 | **AR / gamified** | „Unlocking Bulgaria" | `/quests/` | 🟢 works |

### Family IV — Audience

| # | Audience | What changes for them | Page | Status |
|---|---|---|---|---|
| U1 | **Families with children** | Difficulty, hazards, toilets, duration, boredom | `/plan/with-children/` | 🟡 templated |
| U2 | **School groups** | Curriculum tie-in (geology, prehistory, literature), safety, group logistics, invoicing | `/plan/school-trip/` | 🔴 huge, unserved; Kunev + flint workshops + karst is a *complete* field-trip syllabus |
| U3 | **Researchers / geologists / speleologists** | Strata names, references, cave register, coordinates | `/karst/geology/`, `/sources/` | 🔴 absent; the highest AI-citation audience there is |
| U4 | **Foreign visitors** | Language, orientation, expectations, transport without a car | tier-2 languages | 🟡 14 machine-shaped languages |
| U5 | **Bulgarian domestic** | Specific, sceptical, comparison-driven | bg surface | 🟢 primary and strongest |
| U6 | **Photographers** | Light, access, season, permission | `/plan/photography/` | 🟡 |
| U7 | **Slow / rural travellers** | Authenticity, hosts, food, quiet | `/directory/`, `/place/aglen/` | 🟢 |
| U8 | **Accessibility needs** | Surface, gradient, parking distance, step-free | `/plan/accessibility/` | 🔴 absent everywhere in the region |
| U9 | **Diaspora / genealogy** | Registers, families, the church, the old settlement | `/history/ottoman-registers/` | 🔴 unserved, low volume, extremely high engagement |

### Family V — Commercial, navigational, civic

| # | Intent | Page | Status |
|---|---|---|---|
| N1 | Find a specific business | `/directory/<slug>/` | 🟢 well built ✅ |
| N2 | Buy local produce | `/directory/producers/` | 🟢 |
| N3 | Hire a guide | `/directory/services/` | 🟢 one listed |
| N4 | Book a stay | `/directory/stay/` | 🔴 flag off |
| N5 | Event dates | `/events/` | 🟢 ✅ |
| N6 | Contact the village / municipality | `/contact/` | 🟢 |
| N7 | Report an error / contribute | `/corrections/` | 🔴 policy exists, no mechanism |
| N8 | Cite this site | `/sources/`, `/crawler-policy/` | 🟡 policy ✅, no claim ledger |

---

## 2. Coverage summary

| Family | Intents | 🟢 served | 🟡 partial | 🔴 unserved |
|---|---|---|---|---|
| Informational | 10 | 0 | 6 | 4 |
| Planning | 8 | 1 | 2 | 5 |
| Activity | 9 | 1 | 1 | 7 |
| Audience | 9 | 2 | 3 | 4 |
| Commercial | 8 | 5 | 1 | 2 |
| **Total** | **44** | **9 (20%)** | **13 (30%)** | **22 (50%)** |

The site currently ships 27 landing pages + 6 guides = 33 content pages and
fully serves 9 intents. The 13 "partial" cases are almost all the same
pathology: **the answer exists in the repository and is not addressable.**

---

## 3. Journeys — how a person should move

Designed backwards from the exit, which is either a visit, a booking, a
contact, or a citation.

### J1 — "Weekend near Sofia" (highest volume, currently broken)
```
Google → /plan/weekend-from-sofia/
   ├─ decision:  yes/no in the first screen — distance, drive time, what you get
   ├─ /place/prohodna/        (the draw)          E5
   ├─ /place/iskar-panega/    (the morning)
   ├─ /place/aglen/           (the quiet half)    ★ where the site earns its base
   │     └─ /place/vit-river/aglen-reach/
   ├─ /directory/stay/        (the conversion)
   └─ /plan/when-to-come/     (the return visit)
```
Blocked at step 1 by the missing drive time. Everything downstream works.

### J2 — "What is this cave I heard about" (E5 entry, hardest to win)
```
Google → /place/prohodna/
   ├─ access + safety + light hours   ← the only place to beat Wikipedia
   ├─ /karst/geology/                 ← "why is it here" — nobody answers this
   ├─ /place/karlukovo/ (1.4 km)      ← real, derived, honest
   ├─ /place/dupkata/   (19.8 km, same formation)  ★ THE AUTHORITY TRANSFER EDGE
   └─ /plan/one-day/
```
This journey is the mechanism described in `TOPICAL_AUTHORITY_MAP.md` §0. A
visitor arriving for an E5 entity is handed an E1 entity with a *geological
reason* for the connection. Do this well and Дупката becomes a known place.

### J3 — "History of my village" (highest engagement, zero competition)
```
Google / bg.wikipedia → /place/aglen/history/
   ├─ /history/ottoman-registers/     ← names, dates, archives
   ├─ /place/selishteto/              ← the abandoned settlement
   ├─ /place/valovata-dupka/          ← the tragedy
   ├─ /person/trifon-kunev/           ★ links out to Wikidata, and back
   ├─ /story/dvukrakite-senki/
   └─ /corrections/                   ← "you know something we don't" — the contribution loop
```
This journey costs nothing to build. The text is written.

### J4 — School trip (unserved, complete syllabus already in the repo)
```
Teacher search → /plan/school-trip/
   ├─ geology module      → /karst/geology/
   ├─ prehistory module   → /history/flint-workshops/
   ├─ literature module   → /person/trifon-kunev/
   ├─ safety + logistics  → /route/village-walk/
   └─ /contact/           ← conversion
```
Bulgarian schools run mandatory excursions. A region 100 km from Sofia with a
national-literature figure, a karst system and a prehistoric industrial site has
a syllabus and nobody has written it down.

### J5 — AI citation (the Phase-2 audience)
```
Model crawl → /karst/  →  /sources/  →  claim with citation
```
The exit here is not a visit; it is being quoted. Requires §4.

---

## 4. What "answering an intent" has to mean structurally

For every 🔴 above, the fix is the same shape:

1. **One page owns the intent.** Not three near-duplicates.
2. **The answer is in the first 300 words**, as a statement with a number in it.
3. **The statement carries a source and a date.**
4. **What is unknown is stated as unknown**, in the same block, with the same
   prominence. (`guides.ts` already does this and it is the site's most
   distinctive editorial trait — it should be a design pattern, not an exception.)
5. **Three graph edges out**, at least one of which goes to an entity the reader
   did not know existed.

Rule 4 is worth defending explicitly, because it looks like a weakness. A page
that says *"We do not know whether swimming at Рачков вир is safe, and here is
who to ask"* outperforms one that guesses, on every one of the four surfaces in
§0 — and it is the only kind of page that a careful person recommends to
someone else.

---

## 5. Intent → page map (the buildable list)

| Page | Owns intents | Depends on |
|---|---|---|
| `/karst/` | I1 | writing (1 day) |
| `/karst/geology/` | I1 I4 U3 | one geological source |
| `/karst/caves/` | I2 A2 | cave inventory 🔶 |
| `/karst/life/` | I5 A7 | biodiversity source ⬜ |
| `/place/aglen/history/` | I6 I10 U9 | **nothing — publish today** |
| `/place/aglen/name/` | I7 | **nothing** |
| `/person/trifon-kunev/` | I8 U2 | **nothing** |
| `/story/*` ×4 | I9 | **nothing** |
| `/place/prohodna/` | I2 A8 | access facts 🔶 |
| `/place/dupkata/` + 8 more E1 | I3 A3 | **GPS + photographs, half a day** |
| `/plan/getting-here/` | P3 | **road distances, one day** |
| `/plan/weekend-from-sofia/` | P1 P2 | road distances |
| `/plan/when-to-come/` | P4 | seasonal observation, 4 visits/yr |
| `/plan/photography/` | A3 U6 | light observation, 1 morning |
| `/plan/school-trip/` | U2 | 1 day writing, existing material |
| `/plan/accessibility/` | U8 | field survey, half a day |
| `/route/*` ×4 | A1 | **GPX recording, 1 day** |
| `/directory/stay/` | P6 N4 | flip `SHOW_STAY`, recruit listings |
| `/sources/` | N8 U3 | claim ledger implementation |

Eleven of the nineteen are unblocked right now. Four need one day of field work
between them. That is the entire critical path.
