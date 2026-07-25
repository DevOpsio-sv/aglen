# Editorial Operating System

**Phase 3 — System Architecture (3 of 4).** The institution that runs the machine. Governance, people, trust, review,
cadence, conflict and ethics for the Aglen / "Unlocking Bulgaria" project — over a
20-year horizon, hundreds of contributors, thousands of entities, from one village
to all of Bulgaria.

This document governs **people**. Its sibling `KNOWLEDGE_PIPELINE.md` governs the
**data** — the Entity/Claim lifecycle, build automation, `graph-audit.mjs`, and
the render artifacts. Where a rule here needs a mechanical check, the check lives
in the Pipeline and is named, not redefined. Everything else — who may write, who
may approve, how trust is earned, when a claim is retracted, what a legend may
assert — lives here.

Primary input: `EEAT_STRATEGY.md` (author, claim ledger §2, field evidence §3,
update policy §8, community/institutions §7, measurement §10). This OS turns that
document's *disposition* into *enforced governance*. It builds on the ten Phase-2
architecture documents and does not restate them; it cites them by filename.

Vocabulary is fixed by `TOPICAL_AUTHORITY_MAP.md` §4 and used without redefinition:
**Entity** (a real thing; permanent URL + id), **View** (an intent composition),
**Claim** (one atomic sourced statement; the unit of trust), **Surface** (a
rendering; never truth). Entity confidence **E1–E5** per `KNOWLEDGE_GRAPH.md` §4.
Claim confidence **verified | reported | uncertain | disputed** per
`EEAT_STRATEGY.md` §2.

---

## 1. Editorial philosophy — operational, not a manifesto

Five working rules. Each is testable; each has already been demonstrated by the
codebase, which is why they are governance and not aspiration.

| # | Rule | The test | Where the code already does it |
|---|---|---|---|
| **P1** | **A claim without a source is not content.** It is a question waiting for field work. | Can a stranger check it? | `guides.ts` omits distances rather than inventing them |
| **P2** | **The unknown is published, not hidden.** A stated gap outranks a guess on every surface. | Does the page say what it does *not* know, with equal prominence? | `trustPages.ts` "Какво не се публикува"; `SEARCH_INTENT_MAP.md` §4 rule 4 |
| **P3** | **Consistency beats speed.** A slow correct institution outlasts a fast one. This OS optimises for the editor who arrives in year 12. | Would a new editor reach the same decision from the written rules alone? | this document |
| **P4** | **Truth is versioned, never overwritten.** Corrections keep their history; the ledger `supersedes`, it does not delete. | Can you reconstruct what the site said on any past date, and why it changed? | `Claim.supersedes` (`EEAT_STRATEGY.md` §2) |
| **P5** | **The map is not the territory; the Surface is not the truth.** People and machines argue about Claims, never about how a page looks. | Is the disagreement about a fact or a rendering? | Entity/Claim/Surface split |

The disposition to protect, stated once: **this project's rare strength is that it
refuses to publish what it cannot verify.** Every rule below exists to make that
refusal survive hundreds of contributors and twenty years of pressure to fill the
page. When in doubt, refuse and mark the gap.

**What this OS is not.** Not a CMS, not a style guide for prose, not the data
pipeline. It is the operating manual of the institution — closest in spirit to the
combination of Wikipedia's policy namespace, National Geographic's fact-checking
desk, and OpenStreetMap's contributor governance.

---

## 2. Editorial governance

### 2.1 Bodies and what each decides

| Body | Composition | Decides | Cannot |
|---|---|---|---|
| **Steward** | 1 person, the constitutional office | Guards the 20-rule Constitution (§16); breaks ties that reach the top; ratifies EDRs and RFCs | Change the Constitution alone (needs §15.4 process); publish content |
| **Editorial Board** | Managing Editor + Regional Editors + ≥1 Expert Reviewer | Ratifies RFCs; sets the editorial calendar; admits/removes Editors; owns metrics review | Overturn a sourced claim by vote — only evidence moves a claim |
| **Managing Editor** | 1 person | Runs the review queue; final publish gate for P1 entities; assigns owners; owns SLAs | Approve their own field work as sole reviewer (§6.2 two-person rule) |
| **Regional Editor** | 1 per region (§8) | Everything editorial inside their region; publishes ≤P2 entities; recruits contributors | Publish outside their region; change shared schema |
| **Ethics/Consent Officer** | 1 person, may be shared across regions | Interview consent, withdrawal, minors, sensitive material (§7.4, §9.6) | Be overruled on a withdrawal — withdrawal is absolute |
| **Expert Reviewer** | subject specialists, credited by name | Sign-off on their domain (geology, archaeology, speleology, ecology, history) | Publish directly; approve outside their domain |

Objection I will state myself: **this is heavy for a village site with one
author today.** Correct. In year 1 one person holds Steward, Managing Editor and
the sole Regional Editor role simultaneously, and the bodies are *roles they wear*,
not people they hire. The structure exists so that when the second and fortieth
contributors arrive, the seams are already drawn. Federation (§8) is the reason the
governance is specified before it is populated. A structure retrofitted onto 300
contributors never sets.

### 2.2 The single non-delegable rule

**No one approves their own claim onto an indexed page.** Author ≠ sole Reviewer,
always, for every confidence level above `uncertain`. In a one-person year this
means: an `uncertain` claim may go live self-reviewed (it advertises its own doubt);
a `verified` claim may not — it waits for a second human, and until then renders in
the "not yet verified" block (`KNOWLEDGE_GRAPH.md` §7.3). Slower, and correct.

### 2.3 Decision authority by claim confidence

| Claim confidence | Min. reviewer tier (§3) | Publish gate | Renders as |
|---|---|---|---|
| `verified` | T4 Reviewer, or T5 Editor + one T3 | two humans, one ≥T4 | plain statement + source |
| `reported` | T3 Author + T3 corroboration | two humans | "reported by …", attributed |
| `uncertain` | T3 Author | one human | explicit "we do not know / as told" block |
| `disputed` | T4 Reviewer + Managing Editor | two humans + EDR | both positions, neither resolved |

---

## 3. Contributor roles and the trust ladder

