import type { Metadata } from "next";
import { PostCard } from "@/components/blog/post-card";
import { Container } from "@/components/shared/container";
import { posts } from "@/constants/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical notes on cloud, DevOps, cybersecurity, and software engineering.",
};

export default function BlogPage() {
  return (
    <Container className="py-12 sm:py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-medium uppercase text-primary">
          Archive
        </p>
        <h1 className="mt-4 text-4xl font-semibold">Blog</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          A growing set of practical notes from software engineering, cloud,
          DevOps, and security work.
        </p>
      </header>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </Container>
  );
}
