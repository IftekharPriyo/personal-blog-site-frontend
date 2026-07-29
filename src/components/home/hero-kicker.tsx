"use client";

import { useEffect, useState } from "react";

const words = ["JOURNAL", "SHOWCASE", "LESSONS"] as const;
const ROTATION_INTERVAL_MS = 2200;

export function HeroKicker() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % words.length);
    }, ROTATION_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <p
      className="inline-flex items-center gap-2 font-mono text-sm font-medium uppercase tracking-[0.16em]"
      aria-label={`Dev ${words[activeIndex].toLowerCase()}`}
    >
      <span className="text-muted-foreground">DEV</span>
      <span className="relative inline-grid h-5 min-w-[6.8rem] overflow-hidden text-primary">
        {words.map((word, index) => (
          <span
            key={word}
            aria-hidden={index !== activeIndex}
            className={
              index === activeIndex
                ? "hero-kicker-word row-start-1 col-start-1 opacity-100"
                : "row-start-1 col-start-1 translate-y-3 opacity-0"
            }
          >
            {word}
          </span>
        ))}
      </span>
    </p>
  );
}
