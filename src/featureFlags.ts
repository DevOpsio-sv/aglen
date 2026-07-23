// Feature flags for showing/hiding whole site areas without deleting any code.
// Flip a flag to `true` to bring the area back — menu entries, homepage sections,
// hub cards and place-card links all react to these. The underlying routes, locale
// content, data and SEO stay intact either way.

// "Нощувки" — the Stay section, its nav entry, hub card and stay CTA.
export const SHOW_STAY = false;

// "Преживявания" — the Experiences section, its nav entry, the fishing & hiking
// hub cards, and the "explore from place → activity" links on place cards.
export const SHOW_EXPERIENCES = false;
