"use client";

import { useEffect, useState } from "react";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import {
  Bold,
  Code2,
  Eye,
  Heading2,
  Info,
  Italic,
  Link,
  List,
  ListOrdered,
  Pencil,
  Quote,
} from "lucide-react";
import { mdxComponents } from "@/components/blog/mdx-components";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface MdxEditorProps {
  defaultValue?: string;
}

export function MdxEditor({ defaultValue = "" }: MdxEditorProps) {
  const [content, setContent] = useState(defaultValue);
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [source, setSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
          <div className="flex gap-1 overflow-x-auto border-t border-border bg-background p-1.5" role="toolbar" aria-label="Insert MDX formatting">
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
