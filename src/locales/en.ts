import { accommodationEn, images, negotiablePrice } from "./shared";
import type { PageCopy } from "./types";

export const en: PageCopy = {
  nav: { home: "Home", about: "About Aglen", landmarks: "Places", stay: "Stay", quests: "AR Quests", events: "Events", business: "Local business", guide: "Guide", arMissions: "AR Missions", visit: "Visit Aglen", visitGettingHere: "Getting here", visitRoutes: "Routes", visitChildren: "With children", visitMissions: "AR missions with Unlocking Bulgaria", visitWhen: "When to visit" },
  ub: {
    homeHeading: "Discover Aglen through Unlocking Bulgaria",
    homeText: "AR and GPS missions at real places around Aglen. Unlocking Bulgaria is an independent national app — Aglen is its first active destination.",
    seeMissions: "See active missions",
    externalLabel: "External app · unlockingbulgaria.com",
    hubTitle: "AR missions in Aglen with Unlocking Bulgaria",
    whatText: "Unlocking Bulgaria is an independent national app for AR and GPS missions at real places across Bulgaria. Aglen is its first active destination — the app is not part of the village website and is not owned by it.",
    missionsHeading: "Missions available around Aglen",
    needHeading: "What you need",
    needItems: ["A smartphone with a camera", "GPS turned on", "The Unlocking Bulgaria app"],
  },
  ui: { languageLabel: "Language", languageSelectAria: "Select language", modalCloseAria: "Close", mobileMenuAria: "Menu" },
  brand: { name: "Aglen", subtitle: "Village by the Vit River" },
  hero: { meta: "Northern Bulgaria · Vit River · Lukovit · Karlukovo", title: "AGLEN", subtitle: "The Hidden Treasure of the Vit River", lede: "Discover canyons, caves, river pools, and striking natural phenomena in the heart of Northern Bulgaria. Aglen is an ideal destination for walks, photography, fishing, and a peaceful weekend surrounded by nature.", primary: "Explore Aglen", secondary: "Download the App", cue: "Discover the valley", imageAlt: "Cinematic view of a river canyon and village landscape inspired by Aglen" },
  statsLabel: "Why visit Aglen",
  about: { eyebrow: "History and local memory", title: "The secrets of the Aglen rocks", text: "Behind the limestone massifs and the dozens of caves in the Lukovit karst near Aglen lies a story that spans millennia of geological transformation, Thracian cult practices, and Revival-era chronicles. Explore the layers below." },
  legends: { eyebrow: "Legends & Mysteries of Aglen", title: "Among the canyons, caves, and old paths around Aglen, every place carries its own story.", text: "The strongest stories here are not loud. They live in local names, cave thresholds, strange rock forms, and the bends of the river." },
  landmarks: { eyebrow: "Places to Explore", title: "The most beautiful places near Aglen", text: "From striking rock formations and river pools to panoramic views and historic sites – here nature and local legends turn every walk into a small discovery.", aria: "Route stops around Aglen" },
  experiences: { eyebrow: "Experiences", title: "Experience Aglen your own way", text: "Choose a walk, a photography adventure, fishing, or a weekend surrounded by nature, and discover the best of the region.", cta: "Ask about the route" },
  gallery: { eyebrow: "Nature gallery", title: "A place told through river light and stone", aria: "Aglen gallery" },
  stay: {
    eyebrow: "Accommodation in Aglen",
    title: "Stay surrounded by nature",
    text: "Choose a quiet place to stay and use Aglen as a starting point for exploring the natural riches of the region.",
  },
  quests: {
    eyebrow: "First of its kind in Bulgaria",
    title: "A real AR adventure near Aglen",
    text: "Unlocking Bulgaria takes you to real places - with your phone you see a hidden 3D world, solve riddles, and follow the Guardian's trail. Not a simulation. Not a museum. A real live adventure.",
    cta: "Download and start",
    features: [
      { id: "ar", title: "Augmented Reality (AR)", text: "What is hidden in these places? Point the camera and see the hidden world come alive before your eyes." },
      { id: "gps", title: "Live GPS missions", text: "Which place hides the next clue? Follow the GPS mission to the real landmarks around Aglen." },
      { id: "story", title: "History, told differently", text: "Who is the Guardian? What do the ancient signs protect? Reveal the legends of Prohodna Cave through a game." },
    ],
  },
  ar: {
    eyebrow: "AR Adventure",
    title: "See the Guardian's World",
    text: "With your phone camera, bring the hidden world of Prohodna to life. The AR layer reveals stories, signs, and characters invisible to the naked eye, but only in the places where they happened.",
    steps: [
      "Download the app",
      "Go to a marked AR place around Aglen",
      "Point your camera and see the hidden world",
    ],
    cta: "Download and start",
  },
  app: {
    eyebrow: "Download the App",
    title: "Unlocking Bulgaria",
    text: "A mobile app for Android. Find the missions around Aglen and set off on a real adventure.",
    badge: "Open Unlocking Bulgaria",
    note: "The official app website is unlockingbulgaria.com/bg/.",
  },
  contact: { eyebrow: "Plan your visit", title: "Plan your visit", text: "Get in touch for information about routes, landmarks, photography spots, fishing, accommodation, and ideas for an unforgettable weekend by the Vit River.", notesTitle: "Visitor notes", noteOne: "Suitable for eco-tourism, photography, fishing, hiking routes, cave visits, and a weekend in Northern Bulgaria – photography, river views, caves, and local memory.", noteTwo: "Bring comfortable shoes, water, sun protection, and respect for local spaces.", cta: "Send Inquiry" },
  events: {
    eyebrow: "Calendar",
    title: "Events in Aglen",
    text: "Festivals, village gatherings, plein-air meetups and seasonal happenings in Aglen and along the Vit River. Check back for upcoming dates.",
    emptyState: "Upcoming events coming soon. If you organise or know of an event in Aglen, share it with us.",
    dateLabel: "When",
    locationLabel: "Where",
    submitTitle: "Have a photo or news from Aglen?",
    submitText: "Send us a photo or event information. We review every submission before publishing.",
    submitCta: "Share a photo / info",
  },
  hub: {
    eyebrow: "Travel guide hub",
    title: "Plan Aglen by interest, route, and nearby place",
    text: "Dedicated guide pages connect the main destination story with visitor intent: attractions, hiking, fishing, caves, the Vit River, accommodation, food, seasonal updates, and nearby destinations.",
  },
  guides: {
    vitRiver: { label: "Vit River guide", text: "The Vit River is the heart of the region; with its many small paths, it offers thousands of places for walks, photography, fishing, and rest in nature." },
    fishing: { label: "Fishing by the Vit", text: "The Vit River offers beautiful and peaceful spots for fishing amid the nature of Northern Bulgaria." },
    hiking: { label: "Hiking routes", text: "Eco-trails and routes lead visitors to the most beautiful natural landmarks around Aglen." },
    caves: { label: "Caves and rock forms", text: "The area around Aglen and Karlukovo is known for its caves and striking limestone formations." },
    food: { label: "Food and local products", text: "Taste home-made products and traditional flavours characteristic of the Lukovit region." },
    nearby: { label: "Nearby destinations", text: "Combine your visit to Aglen with Prohodna, Karlukovo, Iskar–Panega, Lukovit, and other landmarks in the area." },
    seasonal: { label: "Seasonal guide", text: "Monthly updates for routes, photography, weather, and quiet weekend planning." },
  },
  highlights: [
    { label: "Hidden Bulgaria", value: "An authentic experience", detail: "Far from mass tourism, Aglen offers calm, beautiful nature, and a true sense of a Bulgarian village." },
    { label: "Nature", value: "Canyons, caves, and river", detail: "The area around the village impresses with limestone cliffs, caves, river pools, and some of the most beautiful natural landscapes in Northern Bulgaria." },
    { label: "Identity", value: "The only “Ъ”", detail: "Aglen is the only settlement in Bulgaria whose name begins with the letter “Ъ”." },
  ],
  timeline: [
    { title: "🪨 Land of rocks and caves", detail: "How nature created the Lukovit karst, the caves, and the striking limestone formations around Aglen.", intro: "The valley of the Vit River around the village of Aglen holds far more than the standard tourist legends of Ottoman persecutions and rock bridges. Behind the limestone massifs and the dozens of caves in this stretch of the Lukovit karst region lies a story that spans millennia of geological transformation, Thracian cult practices, and medieval spiritual isolationism.", sections: [
      { heading: "1. The geological anomaly: Why are the rocks here unique?", body: [
        "Geological surveys of the karst in the Lukovit area show that the rocks around Aglen are not merely ordinary limestones, but belong to the so-called Lom and April formations (mainly from the Lower Cretaceous).",
        "The underground water labyrinth: The Vit River in this stretch forms distinctive meanders, because millions of years ago it followed tectonic faults. Beneath today's riverbed and under the rock massifs there is a whole network of underground siphons and “dry” galleries that speleologists have still not fully mapped.",
        "The microclimate of the canyon: The vertical cliffs, in places up to 100 metres high, create a distinctive thermokarst microclimate. Because of the deep canyon and the cave springs, temperatures in the lower part beside the Vit sometimes differ by several degrees from those on the plateau, which has favoured the preservation of relict vegetation and specific karst biocenoses, studied by botanists as early as the beginning of the 20th century.",
      ] },
      { heading: "2. Traces of prehistory and the Thracians", body: [
        "Although the popular accounts focus on the era of Ottoman rule (such as the tragedy in the Selishteto locality and the Valovata dupka / Ochilatata cave), the archaeological traces in the caves around Aglen point to a much deeper antiquity:",
        "In the area of the rock arches and around the caves, isolated fragments of prehistoric pottery have been found (mainly from the Chalcolithic and the Early Bronze Age), which show that the caves served as temporary refuges for hunters and the first herders more than 4-5 millennia ago.",
        "Like the neighbouring Karlukovo-Iskar region, here too the hard-to-reach rock terraces were used by the Thracian tribes (the Triballi) for open-air sanctuaries linked to the cults of water, rock, and the underground forces. The karst springs in the area were revered as healing.",
      ] },
      { heading: "3. The etymology and the name of the village in old registers", body: [
        "The name Aglen is an absolute one-of-a-kind in Bulgarian toponymy - it is the only settlement in Bulgaria whose name begins with the letter “Ъ”.",
        "In Ottoman tax registers from the 15th and 16th centuries (describing the Sanjak of Nikopol), early variants of the name appear, derived from the root “glen” or “iglen” (according to some old traditions the settlement was originally called “Iglen grad golyama” because of the sharp rock needles and pinnacles above the river).",
        "Old geographical notes from the time of the Bulgarian Revival describe Aglen not merely as a small village, but as a strategic point on the route of the caravans crossing the Fore-Balkan, where the merchants relied on the natural rock shelters for protection against bandit attacks.",
      ] },
      { heading: "4. Literary and spiritual memory: Trifon Kunev", body: [
        "In the folklore and cultural memory of Aglen, a special place is held by the fact that this is the birthplace of the prominent Bulgarian writer, publicist, and feuilletonist Trifon Kunev (born in 1880).",
        "His memoirs and early works carry the distinctive spirit of the harsh yet picturesque nature of the Aglen rocks. Growing up in the shadow of these limestone giants and the Vit River, he later carried the sense of defiance and combativeness into his emblematic articles and his resistance against the totalitarian regimes, for which he went through severe ordeals in the camps after 1944. His deep moral backbone is often connected by scholars of his work with the “iron” and unassailable nature of his birthplace.",
      ] } ] },
    { title: "👣 The first people in the valley", detail: "Traces of prehistoric inhabitants, a Thracian presence, and life along the banks of the Vit River.", intro: "The first people in the river valley: the secrets of prehistoric settlement around Aglen. When people speak of what drew humans to river valleys, the popular sources usually stop at general phrases about “fertile land” and “drinking water”. But if we dig into the specialist archaeological records, the reports of old museum expeditions, and the ethnographic collections from the beginning of the 20th century, a far deeper picture emerges of why precisely this enclosed meander of the Vit River became a magnet for the ancient inhabitants.", sections: [
      { heading: "1. The strategic geography of the “river corridor”", body: [
        "In ancient times the Vit River was not merely a source of water, but a life-saving transport and communication corridor connecting the Danube plain with the Fore-Balkan passes.",
        "The natural amphitheatre: The valley around Aglen is a geologically enclosed amphitheatre, ringed by steep limestone terraces. In the eras when the climate was wetter and the forests impassable, these river valleys were the only safe paths for the movement of human communities and their herds.",
        "A microclimatic oasis: Sheltered from the winds by the high cliffs and sustained by the constant moisture of the river, the valley creates a mini-ecosystem. Here the winter temperatures were milder than on the open plateau, and the soils - the alluvial deposits along the Vit - allowed the first experiments with farming long before the rise of the iron industry.",
      ] },
      { heading: "2. Archaeological traces from the Neolithic and the Chalcolithic", body: [
        "Forgotten works by Bulgarian archaeologists from the middle of the last century mention finds that rarely make it onto the popular web pages.",
        "Flint as currency: On the terraces above the river in the Lukovit area, traces of Late Neolithic flint-working workshops have been found. The ancient people used the high-quality flint nodules occurring in the local limestones to make blades, knives, and arrowheads. This made the area not merely a place to live, but an industrial centre of early prehistory in the region.",
        "The cult of the first metallurgists: During the Chalcolithic the valley began to be visited by communities searching not only for food, but for raw materials. The proximity of the Fore-Balkan with its ore occurrences drew people to these river gateways, making them witnesses to the transition from stone to the first extraction of copper.",
      ] },
      { heading: "3. The local legends of the “first people in the rocks”", body: [
        "In the folklore notes collected by teachers and local historians in Aglen during the 1920s and 1930s and kept in regional archives, there are traditions that differ from the standard Turkish legends.",
        "The tale of the “two-legged shadows” in the rocks: In the past the old people of the village used to tell their children that in the deepest caves and beneath the rock overhangs there once lived “silent people” who did not light smoky fires so that the spirits of the mountain would not see them, and who fed on river mussels, wild garlic, and the meat of forest animals. Although it sounds like a myth, this oral memory describes with striking accuracy the way of life of the early hunter-gatherers of the Palaeolithic, who left the caves only during the warm season.",
        "The legend of the “golden furrow”: According to another old local belief, the first farmers who came to the valley cut their first furrow exactly where the river makes its sharpest bend beneath the cliff. They believed the earth there was “kissed by the chieftains of the underworld”, because the springs came out directly from the depths of the rock, bringing life even in times of great drought.",
      ] },
      { heading: "4. The path of the tribes: Triballi and Romans", body: [
        "When the valley began to be settled more permanently during the Iron Age, it fell within the lands of the powerful Thracian tribe of the Triballi.",
        "The archaeological indications suggest that these places were a crossroads between the Thracian world of the Balkan interior and the Danube tribes. The Vit River served as a landmark, and the people who settled in the valley built small accompanying settlements on the high terraces around today's village - places from which every approach from the north or the south can be seen.",
        "With the arrival of the Romans, this natural corridor was included in the strategy for guarding the roads that connected the Roman fortresses along the Danube with the interior of the province of Moesia, and the local population was drawn into the building of roads and the use of the fertile river terraces.",
      ] } ] },
    { title: "🏡 The birth of Aglen", detail: "How the village came into being, where its name comes from, and how it developed over the centuries.", intro: "The birth of Aglen: the secrets of the Ottoman registers, the forgotten hamlets, and the one-of-a-kind name. Folk memory often looks for the beginnings of settlements in deep antiquity, but the first reliable written evidence of Aglen comes from another era - from the tax registers compiled centuries after the Ottoman conquest of the Bulgarian lands.", sections: [
      { heading: "1. The Ottoman registers: the first written traces (15th-16th century)", body: [
        "Although folk memory often seeks the beginnings of settlements in deep antiquity, the written evidence for Aglen appears officially in the first centuries after the Ottoman conquest of the Bulgarian lands.",
        "The Sanjak of Nikopol: In the early Ottoman tax registers (defters) of the Nikopol pashalik from the 15th and 16th centuries, the village is mentioned in various phonetic variations adapted to the Turkish written pronunciation of the time - for example as part of timar holdings, or as a small settlement owing dues to the central authority.",
        "Population and livelihood: The registers show that although the area was exposed to strategic risks because of its closeness to the Vit River and the roads towards the Danube, life here never died out. The local people paid their taxes mainly in kind - wheat, maize (later on), small livestock, and beekeeping - taking advantage of the sheltered valleys hidden behind the rocks, which protected them from large-scale raids.",
      ] },
      { heading: "2. The riddle of the name: where does “Aglen” come from?", body: [
        "The name of the village is a linguistic phenomenon on the scale of the whole of Bulgaria - the only settlement beginning with the letter “Ъ”. In scholarly circles and in old ethnographic notes there are several theories about its origin.",
        "The charcoal theory (the craftsmen's version): According to more pragmatic historical research, the area around the canyon of the Vit River was once richly forested, and the local population was intensively engaged in charcoal burning - the production of wood charcoal, so necessary for the blacksmith's trade and for the smelting of metals in the past. The deposits and the charcoal kilns gave the settlement its name.",
        "The legend of the “needle rocks”: The old local traditions stubbornly preserve the version of a geographical origin for the name. Since sharp, sheer limestone pinnacles and rock needles rise above the river, the first settlers called the place “Iglen” (the place around the needles), which over time and through the local dialect was transformed into today's resonant and unique Aglen.",
      ] },
      { heading: "3. The local hamlets and the moving of the village over time", body: [
        "Like many other Bulgarian villages, Aglen has not always stood exactly where it stands today.",
        "The old settlements (the yurtluks): Within the village lands there are localities that appear in old geographical notes under the names “Selishteto” (The Settlement) or “Staro selo” (The Old Village). The archaeological traces there show that in earlier centuries people lived closer to the caves and the rock massifs, where safety was greater during the times of the kardzhali raids and the lawlessness of Ottoman rule.",
        "Consolidation during the Revival: With the calmer decades of the 19th century, the village began to move down towards the broader terraces along the river, where the conditions for farming and for life were better. It was then that the modern appearance of Aglen took shape, preserving the spirit of Revival architecture, the old family roots, and the combative character of its people, who gave Bulgaria remarkable figures such as the writer Trifon Kunev.",
      ] } ] },
    { title: "📜 Legends and local memory", detail: "Stories passed down from generation to generation - memories, traditions, and little-known local tales." },
    { title: "🌿 Aglen today", detail: "How the village preserves its history, its nature, and its spirit while looking towards the future." },
  ],
  mysteries: [
    { title: "Where the river leads", tag: "Hidden paths", image: images.hero, description: "The Vit does not reveal everything at once. The bends, shadows, and rocks turn the walk into a search." },
    { title: "The world of the caves", tag: "Stone and silence", image: images.cave, description: "The caves around Aglen and Karlukovo are among the most striking natural phenomena in the area and hold millions of years of history written in stone." },
    { title: "Names that tell stories", tag: "Folklore landscape", image: images.arch, description: "Places like Dupkata, Sloncheto, and Rachkov Vir turn the natural landscape into a place that is easy to remember." },
  ],
  placesList: [
    { id: "dupkata", title: "Dupkata", tag: "Rock arch", image: images.arch, imageAlt: "A natural rock arch above the Vit River near Aglen", description: "A natural rock arch above the Vit River and one of the most photogenic places around Aglen." },
    { id: "sloncheto", title: "Sloncheto", tag: "Rock figure", image: images.caveCard, imageAlt: "A rock window looking out over the limestone landscape near Aglen", description: "A curious rock form that has become one of the symbols of the region." },
    { id: "chervena-stena", title: "The Red Cliff", tag: "Canyon view", image: images.hero, imageAlt: "Canyon, river, and limestone cliffs near Aglen", description: "A striking view of the canyon landscape shaped by the cliffs and the river." },
    { id: "rachkov-vir", title: "Rachkov Vir", tag: "River pool", image: images.pool, imageAlt: "A clear river pool beneath limestone cliffs near Aglen", description: "A picturesque river pool, ideal for rest, photos, a natural river jacuzzi, and fishing." },
    { id: "st-archangel-michael", title: "St. Archangel Michael", tag: "Village memory", image: images.church, imageAlt: "Village church, stone lane, and green valley", description: "A historic church that preserves the village's spiritual heritage, built in 1888 in honour of the local people who died as victims of the Turkish raids." },
    { id: "kaleto", title: "Kaleto", tag: "Archaeology", image: images.kaleto, imageAlt: "Stone remains on a hill above canyon and river", description: "A locality connected with the ancient history of the area and the old roads along the Vit valley." },
  ],
  experiencesList: [
    { id: "canyonWalk", title: "Canyon Walk", price: negotiablePrice.en, duration: "2-3 hours", bestFor: "First-time visitors", description: "A route among cliffs, river views, and natural landmarks by the Vit." },
    { id: "photoTour", title: "River Photo Journey", price: negotiablePrice.en, duration: "Half day", bestFor: "Photographers", description: "The most beautiful places for landscape and nature photography around the village." },
    { id: "fishing", title: "Fishing by the Vit", price: negotiablePrice.en, duration: "2 hours", bestFor: "Slow travel", description: "Quiet spots by the river and the chance to enjoy nature in its purest form." },
    { id: "weekendEscape", title: "Aglen Weekend Escape", price: negotiablePrice.en, duration: "2 days", bestFor: "Couples and friends", description: "Two days among nature, local stories, and beautiful views." },
    { id: "herbs", title: "Herbs & Village Knowledge", price: negotiablePrice.en, duration: "90 min.", bestFor: "Curious travelers", description: "Get to know the richness of the local nature and the traditional knowledge of herbs." },
    { id: "schoolDay", title: "School Discovery Day", price: negotiablePrice.en, duration: "1 day", bestFor: "Student groups", description: "An educational experience that combines nature, history, and local legends." },
  ],
  galleryItems: [
    { title: "The Vit Canyon", image: images.hero, alt: "The Vit River at sunset with cliffs, trees, and a stony bank", size: "wide" },
    { title: "The Stone Arch", image: images.arch, alt: "Natural limestone arch above the river", size: "standard" },
    { title: "Cave Light", image: images.cave, alt: "Cave entrance with a view of the river and cliffs", size: "tall" },
    { title: "Above the Hidden Valley", image: images.aerial, alt: "Aerial view of river, cliffs, and village", size: "wide" },
    { title: "River retreat near Lukovit", image: images.nearbyRetreat, alt: "A calm water landscape with a floating wooden cabin near Lukovit and Aglen", size: "standard" },
  ],
  mapStops: [
    { title: "The village center", detail: "The walk begins at the heart of Aglen – the square, the church, and the old houses that keep the spirit of the village." },
    { title: "The path by the Vit", detail: "Follow the flow of the Vit River along scenic banks, shaded trees, and beautiful views of the rocks." },
    { title: "Dupkata", detail: "One of the most iconic natural symbols of Aglen – an impressive rock arch shaped by nature over millennia." },
    { title: "Caves and rock phenomena", detail: "Discover the hidden world of karst relief – caves, rock formations, and places with an incomparable atmosphere." },
  ],
  accommodationList: accommodationEn,
  sourceNotes: ["Created by DevOpsio - devopsio.co", "All images are by local photographers and are used with permission."],
};

