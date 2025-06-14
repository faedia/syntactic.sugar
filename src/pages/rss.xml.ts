import rss, { type RSSFeedItem } from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { config } from '../site.config';

type Post = CollectionEntry<"blog">["data"];

function postDataToRssItem(id: string, post: Post): RSSFeedItem {
    return {
        link: `/blog/${id}/`,
        title: post.title,
        description: post.description,
        author: post.author?.email || config.author.email,
        pubDate: post.pubDate,
        categories: post.tags,
    }
}

export async function GET(context: any) {
    const posts = await getCollection('blog');
    return rss({
        title: config.title,
        description: config.description,
        site: context.site,
        items: posts.map((post) =>
            postDataToRssItem(post.id, post.data)
        ),
    });
}
