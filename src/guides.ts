import type { BusinessCategory, LanguageCode, LocalizedText, PlaceId } from "./locales/types";
import { contentByLanguage } from "./content";

// ─────────────────────────────────────────────────────────────
// Tourism guides.
//
// Places are NOT duplicated here: a guide references `PlaceId`s and the copy is
// read from `contentByLanguage[lang].placesList`, which stays the single source
// of truth for every language.
//
// A guide is only `published` when it holds genuinely useful, verified content.
// Everything else stays `in-preparation`: it still gets a card and a page, but
// the page says so plainly instead of padding itself with invented facts.
//
// Deliberately absent: distances, travel times, difficulty ratings and access or
// safety permissions. The project holds no verified source for any of them, so
// the quick-facts panel simply omits what it does not know.
// ─────────────────────────────────────────────────────────────

export type GuideStatus = "published" | "in-preparation";

export type GuideSection = {
  heading: LocalizedText;
  body: LocalizedText[];
  /** Rendered as a checklist, e.g. what to bring. */
  list?: LocalizedText[];
  /** Rendered as a visible notice. Use for genuine safety or access caveats. */
  notice?: LocalizedText;
};

export type GuideQuickFacts = {
  duration?: LocalizedText;
  bestSeason?: LocalizedText;
  transport?: LocalizedText;
  childFriendly?: LocalizedText;
};

export type TourismGuide = {
  id: string;
  slug: string;
  /** Route the old hub card used to point at, so nothing links into a void. */
  legacyRouteId: string;
  title: LocalizedText;
  summary: LocalizedText;
  heroImage: string;
  heroImageAlt: LocalizedText;
  status: GuideStatus;
  /** Verified places from placesList, shown as place cards. */
  placeIds?: PlaceId[];
  /** Include the village walking sequence from `mapStops`. */
  includeRouteStops?: boolean;
  /** Pull live listings from the local-business directory. */
  businessCategories?: BusinessCategory[];
  sections?: GuideSection[];
  quickFacts?: GuideQuickFacts;
  relatedGuideIds: string[];
  /**
   * ISO date this guide's text last changed. Set by hand — a build-stamped date
   * would tell Google every guide changed on every deploy, which is the fastest
   * way to have dateModified discounted entirely.
   */
  lastUpdated: string;
  /** Region entities from region.ts that this guide genuinely covers. */
  regionPlaceIds?: string[];
};

