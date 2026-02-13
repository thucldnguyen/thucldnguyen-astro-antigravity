// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import { rehypeLazyImg } from './src/utils/rehype-lazy-img.ts';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import netlify from '@astrojs/netlify';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://thucldnguyen.com',
  integrations: [mdx({
    rehypePlugins: [rehypeLazyImg],
  }), sitemap(), react(), markdoc(), keystatic()],

  markdown: {
    rehypePlugins: [rehypeLazyImg],
  },

  prefetch: true,

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: netlify(),
});