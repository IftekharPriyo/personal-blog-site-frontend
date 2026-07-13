"use client";

import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { BlogEmptyState } from "@/components/blog/blog-empty-state";
import { BlogTopicList } from "@/components/blog/blog-topic-list";
import { PostCard } from "@/components/blog/post-card";
import { cn } from "@/lib/utils";
import type { BlogPostMeta } from "@/types/post";

type ArchiveView = "grid" | "list";

interface BlogArchiveProps {
  posts: BlogPostMeta[];
  topics: Array<{
    name: string;
    count: number;
  }>;
}

export function BlogArchive({ posts, topics }: BlogArchiveProps) {
  const [view, setView] = useState<ArchiveView>("grid");

  if (posts.length === 0) {
    return <BlogEmptyState />;
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_14rem] lg:items-start">
      <section aria-labelledby="all-posts-heading">
        <div className="mb-5 flex items-end justify-between gap-4 border-b border-border/70 pb-4">
          <div>
            <p className="text-sm text-primary">All writing</p>
            <h2 id="all-posts-heading" className="mt-1 text-2xl font-semibold">
              Notes and essays
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <p className="text-sm text-muted-foreground">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </p>
            <div
              className="hidden rounded-lg border border-border/75 bg-card/60 p-1 sm:flex"
              role="group"
              aria-label="Article layout"
            >
              <button
                type="button"
                onClick={() => setView("grid")}
                aria-label="Grid view"
                aria-pressed={view === "grid"}
                title="Grid view"
                className={cn(
                  "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  view === "grid" &&
                    "bg-secondary text-foreground shadow-[0_1px_2px_rgba(24,21,18,0.08)]",
                )}
              >
                <LayoutGrid className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                aria-label="List view"
                aria-pressed={view === "list"}
                title="List view"
                className={cn(
                  "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  view === "list" &&
                    "bg-secondary text-foreground shadow-[0_1px_2px_rgba(24,21,18,0.08)]",
                )}
              >
                <List className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <div
          className={cn(
            "grid gap-4",
            view === "grid" && "sm:grid-cols-2",
          )}
        >
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
              variant={view === "grid" ? "compact" : "default"}
            />
          ))}
        </div>
      </section>
      <BlogTopicList topics={topics} />
    </div>
  );
}
