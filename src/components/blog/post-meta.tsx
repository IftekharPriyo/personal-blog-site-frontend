import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { BlogPostMeta } from "@/types/post";

interface PostMetaProps {
  post: Pick<BlogPostMeta, "date" | "readingTime">;
  showAuthor?: boolean;
}

export function PostMeta({ post, showAuthor = false }: PostMetaProps) {
  return (
    <p className="text-xs font-medium uppercase text-muted-foreground/75">
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
      {showAuthor ? (
        <>
          <span className="px-2 text-primary/70" aria-hidden="true">
            /
          </span>
          By{" "}
          <Link
            href="/about"
            rel="author"
            className="transition-colors hover:text-primary"
          >
            {siteConfig.author.name}
          </Link>
        </>
      ) : null}
    </p>
  );
}
