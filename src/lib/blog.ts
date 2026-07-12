import "server-only";

import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/blog/mdx-components";
import { getBackendUrl } from "@/lib/auth";
import type { BlogPost, BlogPostMeta } from "@/types/post";

interface ApiPost {
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  featured?: boolean;
  content?: string;
  publishedAt: string | null;
  updatedAt: string;
  readingTime: string;
  viewCount?: number;
  loveCount?: number;
  tags: Array<{ name: string }>;
}

function toPostMeta(post: ApiPost): BlogPostMeta {
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? "",
    date: post.publishedAt ?? post.updatedAt,
    readingTime: post.readingTime,
    tags: post.tags.map((tag) => tag.name),
    coverImage: post.coverImage,
    featured: post.featured ?? false,
    viewCount: post.viewCount ?? 0,
    loveCount: post.loveCount ?? 0,
  };
}

export const getAllPosts = cache(async (): Promise<BlogPostMeta[]> => {
  const response = await fetch(`${getBackendUrl()}/api/posts`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Unable to load published posts");

  const data = (await response.json()) as { posts: ApiPost[] };
  return data.posts.map(toPostMeta);
});

export const getFeaturedPost = cache(async () => {
  const posts = await getAllPosts();
  return posts.find((post) => post.featured) ?? null;
});

export const getLatestPosts = cache(async (limit = 3) => {
  const posts = await getAllPosts();
  const featuredPost = await getFeaturedPost();
  const postsWithoutFeatured = featuredPost
    ? posts.filter((post) => post.slug !== featuredPost.slug)
    : posts;
  const candidates = postsWithoutFeatured.length > 0 ? postsWithoutFeatured : posts;

  return candidates.slice(0, limit);
});

export const getAllTags = cache(async () => {
  const posts = await getAllPosts();
  const tags = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.set(tag, (tags.get(tag) ?? 0) + 1));
  });

  return Array.from(tags.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
});

export const getPostBySlug = cache(
  async (slug: string): Promise<BlogPost | null> => {
    const response = await fetch(
      `${getBackendUrl()}/api/posts/${encodeURIComponent(slug)}`,
      { cache: "no-store" },
    );
    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Unable to load the published post");

    const data = (await response.json()) as { post: ApiPost };
    if (typeof data.post.content !== "string") return null;

    const mdx = await compileMDX({
      source: data.post.content,
      components: mdxComponents,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: { light: "github-light", dark: "github-dark-dimmed" },
                keepBackground: false,
              },
            ],
          ],
        },
      },
    });

    return { ...toPostMeta(data.post), content: mdx.content };
  },
);
