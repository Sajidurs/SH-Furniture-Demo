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

---

## 3. Change Log (newest first)

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

**In progress**
- Nothing. The next task is the header.

**Not started**
- Header and mega menu, homepage sections, collection, product + EMI, cart drawer, other pages, app extension.

---

## 5. Next Plan

1. **Check the styles in preview** (`shopify theme dev`): fonts load, colors look right, buttons are uppercase.
2. **Header.** Logo, search, cart icon and mega menu, styled for the brand (extend Dawn's `sections/header.liquid`). Also create a test main menu in Shopify admin with nested links.
3. **Homepage hero slider** section with editable slides.
4. **Shop by room / category grid** section.
5. **Featured products + offer banner** sections, then the footer (Deep Forest scheme 4).

---

## 6. Known Issues / Notes

- Git: push to `origin` (our repo). To get Dawn updates later, run `git fetch upstream` and then merge carefully.
- `config/settings_data.json` uses `"current": "Dawn"` (a preset). Brand values live in `presets.Dawn`. Once the theme is customized in the editor, Shopify may rewrite this file. Always pull the latest from the store (`shopify theme pull --only config/settings_data.json`) before editing it by hand.
- Sage `#7A8B74` is not in any color scheme yet. It is kept for accents (icons, badges) in later sections.
- `cart_type` is still `notification`. It will switch to `drawer` in the cart drawer task.
- `.theme-check.yml` turns off the `MatchingTranslations` and `TemplateLength` checks (Dawn default).
- Theme check has 9 warnings that come from stock Dawn. Ignore them unless we edit those files.
- Dawn sections we will reuse or extend: `header`, `slideshow`, `collection-list`, `featured-collection`, `image-banner`, `footer`, `cart-drawer`, `main-collection-product-grid` (facets), `main-product`, `main-search`, `main-404`, `main-blog`, `contact-form`.
- The root-level `.md` files are not uploaded to Shopify (only the theme folders are).
