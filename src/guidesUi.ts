import type { LanguageCode } from "./locales/types";

// UI chrome for the tourism guides. Guide content itself lives in guides.ts as
// LocalizedText (bg required, en optional, falling back the same way events and
// businesses do).
export type GuidesUiText = {
  /**
   * What this section is called — the index <h1>, the breadcrumb, the back link
   * and the kicker over a single guide. There used to be a separate
   * `indexEyebrow` printed above the <h1>; in Bulgarian the two said the same
   * words, so the hero read its own title twice. One name, used everywhere.
   */
  indexTitle: string;
  indexSubtitle: string;
  ctaExplore: string;
  ctaPlaces: string;
  readingTime: string; // "{n}"
  placesCount: string; // "{n}"
  stopsCount: string; // "{n}"
  inPreparation: string;
  inPreparationNote: string;
  quickFacts: string;
  factDuration: string;
  factSeason: string;
  factChildren: string;
  placesTitle: string;
  routeTitle: string;
  relatedTitle: string;
  backToGuides: string;
  noticeLabel: string;
  businessesTitle: string;
  businessesEmpty: string;
  ctaBusinesses: string;
  ctaEvents: string;
  /** The wider region this guide covers, from region.ts. */
  nearbyTitle: string;
  nearbyNote: string;
};

const bg: GuidesUiText = {
  indexTitle: "Туристически справочник",
  indexSubtitle: "Практични ръководства за местата, реката, скалите и хората около селото.",
  ctaExplore: "Разгледай ръководството",
  ctaPlaces: "Виж местата",
  readingTime: "около {n} мин. четене",
  placesCount: "{n} места",
  stopsCount: "{n} спирки по маршрута",
  inPreparation: "В процес на подготовка",
  inPreparationNote:
    "Това ръководство още се подготвя. Публикуваме само проверена информация, затова тук засега има само основното.",
  quickFacts: "Накратко",
  factDuration: "Необходимо време",
  factSeason: "Най-подходящ сезон",
  factChildren: "С деца",
  placesTitle: "Местата",
  routeTitle: "Маршрут през селото",
  relatedTitle: "Свързани ръководства",
  backToGuides: "Към всички ръководства",
  noticeLabel: "Важно",
  businessesTitle: "Къде да намерите местно",
  businessesEmpty:
    "Още няма вписани местни обекти в тези категории. Ако имате бизнес в Ъглен, представете го в раздела „Местен бизнес“.",
  ctaBusinesses: "Разгледай местния бизнес",
  ctaEvents: "Виж предстоящите събития",
  nearbyTitle: "Наблизо в Луковитския карст",
  nearbyNote:
    "Разстоянията са по въздушна линия, изчислени от публикуваните координати. По път разстоянието винаги е по-голямо.",
};

const en: GuidesUiText = {
  indexTitle: "Travel guide",
  indexSubtitle: "Practical guides to the places, the river, the rocks and the people around the village.",
  ctaExplore: "Read the guide",
  ctaPlaces: "See the places",
  readingTime: "about {n} min read",
  placesCount: "{n} places",
  stopsCount: "{n} stops on the walk",
  inPreparation: "In preparation",
  inPreparationNote:
    "This guide is still being prepared. We publish only verified information, so for now it holds just the essentials.",
  quickFacts: "At a glance",
  factDuration: "Time needed",
  factSeason: "Best season",
  factChildren: "With children",
  placesTitle: "The places",
  routeTitle: "A walk through the village",
  relatedTitle: "Related guides",
  backToGuides: "Back to all guides",
  noticeLabel: "Important",
  businessesTitle: "Where to find local",
  businessesEmpty:
    "No local listings in these categories yet. If you run a business in Aglen, present it in the Local business section.",
  ctaBusinesses: "Browse local businesses",
  ctaEvents: "See upcoming events",
  nearbyTitle: "Nearby in the Lukovit karst",
  nearbyNote:
    "Distances are straight-line, computed from the published coordinates. By road the distance is always greater.",
};

