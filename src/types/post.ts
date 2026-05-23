export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  featured?: boolean;
}
