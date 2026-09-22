import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://brasa47.com.br',
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
});
