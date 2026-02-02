# Performance Optimization Strategies

Analysis and recommendations for making the site load **lightning fast** on desktop, mobile, low-end PCs, and 3G connectivity.

---

## Current state (summary)

| Area | Status | Notes |
|------|--------|--------|
| **Build** | Static (SSG) | 32 pages, ~53 MB dist (mostly optimized images) |
| **JS** | ~15.5 kB gzipped | ClientRouter (~4.5 kB); Lightbox/ContactForm deferred to idle |
| **Images** | Sharp + WebP + lazy | Hero `fetchpriority="high"`; below-fold + prose `loading="lazy"` |
| **Fonts** | Self-hosted (@fontsource) | Inter + Playfair in `global.css`; no external font requests |
| **Analytics** | gtag (deferred) | Loaded after `window.load`; does not block LCP |
| **Prefetch** | Enabled | `prefetch: true` in astro.config.mjs |
| **Caching** | Configured | Netlify: `/_astro/*` immutable; HTML short cache; SW no-cache |

---

## 1. Fonts (high impact on 3G / low-end)

**Issue:** Google Fonts are loaded from `fonts.googleapis.com` and `fonts.gstatic.com`. On 3G this adds ~200–500 ms+ and can block rendering until CSS is fetched.

**Strategies:**

- **A. Self-host fonts (recommended)**  
  You already have `public/fonts/` (Atkinson). Either:
  - Use Atkinson for body/headings and drop Google Fonts, or
  - Download Inter + Playfair (e.g. [google-webfonts-helper](https://gwfh.mranftl.com/fonts)) and serve from `/fonts` with `font-display: swap`.
  - In `global.css`, replace `@import`/link with `@font-face` pointing to `/fonts/...`. Removes DNS + TLS to Google and reduces blocking.

- **B. If keeping Google Fonts**  
  - Use `display=swap` (already in URL).  
  - Load the CSS **async**: `<link rel="preload" as="style" href="..." onload="this.rel='stylesheet'" />` and add a `<noscript>` fallback so fonts still load when JS is off.  
  - Optionally preconnect only when you’re about to use fonts (e.g. after LCP) to avoid competing with critical path.

**Quick win:** Self-host or async load + preconnect; ensure `font-display: swap` so text is visible immediately.

---

## 2. Third-party scripts (high impact on low-end / 3G)

**Issue:** Google Analytics (`gtag/js`) is loaded in `<head>` and can block or delay parsing.

**Strategies:**

- **A. Defer analytics until after load**  
  Load gtag with `defer` or inject the script after `window.addEventListener('load', ...)` (or after a short delay / `requestIdleCallback`) so it doesn’t compete with LCP.

- **B. Use a lightweight proxy or consent-first load**  
  If you add a cookie banner later, load gtag only after consent; until then, defer is the minimal change.

**Quick win:** Move gtag to load after `load` or idle; keep config in a small inline script that runs later.

---

## 3. Images (critical for LCP and 3G)

**Current:** Hero/feature images use `<Image>` (Sharp) and `fetchpriority="high"` where appropriate. Below-the-fold images are not consistently lazy.

**Strategies:**

- **A. Lazy load below-the-fold images**  
  - **PostCard:** Use `loading="lazy"` for card images (first 1–2 can stay eager on homepage if above the fold).  
  - **Index:** Thumbnail at bottom of page: `loading="lazy"`.  
  - **Blog list:** All cards are below fold after the first few; use `loading="lazy"` for cards.

- **B. Sizes and formats**  
  - Astro `<Image>` already generates WebP and srcset. Ensure `width`/`height` (or `aspect-ratio`) are set everywhere to avoid layout shift (you’re mostly good).  
  - For very large hero images, consider a slightly lower default width (e.g. max 1200px for “above the fold” if your layout doesn’t need 1920px).

- **C. Inline images in Markdown/MDX**  
  - Content body images (e.g. `![alt](../../assets/...)`) are rendered by the content pipeline. If they output plain `<img>`, they don’t get Astro Image optimization.  
  - Option: use an MDX component that maps markdown images to `<Image>` (or a wrapper that adds `loading="lazy"`, `width`, `height`, and optionally passes through Astro’s image pipeline).  
  - External URLs (e.g. Quora) cannot be optimized by your build; consider self-hosting critical ones or leaving as-is and relying on lazy load.

- **D. Decode and priority**  
  - Hero image: keep `fetchpriority="high"` and optionally `decoding="async"`.  
  - Below-fold: `loading="lazy"` + `decoding="async"` is default-friendly.

**Quick wins:** Add `loading="lazy"` to PostCard images and to any below-fold `<img>`/`<Image>` (e.g. index thumbnail). Ensure no layout shift with dimensions.

---

## 4. CSS (medium impact on low-end)

**Current:** Single global CSS (Tailwind + typography) imported in BaseHead; no critical-CSS extraction.

**Strategies:**

- **A. Keep single bundle**  
  Astro + Vite already bundle and minify. For a blog, one CSS file is usually fine and cacheable.

- **B. Reduce unused CSS**  
  Tailwind purges by default. If you add more third-party component CSS, keep it minimal and scoped.

- **C. Optional: inline critical CSS**  
  For “instant” first paint on 3G, you could inline the CSS for above-the-fold (e.g. layout, fonts, hero) and defer the rest. Higher effort; only consider if LCP is still slow after fonts/images/JS optimizations.

**Quick win:** None required immediately; monitor LCP. If needed later, consider inlining only the minimal critical rules.

---

## 5. JavaScript (medium impact on low-end)

**Current:** ClientRouter (view transitions) ~13 kB; small page chunks; Lightbox and ContactForm scripts only on pages that need them.

**Strategies:**

- **A. View transitions**  
  ClientRouter improves perceived navigation but costs ~4.5 kB gzipped and some main-thread work. If you target very low-end devices, consider disabling `ClientRouter` (or making it conditional, e.g. `prefers-reduced-motion` or a feature check) so full navigations stay pure HTML with no extra JS.

- **B. Defer non-critical scripts**  
  Lightbox and ContactForm run on DOM ready. You could attach them on `requestIdleCallback` or after `load` so they don’t compete with LCP. Risk: lightbox/forms might feel a tiny bit delayed; acceptable for 3G.

- **C. Legacy service worker cleanup**  
  The script that unregisters old workers runs on idle; fine. Once most users are off the old site, remove it to trim HTML and avoid any edge-case reloads.

**Quick wins:** Consider disabling or conditioning ClientRouter for low-end; defer Lightbox/ContactForm init to idle or after load if you measure improvement.

---

## 6. Caching and delivery (high impact on repeat visits and 3G)

**Current:** Netlify; only explicit headers are no-cache for `sw.js` and `service-worker.js`. Static assets under `_astro` have no long-lived cache.

**Strategies:**

- **A. Cache static assets long-term**  
  - `/_astro/*`: immutable build hashes; safe to cache 1 year.  
  - `Content-Type: ...` and `Cache-Control: public, max-age=31536000, immutable` for `/_astro/*`.  
  - HTML: short cache or no cache (e.g. `max-age=0, must-revalidate` or 300 s) so content updates are visible.

- **B. Compression**  
  Netlify usually serves Brotli/Gzip. Ensure “Compress assets” (or equivalent) is on. No code change if already enabled.

- **C. Preconnect / DNS-prefetch**  
  You already preconnect to Google Fonts. If you defer or remove fonts, remove these. If you keep GA deferred, add `rel="preconnect"` for `https://www.googletagmanager.com` only when you’re about to load gtag (or leave it if you load GA on every page after load).

**Quick win:** Add Netlify headers so `/_astro/*` gets `Cache-Control: public, max-age=31536000, immutable` and HTML gets a short cache. Reduces repeat-visit payload on 3G.

---

## 7. Markdown/MDX content images

**Current:** Inline images in posts use markdown syntax; output is standard `<img>` unless you use a custom component.

**Strategies:**

- **A. Custom image component in MDX**  
  - Create an `Image` or `Figure` component that uses `astro:assets` or a fixed-size wrapper with `loading="lazy"` and explicit dimensions.  
  - In MDX config, map `img` (or a custom syntax) to this component so body images get lazy loading and optional optimization.

- **B. Lazy loading by default**  
  If you can’t swap to a component, at least add a small build or runtime step that sets `loading="lazy"` on prose images (e.g. via `rehype` or a script). Ensures below-the-fold content images don’t block LCP.

**Quick win:** Rehype plugin or manual pass to add `loading="lazy"` to `main .prose img` if they’re not already optimized.

---

## 8. Metrics and targets

- **LCP:** Aim for < 2.5 s on 3G (and < 1.5 s on fast). Hero image + fonts + minimal JS are the main levers.  
- **FID / INP:** Keep scripts small and deferred so main thread stays free.  
- **CLS:** All images have dimensions or aspect-ratio; avoid inserting content above images without reserved space.  
- **TTI:** Defer analytics and non-critical JS so interactive time is dominated by your own code (ClientRouter, Lightbox, forms).

---

## 9. Implementation priority

| Priority | Action | Impact | Effort |
|----------|--------|--------|--------|
| 1 | Cache headers for `/_astro/*` and HTML on Netlify | High (repeat visits, 3G) | Low |
| 2 | Lazy load PostCard and below-fold images | High (initial load, 3G) | Low |
| 3 | Defer Google Analytics until after load | Medium–high (low-end, 3G) | Low |
| 4 | ~~Fonts: self-host or async load + swap~~ **Done:** Inter + Playfair via @fontsource in `global.css` | High (first paint, 3G) | — |
| 5 | Remove dev `console.log` (e.g. PostCard) | Small (cleaner, less noise) | Low |
| 6 | ~~Optional: Load Lightbox/ContactForm on idle~~ **Done:** init deferred via `requestIdleCallback` (timeout 2s) | Medium (low-end) | — |
| 7 | ~~Optional: Conditional ClientRouter~~ **N/A:** Astro View Transitions already respect `prefers-reduced-motion` | Medium (low-end) | — |
| 8 | ~~MDX image component or rehype lazy for prose~~ **Done:** `rehypeLazyImg` in `markdown` + `mdx` adds `loading="lazy"` and `decoding="async"` to all content images | Medium (long posts) | — |

Implementing 1–3 and 5 gives the best immediate gain for desktop, mobile, low-end PCs, and 3G with minimal risk.

---

## 10. Next steps (after implementation)

1. **Measure**  
   Run [Lighthouse](https://developer.chrome.com/docs/lighthouse/) (or [PageSpeed Insights](https://pagespeed.web.dev/)) on the deployed site with **Mobile** and **Slow 3G** throttling. Capture LCP, FID/INP, CLS. Use this as a baseline to confirm improvements and spot regressions.

2. **Optional cleanup**  
   - Remove or guard `console.log` in production (e.g. ContactForm error paths, BaseHead legacy SW cleanup) if you don’t need them for debugging.  
   - Once most users are off the old Gatsby site, consider removing the legacy service-worker unregister script in `BaseHead.astro` to trim HTML and avoid edge-case reloads.

3. **Monitor over time**  
   Use [Chrome User Experience Report](https://developer.chrome.com/docs/crux/) (CrUX) or GA4’s Core Web Vitals to track real-user LCP, INP, CLS. Set a simple goal (e.g. LCP &lt; 2.5 s on 3G) and re-check after major changes.

4. **Further optimizations (only if needed)**  
   If LCP is still high after the above: consider inlining minimal critical CSS, reducing ClientRouter usage on very low-end targets, or self-hosting external images (e.g. Quora) used in posts.

---

## 11. Lighthouse baseline (local run)

A Lighthouse run was executed against the built site served locally (`npm run preview` → `http://localhost:4322/`). Summary:

| Metric | Value | Target |
|--------|--------|--------|
| **Performance score** | 58 | ≥ 90 (green) |
| **LCP** (Largest Contentful Paint) | 6.3 s | &lt; 2.5 s |
| **FCP** (First Contentful Paint) | 1.5 s | &lt; 1.8 s |
| **CLS** (Cumulative Layout Shift) | 0 | &lt; 0.1 ✓ |
| **TBT** (Total Blocking Time) | 380 ms | &lt; 200 ms |
| **Speed Index** | 15.2 s | &lt; 3.4 s |

**Note:** Lighthouse reported: *“The tested device appears to have a slower CPU than Lighthouse expects.”* So LCP, Speed Index, and the overall score may be worse than on a typical desktop or phone. **CLS is 0**, which confirms layout stability from dimensions on images.

**How to re-run Lighthouse**

1. Build and serve: `npm run build && npm run preview` (server runs on port 4321 or next available).
2. In another terminal:  
   `npx lighthouse http://localhost:4321/ --output=html --output-path=./lighthouse-report.html --only-categories=performance`
3. Open `lighthouse-report.html` in a browser for the full report.

For a more representative baseline, run Lighthouse (or [PageSpeed Insights](https://pagespeed.web.dev/)) against the **deployed** URL with Mobile + Slow 4G; that reflects real-user conditions better than a local run.

---

## 12. Further improvements (what more you can do)

Prioritized by impact vs effort. Implement when you want to squeeze more out of LCP and low-end/3G.

| Priority | Action | Impact | Effort |
|----------|--------|--------|--------|
| **1** | **Preload LCP image** | High (LCP) | Low |
| | Add `<link rel="preload" as="image" href="…" />` for the hero/LCP image so the browser fetches it earlier. **Done:** BaseHead preloads the `image` prop (blog hero); index preloads the avatar. | | |
| **2** | **Remove legacy SW cleanup** | Medium (HTML size, edge cases) | Low |
| | Once most users are off the old Gatsby site, remove the “unregister service workers” script in BaseHead.astro. Reduces HTML and avoids rare reloads. | | |
| **3** | **Strip or guard `console.log`** | Small (cleaner console) | Low |
| | Remove or wrap in `import.meta.env.DEV` in ContactForm (error paths) and BaseHead (SW cleanup). | | |
| **4** | **Connection-aware prefetch** | Medium (3G bandwidth) | Medium |
| | Disable Astro prefetch when `navigator.connection?.effectiveType` is `'2g'` or `'slow-2g'` so slow connections don’t prefetch links. Requires a small client script that toggles prefetch or a data attribute. | | |
| **5** | **AVIF for images** | Medium (smaller images) | Low–medium |
| | Enable AVIF in Astro’s image config (if supported) so modern browsers get smaller images than WebP. Check `astro.config` and Sharp/Image service options. | | |
| **6** | **Critical CSS** | High (first paint on 3G) | High |
| | Inline the minimal CSS for above-the-fold (layout, fonts, hero) and load the rest async. Needs a build step or plugin; Astro doesn’t ship critical-CSS extraction. | | |
| **7** | **Cap hero image width** | Medium (LCP) | Low |
| | Ensure hero images don’t exceed display width (e.g. max 1200px for content). You already use width={1020} on blog hero; confirm output srcset is sensible. | | |
| **8** | **Self-host external post images** | Medium (long posts) | Medium |
| | Replace Quora/external image URLs in posts with self-hosted copies so they’re optimized and cached. | | |
