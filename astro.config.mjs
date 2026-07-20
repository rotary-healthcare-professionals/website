import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'https://rotaryhealthprofessionals.org',
  integrations: [markdoc({ allowHTML: true })],
});
