import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PostMeta } from "@/components/blog/post-meta";
import { PostTags } from "@/components/blog/post-tags";
import type { BlogPostMeta } from "@/types/post";

interface FeaturedPostProps {
  post: BlogPostMeta;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-border/80 bg-card/75 text-card-foreground shadow-[0_1px_0_rgba(24,21,18,0.03)] transition-colors hover:border-primary/35 hover:bg-card/90">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex h-full flex-col justify-between gap-6 p-5 sm:p-7">
          <div>
            <PostMeta post={post} />
            <h3 className="mt-2.5 max-w-2xl text-xl font-semibold leading-[1.18] sm:text-2xl">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            <p className="mt-3 line-clamp-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              {post.excerpt}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <PostTags tags={post.tags} />
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex shrink-0 items-center gap-2 font-mono text-xs font-medium uppercase tracking-wide text-primary transition-colors hover:text-foreground"
            >
              Read the post
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        {post.coverImage ? (
          <Link
            href={`/blog/${post.slug}`}
            className="block h-full overflow-hidden border-t border-border/70 bg-secondary/50 lg:border-l lg:border-t-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={`Cover image for ${post.title}`}
              className="aspect-[16/9] h-full w-full object-cover transition-transform duration-300 hover:scale-[1.025] lg:aspect-auto"
            />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