const de: GuidesUiText = {
  indexTitle: "Reiseführer",
  indexSubtitle: "Praktische Führer zu den Orten, dem Fluss, den Felsen und den Menschen rund um das Dorf.",
  ctaExplore: "Führer lesen",
  ctaPlaces: "Orte ansehen",
  readingTime: "etwa {n} Min. Lesezeit",
  placesCount: "{n} Orte",
  stopsCount: "{n} Stationen auf dem Weg",
  inPreparation: "In Vorbereitung",
  inPreparationNote:
    "Dieser Führer wird noch vorbereitet. Wir veröffentlichen nur geprüfte Informationen, daher steht hier vorerst nur das Wichtigste.",
  quickFacts: "Auf einen Blick",
  factDuration: "Benötigte Zeit",
  factSeason: "Beste Jahreszeit",
  factChildren: "Mit Kindern",
  placesTitle: "Die Orte",
  routeTitle: "Ein Weg durch das Dorf",
  relatedTitle: "Verwandte Führer",
  backToGuides: "Zurück zu allen Führern",
  noticeLabel: "Wichtig",
  businessesTitle: "Wo Sie Lokales finden",
  businessesEmpty:
    "In diesen Kategorien gibt es noch keine Einträge. Wenn Sie einen Betrieb in Aglen führen, stellen Sie ihn im Bereich „Lokale Betriebe“ vor.",
  ctaBusinesses: "Lokale Betriebe ansehen",
  ctaEvents: "Kommende Veranstaltungen",
  nearbyTitle: "In der Nähe im Lukovit-Karst",
  nearbyNote:
    "Die Entfernungen sind Luftlinie, berechnet aus den veröffentlichten Koordinaten. Auf der Straße ist es immer weiter.",
};

const fr: GuidesUiText = {
  indexTitle: "Guide touristique",
  indexSubtitle: "Des guides pratiques sur les lieux, la rivière, les rochers et les gens du village.",
  ctaExplore: "Lire le guide",
  ctaPlaces: "Voir les lieux",
  readingTime: "environ {n} min de lecture",
  placesCount: "{n} lieux",
  stopsCount: "{n} étapes sur le parcours",
  inPreparation: "En préparation",
  inPreparationNote:
    "Ce guide est encore en préparation. Nous ne publions que des informations vérifiées, il ne contient donc pour l’instant que l’essentiel.",
  quickFacts: "En bref",
  factDuration: "Temps nécessaire",
  factSeason: "Meilleure saison",
  factChildren: "Avec des enfants",
  placesTitle: "Les lieux",
  routeTitle: "Une promenade dans le village",
  relatedTitle: "Guides associés",
  backToGuides: "Retour à tous les guides",
  noticeLabel: "Important",
  businessesTitle: "Où trouver du local",
  businessesEmpty:
    "Aucun commerce local dans ces catégories pour l’instant. Si vous avez une activité à Aglen, présentez-la dans la section « Commerces locaux ».",
  ctaBusinesses: "Voir les commerces locaux",
  ctaEvents: "Voir les événements à venir",
  nearbyTitle: "À proximité, dans le karst de Lukovit",
  nearbyNote:
    "Les distances sont à vol d'oiseau, calculées depuis les coordonnées publiées. Par la route, la distance est toujours plus longue.",
};

