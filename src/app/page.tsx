import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeaturedPost } from "@/components/blog/featured-post";
import { PostCard } from "@/components/blog/post-card";
import { Container } from "@/components/shared/container";
import { TypewriterTitle } from "@/components/shared/typewriter-title";
import { buttonVariants } from "@/components/ui/button";
import { getFeaturedPost, getLatestPosts } from "@/lib/blog";
import { cn } from "@/lib/utils";

export default async function Home() {
  const featuredPost = await getFeaturedPost();
  const latestPosts = await getLatestPosts(3);

  return (
    <Container className="py-14 sm:py-16 lg:py-20">
      <section className="max-w-3xl">
        <p className="text-sm font-medium uppercase text-primary">
          Dev Journal
        </p>
        <TypewriterTitle
          text="Tech doesn't have to be complicated."
          className="mt-5 text-4xl font-semibold leading-[1.12] text-balance sm:text-5xl"
        />
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          I write about software engineering, cloud, DevOps, cybersecurity, and
          the lessons I pick up while building real projects. Simple
          explanations, real projects, and practical lessons.
        </p>
      </section>

      {featuredPost ? (
        <section className="mt-16 sm:mt-20" aria-labelledby="featured-post">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-primary">Featured</p>
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
            <p className="text-sm text-primary">Recently Published</p>
            <h2 id="latest-posts" className="mt-1 text-2xl font-semibold">
              Recent posts
            </h2>
          </div>
          <Link
            href="/blog"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "hidden sm:inline-flex",
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
            "mt-6 w-full sm:hidden",
          )}
        >
          See More
          <ArrowRight aria-hidden="true" />
        </Link>
      </section>
    </Container>
  );
}
