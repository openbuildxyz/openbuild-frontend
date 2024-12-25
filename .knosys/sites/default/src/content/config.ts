import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

const i18nSchema = z.object({
  en: z.string(),
  zh: z.string(),
});

const contributors = defineCollection({
  type: 'data',
  schema: z.object({
    nickname: i18nSchema,
    avatar: z.string().url(),
    github: z.union([
      z.string(),
      z.object({
        id: z.number(),
        username: z.string(),
      }),
    ]),
    twitter: z.union([
      z.string(),
      i18nSchema,
    ]).optional(),
    homepage: z.union([
      z.string().url(),
      i18nSchema,
    ]).optional(),
    title: z.string(),
    org: z.union([
      z.string(),
      z.object({
        name: z.string(),
        homepage: z.string().url().optional(),
      }),
    ]).optional(),
  }),
});

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
  contributors,
  docs,
  posts,
};
