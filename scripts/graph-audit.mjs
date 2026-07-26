import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { publicAssetExists, srcModule } from "./lib/load-module.mjs";

// ─────────────────────────────────────────────────────────────
// graph-audit — the single build gate for the knowledge graph (Constitution
// rule 29; MASTER_ARCHITECTURE_BLUEPRINT §4.3, §15). It composes the rule-sets
// that apply at M3 into one enforcement point so their numbering never drifts:
//
//   • Graph health   — KNOWLEDGE_GRAPH §7 (orphans, reciprocity, coordinate
//                      inheritance, >60 km edges without a reason, one home per
//                      subject).
//   • Generation     — a published page must resolve a name, a description and a
//                      containment path, and carry an honest schema type (never
//                      the TouristDestination view type, C6).
//   • Linking        — every derived internal link resolves to a page that
//                      exists (zero 301-hops); every published page is reachable
//                      from /karst/.
//   • References     — every relation target and parent resolves (V3); symmetric
//                      edges are reciprocal (V7).
//
//   • Provenance    — the claim ledger (M4): every claim resolves to an entity
//                      and to real sources (V3/V4); a page in the knowledge
//                      namespaces has earned its three claims (rule 15); a
//                      dispute has at least two sides (V14); no claim asserts
//                      more certainty than its sources allow (rules 6–8).
//   • Claims        — (M4B) no duplicate statement on one entity, no branching
//                      supersede chain, no published claim that has never been
//                      reviewed.
//   • Sources       — (M4B) unique slugs, no orphan source, a verified source
//                      dated, a source page that has earned its three claims.
//   • Evidence      — (M4B) every artifact resolves to one source and to real
//                      claims (V3/V6), and a regenerable artifact still hashes
//                      to what its record says (V-hash).
//
// The four sit here rather than in scripts of their own because §4.3 makes this
// file the single enforcement point: four scripts would be four numbering schemes
// drifting apart, which is the defect this architecture exists to remove. They
// report separately in the audit report below.
//
// Missing coordinates, media, story and gallery are WARNINGS, not gates — they
// mark field-day work, not defects.
// ─────────────────────────────────────────────────────────────

const rootDir = process.cwd();
const reportsDir = path.join(rootDir, "reports");
const reportPath = path.join(reportsDir, "graph-audit.md");

const gates = [];
const warnings = [];
const gate = (rule, message) => gates.push({ rule, message });
const warn = (rule, message) => warnings.push({ rule, message });

const graph = srcModule("graph", "index.ts");
const ledger = srcModule("graph", "ledger.ts");
const media = srcModule("graph", "media.ts");
const registry = srcModule("graph", "registry.ts");
const content = srcModule("content.ts");
// The build's own date, used only to reject records dated in the future. Nothing
// derived from it is ever published — a build date is not a review date.
const TODAY = new Date().toISOString().slice(0, 10);
const LANGS = ["bg", "en"]; // the full knowledge tier (Constitution rule 43)

// Where a published page may live, and where rule 15 gates rather than warns —
// both read from `src/graph/registry.ts` (M5, ADR-016) rather than restated here.
// Before M5 this file held its own copy of the namespace list, which is how an
// audit comes to check four namespaces while the site publishes five.
const PAGE_NAMESPACES = registry.PUBLISHED_PATH_PREFIXES;
const KNOWLEDGE_NAMESPACES = registry.NAMESPACES.filter((ns) => ns.claimGate).map((ns) => ns.prefix);
const REGIONS = registry.REGIONS;

const entities = graph.entities;
const byId = new Map(entities.map((e) => [e.id, e]));

// ── 0. Assembly errors (duplicate ids/slugs/paths, malformed records, bad parents)
for (const problem of graph.assembleErrors) gate("records", problem);

