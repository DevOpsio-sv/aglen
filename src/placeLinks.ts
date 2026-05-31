import type { ExperienceId, PlaceId, QuestId } from "./content";

export type PlaceExperienceLink =
  | { kind: "activity"; id: ExperienceId }
  | { kind: "quest"; id: QuestId };

export const placeExperienceLinks: Record<PlaceId, PlaceExperienceLink[]> = {
  dupkata: [
    { kind: "activity", id: "canyon-walk" },
    { kind: "quest", id: "gps-missions" },
  ],
  sloncheto: [],
  "chervena-stena": [],
  "rachkov-vir": [
    { kind: "activity", id: "river-photo-journey" },
    { kind: "activity", id: "vit-fishing" },
  ],
  "st-archangel-michael": [],
  kaleto: [{ kind: "quest", id: "living-history" }],
};
