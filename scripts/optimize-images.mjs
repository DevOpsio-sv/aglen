// Image pipeline.
//
// The project's source photography is 1.5–3.8 MB PNG, which made the LCP image
// alone heavier than the rest of the page put together. This script derives, for
// every source raster:
//
//   • <name>.webp       — full size, capped at MAX_WIDTH
//   • <name>-800.webp   — the card/grid size, for srcset
//   • intrinsic dimensions, written to src/generated/imageManifest.ts so the
//     components can emit width/height (no layout shift) and the SEO layer can
//     state true og:image dimensions.
//
// It also derives the social preview JPEG (WebP is unreliable in Facebook,
// LinkedIn and WhatsApp previews) and the favicon/PWA icon set.
//
// Idempotent: a derivative is rewritten only when the source is newer.
// Sources are never modified or deleted.
//
//   node scripts/optimize-images.mjs [--force]

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const assetsDir = path.join(rootDir, "public", "assets");
const manifestPath = path.join(rootDir, "src", "generated", "imageManifest.ts");
const force = process.argv.includes("--force");

const MAX_WIDTH = 1600;
const CARD_WIDTH = 800;
// 74 with effort 6: on this photography (limestone texture, foliage) the step
// from 80 saves a third of the bytes with no visible difference at display size.
const WEBP_QUALITY = 74;
const WEBP_EFFORT = 6;

// Social preview: fixed 1200×630 JPEG, the size every scraper understands.
const OG_SOURCE = "aglen-hero-river-canyon.png";
const OG_OUTPUT = "og-aglen-default.jpg";
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

// Icons, all derived from the logo mark. The site previously served the 2.3 MB
// 1536×1024 master as both favicon and apple-touch-icon.
const ICON_SOURCE = "aglen-logo-mark.png";
const ICONS = [
  { name: "icon-32.png", size: 32 },
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "brand-mark-96.webp", size: 96 },
];

const RASTER = /\.(png|jpe?g|webp)$/i;
// Files this script produces; never treat them as sources.
const DERIVED = /(-800\.webp|^og-|^icon-\d+\.png$|^apple-touch-icon\.png$|^brand-mark-\d+\.webp$)/i;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.isFile() ? [full] : [];
  });
}

function isStale(source, target) {
  if (force || !fs.existsSync(target)) return true;
  return fs.statSync(source).mtimeMs > fs.statSync(target).mtimeMs;
}

/** Public URL for a file inside public/. */
function assetUrl(file) {
  return `/assets/${path.relative(assetsDir, file).split(path.sep).join("/")}`;
}

const sources = walk(assetsDir)
  .filter((file) => RASTER.test(file) && !DERIVED.test(path.basename(file)))
  // A .webp source has no .webp derivative to make; it is recorded as-is.
  .sort();

const manifest = new Map();
let written = 0;

for (const source of sources) {
  const meta = await sharp(source).metadata();
  const sourceWidth = meta.width ?? 0;
  const sourceHeight = meta.height ?? 0;
  if (!sourceWidth || !sourceHeight) continue;

  const base = source.replace(RASTER, "");
  const isWebpSource = /\.webp$/i.test(source);
  const fullTarget = isWebpSource ? source : `${base}.webp`;
  const cardTarget = `${base}-800.webp`;

  const fullWidth = Math.min(sourceWidth, MAX_WIDTH);
  const fullHeight = Math.round((sourceHeight * fullWidth) / sourceWidth);

  if (!isWebpSource && isStale(source, fullTarget)) {
    await sharp(source)
      .resize({ width: fullWidth, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: WEBP_EFFORT })
      .toFile(fullTarget);
    written += 1;
  }

  // Grid images only: a 96 px logo needs no 800 px variant.
  if (sourceWidth > CARD_WIDTH * 1.25 && isStale(source, cardTarget)) {
    await sharp(source)
      .resize({ width: CARD_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: WEBP_EFFORT })
      .toFile(cardTarget);
    written += 1;
  }

  const hasCard = fs.existsSync(cardTarget);
  manifest.set(assetUrl(fullTarget), {
    width: fullWidth,
    height: fullHeight,
    card: hasCard ? assetUrl(cardTarget) : undefined,
  });
  // The original path stays resolvable so old references keep working and can be
  // rewritten to the WebP by the helper in src/images.ts.
  if (!isWebpSource) {
    manifest.set(assetUrl(source), {
      width: fullWidth,
      height: fullHeight,
      webp: assetUrl(fullTarget),
      card: hasCard ? assetUrl(cardTarget) : undefined,
    });
  }
}

// ── Social preview JPEG ──────────────────────────────────────
const ogSource = path.join(assetsDir, OG_SOURCE);
const ogTarget = path.join(assetsDir, OG_OUTPUT);
if (fs.existsSync(ogSource) && isStale(ogSource, ogTarget)) {
  await sharp(ogSource)
    .resize({ width: OG_WIDTH, height: OG_HEIGHT, fit: "cover", position: "centre" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(ogTarget);
  written += 1;
}
manifest.set(assetUrl(ogTarget), { width: OG_WIDTH, height: OG_HEIGHT });

// ── Icons ────────────────────────────────────────────────────
const iconSource = path.join(assetsDir, ICON_SOURCE);
for (const icon of ICONS) {
  const target = path.join(assetsDir, icon.name);
  if (!fs.existsSync(iconSource) || !isStale(iconSource, target)) continue;
  const pipeline = sharp(iconSource).resize({
    width: icon.size,
    height: icon.size,
    fit: "cover",
    position: "centre",
  });
  await (icon.name.endsWith(".webp")
    ? pipeline.webp({ quality: 88, effort: WEBP_EFFORT }).toFile(target)
    : pipeline.png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(target));
  written += 1;
  manifest.set(assetUrl(target), { width: icon.size, height: icon.size });
}

// ── Manifest module ──────────────────────────────────────────
const entries = [...manifest.entries()].sort(([a], [b]) => a.localeCompare(b));
const body = entries
  .map(([url, entry]) => {
    const parts = [`width: ${entry.width}`, `height: ${entry.height}`];
    if (entry.webp) parts.push(`webp: "${entry.webp}"`);
    if (entry.card) parts.push(`card: "${entry.card}"`);
    return `  "${url}": { ${parts.join(", ")} },`;
  })
  .join("\n");

fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
fs.writeFileSync(
  manifestPath,
  `// GENERATED by scripts/optimize-images.mjs — do not edit by hand.
//
// Intrinsic size of every image the site ships, plus its WebP and 800 px
// derivatives. Consumed by src/images.ts (width/height + srcset) and by
// src/seo.ts (true og:image dimensions).

export type ImageManifestEntry = {
  width: number;
  height: number;
  /** WebP derivative, when the key is a PNG/JPEG source. */
  webp?: string;
  /** 800 px WebP derivative for card grids. */
  card?: string;
};

export const imageManifest: Record<string, ImageManifestEntry> = {
${body}
};
`,
);

const totalBytes = (dir) =>
  walk(dir).reduce((sum, file) => sum + fs.statSync(file).size, 0);

console.log(
  `Image pipeline: ${written} derivative(s) written, ${entries.length} entries in the manifest ` +
    `(assets now ${(totalBytes(assetsDir) / 1024 / 1024).toFixed(1)} MB on disk).`,
);
