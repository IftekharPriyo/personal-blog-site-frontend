import Link from "next/link";
import { Container } from "@/components/shared/container";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-transparent backdrop-blur-md">
      <Container className="flex min-h-16 items-center justify-between gap-4 py-3.5">
        <div className="flex items-center">
          <Link
            href="/"
            className="font-mono text-lg font-semibold tracking-tight transition-colors hover:text-primary"
          >
            <span className="text-primary" aria-hidden="true">
              &gt;
            </span>{" "}
            {siteConfig.name}
            <span className="terminal-caret text-primary" aria-hidden="true">
              _
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 sm:flex"
          >
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 font-mono text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </Container>
      <Container className="flex gap-1 pb-3 sm:hidden">
        {siteConfig.navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex-1 rounded-md px-3 py-2 text-center font-mono text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </Container>
    </header>
  );
}
