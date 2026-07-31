"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";

interface ArticleShareProps {
  description: string;
  heading?: string;
  helperText?: string;
  title: string;
  url: string;
}

type CopyStatus = "idle" | "copied" | "error";

const actionClassName =
  "inline-flex h-8 items-center gap-1.5 rounded-md border border-border/70 bg-background/65 px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/35 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function ArticleShare({
  description,
  heading = "Share this article",
  helperText = "Send it to someone who might find it useful.",
  title,
  url,
}: ArticleShareProps) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
    },
    [],
  );

  function scheduleStatusReset() {
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopyStatus("idle"), 2_000);
  }

  async function copyLink() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement("textarea");
        input.value = url;
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        const copied = document.execCommand("copy");
        input.remove();
        if (!copied) throw new Error("Copy command failed");
      }

      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }

    scheduleStatusReset();
  }

  async function shareArticle() {
    if (!navigator.share) {
      await copyLink();
      return;
    }

    try {
      await navigator.share({ title, text: description, url });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      await copyLink();
    }
  }

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
  const copyLabel =
    copyStatus === "copied"
      ? "Copied"
      : copyStatus === "error"
        ? "Copy failed"
        : "Copy link";

  return (
    <section
      className="mt-14 rounded-lg border border-border/70 bg-card/45 p-4 sm:flex sm:items-center sm:justify-between sm:gap-5"
      aria-labelledby="share-article-heading"
    >
      <div>
        <h2 id="share-article-heading" className="text-sm font-semibold">
          {heading}
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {helperText}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 sm:mt-0">
        <button type="button" className={actionClassName} onClick={shareArticle}>
          <Share2 className="size-3.5" aria-hidden="true" />
          Share
        </button>
        <button type="button" className={actionClassName} onClick={copyLink}>
          {copyStatus === "copied" ? (
            <Check className="size-3.5 text-primary" aria-hidden="true" />
          ) : (
            <Link2 className="size-3.5" aria-hidden="true" />
          )}
          <span aria-live="polite">{copyLabel}</span>
        </button>
        {[
          ["Facebook", facebookUrl],
          ["X", xUrl],
          ["LinkedIn", linkedInUrl],
          ["WhatsApp", whatsappUrl],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className={actionClassName}
          >
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
