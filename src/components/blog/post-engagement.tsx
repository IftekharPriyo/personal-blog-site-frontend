"use client";

import { useEffect, useState } from "react";
import { Eye, Heart } from "lucide-react";

interface PostEngagementProps {
  initialLoveCount: number;
  initialViewCount: number;
  slug: string;
}

interface LoveResponse {
  loved: boolean;
  loveCount: number;
}

const TRACKING_DELAY_MS = 3_000;
const numberFormatter = new Intl.NumberFormat("en");

function isLoveResponse(value: unknown): value is LoveResponse {
  if (!value || typeof value !== "object") return false;
  const result = value as Record<string, unknown>;
  return typeof result.loved === "boolean" && typeof result.loveCount === "number";
}

export function PostEngagement({
  initialLoveCount,
  initialViewCount,
  slug,
}: PostEngagementProps) {
  const [viewCount, setViewCount] = useState(initialViewCount);
  const [loveCount, setLoveCount] = useState(initialLoveCount);
  const [loved, setLoved] = useState(false);
  const [loveStatusLoaded, setLoveStatusLoaded] = useState(false);
  const [lovePending, setLovePending] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;
    let tracked = false;

    const trackView = () => {
      if (tracked) return;

      if (document.visibilityState !== "visible") {
        if (timeout) clearTimeout(timeout);
        timeout = undefined;
        return;
      }

      if (timeout) return;

      timeout = setTimeout(async () => {
        tracked = true;
        try {
          const response = await fetch(
            `/api/posts/${encodeURIComponent(slug)}/view`,
            { method: "POST", keepalive: true },
          );
          if (!response.ok || cancelled) return;

          const data = (await response.json()) as { viewCount?: unknown };
          if (typeof data.viewCount === "number") setViewCount(data.viewCount);
        } catch {
          // Engagement tracking should never interrupt the reading experience.
        }
      }, TRACKING_DELAY_MS);
    };

    trackView();
    document.addEventListener("visibilitychange", trackView);

    return () => {
      cancelled = true;
      if (timeout) clearTimeout(timeout);
      document.removeEventListener("visibilitychange", trackView);
    };
  }, [slug]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadLoveStatus() {
      try {
        const response = await fetch(`/api/posts/${encodeURIComponent(slug)}/love`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) return;

        const data: unknown = await response.json();
        if (!isLoveResponse(data)) return;

        setLoved(data.loved);
        setLoveCount(data.loveCount);
      } catch {
        // Keep the initial count when the status service is unavailable.
      } finally {
        if (!controller.signal.aborted) setLoveStatusLoaded(true);
      }
    }

    void loadLoveStatus();
    return () => controller.abort();
  }, [slug]);

  async function toggleLove() {
    if (!loveStatusLoaded || lovePending) return;

    const previousLoved = loved;
    const previousCount = loveCount;
    const nextLoved = !previousLoved;

    setLovePending(true);
    setLoved(nextLoved);
    setLoveCount(Math.max(0, previousCount + (nextLoved ? 1 : -1)));

    try {
      const response = await fetch(`/api/posts/${encodeURIComponent(slug)}/love`, {
        method: nextLoved ? "PUT" : "DELETE",
      });
      const data: unknown = await response.json();
      if (!response.ok || !isLoveResponse(data)) throw new Error("Unable to update love");

      setLoved(data.loved);
      setLoveCount(data.loveCount);
    } catch {
      setLoved(previousLoved);
      setLoveCount(previousCount);
    } finally {
      setLovePending(false);
    }
  }

  const viewLabel = `${numberFormatter.format(viewCount)} unique ${
    viewCount === 1 ? "reader" : "readers"
  }`;
  const loveLabel = loved ? "Remove your love from this article" : "Love this article";

  return (
    <footer className="mt-14 flex items-center justify-between border-t border-border pt-6">
      <button
        type="button"
        className="flex items-center gap-2 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
        aria-label={loveLabel}
        aria-pressed={loved}
        disabled={!loveStatusLoaded || lovePending}
        onClick={toggleLove}
      >
        <Heart
          className={`size-4 transition-colors ${
            loved ? "fill-primary text-primary" : "text-primary/80"
          }`}
          aria-hidden="true"
        />
        <span aria-live="polite">{numberFormatter.format(loveCount)}</span>
      </button>
      <p
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
        aria-label={viewLabel}
        aria-live="polite"
      >
        <Eye className="size-4 text-primary/80" aria-hidden="true" />
        <span>{numberFormatter.format(viewCount)}</span>
      </p>
    </footer>
  );
}
