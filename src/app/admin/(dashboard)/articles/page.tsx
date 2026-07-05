import { FilePlus2 } from "lucide-react";
import Link from "next/link";
import { ArticleList } from "@/components/admin/article-list";
import { buttonVariants } from "@/components/ui/button";
import { getAdminArticles } from "@/lib/articles";
import { cn } from "@/lib/utils";

export default async function ArticlesPage() {
  const articles = await getAdminArticles();

  return (
    <div className="mx-auto max-w-6xl animate-fade-in">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase text-primary">Content</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Articles</h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            Review drafts, published writing, and archived work in one place.
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

      <ArticleList articles={articles} />
    </div>
  );
}