// ── 1. References — every relation target and parent resolves (V3)
for (const entity of entities) {
  if (entity.parent && !byId.has(entity.parent)) gate("reference", `"${entity.id}" parent "${entity.parent}" does not exist.`);
  for (const relation of entity.relations) {
    if (!byId.has(relation.target)) gate("reference", `"${entity.id}" relation ${relation.type} → "${relation.target}" does not exist.`);
    if (relation.km !== undefined && relation.km > 60 && !relation.reason) {
      gate("health", `"${entity.id}" ${relation.type} → "${relation.target}" is ${relation.km} km and carries no reason (KNOWLEDGE_GRAPH §7 rule 4).`);
    }
  }
}

// ── 2. Reciprocity — symmetric edges render both ways with identical values (V7)
const SYMMETRIC = new Set(["sameFormation", "sameWatershed", "combinesWellWith", "nearby"]);
for (const entity of entities) {
  for (const relation of graph.relationsOf(entity)) {
    if (!SYMMETRIC.has(relation.type)) continue;
    const target = byId.get(relation.target);
    if (!target) continue;
    const mirrored = graph.relationsOf(target).some((edge) => edge.type === relation.type && edge.target === entity.id);
    if (!mirrored) gate("health", `Reciprocity broken: "${entity.id}" ${relation.type} "${relation.target}" is not mirrored back.`);
  }
}

// ── 3. Coordinate inheritance — an entity claiming geo has its own fix (rule 16)
// The fix a record is most likely to have copied is its region's base settlement,
// so that is what is compared against — per region, from the registry, rather than
// against Aglen by name.
for (const region of REGIONS) {
  const base = region.baseEntityId ? byId.get(region.baseEntityId) : undefined;
  const basePoint = base && graph.entityPoint(base);
  if (!basePoint) continue;
  for (const entity of entities) {
    if (entity.id === base.id) continue;
    if (graph.regionOf(entity)?.id !== region.id) continue;
    const point = graph.entityPoint(entity);
    if (point && point.lat === basePoint.lat && point.lon === basePoint.lon) {
      gate("health", `"${entity.id}" claims the coordinates of "${base.id}" — inherited, not its own fix (rule 16).`);
    }
  }
}

// ── 4. Generation — a published page resolves name + description + honest schema
for (const entity of entities) {
  const page = entity.page;
  if (!page || page.status !== "published") continue;
  if (!PAGE_NAMESPACES.some((namespace) => page.path.startsWith(namespace))) {
    gate("generation", `"${entity.id}" page path "${page.path}" is outside the published namespaces ${PAGE_NAMESPACES.join(", ")} (rule 18).`);
  }
  if (/tourist ?destination/i.test(entity.schemaType)) {
    gate("generation", `"${entity.id}" uses the view type "${entity.schemaType}"; entity pages carry Place/Landform/Cave types (C6).`);
  }
  for (const lang of LANGS) {
    if (!graph.entityName(entity, lang).trim()) gate("generation", `"${entity.id}" has no ${lang} name.`);
    if (!graph.entityShortText(entity, lang).trim()) gate("generation", `"${entity.id}" has no ${lang} description to render (would ship an empty page, rule 28).`);
  }
  if (!entity.parent && !page.breadcrumbRoot) {
    gate("generation", `"${entity.id}" has no parent and is not a breadcrumb root — it has no containment path.`);
  }
}

// ── 5. Linking — derived links resolve to existing published pages (zero 301-hops)
const pagePaths = new Set(entities.filter((e) => e.page?.status === "published").map((e) => e.page.path));
for (const entity of entities) {
  if (entity.page?.status !== "published") continue;
  for (const link of graph.derivedLinks(entity, "bg")) {
    if (!pagePaths.has(link.path)) gate("linking", `"${entity.id}" derives a link to "${link.path}" which is not a published page path.`);
  }
}

