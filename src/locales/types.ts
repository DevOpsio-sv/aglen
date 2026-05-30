export type LanguageCode = "bg" | "en" | "de" | "ru" | "ja" | "es";

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

export type PageCopy = {
  nav: {
    home: string;
    story: string;
    legends: string;
    places: string;
    map: string;
    contact: string;
  };
  ui: {
    languageLabel: string;
    languageSelectAria: string;
    modalCloseAria: string;
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
  story: {
    eyebrow: string;
    title: string;
    text: string;
  };
  legends: {
    eyebrow: string;
    title: string;
    text: string;
  };
  places: {
    eyebrow: string;
    title: string;
    text: string;
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
  map: {
    eyebrow: string;
    title: string;
    text: string;
    aria: string;
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
  highlights: Highlight[];
  timeline: TimelineItem[];
  mysteries: Mystery[];
  placesList: Place[];
  experiencesList: Experience[];
  galleryItems: GalleryItem[];
  mapStops: MapStop[];
  sourceNotes: string[];
};
