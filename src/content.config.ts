import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { config } from './site.config';

import { rssSchema } from '@astrojs/rss';

const blogCollection = defineCollection({
    loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        tags: z.array(z.string()),
        author: z.object(
            {
                name: z.string(),
                email: z.string()
            }
        ).default(config.author)
    }),
});

export const collections = {
    blog: blogCollection,
}