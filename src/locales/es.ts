import { images, negotiablePrice } from "./shared";
import type { PageCopy } from "./types";

export const es: PageCopy = {
  nav: { home: "Inicio", about: "Sobre Aglen", landmarks: "Lugares", stay: "Alojamiento", quests: "Misiones AR", events: "Eventos", business: "Negocios locales", placesNature: "Lugares y naturaleza", visit: "Visitar Aglen", visitGettingHere: "Cómo llegar", visitRoutes: "Rutas", visitChildren: "Con niños", visitMissions: "Misiones AR con Unlocking Bulgaria", visitWhen: "Cuándo visitar" },
  ub: {
    homeHeading: "Descubre Aglen a través de Unlocking Bulgaria",
    homeText: "Misiones AR y GPS en lugares reales alrededor de Aglen. Unlocking Bulgaria es una aplicación nacional independiente — Aglen es su primer destino activo.",
    seeMissions: "Ver misiones activas",
    externalLabel: "Aplicación externa · unlockingbulgaria.com",
    hubTitle: "Misiones AR en Aglen con Unlocking Bulgaria",
    whatText: "Unlocking Bulgaria es una aplicación nacional independiente para misiones AR y GPS en lugares reales por toda Bulgaria. Aglen es su primer destino activo — la aplicación no forma parte del sitio del pueblo y no es propiedad de este.",
    missionsHeading: "Misiones disponibles alrededor de Aglen",
    needHeading: "Qué necesitas",
    needItems: ["Un smartphone con cámara", "El GPS activado", "La aplicación Unlocking Bulgaria"],
  },
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
      title: "🪨 Tierra de rocas y cuevas",
      detail: "Cómo la naturaleza creó el karst de Lukovit, las cuevas y las impresionantes formaciones calizas alrededor de Aglen.",
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
      title: "👣 Las primeras personas en el valle",
      detail: "Huellas de habitantes prehistóricos, presencia tracia y vida a orillas del río Vit.",
      intro:
        "Las primeras personas en el valle del río: los secretos del poblamiento prehistórico en torno a Aglen. Cuando se habla de lo que atraía al ser humano a los valles fluviales, las fuentes más difundidas suelen limitarse a frases generales sobre «tierra fértil» y «agua potable». Pero si escarbamos en los ficheros arqueológicos especializados, en los informes de viejas expediciones de museo y en las colecciones etnográficas de comienzos del siglo XX, aparece una imagen mucho más profunda de por qué precisamente este meandro cerrado del Vit se convirtió en un imán para los habitantes antiguos.",
      sections: [
        {
          heading: "1. La geografía estratégica del «corredor fluvial»",
          body: [
            "En la Antigüedad el río Vit no era solo una fuente de agua, sino un corredor vital de transporte y comunicación que unía la llanura del Danubio con los pasos de los Prebalcanes.",
            "El anfiteatro natural: El valle junto a Aglen es un anfiteatro geológicamente cerrado, rodeado de escarpadas terrazas calizas. En las épocas en que el clima era más húmedo y los bosques impenetrables, estos valles fluviales eran los únicos caminos seguros para el desplazamiento de las comunidades humanas y sus rebaños.",
            "Un oasis microclimático: Resguardado de los vientos por las altas rocas y sostenido por la humedad constante del río, el valle crea un miniecosistema. Aquí las temperaturas invernales eran más suaves que en la meseta abierta, y los suelos —los depósitos aluviales junto al Vit— permitieron los primeros experimentos agrícolas mucho antes de la aparición de la industria del hierro.",
          ],
        },
        {
          heading: "2. Las huellas arqueológicas del Neolítico y el Calcolítico",
          body: [
            "En trabajos olvidados de arqueólogos búlgaros de mediados del siglo pasado se mencionan hallazgos que rara vez llegan a las páginas de internet más populares.",
            "El sílex como moneda: En las terrazas sobre el río, en la zona de Lukovit, se han descubierto restos de talleres neolíticos tardíos de talla de sílex. Los antiguos aprovechaban los nódulos de sílex de alta calidad presentes en las calizas locales para fabricar hojas, cuchillos y puntas de flecha. Eso convertía la zona no solo en un lugar para vivir, sino en un centro industrial de la prehistoria temprana de la región.",
            "El culto de los primeros metalúrgicos: Durante el Calcolítico el valle empezó a recibir comunidades que buscaban no solo alimento, sino también materias primas. La cercanía de los Prebalcanes con sus afloramientos minerales atraía a la gente hacia estas puertas fluviales y los hizo testigos del paso de la piedra a la primera extracción de cobre.",
          ],
        },
        {
          heading: "3. Las leyendas locales sobre los «primeros hombres en las rocas»",
          body: [
            "En las notas folclóricas recogidas por maestros y estudiosos locales en Aglen durante los años veinte y treinta del siglo XX, conservadas en archivos regionales, existen tradiciones que se apartan de las leyendas turcas habituales.",
            "La tradición de las «sombras de dos piernas» en las rocas: Antaño los ancianos del pueblo contaban a sus hijos que en las cuevas más profundas y bajo los aleros rocosos vivieron una vez «hombres silenciosos» que no encendían fuego con humo para que no los vieran los espíritus de la montaña, y que se alimentaban de mejillones de río, ajo silvestre y carne de animales del bosque. Aunque suene a mito, esa memoria oral describe con asombrosa precisión el modo de vida de los primeros cazadores-recolectores del Paleolítico, que abandonaban las cuevas solo en la estación cálida.",
            "La leyenda del «surco de oro»: Según otra vieja creencia local, los primeros agricultores que llegaron al valle trazaron su primer surco justo donde el río hace su curva más cerrada bajo la roca. Creían que la tierra allí estaba «besada por los señores del inframundo», porque los manantiales salían directamente de las entrañas de la roca y traían vida incluso en las grandes sequías.",
          ],
        },
        {
          heading: "4. El camino de las tribus: tribalos y romanos",
          body: [
            "Cuando el valle empieza a poblarse de forma más estable durante la Edad del Hierro, queda dentro de las tierras de la poderosa tribu tracia de los tribalos.",
            "Los indicios arqueológicos señalan que estos parajes eran una encrucijada entre el mundo tracio del interior de los Balcanes y las tribus del Danubio. El río Vit servía de referencia, y quienes se asentaron en el valle levantaron pequeños poblados asociados en las terrazas altas alrededor del pueblo actual: lugares desde los que se ve a cualquiera que se acerque por el norte o por el sur.",
            "Con la llegada de los romanos, este corredor natural se incorporó a la estrategia de vigilancia de las vías que unían las fortalezas romanas del Danubio con el interior de la provincia de Mesia, y la población local fue integrada en la construcción de caminos y en el aprovechamiento de las fértiles terrazas fluviales.",
          ],
        },
      ],
    },
    {
      title: "🏡 El nacimiento de Aglen",
      detail: "Cómo surge el pueblo, de dónde viene su nombre y cómo se desarrolla a lo largo de los siglos.",
      intro:
        "El nacimiento de Aglen: los secretos de los registros otomanos, los barrios olvidados y el nombre único. La memoria popular busca a menudo el origen de los pueblos en la Antigüedad más remota, pero los primeros testimonios escritos seguros sobre Aglen provienen de otra época: de los registros fiscales redactados siglos después de la conquista otomana de las tierras búlgaras.",
      sections: [
        {
          heading: "1. Los registros otomanos: las primeras huellas escritas (siglos XV-XVI)",
          body: [
            "Aunque la memoria popular busca a menudo el origen de los pueblos en la Antigüedad más remota, los testimonios escritos sobre Aglen aparecen oficialmente en los primeros siglos posteriores a la conquista otomana de las tierras búlgaras.",
            "El sanjacado de Nicópolis: En los primeros registros fiscales otomanos (defteres) del pashalato de Nicópolis de los siglos XV y XVI el pueblo se menciona con distintas variantes fonéticas, adaptadas a la pronunciación escrita turca de la época: por ejemplo, como parte de dominios de timar o como pequeña aldea que debía tributo al poder central.",
            "Población y sustento: Los registros muestran que, aunque la zona estaba expuesta a riesgos estratégicos por su cercanía al río Vit y a los caminos hacia el Danubio, la vida aquí no se apagó. Los habitantes pagaban impuestos sobre todo en especie —trigo, más tarde maíz, ganado menor y miel—, aprovechando los valles resguardados tras las rocas, que los protegían de los saqueos masivos.",
          ],
        },
        {
          heading: "2. El enigma del nombre: ¿de dónde viene «Ъглен»?",
          body: [
            "El nombre del pueblo es un fenómeno lingüístico a escala de toda Bulgaria: la única localidad que empieza por la letra «Ъ». En los círculos científicos y en viejas notas etnográficas existen varias teorías sobre su origen.",
            "La teoría del carbón (la versión artesanal): Según investigaciones históricas más pragmáticas, la zona alrededor del cañón del Vit estuvo en otro tiempo densamente arbolada y la población local se dedicaba intensamente a la carboneo: la producción de carbón vegetal, tan necesario antaño para la herrería y la fundición de metales. Los yacimientos y los hornos de carbón dieron nombre a la aldea.",
            "La leyenda de las «rocas-aguja»: Las viejas tradiciones locales conservan con obstinación la versión del origen geográfico del nombre. Como sobre el río se alzan afiladas agujas y crestas calizas verticales, los primeros pobladores llamaron al lugar «Иглен» (el lugar junto a las agujas), que con el tiempo y el habla dialectal se transformó en el sonoro y único Ъглен de hoy.",
          ],
        },
        {
          heading: "3. Los barrios locales y los traslados del pueblo a lo largo del tiempo",
          body: [
            "Como muchos otros pueblos búlgaros, Aglen no siempre estuvo exactamente donde está hoy.",
            "Los antiguos asentamientos (los yurtluk): En el término del pueblo hay parajes que en viejas notas geográficas figuran con los nombres de «Селището» (el Asentamiento) o «Старо село» (el Pueblo Viejo). Las huellas arqueológicas allí muestran que en siglos anteriores la gente vivía más cerca de las cuevas y los macizos rocosos, donde la seguridad era mayor en tiempos de las incursiones de los kirdzhalíes y de la anarquía del dominio otomano.",
            "La consolidación durante el Renacimiento búlgaro: Con las décadas más tranquilas del siglo XIX el pueblo empieza a descender hacia las terrazas más amplias junto al río, donde las condiciones para la agricultura y la vida eran mejores. Entonces toma forma la fisonomía actual de Aglen, que ha conservado el espíritu de la arquitectura del Renacimiento, las viejas raíces familiares y el carácter combativo de sus habitantes, que dieron a Bulgaria figuras notables como el escritor Trifon Kunev.",
          ],
        },
      ],
    },
    {
      title: "📜 Leyendas y memoria local",
      detail: "Historias transmitidas de generación en generación: recuerdos, tradiciones y relatos locales poco conocidos.",
    },
    {
      title: "🌿 Aglen hoy",
      detail: "Cómo el pueblo preserva su historia, su naturaleza y su espíritu mientras mira hacia el futuro.",
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
