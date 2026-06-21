export interface BlogPostMeta {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogPost extends BlogPostMeta {
  content: React.ReactNode;
}
