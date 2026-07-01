# Brian Baleno Author Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a custom, warm-literary author website for Brian Baleno in Astro — a build-to-pitch prototype deployed to a free Netlify preview URL — that dramatically out-crafts his current Wix template.

**Architecture:** Static Astro site (no UI framework), following Angelo's established Webb's-site conventions: CSS-custom-property design tokens + utility classes in one `global.css`, one `.astro` component per homepage section with scoped `<style>`, centralized typed data in `src/data/`. A single flowing homepage (`index.astro`) composes the section components; per-book detail pages are generated with `getStaticPaths` over a typed book array. Contact uses Netlify Forms (static HTML form detection — no backend code). Restrained motion via one IntersectionObserver reveal helper.

**Tech Stack:** Astro ^4.15, TypeScript, Google Fonts (Fraunces / EB Garamond / Archivo), Netlify (hosting + Forms). No test runner — verification is `astro check` (type/content validation) + `npm run build` (must succeed) + dev-server visual check, matching how the Webb's site project is worked.

## Global Constraints

- **Palette (exact):** paper `#f5efe4`, paper-alt `#efe7d8`, ink `#2c2620`, ink-soft `#5a5044`, muted `#6b5f50`, gold `#a8794a`, gold-hi `#c9a06a`.
- **Type:** Fraunces = headings; EB Garamond = body; Archivo = kickers/labels/buttons (uppercase, letter-spaced).
- **Aesthetic:** Warm Literary Elegance. Generous whitespace, book-jacket restraint. NOT dark/cinematic.
- **Motion:** restrained only — scroll fade/rise reveals + gentle cover hover. No aggressive animation.
- **Do not touch the live `brianbaleno.com` domain.** Deploy only to a Netlify preview subdomain.
- **Content is reused** from the current Wix site (`https://www.brianbaleno.com/`). Track quality upgrades in `ASSETS.md`, don't block on them.
- **Node** ≥ 18 (Astro 4 requirement).
- Follow existing Webb's-site patterns: utility classes `.container`, `.section`, `.kicker`, `.btn`; tokens in `:root`; scoped component styles.

---

### Task 1: Scaffold project, layout, tokens, nav & footer chrome

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `src/env.d.ts`
- Create: `src/styles/global.css`
- Create: `src/layouts/Base.astro`
- Create: `src/components/Nav.astro`
- Create: `src/components/Footer.astro`
- Create: `src/data/site.ts`
- Create: `src/pages/index.astro` (temporary placeholder body)

**Interfaces:**
- Produces: `Base.astro` accepting props `{ title: string; description?: string }` and a default slot for page body.
- Produces: `site` object (`src/data/site.ts`) with `name`, `tagline`, `email`, `emailHref`, `bio` (string[]), `headshot` (string path), `socials` (`{label,href}[]`), `contactFormName` (string).
- Produces global utility classes: `.container`, `.section`, `.section--alt`, `.kicker`, `.btn`, `.btn--ghost`, and `[data-reveal]` reveal styles.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "brian-baleno-author-site",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  },
  "dependencies": {
    "astro": "^4.15.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.0",
    "typescript": "^5.5.0"
  }
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

// Build-to-pitch prototype. Deployed to a free Netlify preview subdomain.
// When (if) Brian adopts it, set `site` to https://www.brianbaleno.com.
export default defineConfig({
  site: 'https://brian-baleno.netlify.app',
});
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 4: Create `.gitignore`**

```
node_modules/
dist/
.astro/
.netlify/
.DS_Store
```

- [ ] **Step 5: Create `src/env.d.ts`**

```ts
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
```

- [ ] **Step 6: Create `src/styles/global.css`**

