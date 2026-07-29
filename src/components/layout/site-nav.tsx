"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

interface SiteNavProps {
  variant: "desktop" | "mobile";
}

export function SiteNav({ variant }: SiteNavProps) {
  const pathname = usePathname();

  if (variant === "desktop") {
    return (
      <nav
        aria-label="Primary navigation"
        className="hidden items-center gap-1 sm:flex"
      >
        {siteConfig.navItems.map((item) => {
          const isActive = isActiveRoute(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                "after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform",
                isActive && "text-foreground after:scale-x-100",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav aria-label="Primary navigation" className="flex gap-1 pb-3 sm:hidden">
      {siteConfig.navItems.map((item) => {
        const isActive = isActiveRoute(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative flex-1 rounded-md px-3 py-2 text-center text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
              "after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform",
              isActive && "text-foreground after:scale-x-100",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
