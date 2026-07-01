# Brian Baleno — Author Website (Rebuild)

**Date:** 2026-07-01
**Status:** Design approved, pending spec review
**Owner:** Angelo Baleno
**Type:** Build-to-pitch prototype

---

## 1. Purpose

Uncle Brian (Brian Baleno) is a Pittsburgh-born author with ~11 published books
across fiction, family/faith memoirs, and a children's title. His current site
is a generic Wix template: clean but forgettable, with weak visual hierarchy,
low-res covers, dead default social links, and no distinctive craft.

He once asked Angelo to improve it. This project rebuilds it as a custom,
dramatically better-crafted site — built quietly and shown to Brian as a pitch,
**not** pushed to his live domain until he approves.

## 2. Approach & Constraints

- **Rebuild fresh**, not improve-within-Wix. Full creative control.
- **Build-to-pitch:** deploy to a free preview URL (Netlify). Nothing touches
  the real `brianbaleno.com` until Brian says go. Domain migration is a later,
  separate step and is explicitly **out of scope** for this build.
- **Content is reused** from the current Wix site (titles, descriptions, covers,
  bio, headshot) so the build isn't blocked on new assets. Quality upgrades are
  tracked in an asset-upgrade list (§8), not gathered up front.

## 3. Tech Stack

- **Astro** (static output) — Angelo's established stack (Webb's site, portfolio).
- **Netlify** hosting + **Netlify Forms** for a real, functional contact form
  (no backend code required).
- **Motion:** restrained and tasteful — scroll-triggered fade/rise on sections,
  gentle hover/parallax on book covers. Craft without going off-genre. A light
  library (e.g. GSAP or a small IntersectionObserver helper) — decided in the plan.
- **Content model:** book data in a typed Astro content collection (one entry per
  book) so the homepage grid and per-book pages render from a single source.

## 4. Visual System — "Warm Literary Elegance"

Chosen from three mocked directions (A over cinematic-B and hybrid-C). Suits his
memoir/family/faith catalog and older reader base; ages well.

- **Palette:** cream/paper `#f5efe4`, rich ink `#2c2620`, warm gold accent
  `#a8794a`, muted brown supporting tones (`#5a5044`, `#6b5f50`).
- **Type:**
  - Headlines — **Fraunces** (editorial serif)
  - Body — **EB Garamond**
  - Small UI labels / buttons / eyebrows — **Archivo** (uppercase, letter-spaced)
- **Feel:** generous whitespace, book-jacket restraint, warm and literary.

## 5. Structure

### Homepage (single flowing scroll)
1. **Sticky minimal nav** — "Brian Baleno" wordmark · Books · About · Contact
2. **Hero** — headline + short positioning line + primary CTA
3. **Featured / New Release** — one highlighted book with cover + "Order Now"
4. **Books by category** — grouped grids:
   - Fiction Novels (*Our Own Authors*, *Insignificant Ones*, *+One*)
   - Family & Faith Memoirs (*Life's Fingerprints*, *Adjacent Others*,
     *Route 66 with Grandpap*, *Mom's Enduring Faith & Love*,
     *Generational Lessons from Dad*, *Fifty Halfs from First to Last*)
   - Children's (*What Makes Cars Go Vroom?*)
   - Each card links to its detail page.
5. **About the Author** — existing bio + headshot.
6. **Contact** — working Netlify contact form.
7. **Footer** — copyright; real social links (or omit dead ones — see §8).

### Per-book detail page (`/books/[slug]`)
- Large cover, title, full description, "Order on Amazon" CTA (external), and a
  back-to-catalog link. Rendered from the book content collection.

## 6. In Scope
- Homepage (all sections above)
- Per-book detail pages for all ~11 titles
- About/bio section with headshot
- Working contact form (Netlify Forms)

## 7. Out of Scope (deliberate YAGNI)
- Newsletter / email signup (no service or list yet)
- Reviews / praise section (no review content yet — revisit if Brian supplies quotes)
- Blog / news feed
- Real-domain migration and DNS (later, only if Brian approves the pitch)

## 8. Asset-Upgrade List (hand to Brian if he says yes)
- **Hi-res book covers** — current Wix covers are compressed/low-res.
- **Better author headshot** — if a higher-quality photo exists.
- **Confirm the "new release"** — which title should be featured in the hero.
- **Real social profiles** — current footer icons point to Wix defaults; get his
  actual Facebook/X/LinkedIn or drop the icons.
- **Fresh/expanded bio copy** — optional, if he wants to update it.

## 9. Success Criteria
- A deployed preview URL that visibly out-crafts the current Wix site.
- All ~11 books present, categorized, each linking to its Amazon page.
- Functional contact form that delivers submissions.
- Warm, literary, distinctive — not template-generic — and clearly Brian's.
- Good enough that Angelo is proud to show it and Brian wants to adopt it.

## 10. Project Location
- `C:\context\Brian-Site\` — its own folder and git repo, per Angelo's
  per-project convention.