// ── 6. Orphans — every published page is reachable from a region root (rule 17)
// A hub lists its containment subtree, so a place is reachable via its ancestors;
// cross-tree entities are reachable through the root's typed relations. The walk
// starts at every declared region root, so a second region is checked the moment
// it is registered and nothing has to remember to add it here.
const reachable = new Set();
function walkFrom(id) {
  if (!byId.has(id) || reachable.has(id)) return;
  reachable.add(id);
  for (const child of graph.childrenOf(id)) walkFrom(child.id);
  for (const relation of graph.relationsOf(byId.get(id))) walkFrom(relation.target);
}
for (const region of REGIONS) {
  if (!byId.has(region.rootEntityId)) {
    gate("records", `Region "${region.id}" names root entity "${region.rootEntityId}", which is not in the graph (registry.ts).`);
    continue;
  }
  walkFrom(region.rootEntityId);
}
for (const entity of entities) {
  if (entity.page?.status === "published" && !reachable.has(entity.id)) {
    gate("orphan", `"${entity.id}" (${entity.page.path}) is not reachable from any region root.`);
  }
}

// ── 7. Broken images — a published page's transcluded hero must exist
for (const entity of entities) {
  if (entity.page?.status !== "published") continue;
  const placeId = entity.contentRef?.placeId;
  if (placeId) {
    const place = content.contentByLanguage.bg.placesList.find((p) => p.id === placeId);
    if (place && !publicAssetExists(place.image)) gate("assets", `"${entity.id}" transcludes missing image ${place.image}.`);
  }
}

// ── 7b. Provenance — the claim ledger (M4) ───────────────────
// Records that failed structural validation (bad ids, a claim with no source, a
// dispute with a claim that names no interpretation) never reach the graph.
for (const problem of ledger.ledgerErrors) gate("ledger", problem);

const sourceIds = new Set(ledger.sources.map((source) => source.id));
const disputeIds = new Set(ledger.disputes.map((dispute) => dispute.id));

// V3/V4 — every claim resolves to an entity and to real sources, both ways.
for (const claim of ledger.claims) {
  if (!byId.has(claim.entityId)) gate("provenance", `Claim "${claim.id}" is about "${claim.entityId}", which is not an entity.`);
  for (const sourceId of claim.sources) {
    if (!sourceIds.has(sourceId)) gate("provenance", `Claim "${claim.id}" cites "${sourceId}", which is not a source (V1).`);
  }
  if (claim.disputeOf && !disputeIds.has(claim.disputeOf)) {
    gate("provenance", `Claim "${claim.id}" belongs to dispute "${claim.disputeOf}", which does not exist.`);
  }
  if (claim.supersedes && !ledger.claimById(claim.supersedes)) {
    gate("provenance", `Claim "${claim.id}" supersedes "${claim.supersedes}", which does not exist — a correction must keep what it corrects (rule 10).`);
  }
  // Rules 6–8: certainty may not exceed what the sources support. A claim whose
  // every source has unestablished provenance cannot call itself verified.
  const cited = claim.sources.map((id) => ledger.sourceById(id)).filter(Boolean);
  if (claim.confidence === "verified" && cited.length > 0 && cited.every((source) => source.verification === "unverified")) {
    gate("provenance", `Claim "${claim.id}" is "verified" but every source it cites has unestablished provenance (rule 8).`);
  }
}

// V14 — a dispute is two readings shown side by side; one side is not a dispute.
for (const dispute of ledger.disputes) {
  if (!byId.has(dispute.entityId)) gate("provenance", `Dispute "${dispute.id}" is about "${dispute.entityId}", which is not an entity.`);
  const readings = ledger.claimsInDispute(dispute.id);
  if (readings.length < 2) gate("provenance", `Dispute "${dispute.id}" has ${readings.length} reading(s); a dispute renders at least two, with equal prominence (V14).`);
}

