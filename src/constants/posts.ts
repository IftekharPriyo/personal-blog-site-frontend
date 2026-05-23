import type { BlogPost } from "@/types/post";

export const posts: BlogPost[] = [
  {
    title: "Building a Blog Frontend That Stays Out of the Way",
    slug: "building-a-blog-frontend-that-stays-out-of-the-way",
    excerpt:
      "Design notes on keeping a technical publication readable, fast, and easy to extend without turning it into a product landing page.",
    date: "2026-05-23",
    readingTime: "5 min read",
    tags: ["Frontend", "Architecture"],
    featured: true,
  },
  {
    title: "What I Track While Learning Cloud Infrastructure",
    slug: "what-i-track-while-learning-cloud-infrastructure",
    excerpt:
      "A practical checklist for turning AWS, networking, and deployment practice into repeatable engineering notes.",
    date: "2026-05-20",
    readingTime: "4 min read",
    tags: ["Cloud", "AWS"],
  },
  {
    title: "Small DevOps Habits That Reduce Deployment Stress",
    slug: "small-devops-habits-that-reduce-deployment-stress",
    excerpt:
      "Simple habits around logs, rollbacks, environment parity, and release notes that make deployments calmer.",
    date: "2026-05-16",
    readingTime: "6 min read",
    tags: ["DevOps", "Operations"],
  },
  {
    title: "Security Notes for Everyday Backend Work",
    slug: "security-notes-for-everyday-backend-work",
    excerpt:
      "A short set of reminders for authentication boundaries, input validation, dependency review, and secret handling.",
    date: "2026-05-12",
    readingTime: "5 min read",
    tags: ["Security", "Backend"],
  },
];

export const featuredPost = posts.find((post) => post.featured) ?? posts[0];
export const latestPosts = posts.filter((post) => !post.featured).slice(0, 3);
