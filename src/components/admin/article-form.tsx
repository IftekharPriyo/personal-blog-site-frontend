"use client";

import { useState, type FormEvent } from "react";
import { Check, Info, Plus, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { AdminArticle, AdminOption } from "@/types/admin";
import { cn } from "@/lib/utils";

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

function toDateTimeLocal(value: string | null | undefined) {
  return value ? value.slice(0, 16) : "";
}

export function ArticleForm({
  article,
  authorName,
  categories,
  tags,
}: ArticleFormProps) {
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugWasEdited, setSlugWasEdited] = useState(Boolean(article));
  const [showApiNotice, setShowApiNotice] = useState(false);
  const [selectedTagIds, setSelectedTagIds] = useState(
    () => new Set(article?.tags.map((tag) => tag.id) ?? []),
  );
  const [newTag, setNewTag] = useState("");
  const [customTags, setCustomTags] = useState<string[]>([]);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugWasEdited) setSlug(toSlug(value));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowApiNotice(true);
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
                  defaultValue={article?.excerpt}
                  placeholder="A concise summary for article cards and metadata."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="content">
                  Content
                </label>
                <Textarea
                  id="content"
                  name="content"
                  className="min-h-[28rem] font-mono text-[0.84rem]"
                  defaultValue={article?.content}
                  placeholder="Write the article content here. Markdown support can be connected with the content API."
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Stored in the backend as text. This structure is ready for a
                  Markdown or rich-text editor later.
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
                defaultValue={article?.coverImage}
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
                  defaultValue={article?.status ?? "DRAFT"}
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="publishedAt">
                  Publish date <span className="text-muted-foreground">(optional)</span>
                </label>
                <Input
                  id="publishedAt"
                  name="publishedAt"
                  type="datetime-local"
                  defaultValue={toDateTimeLocal(article?.publishedAt)}
                />
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

          {showApiNotice ? (
            <div
              className="rounded-xl border border-primary/25 bg-primary/10 p-4 text-sm"
              role="status"
            >
              <div className="flex gap-2">
                <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <p>
                  Article APIs are not connected yet. The form is complete, but
                  no data was saved.
                </p>
              </div>
            </div>
          ) : null}

          <div className="grid gap-2">
            <Button type="submit" size="lg">
              <Check aria-hidden="true" />
              {article ? "Update article" : "Create article"}
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="outline"
              className={cn(showApiNotice && "border-primary/40")}
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