Trust is **earned by demonstrated accuracy, not granted by request** — the OSM /
Wikipedia model. A contributor climbs by shipping claims that survive review and
survive contact with the ground. Privileges are mechanical consequences of tier,
enforced in tooling, never informal favours.

### 3.1 The ladder

| Tier | Name | How reached | May do | May **not** do |
|---|---|---|---|---|
| **T0** | **Reader** | arrive | Read; report an error; submit a fact via `/corrections/` | Edit |
| **T1** | **Contributor** | 1 accepted submission | Submit claims (enter as `reported`/`uncertain` with a named source); suggest edits | Publish; set `verified` |
| **T2** | **Verified Contributor** | 5 accepted claims, 0 rejected-for-fabrication | Draft entity sections; propose sources; upload images to the review queue | Approve; publish |
| **T3** | **Author / Field Observer** | 20 accepted claims **and** one signed field visit; named-person page (`EEAT_STRATEGY.md` §1) | Byline pages; record field notes, GPS, photos; conduct interviews (with Consent Officer); self-publish `uncertain` | Approve `verified`; publish P1 |
| **T4** | **Reviewer** | 50 accepted claims, demonstrated domain accuracy, Board invitation | Approve `verified`; sign reviews; resolve `reported`→`verified` | Approve own authored claim; publish outside competence |
| **T5** | **Editor (Regional)** | Board appointment | Publish ≤P2 in-region; admit T1–T3; own a region's calendar | Publish other regions; edit Constitution |
| — | **Expert Reviewer** | credential or demonstrated expertise + Board credit | Domain sign-off, cited by name | Publish; approve outside domain |
| — | **Managing Editor / Steward** | §2.1 | §2.1 | §2.1 |

### 3.2 How expertise is *earned*, not asserted

A credential is admissible evidence of expertise; it is not expertise. Expertise on
this project is demonstrated the way `EEAT_STRATEGY.md` §4 describes: correct
terminology used correctly, engagement with the literature, and — the one this
project weights above all — **ground truth**. A resident with no diploma who has
walked to Дупката outranks a distant PhD who has not, on any claim that depends on
being there. (`EEAT_STRATEGY.md` §1: Experience is the letter this project wins
outright.)

| Expertise signal | Weight | Verified how |
|---|---|---|
| Signed field visit to the entity | highest for place-claims | GPS track + dated photo + field note |
| Accepted-claim record with low reversion rate | high | ledger; `#2 Knowledge-health` metrics (§14) |
| Named credential + `sameAs` public profile | medium | the profile resolves |
| Correct, glossed use of domain terminology | medium | Reviewer judgement |
| Citation of the actual primary literature | high | source resolves and is checkable |

**Trust decays.** A T3+ contributor inactive for 24 months, or whose claims start
reverting above the §14 threshold, is reviewed by the Board and may be stepped
down. Trust is a running average of accuracy, not a badge earned once.

### 3.3 Trust is per-domain

A T4 Reviewer for local history is a T1 Contributor for cave geology. Competence
does not transfer across domains. Tooling records tier **per domain tag**
(`land`, `time`, `people`, `visit`, `method` — the domains of
`TOPICAL_AUTHORITY_MAP.md`). This is the single rule that prevents the most common
authority failure: a trusted person being trusted about the wrong thing.

---

## 4. Review process

Every change is a **proposal against the graph** until a human of sufficient tier
ratifies it. Review is not proofreading; it is verification that the claim is true,
sourced, dated, and correctly bounded. The generic flow, specialised per content
type in §5–§6:

```
DRAFT ──submit──▶ QUEUED ──triage──▶ IN-REVIEW ──┬─▶ CHANGES-REQUESTED ─▶ DRAFT
                                                  ├─▶ APPROVED ─▶ PUBLISHED
                                                  ├─▶ HELD (blocked on field/source) ─▶ QUEUED
                                                  └─▶ REJECTED (logged, with reason)
```

| Gate | Owner | Checks | Fails to |
|---|---|---|---|
| **Triage** | Editor / Managing Editor | in scope? right region? not a duplicate? tier sufficient to have submitted? | REJECTED with reason |
| **Verification** | Reviewer ≥ required tier (§2.3) | each claim has a resolving source; confidence honest; date present; bounded correctly | CHANGES-REQUESTED |
| **Graph gate** | `graph-audit.mjs` (Pipeline) | health rules `KNOWLEDGE_GRAPH.md` §7; generation gates `PROGRAMMATIC_SEO_PLAN.md` §1; anti-orphan `INTERNAL_LINKING_GRAPH.md` §5 | build fails; HELD |
| **Publish** | Managing Editor (P1) / Editor (≤P2) | two-person rule (§2.2); ethics clear; sources page renders | HELD |

A rejection is never silent: it is written to the review log with a reason from a
fixed vocabulary (`out-of-scope`, `unsourced`, `unverifiable`, `duplicate`,
`fabrication`, `consent-missing`, `tier-insufficient`). `fabrication` is the only
reason that also affects a contributor's standing (§3.2).

---

## 5. Core workflows (state machines)

Each is a state machine with owners and gates. States are stored on the Claim or
Entity in the ledger; transitions are the Pipeline's job to persist, this OS's job
to authorise.

### 5.1 Publishing workflow (Entity or View)

```
PROPOSED ─▶ DRAFTED ─▶ CLAIMS-ATTACHED ─▶ REVIEWED ─▶ GATED ─▶ PUBLISHED ─▶ MAINTAINED
   │           │            │                │          │                        │
   │           │            │                │          └─ graph-audit G1–G5 + health rules
   │           │            │                └─ two-person rule; ethics clear
   │           │            └─ ≥3 unique claims or it becomes a section (KG §7.5)
   │           └─ owner assigned; entity id minted (permanent)
   └─ passes ENTITY_PRIORITY_MATRIX threshold to warrant a page
```

| State | Owner | Entry gate | Exit gate |
|---|---|---|---|
| PROPOSED | any ≥T1 | scores a priority band (`ENTITY_PRIORITY_MATRIX.md`) | Editor accepts scope |
| DRAFTED | ≥T2 | id minted, never reused | ≥1 claim exists |
| CLAIMS-ATTACHED | ≥T3 author | each claim sourced or `uncertain` | ≥3 unique claims (else → section) |
| REVIEWED | ≥T4 reviewer, ≠ author | verification gate (§4) | two-person rule met |
| GATED | `graph-audit.mjs` | health + generation gates pass | zero unsourced claims on the indexed surface |
| PUBLISHED | Editor / Managing Editor | priority-appropriate publisher | — |
| MAINTAINED | owner | re-verification cadence (§9.4) | on stale → back to REVIEWED |

