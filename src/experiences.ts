import type { LanguageCode, PlaceId } from "./locales/types";
import { contentByLanguage } from "./locales";

// ─────────────────────────────────────────────────────────────
// The experience picker on /location.
//
// The section used to be a numbered walk: four stops, one after another, the
// same four the "beautiful places" guide already lists. Two pages saying the
// same thing in the same order is one page too many, and neither of them asked
// the only question a visitor actually has — what kind of afternoon do I want.
//
// So this is a filter by mood rather than a route by sequence. Three moods, and
// a place may hold more than one where that is honestly true: Рачков вир is
// both somewhere to swim and somewhere to photograph, and pretending otherwise
// to keep the tabs tidy would be a lie in service of a layout.
//
// Everything localized comes from `placesList`, which is already authored in all
// fourteen languages and already carries the image, the tag and the description.
// Only the three stops the owner rewrote, and the river path (which is not a
// `placesList` record), are authored here.
// ─────────────────────────────────────────────────────────────

export type Mood = "photo" | "water" | "history";

export type MoodDef = { id: Mood; icon: string; label: Record<LanguageCode, string> };

export const MOODS: MoodDef[] = [
  {
    id: "photo",
    icon: "📸",
    label: {
      bg: "За фотографи", en: "For photographers", de: "Für Fotografen", fr: "Pour les photographes",
      es: "Para fotógrafos", it: "Per fotografi", ro: "Pentru fotografi", tr: "Fotoğrafçılar için",
      el: "Για φωτογράφους", ru: "Для фотографов", ja: "写真を撮る人へ", sr: "За фотографе",
      zh: "适合摄影", hu: "Fotósoknak",
    },
  },
  {
    id: "water",
    icon: "🌊",
    label: {
      bg: "За релакс край водата", en: "To rest by the water", de: "Zum Rasten am Wasser",
      fr: "Pour se reposer au bord de l'eau", es: "Para descansar junto al agua", it: "Per riposare vicino all'acqua",
      ro: "Pentru odihnă lângă apă", tr: "Su kenarında dinlenmek için", el: "Για ξεκούραση δίπλα στο νερό",
      ru: "Отдохнуть у воды", ja: "水辺でくつろぐ", sr: "За одмор крај воде",
      zh: "水边休憩", hu: "Pihenés a víz mellett",
    },
  },
  {
    id: "history",
    icon: "🏰",
    label: {
      bg: "За любители на историята", en: "For lovers of history", de: "Für Geschichtsfreunde",
      fr: "Pour les amateurs d'histoire", es: "Para amantes de la historia", it: "Per gli appassionati di storia",
      ro: "Pentru iubitorii de istorie", tr: "Tarih sevenler için", el: "Για τους λάτρεις της ιστορίας",
      ru: "Для любителей истории", ja: "歴史が好きな人へ", sr: "За љубитеље историје",
      zh: "钟情历史", hu: "Történelemkedvelőknek",
    },
  },
];

export type Difficulty = "easy" | "moderate";

/**
 * Difficulty is a judgement this site already publishes: the "beautiful places"
 * guide says the centre and the riverbank suit children and the cliffs need
 * care. It is repeated here, not invented.
 *
 * Walking times are NOT here. Nothing in this repository measures them, the
 * guide only ever states half a day for the whole walk, and a made-up "15 min"
 * on a page about unfenced cliff edges is the kind of small invention that costs
 * somebody an afternoon. The field exists; fill it from a field day.
 */
export const DIFFICULTY_LABEL: Record<Difficulty, Record<LanguageCode, string>> = {
  easy: {
    bg: "Лесно", en: "Easy", de: "Leicht", fr: "Facile", es: "Fácil", it: "Facile", ro: "Ușor",
    tr: "Kolay", el: "Εύκολο", ru: "Легко", ja: "やさしい", sr: "Лако", zh: "轻松", hu: "Könnyű",
  },
  moderate: {
    bg: "Умерено", en: "Moderate", de: "Mittel", fr: "Moyen", es: "Moderado", it: "Medio",
    ro: "Moderat", tr: "Orta", el: "Μέτριο", ru: "Средне", ja: "ふつう", sr: "Умерено",
    zh: "中等", hu: "Közepes",
  },
};

