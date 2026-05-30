import { bg } from "./bg";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { ja } from "./ja";
import { ru } from "./ru";
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

const built: Record<LanguageCode, PageCopy> = { bg, en, de, ru, ja, es };

for (const lang of ["de", "ru", "ja", "es"] as LanguageCode[]) {
  if (built[lang].quests.features.length === 0) {
    built[lang].quests.features = built.en.quests.features;
  }
}

export const contentByLanguage = built;