**No entity skips CLAIMS-ATTACHED.** A page is a rendering of claims; a page with
no claims is a Surface pretending to be truth (P5). This is the rule that makes the
`landingPages.ts` failure (`PROGRAMMATIC_SEO_PLAN.md` §0) mechanically impossible.

### 5.2 Review workflow

Specialisation of §4. Two properties are mandatory and enforced:

1. **Reviewer independence** — the reviewer is not the author and, for `verified`,
   holds ≥T4 in the claim's domain (§3.3).
2. **Reviewer accountability** — the review is signed. `Claim.verifiedBy` records
   *who*, so a reviewer's own accuracy is measurable and their tier can decay (§3.2)
   if the claims they pass start reverting.

SLA: see §14.2. A claim in IN-REVIEW past its SLA escalates to the Managing Editor,
who either reviews it or reassigns it. Nothing sits silently.

### 5.3 Fact verification workflow

The heart of the OS. A candidate fact becomes a Claim only by passing this.

```
CANDIDATE ─▶ SOURCE-SOUGHT ─▶ SOURCED ─▶ CORROBORATED ─▶ DATED ─▶ CLAIM
                  │                            │
                  └─ no source found ─▶ mark UNKNOWN, publish the gap (P2)
                                             └─ one source only ─▶ confidence ≤ reported
```

| Step | Requirement | Sets |
|---|---|---|
| SOURCE-SOUGHT | a real Source is identified (`EEAT_STRATEGY.md` §2 `Source` type) | `source` |
| SOURCED | source resolves and actually supports the statement | `method` (field/archive/interview/publication/official/derived) |
| CORROBORATED | second independent source, **or** explicit single-source flag | `confidence` ceiling |
| DATED | `observedAt` = when the claim was *true*, not when typed | `observedAt` |
| CLAIM | `verifiedBy` set by an independent reviewer | `confidence` final |

Confidence assignment is not a mood; it follows a table:

| Situation | Confidence |
|---|---|
| ≥2 independent sources, or 1 official + field confirmation | `verified` |
| 1 credible source, uncorroborated | `reported` |
| local memory / oral, no external source | `uncertain` |
| sources conflict | `disputed` (both rendered, §6.1) |

**A fact that cannot pass CORROBORATED does not fail — it publishes as `uncertain`
or as a stated unknown.** The refusal is the product (`TOPICAL_AUTHORITY_MAP.md`
§0 legend).

### 5.4 Source verification workflow

A source is checked before a claim leans on it. The `Source` record is
`EEAT_STRATEGY.md` §2.

| Check | Pass condition | Failure |
|---|---|---|
| Resolves | url/citation reaches the actual source | HELD; source rejected |
| Supports | the source really says what the claim asserts | CHANGES-REQUESTED |
| Independent | not derived from this site or a mirror of it | may not count toward corroboration |
| Kind honest | `kind` matches reality (a blog is not `official`) | corrected |
| Accessed-dated | `accessedAt` recorded for anything that can change | added |
| Limitation noted | `note` states why this source and its weakness | added for archive/interview/map |

**Circularity ban.** A source that ultimately derives from this site cannot
corroborate this site. When the project contributes to Wikidata/Wikipedia/OSM
(`EEAT_STRATEGY.md` §5), those contributions are **not** admissible as independent
sources back to us — declaring the connection is mandatory, and citing yourself
through a third party is fabrication with extra steps.

### 5.5 Image verification workflow

Images carry as much trust as text and are the fastest way to lose it — the current
imagery "reads as generated" and "quietly discredits everything else"
(`EEAT_STRATEGY.md` §3).

```
SUBMITTED ─▶ PROVENANCE-CHECKED ─▶ RIGHTS-CLEARED ─▶ CAPTION-BOUND ─▶ PUBLISHED
```

| Gate | Requirement |
|---|---|
| Provenance | who shot it, when, where; EXIF capture date retained (`EEAT_STRATEGY.md` §3) |
| No synthetic | AI-generated or stock images are **banned on entity pages.** Illustrative use elsewhere must be labelled "illustration, not a photograph of this place" |
| Rights | photographer named; permission or licence on file; Commons uploads CC-BY-SA credited (`EEAT_STRATEGY.md` §5) |
| Geo-honesty | an image attached to an entity actually depicts that entity — no village photo standing in for a rock 4 km away (same class as the coordinate bug, `KNOWLEDGE_GRAPH.md` §7.8) |
| Caption | dated, credited, describes what is shown; alt text present (already disciplined in `localBusinesses.ts`) |

A timestamped, credited photograph is "a trust signal no stock image can imitate."
The workflow exists to protect that signal, not to slow it.

### 5.6 Translation workflow

Governed by the two-tier language policy (`TOPICAL_AUTHORITY_MAP.md` §3.3): **bg +
en carry the full knowledge layer; the other twelve carry a fixed small surface and
`noindex` the rest** until a human speaker reviews them.

```
bg/en CLAIM (source of truth)
   │
   ├─ Tier-1 (bg, en): human-authored, independently reviewed, publishable
   └─ Tier-2 (12 langs): AI *draft* ─▶ human-speaker review ─▶ promote-per-language
                              │
                              └─ un-reviewed ─▶ noindex; hreflang to bg/en parent
```

| Rule | Rationale |
|---|---|
| A claim is authored once, in bg or en, and transcluded | a fact edited in one place is fixed everywhere (`PROGRAMMATIC_SEO_PLAN.md` §5) |
| AI may *draft* a tier-2 translation; it may never *publish* one | §10 — AI is never an editor |
| A tier-2 language is promoted to knowledge tier only with a named human reviewer for that language | `5_YEAR_SEO_ROADMAP.md` 12-month item 8 |
| An un-reviewed tier-2 page never emits an entity Surface; it links to the bg/en node with correct hreflang | `KNOWLEDGE_GRAPH.md` §7.10 |
| Editorial policy and consent documents are never machine-translated | `trustPages.ts` already refuses this — "a machine-shaped paraphrase of an editorial policy is worse than a clearly English one" |

