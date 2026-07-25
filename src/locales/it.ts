import { images, negotiablePrice } from "./shared";
import type { PageCopy } from "./types";

export const it: PageCopy = {
  nav: { home: "Home", about: "Su Aglen", landmarks: "Luoghi", stay: "Dormire", quests: "Missioni AR", events: "Eventi", business: "Attività locali", placesNature: "Luoghi e natura", visit: "Visita Aglen", visitGettingHere: "Come arrivare", visitRoutes: "Percorsi", visitChildren: "Con bambini", visitMissions: "Missioni AR con Unlocking Bulgaria", visitWhen: "Quando visitare" },
  ub: {
    homeHeading: "Scopri Aglen con Unlocking Bulgaria",
    homeText: "Missioni AR e GPS in luoghi reali intorno ad Aglen. Unlocking Bulgaria è un'app nazionale indipendente — Aglen è la sua prima destinazione attiva.",
    seeMissions: "Vedi le missioni attive",
    externalLabel: "App esterna · unlockingbulgaria.com",
    hubTitle: "Missioni AR ad Aglen con Unlocking Bulgaria",
    whatText: "Unlocking Bulgaria è un'app nazionale indipendente per missioni AR e GPS in luoghi reali in tutta la Bulgaria. Aglen è la sua prima destinazione attiva — l'app non fa parte del sito del villaggio e non è di sua proprietà.",
    missionsHeading: "Missioni disponibili intorno ad Aglen",
    needHeading: "Cosa ti serve",
    needItems: ["Uno smartphone con fotocamera", "GPS attivato", "L'app Unlocking Bulgaria"],
  },
  ui: { languageLabel: "Lingua", languageSelectAria: "Seleziona lingua", modalCloseAria: "Chiudi", mobileMenuAria: "Menu" },
  brand: { name: "Aglen", subtitle: "Villaggio presso il fiume Vit" },
  hero: {
    meta: "Bulgaria del Nord · fiume Vit · Lukovit · Karlukovo",
    title: "AGLEN",
    subtitle: "Il tesoro nascosto del fiume Vit",
    lede: "Scopri canyon, grotte, pozze fluviali e straordinari fenomeni naturali nel cuore della Bulgaria del Nord. Aglen è la destinazione ideale per passeggiate, fotografia, pesca e un weekend tranquillo immerso nella natura.",
    primary: "Esplora Aglen",
    secondary: "Scarica l'app",
    cue: "Scopri la valle",
    imageAlt: "Vista cinematografica di un canyon fluviale e paesaggio rurale ispirati ad Aglen",
  },
  statsLabel: "Perché visitare Aglen",
  about: {
    eyebrow: "Storia e memoria locale",
    title: "I segreti delle rocce di Aglen",
    text: "Dietro i massicci calcarei e le decine di grotte del carso di Lukovit presso Aglen si cela una storia che attraversa millenni di trasformazioni geologiche, pratiche cultuali trace e cronache del Risorgimento bulgaro. Esplora gli strati qui sotto.",
  },
  legends: {
    eyebrow: "Leggende e misteri di Aglen",
    title: "Tra i canyon, le grotte e i vecchi sentieri intorno ad Aglen, ogni luogo porta con sé la propria storia.",
    text: "Le storie più forti qui non sono rumorose. Vivono nei nomi locali, nelle soglie delle grotte, nelle strane forme rocciose e nelle curve del fiume.",
  },
  landmarks: {
    eyebrow: "Luoghi da scoprire",
    title: "I luoghi più belli vicino ad Aglen",
    text: "Da imponenti formazioni rocciose e pozze fluviali fino a viste panoramiche e siti storici: qui la natura e le leggende locali trasformano ogni passeggiata in una piccola scoperta.",
    aria: "Tappe intorno ad Aglen",
  },
  experiences: {
    eyebrow: "Esperienze",
    title: "Vivi Aglen a modo tuo",
    text: "Scegli una passeggiata, un'avventura fotografica, la pesca o un weekend immerso nella natura e scopri il meglio della zona.",
    cta: "Chiedi il percorso",
  },
  gallery: { eyebrow: "Galleria naturale", title: "Un luogo raccontato dalla luce del fiume e dalla pietra", aria: "Galleria di Aglen" },
  stay: {
    eyebrow: "Soggiornare ad Aglen",
    title: "Rimani immerso nella natura",
    text: "Scegli un luogo tranquillo dove pernottare e usa Aglen come punto di partenza per scoprire le ricchezze naturali della regione.",
  },
  quests: {
    eyebrow: "Primo nel suo genere in Bulgaria",
    title: "Una vera avventura AR vicino ad Aglen",
    text: "Unlocking Bulgaria ti porta in luoghi reali - con il telefono vedi un mondo 3D nascosto, risolvi enigmi e segui le tracce del Guardiano. Non una simulazione. Non un museo. Una vera avventura dal vivo.",
    cta: "Scarica e inizia",
    features: [
      { id: "ar", title: "Realtà aumentata (AR)", text: "Cosa si nasconde in questi luoghi? Punta la fotocamera e guarda il mondo nascosto prendere vita davanti ai tuoi occhi." },
      { id: "gps", title: "Missioni GPS dal vivo", text: "Quale luogo nasconde l'indizio successivo? Segui la missione GPS fino alle vere attrazioni intorno ad Aglen." },
      { id: "story", title: "Storia raccontata diversamente", text: "Chi è il Guardiano? Cosa proteggono gli antichi segni? Scopri le leggende della grotta Prohodna attraverso un gioco." },
    ],
  },
  ar: {
    eyebrow: "Avventura AR",
    title: "Guarda il mondo del Guardiano",
    text: "Con la fotocamera del telefono dai vita al mondo nascosto di Prohodna. Il livello AR rivela storie, segni e personaggi invisibili a occhio nudo, ma solo nei luoghi in cui sono accaduti.",
    steps: [
      "Scarica l'app",
      "Vai a un luogo AR segnato intorno ad Aglen",
      "Punta la fotocamera e scopri il mondo nascosto",
    ],
    cta: "Scarica e inizia",
  },
  app: {
    eyebrow: "Scarica l'app",
    title: "Unlocking Bulgaria",
    text: "App mobile per Android. Trova le missioni intorno ad Aglen e parti per una vera avventura.",
    badge: "Apri Unlocking Bulgaria",
    note: "Il sito ufficiale dell'app è unlockingbulgaria.com/bg/.",
  },
  contact: {
    eyebrow: "Pianifica la visita",
    title: "Pianifica la tua visita",
    text: "Contattaci per informazioni su percorsi, attrazioni, luoghi fotografici, pesca, alloggio e idee per un weekend indimenticabile lungo il fiume Vit.",
    notesTitle: "Note per i visitatori",
    noteOne: "Ideale per ecoturismo, fotografia, pesca, percorsi a piedi, visita alle grotte e un weekend nella Bulgaria del Nord., fotografia, viste sul fiume, grotte e memoria locale.",
    noteTwo: "Porta scarpe comode, acqua, protezione solare e rispetto per gli spazi locali.",
    cta: "Invia richiesta",
  },
  events: {
    eyebrow: "Calendario",
    title: "Eventi ad Aglen",
    text: "Feste, ritrovi del villaggio, incontri en plein air ed eventi stagionali ad Aglen e lungo il fiume Vit. Torna a trovarci per le prossime date.",
    emptyState: "Prossimi eventi in arrivo. Se organizzi o conosci un evento ad Aglen, condividilo con noi.",
    dateLabel: "Quando",
    locationLabel: "Dove",
    submitTitle: "Hai una foto o una notizia da Aglen?",
    submitText: "Inviaci una foto o informazioni su un evento. Esaminiamo ogni contributo prima di pubblicarlo.",
    submitCta: "Condividi foto / info",
  },
  hub: {
    eyebrow: "Guida turistica",
    title: "Pianifica Aglen per interesse, percorso e luoghi vicini",
    text: "Le pagine di guida dedicate collegano la storia principale della destinazione con l'intenzione del visitatore: attrazioni, escursionismo, pesca, grotte, il fiume Vit, alloggio, cibo, aggiornamenti stagionali e destinazioni vicine.",
  },
  guides: {
    vitRiver: { label: "Guida al fiume Vit", text: "Il fiume Vit è il cuore della zona e, con i suoi numerosi piccoli sentieri, offre migliaia di luoghi per passeggiate, fotografia, pesca e riposo immerso nella natura." },
    fishing: { label: "Pesca sul Vit", text: "Il fiume Vit offre luoghi belli e tranquilli per pescare immersi nella natura della Bulgaria del Nord." },
    hiking: { label: "Percorsi escursionistici", text: "Sentieri ecologici e percorsi conducono i visitatori alle più belle attrazioni naturali intorno ad Aglen." },
    caves: { label: "Grotte e formazioni rocciose", text: "La zona intorno ad Aglen e Karlukovo è nota per le sue grotte e le imponenti formazioni calcaree." },
    food: { label: "Cibo e prodotti locali", text: "Assaggia prodotti fatti in casa e sapori tradizionali tipici della regione di Lukovit." },
    nearby: { label: "Destinazioni vicine", text: "Combina la visita ad Aglen con Prohodna, Karlukovo, Iskar–Panega, Lukovit e altre attrazioni della zona." },
    seasonal: { label: "Guida stagionale", text: "Aggiornamenti mensili per percorsi, fotografia, meteo e pianificazione di weekend tranquilli." },
  },
  highlights: [
    { label: "Bulgaria nascosta", value: "Esperienza autentica", detail: "Lontano dal turismo di massa, Aglen offre tranquillità, natura bellissima e un'autentica sensazione di villaggio bulgaro." },
    { label: "Natura", value: "Canyon, grotte e fiume", detail: "La zona intorno al villaggio colpisce con rocce calcaree, grotte, pozze fluviali e alcuni dei paesaggi naturali più belli della Bulgaria del Nord." },
    { label: "Identità", value: "L'unica « Ъ »", detail: "Aglen è l'unico centro abitato della Bulgaria il cui nome inizia con la lettera « Ъ »." },
  ],
  timeline: [
    {
      title: "🪨 Terra di rocce e grotte",
      detail: "Come la natura ha creato il carso di Lukovit, le grotte e le straordinarie formazioni calcaree intorno ad Aglen.",
      intro:
        "Il bacino del fiume Vit intorno al villaggio di Aglen custodisce molto più delle consuete leggende turistiche su persecuzioni ottomane e ponti di roccia. Dietro i massicci calcarei e le decine di grotte di questo tratto della regione carsica di Lukovit si cela una storia che attraversa millenni di trasformazioni geologiche, pratiche cultuali trace e isolazionismo spirituale medievale.",
      sections: [
        {
          heading: "1. L'anomalia geologica: perché le rocce qui sono uniche?",
          body: [
            "Gli studi geologici del carso nella zona di Lukovit mostrano che le rocce intorno ad Aglen non sono semplici calcari comuni, ma appartengono ai cosiddetti strati di Lomets e Apriltsi (prevalentemente del Cretaceo inferiore).",
            "Il labirinto idrico sotterraneo: in questo tratto il fiume Vit forma meandri particolari, perché milioni di anni fa seguiva faglie tettoniche. Sotto l'attuale letto del fiume e sotto i massicci rocciosi si trova un'intera rete di sifoni sotterranei e gallerie « secche », non ancora completamente mappate dagli speleologi.",
            "Il microclima del canyon: le pareti verticali, alte in alcuni punti fino a 100 metri, creano un particolare microclima termocarsico. A causa del profondo canyon e delle sorgenti carsiche, le temperature nella parte bassa lungo il Vit talvolta differiscono di alcuni gradi da quelle dell'altopiano, il che ha favorito la conservazione di vegetazione relitta e di specifiche biocenosi carsiche, studiate dai botanici già all'inizio del XX secolo.",
          ],
        },
        {
          heading: "2. Le tracce della preistoria e dei Traci",
          body: [
            "Sebbene i racconti più diffusi si concentrino sull'epoca del dominio ottomano (come la tragedia nella località Selishteto e nella grotta Volovata dupka / Ochilatata), le tracce archeologiche nelle grotte intorno ad Aglen rimandano a un'antichità molto più profonda:",
            "Nella zona degli archi rocciosi e intorno alle grotte sono stati rinvenuti singoli frammenti di ceramica preistorica (soprattutto del Calcolitico e della prima età del bronzo), che dimostrano come le grotte servissero da rifugi temporanei per cacciatori e primi allevatori già più di 4-5 millenni fa.",
            "Come nella vicina regione di Karlukovo-Iskar, anche qui le terrazze rocciose difficilmente accessibili venivano usate dalle tribù trace (i Triballi) come santuari all'aperto, legati ai culti dell'acqua, della roccia e delle forze sotterranee. Le sorgenti carsiche della zona erano venerate come curative.",
          ],
        },
        {
          heading: "3. L'etimologia e il nome del villaggio nei vecchi registri",
          body: [
            "Il nome Aglen è un unicum assoluto nella toponomastica bulgara: è l'unico insediamento della Bulgaria il cui nome inizia con la lettera « Ъ ».",
            "Nei registri fiscali ottomani del XV e XVI secolo (che descrivono il sangiaccato di Nikopol) compaiono varianti antiche del nome, derivate dalla radice « glen » o « iglen » (secondo alcune antiche leggende il villaggio si chiamava originariamente « Iglen grad golyama » a causa delle aguzze guglie e dei denti di roccia sopra il fiume).",
            "Le antiche note geografiche dell'epoca del Risorgimento bulgaro descrivono Aglen non semplicemente come un piccolo villaggio, ma come un punto strategico sulla rotta delle carovane che attraversavano il Prebalcani, dove i mercanti contavano sui ripari rocciosi naturali per proteggersi dagli assalti dei banditi.",
          ],
        },
        {
          heading: "4. La memoria letteraria e spirituale: Trifon Kunev",
          body: [
            "Nella memoria folclorica e culturale di Aglen occupa un posto particolare il fatto che qui nacque l'illustre scrittore, pubblicista e feuilletonista bulgaro Trifon Kunev (nato nel 1880).",
            "I suoi ricordi e le sue prime opere portano lo spirito peculiare della natura aspra ma pittoresca delle rocce di Aglen. Cresciuto all'ombra di questi giganti calcarei e del fiume Vit, egli trasferì in seguito quel senso di ribellione e combattività nei suoi celebri articoli e nella resistenza contro i regimi totalitari, per la quale attraversò dure prove nei campi dopo il 1944. La sua profonda integrità morale viene spesso associata dagli studiosi della sua opera alla natura « ferrea » e inaccessibile del suo luogo natale.",
          ],
        },
      ],
    },
    {
      title: "👣 I primi uomini nella valle",
      detail: "Tracce di abitanti preistorici, presenza tracia e vita lungo le rive del fiume Vit.",
      intro:
        "I primi uomini nella valle fluviale: i segreti dell'insediamento preistorico intorno ad Aglen. Quando si parla di ciò che attirava l'uomo nelle valli dei fiumi, le fonti più diffuse si limitano di solito a formule generiche su « terra fertile » e « acqua potabile ». Ma se si scava negli schedari archeologici specialistici, nei rapporti di vecchie spedizioni museali e nelle raccolte etnografiche dell'inizio del XX secolo, emerge un quadro molto più profondo del perché proprio questa ansa chiusa del Vit sia diventata una calamita per gli abitanti antichi.",
      sections: [
        {
          heading: "1. La geografia strategica del « corridoio fluviale »",
          body: [
            "Nell'antichità il fiume Vit non era soltanto una fonte d'acqua, ma un vitale corridoio di trasporto e comunicazione che collegava la pianura del Danubio ai valichi del Prebalcani.",
            "L'anfiteatro naturale: La valle presso Aglen è un anfiteatro geologicamente chiuso, circondato da ripide terrazze calcaree. Nelle epoche in cui il clima era più umido e i massicci boschivi impenetrabili, queste valli fluviali erano gli unici sentieri sicuri per lo spostamento delle comunità umane e delle loro mandrie.",
            "Un'oasi microclimatica: Riparata dai venti dalle alte rocce e sostenuta dall'umidità costante del fiume, la valle crea un mini-ecosistema. Qui d'inverno le temperature erano più miti che sull'altopiano aperto, e i suoli — i depositi alluvionali lungo il Vit — hanno permesso i primi esperimenti agricoli molto prima della comparsa dell'industria del ferro.",
          ],
        },
        {
          heading: "2. Le tracce archeologiche del Neolitico e del Calcolitico",
          body: [
            "In lavori dimenticati di archeologi bulgari della metà del secolo scorso si menzionano ritrovamenti che raramente approdano alle pagine internet più popolari.",
            "La selce come moneta: Sulle terrazze sopra il fiume, nella zona di Lukovit, sono state scoperte tracce di officine tardo-neolitiche per la lavorazione della selce. Gli uomini antichi utilizzavano i noduli di selce di alta qualità presenti nei calcari locali per produrre lame, coltelli e punte di freccia. Ciò faceva della zona non un semplice luogo di vita, ma un centro industriale della prima preistoria della regione.",
            "Il culto dei primi metallurghi: Durante il Calcolitico la valle inizia a essere frequentata da comunità in cerca non solo di cibo, ma anche di materie prime. La vicinanza del Prebalcani con i suoi affioramenti minerari attirava gli uomini verso queste porte fluviali, rendendoli testimoni del passaggio dalla pietra alla prima estrazione del rame.",
          ],
        },
        {
          heading: "3. Le leggende locali sui « primi uomini nelle rocce »",
          body: [
            "Negli appunti folclorici raccolti da maestri e studiosi locali ad Aglen negli anni Venti e Trenta del XX secolo e conservati negli archivi regionali esistono tradizioni che si discostano dalle consuete leggende turche.",
            "Il racconto delle « ombre a due gambe » nelle rocce: Un tempo gli anziani del villaggio raccontavano ai figli che nelle grotte più profonde e sotto gli aggetti rocciosi vivevano un tempo « uomini silenziosi » che non accendevano fuochi fumosi per non farsi vedere dagli spiriti della montagna e si nutrivano di cozze di fiume, aglio selvatico e carne di animali del bosco. Per quanto suoni come un mito, questa memoria orale descrive con sorprendente precisione il modo di vivere dei primi cacciatori-raccoglitori del Paleolitico, che lasciavano le grotte solo nella stagione calda.",
            "La leggenda del « solco d'oro »: Secondo un'altra antica credenza locale, i primi agricoltori giunti nella valle tracciarono il loro primo solco proprio dove il fiume compie la sua curva più stretta sotto la roccia. Credevano che lì la terra fosse « baciata dai signori del mondo sotterraneo », perché le sorgenti uscivano direttamente dalle viscere della roccia, portando vita anche durante le grandi siccità.",
          ],
        },
        {
          heading: "4. Il cammino delle tribù: Triballi e Romani",
          body: [
            "Quando la valle comincia a essere abitata più stabilmente nell'età del ferro, si trova nelle terre della potente tribù tracia dei Triballi.",
            "Le indicazioni archeologiche suggeriscono che questi luoghi fossero un crocevia tra il mondo tracio dell'interno balcanico e le tribù danubiane. Il fiume Vit fungeva da punto di riferimento, e chi si stabilì nella valle costruì piccoli insediamenti satellite sulle terrazze alte intorno al villaggio odierno: punti da cui si scorge chiunque si avvicini da nord o da sud.",
            "Con l'arrivo dei Romani questo corridoio naturale viene incluso nella strategia di sorveglianza delle strade che collegavano le fortezze romane del Danubio con l'interno della provincia di Mesia, e la popolazione locale viene coinvolta nella costruzione delle vie e nello sfruttamento delle fertili terrazze fluviali.",
          ],
        },
      ],
    },
    {
      title: "🏡 La nascita di Aglen",
      detail: "Come nasce il villaggio, da dove viene il suo nome e come si sviluppa nei secoli.",
      intro:
        "La nascita di Aglen: i segreti dei registri ottomani, i quartieri dimenticati e il nome unico. La memoria popolare cerca spesso l'origine dei villaggi nell'antichità più remota, ma le prime testimonianze scritte certe su Aglen provengono da un'altra epoca: dai registri fiscali redatti secoli dopo la conquista ottomana delle terre bulgare.",
      sections: [
        {
          heading: "1. I registri ottomani: le prime tracce scritte (XV-XVI secolo)",
          body: [
            "Sebbene la memoria popolare cerchi spesso l'origine dei villaggi nell'antichità più remota, le testimonianze scritte su Aglen compaiono ufficialmente nei primi secoli dopo la conquista ottomana delle terre bulgare.",
            "Il sangiaccato di Nikopol: Nei primi registri fiscali ottomani (defter) del pascialato di Nikopol del XV e XVI secolo il villaggio è menzionato in diverse varianti fonetiche, adattate alla pronuncia scritta turca dell'epoca: per esempio come parte di possedimenti timar o come piccolo abitato debitore di tributi al potere centrale.",
            "Popolazione e sostentamento: I registri mostrano che, sebbene la zona fosse esposta a rischi strategici per la vicinanza al fiume Vit e alle strade verso il Danubio, la vita qui non si è mai spenta. Gli abitanti pagavano le imposte soprattutto in natura — grano, più tardi mais, bestiame minuto e miele — sfruttando le valli riparate nascoste dietro le rocce, che li proteggevano dalle grandi razzie.",
          ],
        },
        {
          heading: "2. L'enigma del nome: da dove viene « Ъглен »?",
          body: [
            "Il nome del villaggio è un fenomeno linguistico su scala nazionale: è l'unico abitato della Bulgaria che inizia con la lettera « Ъ ». Negli ambienti scientifici e nelle vecchie note etnografiche esistono diverse teorie sulla sua origine.",
            "La teoria del carbone (la versione artigiana): Secondo ricerche storiche più pragmatiche, la zona intorno al canyon del Vit era un tempo riccamente boscosa e la popolazione locale si dedicava intensamente alla carbonizzazione: la produzione di carbone di legna, un tempo indispensabile per l'arte del fabbro e per la fusione dei metalli. I giacimenti e le carbonaie diedero il nome all'abitato.",
            "La leggenda delle « rocce ad ago »: Le vecchie tradizioni locali conservano ostinatamente la versione dell'origine geografica del nome. Poiché sopra il fiume si ergono aguzzi denti calcarei verticali e aghi di roccia, i primi coloni chiamarono il luogo « Иглен » (il luogo attorno agli aghi), che con il tempo e la parlata dialettale si trasformò nell'odierno sonoro e unico Ъглен.",
          ],
        },
        {
          heading: "3. I quartieri locali e gli spostamenti dell'abitato nel tempo",
          body: [
            "Come molti altri villaggi bulgari, Aglen non si è sempre trovato esattamente dove sorge oggi.",
            "Gli antichi insediamenti (gli yurtluk): Nel territorio del villaggio vi sono località che nelle vecchie note geografiche figurano con i nomi « Селището » (l'Insediamento) o « Старо село » (il Vecchio Villaggio). Le tracce archeologiche mostrano che nei secoli precedenti la gente viveva più vicino alle grotte e ai massicci rocciosi, dove la sicurezza era maggiore ai tempi delle incursioni dei kirdžali e dell'anarchia del dominio ottomano.",
            "Il consolidamento durante il Risorgimento bulgaro: Con i decenni più tranquilli del XIX secolo il villaggio comincia a scendere verso le terrazze più ampie lungo il fiume, dove le condizioni per l'agricoltura e per la vita erano migliori. È allora che prende forma l'aspetto odierno di Aglen, che ha conservato lo spirito dell'architettura del Risorgimento, le antiche radici familiari e il carattere combattivo dei suoi abitanti, che hanno dato alla Bulgaria figure notevoli come lo scrittore Trifon Kunev.",
          ],
        },
      ],
    },
    {
      title: "📜 Leggende e memoria locale",
      detail: "Storie tramandate di generazione in generazione: ricordi, tradizioni e racconti locali poco conosciuti.",
    },
    {
      title: "🌿 Aglen oggi",
      detail: "Come il villaggio custodisce la sua storia, la sua natura e il suo spirito mentre guarda al futuro.",
    },
  ],
  mysteries: [
    { title: "Là dove il fiume conduce", tag: "Sentieri nascosti", image: images.hero, description: "Il Vit non rivela tutto in una volta. Le curve, le ombre e le rocce trasformano la passeggiata in una ricerca." },
    { title: "Il mondo delle grotte", tag: "Pietra e silenzio", image: images.cave, description: "Le grotte intorno ad Aglen e Karlukovo sono tra i fenomeni naturali più straordinari della zona e custodiscono milioni di anni di storia scritti nella pietra." },
    { title: "Nomi che raccontano storie", tag: "Paesaggio folclorico", image: images.arch, description: "Località come Dupkata, Sloncheto e Rachkov vir trasformano il paesaggio naturale in un luogo facile da ricordare." },
  ],
  placesList: [
    { id: "dupkata", title: "Dupkata", tag: "Arco roccioso", image: images.arch, imageAlt: "Un arco di roccia naturale sopra il fiume Vit vicino ad Aglen", description: "Un arco roccioso naturale sopra il fiume Vit e uno dei luoghi più fotogenici intorno ad Aglen." },
    { id: "sloncheto", title: "Sloncheto", tag: "Figura rocciosa", image: images.caveCard, imageAlt: "Finestra rocciosa con vista sul paesaggio calcareo vicino ad Aglen", description: "Una curiosa forma rocciosa diventata uno dei simboli della zona." },
    { id: "chervena-stena", title: "Chervena stena", tag: "Vista canyon", image: images.hero, imageAlt: "Canyon, fiume e rocce calcaree vicino ad Aglen", description: "Una vista imponente sul paesaggio del canyon, plasmato dalle rocce e dal fiume." },
    { id: "rachkov-vir", title: "Rachkov vir", tag: "Pozza del fiume", image: images.pool, imageAlt: "Una limpida pozza del fiume sotto le rocce calcaree vicino ad Aglen", description: "Una pittoresca pozza del fiume, ideale per riposare, fotografare, un idromassaggio nel fiume e pescare." },
    { id: "st-archangel-michael", title: "San Michele Arcangelo", tag: "Memoria del villaggio", image: images.church, imageAlt: "Chiesa del villaggio, strada di pietra e valle verde", description: "Un tempio storico che custodisce l'eredità spirituale del villaggio, costruito nel 1888 in onore degli abitanti caduti, vittime delle incursioni turche." },
    { id: "kaleto", title: "Kaleto", tag: "Archeologia", image: images.kaleto, imageAlt: "Resti di pietra su una collina sopra il canyon e il fiume", description: "Una località legata alla storia antica della zona e alle vecchie vie lungo la valle del Vit." },
  ],
  experiencesList: [
    { id: "canyonWalk", title: "Passeggiata nel canyon", price: negotiablePrice.it, duration: "2-3 ore", bestFor: "Prima visita", description: "Un percorso tra rocce, viste sul fiume e attrazioni naturali lungo il Vit." },
    { id: "photoTour", title: "Viaggio fotografico sul fiume", price: negotiablePrice.it, duration: "Mezza giornata", bestFor: "Fotografi", description: "I luoghi più belli per la fotografia paesaggistica e naturalistica intorno al villaggio." },
    { id: "fishing", title: "Pesca sul Vit", price: negotiablePrice.it, duration: "2 ore", bestFor: "Viaggio lento", description: "Luoghi tranquilli lungo il fiume e la possibilità di godere della natura nella sua forma più pura." },
    { id: "weekendEscape", title: "Fuga di un weekend ad Aglen", price: negotiablePrice.it, duration: "2 giorni", bestFor: "Coppie e amici", description: "Due giorni tra natura, storie locali e belle viste." },
    { id: "herbs", title: "Erbe e sapere del villaggio", price: negotiablePrice.it, duration: "90 min", bestFor: "Viaggiatori curiosi", description: "Scopri la ricchezza della natura locale e le conoscenze tradizionali sulle erbe." },
    { id: "schoolDay", title: "Giornata di scoperta per le scuole", price: negotiablePrice.it, duration: "1 giorno", bestFor: "Gruppi scolastici", description: "Un'esperienza educativa che unisce natura, storia e leggende locali." },
  ],
  galleryItems: [
    { title: "Il canyon del Vit", image: images.hero, alt: "Il fiume Vit al tramonto con rocce, alberi e riva pietrosa", size: "wide" },
    { title: "L'arco di pietra", image: images.arch, alt: "Arco calcareo naturale sopra il fiume", size: "standard" },
    { title: "Luce della grotta", image: images.cave, alt: "Ingresso di grotta con vista su fiume e rocce", size: "tall" },
    { title: "Sopra la valle nascosta", image: images.aerial, alt: "Vista aerea su fiume, rocce e villaggio", size: "wide" },
    { title: "Relax fluviale vicino a Lukovit", image: images.nearbyRetreat, alt: "Paesaggio acquatico tranquillo con casa galleggiante in legno vicino a Lukovit e Aglen", size: "standard" },
  ],
  mapStops: [
    { title: "Il centro del villaggio", detail: "La passeggiata inizia nel cuore di Aglen – la piazza, la chiesa e le vecchie case che custodiscono lo spirito del villaggio." },
    { title: "Il sentiero lungo il Vit", detail: "Segui il corso del fiume Vit lungo rive pittoresche, alberi ombrosi e belle viste sulle rocce." },
    { title: "Dupkata", detail: "Uno dei simboli naturali più iconici di Aglen – un imponente arco di roccia plasmato dalla natura nel corso dei millenni." },
    { title: "Grotte e fenomeni rocciosi", detail: "Scopri il mondo nascosto del rilievo carsico – grotte, formazioni rocciose e luoghi dall'atmosfera incomparabile." },
  ],
  accommodationList: [
    { title: "Camere per ospiti", type: "Soggiorno nel villaggio", description: "Camere tranquille in una casa locale, vicino alla natura e al fiume.", image: images.church },
    { title: "Area campeggio", type: "Camping", description: "Spazio aperto per tende con accesso al Vit e ai sentieri naturali.", image: images.aerial },
    { title: "Villa di montagna", type: "Villa", description: "Villa appartata con vista canyon, ideale per piccoli gruppi e weekend.", image: images.pool },
  ],
  sourceNotes: ["Creato da DevOpsio - www.devopsio.eu", "Tutte le immagini sono di fotografi locali e sono usate con autorizzazione."],
};
