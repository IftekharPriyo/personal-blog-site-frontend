"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function WhoamiMascot() {
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return (
    <Link
      href="/about"
      aria-label="Open the WhoAmI about page"
      className="whoami-mascot group fixed bottom-4 right-3 z-50 sm:bottom-5 sm:right-4 lg:bottom-8 lg:right-8"
    >
      <span className="pointer-events-none absolute bottom-full right-1 mb-1.5 translate-y-0 rounded-full border border-border/75 bg-card/90 px-2.5 py-1 font-mono text-[0.68rem] text-primary opacity-100 shadow-[var(--surface-shadow)] backdrop-blur transition-all duration-300 sm:mb-2 sm:translate-y-1 sm:px-3 sm:py-1.5 sm:text-xs sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-visible:translate-y-0 sm:group-focus-visible:opacity-100">
        whoami?
      </span>

      <span className="relative flex size-14 items-center justify-center rounded-full p-1 drop-shadow-[0_12px_18px_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-focus-visible:-translate-y-1 group-focus-visible:scale-105 group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background sm:size-16 lg:size-20">
        <DotLottieReact
          src="/lottie/whoami-owl.lottie"
          autoplay
          loop
          className="size-full"
        />
      </span>
    </Link>
  );
}
