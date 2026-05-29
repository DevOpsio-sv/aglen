# Ъглен / Aglen Tourist Site

Premium static tourism site for the Bulgarian village Ъглен, near the River Vit.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Cloudflare Pages

Preferred deployment target: Cloudflare Pages.

- Build command: `npm run build`
- Output directory: `dist`
- Project name: `aglen-tourism-site`

Deploy from an authenticated environment:

```bash
npx wrangler login
npm run deploy:cloudflare
```

If using the Cloudflare dashboard, connect the repository and use the same build/output settings.

## Media

The owner requested media reuse from `https://vasilevasilvena.wixsite.com/aglen`. Automated access exposed text and tour data, but not direct downloadable media URLs. See `public/assets/README.md` for the export checklist.

## Documentation

- `docs/ARCHITECTURE.md`
- `docs/DESIGN.md`
