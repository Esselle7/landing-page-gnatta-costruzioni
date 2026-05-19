import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://costruzioni-gnatta.it',
  integrations: [
    tailwind(),
  ],
  output: 'hybrid',
  adapter: cloudflare(),
  build: {
    assets: '_assets',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop',
    },
  },
});