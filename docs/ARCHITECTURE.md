# Aglen Tourist Site Architecture

## Goal

Build a premium, fast, static tourism website for Ъглен / Aglen: history, geography, legends, natural landmarks, local crafts, tours, and future media from the owner's Wix site.

## Stack

- Vite + React + TypeScript for a small static app.
- CSS custom properties for a durable visual system.
- Static deployment target: Cloudflare Pages.
- Public assets live in `public/assets` and are served from `/assets/...`.

## Structure

- `src/App.tsx` composes the one-page experience and section order.
- `src/content.ts` stores editable tourism content: highlights, landmarks, experiences, timeline, and source notes.
- `src/styles.css` owns the full visual system, responsive layout, premium effects, and reduced-motion rules.
- `public/assets/README.md` and `public/assets/media-manifest.json` document the Wix media source and export status.
- `wrangler.toml` configures Cloudflare Pages build output.

## Content Model

The site is intentionally content-driven. New landmarks, services, and historical notes should be added to `src/content.ts` first, then rendered by the existing card grids.

Current content covers:

- The village identity as the only Bulgarian village beginning with `Ъ`.
- River Vit geography, limestone caves, canyon landscape, Dупката, Слончето, Червена стена, Рачков вир.
- Historical layers: prehistoric cave evidence, Roman road, Kalето, local migration legend, 1877 memory, church history.
- Wix service list: canyon tour, photo session, fishing lesson, weekend packages, student trips, herb lecture.

## UI/UX Design

The design direction is premium rural tourism: warm, quiet, natural, and tactile.

- Visual language: river teal, leaf green, clay orange, sand background, soft grain grid.
- Layout: sticky glass navigation, immersive hero, fact cards, timeline, landmark cards, experience cards, media panel, contact/source panel.
- Interaction: tasteful hover lift, glass/blur panels, atmospheric mist, mountain/river hero layers, entrance transitions.
- Accessibility: semantic sections, readable contrast, keyboard focus via native links, no motion-critical content, `prefers-reduced-motion` support.

## Media Strategy

The user stated the Wix site belongs to them and requested reuse of all available media from:

https://vasilevasilvena.wixsite.com/aglen

What was accessible:

- Public Wix page text.
- Public service/tour names and prices.
- Wix dynamic model response.

What was not accessible automatically:

- Direct image/video URLs.
- Downloadable `static.wixstatic.com/media` links for this site.

Implementation response:

- Media slots are designed and ready in the UI.
- Asset folder and manifest are prepared.
- Manual Wix export steps are documented in `public/assets/README.md`.

## Deployment Architecture

Cloudflare Pages should build and host the static app.

- Build command: `npm run build`
- Output directory: `dist`
- Project name: `aglen-tourism-site`
- Deploy command: `npm run deploy:cloudflare`

If Cloudflare authentication is unavailable locally, run:

```bash
npx wrangler login
npm run deploy:cloudflare
```

For Git-connected Pages, use the same build command and output directory in the Cloudflare dashboard.
