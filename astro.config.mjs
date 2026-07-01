import { defineConfig } from 'astro/config';

// Deployed to GitHub Pages as a project site (served under /brian-baleno-site/),
// the same setup as the Webb's site. When Brian adopts it on his own domain,
// set `site` to that domain and drop `base`.
export default defineConfig({
  site: 'https://angelobaleno.github.io',
  base: '/brian-baleno-site',
});
