import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PostMeta } from "@/components/blog/post-meta";
import { PostTags } from "@/components/blog/post-tags";
import { cn } from "@/lib/utils";
import type { BlogPostMeta } from "@/types/post";

interface PostCardProps {
  post: BlogPostMeta;
  variant?: "default" | "compact";
}

export function PostCard({ post, variant = "default" }: PostCardProps) {
  const isCompact = variant === "compact";

  return (
    <article className="group relative overflow-hidden rounded-lg border border-border/75 bg-card/70 shadow-[0_1px_0_rgba(24,21,18,0.025)] transition-colors hover:border-primary/35 hover:bg-card">
      {post.coverImage ? (
        <div className="overflow-hidden border-b border-border/70 bg-secondary/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={`Cover image for ${post.title}`}
            className={cn(
              "w-full object-cover transition-transform duration-300 group-hover:scale-[1.025]",
              isCompact ? "aspect-[16/9]" : "aspect-[16/7]",
            )}
          />
        </div>
      ) : null}
      <div
        className={cn(
          "grid gap-5 p-5 sm:p-6",
          !isCompact && "md:grid-cols-[9rem_1fr] md:gap-6",
        )}
      >
        <div className={cn(!isCompact && "md:pt-1")}>
          <PostMeta post={post} />
        </div>
        <div className="min-w-0">
          <h3
            className={cn(
              "font-semibold leading-[1.3]",
              isCompact ? "text-lg" : "text-xl",
            )}
          >
            <Link href={`/blog/${post.slug}`} className="focus:outline-none">
              <span className="absolute inset-0 rounded-lg" aria-hidden="true" />
              {post.title}
            </Link>
          </h3>
          <p
            className={cn(
              "mt-3 text-sm leading-6 text-muted-foreground",
              isCompact
                ? "line-clamp-4"
                : "max-w-2xl sm:text-base sm:leading-7",
            )}
          >
            {post.excerpt}
          </p>
          <div
            className={cn(
              "relative mt-5 flex gap-4",
              isCompact
                ? "items-end justify-between"
                : "items-center justify-between",
            )}
          >
            <PostTags tags={post.tags} />
            <ArrowUpRight
              className="size-4 shrink-0 text-primary/75 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