// Rule 15 — an entity with fewer than three live claims is a section of its
// parent, not a page. Enforced as a gate in the M4 namespaces, which were built
// on the ledger; the M3 /place/ pages predate it and are reported as warnings so
// that a page which already ranks is never silently unpublished by an audit.
for (const entity of entities) {
  if (entity.page?.status !== "published") continue;
  const count = ledger.claimCount(entity.id);
  const isKnowledge = KNOWLEDGE_NAMESPACES.some((namespace) => entity.page.path.startsWith(namespace));
  if (count >= 3) continue;
  if (isKnowledge) gate("provenance", `"${entity.id}" publishes ${entity.page.path} with ${count} claim(s); three are required to earn a page (rule 15).`);
  else warn("claims", `"${entity.id}" (${entity.page.path}) has ${count} claim(s); rule 15 wants three.`);
}

// An aspect page must hang off a published entity page — depth 3 is an aspect of
// something, never a page in its own right (`CONTENT_HIERARCHY.md` §3).
for (const entity of entities) {
  for (const aspectPage of ledger.aspectPagesFor(entity.id)) {
    if (entity.page?.status !== "published" || !entity.page.path.startsWith("/place/")) {
      gate("provenance", `"${entity.id}" earns the "${aspectPage.aspect}" aspect page but has no published /place/ page to hang it off.`);
    }
  }
}

// ── 7c. The claim audit (M4B) ────────────────────────────────
// Structural validity is already enforced record-by-record in `claims.ts`. What
// belongs here is everything a single record cannot know about itself.
const claimIds = new Set(ledger.claims.map((claim) => claim.id));
const seenStatements = new Map(); // entityId+bg statement → first claim id
for (const claim of ledger.claims) {
  // A duplicate statement on one entity is two records the ledger will disagree
  // with itself about the moment one of them is corrected.
  const key = `${claim.entityId}::${claim.statement.bg.trim().toLowerCase()}`;
  if (seenStatements.has(key)) {
    gate("claims", `Claim "${claim.id}" repeats the statement of "${seenStatements.get(key)}" on the same entity — one fact, one record.`);
  } else {
    seenStatements.set(key, claim.id);
  }
  // A superseding claim must be about the same entity as the one it replaces, or
  // the correction silently moves a fact from one page to another.
  if (claim.supersedes) {
    const replaced = ledger.claimById(claim.supersedes);
    if (replaced && replaced.entityId !== claim.entityId) {
      gate("claims", `Claim "${claim.id}" supersedes "${claim.supersedes}", which is about a different entity ("${replaced.entityId}").`);
    }
  }
  // Two claims correcting the same claim is an ambiguous history: which one is
  // current? The supersede chain must be linear.
  const rivals = ledger.claims.filter((other) => other.supersedes === claim.id);
  if (rivals.length > 1) {
    gate("claims", `Claim "${claim.id}" is superseded by ${rivals.length} claims (${rivals.map((r) => r.id).join(", ")}); a supersede chain is linear.`);
  }
  // Every claim on a published page carries a review date or the page's "last
  // reviewed" line is guessing on the reader's behalf.
  const host = byId.get(claim.entityId);
  if (claim.status === "published" && host?.page?.status === "published" && !claim.reviewedAt) {
    gate("claims", `Claim "${claim.id}" renders on ${host.page.path} but has never been marked reviewed.`);
  }
}

// ── 7d. The source audit (M4B) ───────────────────────────────
const sourceSlugs = new Map();
for (const source of ledger.sources) {
  if (sourceSlugs.has(source.slug)) {
    gate("sources", `Sources "${source.id}" and "${sourceSlugs.get(source.slug)}" share the slug "${source.slug}" — they would claim the same /source/ URL.`);
  }
  sourceSlugs.set(source.slug, source.id);
  // An orphan source is a build failure, not a warning (M4B, Part 10): a record
  // nobody cites is either a mistake or a claim somebody forgot to write, and
  // both are things the build should refuse to ship past.
  if (ledger.citedBy(source.id).length === 0) {
    gate("sources", `Source "${source.id}" is cited by no claim — remove it or write the claim that rests on it.`);
  }
  // A source we say we checked must say when we checked it.
  if (source.verification === "verified" && !source.accessedAt) {
    gate("sources", `Source "${source.id}" is marked verified but names no date on which it was checked.`);
  }
  // A source page that renders nothing but its own citation is a thin page.
  if (ledger.sourceHasPage(source.id) && ledger.liveClaimsFromSource(source.id).length < 3) {
    gate("sources", `Source "${source.id}" publishes a page with fewer than three live claims (rule 15).`);
  }
}

