import Link from "next/link";
import { Container } from "@/components/shared/container";
import { siteConfig } from "@/config/site";
import { SiteNav } from "./site-nav";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-sm">
      <Container className="flex min-h-16 items-center justify-between gap-4 py-3.5">
        <Link
          href="/"
          className="font-mono text-lg font-semibold tracking-tight transition-colors hover:text-primary"
        >
          <span className="text-primary" aria-hidden="true">
            &gt;
          </span>{" "}
          {siteConfig.name}
          <span className="wordmark-caret text-primary" aria-hidden="true">
            _
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <SiteNav variant="desktop" />
          <ThemeToggle />
        </div>
      </Container>
      <Container className="sm:hidden">
        <SiteNav variant="mobile" />
      </Container>
    </header>
  );
}
