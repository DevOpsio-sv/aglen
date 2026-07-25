# Site Audit — Aglen Tourism (aglen.bg / ъглен.com)

**Audited:** 2026-07-25 · **Scope:** Technical SEO, Performance, Content/On-page, Accessibility & UX
**Primary domain:** `xn--c1aerj5d.com` (**ъглен.com**, Cyrillic IDN) · **Secondary/entry domain:** `aglen.bg`
**Languages:** 14, published under `/<lang>/` · **Platform:** Cloudflare (static + `_worker.js`)

This is an independent, external audit run against the live site. It complements — and in
places overlaps with — your own Phase 1 (`seo-audit-2026-07-24.md`) and Phase 2 knowledge
architecture. Where your docs already reached the same conclusion, that is noted.

## What I could and could not verify

| Verified live | Method |
|---|---|
| HTTP responses, redirects, canonical, meta, OG/Twitter tags | Direct fetch of home, `/en/`, guides, about, local-businesses, root |
| robots.txt, llms.txt, sitemap reference | Direct fetch |
| Domain / canonical strategy, content quality, E-E-A-T posture | Direct reading |

| Could **not** verify (no rendering browser / PageSpeed timed out) | How to close the gap |
|---|---|
| `hreflang` tags (critical for 14 languages) | View source or GSC → International Targeting |
| JSON-LD structured data presence/validity | Rich Results Test / `view-source` |
| Core Web Vitals (LCP/INP/CLS), real load numbers | PageSpeed Insights + Search Console |
| Colour contrast, alt text, keyboard nav, focus states | Lighthouse/axe + manual pass |

Anything below marked 🔶 is a strong inference that should be confirmed before acting; ✅ is
verified from the live site; 🔴 is a confirmed problem.

---

## Executive summary

The site is **well above the norm** for a village tourism site. Content is disciplined,
sourced, and honest (the "what is not published" and editorial-policy pages are genuinely
best-practice E-E-A-T). The technical shell is clean: one H1 per page, correct
`meta robots`, self-referencing canonicals per language, Cloudflare CDN.

The problems that matter are **strategic, not cosmetic**, and there are three:

1. **The domain you call "my site" (`aglen.bg`) cannot rank.** Every canonical, `og:url`,
   Twitter tag and the sitemap point to `ъглен.com`. Google will consolidate all authority
   to `ъглен.com` and treat `aglen.bg` as a duplicate. You must consciously decide which
   domain is the brand — and there is a strong case it should *not* be the Cyrillic IDN.
2. **robots.txt contradicts itself.** Two `User-agent: *` blocks and conflicting rules for
   the same AI crawlers (one Disallows ClaudeBot/GPTBot/Google-Extended, the next Allows
   them). Behaviour is undefined and fragile.
3. **The site's real subject has no pages.** The nine Wikidata-verified places (Prohodna,
   Karlukovo, Lukovit…) exist only as links in `llms.txt`. This is the single largest
   ranking opportunity and matches your own Phase 2 finding #2.

Fix #1 and #2 this week (small, high-leverage). #3 is the multi-month content programme
your Phase 2 docs already scope.

---

## Priority actions

| P | Action | Area | Effort | Why it matters |
|---|---|---|---|---|
| **P0** | Decide the canonical domain, then **301-redirect** the other to it (not just cross-canonical) | Technical | S (decision) / M (impl) | Two live 200 domains with cross-domain canonicals dilutes signals and risks the wrong domain "winning" |
| **P0** | Rewrite robots.txt into **one coherent policy**; remove the duplicate `User-agent:*` group and resolve the ClaudeBot/GPTBot/Google-Extended contradiction | Technical | S | Undefined crawler behaviour; may block AI-search inclusion you appear to want |
| **P1** | Verify + fix **hreflang** across all 14 languages (reciprocal + `x-default`) | Technical | M | Wrong-language pages in SERPs; wasted crawl on a 14-lang site |
| **P1** | Add **JSON-LD** to key templates: `TouristAttraction`/`Place`, `LocalBusiness`, `Article`, `BreadcrumbList`, `Organization` (+ `sameAs` Wikidata) | Technical/Content | M | You have the entities and IDs; schema is how they become citable |
| **P1** | Rework **title tags** to lead with what people search (Ъглен, Проходна, река Вит) instead of the campaign name "AR мисии / AR Quests" | Content | S | Current titles omit the primary keywords entirely |
| **P1** | Build the **9 region entity pages** (Prohodna, Karlukovo, Lukovit, Zlatna Panega, Vit, Devetashka, Krushuna, Lovech, Iskar–Panega geopark) | Content | L | The site's actual subject; largest authority gain |
| **P2** | Publish the **4 "in preparation" guides** (Vit river, caves & rocks, nearby, seasonal) | Content | M | Thin coverage vs. plan; internal-link targets |
| **P2** | Fix **truncated meta descriptions** (home ends in "…") and reconcile brand: `og:site_name` = "AR мисии" vs author = "Ъглен Туризъм" | Content | S | Cleaner SERP snippet + one consistent brand entity |
| **P2** | Run **PageSpeed + Lighthouse accessibility** and act on findings | Perf/A11y | S–M | Get real CWV and contrast/alt/focus data |
| **P3** | Drop the obsolete `meta keywords` tag | Technical | S | Ignored by Google; slight bloat |

