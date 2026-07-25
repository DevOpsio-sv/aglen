import { images, negotiablePrice } from "./shared";
import type { PageCopy } from "./types";

export const hu: PageCopy = {
  nav: { home: "Kezdőlap", about: "Aglenről", landmarks: "Látnivalók", stay: "Szállás", quests: "AR-küldetések", events: "Események", business: "Helyi vállalkozások", placesNature: "Helyek és természet", visit: "Látogass Aglenbe", visitGettingHere: "Hogyan juss el", visitRoutes: "Útvonalak", visitChildren: "Gyerekekkel", visitMissions: "AR-küldetések az Unlocking Bulgariával", visitWhen: "Mikor érdemes jönni" },
  ub: {
    homeHeading: "Fedezd fel Aglent az Unlocking Bulgariával",
    homeText: "AR- és GPS-küldetések valódi helyeken Aglen körül. Az Unlocking Bulgaria egy független országos alkalmazás — Aglen az első aktív úti célja.",
    seeMissions: "Nézd meg az aktív küldetéseket",
    externalLabel: "Külső alkalmazás · unlockingbulgaria.com",
    hubTitle: "AR-küldetések Aglenben az Unlocking Bulgariával",
    whatText: "Az Unlocking Bulgaria egy független országos alkalmazás AR- és GPS-küldetésekhez valódi helyeken Bulgária-szerte. Aglen az első aktív úti célja — az alkalmazás nem része a falu weboldalának, és nem is annak tulajdona.",
    missionsHeading: "Elérhető küldetések Aglen környékén",
    needHeading: "Mire lesz szükséged",
    needItems: ["Kamerával rendelkező okostelefon", "Bekapcsolt GPS", "Az Unlocking Bulgaria alkalmazás"],
  },
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
      title: "🪨 Sziklák és barlangok földje",
      detail: "Hogyan formálta a természet a lukoviti karsztot, a barlangokat és az Aglen környéki lenyűgöző mészkőalakzatokat.",
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
      title: "👣 Az első emberek a völgyben",
      detail: "Őskori lakók nyomai, trák jelenlét és élet a Vit folyó partján.",
      intro:
        "Az első emberek a folyóvölgyben: az Aglen környéki őskori megtelepedés titkai. Amikor arról esik szó, mi vonzotta az embert a folyóvölgyekbe, a közkeletű források rendszerint megállnak a „termékeny föld” és az „ivóvíz” általános fordulatainál. Ha azonban beleássuk magunkat a szakmai régészeti nyilvántartásokba, a régi múzeumi expedíciók jelentéseibe és a 20. század eleji néprajzi gyűjteményekbe, sokkal mélyebb kép rajzolódik ki arról, miért éppen a Vit e zárt kanyarulata vált mágnessé az ősi lakók számára.",
      sections: [
        {
          heading: "1. A „folyami folyosó” stratégiai földrajza",
          body: [
            "Az ókorban a Vit folyó nem pusztán vízforrás volt, hanem életmentő közlekedési és kommunikációs folyosó, amely a Duna-síkságot kötötte össze az Elő-Balkán hágóival.",
            "A természetes amfiteátrum: Az Aglen melletti völgy földtanilag zárt amfiteátrum, amelyet meredek mészkőteraszok öveznek. Azokban a korokban, amikor az éghajlat nedvesebb volt és az erdőségek járhatatlanok, ezek a folyóvölgyek voltak az egyetlen biztonságos útvonalak az emberi közösségek és nyájaik számára.",
            "Mikroklimatikus oázis: A magas szikláktól széltől védve és a folyó állandó nedvességétől táplálva a völgy mini ökoszisztémát alkot. Télen itt enyhébbek voltak a hőmérsékletek, mint a nyílt fennsíkon, a talajok pedig – a Vit menti alluviális hordalékok – jóval a vasipar megjelenése előtt lehetővé tették az első földművelő kísérleteket.",
          ],
        },
        {
          heading: "2. A neolitikum és a rézkor régészeti nyomai",
          body: [
            "A múlt század közepén alkotó bolgár régészek elfeledett munkáiban olyan leletek szerepelnek, amelyek ritkán jutnak el a népszerű internetes oldalakig.",
            "A kovakő mint fizetőeszköz: A folyó feletti teraszokon, a lukoviti térségben késő neolitikus kovakő-megmunkáló műhelyek nyomaira bukkantak. Az őskori emberek a helyi mészkövekben található kiváló minőségű kovagumókból készítettek pengéket, késeket és nyílhegyeket. Ez a vidéket nem pusztán lakóhellyé, hanem a régió korai őskorának ipari központjává tette.",
            "Az első fémművesek kultusza: A rézkorban a völgyet olyan közösségek kezdték felkeresni, amelyek nemcsak élelmet, hanem nyersanyagot is kerestek. Az Elő-Balkán közelsége és érclelőhelyei ezekhez a folyami kapukhoz vonzották az embereket, tanúivá téve őket a kőtől a réz első kitermeléséig vezető átmenetnek.",
          ],
        },
        {
          heading: "3. Helyi legendák a „sziklák első embereiről”",
          body: [
            "A tanítók és helytörténészek által Aglenben a 20. század húszas és harmincas éveiben gyűjtött, regionális levéltárakban őrzött néprajzi feljegyzésekben olyan hagyományok élnek, amelyek eltérnek a szokásos török legendáktól.",
            "A sziklák „kétlábú árnyai”: A falu öregjei hajdan azt mesélték gyermekeiknek, hogy a legmélyebb barlangokban és a sziklaereszek alatt egykor „hallgatag emberek” éltek, akik nem gyújtottak füstölgő tüzet, nehogy meglássák őket a hegy szellemei, és folyami kagylóval, medvehagymával és erdei állatok húsával táplálkoztak. Bár mítosznak hangzik, ez a szóbeli emlékezet meglepő pontossággal írja le a paleolitikum korai vadászó-gyűjtögetőinek életmódját, akik csak a meleg évszakban hagyták el a barlangokat.",
            "Az „aranybarázda” legendája: Egy másik régi helyi hiedelem szerint a völgybe érkező első földművesek éppen ott húzták az első barázdát, ahol a folyó a szikla alatt a legélesebb kanyart veszi. Úgy hitték, hogy ott a földet „megcsókolták az alvilág fejedelmei”, mert a források közvetlenül a szikla mélyéből törtek elő, és nagy aszályok idején is életet hoztak.",
          ],
        },
        {
          heading: "4. A törzsek útja: tribalok és rómaiak",
          body: [
            "Amikor a vaskorban a völgy tartósabban benépesül, a hatalmas trák törzs, a tribalok földjére kerül.",
            "A régészeti jelek arra utalnak, hogy ezek a helyek kereszteződést jelentettek a Balkán belsejének trák világa és a Duna menti törzsek között. A Vit folyó tájékozódási pontként szolgált, a völgyben megtelepedők pedig kisebb kísérő településeket építettek a mai falu körüli magas teraszokon – olyan helyeken, ahonnan látszik minden észak vagy dél felől közeledő.",
            "A rómaiak megérkezésével ez a természetes folyosó bekerült a Duna menti római erődöket Moesia tartomány belsejével összekötő utak őrzésének stratégiájába, a helyi lakosságot pedig bevonták az útépítésbe és a termékeny folyóteraszok művelésébe.",
          ],
        },
      ],
    },
    {
      title: "🏡 Aglen születése",
      detail: "Hogyan jön létre a falu, honnan ered a neve, és hogyan fejlődik az évszázadok során.",
      intro:
        "Aglen születése: az oszmán adójegyzékek titkai, az elfeledett falurészek és az egyedülálló név. A népi emlékezet gyakran a mély ókorban keresi a települések kezdetét, az Aglenre vonatkozó első biztos írásos bizonyítékok azonban más korból származnak – azokból az adójegyzékekből, amelyeket a bolgár földek oszmán meghódítása után évszázadokkal állítottak össze.",
      sections: [
        {
          heading: "1. Az oszmán adójegyzékek: az első írásos nyomok (15-16. század)",
          body: [
            "Bár a népi emlékezet gyakran a mély ókorban keresi a települések kezdetét, az Aglenre vonatkozó írásos bizonyítékok hivatalosan a bolgár földek oszmán meghódítását követő első évszázadokban jelennek meg.",
            "A nikápolyi szandzsák: A nikápolyi pasalik 15. és 16. századi korai oszmán adójegyzékeiben (defterek) a falu különböző hangalakokban szerepel, a korabeli török írásos kiejtéshez igazítva – például timár-birtok részeként vagy a központi hatalomnak adóval tartozó kis településként.",
            "Népesség és megélhetés: A jegyzékek azt mutatják, hogy bár a vidék a Vit folyó és a Duna felé vezető utak közelsége miatt stratégiai kockázatoknak volt kitéve, az élet itt nem hunyt ki. A helyiek adójukat főként természetben fizették – búzával, később kukoricával, aprójószággal és mézzel –, kihasználva a sziklák mögé rejtett, védett völgyeket, amelyek megóvták őket a nagy fosztogatásoktól.",
          ],
        },
        {
          heading: "2. A név rejtélye: honnan ered az „Ъглен”?",
          body: [
            "A falu neve egész Bulgária léptékében nyelvi jelenség – az egyetlen település, amely a „Ъ” betűvel kezdődik. A tudományos körökben és a régi néprajzi feljegyzésekben több elmélet is él az eredetéről.",
            "A faszén elmélete (a kézműves változat): Pragmatikusabb történeti kutatások szerint a Vit kanyonja körüli vidék egykor gazdagon erdősült volt, a helyi lakosság pedig intenzíven foglalkozott szénégetéssel – a faszén előállításával, amely hajdan nélkülözhetetlen volt a kovácsmesterséghez és a fémolvasztáshoz. A készletek és a szénégető boksák adták a település nevét.",
            "A „tűsziklák” legendája: A régi helyi hagyomány makacsul őrzi a név földrajzi eredetének változatát. Mivel a folyó fölé éles, függőleges mészkőfogak és sziklatűk magasodnak, az első letelepülők „Иглен”-nek (a tűk körüli helynek) nevezték a vidéket, ami idővel és a nyelvjárási beszédben a mai zengzetes és egyedülálló Ъглен alakká formálódott.",
          ],
        },
        {
          heading: "3. A helyi falurészek és a település vándorlása az idők során",
          body: [
            "Mint sok más bolgár falu, Aglen sem mindig pontosan a mai helyén állt.",
            "A régi települések (a jurtlukok): A falu határában vannak olyan dűlők, amelyek a régi földrajzi feljegyzésekben „Селището” (a Település) vagy „Старо село” (az Ófalu) néven szerepelnek. Az ottani régészeti nyomok azt mutatják, hogy a korábbi évszázadokban az emberek közelebb éltek a barlangokhoz és a sziklatömbökhöz, ahol a kirdzsáli-portyák és az oszmán uralom törvénytelen időszakában nagyobb volt a biztonság.",
            "Összeépülés az újjászületés korában: A 19. század nyugodtabb évtizedeivel a falu elkezd lehúzódni a folyó menti tágasabb teraszokra, ahol jobbak a földművelés és az élet feltételei. Ekkor alakul ki Aglen mai arculata, amely megőrizte az újjászületés kori építészet szellemét, a régi nemzetségi gyökereket és lakóinak harcos jellemét, akik olyan jelentős személyiségeket adtak Bulgáriának, mint Trifon Kunev író.",
          ],
        },
      ],
    },
    {
      title: "📜 Legendák és helyi emlékezet",
      detail: "Nemzedékről nemzedékre szálló történetek – emlékek, hagyományok és kevéssé ismert helyi elbeszélések.",
    },
    {
      title: "🌿 Aglen ma",
      detail: "Hogyan őrzi a falu a történelmét, a természetét és a szellemét, miközben a jövő felé tekint.",
    },
  ],
  mysteries: [
    { title: "Ott, ahová a folyó vezet", tag: "Rejtett ösvények", image: images.hero, description: "A Vit nem mutat meg mindent egyszerre. A kanyarok, az árnyékok és a sziklák kereséssé változtatják a sétát." },
    { title: "A barlangok világa", tag: "Kő és csend", image: images.cave, description: "Az Aglen és Karlukovo körüli barlangok a vidék leglenyűgözőbb természeti jelenségei közé tartoznak, és a kőbe írt évmilliók történelmét őrzik." },
    { title: "Nevek, amelyek történeteket mesélnek", tag: "Folklór táj", image: images.arch, description: "Az olyan helyek, mint Dupkata, Sloncheto és Rachkov vir, könnyen megjegyezhető hellyé varázsolják a természeti tájat." },
  ],
  placesList: [
    { id: "dupkata", title: "Dupkata", tag: "Sziklaív", image: images.arch, imageAlt: "Természetes sziklaív a Vit folyó felett Aglen közelében", description: "Természetes sziklaív a Vit folyó fölött, és Aglen egyik legfotogénebb helye." },
    { id: "sloncheto", title: "Sloncheto", tag: "Sziklaalak", image: images.caveCard, imageAlt: "Sziklaablak kilátással a mészkőtájra Aglen közelében", description: "Érdekes sziklaforma, amely a vidék egyik jelképévé vált." },
    { id: "chervena-stena", title: "Chervena stena", tag: "Kanyonkilátás", image: images.hero, imageAlt: "Kanyon, folyó és mészkősziklák Aglen közelében", description: "Lenyűgöző kilátás a sziklák és a folyó által formált kanyontájra." },
    { id: "rachkov-vir", title: "Rachkov vir", tag: "Folyómedence", image: images.pool, imageAlt: "Tiszta vizű folyómedence mészkősziklák alatt Aglen közelében", description: "Festői folyómedence, amely alkalmas pihenéshez, fotózáshoz, folyami pezsgőfürdőhöz és horgászathoz." },
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
