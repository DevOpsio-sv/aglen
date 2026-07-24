import { images, negotiablePrice } from "./shared";
import type { PageCopy } from "./types";

export const de: PageCopy = {
  nav: { home: "Start", about: "Über Aglen", landmarks: "Orte", stay: "Übernachten", quests: "AR-Quests", events: "Events", business: "Lokale Betriebe" },
  ui: { languageLabel: "Sprache", languageSelectAria: "Sprache auswählen", modalCloseAria: "Schließen", mobileMenuAria: "Menü" },
  brand: { name: "Aglen", subtitle: "Dorf am Fluss Vit" },
  hero: { meta: "Nordbulgarien · Fluss Vit · Lukovit · Karlukovo", title: "AGLEN", subtitle: "Der verborgene Schatz am Fluss Vit", lede: "Entdecke Canyons, Höhlen, Flussbecken und beeindruckende Naturphänomene im Herzen Nordbulgariens. Aglen ist ein ideales Reiseziel für Spaziergänge, Fotografie, Angeln und ein ruhiges Wochenende inmitten der Natur.", primary: "Aglen entdecken", secondary: "App herunterladen", cue: "Tal entdecken", imageAlt: "Cinematische Ansicht eines Flusscanyons und einer Dorflandschaft, inspiriert von Aglen" },
  statsLabel: "Warum Aglen besuchen",
  about: { eyebrow: "Geschichte und lokale Erinnerung", title: "Die Geheimnisse der Aglener Felsen", text: "Hinter den Kalksteinmassiven und den Dutzenden Höhlen im Lukovit-Karst bei Aglen verbirgt sich eine Geschichte, die Jahrtausende geologischer Umwandlungen, thrakischer Kultpraktiken und Chroniken der Wiedergeburt durchzieht. Entdecke die Schichten weiter unten." },
  legends: { eyebrow: "Legenden und Mysterien von Aglen", title: "Zwischen den Canyons, Höhlen und alten Pfaden rund um Aglen trägt jeder Ort seine eigene Geschichte.", text: "Die stärksten Geschichten sind hier nicht laut. Sie leben in den lokalen Namen, den Höhlenschwellen, den seltsamen Felsformen und den Biegungen des Flusses." },
  landmarks: { eyebrow: "Orte zum Entdecken", title: "Die schönsten Orte rund um Aglen", text: "Von beeindruckenden Felsformationen und Flussbecken bis zu Panoramablicken und historischen Stätten – hier verwandeln die Natur und die lokalen Legenden jeden Spaziergang in eine kleine Entdeckung.", aria: "Routenpunkte um Aglen" },
  experiences: { eyebrow: "Erlebnisse", title: "Erlebe Aglen auf deine Weise", text: "Wähle einen Spaziergang, ein Fotoabenteuer, das Angeln oder ein Wochenende inmitten der Natur und entdecke das Beste der Region.", cta: "Nach der Route fragen" },
  gallery: { eyebrow: "Natur-Galerie", title: "Ein Ort, erzählt durch Flusslicht und Stein", aria: "Aglen-Galerie" },
  stay: { eyebrow: "Übernachten in Aglen", title: "Bleib inmitten der Natur", text: "Wähle einen ruhigen Ort für die Übernachtung und nutze Aglen als Ausgangspunkt, um die Naturschätze der Region kennenzulernen." },
  quests: { eyebrow: "Das erste seiner Art in Bulgarien", title: "Ein echtes AR-Abenteuer bei Aglen", text: "Unlocking Bulgaria führt dich zu realen Orten - mit deinem Telefon siehst du eine verborgene 3D-Welt, löst Rätsel und folgst den Spuren des Wächters. Keine Simulation. Kein Museum. Ein echtes Live-Abenteuer.", cta: "Herunterladen und starten", features: [
    { id: "ar", title: "Augmented Reality (AR)", text: "Was verbirgt sich an diesen Orten? Richte die Kamera aus und sieh, wie die verborgene Welt vor deinen Augen lebendig wird." },
    { id: "gps", title: "Live-GPS-Missionen", text: "Welcher Ort verbirgt den nächsten Hinweis? Folge der GPS-Mission zu den realen Sehenswürdigkeiten rund um Aglen." },
    { id: "story", title: "Geschichte, anders erzählt", text: "Wer ist der Wächter? Was bewachen die alten Zeichen? Enthülle die Legenden der Höhle Prohodna im Spiel." },
  ] },
  ar: { eyebrow: "AR-Abenteuer", title: "Sieh die Welt des Wächters", text: "Mit der Kamera deines Telefons erweckst du die verborgene Welt von Prohodna zum Leben. Die AR-Ebene enthüllt Geschichten, Zeichen und Figuren, die mit bloßem Auge unsichtbar sind, aber nur an den Orten, an denen sie geschehen sind.", steps: ["Lade die App herunter", "Gehe zu einem markierten AR-Ort rund um Aglen", "Richte die Kamera aus und sieh die verborgene Welt"], cta: "Herunterladen und starten" },
  app: { eyebrow: "App herunterladen", title: "Unlocking Bulgaria", text: "Mobile App für Android. Finde die Missionen rund um Aglen und brich zu einem echten Abenteuer auf.", badge: "Unlocking Bulgaria öffnen", note: "Die offizielle App-Website ist unlockingbulgaria.com/bg/." },
  contact: { eyebrow: "Besuch planen", title: "Plane deinen Besuch", text: "Kontaktiere uns für Informationen zu Routen, Sehenswürdigkeiten, Fotolocations, Angeln, Unterkunft und Ideen für ein unvergessliches Wochenende am Fluss Vit.", notesTitle: "Hinweise für Besucher", noteOne: "Geeignet für Ökotourismus, Fotografie, Angeln, Wanderrouten, Höhlenbesuche und ein Wochenende in Nordbulgarien – Fotografie, Flussblicke, Höhlen und lokale Erinnerung.", noteTwo: "Bring bequeme Schuhe, Wasser, Sonnenschutz und Respekt für die lokalen Orte mit.", cta: "Anfrage senden" },
  events: {
    eyebrow: "Kalender",
    title: "Veranstaltungen in Aglen",
    text: "Feste, Dorftreffen, Pleinair-Treffen und saisonale Ereignisse in Aglen und entlang des Flusses Vit. Schauen Sie für kommende Termine wieder vorbei.",
    emptyState: "Kommende Veranstaltungen folgen in Kürze. Wenn Sie ein Ereignis in Aglen organisieren oder kennen, teilen Sie es mit uns.",
    dateLabel: "Wann",
    locationLabel: "Wo",
    submitTitle: "Haben Sie ein Foto oder Neuigkeiten aus Aglen?",
    submitText: "Senden Sie uns ein Foto oder Informationen zu einer Veranstaltung. Wir prüfen jeden Beitrag vor der Veröffentlichung.",
    submitCta: "Foto / Info teilen",
  },
  hub: {
    eyebrow: "Reiseführer-Hub",
    title: "Aglen nach Interesse, Route und nahegelegenen Orten planen",
    text: "Gewidmete Führerseiten verbinden die Hauptgeschichte des Reiseziels mit den Besucherabsichten: Sehenswürdigkeiten, Wandern, Angeln, Höhlen, der Vit-Fluss, Unterkunft, Essen, saisonale Updates und nahegelegene Ziele.",
  },
  guides: {
    vitRiver: { label: "Vit-Fluss-Führer", text: "Der Fluss Vit ist das Herz der Region und bietet mit seinen zahlreichen kleinen Pfaden tausende Orte für Spaziergänge, Fotografie, Angeln und Erholung inmitten der Natur." },
    fishing: { label: "Angeln am Vit", text: "Der Fluss Vit bietet schöne und ruhige Angelplätze inmitten der Natur Nordbulgariens." },
    hiking: { label: "Wanderrouten", text: "Ökopfade und Routen führen die Besucher zu den schönsten Naturschätzen rund um Aglen." },
    caves: { label: "Höhlen und Felsformen", text: "Die Region um Aglen und Karlukovo ist bekannt für ihre Höhlen und beeindruckenden Kalksteinformationen." },
    food: { label: "Essen und lokale Produkte", text: "Probiere hausgemachte Produkte und traditionelle Aromen, die für die Region Lukovit typisch sind." },
    nearby: { label: "Nahegelegene Ziele", text: "Kombiniere deinen Besuch in Aglen mit Prohodna, Karlukovo, Iskar–Panega, Lukovit und weiteren Sehenswürdigkeiten der Region." },
    seasonal: { label: "Saisonführer", text: "Monatliche Updates zu Routen, Fotografie, Wetter und ruhiger Wochenendplanung." },
  },
  highlights: [
    { label: "Verborgenes Bulgarien", value: "Authentisches Erlebnis", detail: "Fernab vom Massentourismus bietet Aglen Ruhe, schöne Natur und ein echtes Gefühl für ein bulgarisches Dorf." },
    { label: "Natur", value: "Canyons, Höhlen und Fluss", detail: "Die Region um das Dorf beeindruckt mit Kalksteinfelsen, Höhlen, Flussbecken und einigen der schönsten Naturlandschaften Nordbulgariens." },
    { label: "Identität", value: "Das einzige „Ъ“", detail: "Aglen ist die einzige Ortschaft in Bulgarien, deren Name mit dem Buchstaben „Ъ“ beginnt." },
  ],
  timeline: [
    { title: "Land der Felsen und Höhlen", detail: "Die Kalksteinfelsen und Höhlen rund um Aglen prägen eine der beeindruckendsten Naturlandschaften in der Region von Lukovit und dem Fluss Vit.",
      intro: "Das Tal des Flusses Vit rund um das Dorf Aglen bewahrt weit mehr als die üblichen touristischen Legenden über osmanische Verfolgungen und Felsbrücken. Hinter den Kalksteinmassiven und den Dutzenden Höhlen in diesem Abschnitt des Lukovit-Karstgebiets verbirgt sich eine Geschichte, die Jahrtausende geologischer Umwandlungen, thrakischer Kultpraktiken und mittelalterlichen geistlichen Isolationismus durchzieht.",
      sections: [
        {
          heading: "1. Die geologische Anomalie: Warum sind die Felsen hier einzigartig?",
          body: [
            "Die geologischen Untersuchungen des Karsts in der Region Lukovit zeigen, dass die Felsen rund um Aglen nicht einfach nur gewöhnliche Kalksteine sind, sondern zu den sogenannten Lomer und Apriler Schichten gehören (überwiegend aus der Unterkreide).",
            "Das unterirdische Wasserlabyrinth: Der Fluss Vit bildet in diesem Abschnitt spezifische Mäander, weil er vor Millionen von Jahren tektonischen Verwerfungen folgte. Unter dem heutigen Flussbett und unter den Felsmassiven liegt ein ganzes Netz aus unterirdischen Siphons und „trockenen“ Galerien, die von den Höhlenforschern noch nicht vollständig kartiert sind.",
            "Das Mikroklima des Canyons: Die stellenweise bis zu 100 Meter hohen senkrechten Felsen schaffen ein besonderes thermokarstisches Mikroklima. Wegen des tiefen Canyons und der Höhlenquellen unterscheiden sich die Temperaturen im tiefer gelegenen Teil am Vit manchmal um mehrere Grad von denen des Plateaus, was die Erhaltung reliktartiger Vegetation und spezifischer Karstbiozönosen bedingt hat, die von Botanikern bereits zu Beginn des 20. Jahrhunderts erforscht wurden.",
          ],
        },
        {
          heading: "2. Die Spuren der Vorgeschichte und der Thraker",
          body: [
            "Auch wenn sich die verbreiteten Erzählungen auf die Epoche der osmanischen Herrschaft konzentrieren (wie die Tragödie in der Gegend Selishteto und der Höhle Valovata dupka / Ochilatata), weisen die archäologischen Spuren in den Höhlen rund um Aglen auf eine weit tiefere Vergangenheit hin:",
            "Im Bereich der Felsbögen und rund um die Höhlen wurden einzelne Fragmente prähistorischer Keramik gefunden (überwiegend aus dem Chalkolithikum und der frühen Bronzezeit), die zeigen, dass die Höhlen bereits vor mehr als 4-5 Jahrtausenden als vorübergehende Zufluchtsorte für Jäger und erste Viehzüchter dienten.",
            "Ähnlich wie in der benachbarten Region Karlukovo-Iskar wurden auch hier die schwer zugänglichen Felsterrassen von den thrakischen Stämmen (den Triballern) als Freilichtheiligtümer genutzt, die mit den Kulten des Wassers, des Felsens und der unterirdischen Kräfte verbunden waren. Die Karstquellen der Region wurden als heilkräftig verehrt.",
          ],
        },
        {
          heading: "3. Die Etymologie und der Name des Dorfes in alten Registern",
          body: [
            "Der Name Aglen ist ein absolutes Unikat in der bulgarischen Toponymie – es ist die einzige Ortschaft in Bulgarien, deren Name mit dem Buchstaben „Ъ“ beginnt.",
            "In osmanischen Steuerregistern aus dem 15. und 16. Jahrhundert (die den Sandschak von Nikopol beschreiben) finden sich frühe Varianten des Namens, abgeleitet vom Wortstamm „glen“ oder „iglen“ (nach einigen alten Überlieferungen hieß die Ortschaft ursprünglich „Iglen grad golyama“ wegen der spitzen Felsnadeln und -zacken über dem Fluss).",
            "Die alten geografischen Aufzeichnungen aus der Zeit der bulgarischen Wiedergeburt beschreiben Aglen nicht bloß als kleines Dorf, sondern als strategischen Punkt am Weg der Karawanen, die den Vorbalkan durchquerten, wo die Händler auf die natürlichen Felsunterstände zum Schutz gegen Banditenüberfälle angewiesen waren.",
          ],
        },
        {
          heading: "4. Das literarische und geistige Gedächtnis: Trifon Kunew",
          body: [
            "Im folkloristischen und kulturellen Gedächtnis von Aglen nimmt die Tatsache einen besonderen Platz ein, dass hier der bedeutende bulgarische Schriftsteller, Publizist und Feuilletonist Trifon Kunew geboren wurde (geboren 1880).",
            "Seine Erinnerungen und frühen Werke tragen den besonderen Geist der rauen, aber malerischen Natur der Aglener Felsen. Aufgewachsen im Schatten dieser Kalksteinriesen und des Flusses Vit, übertrug er später das Gefühl von Unbeugsamkeit und Kampfgeist in seine emblematischen Artikel und in den Widerstand gegen die totalitären Regime, weswegen er nach 1944 schwere Prüfungen in den Lagern durchmachte. Sein tiefes moralisches Rückgrat wird von den Erforschern seines Werks oft mit der „eisernen“ und unnahbaren Natur seines Geburtsortes in Verbindung gebracht.",
          ],
        },
      ] },
    { title: "Die Menschen entdecken das Tal", detail: "Die günstigen Bedingungen am Fluss ziehen die Menschen seit alten Zeiten an und machen die Region zu einem natürlichen Ort zum Leben und für Bewegung." },
    { title: "Das Dorf entsteht", detail: "Mit der Zeit bildet sich eine Gemeinschaft, verbunden mit dem Fluss, dem Land und den Traditionen, die bis heute Teil des Charakters von Aglen sind." },
    { title: "Geschichten und Erinnerungen", detail: "Die lokalen Legenden, Bräuche und Erinnerungen halten den Geist des Dorfes lebendig und schaffen eine Verbindung zwischen Vergangenheit und Gegenwart." },
    { title: "Aglen heute", detail: "Die Zukunft von Aglen ist am stärksten, wenn es authentisch bleibt. Heute ist das Dorf ein beliebtes Reiseziel für Liebhaber von Natur, Fotografie, Angeln und ruhigen Wochenendreisen." },
  ],
  mysteries: [
    { title: "Dorthin, wohin der Fluss führt", tag: "Verborgene Wege", image: images.hero, description: "Der Vit zeigt nicht alles auf einmal. Die Biegungen, Schatten und Felsen machen den Spaziergang zu einer Suche." },
    { title: "Die Welt der Höhlen", tag: "Stein und Stille", image: images.cave, description: "Die Höhlen rund um Aglen und Karlukovo gehören zu den beeindruckendsten Naturphänomenen der Region und bewahren Millionen Jahre Geschichte, eingeschrieben in den Stein." },
    { title: "Namen, die Geschichten erzählen", tag: "Folklore-Landschaft", image: images.arch, description: "Orte wie Dupkata, Sloncheto und Rachkov vir verwandeln die Naturlandschaft in einen Ort, der leicht im Gedächtnis bleibt." },
  ],
  placesList: [
    { id: "dupkata", title: "Dupkata", tag: "Felsbogen", image: images.arch, imageAlt: "Ein natürlicher Felsbogen über dem Fluss Vit bei Aglen", description: "Ein natürlicher Felsbogen über dem Fluss Vit und einer der fotogensten Orte rund um Aglen." },
    { id: "sloncheto", title: "Слончето", tag: "Felsfigur", image: images.caveCard, imageAlt: "Felsfenster mit Blick auf die Kalksteinlandschaft bei Aglen", description: "Eine neugierig anmutende Felsform, die zu einem der Wahrzeichen der Region geworden ist." },
    { id: "chervena-stena", title: "Червена стена", tag: "Canyonblick", image: images.hero, imageAlt: "Canyon, Fluss und Kalksteinfelsen bei Aglen", description: "Ein beeindruckender Blick auf die Canyonlandschaft, geformt von den Felsen und dem Fluss." },
    { id: "rachkov-vir", title: "Рачков вир", tag: "Flussbecken", image: images.pool, imageAlt: "Ein klares Flussbecken unter Kalksteinfelsen bei Aglen", description: "Ein malerisches Flussbecken, geeignet für Erholung, Fotos, ein natürliches Flussbad und zum Angeln." },
    { id: "st-archangel-michael", title: "St. Erzengel Michael", tag: "Dorfgedächtnis", image: images.church, imageAlt: "Dorfkirche, Steingasse und grünes Tal", description: "Ein historisches Gotteshaus, das das geistige Erbe des Dorfes bewahrt, erbaut 1888 zu Ehren der gefallenen Einheimischen, der Opfer der türkischen Überfälle." },
    { id: "kaleto", title: "Калето", tag: "Archäologie", image: images.kaleto, imageAlt: "Steinreste auf einem Hügel über Canyon und Fluss", description: "Ein Ort, verbunden mit der alten Geschichte der Region und den alten Wegen entlang des Tals des Vit." },
  ],
  experiencesList: [
    { id: "canyonWalk", title: "Canyon-Spaziergang", price: negotiablePrice.de, duration: "2-3 Stunden", bestFor: "Erstbesucher", description: "Eine Route zwischen Felsen, Flussblicken und Naturschätzen am Vit." },
    { id: "photoTour", title: "Foto-Reise am Fluss", price: negotiablePrice.de, duration: "Halber Tag", bestFor: "Fotografen", description: "Die schönsten Orte für Landschafts- und Naturfotografie rund um das Dorf." },
    { id: "fishing", title: "Angeln am Vit", price: negotiablePrice.de, duration: "2 Stunden", bestFor: "Langsames Reisen", description: "Ruhige Orte am Fluss und die Möglichkeit, die Natur in ihrer reinsten Form zu genießen." },
    { id: "weekendEscape", title: "Wochenendflucht nach Aglen", price: negotiablePrice.de, duration: "2 Tage", bestFor: "Paare und Freunde", description: "Zwei Tage inmitten der Natur, mit lokalen Geschichten und schönen Ausblicken." },
    { id: "herbs", title: "Kräuter und Dorfwissen", price: negotiablePrice.de, duration: "90 Min.", bestFor: "Neugierige Reisende", description: "Lerne den Reichtum der lokalen Natur und das traditionelle Wissen über Kräuter kennen." },
    { id: "schoolDay", title: "Entdeckungstag für Schulen", price: negotiablePrice.de, duration: "1 Tag", bestFor: "Schulgruppen", description: "Ein Bildungserlebnis, das Natur, Geschichte und lokale Legenden verbindet." },
  ],
  galleryItems: [
    { title: "Canyon des Vit", image: images.hero, alt: "Cinematischer Flusscanyon und Dorf bei Sonnenaufgang", size: "wide" },
    { title: "Der Steinbogen", image: images.arch, alt: "Natürlicher Kalksteinbogen über dem Fluss", size: "standard" },
    { title: "Höhlenlicht", image: images.cave, alt: "Höhleneingang mit warmem Licht, Fluss und Felsen dahinter", size: "tall" },
    { title: "Über dem verborgenen Tal", image: images.aerial, alt: "Luftblick auf Fluss, Felsen und ländliches Dorf", size: "wide" },
    { title: "Flusserholung bei Lukovit", image: images.nearbyRetreat, alt: "Ruhige Wasserlandschaft mit schwimmendem Holzhaus bei Lukovit und Aglen", size: "standard" },
  ],
  mapStops: [
    { title: "Das Dorfzentrum", detail: "Der Spaziergang beginnt im Herzen von Aglen – dem Platz, der Kirche und den alten Häusern, die den Geist des Dorfes bewahren." },
    { title: "Der Weg am Vit", detail: "Folge dem Lauf des Vit-Flusses entlang malerischer Ufer, schattiger Bäume und schöner Blicke auf die Felsen." },
    { title: "Dupkata", detail: "Eines der markantesten Natursymbole von Aglen – ein beeindruckender Felsbogen, der über Jahrtausende von der Natur geformt wurde." },
    { title: "Höhlen und Felsphänomene", detail: "Entdecke die verborgene Welt des Karstgeländes – Höhlen, Felsformationen und Orte mit unvergleichlicher Atmosphäre." },
  ],
  accommodationList: [
    { title: "Gästezimmer", type: "Unterkunft im Dorf", description: "Ruhige Unterkunft in einem lokalen Haus, nahe an Natur und Fluss.", image: images.church },
    { title: "Zeltplatz", type: "Camping", description: "Offene Fläche für Zelte mit Zugang zum Fluss Vit und zu den Naturwegen.", image: images.aerial },
    { title: "Bergvilla", type: "Villa", description: "Abgelegene Villa mit Blick auf den Canyon, geeignet für kleine Gruppen und Wochenendauszeiten.", image: images.pool },
  ],
  sourceNotes: ["Erstellt von DevOpsio - www.devopsio.eu", "Alle Bilder stammen von lokalen Fotografen und werden mit Genehmigung verwendet."],
};