---

## 1. Technical SEO

### 1.1 Domain & canonical strategy — 🔴 the central issue

Every page on `aglen.bg` returns **200 OK** but declares its canonical, `og:url`, Twitter
URL and sitemap on **`ъглен.com`** (`xn--c1aerj5d.com`). Verified on: home (bg + en),
`/guides/beautiful-places/`, `/about/`, `/local-businesses/`, and the root (which internally
rewrites `/` → `/bg`).

Consequences:

- Google will **consolidate all ranking signals to `ъглен.com`** and index `aglen.bg` only
  as a canonicalised duplicate. If your mental model is "aglen.bg is my site," the setup is
  working against you.
- Cross-domain canonicals are a *hint*, not a directive. A cleaner, unambiguous setup is a
  **301 redirect** from the non-primary domain to the primary one.

**The deeper question: is a Cyrillic IDN the right primary?** Choosing `ъглен.com` as the
canonical home has real, well-documented drawbacks for an international, 14-language audience:

- Browsers, link-preview bots and many tools display it as `xn--c1aerj5d.com` — which reads
  like phishing/spam and erodes click-through and trust.
- Users on non-Cyrillic keyboards (most of your 13 non-Bulgarian languages) cannot type it.
- IDN handling in email, social platforms, and some backlink sources remains inconsistent;
  inbound links may render as ugly punycode.

A Latin `.bg` (or `.com`) domain is generally the safer canonical for reach and trust, with
the Cyrillic domain kept as a redirecting alias. **Recommendation:** unless there is a
specific reason to favour `ъглен.com`, make **`aglen.bg` the canonical primary** and
301-redirect `ъглен.com` → `aglen.bg`. Whatever you choose, pick one and redirect the other.

> Action: choose primary → set self-referencing canonicals on it → 301 the other domain →
> in Google Search Console, verify **both** properties, set the primary, submit the sitemap
> on the primary, and use the Change-of-Address tool if you switch.

### 1.2 robots.txt — 🔴 self-contradictory

The live file contains **two separate rule sets**:

1. A **Cloudflare "Managed content"** block: `User-agent: *` with
   `Content-Signal: search=yes,ai-train=no`, then **Disallow** for Amazonbot,
   Applebot-Extended, Bytespider, CCBot, **ClaudeBot**, **CloudflareBrowserRenderingCrawler**,
   **Google-Extended**, **GPTBot**, meta-externalagent.
2. Your **own** block: a second `User-agent: *` `Allow: /`, then explicit **Allow** for
   GPTBot, OAI-SearchBot, ChatGPT-User, Google-Extended, ClaudeBot, Claude-Web,
   Claude-SearchBot, PerplexityBot, Applebot, Applebot-Extended, Bingbot, CCBot…

Problems:

- **Direct contradiction** for GPTBot, ClaudeBot, Google-Extended, CCBot,
  Applebot-Extended: Disallowed in block 1, Allowed in block 2. Merging behaviour differs by
  crawler; the result is undefined. Given your `llms.txt` and stated intent to *be cited by
  AI assistants*, the Cloudflare block is fighting you.
- **Two `User-agent: *` groups** is malformed; consolidate into one.
- `Content-Signal: ai-train=no` contradicts your comment and Allow rules that explicitly
  grant training — decide and state it once.
- `CloudflareBrowserRenderingCrawler: Disallow` may block Cloudflare's own rendering
  features you might rely on.