---

## 6. Handling hard content

The content types where the refusal-to-guess earns its keep. Each has a rule that
looks like a weakness and is a strength.

### 6.1 Historical claims

| Rule | |
|---|---|
| Attested vs inferred is marked **in the claim**, never blurred in prose | `CONTENT_HIERARCHY.md` §2.4 |
| The archive is named | Ottoman registers, archaeological reports, 1920s folklore collections must be cited by name — "the highest-value expertise work available" (`EEAT_STRATEGY.md` §4; gap C1) |
| Disagreement is preserved, not resolved | two etymologies of "Ъглен" shown side by side is the house style (`EEAT_STRATEGY.md` §4) |
| A `disputed` claim renders **both** positions, each sourced, with no forced verdict | §5.3 |
| Method is published | how a date is known, what "attested" means here |

### 6.2 Legends

The single most important content rule on the project:

> **A legend page never asserts the legend as fact. It asserts that the legend is
> *told* — which is a different, verifiable, and dated claim.**
> (`CONTENT_HIERARCHY.md` §2.4)

| Element | Requirement |
|---|---|
| The story as told | verbatim where possible; the teller's framing kept |
| Who told it, who recorded it, when | the 1920s–30s teacher collections named; living tellers consented (§7.4) |
| What it may reflect | hedged, explicitly ("Двукраките сенки *plausibly* encodes Palaeolithic behaviour" — extraordinary if hedged, "embarrassing if overclaimed", `ENTITY_PRIORITY_MATRIX.md` §2) |
| What is **not** claimed | stated in the same block |
| Modern inventions labelled | "Пазителят", the AR quest character, is a *modern creation* and must never be mixed with collected folklore (`TOPICAL_AUTHORITY_MAP.md` C2) |

Confidence for a legend's *content* is always `uncertain` or lower. Confidence for
"this legend is told in Aglen" can be `verified`. Keep the two claims separate.

### 6.3 Oral history

The only content with a **real, irreversible deadline** — "the people who remember
are old" (`EEAT_STRATEGY.md` §7; `5_YEAR_SEO_ROADMAP.md` risk row). Governed by the
interview workflow §9.6 and the Ethics Officer. An oral claim enters the ledger as
`method: "interview"`, `confidence: "uncertain"` (unless externally corroborated),
with a named, consenting source. It is ethnography, not atmosphere, precisely
because it is dated and attributed.

### 6.4 Unknown information

Unknowns are **first-class content**, not omissions (P2). A gap is modelled, owned,
and rendered.

| Kind of unknown | Rendered as | Owner |
|---|---|---|
| Known gap, safety-relevant (cave access, swimming) | explicit "we do not know; here is who to ask" block | Editor; never guessed (`5_YEAR_SEO_ROADMAP.md` risk: "someone gets hurt") |
| Not-yet-field-verified | "not yet recorded" placeholder section (`CONTENT_HIERARCHY.md` §2.1) | Field Observer, queued |
| Contested | `disputed`, both sides shown | Reviewer |
| Deliberately withheld | stated in `/about/` "what is not published" | Managing Editor |

An unknown has an owner and a place in the field-work backlog (§9). "Unknown" is a
state with a workflow, not an absence.

### 6.5 Corrections

Corrections are **structural, generated from the ledger, not maintained by hand**
(`EEAT_STRATEGY.md` §2, §6). Publishing your own errors is "the strongest trust
signal available, and the cheapest."

```
REPORT (reader/contributor/internal) ─▶ TRIAGE ─▶ VERIFY ─▶ SUPERSEDE ─▶ PUBLISHED to /corrections/
                                          │
                                          └─ not an error ─▶ logged, reporter answered
```

| Step | Owner | SLA (§14.2) | Record |
|---|---|---|---|
| Acknowledge the reporter | Editor | 72 h | contact log |
| Verify or reject | Reviewer | by severity SLA | reason |
| Correct via `supersedes` (history kept, P4) | Author + Reviewer | — | new Claim, old retained |
| Publish to `/corrections/`, dated, with what was wrong and who reported it | build | on next deploy | ledger-derived |

Severity sets the clock: a **safety** correction is same-day; a factual error is
7 days; a typo is next cycle. Resolution time is a published metric (§14).

### 6.6 Retractions

A retraction is stronger than a correction: the claim was not merely imprecise, it
was **wrong and should not have been published.**

| Rule | |
|---|---|
| The claim is set `disputed`→withdrawn and **kept**, struck-through, never deleted | P4; version history §6.8 |
| A retraction notice is published on `/corrections/` explaining what was wrong and why it passed review | transparency over reputation |
| If a review process let it through, an **EDR** (§13.1) records the process failure and the fix | the institution learns, not just the page |
| A retraction that touched safety triggers a review-process audit | §14 |

### 6.7 Deprecation

For content that is no longer current but was not wrong — a closed business, a
route now impassable, a superseded distance.

| Case | Action | URL |
|---|---|---|
| Entity ceased to exist (business closed) | mark deprecated; keep page with a dated "closed as of" note | kept, `noindex` optional |
| View no longer composes anything unique | retire; 301 to nearest real node (`CONTENT_HIERARCHY.md` §4) | redirected |
| Claim superseded by newer observation | `supersedes`; old claim retained in history | — |
| Whole language tier withdrawn | `noindex`, hreflang to parent; reversible per language | kept |

An entity id, once minted, is **never reused** (`KNOWLEDGE_GRAPH.md` §1). Deprecated
is a state, not a deletion.

### 6.8 Version history

Every published claim's history is reconstructable from `supersedes` chains. The
institution can answer, for any past date: *what did the site say, on what source,
reviewed by whom, and why did it change?* This is a governance guarantee (P4); the
mechanical storage is the Pipeline's. No hand-maintained changelog — the ledger
**is** the changelog.

### 6.9 Public transparency

The visible apparatus, per `EEAT_STRATEGY.md` §6, is a governance obligation, not a
marketing choice:

| Surface | Guarantee |
|---|---|
| `/sources/` | the whole claim ledger, browsable; every claim → its source and back |
| `/corrections/` | every correction and retraction, dated, attributed to the reporter |
| `/field-notes/` | the dated verification log (§9) |
| Per-page provenance footer | author, reviewer, last verified on site, sources, known unknowns — **not** a build-stamped `dateModified` (Phase 1 removed that deliberately) |
| `/about/`, `/editorial-policy/` | who runs it, what is refused, conflicts of interest declared |

If it is not checkable, it is not published as `verified`. Transparency is the
mechanism by which the refusal-to-guess becomes visible to a machine deciding
whether to cite.

---

## 7. Community and expertise

### 7.1 Community contribution

The knowledge this site needs most is held by people, not documents
(`EEAT_STRATEGY.md` §7). The contribution route: *"You know something about this
place we don't. Tell us, and we will credit you."* Every contribution enters as a
Claim with `method: "interview"` (or the appropriate method) and a named source, so
**the ledger absorbs community knowledge without lowering the bar** — a contributed
claim is subject to the same §5.3 verification as any other.

| Contributor input | Enters as | Reviewed by |
|---|---|---|
| "I know this place / this story" | `uncertain` claim, named source | T3+ |
| "This fact is wrong" | correction report (§6.5) | Editor |
| A photograph | image workflow §5.5 | T3+ |
| A source / archive reference | source workflow §5.4 | Reviewer |
| A GPS waypoint | field-note candidate (§9.5) | Field Observer |

### 7.2 Expert review

One reviewed page with a named reviewer outweighs ten unreviewed ones
(`EEAT_STRATEGY.md` §4). Expert Reviewers — Iskar–Panega geopark, a caving club, the
Lovech regional museum, a university department — sign off within their domain and
are **credited by name**. Sign-off is recorded on the claim (`verifiedBy`) and
rendered in the provenance footer. An expert may not publish and may not review
outside their domain (§3.3).

### 7.3 How contributors gain trust

Restated as the institution's central incentive: **accuracy compounds into
privilege.** The ladder (§3.1) is climbed by shipping claims that survive review
and survive the ground. There is no other path up — not seniority, not volume, not
relationship. The metric that governs promotion is the accepted-claim record with a
low reversion rate (§14). This is deliberately the OSM/Wikipedia model and
deliberately not a hiring model.

### 7.4 Consent and ethics (non-negotiable)

For interviews and oral history, per `EEAT_STRATEGY.md` §7:

| Requirement | Absolute? |
|---|---|
| Written consent before recording | yes |
| Right to review before publication | yes |
| Right to withdraw, at any time, without reason | **yes — withdrawal is absolute and retroactive** |
| Credit by name where wanted, anonymity where not | yes |
| A copy of everything given back to the village | yes |
| Minors: guardian consent + Ethics Officer sign-off | yes |

The Ethics/Consent Officer cannot be overruled on a withdrawal — not by the Board,
not by the Steward. A withdrawn interview's claims are retracted (§6.6) and the
recording destroyed if the informant asks.

### 7.5 Conflict resolution

Disagreements are resolved by **evidence, then process, then office** — never by
seniority alone.

```
1. EVIDENCE      Bring a better source. A sourced claim beats an unsourced opinion, whoever holds it.
2. CORROBORATION Seek a second independent source. Most disputes dissolve here.
3. DISPUTED      Genuinely conflicting sources ─▶ render both (§6.1); no forced verdict.
4. REVIEWER      A domain Reviewer (≥T4) weighs the sources and writes an EDR (§13.1).
5. BOARD         Process or cross-domain conflicts ─▶ Editorial Board.
6. STEWARD       Ties and constitutional questions ─▶ Steward, who may only apply the Constitution, not override a source.
```

Rule that outranks all six: **no authority moves a claim; only evidence does.** The
Steward can break a tie about *process*; the Steward cannot declare a fact true. A
conflict of interest (a contributor writing about their own business, a reviewer
reviewing their own claim) is declared and the person recuses.

---

## 8. Federation — from one village to all of Bulgaria

The 20-year scale assumption. The model is OpenStreetMap's: **a shared constitution,
local editors, regional autonomy inside common rules.**

### 8.1 The unit of federation is the region

| Level | Example | Owns | Bound by |
|---|---|---|---|
| **Project** | Unlocking Bulgaria | the Constitution (§16), the schema, the ledger format, metrics | — |
| **Region** | Lukovit Karst (the first) | its entities, its Regional Editor, its calendar, its contributors | the Constitution + schema |
| **Territory** | Долина на Вит при Ъглен | field cadence, local informants | its Region |

A new region (Rhodopes, Strandzha, the Iskar gorge) is chartered by the Board when
it has: a named Regional Editor (≥T5), ≥1 Field Observer resident in it, and an
adoption of the Constitution verbatim. It inherits every workflow in this document
and **may not fork the schema or the claim model** — that is what keeps thousands of
entities across dozens of regions in one coherent graph.

### 8.2 What is shared vs local

| Shared (immutable across regions) | Local (regional autonomy) |
|---|---|
| The Constitution (§16) | Which entities to prioritise |
| Entity/Claim/Source schema | The editorial calendar |
| Confidence definitions (E1–E5; claim confidence) | Contributor recruitment |
| The trust ladder and its gates | Region-specific expert relationships |
| The generation gates and health rules | Photography and field cadence |
| Ethics and consent rules | Language tier promotion (per demand) |

### 8.3 Federation risks (stated)

| Risk | Mitigation |
|---|---|
| A region lowers the bar to grow faster | metrics are project-wide and public; a region below the §14 thresholds is put under Board review |
| Regions duplicate cross-boundary entities (a river in two regions) | entity ids are project-global; the river is one entity, edited by agreement |
| The Constitution drifts region to region | it is verbatim-adopted, versioned centrally, and amendable only by §15.4 |
| One region's scandal taints all | transparency and the retraction process are the same everywhere; the institution is judged by how it corrects |

Objection: **federating before the first region is proven is premature.** True —
§8 is specified, not activated. It exists so that the first region is built in a
shape that a second can copy, which is the only cheap moment to decide it.

---

## 9. Operational cadence