// ── 7e. The evidence audit (M4B) ─────────────────────────────
// V6 (no orphan evidence), V3 (every reference resolves) and V-hash (a mutated
// artifact fails the build) are all enforced here, on the assembled ledger.
for (const artifact of ledger.evidence) {
  if (!ledger.sourceById(artifact.source)) {
    gate("evidence", `Evidence "${artifact.id}" belongs to source "${artifact.source}", which does not exist (V3).`);
  }
  for (const claimId of artifact.claims) {
    if (!claimIds.has(claimId)) gate("evidence", `Evidence "${artifact.id}" supports "${claimId}", which is not a claim (V3).`);
  }
  if (artifact.claims.length === 0) gate("evidence", `Evidence "${artifact.id}" supports no claim (V6).`);
  // An artifact cannot have been observed before the thing it supports existed
  // in the ledger… but it very much can predate it, so only the future is wrong.
  if (artifact.observedAt > TODAY) gate("evidence", `Evidence "${artifact.id}" is dated ${artifact.observedAt}, in the future.`);
  if (artifact.href && artifact.href.startsWith("/") && !publicAssetExists(artifact.href) && !artifact.href.endsWith("/")) {
    gate("evidence", `Evidence "${artifact.id}" points at ${artifact.href}, which is not in public/.`);
  }
}

// V-hash — regenerable evidence is re-derived and compared. The one artifact this
// project holds is the straight-line distance table, and it is regenerable by
// construction: anyone with the published coordinates can recompute it. If a
// coordinate changes, this hash moves and the build stops until a human has
// looked at the measurement again.
//
// The fingerprint is computed PER REGION (M5). It was global, which coupled every
// region's evidence to every other region's coordinates: registering a second
// region — adding entities the first region's measurement never described —
// invalidated the first region's hash and stopped the build. That is precisely the
// cross-region coupling ADR-009 exists to prevent, and it was found by adding a
// second region and watching the build refuse it. A measurement describes the
// distances inside one partition; nothing outside that partition may move it.
function measurementFingerprint(regionId) {
  const sited = entities
    .filter((entity) => graph.entityPoint(entity) && graph.regionOf(entity)?.id === regionId)
    .sort((a, b) => a.id.localeCompare(b.id));
  const rows = [];
  for (let i = 0; i < sited.length; i += 1) {
    for (let j = i + 1; j < sited.length; j += 1) {
      const km = graph.straightLineKmBetween(sited[i], sited[j]);
      if (km !== undefined) rows.push(`${sited[i].id}|${sited[j].id}|${km.toFixed(3)}`);
    }
  }
  return `sha256:${crypto.createHash("sha256").update(rows.join("\n")).digest("hex").slice(0, 32)}`;
}

/** The region an artifact describes: the region of the entities its claims are about. */
function regionOfEvidence(artifact) {
  for (const claimId of artifact.claims) {
    const claim = ledger.claimById(claimId);
    const host = claim && byId.get(claim.entityId);
    const region = host && graph.regionOf(host);
    if (region) return region.id;
  }
  return undefined;
}

for (const artifact of ledger.evidence) {
  if (artifact.kind !== "measurement" || !artifact.hash) continue;
  const regionId = regionOfEvidence(artifact);
  if (!regionId) {
    gate("evidence", `Evidence "${artifact.id}" is a measurement but its claims resolve to no region, so it cannot be re-derived.`);
    continue;
  }
  const expected = measurementFingerprint(regionId);
  if (artifact.hash !== expected) {
    gate("evidence", `Evidence "${artifact.id}" records ${artifact.hash} but the measurement for region "${regionId}" now computes to ${expected} — re-check the measurement and restamp it (V-hash).`);
  }
}

