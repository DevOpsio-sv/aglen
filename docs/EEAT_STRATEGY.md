# E-E-A-T Strategy

**Deliverable 9 of 10.** How this site becomes the most trusted source about the
Lukovit Karst — for readers, for Google's quality raters, and for the systems
that decide what to quote.

---

## 0. Where the project starts

Unusually well, in one specific respect, and at zero in another.

**Already true, and rare:** the project refuses to publish what it cannot verify.
`guides.ts` omits distances, difficulty and access rather than inventing them;
four of six guides say plainly that they are unfinished; `trustPages.ts` states
who runs the site, that it is not the municipality, and what is deliberately
withheld. That is a functioning editorial *disposition*.

**Not yet true:** none of it is *evidenced*. There is no author, no citation, no
observation date, no correction record, and no way for a reader — or a model — to
check a single statement. The site asks to be trusted on the strength of its
tone.

E-E-A-T is not a tone. It is four things a stranger can verify:

| Letter | Verifiable as | Site today |
|---|---|---|
| **Experience** | *Has this person been there?* Dated field notes, timestamped photographs, first-person observation | 🔴 nothing |
| **Expertise** | *Do they know the subject?* Named author, credentials, correct terminology, engagement with sources | 🔴 nothing |
| **Authoritativeness** | *Do others treat them as a source?* Citations in, links from institutions, contributions to the commons | 🔴 nothing |
| **Trustworthiness** | *Can I check?* Sources, dates, corrections, transparency, stated unknowns | 🟡 policy ✅, evidence ✗ |

The strategy below turns the disposition into evidence. It is ordered by
leverage, and the first item is worth more than the rest combined.

---

## 1. A named human author

**This is the highest-leverage single decision available to the project, and it
is a decision, not a task.**

Everything on the site is attributed to "DevOpsio", an organisation. Google's
quality guidelines for content that affects travel decisions — where to walk,
which cave is safe, whether a river can be swum — expect an identifiable person.
So, increasingly, do the assistants: a `Person` node with a `sameAs` and a real
bio is one of the strongest signals available for deciding whether a page's
claims should be repeated.

What it requires:

- **One named person**, real, contactable, with a page: `/person/<name>/`, a
  photograph, a biography, their connection to the region, what they are and are
  not qualified to say.
- **A `Person` schema node**, `sameAs` whatever public profile exists.
- **Bylines and review lines** on every substantive page: *"Written by X.
  Verified on site 12 April 2026."*
- **Honest scoping**: "I grew up here / I have walked every one of these routes /
  I am not a geologist and the geology on this page is sourced to Y."

A local person with no formal credentials but genuine ground truth is *stronger*
here than a distant expert. Experience is the letter this project can win
outright, because almost no competing site has anyone who has actually been to
Дупката.

**Second author, ideally**: a subject expert who reviews the geology,
archaeology or speleology and is credited as reviewer. Even one, even
occasionally.

---

## 2. The claim ledger — trustworthiness as infrastructure

The mechanism that makes every other item in this document verifiable.

```ts
type Claim = {
  id: ClaimId;
  entityId: EntityId;
  statement: LocalizedText;        // one atomic factual assertion
  source: SourceId;
  confidence: "verified" | "reported" | "uncertain" | "disputed";
  observedAt?: string;             // ISO — when the claim was true
  verifiedBy?: PersonId;
  method?: "field" | "archive" | "interview" | "publication" | "official" | "derived";
  supersedes?: ClaimId;            // corrections keep their history
};

type Source = {
  id: SourceId;
  kind: "wikidata" | "publication" | "archive" | "official" | "field" | "interview" | "map";
  citation: string;                // full, human-readable
  url?: string;
  accessedAt?: string;
  note?: LocalizedText;            // why this source, and its limitations
};
```

What this buys, in order of importance:

1. **Every fact on the site becomes checkable** — the `/sources/` page renders
   the whole ledger, and every claim links to its source and back.
2. **Corrections become structural.** `supersedes` preserves the history, so
   `/corrections/` is generated, not maintained.
3. **Unknowns become first-class.** A claim with `confidence: "uncertain"`
   renders as a stated unknown rather than being silently omitted — formalising
   what `guides.ts` already does by hand.
4. **Views cannot drift.** `/plan/weekend-from-sofia/` transcludes claims; fix
   the drive time once and it is fixed everywhere, including in the JSON-LD.
