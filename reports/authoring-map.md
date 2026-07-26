# Where new knowledge goes

**Generated from `src/graph/registry.ts` by `scripts/health-report.mjs`. Do not edit.**

You have found a cave, a legend, a person, a document, a custom, an orchid. This
table says which file it goes in and what its record has to carry. If the answer
is not here, the thing needs a new namespace — that is an ADR in
`docs/MASTER_ARCHITECTURE_BLUEPRINT.md` §18, not a new folder.

## The kinds

| If it is a… | use `kind` | its page lives at | occupies ground? |
| --- | --- | --- | --- |
| archaeologicalSite | `archaeologicalSite` | /place/<slug>/ | yes — it needs its own GPS fix, never an inherited one (rule 16) |
| building | `building` | /place/<slug>/ | yes — it needs its own GPS fix, never an inherited one (rule 16) |
| business | `business` | no entity page — the directory or the calendar owns that URL | yes — it needs its own GPS fix, never an inherited one (rule 16) |
| cave | `cave` | /place/<slug>/ | yes — it needs its own GPS fix, never an inherited one (rule 16) |
| event | `event` | /history/<slug>/ | no |
| geopark | `geopark` | /place/<slug>/ | yes — it needs its own GPS fix, never an inherited one (rule 16) |
| landform | `landform` | /place/<slug>/ | yes — it needs its own GPS fix, never an inherited one (rule 16) |
| legend | `legend` | /legend/<slug>/ | no |
| municipality | `municipality` | /place/<slug>/ | yes — it needs its own GPS fix, never an inherited one (rule 16) |
| period | `period` | /history/<slug>/ | no |
| person | `person` | /person/<slug>/ | no |
| protectedArea | `protectedArea` | /place/<slug>/ | yes — it needs its own GPS fix, never an inherited one (rule 16) |
| province | `province` | /place/<slug>/ | yes — it needs its own GPS fix, never an inherited one (rule 16) |
| region | `region` | /place/<slug>/ | yes — it needs its own GPS fix, never an inherited one (rule 16) |
| route | `route` | /route/<slug>/ | yes — it needs its own GPS fix, never an inherited one (rule 16) |
| settlement | `settlement` | /place/<slug>/ | yes — it needs its own GPS fix, never an inherited one (rule 16) |
| species | `species` | /species/<slug>/ | no |
| spring | `spring` | /place/<slug>/ | yes — it needs its own GPS fix, never an inherited one (rule 16) |
| tradition | `tradition` | /tradition/<slug>/ | no |
| waterBody | `waterBody` | /place/<slug>/ | yes — it needs its own GPS fix, never an inherited one (rule 16) |

## The regions

A region is one boundary with three roles at once: the data partition, the
editorial unit and the physiographic subtree (ADR-009). Put the record in the
partition whose landscape actually contains the thing.

| Region | Records live in | Root entity | Distances measured from |
| --- | --- | --- | --- |
| The Lukovit Karst | `src/graph/karst/lukovit/` | `karst-lukovit` | `aglen` |

## What a record must carry

**Entity** (`entities.json`) — `id` (stable forever, never reused), `kind`,
`slug`, `schemaType`, `confidence`, `relations` (may be empty), and either a
`name` or a `contentRef` that resolves one. A page needs `page.path`,
`page.priority` and `page.status`. Coordinates are its own fix or absent.

**Claim** (`claims.json`) — `id`, `entityId`, `statement` (bg required), at
least one `source`, a `confidence`, a `status` and a `created` date. A claim on
a published page also needs `reviewedAt`. One fact, one claim: two facts are two
records.

**Source** (`sources.json`) — `id`, `kind`, `slug`, `title`, `citation` and a
`verification`. A source marked `unverified` must say in its `note` what is not
established.

**Media** (on the entity's `media` list) — a licence, a capture date, a credit
and a `depicts`, all four, or the asset is held and not rendered (rule 45).
Never `aiGenerated` on a published page.

## Before you commit

```
npm run validate     # records only, seconds
npm run build        # the full gate set
```

`npm run new:record` scaffolds a valid stub for any of the above.

