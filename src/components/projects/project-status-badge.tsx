import { Hammer, LockKeyhole } from "lucide-react";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

interface ProjectStatusBadgeProps {
  status: Project["status"];
  year?: string;
}

export function ProjectStatusBadge({ status, year }: ProjectStatusBadgeProps) {
  const suffix = (() => {
    switch (status) {
      case "Live":
        return (
          <span
            aria-hidden="true"
            className="project-status-live-dot ml-1 size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.85),0_0_14px_rgba(52,211,153,0.35)]"
          />
        );
      case "In progress":
        return (
          <Hammer
            aria-hidden="true"
            className="project-status-hammer size-3.5 text-primary"
          />
        );
      case "Private alpha":
        return <LockKeyhole className="size-3.5" aria-hidden="true" />;
      default:
        return null;
    }
  })();

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1 text-sm text-primary",
        year && "font-medium uppercase",
      )}
      title={status === "Private alpha" ? "Invite-only testing" : undefined}
    >
      <span>{status}</span>
      {suffix}
      {year ? (
        <span className="text-primary/80">/ {year}</span>
      ) : null}
    </span>
  );
}
