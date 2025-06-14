// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import d2 from 'astro-d2';

import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  site: 'https://syntacticsugar.dev',
  integrations: [sitemap(), d2(
    {
      inline: true,
      theme: {
        dark: false,
        default: "6",
      },
      pad: 0,
    }
  ),
  // This has to be last otherwise it won't work
  pagefind()],

  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'catppuccin-frappe',
    },
  },
});