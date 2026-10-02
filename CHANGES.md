# SH Furniture Theme – CHANGES.md (Project Memory)

> Read this file at the start of every session. Update it at the end of every task.

---

## 1. Project Overview

**What:** A custom Shopify theme for **SH Furniture**, a modern furniture store, built on top of Dawn.

| Item | Value |
|---|---|
| Store | `sh-furniture-guduvwts.myshopify.com` (development store) |
| Base theme | Dawn 16.0.0 (cloned from github.com/Shopify/dawn) |
| Theme folder | `C:\Users\bappe\Documents\SH Furniture\sh-furniture-theme` |
| Git repo | https://github.com/Sajidurs/SH-Furniture-Demo (`origin`, branch `main`) |
| Local preview | `shopify theme dev --store sh-furniture-guduvwts.myshopify.com` → http://127.0.0.1:9292 |
| Shopify CLI | 4.8.3 |
| Design inspiration | https://bongofurniture.com/ (layout and feel only) |

**Tech stack:** Liquid, JSON templates, sections and blocks, plain CSS, and small vanilla JS (Dawn's web components).

**Goals:**
1. Header with logo, search, cart icon and mega menu
2. Homepage: hero slider, shop by room/category grid, featured products, offer banner, footer
3. Collection page: product grid, sorting, filters (Shopify Search & Discovery)
4. Product page: gallery, variants, add to cart, EMI calculator
5. Cart drawer
6. Search, 404, blog and contact pages
7. Later: Theme App Extension for reviews and wishlist

**Rules:**
- Write our own code and design. Never copy code, images, text or logos from the inspiration site.
- Every text, image, color and link must be editable in the theme editor through `{% schema %}` settings.
- Clean, commented, mobile-first code.
- Speed first: lazy-load images, keep JS and CSS small.
- Run `shopify theme check` after big changes and fix the errors.
- Explain each step in simple words, because the owner is learning.
- Ask before deleting files or doing anything risky.
- Work on one task at a time, and update this file after each task.

---

## 2. Decisions

| Date | Decision | Why |
|---|---|---|
| 2026-10-02 | Build on Dawn 16.0.0 instead of starting from scratch | Dawn is fast and accessible, and it already has a cart drawer, predictive search, a mega menu and facet filters, so we can restyle and extend it. |
| 2026-10-02 | Git: `origin` = Sajidurs/SH-Furniture-Demo, `upstream` = Shopify/dawn | Our own repo, while keeping the option to pull Dawn updates later. |
| 2026-10-02 | Fonts: **Jost** (headings, 500) + **DM Sans** (body, 400) | Modern geometric headings that match furniture design; body is very readable on mobile. Both are in the Shopify font library, so no extra font files. |
| 2026-10-02 | "Warm Modern" palette: Ivory `#FAF7F2`, Charcoal `#2B2B2B`, Walnut `#8B5E3C`, Sage `#7A8B74`, Sand `#EFE8DD`, Terracotta `#B04E34`, Deep Forest `#1F2A24` | Natural wood and fabric tones. Approved by the owner "for now" and may change later. Terracotta was darkened from `#C2593D` to `#B04E34` so white text passes accessibility contrast (4.5:1). |
| 2026-10-02 | Color schemes: 1 Ivory (main), 2 Sand (cards/alt), 3 Walnut (highlight), 4 Deep Forest (footer/dark), 5 Terracotta (offers/sale) | Any section can switch schemes in the theme editor. Sale badge uses scheme 5 and sold-out uses scheme 4. |
| 2026-10-02 | Shapes: buttons/inputs 6px, cards/media/text boxes/popups 8px, badges 4px, variant pills stay round | A soft, modern look that is not too rounded. |
| 2026-10-02 | Buttons: uppercase labels, 0.08em letter spacing, 500 weight | Done in `assets/sh-base.css` and controlled by the new "SH Furniture brand" settings group. |
| 2026-10-02 | Page width 1400px | Bigger room and product photos on desktop. |
| 2026-10-02 | Brand-only CSS goes in `assets/sh-base.css`, loaded after `base.css` | Keeps our changes separate from Dawn files, so Dawn updates are easier to merge. |
| 2026-10-02 | Naming: our new files, classes and settings start with `sh-` / `sh_` | Easy to tell our code apart from Dawn's. |
| 2026-10-02 | Header: extend Dawn's header (do not rewrite it). Desktop has logo + search bar + icons on row 1 and mega menu + help link on row 2. Mobile keeps Dawn's drawer, logo and icons. | Furniture shoppers search a lot, so an always-visible bar helps. Reusing Dawn keeps the drawer, sticky header, accessibility and predictive search working. |
| 2026-10-02 | Hero slider is our own section (`sh-hero-slider`), not Dawn's slideshow | We need a separate mobile image (portrait crop), 2 buttons and an eyebrow line. Sliding uses CSS scroll-snap so swipe works without JS; the small JS only adds arrows, dots and autoplay. |
| 2026-10-02 | Slider accessibility: pause button when autoplay is on, no autoplay for reduced-motion visitors, off-screen slides `inert`, 44px controls | Accessibility rules (WCAG 2.2.2) require a pause control for moving content. |
| 2026-10-02 | Shop by room = own section (`sh-room-grid`). Cards are blocks with a collection picker, and image/title/link can be overridden per card. No JS. | Picking a collection fills in the card automatically, and overrides allow room photos that differ from the collection image. Dawn's `collection-list` has no overlay style, swipe row or per-card overrides. |
| 2026-10-02 | Mega menu promo cards are header blocks matched by menu item title | Fully editable in the theme editor with no code. Shopify menus cannot hold images, so blocks fill that gap. |

---

## 3. Change Log (newest first)

### 2026-10-02 – Shop by room grid
- New section **SH Shop by room** (up to 12 cards).
  - Header: heading, size, text, alignment, "View all" label and link.
  - Cards: style (text on image / text below), image shape (portrait 4:5, square, landscape 4:3), product count on/off.
  - Layout: 3–6 desktop columns; mobile 2-column grid or swipe row (scroll-snap); color scheme; top/bottom padding.
- Room block: collection, plus optional image, title and link overrides. If there is no image, it uses Shopify's collection placeholders.
- Images lazy-load, and the `sizes` hint follows the column count.
- Homepage: added under the slider with 6 sample rooms (Living Room, Bedroom, Dining, Home Office, Outdoor, Storage). 3 columns, square, text on image. No collections are linked yet (the store has only `frontpage`).
- Checked in preview: 6 cards render, the "View all" link goes to `/collections/all`, no Liquid errors. Theme check: 0 errors (same 9 Dawn warnings).
- **Files changed:** `sections/sh-room-grid.liquid` (new), `assets/sh-room-grid.css` (new), `templates/index.json`, `CHANGES.md`

### 2026-10-02 – Homepage hero slider
- New section **SH Hero slider** (up to 6 slides). Each slide has: desktop image, optional mobile image (`<picture>` under 750px), overlay %, eyebrow, heading (h2, 3 sizes), text, 2 buttons (primary + outlined), desktop text position (5 options; mobile is always bottom), optional text box, color scheme.
- Section settings: full width / boxed, desktop height (S/M/L/fill screen), mobile height, autoplay on/off and speed, arrows, dots, screen-reader label, space below.
- Speed: the first slide image is `eager` + `fetchpriority=high` (LCP). Other slides are lazy. The JS loads with `defer`.
- Homepage (`templates/index.json`): slider added at the top with 3 sample slides. Dawn's `image_banner` is **disabled, not deleted** (it can be turned back on in the editor).
- Checked in preview: 3 slides and 3 dots render, no Liquid errors, JS syntax OK. Theme check: 0 errors (same 9 Dawn warnings).
- **Files changed:** `sections/sh-hero-slider.liquid` (new), `assets/sh-hero-slider.css` (new), `assets/sh-hero-slider.js` (new), `templates/index.json`, `CHANGES.md`

### 2026-10-02 – Header: search bar, help link, mega menu promos
- Desktop search bar with live (predictive) results. It reuses Dawn's `<predictive-search>`, so no new JS. The search icon is hidden on desktop when the bar shows.
- Help/contact text and link at the right of the menu row (desktop).
- New "Mega menu promo" block (image, heading, text, link label, link, color scheme). It shows inside the mega menu of the top-level link whose title matches "Menu item". In the theme editor, selecting the block opens that menu.
- Header group set to: logo "Top left", menu type "Mega menu", announcement bar in Deep Forest (scheme 4), one sample promo for "Living Room".
- `max_blocks` raised from 3 to 12 (app blocks + promos).
- Checked in preview (http://127.0.0.1:9292): page renders with no Liquid errors, header class `header--sh-search-bar` is present, and Jost/DM Sans load. Theme check: 0 errors (same 9 Dawn warnings).
- **Files changed:** `sections/header.liquid`, `sections/header-group.json`, `snippets/header-mega-menu.liquid`, `snippets/sh-header-search-bar.liquid` (new), `snippets/sh-mega-menu-promo.liquid` (new), `assets/sh-header.css` (new), `CHANGES.md`

### 2026-10-02 – Global style setup applied
- Set brand fonts, the 5 color schemes, corner radius, page width (1400), and badge schemes.
- Added the "SH Furniture brand" settings group (uppercase buttons, letter spacing).
- Created `assets/sh-base.css` for brand overrides and loaded it in `theme.liquid` after `base.css`.
- `shopify theme check`: 0 errors. The 9 warnings all come from stock Dawn (same count before our changes).
- **Files changed:** `config/settings_data.json`, `config/settings_schema.json`, `layout/theme.liquid`, `assets/sh-base.css` (new), `CHANGES.md`

### 2026-10-02 – Own GitHub repo
- Renamed the Shopify Dawn remote from `origin` to `upstream`.
- Added `origin` = https://github.com/Sajidurs/SH-Furniture-Demo.git and pushed `main` (with Dawn history).
- **Files changed:** none (git config only)

### 2026-10-02 – Session 1: Project setup
- Looked through the Dawn theme folder.
- Created `CHANGES.md` (this file) and `CLAUDE.md`.
- Proposed the global style setup.
- **Files changed:** `CHANGES.md` (new), `CLAUDE.md` (new)

---

## 4. Current Status

**Done**
- Dawn 16.0.0 cloned locally.
- Project memory files created.
- Own GitHub repo connected (`origin`).
- Global style setup (fonts, colors, buttons, radius) applied.
- Header: search bar, help link, mega menu with promo cards.
- Homepage hero slider.
- Homepage shop by room grid.

**In progress**
- Owner to do:
  - Build the main menu (nested links) and upload a logo.
  - Add real slide photos and links.
  - Create room collections (Living Room, Bedroom, ...) and link them to the room cards.
  - Check the header, slider and room grid on a phone and on desktop.

**Not started**
- Featured products, offer banner, footer, collection, product + EMI, cart drawer, other pages, app extension.

---

## 5. Next Plan

1. **Owner:** menu, logo, slider photos, room collections (see In progress), then a visual check on phone and desktop.
2. **Featured products:** restyle Dawn's product cards (`snippets/card-product.liquid` via `sh-` CSS) and the `featured-collection` section for the brand (heading row with "View all", sale badge, hover second image).
3. **Offer banner** section (image + text + optional countdown, Terracotta scheme 5).
4. **Footer** (Deep Forest scheme 4: menus, newsletter, contact, social, payment icons).
5. **Collection page:** product grid, sorting, Search & Discovery filters.

---

## 6. Known Issues / Notes

- Git: push to `origin` (our repo). To get Dawn updates later, run `git fetch upstream` and then merge carefully.
- `config/settings_data.json` uses `"current": "Dawn"` (a preset). Brand values live in `presets.Dawn`. Once the theme is customized in the editor, Shopify may rewrite this file. Always pull the latest from the store (`shopify theme pull --only config/settings_data.json`) before editing it by hand.
- Sage `#7A8B74` is not in any color scheme yet. It is kept for accents (icons, badges) in later sections.
- The store's main menu is currently Home / Catalog / Contact with no sub-links, so mega menu dropdowns will not appear until nested links are added.
- The desktop search bar only shows when the logo position is "Top left" and the menu type is not "Drawer" (see `sh_search_bar` in `header.liquid`).
- Mega promo matching uses the menu link **title** (not case-sensitive). If a menu item is renamed, update the block's "Menu item" too.
- Hero sample slides use placeholder text (no real offers). Slide 3 says "Seasonal offers on dining". Replace it with a real promotion before launch.
- The hero slider has not been tested visually in a real browser yet (only HTML output and JS syntax were checked). Test swipe, arrows, dots and pause on a phone and on desktop.
- The owner usually keeps `shopify theme dev` running on port 9292, so local saves sync to the preview automatically.
- `cart_type` is still `notification`. It will switch to `drawer` in the cart drawer task.
- `.theme-check.yml` turns off the `MatchingTranslations` and `TemplateLength` checks (Dawn default).
- Theme check has 9 warnings that come from stock Dawn. Ignore them unless we edit those files.
- Dawn sections we will reuse or extend: `header`, `slideshow`, `collection-list`, `featured-collection`, `image-banner`, `footer`, `cart-drawer`, `main-collection-product-grid` (facets), `main-product`, `main-search`, `main-404`, `main-blog`, `contact-form`.
- The root-level `.md` files are not uploaded to Shopify (only the theme folders are).
