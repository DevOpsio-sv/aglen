import type { LocalizedText } from "../locales/types";
import type { EntityId } from "./schema";
import type { EvidenceId } from "./claims";
import { isLocalizedText } from "./text";

// ─────────────────────────────────────────────────────────────
// The media contract (M5, Part 8, ADR-019).
//
// Storage does not move here. ADR-012 puts originals in object storage and that
// is a later milestone; every asset this site renders today is a file in
// `public/assets/`, and M5 does not migrate one byte of it. What M5 fixes is that
// the *record* was too thin to survive the migration: `MediaRef` carried a src,
// an alt, an optional credit, an optional licence and an optional date, and no
// entity in the graph used it at all. A photograph arriving from a field day had
// nowhere to put the photographer, nothing to bind it to the place it was taken
// as opposed to the place it shows, and no way to be superseded by a better frame
// without losing the fact that it had been superseded.
//
// So the contract is widened first and the files move later. Every field is
// optional-or-additive; every record written against the older shape is still
// valid; nothing is removed and nothing changes meaning.
//
// Constitution rule 45 is the load-bearing rule and it is enforced here rather
// than trusted: **every asset carries a licence, a capture date, a credit and a
// depicted entity, or it does not render.** That is what `isRenderable()` means —
// not "is well-formed" but "is allowed on a page". An `aiGenerated` asset never
// reaches a published page whatever else it carries (V11), because the one trust
// signal this project has that an encyclopaedia does not is that its photographs
// can be dated, credited and proven.
// ─────────────────────────────────────────────────────────────

/** Why an asset is attached. A hero renders once; a gallery renders many. */
export type MediaRole = "hero" | "gallery" | "figure" | "map" | "portrait";

export type MediaAsset = {
  /**
   * A stable id, so a caption can be corrected and a frame replaced without the
   * asset losing its history. Optional while the library is small; the moment two
   * versions of one photograph exist, the newer one needs something to supersede.
   */
  id?: string;
  /** The public path today; the object-storage key after ADR-012. Callers never parse it. */
  src: string;
  /** What a person who cannot see it needs to know. Required, always (WCAG + rule 45). */
  alt: LocalizedText;
  /**
   * What a person who *can* see it should be told. Distinct from alt: alt
   * describes, a caption tells you what you are looking at and why it is here.
   */
  caption?: LocalizedText;
  role?: MediaRole;
  /** Who made it. A person's name where there is one, an institution otherwise. */
  credit?: string;
  creditUrl?: string;
  /** The licence the asset is available under: "CC BY-SA 4.0", "©", "CC0". */
  license?: string;
  licenseUrl?: string;
  /** ISO — when the shutter closed. Never a publication or upload date. */
  capturedAt?: string;
  /**
   * What the asset shows. A photograph of Дупката attached to the village page
   * still depicts Дупката; conflating the two is how a gallery ends up illustrating
   * a place with a picture of somewhere else (rule 45 / the image workflow).
   */
  depicts?: EntityId[];
  /** Where the camera stood, when that differs from what it shows. */
  capturedIn?: EntityId;
  /** The camera's own fix, where the file carries one. */
  capturedGeo?: { lat: number; lon: number };
  /**
   * The evidence record this asset backs. A dated photograph is not decoration —
   * it is what turns "the arch exists" from an assertion into something held
   * (`MASTER_ARCHITECTURE_BLUEPRINT.md` §14).
   */
  evidence?: EvidenceId;
  /** Bumped when the same subject is re-shot or re-scanned. Starts at 1. */
  version?: number;
  /** The media id this replaces. Supersede, never delete (rule 10, applied to media). */
  supersedes?: string;
  /** Never true on anything a published page renders (V11). */
  aiGenerated?: boolean;
};

/** The historical name of this type. Kept so older imports keep compiling. */
export type MediaRef = MediaAsset;

/**
 * Whether rule 45 permits this asset on a page: licence, capture date, credit and
 * a depicted entity, all four, and not machine-generated. The rule is stated as a
 * conjunction in the Constitution and is implemented as one here — three out of
 * four is a photograph whose provenance a reader cannot check, which is the thing
 * the rule exists to keep off the site.
 */
