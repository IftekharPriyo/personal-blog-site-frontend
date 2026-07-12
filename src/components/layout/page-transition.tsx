"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { NeonTechBackground } from "@/components/home/neon-tech-background";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");
  const isBlogDetailRoute = pathname.startsWith("/blog/");
  const isHomeRoute = pathname === "/";

  if (isAdminRoute) {
    return children;
  }

  const intensity = isHomeRoute
    ? "strong"
    : isBlogDetailRoute
      ? "subtle"
      : "medium";

  return (
    <>
      <NeonTechBackground intensity={intensity} />
      <div
        key={pathname}
        className={
          isBlogDetailRoute
            ? "public-neon-content"
            : "public-neon-content animate-fade-in"
        }
      >
        {children}
      </div>
    </>
  );
}
