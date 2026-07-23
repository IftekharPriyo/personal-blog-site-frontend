import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BlogPagination as BlogPaginationData } from "@/types/post";

interface BlogPaginationProps {
  pagination: BlogPaginationData;
}

function getPageHref(page: number) {
  return page === 1 ? "/blog" : `/blog?page=${page}`;
}

function getVisiblePages(currentPage: number, totalPages: number) {
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export function BlogPagination({ pagination }: BlogPaginationProps) {
  if (pagination.totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(pagination.page, pagination.totalPages);

  return (
    <nav
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
      aria-label="Blog archive pagination"
    >
      <Link
        href={getPageHref(Math.max(1, pagination.page - 1))}
        aria-disabled={!pagination.hasPreviousPage}
        tabIndex={pagination.hasPreviousPage ? undefined : -1}
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          !pagination.hasPreviousPage && "pointer-events-none opacity-45",
        )}
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        <span className="sr-only">Previous page</span>
      </Link>

      {pages[0] > 1 ? (
        <>
          <Link
            href="/blog"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            1
          </Link>
          {pages[0] > 2 ? (
            <span className="px-1 text-sm text-muted-foreground">...</span>
          ) : null}
        </>
      ) : null}

      {pages.map((page) => {
        const isCurrentPage = page === pagination.page;

        return (
          <Link
            key={page}
            href={getPageHref(page)}
            aria-current={isCurrentPage ? "page" : undefined}
            className={cn(
              buttonVariants({
                variant: isCurrentPage ? "default" : "ghost",
                size: "icon",
              }),
              "font-semibold",
            )}
          >
            {page}
          </Link>
        );
      })}

      {pages[pages.length - 1] < pagination.totalPages ? (
        <>
          {pages[pages.length - 1] < pagination.totalPages - 1 ? (
            <span className="px-1 text-sm text-muted-foreground">...</span>
          ) : null}
          <Link
            href={getPageHref(pagination.totalPages)}
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            {pagination.totalPages}
          </Link>
        </>
      ) : null}

      <Link
        href={getPageHref(Math.min(pagination.totalPages, pagination.page + 1))}
        aria-disabled={!pagination.hasNextPage}
        tabIndex={pagination.hasNextPage ? undefined : -1}
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          !pagination.hasNextPage && "pointer-events-none opacity-45",
        )}
      >
        <ChevronRight className="size-4" aria-hidden="true" />
        <span className="sr-only">Next page</span>
      </Link>
    </nav>
  );
}
