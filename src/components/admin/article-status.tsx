import type { ArticleStatus as ArticleStatusValue } from "@/types/admin";
import { cn } from "@/lib/utils";

const statusStyles: Record<ArticleStatusValue, string> = {
  DRAFT: "border-border bg-secondary text-muted-foreground",
  PUBLISHED: "border-primary/25 bg-primary/10 text-primary",
  ARCHIVED: "border-border/70 bg-muted/60 text-muted-foreground",
};

interface ArticleStatusProps {
  status: ArticleStatusValue;
}

export function ArticleStatus({ status }: ArticleStatusProps) {
  const label = status.charAt(0) + status.slice(1).toLowerCase();

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-1 text-xs font-medium",
        statusStyles[status],
      )}
    >
      {label}
    </span>
  );
}