5. **AI systems get exactly what they need** — an atomic statement, a source, a
   date, and a confidence level. This is the single most citation-friendly
   structure a website can adopt.

Roughly a week of development. It is the technical centrepiece of Phase 2.

---

## 3. Experience — the evidence of having been there

| Signal | How | Effort |
|---|---|---|
| **Dated field notes** | `/field-notes/` — a log entry per visit: date, what was checked, what changed, what was wrong. Publish the boring ones | ongoing, 20 min/visit |
| **Timestamped photographs** | Retain and publish EXIF capture dates. *"Photographed 14 October 2026, 08:20"* is a trust signal no stock image can imitate | free |
| **Replace the AI-looking images** | The current imagery reads as generated. On a place-based site this quietly discredits everything else | 2 days shooting |
| **First-person observation** | "The east wall is in shadow until about 09:30 in October." Specific, checkable, useless to fabricate | free, while there |
| **Recorded GPX** | A track is proof of presence and useful simultaneously | 1 day |
| **Seasonal re-visits** | Four visits a year per major entity, each logged. Converts a static page into a maintained one | ongoing |
| **What went wrong** | "The path from the church was overgrown in July; we turned back." Nothing signals real presence like a failed attempt | free |

The last row is under-rated. Sites that only ever report success read as
marketing; sites that report a blocked path read as reports.

---

## 4. Expertise — knowing the subject

- **Correct terminology, used correctly.** The repo already names the Ломешка
  and Априлска formations and the Lower Cretaceous. Very few regional sites do.
  Extend it, and gloss it — precision plus accessibility is the expert register.
- **Cite the actual literature.** The history text references Ottoman registers,
  archaeological reports and 1920s folklore collections without naming one of
  them. Naming them converts strong prose into scholarship. **This is the
  highest-value expertise work available** (`CONTENT_GAP_ANALYSIS.md` C1).
- **Engage with disagreement.** Two etymologies for "Ъглен" — charcoal-burning
  vs. the rock needles — are already presented side by side without a forced
  resolution. That is what an expert source does, and it should be the house
  style everywhere.
- **Publish the method.** How distances were measured, how coordinates were
  taken, what "straight-line" means and why road distance differs. `region.ts`
  already documents this in comments; readers deserve it too.
- **Bring in reviewers**: the Iskar–Panega geopark, a caving club, the regional
  museum, a university geology department. Credit them by name. One reviewed
  page with a named reviewer outweighs ten unreviewed ones.

---

## 5. Authoritativeness — being treated as a source

Ordered by realism, not by size of prize.

| Action | Why it works | Difficulty |
|---|---|---|
| **Contribute to OpenStreetMap** | Trails, cave entrances, waypoints, parking. OSM feeds Apple Maps, most apps and a great deal of training data. The contribution *is* authority — the site becomes the origin of the region's map data | Low |
| **Upload photographs to Wikimedia Commons** (CC-BY-SA, credited) | These become the images shown for the entity across Wikipedia and many assistants. Nobody's photograph of Дупката exists there today | Low |
| **Create Wikidata items** for the Lukovit Karst, Iskar–Panega geopark, and the documented E1 entities | Makes them exist in *the* graph. Requires a citable source — which is exactly what the claim ledger produces | Medium |
| **Improve Bulgarian Wikipedia** with sourced material on Aglen, Kunev's birthplace, the karst | The strongest single authority signal in Bulgarian-language search | Medium — **must be neutral, sourced, and the connection declared. Never promotional. A COI-flagged edit is worse than no edit** |
| **Regional institutions**: Lukovit municipality, the geopark, the Lovech regional museum, НИНКН | Institutional links and, better, institutional review | Medium |
| **Caving and hiking communities** | The audience most likely to link, correct, and contribute cave data the project cannot obtain alone | Medium |
| **Local and regional press** | The photo contest and the village fair are genuine stories | Low |
| **The Trifon Kunev literary connection** | Literary societies, schools, anniversary coverage. A national figure with a village birthplace is a durable hook | Medium |
| **Academic contact** | Sofia University geology, archaeology institutes. A single citation from a paper is worth more than a hundred directory links | High, slow |

The first three are the strategic core. They are not link-building — they are
**giving the region's data to the commons and becoming its source**, which is a
position no competitor can take away.

