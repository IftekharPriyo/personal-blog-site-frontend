import type { BlogPostMeta } from "@/types/post";

interface PostMetaProps {
  post: Pick<BlogPostMeta, "date" | "readingTime">;
}

export function PostMeta({ post }: PostMetaProps) {
  return (
    <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.08em] text-muted-foreground/75">
      <time dateTime={post.date}>
        {new Intl.DateTimeFormat("en", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(new Date(post.date))}
      </time>
      <span className="px-2 text-primary/70" aria-hidden="true">
        /
      </span>
      {post.readingTime}
    </p>
  );
}