```css
:root {
  --paper: #f5efe4;
  --paper-2: #efe7d8;
  --ink: #2c2620;
  --ink-soft: #5a5044;
  --muted: #6b5f50;
  --gold: #a8794a;
  --gold-hi: #c9a06a;
  --line: rgba(44, 38, 32, 0.14);
  --maxw: 1120px;
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 76px; }
body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: "EB Garamond", Georgia, serif;
  font-size: 1.06rem;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }

h1, h2, h3 {
  font-family: "Fraunces", Georgia, serif;
  font-weight: 600;
  line-height: 1.05;
  margin: 0 0 0.4em;
  color: var(--ink);
}
h1 { font-size: clamp(2.3rem, 5vw, 3.6rem); }
h2 { font-size: clamp(1.8rem, 3.6vw, 2.7rem); }
h3 { font-size: 1.3rem; }

.container { width: 100%; max-width: var(--maxw); margin: 0 auto; padding: 0 24px; }
.section { padding: 92px 0; }
.section--alt { background: var(--paper-2); }

.kicker {
  font-family: "Archivo", system-ui, sans-serif;
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 14px;
}

.btn {
  display: inline-block;
  background: var(--ink);
  color: var(--paper);
  font-family: "Archivo", system-ui, sans-serif;
  font-weight: 600;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 14px 28px;
  border-radius: 3px;
  transition: transform .14s ease, background .14s ease;
}
.btn:hover { transform: translateY(-2px); background: #1c1813; }
.btn--ghost {
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--line);
}
.btn--ghost:hover { background: var(--ink); color: var(--paper); }

/* Restrained scroll reveal */
[data-reveal] {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity .7s ease, transform .7s ease;
}
[data-reveal].in-view { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  [data-reveal] { opacity: 1; transform: none; transition: none; }
}

@media (max-width: 700px) {
  .section { padding: 64px 0; }
}
```

- [ ] **Step 7: Create `src/data/site.ts`** (fill `bio` from live site in Task 2; safe placeholder-free defaults now)

```ts
export const site = {
  name: "Brian Baleno",
  tagline: "Stories of family, faith, and the roads that shape us.",
  intro:
    "Pittsburgh-born author of novels and memoirs closest to the heart.",
  email: "", // filled from live site in Task 2
  emailHref: "", // filled from live site in Task 2
  headshot: "/images/brian.jpg", // added in Task 2
  bio: [
    // Replaced with real bio paragraphs in Task 2.
    "Brian Baleno is a Pittsburgh-born author.",
  ] as string[],
  socials: [] as { label: string; href: string }[], // filled/curated in Task 2
  contactFormName: "contact", // Netlify Forms form name
};
```

- [ ] **Step 8: Create `src/components/Nav.astro`**

```astro
---
import { site } from '../data/site.ts';
const links = [
  { label: 'Books', href: '/#books' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];
---
<header class="nav">
  <div class="container nav__inner">
    <a class="nav__brand" href="/">{site.name}</a>
    <nav class="nav__links">
      {links.map((l) => <a href={l.href}>{l.label}</a>)}
    </nav>
  </div>
</header>

<style>
  .nav {
    position: sticky; top: 0; z-index: 50;
    background: rgba(245, 239, 228, 0.86);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--line);
  }
  .nav__inner { display: flex; align-items: center; justify-content: space-between; height: 76px; }
  .nav__brand { font-family: "Fraunces", serif; font-weight: 600; font-size: 1.35rem; letter-spacing: 0.01em; }
  .nav__links { display: flex; gap: 30px; }
  .nav__links a {
    font-family: "Archivo", system-ui, sans-serif;
    font-size: 0.82rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--muted); transition: color .14s ease;
  }
  .nav__links a:hover { color: var(--gold); }
  @media (max-width: 560px) {
    .nav__links { gap: 18px; }
    .nav__links a { font-size: 0.74rem; letter-spacing: 0.06em; }
  }
</style>
```

- [ ] **Step 9: Create `src/components/Footer.astro`**

```astro
---
import { site } from '../data/site.ts';
const year = new Date().getFullYear();
---
<footer class="footer">
  <div class="container footer__inner">
    <span class="footer__brand">{site.name}</span>
    {site.socials.length > 0 && (
      <nav class="footer__social">
        {site.socials.map((s) => <a href={s.href} target="_blank" rel="noopener">{s.label}</a>)}
      </nav>
    )}
    <span class="footer__copy">© {year} {site.name}</span>
  </div>
</footer>

<style>
  .footer { border-top: 1px solid var(--line); padding: 34px 0; background: var(--paper-2); }
  .footer__inner { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
  .footer__brand { font-family: "Fraunces", serif; font-weight: 600; }
  .footer__social { display: flex; gap: 20px; }
  .footer__social a { font-family: "Archivo", sans-serif; font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); }
  .footer__social a:hover { color: var(--gold); }
  .footer__copy { font-size: 0.9rem; color: var(--muted); }
</style>
```

