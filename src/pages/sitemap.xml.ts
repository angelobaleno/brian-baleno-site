import type { APIRoute } from 'astro';
import { books } from '../data/books.ts';
import { withBase } from '../lib/url.ts';

// Hand-rolled sitemap: the site is 11 static URLs, no integration needed.
export const GET: APIRoute = ({ site }) => {
  const urls = ['/', ...books.map((b) => `/books/${b.slug}/`)].map(
    (path) => new URL(withBase(path), site).href
  );
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n') +
    '\n</urlset>\n';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
