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

**Shared chrome lives in `assets/components.js`, as native Web Components.** The topbar, main nav, footer, and floating WhatsApp button are each a custom element — `<bpp-topbar>`, `<bpp-nav>`, `<bpp-footer>`, `<bpp-fab>` — defined in `assets/components.js` and dropped into each page where the old markup used to be (e.g. `<!-- TOPBAR --> <bpp-topbar></bpp-topbar>`). They render via plain `this.innerHTML = \`...\`` in `connectedCallback` — **no Shadow DOM** — so the shared `assets/styles.css` (see below) styles the injected markup via normal class selectors (`bpp-topbar`/`bpp-nav`/`bpp-footer` set `this.className` to `topbar`/`nav`/`footer` themselves so those selectors keep matching). To change the topbar, nav, footer, or FAB markup, edit `assets/components.js`; to change how they look, edit `assets/styles.css` — either one propagates to all 9 pages automatically. `BPP_Postulacion.html` is the one exception: it keeps its own inline `<nav class="nav">...</nav>` with a `.nav-cta` button instead of dropdowns, since that variant isn't shared by any other page — don't fold it into `<bpp-nav>`. It's kept manually in sync on logo/label wording only (not structure/order) when those change in `<bpp-nav>`.

**`<bpp-nav>` order and dropdowns.** Top-level order is: Inicio, Áreas, Noticias, "Nuestro Equipo" (dropdown), Postulaciones, "Contacto" (dropdown) — in that order, as four flex siblings inside `.nav-right` (two small `<ul class="nav-links">` lists plus two `.nav-dropdown` blocks, so `.nav-links li a` styling is reused instead of inventing new CSS for the standalone "Postulaciones" link). Both dropdowns share the exact same `.nav-dropdown`/`.nav-dropdown-toggle`/`.nav-dropdown-menu`/`.nav-dropdown-item` markup/CSS — "Nuestro Equipo" links to *Nuestro equipo* (real), *El estudio* and *Logros* (both `href="#"` placeholders, no pages exist yet); "Contacto" still links into `BPP_Contacto.html?area=<key>` per area. The nav logo is 2 lines now (*BERRÍOS* / *PALAVECINO*, no "PINOCHET") — the footer logo SVG (see below) still has the 3-line version; that's intentional, only the nav logo was asked to change.

**`assets/styles.css` holds the global tokens + chrome CSS, loaded by all 9 pages.** This is the `:root` custom-property palette (`--blue`, `--blue-dk`, `--blue-xdk`, `--gray-bg`, etc.), the base reset (`*`, `html`), and every selector prefixed `.topbar`/`.nav`/`.footer`/`.fab` (including their `@media` responsive overrides at 900/1179/767px) — i.e. exactly the CSS for the `<bpp-topbar>`/`<bpp-nav>`/`<bpp-footer>`/`<bpp-fab>` components. To restyle any of those, edit `assets/styles.css` once. `body { padding-top: ... }` is the one chrome-adjacent rule that stays page-local on purpose: `index.html` uses `36px` (full-bleed hero behind topbar+nav) while every inner page uses `108px` (topbar+nav height, content starts below) — don't try to centralize it.

**Page-specific CSS conventions.** Everything else (hero, cards, grids, forms, animations) stays in each page's own `<style>` block. Each page still loads its own Google Fonts `<link>` (`IBM Plex Mono`, `Jost`, and `Montserrat` everywhere — since the shared chrome CSS needs all three; `Crimson Pro` only on the pages that actually use it for serif copy, currently every page except `BPP_Contacto.html`/`BPP_Postulacion.html`). Keep new page-specific CSS consistent with the existing variable names/values rather than introducing new ones. Section comments use a banner style (`/* ═══ SECTION ═══ */`) — match this when adding CSS.

**JS conventions.** Vanilla JS only, no framework. Independent behaviors (hero carousel, socios carousel, counters, scroll animations via `IntersectionObserver`) are each wrapped in their own IIFE. Comments are in Spanish.