export const guides: TourismGuide[] = [
  {
    id: "beautiful-places",
    slug: "beautiful-places",
    legacyRouteId: "attractions",
    title: {
      bg: "Най-красивите места край Ъглен", en: "The most beautiful places around Aglen",
      de: "Die schönsten Orte rund um Aglen", fr: "Les plus beaux endroits autour d'Aglen",
      es: "Los lugares más bellos alrededor de Aglen", it: "I luoghi più belli intorno ad Aglen",
      ro: "Cele mai frumoase locuri din jurul Aglenului", tr: "Aglen çevresinin en güzel yerleri",
      el: "Τα ομορφότερα μέρη γύρω από το Άγκλεν", ru: "Самые красивые места вокруг Аглена",
      ja: "アグレン周辺のもっとも美しい場所", sr: "Најлепша места око Аглена",
      zh: "阿格伦周边最美的地方", hu: "Aglen legszebb helyei",
    },
    summary: {
      bg: "Подбрани природни и исторически места около селото, с кратък маршрут през центъра и съвети за снимки.",
      en: "A selection of natural and historical places around the village, with a short walk through the centre and photography tips.",
      de: "Ausgewählte Natur- und Geschichtsorte rund um das Dorf, mit einem kurzen Rundgang durch den Ortskern und Tipps zum Fotografieren.",
      fr: "Une sélection de sites naturels et historiques autour du village, avec une courte promenade dans le centre et des conseils photo.",
      es: "Una selección de lugares naturales e históricos alrededor del pueblo, con un breve paseo por el centro y consejos de fotografía.",
      it: "Una selezione di luoghi naturali e storici intorno al villaggio, con una breve passeggiata nel centro e consigli fotografici.",
      ro: "O selecție de locuri naturale și istorice din jurul satului, cu o scurtă plimbare prin centru și sfaturi de fotografie.",
      tr: "Köyün çevresindeki seçme doğal ve tarihî yerler; merkezde kısa bir yürüyüş ve fotoğraf ipuçlarıyla.",
      el: "Μια επιλογή από φυσικά και ιστορικά μέρη γύρω από το χωριό, με μια σύντομη βόλτα στο κέντρο και συμβουλές φωτογράφισης.",
      ru: "Подборка природных и исторических мест вокруг села, с короткой прогулкой по центру и советами по фотографии.",
      ja: "村の周辺にある自然と歴史の見どころを厳選。村の中心を巡る短い散策と撮影のヒントつき。",
      sr: "Избор природних и историјских места око села, уз кратку шетњу кроз центар и савете за фотографисање.",
      zh: "精选村庄周边的自然与历史景点，附村中心的短程漫步路线与摄影建议。",
      hu: "Válogatás a falu körüli természeti és történelmi helyekből, rövid központi sétával és fotótippekkel.",
    },
    heroImage: "/assets/aglen-rock-arch.png",
    heroImageAlt: {
      bg: "Скална арка над долината на река Вит край Ъглен",
      en: "A rock arch above the Vit River valley near Aglen",
      de: "Ein Felsbogen über dem Tal des Flusses Vit bei Aglen",
      fr: "Une arche rocheuse au-dessus de la vallée de la Vit près d'Aglen",
      es: "Un arco de roca sobre el valle del río Vit cerca de Aglen",
      it: "Un arco di roccia sopra la valle del fiume Vit vicino ad Aglen",
      ro: "O arcadă de stâncă deasupra văii râului Vit, lângă Aglen",
      tr: "Aglen yakınında Vit Nehri vadisinin üzerindeki bir kaya kemeri",
      el: "Μια βραχώδης αψίδα πάνω από την κοιλάδα του ποταμού Βιτ κοντά στο Άγκλεν",
      ru: "Скальная арка над долиной реки Вит близ Аглена",
      ja: "アグレン近郊、ヴィト川の谷にかかる岩のアーチ",
      sr: "Стеновити лук изнад долине реке Вит код Аглена",
      zh: "阿格伦附近维特河谷上方的天然岩拱",
      hu: "Sziklaboltív a Vit folyó völgye fölött Aglen közelében",
    },
    status: "published",
    placeIds: ["dupkata", "sloncheto", "chervena-stena", "rachkov-vir", "st-archangel-michael", "kaleto"],
    includeRouteStops: true,
    quickFacts: {
      duration: {
        bg: "Половин ден за пешеходната част", en: "Half a day for the walking part",
        de: "Ein halber Tag für den Wanderteil", fr: "Une demi-journée pour la partie à pied",
        es: "Media jornada para el tramo a pie", it: "Mezza giornata per la parte a piedi",
        ro: "O jumătate de zi pentru partea pe jos", tr: "Yürüyüş bölümü için yarım gün",
        el: "Μισή ημέρα για το πεζοπορικό μέρος", ru: "Полдня на пешеходную часть",
        ja: "徒歩部分で半日", sr: "Пола дана за пешачки део",
        zh: "步行部分需半天", hu: "Fél nap a gyalogos szakaszra",
      },
      bestSeason: {
        bg: "Пролет и есен", en: "Spring and autumn",
        de: "Frühling und Herbst", fr: "Printemps et automne",
        es: "Primavera y otoño", it: "Primavera e autunno",
        ro: "Primăvara și toamna", tr: "İlkbahar ve sonbahar",
        el: "Άνοιξη και φθινόπωρο", ru: "Весна и осень",
        ja: "春と秋", sr: "Пролеће и јесен",
        zh: "春季与秋季", hu: "Tavasz és ősz",
      },
      childFriendly: {
        bg: "Центърът и речният бряг са безопасни за деца; скалните венци изискват повишено внимание",
        en: "The centre and the riverbank are safe for children; the cliffs call for close attention",
        de: "Ortskern und Flussufer sind für Kinder sicher; an den Felswänden ist erhöhte Aufmerksamkeit nötig",
        fr: "Le centre et la berge conviennent aux enfants ; les corniches rocheuses exigent une vigilance accrue",
        es: "El centro y la ribera son seguros para los niños; los cortados rocosos exigen mucha atención",
        it: "Il centro e la riva del fiume sono sicuri per i bambini; le pareti rocciose richiedono grande attenzione",
        ro: "Centrul și malul râului sunt sigure pentru copii; brâiele de stâncă cer atenție sporită",
        tr: "Köy merkezi ve nehir kıyısı çocuklar için güvenli; kaya kuşakları ise dikkat ister",
        el: "Το κέντρο και η όχθη είναι ασφαλή για παιδιά· τα βραχώδη στεφάνια θέλουν αυξημένη προσοχή",
        ru: "Центр и берег реки безопасны для детей; скальные гряды требуют повышенного внимания",
        ja: "村の中心と川辺は子ども連れでも安心。岩壁の縁では十分な注意を",
        sr: "Центар и обала реке безбедни су за децу; стеновити венци траже појачану пажњу",
        zh: "村中心与河岸适合带孩子同行；岩壁边缘需格外小心",
        hu: "A falu központja és a folyópart gyerekekkel is biztonságos; a sziklaperemek fokozott figyelmet kívánnak",
      },
    },
    sections: [
      {
        heading: {
          bg: "🏞️ Какво предстои да откриете", en: "🏞️ What you are about to discover",
          de: "🏞️ Was Sie erwartet", fr: "🏞️ Ce que vous allez découvrir",
          es: "🏞️ Lo que está a punto de descubrir", it: "🏞️ Che cosa state per scoprire",
          ro: "🏞️ Ce urmează să descoperiți", tr: "🏞️ Sizi neler bekliyor",
          el: "🏞️ Τι πρόκειται να ανακαλύψετε", ru: "🏞️ Что вам предстоит открыть",
          ja: "🏞️ ここで出会えるもの", sr: "🏞️ Шта вас чека да откријете",
          zh: "🏞️ 你将发现什么", hu: "🏞️ Amit felfedezni készül",
        },
        body: [
          {
            bg: "Ъглен е мозайка от природни и исторически съкровища, събрани на броени крачки едно от друго. В границите на едно кратко разстояние тук се преплитат три съвсем различни свята.",
            en: "Aglen is a mosaic of natural and historical treasures gathered a few steps from one another. Within one short distance, three entirely different worlds are woven together here.",
            de: "Aglen ist ein Mosaik aus Natur- und Geschichtsschätzen, die nur wenige Schritte auseinanderliegen. Auf kurzer Strecke verweben sich hier drei ganz verschiedene Welten.",
            fr: "Aglen est une mosaïque de trésors naturels et historiques réunis à quelques pas les uns des autres. Sur une courte distance s'entrelacent ici trois mondes bien différents.",
            es: "Aglen es un mosaico de tesoros naturales e históricos reunidos a unos pasos unos de otros. En una distancia corta se entrelazan aquí tres mundos completamente distintos.",
            it: "Aglen è un mosaico di tesori naturali e storici raccolti a pochi passi l'uno dall'altro. In un breve tratto si intrecciano qui tre mondi del tutto diversi.",
            ro: "Aglen este un mozaic de comori naturale și istorice adunate la câțiva pași unele de altele. Pe o distanță scurtă se împletesc aici trei lumi cu totul diferite.",
            tr: "Aglen, birbirinden birkaç adım ötede toplanmış doğal ve tarihî hazinelerden oluşan bir mozaik. Kısacık bir mesafede burada bambaşka üç dünya iç içe geçer.",
            el: "Το Άγκλεν είναι ένα μωσαϊκό από φυσικούς και ιστορικούς θησαυρούς, μαζεμένους λίγα βήματα ο ένας από τον άλλον. Μέσα σε μικρή απόσταση συμπλέκονται εδώ τρεις εντελώς διαφορετικοί κόσμοι.",
            ru: "Аглен — мозаика природных и исторических сокровищ, собранных в нескольких шагах друг от друга. На коротком отрезке здесь переплетаются три совершенно разных мира.",
            ja: "アグレンは、自然と歴史の宝がほんの数歩の距離に集まったモザイクのような村です。わずかな道のりのなかで、まったく異なる三つの世界が織り合わさっています。",
            sr: "Аглен је мозаик природних и историјских блага скупљених на неколико корака једно од другог. На кратком одстојању овде се преплићу три сасвим различита света.",
            zh: "阿格伦是一幅由自然与历史珍宝拼成的马赛克，彼此相隔不过几步之遥。在这一小段路程里，三个截然不同的世界交织在一起。",
            hu: "Aglen természeti és történelmi kincsek mozaikja, amelyek néhány lépésre vannak egymástól. Rövid távon három egészen különböző világ fonódik itt össze.",
          },
        ],
        list: [
          {
            bg: "Величественият карст — монументални варовикови скали и арки, издигащи се над долината.",
            en: "The majestic karst — monumental limestone cliffs and arches rising above the valley.",
            de: "Der majestätische Karst — monumentale Kalkwände und Bögen über dem Tal.",
            fr: "Le karst majestueux — falaises et arches calcaires monumentales dominant la vallée.",
            es: "El karst majestuoso: cortados y arcos calizos monumentales sobre el valle.",
            it: "Il carso maestoso — pareti e archi calcarei monumentali che si levano sulla valle.",
            ro: "Carstul măreț — pereți și arcade de calcar monumentale deasupra văii.",
            tr: "Görkemli karst — vadinin üzerinde yükselen anıtsal kireçtaşı duvarlar ve kemerler.",
            el: "Ο μεγαλειώδης καρστ — μνημειώδη ασβεστολιθικά τοιχώματα και αψίδες πάνω από την κοιλάδα.",
            ru: "Величественный карст — монументальные известняковые стены и арки над долиной.",
            ja: "雄大なカルスト——谷の上にそびえる石灰岩の壁とアーチ。",
            sr: "Величанствени крас — монументални кречњачки зидови и лукови изнад долине.",
            zh: "壮阔的喀斯特——高踞谷上的巨大石灰岩壁与岩拱。",
            hu: "A fenséges karszt — a völgy fölé emelkedő monumentális mészkőfalak és boltívek.",
          },
          {
            bg: "Изумруденият Вит — спокойното течение на реката, изваяло прохладни вирове и скални прагове.",
            en: "The emerald Vit — the river's quiet flow, which has carved cool pools and rock sills.",
            de: "Der smaragdgrüne Vit — der ruhige Lauf des Flusses, der kühle Gumpen und Felsschwellen geschaffen hat.",
            fr: "La Vit émeraude — le cours tranquille de la rivière, qui a sculpté des vasques fraîches et des seuils rocheux.",
            es: "El Vit esmeralda: el curso sereno del río, que ha esculpido pozas frescas y umbrales de roca.",
            it: "Il Vit smeraldo — il corso tranquillo del fiume, che ha scavato pozze fresche e soglie di roccia.",
            ro: "Vitul smaragdiu — curgerea liniștită a râului, care a săpat bulboane răcoroase și praguri de stâncă.",
            tr: "Zümrüt Vit — serin göletler ve kaya eşikleri oymuş sakin akıntı.",
            el: "Ο σμαραγδένιος Βιτ — η ήρεμη ροή του ποταμού, που έχει σκάψει δροσερές γούρνες και βραχώδη κατώφλια.",
            ru: "Изумрудный Вит — спокойное течение реки, выточившее прохладные омуты и скальные пороги.",
            ja: "エメラルド色のヴィト川——静かな流れが削り出した涼やかな淵と岩の段。",
            sr: "Смарагдни Вит — мирни ток реке, који је издубио хладне вирове и стеновите прагове.",
            zh: "翡翠色的维特河——平缓的水流雕出清凉的深潭与岩坎。",
            hu: "A smaragdszínű Vit — a folyó csendes sodra, amely hűvös medencéket és sziklaküszöböket vájt.",
          },
          {
            bg: "Селската памет — уютният център с вековната църква, калдъръмените улички и автентичните каменни къщи.",
            en: "The village memory — the welcoming centre with its old church, cobbled lanes and honest stone houses.",
            de: "Das dörfliche Gedächtnis — der einladende Ortskern mit alter Kirche, Kopfsteinpflastergassen und echten Steinhäusern.",
            fr: "La mémoire du village — le centre accueillant, sa vieille église, ses ruelles pavées et ses maisons de pierre authentiques.",
            es: "La memoria del pueblo: el centro acogedor con su iglesia centenaria, las callejuelas empedradas y las casas de piedra auténticas.",
            it: "La memoria del villaggio — il centro accogliente con la chiesa secolare, i vicoli acciottolati e le autentiche case di pietra.",
            ro: "Memoria satului — centrul primitor, cu biserica veche, ulițele pietruite și casele autentice de piatră.",
            tr: "Köyün belleği — asırlık kilisesi, arnavut kaldırımlı sokakları ve özgün taş evleriyle sıcak bir merkez.",
            el: "Η μνήμη του χωριού — το φιλόξενο κέντρο με την παλιά εκκλησία, τα λιθόστρωτα σοκάκια και τα αυθεντικά πέτρινα σπίτια.",
            ru: "Память села — уютный центр со старой церковью, мощёными улочками и настоящими каменными домами.",
            ja: "村の記憶——古い教会、石畳の小径、素朴な石造りの家々が並ぶ、居心地のよい中心部。",
            sr: "Памћење села — пријатан центар са старом црквом, калдрмисаним уличицама и аутентичним каменим кућама.",
            zh: "村庄的记忆——温馨的中心地带，有百年老教堂、石板小巷与质朴的石屋。",
            hu: "A falu emlékezete — a barátságos központ a régi templommal, a macskaköves utcákkal és az igazi kőházakkal.",
          },
        ],
        notice: {
          bg: "Местата тук са описани така, както се знаят в селото. Проходимостта на пътеките се променя според сезона, затова попитайте на място, преди да се отправите към по-отдалечените скали.",
          en: "The places here are described as they are known in the village. How passable the paths are changes with the season, so ask locally before setting off towards the more remote rocks.",
          de: "Die Orte sind hier so beschrieben, wie man sie im Dorf kennt. Wie begehbar die Pfade sind, ändert sich mit der Jahreszeit — fragen Sie vor Ort, bevor Sie zu den entlegeneren Felsen aufbrechen.",
          fr: "Les lieux sont décrits ici tels qu'on les connaît au village. La praticabilité des sentiers varie selon la saison : renseignez-vous sur place avant de partir vers les rochers les plus éloignés.",
          es: "Los lugares se describen aquí tal como se conocen en el pueblo. La transitabilidad de los senderos cambia con la estación, así que pregunte en el pueblo antes de dirigirse a las rocas más alejadas.",
          it: "I luoghi sono descritti qui come li si conosce in paese. La percorribilità dei sentieri cambia con la stagione: chiedete sul posto prima di incamminarvi verso le rocce più lontane.",
          ro: "Locurile sunt descrise aici așa cum se știu în sat. Cât de practicabile sunt potecile depinde de sezon, așa că întrebați în sat înainte de a porni spre stâncile mai îndepărtate.",
          tr: "Yerler burada köyde bilindikleri gibi anlatılıyor. Patikaların geçilebilirliği mevsime göre değişir; uzaktaki kayalara yönelmeden önce köyde sorun.",
          el: "Τα μέρη περιγράφονται εδώ όπως τα ξέρουν στο χωριό. Το πόσο βατά είναι τα μονοπάτια αλλάζει με την εποχή, γι' αυτό ρωτήστε επιτόπου πριν ξεκινήσετε για τους πιο απόμακρους βράχους.",
          ru: "Места описаны здесь так, как их знают в селе. Проходимость троп меняется по сезонам, поэтому спросите на месте, прежде чем идти к дальним скалам.",
          ja: "ここでの説明は、村で語られているとおりのものです。道の通りやすさは季節によって変わりますので、遠くの岩場へ向かう前に村で尋ねてください。",
          sr: "Места су овде описана онако како се знају у селу. Проходност стаза мења се са годишњим добом, зато питајте у селу пре него што кренете ка удаљенијим стенама.",
          zh: "这里的描述沿用村里的说法。步道是否好走随季节变化，前往较远的岩区之前请先在村中打听。",
          hu: "A helyeket úgy írjuk le, ahogyan a faluban ismerik őket. Az ösvények járhatósága évszakonként változik, ezért kérdezzen a faluban, mielőtt a távolabbi sziklák felé indulna.",
        },
      },
      {
        heading: {
          bg: "📸 Фотографски съвети", en: "📸 Photography tips",
          de: "📸 Tipps zum Fotografieren", fr: "📸 Conseils photo",
          es: "📸 Consejos de fotografía", it: "📸 Consigli fotografici",
          ro: "📸 Sfaturi de fotografie", tr: "📸 Fotoğraf ipuçları",
          el: "📸 Συμβουλές φωτογράφισης", ru: "📸 Советы по фотографии",
          ja: "📸 撮影のヒント", sr: "📸 Савети за фотографисање",
          zh: "📸 摄影建议", hu: "📸 Fotótippek",
        },
        body: [
          {
            bg: "Златният час на скалите. Скалните венци и естествените арки разкриват цялата си красота при изгрев и залез: меката светлина облива варовика в топли златисти тонове, а дълбоките сенки подчертават формите. По обяд контрастът е твърде силен и релефът се губи.",
            en: "The golden hour on the rocks. The cliffs and natural arches give their best at sunrise and sunset: soft light washes the limestone in warm gold, and deep shadows bring out the shapes. At midday the contrast is too harsh and the relief disappears.",
            de: "Die goldene Stunde am Fels. Felswände und natürliche Bögen zeigen sich bei Sonnenauf- und -untergang am schönsten: weiches Licht taucht den Kalkstein in warmes Gold, tiefe Schatten modellieren die Formen. Mittags ist der Kontrast zu hart und das Relief verschwindet.",
            fr: "L'heure dorée sur la roche. Corniches et arches naturelles se révèlent au lever et au coucher du soleil : la lumière douce baigne le calcaire de tons dorés et les ombres profondes sculptent les formes. À midi, le contraste est trop dur et le relief disparaît.",
            es: "La hora dorada en la roca. Los cortados y los arcos naturales se muestran mejor al amanecer y al atardecer: la luz suave baña la caliza de tonos dorados y las sombras profundas realzan las formas. Al mediodía el contraste es demasiado duro y el relieve se pierde.",
            it: "L'ora dorata sulla roccia. Pareti e archi naturali danno il meglio all'alba e al tramonto: la luce morbida bagna il calcare di toni caldi e le ombre profonde scolpiscono le forme. A mezzogiorno il contrasto è troppo duro e il rilievo si perde.",
            ro: "Ora de aur pe stâncă. Brâiele și arcadele naturale se arată cel mai bine la răsărit și la apus: lumina blândă scaldă calcarul în tonuri aurii, iar umbrele adânci scot formele în relief. La prânz contrastul e prea dur și relieful se pierde.",
            tr: "Kayalarda altın saat. Kaya kuşakları ve doğal kemerler en güzel hâllerini gün doğumu ve gün batımında gösterir: yumuşak ışık kireçtaşını sıcak altın tonlara boyar, derin gölgeler biçimleri ortaya çıkarır. Öğle vakti kontrast fazla serttir ve doku kaybolur.",
            el: "Η χρυσή ώρα στους βράχους. Τα βραχώδη στεφάνια και οι φυσικές αψίδες δίνουν τον καλύτερό τους εαυτό στην ανατολή και στη δύση: το απαλό φως λούζει τον ασβεστόλιθο σε ζεστούς χρυσούς τόνους και οι βαθιές σκιές αναδεικνύουν τα σχήματα. Το μεσημέρι η αντίθεση είναι πολύ σκληρή και το ανάγλυφο χάνεται.",
            ru: "Золотой час на скалах. Скальные гряды и природные арки раскрываются на рассвете и закате: мягкий свет заливает известняк тёплым золотом, а глубокие тени лепят формы. В полдень контраст слишком резкий, и рельеф пропадает.",
            ja: "岩のゴールデンアワー。岩壁と自然のアーチがもっとも美しいのは日の出と日没です。やわらかな光が石灰岩を暖かな金色に染め、深い影が形を立ち上がらせます。真昼はコントラストが強すぎ、起伏が飛んでしまいます。",
            sr: "Златни час на стенама. Стеновити венци и природни лукови најлепши су у зору и на заласку: мека светлост облива кречњак топлим златним тоновима, а дубоке сенке издвајају облике. У подне је контраст пресилан и рељеф се губи.",
            zh: "岩壁的黄金时刻。岩壁与天然拱门在日出与日落时最动人：柔和的光把石灰岩染成温暖的金色，深影勾出形体。正午的反差过强，起伏会被压平。",
            hu: "Aranyóra a sziklákon. A sziklafalak és a természetes boltívek napkeltekor és napnyugtakor mutatják magukat a legszebben: a lágy fény meleg aranyba vonja a mészkövet, a mély árnyékok kiemelik a formákat. Délben túl kemény a kontraszt, és eltűnik a plaszticitás.",
          },
          {
            bg: "Магията на реката. Отправете се към брега рано сутрин — тогава водната повърхност е огледално гладка, отраженията са най-чисти, а над водата често се носи тънка мъгла.",
            en: "The magic of the river. Head for the bank early in the morning — the surface is mirror-smooth then, the reflections are cleanest, and a thin mist often drifts above the water.",
            de: "Der Zauber des Flusses. Gehen Sie früh am Morgen ans Ufer — dann ist die Oberfläche spiegelglatt, die Spiegelungen sind am klarsten, und über dem Wasser zieht oft feiner Nebel.",
            fr: "La magie de la rivière. Rejoignez la berge tôt le matin : la surface est alors lisse comme un miroir, les reflets sont les plus nets et une brume légère flotte souvent sur l'eau.",
            es: "La magia del río. Acérquese a la orilla temprano por la mañana: la superficie está entonces lisa como un espejo, los reflejos son más limpios y a menudo flota una niebla fina sobre el agua.",
            it: "La magia del fiume. Andate in riva presto al mattino: la superficie è liscia come uno specchio, i riflessi sono più puliti e sull'acqua indugia spesso una nebbia sottile.",
            ro: "Magia râului. Mergeți pe mal dis-de-dimineață — atunci luciul apei e ca o oglindă, reflexiile sunt cele mai curate, iar deasupra apei plutește adesea o ceață subțire.",
            tr: "Nehrin büyüsü. Sabah erkenden kıyıya inin — su yüzeyi ayna gibi düzdür, yansımalar en berrak hâlindedir ve suyun üstünde çoğu zaman ince bir sis gezinir.",
            el: "Η μαγεία του ποταμού. Κατεβείτε στην όχθη νωρίς το πρωί — τότε η επιφάνεια είναι λεία σαν καθρέφτης, οι αντανακλάσεις καθαρότερες και πάνω από το νερό συχνά πλανιέται λεπτή ομίχλη.",
            ru: "Магия реки. Спуститесь к берегу ранним утром — тогда вода гладка как зеркало, отражения самые чистые, а над водой часто стелется тонкий туман.",
            ja: "川の魔法。朝早く岸へ向かってください。水面は鏡のように静まり、映り込みはもっとも澄み、水の上には薄い霧がたなびくことがよくあります。",
            sr: "Магија реке. Пођите на обалу рано ујутру — тада је површина глатка као огледало, одрази су најчистији, а изнад воде се често вуче танка магла.",
            zh: "河流的魔法。清晨到河边去——那时水面平静如镜，倒影最为清透，水上常有一层薄雾浮动。",
            hu: "A folyó varázsa. Menjen ki a partra kora reggel — ilyenkor a víz tükörsima, a tükröződések a legtisztábbak, és gyakran vékony pára úszik a víz felett.",
          },
        ],
      },
      {
        heading: {
          bg: "🎒 Какво да вземете със себе си", en: "🎒 What to take with you",
          de: "🎒 Was Sie mitnehmen sollten", fr: "🎒 Ce qu'il faut emporter",
          es: "🎒 Qué llevar consigo", it: "🎒 Che cosa portare con sé",
          ro: "🎒 Ce să luați cu voi", tr: "🎒 Yanınıza ne almalısınız",
          el: "🎒 Τι να πάρετε μαζί σας", ru: "🎒 Что взять с собой",
          ja: "🎒 持っていくもの", sr: "🎒 Шта понети са собом",
          zh: "🎒 随身要带什么", hu: "🎒 Mit vigyen magával",
        },
        body: [],
        list: [
          {
            bg: "Удобни обувки с грайфер — теренът е неравен и каменист.",
            en: "Comfortable shoes with grip — the ground is uneven and stony.",
            de: "Bequeme Schuhe mit Profil — der Untergrund ist uneben und steinig.",
            fr: "Des chaussures confortables à bonne accroche — le terrain est inégal et pierreux.",
            es: "Calzado cómodo con buen agarre: el terreno es irregular y pedregoso.",
            it: "Scarpe comode con buona presa — il terreno è irregolare e sassoso.",
            ro: "Încălțăminte comodă, cu talpă aderentă — terenul e denivelat și pietros.",
            tr: "Tabanı tutan rahat ayakkabı — zemin engebeli ve taşlık.",
            el: "Άνετα παπούτσια με καλό πάτημα — το έδαφος είναι ανώμαλο και πετρώδες.",
            ru: "Удобная обувь с хорошим протектором — грунт неровный и каменистый.",
            ja: "グリップのきいた歩きやすい靴——地面は不整で石がちです。",
            sr: "Удобна обућа с добрим ђоном — терен је нераван и каменит.",
            zh: "抓地力好的舒适鞋子——路面不平且多碎石。",
            hu: "Kényelmes, jó tapadású cipő — a talaj egyenetlen és köves.",
          },
          {
            bg: "Достатъчно вода за целия преход.",
            en: "Enough water for the whole walk.",
            de: "Genug Wasser für die gesamte Wanderung.",
            fr: "Assez d'eau pour toute la marche.",
            es: "Agua suficiente para todo el recorrido.",
            it: "Acqua a sufficienza per tutto il percorso.",
            ro: "Apă suficientă pentru tot traseul.",
            tr: "Tüm yürüyüş için yeterli su.",
            el: "Αρκετό νερό για όλη τη διαδρομή.",
            ru: "Достаточно воды на весь маршрут.",
            ja: "行程ぶんの十分な飲み水。",
            sr: "Довољно воде за цео пут.",
            zh: "足够走完全程的饮用水。",
            hu: "Elegendő víz az egész túrára.",
          },
          {
            bg: "Защита от слънце — шапка, очила и крем, особено за откритите скални плата.",
            en: "Sun protection — a hat, sunglasses and cream, especially for the open rock plateaus.",
            de: "Sonnenschutz — Hut, Sonnenbrille und Creme, vor allem für die offenen Felsplateaus.",
            fr: "Une protection solaire — chapeau, lunettes et crème, surtout pour les plateaux rocheux découverts.",
            es: "Protección solar: sombrero, gafas y crema, sobre todo para las mesetas rocosas abiertas.",
            it: "Protezione solare — cappello, occhiali e crema, soprattutto per gli altipiani rocciosi scoperti.",
            ro: "Protecție solară — pălărie, ochelari și cremă, mai ales pentru platourile de stâncă descoperite.",
            tr: "Güneş koruması — şapka, gözlük ve krem; özellikle açık kaya platoları için.",
            el: "Αντηλιακή προστασία — καπέλο, γυαλιά και κρέμα, ιδίως για τα ακάλυπτα βραχώδη πλατώματα.",
            ru: "Защита от солнца — шляпа, очки и крем, особенно для открытых скальных плато.",
            ja: "日よけ——帽子、サングラス、日焼け止め。とくに開けた岩の台地では必須です。",
            sr: "Заштита од сунца — шешир, наочаре и крема, нарочито за отворене стеновите заравни.",
            zh: "防晒装备——帽子、墨镜与防晒霜，尤其在开阔的岩台上。",
            hu: "Napvédelem — kalap, napszemüveg és krém, különösen a nyílt sziklafennsíkokon.",
          },
          {
            bg: "Уважение към тишината на селото и към частните дворове.",
            en: "Respect for the quiet of the village and for private yards.",
            de: "Respekt für die Ruhe des Dorfes und für private Höfe.",
            fr: "Du respect pour le calme du village et pour les cours privées.",
            es: "Respeto por el silencio del pueblo y por los patios privados.",
            it: "Rispetto per la quiete del paese e per i cortili privati.",
            ro: "Respect pentru liniștea satului și pentru curțile private.",
            tr: "Köyün sessizliğine ve özel avlulara saygı.",
            el: "Σεβασμό στην ησυχία του χωριού και στις ιδιωτικές αυλές.",
            ru: "Уважение к тишине села и к частным дворам.",
            ja: "村の静けさと、私有の庭先への敬意。",
            sr: "Поштовање према тишини села и приватним двориштима.",
            zh: "尊重村庄的宁静与住户的私人院落。",
            hu: "Tisztelet a falu csendje és a magánudvarok iránt.",
          },
        ],
        notice: {
          bg: "Скалните ръбове над долината са диви и необезопасени. Дръжте децата на сигурно разстояние от пропастите и не се приближавайте до ръба при мокро, дъждовно или заледено време.",
          en: "The rock edges above the valley are wild and unfenced. Keep children a safe distance from the drops, and do not approach the edge in wet, rainy or icy conditions.",
          de: "Die Felskanten über dem Tal sind wild und ungesichert. Halten Sie Kinder in sicherem Abstand zu den Abbrüchen und treten Sie bei Nässe, Regen oder Eis nicht an den Rand.",
          fr: "Les bords rocheux au-dessus de la vallée sont sauvages et sans protection. Tenez les enfants à bonne distance du vide et n'approchez pas du bord par temps humide, pluvieux ou verglacé.",
          es: "Los bordes rocosos sobre el valle son salvajes y no están protegidos. Mantenga a los niños a una distancia segura de los cortados y no se acerque al borde con lluvia, humedad o hielo.",
          it: "I bordi rocciosi sopra la valle sono selvaggi e privi di protezioni. Tenete i bambini a distanza di sicurezza dagli strapiombi e non avvicinatevi al ciglio con tempo umido, piovoso o gelato.",
          ro: "Marginile de stâncă de deasupra văii sunt sălbatice și neasigurate. Țineți copiii la distanță sigură de prăpăstii și nu vă apropiați de margine pe vreme umedă, ploioasă sau înghețată.",
          tr: "Vadinin üzerindeki kaya kenarları doğal hâlinde ve korkuluksuzdur. Çocukları uçurumlardan güvenli mesafede tutun; ıslak, yağmurlu ya da buzlu havada kenara yaklaşmayın.",
          el: "Τα βραχώδη χείλη πάνω από την κοιλάδα είναι άγρια και χωρίς προστατευτικά. Κρατήστε τα παιδιά σε ασφαλή απόσταση από τα γκρεμνά και μην πλησιάζετε την άκρη με υγρασία, βροχή ή πάγο.",
          ru: "Скальные обрывы над долиной дикие и не огорожены. Держите детей на безопасном расстоянии от края и не подходите к нему в сырую, дождливую или гололёдную погоду.",
          ja: "谷の上の岩の縁は自然のままで、柵はありません。子どもは崖から十分に離してください。濡れた日、雨の日、凍結した日には縁に近づかないでください。",
          sr: "Стеновите ивице изнад долине дивље су и необезбеђене. Држите децу на сигурном одстојању од провалија и не прилазите ивици по влажном, кишном или залеђеном времену.",
          zh: "谷上的岩缘处于天然状态，没有护栏。请让孩子与崖边保持安全距离；潮湿、下雨或结冰时不要靠近边缘。",
          hu: "A völgy feletti sziklaperemek vadak és korlát nélküliek. Tartsa a gyerekeket biztonságos távolságban a szakadéktól, és nedves, esős vagy jeges időben ne menjen a peremhez.",
        },
      },
    ],
    relatedGuideIds: ["vit-river", "caves-and-rocks", "local-food"],
    lastUpdated: "2026-07-27",
    regionPlaceIds: ["vit-river", "lukovit"],
  },
  {
    id: "vit-river",
    slug: "vit-river",
    legacyRouteId: "vitRiver",
    title: { bg: "Ръководство за река Вит", en: "Guide to the Vit River" },
    summary: {
      bg: "Реката край Ъглен — вировете, брегът и разходките покрай водата.",
      en: "The river at Aglen — its pools, its bank and the walks along the water.",
    },
    heroImage: "/assets/aglen-vit-river-sunset.png",
    heroImageAlt: { bg: "Река Вит при залез край Ъглен", en: "The Vit River at sunset near Aglen" },
    status: "in-preparation",
    placeIds: ["rachkov-vir"],
    sections: [
      {
        heading: { bg: "Реката край Ъглен", en: "The river at Aglen" },
        body: [
          {
            bg: "Вит минава покрай селото и оформя вировете и бреговете, по които тръгват повечето разходки. Пътеката покрай реката е част от обиколката на центъра.",
            en: "The Vit passes the village and shapes the pools and banks where most walks begin. The riverside path is part of the walk around the centre.",
          },
        ],
        notice: {
          bg: "Не разполагаме с проверена информация за безопасни места за къпане, за режима на риболова и за достъпа до брега. Не приемайте нито едно място за разрешено, преди да проверите на място.",
          en: "We hold no verified information about safe swimming spots, fishing rules or bank access. Do not assume any spot is permitted before checking locally.",
        },
      },
    ],
    relatedGuideIds: ["beautiful-places", "caves-and-rocks", "seasonal-guide"],
    lastUpdated: "2026-07-24",
    regionPlaceIds: ["vit-river"],
  },
  {
    id: "caves-and-rocks",
    slug: "caves-and-rocks",
    legacyRouteId: "caves",
    title: { bg: "Пещери и скални форми", en: "Caves and rock formations" },
    summary: {
      bg: "Карстовият релеф около Ъглен и Карлуково — скални арки, пещери и варовикови образувания.",
      en: "The karst landscape around Aglen and Karlukovo — rock arches, caves and limestone formations.",
    },
    // The Eyes of God. Prohodna is the only entity that borrows this plate
    // (contentRef.guideSlug), so this is also the hero of /place/prohodna/.
    heroImage: "/assets/prohodna-cover.png",
    heroImageAlt: {
      bg: "Погледнато отвътре нагоре към свода на Проходна: два отвора с формата на очи, през които се вижда синьо небе с облаци, над набраздени варовикови стени.",
      en: "Looking up at the roof of Prohodna from inside: two eye-shaped openings showing blue sky and cloud, above furrowed limestone walls.",
    },
    status: "in-preparation",
    placeIds: ["dupkata", "sloncheto"],
    sections: [
      {
        heading: { bg: "Открити скални форми и пещери", en: "Open rock formations and caves" },
        body: [
          {
            bg: "Скалните арки и фигури около селото се разглеждат отвън и отблизо, без специална подготовка. Пещерите в Луковитския карст са друго нещо: те се различават силно по дълбочина, достъп и риск.",
            en: "The rock arches and figures around the village can be viewed from outside, up close, with no special preparation. The caves of the Lukovit karst are a different matter: they vary widely in depth, access and risk.",
          },
        ],
        notice: {
          bg: "Не влизайте в пещера без екипировка и без опитен водач. Тук не публикуваме кои пещери са свободно достъпни, защото нямаме проверена информация за това — потърсете местна насока преди посещение.",
          en: "Do not enter a cave without equipment and an experienced guide. We do not publish which caves are freely accessible, because we have no verified information about it — seek local guidance before visiting.",
        },
      },
    ],
    relatedGuideIds: ["beautiful-places", "nearby-destinations", "vit-river"],
    lastUpdated: "2026-07-24",
    regionPlaceIds: ["prohodna", "karlukovo", "devetashka"],
  },
  {
    id: "local-food",
    slug: "local-food",
    legacyRouteId: "food",
    title: { bg: "Храна и местни продукти", en: "Food and local products" },
    summary: {
      bg: "Кой какво предлага в Ъглен — местни производители, продукти и места за хапване.",
      en: "Who offers what in Aglen — local producers, products and places to eat.",
    },
    heroImage: "/assets/aglen-village-church.png",
    heroImageAlt: { bg: "Селска улица и къщи в Ъглен", en: "A village street and houses in Aglen" },
    status: "published",
    businessCategories: ["food", "producers", "farming", "shops"],
    sections: [
      {
        heading: { bg: "Откъде да купите местно", en: "Where to buy local" },
        body: [
          {
            bg: "Списъкът по-долу се води от регистъра на местния бизнес и се обновява заедно с него. Показани са само реални обекти — когато няма вписан обект в дадена категория, тук не се появява нищо.",
            en: "The list below is driven by the local business directory and updates along with it. Only real listings appear — when a category holds no listing, nothing is shown here.",
          },
        ],
      },
    ],
    relatedGuideIds: ["beautiful-places", "seasonal-guide", "nearby-destinations"],
    lastUpdated: "2026-07-24",
    regionPlaceIds: ["lukovit"],
  },
  {
    id: "nearby-destinations",
    slug: "nearby-destinations",
    legacyRouteId: "nearby",
    title: { bg: "Близки дестинации", en: "Nearby destinations" },
    summary: {
      bg: "Какво да съчетаете с Ъглен — Карлуково, Луковит и околните забележителности.",
      en: "What to combine with Aglen — Karlukovo, Lukovit and the sights around them.",
    },
    heroImage: "/assets/aglen-aerial-river.png",
    heroImageAlt: { bg: "Въздушна гледка към река Вит и долината", en: "An aerial view of the Vit River and the valley" },
    status: "in-preparation",
    sections: [
      {
        heading: { bg: "Посоките около Ъглен", en: "The directions around Aglen" },
        body: [
          {
            bg: "Посещението на Ъглен се съчетава най-често с Проходна, Карлуково, Искър–Панега и Луковит.",
            en: "A visit to Aglen is most often combined with Prohodna, Karlukovo, Iskar–Panega and Lukovit.",
          },
        ],
        notice: {
          bg: "Времената за пътуване и препоръчителната продължителност на посещенията още не са проверени, затова не са публикувани тук.",
          en: "Travel times and recommended visit durations have not been verified yet, so they are not published here.",
        },
      },
    ],
    relatedGuideIds: ["caves-and-rocks", "beautiful-places", "seasonal-guide"],
    lastUpdated: "2026-07-24",
    regionPlaceIds: ["prohodna", "karlukovo", "lukovit", "iskar-panega", "zlatna-panega", "devetashka", "krushuna", "lovech"],
  },
  {
    id: "seasonal-guide",
    slug: "seasonal-guide",
    legacyRouteId: "seasonal",
    title: { bg: "Сезонен наръчник", en: "Seasonal guide" },
    summary: {
      bg: "Кога кое място си струва — обща сезонна насока за пролетта, лятото, есента и зимата.",
      en: "When each place is worth it — general seasonal guidance for spring, summer, autumn and winter.",
    },
    heroImage: "/assets/aglen-hero-river-canyon.png",
    heroImageAlt: { bg: "Каньонът на река Вит край Ъглен", en: "The Vit River canyon near Aglen" },
    status: "in-preparation",
    sections: [
      {
        heading: { bg: "Обща сезонна насока", en: "General seasonal guidance" },
        body: [
          {
            bg: "Пролетта и есента са най-удобни за ходене — светлината е мека, а горещината не пречи. Лятото е за реката и за ранните часове. Зимата стеснява избора до центъра на селото и до гледките отдалеч.",
            en: "Spring and autumn are the easiest for walking — the light is soft and the heat is not in the way. Summer is for the river and the early hours. Winter narrows the choice to the village centre and to the views from a distance.",
          },
        ],
        notice: {
          bg: "Това е обща насока, а не актуална информация. Сайтът няма връзка с метеорологичен източник и не следи състоянието на пътеките — проверявайте прогнозата и питайте на място.",
          en: "This is general guidance, not live information. The site has no weather source and does not track path conditions — check the forecast and ask locally.",
        },
      },
    ],
    relatedGuideIds: ["beautiful-places", "vit-river", "nearby-destinations"],
    lastUpdated: "2026-07-24",
  },
];

