import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '*.mdoc', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional().default(''),
    coverImage: z.string().nullable().optional(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    dateLabel: z.string().optional(),
    time: z.string().optional(),
    location: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    navLabel: z.string().optional(),
    order: z.number().optional().default(100),
    summary: z.string().optional().default(''),
    coverImage: z.string().nullable().optional(),
    metaDescription: z.string().optional().default(''),
    externalUrl: z.string().optional(),
  }),
});

export const collections = { news, events, projects };
