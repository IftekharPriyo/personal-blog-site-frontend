import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/admin/article-form";
import { getAdminArticle, getArticleOptions } from "@/lib/articles";

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;
  const [article, options] = await Promise.all([
    getAdminArticle(id),
    getArticleOptions(),
  ]);

  if (!article) notFound();

  return (
    <div className="mx-auto max-w-6xl animate-fade-in">
      <div>
        <p className="text-sm font-medium uppercase text-primary">Articles</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
          Edit article
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
          Update the content, organization, and publishing state for this article.
        </p>
      </div>

      <ArticleForm
        article={article}
        authorName={article.author.name}
        categories={options.categories}
        tags={options.tags}
      />
    </div>
  );
}
