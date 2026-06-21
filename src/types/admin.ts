export type ArticleStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface AdminArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  status: ArticleStatus;
  author: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
  tags: Array<{
    id: string;
    name: string;
  }>;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminOption {
  id: string;
  name: string;
}
