export interface BlogPostMeta {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  updatedAt: string;
  readingTime: string;
  tags: string[];
  coverImage?: string | null;
  featured: boolean;
  viewCount: number;
  loveCount: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogPost extends BlogPostMeta {
  content: React.ReactNode;
}
