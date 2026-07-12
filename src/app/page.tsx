import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeaturedPost } from "@/components/blog/featured-post";
import { PostCard } from "@/components/blog/post-card";
import { Container } from "@/components/shared/container";
import { buttonVariants } from "@/components/ui/button";
import { getFeaturedPost, getLatestPosts } from "@/lib/blog";
import { cn } from "@/lib/utils";

export default async function Home() {
  const featuredPost = await getFeaturedPost();
  const latestPosts = await getLatestPosts(3);

  return (
    <div className="home-neon-page relative">
      <Container className="relative z-10 py-14 sm:py-16 lg:py-20">
        <section className="max-w-3xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">
            {"// Dev Journal"}
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.12] text-balance sm:text-5xl">
            Tech doesn&apos;t have to be complicated.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            I write about software engineering, cloud, DevOps, cybersecurity,
            and the lessons I pick up while building real projects. Simple
            explanations, real projects, and practical lessons.
          </p>
        </section>

        {featuredPost ? (
          <section className="mt-16 sm:mt-20" aria-labelledby="featured-post">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                  {"// Featured"}
                </p>
                <h2 id="featured-post" className="mt-1 text-2xl font-semibold">
                  Start here
                </h2>
              </div>
            </div>
            <FeaturedPost post={featuredPost} />
          </section>
        ) : null}

        <section className="mt-16 sm:mt-20" aria-labelledby="latest-posts">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                {"// Recently Published"}
              </p>
              <h2 id="latest-posts" className="mt-1 text-2xl font-semibold">
                Recent posts
              </h2>
            </div>
            <Link
              href="/blog"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "hidden font-mono text-xs uppercase tracking-wide sm:inline-flex",
              )}
            >
              See More
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} variant="compact" />
            ))}
          </div>
          <Link
            href="/blog"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "mt-6 w-full font-mono text-xs uppercase tracking-wide sm:hidden",
            )}
          >
            See More
            <ArrowRight aria-hidden="true" />
          </Link>
        </section>
      </Container>
    </div>
  );
}
