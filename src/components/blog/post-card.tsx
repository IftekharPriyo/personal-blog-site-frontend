import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PostMeta } from "@/components/blog/post-meta";
import { PostTags } from "@/components/blog/post-tags";
import type { BlogPost } from "@/types/post";

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative rounded-lg border border-border/75 bg-card/60 p-5 transition-colors hover:border-primary/35 hover:bg-card">
      <div className="flex h-full flex-col gap-5">
        <PostMeta post={post} />
        <div>
          <h3 className="text-lg font-semibold leading-[1.35]">
            <Link href={`/blog/${post.slug}`} className="focus:outline-none">
              <span className="absolute inset-0 rounded-lg" aria-hidden="true" />
              {post.title}
            </Link>
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
            {post.excerpt}
          </p>
        </div>
        <div className="relative mt-auto flex items-center justify-between gap-4">
          <PostTags tags={post.tags} />
          <ArrowUpRight
            className="size-4 shrink-0 text-primary/75 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  );
}