// ── 7c. Click depth — every page within three clicks of the front door ───────
// The site's own chrome links each namespace index from the Справочник and the
// footer, so an index is one click from anywhere. From there an index lists its
// entities (two) and an entity links its neighbours and its aspects (three).
// Anything deeper is unreachable in practice however well it is linked.
const indexed = new Map(); // entityId → clicks from the home page
const queue = [];
for (const namespace of PAGE_NAMESPACES) {
  for (const entity of entities) {
    if (entity.page?.status !== "published" || !entity.page.path.startsWith(namespace)) continue;
    // /karst/ is itself an index page (one click); everything it lists is two.
    const depth = entity.page.path === "/karst/" ? 1 : 2;
    if (!indexed.has(entity.id) || indexed.get(entity.id) > depth) {
      indexed.set(entity.id, depth);
      queue.push(entity.id);
    }
  }
}
while (queue.length > 0) {
  const id = queue.shift();
  const depth = indexed.get(id);
  if (depth >= 3) continue;
  for (const link of graph.derivedLinks(byId.get(id), "bg")) {
    if (!indexed.has(link.entityId) || indexed.get(link.entityId) > depth + 1) {
      indexed.set(link.entityId, depth + 1);
      queue.push(link.entityId);
    }
  }
}
for (const entity of entities) {
  if (entity.page?.status !== "published") continue;
  const depth = indexed.get(entity.id);
  if (depth === undefined || depth > 3) gate("depth", `"${entity.id}" (${entity.page.path}) is ${depth ?? "not"} click(s) from the home page; the limit is three.`);
  for (const aspectPage of ledger.aspectPagesFor(entity.id)) {
    if ((depth ?? 99) + 1 > 3) gate("depth", `"${entity.id}" aspect "${aspectPage.aspect}" sits at ${(depth ?? 99) + 1} clicks; the limit is three.`);
  }
}

// ── 7f. Media (M5, ADR-019) ──────────────────────────────────
// Constitution rule 45 as a build gate rather than a hope: an asset a page
// actually renders carries a licence, a capture date, a credit and a depicted
// entity, and no machine-made image reaches a published page (V11). An asset that
// carries less is not deleted and is not an error — it is simply not rendered, and
// is reported below so somebody can go and find its date.
for (const { entity, asset, index } of graph.allMedia()) {
  const where = `"${entity.id}" media[${index}] (${asset.src})`;
  if (!publicAssetExists(asset.src)) gate("media", `${where} is not in public/.`);
  for (const depicted of asset.depicts ?? []) {
    if (!byId.has(depicted)) gate("media", `${where} depicts "${depicted}", which is not an entity (V3).`);
  }
  if (asset.capturedIn && !byId.has(asset.capturedIn)) gate("media", `${where} was captured in "${asset.capturedIn}", which is not an entity (V3).`);
  if (asset.evidence && !ledger.evidenceById(asset.evidence)) gate("media", `${where} names evidence "${asset.evidence}", which does not exist (V3).`);
  if (asset.capturedAt && asset.capturedAt > TODAY) gate("media", `${where} is dated ${asset.capturedAt}, in the future.`);
  if (asset.supersedes && !(entity.media ?? []).some((other) => other.id === asset.supersedes)) {
    gate("media", `${where} supersedes "${asset.supersedes}", which is not among this entity's assets — a supersede keeps what it replaces (rule 10).`);
  }
  // The hero of a published page is the one asset a visitor cannot avoid seeing.
  if (entity.page?.status === "published" && asset.role === "hero" && !media.isRenderable(asset)) {
    gate("media", `${where} is the hero of ${entity.page.path} but is missing ${media.renderBlockers(asset).join(", ")} (rule 45).`);
  }
  if (!media.isRenderable(asset) && asset.role !== "hero") {
    warn("media", `${where} is held but not rendered: it is missing ${media.renderBlockers(asset).join(", ")} (rule 45).`);
  }
}

