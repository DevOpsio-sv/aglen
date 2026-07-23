import { images, negotiablePrice } from "./shared";
import type { PageCopy } from "./types";

export const it: PageCopy = {
  nav: { home: "Home", about: "Su Aglen", landmarks: "Luoghi", stay: "Dormire", quests: "Missioni AR", events: "Eventi", business: "Attività locali" },
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
      title: "Terra di rocce e grotte",
      detail: "Le rocce calcaree e le grotte intorno ad Aglen formano uno dei paesaggi naturali più straordinari della zona di Lukovit e del fiume Vit.",
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
      title: "Le persone scoprono la valle",
      detail: "Le condizioni favorevoli lungo il fiume attirano le persone fin dai tempi antichi e rendono la zona un luogo naturale di vita e passaggio.",
    },
    {
      title: "Nasce il villaggio",
      detail: "Col tempo si forma una comunità legata al fiume, alla terra e alle tradizioni che ancora oggi fanno parte del carattere di Aglen.",
    },
    {
      title: "Storie e ricordi",
      detail: "Le leggende, le usanze e i ricordi locali mantengono vivo lo spirito del villaggio e creano un legame tra passato e presente.",
    },
    {
      title: "Aglen oggi",
      detail: "Il futuro di Aglen è più forte se resta autentico. Oggi il villaggio è una destinazione prediletta dagli amanti della natura, della fotografia, della pesca e dei tranquilli viaggi del weekend.",
    },
  ],
  mysteries: [
    { title: "Là dove il fiume conduce", tag: "Sentieri nascosti", image: images.hero, description: "Il Vit non rivela tutto in una volta. Le curve, le ombre e le rocce trasformano la passeggiata in una ricerca." },
    { title: "Il mondo delle grotte", tag: "Pietra e silenzio", image: images.cave, description: "Le grotte intorno ad Aglen e Karlukovo sono tra i fenomeni naturali più straordinari della zona e custodiscono milioni di anni di storia scritti nella pietra." },
    { title: "Nomi che raccontano storie", tag: "Paesaggio folclorico", image: images.arch, description: "Località come Dupkata, Sloncheto e Rachkov vir trasformano il paesaggio naturale in un luogo facile da ricordare." },
  ],
  placesList: [
    { id: "dupkata", title: "Dupkata", tag: "Arco roccioso", image: images.caveCard, imageAlt: "Finestra rocciosa con vista sul paesaggio calcareo vicino ad Aglen", description: "Un arco roccioso naturale sopra il fiume Vit e uno dei luoghi più fotogenici intorno ad Aglen." },
    { id: "sloncheto", title: "Sloncheto", tag: "Figura rocciosa", image: images.hero, imageAlt: "Canyon, fiume e rocce calcaree vicino ad Aglen", description: "Una curiosa forma rocciosa diventata uno dei simboli della zona." },
    { id: "chervena-stena", title: "Chervena stena", tag: "Vista canyon", image: images.riverSunsetCard, imageAlt: "Il fiume Vit al tramonto con rocce e alberi vicino ad Aglen", description: "Una vista imponente sul paesaggio del canyon, plasmato dalle rocce e dal fiume." },
    { id: "rachkov-vir", title: "Rachkov vir", tag: "Pozza del fiume", image: images.nearbyRetreatCard, imageAlt: "Uno specchio d'acqua tranquillo con casa in legno e riva calcarea vicino a Lukovit e Aglen", description: "Una pittoresca pozza del fiume, ideale per riposare, fotografare, un idromassaggio nel fiume e pescare." },
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
