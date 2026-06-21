import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import readingTime from "reading-time";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/blog/mdx-components";
import type { BlogPost, BlogPostMeta } from "@/types/post";

const postsDirectory = path.join(process.cwd(), "src", "content", "blog");

interface Frontmatter {
  title?: string;
  excerpt?: string;
  date?: string;
  tags?: string[];
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

function isMdxFile(fileName: string) {
  return fileName.endsWith(".mdx");
}

function getSlugFromFileName(fileName: string) {
  return fileName.replace(/\.mdx$/, "");
}

function getString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function getTags(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function toPostMeta(
  slug: string,
  frontmatter: Frontmatter,
  content: string,
): BlogPostMeta {
  return {
    slug,
    title: getString(frontmatter.title, slug),
    excerpt: getString(frontmatter.excerpt),
    date: getString(frontmatter.date),
    readingTime: readingTime(content).text,
    tags: getTags(frontmatter.tags),
    featured: Boolean(frontmatter.featured),
    seoTitle: getString(frontmatter.seoTitle),
    seoDescription: getString(frontmatter.seoDescription),
  };
}

async function readPostFile(fileName: string) {
  const filePath = path.join(postsDirectory, fileName);
  const file = await fs.readFile(filePath, "utf8");
  const { content, data } = matter(file);
  const slug = getSlugFromFileName(fileName);

  return {
    content,
    meta: toPostMeta(slug, data, content),
  };
}

export const getAllPosts = cache(async (): Promise<BlogPostMeta[]> => {
  const files = await fs.readdir(postsDirectory);
  const posts = await Promise.all(
    files.filter(isMdxFile).map((fileName) => readPostFile(fileName)),
  );

  return posts
    .map((post) => post.meta)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
});

export const getFeaturedPost = cache(async () => {
  const posts = await getAllPosts();

  return posts.find((post) => post.featured) ?? posts[0];
});

export const getLatestPosts = cache(async (limit = 3) => {
  const posts = await getAllPosts();

  return posts.filter((post) => !post.featured).slice(0, limit);
});

export const getAllTags = cache(async () => {
  const posts = await getAllPosts();
  const tags = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tags.set(tag, (tags.get(tag) ?? 0) + 1);
    });
  });

  return Array.from(tags.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
});

export const getPostBySlug = cache(
  async (slug: string): Promise<BlogPost | null> => {
    try {
      const { content, meta } = await readPostFile(`${slug}.mdx`);
      const mdx = await compileMDX({
        source: content,
        components: mdxComponents,
        options: {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  theme: {
                    light: "github-light",
                    dark: "github-dark-dimmed",
                  },
                  keepBackground: false,
                },
              ],
            ],
          },
        },
      });

      return {
        ...meta,
        content: mdx.content,
      };
    } catch {
      return null;
    }
  },
);
