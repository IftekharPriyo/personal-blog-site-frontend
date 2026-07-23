import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArchive } from "@/components/blog/blog-archive";
import { Container } from "@/components/shared/container";
import { TypewriterTitle } from "@/components/shared/typewriter-title";
import { siteConfig } from "@/config/site";
import { getAllTags, getPostsPage } from "@/lib/blog";

const blogUrl = `${siteConfig.url}/blog`;
const blogDescription =
  "Technical notes by Iftekhar Priyo about software engineering, cloud, DevOps, and cybersecurity.";
const archivePageSize = 6;

type BlogPageProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

function parsePage(searchParams: { page?: string | string[] }) {
  const rawPage = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page;

  if (!rawPage) return 1;

  const page = Number(rawPage);
  return Number.isInteger(page) && page > 0 ? page : null;
}

function getBlogPageUrl(page: number) {
  return page === 1 ? blogUrl : `${blogUrl}?page=${page}`;
}

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const page = parsePage(await searchParams) ?? 1;
  const title =
    page === 1
      ? "Software Engineering, Cloud & Security Blog"
      : `Software Engineering, Cloud & Security Blog - Page ${page}`;
  const url = getBlogPageUrl(page);

  return {
    title,
    description: blogDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.author.name}`,
      description: blogDescription,
      type: "website",
      url,
      siteName: siteConfig.name,
    },
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = parsePage(await searchParams);

  if (!page) {
    notFound();
  }

  const postsPage = await getPostsPage({ page, limit: archivePageSize });
  const topics = await getAllTags();

  if (postsPage.pagination.totalItems > 0 && postsPage.posts.length === 0) {
    notFound();
  }

  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <header className="max-w-3xl">
        <p className="text-sm font-medium uppercase text-primary">Archive</p>
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
        <BlogArchive
          posts={postsPage.posts}
          pagination={postsPage.pagination}
          topics={topics}
        />
      </div>
    </Container>
  );
}