> Action: replace with a single, coherent robots.txt — one `User-agent: *` policy, one set
> of per-bot rules that matches your actual intent, one `Sitemap:` line on the chosen primary
> domain. If the Cloudflare-managed block is being auto-injected, disable that feature so it
> stops overwriting your policy.

### 1.3 Sitemap — 🔶

`robots.txt` and `llms.txt` both point to `ъглен.com/sitemap.xml` (a per-language sitemap
index). The fetch returned gzip/binary, which is valid but I couldn't parse it. After the
domain decision, ensure the sitemap lists **primary-domain** URLs only and is resubmitted in
GSC. Confirm every indexable page is listed and no canonicalised-away duplicates are.

### 1.4 hreflang — 🔶 high importance, unverified

With 14 languages this is make-or-break and I could not see the tags via fetch. Confirm each
page carries reciprocal `hreflang` for all language variants plus `hreflang="x-default"`, and
that the URLs use the chosen primary domain. Missing/one-way hreflang on a multilingual site
causes wrong-language results and crawl waste. Check in GSC → Legacy tools & reports →
International Targeting, or view-source on any page.

### 1.5 Structured data (JSON-LD) — 🔶 likely missing, high value

Could not confirm any schema on live pages. You already hold the hard part — verified
entities with Wikidata IDs and coordinates. Add:

- `TouristAttraction` / `Place` on each region entity page, with `geo`, `sameAs`
  (Wikidata + Wikipedia), `containedInPlace`.
- `LocalBusiness` (correct subtype) on each of the 13 business listings.
- `Article` on guides; `BreadcrumbList` sitewide; `Organization` (publisher = Aglen
  Tourism / DevOpsio) once.

Validate with the Rich Results Test. This is what turns your careful content into something
an engine or assistant will cite.

### 1.6 Smaller technical notes

- ✅ `meta robots` = `index,follow` with good snippet directives; per-language
  self-referencing canonical logic is correct in principle.
- ✅ Root `/` correctly language-routes to `/bg`.
- 🔴 Obsolete `meta keywords` present and stuffed (includes the whole description) — remove.
- 🔶 `og:locale:alternate` only lists `hu_HU` on every page — for 14 languages it should list
  all alternates (or be dropped in favour of hreflang). Minor, but inconsistent.

---

## 2. Performance & Core Web Vitals — 🔶 not measured

PageSpeed Insights timed out through the audit tooling and no rendering browser was
connected, so I have **no lab or field numbers**. Structural signals are positive: static
site on Cloudflare's CDN with a worker, which usually yields strong TTFB and LCP.

Things to check when you run PageSpeed / Lighthouse (mobile + desktop):

- **LCP image:** the default OG/hero assets are large (e.g. the beautiful-places OG is a
  1536×1024 PNG). Ensure hero/LCP images are compressed, correctly sized, served as
  WebP/AVIF, and `fetchpriority="high"`; lazy-load below-the-fold images.
- **CLS:** confirm width/height (or aspect-ratio) on all images and reserved space for any
  late-loading UI (the AR/quest widgets, maps).
- **INP:** watch JS from any AR/interactive components; defer non-critical scripts.
- **Fonts:** `font-display: swap`, preconnect, subset for Cyrillic + Latin.

> Action: run https://pagespeed.web.dev on the primary domain for `/bg/` and `/en/` and one
> guide; add the domain to Search Console → Core Web Vitals for field data over time.

---

## 3. Content & on-page SEO

### 3.1 Strengths — keep doing this

Content is a real asset: specific, locally-grounded, and unusually honest. The `/about/`,
editorial-policy and "what is not published" sections (no invented travel times, legends
labelled as legend, businesses human-verified) are textbook **E-E-A-T** and rare at this
scale. Guides read as written by someone who has stood on the rock edge, not scraped from
Wikipedia. This is your durable moat.

### 3.2 Title tags — 🔴 optimise for intent

Current titles lead with the **campaign**, not the **query**:

- Home: *"Скритото съкровище на река Вит | AR мисии"* / *"The Hidden Treasure of the Vit
  River | AR Quests"*

People search **"Ъглен село", "Проходна пещера / Очите на Бога", "река Вит", "Карлуково",
"пещери Ловешко"** — none of which appear in the home title, and the site name "AR мисии" is
not a query anyone types. Keep the evocative brand, but front-load the searchable terms:

- e.g. *"Ъглен — село край река Вит: пещери, каньони и природа | Aglen Tourism"*
- Entity pages: *"Пещера Проходна (Очите на Бога) — как да стигнеш, история | Aglen"*

