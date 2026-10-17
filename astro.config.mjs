// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkBreaks from 'remark-breaks';
import rehypeBasePath from './src/lib/rehype-base-path.mjs';

// SITE_URL / BASE_PATH werden im GitHub-Workflow gesetzt (GitHub Pages).
// Mit eigener Domain (antjesklavierschule.de) ist BASE_PATH einfach "/".
const site = process.env.SITE_URL ?? 'https://antjesklavierschule.de';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  markdown: {
    processor: unified({
      // Einfacher Zeilenumbruch im CMS = Zeilenumbruch auf der Seite
      remarkPlugins: [remarkBreaks],
      rehypePlugins: [[rehypeBasePath, { base }]],
    }),
  },
});
