import { BlogEmptyState } from "@/components/blog/blog-empty-state";
import { BlogTopicList } from "@/components/blog/blog-topic-list";
import { PostCard } from "@/components/blog/post-card";
import type { BlogPostMeta } from "@/types/post";

interface BlogArchiveProps {
  posts: BlogPostMeta[];
  topics: Array<{
    name: string;
    count: number;
  }>;
}

export function BlogArchive({ posts, topics }: BlogArchiveProps) {
  if (posts.length === 0) {
    return <BlogEmptyState />;
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_14rem] lg:items-start">
      <section aria-labelledby="all-posts-heading">
        <div className="mb-5 flex items-end justify-between gap-4 border-b border-border/70 pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
              {"// All writing"}
            </p>
            <h2 id="all-posts-heading" className="mt-1 text-2xl font-semibold">
              Notes and essays
            </h2>
          </div>
          <p className="shrink-0 font-mono text-xs uppercase tracking-wide text-muted-foreground">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>
        <div className="grid gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
      <BlogTopicList topics={topics} />
    </div>
  );
}
