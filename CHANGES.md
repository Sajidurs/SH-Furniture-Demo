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
| 2026-10-02 | Global style setup (fonts, colors, buttons) | **PROPOSED, waiting for approval.** See the proposal in the session chat or in section 6. |

---

## 3. Change Log (newest first)

### 2026-10-02 – Session 1: Project setup
- Looked through the Dawn theme folder.
- Created `CHANGES.md` (this file) and `CLAUDE.md`.
- Proposed the global style setup (no theme files changed yet).
- **Files changed:** `CHANGES.md` (new), `CLAUDE.md` (new)

---

## 4. Current Status

**Done**
- Dawn 16.0.0 cloned locally.
- Project memory files created.

**In progress**
- Global style setup: proposal sent, waiting for owner approval.

**Not started**
- Header and mega menu, homepage sections, collection, product + EMI, cart drawer styling, other pages, app extension.

---

## 5. Next Plan

1. **Apply the approved global styles.** Update `config/settings_data.json` (fonts, color schemes, buttons, cards, radius) and add a small `assets/sh-base.css` for brand tokens.
2. **Header.** Logo, search, cart icon and mega menu, styled for the brand (extend Dawn's `sections/header.liquid`).
3. **Homepage hero slider** section with editable slides.
4. **Shop by room / category grid** section.
5. **Featured products + offer banner** sections, then the footer.

---

## 6. Known Issues / Notes

- **Git remote warning:** `origin` still points to `https://github.com/Shopify/dawn.git`. Before pushing, we should create our own GitHub repo and change the remote. Pushing to Shopify's repo would fail anyway.
- Dawn currently uses its default font (Assistant), black and white color schemes, and square buttons (`buttons_radius: 0`).
- `.theme-check.yml` turns off the `MatchingTranslations` and `TemplateLength` checks (Dawn default).
- Dawn sections we will reuse or extend: `header`, `slideshow`, `collection-list`, `featured-collection`, `image-banner`, `footer`, `cart-drawer`, `main-collection-product-grid` (facets), `main-product`, `main-search`, `main-404`, `main-blog`, `contact-form`.
- The root-level `.md` files are not uploaded to Shopify (only the theme folders are).

### Pending proposal: global style setup (2026-10-02)
- **Fonts:** headings in Jost (500/600); body in DM Sans (400/500). Both are in Shopify's font library.
- **Colors:** Ivory `#FAF7F2` (background), Charcoal `#2B2B2B` (text), Walnut `#8B5E3C` (primary/buttons), Sage `#7A8B74` (accent), Sand `#EFE8DD` (alt background), Terracotta `#C2593D` (sale/offers), Deep Forest `#1F2A24` (dark footer).
- **Buttons:** 6px radius, solid walnut primary, outlined secondary, 1px border, no shadow, uppercase label with small letter spacing.
- **Cards and inputs:** 8px radius, image-first product cards on a sand background.