The project's binding constraint is not writing; it is that **nobody has walked the
ground with a GPS, a camera and a notebook** (`CONTENT_GAP_ANALYSIS.md` §0, §5). The
cadence exists to schedule that walking and make it repeat.

### 9.1 Editorial calendar

| Rhythm | Activity | Owner |
|---|---|---|
| Weekly | review-queue clearance; SLA check | Managing Editor |
| Monthly | metrics review (§14); corrections resolution report; contributor tier changes | Editorial Board |
| Quarterly | AI-citation audit (§14; `EEAT_STRATEGY.md` §10); `sameAs` resolution sweep; seasonal field visit | Board + Field Observers |
| Seasonally (×4/yr) | re-visit each P1 entity; seasonal observation log | Field Observer |
| Annually | road-distance re-verification; Constitution review; RFC backlog triage | Board |
| On trigger | safety re-verification after severe weather/incident (`EEAT_STRATEGY.md` §8) | Editor |

The re-verification triggers are exactly `EEAT_STRATEGY.md` §8; this OS assigns them
owners and puts them on a calendar so they are executed, not intended.

### 9.2 Field-work planning

Field work is scheduled against the backlog of unknowns (§6.4) and the priority
matrix. Two field days carry disproportionate weight and are booked first
(`CONTENT_GAP_ANALYSIS.md` §5):

| Field day | Unblocks | Cadence |
|---|---|---|
| **The driving day** — road distances/times from 6–8 origins, fuel, shops, road quality | 8 pages, 3 journeys | once, then annual re-check |
| **The walking day** — GPS-fix + photograph all nine E1 places | 9 mappable entities, OSM/Commons contributions | once, then seasonal photo re-visits |

A field visit is only "done" when it produces a **field note** (§9.5) — a null
result ("path overgrown in July, turned back") is a valid, valuable outcome
(`EEAT_STRATEGY.md` §3: "nothing signals real presence like a failed attempt").

### 9.3 Photography planning

| Rule | |
|---|---|
| Four visits/year per major entity, timestamped | `EEAT_STRATEGY.md` §3 |
| EXIF capture date retained and published | §5.5 |
| Longitudinal: same viewpoint, same date, across years — un-replicable retroactively | `5_YEAR_SEO_ROADMAP.md` 24-mo |
| Golden-hour bearing computed from coordinates, verified on site | `PROGRAMMATIC_SEO_PLAN.md` T4 |
| No synthetic images on entity pages | §5.5 |

### 9.4 Re-verification cadence (per content class)

Adopted verbatim from `EEAT_STRATEGY.md` §8, with owners:

| Content | Re-verified | Owner |
|---|---|---|
| Access, safety, cave status | 6 mo + after severe weather | Editor |
| Road distances/times | annually | Field Observer |
| Opening hours, business data | 6 mo / on owner report | Editor |
| Trail condition | seasonally | Field Observer |
| History, geology, legends | on new evidence only | Reviewer |
| Coordinates | never (corrections only) | — |

A claim past its re-verification window is flagged **stale** and counts against the
§14 stale-verification metric until an owner re-visits it.

### 9.5 GPS verification / field notes

A field note is a ledger-linked record: date, who, what was checked, what changed,
what was wrong, the GPS track, the photos. It is the atomic unit of Experience
(`EEAT_STRATEGY.md` §3) and the source of `method: "field"` claims. Publish the
boring ones. A coordinate claiming `geo` in schema **must** trace to a field note or
an external register — no inherited village coordinate for a rock 4 km away
(`KNOWLEDGE_GRAPH.md` §7.8).

### 9.6 Interview workflow

```
IDENTIFY informant ─▶ CONSENT (written, §7.4) ─▶ RECORD ─▶ TRANSCRIBE ─▶
   INFORMANT REVIEW ─▶ CLAIMS EXTRACTED (method:interview) ─▶ REVIEW (§5.2) ─▶
      PUBLISH (credited or anonymous) ─▶ COPY RETURNED TO VILLAGE
                                            │
                        WITHDRAW at any point ─▶ retract (§6.6), destroy on request
```

Ethics Officer owns consent, review and withdrawal (§7.4). Managing Editor owns the
editorial extraction. AI may assist transcription (§10) but the informant reviews
the human-verified transcript, never an AI summary presented as their words.

### 9.7 Archive research workflow

```
QUESTION ─▶ LOCATE archive/register ─▶ ACCESS ─▶ TRANSCRIBE with citation ─▶
   SOURCE record created (§5.4) ─▶ CLAIMS (method:archive) ─▶ REVIEW ─▶ PUBLISH
```

The output is named sources — the Ottoman registers, the archaeological reports, the
folklore collections cited *by name* (`CONTENT_GAP_ANALYSIS.md` C1). This is the
work that "converts strong prose into scholarship." A краевед with the regional
archive references converts every 🔶 to 🟢 (`EEAT_STRATEGY.md` §7).

---

## 10. AI in editorial

**AI assists editors. AI is never an editor.** This is a constitutional line
(§16.18), stated here operationally.

### 10.1 What AI may do (always as a proposal a human ratifies)

| AI task | Output | Human who ratifies |
|---|---|---|
| Draft prose from existing claims | a DRAFT | Author (T3+) |
| Extract candidate claims from a source/transcript | CANDIDATE claims (§5.3) | Reviewer |
| Suggest translations (tier-2) | a translation DRAFT | human speaker (§5.6) |
| Consistency checks across the graph | a flag/report | Editor |
| Gap-finding — surface entities with <3 claims, orphans, stale verifications | a backlog list | Managing Editor |
| Dispute-surfacing — flag claims that conflict | a `disputed` candidate | Reviewer |
| Transcription of interview audio | a draft transcript | informant + Ethics Officer (§9.6) |

### 10.2 What AI may never do

| Prohibited | Because |
|---|---|
| Publish anything autonomously | §16.18; every AI output is a proposal |
| Set a claim to `verified` | verification requires a human of tier (§2.3); **AI has no tier** |
| Author a claim without a source | P1 |
| Approve, review, or resolve a dispute | approval is a tier privilege AI cannot hold |
| Generate a fact not traceable to a source | fabrication |
| Present its output as a person's words (interview) | §9.6 |
| Translate and publish editorial/consent documents | §5.6 |

