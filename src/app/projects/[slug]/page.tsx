import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Container } from "@/components/shared/container";
import { TypewriterTitle } from "@/components/shared/typewriter-title";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import { cn } from "@/lib/utils";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  const projectUrl = `${siteConfig.url}/projects/${project.slug}`;

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: projectUrl },
    openGraph: {
      title: `${project.title} | ${siteConfig.author.name}`,
      description: project.summary,
      type: "article",
      url: projectUrl,
      siteName: siteConfig.name,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <Link
        href="/projects"
        className={cn(buttonVariants({ variant: "ghost" }), "mb-8 -ml-2")}
      >
        <ArrowLeft aria-hidden="true" />
        Projects
      </Link>

      <article className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <div>
          <header className="max-w-3xl">
            <p className="text-sm font-medium uppercase text-primary">
              {project.status} / {project.year}
            </p>
            <TypewriterTitle
              text={project.title}
              className="mt-4 text-4xl font-semibold leading-[1.12] sm:text-5xl"
            />
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {project.summary}
            </p>
          </header>

          <section className="mt-10 max-w-3xl space-y-6 text-lg leading-8 text-muted-foreground">
            <p>{project.description}</p>
          </section>

          <section className="mt-12 max-w-3xl" aria-labelledby="highlights">
            <p className="text-sm font-medium uppercase text-primary">
              Highlights
            </p>
            <h2 id="highlights" className="mt-3 text-2xl font-semibold">
              What this project covers
            </h2>
            <ul className="mt-6 grid gap-3">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-lg border border-border/75 bg-card/70 p-4 leading-7 text-muted-foreground"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="rounded-lg border border-border/75 bg-secondary/70 p-5">
          <h2 className="text-sm font-semibold text-foreground">
            Project Details
          </h2>
          <dl className="mt-5 space-y-5 text-sm">
            <div>
              <dt className="text-muted-foreground">Role</dt>
              <dd className="mt-1 font-medium text-foreground">
                {project.role}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Stack</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border/70 bg-card/55 px-2.5 py-1.5 text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          {project.links && project.links.length > 0 ? (
            <div className="mt-6 grid gap-2">
              {project.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={buttonVariants({ variant: "outline" })}
                >
                  {link.label}
                  <ExternalLink aria-hidden="true" />
                </Link>
              ))}
            </div>
          ) : null}
        </aside>
      </article>
    </Container>
  );
}