- [ ] **Step 10: Create `src/layouts/Base.astro`**

```astro
---
import '../styles/global.css';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
const { title, description = 'Novels and memoirs by author Brian Baleno.' } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,900&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Archivo:wght@500;600;800&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <Nav />
    <main>
      <slot />
    </main>
    <Footer />
    <script>
      // Restrained scroll reveal — adds .in-view when a [data-reveal] enters view.
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
          }
        },
        { threshold: 0.14 }
      );
      document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    </script>
  </body>
</html>
```

- [ ] **Step 11: Create temporary `src/pages/index.astro`**

```astro
---
import Base from '../layouts/Base.astro';
---
<Base title="Brian Baleno — Author">
  <section class="section"><div class="container"><h1>Placeholder</h1><p data-reveal>Scaffold works.</p></div></section>
</Base>
```

- [ ] **Step 12: Install and verify build**

Run: `npm install`
Then: `npm run check`
Expected: `astro check` reports `0 errors`.
Then: `npm run build`
Expected: build completes, `dist/index.html` created, no errors.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro site with warm-literary tokens, layout, nav, footer"
```

---

### Task 2: Extract real content from the live Wix site into typed data

**Files:**
- Create: `src/data/books.ts`
- Modify: `src/data/site.ts` (fill `email`, `emailHref`, `bio`, `socials`)
- Create: `public/images/covers/` (downloaded cover images)
- Create: `public/images/brian.jpg` (headshot)
- Create: `ASSETS.md` (asset-upgrade tracker)

**Interfaces:**
- Produces: `Book` type and `books` array (`src/data/books.ts`):
  ```ts
  export type BookCategory = 'fiction' | 'memoir' | 'children';
  export interface Book {
    slug: string;         // url-safe, unique, e.g. "our-own-authors"
    title: string;
    category: BookCategory;
    blurb: string;        // 1-2 sentence teaser for cards
    description: string;  // full description for the detail page
    cover: string;        // "/images/covers/<file>.jpg"
    amazonUrl: string;    // external "Order Now" link
    featured?: boolean;   // exactly one true → hero "New Release"
  }
  export const books: Book[];
  ```
- Produces: `categoryMeta` map used by the Books section:
  ```ts
  export const categoryOrder: BookCategory[];
  export const categoryLabels: Record<BookCategory, string>;
  ```

- [ ] **Step 1: Pull the live content**

Fetch `https://www.brianbaleno.com/` (and each book's subpage/section). For every book capture: exact title, full description text, the cover image URL, and the Amazon "Order Now" URL. Also capture: Brian's bio paragraphs, his headshot image URL, his contact email, and any real social profile links. Confirm the **complete** list of titles (expected ~11) — do not assume the list below is exhaustive; reconcile against the live site.

Known titles to reconcile (from prior analysis):
- Fiction: *Our Own Authors*, *Insignificant Ones*, *+One*
- Memoir/non-fiction: *Life's Fingerprints*, *Adjacent Others*, *Route 66 with Grandpap*, *Mom's Enduring Faith & Love*, *Generational Lessons from Dad*, *Fifty Halfs from First to Last*
- Children's: *What Makes Cars Go Vroom?*

- [ ] **Step 2: Download images**

Save each cover into `public/images/covers/<slug>.jpg` and the headshot into `public/images/brian.jpg`. Use the book `slug` as the filename so `cover` paths are predictable.

- [ ] **Step 3: Write `src/data/books.ts`**

Populate the array with the REAL fetched data. Two fully-worked reference entries showing the exact shape (replace/extend with all real books — every field filled from the live site, no empty strings):

```ts
export type BookCategory = 'fiction' | 'memoir' | 'children';

export interface Book {
  slug: string;
  title: string;
  category: BookCategory;
  blurb: string;
  description: string;
  cover: string;
  amazonUrl: string;
  featured?: boolean;
}

export const categoryOrder: BookCategory[] = ['fiction', 'memoir', 'children'];
export const categoryLabels: Record<BookCategory, string> = {
  fiction: 'Fiction Novels',
  memoir: 'Family & Faith Memoirs',
  children: "For Young Readers",
};

export const books: Book[] = [
  {
    slug: 'our-own-authors',
    title: 'Our Own Authors',
    category: 'fiction',
    blurb: 'A film location scout grapples with the choices that define a life.',
    description:
      '<REAL full description pulled from brianbaleno.com>',
    cover: '/images/covers/our-own-authors.jpg',
    amazonUrl: '<REAL Amazon URL from the live site>',
    featured: true,
  },
  {
    slug: 'route-66-with-grandpap',
    title: 'Route 66 with Grandpap',
    category: 'memoir',
    blurb: 'A cross-country road trip and the bond of generations.',
    description:
      '<REAL full description pulled from brianbaleno.com>',
    cover: '/images/covers/route-66-with-grandpap.jpg',
    amazonUrl: '<REAL Amazon URL from the live site>',
  },
  // …all remaining real books, same shape, every field filled.
];
```