const es: GuidesUiText = {
  indexTitle: "Guía turística",
  indexSubtitle: "Guías prácticas sobre los lugares, el río, las rocas y la gente del pueblo.",
  ctaExplore: "Leer la guía",
  ctaPlaces: "Ver los lugares",
  readingTime: "unos {n} min de lectura",
  placesCount: "{n} lugares",
  stopsCount: "{n} paradas del recorrido",
  inPreparation: "En preparación",
  inPreparationNote:
    "Esta guía aún se está preparando. Solo publicamos información verificada, así que por ahora contiene lo esencial.",
  quickFacts: "En resumen",
  factDuration: "Tiempo necesario",
  factSeason: "Mejor temporada",
  factChildren: "Con niños",
  placesTitle: "Los lugares",
  routeTitle: "Un paseo por el pueblo",
  relatedTitle: "Guías relacionadas",
  backToGuides: "Volver a todas las guías",
  noticeLabel: "Importante",
  businessesTitle: "Dónde encontrar productos locales",
  businessesEmpty:
    "Todavía no hay negocios en estas categorías. Si tienes un negocio en Aglen, preséntalo en la sección «Negocios locales».",
  ctaBusinesses: "Ver negocios locales",
  ctaEvents: "Ver próximos eventos",
  nearbyTitle: "Cerca, en el karst de Lukovit",
  nearbyNote:
    "Las distancias son en línea recta, calculadas a partir de las coordenadas publicadas. Por carretera siempre son mayores.",
};

const it: GuidesUiText = {
  indexTitle: "Guida turistica",
  indexSubtitle: "Guide pratiche ai luoghi, al fiume, alle rocce e alle persone del villaggio.",
  ctaExplore: "Leggi la guida",
  ctaPlaces: "Vedi i luoghi",
  readingTime: "circa {n} min di lettura",
  placesCount: "{n} luoghi",
  stopsCount: "{n} tappe del percorso",
  inPreparation: "In preparazione",
  inPreparationNote:
    "Questa guida è ancora in preparazione. Pubblichiamo solo informazioni verificate, quindi per ora contiene solo l’essenziale.",
  quickFacts: "In breve",
  factDuration: "Tempo necessario",
  factSeason: "Stagione migliore",
  factChildren: "Con bambini",
  placesTitle: "I luoghi",
  routeTitle: "Una passeggiata nel villaggio",
  relatedTitle: "Guide correlate",
  backToGuides: "Torna a tutte le guide",
  noticeLabel: "Importante",
  businessesTitle: "Dove trovare prodotti locali",
  businessesEmpty:
    "Ancora nessuna attività in queste categorie. Se hai un’attività ad Aglen, presentala nella sezione «Attività locali».",
  ctaBusinesses: "Vedi le attività locali",
  ctaEvents: "Vedi gli eventi in arrivo",
  nearbyTitle: "Nei dintorni, nel carso di Lukovit",
  nearbyNote:
    "Le distanze sono in linea d'aria, calcolate dalle coordinate pubblicate. Su strada la distanza è sempre maggiore.",
};

const ro: GuidesUiText = {
  indexTitle: "Ghid turistic",
  indexSubtitle: "Ghiduri practice despre locuri, râu, stânci și oamenii din sat.",
  ctaExplore: "Citește ghidul",
  ctaPlaces: "Vezi locurile",
  readingTime: "aproximativ {n} min de citit",
  placesCount: "{n} locuri",
  stopsCount: "{n} opriri pe traseu",
  inPreparation: "În pregătire",
  inPreparationNote:
    "Acest ghid este încă în pregătire. Publicăm doar informații verificate, așa că deocamdată conține doar esențialul.",
  quickFacts: "Pe scurt",
  factDuration: "Timp necesar",
  factSeason: "Cel mai bun sezon",
  factChildren: "Cu copii",
  placesTitle: "Locurile",
  routeTitle: "O plimbare prin sat",
  relatedTitle: "Ghiduri similare",
  backToGuides: "Înapoi la toate ghidurile",
  noticeLabel: "Important",
  businessesTitle: "Unde găsiți produse locale",
  businessesEmpty:
    "Încă nu există afaceri în aceste categorii. Dacă aveți o afacere în Aglen, prezentați-o în secțiunea „Afaceri locale”.",
  ctaBusinesses: "Vezi afacerile locale",
  ctaEvents: "Vezi evenimentele următoare",
  nearbyTitle: "În apropiere, în carstul Lukovit",
  nearbyNote:
    "Distanțele sunt în linie dreaptă, calculate din coordonatele publicate. Pe șosea distanța este întotdeauna mai mare.",
};

