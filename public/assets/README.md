# Aglen Media Assets

Source requested by the site owner:

- https://vasilevasilvena.wixsite.com/aglen

Automated access status:

- The public Wix page text was accessible and has been incorporated into the content model.
- The Wix dynamic model endpoint was accessible, but the fetched payload did not expose direct `static.wixstatic.com/media` image or video URLs.
- Web search did not reveal indexed media URLs for this specific site.
- No original media file could be downloaded safely without a direct asset URL.

Manual export needed from Wix:

1. Open the Wix editor or media manager for the Aglen site.
2. Export/download the original hero photos, gallery photos, product/craft photos, and any videos.
3. Place images in this folder using descriptive names such as `vit-river-hero.jpg`, `dupka-arch.jpg`, `sloncheto-rock.jpg`, and `crafts-aglen.jpg`.
4. Replace the placeholder gallery blocks in `src/App.tsx` with `<img>` or `<video>` tags pointing to `/assets/<file-name>`.

Attribution note:

The project assumes the site owner has rights to reuse the Wix media, as stated in the implementation request. Keep this file with the deployed project so the source and manual export status remain clear.
