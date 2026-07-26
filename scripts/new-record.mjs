import { srcModule } from "./lib/load-module.mjs";

// ─────────────────────────────────────────────────────────────
// new-record — the scaffolder (M5, Part 4, ADR-017).
//
// ADR-004 says the data format is the fixed contract and the authoring surface
// evolves freely over it: PRs today, structured templates next, a web UI later,
// all producing the same validated records through the same review. This is the
// second of those three, and it is deliberately the smallest thing that counts as
// one — a command that prints a record with every required field present, the
// optional ones commented in prose, and an id that does not collide.
//
// It is not a CMS and must never become one. It writes no state, runs no server
// and holds no truth: it emits text a human reads, edits and commits. What it
// removes is the part of authoring that is genuinely mechanical — remembering
// that a claim needs a `created` date, that a source with `verification:
// "unverified"` must say what is not established, that an id has a shape — so the
// contributor's attention goes to the sentence and the source instead of the
// schema.
//
// Usage:
//   npm run new:record -- entity --kind cave --slug nova-peshtera --region karst/lukovit
//   npm run new:record -- claim  --entity dupkata
//   npm run new:record -- source --kind archive --slug darzhaven-arhiv-lovech
// ─────────────────────────────────────────────────────────────

const registry = srcModule("graph", "registry.ts");
const graph = srcModule("graph", "index.ts");
const ledger = srcModule("graph", "ledger.ts");

const argv = process.argv.slice(2);
const kindOfRecord = argv[0];

function option(name, fallback) {
  const index = argv.indexOf(`--${name}`);
  return index >= 0 && argv[index + 1] && !argv[index + 1].startsWith("--") ? argv[index + 1] : fallback;
}

const TODAY = new Date().toISOString().slice(0, 10);

function usage(message) {
  if (message) console.error(`\n${message}\n`);
  console.log(`Scaffold a record for the Aglen knowledge graph.

  npm run new:record -- entity --kind <kind> --slug <slug> [--region <id>] [--parent <id>]
  npm run new:record -- claim  --entity <entityId> [--aspect <aspect>] [--source <sourceId>]
  npm run new:record -- source --kind <sourceKind> --slug <slug>

Entity kinds and where each publishes:
${Object.keys(registry.KIND_HOME)
  .sort()
  .map((kind) => {
    const home = registry.KIND_HOME[kind];
    return `  ${kind.padEnd(20)} ${home ? `/${home}/<slug>/` : "no entity page — the directory or the calendar owns that URL"}`;
  })
  .join("\n")}

Regions:
${registry.REGIONS.map((region) => `  ${region.id.padEnd(20)} records in src/graph/${region.id}/`).join("\n")}

The full contract is reports/authoring-map.md, generated from the same registry.`);
  process.exitCode = message ? 1 : 0;
}

/** The next free numeric suffix for an id family, e.g. clm-dupkata-0005. */
function nextId(prefix, existing, width) {
  let n = 1;
  const taken = new Set(existing);
  while (taken.has(`${prefix}${String(n).padStart(width, "0")}`)) n += 1;
  return `${prefix}${String(n).padStart(width, "0")}`;
}

function entityStub() {
  const kind = option("kind");
  const slug = option("slug");
  const regionId = option("region", registry.REGIONS[0]?.id);
  const parent = option("parent");
  if (!kind || !(kind in registry.KIND_HOME)) return usage(`--kind is required and must be one of: ${Object.keys(registry.KIND_HOME).sort().join(", ")}`);
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return usage("--slug is required and must be kebab-case.");
  const region = registry.REGIONS.find((candidate) => candidate.id === regionId);
  if (!region) return usage(`--region must be one of: ${registry.REGIONS.map((r) => r.id).join(", ")}`);
  if (graph.entityBySlug(slug)) return usage(`The slug "${slug}" is already taken by "${graph.entityBySlug(slug).id}". A slug is one thing's address.`);

  const home = registry.KIND_HOME[kind];
  const namespace = home ? registry.namespaceDef(home) : undefined;
  const record = {
    id: slug,
    kind,
    slug,
    schemaType: registry.KIND_SCHEMA_TYPE[kind],
    name: { bg: "", en: "" },
    shortDescription: { bg: "", en: "" },
    ...(registry.KIND_IS_SITED[kind] ? { geo: { lat: 0, lon: 0 } } : {}),
    confidence: "E1",
    ...(parent ? { parent } : {}),
    relations: [],
    ...(namespace
      ? { page: { path: `${namespace.prefix}${slug}/`, priority: 3, status: "draft" } }
      : {}),
  };

  const notes = [
    `Add this object to the "entities" array of src/graph/${region.id}/entities.json.`,
    "",
    "Before it can publish:",
    `  • name and shortDescription need real Bulgarian AND English text — a published page`,
    "    with an empty description fails the generation gate.",
    registry.KIND_IS_SITED[kind]
      ? "  • geo must be this thing's OWN fix. Delete the field rather than copy a nearby\n    one — coordinates are never inherited (rule 16)."
      : "  • this kind occupies no ground, so it carries no geo.",
    namespace
      ? `  • page.status is "draft" until three sourced claims rest on it (rule 15). Then set\n    it to "published" and it appears at ${namespace.prefix}${slug}/ in every language.`
      : `  • a ${kind} publishes no entity page; it renders as a section of its parent, so set\n    a "parent" and leave "page" off entirely.`,
    "  • add at least one true relation. An entity nothing links to is reachable only",
    "    from its index, which the discovery gate refuses (rule 23).",
    "  • sameAs (Wikidata / OSM / Commons) if the thing is already in an open record.",
    "",
    "Then: npm run new:record -- claim --entity " + slug,
  ];
  return { record, notes };
}