export const PICKER_UI: Record<
  LanguageCode,
  { kicker: string; title: string; intro: string; all: string; open: string; onMap: string; difficulty: string; empty: string }
> = {
  bg: {
    kicker: "🗺️ Интерактивен пътеводител",
    title: "Избери своето преживяване в Ъглен",
    intro:
      "Ъглен не се разглежда на един дъх — той се изживява според ритъма ви. Изберете тип преживяване или проследете целия списък, за да разкриете тайните на каньона, реката и скалните арки.",
    all: "Всички",
    open: "Подробности",
    onMap: "Виж мястото",
    difficulty: "Трудност",
    empty: "Няма места в тази категория.",
  },
  en: {
    kicker: "🗺️ Interactive guide",
    title: "Choose your kind of day in Aglen",
    intro:
      "Aglen is not seen in one go — it is lived at your own pace. Pick the kind of experience you are after, or read the whole list, and uncover the canyon, the river and the rock arches.",
    all: "All",
    open: "Details",
    onMap: "See the place",
    difficulty: "Difficulty",
    empty: "Nothing in this category yet.",
  },
  de: {
    kicker: "🗺️ Interaktiver Führer",
    title: "Wählen Sie Ihren Tag in Aglen",
    intro:
      "Aglen sieht man nicht in einem Zug — man erlebt es im eigenen Tempo. Wählen Sie die Art von Erlebnis, die Sie suchen, oder lesen Sie die ganze Liste und entdecken Sie Schlucht, Fluss und Felsbögen.",
    all: "Alle",
    open: "Details",
    onMap: "Ort ansehen",
    difficulty: "Schwierigkeit",
    empty: "In dieser Kategorie noch nichts.",
  },
  fr: {
    kicker: "🗺️ Guide interactif",
    title: "Choisissez votre journée à Aglen",
    intro:
      "Aglen ne se visite pas d'un trait — il se vit à votre rythme. Choisissez le type d'expérience que vous cherchez, ou parcourez toute la liste, et découvrez le canyon, la rivière et les arches rocheuses.",
    all: "Tout",
    open: "Détails",
    onMap: "Voir le lieu",
    difficulty: "Difficulté",
    empty: "Rien dans cette catégorie pour l'instant.",
  },
  es: {
    kicker: "🗺️ Guía interactiva",
    title: "Elija su día en Aglen",
    intro:
      "Aglen no se ve de una vez: se vive a su propio ritmo. Elija el tipo de experiencia que busca, o lea la lista entera, y descubra el cañón, el río y los arcos de roca.",
    all: "Todo",
    open: "Detalles",
    onMap: "Ver el lugar",
    difficulty: "Dificultad",
    empty: "Todavía no hay nada en esta categoría.",
  },
  it: {
    kicker: "🗺️ Guida interattiva",
    title: "Scegliete la vostra giornata ad Aglen",
    intro:
      "Aglen non si vede tutto d'un fiato: si vive al proprio ritmo. Scegliete il tipo di esperienza che cercate, o leggete l'intero elenco, e scoprite il canyon, il fiume e gli archi di roccia.",
    all: "Tutti",
    open: "Dettagli",
    onMap: "Vedi il luogo",
    difficulty: "Difficoltà",
    empty: "Ancora niente in questa categoria.",
  },
  ro: {
    kicker: "🗺️ Ghid interactiv",
    title: "Alegeți-vă ziua în Aglen",
    intro:
      "Aglenul nu se vede dintr-o suflare — se trăiește în ritmul vostru. Alegeți tipul de experiență pe care îl căutați sau parcurgeți toată lista și descoperiți canionul, râul și arcadele de stâncă.",
    all: "Toate",
    open: "Detalii",
    onMap: "Vezi locul",
    difficulty: "Dificultate",
    empty: "Încă nimic în această categorie.",
  },
  tr: {
    kicker: "🗺️ Etkileşimli rehber",
    title: "Aglen'de nasıl bir gün istersiniz?",
    intro:
      "Aglen tek seferde görülmez — kendi temponuzda yaşanır. Aradığınız deneyim türünü seçin ya da listenin tamamını okuyun; kanyonu, nehri ve kaya kemerlerini keşfedin.",
    all: "Tümü",
    open: "Ayrıntılar",
    onMap: "Yeri gör",
    difficulty: "Zorluk",
    empty: "Bu kategoride henüz bir şey yok.",
  },
  el: {
    kicker: "🗺️ Διαδραστικός οδηγός",
    title: "Διαλέξτε τη δική σας μέρα στο Άγκλεν",
    intro:
      "Το Άγκλεν δεν το βλέπεις μονορούφι — το ζεις με τον δικό σου ρυθμό. Διαλέξτε το είδος της εμπειρίας που ψάχνετε, ή δείτε ολόκληρη τη λίστα, και ανακαλύψτε το φαράγγι, το ποτάμι και τις βραχώδεις αψίδες.",
    all: "Όλα",
    open: "Λεπτομέρειες",
    onMap: "Δείτε το μέρος",
    difficulty: "Δυσκολία",
    empty: "Τίποτα ακόμη σε αυτή την κατηγορία.",
  },
  ru: {
    kicker: "🗺️ Интерактивный путеводитель",
    title: "Выберите свой день в Аглене",
    intro:
      "Аглен не осматривают на одном дыхании — его проживают в своём ритме. Выберите тип впечатления или пройдите весь список и откройте каньон, реку и скальные арки.",
    all: "Все",
    open: "Подробнее",
    onMap: "Смотреть место",
    difficulty: "Сложность",
    empty: "В этой категории пока пусто.",
  },
  ja: {
    kicker: "🗺️ 対話型ガイド",
    title: "アグレンでの一日を選ぶ",
    intro:
      "アグレンは一息で見てまわる場所ではなく、自分の速さで過ごす場所です。求める過ごし方を選ぶか、一覧をそのままたどって、渓谷と川と岩のアーチを見つけてください。",
    all: "すべて",
    open: "詳しく",
    onMap: "場所を見る",
    difficulty: "難易度",
    empty: "この分類にはまだありません。",
  },
  sr: {
    kicker: "🗺️ Интерактивни водич",
    title: "Изаберите свој дан у Аглену",
    intro:
      "Аглен се не обиђе у једном даху — он се живи вашим ритмом. Изаберите врсту доживљаја коју тражите, или прођите целу листу, и откријте кањон, реку и стеновите лукове.",
    all: "Све",
    open: "Детаљи",
    onMap: "Погледај место",
    difficulty: "Тежина",
    empty: "У овој категорији још нема ничега.",
  },
  zh: {
    kicker: "🗺️ 互动指南",
    title: "选择你在阿格伦的一天",
    intro:
      "阿格伦不是一口气看完的地方——它按你自己的节奏被度过。挑一种你想要的体验，或者把整份清单读完，去发现峡谷、河流与岩拱。",
    all: "全部",
    open: "详情",
    onMap: "查看地点",
    difficulty: "难度",
    empty: "这一类暂时还没有内容。",
  },
  hu: {
    kicker: "🗺️ Interaktív kalauz",
    title: "Válassza ki a maga agleni napját",
    intro:
      "Aglent nem egy szuszra nézi meg az ember — a saját tempójában éli meg. Válassza ki, milyen élményt keres, vagy olvassa végig a listát, és fedezze fel a kanyont, a folyót és a sziklaboltíveket.",
    all: "Mind",
    open: "Részletek",
    onMap: "Hely megtekintése",
    difficulty: "Nehézség",
    empty: "Ebben a kategóriában még nincs semmi.",
  },
};

