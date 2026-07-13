import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostMeta } from "@/components/blog/post-meta";
import { PostTags } from "@/components/blog/post-tags";
import { PostEngagement } from "@/components/blog/post-engagement";
import { ArticleShare } from "@/components/blog/article-share";
import { Container } from "@/components/shared/container";
import { TypewriterTitle } from "@/components/shared/typewriter-title";
import { siteConfig } from "@/config/site";
import { getPostBySlug } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function getArticleUrl(slug: string) {
  return new URL(`/blog/${encodeURIComponent(slug)}`, siteConfig.url).toString();
}

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

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const articleUrl = getArticleUrl(post.slug);
  const coverImage = post.coverImage
    ? {
        url: new URL(post.coverImage, siteConfig.url).toString(),
        alt: `Cover image for ${post.title}`,
      }
    : null;

  return {
    title,
    description,
    alternates: { canonical: articleUrl },
    openGraph: {
      title,
      description,
      type: "article",
      url: articleUrl,
      siteName: siteConfig.name,
      publishedTime: post.date,
      tags: post.tags,
      images: coverImage ? [coverImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: coverImage ? [coverImage.url] : undefined,
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
        <TypewriterTitle
          key={post.slug}
          text={post.title}
          className="mt-5 text-4xl font-semibold leading-[1.12] text-balance sm:text-5xl"
        />
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
        <ArticleShare
          description={post.excerpt}
          title={post.title}
          url={getArticleUrl(post.slug)}
        />
        <PostEngagement
          initialLoveCount={post.loveCount}
          initialViewCount={post.viewCount}
          slug={post.slug}
        />
      </article>
    </Container>
  );
}
