import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

// ─────────────────────────────────────────────────────────────
// Loading the site's own TypeScript from a build script (M5, Part 11).
//
// Three scripts — the prerenderer, the graph audit and the i18n audit — each
// carried a byte-identical copy of this loader: ~50 lines of module resolution,
// transpilation and a hand-rolled `require`. They agreed today. Nothing made them
// agree tomorrow, and the failure mode was the worst kind: an audit and the
// generator disagreeing about what the code says, with the audit passing.
//
// One implementation, imported by all of them. The behaviour is unchanged.
// ─────────────────────────────────────────────────────────────

const rootDir = process.cwd();
const nodeRequire = createRequire(import.meta.url);
const moduleCache = new Map();

function resolveSourceModule(specifier, fromFile) {
  if (!specifier.startsWith(".")) return specifier;
  const basePath = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [
    basePath,
    `${basePath}.ts`,
    `${basePath}.tsx`,
    `${basePath}.js`,
    `${basePath}.mjs`,
    `${basePath}.json`,
    path.join(basePath, "index.ts"),
  ];
  const match = candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (!match) throw new Error(`Cannot resolve ${specifier} from ${fromFile}`);
  return match;
}

/**
 * Load one of this repo's source modules and return its exports. JSON records are
 * parsed; `.css` imports resolve to an empty object; anything outside the repo
 * falls through to Node's own resolver.
 */
export function loadSourceModule(filePath) {
  if (!filePath.startsWith(rootDir)) return nodeRequire(filePath);
  const resolvedPath = resolveSourceModule(filePath, path.join(rootDir, "scripts", "lib", "load-module.mjs"));
  if (moduleCache.has(resolvedPath)) return moduleCache.get(resolvedPath).exports;

  if (resolvedPath.endsWith(".json")) {
    const parsed = JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
    moduleCache.set(resolvedPath, { exports: parsed });
    return parsed;
  }

  const source = fs.readFileSync(resolvedPath, "utf8");
  const module = { exports: {} };
  moduleCache.set(resolvedPath, module);
  const output = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: resolvedPath,
  }).outputText;

  const localRequire = (specifier) => {
    if (specifier.endsWith(".css")) return {};
    const target = resolveSourceModule(specifier, resolvedPath);
    if (path.isAbsolute(target) && target.startsWith(rootDir)) return loadSourceModule(target);
    return nodeRequire(target);
  };

  const runner = new Function("exports", "require", "module", "__filename", "__dirname", output);
  runner(module.exports, localRequire, module, resolvedPath, path.dirname(resolvedPath));
  return module.exports;
}

/** Shorthand for a module under `src/`, e.g. `srcModule("graph", "index.ts")`. */
export function srcModule(...segments) {
  return loadSourceModule(path.join(rootDir, "src", ...segments));
}

/** Whether a site-rooted asset URL exists in `public/`. Absolute URLs pass. */
export function publicAssetExists(assetUrl) {
  if (!assetUrl || /^https?:\/\//.test(assetUrl)) return true;
  const cleanPath = assetUrl.split("?")[0].replace(/^\/+/, "");
  return fs.existsSync(path.join(rootDir, "public", cleanPath));
}
