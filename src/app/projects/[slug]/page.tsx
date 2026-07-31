import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ArticleShare } from "@/components/blog/article-share";
import { ProjectStatusBadge } from "@/components/projects/project-status-badge";
import { Container } from "@/components/shared/container";
import { TypewriterTitle } from "@/components/shared/typewriter-title";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import { cn } from "@/lib/utils";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function isExternalHref(href: string) {
  return /^[a-z][a-z0-9+.-]*:/i.test(href);
}

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
  const projectImageUrl = `${siteConfig.url}${project.logo}`;

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
      images: [
        {
          url: projectImageUrl,
          alt: `${project.title} project preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${siteConfig.author.name}`,
      description: project.summary,
      images: [projectImageUrl],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectUrl = `${siteConfig.url}/projects/${project.slug}`;

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
            <ProjectStatusBadge status={project.status} year={project.year} />
            <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.logo}
                  alt=""
                  className="size-full object-cover"
                  aria-hidden="true"
                />
              </div>
              <TypewriterTitle
                text={project.title}
                className="text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl"
              />
            </div>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {project.summary}
            </p>
          </header>

          <section className="mt-10 max-w-3xl" aria-labelledby="summary">
            <p className="text-sm font-medium uppercase text-primary">
              Summary
            </p>
            <h2 id="summary" className="mt-3 text-2xl font-semibold">
              What it is
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {project.description}
            </p>
          </section>

          <section className="mt-12 max-w-3xl" aria-labelledby="why">
            <p className="text-sm font-medium uppercase text-primary">
              Why it exists
            </p>
            <h2 id="why" className="mt-3 text-2xl font-semibold">
              The problem behind it
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {project.whyItExists}
            </p>
          </section>

          <section className="mt-12 max-w-3xl" aria-labelledby="architecture">
            <p className="text-sm font-medium uppercase text-primary">
              Brief architecture
            </p>
            <h2 id="architecture" className="mt-3 text-2xl font-semibold">
              How it is put together
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {project.architecture}
            </p>
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
          <ArticleShare
            description={project.summary}
            heading="Share this project"
            helperText="Share this project with someone who might find it useful."
            title={project.title}
            url={projectUrl}
          />
        </div>

        <div>
          <aside className="rounded-lg border border-border/75 bg-secondary/70 p-5">
            <h2 className="text-sm font-semibold text-foreground">
              Tech Stack
            </h2>
            <dl className="mt-5 space-y-5 text-sm">
              <div>
                <dt className="text-muted-foreground">Product type</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {project.productType}
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
              <div className="mt-6 border-t border-border/70 pt-5">
                <h3 className="text-sm font-semibold text-foreground">
                  Repository
                </h3>
                <div className="mt-3 grid gap-2">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={buttonVariants({ variant: "outline" })}
                    >
                      {link.label}
                      <ExternalLink aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>

          {project.liveLink ? (
            isExternalHref(project.liveLink.href) ? (
              <a
                href={project.liveLink.href}
                target={
                  project.liveLink.href.startsWith("http") ? "_blank" : undefined
                }
                rel={
                  project.liveLink.href.startsWith("http")
                    ? "noreferrer"
                    : undefined
                }
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "mt-4 w-full",
                )}
              >
                {project.liveLink.label}
                <ExternalLink aria-hidden="true" />
              </a>
            ) : (
              <Link
                href={project.liveLink.href}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "mt-4 w-full",
                )}
              >
                {project.liveLink.label}
                <ExternalLink aria-hidden="true" />
              </Link>
            )
          ) : null}
        </div>
      </article>
    </Container>
  );
}
