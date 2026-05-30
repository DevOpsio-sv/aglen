import { images } from "./locales/shared";

export type LandingPageId =
  | "visitAglen"
  | "thingsToDo"
  | "natureAroundAglen"
  | "historyOfAglen"
  | "accommodationNearAglen"
  | "traditionalFood"
  | "hiddenPlaces"
  | "culturalTourism"
  | "natureTourism"
  | "adventureTourism"
  | "familyTrip"
  | "campingNearAglen"
  | "weekendInAglen"
  | "routeMap"
  | "bestTime"
  | "howToGet"
  | "aglenFromSofia"
  | "lovechRegionGuide"
  | "lukovitGuide"
  | "karlukovoGuide"
  | "krushunaGuide"
  | "devetashkaCaveGuide"
  | "iskarPanegaGuide"
  | "ruralTourismBulgaria"
  | "ecoTourismBulgaria"
  | "slowTravelBulgaria"
  | "aiAnswerHub";

export type LandingPageSection = {
  heading: string;
  body: string;
};

export type LandingPageFaq = {
  question: string;
  answer: string;
};

export type LandingPage = {
  id: LandingPageId;
  slug: string;
  sectionId: "seo-guide";
  category: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  keywords: string[];
  secondaryKeywords: string[];
  bulgarianKeywords: string[];
  image: string;
  imageAlt: string;
  ctaLabel: string;
  schemaType: "Article" | "TravelGuide";
  sections: LandingPageSection[];
  faqs: LandingPageFaq[];
  internalLinks: Array<{ label: string; routeId: LandingPageId | string }>;
};

const sharedFaqs: LandingPageFaq[] = [
  {
    question: "Where is Aglen?",
    answer:
      "Aglen (Uglen, Bulgarian: Ъглен) is a village in Lovech Province, Northern Bulgaria, near Lukovit and the Vit River valley.",
  },
  {
    question: "What can visitors do in Aglen?",
    answer:
      "Visitors can walk river and canyon routes, see limestone formations, explore village history, fish, camp, photograph nature, and use the Hidden Bulgaria Quests AR app.",
  },
  {
    question: "When is the best time to visit Aglen?",
    answer:
      "April to June and September to October are strongest for walking and photography. Summer suits river pauses and camping when visitors plan responsibly.",
  },
];

const primaryKeywords = [
  "Aglen Bulgaria",
  "Aglen village",
  "Visit Aglen",
  "Tourism in Aglen",
  "Things to do in Aglen",
  "Aglen travel guide",
  "Aglen attractions",
  "Aglen nature",
  "Aglen Bulgaria travel",
  "Hidden Bulgaria Aglen",
];

const secondaryKeywords = [
  "Aglen Lovech",
  "Aglen Lukovit",
  "Aglen Vit River",
  "rural tourism Aglen",
  "fishing in Aglen",
  "hiking Aglen",
  "camping Aglen",
  "weekend in Aglen",
];

const bgKeywords = [
  "Ъглен",
  "село Ъглен",
  "туризъм в Ъглен",
  "забележителности Ъглен",
  "река Вит Ъглен",
  "Луковит Ъглен",
  "селски туризъм България",
  "екотуризъм България",
];

function landingPage(page: Omit<LandingPage, "sectionId" | "keywords" | "secondaryKeywords" | "bulgarianKeywords"> & Partial<Pick<LandingPage, "keywords" | "secondaryKeywords" | "bulgarianKeywords">>): LandingPage {
  return {
    sectionId: "seo-guide",
    keywords: [...primaryKeywords, ...(page.keywords ?? [])],
    secondaryKeywords: [...secondaryKeywords, ...(page.secondaryKeywords ?? [])],
    bulgarianKeywords: [...bgKeywords, ...(page.bulgarianKeywords ?? [])],
    ...page,
  };
}