> If which title is the true "New Release" is unclear from the site, set `featured: true` on the fiction title currently shown in the site's New Release area and note it in `ASSETS.md` for Brian to confirm.

- [ ] **Step 4: Fill `src/data/site.ts` real values**

Replace the `email`, `emailHref`, `bio` (real paragraphs, as a `string[]`), and `socials` (only REAL profiles; drop the current Wix-default dead links — record their absence in `ASSETS.md`) with the fetched content.

- [ ] **Step 5: Create `ASSETS.md`**

```markdown
# Asset-Upgrade List (hand to Brian if he approves the pitch)

- [ ] Hi-res book covers — current covers pulled from Wix are compressed/low-res.
- [ ] Higher-quality author headshot, if one exists.
- [ ] Confirm which book is the featured "New Release" (currently: <slug>).
- [ ] Real social profiles — Wix-default footer links were dead and removed; get his actual Facebook / X / LinkedIn or leave omitted.
- [ ] Optional: refreshed / expanded bio copy.
- [ ] Verify total book count and that every title/description/Amazon link is current.
```

- [ ] **Step 6: Verify types**

Run: `npm run check`
Expected: `0 errors` (confirms every `Book` field is present and typed, `category` values valid).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add real book + author content pulled from live site"
```

---

### Task 3: Hero + Featured New Release

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/FeaturedBook.astro`
- Modify: `src/pages/index.astro` (replace placeholder; mount Hero + FeaturedBook)

**Interfaces:**
- Consumes: `site` (`name`, `tagline`, `intro`), `books` (the entry with `featured === true`).
- Produces: `index.astro` now renders `<Hero />` then `<FeaturedBook />`.

- [ ] **Step 1: Create `src/components/Hero.astro`**

```astro
---
import { site } from '../data/site.ts';
---
<section class="hero">
  <div class="container hero__inner">
    <p class="kicker" data-reveal>Author · Pittsburgh</p>
    <h1 data-reveal>{site.tagline}</h1>
    <p class="hero__lead" data-reveal>{site.intro}</p>
    <div class="hero__cta" data-reveal>
      <a class="btn" href="/#books">Browse the Books</a>
      <a class="btn btn--ghost" href="/#about">About Brian</a>
    </div>
  </div>
</section>

<style>
  .hero { padding: 92px 0 72px; }
  .hero__inner { max-width: 760px; }
  .hero__lead { font-size: 1.25rem; color: var(--ink-soft); max-width: 46ch; margin: 6px 0 30px; }
  .hero__cta { display: flex; gap: 14px; flex-wrap: wrap; }
</style>
```

- [ ] **Step 2: Create `src/components/FeaturedBook.astro`**

```astro
---
import { books } from '../data/books.ts';
const featured = books.find((b) => b.featured) ?? books[0];
---
<section class="section section--alt featured">
  <div class="container featured__inner">
    <a class="featured__cover" href={`/books/${featured.slug}`} data-reveal>
      <img src={featured.cover} alt={`Cover of ${featured.title}`} width="360" height="540" />
    </a>
    <div class="featured__body" data-reveal>
      <p class="kicker">New Release</p>
      <h2>{featured.title}</h2>
      <p class="featured__blurb">{featured.blurb}</p>
      <div class="featured__cta">
        <a class="btn" href={featured.amazonUrl} target="_blank" rel="noopener">Order Now</a>
        <a class="btn btn--ghost" href={`/books/${featured.slug}`}>Read More</a>
      </div>
    </div>
  </div>
</section>

<style>
  .featured__inner { display: grid; grid-template-columns: 360px 1fr; gap: 54px; align-items: center; }
  .featured__cover img {
    border-radius: 4px; box-shadow: 0 22px 50px rgba(44,38,32,0.28);
    transition: transform .3s ease, box-shadow .3s ease;
  }
  .featured__cover:hover img { transform: translateY(-6px); box-shadow: 0 28px 60px rgba(44,38,32,0.34); }
  .featured__blurb { font-size: 1.2rem; color: var(--ink-soft); max-width: 44ch; margin: 4px 0 26px; }
  .featured__cta { display: flex; gap: 14px; flex-wrap: wrap; }
  @media (max-width: 820px) {
    .featured__inner { grid-template-columns: 1fr; justify-items: center; text-align: center; gap: 30px; }
    .featured__cover img { width: 260px; height: auto; }
  }
</style>
```

