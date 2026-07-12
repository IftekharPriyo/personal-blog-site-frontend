import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostMeta } from "@/components/blog/post-meta";
import { PostTags } from "@/components/blog/post-tags";
import { PostEngagement } from "@/components/blog/post-engagement";
import { Container } from "@/components/shared/container";
import { getPostBySlug } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Container className="py-14 sm:py-18 lg:py-24">
      <article className="mx-auto max-w-[44rem]">
        <PostMeta post={post} />
        <h1 className="mt-5 text-4xl font-semibold leading-[1.12] text-balance sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-7 text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
          {post.excerpt}
        </p>
        <div className="mt-7">
          <PostTags tags={post.tags} />
        </div>
        {post.coverImage ? (
          <figure className="mt-10 overflow-hidden rounded-xl border border-border bg-card">
            {/* Cover URLs are managed by the administrator and may use different hosts. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={`Cover image for ${post.title}`}
              className="aspect-[16/9] w-full object-cover"
            />
          </figure>
        ) : null}
        <div className="mdx-content mt-14">{post.content}</div>
        <PostEngagement
          initialLoveCount={post.loveCount}
          initialViewCount={post.viewCount}
          slug={post.slug}
        />
      </article>
    </Container>
  );
}
