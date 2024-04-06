import { z, defineCollection } from 'astro:content';

const worksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    releaseDate: z.date(),
    title: z.string(),
    note: z.string(),
    imageName: z.string(),
  }),
});

export const collections = {
  'works': worksCollection,
};