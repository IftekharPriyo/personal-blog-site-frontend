import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    const posts = await getAllPosts();
    const articlePages: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${siteConfig.url}/blog/${encodeURIComponent(post.slug)}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
      images: post.coverImage ? [post.coverImage] : undefined,
    }));

    return [...staticPages, ...articlePages];
  } catch {
    return staticPages;
  }
}