function claimStub() {
  const entityId = option("entity");
  if (!entityId) return usage("--entity is required: a claim is a statement ABOUT something.");
  const entity = graph.entityById(entityId);
  if (!entity) return usage(`"${entityId}" is not an entity. Scaffold it first: npm run new:record -- entity --kind <kind> --slug ${entityId}`);
  const aspect = option("aspect", "identity");
  const sourceId = option("source");

  const record = {
    id: nextId(`clm-${entityId}-`, ledger.claims.map((claim) => claim.id), 4),
    entityId,
    statement: { bg: "", en: "" },
    sources: [sourceId ?? "src-<kind>-0001"],
    confidence: "reported",
    status: "draft",
    method: "publication",
    aspect,
    created: TODAY,
    reviewedAt: TODAY,
  };

  const notes = [
    `Add this object to the "claims" array of src/graph/${registry.REGIONS[0].id}/claims.json.`,
    "",
    "  • statement is ONE atomic fact. Two facts are two claims — that is what makes a",
    "    correction able to replace one without touching the other.",
    "  • sources must name a real source id. If the source does not exist yet:",
    "    npm run new:record -- source --kind <kind> --slug <slug>",
    "  • confidence is what YOU can stand behind:",
    "      verified   — you checked the origin yourself",
    "      reported   — a real citable origin you have not checked",
    "      uncertain  — say what is NOT established. This is a claim, not an omission.",
    "      disputed   — only inside a dispute, with an interpretation label and an",
    "                   interpretationConfidence, and never alone.",
    '  • status is "draft" until it is ready to be read. Confidence and status are',
    "    different axes: an uncertain claim publishes, a draft certain one does not.",
    "  • reviewedAt is the day a human last checked this against its source. It feeds",
    '    the "last reviewed" line a reader sees, so do not stamp it unless you looked.',
  ];
  return { record, notes };
}

function sourceStub() {
  const kind = option("kind");
  const slug = option("slug");
  const kinds = ["book", "academic", "archive", "museum", "municipal", "church", "map", "oral", "field", "photograph", "dataset", "reference", "press"];
  if (!kind || !kinds.includes(kind)) return usage(`--kind is required and must be one of: ${kinds.join(", ")}`);
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return usage("--slug is required and must be kebab-case.");
  if (ledger.sourceBySlug(slug)) return usage(`The slug "${slug}" already belongs to "${ledger.sourceBySlug(slug).id}".`);

  const record = {
    id: nextId(`src-${kind}-`, ledger.sources.map((source) => source.id), 4),
    kind,
    slug,
    title: { bg: "", en: "" },
    citation: "",
    verification: "reported",
    accessedAt: TODAY,
    note: { bg: "", en: "" },
  };

  const notes = [
    `Add this object to the "sources" array of src/graph/${registry.REGIONS[0].id}/sources.json.`,
    "",
    "  • citation is one line a reader could take to a library. Not a URL alone.",
    "  • slug is what appears in /source/<slug>/. It names the source, never the row —",
    "    an id in a URL leaks the ledger into the address bar.",
    "  • verification is how far YOU went:",
    "      verified   — you looked at the origin. Needs accessedAt.",
    "      reported   — real and citable; you have not checked it.",
    "      unverified — provenance not established. The note MUST say what is missing.",
    "  • note is the honest half of a citation: why this source, and where it stops.",
    "",
    "A source nobody cites fails the build. Write the claim that rests on it.",
  ];
  return { record, notes };
}

const builders = { entity: entityStub, claim: claimStub, source: sourceStub };

if (!kindOfRecord || !(kindOfRecord in builders)) {
  usage(kindOfRecord ? `Unknown record type "${kindOfRecord}".` : undefined);
} else {
  const result = builders[kindOfRecord]();
  if (result) {
    console.log(`\n${JSON.stringify(result.record, null, 2)}\n`);
    console.log(result.notes.join("\n"));
    console.log("\nThen: npm run validate");
  }
}