/** Prose the owner rewrote, for the three stops they named. */
type Authored = { title: string; detail: string };

const AUTHORED: Record<"village" | "river" | "dupkata", Record<LanguageCode, Authored>> = {
  village: {
    bg: { title: "Живото сърце на селото", detail: "Започнете от старинния площад, където времето е спряло. Разгледайте храма „Св. Архангел Михаил“ и автентичните каменни фасади, съхранили духа на Предбалкана." },
    en: { title: "The living heart of the village", detail: "Start at the old square, where time has stopped. Look at the church of St Archangel Michael and the stone façades that have kept the character of the Fore-Balkan." },
    de: { title: "Das lebendige Herz des Dorfes", detail: "Beginnen Sie am alten Platz, wo die Zeit stehen geblieben ist. Betrachten Sie die Kirche St. Erzengel Michael und die steinernen Fassaden, die den Charakter des Vorbalkans bewahrt haben." },
    fr: { title: "Le cœur vivant du village", detail: "Commencez par la vieille place, où le temps s'est arrêté. Regardez l'église Saint-Archange-Michel et les façades de pierre qui ont gardé le caractère du Prébalkan." },
    es: { title: "El corazón vivo del pueblo", detail: "Empiece en la plaza antigua, donde el tiempo se ha detenido. Observe la iglesia de San Arcángel Miguel y las fachadas de piedra que han conservado el carácter de los Prebalcanes." },
    it: { title: "Il cuore vivo del villaggio", detail: "Cominciate dalla vecchia piazza, dove il tempo si è fermato. Guardate la chiesa di San Michele Arcangelo e le facciate di pietra che hanno conservato il carattere dei Prebalcani." },
    ro: { title: "Inima vie a satului", detail: "Începeți din piața veche, unde timpul s-a oprit. Priviți biserica Sfântul Arhanghel Mihail și fațadele de piatră care au păstrat caracterul Prebalcanilor." },
    tr: { title: "Köyün canlı kalbi", detail: "Zamanın durduğu eski meydandan başlayın. Baş Melek Mihail Kilisesi'ne ve Ön Balkanlar'ın karakterini koruyan taş cephelere bakın." },
    el: { title: "Η ζωντανή καρδιά του χωριού", detail: "Ξεκινήστε από την παλιά πλατεία, εκεί που ο χρόνος έχει σταματήσει. Δείτε τον ναό του Αρχαγγέλου Μιχαήλ και τις πέτρινες όψεις που κράτησαν τον χαρακτήρα των Προβαλκανίων." },
    ru: { title: "Живое сердце села", detail: "Начните со старой площади, где время остановилось. Взгляните на церковь Святого Архангела Михаила и каменные фасады, сохранившие характер Предбалкан." },
    ja: { title: "村の生きた中心", detail: "時が止まったような古い広場から始めてください。聖大天使ミカエル教会と、前バルカンの気配を残す石造りの家並みを。" },
    sr: { title: "Живо срце села", detail: "Почните од старог трга, где је време стало. Погледајте цркву Светог Арханђела Михаила и камене фасаде које су сачувале карактер Предбалкана." },
    zh: { title: "村庄跳动的心脏", detail: "从时间仿佛停住的老广场开始。看看圣天使长米迦勒教堂，以及留住了前巴尔干气质的石砌立面。" },
    hu: { title: "A falu élő szíve", detail: "Induljon a régi térről, ahol megállt az idő. Nézze meg Szent Mihály arkangyal templomát és a kőhomlokzatokat, amelyek megőrizték az Előbalkán jellegét." },
  },
  river: {
    bg: { title: "Меандрите на река Вит", detail: "Поемете по сенчестата речна пътека под вековните върби. Перфектното място за прохлада, пикник и слушане на тихия шепот на водата." },
    en: { title: "The meanders of the Vit", detail: "Take the shaded path along the river, under old willows. The place for cool air, a picnic, and the quiet sound of moving water." },
    de: { title: "Die Mäander des Vit", detail: "Nehmen Sie den schattigen Uferpfad unter alten Weiden. Der Ort für Kühle, ein Picknick und das leise Geräusch fließenden Wassers." },
    fr: { title: "Les méandres de la Vit", detail: "Prenez le sentier ombragé au bord de la rivière, sous de vieux saules. L'endroit pour la fraîcheur, un pique-nique et le bruit discret de l'eau." },
    es: { title: "Los meandros del Vit", detail: "Tome el sendero umbrío junto al río, bajo sauces viejos. El sitio para el fresco, un picnic y el rumor tranquilo del agua." },
    it: { title: "Le anse del Vit", detail: "Prendete il sentiero ombroso lungo il fiume, sotto i vecchi salici. Il posto per il fresco, un picnic e il rumore quieto dell'acqua." },
    ro: { title: "Meandrele Vitului", detail: "Luați poteca umbrită de pe malul râului, pe sub sălcii bătrâne. Locul pentru răcoare, un picnic și susurul liniștit al apei." },
    tr: { title: "Vit'in kıvrımları", detail: "Yaşlı söğütlerin altından geçen gölgeli nehir patikasına girin. Serinlemek, piknik yapmak ve suyun sessiz sesini dinlemek için." },
    el: { title: "Οι μαίανδροι του Βιτ", detail: "Πάρτε το σκιερό μονοπάτι στην όχθη, κάτω από παλιές ιτιές. Το μέρος για δροσιά, πικνίκ και τον ήσυχο ήχο του νερού." },
    ru: { title: "Излучины Вита", detail: "Идите тенистой тропой вдоль реки, под старыми ивами. Место для прохлады, пикника и тихого звука воды." },
    ja: { title: "ヴィト川の蛇行", detail: "古い柳の下、川沿いの木陰の小径へ。涼をとり、弁当をひろげ、水の静かな音を聞くための場所です。" },
    sr: { title: "Меандри Вита", detail: "Пођите сеновитом стазом уз реку, испод старих врба. Место за хлад, пикник и тихи звук воде." },
    zh: { title: "维特河的曲流", detail: "走上河边的林荫小径，穿过老柳树下。这里适合纳凉、野餐，听水流细细的声音。" },
    hu: { title: "A Vit kanyarulatai", detail: "Induljon a folyó menti árnyas ösvényen, öreg fűzfák alatt. A hely a hűvösért, egy piknikért és a víz csendes hangjáért." },
  },
  dupkata: {
    bg: { title: "Скалният феномен „Дупката“", detail: "Монументална скална арка, изваяна от стихиите. Точка №1 за невероятни снимки и усещане за величието на природата." },
    en: { title: "The rock arch Dupkata", detail: "A monumental arch carved out by weather and water. The first place to go for photographs, and for the scale of the thing." },
    de: { title: "Der Felsbogen Dupkata", detail: "Ein monumentaler Bogen, von Wetter und Wasser herausgearbeitet. Die erste Adresse für Fotos — und für den Maßstab." },
    fr: { title: "L'arche rocheuse Dupkata", detail: "Une arche monumentale sculptée par les intempéries et l'eau. Le premier endroit où aller pour les photos, et pour l'échelle." },
    es: { title: "El arco de roca Dupkata", detail: "Un arco monumental esculpido por el agua y la intemperie. El primer sitio al que ir por las fotografías, y por la escala." },
    it: { title: "L'arco di roccia Dupkata", detail: "Un arco monumentale scavato dalle intemperie e dall'acqua. Il primo posto dove andare per le fotografie, e per la scala." },
    ro: { title: "Arcada de stâncă Dupkata", detail: "O arcadă monumentală, săpată de vreme și de apă. Primul loc unde să mergeți pentru fotografii — și pentru scara lucrurilor." },
    tr: { title: "Kaya kemeri Dupkata", detail: "Hava ve suyun oyduğu anıtsal bir kemer. Fotoğraf için ve ölçeği hissetmek için gidilecek ilk yer." },
    el: { title: "Η βραχώδης αψίδα Ντούπκατα", detail: "Μια μνημειώδης αψίδα, σκαλισμένη από τον καιρό και το νερό. Το πρώτο μέρος για φωτογραφίες — και για την κλίμακα." },
    ru: { title: "Скальная арка Дупката", detail: "Монументальная арка, выточенная непогодой и водой. Первое место для съёмки — и для ощущения масштаба." },
    ja: { title: "岩のアーチ「ドゥプカタ」", detail: "風雨と水が削り出した堂々たるアーチ。写真を撮るなら、そして規模を体で感じるなら、まずここへ。" },
    sr: { title: "Стеновити лук Дупката", detail: "Монументални лук који су исклесали време и вода. Прво место за фотографије — и за осећај размере." },
    zh: { title: "岩拱「杜普卡塔」", detail: "由风雨与流水雕出的宏伟岩拱。拍照的第一去处，也是感受尺度的地方。" },
    hu: { title: "A Dupkata sziklaboltív", detail: "Monumentális boltív, amelyet az időjárás és a víz vájt ki. Az első hely a fényképekért — és a léptékért." },
  },
};