**Forms are client-side only.** `BPP_Contacto.html` (`#contact-form`) and `BPP_Postulacion.html` (`#postulacion-form`) use `onsubmit="handleSubmit(event)"`, which calls `e.preventDefault()` and only does inline field validation — there is no real submission endpoint wired up. Required fields carry both `required` and `aria-required="true"`; `BPP_Contacto.html` additionally toggles `aria-invalid` alongside its red-border validation, and both forms' `#form-success` container has `role="status" aria-live="polite"` so the confirmation is announced to screen readers.

**Query-param-driven content in `BPP_Contacto.html`.** This is the only page with dynamic content swapping: an `AREAS` lookup object keyed by `laboral` / `civil` / `penal` / `administrativo` drives the copy and target email shown on the page, read from `?area=` on load and kept in sync with the URL via `pushState`/`popstate`. The "Contacto" dropdown in the nav (present on every page) and several footer/CTA links point to `BPP_Contacto.html?area=<key>`.

**Assets.** Images live in `assets/` and are referenced with the `assets/<filename>` relative path (e.g. `assets/slide1.jpg`, `assets/asociado3.jpeg`) — this applies to `<img src>`, CSS `background-image: url(...)`, `og:image` meta tags, and the `heroImg` JS values in `BPP_Contacto.html`. There are no PNGs in the repo: photographic sources get converted to JPEG (`sips -s format jpeg -s formatOptions 80 -Z 2400 in.png --out out.jpg`) before being added, since PNG encodes these multi-megapixel photos losslessly and bloats file size 10-20x for no visual benefit. Below-the-fold `<img>` tags carry `loading="lazy"`; hero/featured images in the first viewport stay eager — follow this split when adding new images.

**SEO meta tags.** Every page has a `<meta name="description">` plus `og:title` / `og:description` / `og:type` / `og:image` in `<head>`, written from that page's own hero copy (not invented content) and pointing at an `assets/` image. Carry this over to any new page.

**Nav dropdown accessibility.** Each `.nav-dropdown-toggle` has `aria-haspopup="menu"` and an `aria-expanded` state kept in sync with the existing CSS `:hover`/`:focus-within` show/hide. That sync listener (`mouseenter`/`mouseleave`/`focusin`/`focusout`) lives once inside `BppNav.connectedCallback` in `assets/components.js`, applied via `querySelectorAll('.nav-dropdown')` so it covers both dropdowns — it is not duplicated per page or per dropdown. `BPP_Postulacion.html`'s inline `.nav-cta` nav has no dropdown, so it's unaffected.

**Footer content is now identical on all 9 pages** (defined once in `BppFooter`): the "El Estudio" column is *El estudio / Nuestro equipo / Postulaciones / Noticias*, and "Áreas de Práctica" is *Derecho Laboral / Litigios laborales y civiles / Asesoría laboral corporativa y protección de datos / Ver todas*. Don't reintroduce page-specific footer copy. The "Contacto" column lists the mobile number followed by two landline numbers (currently placeholder `+56 2 2345 67XX` numbers, not real lines).

**Footer logo position.** `.footer-logo-wrap` is `position: absolute; left: 80px` relative to `.footer` (which has `position: relative` for this purpose) instead of sitting in its grid cell — this is deliberate, to keep it pixel-aligned with `.hero-logo` on `index.html` (also `left: 80px`, but anchored to the full-bleed `.hero`) regardless of viewport width, since `.footer-inner` is a centered `max-width: 1180px` container and a normal in-flow position would drift right of the hero logo on wide screens. The `1179px`/`767px` breakpoints carry matching overrides in `assets/styles.css` (`left: 32px`, then `position: static` + smaller `80×80` SVG once the footer grid collapses to one column on mobile). The grid cell that used to hold it (`grid-template-columns: 2fr 1fr 1fr 1fr` in `.footer-top`) is left empty on purpose — don't reintroduce a fixed-position logo without also checking that breakpoint.