### 10.3 The one rule that governs all AI use

> **AI has no trust tier. It cannot climb the ladder, cannot approve, cannot
> publish. Every AI output enters the pipeline exactly where a T0 anonymous
> submission enters it: as a proposal that a named human of sufficient tier must
> ratify, and is accountable for.** If no human ratifies it, it does not exist on
> the site.

An AI-drafted claim that a human approves becomes that *human's* claim — they are
`verifiedBy`, they are accountable, and their tier decays (§3.2) if it was wrong.
This is what keeps AI a lever and never an author.

---

## 11. Instruments of governance

### 11.1 Editorial Decision Records (EDR)

ADR-style, for editorial decisions. Written when a decision sets precedent: a
disputed claim resolved, a retraction's root cause, a scope call, a source ruled
inadmissible.

```
EDR-NNN  <title>
Status:   proposed | accepted | superseded by EDR-MMM
Date / Author / Domain
Context:  what forced the decision
Decision: what was decided
Evidence: the sources that moved it
Consequences: what this now obliges or forbids
```

EDRs are immutable once accepted (superseded, never edited — P4). They are the
institution's case law: a future editor resolves a like case by precedent, which is
how consistency survives staff turnover.

### 11.2 Editorial RFCs

For **process** changes — a new workflow, a new tier gate, a schema change, a
federation charter, a metric target. Distinct from EDRs (which decide a case) and
from a Constitution amendment (§15.4, higher bar).

```
RFC-NNN  <title>
Author / Date / Status: draft | review | accepted | rejected | withdrawn
Problem / Proposal / Alternatives considered / Objections (author states their own)
Migration: how existing content/contributors move
Decision: Board ratifies; Steward records
```

Comment period ≥ 2 weeks. An RFC that touches the Constitution routes to §15.4.
House style applies: **the author states their own objections** — an RFC with no
stated objection is returned.

### 11.3 Knowledge governance

Ownership of the knowledge itself:

| Question | Answer |
|---|---|
| Who owns a claim? | the project; authored by a named person; sourced to a named source |
| Who owns a contributed fact? | the project, credited to the contributor; the contributor may withdraw an *interview* (§7.4) but not a corroborated public fact |
| Licence of text | declared, reuse-and-citation friendly (`TOPICAL_AUTHORITY_MAP.md` E2) |
| Licence of images | per photograph; Commons uploads CC-BY-SA credited |
| What is given to the commons | Wikidata/OSM/Commons contributions, sourced, connection declared, **never as circular self-citation** (§5.4) |
| What is given back to the village | interview copies, always (§7.4) |

---

## 12. Metrics

Definitions and targets. A metric with no definition is decoration; a target with
no owner is a wish. All are public where possible — publishing your own numbers is
the same trust move as publishing your own corrections.

### 12.1 Quality metrics

| Metric | Definition | Target |
|---|---|---|
| Claims sourced | % of published claims with a resolving `source` | **100% on indexed pages** (hard gate) |
| Unsourced on indexed page | count of claims without source rendered on an indexed Surface | **0, always** (build fails otherwise) |
| Fabrication rate | rejected-for-fabrication ÷ submissions | < 0.5%; any instance triggers review |
| Reviewer independence | % of `verified` claims where author ≠ reviewer | **100%** |
| Synthetic-image incidents on entity pages | count | **0** |

### 12.2 Review SLAs

| Content class | Acknowledge | Decide |
|---|---|---|
| Safety correction | same day | same day |
| Factual correction | 72 h | 7 days |
| New `verified` claim | 72 h | 14 days |
| New `uncertain`/`reported` claim | 72 h | 10 days |
| Interview publication | 1 week | informant-paced (no ceiling) |
| Typo / cosmetic | — | next cycle |

Breach → auto-escalation to Managing Editor. SLA adherence is itself a monthly
metric.

### 12.3 Publishing KPIs

| KPI | Definition | Target (steady state) |
|---|---|---|
| Real entity pages | pages whose subject is an Entity | ↑; from **0 today** to ~34 (region 1) |
| Pages passing all generation gates | `PROGRAMMATIC_SEO_PLAN.md` G1–G5 | 100% of generated pages |
| Views with zero own-facts | Views that only transclude claims | 100% (P5; no drift) |
| Time-to-publish (unblocked claim) | submit → published | median < 14 days |

### 12.4 Contribution metrics

| Metric | Definition | Use |
|---|---|---|
| Accepted-claim record per contributor | accepted ÷ submitted, per domain | drives tier (§3.2) |
| Reversion rate per contributor | claims later corrected/retracted ÷ authored | trust decay (§3.2) |
| Active Field Observers per region | ≥1 required to charter (§8.1) | federation health |
| Interviews recorded (consented, dated) | count | the deadline metric (§6.3) |
| Contributor retention | T3+ active in last 24 mo | institution durability |

### 12.5 Knowledge-health metrics

The dashboard the Board reads monthly. Most are computed by `graph-audit.mjs`.

| Metric | Definition | Target |
|---|---|---|
| % claims sourced | §12.1 | 100% indexed |
| % entities with coordinates | entities with `geo` ÷ entities needing it | → 100% |
| Orphan count | entities with < 3 inbound internal links | **0** (`INTERNAL_LINKING_GRAPH.md` §5) |
| Stale-verification count | claims past their §9.4 re-verification window | trend to 0; never for safety claims |
| Mean correction-resolution time | report → published fix | < 7 days (non-safety) |
| Disputed-claim count | open `disputed` claims | tracked, not zero (some are permanent) |
| Dangling `sameAs` | external ids that no longer resolve | 0 (quarterly sweep) |
| AI-citation rate | of 20 fixed regional questions × 4 assistants, % citing the site | ↑ quarter over quarter (`EEAT_STRATEGY.md` §10) |
| Known-unknowns published | count of stated gaps rendered | > 0 (a site with zero stated unknowns is hiding them) |

The last row is deliberate and counter-intuitive: **a target of "some unknowns,
visibly published" — because a knowledge site claiming to know everything is lying,
and the machines can tell.**

---

## 13. Where this OS could be wrong (self-objection)

Stated because a governance document should carry its own failure conditions.

