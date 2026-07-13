import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleShare } from "@/components/blog/article-share";
import { PostEngagement } from "@/components/blog/post-engagement";
import { PostMeta } from "@/components/blog/post-meta";
import { PostTags } from "@/components/blog/post-tags";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { TypewriterTitle } from "@/components/shared/typewriter-title";
import { siteConfig } from "@/config/site";
import { getPostBySlug } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function getArticleUrl(slug: string) {
  return new URL(`/blog/${encodeURIComponent(slug)}`, siteConfig.url).toString();
}

function getCoverImageUrl(coverImage: string) {
  return new URL(coverImage, siteConfig.url).toString();
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
        url: getCoverImageUrl(post.coverImage),
        alt: `Cover image for ${post.title}`,
      }
    : null;

  return {
    title,
    description,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    alternates: { canonical: articleUrl },
    openGraph: {
      title,
      description,
      type: "article",
      url: articleUrl,
      siteName: siteConfig.name,
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      authors: [siteConfig.author.url],
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

  const articleUrl = getArticleUrl(post.slug);
  const coverImageUrl = post.coverImage
    ? getCoverImageUrl(post.coverImage)
    : undefined;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        headline: post.title,
        description: post.excerpt,
        url: articleUrl,
        mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
        image: coverImageUrl ? [coverImageUrl] : undefined,
        datePublished: post.date,
        dateModified: post.updatedAt,
        inLanguage: "en",
        isAccessibleForFree: true,
        keywords: post.tags.join(", "),
        author: {
          "@type": "Person",
          "@id": `${siteConfig.url}/#person`,
          name: siteConfig.author.name,
          url: siteConfig.author.url,
        },
        publisher: { "@id": `${siteConfig.url}/#person` },
        isPartOf: {
          "@type": "Blog",
          "@id": `${siteConfig.url}/blog#blog`,
          name: siteConfig.name,
          url: `${siteConfig.url}/blog`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${articleUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${siteConfig.url}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <Container className="py-14 sm:py-18 lg:py-24">
        <article className="mx-auto max-w-[50rem]">
          <PostMeta post={post} showAuthor />
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
            url={articleUrl}
          />
          <PostEngagement
            initialLoveCount={post.loveCount}
            initialViewCount={post.viewCount}
            slug={post.slug}
          />
        </article>
      </Container>
    </>
  );
}
