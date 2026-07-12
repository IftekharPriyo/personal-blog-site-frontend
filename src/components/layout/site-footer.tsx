import Link from "next/link";
import { Container } from "@/components/shared/container";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="relative z-10 bg-transparent backdrop-blur-md">
      <Container className="flex flex-col gap-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          Copyright {new Date().getFullYear()} {siteConfig.name}. Built for
          writing.
        </p>
        <nav aria-label="Footer navigation" className="flex gap-4">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