- [ ] **Step 3: Update `src/pages/index.astro`**

```astro
---
import Base from '../layouts/Base.astro';
import Hero from '../components/Hero.astro';
import FeaturedBook from '../components/FeaturedBook.astro';
---
<Base title="Brian Baleno — Author">
  <Hero />
  <FeaturedBook />
</Base>
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: build succeeds; `dist/index.html` contains the hero tagline text and the featured book title.
Then `npm run dev` and visually confirm hero + featured book render with the warm palette and the cover image loads.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add hero and featured new-release sections"
```

---

### Task 4: Books-by-category grid

**Files:**
- Create: `src/components/BookCard.astro`
- Create: `src/components/BooksGrid.astro`
- Modify: `src/pages/index.astro` (mount `<BooksGrid />`)

**Interfaces:**
- Consumes: `books`, `categoryOrder`, `categoryLabels` from `src/data/books.ts`; `Book` type.
- Produces: `BookCard.astro` accepting prop `{ book: Book }`.
- Produces: `BooksGrid.astro` rendering an anchor target `id="books"`.

- [ ] **Step 1: Create `src/components/BookCard.astro`**

```astro
---
import type { Book } from '../data/books.ts';
const { book } = Astro.props as { book: Book };
---
<a class="card" href={`/books/${book.slug}`} data-reveal>
  <div class="card__cover">
    <img src={book.cover} alt={`Cover of ${book.title}`} width="240" height="360" loading="lazy" />
  </div>
  <h3 class="card__title">{book.title}</h3>
  <p class="card__blurb">{book.blurb}</p>
</a>

<style>
  .card { display: block; }
  .card__cover { overflow: hidden; border-radius: 4px; box-shadow: 0 12px 30px rgba(44,38,32,0.2); }
  .card__cover img { width: 100%; height: auto; transition: transform .35s ease; }
  .card:hover .card__cover img { transform: scale(1.04); }
  .card__title { margin: 16px 0 6px; font-size: 1.2rem; }
  .card__blurb { margin: 0; color: var(--muted); font-size: 1rem; line-height: 1.5; }
</style>
```

- [ ] **Step 2: Create `src/components/BooksGrid.astro`**

```astro
---
import { books, categoryOrder, categoryLabels } from '../data/books.ts';
import BookCard from './BookCard.astro';
---
<section class="section" id="books">
  <div class="container">
    <p class="kicker" data-reveal>The Library</p>
    <h2 data-reveal>Books by Brian Baleno</h2>
    {categoryOrder.map((cat) => {
      const inCat = books.filter((b) => b.category === cat);
      if (inCat.length === 0) return null;
      return (
        <div class="books__group">
          <h3 class="books__cat" data-reveal>{categoryLabels[cat]}</h3>
          <div class="books__grid">
            {inCat.map((book) => <BookCard book={book} />)}
          </div>
        </div>
      );
    })}
  </div>
</section>

<style>
  .books__group { margin-top: 48px; }
  .books__cat {
    font-family: "Archivo", sans-serif; font-size: 0.8rem; letter-spacing: 0.16em;
    text-transform: uppercase; color: var(--gold); border-bottom: 1px solid var(--line);
    padding-bottom: 12px; margin-bottom: 30px;
  }
  .books__grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px 34px;
  }
  @media (max-width: 900px) { .books__grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 620px) { .books__grid { grid-template-columns: repeat(2, 1fr); gap: 30px 22px; } }
</style>
```

- [ ] **Step 3: Mount in `src/pages/index.astro`**

Add the import and place `<BooksGrid />` after `<FeaturedBook />`:

```astro
---
import Base from '../layouts/Base.astro';
import Hero from '../components/Hero.astro';
import FeaturedBook from '../components/FeaturedBook.astro';
import BooksGrid from '../components/BooksGrid.astro';
---
<Base title="Brian Baleno — Author">
  <Hero />
  <FeaturedBook />
  <BooksGrid />
</Base>
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: build succeeds; `dist/index.html` contains all category labels and every book title.
Dev-check: the grid groups titles under the three category headings; hover scales covers gently.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add books-by-category grid with book cards"
```

---

### Task 5: Per-book detail pages

**Files:**
- Create: `src/pages/books/[slug].astro`

**Interfaces:**
- Consumes: `books`, `Book` type; `Base.astro`.
- Produces: one static page per book at `/books/<slug>` (matches `card`/`featured` link targets from Tasks 3–4).

- [ ] **Step 1: Create `src/pages/books/[slug].astro`**

```astro
---
import Base from '../../layouts/Base.astro';
import { books } from '../../data/books.ts';

export function getStaticPaths() {
  return books.map((book) => ({ params: { slug: book.slug }, props: { book } }));
}

const { book } = Astro.props;
---
<Base title={`${book.title} — Brian Baleno`} description={book.blurb}>
  <article class="section book">
    <div class="container book__inner">
      <div class="book__cover" data-reveal>
        <img src={book.cover} alt={`Cover of ${book.title}`} width="380" height="570" />
      </div>
      <div class="book__body" data-reveal>
        <a class="book__back" href="/#books">← All Books</a>
        <h1>{book.title}</h1>
        <div class="book__desc" set:html={book.description}></div>
        <a class="btn" href={book.amazonUrl} target="_blank" rel="noopener">Order on Amazon</a>
      </div>
    </div>
  </article>
</Base>

<style>
  .book__inner { display: grid; grid-template-columns: 380px 1fr; gap: 56px; align-items: start; }
  .book__cover img { border-radius: 4px; box-shadow: 0 22px 50px rgba(44,38,32,0.28); position: sticky; top: 100px; }
  .book__back {
    font-family: "Archivo", sans-serif; font-size: 0.78rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--muted);
  }
  .book__back:hover { color: var(--gold); }
  .book__body h1 { margin-top: 14px; }
  .book__desc { font-size: 1.14rem; color: var(--ink-soft); line-height: 1.7; margin: 0 0 30px; }
  .book__desc :global(p) { margin: 0 0 1em; }
  @media (max-width: 820px) {
    .book__inner { grid-template-columns: 1fr; gap: 28px; justify-items: center; text-align: center; }
    .book__cover img { position: static; width: 260px; height: auto; }
  }
</style>
```