export function localizeGuide(text: LocalizedText, language: LanguageCode): string {
  return text[language] ?? text.en ?? text.bg;
}

export function findGuide(slug: string): TourismGuide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function guideByLegacyRoute(routeId: string): TourismGuide | undefined {
  return guides.find((guide) => guide.legacyRouteId === routeId);
}

/** Places for a guide, read from the locale content so nothing is duplicated. */
export function guidePlaces(guide: TourismGuide, language: LanguageCode) {
  const list = contentByLanguage[language].placesList;
  return (guide.placeIds ?? [])
    .map((id) => list.find((place) => place.id === id))
    .filter((place): place is (typeof list)[number] => Boolean(place));
}

/**
 * Reading time from the guide's own words, rounded up to whole minutes at
 * 200 wpm. Returns 0 when the guide has no body text, so no number is shown.
 */
export function readingMinutes(guide: TourismGuide, language: LanguageCode): number {
  const words = (guide.sections ?? [])
    .flatMap((section) => [
      localizeGuide(section.heading, language),
      ...section.body.map((paragraph) => localizeGuide(paragraph, language)),
      ...(section.list ?? []).map((item) => localizeGuide(item, language)),
      section.notice ? localizeGuide(section.notice, language) : "",
    ])
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return words === 0 ? 0 : Math.max(1, Math.round(words / 200));
}