const tr: GuidesUiText = {
  indexTitle: "Gezi rehberi",
  indexSubtitle: "Köyün çevresindeki yerler, nehir, kayalar ve insanlar için pratik rehberler.",
  ctaExplore: "Rehberi oku",
  ctaPlaces: "Yerleri gör",
  readingTime: "yaklaşık {n} dk okuma",
  placesCount: "{n} yer",
  stopsCount: "Rotada {n} durak",
  inPreparation: "Hazırlanıyor",
  inPreparationNote:
    "Bu rehber henüz hazırlanıyor. Yalnızca doğrulanmış bilgileri yayımlıyoruz, bu yüzden şimdilik yalnızca temel bilgiler var.",
  quickFacts: "Kısaca",
  factDuration: "Gereken süre",
  factSeason: "En uygun mevsim",
  factChildren: "Çocuklarla",
  placesTitle: "Yerler",
  routeTitle: "Köyde bir yürüyüş",
  relatedTitle: "İlgili rehberler",
  backToGuides: "Tüm rehberlere dön",
  noticeLabel: "Önemli",
  businessesTitle: "Yerel ürünleri nerede bulursunuz",
  businessesEmpty:
    "Bu kategorilerde henüz işletme yok. Aglen’de bir işletmeniz varsa „Yerel işletmeler“ bölümünde tanıtın.",
  ctaBusinesses: "Yerel işletmelere göz at",
  ctaEvents: "Yaklaşan etkinlikleri gör",
  nearbyTitle: "Lukovit karstında yakınlarda",
  nearbyNote:
    "Mesafeler kuş uçuşu olup yayımlanan koordinatlardan hesaplanmıştır. Karayoluyla mesafe her zaman daha uzundur.",
};

const el: GuidesUiText = {
  indexTitle: "Ταξιδιωτικός οδηγός",
  indexSubtitle: "Πρακτικοί οδηγοί για τα μέρη, το ποτάμι, τους βράχους και τους ανθρώπους του χωριού.",
  ctaExplore: "Διαβάστε τον οδηγό",
  ctaPlaces: "Δείτε τα μέρη",
  readingTime: "περίπου {n} λεπτά ανάγνωσης",
  placesCount: "{n} μέρη",
  stopsCount: "{n} στάσεις στη διαδρομή",
  inPreparation: "Υπό προετοιμασία",
  inPreparationNote:
    "Αυτός ο οδηγός ετοιμάζεται ακόμη. Δημοσιεύουμε μόνο επαληθευμένες πληροφορίες, γι’ αυτό προς το παρόν περιέχει μόνο τα βασικά.",
  quickFacts: "Με μια ματιά",
  factDuration: "Απαιτούμενος χρόνος",
  factSeason: "Καλύτερη εποχή",
  factChildren: "Με παιδιά",
  placesTitle: "Τα μέρη",
  routeTitle: "Μια βόλτα στο χωριό",
  relatedTitle: "Σχετικοί οδηγοί",
  backToGuides: "Πίσω σε όλους τους οδηγούς",
  noticeLabel: "Σημαντικό",
  businessesTitle: "Πού θα βρείτε τοπικά προϊόντα",
  businessesEmpty:
    "Δεν υπάρχουν ακόμη επιχειρήσεις σε αυτές τις κατηγορίες. Αν έχετε επιχείρηση στο Άγκλεν, παρουσιάστε την στην ενότητα «Τοπικές επιχειρήσεις».",
  ctaBusinesses: "Δείτε τις τοπικές επιχειρήσεις",
  ctaEvents: "Δείτε τις προσεχείς εκδηλώσεις",
  nearbyTitle: "Κοντά, στο καρστ του Lukovit",
  nearbyNote:
    "Οι αποστάσεις είναι σε ευθεία γραμμή, υπολογισμένες από τις δημοσιευμένες συντεταγμένες. Οδικώς η απόσταση είναι πάντα μεγαλύτερη.",
};

