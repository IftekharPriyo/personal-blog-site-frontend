"use client";

import { useMemo, useState } from "react";
import { Edit3, Search } from "lucide-react";
import Link from "next/link";
import { ArticleStatus } from "@/components/admin/article-status";
import { Input } from "@/components/ui/input";
import type { AdminArticle, ArticleStatus as Status } from "@/types/admin";

interface ArticleListProps {
  articles: AdminArticle[];
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});

export function ArticleList({ articles }: ArticleListProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status | "ALL">("ALL");

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesStatus = status === "ALL" || article.status === status;
      const matchesQuery =
        !normalizedQuery ||
        article.title.toLowerCase().includes(normalizedQuery) ||
        article.slug.toLowerCase().includes(normalizedQuery) ||
        article.category.name.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [articles, query, status]);

  return (
    <div className="mt-8">
      <div className="grid gap-3 border-y border-border py-4 sm:grid-cols-[minmax(0,1fr)_12rem]">
        <label className="relative">
          <span className="sr-only">Search articles</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            className="pl-9"
            type="search"
            placeholder="Search title, slug, or category"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label>
          <span className="sr-only">Filter by status</span>
          <select
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as Status | "ALL")
            }
          >
            <option value="ALL">All statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </label>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="border-b border-border bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">Article</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-5 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredArticles.map((article) => (
                <tr key={article.id} className="transition-colors hover:bg-secondary/35">
                  <td className="max-w-sm px-5 py-4">
                    <p className="truncate font-medium">{article.title}</p>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      /{article.slug}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <ArticleStatus status={article.status} />
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    {article.category.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                    {dateFormatter.format(new Date(article.updatedAt))}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/articles/${article.id}/edit`}
                      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 font-medium text-primary transition-colors hover:bg-primary/10"
                    >
                      <Edit3 className="size-3.5" aria-hidden="true" />
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="font-medium">No articles found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different search term or status.
            </p>
          </div>
        ) : null}
      </div>

      <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
        Showing {filteredArticles.length} of {articles.length} articles
      </p>
    </div>
  );
}
