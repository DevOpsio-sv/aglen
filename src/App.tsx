import {
  experiences,
  galleryItems,
  highlights,
  mapStops,
  mysteries,
  places,
  sourceNotes,
  timeline,
} from "./content";

const navItems = [
  ["Начало", "#home"],
  ["История", "#story"],
  ["Легенди", "#legends"],
  ["Места", "#places"],
  ["Маршрути", "#map"],
  ["Посещение", "#contact"],
];

export function App() {
  return (
    <main>
      <header className="site-header" aria-label="Основна навигация">
        <a className="brand" href="#home" aria-label="Ъглен - начало">
          <span className="brand-mark">Ъ</span>
          <span>
            <strong>Ъглен</strong>
            <small>Aglen · Vit River</small>
          </span>
        </a>
        <nav>
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <section id="home" className="hero">
        <img
          className="hero-image"
          src="/assets/aglen-hero-river-canyon.png"
          alt="Cinematic view of a river canyon and village landscape inspired by Aglen"
        />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-copy section-shell reveal">
          <p className="eyebrow">Northern Bulgaria · Vit River · Near Lukovit</p>
          <h1>АГЛЕН</h1>
          <p className="hero-title">The Hidden Treasure of the Vit River</p>
          <p className="hero-lede">
            Where limestone cliffs, quiet forests, caves, and village legends meet.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#places">
              Explore Aglen
            </a>
            <a className="button ghost" href="#contact">
              Plan Your Visit
            </a>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true">
          Discover the valley
        </div>
      </section>

      <section className="stats section-shell" aria-label="Защо да посетите Ъглен">
        {highlights.map((item) => (
          <article className="stat-card reveal" key={item.label}>
            <p>{item.label}</p>
            <h2>{item.value}</h2>
            <span>{item.detail}</span>
          </article>
        ))}
      </section>

      <section id="story" className="story section-shell">
        <div className="section-heading reveal">
          <p className="eyebrow">История и местна памет</p>
          <h2>Layers of time beside the river</h2>
          <p>
            Aglen is not only a point on the map. Its story gathers caves, river paths,
            older routes, village memory, and the rare name that makes people stop and ask.
          </p>
        </div>
        <ol className="timeline">
          {timeline.map((event) => (
            <li className="reveal" key={event}>
              <span />
              <p>{event}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="legends" className="legends">
        <div className="section-shell">
          <div className="section-heading reveal">
            <p className="eyebrow">Legends & Mysteries of Aglen</p>
            <h2>Some places are found slowly.</h2>
            <p>
              The strongest stories here are not loud. They live in local names, cave
              thresholds, unusual rock forms, and the way the river disappears around a bend.
            </p>
          </div>
          <div className="mystery-grid">
            {mysteries.map((item) => (
              <article className="mystery-card reveal" key={item.title}>
                <img src={item.image} alt="" aria-hidden="true" />
                <div>
                  <p>{item.tag}</p>
                  <h3>{item.title}</h3>
                  <span>{item.description}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="places" className="places section-shell">
        <div className="section-heading reveal">
          <p className="eyebrow">Places to Explore</p>
          <h2>Canyon, river, caves, and village silence</h2>
          <p>
            A compact destination with a rare mix of natural landmarks and local stories.
            The best visit is unhurried: walk, listen, photograph, and leave space for discovery.
          </p>
        </div>
        <div className="place-grid">
          {places.map((place) => (
            <article className="place-card reveal" key={place.title}>
              <img src={place.image} alt={place.imageAlt} />
              <div>
                <p>{place.tag}</p>
                <h3>{place.title}</h3>
                <span>{place.description}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experiences" className="experiences section-shell">
        <div className="section-heading reveal">
          <p className="eyebrow">Choose your Aglen weekend</p>
          <h2>Guided moments, not tourist checklists</h2>
          <p>
            The existing excursions become clear visitor journeys: short enough for a weekend,
            personal enough to feel local, and visual enough to remember.
          </p>
        </div>
        <div className="experience-grid">
          {experiences.map((experience) => (
            <article className="experience-card reveal" key={experience.title}>
              <div>
                <p>{experience.duration} · {experience.bestFor}</p>
                <h3>{experience.title}</h3>
                <span>{experience.description}</span>
              </div>
              <strong>{experience.price}</strong>
              <a href="#contact" aria-label={`Запитване за ${experience.title}`}>
                Request this route
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="media" className="gallery section-shell">
        <div className="section-heading reveal">
          <p className="eyebrow">Immersive Gallery</p>
          <h2>A place told through river light and stone</h2>
        </div>
        <div className="gallery-grid" aria-label="Галерия Ъглен">
          {galleryItems.map((item) => (
            <figure className={`gallery-item ${item.size} reveal`} key={item.title}>
              <img src={item.image} alt={item.alt} />
              <figcaption>{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="map" className="map-section">
        <div className="section-shell map-layout">
          <div className="section-heading reveal">
            <p className="eyebrow">Explorer Map</p>
            <h2>Follow the river. Find the stone.</h2>
            <p>
              Use Aglen as a base for a slow route: village center, Vit River path,
              rock landmarks, cave terrain, and sunset viewpoints.
            </p>
          </div>
          <div className="route-map reveal" aria-label="Маршрутни точки около Ъглен">
            {mapStops.map((stop, index) => (
              <article className="map-stop" key={stop.title}>
                <strong>{index + 1}</strong>
                <div>
                  <h3>{stop.title}</h3>
                  <p>{stop.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact section-shell">
        <div className="section-heading reveal">
          <p className="eyebrow">Plan your visit</p>
          <h2>Spend a weekend where the Vit keeps its secrets.</h2>
          <p>
            Ask for routes, guided walks, photo spots, local stories, and practical visitor
            information. Aglen works best as a slow destination, not a rushed stop.
          </p>
        </div>
        <div className="contact-card reveal">
          <div>
            <strong>Visitor notes</strong>
            <span>Best for nature walks, photography, river viewpoints, caves, and local memory.</span>
            <span>Bring walking shoes, water, sun protection, and respect for private/local spaces.</span>
          </div>
          <a className="button primary" href="mailto:hello@example.com">
            Send Inquiry
          </a>
        </div>
        <footer className="site-footer">
          {sourceNotes.map((note) => (
            <span key={note}>{note}</span>
          ))}
        </footer>
      </section>
    </main>
  );
}
