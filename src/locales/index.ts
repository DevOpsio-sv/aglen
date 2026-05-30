import { bg } from "./bg";
import { de } from "./de";
import { el } from "./el";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { it } from "./it";
import { ja } from "./ja";
import { pl } from "./pl";
import { ro } from "./ro";
import { ru } from "./ru";
import { sr } from "./sr";
import { tr } from "./tr";
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

const built: Record<LanguageCode, PageCopy> = { bg, en, de, fr, es, it, ro, tr, el, pl, ru, ja, sr };

for (const lang of ["de", "ru", "ja", "es"] as LanguageCode[]) {
  if (built[lang].quests.features.length === 0) {
    built[lang].quests.features = built.en.quests.features;
  }
}

export const contentByLanguage = built;
