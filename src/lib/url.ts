// GitHub Pages serves this project site under a base path (e.g. /brian-baleno-site/).
// Root-relative links and public/ asset paths are NOT auto-prefixed by Astro, so
// wrap them with withBase() wherever we reference them.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path: string): string {
  return BASE + (path.startsWith('/') ? path : `/${path}`);
}
