import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/project-card";
import { Container } from "@/components/shared/container";
import { TypewriterTitle } from "@/components/shared/typewriter-title";
import { siteConfig } from "@/config/site";
import { getProjects } from "@/lib/projects";

const projectsUrl = `${siteConfig.url}/projects`;
const projectsDescription =
  "Projects and products by Iftekhar Priyo, including full-stack apps, cloud utilities, and security learning experiments.";

export const metadata: Metadata = {
  title: "Projects",
  description: projectsDescription,
  alternates: { canonical: projectsUrl },
  openGraph: {
    title: `Projects | ${siteConfig.author.name}`,
    description: projectsDescription,
    type: "website",
    url: projectsUrl,
    siteName: siteConfig.name,
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <header className="max-w-3xl">
        <p className="text-sm font-medium uppercase text-primary">Projects</p>
        <TypewriterTitle
          text="Things I am building."
          className="mt-4 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl"
        />
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
          A small collection of products, experiments, and engineering systems
          I am shaping while learning cloud, DevOps, software architecture, and
          security.
        </p>
      </header>

      <section
        className="mt-12 grid gap-4 md:grid-cols-2"
        aria-label="Project list"
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </Container>
  );
}
