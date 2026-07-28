import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/lib/blog";
import { getProjects } from "@/lib/projects";

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
    {
      url: `${siteConfig.url}/projects`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  try {
    const [posts, projects] = await Promise.all([getAllPosts(), getProjects()]);
    const articlePages: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${siteConfig.url}/blog/${encodeURIComponent(post.slug)}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
      images: post.coverImage ? [post.coverImage] : undefined,
    }));
    const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
      url: `${siteConfig.url}/projects/${encodeURIComponent(project.slug)}`,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    return [...staticPages, ...articlePages, ...projectPages];
  } catch {
    return staticPages;
  }
}
