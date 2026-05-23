import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PostMeta } from "@/components/blog/post-meta";
import { PostTags } from "@/components/blog/post-tags";
import type { BlogPost } from "@/types/post";

interface FeaturedPostProps {
  post: BlogPost;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="rounded-lg border border-border/80 bg-card/85 p-6 text-card-foreground shadow-[0_1px_0_rgba(31,31,31,0.03)] transition-colors hover:border-primary/35 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_16rem] lg:items-end">
        <div>
          <PostMeta post={post} />
          <h3 className="mt-4 max-w-2xl text-2xl font-semibold leading-[1.18] sm:text-3xl">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            {post.excerpt}
          </p>
        </div>
        <div className="flex flex-col gap-5 lg:items-end">
          <PostTags tags={post.tags} />
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground"
          >
            Read the post
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
