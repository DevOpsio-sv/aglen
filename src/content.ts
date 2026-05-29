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

export const highlights: Highlight[] = [
  {
    label: "Hidden Bulgaria",
    value: "A quiet village on the Vit",
    detail: "Aglen is for visitors who prefer discovery, river paths, cliffs, caves, and silence over crowded routes.",
  },
  {
    label: "Nature",
    value: "River, limestone, forest",
    detail: "The landscape around the village is shaped by the Vit River, natural rock forms, canyon views, and cave terrain.",
  },
  {
    label: "Identity",
    value: "The rare name Ъглен",
    detail: "Known as the only Bulgarian village beginning with the letter Ъ, Aglen carries a name visitors remember.",
  },
];

export const places: Place[] = [
  {
    title: "Дупката",
    tag: "Rock arch",
    image: "/assets/aglen-rock-arch.png",
    imageAlt: "Limestone rock arch above the river near Aglen",
    description:
      "A natural stone arch above the Vit, made for slow walks, quiet photographs, and the feeling of entering a hidden route.",
  },
  {
    title: "Слончето",
    tag: "Rock figure",
    image: "/assets/aglen-rock-arch.png",
    imageAlt: "Warm limestone rock formations and forest near the Vit River",
    description:
      "A playful riverside rock shape that turns a simple walk into a small act of discovery.",
  },
  {
    title: "Червена стена",
    tag: "Canyon view",
    image: "/assets/aglen-aerial-river.png",
    imageAlt: "Aerial canyon landscape with river and village",
    description:
      "A dramatic meeting of limestone, forest, and river light close to the village.",
  },
  {
    title: "Рачков вир",
    tag: "River pool",
    image: "/assets/aglen-hero-river-canyon.png",
    imageAlt: "Quiet river pool and forested canyon landscape",
    description:
      "A calm natural point for a pause by the water, a picnic, and a slower rhythm beside the Vit.",
  },
  {
    title: "Св. Архангел Михаил",
    tag: "Village memory",
    image: "/assets/aglen-aerial-river.png",
    imageAlt: "Traditional village homes in the green valley landscape",
    description:
      "The village church, built in 1888, keeps the human layer of Aglen's story close to the landscape.",
  },
  {
    title: "Калето",
    tag: "Archaeology",
    image: "/assets/aglen-cave-mystery.png",
    imageAlt: "Cave opening and limestone textures in Northern Bulgaria",
    description:
      "A place connected with older routes, fortified memory, and the long continuity of life around the river.",
  },
];

export const mysteries: Mystery[] = [
  {
    title: "Where the River Disappears from View",
    tag: "Hidden routes",
    image: "/assets/aglen-hero-river-canyon.png",
    description:
      "The Vit does not reveal everything at once. Around Aglen, bends, shadows, and cliff lines turn a short walk into a search.",
  },
  {
    title: "The Cave Thresholds",
    tag: "Stone and silence",
    image: "/assets/aglen-cave-mystery.png",
    description:
      "The caves around the area belong to the older memory of the land: geological, human, and symbolic without needing exaggeration.",
  },
  {
    title: "Rock Shapes with Local Names",
    tag: "Folklore landscape",
    image: "/assets/aglen-rock-arch.png",
    description:
      "Names like Дупката and Слончето make the landscape feel personal. They are landmarks, but also stories passed from person to person.",
  },
];

export const experiences: Experience[] = [
  {
    title: "Canyon Walk",
    price: "50 лв.",
    duration: "2-3 часа",
    bestFor: "First-time visitors",
    description: "Guided views toward the Vit, rock forms, and the local names behind the landscape.",
  },
  {
    title: "River Photo Journey",
    price: "80 лв.",
    duration: "Полуден",
    bestFor: "Photographers",
    description: "Selected places around the river, rocks, old village streets, and soft natural light.",
  },
  {
    title: "Fishing by the Vit",
    price: "20 лв.",
    duration: "2 часа",
    bestFor: "Slow travel",
    description: "A quiet local rhythm by the water with practical guidance and care for the river.",
  },
  {
    title: "Aglen Weekend Escape",
    price: "120 лв.",
    duration: "2 дни",
    bestFor: "Couples and friends",
    description: "Walks, picnic time, crafts, and an evening route through village stories.",
  },
  {
    title: "Herbs & Village Knowledge",
    price: "40 лв.",
    duration: "90 мин.",
    bestFor: "Curious travelers",
    description: "Recognizing herbs, traditional uses, and responsible gathering in the local landscape.",
  },
  {
    title: "School Discovery Day",
    price: "70 лв.",
    duration: "1 ден",
    bestFor: "Student groups",
    description: "A field route through geography, history, local legends, and nature protection.",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    title: "Vit River Canyon",
    image: "/assets/aglen-hero-river-canyon.png",
    alt: "Cinematic river canyon and village at sunrise",
    size: "wide",
  },
  {
    title: "The Stone Arch",
    image: "/assets/aglen-rock-arch.png",
    alt: "Natural limestone rock arch above the river",
    size: "standard",
  },
  {
    title: "Cave Light",
    image: "/assets/aglen-cave-mystery.png",
    alt: "Cave entrance with warm light and river beyond",
    size: "tall",
  },
  {
    title: "Above the Hidden Valley",
    image: "/assets/aglen-aerial-river.png",
    alt: "Aerial view of river, cliffs, and rural village",
    size: "wide",
  },
];

export const mapStops: MapStop[] = [
  {
    title: "Village Center",
    detail: "Start with the human scale of Aglen: streets, church, local memory, and orientation.",
  },
  {
    title: "Vit River Path",
    detail: "Follow the water toward quiet viewpoints, bends, and shaded places for photography.",
  },
  {
    title: "Дупката",
    detail: "A natural stone threshold and one of the strongest visual symbols of the destination.",
  },
  {
    title: "Caves & Rock Forms",
    detail: "Explore the older landscape layer with care, local guidance, and respect for terrain.",
  },
];

export const timeline = [
  "Paleolithic traces in nearby caves suggest early human presence in the surrounding landscape.",
  "Roman road evidence and fortified remains connect the area with older movement and trade routes.",
  "The local migration legend from Churek keeps the story of settlement and refuge alive.",
  "The memory of 1877 remains part of the village's historical respect and identity.",
  "Today Aglen can grow as a quiet destination for eco-tourism, crafts, slow travel, and local storytelling.",
];

export const sourceNotes = [
  "Original Wix site and service list: https://vasilevasilvena.wixsite.com/aglen",
  "Public travel/history context: Banker.bg, Trip.dir.bg, BTA/Utro, Wikipedia/Wikitravel summaries.",
  "Generated draft visuals are placeholders for final owner-approved Aglen photography.",
];
