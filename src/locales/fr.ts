import { images, negotiablePrice } from "./shared";
import type { PageCopy } from "./types";

export const fr: PageCopy = {
  nav: { home: "Accueil", about: "À propos", landmarks: "Lieux", stay: "Hébergement", quests: "Missions AR", events: "Événements", business: "Commerces locaux" },
  ui: { languageLabel: "Langue", languageSelectAria: "Choisir la langue", modalCloseAria: "Fermer", mobileMenuAria: "Menu" },
  brand: { name: "Aglen", subtitle: "Village au bord de la rivière Vit" },
  hero: { meta: "Nord de la Bulgarie · rivière Vit · Lukovit · Karlukovo", title: "AGLEN", subtitle: "Le trésor caché de la rivière Vit", lede: "Découvrez canyons, grottes, bassins fluviaux et phénomènes naturels impressionnants au cœur du nord de la Bulgarie. Aglen est une destination idéale pour les promenades, la photographie, la pêche et un week-end paisible en pleine nature.", primary: "Explorer Aglen", secondary: "Télécharger l'app", cue: "Découvrir la vallée", imageAlt: "Vue cinématographique d'un canyon fluvial et d'un paysage de village inspirés d'Aglen" },
  statsLabel: "Pourquoi visiter Aglen",
  about: { eyebrow: "Histoire et mémoire locale", title: "Les secrets des falaises d'Aglen", text: "Derrière les massifs calcaires et les dizaines de grottes du karst de Lukovit près d'Aglen se cache une histoire qui traverse des millénaires de transformations géologiques, de pratiques cultuelles thraces et de chroniques du Renouveau national. Explorez les couches ci-dessous." },
  legends: { eyebrow: "Légendes et mystères d'Aglen", title: "Parmi les canyons, les grottes et les anciens sentiers autour d'Aglen, chaque lieu porte sa propre histoire.", text: "Les histoires les plus fortes ici ne sont pas bruyantes. Elles vivent dans les noms locaux, les seuils des grottes, les formes rocheuses étranges et les méandres de la rivière." },
  landmarks: { eyebrow: "Lieux à découvrir", title: "Les plus beaux lieux autour d'Aglen", text: "Des formations rocheuses impressionnantes et des bassins fluviaux aux panoramas et sites historiques – ici, la nature et les légendes locales transforment chaque promenade en petite découverte.", aria: "Étapes autour d'Aglen" },
  experiences: { eyebrow: "Expériences", title: "Vivez Aglen à votre façon", text: "Choisissez une promenade, une aventure photographique, la pêche ou un week-end en pleine nature et découvrez le meilleur de la région.", cta: "Demander l'itinéraire" },
  gallery: { eyebrow: "Galerie naturelle", title: "Un lieu raconté par la lumière de la rivière et la pierre", aria: "Galerie d'Aglen" },
  stay: { eyebrow: "Hébergement à Aglen", title: "Restez au cœur de la nature", text: "Choisissez un lieu paisible où passer la nuit et faites d'Aglen votre point de départ pour explorer les richesses naturelles de la région." },
  quests: {
    eyebrow: "Une première en Bulgarie",
    title: "Une vraie aventure AR près d'Aglen",
    text: "Unlocking Bulgaria vous mène vers des lieux réels - avec votre téléphone, vous voyez un monde 3D caché, résolvez des énigmes et suivez les traces du Gardien. Pas une simulation. Pas un musée. Une vraie aventure vivante.",
    cta: "Télécharger et commencer",
    features: [
      { id: "ar", title: "Réalité augmentée (AR)", text: "Qu'est-ce qui se cache dans ces lieux ? Pointez la caméra et voyez le monde caché prendre vie sous vos yeux." },
      { id: "gps", title: "Missions GPS en direct", text: "Quel lieu cache l'indice suivant ? Suivez la mission GPS jusqu'aux vrais sites autour d'Aglen." },
      { id: "story", title: "L'histoire autrement", text: "Qui est le Gardien ? Que protègent les anciens signes ? Révélez les légendes de la grotte Prohodna à travers un jeu." },
    ],
  },
  ar: { eyebrow: "Aventure AR", title: "Regardez le monde du Gardien", text: "Avec la caméra de votre téléphone, donnez vie au monde caché de Prohodna. La couche AR révèle des histoires, des signes et des personnages invisibles à l'oeil nu, mais seulement aux endroits où ils se sont produits.", steps: ["Téléchargez l'application", "Allez vers un lieu AR marqué autour d'Aglen", "Pointez la caméra et voyez le monde caché"], cta: "Télécharger et commencer" },
  app: { eyebrow: "Télécharger l'app", title: "Unlocking Bulgaria", text: "Application mobile pour Android. Trouvez les missions autour d'Aglen et partez pour une vraie aventure.", badge: "Ouvrir Unlocking Bulgaria", note: "Le site officiel de l'app est unlockingbulgaria.com/bg/." },
  contact: { eyebrow: "Planifier la visite", title: "Planifiez votre visite", text: "Contactez-nous pour toute information sur les itinéraires, les sites, les lieux de photographie, la pêche, l'hébergement et des idées pour un week-end inoubliable au bord de la rivière Vit.", notesTitle: "Notes visiteurs", noteOne: "Idéal pour l'écotourisme, la photographie, la pêche, les sentiers de randonnée, la visite de grottes et un week-end dans le nord de la Bulgarie, avec vues de rivière, grottes et mémoire locale.", noteTwo: "Prévoyez des chaussures confortables, de l'eau, une protection solaire et du respect pour les lieux.", cta: "Envoyer une demande" },
  events: {
    eyebrow: "Calendrier",
    title: "Événements à Aglen",
    text: "Fêtes, rassemblements villageois, rencontres en plein air et événements saisonniers à Aglen et le long de la rivière Vit. Revenez pour les prochaines dates.",
    emptyState: "Événements à venir bientôt. Si vous organisez ou connaissez un événement à Aglen, partagez-le avec nous.",
    dateLabel: "Quand",
    locationLabel: "Où",
    submitTitle: "Vous avez une photo ou une actualité d'Aglen ?",
    submitText: "Envoyez-nous une photo ou des informations sur un événement. Nous examinons chaque contribution avant publication.",
    submitCta: "Partager une photo / info",
  },
  hub: {
    eyebrow: "Guide touristique",
    title: "Planifier Aglen par intérêt, itinéraire et lieu proche",
    text: "Les guides spécialisés relient l'histoire principale de la destination à l'intention du visiteur : sites, randonnée, pêche, grottes, la rivière Vit, hébergement, nourriture, mises à jour saisonnières et destinations proches.",
  },
  guides: {
    vitRiver: { label: "Guide de la rivière Vit", text: "La rivière Vit est le cœur de la région ; avec ses nombreux petits sentiers, elle offre des milliers de lieux pour se promener, photographier, pêcher et se reposer en pleine nature." },
    fishing: { label: "Pêche sur le Vit", text: "La rivière Vit offre de beaux endroits paisibles pour pêcher au cœur de la nature du nord de la Bulgarie." },
    hiking: { label: "Itinéraires de randonnée", text: "Des écosentiers et des itinéraires mènent les visiteurs vers les plus belles curiosités naturelles autour d'Aglen." },
    caves: { label: "Grottes et formations rocheuses", text: "La région autour d'Aglen et de Karlukovo est réputée pour ses grottes et ses impressionnantes formations calcaires." },
    food: { label: "Nourriture et produits locaux", text: "Goûtez des produits faits maison et des saveurs traditionnelles typiques de la région de Lukovit." },
    nearby: { label: "Destinations proches", text: "Combinez la visite d'Aglen avec Prohodna, Karlukovo, Iskar–Panega, Lukovit et d'autres curiosités de la région." },
    seasonal: { label: "Guide saisonnier", text: "Mises à jour mensuelles pour les itinéraires, la photographie, la météo et la planification d'un week-end tranquille." },
  },
  highlights: [
    { label: "Bulgarie cachée", value: "Une expérience authentique", detail: "Loin du tourisme de masse, Aglen offre calme, belle nature et un véritable esprit de village bulgare." },
    { label: "Nature", value: "Canyons, grottes et rivière", detail: "Les environs du village impressionnent par leurs falaises calcaires, leurs grottes, leurs bassins fluviaux et certains des plus beaux paysages naturels du nord de la Bulgarie." },
    { label: "Identité", value: "Le seul « Ъ »", detail: "Aglen est la seule localité de Bulgarie dont le nom commence par la lettre « Ъ »." },
  ],
  timeline: [
    {
      title: "Terre de falaises et de grottes",
      detail: "Les falaises calcaires et les grottes autour d'Aglen composent l'un des paysages naturels les plus impressionnants de la région de Lukovit et de la rivière Vit.",
      intro: "La vallée de la rivière Vit autour du village d'Aglen garde bien plus que les légendes touristiques classiques de persécutions ottomanes et de ponts rocheux. Derrière les massifs calcaires et les dizaines de grottes de ce secteur de la région karstique de Lukovit se cache une histoire qui traverse des millénaires de transformations géologiques, de pratiques cultuelles thraces et d'isolationnisme spirituel médiéval.",
      sections: [
        {
          heading: "1. L'anomalie géologique : pourquoi les falaises d'ici sont-elles uniques ?",
          body: [
            "Les études géologiques du karst de la région de Lukovit montrent que les roches autour d'Aglen ne sont pas de simples calcaires ordinaires, mais appartiennent aux couches dites de Lomets et d'Aprilci (principalement du Crétacé inférieur).",
            "Le labyrinthe aquatique souterrain : dans ce secteur, la rivière Vit dessine des méandres particuliers, car il y a des millions d'années elle suivait des failles tectoniques. Sous le lit actuel de la rivière et sous les massifs rocheux s'étend tout un réseau de siphons souterrains et de galeries « sèches » qui ne sont toujours pas entièrement cartographiés par les spéléologues.",
            "Le microclimat du canyon : les falaises verticales, hautes par endroits jusqu'à 100 mètres, créent un microclimat thermokarstique particulier. En raison du canyon profond et des sources cavernicoles, les températures dans la partie basse près de la Vit diffèrent parfois de plusieurs degrés de celles du plateau, ce qui a favorisé la conservation d'une végétation relique et de biocénoses karstiques spécifiques, étudiées par les botanistes dès le début du XXe siècle.",
          ],
        },
        {
          heading: "2. Les traces de la préhistoire et des Thraces",
          body: [
            "Bien que les récits populaires se concentrent sur l'époque de la domination ottomane (comme la tragédie du lieu-dit Selishteto et de la grotte Valovata dupka / Ochilatata), les traces archéologiques dans les grottes autour d'Aglen renvoient à une antiquité bien plus profonde :",
            "Autour des arches rocheuses et des grottes, on a retrouvé des fragments isolés de céramique préhistorique (principalement du Chalcolithique et du début de l'âge du bronze), qui montrent que les grottes servaient de refuges temporaires aux chasseurs et aux premiers éleveurs il y a déjà plus de 4 à 5 millénaires.",
            "Comme dans la région voisine de Karlukovo et de l'Iskar, ici aussi les terrasses rocheuses difficiles d'accès étaient utilisées par les tribus thraces (les Triballes) comme sanctuaires à ciel ouvert, liés aux cultes de l'eau, de la roche et des forces souterraines. Les sources karstiques de la région étaient vénérées comme guérisseuses.",
          ],
        },
        {
          heading: "3. L'étymologie et le nom du village dans les anciens registres",
          body: [
            "Le nom Aglen est un cas absolument unique dans la toponymie bulgare : c'est le seul village de Bulgarie dont le nom commence par la lettre « Ъ ».",
            "Dans les registres fiscaux ottomans des XVe et XVIe siècles (décrivant le sandjak de Nikopol), on rencontre des variantes anciennes du nom, dérivées de la racine « glen » ou « iglen » (selon certaines vieilles légendes, le village s'appelait à l'origine « Iglen grad golyama » en raison des aiguilles et dents rocheuses acérées au-dessus de la rivière).",
            "Les anciennes notes géographiques de l'époque du Renouveau national bulgare décrivent Aglen non pas comme un simple petit village, mais comme un point stratégique sur la route des caravanes traversant l'Avant-Balkan, où les marchands comptaient sur les abris rocheux naturels pour se protéger des attaques de brigands.",
          ],
        },
        {
          heading: "4. La mémoire littéraire et spirituelle : Trifon Kounev",
          body: [
            "Dans la mémoire folklorique et culturelle d'Aglen, une place particulière revient au fait que c'est ici qu'est né l'éminent écrivain, publiciste et feuilletoniste bulgare Trifon Kounev (né en 1880).",
            "Ses souvenirs et ses premières œuvres portent l'esprit particulier de la nature rude mais pittoresque des falaises d'Aglen. Ayant grandi à l'ombre de ces colosses calcaires et de la rivière Vit, il transpose plus tard ce sentiment de rébellion et de combativité dans ses articles emblématiques et sa résistance aux régimes totalitaires, ce qui lui vaut de traverser de dures épreuves dans les camps après 1944. Les spécialistes de son œuvre associent souvent sa profonde force morale à la nature « de fer » et inaccessible de son lieu natal.",
          ],
        },
      ],
    },
    {
      title: "Les hommes découvrent la vallée",
      detail: "Les conditions favorables au bord de la rivière attirent les hommes depuis les temps anciens et font de la région un lieu naturel de vie et de passage.",
    },
    {
      title: "Le village apparaît",
      detail: "Au fil du temps se forme une communauté liée à la rivière, à la terre et aux traditions qui font aujourd'hui encore partie du caractère d'Aglen.",
    },
    {
      title: "Histoires et souvenirs",
      detail: "Les légendes, coutumes et souvenirs locaux gardent vivant l'esprit du village et créent un lien entre le passé et le présent.",
    },
    {
      title: "Aglen aujourd'hui",
      detail: "L'avenir d'Aglen est le plus fort s'il reste authentique. Aujourd'hui, le village est une destination prisée des amateurs de nature, de photographie, de pêche et de week-ends tranquilles.",
    },
  ],
  mysteries: [
    { title: "Là où la rivière mène", tag: "Sentiers cachés", image: images.hero, description: "La Vit ne révèle pas tout d'un coup. Les méandres, les ombres et les falaises transforment la promenade en quête." },
    { title: "Le monde des grottes", tag: "Pierre et silence", image: images.cave, description: "Les grottes autour d'Aglen et de Karlukovo comptent parmi les phénomènes naturels les plus impressionnants de la région et gardent des millions d'années d'histoire inscrites dans la pierre." },
    { title: "Des noms qui racontent des histoires", tag: "Paysage folklorique", image: images.arch, description: "Des lieux-dits comme Dupkata, Sloncheto et Rachkov vir rendent le paysage naturel facile à mémoriser." },
  ],
  placesList: [
    { id: "dupkata", title: "Dupkata", tag: "Arche rocheuse", image: images.caveCard, imageAlt: "Fenêtre rocheuse avec vue sur le paysage calcaire près d'Aglen", description: "Une arche rocheuse naturelle au-dessus de la rivière Vit et l'un des lieux les plus photogéniques autour d'Aglen." },
    { id: "sloncheto", title: "Sloncheto", tag: "Figure rocheuse", image: images.hero, imageAlt: "Canyon, rivière et falaises calcaires près d'Aglen", description: "Une curieuse formation rocheuse devenue l'un des symboles de la région." },
    { id: "chervena-stena", title: "Chervena stena", tag: "Vue de canyon", image: images.riverSunsetCard, imageAlt: "La rivière Vit au coucher du soleil avec rochers et arbres près d'Aglen", description: "Une vue impressionnante sur le paysage de canyon façonné par les roches et la rivière." },
    { id: "rachkov-vir", title: "Rachkov vir", tag: "Bassin de rivière", image: images.nearbyRetreatCard, imageAlt: "Plan d'eau paisible avec maison en bois et rive calcaire près de Lukovit et d'Aglen", description: "Un bassin de rivière pittoresque, idéal pour se reposer, prendre des photos, profiter d'un jacuzzi naturel et pêcher." },
    { id: "st-archangel-michael", title: "Saint Archange Michel", tag: "Mémoire villageoise", image: images.church, imageAlt: "Église de village, rue pavée et vallée verte", description: "Un temple historique qui préserve l'héritage spirituel du village, construit en 1888 en hommage aux habitants tombés, victimes des raids ottomans." },
    { id: "kaleto", title: "Kaleto", tag: "Archéologie", image: images.kaleto, imageAlt: "Vestiges de pierre sur une colline au-dessus du canyon et de la rivière", description: "Un lieu lié à l'histoire ancienne de la région et aux vieilles routes de la vallée de la Vit." },
  ],
  experiencesList: [
    { id: "canyonWalk", title: "Promenade du canyon", price: negotiablePrice.fr, duration: "2-3 h", bestFor: "Première visite", description: "Un itinéraire parmi les rochers, les vues sur la rivière et les curiosités naturelles au bord de la Vit." },
    { id: "photoTour", title: "Voyage photo sur la rivière", price: negotiablePrice.fr, duration: "Demi-journée", bestFor: "Photographes", description: "Les plus beaux endroits pour la photographie de paysage et de nature autour du village." },
    { id: "fishing", title: "Pêche près de la Vit", price: negotiablePrice.fr, duration: "2 h", bestFor: "Voyage lent", description: "Des endroits paisibles au bord de la rivière et l'occasion de profiter de la nature dans sa forme la plus pure." },
    { id: "weekendEscape", title: "Week-end à Aglen", price: negotiablePrice.fr, duration: "2 jours", bestFor: "Couples et amis", description: "Deux jours au cœur de la nature, entre histoires locales et beaux paysages." },
    { id: "herbs", title: "Herbes et savoir villageois", price: negotiablePrice.fr, duration: "90 min", bestFor: "Voyageurs curieux", description: "Découvrez la richesse de la nature locale et les savoirs traditionnels sur les plantes." },
    { id: "schoolDay", title: "Journée découverte scolaire", price: negotiablePrice.fr, duration: "1 jour", bestFor: "Groupes scolaires", description: "Une expérience éducative qui allie nature, histoire et légendes locales." },
  ],
  galleryItems: [
    { title: "Le canyon de la Vit", image: images.hero, alt: "La rivière Vit au coucher du soleil avec rochers, arbres et rive caillouteuse", size: "wide" },
    { title: "L'arche de pierre", image: images.arch, alt: "Arche calcaire naturelle au-dessus de la rivière", size: "standard" },
    { title: "Lumière de grotte", image: images.cave, alt: "Entrée de grotte avec vue sur la rivière et les rochers", size: "tall" },
    { title: "Au-dessus de la vallée cachée", image: images.aerial, alt: "Vue aérienne de la rivière, des rochers et du village", size: "wide" },
    { title: "Détente au bord de la rivière près de Lukovit", image: images.nearbyRetreat, alt: "Paysage aquatique paisible avec une maison en bois flottante près de Lukovit et d'Aglen", size: "standard" },
  ],
  mapStops: [
    { title: "Le centre du village", detail: "La promenade commence au cœur d'Aglen – la place, l'église et les vieilles maisons qui gardent l'âme du village." },
    { title: "Le sentier près de la Vit", detail: "Suivez le cours de la rivière Vit le long de rives pittoresques, d'arbres ombragés et de belles vues sur les rochers." },
    { title: "Dupkata", detail: "L'un des symboles naturels les plus emblématiques d'Aglen – une arche rocheuse impressionnante façonnée par la nature au fil des millénaires." },
    { title: "Grottes et phénomènes rocheux", detail: "Découvrez le monde caché du relief karstique – grottes, formations rocheuses et lieux à l'atmosphère incomparable." },
  ],
  accommodationList: [
    { title: "Chambres d'hôtes", type: "Séjour au village", description: "Chambres calmes chez l'habitant, proches de la nature et de la rivière.", image: images.church },
    { title: "Terrain de camping", type: "Camping", description: "Espace ouvert pour tentes avec accès à la rivière Vit et aux sentiers naturels.", image: images.aerial },
    { title: "Villa de montagne", type: "Villa", description: "Villa isolée avec vue sur le canyon, idéale pour petits groupes et week-ends.", image: images.pool },
  ],
  sourceNotes: ["Créé par DevOpsio - www.devopsio.eu", "Toutes les images proviennent de photographes locaux et sont utilisées avec autorisation."],
};
