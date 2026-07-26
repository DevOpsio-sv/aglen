import { srcModule } from "./lib/load-module.mjs";

// ─────────────────────────────────────────────────────────────
// validate-records — the two-second check (M5, Part 4).
//
// The full build is the real gate and always will be. But it compiles
// TypeScript, bundles, prerenders 1,596 pages and runs four audits, and a
// contributor who has just written one claim record should not have to wait for
// all of that to learn they typed `confidance`. A validation loop that is slower
// than the writing loop stops being run.
//
// So this is the same validators the build uses — imported, not re-implemented —
// over the records alone. It catches everything a single record can be wrong
// about and the cross-record problems the graph assembly notices. It cannot catch
// what only the rendered site reveals; that is `site-audit.mjs`, and the build
// still has the last word.
// ─────────────────────────────────────────────────────────────

const graph = srcModule("graph", "index.ts");
const ledger = srcModule("graph", "ledger.ts");
const registry = srcModule("graph", "registry.ts");

const problems = [...graph.assembleErrors, ...ledger.ledgerErrors];

const counts = {
  regions: registry.REGIONS.length,
  entities: graph.entities.length,
  claims: ledger.claims.length,
  sources: ledger.sources.length,
  evidence: ledger.evidence.length,
};

if (problems.length === 0) {
  console.log(
    `records valid: ${counts.entities} entities, ${counts.claims} claims, ${counts.sources} sources, ` +
      `${counts.evidence} evidence records across ${counts.regions} region(s).`,
  );
  console.log("Run `npm run build` for the full gate set before committing.");
} else {
  console.error(`${problems.length} record problem(s):`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exitCode = 1;
}
