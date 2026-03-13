import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gnatta.it',
  integrations: [
    tailwind(),
    sitemap(),
  ],
  output: 'static',
  build: {
    assets: '_assets',
  },
  base:'../',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
