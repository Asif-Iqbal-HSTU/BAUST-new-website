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
