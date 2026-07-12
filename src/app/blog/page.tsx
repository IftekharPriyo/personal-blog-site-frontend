import type { Metadata } from "next";
import { BlogArchive } from "@/components/blog/blog-archive";
import { Container } from "@/components/shared/container";
import { getAllPosts, getAllTags } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical notes on cloud, DevOps, cybersecurity, and software engineering.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const topics = await getAllTags();

  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <header className="max-w-3xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">
          {"// Archive"}
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-[1.12] sm:text-5xl">
          Blog archive
        </h1>
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
