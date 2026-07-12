import "server-only";
import type { AdminArticle, AdminOption } from "@/types/admin";

export const adminCategories: AdminOption[] = [
  { id: "category-backend", name: "Backend Engineering" },
  { id: "category-cloud", name: "Cloud & DevOps" },
  { id: "category-security", name: "Cybersecurity" },
  { id: "category-journal", name: "Engineering Journal" },
  { id: "category-travel", name: "Travel" },
];

export const adminTags: AdminOption[] = [
  { id: "tag-aws", name: "AWS" },
  { id: "tag-node", name: "Node.js" },
  { id: "tag-security", name: "Security" },
  { id: "tag-devops", name: "DevOps" },
  { id: "tag-next", name: "Next.js" },
  { id: "tag-learning", name: "Learning" },
  { id: "tag-malaysia", name: "Malaysia" },
  { id: "tag-kuala-lumpur", name: "Kuala Lumpur" },
];

export const adminArticles: AdminArticle[] = [
  {
    id: "article-1",
    title: "Building a blog frontend that stays out of the way",
    slug: "building-a-blog-frontend-that-stays-out-of-the-way",
    excerpt:
      "Notes on shaping an editorial frontend around clarity, restraint, and maintainable components.",
    content:
      "A writing-first interface should make the article feel inevitable. This draft explores the component and layout decisions behind the journal.",
    coverImage: "",
    status: "PUBLISHED",
    featured: true,
    author: { id: "admin-1", name: "Iftekhar Priyo" },
    category: adminCategories[3],
    tags: [adminTags[4], adminTags[5]],
    publishedAt: "2026-05-22T10:00:00.000Z",
    createdAt: "2026-05-20T08:30:00.000Z",
    updatedAt: "2026-05-22T10:00:00.000Z",
  },
  {
    id: "article-2",
    title: "Small DevOps habits that reduce deployment stress",
    slug: "small-devops-habits-that-reduce-deployment-stress",
    excerpt:
      "A practical checklist of small operational habits that make releases quieter and easier to recover.",
    content:
      "Reliable releases are usually the result of ordinary habits repeated consistently. Start with small checks that remove uncertainty.",
    coverImage: "",
    status: "PUBLISHED",
    featured: false,
    author: { id: "admin-1", name: "Iftekhar Priyo" },
    category: adminCategories[1],
    tags: [adminTags[0], adminTags[3]],
    publishedAt: "2026-05-17T09:00:00.000Z",
    createdAt: "2026-05-14T12:00:00.000Z",
    updatedAt: "2026-05-17T09:00:00.000Z",
  },
  {
    id: "article-3",
    title: "Designing the first content API",
    slug: "designing-the-first-content-api",
    excerpt:
      "Working notes for the API boundary between the journal and its administration tools.",
    content:
      "The first API should be deliberately small. This article outlines validation, authorization, and a predictable post lifecycle.",
    coverImage: "",
    status: "DRAFT",
    featured: false,
    author: { id: "admin-1", name: "Iftekhar Priyo" },
    category: adminCategories[0],
    tags: [adminTags[1], adminTags[2]],
    publishedAt: null,
    createdAt: "2026-06-18T14:20:00.000Z",
    updatedAt: "2026-06-20T11:45:00.000Z",
  },
  {
    id: "article-4",
    title: "Field notes from a quiet week in Kuala Lumpur",
    slug: "field-notes-from-kuala-lumpur",
    excerpt:
      "A travel journal draft about architecture, long walks, and observing a city between work sessions.",
    content:
      "Some cities are best understood slowly. These are early notes from a week of walking, working, and paying attention.",
    coverImage: "https://images.example.com/kuala-lumpur.jpg",
    status: "DRAFT",
    featured: false,
    author: { id: "admin-1", name: "Iftekhar Priyo" },
    category: adminCategories[4],
    tags: [adminTags[5], adminTags[6], adminTags[7]],
    publishedAt: null,
    createdAt: "2026-06-12T16:00:00.000Z",
    updatedAt: "2026-06-19T07:15:00.000Z",
  },
  {
    id: "article-5",
    title: "Old infrastructure notes",
    slug: "old-infrastructure-notes",
    excerpt: "An earlier collection of infrastructure notes kept for reference.",
    content: "Archived notes from the first infrastructure experiments.",
    coverImage: "",
    status: "ARCHIVED",
    featured: false,
    author: { id: "admin-1", name: "Iftekhar Priyo" },
    category: adminCategories[1],
    tags: [adminTags[0], adminTags[3]],
    publishedAt: null,
    createdAt: "2026-04-02T10:00:00.000Z",
    updatedAt: "2026-06-01T09:30:00.000Z",
  },
];

export function getAdminArticle(id: string) {
  return adminArticles.find((article) => article.id === id) ?? null;
}
