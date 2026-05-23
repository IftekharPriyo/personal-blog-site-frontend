import type { BlogPost } from "@/types/post";

interface PostMetaProps {
  post: Pick<BlogPost, "date" | "readingTime">;
}

export function PostMeta({ post }: PostMetaProps) {
  return (
    <p className="text-sm text-muted-foreground">
      <time dateTime={post.date}>
        {new Intl.DateTimeFormat("en", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(new Date(post.date))}
      </time>
      <span aria-hidden="true"> / </span>
      {post.readingTime}
    </p>
  );
}