| Objection | Response | Falsifier |
|---|---|---|
| The tier ladder is bureaucracy for a site with one contributor | In year 1 one person wears all tiers; the ladder costs nothing until the second contributor, when it costs everything if absent | If, at 10 contributors, the ladder has never gated a bad claim, simplify it |
| Two-person review is too slow for a volunteer project | Consistency, not speed, is the goal (P3). `uncertain` claims self-publish; only `verified` waits | If verified-claim throughput stalls the project for a year, allow trusted-T4 single-review with post-hoc audit |
| Federation is designed before the first region is proven | It is specified, not activated (§8.3); the cost is one section now vs an un-forkable schema later | If region 1 fails, federation was moot and harmless |
| AI-as-never-editor forfeits scale | Deliberately. The project's whole value is the refusal to publish the unverified; an autonomous AI editor is that value inverted | If a competitor with autonomous AI becomes the cited source for this region, revisit — but the bet is they won't, because they can't be trusted |
| Metrics like "known-unknowns > 0" invite gaming | Any metric can be gamed; these are read by a Board that also reads the claims | If the number rises while real gaps go unaddressed, audit the gaps not the number |

---

## 14. The one-paragraph version

The technical machine and the data pipeline are built elsewhere
(`KNOWLEDGE_PIPELINE.md`). This document builds the institution that runs them: a
trust ladder climbed only by accuracy, a two-person rule that no one escapes, a
claim ledger where the unknown is first-class and corrections are structural, a
consent regime that treats the dying oral tradition as the one thing with a real
deadline, an AI that proposes and never approves, and a federation shape that lets
one village become a country without forking the rules. The refusal to publish what
cannot be verified is not a mood here; it is enforced at every gate. Everything
above is in service of a single sentence: **the site earns the right to be cited by
being the one source that is specific, sourced, dated, and honest about what it does
not know — and stays that way for twenty years and a thousand editors.**

---

## 15. Constitution — governance of the Constitution itself

The 20 rules in §16 are the immutable core. "Immutable" needs a defined process, or
it is just a word.

1. **Precedence.** Where this OS and any sibling document conflict, the Constitution
   (§16) wins. Where a workflow and the Constitution conflict, the Constitution wins.
2. **Who is bound.** Every editor, volunteer, contributor, reviewer, expert,
   Regional Editor, and AI system — in every region, forever.
3. **Reading.** The Constitution is read literally. Where literal reading is
   genuinely ambiguous, the Steward issues an EDR interpreting it; the interpretation
   binds until amended.
4. **Amendment.** A Constitution amendment requires: an RFC (§11.2) open ≥ 4 weeks;
   a stated reason no existing rule suffices; **unanimous Editorial Board** assent;
   and the Steward's ratification. Rules 1–3, 5, 8, 12, 18 of §16 (the safety,
   sourcing, consent and AI rules) are **entrenched**: amending them additionally
   requires that no entrenched rule is weakened, only clarified. An amendment is
   versioned; the prior text is kept (P4).

---

## 16. THE EDITORIAL CONSTITUTION

Twenty numbered, non-negotiable rules. Every future editor, volunteer, and AI must
follow them. They are the immutable core; they change only by §15.4.

1. **Nothing is published as fact without a resolving source.** A claim without a
   source is not content; it is a question for field work. (P1)

2. **The unknown is published, never hidden.** A stated gap is rendered with equal
   prominence to a known fact. Refusing to guess is the product. (P2)

3. **Safety is never guessed.** Cave access, swimming, fishing, road and trail
   hazards are published only from an authoritative source, or stated as unknown
   with who to ask. Wrong safety information can kill; this rule is entrenched.

4. **No one approves their own claim.** Author ≠ sole reviewer for anything above
   `uncertain`. Independence is recorded in `verifiedBy`.

5. **Consent is absolute.** Interviews require written consent, the right to review,
   and the right to withdraw at any time without reason; withdrawal is retroactive
   and cannot be overruled. A copy is always returned to the village. Entrenched.

6. **Truth is versioned, never overwritten.** Corrections `supersede` and keep
   history. Nothing published is silently deleted; retractions are announced.

7. **A legend is asserted as *told*, never as *true*.** Modern inventions are
   labelled as modern and never mixed with collected folklore.

8. **Every distance, date, and coordinate carries its basis.** Straight-line is
   labelled straight-line; road distance carries a source; `observedAt` records when
   a claim was true. No inherited coordinate stands in for another place. Entrenched.

9. **Confidence is honest.** `verified | reported | uncertain | disputed` reflects
   the evidence, never the desired impression. A `disputed` claim shows both sides.

10. **Sources are independent and non-circular.** The project's own commons
    contributions may never corroborate the project. Connections are declared.

11. **Entity ids are permanent and never reused.** An entity, once minted, exists or
    is deprecated — never overwritten, never recycled.

12. **Trust is earned by accuracy and can decay.** Privilege follows a demonstrated
    accepted-claim record, per domain; it is never granted by request, seniority, or
    volume, and it falls when accuracy falls. Entrenched.

13. **Evidence moves claims; authority moves only process.** No Steward, Board, or
    Editor can declare a fact true by rank. The best source wins, whoever holds it.

14. **Conflicts of interest are declared and recused.** No one reviews their own
    claim, writes as an authority about their own business, or hides a stake.

15. **Every published page can be checked.** Sources, author, reviewer, last
    verification date, and known unknowns are visible. If it cannot be checked, it is
    not published as verified.

16. **The Surface is never the truth.** People and machines argue about claims, not
    renderings. A View owns no facts of its own; it transcludes them.

17. **Consistency outranks speed.** The institution optimises for the editor who
    arrives in year twelve. A slower correct decision beats a faster loose one.

18. **AI proposes; humans ratify. AI is never an editor.** AI holds no trust tier,
    cannot approve, verify, or publish, and every AI output enters as a proposal a
    named accountable human must ratify. Entrenched.

19. **The schema and the claim model are shared and unforkable across regions.** A
    region adopts the Constitution verbatim and inherits every workflow; it may set
    its own priorities but not its own rules of trust.

20. **The institution is judged by how it corrects, not by never erring.** Publish
    your errors, name your reviewers, record your decisions, return your interviews.
    An institution that hides its mistakes has already broken rule 2.