const ru: GuidesUiText = {
  indexTitle: "Путеводитель",
  indexSubtitle: "Практические путеводители по местам, реке, скалам и людям села.",
  ctaExplore: "Читать путеводитель",
  ctaPlaces: "Смотреть места",
  readingTime: "около {n} мин чтения",
  placesCount: "{n} мест",
  stopsCount: "{n} остановок на маршруте",
  inPreparation: "В процессе подготовки",
  inPreparationNote:
    "Этот путеводитель ещё готовится. Мы публикуем только проверенную информацию, поэтому пока здесь только основное.",
  quickFacts: "Кратко",
  factDuration: "Сколько нужно времени",
  factSeason: "Лучший сезон",
  factChildren: "С детьми",
  placesTitle: "Места",
  routeTitle: "Прогулка по селу",
  relatedTitle: "Похожие путеводители",
  backToGuides: "Ко всем путеводителям",
  noticeLabel: "Важно",
  businessesTitle: "Где найти местное",
  businessesEmpty:
    "В этих категориях пока нет записей. Если у вас есть бизнес в Ъглене, представьте его в разделе «Местный бизнес».",
  ctaBusinesses: "Смотреть местный бизнес",
  ctaEvents: "Смотреть предстоящие события",
  nearbyTitle: "Рядом, в Луковитском карсте",
  nearbyNote:
    "Расстояния указаны по прямой и рассчитаны по опубликованным координатам. По дороге расстояние всегда больше.",
};

const ja: GuidesUiText = {
  indexTitle: "旅のガイド",
  indexSubtitle: "村の周りの場所、川、岩、そして人々についての実用的なガイド。",
  ctaExplore: "ガイドを読む",
  ctaPlaces: "場所を見る",
  readingTime: "約 {n} 分で読めます",
  placesCount: "{n} か所",
  stopsCount: "ルート上に {n} か所",
  inPreparation: "準備中",
  inPreparationNote:
    "このガイドはまだ準備中です。確認できた情報のみを掲載しているため、現時点では基本的な内容だけです。",
  quickFacts: "ひと目で",
  factDuration: "所要時間",
  factSeason: "おすすめの季節",
  factChildren: "子ども連れ",
  placesTitle: "場所",
  routeTitle: "村の散歩",
  relatedTitle: "関連ガイド",
  backToGuides: "すべてのガイドに戻る",
  noticeLabel: "重要",
  businessesTitle: "地元のものが手に入る場所",
  businessesEmpty:
    "これらのカテゴリーにはまだお店がありません。アグレンでお店を営んでいる方は「地元のお店」でご紹介ください。",
  ctaBusinesses: "地元のお店を見る",
  ctaEvents: "今後のイベントを見る",
  nearbyTitle: "ルコヴィト・カルスト周辺",
  nearbyNote:
    "距離は公開されている座標から算出した直線距離です。道路経由では常にこれより長くなります。",
};

const sr: GuidesUiText = {
  indexTitle: "Туристички водич",
  indexSubtitle: "Практични водичи кроз места, реку, стене и људе око села.",
  ctaExplore: "Прочитајте водич",
  ctaPlaces: "Погледајте места",
  readingTime: "око {n} мин читања",
  placesCount: "{n} места",
  stopsCount: "{n} станица на путу",
  inPreparation: "У припреми",
  inPreparationNote:
    "Овај водич се још припрема. Објављујемо само проверене информације, па за сада садржи само основно.",
  quickFacts: "Укратко",
  factDuration: "Потребно време",
  factSeason: "Најбоље годишње доба",
  factChildren: "Са децом",
  placesTitle: "Места",
  routeTitle: "Шетња кроз село",
  relatedTitle: "Повезани водичи",
  backToGuides: "Назад на све водиче",
  noticeLabel: "Важно",
  businessesTitle: "Где да нађете локално",
  businessesEmpty:
    "Још нема уписаних места у овим категоријама. Ако имате бизнис у Аглену, представите га у одељку „Локални бизниси“.",
  ctaBusinesses: "Погледајте локалне бизнисе",
  ctaEvents: "Погледајте предстојеће догађаје",
  nearbyTitle: "У близини, у Луковитском карсту",
  nearbyNote:
    "Раздаљине су ваздушном линијом, израчунате из објављених координата. Путем је раздаљина увек већа.",
};

