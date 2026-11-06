# BAUST website: SEO & Core Web Vitals audit

Branch `seo-cwv-fix`. Audit run on 2026-11-06 against the live site (https://baust.edu.bd) from the
production VPS, with Lighthouse 13.6.0 using its default mobile preset (simulated slow 4G and a 4x CPU slowdown).

## Phase 1: Audit

### 1. Stack, and where things live

| Concern | Where |
|---|---|
| Framework | Laravel 12 (PHP 8.4) + Inertia 2.1 + React 19, built with Vite. Inertia SSR is running (`bootstrap/ssr/ssr.js`, started by supervisord). |
| Hosting | One Docker container (`baust_web_app`: nginx + php-fpm + SSR node) and `baust_web_mysql` (MySQL 8.4), published through a **Cloudflare tunnel** (`baust_web_tunnel`). `compose.yml` is production; `compose.local.yml` is for local dev only. |
| Web server config | `docker/nginx.conf`, copied into the image. `public/web.config` is a leftover from IIS and nginx ignores it. |
| Canonical host / redirects | Cloudflare (edge): http → https. `docker/nginx.conf`: `www.baust.edu.bd` → `https://baust.edu.bd`. No trailing-slash rule. Laravel `Route::redirect()` / closures in `routes/web.php`, and `LegacyRedirectController` (`Route::fallback`) for old WordPress URLs. |
| `<head>` tags | `resources/views/app.blade.php` + `app/Support/Seo.php`. These already produce title, description, robots, `rel=canonical` (path with no query string), Open Graph/Twitter and JSON-LD on every page. Pages can also set `<Head title>` in React, and that title wins in the browser. |
| Sitemap | `app/Http/Controllers/SitemapController.php` (`/sitemap.xml`, cached 1 h): every parameter-less GET route plus labs, clubs and notices. |
| robots.txt | `public/robots.txt` (static). |

### 2. Mobile Lighthouse, live site (before)

| Page | Perf | LCP | TBT | CLS | FCP | LCP element |
|---|---|---|---|---|---|---|
| `/` | **52** | **16.9 s** | 700 ms | 0.001 | 2.2 s | hero `<img>` `/images/hero/hero-1.jpg` |
| `/admission/tuition-fees` | 73 | 5.2 s | 310 ms | 0 | 1.8 s | intro `<p>` text |
| `/admission/admission-requirment` | 75 | 5.3 s | 190 ms | 0 | 2.1 s | requirements `<p>` text |
| `/cse/faculty` | 59 | 8.4 s | 580 ms | 0 | 2.0 s | header `<h1>` text |
| `/eng` | 69 | 9.3 s | 190 ms | 0 | 2.2 s | slider CSS `background-image` (241 KB upload) |

TTFB is 20–60 ms on every page, so the server is not the bottleneck. Lighthouse can't measure INP in a lab run; TBT stands in for it.

**Top causes, by impact:**

1. **The client throws away the SSR HTML.** `resources/js/app.tsx` mounts with `createRoot().render()`, not
   `hydrateRoot()`. The server sends fully rendered HTML, then React deletes it and renders the whole page again once
   ~180 KB (brotli) of JS has downloaded and run. So text LCP elements (tuition fees, requirements, CSE faculty)
   "arrive" only after the JS, and every page does its rendering twice on the main thread (TBT/INP).
2. **Hero slideshow loads all 7 photos up front.** `HeroBanner.tsx` renders seven stacked `<img>`s (1920 px JPEG,
   222–448 KB each, ~2.5 MB). They all compete with the LCP image on a mobile link. There's no
   `fetchpriority`, no width/height and no WebP. `loading="lazy"` can't help because the slides overlap in the viewport.
   Other large home images: `campus.jpeg` 380 KB and `VC_Sir.jpeg` 259 KB. Lighthouse estimates 2.5 MB of savings from
   better image delivery on the home page alone. Home page total weight: **6.1 MB**.
3. **Render-blocking web-font CSS from three origins:** `fonts.googleapis.com` (requested **twice**, once from `<head>`
   and once by an `@import` at the top of `app.css` that sits behind the app stylesheet), `fonts.bunny.net`
   (Instrument Sans) and `cdn.jsdelivr.net` (the bunny font files). Lighthouse puts it at **~0.8–1.2 s render-blocking**
   per page. The `@import` also loads families the site never uses (Outfit, Open Sans, IBM Plex Sans) and duplicates
   Tiro Bangla, which is already self-hosted.
4. **A 282 KB `TiroBangla-Regular.ttf` is preloaded on every page,** on top of the 80 KB woff2 of the same font. It
   is a fallback format no current browser needs, and it fights the LCP image for bandwidth.
5. **Unused JS:** about 66–86 KB per page (Lighthouse). The `app` chunk is 372 KB raw / 122 KB brotli and the Home
   chunk 197 KB raw. Main-thread work is 3–6 s (simulated), mostly script evaluation plus the double render from #1.
6. **Department slider images are CSS backgrounds** (e.g. `/eng`), so the browser only discovers the LCP image after
   JS runs. They are also user uploads (240 KB JPEG) with no responsive sizes.
7. **Third parties:** Cloudflare's bot-challenge script (`/cdn-cgi/challenge-platform/…`, 16 KB) runs on every page.
   This is a Cloudflare dashboard setting (Bot Fight Mode / JS detections), not something in the code.
8. **Compression / caching are fine at the edge.** Cloudflare serves HTML and assets with brotli, `/build/*` and
   images get `public, max-age=31536000, immutable` and `cf-cache-status: HIT`. The origin nginx has no gzip, which
   only affects the tunnel hop. A side effect in `docker/nginx.conf`: the `add_header` inside the static-assets
   `location` drops the server-level security headers for those files (an nginx inheritance rule).

### 3. Redirect chains (`curl -sI -L`)

| Start | Result | OK? |
|---|---|---|
| `http://baust.edu.bd/` | 301 → `https://baust.edu.bd/` (Cloudflare) | ✅ one hop |
| `https://www.baust.edu.bd/` | 301 → `https://baust.edu.bd/` (nginx) | ✅ one hop |
| `http://www.baust.edu.bd/` | 301 → `https://www.baust.edu.bd/` (Cloudflare) → 301 → `https://baust.edu.bd/` (nginx) | ❌ **two hops** |
| `http://www.baust.edu.bd/eng` | same two hops | ❌ |
| `https://baust.edu.bd/admission/admission-requirment/` | **200** (duplicate of the no-slash URL) | ❌ |
| `https://baust.edu.bd/admission/tuition-fees/`, `/eng/` | **200** (duplicates) | ❌ |
| `/category/notice/` | **302** → `/archive/notices` (temporary; `Route::redirect` defaults to 302) | ❌ should be 301 |
| `/category/job-notice/`, `/category/notice/page/19/`, `/admission-detail-22nd-batch/`, `/cse/category/news/` | 301 to the new page (`LegacyRedirectController`) | ✅ |
| `/wp-login.php`, `/wp-admin/`, `/feed/`, `/tag/…`, `/author/…`, `/journal/…`, `/YYYY/MM/DD/…`, missing `/wp-content/…` | 404 | ⚠️ should be 410 (gone) where nothing replaces them |

Most of the http://www impressions in Search Console come from that two-hop chain. Only Cloudflare can make it one hop,
because its http → https redirect fires before the request reaches the app (see the manual steps).

### 4. List and filter pages: canonical and robots today

| Route | Query parameters | canonical today | robots today |
|---|---|---|---|
| `/archive/notices` (`NoticeController@index`, 20 per page) | `category`, `department`, `search`, `page` | path only (good) | `index, follow` ❌ |
| `/public-relations` (`PublicRelationController@index`, 12 per page) | `department`, `search`, `page` | path only | `index, follow` ❌ |
| `/category/{slug}`, `/category/{slug}/page/N`, `/{dept}/category/{slug}` (legacy) | n/a | redirect to the notice archive / department events | n/a |
| `/{dept}/faculty?profile=…`, `/archive/notices/{slug}?dept=…` | `profile`, `dept`, `from` | path only | `index, follow` |
| Any URL with tracking or junk parameters (e.g. `/?p=123` returns the homepage with 200) | anything | path only | `index, follow` |

Login and the other auth pages are already `noindex, nofollow` (`Seo::forPage`). However, `robots.txt` has
`Disallow: /login`, so Google can't crawl `/login` and never sees that noindex. That's how a blocked URL can still
get indexed.

### Sitemap (live, 1,244 URLs)

- 6 URLs return **302**: `/me/online-education`, `/ipe/online-education`, `/ce/online-education`, `/ce/research`,
  `/ce/gallery` (closure redirects in `routes/web.php`), and `/ce/ce-society` (a controller method that redirects).
- The misspelled `/admission/admission-requirment` is listed. `/about/academic-calendar` duplicates
  `/admission/academic-calendar` (same page, same content).
- `/archive/notices/` (trailing slash) comes from one notice in the database with an empty slug.
- A sample of the remaining URLs, plus 40 random notices, all return 200. Only 17 of 1,244 URLs have `<lastmod>`.

## Phase 2: Fixes (branch `seo-cwv-fix`)

| Task | What changed | Where |
|---|---|---|
| **A. Canonical host & redirects** | www and trailing-slash URLs now 301 **in one hop** to the canonical `https://baust.edu.bd/<path>`, keeping the query string. The `Location` header is path-only, so the redirect never drops to http behind the tunnel. `rel=canonical` was already on every page (path, no query); pages served at two paths can now name their canonical one. | `docker/nginx.conf`, `config/seo.php` (`canonical`) |
| **B. Old URLs** | One data file, **`config/legacy-redirects.php`**: `paths` (old → new, registered as 301 routes) and `gone` (WordPress-only patterns that answer **410**). Former 302s (`Route::redirect`) and closure redirects moved into it. Post/category/profile permalinks are still matched against the database (`LegacyRedirectController`). nginx answers 410 for unmirrored `/wp-content/uploads/…` and `wp-*.php`/`xmlrpc.php`. **`/admission/admission-requirment` → `/admission/admission-requirements` (301)**. Navbar, home card, tuition-fees page content (JSON + a data migration) and the sitemap use the new URL. | `config/legacy-redirects.php`, `routes/web.php`, `LegacyRedirectController`, `database/migrations/2026_11_06_000000_fix_admission_requirements_links.php` |
| **C. Indexing control** | Any URL with a non-tracking query string (`?category=`, `?department=`, `?search=`, `?page=N`, …) gets `noindex, follow`, with the canonical on the plain list. `utm_*`, `gclid`, `fbclid` and `msclkid` are ignored. Sign-in pages were already `noindex`; `robots.txt` no longer blocks `/login`, so crawlers can actually read that tag. | `app/Support/Seo.php`, `public/robots.txt` |
| **D. robots.txt & sitemap** | robots.txt references the sitemap and never blocked CSS/JS. Sitemap drops the 6 redirecting URLs, the misspelled slug, the `/about/academic-calendar` alias and the empty-slug notice. `lastmod` comes from the stored `updated_at` (department, site page, lab, notice). Routes with no stored date get none rather than a made-up one. | `SitemapController` |
| **E. Titles & descriptions** | Hand-written title (≤60) and description (≤155) for `/`, `/admission/tuition-fees`, `/admission/admission-requirements`, `/admission/program-offering`, `/eng`, `/cse/faculty` in **`config/seo.php`**. They replace the generated tags in the server HTML and, through `<SeoHead>` + a shared `seo` prop, the browser tab as well. Open Graph/Twitter tags were already there and follow the same title/description. | `config/seo.php`, `Seo.php`, `app.blade.php`, `resources/js/components/seo-head.tsx` |
| **F. Structured data** | The existing `CollegeOrUniversity` JSON-LD (name, url, logo, Saidpur / Nilphamari / BD address, phone) gains `email` and `sameAs` (Facebook, YouTube, LinkedIn). Every value is taken from the Contact page / footer; no postal code is in the repo, so none was added. | `Seo::universityJsonLd()` |
| **G1. Images** | Hero: WebP at 960/1600/1920 px with `srcset`/`sizes` and width/height. Only slide 1 is server-rendered, with `fetchpriority="high"`; the others mount one step before they show. 960 px WebP copies for other home-page photos (campus, VC, hall, medical centre, …); originals kept for the gallery. Department home pages preload slide 1 and defer the rest. Below-the-fold photos are `loading="lazy"`, which also stops React 19 auto-preloading them. **The favicon was the 1 MB, 2048 px `BAUST logo.png`**; it now uses the existing 64/192 px icons. | `HeroBanner.tsx`, `Department/Show.tsx`, home components, `public/images/**.webp` |
| **G2. Render-blocking CSS / fonts** | Fonts are self-hosted: Instrument Sans (variable), Poppins 400–700 and EB Garamond 700, latin + latin-ext woff2, `font-display: swap`, body font preloaded. Removed the three font origins (Google ×2, bunny, jsdelivr), the unused families and the 282 KB TTF preload. | `resources/css/app.css`, `public/fonts/`, `app.blade.php` |
| **G3/G4. JS & main thread** | **`hydrateRoot` instead of `createRoot().render()`**: the SSR HTML is adopted, not thrown away and re-rendered. No hydration errors in any Lighthouse run. | `resources/js/app.tsx` |
| **G5. Compression & caching** | Origin gzip, plus webp/avif in the 1-year immutable cache rule. Security headers are kept on static files. (Cloudflare already did brotli and caching at the edge.) | `docker/nginx.conf` |

Tests: `tests/Feature/SeoTest.php` covers redirects, 410s, noindex filters, title overrides, the canonical alias and the
sitemap. The full suite passes (see the results section).

## Phase H: Lighthouse before → after

**Method.** Mobile preset, Lighthouse 13.6.0, Chromium 1243 headless, median of 3 runs. Both builds ran side by side
on the VPS in an isolated stack: one MySQL loaded from `backup.sql`, the live uploads mounted read-only, no Cloudflare.
*Before* = `main` (32bb326); *after* = `seo-cwv-fix`. Both are clean `git archive` exports, so other uncommitted
work isn't included. Runs were sequential. INP can't be measured in a lab run; TBT and total main-thread work stand in
for it.

| Page | Perf score | LCP | TBT | CLS | FCP | Page weight | Main-thread work |
|---|---|---|---|---|---|---|---|
| `/` | 53 → **65** | 13.5 s → **6.1 s** | 360 → 519 ms | 0.001 → 0.001 | 4.4 → **0.8 s** | 6.7 MB → **0.96 MB** | 4.6 → **3.5 s** |
| `/admission/tuition-fees` | 66 → **96** | 8.6 s → **0.8 s** | 70 → 242 ms | 0 → 0.001 | 3.8 → **0.8 s** | 2.4 MB → **0.38 MB** | 2.6 → **1.8 s** |
| `/admission/admission-requirements`¹ | 67 → **99** | 8.3 s → **0.9 s** | 67 → 131 ms | 0 → 0 | 3.6 → **0.9 s** | 2.4 MB → **0.51 MB** | 2.5 → **1.8 s** |
| `/cse/faculty` | 67 → **95** | 5.2 s → **1.2 s** | 100 → 248 ms | 0 → 0 | 5.2 → **1.2 s** | 2.7 MB → **0.48 MB** | 3.8 → **2.2 s** |
| `/eng` | 66 → **81** | 13.4 s → **4.5 s** | 64 → 195 ms | 0 → 0 | 3.9 → **0.8 s** | 3.2 MB → **0.54 MB** | 2.5 → **1.7 s** |

¹ Before: `/admission/admission-requirment` (the old URL).

The live site, measured through Cloudflare before any change (phase 1), scored 52 / 73 / 75 / 59 / 69, with LCP of
16.9 / 5.2 / 5.3 / 8.4 / 9.3 s.

**Why TBT went up while main-thread work went down.** TBT only counts long tasks *after* first paint. Before, first
paint waited ~4 s for the font CDNs, so React's work ran before it and wasn't counted. Now the page paints at
~0.8 s and hydration falls inside the window. Total main-thread work is 25–43 % lower on every page, and no run
logged a console error (React reports hydration mismatches there).

**What still holds the home page and `/eng` back:**
- **Home:** the DOM is large (267 KB of HTML, mostly Tailwind class attributes and 180 inline SVG icons), with ~1 s of
  style/layout and ~1.1 s of script on a 4× slowed CPU. The next steps are code changes with design impact:
  render the below-the-fold sections (facilities carousel, notices, VC section) only when scrolled near, and move
  heavy icon sets to a sprite.
- **`/eng` and the other department pages:** the LCP image is a user upload (e.g. a 241 KB JPEG at full camera size).
  The lasting fix is to resize and convert uploads to WebP when they are saved in the admin, which is a separate
  change to the upload pipeline.
- **JS:** `app` is ~120 KB brotli, and Lighthouse finds ~65–85 KB unused per page. Splitting the shared layout
  (navbar mega-menu, footer) out of the entry chunk is the next lever.

## Manual steps on the server / outside this repo

1. **Deploy:** `docker compose up -d --build` on the VPS (without the `-f compose.local.yml` flags). The entrypoint runs
   the new migration (it rewrites one link in `site_pages`). Then purge the Cloudflare cache, or at least
   `/`, `/sitemap.xml` and `/robots.txt`.
2. **Cloudflare (http://www → one hop):** `http://www.baust.edu.bd` takes two hops because Cloudflare's *Always Use
   HTTPS* fires before the request reaches nginx. Add a **Redirect Rule** (Rules → Redirect Rules): hostname equals
   `www.baust.edu.bd` → dynamic `concat("https://baust.edu.bd", http.request.uri.path)`, status 301, preserve query
   string. Place it first. If Always Use HTTPS still runs first in your plan, turn it off and add a second rule for
   `http://baust.edu.bd/*` → `https://baust.edu.bd/${path}`.
3. **Cloudflare bot script:** `/cdn-cgi/challenge-platform/…` (JS detections / Bot Fight Mode) runs on every page view.
   If it isn't needed for this site, turning it off removes a third-party script from every page.
4. **Search Console:** submit `https://baust.edu.bd/sitemap.xml` again. Use URL Inspection on `/`,
   `/admission/tuition-fees` and `/admission/admission-requirements` to request recrawls. Check the "Excluded by
   noindex" report fills with the filter URLs.
5. **Other subdomains** (separate apps, not in this repo; nothing was edited). For each of `student.`, `hall.`, `ems.` and
   `management.baust.edu.bd`:
   - add `<meta name="robots" content="noindex, nofollow">` to the login, forgot-password and every other authenticated page, or send an
     `X-Robots-Tag: noindex, nofollow` header for the whole host from its web server;
   - make sure their `robots.txt` does **not** `Disallow` those pages (or Google can't see the noindex);
   - after deploy, use Search Console → Removals for the already indexed login URLs.
6. **`public/web.config`** is an IIS leftover that nginx ignores. It can be deleted when convenient.

## Open questions

- **`/journal/…` URLs** (old journal site, e.g. `/journal/category/…`) currently return 404. Should they 301 to
  `/research` (the Research & Publication page with the research cell), or answer 410? The repo has no new journal
  page to map them to. It's a one-line entry in `config/legacy-redirects.php` either way.
- **"2026" in the tuition-fees title** follows the brief. The fee page content itself carries no year (only 2019/2022
  policy dates). Update `config/seo.php` once the fees are re-confirmed each session.
