import { ArrowRight, FilePlus2, Files, FolderOpen, Tags } from "lucide-react";
import Link from "next/link";
import { ArticleStatus } from "@/components/admin/article-status";
import { buttonVariants } from "@/components/ui/button";
import {
  adminArticles,
  adminCategories,
  adminTags,
} from "@/lib/admin-data";
import { cn } from "@/lib/utils";

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});

export default function DashboardPage() {
  const drafts = adminArticles.filter((article) => article.status === "DRAFT");
  const published = adminArticles.filter(
    (article) => article.status === "PUBLISHED",
  );
  const recentArticles = [...adminArticles]
    .sort(
      (left, right) =>
        new Date(right.updatedAt).getTime() -
        new Date(left.updatedAt).getTime(),
    )
    .slice(0, 4);

  const summary = [
    { label: "All articles", value: adminArticles.length, icon: Files },
    { label: "Published", value: published.length, icon: FolderOpen },
    { label: "Drafts", value: drafts.length, icon: FilePlus2 },
    { label: "Tags", value: adminTags.length, icon: Tags },
  ];

  return (
    <div className="mx-auto max-w-6xl animate-fade-in">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase text-primary">Overview</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Editorial dashboard
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            A quiet workspace for drafting, organizing, and preparing journal
            articles.
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className={cn(buttonVariants({ size: "lg" }), "self-start sm:self-auto")}
        >
          <FilePlus2 aria-hidden="true" />
          Create article
        </Link>
      </div>

      <section className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Content summary">
        {summary.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <Icon className="size-4 text-primary" aria-hidden="true" />
              </div>
              <p className="mt-4 text-3xl font-semibold">{item.value}</p>
            </div>
          );
        })}
      </section>

      <section className="mt-10" aria-labelledby="recent-articles">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-primary">Writing activity</p>
            <h2 id="recent-articles" className="mt-1 text-2xl font-semibold">
              Recently updated
            </h2>
          </div>
          <Link
            href="/admin/articles"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            All articles
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card">
          <div className="divide-y divide-border">
            {recentArticles.map((article) => (
              <div
                key={article.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <Link
                    href={`/admin/articles/${article.id}/edit`}
                    className="font-medium transition-colors hover:text-primary"
                  >
                    {article.title}
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {article.category.name} · Updated {dateFormatter.format(new Date(article.updatedAt))}
                  </p>
                </div>
                <ArticleStatus status={article.status} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <p className="mt-6 text-xs text-muted-foreground">
        Preview data · {adminCategories.length} categories are represented from
        the current content schema.
      </p>
    </div>
  );
}
