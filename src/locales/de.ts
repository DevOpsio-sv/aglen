import { images, prices } from "./shared";
import type { PageCopy } from "./types";

export const de: PageCopy = {
  nav: { home: "Start", story: "Geschichte", legends: "Legenden", places: "Orte", map: "Routen", contact: "Besuch" },
  ui: { languageLabel: "Sprache", languageSelectAria: "Sprache auswählen", modalCloseAria: "Schließen" },
  brand: { name: "Aglen", subtitle: "Reiseziel am Vit" },
  hero: { meta: "Nordbulgarien · Fluss Vit · nahe Lukovit", title: "AGLEN", subtitle: "Der verborgene Schatz am Fluss Vit", lede: "Wo Kalksteinfelsen, stille Wälder, Höhlen und Dorflegenden zusammentreffen.", primary: "Aglen entdecken", secondary: "Besuch planen", cue: "Tal entdecken", imageAlt: "Cinematische Ansicht eines Flusscanyons und einer Dorflandschaft bei Aglen" },
  statsLabel: "Warum Aglen besuchen",
  story: { eyebrow: "Geschichte und lokale Erinnerung", title: "Zeitschichten am Fluss", text: "Aglen ist nicht nur ein Punkt auf der Karte. Seine Geschichte verbindet Höhlen, Flusswege, alte Routen, Dorfgedächtnis und einen seltenen Namen." },
  legends: { eyebrow: "Legenden und Mysterien von Aglen", title: "Manche Orte findet man langsam.", text: "Die stärksten Geschichten sind hier leise. Sie leben in lokalen Namen, Höhlenschwellen, ungewöhnlichen Felsformen und Flussbiegungen." },
  places: { eyebrow: "Orte zum Entdecken", title: "Canyon, Fluss, Höhlen und Dorfstille", text: "Ein kompaktes Reiseziel mit einer seltenen Mischung aus Naturzeichen und lokalen Geschichten. Der beste Besuch ist ruhig: gehen, zuhören, fotografieren und Raum für Entdeckung lassen." },
  experiences: { eyebrow: "Wähle dein Aglen-Wochenende", title: "Geführte Momente statt Checkliste", text: "Die Ausflüge sind klare Erlebnisse: kurz genug für ein Wochenende, persönlich genug, um lokal zu wirken.", cta: "Route anfragen" },
  gallery: { eyebrow: "Immersive Galerie", title: "Ein Ort aus Flusslicht und Stein", aria: "Aglen-Galerie" },
  map: { eyebrow: "Entdeckerkarte", title: "Folge dem Fluss. Finde den Stein.", text: "Nutze Aglen als Basis für eine langsame Route: Dorfzentrum, Vit-Ufer, Felsen, Höhlengelände und Aussichtspunkte zum Sonnenuntergang.", aria: "Routenpunkte um Aglen" },
  contact: { eyebrow: "Besuch planen", title: "Verbringe ein Wochenende dort, wo der Vit seine Geheimnisse bewahrt.", text: "Frage nach Routen, geführten Spaziergängen, Fotopunkten, lokalen Geschichten und praktischen Besucherinfos.", notesTitle: "Hinweise für Besucher", noteOne: "Ideal für Naturspaziergänge, Fotografie, Flussblicke, Höhlen und lokale Erinnerung.", noteTwo: "Bring bequeme Schuhe, Wasser, Sonnenschutz und Respekt für lokale Orte mit.", cta: "Anfrage senden" },
  highlights: [
    { label: "Verborgenes Bulgarien", value: "Ein stilles Dorf am Vit", detail: "Für Besucher, die Entdeckung, Flusswege, Felsen, Höhlen und Ruhe suchen." },
    { label: "Natur", value: "Fluss, Kalkstein, Wald", detail: "Die Landschaft wird vom Vit, natürlichen Felsformen, Canyonblicken und Höhlengelände geprägt." },
    { label: "Identität", value: "Der seltene Name Aglen", detail: "Bekannt als das einzige bulgarische Dorf, das mit dem Buchstaben Ъ beginnt." },
  ],
  timeline: [
    { title: "Paläolithische Spuren in nahen Höhlen deuten auf frühe menschliche Präsenz in der Umgebung.", detail: "Die Höhlen und Kalksteinformen am Vit gehören zur tiefsten Zeitschicht der Region: eine Landschaft aus Schutzorten, Wegen und Aussichtspunkten lange vor modernen Reiserouten." },
    { title: "Römische Straßenreste und befestigte Spuren verbinden die Gegend mit alten Routen.", detail: "Alte Wege zeigen, dass die Region nicht isoliert war. Fluss, Höhen und Steinlandschaft halfen bei Bewegung, Orientierung und Schutz." },
    { title: "Die lokale Legende von Siedlern aus Churek bewahrt Erinnerung an Ansiedlung und Zuflucht.", detail: "Diese Erzählung sollte als lokale Erinnerung verstanden werden, nicht als gesichertes Archiv. Sie gibt dem Ort eine menschliche Ebene: Menschen suchen Sicherheit, beginnen neu und hinterlassen Namen und Geschichten." },
    { title: "Die Erinnerung an 1877 bleibt Teil des historischen Respekts und der Identität des Dorfes.", detail: "Diese Schicht braucht Ruhe und Respekt. Sie verbindet Aglen mit größerer bulgarischer Erinnerung, ohne die Seite in ein Lehrbuch zu verwandeln." },
    { title: "Heute kann Aglen als ruhiges Ziel für Ökotourismus, Handwerk und langsames Reisen wachsen.", detail: "Die stärkste Zukunft liegt in kleinen, authentischen Besuchen: Wochenenden, geführte Spaziergänge, Fotografie, Handwerk und Respekt für Menschen, Fluss und Dorfumgebung." },
  ],
  mysteries: [
    { title: "Wo der Fluss aus dem Blick verschwindet", tag: "Verborgene Wege", image: images.hero, description: "Der Vit zeigt nicht alles auf einmal. Biegungen, Schatten und Felsen machen den Spaziergang zu einer Suche." },
    { title: "Die Schwellen der Höhlen", tag: "Stein und Stille", image: images.cave, description: "Die Höhlen tragen eine ältere Erinnerung der Landschaft: geologisch, menschlich und symbolisch." },
    { title: "Felsen mit lokalen Namen", tag: "Folklore-Landschaft", image: images.arch, description: "Namen wie Дупката und Слончето machen die Landschaft persönlich. Sie sind Sehenswürdigkeiten und Geschichten zugleich." },
  ],
  placesList: [
    { title: "Дупката", tag: "Felsbogen", image: images.arch, imageAlt: "Kalkstein-Felsbogen über dem Fluss nahe Aglen", description: "Ein natürlicher Steinbogen über dem Vit, ideal für langsame Spaziergänge, ruhige Fotos und das Gefühl einer verborgenen Route." },
    { title: "Слончето", tag: "Felsfigur", image: images.hero, imageAlt: "Canyon, Fluss und Kalksteinfelsen nahe Aglen", description: "Eine spielerische Felsform am Fluss, die einen einfachen Spaziergang in eine kleine Entdeckung verwandelt." },
    { title: "Червена стена", tag: "Canyonblick", image: images.aerial, imageAlt: "Canyonlandschaft aus der Luft mit Fluss und Dorf", description: "Ein dramatisches Zusammentreffen von Kalkstein, Wald und Flusslicht nahe dem Dorf." },
    { title: "Рачков вир", tag: "Flussbecken", image: images.pool, imageAlt: "Ruhiges Flussbecken mit Kalksteinufer und Wald", description: "Ein stiller Naturpunkt für eine Pause am Wasser, ein Picknick und einen langsameren Rhythmus am Vit." },
    { title: "St. Erzengel Michael", tag: "Dorfgedächtnis", image: images.church, imageAlt: "Dorfkirche, Steingasse und grünes Tal", description: "Die 1888 erbaute Dorfkirche bewahrt die menschliche Schicht der Geschichte von Aglen." },
    { title: "Калето", tag: "Archäologie", image: images.kaleto, imageAlt: "Steinreste auf einer Anhöhe über Canyon und Fluss", description: "Ein Ort, verbunden mit alten Routen, befestigter Erinnerung und der langen Kontinuität des Lebens am Fluss." },
  ],
  experiencesList: [
    { title: "Canyon-Spaziergang", price: prices[0], duration: "2-3 Stunden", bestFor: "Erstbesucher", description: "Geführte Blicke zum Vit, zu Felsformen und zu den lokalen Namen hinter der Landschaft." },
    { title: "Foto-Reise am Fluss", price: prices[1], duration: "Halber Tag", bestFor: "Fotografen", description: "Ausgewählte Orte am Fluss, bei den Felsen, alten Dorfstraßen und weichem Naturlicht." },
    { title: "Angeln am Vit", price: prices[2], duration: "2 Stunden", bestFor: "Langsames Reisen", description: "Ein ruhiger lokaler Rhythmus am Wasser mit praktischer Anleitung und Sorgfalt für den Fluss." },
    { title: "Wochenendflucht nach Aglen", price: prices[3], duration: "2 Tage", bestFor: "Paare und Freunde", description: "Spaziergänge, Picknickzeit, Handwerk und eine Abendroute durch Dorfgeschichten." },
    { title: "Kräuter und Dorfwissen", price: prices[4], duration: "90 Min.", bestFor: "Neugierige Reisende", description: "Kräuter erkennen, traditionelle Verwendung verstehen und verantwortungsvoll in der Landschaft sammeln." },
    { title: "Entdeckungstag für Schulen", price: prices[5], duration: "1 Tag", bestFor: "Schulgruppen", description: "Eine Feldroute durch Geografie, Geschichte, lokale Legenden und Naturschutz." },
  ],
  galleryItems: [
    { title: "Canyon des Vit", image: images.hero, alt: "Cinematischer Flusscanyon und Dorf bei Sonnenaufgang", size: "wide" },
    { title: "Der Steinbogen", image: images.arch, alt: "Natürlicher Kalksteinbogen über dem Fluss", size: "standard" },
    { title: "Höhlenlicht", image: images.cave, alt: "Höhleneingang mit warmem Licht", size: "tall" },
    { title: "Über dem verborgenen Tal", image: images.aerial, alt: "Luftblick auf Fluss, Felsen und ländliches Dorf", size: "wide" },
  ],
  mapStops: [
    { title: "Dorfzentrum", detail: "Beginne mit dem menschlichen Maßstab von Aglen: Straßen, Kirche, lokale Erinnerung und Orientierung." },
    { title: "Vit-Uferweg", detail: "Folge dem Wasser zu stillen Aussichtspunkten, Biegungen und schattigen Orten für Fotografie." },
    { title: "Дупката", detail: "Eine natürliche Steinschwelle und eines der stärksten visuellen Symbole des Reiseziels." },
    { title: "Höhlen und Felsformen", detail: "Entdecke die ältere Landschaftsschicht mit Sorgfalt, lokaler Führung und Respekt vor dem Gelände." },
  ],
  sourceNotes: ["Ursprüngliche Wix-Seite und Service-Liste: https://vasilevasilvena.wixsite.com/aglen", "Öffentlicher Reise- und Geschichtskontext: Banker.bg, Trip.dir.bg, BTA/Utro, Wikipedia/Wikitravel-Zusammenfassungen.", "Generierte Entwurfsbilder sind Platzhalter für endgültige, freigegebene Aglen-Fotografie."],
};
