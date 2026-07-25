export type LanguageCode = "bg" | "en" | "de" | "fr" | "es" | "it" | "ro" | "tr" | "el" | "ru" | "ja" | "sr" | "zh" | "hu";

export type Highlight = {
  label: string;
  value: string;
  detail: string;
};

export type PlaceId = "dupkata" | "sloncheto" | "chervena-stena" | "rachkov-vir" | "st-archangel-michael" | "kaleto";
export type ExperienceId = "canyonWalk" | "photoTour" | "fishing" | "weekendEscape" | "herbs" | "schoolDay";
export type QuestId = "ar" | "gps" | "story";

export type Place = {
  id: PlaceId;
  title: string;
  description: string;
  tag: string;
  image: string;
  imageAlt: string;
};

export type Experience = {
  id: ExperienceId;
  title: string;
  price: string;
  duration: string;
  description: string;
  bestFor: string;
};

export type QuestFeature = {
  id: QuestId;
  title: string;
  text: string;
};

export type Mystery = {
  title: string;
  tag: string;
  description: string;
  image: string;
};

export type GalleryItem = {
  title: string;
  image: string;
  alt: string;
  size: "wide" | "tall" | "standard";
};

export type MapStop = {
  title: string;
  detail: string;
};

export type TimelineSection = {
  heading: string;
  body: string[];
};

export type TimelineItem = {
  title: string;
  detail: string;
  // Optional long-form content shown in the timeline modal. When present, the modal
  // renders `intro` + `sections` instead of the short `detail`.
  intro?: string;
  sections?: TimelineSection[];
};

export type Accommodation = {
  title: string;
  type: string;
  description: string;
  image: string;
};

// Text that may be provided per language, with Bulgarian as the required fallback.
export type LocalizedText = Partial<Record<LanguageCode, string>> & { bg: string };

export type EventCategory = "traditions" | "children" | "nature" | "contest" | "culture";

// Season an event recurs in — used by the seasonal timeline.
export type EventSeason = "spring" | "summer" | "autumn" | "winter";

// A block of long-form event information (contest rules, programme, ...),
// shown in the event details dialog. One level of sub-sections is supported.
export type EventDetailSection = {
  title: LocalizedText;
  body?: LocalizedText;
  items?: LocalizedText[];
  note?: LocalizedText; // closing line rendered under the list
  sections?: EventDetailSection[];
};

export type EventItem = {
  id: string;
  startDate: string; // ISO date, e.g. "2026-05-06"
  endDate?: string; // ISO date for multi-day events
  startTime?: string; // e.g. "18:00" (local)
  dateLabel: string; // human-readable label shown to visitors, e.g. "6 май 2026"
  location: string;
  category?: EventCategory;
  season?: EventSeason; // for recurring events on the seasonal timeline
  title: LocalizedText;
  description: LocalizedText;
  image?: string;
  imageAlt?: string;
  // Full-size poster/flyer artwork. When set, the card shows the image uncropped
  // (letterboxed over a blurred copy) and opens this file in the lightbox.
  poster?: string;
  gallery?: string[]; // image paths for past-event galleries / memories
  // Optional call-to-action button (e.g. a contest entry / registration form).
  ctaLabel?: LocalizedText;
  ctaUrl?: string;
  // Full write-up (rules, categories, prizes) opened from a "details" button.
  details?: { intro?: LocalizedText[]; sections: EventDetailSection[]; outro?: LocalizedText[] };
};

// ── Local businesses ─────────────────────────────────────────
export type BusinessCategory =
  | "food"
  | "shops"
  | "producers"
  | "stay"
  | "crafts"
  | "services"
  | "farming"
  | "other";

// Publication state. Only "published" entries are ever rendered, so a pending
// submission cannot reach the public site without an explicit edit here.
export type BusinessStatus = "draft" | "pending" | "published" | "temporarily_closed" | "closed";

// Minutes-of-day ranges per weekday, Monday = 1 … Sunday = 7. Omit a day to
// mark it closed; omit the whole object when the hours are not reliably known.
export type OpeningHours = Partial<Record<1 | 2 | 3 | 4 | 5 | 6 | 7, { open: string; close: string }[]>>;