// ── 7g. Discovery (M5, Part 5) ───────────────────────────────
// Rule 23: nothing ends on a full stop. A published page that nothing else links
// to is reachable only from its index, which means a reader who is not already
// looking for it will never meet it. That is the "isolated content" failure, and
// it is a gate because it is exactly the defect a growing graph produces silently.
const inboundCount = new Map();
for (const entity of entities) {
  if (entity.page?.status !== "published") continue;
  for (const link of graph.derivedLinks(entity, "bg")) {
    inboundCount.set(link.entityId, (inboundCount.get(link.entityId) ?? 0) + 1);
  }
}
for (const entity of entities) {
  if (entity.page?.status !== "published") continue;
  if (REGIONS.some((region) => region.rootEntityId === entity.id)) continue; // a root is linked from the chrome
  const inbound = inboundCount.get(entity.id) ?? 0;
  if (inbound === 0) {
    gate("discovery", `"${entity.id}" (${entity.page.path}) is linked from no other page — it is reachable only from its index (rule 23).`);
  } else if (inbound < 3) {
    warn("discovery", `"${entity.id}" has ${inbound} inbound link(s); three is where a page stops depending on its index.`);
  }
}

// ── 8. Warnings — field-day gaps, never gates (mission "warnings only")
// Only things that occupy ground can be missing a GPS fix. A legend, a person or
// a historical period has no coordinates to lack, and reporting one would train
// the reader of this report to ignore it. Which kinds those are is the registry's
// answer, not a second list kept here (M5, ADR-016).
for (const entity of entities) {
  if (entity.page?.status !== "published") continue;
  const isSited = registry.KIND_IS_SITED[entity.kind] === true;
  if (isSited && !graph.entityPoint(entity) && !(entity.geo && entity.geo.linear)) warn("coordinates", `"${entity.id}" has no coordinates yet (needs a GPS fix).`);
  if (graph.derivedLinks(entity, "bg").filter((l) => /км|km/.test(l.label)).length === 0 && graph.entityPoint(entity)) warn("nearby", `"${entity.id}" surfaces no nearby entity.`);
  if (graph.entitySameAs(entity).length === 0) warn("sameAs", `"${entity.id}" has no external identifier (Wikidata/OSM/Commons).`);
  if (!graph.entityHeroAsset(entity)) warn("media", `"${entity.id}" has no photograph of its own; the page borrows a plate for its kind.`);
  // A historical name that says nothing about when it was used is a name without
  // a period, which is the one thing a historical name is for.
  for (const alias of graph.aliasesOfKind(entity, "historical")) {
    if (!alias.period && !alias.note) warn("aliases", `"${entity.id}" carries the historical name "${alias.name.bg}" with no period and no note.`);
  }
}

