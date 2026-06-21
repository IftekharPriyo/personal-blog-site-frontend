"use client";

import { useState, type ReactNode } from "react";
import {
  ExternalLink,
  FilePlus2,
  Files,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/articles", label: "Articles", icon: Files },
  { href: "/admin/articles/new", label: "Create article", icon: FilePlus2 },
];

interface DashboardShellProps {
  children: ReactNode;
  admin: {
    name: string;
    email: string;
  };
}

export function DashboardShell({ children, admin }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function signOut() {
    setIsSigningOut(true);

    try {
      await fetch("/api/admin/session", { method: "DELETE" });
      router.replace("/admin");
      router.refresh();
    } finally {
      setIsSigningOut(false);
    }
  }

  const sidebar = (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex min-h-[5.3rem] items-center justify-between gap-2 border-b border-sidebar-border px-3 py-4 sm:px-5">
        <div className={cn("min-w-0", isSidebarCollapsed && "lg:hidden")}>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-sidebar-primary">
            The Journal
          </p>
          <p className="mt-1.5 text-lg font-semibold">Administration</p>
        </div>
        <span
          className={cn(
            "hidden text-lg font-semibold text-sidebar-primary",
            isSidebarCollapsed && "lg:inline",
          )}
          aria-hidden="true"
        >
          J.
        </span>
        <Button
          className="hidden lg:inline-flex"
          variant="ghost"
          size="icon"
          aria-label={
            isSidebarCollapsed
              ? "Expand admin navigation"
              : "Collapse admin navigation"
          }
          aria-expanded={!isSidebarCollapsed}
          onClick={() => setIsSidebarCollapsed((current) => !current)}
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen aria-hidden="true" />
          ) : (
            <PanelLeftClose aria-hidden="true" />
          )}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-3" aria-label="Admin navigation">
        {navigation.map((item) => {
          const isActive =
            item.href === "/admin/articles"
              ? pathname === item.href ||
                (pathname.startsWith(`${item.href}/`) &&
                  pathname !== "/admin/articles/new")
              : pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsNavigationOpen(false)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                isSidebarCollapsed && "lg:justify-center lg:px-2",
                isActive
                  ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
              title={isSidebarCollapsed ? item.label : undefined}
            >
              <Icon className="size-4" aria-hidden="true" />
              <span className={cn(isSidebarCollapsed && "lg:hidden")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div
          className={cn(
            "min-w-0 px-1",
            isSidebarCollapsed && "lg:hidden",
          )}
        >
          <p className="truncate text-sm font-medium">{admin.name}</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {admin.email}
          </p>
        </div>
        <div
          className={cn(
            "mt-4 grid grid-cols-2 gap-2",
            isSidebarCollapsed && "lg:grid-cols-1",
          )}
        >
          <Link
            href="/"
            target="_blank"
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-sidebar-border px-2 text-xs font-medium transition-colors hover:bg-sidebar-accent"
            aria-label={isSidebarCollapsed ? "View site" : undefined}
            title={isSidebarCollapsed ? "View site" : undefined}
          >
            <span className={cn(isSidebarCollapsed && "lg:hidden")}>
              View site
            </span>
            <ExternalLink className="size-3" aria-hidden="true" />
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            disabled={isSigningOut}
            aria-label={isSidebarCollapsed ? "Sign out" : undefined}
            title={isSidebarCollapsed ? "Sign out" : undefined}
          >
            {isSigningOut ? (
              <LoaderCircle className="animate-spin" aria-hidden="true" />
            ) : (
              <LogOut aria-hidden="true" />
            )}
            <span className={cn(isSidebarCollapsed && "lg:hidden")}>
              Sign out
            </span>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden bg-background">
      <div
        className={cn(
          "hidden h-screen shrink-0 border-r border-sidebar-border transition-[width] duration-200 lg:block",
          isSidebarCollapsed ? "w-[4.5rem]" : "w-64",
        )}
      >
        <aside data-scroll-container className="h-full overflow-y-auto">
          {sidebar}
        </aside>
      </div>

      <div
        data-scroll-container
        className="flex h-screen min-w-0 flex-1 flex-col overflow-y-auto"
      >
        <SiteHeader />

        <div className="flex items-center justify-between border-b border-border bg-background px-5 py-3 lg:hidden">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-primary">
              Administration
            </p>
            <p className="mt-0.5 text-sm font-medium">The Journal</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            aria-label="Open admin navigation"
            aria-controls="admin-mobile-navigation"
            aria-expanded={isNavigationOpen}
            onClick={() => setIsNavigationOpen(true)}
          >
            <Menu aria-hidden="true" />
          </Button>
        </div>

        {isNavigationOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              className="absolute inset-0 bg-foreground/30 backdrop-blur-[2px]"
              aria-label="Close admin navigation"
              onClick={() => setIsNavigationOpen(false)}
            />
            <aside
              id="admin-mobile-navigation"
              className="relative h-full w-[min(19rem,88vw)] border-r border-sidebar-border shadow-xl"
            >
              <Button
                className="absolute right-3 top-3 z-10"
                variant="ghost"
                size="icon"
                aria-label="Close admin navigation"
                onClick={() => setIsNavigationOpen(false)}
              >
                <X aria-hidden="true" />
              </Button>
              {sidebar}
            </aside>
          </div>
        ) : null}

        <main className="flex-1 px-5 py-8 sm:px-7 sm:py-10 lg:px-10 xl:px-12">
          {children}
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