const zh: GuidesUiText = {
  indexTitle: "旅行指南",
  indexSubtitle: "关于村庄周边的地点、河流、岩石与人们的实用指南。",
  ctaExplore: "阅读指南",
  ctaPlaces: "查看地点",
  readingTime: "约 {n} 分钟阅读",
  placesCount: "{n} 个地点",
  stopsCount: "路线上 {n} 处停留",
  inPreparation: "正在整理中",
  inPreparationNote: "本指南仍在整理中。我们只发布经过核实的信息，因此目前只有基本内容。",
  quickFacts: "速览",
  factDuration: "所需时间",
  factSeason: "最佳季节",
  factChildren: "带孩子",
  placesTitle: "地点",
  routeTitle: "村中漫步",
  relatedTitle: "相关指南",
  backToGuides: "返回全部指南",
  noticeLabel: "重要",
  businessesTitle: "在哪里买到本地产品",
  businessesEmpty: "这些分类下暂时还没有商家。如果你在阿格伦经营，欢迎在“本地商家”栏目介绍。",
  ctaBusinesses: "浏览本地商家",
  ctaEvents: "查看即将举办的活动",
  nearbyTitle: "卢科维特喀斯特周边",
  nearbyNote:
    "距离为依据公开坐标计算的直线距离。实际道路距离总是更长。",
};

const hu: GuidesUiText = {
  indexTitle: "Útikalauz",
  indexSubtitle: "Gyakorlati útmutatók a falu körüli helyekhez, a folyóhoz, a sziklákhoz és az emberekhez.",
  ctaExplore: "Olvasom az útmutatót",
  ctaPlaces: "Helyek megtekintése",
  readingTime: "körülbelül {n} perc olvasás",
  placesCount: "{n} hely",
  stopsCount: "{n} megálló az útvonalon",
  inPreparation: "Előkészületben",
  inPreparationNote:
    "Ez az útmutató még készül. Csak ellenőrzött információt teszünk közzé, ezért egyelőre csak a legfontosabbakat tartalmazza.",
  quickFacts: "Röviden",
  factDuration: "Szükséges idő",
  factSeason: "Legjobb évszak",
  factChildren: "Gyerekekkel",
  placesTitle: "A helyek",
  routeTitle: "Séta a faluban",
  relatedTitle: "Kapcsolódó útmutatók",
  backToGuides: "Vissza az összes útmutatóhoz",
  noticeLabel: "Fontos",
  businessesTitle: "Hol talál helyi terméket",
  businessesEmpty:
    "Ezekben a kategóriákban még nincsenek bejegyzések. Ha vállalkozása van Aglenben, mutassa be a „Helyi vállalkozások” részben.",
  ctaBusinesses: "Helyi vállalkozások böngészése",
  ctaEvents: "Közelgő események megtekintése",
  nearbyTitle: "A közelben, a Lukovit-karszton",
  nearbyNote:
    "A távolságok légvonalban értendők, a közzétett koordinátákból számolva. Közúton a távolság mindig nagyobb.",
};

export const guidesUiByLanguage: Record<LanguageCode, GuidesUiText> = {
  bg,
  en,
  de,
  fr,
  es,
  it,
  ro,
  tr,
  el,
  ru,
  ja,
  sr,
  zh,
  hu,
};
