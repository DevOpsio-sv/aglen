import fs from "node:fs";
import path from "node:path";

// ─────────────────────────────────────────────────────────────
// One web app manifest per language.
//
// There used to be one, and it said `start_url: "/bg/?source=pwa"`. A visitor
// reading the site in German could install it and the icon would open
// Bulgarian — the install threw away the one choice they had already made.
//
// The icons, the colours and the categories are shared, because they are
// properties of the site rather than of a language. What varies is the four
// fields a language actually owns: where it starts, what it is called, what it
// says it is, and where its shortcuts go.
//
// `id` varies with `start_url` on purpose. It is the key a browser uses to
// decide whether two manifests describe the same app; keeping it constant would
// make the fourteen collide, and installing one would overwrite another.
// ─────────────────────────────────────────────────────────────

export function writeManifests(distDir, publicDir, languages, { seo, routes, content }) {
  const base = JSON.parse(fs.readFileSync(path.join(publicDir, "site.webmanifest"), "utf8"));

  for (const language of languages) {
    const copy = content[language];
    const home = routes.buildRoutePath(language, "home");
    const manifest = {
      ...base,
      name: `${copy.brand.name} — ${copy.brand.subtitle}`,
      short_name: copy.brand.name,
      description: seo.getSEOConfig(language, "home").description,
      start_url: `${home}?source=pwa`,
      id: `${home}?source=pwa`,
      lang: language,
      shortcuts: [
        {
          name: copy.landmarks.eyebrow,
          short_name: copy.nav.landmarks,
          description: copy.landmarks.text,
          url: routes.buildRoutePath(language, "attractions"),
          icons: [{ src: "/assets/icon-192.png", sizes: "192x192" }],
        },
        {
          name: copy.ub.homeHeading,
          short_name: copy.nav.quests,
          description: copy.ub.homeText ?? copy.app.text,
          url: routes.buildRoutePath(language, "arMissions"),
          icons: [{ src: "/assets/icon-192.png", sizes: "192x192" }],
        },
      ],
    };
    fs.writeFileSync(path.join(distDir, `site-${language}.webmanifest`), `${JSON.stringify(manifest, null, 2)}\n`);
  }

  return languages.length;
}

/** The manifest a page of this language should link. */
export function manifestHref(language) {
  return `/site-${language}.webmanifest`;
}
