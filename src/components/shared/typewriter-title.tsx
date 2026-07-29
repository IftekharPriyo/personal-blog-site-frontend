"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterTitleProps {
  className?: string;
  text: string;
}

const START_DELAY_MS = 400;
const CHARACTER_DELAY_MS = 48;

function delayAfter(character: string) {
  if (/[.!?]/.test(character)) return 170;
  if (/[,;:]/.test(character)) return 100;
  return CHARACTER_DELAY_MS;
}

export function TypewriterTitle({ className, text }: TypewriterTitleProps) {
  const characters = useMemo(() => Array.from(text), [text]);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (characters.length === 0) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (reducedMotion.matches) {
      const frame = requestAnimationFrame(() => setVisibleCount(characters.length));
      return () => cancelAnimationFrame(frame);
    }

    let nextIndex = 0;
    const typeNextCharacter = () => {
      nextIndex += 1;
      setVisibleCount(nextIndex);

      if (nextIndex < characters.length) {
        timeout = setTimeout(
          typeNextCharacter,
          delayAfter(characters[nextIndex - 1]),
        );
      }
    };

    timeout = setTimeout(typeNextCharacter, START_DELAY_MS);
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [characters]);

  const isTyping = visibleCount < characters.length;

  return (
    <h1 className={cn("relative", className)}>
      <span className="opacity-0 motion-reduce:opacity-100">{text}</span>
      <span
        className="absolute inset-0 motion-reduce:hidden"
        aria-hidden="true"
      >
        {characters.slice(0, visibleCount).join("")}
        {isTyping && characters.length > 0 ? (
          <span className="typewriter-cursor" />
        ) : null}
      </span>
    </h1>
  );
}
