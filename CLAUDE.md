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

**One file per page, fully self-contained.** Every top-level `*.html` file embeds its own CSS in a single `<style>` block in `<head>` and its own JS in a single `<script>` block before `</body>`. There are no shared `.css`/`.js` files, no bundler, and no server-side or client-side includes/templating — each page is copy-pasted and edited independently.

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

**Duplicated shared components.** The topbar, main `<nav>` (including the "Contacto" dropdown), footer, and floating WhatsApp button (`.fab`) are repeated verbatim in every page. When changing any of these, you must manually propagate the edit to all `*.html` files — there is no single source of truth to update.

**CSS conventions.** Each page redeclares the same `:root` custom-property palette (`--blue`, `--blue-dk`, `--blue-xdk`, `--gray-bg`, etc.) and the same Google Fonts stack (`Crimson Pro`, `IBM Plex Mono`, `Montserrat`, loaded via CDN `<link>`). Keep new pages consistent with these existing variable names/values rather than introducing new ones. Section comments use a banner style (`/* ═══ SECTION ═══ */`) — match this when adding CSS.

**JS conventions.** Vanilla JS only, no framework. Independent behaviors (hero carousel, socios carousel, counters, scroll animations via `IntersectionObserver`) are each wrapped in their own IIFE. Comments are in Spanish.

**Forms are client-side only.** `BPP_Contacto.html` (`#contact-form`) and `BPP_Postulacion.html` (`#postulacion-form`) use `onsubmit="handleSubmit(event)"`, which calls `e.preventDefault()` and only does inline field validation — there is no real submission endpoint wired up.

**Query-param-driven content in `BPP_Contacto.html`.** This is the only page with dynamic content swapping: an `AREAS` lookup object keyed by `laboral` / `civil` / `penal` / `administrativo` drives the copy and target email shown on the page, read from `?area=` on load and kept in sync with the URL via `pushState`/`popstate`. The "Contacto" dropdown in the nav (present on every page) and several footer/CTA links point to `BPP_Contacto.html?area=<key>`.

**Assets.** Images live flat at the repo root (no `assets/` subfolder) and are referenced by bare relative filename (e.g. `slide1.png`, `asociado3.jpeg`). Several are large, uncompressed source images (multi-MB PNG/JPG) — be mindful of this when adding new ones.