export const landingPages: LandingPage[] = [
  landingPage({
    id: "visitAglen",
    slug: "visit-aglen",
    category: "Pillar guide",
    title: "Visit Aglen, Bulgaria | Complete Travel Guide",
    metaDescription:
      "Plan your trip to Aglen with attractions, nature, routes, AR quests, accommodation, food, fishing, and weekend ideas.",
    h1: "Visit Aglen, Bulgaria",
    intro:
      "Use this guide as the main entry point for Aglen: a quiet rural destination in Lovech Province with the Vit River, limestone cliffs, village memory, and Hidden Bulgaria Quests.",
    image: images.hero,
    imageAlt: "Vit River canyon landscape near Aglen, Bulgaria",
    ctaLabel: "Plan my Aglen weekend",
    schemaType: "TravelGuide",
    sections: [
      { heading: "Why Visit", body: "Aglen is strongest for visitors who want slow travel, nature, photography, village stories, and routes away from crowded Bulgarian itineraries." },
      { heading: "Top Attractions", body: "Start with the Vit River, Dupkata, Sloncheto, Chervena Stena, Rachkov Vir, St. Archangel Michael Church, and Kaleto." },
      { heading: "Practical Planning", body: "Most visits work best as a day trip from Lukovit or a two-day weekend from Sofia, Pleven, or Lovech with clear route planning." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Attractions in Aglen", routeId: "attractions" },
      { label: "Things to do", routeId: "thingsToDo" },
      { label: "Accommodation", routeId: "accommodationNearAglen" },
      { label: "Vit River", routeId: "vitRiver" },
      { label: "Contact", routeId: "contact" },
    ],
  }),
  landingPage({
    id: "thingsToDo",
    slug: "things-to-do-in-aglen",
    category: "Activity pillar",
    title: "Things To Do in Aglen | Nature, Fishing, AR Quests and Culture",
    metaDescription:
      "The complete list of things to do in Aglen for families, nature lovers, anglers, campers, photographers, and weekend travelers.",
    h1: "Things To Do In Aglen",
    intro:
      "Aglen works best as a compact activity base: walk, photograph, fish, camp, follow local stories, and connect the village with nearby Lovech-region routes.",
    image: images.aerial,
    imageAlt: "Aerial view of the Vit River corridor near Aglen",
    ctaLabel: "Ask about a guided walk",
    schemaType: "TravelGuide",
    sections: [
      { heading: "Top Activities", body: "Plan canyon walks, short hikes, river photography, fishing guidance, herb walks, AR quests, and picnic stops." },
      { heading: "By Traveler Type", body: "Families should choose short routes and picnic planning; photographers should prioritize morning and autumn light; anglers should ask about local etiquette and access." },
      { heading: "Seasonal Ideas", body: "Spring and autumn suit walking, summer suits river pauses and camping, and winter works for quiet village discovery." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Fishing in Aglen", routeId: "fishing" },
      { label: "Hiking around Aglen", routeId: "hiking" },
      { label: "AR Adventure", routeId: "quests" },
      { label: "Weekend itinerary", routeId: "weekendInAglen" },
    ],
  }),
  landingPage({
    id: "natureAroundAglen",
    slug: "nature-around-aglen",
    category: "Nature pillar",
    title: "Nature Around Aglen | Vit River, Canyons, Caves and Forests",
    metaDescription:
      "A nature guide to Aglen's river valley, limestone cliffs, caves, wildlife, and quiet rural landscapes.",
    h1: "Nature Around Aglen",
    intro:
      "The natural identity of Aglen comes from the Vit River valley, limestone formations, river pools, cave thresholds, forest edges, and a quiet rural landscape.",
    image: images.hero,
    imageAlt: "Limestone canyon and Vit River landscape near Aglen",
    ctaLabel: "Plan a nature route",
    schemaType: "TravelGuide",
    sections: [
      { heading: "Landscape", body: "Aglen combines river bends, rock forms, forest shade, and open village views in a small area that rewards slow observation." },
      { heading: "Responsible Travel", body: "Stay on practical paths, respect private land, avoid damaging cave or river habitats, and keep fishing and camping low-impact." },
      { heading: "Photo And Wildlife Notes", body: "The best visual moments often come from river light, cliff shadows, seasonal plants, birds, and the contrast between stone and water." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Vit River guide", routeId: "vitRiver" },
      { label: "Hiking routes", routeId: "hiking" },
      { label: "Caves and rock forms", routeId: "caves" },
      { label: "Eco tourism", routeId: "ecoTourismBulgaria" },
    ],
  }),
  landingPage({
    id: "historyOfAglen",
    slug: "history-of-aglen",
    category: "Cultural pillar",
    title: "History of Aglen | Village Memory, Kaleto and Local Legends",
    metaDescription:
      "Explore Aglen's history, local memory, archaeological traces, church heritage, and village stories.",
    h1: "History of Aglen",
    intro:
      "Aglen's history should be told with care: local memory, archaeological traces, church heritage, older routes, folklore names, and the unusual identity of the village name.",
    image: images.kaleto,
    imageAlt: "Stone ruins and hilltop landscape connected with Kaleto near Aglen",
    ctaLabel: "Book a guided story walk",
    schemaType: "Article",
    sections: [
      { heading: "Kaleto And Older Routes", body: "Kaleto gives Aglen a strong historical anchor, but claims should stay grounded in visible remains, local memory, and cited sources." },
      { heading: "Church And Village Memory", body: "St. Archangel Michael Church and village stories connect the destination with everyday continuity, family memory, and local identity." },
      { heading: "Legends As Local Memory", body: "Folklore and migration stories should be presented as local memory unless supported by stronger documentation." },
    ],
    faqs: [
      ...sharedFaqs,
      { question: "Is every Aglen legend proven history?", answer: "No. Folklore should be marked as local memory unless it is supported by reliable sources or visible evidence." },
    ],
    internalLinks: [
      { label: "Cultural tourism", routeId: "culturalTourism" },
      { label: "Attractions", routeId: "attractions" },
      { label: "Hidden Bulgaria Quests", routeId: "quests" },
      { label: "Editorial policy", routeId: "editorial" },
    ],
  }),
  landingPage({
    id: "accommodationNearAglen",
    slug: "accommodation-near-aglen",
    category: "Conversion page",
    title: "Accommodation Near Aglen | Guest Rooms, Camping and Villas",
    metaDescription:
      "Find quiet stays near Aglen for rural tourism, weekend trips, family travel, and nature escapes.",
    h1: "Accommodation Near Aglen",
    intro:
      "Accommodation content should convert without overpromising: guest rooms, camping options, villa-style stays, availability questions, and practical weekend planning.",
    image: images.church,
    imageAlt: "Village street and church context for stays near Aglen",
    ctaLabel: "Check accommodation",
    schemaType: "Article",
    sections: [
      { heading: "Where To Stay", body: "Position stays by visitor intent: quiet village rooms, camping near nature routes, and small-group villa escapes." },
      { heading: "Booking Tips", body: "Ask for dates, group size, language, transport, interests, food needs, and whether the trip includes fishing, hiking, or AR quests." },
      { heading: "Trust Notes", body: "Use real photos, transparent pricing, cancellation notes, host expectations, and clear contact options." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Visit Aglen", routeId: "visitAglen" },
      { label: "Camping near Aglen", routeId: "campingNearAglen" },
      { label: "Food near Aglen", routeId: "traditionalFood" },
      { label: "Contact", routeId: "contact" },
    ],
  }),
  landingPage({
    id: "traditionalFood",
    slug: "traditional-food-aglen",
    category: "Food guide",
    title: "Traditional Food Near Aglen | Rural Bulgarian Flavors",
    metaDescription:
      "Discover traditional food, seasonal produce, picnic ideas, and local culinary experiences around Aglen.",
    h1: "Traditional Food in Aglen",
    intro:
      "Food pages should focus on realistic rural travel: seasonal products, picnic planning, nearby restaurants, home-style flavors, and respectful guest expectations.",
    image: images.church,
    imageAlt: "Village setting for food and picnic planning near Aglen",
    ctaLabel: "Ask about local food",
    schemaType: "Article",
    sections: [
      { heading: "Local Flavors", body: "Frame food around seasonal produce, simple village meals, herbs, preserves, bread, dairy, and picnic-friendly planning." },
      { heading: "Nearby Options", body: "Where Aglen itself has limited formal restaurants, guide visitors toward nearby towns and host-arranged meals." },
      { heading: "Picnic Ideas", body: "Connect food content with river pauses, family routes, and low-waste rural travel." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Accommodation", routeId: "accommodationNearAglen" },
      { label: "Visit Aglen", routeId: "visitAglen" },
      { label: "Rural tourism", routeId: "ruralTourismBulgaria" },
    ],
  }),
  landingPage({
    id: "hiddenPlaces",
    slug: "hidden-places-near-aglen",
    category: "Discovery guide",
    title: "Hidden Places Near Aglen | Secret Nature and Village Routes",
    metaDescription:
      "Find quiet, lesser-known places near Aglen for slow travel, photography, nature walks, and cultural discovery.",
    h1: "Hidden Places Near Aglen",
    intro:
      "Hidden-place content should help visitors discover without damaging sensitive places: clear access notes, responsible behavior, and nearby route ideas.",
    image: images.cave,
    imageAlt: "Cave threshold and limestone landscape near Aglen",
    ctaLabel: "Request a hidden route",
    schemaType: "TravelGuide",
    sections: [
      { heading: "Local Places", body: "Use local names, rock forms, river bends, church context, Kaleto, and cave thresholds as discovery anchors." },
      { heading: "Responsible Access", body: "Do not expose unsafe or private locations without guidance. Use visitor-ready places first." },
      { heading: "Nearby Villages", body: "Connect Aglen with Lukovit, Karlukovo, Krushuna, Devetashka Cave, and Iskar-Panega when building weekend routes." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Lukovit", routeId: "lukovitGuide" },
      { label: "Karlukovo", routeId: "karlukovoGuide" },
      { label: "Krushuna", routeId: "krushunaGuide" },
      { label: "Devetashka Cave", routeId: "devetashkaCaveGuide" },
    ],
  }),
  landingPage({
    id: "culturalTourism",
    slug: "cultural-tourism-aglen",
    category: "Tourism landing page",
    title: "Cultural Tourism in Aglen | Church, Kaleto, Legends and AR Stories",
    metaDescription:
      "Discover cultural tourism in Aglen through the village church, Kaleto, local memory, legends, and AR storytelling.",
    h1: "Cultural Tourism in Aglen",
    intro:
      "Cultural tourism in Aglen should combine visible heritage, responsible storytelling, local voices, and AR layers that make village memory easier to explore.",
    image: images.kaleto,
    imageAlt: "Kaleto ruins and cultural landscape near Aglen",
    ctaLabel: "Book a guided story walk",
    schemaType: "TravelGuide",
    sections: [
      { heading: "Core Promise", body: "Church, Kaleto, village memory, legends, and AR storytelling create a cultural route that is intimate rather than museum-like." },
      { heading: "E-E-A-T Notes", body: "Name sources, mark uncertain folklore, show last updated dates, and explain how local knowledge was checked." },
      { heading: "Best Visitors", body: "Culture travelers, school groups, photographers, slow travelers, and families who like stories with places." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "History of Aglen", routeId: "historyOfAglen" },
      { label: "Hidden Bulgaria Quests", routeId: "quests" },
      { label: "School trips", routeId: "contact" },
    ],
  }),
  landingPage({
    id: "natureTourism",
    slug: "nature-tourism-aglen",
    category: "Tourism landing page",
    title: "Nature Tourism in Aglen | Vit River, Limestone Cliffs and Forest",
    metaDescription:
      "Plan nature tourism in Aglen around the Vit River, limestone cliffs, forest edges, caves, and quiet landscapes.",
    h1: "Nature Tourism in Aglen",
    intro:
      "Nature tourism is Aglen's broadest growth opportunity because it connects river walks, limestone scenery, photography, birding, camping, and low-impact travel.",
    image: images.hero,
    imageAlt: "Nature tourism landscape with river and limestone cliffs near Aglen",
    ctaLabel: "Plan a nature route",
    schemaType: "TravelGuide",
    sections: [
      { heading: "Core Promise", body: "Vit River, limestone cliffs, forest, caves, and quiet landscapes make Aglen a nature-first destination." },
      { heading: "Route Planning", body: "Build routes by time, difficulty, season, weather, and visitor type rather than selling one generic trail." },
      { heading: "Responsible Nature Notes", body: "Every route should include safety, access, waste, river, camping, and wildlife guidance." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Nature around Aglen", routeId: "natureAroundAglen" },
      { label: "Vit River", routeId: "vitRiver" },
      { label: "Camping", routeId: "campingNearAglen" },
    ],
  }),
  landingPage({
    id: "adventureTourism",
    slug: "adventure-tourism-aglen",
    category: "Tourism landing page",
    title: "Adventure Tourism in Aglen | AR Quests, Canyons and Cave Routes",
    metaDescription:
      "Explore adventure tourism in Aglen with AR quests, canyon walks, cave routes, and photo exploration.",
    h1: "Adventure Tourism in Aglen",
    intro:
      "Adventure in Aglen should stay accessible: AR quests, canyon walks, cave thresholds, photo exploration, and guided routes with realistic safety notes.",
    image: images.cave,
    imageAlt: "Cave and limestone route for adventure tourism near Aglen",
    ctaLabel: "Start the AR quest",
    schemaType: "TravelGuide",
    sections: [
      { heading: "Core Promise", body: "AR quests, canyon walks, cave routes, and photo exploration give Aglen an adventure angle without needing extreme sports." },
      { heading: "Safety Positioning", body: "Adventure pages should state route difficulty, terrain, footwear, weather, river caution, and when local guidance is recommended." },
      { heading: "Digital Layer", body: "Hidden Bulgaria Quests turns real locations into a story-led route and gives the destination a unique reason to visit." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Hidden Bulgaria Quests", routeId: "quests" },
      { label: "Hiking", routeId: "hiking" },
      { label: "Caves", routeId: "caves" },
    ],
  }),
  landingPage({
    id: "familyTrip",
    slug: "family-trip-aglen",
    category: "Tourism landing page",
    title: "Family Trip to Aglen | Short Walks, Picnics and Village Stories",
    metaDescription:
      "Plan a family trip to Aglen with short walks, safe picnic planning, educational stories, and easy weekend ideas.",
    h1: "Family Trip to Aglen",
    intro:
      "Aglen can be positioned as a quiet family nature destination with short walks, picnic stops, village stories, and easy day-trip planning.",
    image: images.pool,
    imageAlt: "Quiet river pool suitable for family route planning near Aglen",
    ctaLabel: "Plan a family weekend",
    schemaType: "TravelGuide",
    sections: [
      { heading: "Core Promise", body: "Short walks, safe picnic planning, educational stories, and AR quests make Aglen approachable for families." },
      { heading: "Planning Notes", body: "Give families route length, shade, water, toilets, parking, food, and weather guidance before they arrive." },
      { heading: "Educational Layer", body: "Use rocks, river, church, Kaleto, herbs, and local names to turn the visit into a discovery day." },
    ],
    faqs: [
      ...sharedFaqs,
      { question: "Is Aglen good for families?", answer: "Yes. Aglen is best positioned as a quiet family nature destination with short walks, picnic stops, village stories, and easy day-trip planning." },
    ],
    internalLinks: [
      { label: "Things to do", routeId: "thingsToDo" },
      { label: "Weekend itinerary", routeId: "weekendInAglen" },
      { label: "Accommodation", routeId: "accommodationNearAglen" },
    ],
  }),
  landingPage({
    id: "campingNearAglen",
    slug: "camping-near-aglen",
    category: "Tourism landing page",
    title: "Camping Near Aglen | Vit River Access and Responsible Camping",
    metaDescription:
      "Plan camping near Aglen with tent stays, river access, responsible camping notes, and route ideas.",
    h1: "Camping Near Aglen",
    intro:
      "Camping content should be practical and responsible: where to ask, how to prepare, what to avoid, and how to combine camping with river and canyon routes.",
    image: images.aerial,
    imageAlt: "Open landscape and river corridor for camping near Aglen",
    ctaLabel: "Check camping availability",
    schemaType: "Article",
    sections: [
      { heading: "Core Promise", body: "Tent stays, river access, quiet landscapes, and route ideas can make Aglen a low-impact camping base." },
      { heading: "Responsible Camping", body: "Explain waste, fire, noise, private land, river safety, and when visitors should ask for local permission." },
      { heading: "What To Bring", body: "Walking shoes, water, light, insect protection, layered clothing, charging options, and food planning are essential." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Accommodation", routeId: "accommodationNearAglen" },
      { label: "Nature tourism", routeId: "natureTourism" },
      { label: "Vit River", routeId: "vitRiver" },
    ],
  }),
  landingPage({
    id: "weekendInAglen",
    slug: "weekend-in-aglen",
    category: "Itinerary",
    title: "Weekend in Aglen | Two-Day Itinerary from Sofia, Pleven and Lovech",
    metaDescription:
      "Plan a two-day weekend in Aglen from Sofia, Pleven, Lovech, and Lukovit with nature, food, walks, and AR quests.",
    h1: "Weekend in Aglen",
    intro:
      "The weekend page should convert high-intent visitors into route requests by combining arrival, walks, food, accommodation, nearby trips, and contact CTAs.",
    image: images.hero,
    imageAlt: "Weekend travel landscape around Aglen and the Vit River",
    ctaLabel: "Request weekend plan",
    schemaType: "TravelGuide",
    sections: [
      { heading: "Day One", body: "Arrive via Lukovit, orient in the village, take a river or canyon walk, visit church/Kaleto context, and finish with a quiet evening." },
      { heading: "Day Two", body: "Choose fishing, AR quests, a photo route, or a nearby day trip to Karlukovo, Iskar-Panega, Krushuna, or Devetashka Cave." },
      { heading: "From Major Cities", body: "Create variants for Sofia, Pleven, Lovech, and Lukovit with realistic drive-time, meal, and accommodation planning." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Aglen from Sofia", routeId: "aglenFromSofia" },
      { label: "How to get to Aglen", routeId: "howToGet" },
      { label: "Nearby destinations", routeId: "nearby" },
    ],
  }),
  landingPage({
    id: "routeMap",
    slug: "aglen-route-map",
    category: "Route planning",
    title: "Aglen Route Map | River, Rocks, Village and Nearby Places",
    metaDescription:
      "Use the Aglen route map to connect the village center, Vit River, rock formations, caves, Kaleto, and nearby destinations.",
    h1: "Aglen Route Map",
    intro:
      "The route-map page acts as the internal linking spine between attractions, activities, geo pages, FAQ answers, and booking/contact CTAs.",
    image: images.aerial,
    imageAlt: "Aerial route map context for Aglen and the Vit River valley",
    ctaLabel: "Build my route",
    schemaType: "TravelGuide",
    sections: [
      { heading: "Core Stops", body: "Village center, Vit River path, Dupkata, Sloncheto, Chervena Stena, Rachkov Vir, church, Kaleto, and AR quest points." },
      { heading: "Nearby Clusters", body: "Route Aglen together with Lukovit, Karlukovo, Iskar-Panega, Krushuna, Devetashka Cave, and Lovech-region pages." },
      { heading: "Internal Linking Role", body: "Every attraction and activity page should link back to this route map and the main Visit Aglen pillar." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Visit Aglen", routeId: "visitAglen" },
      { label: "Attractions", routeId: "attractions" },
      { label: "Nearby destinations", routeId: "nearby" },
    ],
  }),
  landingPage({
    id: "bestTime",
    slug: "best-time-to-visit-aglen",
    category: "Practical info",
    title: "Best Time to Visit Aglen | Seasons, Weather and Route Ideas",
    metaDescription:
      "Find the best time to visit Aglen for walking, photography, river pauses, camping, fishing, and quiet rural travel.",
    h1: "Best Time to Visit Aglen",
    intro:
      "This page should answer seasonal intent clearly and link visitors toward the right route, activity, and contact option.",
    image: images.aerial,
    imageAlt: "Seasonal aerial landscape around Aglen and the Vit River",
    ctaLabel: "Choose my season",
    schemaType: "Article",
    sections: [
      { heading: "Spring", body: "April to June is strongest for walking, green landscapes, river light, flowers, and moderate temperatures." },
      { heading: "Summer", body: "Summer suits river pauses and camping, but visitors need shade, water, heat planning, and responsible access." },
      { heading: "Autumn And Winter", body: "September and October are excellent for photography and walks. Winter is quieter and works best for short village-focused visits." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Seasonal guide", routeId: "seasonal" },
      { label: "Weekend in Aglen", routeId: "weekendInAglen" },
      { label: "Nature tourism", routeId: "natureTourism" },
    ],
  }),
  landingPage({
    id: "howToGet",
    slug: "how-to-get-to-aglen",
    category: "Practical info",
    title: "How to Get to Aglen | Routes from Lukovit, Lovech, Pleven and Sofia",
    metaDescription:
      "Plan how to get to Aglen from Lukovit, Lovech, Pleven, and Sofia with route ideas and practical visitor notes.",
    h1: "How to Get to Aglen",
    intro:
      "How-to-get-there content captures high-intent visitors and should be honest about transport, route planning, parking, and the value of local guidance.",
    image: images.aerial,
    imageAlt: "Road and river valley context for reaching Aglen",
    ctaLabel: "Ask for directions",
    schemaType: "Article",
    sections: [
      { heading: "Nearest Town", body: "Lukovit is the strongest route modifier and should be connected clearly to Aglen, Iskar-Panega, and Karlukovo." },
      { heading: "From Sofia And Pleven", body: "Use Aglen as a weekend or day-trip add-on for travelers who already search for Northern Bulgaria hidden places." },
      { heading: "Arrival Notes", body: "Visitors should confirm road conditions, meeting points, local access, and route difficulty before walking toward river or rock areas." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Aglen from Sofia", routeId: "aglenFromSofia" },
      { label: "Lukovit guide", routeId: "lukovitGuide" },
      { label: "Route map", routeId: "routeMap" },
    ],
  }),
  landingPage({
    id: "aglenFromSofia",
    slug: "aglen-from-sofia",
    category: "Geo route",
    title: "Aglen from Sofia | Weekend Route to a Hidden Bulgaria Village",
    metaDescription:
      "Plan Aglen from Sofia as a weekend route with Lukovit, the Vit River, limestone landscapes, and nearby Northern Bulgaria stops.",
    h1: "Aglen from Sofia",
    intro:
      "This route page should capture Sofia weekend intent and make Aglen the quiet base or add-on for a Northern Bulgaria trip.",
    image: images.hero,
    imageAlt: "Hidden Bulgaria weekend landscape near Aglen",
    ctaLabel: "Request Sofia weekend plan",
    schemaType: "TravelGuide",
    sections: [
      { heading: "Why It Works", body: "Aglen gives Sofia travelers a different weekend: river, limestone, village stories, AR quests, and nearby cave routes." },
      { heading: "Suggested Structure", body: "Travel through Lukovit, visit Aglen's river and rock points, stay nearby, then add Iskar-Panega, Karlukovo, or Devetashka Cave." },
      { heading: "Conversion Notes", body: "Ask for group size, transport, arrival time, language, walking ability, and whether visitors want fishing, family, or photo routes." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Weekend in Aglen", routeId: "weekendInAglen" },
      { label: "How to get to Aglen", routeId: "howToGet" },
      { label: "Nearby destinations", routeId: "nearby" },
    ],
  }),
  landingPage({
    id: "lovechRegionGuide",
    slug: "lovech-region-travel-guide",
    category: "Geo page",
    title: "Lovech Region Travel Guide | Aglen, Lukovit, Caves and Waterfalls",
    metaDescription:
      "Use Aglen as part of a Lovech region travel route with Lukovit, Krushuna, Devetashka Cave, Karlukovo, and Iskar-Panega.",
    h1: "Lovech Region Travel Guide",
    intro:
      "The regional page builds authority beyond branded Aglen demand and connects the village with stronger regional search clusters.",
    image: images.aerial,
    imageAlt: "Northern Bulgaria landscape for Lovech region travel planning",
    ctaLabel: "Build a Lovech route",
    schemaType: "TravelGuide",
    sections: [
      { heading: "Aglen's Role", body: "Aglen adds quiet rural tourism, river routes, and AR storytelling to Lovech-region itineraries dominated by caves and waterfalls." },
      { heading: "Nearby Demand", body: "Lukovit, Karlukovo, Krushuna, Devetashka Cave, and Iskar-Panega pages should all link back into Aglen routes." },
      { heading: "Authority Strategy", body: "Use original photos, practical access notes, maps, and seasonal updates to compete with thin regional listings." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Lukovit", routeId: "lukovitGuide" },
      { label: "Krushuna", routeId: "krushunaGuide" },
      { label: "Devetashka Cave", routeId: "devetashkaCaveGuide" },
      { label: "Aglen", routeId: "visitAglen" },
    ],
  }),
  landingPage({
    id: "lukovitGuide",
    slug: "lukovit-travel-guide",
    category: "Geo page",
    title: "Lukovit Travel Guide | Aglen, Iskar-Panega and Karlukovo Routes",
    metaDescription:
      "Plan a Lukovit-area trip with Aglen, Iskar-Panega, Karlukovo, cave landscapes, river routes, and weekend ideas.",
    h1: "Lukovit Travel Guide",
    intro:
      "Lukovit is the nearest high-intent town modifier for Aglen and should be used as a practical route-planning bridge.",
    image: images.aerial,
    imageAlt: "River and limestone route planning near Lukovit and Aglen",
    ctaLabel: "Plan a Lukovit route",
    schemaType: "TravelGuide",
    sections: [
      { heading: "Why Lukovit Matters", body: "Many travelers know Lukovit or Iskar-Panega before they know Aglen, so the page should route that demand toward the village." },
      { heading: "Nearby Pairings", body: "Connect Lukovit with Aglen, Iskar-Panega, Karlukovo, Prohodna, and weekend nature itineraries." },
      { heading: "Visitor Intent", body: "Answer drive routes, day-trip combinations, family plans, photo stops, and quiet nature alternatives." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Aglen", routeId: "visitAglen" },
      { label: "Iskar-Panega", routeId: "iskarPanegaGuide" },
      { label: "Karlukovo", routeId: "karlukovoGuide" },
    ],
  }),
  landingPage({
    id: "karlukovoGuide",
    slug: "karlukovo-travel-guide",
    category: "Geo page",
    title: "Karlukovo Travel Guide | Caves, Karst Routes and Aglen Weekend Ideas",
    metaDescription:
      "Connect Karlukovo cave tourism with Aglen, hiking routes, limestone landscapes, and Northern Bulgaria weekend itineraries.",
    h1: "Karlukovo Travel Guide",
    intro:
      "Karlukovo brings cave and karst demand. Aglen can be positioned as a quieter nearby route with river, rock, and village-story value.",
    image: images.cave,
    imageAlt: "Cave and limestone landscape connected with Karlukovo and Aglen routes",
    ctaLabel: "Add Aglen to this route",
    schemaType: "TravelGuide",
    sections: [
      { heading: "Cave Tourism Cluster", body: "Use Karlukovo to connect Prohodna-style cave intent with Aglen's caves, rock forms, hiking, and weekend itinerary content." },
      { heading: "Route Pairing", body: "A strong weekend pairs cave landscapes with Aglen's river valley, AR quest, and slow village stay." },
      { heading: "Content Gap", body: "Most cave pages are attraction-only. Aglen can win with practical routes, safety notes, food, stay, and local story layers." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Caves around Aglen", routeId: "caves" },
      { label: "Hiking", routeId: "hiking" },
      { label: "Weekend in Aglen", routeId: "weekendInAglen" },
    ],
  }),
  landingPage({
    id: "krushunaGuide",
    slug: "krushuna-travel-guide",
    category: "Geo page",
    title: "Krushuna Travel Guide | Waterfalls, Lovech Region and Aglen Routes",
    metaDescription:
      "Pair Krushuna waterfall demand with Aglen, Devetashka Cave, Lovech region routes, and quiet rural weekend ideas.",
    h1: "Krushuna Travel Guide",
    intro:
      "Krushuna has established waterfall demand. This page helps route visitors from that demand toward Aglen as a quieter rural add-on.",
    image: images.pool,
    imageAlt: "Water and limestone landscape for Krushuna and Aglen route planning",
    ctaLabel: "Plan a Krushuna and Aglen route",
    schemaType: "TravelGuide",
    sections: [
      { heading: "Weekend Pairing", body: "Krushuna, Devetashka Cave, Lovech, Lukovit, and Aglen can form a richer Lovech-region itinerary." },
      { heading: "Aglen Advantage", body: "Aglen adds AR storytelling, village memory, river routes, and quiet stays to more famous nature stops." },
      { heading: "Practical Content", body: "Include route order, drive logic, meal planning, walking difficulty, and where Aglen fits best." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Lovech region", routeId: "lovechRegionGuide" },
      { label: "Devetashka Cave", routeId: "devetashkaCaveGuide" },
      { label: "Aglen", routeId: "visitAglen" },
    ],
  }),
  landingPage({
    id: "devetashkaCaveGuide",
    slug: "devetashka-cave-travel-guide",
    category: "Geo page",
    title: "Devetashka Cave Travel Guide | Add Aglen to a Lovech Region Route",
    metaDescription:
      "Use Devetashka Cave demand to plan a wider Lovech region trip with Krushuna, Lukovit, Aglen caves, and rural tourism.",
    h1: "Devetashka Cave Travel Guide",
    intro:
      "Devetashka Cave is a major attraction page opportunity that can route travelers toward Aglen's quieter cave, river, and village experiences.",
    image: images.cave,
    imageAlt: "Cave-inspired landscape for Devetashka and Aglen route planning",
    ctaLabel: "Extend the cave route",
    schemaType: "TravelGuide",
    sections: [
      { heading: "Route Strategy", body: "Connect Devetashka Cave with Krushuna, Lovech region travel, Aglen caves, and weekend itineraries." },
      { heading: "Why Add Aglen", body: "Aglen adds slow travel, river scenery, AR quests, local history, and accommodation inquiry paths." },
      { heading: "Search Advantage", body: "A practical route page can rank for nearby attraction combinations that thin destination pages often miss." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Krushuna", routeId: "krushunaGuide" },
      { label: "Lovech region", routeId: "lovechRegionGuide" },
      { label: "Aglen caves", routeId: "caves" },
    ],
  }),
  landingPage({
    id: "iskarPanegaGuide",
    slug: "iskar-panega-travel-guide",
    category: "Geo page",
    title: "Iskar-Panega Travel Guide | Blue-Water Trail and Aglen Nature Routes",
    metaDescription:
      "Connect Iskar-Panega trail demand near Lukovit with Aglen nature routes, hiking, photography, and weekend plans.",
    h1: "Iskar-Panega Travel Guide",
    intro:
      "Iskar-Panega captures trail and blue-water nature demand near Lukovit. Aglen should be the quieter nearby extension.",
    image: images.pool,
    imageAlt: "Blue-water river mood for Iskar-Panega and Aglen route planning",
    ctaLabel: "Combine Iskar-Panega with Aglen",
    schemaType: "TravelGuide",
    sections: [
      { heading: "Nearby Nature Demand", body: "Searchers for Iskar-Panega often want accessible nature, photography, and day-trip planning." },
      { heading: "Aglen Connection", body: "Link trail intent to Aglen's Vit River, canyon walks, fishing, camping, and nature tourism pages." },
      { heading: "Itinerary Role", body: "Use Aglen as a quieter second stop or overnight base in a Lukovit-area weekend." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Lukovit", routeId: "lukovitGuide" },
      { label: "Hiking", routeId: "hiking" },
      { label: "Nature around Aglen", routeId: "natureAroundAglen" },
    ],
  }),
  landingPage({
    id: "ruralTourismBulgaria",
    slug: "rural-tourism-bulgaria-aglen",
    category: "Topic page",
    title: "Rural Tourism in Bulgaria | Aglen as a Quiet Village Destination",
    metaDescription:
      "Explore rural tourism in Bulgaria through Aglen: village stays, local stories, nature routes, food, and slow weekend travel.",
    h1: "Rural Tourism in Bulgaria",
    intro:
      "This topic page positions Aglen inside broader rural Bulgaria demand while keeping the promise grounded in real village-scale experiences.",
    image: images.church,
    imageAlt: "Village landscape for rural tourism in Bulgaria",
    ctaLabel: "Plan a rural weekend",
    schemaType: "Article",
    sections: [
      { heading: "Why Aglen Fits", body: "Aglen offers quiet stays, local memory, river routes, food questions, and slower travel rather than mass tourism." },
      { heading: "Trust Signals", body: "Use real photos, transparent contact paths, route difficulty, source notes, and local review to build confidence." },
      { heading: "Content Angle", body: "Connect rural tourism with family trips, school discovery days, food, accommodation, and responsible visitor behavior." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Accommodation", routeId: "accommodationNearAglen" },
      { label: "Traditional food", routeId: "traditionalFood" },
      { label: "Slow travel", routeId: "slowTravelBulgaria" },
    ],
  }),
  landingPage({
    id: "ecoTourismBulgaria",
    slug: "eco-tourism-bulgaria-aglen",
    category: "Topic page",
    title: "Eco Tourism in Bulgaria | Aglen, Vit River and Responsible Travel",
    metaDescription:
      "Plan eco tourism in Bulgaria through Aglen with river walks, limestone nature, camping notes, wildlife care, and responsible travel rules.",
    h1: "Eco Tourism in Bulgaria",
    intro:
      "Eco-tourism content should help Aglen grow without harming the river, caves, wildlife, private land, or local rhythm.",
    image: images.hero,
    imageAlt: "Eco tourism landscape with river and limestone near Aglen",
    ctaLabel: "Plan a responsible nature route",
    schemaType: "Article",
    sections: [
      { heading: "Aglen's Eco Promise", body: "The Vit River, limestone cliffs, forest edges, birds, herbs, and quiet walking routes create a strong eco-tourism foundation." },
      { heading: "Responsible Rules", body: "Avoid litter, protect cave and river habitats, ask before crossing private spaces, keep noise low, and camp only where appropriate." },
      { heading: "Visitor Education", body: "Every eco page should include safety, access, source notes, image credits, and contact details for corrections." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Nature around Aglen", routeId: "natureAroundAglen" },
      { label: "Camping near Aglen", routeId: "campingNearAglen" },
      { label: "Vit River", routeId: "vitRiver" },
    ],
  }),
  landingPage({
    id: "slowTravelBulgaria",
    slug: "slow-travel-bulgaria-aglen",
    category: "Topic page",
    title: "Slow Travel in Bulgaria | Aglen and the Vit River Valley",
    metaDescription:
      "Discover slow travel in Bulgaria through Aglen: river light, village stories, local routes, food, photography, and quiet weekends.",
    h1: "Slow Travel in Bulgaria",
    intro:
      "Slow travel is Aglen's most natural positioning: fewer attractions rushed in one day, more time with the river, village, stories, and nearby landscapes.",
    image: images.aerial,
    imageAlt: "Slow travel landscape in the Vit River valley near Aglen",
    ctaLabel: "Build a slow route",
    schemaType: "Article",
    sections: [
      { heading: "Why Slow Travel Works", body: "Aglen rewards visitors who pause: river bends, rock names, quiet church context, Kaleto, photo light, and local conversations." },
      { heading: "Suggested Rhythm", body: "Choose one main walk, one food or picnic moment, one story route, and one nearby stop instead of overloading the day." },
      { heading: "Internal Links", body: "Slow travel should connect to rural tourism, accommodation, food, weekend itineraries, and hidden places." },
    ],
    faqs: sharedFaqs,
    internalLinks: [
      { label: "Rural tourism", routeId: "ruralTourismBulgaria" },
      { label: "Hidden places", routeId: "hiddenPlaces" },
      { label: "Weekend in Aglen", routeId: "weekendInAglen" },
    ],
  }),
  landingPage({
    id: "aiAnswerHub",
    slug: "aglen-answer-hub",
    category: "AI search hub",
    title: "Aglen Answer Hub | FAQ for Visitors, Search and AI Assistants",
    metaDescription:
      "Concise, cited answers about where Aglen is, what to do, best time to visit, how to get there, where to stay, and nearby attractions.",
    h1: "Aglen Answer Hub",
    intro:
      "This answer hub supports AI search, featured snippets, and visitors who need direct answers before choosing a route or contacting Aglen Tourism.",
    image: images.hero,
    imageAlt: "Aglen answer hub landscape with river and limestone cliffs",
    ctaLabel: "Ask a visitor question",
    schemaType: "Article",
    sections: [
      { heading: "Entity Answers", body: "Answer where Aglen is, what it is famous for, best time to visit, things to do, how to get there, where to stay, and nearby attractions." },
      { heading: "AI Search Notes", body: "Use clean headings, concise summaries, source notes, FAQ schema, Wikidata/OpenStreetMap consistency, and canonical guide URLs." },
      { heading: "Crawler Guidance", body: "The crawler policy and llms.txt-style guidance should point assistants toward canonical pages, not scraped fragments." },
    ],
    faqs: [
      ...sharedFaqs,
      { question: "What is Aglen famous for?", answer: "Aglen is known for its unusual Bulgarian name beginning with Ъ, the Vit River valley, limestone formations, caves, village memory, and Hidden Bulgaria Quests." },
      { question: "How do I book a route or experience?", answer: "Use the contact page with date, group size, language, interests, transport needs, and whether you want a guided walk, accommodation, fishing, or AR support." },
    ],
    internalLinks: [
      { label: "Crawler policy", routeId: "crawlerPolicy" },
      { label: "Visit Aglen", routeId: "visitAglen" },
      { label: "FAQ and contact", routeId: "contact" },
      { label: "Editorial policy", routeId: "editorial" },
    ],
  }),
];

export const landingPagesById = new Map(landingPages.map((page) => [page.id, page]));

export function isLandingPageId(routeId: string): routeId is LandingPageId {
  return landingPagesById.has(routeId as LandingPageId);
}
