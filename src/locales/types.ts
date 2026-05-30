export type LanguageCode = "bg" | "en" | "de" | "fr" | "es" | "it" | "ro" | "tr" | "el" | "pl" | "ru" | "ja" | "sr";

export type Highlight = {
  label: string;
  value: string;
  detail: string;
};

export type Place = {
  title: string;
  description: string;
  tag: string;
  image: string;
  imageAlt: string;
};

export type Experience = {
  title: string;
  price: string;
  duration: string;
  description: string;
  bestFor: string;
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

export type TimelineItem = {
  title: string;
  detail: string;
};

export type Accommodation = {
  title: string;
  type: string;
  description: string;
  image: string;
};

export type PageCopy = {
  nav: {
    home: string;
    about: string;
    landmarks: string;
    stay: string;
    quests: string;
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
    features: Array<{ title: string; text: string }>;
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
