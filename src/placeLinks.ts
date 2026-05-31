import type { ExperienceId, PlaceId, QuestId } from "./content";

export type PlaceExperienceLink =
  | { kind: "activity"; id: ExperienceId }
  | { kind: "quest"; id: QuestId };

export const placeExperienceLinks: Record<PlaceId, PlaceExperienceLink[]> = {
  dupkata: [
    { kind: "activity", id: "canyonWalk" },
    { kind: "quest", id: "gps" },
  ],
  sloncheto: [{ kind: "activity", id: "canyonWalk" }],
  "chervena-stena": [
    { kind: "activity", id: "canyonWalk" },
    { kind: "quest", id: "ar" },
  ],
  "rachkov-vir": [
    { kind: "activity", id: "photoTour" },
    { kind: "activity", id: "fishing" },
  ],
  "st-archangel-michael": [{ kind: "activity", id: "weekendEscape" }],
  kaleto: [{ kind: "quest", id: "story" }],
};
