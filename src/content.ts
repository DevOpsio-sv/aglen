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

type PageCopy = {
  nav: {
    home: string;
    story: string;
    legends: string;
    places: string;
    map: string;
    contact: string;
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
  timeline: string[];
  mysteries: Mystery[];
  placesList: Place[];
  experiencesList: Experience[];
  galleryItems: GalleryItem[];
  mapStops: MapStop[];
  sourceNotes: string[];
};

export const languages: { code: LanguageCode; label: string; short: string }[] = [
  { code: "bg", label: "Български", short: "BG" },
  { code: "en", label: "English", short: "EN" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "ru", label: "Русский", short: "RU" },
  { code: "ja", label: "日本語", short: "JA" },
  { code: "es", label: "Español", short: "ES" },
];

const images = {
  hero: "/assets/aglen-hero-river-canyon.png",
  arch: "/assets/aglen-rock-arch.png",
  cave: "/assets/aglen-cave-mystery.png",
  aerial: "/assets/aglen-aerial-river.png",
};

const prices = ["50 лв.", "80 лв.", "20 лв.", "120 лв.", "40 лв.", "70 лв."];

export const contentByLanguage: Record<LanguageCode, PageCopy> = {
  bg: {
    nav: { home: "Начало", story: "История", legends: "Легенди", places: "Места", map: "Маршрути", contact: "Посещение" },
    brand: { name: "Ъглен", subtitle: "Aglen · река Вит" },
    hero: {
      meta: "Северна България · река Вит · близо до Луковит",
      title: "ЪГЛЕН",
      subtitle: "Скритото съкровище на река Вит",
      lede: "Място, където варовикови скали, тиха гора, пещери и селски легенди се срещат.",
      primary: "Разгледай Ъглен",
      secondary: "Планирай посещение",
      cue: "Открий долината",
      imageAlt: "Кинематографична гледка към речен каньон и селски пейзаж, вдъхновени от Ъглен",
    },
    statsLabel: "Защо да посетите Ъглен",
    story: {
      eyebrow: "История и местна памет",
      title: "Пластове време край реката",
      text: "Ъглен не е просто точка на картата. Разказът му събира пещери, речни пътеки, стари маршрути, селска памет и рядко име, което остава в съзнанието.",
    },
    legends: {
      eyebrow: "Легенди и мистерии на Ъглен",
      title: "Някои места се откриват бавно.",
      text: "Най-силните истории тук не са шумни. Те живеят в местните имена, пещерните прагове, странните скални форми и завоите на реката.",
    },
    places: {
      eyebrow: "Места за откриване",
      title: "Каньон, река, пещери и селска тишина",
      text: "Компактна дестинация с рядка комбинация от природни забележителности и местни истории. Най-доброто посещение е спокойно: върви, слушай, снимай и остави място за откритие.",
    },
    experiences: {
      eyebrow: "Избери своя уикенд в Ъглен",
      title: "Водени моменти, не туристически списък",
      text: "Екскурзиите са оформени като ясни преживявания: достатъчно кратки за уикенд, достатъчно лични, за да се почувстват местни.",
      cta: "Запитай за маршрута",
    },
    gallery: { eyebrow: "Имерсивна галерия", title: "Място, разказано чрез речна светлина и камък", aria: "Галерия Ъглен" },
    map: {
      eyebrow: "Карта за откриватели",
      title: "Следвай реката. Намери камъка.",
      text: "Използвай Ъглен като база за бавен маршрут: център на селото, пътеката край Вит, скални места, пещерен терен и гледки по залез.",
      aria: "Маршрутни точки около Ъглен",
    },
    contact: {
      eyebrow: "Планирай посещение",
      title: "Прекарай уикенд там, където Вит пази тайните си.",
      text: "Попитай за маршрути, водени разходки, места за снимки, местни истории и практична информация за посетители.",
      notesTitle: "Бележки за посетители",
      noteOne: "Подходящо за природни разходки, фотография, речни гледки, пещери и местна памет.",
      noteTwo: "Носи удобни обувки, вода, защита от слънце и уважение към местните пространства.",
      cta: "Изпрати запитване",
    },
    highlights: [
      { label: "Скрита България", value: "Тихо село край Вит", detail: "За посетители, които предпочитат откриване, речни пътеки, скали, пещери и тишина." },
      { label: "Природа", value: "Река, варовик, гора", detail: "Пейзажът около селото е оформен от Вит, естествени скални форми, каньонни гледки и пещерен терен." },
      { label: "Идентичност", value: "Рядкото име Ъглен", detail: "Познато като единственото българско село, започващо с буквата Ъ." },
    ],
    timeline: [
      "Палеолитни следи в близки пещери подсказват ранно човешко присъствие в района.",
      "Римски път и укрепени останки свързват района със стари маршрути и движение.",
      "Местната легенда за преселници от Чурек пази памет за заселване и убежище.",
      "Паметта за 1877 г. остава част от историческото уважение и идентичност на селото.",
      "Днес Ъглен може да расте като тиха дестинация за екотуризъм, занаяти и бавно пътуване.",
    ],
    mysteries: [
      { title: "Където реката изчезва от поглед", tag: "Скрити пътеки", image: images.hero, description: "Вит не разкрива всичко наведнъж. Завоите, сенките и скалите превръщат разходката в търсене." },
      { title: "Пещерните прагове", tag: "Камък и тишина", image: images.cave, description: "Пещерите около района принадлежат на по-старата памет на земята: геоложка, човешка и символична." },
      { title: "Скали с местни имена", tag: "Фолклорен пейзаж", image: images.arch, description: "Имена като Дупката и Слончето правят пейзажа личен. Те са забележителности и истории едновременно." },
    ],
    placesList: [
      { title: "Дупката", tag: "Скална арка", image: images.arch, imageAlt: "Варовикова скална арка над реката край Ъглен", description: "Естествена каменна арка над Вит, създадена за бавни разходки, тихи снимки и усещане за скрит маршрут." },
      { title: "Слончето", tag: "Скална фигура", image: images.arch, imageAlt: "Варовикови скали и гора край река Вит", description: "Игрива крайречна форма, която превръща обикновената разходка в малко откритие." },
      { title: "Червена стена", tag: "Каньонна гледка", image: images.aerial, imageAlt: "Каньонен пейзаж с река и село", description: "Драматична среща на варовик, гора и речна светлина близо до селото." },
      { title: "Рачков вир", tag: "Речен вир", image: images.hero, imageAlt: "Тих речен вир и горист каньон", description: "Спокойна природна точка за пауза край водата, пикник и по-бавен ритъм до Вит." },
      { title: "Св. Архангел Михаил", tag: "Селска памет", image: images.aerial, imageAlt: "Традиционни селски къщи в зелена долина", description: "Църквата от 1888 г. пази човешкия пласт от историята на Ъглен." },
      { title: "Калето", tag: "Археология", image: images.cave, imageAlt: "Пещерен вход и варовикови текстури", description: "Място, свързано със стари маршрути, укрепена памет и дългия живот край реката." },
    ],
    experiencesList: [
      { title: "Каньонна разходка", price: prices[0], duration: "2-3 часа", bestFor: "Първо посещение", description: "Водени гледки към Вит, скални форми и местните имена зад пейзажа." },
      { title: "Речно фото пътешествие", price: prices[1], duration: "Полуден", bestFor: "Фотографи", description: "Подбрани места около реката, скалите, старите улици и меката естествена светлина." },
      { title: "Риболов край Вит", price: prices[2], duration: "2 часа", bestFor: "Бавно пътуване", description: "Тих местен ритъм край водата с практични насоки и грижа към реката." },
      { title: "Уикенд бягство в Ъглен", price: prices[3], duration: "2 дни", bestFor: "Двойки и приятели", description: "Разходки, пикник, занаяти и вечерен маршрут през селски истории." },
      { title: "Билки и селско знание", price: prices[4], duration: "90 мин.", bestFor: "Любопитни пътешественици", description: "Разпознаване на билки, традиционна употреба и отговорно събиране." },
      { title: "Ученически ден за откриване", price: prices[5], duration: "1 ден", bestFor: "Ученически групи", description: "Полеви маршрут през география, история, местни легенди и природозащита." },
    ],
    galleryItems: [
      { title: "Каньонът на Вит", image: images.hero, alt: "Кинематографичен речен каньон и село при изгрев", size: "wide" },
      { title: "Каменната арка", image: images.arch, alt: "Естествена варовикова арка над реката", size: "standard" },
      { title: "Пещерна светлина", image: images.cave, alt: "Пещерен вход с топла светлина", size: "tall" },
      { title: "Над скритата долина", image: images.aerial, alt: "Въздушна гледка към река, скали и село", size: "wide" },
    ],
    mapStops: [
      { title: "Центърът на селото", detail: "Започни от човешкия мащаб на Ъглен: улици, църква, местна памет и ориентация." },
      { title: "Пътеката край Вит", detail: "Следвай водата към тихи гледки, завои и сенчести места за фотография." },
      { title: "Дупката", detail: "Естествен каменен праг и един от силните визуални символи на дестинацията." },
      { title: "Пещери и скални форми", detail: "Открий по-стария пейзаж с внимание, местно водене и уважение към терена." },
    ],
    sourceNotes: ["Създаден от DevOpsio - www.devopsio.eu", "Публичен исторически и туристически контекст: Banker.bg, Trip.dir.bg, BTA/Utro, Wikipedia/Wikitravel."],
  },
  en: {
    nav: { home: "Home", story: "Story", legends: "Legends", places: "Places", map: "Routes", contact: "Visit" },
    brand: { name: "Aglen", subtitle: "Vit River destination" },
    hero: { meta: "Northern Bulgaria · Vit River · Near Lukovit", title: "AGLEN", subtitle: "The Hidden Treasure of the Vit River", lede: "Where limestone cliffs, quiet forests, caves, and village legends meet.", primary: "Explore Aglen", secondary: "Plan Your Visit", cue: "Discover the valley", imageAlt: "Cinematic view of a river canyon and village landscape inspired by Aglen" },
    statsLabel: "Why visit Aglen",
    story: { eyebrow: "History and local memory", title: "Layers of time beside the river", text: "Aglen is not only a point on the map. Its story gathers caves, river paths, older routes, village memory, and the rare name that stays with visitors." },
    legends: { eyebrow: "Legends & Mysteries of Aglen", title: "Some places are found slowly.", text: "The strongest stories here are not loud. They live in local names, cave thresholds, unusual rock forms, and the way the river disappears around a bend." },
    places: { eyebrow: "Places to Explore", title: "Canyon, river, caves, and village silence", text: "A compact destination with a rare mix of natural landmarks and local stories. The best visit is unhurried: walk, listen, photograph, and leave space for discovery." },
    experiences: { eyebrow: "Choose your Aglen weekend", title: "Guided moments, not tourist checklists", text: "The excursions become clear visitor journeys: short enough for a weekend, personal enough to feel local, and visual enough to remember.", cta: "Request this route" },
    gallery: { eyebrow: "Immersive Gallery", title: "A place told through river light and stone", aria: "Aglen gallery" },
    map: { eyebrow: "Explorer Map", title: "Follow the river. Find the stone.", text: "Use Aglen as a base for a slow route: village center, Vit River path, rock landmarks, cave terrain, and sunset viewpoints.", aria: "Route stops around Aglen" },
    contact: { eyebrow: "Plan your visit", title: "Spend a weekend where the Vit keeps its secrets.", text: "Ask for routes, guided walks, photo spots, local stories, and practical visitor information.", notesTitle: "Visitor notes", noteOne: "Best for nature walks, photography, river viewpoints, caves, and local memory.", noteTwo: "Bring walking shoes, water, sun protection, and respect for private/local spaces.", cta: "Send Inquiry" },
    highlights: [
      { label: "Hidden Bulgaria", value: "A quiet village on the Vit", detail: "For visitors who prefer discovery, river paths, cliffs, caves, and silence over crowded routes." },
      { label: "Nature", value: "River, limestone, forest", detail: "The landscape is shaped by the Vit River, natural rock forms, canyon views, and cave terrain." },
      { label: "Identity", value: "The rare name Aglen", detail: "Known as the only Bulgarian village beginning with the letter Ъ." },
    ],
    timeline: ["Paleolithic traces in nearby caves suggest early human presence in the surrounding landscape.", "Roman road evidence and fortified remains connect the area with older movement and trade routes.", "The local migration legend from Churek keeps the story of settlement and refuge alive.", "The memory of 1877 remains part of the village's historical respect and identity.", "Today Aglen can grow as a quiet destination for eco-tourism, crafts, slow travel, and local storytelling."],
    mysteries: [
      { title: "Where the River Disappears from View", tag: "Hidden routes", image: images.hero, description: "The Vit does not reveal everything at once. Bends, shadows, and cliff lines turn a short walk into a search." },
      { title: "The Cave Thresholds", tag: "Stone and silence", image: images.cave, description: "The caves belong to the older memory of the land: geological, human, and symbolic without exaggeration." },
      { title: "Rock Shapes with Local Names", tag: "Folklore landscape", image: images.arch, description: "Names like Дупката and Слончето make the landscape feel personal: landmarks and stories at once." },
    ],
    placesList: [
      { title: "Дупката", tag: "Rock arch", image: images.arch, imageAlt: "Limestone rock arch above the river near Aglen", description: "A natural stone arch above the Vit, made for slow walks, quiet photographs, and the feeling of entering a hidden route." },
      { title: "Слончето", tag: "Rock figure", image: images.arch, imageAlt: "Warm limestone rock formations and forest near the Vit River", description: "A playful riverside rock shape that turns a simple walk into a small act of discovery." },
      { title: "Червена стена", tag: "Canyon view", image: images.aerial, imageAlt: "Aerial canyon landscape with river and village", description: "A dramatic meeting of limestone, forest, and river light close to the village." },
      { title: "Рачков вир", tag: "River pool", image: images.hero, imageAlt: "Quiet river pool and forested canyon landscape", description: "A calm natural point for a pause by the water, a picnic, and a slower rhythm beside the Vit." },
      { title: "St. Archangel Michael", tag: "Village memory", image: images.aerial, imageAlt: "Traditional village homes in the green valley landscape", description: "The village church, built in 1888, keeps the human layer of Aglen's story close to the landscape." },
      { title: "Калето", tag: "Archaeology", image: images.cave, imageAlt: "Cave opening and limestone textures in Northern Bulgaria", description: "A place connected with older routes, fortified memory, and the long continuity of life around the river." },
    ],
    experiencesList: [
      { title: "Canyon Walk", price: prices[0], duration: "2-3 hours", bestFor: "First-time visitors", description: "Guided views toward the Vit, rock forms, and the local names behind the landscape." },
      { title: "River Photo Journey", price: prices[1], duration: "Half day", bestFor: "Photographers", description: "Selected places around the river, rocks, old village streets, and soft natural light." },
      { title: "Fishing by the Vit", price: prices[2], duration: "2 hours", bestFor: "Slow travel", description: "A quiet local rhythm by the water with practical guidance and care for the river." },
      { title: "Aglen Weekend Escape", price: prices[3], duration: "2 days", bestFor: "Couples and friends", description: "Walks, picnic time, crafts, and an evening route through village stories." },
      { title: "Herbs & Village Knowledge", price: prices[4], duration: "90 min.", bestFor: "Curious travelers", description: "Recognizing herbs, traditional uses, and responsible gathering in the local landscape." },
      { title: "School Discovery Day", price: prices[5], duration: "1 day", bestFor: "Student groups", description: "A field route through geography, history, local legends, and nature protection." },
    ],
    galleryItems: [
      { title: "Vit River Canyon", image: images.hero, alt: "Cinematic river canyon and village at sunrise", size: "wide" },
      { title: "The Stone Arch", image: images.arch, alt: "Natural limestone rock arch above the river", size: "standard" },
      { title: "Cave Light", image: images.cave, alt: "Cave entrance with warm light and river beyond", size: "tall" },
      { title: "Above the Hidden Valley", image: images.aerial, alt: "Aerial view of river, cliffs, and rural village", size: "wide" },
    ],
    mapStops: [
      { title: "Village Center", detail: "Start with the human scale of Aglen: streets, church, local memory, and orientation." },
      { title: "Vit River Path", detail: "Follow the water toward quiet viewpoints, bends, and shaded places for photography." },
      { title: "Дупката", detail: "A natural stone threshold and one of the strongest visual symbols of the destination." },
      { title: "Caves & Rock Forms", detail: "Explore the older landscape layer with care, local guidance, and respect for terrain." },
    ],
    sourceNotes: ["Original Wix site and service list: https://vasilevasilvena.wixsite.com/aglen", "Public travel/history context: Banker.bg, Trip.dir.bg, BTA/Utro, Wikipedia/Wikitravel summaries.", "Generated draft visuals are placeholders for final owner-approved Aglen photography."],
  },
  de: {
    nav: { home: "Start", story: "Geschichte", legends: "Legenden", places: "Orte", map: "Routen", contact: "Besuch" },
    brand: { name: "Aglen", subtitle: "Reiseziel am Vit" },
    hero: { meta: "Nordbulgarien · Fluss Vit · nahe Lukovit", title: "AGLEN", subtitle: "Der verborgene Schatz am Fluss Vit", lede: "Wo Kalksteinfelsen, stille Waelder, Hoehlen und Dorflegenden zusammentreffen.", primary: "Aglen entdecken", secondary: "Besuch planen", cue: "Tal entdecken", imageAlt: "Cinematische Ansicht eines Flusscanyons und Dorflandschaft bei Aglen" },
    statsLabel: "Warum Aglen besuchen",
    story: { eyebrow: "Geschichte und lokale Erinnerung", title: "Zeitschichten am Fluss", text: "Aglen ist nicht nur ein Punkt auf der Karte. Seine Geschichte verbindet Hoehlen, Flusswege, alte Routen, Dorfgedaechtnis und einen seltenen Namen." },
    legends: { eyebrow: "Legenden und Mysterien von Aglen", title: "Manche Orte findet man langsam.", text: "Die staerksten Geschichten sind hier leise. Sie leben in lokalen Namen, Hoehlenschwellen, Felsformen und Flussbiegungen." },
    places: { eyebrow: "Orte zum Entdecken", title: "Canyon, Fluss, Hoehlen und Dorfstille", text: "Ein kompaktes Reiseziel mit Natur, lokalen Geschichten und ruhiger Entdeckung." },
    experiences: { eyebrow: "Waehle dein Aglen-Wochenende", title: "Gefuehrte Momente statt Checkliste", text: "Kurze, persoenliche Erlebnisse fuer ein Wochenende mit lokalem Charakter.", cta: "Route anfragen" },
    gallery: { eyebrow: "Immersive Galerie", title: "Ein Ort aus Flusslicht und Stein", aria: "Aglen Galerie" },
    map: { eyebrow: "Entdeckerkarte", title: "Folge dem Fluss. Finde den Stein.", text: "Nutze Aglen als Basis fuer eine langsame Route: Dorfzentrum, Vit-Ufer, Felsen, Hoehlen und Aussichtspunkte.", aria: "Routenpunkte um Aglen" },
    contact: { eyebrow: "Besuch planen", title: "Verbringe ein Wochenende dort, wo der Vit seine Geheimnisse bewahrt.", text: "Frage nach Routen, gefuehrten Spaziergaengen, Fotopunkten und praktischen Besucherinfos.", notesTitle: "Hinweise", noteOne: "Ideal fuer Naturspaziergaenge, Fotografie, Flussblicke, Hoehlen und lokale Erinnerung.", noteTwo: "Bring Wanderschuhe, Wasser, Sonnenschutz und Respekt fuer lokale Orte mit.", cta: "Anfrage senden" },
    highlights: [
      { label: "Verborgenes Bulgarien", value: "Ein stilles Dorf am Vit", detail: "Fuer Besucher, die Entdeckung, Flusswege, Felsen, Hoehlen und Ruhe suchen." },
      { label: "Natur", value: "Fluss, Kalkstein, Wald", detail: "Die Landschaft wird vom Vit, Felsformen, Canyonblicken und Hoehlengelaende gepraegt." },
      { label: "Identitaet", value: "Der seltene Name Aglen", detail: "Bekannt als das einzige bulgarische Dorf, das mit dem Buchstaben Ъ beginnt." },
    ],
    timeline: ["Palaeolithische Spuren in nahen Hoehlen deuten auf fruehe menschliche Praesenz.", "Roemische Strassenreste und Befestigungen verbinden die Gegend mit alten Routen.", "Die lokale Legende von Siedlern aus Churek bewahrt Erinnerung an Zuflucht.", "Die Erinnerung an 1877 bleibt Teil der lokalen Identitaet.", "Heute kann Aglen als ruhiges Ziel fuer Oekotourismus, Handwerk und langsames Reisen wachsen."],
    mysteries: [
      { title: "Wo der Fluss aus dem Blick verschwindet", tag: "Verborgene Wege", image: images.hero, description: "Der Vit zeigt nicht alles auf einmal. Biegungen, Schatten und Felsen machen den Weg zur Suche." },
      { title: "Die Schwellen der Hoehlen", tag: "Stein und Stille", image: images.cave, description: "Die Hoehlen tragen eine aeltere Erinnerung der Landschaft: geologisch, menschlich und symbolisch." },
      { title: "Felsen mit lokalen Namen", tag: "Folklore-Landschaft", image: images.arch, description: "Namen wie Дупката und Слончето machen die Landschaft persoenlich." },
    ],
    placesList: [],
    experiencesList: [],
    galleryItems: [],
    mapStops: [],
    sourceNotes: [],
  },
  ru: {
    nav: { home: "Главная", story: "История", legends: "Легенды", places: "Места", map: "Маршруты", contact: "Визит" },
    brand: { name: "Ъглен", subtitle: "Ъглен · река Вит" },
    hero: { meta: "Северная Болгария · река Вит · рядом с Луковитом", title: "ЪГЛЕН", subtitle: "Скрытое сокровище реки Вит", lede: "Где известняковые скалы, тихие леса, пещеры и деревенские легенды встречаются.", primary: "Исследовать Аглен", secondary: "Планировать визит", cue: "Открыть долину", imageAlt: "Кинематографичный вид речного каньона и деревенского пейзажа Аглена" },
    statsLabel: "Почему стоит посетить Аглен",
    story: { eyebrow: "История и местная память", title: "Слои времени у реки", text: "Аглен не просто точка на карте. Его история соединяет пещеры, речные тропы, старые маршруты, деревенскую память и редкое имя." },
    legends: { eyebrow: "Легенды и тайны Аглена", title: "Некоторые места открываются медленно.", text: "Самые сильные истории здесь звучат тихо: в местных названиях, пещерах, скалах и поворотах реки." },
    places: { eyebrow: "Места для открытия", title: "Каньон, река, пещеры и деревенская тишина", text: "Небольшое направление с редким сочетанием природы и местных историй. Лучше всего приезжать без спешки." },
    experiences: { eyebrow: "Выберите выходные в Аглене", title: "Маршруты с проводником, а не список достопримечательностей", text: "Короткие и личные впечатления для выходных, наполненные местным характером.", cta: "Запросить маршрут" },
    gallery: { eyebrow: "Иммерсивная галерея", title: "Место, рассказанное светом реки и камнем", aria: "Галерея Аглена" },
    map: { eyebrow: "Карта исследователя", title: "Следуйте за рекой. Найдите камень.", text: "Используйте Аглен как базу для медленного маршрута: центр села, тропа у Вита, скалы, пещеры и виды на закате.", aria: "Маршрутные точки вокруг Аглена" },
    contact: { eyebrow: "Планировать визит", title: "Проведите выходные там, где Вит хранит свои тайны.", text: "Спросите о маршрутах, прогулках с проводником, местах для фото и практической информации.", notesTitle: "Заметки для посетителей", noteOne: "Подходит для прогулок, фотографии, речных видов, пещер и местной памяти.", noteTwo: "Возьмите удобную обувь, воду, защиту от солнца и уважение к местным пространствам.", cta: "Отправить запрос" },
    highlights: [],
    timeline: [],
    mysteries: [],
    placesList: [],
    experiencesList: [],
    galleryItems: [],
    mapStops: [],
    sourceNotes: [],
  },
  ja: {
    nav: { home: "ホーム", story: "物語", legends: "伝説", places: "見どころ", map: "ルート", contact: "訪問" },
    brand: { name: "アグレン", subtitle: "ヴィト川の旅先" },
    hero: { meta: "ブルガリア北部 · ヴィト川 · ルコヴィト近郊", title: "AGLEN", subtitle: "ヴィト川に隠れた宝物", lede: "石灰岩の崖、静かな森、洞窟、村の伝説が出会う場所。", primary: "アグレンを見る", secondary: "訪問を計画", cue: "谷を発見", imageAlt: "アグレンをイメージした川の峡谷と村の風景" },
    statsLabel: "アグレンを訪れる理由",
    story: { eyebrow: "歴史と土地の記憶", title: "川辺に重なる時間", text: "アグレンは地図上の一点ではありません。洞窟、川沿いの道、古いルート、村の記憶、そして忘れにくい名前が重なります。" },
    legends: { eyebrow: "アグレンの伝説と謎", title: "ゆっくり見つかる場所がある。", text: "ここで強い物語は静かです。地名、洞窟の入り口、不思議な岩、川の曲がり角に残っています。" },
    places: { eyebrow: "見どころ", title: "峡谷、川、洞窟、村の静けさ", text: "自然のランドマークと地元の物語がまとまった小さな目的地。急がず歩き、聞き、撮影し、発見を待つ場所です。" },
    experiences: { eyebrow: "アグレンの週末を選ぶ", title: "観光リストではなく、案内される時間", text: "週末に合う短さと、土地らしさを感じる個人的な体験です。", cta: "ルートを問い合わせる" },
    gallery: { eyebrow: "没入型ギャラリー", title: "川の光と石で語られる場所", aria: "アグレンのギャラリー" },
    map: { eyebrow: "探検マップ", title: "川をたどり、石を見つける。", text: "村の中心、ヴィト川沿い、岩の名所、洞窟地形、夕日の展望地へゆっくり進みます。", aria: "アグレン周辺のルート地点" },
    contact: { eyebrow: "訪問を計画", title: "ヴィト川が秘密を守る場所で週末を。", text: "ルート、ガイド付き散策、写真スポット、地元の話、実用的な訪問情報を問い合わせてください。", notesTitle: "訪問メモ", noteOne: "自然散策、写真、川の景色、洞窟、地元の記憶に向いています。", noteTwo: "歩きやすい靴、水、日よけ、地域への敬意を持ってお越しください。", cta: "問い合わせる" },
    highlights: [],
    timeline: [],
    mysteries: [],
    placesList: [],
    experiencesList: [],
    galleryItems: [],
    mapStops: [],
    sourceNotes: [],
  },
  es: {
    nav: { home: "Inicio", story: "Historia", legends: "Leyendas", places: "Lugares", map: "Rutas", contact: "Visita" },
    brand: { name: "Aglen", subtitle: "Destino del río Vit" },
    hero: { meta: "Norte de Bulgaria · río Vit · cerca de Lukovit", title: "AGLEN", subtitle: "El tesoro oculto del río Vit", lede: "Donde los acantilados calizos, bosques tranquilos, cuevas y leyendas del pueblo se encuentran.", primary: "Explorar Aglen", secondary: "Planear visita", cue: "Descubre el valle", imageAlt: "Vista cinematográfica de un cañón fluvial y paisaje rural inspirado en Aglen" },
    statsLabel: "Por qué visitar Aglen",
    story: { eyebrow: "Historia y memoria local", title: "Capas de tiempo junto al río", text: "Aglen no es solo un punto en el mapa. Su historia reúne cuevas, caminos de río, rutas antiguas, memoria del pueblo y un nombre raro." },
    legends: { eyebrow: "Leyendas y misterios de Aglen", title: "Algunos lugares se descubren despacio.", text: "Las historias más fuertes aquí no son ruidosas. Viven en nombres locales, umbrales de cuevas, rocas extrañas y curvas del río." },
    places: { eyebrow: "Lugares para explorar", title: "Cañón, río, cuevas y silencio rural", text: "Un destino compacto con una rara mezcla de naturaleza e historias locales. La mejor visita es lenta: caminar, escuchar, fotografiar y dejar espacio al descubrimiento." },
    experiences: { eyebrow: "Elige tu fin de semana en Aglen", title: "Momentos guiados, no listas turísticas", text: "Experiencias claras para visitantes: cortas para un fin de semana, personales y memorables.", cta: "Solicitar ruta" },
    gallery: { eyebrow: "Galería inmersiva", title: "Un lugar contado con luz de río y piedra", aria: "Galería de Aglen" },
    map: { eyebrow: "Mapa explorador", title: "Sigue el río. Encuentra la piedra.", text: "Usa Aglen como base para una ruta lenta: centro del pueblo, camino del Vit, rocas, cuevas y miradores al atardecer.", aria: "Puntos de ruta alrededor de Aglen" },
    contact: { eyebrow: "Planear visita", title: "Pasa un fin de semana donde el Vit guarda sus secretos.", text: "Pregunta por rutas, paseos guiados, lugares para fotos, historias locales e información práctica.", notesTitle: "Notas para visitantes", noteOne: "Ideal para paseos en la naturaleza, fotografía, vistas al río, cuevas y memoria local.", noteTwo: "Trae calzado cómodo, agua, protección solar y respeto por los espacios locales.", cta: "Enviar consulta" },
    highlights: [],
    timeline: [],
    mysteries: [],
    placesList: [],
    experiencesList: [],
    galleryItems: [],
    mapStops: [],
    sourceNotes: [],
  },
};

for (const language of ["de", "ru", "ja", "es"] as LanguageCode[]) {
  contentByLanguage[language].placesList = contentByLanguage.en.placesList;
  contentByLanguage[language].experiencesList = contentByLanguage.en.experiencesList;
  contentByLanguage[language].galleryItems = contentByLanguage.en.galleryItems;
  contentByLanguage[language].mapStops = contentByLanguage.en.mapStops;
  contentByLanguage[language].sourceNotes = contentByLanguage.en.sourceNotes;
}

contentByLanguage.ru.highlights = [
  { label: "Скрытая Болгария", value: "Тихое село у Вита", detail: "Для тех, кто выбирает открытие, речные тропы, скалы, пещеры и тишину." },
  { label: "Природа", value: "Река, известняк, лес", detail: "Пейзаж создан рекой Вит, скалами, каньонными видами и пещерным рельефом." },
  { label: "Идентичность", value: "Редкое имя Аглен", detail: "Известно как единственное болгарское село, начинающееся с буквы Ъ." },
];
contentByLanguage.ja.highlights = [
  { label: "隠れたブルガリア", value: "ヴィト川沿いの静かな村", detail: "混雑よりも発見、川沿いの道、崖、洞窟、静けさを求める人へ。" },
  { label: "自然", value: "川、石灰岩、森", detail: "ヴィト川、岩の形、峡谷の眺め、洞窟地形が風景を作ります。" },
  { label: "アイデンティティ", value: "珍しい名前 Aglen", detail: "ブルガリア語の Ъ で始まる唯一の村として知られています。" },
];
contentByLanguage.es.highlights = [
  { label: "Bulgaria oculta", value: "Un pueblo tranquilo en el Vit", detail: "Para visitantes que prefieren descubrimiento, senderos de río, rocas, cuevas y silencio." },
  { label: "Naturaleza", value: "Río, caliza, bosque", detail: "El paisaje está formado por el río Vit, rocas naturales, vistas de cañón y cuevas." },
  { label: "Identidad", value: "El raro nombre Aglen", detail: "Conocido como el único pueblo búlgaro que empieza con la letra Ъ." },
];

for (const language of ["ru", "ja", "es"] as LanguageCode[]) {
  contentByLanguage[language].timeline = contentByLanguage.en.timeline;
  contentByLanguage[language].mysteries = contentByLanguage.en.mysteries;
}