> Note: `book.description` is inserted with `set:html` because the fetched Wix descriptions may contain paragraph markup. If a book's description was captured as plain text, that's fine — it renders as-is.

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds; `dist/books/<slug>/index.html` exists for EVERY book in the array. Open one and confirm cover, full description, and the "Order on Amazon" link (href matches that book's `amazonUrl`).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add per-book detail pages via getStaticPaths"
```

---

### Task 6: About the Author section

**Files:**
- Create: `src/components/About.astro`
- Modify: `src/pages/index.astro` (mount `<About />`)

**Interfaces:**
- Consumes: `site.bio` (string[]), `site.headshot`, `site.name`.
- Produces: anchor target `id="about"`.

- [ ] **Step 1: Create `src/components/About.astro`**

```astro
---
import { site } from '../data/site.ts';
---
<section class="section section--alt about" id="about">
  <div class="container about__inner">
    <div class="about__photo" data-reveal>
      <img src={site.headshot} alt={site.name} width="320" height="380" />
    </div>
    <div class="about__body" data-reveal>
      <p class="kicker">About the Author</p>
      <h2>{site.name}</h2>
      {site.bio.map((para) => <p class="about__para">{para}</p>)}
    </div>
  </div>
</section>

<style>
  .about__inner { display: grid; grid-template-columns: 320px 1fr; gap: 54px; align-items: center; }
  .about__photo img { border-radius: 6px; box-shadow: 0 18px 40px rgba(44,38,32,0.26); width: 100%; height: auto; }
  .about__para { font-size: 1.12rem; color: var(--ink-soft); margin: 0 0 1em; max-width: 60ch; }
  @media (max-width: 760px) {
    .about__inner { grid-template-columns: 1fr; justify-items: center; text-align: center; gap: 28px; }
    .about__photo img { max-width: 260px; }
  }
</style>
```

- [ ] **Step 2: Mount in `src/pages/index.astro`** (add import + `<About />` after `<BooksGrid />`)

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: build succeeds; `dist/index.html` contains the bio paragraphs and headshot `img`. Dev-check the two-column layout and mobile stack.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add about-the-author section"
```

---

### Task 7: Contact section (Netlify Forms)

**Files:**
- Create: `src/components/Contact.astro`
- Modify: `src/pages/index.astro` (mount `<Contact />`)

**Interfaces:**
- Consumes: `site.contactFormName`, `site.email`.
- Produces: anchor target `id="contact"`; a Netlify-detectable static form named per `site.contactFormName`.

- [ ] **Step 1: Create `src/components/Contact.astro`**

```astro
---
import { site } from '../data/site.ts';
const formName = site.contactFormName;
---
<section class="section contact" id="contact">
  <div class="container contact__inner">
    <p class="kicker" data-reveal>Get in Touch</p>
    <h2 data-reveal>Send Brian a Message</h2>
    <p class="contact__lead" data-reveal>A note about a book, a reading, or just to say hello.</p>

    <form
      class="contact__form"
      name={formName}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      data-contact-form
      data-reveal
    >
      <input type="hidden" name="form-name" value={formName} />
      <p class="contact__hp"><label>Leave blank: <input name="bot-field" /></label></p>
      <div class="contact__row">
        <input type="text" name="name" placeholder="Your name" required />
        <input type="email" name="email" placeholder="Your email" required />
      </div>
      <textarea name="message" rows="5" placeholder="Your message" required></textarea>
      <button type="submit" class="btn">Send Message</button>
      <p class="contact__status" data-contact-status aria-live="polite"></p>
    </form>
  </div>
</section>

<style>
  .contact__inner { text-align: center; }
  .contact__lead { color: var(--muted); max-width: 520px; margin: 0 auto 28px; }
  .contact__form { max-width: 600px; margin: 0 auto; text-align: left; }
  .contact__hp { display: none; }
  .contact__row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
  .contact__form input,
  .contact__form textarea {
    width: 100%; background: #fff; color: var(--ink);
    border: 1px solid var(--line); border-radius: 6px;
    padding: 13px 14px; font: 400 1rem "EB Garamond", serif; resize: vertical;
  }
  .contact__form input::placeholder, .contact__form textarea::placeholder { color: #9a8f7d; }
  .contact__form input:focus, .contact__form textarea:focus { outline: none; border-color: var(--gold); }
  .contact__form textarea { margin-bottom: 16px; }
  .contact__form .btn { border: none; cursor: pointer; }
  .contact__status { color: var(--gold); font-size: 0.95rem; min-height: 1.2em; margin: 12px 0 0; }
  @media (max-width: 560px) { .contact__row { grid-template-columns: 1fr; } }
</style>

<script>
  // Progressive enhancement: submit to Netlify Forms via fetch for inline status.
  const form = document.querySelector('[data-contact-form]');
  const status = document.querySelector('[data-contact-status]');
  if (form && status) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form as HTMLFormElement);
      status.textContent = 'Sending…';
      try {
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(data as any).toString(),
        });
        if (res.ok) {
          (form as HTMLFormElement).reset();
          status.textContent = 'Thank you — your message has been sent.';
        } else {
          status.textContent = 'Something went wrong. Please try again.';
        }
      } catch {
        status.textContent = 'Something went wrong. Please try again.';
      }
    });
  }
</script>
```

- [ ] **Step 2: Mount in `src/pages/index.astro`** (add import + `<Contact />` after `<About />`)

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: build succeeds; `dist/index.html` contains the `<form name="contact" data-netlify="true">` with the hidden `form-name` input (this static markup is what Netlify's build bots detect to register the form).

> Full end-to-end form submission can only be confirmed after the Netlify deploy in Task 9 (Netlify Forms is inactive on `astro dev` / `astro preview`). On the deployed preview, submit a test message and confirm it appears under **Netlify → Forms**.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Netlify Forms contact section"
```

---

### Task 8: Motion & responsive polish pass

**Files:**
- Modify: `src/styles/global.css` (reveal stagger utility, focus-visible)
- Modify: any section needing spacing/mobile fixes found during review

**Interfaces:**
- No new interfaces. Refines existing components only.

- [ ] **Step 1: Add focus-visible + gentle stagger to `src/styles/global.css`**

Append:

```css
a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible {
  outline: 2px solid var(--gold); outline-offset: 3px;
}
/* Optional stagger: reveal children slightly after their parent group */
.books__group[data-reveal].in-view .card { transition-delay: 0s; }
```

- [ ] **Step 2: Full-site review at three widths**

Run `npm run dev`. Check at ~1280px, ~768px, ~375px:
- Nav is sticky and readable; brand + links don't collide on mobile.
- Hero, featured, grid, about, contact all stack cleanly on mobile (no horizontal scroll).
- Reveal animations fire once and don't cause layout shift.
- Covers hover gently; buttons have hover + focus states.

Fix any spacing/overflow issues found (adjust the relevant component's scoped `<style>`).

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: build succeeds, `0 errors`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "polish: motion, focus states, responsive fixes"
```

---

### Task 9: Deploy to Netlify preview + verify form

**Files:**
- Create: `netlify.toml`
- Modify: `ASSETS.md` (record the live preview URL)

**Interfaces:**
- Terminal deliverable: a public Netlify preview URL serving the site with a working contact form.

- [ ] **Step 1: Create `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

- [ ] **Step 2: Deploy**

Two supported paths — pick one:

**A. Netlify CLI (from this machine):**
Angelo runs the interactive login in-session: type `!npx netlify-cli login` in the Claude Code prompt (opens browser to authorize). Then:
```bash
npx netlify-cli deploy --build --prod
```
Accept prompts to create a new site. Netlify returns a `*.netlify.app` URL.

**B. Git + Netlify UI (no CLI):**
Push this repo to a new GitHub repo, then in the Netlify dashboard: **Add new site → Import from Git**, select the repo. Build command `npm run build`, publish dir `dist` (auto-read from `netlify.toml`).

- [ ] **Step 3: Verify the live preview**

Open the returned `*.netlify.app` URL and confirm:
- Homepage renders with all sections; every cover image loads.
- Each book links to a working `/books/<slug>` page and out to Amazon.
- Submit a test message in the contact form; confirm it lands under **Netlify → Forms → contact**.

- [ ] **Step 4: Record the URL**

Add the live preview URL to the top of `ASSETS.md` so it's easy to share with Brian.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: add netlify config and record preview URL"
```

---

## Self-Review

**Spec coverage:**
- Rebuild in Astro, build-to-pitch, Netlify preview → Tasks 1, 9. ✓
- Warm Literary Elegance palette/type → Task 1 (`global.css`, Base fonts). ✓
- Single-scroll homepage (hero → featured → books-by-category → about → contact) → Tasks 3,4,6,7 composed in `index.astro`. ✓
- Per-book detail pages → Task 5. ✓
- Reuse content from Wix + asset-upgrade list → Task 2 (`books.ts`, `site.ts`, `ASSETS.md`). ✓
- Working contact form (Netlify Forms) → Task 7 + verified in Task 9. ✓
- Restrained motion → Task 1 (reveal helper) + Task 8. ✓
- Out-of-scope (newsletter, reviews, blog, domain migration) → correctly absent. ✓

**Placeholder scan:** The only intentional `<REAL …>` markers are in Task 2's data file, where the task's explicit job is to fetch and fill them from the live site; the `Book` interface and all field names are fully specified. No vague "add error handling" / "write tests for the above" steps.

**Type consistency:** `Book` fields (`slug`, `title`, `category`, `blurb`, `description`, `cover`, `amazonUrl`, `featured`) are defined in Task 2 and consumed identically in Tasks 3 (`featured`, `blurb`, `amazonUrl`, `cover`, `slug`, `title`), 4 (`BookCard` prop `{ book: Book }`), and 5 (`getStaticPaths` over `books`). `categoryOrder`/`categoryLabels` defined in Task 2, used in Task 4. `site.contactFormName` defined in Task 1, used in Task 7. Link targets `/books/${slug}` consistent across Tasks 3, 4, 5. `data-reveal` styled in Task 1, applied throughout. Consistent. ✓