### 3.3 Meta descriptions & brand consistency — P2

- Home description is **truncated mid-word with "…"** — write a complete, ~150-char sentence.
- **Brand is split:** `og:site_name` = "AR мисии / AR Quests" while `meta author` =
  "Ъглен Туризъм / Aglen Tourism". Pick one brand entity (I'd use *Aglen Tourism / Ъглен
  Туризъм*, which matches `llms.txt` and the about page) and use it consistently in
  `og:site_name`, `Organization` schema, and titles. "AR Quests" can be a product/campaign
  sub-brand, not the site identity.

### 3.4 The missing entity pages — 🔴 biggest opportunity

Your own Phase 2 nailed this: the nine externally-verified places have Wikidata IDs and
coordinates but **no URLs**. They appear only as links in `llms.txt`. Prohodna alone (the
"Eyes of God") has real search demand you're currently sending to Wikipedia. Build a page per
entity — Prohodna, Karlukovo, Lukovit, Zlatna Panega, the Vit, Devetashka, Krushuna, Lovech,
Iskar–Panega geopark — each with its own content, `Place`/`TouristAttraction` schema, `sameAs`
Wikidata, and internal links to/from the relevant guides. This is where topical authority is
won.

### 3.5 Thin coverage vs. plan — P2

Four guides are live-linked but marked **"in preparation"** (Vit river, caves & rocks, nearby
destinations, seasonal). Publishing them fills obvious query gaps and gives the entity pages
internal-link targets. Prioritise Vit river and caves & rocks (highest intent).

---

## 4. Accessibility & UX — 🔶 mostly unverified

Positive signals from markup: one H1 per page, descriptive `og:image:alt` text (suggests alt
discipline), `color-scheme` and `theme-color` set, `viewport` correct. Your master spec also
mandates subtitles, large readable text, and no meaning locked in audio/visual only — good
intent that must be confirmed *on the website itself*, not just the app.

Cannot verify without rendering; test these:

- **Contrast:** the dark-green theme (`#20392f`) on light backgrounds — verify text/link
  contrast meets WCAG AA (4.5:1 body, 3:1 large).
- **Images:** confirm every content image has meaningful `alt` (empty `alt=""` for
  decorative).
- **Keyboard & focus:** visible focus rings, logical tab order, skip-to-content link,
  operable AR/quest widgets and any map without a mouse.
- **Language:** each localized page must set the correct `<html lang="…">`; language switcher
  should be keyboard-operable and labelled.
- **Motion:** honour `prefers-reduced-motion` for cinematic/AR animations.
- **Targets:** ≥24×24px tap targets on mobile nav.

> Action: run Lighthouse Accessibility + the axe DevTools extension on `/bg/`, one guide, and
> a business listing; fix flagged issues. These tools catch ~40% of issues — add a 15-minute
> keyboard-only pass for the rest.

---

## 5. Suggested sequencing

**Week 1 (small, high-leverage):** decide primary domain + implement 301s; rewrite robots.txt;
remove `meta keywords`; fix home meta description; run PageSpeed + Lighthouse to get baselines.

**Weeks 2–4:** verify/fix hreflang; add JSON-LD to templates; rework title tags; reconcile
brand name; act on the top PageSpeed/accessibility findings.

**Month 2+:** build the 9 entity pages (schema + Wikidata `sameAs` + internal links); publish
the 4 in-preparation guides. This is the content programme your Phase 2 roadmap already
sequences — the technical fixes above make sure it lands on a domain that can actually rank.

---

## 6. Verification checklist (close the unknowns)

- [ ] View-source a page: confirm `hreflang` (reciprocal + `x-default`) and JSON-LD presence.
- [ ] Rich Results Test on home, a guide, a business listing.
- [ ] PageSpeed Insights (mobile+desktop) on primary domain; record LCP/INP/CLS.
- [ ] GSC: verify both domains, confirm which is indexed, check Coverage for duplicate/
      canonical warnings, submit sitemap on primary.
- [ ] Confirm sitemap lists only primary-domain, indexable URLs.
- [ ] Lighthouse Accessibility + axe on 3 page types; keyboard-only pass.
- [ ] Decide and document the AI-crawler policy; make robots.txt + `Content-Signal` say it once.

---

*Report reflects the live site on 2026-07-25. Items marked 🔶 are inferences pending the
verification steps in §6; act on 🔴 items with confidence.*
