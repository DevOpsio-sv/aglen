import { bg } from "./bg";
import { de } from "./de";
import { el } from "./el";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { hu } from "./hu";
import { it } from "./it";
import { ja } from "./ja";
import { ro } from "./ro";
import { ru } from "./ru";
import { sr } from "./sr";
import { tr } from "./tr";
import { zh } from "./zh";
import type { LanguageCode, PageCopy } from "./types";

export { languages } from "./shared";
export type {
  Accommodation,
  Experience,
  GalleryItem,
  Highlight,
  LanguageCode,
  MapStop,
  Mystery,
  PageCopy,
  Place,
  TimelineItem,
} from "./types";

const built: Record<LanguageCode, PageCopy> = { bg, en, de, fr, es, it, ro, tr, el, ru, ja, sr, zh, hu };

export const contentByLanguage = built;
