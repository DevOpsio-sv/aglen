# Site health

Generated 2026-07-27. **This report never fails a build** — correctness is gated by
`graph-audit.mjs` and `site-audit.mjs`; everything here is work, not breakage
(ADR-017).

**31 findings** — 1 high · 21 medium · 9 low.

## Coverage

| Measure | Value |
| --- | --- |
| Entities | 32 (28 published, 4 nodes) |
| Regions | 1 |
| Sourced claims (live) | 109 of 109 |
| Sources | 15 · evidence records 1 |
| Stated unknowns | 44 |
| Open questions | 1 |
| Corrections published | 0 |
| Pages with an external identifier | 11/28 (39%) |
| Sited things with a GPS fix | 10/18 (56%) |
| Pages with a photograph of their own | 0/28 (0%) |
| Pages carrying other names | 6/28 (21%) |
| Average outbound links per page | 4.89 |
| Search index entries | 28 · aliases resolving 14/14 |
| Redirect rules | 32 |
| Guides · businesses | 6 · 12 |
| Languages served · knowledge tier | 14 · 2 |
| Bundle (gzipped JS) | 439.8 kB (+0.0% since last record) |

## By namespace

| Namespace | Published | Status |
| --- | --- | --- |
| /place/ | 17 | live |
| /history/ | 6 | live |
| /legend/ | 3 | live |
| /person/ | 1 | live |
| /route/ | 0 | declared, dormant — publishes nothing until an entity claims it |
| /tradition/ | 0 | declared, dormant — publishes nothing until an entity claims it |
| /species/ | 0 | declared, dormant — publishes nothing until an entity claims it |

## By region

| Region | Entities | Published | Root | Measures from |
| --- | --- | --- | --- | --- |
| The Lukovit Karst (`karst/lukovit`) | 32 | 28 | `karst-lukovit` | `aglen` |

## By kind

| Kind | Records | Publishes under |
| --- | --- | --- |
| period | 6 | /history/ |
| settlement | 5 | /place/ |
| region | 3 | /place/ |
| waterBody | 3 | /place/ |
| landform | 3 | /place/ |
| legend | 3 | /legend/ |
| cave | 2 | /place/ |
| archaeologicalSite | 2 | /place/ |
| province | 1 | /place/ |
| municipality | 1 | /place/ |
| geopark | 1 | /place/ |
| building | 1 | /place/ |
| person | 1 | /person/ |

## Review queue

_Empty — every live statement has been checked against its sources within 365 days._

## Findings

### discoverability (2)

| Severity | Subject | Note |
| --- | --- | --- |
| medium | vit-river | 2 inbound link(s); 3 is where a page stops depending on its index. |
| medium | trifon-kunev | 1 inbound link(s); 3 is where a page stops depending on its index. |

### journeys (1)

| Severity | Subject | Note |
| --- | --- | --- |
| high | trifon-kunev | 1 outbound link(s) — a reader arriving here has nowhere to go next (rule 23). |

### schema (17)

| Severity | Subject | Note |
| --- | --- | --- |
| medium | karst-lukovit | no external identifier (Wikidata / OSM / Commons) — nothing reconciles this page to the wider graph. |
| medium | iskar-panega | no external identifier (Wikidata / OSM / Commons) — nothing reconciles this page to the wider graph. |
| medium | dupkata | no external identifier (Wikidata / OSM / Commons) — nothing reconciles this page to the wider graph. |
| medium | sloncheto | no external identifier (Wikidata / OSM / Commons) — nothing reconciles this page to the wider graph. |
| medium | chervena-stena | no external identifier (Wikidata / OSM / Commons) — nothing reconciles this page to the wider graph. |
| medium | rachkov-vir | no external identifier (Wikidata / OSM / Commons) — nothing reconciles this page to the wider graph. |
| medium | kaleto | no external identifier (Wikidata / OSM / Commons) — nothing reconciles this page to the wider graph. |
| medium | st-archangel-michael | no external identifier (Wikidata / OSM / Commons) — nothing reconciles this page to the wider graph. |
| medium | dvukrakite-senki | no external identifier (Wikidata / OSM / Commons) — nothing reconciles this page to the wider graph. |
| medium | zlatnata-brazdichka | no external identifier (Wikidata / OSM / Commons) — nothing reconciles this page to the wider graph. |
| medium | iglen-grad-golyama | no external identifier (Wikidata / OSM / Commons) — nothing reconciles this page to the wider graph. |
| medium | deep-time | no external identifier (Wikidata / OSM / Commons) — nothing reconciles this page to the wider graph. |
| medium | prehistory | no external identifier (Wikidata / OSM / Commons) — nothing reconciles this page to the wider graph. |
| medium | flint-workshops | no external identifier (Wikidata / OSM / Commons) — nothing reconciles this page to the wider graph. |
| medium | thracians | no external identifier (Wikidata / OSM / Commons) — nothing reconciles this page to the wider graph. |
| medium | ottoman-registers | no external identifier (Wikidata / OSM / Commons) — nothing reconciles this page to the wider graph. |
| medium | revival | no external identifier (Wikidata / OSM / Commons) — nothing reconciles this page to the wider graph. |

### seo descriptions (2)

| Severity | Subject | Note |
| --- | --- | --- |
| medium | sloncheto (bg) | description is 68 characters — too short to answer a query. |
| medium | sloncheto (en) | description is 69 characters — too short to answer a query. |

### summaries (9)

| Severity | Subject | Note |
| --- | --- | --- |
| low | devetashka | bg summary is 72 characters; under 80 it rarely says anything specific. |
| low | devetashka | en summary is 74 characters; under 80 it rarely says anything specific. |
| low | sloncheto | bg summary is 68 characters; under 80 it rarely says anything specific. |
| low | sloncheto | en summary is 69 characters; under 80 it rarely says anything specific. |
| low | chervena-stena | bg summary is 70 characters; under 80 it rarely says anything specific. |
| low | chervena-stena | en summary is 75 characters; under 80 it rarely says anything specific. |
| low | rachkov-vir | bg summary is 74 characters; under 80 it rarely says anything specific. |
| low | zlatnata-brazdichka | bg summary is 75 characters; under 80 it rarely says anything specific. |
| low | zlatnata-brazdichka | en summary is 77 characters; under 80 it rarely says anything specific. |

