import { ArticleForm } from "@/components/admin/article-form";
import { getArticleOptions } from "@/lib/articles";
import { getAdminSession } from "@/lib/auth";

export default async function CreateArticlePage() {
  const admin = await getAdminSession();
  const { categories, tags } = await getArticleOptions();

  return (
    <div className="mx-auto max-w-6xl animate-fade-in">
      <div>
        <p className="text-sm font-medium uppercase text-primary">Articles</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
          Create an article
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
          Shape a new piece of writing and prepare its publishing details.
        </p>
      </div>

      <ArticleForm
        authorName={admin?.name ?? "Administrator"}
        categories={categories}
        tags={tags}
      />
    </div>
  );
}
