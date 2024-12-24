import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

const docs = defineCollection({ schema: docsSchema() });

const postSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  url: z.string(),
}).optional();

const posts = defineCollection({
  type: 'data',
  schema: z.object({
    date: z.coerce.date(),
    en: postSchema,
    zh: postSchema,
  }),
});

export const collections = {
  docs,
  posts,
};
