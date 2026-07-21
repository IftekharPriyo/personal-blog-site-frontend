"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import {
  Bold,
  Code2,
  Eye,
  Heading2,
  ImagePlus,
  Info,
  Italic,
  Link,
  List,
  ListOrdered,
  LoaderCircle,
  Pencil,
  Quote,
} from "lucide-react";
import { mdxComponents } from "@/components/blog/mdx-components";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { waitForImage } from "@/lib/image-readiness";
import { cn } from "@/lib/utils";

interface MdxEditorProps {
  defaultValue?: string;
}

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const SUPPORTED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export function MdxEditor({ defaultValue = "" }: MdxEditorProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState(defaultValue);
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [source, setSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadMessage, setImageUploadMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  function insertSyntax(before: string, after: string, placeholder: string) {
    const editor = document.getElementById("content") as HTMLTextAreaElement | null;
    if (!editor) return;

    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = editor.value.slice(start, end) || placeholder;
    const inserted = `${before}${selected}${after}`;
    editor.focus();
    editor.setSelectionRange(start, end);

    // insertText participates in the browser's native Ctrl/Cmd+Z history.
    const insertedNatively = document.execCommand("insertText", false, inserted);
    if (!insertedNatively) {
      editor.setRangeText(inserted, start, end, "end");
      editor.dispatchEvent(new Event("input", { bubbles: true }));
    }

    setContent(editor.value);
    editor.setSelectionRange(start + before.length, start + before.length + selected.length);
  }

  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    setImageUploadMessage(null);

    if (!file) return;

    if (!SUPPORTED_IMAGE_TYPES.has(file.type)) {
      setImageUploadMessage({
        type: "error",
        text: "Only JPG, PNG, and WEBP images are supported.",
      });
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setImageUploadMessage({
        type: "error",
        text: "Article images must be 5MB or smaller.",
      });
      return;
    }

    const uploadData = new FormData();
    uploadData.append("image", file);
    setIsUploadingImage(true);

    try {
      const response = await fetch("/api/admin/uploads/article-image", {
        method: "POST",
        body: uploadData,
      });
      const data = (await response.json()) as { message?: string; url?: string };

      if (!response.ok || !data.url) {
        setImageUploadMessage({
          type: "error",
          text: data.message || "Unable to upload the article image.",
        });
        return;
      }

      let isOptimized = true;
      try {
        await waitForImage(data.url);
      } catch {
        isOptimized = false;
      }

      insertSyntax("\n\n![", `](${data.url})\n\n`, "Describe this image");
      setImageUploadMessage({
        type: "success",
        text: isOptimized
          ? "Image optimized and inserted. Replace the selected text with useful alt text."
          : "Image inserted, but optimization is still processing. Its preview may take a little longer.",
      });
    } catch {
      setImageUploadMessage({
        type: "error",
        text: "The image upload service is unavailable. Please try again.",
      });
    } finally {
      setIsUploadingImage(false);
    }
  }

  const tools = [
    { label: "Heading", icon: Heading2, before: "## ", after: "", placeholder: "Heading" },
    { label: "Bold", icon: Bold, before: "**", after: "**", placeholder: "bold text" },
    { label: "Italic", icon: Italic, before: "_", after: "_", placeholder: "italic text" },
    { label: "Link", icon: Link, before: "[", after: "](https://example.com)", placeholder: "link text" },
    { label: "Bulleted list", icon: List, before: "- ", after: "", placeholder: "List item" },
    { label: "Numbered list", icon: ListOrdered, before: "1. ", after: "", placeholder: "List item" },
    { label: "Quote", icon: Quote, before: "> ", after: "", placeholder: "Quote" },
    { label: "Code block", icon: Code2, before: "```js\n", after: "\n```", placeholder: "const example = true;" },
    { label: "Callout", icon: Info, before: "<Callout>\n\n", after: "\n\n</Callout>", placeholder: "Important information" },
  ];

  useEffect(() => {
    if (mode !== "preview" || !content.trim()) return;

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/admin/mdx-preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
          signal: controller.signal,
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message ?? "Unable to preview MDX");
        setSource(result);
        setError("");
      } catch (previewError) {
        if (!controller.signal.aborted) {
          setSource(null);
          setError(previewError instanceof Error ? previewError.message : "Unable to preview MDX");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }, 300);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [content, mode]);

  return (
    <div className="overflow-hidden rounded-lg border border-input">
      <div className="flex items-center gap-1 border-b border-border bg-muted/35 p-1.5">
        <Button type="button" size="sm" variant={mode === "write" ? "secondary" : "ghost"} onClick={() => setMode("write")}>
          <Pencil aria-hidden="true" /> Write
        </Button>
        <Button type="button" size="sm" variant={mode === "preview" ? "secondary" : "ghost"} onClick={() => setMode("preview")}>
          <Eye aria-hidden="true" /> Preview
        </Button>
        <span className="ml-auto pr-2 text-xs text-muted-foreground">MDX</span>
      </div>

      {mode === "write" ? (
        <div>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            tabIndex={-1}
            onChange={handleImageUpload}
          />
          <Textarea
            id="content"
            name="content"
            className="min-h-[28rem] resize-y rounded-none border-0 font-mono text-[0.84rem] focus-visible:ring-0"
            defaultValue={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder={"## Heading\n\nWrite with **Markdown**, tables, links, and fenced code blocks."}
            maxLength={900000}
            required
          />
          {imageUploadMessage ? (
            <p
              role="status"
              className={cn(
                "border-t border-border px-3 py-2 text-xs",
                imageUploadMessage.type === "error"
                  ? "text-destructive"
                  : "text-muted-foreground",
              )}
            >
              {imageUploadMessage.text}
            </p>
          ) : null}
          <div className="flex gap-1 overflow-x-auto border-t border-border bg-background p-1.5" role="toolbar" aria-label="Insert MDX formatting">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              title="Upload article image"
              aria-label="Upload article image"
              disabled={isUploadingImage}
              onClick={() => imageInputRef.current?.click()}
            >
              {isUploadingImage ? (
                <LoaderCircle className="animate-spin" aria-hidden="true" />
              ) : (
                <ImagePlus aria-hidden="true" />
              )}
              <span className="hidden lg:inline">
                {isUploadingImage ? "Uploading" : "Image"}
              </span>
            </Button>
            {tools.map((tool) => (
              <Button
                key={tool.label}
                type="button"
                size="sm"
                variant="ghost"
                title={tool.label}
                aria-label={tool.label}
                onClick={() => insertSyntax(tool.before, tool.after, tool.placeholder)}
              >
                <tool.icon aria-hidden="true" />
                <span className="hidden lg:inline">{tool.label}</span>
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mdx-content min-h-[28rem] p-5 sm:p-6">
          {isLoading ? <p className="text-sm text-muted-foreground">Compiling preview…</p> : null}
          {!isLoading && content.trim() && error ? <p className="text-sm text-destructive">{error}</p> : null}
          {!isLoading && content.trim() && !error && source ? <MDXRemote {...source} components={mdxComponents} /> : null}
          {!isLoading && !content.trim() ? <p className="text-sm text-muted-foreground">Add some MDX content to preview it.</p> : null}
        </div>
      )}
    </div>
  );
}