export function isRenderable(asset: MediaAsset): boolean {
  if (asset.aiGenerated === true) return false;
  return Boolean(asset.license && asset.capturedAt && asset.credit && asset.depicts && asset.depicts.length > 0);
}

/** Exactly what an asset is missing before it may render. Empty means it may. */
export function renderBlockers(asset: MediaAsset): string[] {
  const missing: string[] = [];
  if (asset.aiGenerated === true) return ["is machine-generated (V11)"];
  if (!asset.license) missing.push("a licence");
  if (!asset.capturedAt) missing.push("a capture date");
  if (!asset.credit) missing.push("a credit");
  if (!asset.depicts || asset.depicts.length === 0) missing.push("a depicted entity");
  return missing;
}

/** The hero of an asset list: the one marked hero, else the first renderable one. */
export function heroAsset(assets: MediaAsset[] | undefined): MediaAsset | undefined {
  if (!assets || assets.length === 0) return undefined;
  const live = assets.filter((asset) => !isSuperseded(asset, assets) && isRenderable(asset));
  return live.find((asset) => asset.role === "hero") ?? live[0];
}

/** Assets an entity may show in a gallery, newest version of each subject only. */
export function galleryAssets(assets: MediaAsset[] | undefined): MediaAsset[] {
  if (!assets) return [];
  return assets.filter((asset) => !isSuperseded(asset, assets) && isRenderable(asset) && asset.role !== "hero");
}

function isSuperseded(asset: MediaAsset, all: MediaAsset[]): boolean {
  return Boolean(asset.id) && all.some((other) => other.supersedes === asset.id);
}

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const MEDIA_ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ROLES = new Set<MediaRole>(["hero", "gallery", "figure", "map", "portrait"]);

/**
 * Structural validation of one asset. As everywhere else in this graph, this
 * checks a single record against itself; whether the file exists, whether the
 * depicted entity exists and whether rule 45 is satisfied on a *published* page
 * are cross-record questions and live in `scripts/graph-audit.mjs`.
 */
export function validateMedia(asset: unknown, owner: string, index: number): string[] {
  const problems: string[] = [];
  const m = asset as Partial<MediaAsset>;
  const where = `${owner}: media[${index}]`;

  if (!m || typeof m !== "object") return [`${where} is not an object.`];
  if (typeof m.src !== "string" || m.src.length === 0) problems.push(`${where} has no src.`);
  if (!isLocalizedText(m.alt)) problems.push(`${where} has no localized alt text.`);
  if (m.caption !== undefined && !isLocalizedText(m.caption)) problems.push(`${where} caption is malformed.`);
  if (m.id !== undefined && !MEDIA_ID_RE.test(m.id)) problems.push(`${where} id "${m.id}" is not a kebab-case id.`);
  if (m.role !== undefined && !ROLES.has(m.role)) problems.push(`${where} has invalid role "${m.role}".`);
  if (m.capturedAt !== undefined && !ISO_DATE_RE.test(m.capturedAt)) problems.push(`${where} capturedAt "${m.capturedAt}" is not an ISO date.`);
  if (m.depicts !== undefined && !Array.isArray(m.depicts)) problems.push(`${where} depicts must be a list of entity ids.`);
  if (m.capturedGeo !== undefined) {
    const geo = m.capturedGeo as { lat?: unknown; lon?: unknown };
    if (typeof geo.lat !== "number" || typeof geo.lon !== "number") problems.push(`${where} capturedGeo must be {lat, lon}.`);
  }
  if (m.version !== undefined && (typeof m.version !== "number" || m.version < 1)) problems.push(`${where} version must be a positive number.`);
  // A supersede needs both ends to be addressable, or the history it is supposed
  // to preserve is a dangling string.
  if (m.supersedes !== undefined && m.id === undefined) problems.push(`${where} supersedes another asset but carries no id of its own.`);
  if (m.creditUrl !== undefined && !/^https?:\/\//.test(m.creditUrl)) problems.push(`${where} creditUrl is not absolute.`);
  if (m.licenseUrl !== undefined && !/^https?:\/\//.test(m.licenseUrl)) problems.push(`${where} licenseUrl is not absolute.`);
  return problems;
}