// ── Report ───────────────────────────────────────────────────
const aspectPageCount = entities.reduce((total, entity) => total + ledger.aspectPagesFor(entity.id).length, 0);
const byConfidence = (value) => ledger.claims.filter((claim) => claim.confidence === value).length;
const bySourceVerification = (value) => ledger.sources.filter((source) => source.verification === value).length;
const reviewDates = ledger.claims.map((claim) => claim.reviewedAt).filter(Boolean).sort();
// Which trust signals the pages have actually earned. A signal that never fires
// is not a bug: it is the sourcing this project has not done yet, in one line.
const signalTally = {};
for (const signal of ["primarySources", "openRecords", "fieldChecked", "coordinatesVerified", "oralTradition", "historicalUncertainty", "openQuestion", "corrected"]) {
  signalTally[signal] = 0;
}
for (const entity of entities) {
  if (entity.page?.status !== "published") continue;
  for (const signal of ledger.trustSignals(entity.id)) signalTally[signal] = (signalTally[signal] ?? 0) + 1;
}
const lines = [
  "# Knowledge-graph audit",
  "",
  `Entities: ${entities.length} · published pages: ${entities.filter((e) => e.page?.status === "published").length} · aspect pages: ${aspectPageCount} · nodes: ${entities.filter((e) => !e.page || e.page.status === "node").length}`,
  "",
  "## The claim ledger",
  "",
  "| Measure | Count |",
  "| --- | --- |",
  `| Sources | ${ledger.sources.length} |`,
  `| Claims | ${ledger.claims.length} |`,
  `| — verified | ${byConfidence("verified")} |`,
  `| — reported | ${byConfidence("reported")} |`,
  `| — uncertain (stated unknowns) | ${byConfidence("uncertain")} |`,
  `| — disputed | ${byConfidence("disputed")} |`,
  `| Open questions (disputes) | ${ledger.disputes.filter((d) => d.status === "open").length} |`,
  `| Corrections published | ${ledger.corrections().length} |`,
  `| Retractions | ${ledger.retractions().length} |`,
  `| Entities carrying claims | ${new Set(ledger.claims.map((c) => c.entityId)).size} |`,
  "",
  "## Publication state and review (M4B)",
  "",
  "| Measure | Count |",
  "| --- | --- |",
  `| Claims published | ${ledger.claims.filter((c) => c.status === "published").length} |`,
  `| Claims held as draft | ${ledger.claims.filter((c) => c.status === "draft").length} |`,
  `| Claims internal only | ${ledger.claims.filter((c) => c.status === "internal").length} |`,
  `| Live claims (published, not superseded, not retracted) | ${ledger.liveClaims().length} |`,
  `| Claims carrying a review date | ${ledger.claims.filter((c) => c.reviewedAt).length} |`,
  `| Earliest review | ${reviewDates[0] ?? "—"} |`,
  `| Latest review | ${reviewDates[reviewDates.length - 1] ?? "—"} |`,
  "",
  "## Sources and evidence (M4B)",
  "",
  "| Measure | Count |",
  "| --- | --- |",
  `| Sources | ${ledger.sources.length} |`,
  `| — with a page (≥3 live claims) | ${ledger.sourcePages().length} |`,
  `| — verified | ${bySourceVerification("verified")} |`,
  `| — reported | ${bySourceVerification("reported")} |`,
  `| — provenance not established | ${bySourceVerification("unverified")} |`,
  `| Source kinds in use | ${[...new Set(ledger.sources.map((s) => s.kind))].sort().join(", ")} |`,
  `| Evidence records | ${ledger.evidence.length} |`,
  `| — hash-verified this build | ${ledger.evidence.filter((e) => e.hash).length} |`,
  `| Claims backed by held evidence | ${ledger.claims.filter((c) => ledger.evidenceFor(c.id).length > 0).length} |`,
  "",
  "## Trust signals earned, by page (M4B)",
  "",
  "| Signal | Pages |",
  "| --- | --- |",
  ...Object.entries(signalTally).sort((a, b) => b[1] - a[1]).map(([signal, count]) => `| ${signal} | ${count} |`),
  "",
  "## Gates (build fails on any)",
  "",
];
if (gates.length === 0) lines.push("_None._");
else {
  lines.push("| Rule | Violation |", "| --- | --- |");
  for (const g of gates) lines.push(`| ${g.rule} | ${g.message.replaceAll("|", "\\|")} |`);
}
lines.push("", "## Warnings (field-day gaps)", "");
if (warnings.length === 0) lines.push("_None._");
else {
  lines.push("| Kind | Note |", "| --- | --- |");
  for (const w of warnings) lines.push(`| ${w.rule} | ${w.message.replaceAll("|", "\\|")} |`);
}
lines.push("", "## Summary", "", `Gates: ${gates.length} · Warnings: ${warnings.length}`, "");

fs.mkdirSync(reportsDir, { recursive: true });
fs.writeFileSync(reportPath, `${lines.join("\n")}\n`);

console.log(`graph-audit checked ${entities.length} entities: ${gates.length} gate violations, ${warnings.length} warnings.`);
console.log(`Report written to ${path.relative(rootDir, reportPath)}`);
if (gates.length > 0) process.exitCode = 1;
