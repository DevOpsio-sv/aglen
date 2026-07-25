import { images, negotiablePrice } from "./shared";
import type { PageCopy } from "./types";

export const ro: PageCopy = {
  nav: { home: "Acasă", about: "Despre Aglen", landmarks: "Locuri", stay: "Cazare", quests: "Misiuni AR", events: "Evenimente", business: "Afaceri locale", guide: "Ghid", arMissions: "Misiuni AR", visit: "Vizitează Aglen", visitGettingHere: "Cum ajungi", visitRoutes: "Rute", visitChildren: "Cu copiii", visitMissions: "Misiuni AR cu Unlocking Bulgaria", visitWhen: "Când să vizitezi" },
  ub: {
    homeHeading: "Descoperă Aglen prin Unlocking Bulgaria",
    homeText: "Misiuni AR și GPS în locuri reale din jurul Aglen. Unlocking Bulgaria este o aplicație națională independentă — Aglen este prima sa destinație activă.",
    seeMissions: "Vezi misiunile active",
    externalLabel: "Aplicație externă · unlockingbulgaria.com",
    hubTitle: "Misiuni AR în Aglen cu Unlocking Bulgaria",
    whatText: "Unlocking Bulgaria este o aplicație națională independentă pentru misiuni AR și GPS în locuri reale din toată Bulgaria. Aglen este prima sa destinație activă — aplicația nu face parte din site-ul satului și nu este deținută de acesta.",
    missionsHeading: "Misiuni disponibile în jurul Aglen",
    needHeading: "De ce ai nevoie",
    needItems: ["Un smartphone cu cameră", "GPS pornit", "Aplicația Unlocking Bulgaria"],
  },
  ui: { languageLabel: "Limbă", languageSelectAria: "Selectează limba", modalCloseAria: "Închide", mobileMenuAria: "Meniu" },
  brand: { name: "Aglen", subtitle: "Sat lângă râul Vit" },
  hero: {
    meta: "Bulgaria de Nord · râul Vit · Lukovit · Karlukovo",
    title: "AGLEN",
    subtitle: "Comoara ascunsă a râului Vit",
    lede: "Descoperă canioane, peșteri, bulboane de râu și fenomene naturale impresionante în inima Bulgariei de Nord. Aglen este o destinație ideală pentru plimbări, fotografie, pescuit și un weekend liniștit în mijlocul naturii.",
    primary: "Explorează Aglen",
    secondary: "Descarcă aplicația",
    cue: "Descoperă valea",
    imageAlt: "Vedere cinematică a unui canion de râu și a unui peisaj rural inspirate de Aglen",
  },
  statsLabel: "De ce să vizitezi Aglen",
  about: {
    eyebrow: "Istorie și memorie locală",
    title: "Tainele stâncilor din Aglen",
    text: "În spatele masivelor de calcar și al zecilor de peșteri din carstul Lukovit de lângă Aglen se ascunde o istorie care traversează milenii de transformări geologice, practici de cult tracice și cronici din perioada Renașterii. Explorează straturile de mai jos.",
  },
  legends: {
    eyebrow: "Legende și mistere din Aglen",
    title: "Printre canioane, peșteri și potecile vechi din jurul Aglen, fiecare loc își poartă propria poveste.",
    text: "Cele mai puternice povești de aici nu sunt zgomotoase. Trăiesc în numele locale, pragurile peșterilor, formele stranii de stâncă și coturile râului.",
  },
  landmarks: {
    eyebrow: "Locuri de descoperit",
    title: "Cele mai frumoase locuri din jurul Aglen",
    text: "De la formațiuni stâncoase impresionante și bulboane de râu până la priveliști panoramice și obiective istorice – aici natura și legendele locale transformă fiecare plimbare într-o mică descoperire.",
    aria: "Puncte de traseu în jurul Aglen",
  },
  experiences: {
    eyebrow: "Experiențe",
    title: "Trăiește Aglen în felul tău",
    text: "Alege o plimbare, o aventură fotografică, pescuit sau un weekend în mijlocul naturii și descoperă tot ce are mai bun zona.",
    cta: "Întreabă despre traseu",
  },
  gallery: { eyebrow: "Galerie naturală", title: "Un loc povestit prin lumina râului și piatră", aria: "Galeria Aglen" },
  stay: {
    eyebrow: "Cazare în Aglen",
    title: "Rămâi în mijlocul naturii",
    text: "Alege un loc liniștit de înnoptare și folosește Aglen ca punct de plecare pentru a descoperi bogățiile naturale ale regiunii.",
  },
  quests: {
    eyebrow: "Primul de acest fel în Bulgaria",
    title: "O aventură AR reală lângă Aglen",
    text: "Unlocking Bulgaria te duce în locuri reale - cu telefonul vezi o lume 3D ascunsă, rezolvi enigme și urmezi urmele Gardianului. Nu este simulare. Nu este muzeu. Este o aventură reală, live.",
    cta: "Descarcă și începe",
    features: [
      { id: "ar", title: "Realitate augmentată (AR)", text: "Ce se ascunde în aceste locuri? Îndreaptă camera și vezi cum lumea ascunsă prinde viață în fața ochilor tăi." },
      { id: "gps", title: "Misiuni GPS live", text: "Ce loc ascunde următorul indiciu? Urmează misiunea GPS până la reperele reale din jurul Aglen." },
      { id: "story", title: "Istorie spusă altfel", text: "Cine este Gardianul? Ce protejează semnele vechi? Dezvăluie legendele peșterii Prohodna printr-un joc." },
    ],
  },
  ar: {
    eyebrow: "Aventură AR",
    title: "Privește lumea Gardianului",
    text: "Cu camera telefonului dai viață lumii ascunse din Prohodna. Stratul AR dezvăluie povești, semne și personaje invizibile cu ochiul liber, dar numai în locurile unde s-au petrecut.",
    steps: [
      "Descarcă aplicația",
      "Mergi la un loc AR marcat din jurul Aglen",
      "Îndreaptă camera și vezi lumea ascunsă",
    ],
    cta: "Descarcă și începe",
  },
  app: {
    eyebrow: "Descarcă aplicația",
    title: "Unlocking Bulgaria",
    text: "Aplicație mobilă pentru Android. Găsește misiunile din jurul Aglen și pornește într-o aventură reală.",
    badge: "Deschide Unlocking Bulgaria",
    note: "Site-ul oficial al aplicației este unlockingbulgaria.com/bg/.",
  },
  contact: {
    eyebrow: "Planifică vizita",
    title: "Planifică-ți vizita",
    text: "Contactează-ne pentru informații despre trasee, obiective, locații foto, pescuit, cazare și idei pentru un weekend de neuitat lângă râul Vit.",
    notesTitle: "Note pentru vizitatori",
    noteOne: "Potrivit pentru ecoturism, fotografie, pescuit, trasee pedestre, vizitarea peșterilor și un weekend în Bulgaria de Nord., fotografie, priveliști spre râu, peșteri și memorie locală.",
    noteTwo: "Ia încălțăminte comodă, apă, protecție solară și respect pentru locurile locale.",
    cta: "Trimite solicitare",
  },
  events: {
    eyebrow: "Calendar",
    title: "Evenimente în Aglen",
    text: "Sărbători, târguri sătești, tabere de pictură în aer liber și manifestări sezoniere în Aglen și de-a lungul râului Vit. Reveniți aici pentru datele următoare.",
    emptyState: "Așteptați evenimente viitoare. Dacă organizați sau știți despre un eveniment în Aglen, împărtășiți-l cu noi.",
    dateLabel: "Când",
    locationLabel: "Unde",
    submitTitle: "Aveți o fotografie sau o noutate din Aglen?",
    submitText: "Trimiteți-ne o fotografie sau informații despre un eveniment. Analizăm fiecare propunere înainte de publicare.",
    submitCta: "Distribuie foto / info",
  },
  hub: {
    eyebrow: "Ghid turistic",
    title: "Planifică Aglen după interes, traseu și loc apropiat",
    text: "Ghidurile specializate leagă povestea principală a destinației de intenția vizitatorului: obiective, drumeții, pescuit, peșteri, râul Vit, cazare, mâncare, actualizări sezoniere și destinații apropiate.",
  },
  guides: {
    vitRiver: { label: "Ghid pentru râul Vit", text: "Râul Vit este inima zonei care, prin numeroasele sale poteci mici, oferă mii de locuri pentru plimbări, fotografie, pescuit și odihnă în mijlocul naturii." },
    fishing: { label: "Pescuit pe Vit", text: "Râul Vit oferă locuri frumoase și liniștite pentru pescuit în natura Bulgariei de Nord." },
    hiking: { label: "Rute de drumeție", text: "Poteci ecologice și trasee îi conduc pe vizitatori spre cele mai frumoase obiective naturale din jurul Aglen." },
    caves: { label: "Peșteri și forme de stâncă", text: "Zona din jurul Aglen și Karlukovo este cunoscută pentru peșterile sale și pentru impresionantele formațiuni de calcar." },
    food: { label: "Mâncare și produse locale", text: "Încearcă produse preparate în casă și gusturi tradiționale, specifice regiunii Lukovit." },
    nearby: { label: "Destinații apropiate", text: "Combină vizita în Aglen cu Prohodna, Karlukovo, Iskăr–Panega, Lukovit și alte obiective din zonă." },
    seasonal: { label: "Ghid sezonier", text: "Actualizări lunare pentru trasee, fotografie, vreme și planificarea unui weekend liniștit." },
  },
  highlights: [
    { label: "Bulgaria ascunsă", value: "Experiență autentică", detail: "Departe de turismul de masă, Aglen oferă liniște, natură frumoasă și adevăratul sentiment al unui sat bulgăresc." },
    { label: "Natură", value: "Canioane, peșteri și râu", detail: "Zona din jurul satului impresionează prin stânci de calcar, peșteri, bulboane de râu și unele dintre cele mai frumoase peisaje naturale din Bulgaria de Nord." },
    { label: "Identitate", value: "Singurul „Ъ”", detail: "Aglen este singura localitate din Bulgaria al cărei nume începe cu litera „Ъ”." },
  ],
  timeline: [
    {
      title: "🪨 Ținut de stânci și peșteri",
      detail: "Cum a creat natura carstul de la Lukovit, peșterile și impresionantele formațiuni calcaroase din jurul Aglenului.",
      intro:
        "Cursul râului Vit din jurul satului Aglen păstrează mult mai mult decât legendele turistice obișnuite despre persecuții otomane și punți de stâncă. În spatele masivelor de calcar și al zecilor de peșteri din acest sector al regiunii carstice Lukovit se ascunde o istorie care traversează milenii de transformări geologice, practici de cult tracice și izolaționism spiritual medieval.",
      sections: [
        {
          heading: "1. Anomalia geologică: De ce sunt unice stâncile de aici?",
          body: [
            "Studiile geologice ale carstului din zona Lukovit arată că stâncile din jurul Aglen nu sunt doar calcare obișnuite, ci aparțin așa-numitelor straturi „lomeșki” și „aprilski” (predominant din Cretacicul inferior).",
            "Labirintul subteran de apă: râul Vit formează în acest sector meandre specifice, deoarece în urmă cu milioane de ani a urmat falii tectonice. Sub albia actuală a râului și sub masivele de stâncă există o întreagă rețea de sifoane subterane și galerii „uscate”, care încă nu au fost cartografiate complet de speologi.",
            "Microclimatul canionului: stâncile verticale, înalte pe alocuri până la 100 de metri, creează un microclimat termocarstic specific. Din cauza canionului adânc și a izvoarelor din peșteri, temperaturile din partea joasă de lângă Vit diferă uneori cu câteva grade de cele de pe platou, ceea ce a determinat păstrarea unei vegetații relicte și a unor biocenoze carstice specifice, studiate de botaniști încă de la începutul secolului XX.",
          ],
        },
        {
          heading: "2. Urmele preistoriei și ale tracilor",
          body: [
            "Deși relatările răspândite se concentrează asupra epocii stăpânirii otomane (precum tragedia din locul numit Selishteto și peștera Vălovata dupka / Ochilatata), urmele arheologice din peșterile din jurul Aglen indică o vechime mult mai adâncă:",
            "În zona arcelor de stâncă și în jurul peșterilor au fost găsite fragmente izolate de ceramică preistorică (predominant din calcolitic și din epoca timpurie a bronzului), care arată că peșterile au servit drept adăposturi temporare pentru vânători și pentru primii crescători de animale încă de acum peste 4-5 milenii.",
            "Asemenea regiunii vecine Karlukovo-Iskăr, și aici terasele de stâncă greu accesibile au fost folosite de triburile tracice (tribalii) pentru sanctuare în aer liber, legate de cultele apei, ale stâncii și ale forțelor subterane. Izvoarele carstice din zonă erau venerate ca tămăduitoare.",
          ],
        },
        {
          heading: "3. Etimologia și numele satului în registrele vechi",
          body: [
            "Numele Aglen este un unicat absolut în toponimia bulgară – este singura așezare din Bulgaria al cărei nume începe cu litera „Ъ”.",
            "În registrele fiscale otomane din secolele XV și XVI (care descriu sangiacul de Nikopol) apar variante timpurii ale numelui, derivate din rădăcina „glen” sau „iglen” (potrivit unor legende vechi, așezarea s-ar fi numit inițial „Iglen grad golyama” din cauza acelor și colților ascuțiți de stâncă de deasupra râului).",
            "Însemnările geografice vechi din vremea Renașterii bulgare descriu Aglen nu doar ca un sat mic, ci ca un punct strategic pe drumul caravanelor care traversau Prebalcanii, unde negustorii se bazau pe adăposturile naturale de stâncă pentru apărare împotriva atacurilor de tâlhari.",
          ],
        },
        {
          heading: "4. Memoria literară și spirituală: Trifon Kunev",
          body: [
            "În memoria folclorică și culturală a Aglenului un loc aparte îl ocupă faptul că aici s-a născut renumitul scriitor, publicist și autor de foiletoane bulgar Trifon Kunev (născut în 1880).",
            "Amintirile și primele sale opere poartă spiritul specific al naturii aspre, dar pitorești, a stâncilor din Aglen. Crescut la umbra acestor uriași de calcar și a râului Vit, el a transpus mai târziu sentimentul de nesupunere și de luptă în articolele sale emblematice și în rezistența împotriva regimurilor totalitare, din pricina căreia a trecut prin încercări grele în lagăre după 1944. Coloana lui morală profundă este adesea legată de cercetătorii operei sale de natura „de fier” și inaccesibilă a locului său natal.",
          ],
        },
      ],
    },
    {
      title: "👣 Primii oameni din vale",
      detail: "Urme ale locuitorilor preistorici, prezență tracică și viață pe malurile râului Vit.",
      intro:
        "Primii oameni din valea râului: secretele așezării preistorice din jurul Aglenului. Când se vorbește despre ce anume îl atrăgea pe om în văile râurilor, sursele răspândite se opresc de obicei la formule generale despre „pământ roditor” și „apă de băut”. Dacă însă scormonim în fișierele arheologice de specialitate, în rapoartele vechilor expediții muzeale și în culegerile etnografice de la începutul secolului XX, se dezvăluie o imagine mult mai profundă a motivului pentru care tocmai acest meandru închis al Vitului a devenit un magnet pentru locuitorii străvechi.",
      sections: [
        {
          heading: "1. Geografia strategică a „coridorului fluvial”",
          body: [
            "În vremurile străvechi râul Vit nu era doar o sursă de apă, ci un coridor vital de transport și comunicare care lega Câmpia Dunării de trecătorile Prebalcanilor.",
            "Amfiteatrul natural: Valea de lângă Aglen este un amfiteatru închis geologic, mărginit de terase calcaroase abrupte. În epocile în care clima era mai umedă, iar masivele forestiere de nepătruns, aceste văi de râu erau singurele poteci sigure pentru deplasarea comunităților umane și a turmelor.",
            "Oază microclimatică: Ferită de vânturi de stâncile înalte și susținută de umezeala constantă a râului, valea creează un mini-ecosistem. Iarna temperaturile erau aici mai blânde decât pe platoul deschis, iar solurile – depunerile aluvionare de lângă Vit – au îngăduit primele experimente agricole cu mult înainte de apariția industriei fierului.",
          ],
        },
        {
          heading: "2. Urmele arheologice din neolitic și eneolitic",
          body: [
            "În lucrări uitate ale arheologilor bulgari de la mijlocul secolului trecut sunt pomenite descoperiri care ajung rareori pe paginile populare de internet.",
            "Silexul ca monedă: Pe terasele de deasupra râului, în zona Lukovit, au fost descoperite urme de ateliere neolitice târzii de prelucrare a silexului. Oamenii străvechi foloseau nodulii de silex de calitate superioară din calcarele locale pentru a face lame, cuțite și vârfuri de săgeată. Asta făcea din zonă nu doar un loc de trai, ci un centru industrial al preistoriei timpurii din regiune.",
            "Cultul primilor metalurgiști: În eneolitic valea începe să fie vizitată de comunități care caută nu doar hrană, ci și materii prime. Apropierea Prebalcanilor, cu manifestările lor minerale, atrăgea oamenii spre aceste porți fluviale, făcându-i martori ai trecerii de la piatră la prima extragere a cuprului.",
          ],
        },
        {
          heading: "3. Legendele locale despre „primii oameni din stânci”",
          body: [
            "În însemnările folclorice adunate de învățători și cercetători locali la Aglen în anii '20 și '30 ai secolului XX și păstrate în arhive regionale există tradiții care se deosebesc de legendele turcești obișnuite.",
            "Povestea „umbrelor cu două picioare” din stânci: Odinioară bătrânii satului le spuneau copiilor că în cele mai adânci peșteri și sub streșinile de stâncă trăiau cândva „oameni tăcuți”, care nu aprindeau foc cu fum ca să nu-i vadă duhurile muntelui și se hrăneau cu scoici de râu, leurdă și carne de animale din pădure. Deși sună a mit, această memorie orală descrie cu o precizie uimitoare felul de viață al primilor vânători-culegători din paleolitic, care părăseau peșterile doar în anotimpul cald.",
            "Legenda „brazdei de aur”: Potrivit unei alte credințe locale vechi, primii agricultori veniți în vale au tras cea dintâi brazdă exact acolo unde râul face cea mai ascuțită cotitură sub stâncă. Ei credeau că pământul de acolo este „sărutat de căpeteniile lumii de dedesubt”, fiindcă izvoarele ieșeau direct din măruntaiele stâncii, aducând viață chiar și în timpul secetelor mari.",
          ],
        },
        {
          heading: "4. Drumul triburilor: tribalii și romanii",
          body: [
            "Când valea începe să fie locuită mai statornic în epoca fierului, ea intră în ținuturile puternicului trib tracic al tribalilor.",
            "Indiciile arheologice arată că aceste locuri erau o răscruce între lumea tracică din interiorul Balcanilor și triburile dunărene. Râul Vit servea drept reper, iar oamenii așezați în vale au ridicat mici așezări însoțitoare pe terasele înalte din jurul satului de azi – locuri de unde se vede oricine se apropie dinspre nord sau dinspre sud.",
            "Odată cu venirea romanilor, acest coridor natural este inclus în strategia de pază a drumurilor care legau cetățile romane de la Dunăre de interiorul provinciei Moesia, iar populația locală a fost atrasă în construirea drumurilor și în folosirea teraselor roditoare de lângă râu.",
          ],
        },
      ],
    },
    {
      title: "🏡 Nașterea Aglenului",
      detail: "Cum ia naștere satul, de unde vine numele lui și cum se dezvoltă de-a lungul veacurilor.",
      intro:
        "Nașterea Aglenului: secretele registrelor otomane, mahalalele uitate și numele unic. Memoria populară caută adesea începutul satelor în antichitatea adâncă, însă primele mărturii scrise sigure despre Aglen vin din altă epocă – din registrele fiscale întocmite la secole după cucerirea otomană a ținuturilor bulgare.",
      sections: [
        {
          heading: "1. Registrele otomane: primele urme scrise (secolele XV-XVI)",
          body: [
            "Deși memoria populară caută adesea începutul satelor în antichitatea adâncă, mărturiile scrise despre Aglen apar oficial în primele secole de după cucerirea otomană a ținuturilor bulgare.",
            "Sangeacul Nicopolei: În registrele fiscale otomane timpurii (defterele) ale pașalâcului de Nicopole din secolele XV și XVI satul este pomenit sub diferite variante fonetice, potrivite pronunției scrise turcești de atunci – de pildă ca parte a unor stăpâniri de timar sau ca mică așezare datoare cu bir către puterea centrală.",
            "Populație și îndeletniciri: Registrele arată că, deși zona era expusă unor riscuri strategice din pricina apropierii de râul Vit și de drumurile spre Dunăre, viața de aici nu s-a stins. Localnicii plăteau dările mai ales în natură – grâu, mai târziu porumb, vite mărunte și miere –, folosindu-se de văile ferite, ascunse în spatele stâncilor, care îi apărau de jafurile mari.",
          ],
        },
        {
          heading: "2. Enigma numelui: de unde vine „Ъглен”?",
          body: [
            "Numele satului este un fenomen lingvistic la scara întregii Bulgarii – singura așezare care începe cu litera „Ъ”. În mediile științifice și în vechile însemnări etnografice există mai multe teorii despre originea lui.",
            "Teoria cărbunelui (versiunea meșteșugărească): Potrivit unor cercetări istorice mai pragmatice, zona din jurul canionului Vitului a fost cândva bogat împădurită, iar populația locală se îndeletnicea intens cu cărbunăritul – producerea cărbunelui de lemn, atât de necesar odinioară fierăriei și topirii metalelor. Zăcămintele și bocșele de cărbune au dat numele așezării.",
            "Legenda „stâncilor-ace”: Vechile tradiții locale păstrează cu îndărătnicie versiunea originii geografice a numelui. Fiindcă deasupra râului se înalță colți calcaroși ascuțiți, verticali, și ace de stâncă, primii așezați au numit locul „Иглен” (locul din preajma acelor), care cu timpul și prin rostirea dialectală s-a transformat în sonorul și unicul Ъглен de astăzi.",
          ],
        },
        {
          heading: "3. Mahalalele locale și mutarea satului de-a lungul timpului",
          body: [
            "Ca multe alte sate bulgărești, nici Aglenul nu s-a aflat întotdeauna exact în locul de astăzi.",
            "Vechile așezări (iurtlâcurile): În hotarul satului există locuri care în vechi însemnări geografice figurează sub numele „Селището” (Așezarea) sau „Старо село” (Satul Vechi). Urmele arheologice de acolo arată că în veacurile dinainte oamenii trăiau mai aproape de peșteri și de masivele stâncoase, unde siguranța era mai mare pe vremea năvălirilor cârjaliilor și a fărădelegilor stăpânirii otomane.",
            "Consolidarea din vremea Renașterii: Odată cu deceniile mai liniștite ale secolului XIX satul începe să coboare spre terasele mai largi de lângă râu, unde condițiile pentru agricultură și trai erau mai bune. Atunci se conturează și înfățișarea de azi a Aglenului, care a păstrat spiritul arhitecturii Renașterii bulgare, vechile rădăcini de neam și firea dârză a locuitorilor săi, ce i-au dat Bulgariei personalități de seamă precum scriitorul Trifon Kunev.",
          ],
        },
      ],
    },
    {
      title: "📜 Legende și memorie locală",
      detail: "Povești transmise din generație în generație – amintiri, tradiții și istorisiri locale puțin cunoscute.",
    },
    {
      title: "🌿 Aglen astăzi",
      detail: "Cum își păstrează satul istoria, natura și spiritul, în timp ce privește spre viitor.",
    },
  ],
  mysteries: [
    { title: "Acolo unde duce râul", tag: "Poteci ascunse", image: images.hero, description: "Vit nu dezvăluie totul deodată. Coturile, umbrele și stâncile transformă plimbarea într-o căutare." },
    { title: "Lumea peșterilor", tag: "Piatră și liniște", image: images.cave, description: "Peșterile din jurul Aglen și Karlukovo sunt printre cele mai impresionante fenomene naturale din zonă și păstrează milioane de ani de istorie scrisă în piatră." },
    { title: "Nume care spun povești", tag: "Peisaj folcloric", image: images.arch, description: "Locuri precum Dupkata, Sloncheto și Rachkov vir transformă peisajul natural într-un loc ușor de ținut minte." },
  ],
  placesList: [
    { id: "dupkata", title: "Dupkata", tag: "Arcă de stâncă", image: images.arch, imageAlt: "O arcadă naturală de stâncă deasupra râului Vit lângă Aglen", description: "Arcă naturală de stâncă deasupra râului Vit și unul dintre cele mai fotogenice locuri din jurul Aglen." },
    { id: "sloncheto", title: "Sloncheto", tag: "Figură de stâncă", image: images.caveCard, imageAlt: "Fereastră de stâncă cu vedere spre peisajul calcaros de lângă Aglen", description: "O formă de stâncă curioasă, devenită unul dintre simbolurile zonei." },
    { id: "chervena-stena", title: "Chervena stena", tag: "Vedere de canion", image: images.hero, imageAlt: "Canion, râu și stânci calcaroase lângă Aglen", description: "Priveliște impresionantă spre peisajul de canion, modelat de stânci și de râu." },
    { id: "rachkov-vir", title: "Rachkov vir", tag: "Bulboană de râu", image: images.pool, imageAlt: "Un ochi de apă limpede sub stânci calcaroase lângă Aglen", description: "Bulboană pitorească de râu, potrivită pentru odihnă, fotografii, jacuzzi natural și pescuit." },
    { id: "st-archangel-michael", title: "Sf. Arhanghel Mihail", tag: "Memoria satului", image: images.church, imageAlt: "Biserică de sat, stradă de piatră și vale verde", description: "Lăcaș istoric care păstrează moștenirea spirituală a satului, construit în 1888 în cinstea localnicilor căzuți, victime ale raidurilor turcești." },
    { id: "kaleto", title: "Kaleto", tag: "Arheologie", image: images.kaleto, imageAlt: "Vestigii de piatră pe un deal deasupra canionului și a râului", description: "Loc legat de istoria antică a zonei și de vechile drumuri de-a lungul văii râului Vit." },
  ],
  experiencesList: [
    { id: "canyonWalk", title: "Plimbare prin canion", price: negotiablePrice.ro, duration: "2-3 ore", bestFor: "Prima vizită", description: "Traseu printre stânci, priveliști spre râu și repere naturale de lângă Vit." },
    { id: "photoTour", title: "Călătorie foto pe râu", price: negotiablePrice.ro, duration: "Jumătate de zi", bestFor: "Fotografi", description: "Cele mai frumoase locuri pentru fotografie de peisaj și de natură din jurul satului." },
    { id: "fishing", title: "Pescuit pe Vit", price: negotiablePrice.ro, duration: "2 ore", bestFor: "Călătorie lentă", description: "Locuri liniștite lângă râu și posibilitatea de a te bucura de natură în forma ei cea mai pură." },
    { id: "weekendEscape", title: "Escapadă de weekend în Aglen", price: negotiablePrice.ro, duration: "2 zile", bestFor: "Cupluri și prieteni", description: "Două zile în mijlocul naturii, cu povești locale și priveliști frumoase." },
    { id: "herbs", title: "Plante și cunoaștere sătească", price: negotiablePrice.ro, duration: "90 min", bestFor: "Călători curioși", description: "Descoperă bogăția naturii locale și cunoștințele tradiționale despre plante." },
    { id: "schoolDay", title: "Zi de descoperire pentru elevi", price: negotiablePrice.ro, duration: "1 zi", bestFor: "Grupuri școlare", description: "Experiență educativă care îmbină natura, istoria și legendele locale." },
  ],
  galleryItems: [
    { title: "Canionul Vit", image: images.hero, alt: "Râul Vit la apus, cu stânci, copaci și mal pietros", size: "wide" },
    { title: "Arca de piatră", image: images.arch, alt: "Arcă naturală de calcar deasupra râului", size: "standard" },
    { title: "Lumina peșterii", image: images.cave, alt: "Intrare de peșteră cu vedere spre râu și stânci", size: "tall" },
    { title: "Deasupra văii ascunse", image: images.aerial, alt: "Vedere aeriană spre râu, stânci și sat", size: "wide" },
    { title: "Refugiu pe râu lângă Lukovit", image: images.nearbyRetreat, alt: "Peisaj acvatic liniștit cu o căsuță de lemn plutitoare lângă Lukovit și Aglen", size: "standard" },
  ],
  mapStops: [
    { title: "Centrul satului", detail: "Plimbarea începe din inima Aglen – piața, biserica și casele vechi care păstrează spiritul satului." },
    { title: "Poteca de pe Vit", detail: "Urmează cursul râului Vit pe maluri pitorești, copaci umbroși și priveliști frumoase spre stânci." },
    { title: "Dupkata", detail: "Unul dintre cele mai emblematice simboluri naturale ale Aglenului – o arcă de stâncă impresionantă, modelată de natură de-a lungul mileniilor." },
    { title: "Peșteri și fenomene stâncoase", detail: "Descoperă lumea ascunsă a reliefului carstic – peșteri, formațiuni stâncoase și locuri cu o atmosferă de neegalat." },
  ],
  accommodationList: [
    { title: "Camere pentru oaspeți", type: "Cazare în sat", description: "Cazare liniștită într-o casă locală, aproape de natură și de râu.", image: images.church },
    { title: "Loc de camping", type: "Camping", description: "Spațiu deschis pentru corturi, cu acces la râul Vit și la traseele naturale.", image: images.aerial },
    { title: "Vilă de munte", type: "Vilă", description: "Vilă retrasă cu vedere spre canion, potrivită pentru grupuri mici și escapade de weekend.", image: images.pool },
  ],
  sourceNotes: ["Creat de DevOpsio - www.devopsio.eu", "Toate imaginile sunt realizate de fotografi locali și sunt folosite cu permisiune."],
};
