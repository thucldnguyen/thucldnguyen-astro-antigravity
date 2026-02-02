// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import { rehypeLazyImg } from './src/utils/rehype-lazy-img.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://thucldnguyen.com',
  integrations: [
    mdx({
      rehypePlugins: [rehypeLazyImg],
    }),
    sitemap(),
  ],

  markdown: {
    rehypePlugins: [rehypeLazyImg],
  },

  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
  },
});