import type { Metadata } from "next";
import { BlogArchive } from "@/components/blog/blog-archive";
import { Container } from "@/components/shared/container";
import { TypewriterTitle } from "@/components/shared/typewriter-title";
import { siteConfig } from "@/config/site";
import { getAllPosts, getAllTags } from "@/lib/blog";

const blogUrl = `${siteConfig.url}/blog`;
const blogDescription =
  "Technical notes by Iftekhar Priyo about software engineering, cloud, DevOps, and cybersecurity.";

export const metadata: Metadata = {
  title: "Software Engineering, Cloud & Security Blog",
  description: blogDescription,
  alternates: { canonical: blogUrl },
  openGraph: {
    title: `Software Engineering, Cloud & Security Blog | ${siteConfig.author.name}`,
    description: blogDescription,
    type: "website",
    url: blogUrl,
    siteName: siteConfig.name,
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const topics = await getAllTags();

  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <header className="max-w-3xl">
        <p className="text-sm font-medium uppercase text-primary">
          Archive
        </p>
        <TypewriterTitle
          text="Blog archive"
          className="mt-4 text-4xl font-semibold leading-[1.12] sm:text-5xl"
        />
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
          A growing set of practical notes from software engineering, cloud,
          DevOps, and security work.
        </p>
      </header>
      <div className="mt-12">
        <BlogArchive posts={posts} topics={topics} />
      </div>
    </Container>
  );
}
