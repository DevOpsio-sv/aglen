import { imageManifest, type ImageManifestEntry } from "./generated/imageManifest";

// ─────────────────────────────────────────────────────────────
// Image resolution.
//
// Content keeps referring to its source file (`/assets/aglen-rock-arch.png`);
// this layer swaps in the WebP derivative, adds the 800 px srcset entry and the
// intrinsic width/height that stop the layout shifting while an image loads.
//
// Everything comes from src/generated/imageManifest.ts, which
// scripts/optimize-images.mjs writes from the real files — so a width here is
// never a guess, and a missing entry degrades to the original path rather than
// to a broken one.
// ─────────────────────────────────────────────────────────────

export type ImageVariant =
  /** Full-bleed hero or a wide figure: the 1600 px file, 800 px as the small step. */
  | "full"
  /** Card grid: the 800 px file first, 1600 px only for dense displays. */
  | "card";

export type ResolvedImage = {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
};

function entryFor(src: string): ImageManifestEntry | undefined {
  return imageManifest[src];
}

/**
 * Where the subject of a photograph sits, for the crop.
 *
 * A hero is `object-fit: cover` in a band far wider than any of these files, so
 * the browser throws away the top and bottom and keeps the middle. That is right
 * for a landscape and wrong for a picture whose subject is overhead: centring
 * the Prohodna frame cuts the two openings it exists to show. A focal point is a
 * property of the FILE, not of the page, which is why it lives beside the
 * manifest and not in a component.
 *
 * Percentages, as `object-position` takes them. Anything unlisted stays centred.
 */
const FOCUS: Record<string, string> = {
  "/assets/prohodna-cover.png": "center 34%",
};

/** The `object-position` a file wants, or undefined to leave the default alone. */
export function imageFocus(src: string | undefined): string | undefined {
  return src ? FOCUS[src] : undefined;
}

/** WebP path for a source image, or the source itself when none was derived. */
export function webpSrc(src: string): string {
  return entryFor(src)?.webp ?? src;
}

/** True intrinsic size of the file that will actually be served. */
export function imageSize(src: string): { width: number; height: number } | undefined {
  const entry = entryFor(src);
  return entry ? { width: entry.width, height: entry.height } : undefined;
}

/**
 * Props to spread onto an `<img>`. `sizes` should describe the CSS box the image
 * occupies — without it the browser assumes 100vw and over-downloads on mobile.
 */
export function imageProps(
  src: string | undefined,
  options: { variant?: ImageVariant; sizes?: string } = {},
): ResolvedImage {
  if (!src) return { src: "" };
  const entry = entryFor(src);
  if (!entry) return { src };

  const full = entry.webp ?? src;
  const card = entry.card;
  const variant = options.variant ?? "full";

  const candidates: string[] = [];
  if (card) candidates.push(`${card} 800w`);
  if (entry.width > 800 || !card) candidates.push(`${full} ${entry.width}w`);

  return {
    src: variant === "card" && card ? card : full,
    srcSet: candidates.length > 1 ? candidates.join(", ") : undefined,
    sizes: candidates.length > 1 ? options.sizes ?? defaultSizes(variant) : undefined,
    width: entry.width,
    height: entry.height,
  };
}

function defaultSizes(variant: ImageVariant): string {
  // Cards sit in a grid that collapses to one column on phones; heroes are always
  // full width. Both keep the browser from fetching 1600 px for a 380 px box.
  return variant === "card" ? "(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 30vw" : "100vw";
}

/** `srcset`/`sizes`/dimension attributes as an HTML string, for the prerenderer. */
export function imageAttributes(
  src: string,
  options: { variant?: ImageVariant; sizes?: string } = {},
): string {
  const resolved = imageProps(src, options);
  return [
    `src="${resolved.src}"`,
    resolved.srcSet ? `srcset="${resolved.srcSet}"` : "",
    resolved.sizes ? `sizes="${resolved.sizes}"` : "",
    resolved.width ? `width="${resolved.width}"` : "",
    resolved.height ? `height="${resolved.height}"` : "",
  ]
    .filter(Boolean)
    .join(" ");
}
