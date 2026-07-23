import { images, negotiablePrice } from "./shared";
import type { PageCopy } from "./types";

export const hu: PageCopy = {
  nav: { home: "Kezdőlap", about: "Aglenről", landmarks: "Látnivalók", stay: "Szállás", quests: "AR-küldetések", events: "Események", business: "Helyi vállalkozások" },
  ui: { languageLabel: "Nyelv", languageSelectAria: "Nyelv kiválasztása", modalCloseAria: "Bezárás", mobileMenuAria: "Menü" },
  brand: { name: "Aglen", subtitle: "Falu a Vit folyónál" },
  hero: {
    meta: "Észak-Bulgária · Vit folyó · Lukovit · Karlukovo",
    title: "AGLEN",
    subtitle: "A Vit folyó rejtett kincse",
    lede: "Fedezz fel kanyonokat, barlangokat, folyómedencéket és lenyűgöző természeti jelenségeket Észak-Bulgária szívében. Aglen ideális úti cél sétákhoz, fotózáshoz, horgászathoz és nyugodt hétvégéhez a természetben.",
    primary: "Fedezd fel Aglent",
    secondary: "Alkalmazás letöltése",
    cue: "Fedezd fel a völgyet",
    imageAlt: "Filmszerű kilátás egy folyókanyonra és falusi tájra, Aglen ihlette",
  },
  statsLabel: "Miért érdemes Aglent felkeresni",
  about: {
    eyebrow: "Történelem és helyi emlékezet",
    title: "Az agleni sziklák titkai",
    text: "A mészkőtömbök és a Lukovit környéki karszt tucatnyi barlangja mögött Aglennél olyan történelem rejlik, amely évezredes földtani átalakulásokon, trák kultikus szokásokon és a bolgár nemzeti ébredés krónikáin ível át. Fedezd fel a rétegeket alább.",
  },
  legends: {
    eyebrow: "Aglen legendái és rejtélyei",
    title: "Aglen kanyonjai, barlangjai és régi ösvényei között minden helynek megvan a maga története.",
    text: "A legerősebb történetek itt nem hangosak. A helyi nevekben, a barlangküszöbökben, a különös sziklaformákban és a folyó kanyarulataiban élnek.",
  },
  landmarks: {
    eyebrow: "Felfedezhető helyek",
    title: "Aglen legszebb helyei",
    text: "A lenyűgöző sziklaképződményektől és folyómedencéktől a panorámás kilátásokig és történelmi helyszínekig – itt a természet és a helyi legendák minden sétát kis felfedezéssé varázsolnak.",
    aria: "Útvonalpontok Aglen körül",
  },
  experiences: {
    eyebrow: "Élmények",
    title: "Éld át Aglent a saját módodon",
    text: "Válassz sétát, fotós kalandot, horgászatot vagy hétvégét a természetben, és fedezd fel a vidék legjavát.",
    cta: "Kérdezz az útvonalról",
  },
  gallery: { eyebrow: "Természeti galéria", title: "Egy hely folyófénnyel és kővel elmesélve", aria: "Aglen galéria" },
  stay: {
    eyebrow: "Szállás Aglenben",
    title: "Maradj a természet közelében",
    text: "Válassz nyugodt szálláshelyet, és használd Aglent kiindulópontként a régió természeti kincseinek megismeréséhez.",
  },
  quests: {
    eyebrow: "Első a maga nemében Bulgáriában",
    title: "Valódi AR-kaland Aglen közelében",
    text: "Az Unlocking Bulgaria valódi helyekre vezet: telefonoddal rejtett 3D világot látsz, rejtvényeket oldasz meg, és követed az Őrző nyomait. Nem szimuláció. Nem múzeum. Valódi élő kaland.",
    cta: "Letöltés és kezdés",
    features: [
      { id: "ar", title: "Kiterjesztett valóság (AR)", text: "Mi rejtőzik ezeken a helyeken? Irányítsd a kamerát, és nézd, ahogy a rejtett világ életre kel a szemeid előtt." },
      { id: "gps", title: "Élő GPS-küldetések", text: "Melyik hely rejti a következő nyomot? Kövesd a GPS-küldetést Aglen valódi látnivalóihoz." },
      { id: "story", title: "Másképp elmesélt történelem", text: "Ki az Őrző? Mit védenek az ősi jelek? Tárd fel Prohodna barlang legendáit egy játékon keresztül." },
    ],
  },
  ar: {
    eyebrow: "AR-kaland",
    title: "Lásd az Őrző világát",
    text: "Telefonod kamerájával életre keltheted Prohodna rejtett világát. Az AR-réteg történeteket, jeleket és szereplőket tár fel, amelyek szabad szemmel láthatatlanok, de csak azokon a helyeken, ahol megtörténtek.",
    steps: [
      "Töltsd le az alkalmazást",
      "Menj egy jelölt AR-helyre Aglen körül",
      "Irányítsd a kamerát, és lásd a rejtett világot",
    ],
    cta: "Letöltés és kezdés",
  },
  app: {
    eyebrow: "Alkalmazás letöltése",
    title: "Unlocking Bulgaria",
    text: "Androidos mobilalkalmazás. Találd meg a küldetéseket Aglen körül, és indulj valódi kalandra.",
    badge: "Unlocking Bulgaria megnyitása",
    note: "Az alkalmazás hivatalos webhelye: unlockingbulgaria.com/bg/.",
  },
  contact: {
    eyebrow: "Látogatás tervezése",
    title: "Tervezd meg a látogatásod",
    text: "Lépj kapcsolatba velünk útvonalakról, látnivalókról, fotóhelyekről, horgászatról, szállásról és egy felejthetetlen, Vit folyó menti hétvége ötleteiről szóló információkért.",
    notesTitle: "Látogatói jegyzetek",
    noteOne: "Alkalmas ökoturizmushoz, fotózáshoz, horgászathoz, gyalogos útvonalakhoz, barlanglátogatáshoz és észak-bulgáriai hétvégéhez, fotózáshoz, folyókilátásokhoz, barlangokhoz és helyi emlékezethez.",
    noteTwo: "Hozz kényelmes cipőt, vizet, napvédelmet és tiszteletet a helyi terek iránt.",
    cta: "Érdeklődés küldése",
  },
  events: {
    eyebrow: "Naptár",
    title: "Események Aglenben",
    text: "Ünnepek, falusi összejövetelek, szabadtéri találkozók és szezonális események Aglenben és a Vit folyó mentén. Nézzen vissza a közelgő időpontokért.",
    emptyState: "A közelgő események hamarosan. Ha Aglenben eseményt szervez vagy tud róla, ossza meg velünk.",
    dateLabel: "Mikor",
    locationLabel: "Hol",
    submitTitle: "Van fotója vagy híre Aglenből?",
    submitText: "Küldjön nekünk fényképet vagy eseményinformációt. Közzététel előtt minden beküldést átnézünk.",
    submitCta: "Fotó / infó megosztása",
  },
  hub: {
    eyebrow: "Turisztikai kalauz",
    title: "Tervezd Aglent érdeklődés, útvonal és közeli hely szerint",
    text: "A szakosított kalauzok az úti cél fő történetét kapcsolják össze a látogató szándékával: látnivalók, turizmus, horgászat, barlangok, Vit folyó, szállás, étel, szezonális frissítések és közeli célpontok.",
  },
  guides: {
    vitRiver: { label: "Vit folyó kalauz", text: "A Vit folyó a vidék szíve, amely számtalan kis ösvényével több ezer helyet kínál sétákhoz, fotózáshoz, horgászathoz és természetközeli pihenéshez." },
    fishing: { label: "Horgászat a Vitnél", text: "A Vit folyó gyönyörű és nyugodt horgászhelyeket kínál Észak-Bulgária természetében." },
    hiking: { label: "Túraútvonalak", text: "Ökoösvények és útvonalak vezetik a látogatókat Aglen legszebb természeti látnivalóihoz." },
    caves: { label: "Barlangok és sziklaformák", text: "Az Aglen és Karlukovo körüli vidék barlangjairól és lenyűgöző mészkőképződményeiről ismert." },
    food: { label: "Étel és helyi termékek", text: "Kóstold meg a Lukovit régióra jellemző házi készítésű termékeket és hagyományos ízeket." },
    nearby: { label: "Közeli célpontok", text: "Kombináld az agleni látogatást Prohodnával, Karlukovóval, Iskar–Panegával, Lukovittal és a vidék más látnivalóival." },
    seasonal: { label: "Szezonális kalauz", text: "Havi frissítések útvonalakról, fotózásról, az időjárásról és egy csendes hétvége tervezéséről." },
  },
  highlights: [
    { label: "Rejtett Bulgária", value: "Autentikus élmény", detail: "A tömegturizmustól távol Aglen nyugalmat, gyönyörű természetet és egy bolgár falu igazi hangulatát kínálja." },
    { label: "Természet", value: "Kanyonok, barlangok és folyó", detail: "A falu környéke mészkősziklákkal, barlangokkal, folyómedencékkel és Észak-Bulgária egyik legszebb természeti tájával nyűgöz le." },
    { label: "Identitás", value: "Az egyetlen „Ъ” betű", detail: "Aglen az egyetlen település Bulgáriában, amelynek neve a „Ъ” betűvel kezdődik." },
  ],
  timeline: [
    {
      title: "Sziklák és barlangok földje",
      detail: "Az Aglen körüli mészkősziklák és barlangok a Lukovit és a Vit folyó vidékének egyik leglenyűgözőbb természeti táját alkotják.",
      intro:
        "A Vit folyó völgye Aglen falu környékén sokkal többet őriz a szokásos turistalegendáknál az oszmán üldöztetésekről és a sziklahidakról. A mészkőtömbök és a Lukovit karsztvidék e szakaszának tucatnyi barlangja mögött olyan történelem rejlik, amely évezredes földtani átalakulásokon, trák kultikus szokásokon és középkori szellemi elszigetelődésen ível át.",
      sections: [
        {
          heading: "1. A földtani anomália: Miért egyediek itt a sziklák?",
          body: [
            "A Lukovit környéki karszt földtani kutatásai azt mutatják, hogy az Aglen körüli sziklák nem egyszerű mészkövek, hanem az úgynevezett lomi és áprilisi rétegekhez tartoznak (főként az alsó krétából).",
            "A földalatti vízi labirintus: a Vit folyó ezen a szakaszon sajátos kanyarulatokat képez, mert évmilliókkal ezelőtt tektonikus vetődéseket követett. A folyó mai medre és a sziklatömbök alatt földalatti szifonok és „száraz” galériák egész hálózata húzódik, amelyeket a barlangkutatók még nem térképeztek fel teljesen.",
            "A kanyon mikroklímája: a helyenként akár 100 méter magas függőleges sziklák sajátos termokarsztos mikroklímát hoznak létre. A mély kanyon és a barlangi források miatt a Vit menti mélyebb részek hőmérséklete olykor néhány fokkal eltér a fennsíkétól, ami elősegítette a reliktumnövényzet és a sajátos karsztos biocönózisok fennmaradását, amelyeket a botanikusok már a XX. század elején kutattak.",
          ],
        },
        {
          heading: "2. Az őskor és a trákok nyomai",
          body: [
            "Bár a közismert elbeszélések az oszmán uralom korszakára összpontosítanak (mint a Selishte nevű helyen és a Valovata dupka / Ochilatata barlangban történt tragédia), az Aglen körüli barlangok régészeti nyomai sokkal mélyebb ősiségre utalnak:",
            "A sziklaívek környékén és a barlangok körül őskori kerámia egyes töredékeit találták (főként a rézkorból és a korai bronzkorból), amelyek azt mutatják, hogy a barlangok vadászok és az első pásztorok ideiglenes menedékeként szolgáltak már több mint 4-5 évezreddel ezelőtt is.",
            "A szomszédos Karlukovo–Iskar régióhoz hasonlóan itt is a nehezen megközelíthető sziklateraszokat a trák törzsek (a tribalok) szabadtéri szentélyekként használták, amelyek a víz, a szikla és a földalatti erők kultuszaihoz kapcsolódtak. A vidék karsztforrásait gyógyítóként tisztelték.",
          ],
        },
        {
          heading: "3. Az etimológia és a falu neve a régi jegyzékekben",
          body: [
            "Az Aglen név abszolút egyedülálló a bolgár helynévtanban – ez az egyetlen település Bulgáriában, amelynek neve a „Ъ” betűvel kezdődik.",
            "A XV. és XVI. századi oszmán adójegyzékekben (amelyek a nikápolyi szandzsákot írják le) a név korai változatai fordulnak elő, amelyek a „glen” vagy „iglen” tőből erednek (egyes régi hagyományok szerint a település eredetileg „Iglen grad golyama” néven volt ismert a folyó fölötti éles sziklatűk és -fogak miatt).",
            "A bolgár nemzeti ébredés korából származó régi földrajzi feljegyzések Aglent nem pusztán kis faluként, hanem az Előbalkánt átszelő karavánok útjának stratégiai pontjaként írják le, ahol a kereskedők a természetes sziklamenedékekre támaszkodtak a rablótámadások elleni védelemben.",
          ],
        },
        {
          heading: "4. Az irodalmi és szellemi emlékezet: Trifon Kunev",
          body: [
            "Aglen folklór- és kulturális emlékezetében különleges helyet foglal el az a tény, hogy itt született a jeles bolgár író, publicista és tárcaíró, Trifon Kunev (született 1880-ban).",
            "Emlékiratai és korai művei az agleni sziklák zord, de festői természetének sajátos szellemét hordozzák. E mészkőóriások és a Vit folyó árnyékában nőtt fel, majd később a dac és a küzdőszellem érzését vitte át emblematikus cikkeibe és a totalitárius rendszerek elleni ellenállásba, amiért 1944 után súlyos megpróbáltatásokon ment keresztül a táborokban. Mély erkölcsi gerincét munkássága kutatói gyakran szülőhelyének „vasból való” és bevehetetlen természetéhez kötik.",
          ],
        },
      ],
    },
    {
      title: "Az emberek felfedezik a völgyet",
      detail: "A folyó menti kedvező feltételek ősidők óta vonzzák az embereket, és a vidéket az élet és a mozgás természetes helyévé teszik.",
    },
    {
      title: "Megszületik a falu",
      detail: "Idővel közösség formálódik, amely a folyóhoz, a földhöz és a hagyományokhoz kötődik, amelyek ma is Aglen jellemének részei.",
    },
    {
      title: "Történetek és emlékek",
      detail: "A helyi legendák, szokások és emlékek elevenen tartják a falu szellemét, és kapcsolatot teremtenek a múlt és a jelen között.",
    },
    {
      title: "Aglen ma",
      detail: "Aglen jövője akkor a legerősebb, ha hiteles marad. Ma a falu a természet, a fotózás, a horgászat és a nyugodt hétvégi utazások kedvelőinek kedvenc úti célja.",
    },
  ],
  mysteries: [
    { title: "Ott, ahová a folyó vezet", tag: "Rejtett ösvények", image: images.hero, description: "A Vit nem mutat meg mindent egyszerre. A kanyarok, az árnyékok és a sziklák kereséssé változtatják a sétát." },
    { title: "A barlangok világa", tag: "Kő és csend", image: images.cave, description: "Az Aglen és Karlukovo körüli barlangok a vidék leglenyűgözőbb természeti jelenségei közé tartoznak, és a kőbe írt évmilliók történelmét őrzik." },
    { title: "Nevek, amelyek történeteket mesélnek", tag: "Folklór táj", image: images.arch, description: "Az olyan helyek, mint Dupkata, Sloncheto és Rachkov vir, könnyen megjegyezhető hellyé varázsolják a természeti tájat." },
  ],
  placesList: [
    { id: "dupkata", title: "Dupkata", tag: "Sziklaív", image: images.caveCard, imageAlt: "Sziklaablak kilátással a mészkőtájra Aglen közelében", description: "Természetes sziklaív a Vit folyó fölött, és Aglen egyik legfotogénebb helye." },
    { id: "sloncheto", title: "Sloncheto", tag: "Sziklaalak", image: images.hero, imageAlt: "Kanyon, folyó és mészkősziklák Aglen közelében", description: "Érdekes sziklaforma, amely a vidék egyik jelképévé vált." },
    { id: "chervena-stena", title: "Chervena stena", tag: "Kanyonkilátás", image: images.riverSunsetCard, imageAlt: "A Vit folyó naplementekor sziklákkal és fákkal Aglen közelében", description: "Lenyűgöző kilátás a sziklák és a folyó által formált kanyontájra." },
    { id: "rachkov-vir", title: "Rachkov vir", tag: "Folyómedence", image: images.nearbyRetreatCard, imageAlt: "Nyugodt víztükör faházzal és mészkőparttal Lukovit és Aglen közelében", description: "Festői folyómedence, amely alkalmas pihenéshez, fotózáshoz, folyami pezsgőfürdőhöz és horgászathoz." },
    { id: "st-archangel-michael", title: "Szent Mihály arkangyal", tag: "Falusi emlékezet", image: images.church, imageAlt: "Falusi templom, kőutca és zöld völgy", description: "Történelmi templom, amely a falu szellemi örökségét őrzi; 1888-ban épült az elesett helyi lakosok, a török portyázások áldozatainak emlékére." },
    { id: "kaleto", title: "Kaleto", tag: "Régészet", image: images.kaleto, imageAlt: "Kőmaradványok egy dombon, kanyon és folyó fölött", description: "A vidék ősi történelméhez és a Vit völgyének régi útjaihoz kötődő hely." },
  ],
  experiencesList: [
    { id: "canyonWalk", title: "Kanyonséta", price: negotiablePrice.hu, duration: "2-3 óra", bestFor: "Első látogatás", description: "Útvonal sziklák, folyókilátások és a Vit menti természeti látnivalók között." },
    { id: "photoTour", title: "Folyóparti fotóút", price: negotiablePrice.hu, duration: "Fél nap", bestFor: "Fotósok", description: "A falu környékének legszebb helyei táj- és természetfotózáshoz." },
    { id: "fishing", title: "Horgászat a Vitnél", price: negotiablePrice.hu, duration: "2 óra", bestFor: "Lassú utazás", description: "Nyugodt helyek a folyó mellett, és lehetőség a természet legtisztább élvezetére." },
    { id: "weekendEscape", title: "Hétvégi menekülés Aglenbe", price: negotiablePrice.hu, duration: "2 nap", bestFor: "Párok és barátok", description: "Két nap a természetben, helyi történetekkel és gyönyörű kilátásokkal." },
    { id: "herbs", title: "Gyógynövények és falusi tudás", price: negotiablePrice.hu, duration: "90 perc", bestFor: "Kíváncsi utazók", description: "Ismerkedj meg a helyi természet gazdagságával és a gyógynövényekről szóló hagyományos tudással." },
    { id: "schoolDay", title: "Iskolai felfedezőnap", price: negotiablePrice.hu, duration: "1 nap", bestFor: "Diákcsoportok", description: "Oktatási élmény, amely a természetet, a történelmet és a helyi legendákat ötvözi." },
  ],
  galleryItems: [
    { title: "A Vit kanyonja", image: images.riverSunset, alt: "A Vit folyó naplementekor sziklákkal, fákkal és köves parttal", size: "wide" },
    { title: "A kőív", image: images.arch, alt: "Természetes mészkőív a folyó fölött", size: "standard" },
    { title: "Barlangfény", image: images.cave, alt: "Barlangbejárat kilátással a folyóra és a sziklákra", size: "tall" },
    { title: "A rejtett völgy fölött", image: images.aerial, alt: "Légi kilátás a folyóra, a sziklákra és a falura", size: "wide" },
    { title: "Folyóparti pihenés Lukovit közelében", image: images.nearbyRetreat, alt: "Nyugodt víztükör úszó faházzal Lukovit és Aglen közelében", size: "standard" },
  ],
  mapStops: [
    { title: "A falu központja", detail: "A séta Aglen szívéből indul – a főtérről, a templomtól és a régi házaktól, amelyek őrzik a falu szellemét." },
    { title: "Ösvény a Vit mellett", detail: "Kövesd a Vit folyó folyását festői partok, árnyas fák és a sziklákra nyíló gyönyörű kilátások mentén." },
    { title: "Dupkata", detail: "Aglen egyik legemblematikusabb természeti jelképe – egy lenyűgöző sziklaív, amelyet a természet évezredeken át formált." },
    { title: "Barlangok és sziklajelenségek", detail: "Fedezd fel a karsztdomborzat rejtett világát – barlangokat, sziklaképződményeket és páratlan hangulatú helyeket." },
  ],
  accommodationList: [
    { title: "Vendégszobák", type: "Falusi szállás", description: "Csendes szállás helyi otthonban, közel a természethez és a folyóhoz.", image: images.church },
    { title: "Sátorhely", type: "Kemping", description: "Nyitott terület sátraknak, hozzáféréssel a Vit folyóhoz és a természeti útvonalakhoz.", image: images.aerial },
    { title: "Hegyi villa", type: "Villa", description: "Elvonult villa kanyonkilátással, kis csoportoknak és hétvégi pihenéshez.", image: images.pool },
  ],
  sourceNotes: ["Készítette: DevOpsio - www.devopsio.eu", "Minden kép helyi fotósoktól származik, engedéllyel használva."],
};
