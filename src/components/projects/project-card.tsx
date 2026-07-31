import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectStatusBadge } from "@/components/projects/project-status-badge";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-border/75 bg-card/70 p-5 shadow-[0_1px_0_rgba(24,21,18,0.025)] transition-colors hover:border-primary/35 hover:bg-card sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.logo}
              alt=""
              className="size-full object-cover"
              aria-hidden="true"
            />
          </div>
          <div className="min-w-0">
            <ProjectStatusBadge status={project.status} />
            <h2 className="mt-2 text-2xl font-semibold leading-tight">
              <Link
                href={`/projects/${project.slug}`}
                className="focus:outline-none"
              >
                <span
                  className="absolute inset-0 rounded-lg"
                  aria-hidden="true"
                />
                {project.title}
              </Link>
            </h2>
          </div>
        </div>
        <ArrowUpRight
          className="mt-1 size-4 shrink-0 text-primary/75 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden="true"
        />
      </div>

      <p className="mt-4 grow leading-7 text-muted-foreground">
        {project.summary}
      </p>

      <div className="relative mt-6 flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((item) => (
          <span
            key={item}
            className="rounded-md border border-border/70 bg-secondary/60 px-2.5 py-1 text-xs text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
