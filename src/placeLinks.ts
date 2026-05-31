import type { PlaceId } from "./content";
import type { RouteId } from "./routes";

export const placeLinks: Record<PlaceId, RouteId[]> = {
  dupkata: ["activities", "quests"],
  sloncheto: [],
  "chervena-stena": [],
  "rachkov-vir": ["activities"],
  "st-archangel-michael": [],
  kaleto: ["quests"],
};
