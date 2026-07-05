import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

function MdxLink(props: ComponentPropsWithoutRef<"a">) {
  const href = props.href ?? "";

  if (href.startsWith("/")) {
    return <Link href={href} {...props} />;
  }

  return <a target="_blank" rel="noreferrer" {...props} />;
}

function Callout({ children }: { children?: ReactNode }) {
  return (
    <aside className="rounded-lg border border-primary/25 bg-primary/10 px-5 py-4 text-foreground">
      {children}
    </aside>
  );
}

export const mdxComponents = {
  Callout,
  a: MdxLink,
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="scroll-m-20 pt-8 text-2xl font-semibold leading-[1.25] text-foreground"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="scroll-m-20 pt-5 text-xl font-semibold leading-[1.35] text-foreground"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p
      className="max-w-none leading-8 text-muted-foreground sm:text-lg sm:leading-9"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="ml-5 list-disc space-y-3 text-muted-foreground marker:text-primary/70"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="ml-5 list-decimal space-y-3 text-muted-foreground marker:text-primary/80"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="pl-2 leading-8 sm:text-lg sm:leading-9" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="rounded-r-lg border-l-2 border-primary/45 bg-card/45 px-5 py-3 text-muted-foreground"
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code
      className={cn(
        "rounded-md border border-border/65 bg-card/70 px-1.5 py-0.5 font-mono text-[0.9em] text-foreground",
        className,
      )}
      {...props}
    />
  ),
};