export type LocalBusiness = {
  id: string;
  slug: string;
  name: string; // business names stay untranslated
  category: BusinessCategory;
  shortDescription: LocalizedText;
  // Long description. Separate paragraphs with a blank line ("\n\n") — the
  // detail page renders each as its own paragraph.
  description?: LocalizedText;
  // One short, genuinely notable fact, shown as a highlighted badge on the card
  // and as a callout on the detail page. Keep it to a few words.
  highlight?: LocalizedText;
  story?: { quote: LocalizedText; person: string; role?: LocalizedText; image?: string };
  coverImage?: string;
  coverImageAlt?: LocalizedText;
  gallery?: { src: string; alt: LocalizedText }[];
  logo?: string;
  // Contact data is published only when the business supplied it for that purpose.
  phone?: string;
  email?: string;
  website?: string;
  socialLinks?: { facebook?: string; instagram?: string };
  address?: string;
  locality?: string; // town/village, when the business is not based in Ъглен
  latitude?: number;
  longitude?: number;
  openingHours?: OpeningHours;
  products?: LocalizedText[];
  services?: LocalizedText[];
  delivery?: boolean;
  pickup?: boolean;
  bookingRequired?: boolean;
  seasonal?: boolean;
  seasonalNote?: LocalizedText;
  accessibility?: LocalizedText[];
  status: BusinessStatus;
  verified: boolean; // only ever set by an administrator who checked the listing
  featured: boolean;
  // Position in the listing. Lower sorts earlier; entries without one fall in
  // the middle, so only the businesses that need a fixed slot carry a value.
  displayOrder?: number;
  lastUpdated?: string; // ISO date
};

export type PageCopy = {
  nav: {
    home: string;
    about: string;
    landmarks: string;
    stay: string;
    quests: string;
    events: string;
    business: string;
    // Village-first primary navigation (ADR-013). `about` stays for existing
    // metadata; these drive the header/mobile nav.
    guide: string;
    visit: string;
    visitGettingHere: string;
    visitRoutes: string;
    visitChildren: string;
    visitMissions: string;
    visitWhen: string;
    // Top-level "AR мисии" button that scrolls to the homepage UB banner.
    arMissions: string;
  };
  // Unlocking Bulgaria — the one compact home block and the /ar-missions/ hub.
  // UB is an independent national application; Aglen is its first live
  // destination (ADR-013). Nothing here models it as part of the village site.
  ub: {
    homeHeading: string;
    homeText: string;
    seeMissions: string;
    externalLabel: string;
    hubTitle: string;
    whatText: string;
    missionsHeading: string;
    needHeading: string;
    needItems: [string, string, string];
  };
  ui: {
    languageLabel: string;
    languageSelectAria: string;
    modalCloseAria: string;
    mobileMenuAria: string;
  };
  brand: {
    name: string;
    subtitle: string;
  };
  hero: {
    meta: string;
    title: string;
    subtitle: string;
    lede: string;
    primary: string;
    secondary: string;
    cue: string;
    imageAlt: string;
  };
  statsLabel: string;
  about: {
    eyebrow: string;
    title: string;
    text: string;
  };
  legends: {
    eyebrow: string;
    title: string;
    text: string;
  };
  landmarks: {
    eyebrow: string;
    title: string;
    text: string;
    aria: string;
  };
  experiences: {
    eyebrow: string;
    title: string;
    text: string;
    cta: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    aria: string;
  };
  stay: {
    eyebrow: string;
    title: string;
    text: string;
  };
  quests: {
    eyebrow: string;
    title: string;
    text: string;
    cta: string;
    features: QuestFeature[];
  };
  ar: {
    eyebrow: string;
    title: string;
    text: string;
    steps: [string, string, string];
    cta: string;
  };
  app: {
    eyebrow: string;
    title: string;
    text: string;
    badge: string;
    note: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    notesTitle: string;
    noteOne: string;
    noteTwo: string;
    cta: string;
  };
  events: {
    eyebrow: string;
    title: string;
    text: string;
    emptyState: string;
    dateLabel: string;
    locationLabel: string;
    submitTitle: string;
    submitText: string;
    submitCta: string;
  };
  hub: {
    eyebrow: string;
    title: string;
    text: string;
  };
  guides: {
    vitRiver: { label: string; text: string };
    fishing: { label: string; text: string };
    hiking: { label: string; text: string };
    caves: { label: string; text: string };
    food: { label: string; text: string };
    nearby: { label: string; text: string };
    seasonal: { label: string; text: string };
  };
  highlights: Highlight[];
  timeline: TimelineItem[];
  mysteries: Mystery[];
  placesList: Place[];
  experiencesList: Experience[];
  galleryItems: GalleryItem[];
  mapStops: MapStop[];
  accommodationList: Accommodation[];
  sourceNotes: string[];
};
