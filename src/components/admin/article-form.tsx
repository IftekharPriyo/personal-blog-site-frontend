"use client";

import { useState, type FormEvent } from "react";
import { Check, Info, LoaderCircle, Plus, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MdxEditor } from "@/components/admin/mdx-editor";
import type { AdminArticle, AdminOption, ArticleRequestBody, ArticleStatus } from "@/types/admin";

interface ArticleFormProps {
  article?: AdminArticle;
  authorName: string;
  categories: AdminOption[];
  tags: AdminOption[];
}

const selectClassName =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20";

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function ArticleForm({
  article,
  authorName,
  categories,
  tags,
}: ArticleFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [status, setStatus] = useState<ArticleStatus>(article?.status ?? "DRAFT");
  const [slugWasEdited, setSlugWasEdited] = useState(Boolean(article));
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTagIds, setSelectedTagIds] = useState(
    () => new Set(article?.tags.map((tag) => tag.id) ?? []),
  );
  const [newTag, setNewTag] = useState("");
  const [customTags, setCustomTags] = useState<string[]>([]);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugWasEdited) setSlug(toSlug(value));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const excerpt = String(formData.get("excerpt") ?? "").trim();
    const coverImage = String(formData.get("coverImage") ?? "").trim();
    const payload: ArticleRequestBody = {
      title: String(formData.get("title") ?? ""),
      slug: String(formData.get("slug") ?? ""),
      excerpt: excerpt || null,
      content: String(formData.get("content") ?? ""),
      coverImage: coverImage || null,
      status: submitter?.value === "draft" ? "DRAFT" : status,
      categoryId: String(formData.get("categoryId") ?? ""),
      tagIds: [...selectedTagIds],
      newTags: customTags,
    };

    setIsSubmitting(true);
    try {
      const endpoint = article
        ? `/api/admin/articles/${encodeURIComponent(article.id)}`
        : "/api/admin/articles";
      const response = await fetch(endpoint, {
        method: article ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        message?: string;
        errors?: Array<{ field: string; message: string }>;
      };

      if (!response.ok) {
        const details = data.errors?.map((item) => item.message).join(" ");
        setMessage({ type: "error", text: details || data.message || "Unable to create article." });
        return;
      }

      setMessage({
        type: "success",
        text: article ? "Article updated successfully." : "Article created successfully.",
      });
      setStatus(payload.status);
      if (article) router.refresh();
    } catch {
      setMessage({ type: "error", text: "The article service is unavailable. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  function addTag() {
    const tagName = newTag.trim().replace(/\s+/g, " ");
    if (!tagName) return;

    const existingTag = tags.find(
      (tag) => tag.name.toLowerCase() === tagName.toLowerCase(),
    );

    if (existingTag) {
      setSelectedTagIds((current) => new Set(current).add(existingTag.id));
    } else if (
      !customTags.some((tag) => tag.toLowerCase() === tagName.toLowerCase())
    ) {
      setCustomTags((current) => [...current, tagName]);
    }

    setNewTag("");
  }

  function toggleTag(tagId: string, isSelected: boolean) {
    setSelectedTagIds((current) => {
      const next = new Set(current);
      if (isSelected) next.add(tagId);
      else next.delete(tagId);
      return next;
    });
  }

  return (
    <form className="mt-8" onSubmit={handleSubmit}>
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="space-y-7">
          <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
            <div>
              <h2 className="text-lg font-semibold">Article content</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                The title, URL, summary, and main article body.
              </p>
            </div>

            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="title">
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  value={title}
                  onChange={(event) => handleTitleChange(event.target.value)}
                  placeholder="A clear, useful article title"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="slug">
                  Slug
                </label>
                <div className="flex rounded-lg border border-input bg-background focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20">
                  <span className="flex items-center border-r border-input px-3 text-sm text-muted-foreground">
                    /blog/
                  </span>
                  <input
                    id="slug"
                    name="slug"
                    className="h-10 min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"
                    value={slug}
                    onChange={(event) => {
                      setSlugWasEdited(true);
                      setSlug(toSlug(event.target.value));
                    }}
                    pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Must be unique. It is generated from the title until edited.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="excerpt">
                  Excerpt <span className="text-muted-foreground">(optional)</span>
                </label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  className="min-h-24"
                  defaultValue={article?.excerpt ?? ""}
                  placeholder="A concise summary for article cards and metadata."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="content">
                  Content
                </label>
                <MdxEditor defaultValue={article?.content} />
                <p className="text-xs text-muted-foreground">
                  Supports Markdown, GitHub-flavored tables, links, and fenced
                  code blocks. The backend stores the original MDX source.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
            <h2 className="text-lg font-semibold">Media</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Optional cover media for listings and social previews.
            </p>
            <div className="mt-6 space-y-2">
              <label className="text-sm font-medium" htmlFor="coverImage">
                Cover image URL
              </label>
              <Input
                id="coverImage"
                name="coverImage"
                type="url"
                defaultValue={article?.coverImage ?? ""}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </section>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-semibold">Publishing</h2>
            <div className="mt-5 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="status">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className={selectClassName}
                  value={status}
                  onChange={(event) => setStatus(event.target.value as ArticleStatus)}
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
                <p className="text-xs leading-5 text-muted-foreground">
                  The publication time is assigned automatically when the
                  status changes to Published.
                </p>
              </div>

              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">Author</p>
                <p className="font-medium">{authorName}</p>
                <p className="text-xs text-muted-foreground">
                  Assigned from the authenticated session.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-semibold">Organization</h2>
            <div className="mt-5 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="categoryId">
                  Category
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  className={selectClassName}
                  defaultValue={article?.category.id ?? ""}
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <fieldset>
                <legend className="text-sm font-medium">Tags</legend>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Choose existing tags or add new ones. For travel articles,
                  use tags for the country and city.
                </p>
                <div className="mt-3 space-y-2.5">
                  {tags.map((tag) => {
                    return (
                      <label
                        key={tag.id}
                        className="flex cursor-pointer items-center gap-2.5 text-sm"
                      >
                        <input
                          className="size-4 rounded border-input accent-primary"
                          type="checkbox"
                          name="tagIds"
                          value={tag.id}
                          checked={selectedTagIds.has(tag.id)}
                          onChange={(event) =>
                            toggleTag(tag.id, event.target.checked)
                          }
                        />
                        {tag.name}
                      </label>
                    );
                  })}
                </div>

                <div className="mt-5 border-t border-border pt-5">
                  <label className="text-sm font-medium" htmlFor="newTag">
                    Add a new tag
                  </label>
                  <div className="mt-2 flex gap-2">
                    <Input
                      id="newTag"
                      value={newTag}
                      onChange={(event) => setNewTag(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          addTag();
                        }
                      }}
                      placeholder="e.g. Bangladesh or Dhaka"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addTag}
                      disabled={!newTag.trim()}
                    >
                      <Plus aria-hidden="true" />
                      Add
                    </Button>
                  </div>

                  {customTags.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {customTags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/10 py-1 pl-2.5 pr-1.5 text-xs text-primary"
                        >
                          {tag}
                          <button
                            type="button"
                            className="rounded-full p-0.5 transition-colors hover:bg-primary/15"
                            aria-label={`Remove ${tag} tag`}
                            onClick={() =>
                              setCustomTags((current) =>
                                current.filter((item) => item !== tag),
                              )
                            }
                          >
                            <X className="size-3" aria-hidden="true" />
                          </button>
                          <input type="hidden" name="newTags" value={tag} />
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </fieldset>
            </div>
          </section>

          {message ? (
            <div
              className={message.type === "error" ? "rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive" : "rounded-xl border border-primary/25 bg-primary/10 p-4 text-sm"}
              role={message.type === "error" ? "alert" : "status"}
            >
              <div className="flex gap-2">
                <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <p>{message.text}</p>
              </div>
            </div>
          ) : null}

          <div className="grid gap-2">
            <Button type="submit" size="lg" value="selected-status" disabled={isSubmitting || categories.length === 0}>
              {isSubmitting ? <LoaderCircle className="animate-spin" aria-hidden="true" /> : <Check aria-hidden="true" />}
              {isSubmitting ? "Saving…" : article ? "Update article" : "Create article"}
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="outline"
              value="draft"
              disabled={isSubmitting || categories.length === 0}
            >
              <Save aria-hidden="true" />
              Save as draft
            </Button>
          </div>
        </aside>
      </div>
    </form>
  );
}
