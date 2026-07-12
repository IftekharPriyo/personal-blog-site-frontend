export type ArticleStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface AdminArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  status: ArticleStatus;
  featured: boolean;
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

export interface ArticleRequestBody {
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  coverImage?: string | null;
  status: ArticleStatus;
  featured: boolean;
  categoryId: string;
  tagIds: string[];
  newTags: string[];
}

export interface AdminOption {
  id: string;
  name: string;
}
