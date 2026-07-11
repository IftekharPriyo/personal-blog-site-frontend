"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");
  const isBlogDetailRoute = pathname.startsWith("/blog/");

  if (isAdminRoute || isBlogDetailRoute) {
    return children;
  }

  return (
    <div key={pathname} className="animate-fade-in">
      {children}
    </div>
  );
}
