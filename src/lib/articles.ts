import "server-only";
import { cookies } from "next/headers";
import { getBackendUrl } from "@/lib/auth";
import type { AdminArticle, AdminOption } from "@/types/admin";

interface ArticleOptionsResponse {
  categories: AdminOption[];
  tags: AdminOption[];
}

async function articleRequest(path = "") {
  const token = (await cookies()).get("jwt")?.value;
  if (!token) return null;

  return fetch(`${getBackendUrl()}/api/articles${path}`, {
    headers: { cookie: `jwt=${token}` },
    cache: "no-store",
  });
}

export async function getAdminArticles(): Promise<AdminArticle[]> {
  const response = await articleRequest();
  if (!response) return [];
  if (!response.ok) throw new Error("Unable to load articles");

  const data = (await response.json()) as { articles: AdminArticle[] };
  return data.articles;
}

export async function getAdminArticle(id: string): Promise<AdminArticle | null> {
  const response = await articleRequest(`/${encodeURIComponent(id)}`);
  if (!response || response.status === 404) return null;
  if (!response.ok) throw new Error("Unable to load the article");

  const data = (await response.json()) as { article: AdminArticle };
  return data.article;
}

export async function getArticleOptions(): Promise<ArticleOptionsResponse> {
  try {
    const response = await articleRequest("/options");

    if (!response?.ok) return { categories: [], tags: [] };
    return (await response.json()) as ArticleOptionsResponse;
  } catch {
    return { categories: [], tags: [] };
  }
}
