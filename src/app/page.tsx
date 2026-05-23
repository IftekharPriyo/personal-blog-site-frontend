import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeaturedPost } from "@/components/blog/featured-post";
import { PostCard } from "@/components/blog/post-card";
import { Container } from "@/components/shared/container";
import { buttonVariants } from "@/components/ui/button";
import { featuredPost, latestPosts } from "@/constants/posts";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <Container className="animate-fade-in py-14 sm:py-16 lg:py-20">
      <section className="max-w-3xl">
        <p className="text-sm font-medium uppercase text-primary">
          Technical blog
        </p>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.12] text-balance sm:text-5xl">
          Notes on building reliable software, cloud systems, and security
          habits.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          A focused publication for engineering lessons, DevOps practice,
          cybersecurity learning, and the craft of shipping maintainable
          systems.
        </p>
      </section>

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

      <section className="mt-16 sm:mt-20" aria-labelledby="latest-posts">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-primary">Latest writing</p>
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
          {latestPosts.slice(0, 3).map((post) => (
            <PostCard key={post.slug} post={post} />
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
