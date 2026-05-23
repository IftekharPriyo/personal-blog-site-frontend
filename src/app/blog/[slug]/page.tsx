import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/container";
import { posts } from "@/constants/posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <Container className="py-12 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <p className="text-sm text-muted-foreground">
          {post.date} / {post.readingTime}
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-[1.12] sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-10 rounded-lg border border-border/75 bg-card/70 p-6 text-sm leading-7 text-muted-foreground">
          This placeholder keeps the route ready for local MDX content in the
          next phase without adding CMS, database, or backend logic.
        </div>
      </article>
    </Container>
  );
}
