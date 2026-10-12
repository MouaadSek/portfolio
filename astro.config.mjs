import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Strict CSP friendly build: no inline scripts or stylesheets.
export default defineConfig({
  site: 'https://mouaadsek.vercel.app',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'never' },
  vite: {
    plugins: [tailwindcss()],
    build: { assetsInlineLimit: 0 },
  },
});
