# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static, multi-page HTML design/prototype site for **BPP Abogados** (Berríos Palavecino Pinochet), a Chilean law firm. All copy and comments are in Spanish. There is no backend, no build step, and no package manager — this is a pure HTML/CSS/JS design repo, not a production web app.

## Commands

There is no `package.json`, build tool, linter, or test suite in this repo. To preview a page, just open the `.html` file directly in a browser, or serve the directory with any static file server, e.g.:

```bash
python3 -m http.server 8000
```

then visit `http://localhost:8000/index.html`.

## Architecture

**One file per page, fully self-contained — except the shared chrome.** Every top-level `*.html` file embeds its own page-specific CSS in a single `<style>` block in `<head>` and its own page-specific JS in a single `<script>` block before `</body>`. There is still no bundler and no build step, but the topbar/nav/footer/FAB markup and styling are no longer copy-pasted (see below) — every page loads `assets/styles.css` via `<link rel="stylesheet">` and `assets/components.js` via `<script>`, both in `<head>`.

Page inventory (all linked from the nav/footer of every page):
- `index.html` — home page (hero carousel, milestones counter, partner/socios carousel, practice areas grid)
- `BPP_Areas.html` — practice areas overview
- `BPP_Area_Detalle.html` — single example practice-area detail page (static mockup, not wired to a real per-area id/route despite being the "unified template")
- `BPP_Equipo.html` — team listing
- `BPP_Asociado_Detalle.html` — single example team-member detail page (same caveat: static mockup, not data-driven)
- `BPP_Noticias.html` — news/publications listing
- `BPP_Noticia_Detalle.html` — single example article detail page (same caveat)
- `BPP_Contacto.html` — contact page, the one page with real dynamic behavior (see below)
- `BPP_Postulacion.html` — careers/"Trabaja con Nosotros" page

**Shared chrome lives in `assets/components.js`, as native Web Components.** The topbar, main nav (with the "Contacto" dropdown), footer, and floating WhatsApp button are each a custom element — `<bpp-topbar>`, `<bpp-nav>`, `<bpp-footer>`, `<bpp-fab>` — defined in `assets/components.js` and dropped into each page where the old markup used to be (e.g. `<!-- TOPBAR --> <bpp-topbar></bpp-topbar>`). They render via plain `this.innerHTML = \`...\`` in `connectedCallback` — **no Shadow DOM** — so the shared `assets/styles.css` (see below) styles the injected markup via normal class selectors (`bpp-topbar`/`bpp-nav`/`bpp-footer` set `this.className` to `topbar`/`nav`/`footer` themselves so those selectors keep matching). To change the topbar, nav, footer, or FAB markup, edit `assets/components.js`; to change how they look, edit `assets/styles.css` — either one propagates to all 9 pages automatically. `BPP_Postulacion.html` is the one exception: it keeps its own inline `<nav class="nav">...</nav>` with a `.nav-cta` button instead of the dropdown, since that variant isn't shared by any other page — don't fold it into `<bpp-nav>`.

**`assets/styles.css` holds the global tokens + chrome CSS, loaded by all 9 pages.** This is the `:root` custom-property palette (`--blue`, `--blue-dk`, `--blue-xdk`, `--gray-bg`, etc.), the base reset (`*`, `html`), and every selector prefixed `.topbar`/`.nav`/`.footer`/`.fab` (including their `@media` responsive overrides at 900/1179/767px) — i.e. exactly the CSS for the `<bpp-topbar>`/`<bpp-nav>`/`<bpp-footer>`/`<bpp-fab>` components. To restyle any of those, edit `assets/styles.css` once. `body { padding-top: ... }` is the one chrome-adjacent rule that stays page-local on purpose: `index.html` uses `36px` (full-bleed hero behind topbar+nav) while every inner page uses `108px` (topbar+nav height, content starts below) — don't try to centralize it.

**Page-specific CSS conventions.** Everything else (hero, cards, grids, forms, animations) stays in each page's own `<style>` block. Each page still loads its own Google Fonts `<link>` (`IBM Plex Mono`, `Jost`, and `Montserrat` everywhere — since the shared chrome CSS needs all three; `Crimson Pro` only on the pages that actually use it for serif copy, currently every page except `BPP_Contacto.html`/`BPP_Postulacion.html`). Keep new page-specific CSS consistent with the existing variable names/values rather than introducing new ones. Section comments use a banner style (`/* ═══ SECTION ═══ */`) — match this when adding CSS.

**JS conventions.** Vanilla JS only, no framework. Independent behaviors (hero carousel, socios carousel, counters, scroll animations via `IntersectionObserver`) are each wrapped in their own IIFE. Comments are in Spanish.

**Forms are client-side only.** `BPP_Contacto.html` (`#contact-form`) and `BPP_Postulacion.html` (`#postulacion-form`) use `onsubmit="handleSubmit(event)"`, which calls `e.preventDefault()` and only does inline field validation — there is no real submission endpoint wired up. Required fields carry both `required` and `aria-required="true"`; `BPP_Contacto.html` additionally toggles `aria-invalid` alongside its red-border validation, and both forms' `#form-success` container has `role="status" aria-live="polite"` so the confirmation is announced to screen readers.

**Query-param-driven content in `BPP_Contacto.html`.** This is the only page with dynamic content swapping: an `AREAS` lookup object keyed by `laboral` / `civil` / `penal` / `administrativo` drives the copy and target email shown on the page, read from `?area=` on load and kept in sync with the URL via `pushState`/`popstate`. The "Contacto" dropdown in the nav (present on every page) and several footer/CTA links point to `BPP_Contacto.html?area=<key>`.

**Assets.** Images live in `assets/` and are referenced with the `assets/<filename>` relative path (e.g. `assets/slide1.jpg`, `assets/asociado3.jpeg`) — this applies to `<img src>`, CSS `background-image: url(...)`, `og:image` meta tags, and the `heroImg` JS values in `BPP_Contacto.html`. There are no PNGs in the repo: photographic sources get converted to JPEG (`sips -s format jpeg -s formatOptions 80 -Z 2400 in.png --out out.jpg`) before being added, since PNG encodes these multi-megapixel photos losslessly and bloats file size 10-20x for no visual benefit. Below-the-fold `<img>` tags carry `loading="lazy"`; hero/featured images in the first viewport stay eager — follow this split when adding new images.

**SEO meta tags.** Every page has a `<meta name="description">` plus `og:title` / `og:description` / `og:type` / `og:image` in `<head>`, written from that page's own hero copy (not invented content) and pointing at an `assets/` image. Carry this over to any new page.

**Nav dropdown accessibility.** The "Contacto" dropdown toggle (`.nav-dropdown-toggle`) has `aria-haspopup="menu"` and an `aria-expanded` state kept in sync with the existing CSS `:hover`/`:focus-within` show/hide. That sync listener (`mouseenter`/`mouseleave`/`focusin`/`focusout`) lives once inside `BppNav.connectedCallback` in `assets/components.js` — it is not duplicated per page. `BPP_Postulacion.html`'s inline `.nav-cta` nav has no dropdown, so it's unaffected.

**Footer content is now identical on all 9 pages** (defined once in `BppFooter`): the "El Estudio" column is exactly *El estudio / Nuestro equipo / Postulaciones / Noticias*. Don't reintroduce page-specific footer copy — earlier versions had inconsistent links (`Historia`, `Quiénes somos`, `Trabaja con nosotros`) that have been intentionally consolidated.