---

## 6. Trustworthiness — the visible apparatus

Six things a reader can see and check.

1. **`/sources/`** — the browsable claim ledger. Every claim, source, date,
   confidence.
2. **`/corrections/`** — every correction, dated, with what was wrong and who
   reported it. **Publishing your own errors is the strongest trust signal
   available**, and the cheapest.
3. **Per-page provenance footer** — author, reviewer, last verified on site,
   sources used, known unknowns. Not a `dateModified` stamped by the build (Phase
   1 correctly removed that).
4. **Stated unknowns, prominently** — the site's existing practice, promoted from
   exception to design pattern. *"We do not know whether swimming at Рачков вир
   is safe. Here is who to ask."*
5. **Conflicts and independence** — the directory takes no payment; that fact is
   already stated ✅ and should appear on every listing, not only in the policy.
6. **Contact and response** — a real address, an undertaking to respond, and a
   published record of how long corrections took.

---

## 7. Community and institutions

The knowledge this site needs most is held by people, not documents.

**Residents.** The oral tradition in `bg.ts` — the silent cave people, the golden
furrow — was collected by teachers in the 1920s and 30s and has been transmitted
since. Recording it *now*, from named consenting informants, with dates, is
ethnography rather than atmosphere. It is also urgent in the ordinary way: the
people who remember are old. Practicalities: written consent, the right to
review before publication, the right to withdraw, credit by name where wanted and
anonymity where not, and a copy of everything given back to the village.

**Local historians and краеведи.** One person with the regional archive
references converts every 🔶 in these documents to 🟢.

**The municipality.** Access, permissions, statutory facts, the settlement
register. Also the correct source for anything the site should not assert
independently.

**The geopark, museums, caving clubs, universities.** Review, data, and — over
time — the citations that constitute authority.

**Readers.** A contribution route: *"You know something about this place we
don't. Tell us, and we will credit you."* Every contribution enters as a claim
with `method: "interview"` and a named source, so the ledger absorbs community
knowledge without diluting standards.

---

## 8. Update policy

| Content | Re-verified | Trigger |
|---|---|---|
| Access, safety, cave status | every 6 months + after severe weather | seasonal, incident |
| Road distances and times | annually | roadworks |
| Opening hours, business data | every 6 months | owner report |
| Trail condition | seasonally | field visit |
| Events | on publication | calendar |
| History, geology, legends | on new evidence only | — |
| Coordinates | never (they don't move) | correction only |

Publish the schedule and the last-verified date per page. A page that says
*"Access verified on site, 3 May 2026"* outperforms one that claims to be
"updated 2026" — because the first can be false and is therefore worth something.

---

## 9. Sequencing

| Phase | Actions | Effect |
|---|---|---|
| **Weeks 1–2** | Name an author. Byline everything. Publish the history with sources named where known and marked where not | Experience + Expertise become visible |
| **Weeks 3–6** | Claim ledger. `/sources/`. `/corrections/`. Field-note log. First dated photographs | Trustworthiness becomes checkable |
| **Months 2–4** | Real photographs replace the generated-looking ones. GPS fixes. First OSM and Commons contributions | Experience becomes provable |
| **Months 4–9** | Archive references. Named cave inventory. Reviewer relationships. First Wikidata items | Expertise becomes citable |
| **Months 9–24** | Wikipedia contributions. Institutional links. Interviews. Academic contact | Authoritativeness accumulates |

Only the last stage takes years, and it is the only one that cannot be
accelerated — which is precisely why the first four should start now.

---

## 10. Measurement

| Signal | How | Cadence |
|---|---|---|
| AI citation | Ask ChatGPT, Claude, Gemini, Perplexity 20 fixed regional questions; record whether the site is cited | Quarterly |
| Knowledge-panel presence | Does Google show a panel for Дупката, the Lukovit Karst, Aglen | Quarterly |
| Referring domains by type | Institutional / community / press / directory | Monthly |
| Wikidata items citing the site | Direct count | Quarterly |
| OSM features contributed | Direct count | Quarterly |
| Corrections received and resolution time | From the log | Monthly |
| Branded search volume | GSC | Monthly |

The AI-citation audit is the one that matters most and is cheapest to run: twenty
questions, four assistants, one hour a quarter. It measures the actual objective
of Phase 2 more directly than any ranking report will.