export type Experience = {
  key: string;
  icon: string;
  moods: Mood[];
  difficulty: Difficulty;
  /** Minutes on foot from the village centre. Unmeasured — see the note above. */
  minutes?: number;
  title: string;
  detail: string;
  /** The entity page this opens, when the graph publishes one. */
  slug?: string;
};

/**
 * The table. Structure is language-agnostic; the words come from `placesList`
 * unless this stop is one the owner rewrote.
 */
const TABLE: Array<{
  key: string;
  icon: string;
  moods: Mood[];
  difficulty: Difficulty;
  placeId?: PlaceId;
  authored?: keyof typeof AUTHORED;
  slug?: string;
}> = [
  { key: "village", icon: "🏛️", moods: ["history"], difficulty: "easy", authored: "village", slug: "st-archangel-michael" },
  { key: "river", icon: "🌿", moods: ["water"], difficulty: "easy", authored: "river", slug: "vit-river" },
  { key: "dupkata", icon: "🗿", moods: ["photo"], difficulty: "moderate", authored: "dupkata", slug: "dupkata" },
  { key: "rachkov-vir", icon: "💧", moods: ["water", "photo"], difficulty: "easy", placeId: "rachkov-vir", slug: "rachkov-vir" },
  { key: "chervena-stena", icon: "📸", moods: ["photo"], difficulty: "moderate", placeId: "chervena-stena", slug: "chervena-stena" },
  { key: "sloncheto", icon: "🪨", moods: ["photo"], difficulty: "moderate", placeId: "sloncheto", slug: "sloncheto" },
  { key: "kaleto", icon: "🏰", moods: ["history"], difficulty: "moderate", placeId: "kaleto", slug: "kaleto" },
];

export function experiences(language: LanguageCode): Experience[] {
  const places = contentByLanguage[language].placesList;
  return TABLE.map((row) => {
    const authored = row.authored ? AUTHORED[row.authored][language] : undefined;
    const place = row.placeId ? places.find((candidate) => candidate.id === row.placeId) : undefined;
    return {
      key: row.key,
      icon: row.icon,
      moods: row.moods,
      difficulty: row.difficulty,
      title: authored?.title ?? place?.title ?? row.key,
      detail: authored?.detail ?? place?.description ?? "",
      slug: row.slug,
    };
  });
}
