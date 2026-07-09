import { config, fields, collection } from '@keystatic/core';
import { mark } from './src/keystatic/Brand';

export default config({
  // Faza 1: lokalno (uređivanje pri dev-u). U Fazi 2 prelazimo na 'github' + GitHub App.
  storage: {
    kind: 'local',
  },
  ui: {
    brand: { name: 'IRFHP — Vijesti', mark },
  },
  collections: {
    news: collection({
      label: 'Vijesti (News)',
      slugField: 'title',
      path: 'src/content/news/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Naslov' } }),
        date: fields.date({
          label: 'Datum',
          defaultValue: { kind: 'today' },
        }),
        summary: fields.text({
          label: 'Sažetak (kratki opis za popis vijesti)',
          multiline: true,
        }),
        coverImage: fields.image({
          label: 'Naslovna slika (opcionalno)',
          directory: 'public/images/news',
          publicPath: '/images/news/',
        }),
        content: fields.markdoc({ label: 'Tekst vijesti' }),
      },
    }),
  },
});
