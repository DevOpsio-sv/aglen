import { images, negotiablePrice } from "./shared";
import type { PageCopy } from "./types";

export const es: PageCopy = {
  nav: { home: "Inicio", about: "Sobre Aglen", landmarks: "Lugares", stay: "Alojamiento", quests: "Misiones AR", events: "Eventos", business: "Negocios locales" },
  ui: { languageLabel: "Idioma", languageSelectAria: "Seleccionar idioma", modalCloseAria: "Cerrar", mobileMenuAria: "Menú" },
  brand: { name: "Aglen", subtitle: "Pueblo junto al río Vit" },
  hero: {
    meta: "Norte de Bulgaria · río Vit · Lukovit · Karlukovo",
    title: "AGLEN",
    subtitle: "El tesoro oculto del río Vit",
    lede: "Descubre cañones, cuevas, pozas del río e impresionantes fenómenos naturales en el corazón del norte de Bulgaria. Aglen es un destino ideal para paseos, fotografía, pesca y un fin de semana tranquilo en plena naturaleza.",
    primary: "Explorar Aglen",
    secondary: "Descargar la app",
    cue: "Descubre el valle",
    imageAlt: "Vista cinematográfica de un cañón fluvial y paisaje rural inspirados en Aglen",
  },
  statsLabel: "Por qué visitar Aglen",
  about: {
    eyebrow: "Historia y memoria local",
    title: "Los secretos de las rocas de Aglen",
    text: "Tras los macizos calizos y las decenas de cuevas del karst de Lukovit junto a Aglen se esconde una historia que atraviesa milenios de transformaciones geológicas, prácticas de culto tracias y crónicas del Renacimiento búlgaro. Explora las capas más abajo.",
  },
  legends: {
    eyebrow: "Leyendas y misterios de Aglen",
    title: "Entre los cañones, las cuevas y los viejos senderos alrededor de Aglen, cada lugar tiene su propia historia.",
    text: "Las historias más fuertes aquí no son ruidosas. Viven en los nombres locales, los umbrales de las cuevas, las extrañas formas rocosas y las curvas del río.",
  },
  landmarks: {
    eyebrow: "Lugares para descubrir",
    title: "Los lugares más bellos cerca de Aglen",
    text: "Desde impresionantes formaciones rocosas y pozas del río hasta vistas panorámicas y sitios históricos: aquí la naturaleza y las leyendas locales convierten cada paseo en un pequeño descubrimiento.",
    aria: "Puntos de ruta alrededor de Aglen",
  },
  experiences: {
    eyebrow: "Experiencias",
    title: "Vive Aglen a tu manera",
    text: "Elige un paseo, una aventura fotográfica, pesca o un fin de semana en la naturaleza y descubre lo mejor de la zona.",
    cta: "Pregunta por la ruta",
  },
  gallery: { eyebrow: "Galería natural", title: "Un lugar contado con luz de río y piedra", aria: "Galería de Aglen" },
  stay: {
    eyebrow: "Alojamiento en Aglen",
    title: "Quédate en plena naturaleza",
    text: "Elige un lugar tranquilo para pasar la noche y usa Aglen como punto de partida para descubrir las riquezas naturales de la región.",
  },
  quests: {
    eyebrow: "El primero de su tipo en Bulgaria",
    title: "Una aventura AR real cerca de Aglen",
    text: "Unlocking Bulgaria te lleva a lugares reales - con tu teléfono ves un mundo 3D oculto, resuelves acertijos y sigues las huellas del Guardián. No es una simulación. No es un museo. Es una aventura real en vivo.",
    cta: "Descargar y empezar",
    features: [
      { id: "ar", title: "Realidad Aumentada (AR)", text: "¿Qué se esconde en estos lugares? Apunta la cámara y ve cómo el mundo oculto cobra vida ante tus ojos." },
      { id: "gps", title: "Misiones GPS en vivo", text: "¿Qué lugar esconde la siguiente pista? Sigue la misión GPS hasta los lugares reales alrededor de Aglen." },
      { id: "story", title: "Historia contada de otra manera", text: "¿Quién es el Guardián? ¿Qué protegen los signos antiguos? Descubre las leyendas de la cueva Prohodna a través del juego." },
    ],
  },
  ar: {
    eyebrow: "Aventura AR",
    title: "Mira el mundo del Guardián",
    text: "Con la cámara de tu teléfono, da vida al mundo oculto de Prohodna. La capa AR revela historias, señales y personajes invisibles a simple vista, pero solo en los lugares donde ocurrieron.",
    steps: [
      "Descarga la app",
      "Ve a un lugar AR marcado alrededor de Aglen",
      "Apunta la cámara y ve el mundo oculto",
    ],
    cta: "Descargar y empezar",
  },
  app: {
    eyebrow: "Descargar la app",
    title: "Unlocking Bulgaria",
    text: "Aplicación móvil para Android. Encuentra las misiones alrededor de Aglen y emprende una aventura real.",
    badge: "Abrir Unlocking Bulgaria",
    note: "El sitio oficial de la app es unlockingbulgaria.com/bg/.",
  },
  contact: {
    eyebrow: "Planea tu visita",
    title: "Planea tu visita",
    text: "Contáctanos para obtener información sobre rutas, lugares de interés, localizaciones fotográficas, pesca, alojamiento e ideas para un fin de semana inolvidable junto al río Vit.",
    notesTitle: "Notas para visitantes",
    noteOne: "Adecuado para ecoturismo, fotografía, pesca, rutas a pie, visita a cuevas y un fin de semana en el norte de Bulgaria, fotografía, vistas al río, cuevas y memoria local.",
    noteTwo: "Trae calzado cómodo, agua, protección solar y respeto por los espacios locales.",
    cta: "Enviar consulta",
  },
  events: {
    eyebrow: "Calendario",
    title: "Eventos en Aglen",
    text: "Fiestas, encuentros del pueblo, quedadas al aire libre y eventos de temporada en Aglen y a lo largo del río Vit. Vuelve para ver las próximas fechas.",
    emptyState: "Próximos eventos muy pronto. Si organizas o conoces un evento en Aglen, compártelo con nosotros.",
    dateLabel: "Cuándo",
    locationLabel: "Dónde",
    submitTitle: "¿Tienes una foto o una noticia de Aglen?",
    submitText: "Envíanos una foto o información sobre un evento. Revisamos cada envío antes de publicarlo.",
    submitCta: "Compartir foto / info",
  },
  hub: {
    eyebrow: "Guía turística",
    title: "Planifica Aglen por interés, ruta y lugar cercano",
    text: "Las guías especializadas conectan la historia principal del destino con la intención del visitante: lugares de interés, senderismo, pesca, cuevas, el río Vit, alojamiento, comida, actualizaciones estacionales y destinos cercanos.",
  },
  guides: {
    vitRiver: { label: "Guía del río Vit", text: "El río Vit es el corazón de la zona y, con sus numerosos pequeños senderos, ofrece miles de lugares para pasear, fotografiar, pescar y descansar en plena naturaleza." },
    fishing: { label: "Pesca junto al Vit", text: "El río Vit ofrece lugares hermosos y tranquilos para pescar en plena naturaleza del norte de Bulgaria." },
    hiking: { label: "Rutas de senderismo", text: "Ecosenderos y rutas llevan a los visitantes a las más bellas atracciones naturales alrededor de Aglen." },
    caves: { label: "Cuevas y formas rocosas", text: "La zona alrededor de Aglen y Karlukovo es conocida por sus cuevas e impresionantes formaciones calizas." },
    food: { label: "Comida y productos locales", text: "Prueba productos caseros y sabores tradicionales característicos de la región de Lukovit." },
    nearby: { label: "Destinos cercanos", text: "Combina la visita a Aglen con Prohodna, Karlukovo, Iskar–Panega, Lukovit y otras atracciones de la zona." },
    seasonal: { label: "Guía estacional", text: "Actualizaciones mensuales para rutas, fotografía, el clima y la planificación de un fin de semana tranquilo." },
  },
  highlights: [
    { label: "Bulgaria oculta", value: "Experiencia auténtica", detail: "Lejos del turismo masivo, Aglen ofrece tranquilidad, hermosa naturaleza y una auténtica sensación de pueblo búlgaro." },
    { label: "Naturaleza", value: "Cañones, cuevas y río", detail: "La zona alrededor del pueblo impresiona con rocas calizas, cuevas, pozas del río y algunos de los paisajes naturales más bellos del norte de Bulgaria." },
    { label: "Identidad", value: "La única «Ъ»", detail: "Aglen es el único lugar habitado de Bulgaria cuyo nombre empieza con la letra «Ъ»." },
  ],
  timeline: [
    {
      title: "Tierra de rocas y cuevas",
      detail: "Las rocas calizas y las cuevas alrededor de Aglen conforman uno de los paisajes naturales más impresionantes de la zona de Lukovit y el río Vit.",
      intro:
        "El curso del río Vit alrededor del pueblo de Aglen guarda mucho más que las típicas leyendas turísticas sobre persecuciones otomanas y puentes de roca. Tras los macizos calizos y las decenas de cuevas de este tramo de la región kárstica de Lukovit se esconde una historia que atraviesa milenios de transformaciones geológicas, prácticas de culto tracias y aislacionismo espiritual medieval.",
      sections: [
        {
          heading: "1. La anomalía geológica: ¿Por qué las rocas aquí son únicas?",
          body: [
            "Los estudios geológicos del karst de la zona de Lukovit muestran que las rocas alrededor de Aglen no son simples calizas ordinarias, sino que pertenecen a los llamados estratos de Lomets y de Apriltsi (principalmente del Cretácico inferior).",
            "El laberinto de agua subterráneo: el río Vit en este tramo forma meandros específicos porque hace millones de años seguía fallas tectónicas. Bajo el cauce actual del río y bajo los macizos rocosos hay toda una red de sifones subterráneos y galerías «secas» que los espeleólogos aún no han cartografiado por completo.",
            "El microclima del cañón: las paredes verticales, que en algunos lugares alcanzan los 100 metros, crean un microclima termokárstico específico. Debido al profundo cañón y a los manantiales de las cuevas, las temperaturas en la parte baja junto al Vit a veces se diferencian en varios grados de las de la meseta, lo que ha propiciado la conservación de vegetación relicta y biocenosis kársticas específicas, estudiadas por los botánicos ya a comienzos del siglo XX.",
          ],
        },
        {
          heading: "2. Las huellas de la prehistoria y los tracios",
          body: [
            "Aunque los relatos populares se centran en la época del dominio otomano (como la tragedia en el paraje Selishteto y la cueva Valovata dupka / Ochilatata), las huellas arqueológicas en las cuevas alrededor de Aglen apuntan a una antigüedad mucho más profunda:",
            "En la zona de los arcos de roca y alrededor de las cuevas se han encontrado fragmentos aislados de cerámica prehistórica (principalmente del Calcolítico y la Edad del Bronce temprana), que muestran que las cuevas sirvieron de refugios temporales para cazadores y primeros pastores ya hace más de 4-5 milenios.",
            "Al igual que en la vecina región de Karlukovo-Iskar, también aquí las terrazas rocosas de difícil acceso fueron utilizadas por las tribus tracias (los tribalos) como santuarios al aire libre, vinculados a los cultos al agua, la roca y las fuerzas subterráneas. Los manantiales kársticos de la zona eran venerados como curativos.",
          ],
        },
        {
          heading: "3. La etimología y el nombre del pueblo en los registros antiguos",
          body: [
            "El nombre Aglen es absolutamente único en la toponimia búlgara: es el único pueblo de Bulgaria cuyo nombre empieza con la letra «Ъ».",
            "En los registros fiscales otomanos de los siglos XV y XVI (que describen el sanjacado de Nikopol) aparecen variantes tempranas del nombre, derivadas de la raíz «glen» o «iglen» (según algunas leyendas antiguas, el pueblo se llamaba originalmente «Iglen grad golyama» por las afiladas agujas y crestas rocosas sobre el río).",
            "Las antiguas notas geográficas de la época del Renacimiento búlgaro describen Aglen no solo como un pequeño pueblo, sino como un punto estratégico en la ruta de las caravanas que cruzaban el Predbalkan, donde los comerciantes contaban con los refugios rocosos naturales para protegerse de los ataques de bandidos.",
          ],
        },
        {
          heading: "4. La memoria literaria y espiritual: Trifon Kunev",
          body: [
            "En la memoria folclórica y cultural de Aglen ocupa un lugar especial el hecho de que aquí nació el destacado escritor, publicista y folletinista búlgaro Trifon Kunev (nacido en 1880).",
            "Sus memorias y primeras obras llevan el espíritu particular de la naturaleza áspera pero pintoresca de las rocas de Aglen. Crecido a la sombra de estos colosos calizos y del río Vit, más tarde trasladó ese sentimiento de rebeldía y combatividad a sus emblemáticos artículos y a su resistencia contra los regímenes totalitarios, por lo que pasó por duras pruebas en los campos después de 1944. Los estudiosos de su obra a menudo relacionan su profunda integridad moral con la naturaleza «férrea» e inexpugnable de su lugar natal.",
          ],
        },
      ],
    },
    {
      title: "Las personas descubren el valle",
      detail: "Las condiciones favorables junto al río atraen a las personas desde tiempos antiguos y convierten la zona en un lugar natural para vivir y desplazarse.",
    },
    {
      title: "Nace el pueblo",
      detail: "Con el tiempo se forma una comunidad ligada al río, la tierra y las tradiciones que aún hoy forman parte del carácter de Aglen.",
    },
    {
      title: "Historias y recuerdos",
      detail: "Las leyendas, costumbres y recuerdos locales mantienen vivo el espíritu del pueblo y crean un vínculo entre el pasado y el presente.",
    },
    {
      title: "Aglen hoy",
      detail: "El futuro de Aglen es más fuerte si se mantiene auténtico. Hoy el pueblo es un destino preferido por los amantes de la naturaleza, la fotografía, la pesca y las escapadas tranquilas de fin de semana.",
    },
  ],
  mysteries: [
    { title: "Adonde lleva el río", tag: "Rutas ocultas", image: images.hero, description: "El Vit no lo revela todo de una vez. Las curvas, las sombras y las rocas convierten el paseo en una búsqueda." },
    { title: "El mundo de las cuevas", tag: "Piedra y silencio", image: images.cave, description: "Las cuevas alrededor de Aglen y Karlukovo están entre los fenómenos naturales más impresionantes de la zona y guardan millones de años de historia escrita en la piedra." },
    { title: "Nombres que cuentan historias", tag: "Paisaje de folclore", image: images.arch, description: "Parajes como Dupkata, Sloncheto y Rachkov vir convierten el paisaje natural en un lugar fácil de recordar." },
  ],
  placesList: [
    { id: "dupkata", title: "Dupkata", tag: "Arco de roca", image: images.arch, imageAlt: "Un arco de roca natural sobre el río Vit cerca de Aglen", description: "Un arco natural de roca sobre el río Vit y uno de los lugares más fotogénicos alrededor de Aglen." },
    { id: "sloncheto", title: "Sloncheto", tag: "Figura de roca", image: images.caveCard, imageAlt: "Ventana de roca con vista a un paisaje calizo cerca de Aglen", description: "Una curiosa forma rocosa que se ha convertido en uno de los símbolos de la zona." },
    { id: "chervena-stena", title: "Chervena stena", tag: "Vista de cañón", image: images.hero, imageAlt: "Cañón, río y rocas calizas cerca de Aglen", description: "Una vista impresionante del paisaje de cañón formado por las rocas y el río." },
    { id: "rachkov-vir", title: "Rachkov vir", tag: "Poza del río", image: images.pool, imageAlt: "Una poza fluvial cristalina bajo acantilados calizos cerca de Aglen", description: "Una pintoresca poza del río, ideal para descansar, hacer fotos, un jacuzzi natural en el río y pescar." },
    { id: "st-archangel-michael", title: "San Arcángel Miguel", tag: "Memoria del pueblo", image: images.church, imageAlt: "Iglesia del pueblo, calle de piedra y valle verde", description: "Un templo histórico que conserva el patrimonio espiritual del pueblo, construido en 1888 en honor a los vecinos fallecidos, víctimas de las incursiones turcas." },
    { id: "kaleto", title: "Kaleto", tag: "Arqueología", image: images.kaleto, imageAlt: "Restos de piedra en una colina sobre un cañón y un río", description: "Un paraje ligado a la historia antigua de la zona y a los viejos caminos del valle del Vit." },
  ],
  experiencesList: [
    { id: "canyonWalk", title: "Caminata por el cañón", price: negotiablePrice.es, duration: "2-3 horas", bestFor: "Primera visita", description: "Una ruta entre rocas, vistas al río y atracciones naturales junto al Vit." },
    { id: "photoTour", title: "Viaje fotográfico del río", price: negotiablePrice.es, duration: "Medio día", bestFor: "Fotógrafos", description: "Los lugares más bellos para la fotografía de paisaje y de naturaleza alrededor del pueblo." },
    { id: "fishing", title: "Pesca junto al Vit", price: negotiablePrice.es, duration: "2 horas", bestFor: "Viaje lento", description: "Lugares tranquilos junto al río y la posibilidad de disfrutar de la naturaleza en su forma más pura." },
    { id: "weekendEscape", title: "Escapada de fin de semana en Aglen", price: negotiablePrice.es, duration: "2 días", bestFor: "Parejas y amigos", description: "Dos días entre naturaleza, historias locales y hermosas vistas." },
    { id: "herbs", title: "Hierbas y saber del pueblo", price: negotiablePrice.es, duration: "90 min.", bestFor: "Viajeros curiosos", description: "Conoce la riqueza de la naturaleza local y los saberes tradicionales sobre las hierbas." },
    { id: "schoolDay", title: "Día escolar de descubrimiento", price: negotiablePrice.es, duration: "1 día", bestFor: "Grupos escolares", description: "Una experiencia educativa que combina naturaleza, historia y leyendas locales." },
  ],
  galleryItems: [
    { title: "El cañón del Vit", image: images.riverSunset, alt: "El río Vit al atardecer con rocas, árboles y orilla pedregosa", size: "wide" },
    { title: "El arco de piedra", image: images.arch, alt: "Arco natural de caliza sobre el río", size: "standard" },
    { title: "Luz de cueva", image: images.cave, alt: "Entrada de cueva con vista al río y las rocas", size: "tall" },
    { title: "Sobre el valle oculto", image: images.aerial, alt: "Vista aérea del río, las rocas y el pueblo", size: "wide" },
    { title: "Descanso junto al río cerca de Lukovit", image: images.nearbyRetreat, alt: "Tranquilo paisaje acuático con casa de madera flotante cerca de Lukovit y Aglen", size: "standard" },
  ],
  mapStops: [
    { title: "El centro del pueblo", detail: "El paseo comienza en el corazón de Aglen – la plaza, la iglesia y las viejas casas que guardan el espíritu del pueblo." },
    { title: "El sendero junto al Vit", detail: "Sigue el curso del río Vit por orillas pintorescas, árboles frondosos y hermosas vistas de las rocas." },
    { title: "Dupkata", detail: "Uno de los símbolos naturales más emblemáticos de Aglen – un impresionante arco de roca formado por la naturaleza a lo largo de milenios." },
    { title: "Cuevas y fenómenos rocosos", detail: "Descubre el mundo oculto del relieve kárstico – cuevas, formaciones rocosas y lugares con una atmósfera incomparable." },
  ],
  accommodationList: [
    { title: "Habitaciones para huéspedes", type: "Alojamiento en el pueblo", description: "Alojamiento tranquilo en una casa local, cerca de la naturaleza y del río.", image: images.church },
    { title: "Zona de acampada", type: "Camping", description: "Espacio abierto para tiendas con acceso al río Vit y a las rutas naturales.", image: images.aerial },
    { title: "Villa de montaña", type: "Villa", description: "Villa apartada con vistas al cañón, adecuada para grupos pequeños y escapadas de fin de semana.", image: images.pool },
  ],
  sourceNotes: ["Creado por DevOpsio - www.devopsio.eu", "Todas las imágenes son de fotógrafos locales y se usan con permiso."],
};
