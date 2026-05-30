import { bg } from "./bg";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { ja } from "./ja";
import { ru } from "./ru";
import type { LanguageCode, PageCopy } from "./types";

export { languages } from "./shared";
export type {
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

export const contentByLanguage: Record<LanguageCode, PageCopy> = {
  bg,
  en,
  de,
  ru,
  ja,
  es,
};
