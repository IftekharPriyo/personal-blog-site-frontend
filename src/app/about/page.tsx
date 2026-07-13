import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { TypewriterTitle } from "@/components/shared/typewriter-title";
import { siteConfig } from "@/config/site";

const aboutUrl = `${siteConfig.url}/about`;
const aboutDescription =
  "About Iftekhar Priyo, a software engineer documenting practical lessons in software engineering, cloud, DevOps, and cybersecurity.";

export const metadata: Metadata = {
  title: `About ${siteConfig.author.name}`,
  description: aboutDescription,
  alternates: { canonical: aboutUrl },
  openGraph: {
    title: `About ${siteConfig.author.name}`,
    description: aboutDescription,
    type: "website",
    url: aboutUrl,
    siteName: siteConfig.name,
  },
};

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${aboutUrl}#profile`,
  url: aboutUrl,
  name: `About ${siteConfig.author.name}`,
  description: aboutDescription,
  mainEntity: { "@id": `${siteConfig.url}/#person` },
};

export default function AboutPage() {
  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <JsonLd data={profileJsonLd} />
      <section className="max-w-3xl">
        <p className="text-sm font-medium uppercase text-primary">About</p>
        <TypewriterTitle
          text="Hi, I'm Iftekhar Priyo."
          className="mt-4 text-4xl font-semibold leading-[1.12] sm:text-5xl"
        />
      </section>

      <section className="mt-8 max-w-3xl space-y-6 text-lg leading-8 text-muted-foreground">
        <p>
          I&apos;m a software engineer with 5 years of professional experience,
          most recently was building products remotely for Younode, Inc. . My
          work has ranged from mobile application, frontend and backend
          development to designing and shipping production systems.
        </p>

        <p>
          This DevLog is where I document what I&apos;m learning and
          building—from software engineering and backend architecture to AWS,
          DevOps, cloud, and cybersecurity.
        </p>

        <p>
          In late 2026, I&apos;ll begin my Master&apos;s in Cybersecurity at
          Universiti Teknologi Malaysia (UTM). As I transition deeper into cloud
          engineering and security, this site will become a record of that
          journey—the projects I build, the mistakes I make, and the lessons I
          learn along the way.
        </p>

        <p>
          I write for the developer I once was. I believe topics like AWS,
          Docker, DevOps, cloud architecture, and cybersecurity shouldn&apos;t
          feel intimidating. My goal is to explain them as simply as possible
          while keeping them practical enough that you can use them in real
          projects.
        </p>

        <p>
          Beyond technology, I genuinely enjoy building products that make life
          a little better for people. Whether it&apos;s an educational tool, a
          productivity app, or a project that serves a community, I&apos;m
          always drawn to ideas that solve real problems and create meaningful
          impact.
        </p>

        <p className="text-foreground">
          If something took me hours—or days—to truly understand, I hope I can
          explain it to you in just a few minutes.
        </p>
      </section>

      <section className="mt-14 max-w-4xl" aria-labelledby="currently">
        <p className="text-sm font-medium uppercase text-primary">Currently</p>
        <h2 id="currently" className="mt-3 text-2xl font-semibold">
          Where my attention is going
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold">Learning</h3>
            <p className="mt-3 leading-7 text-muted-foreground">
              Cloud Engineering • AWS • DevOps • Cybersecurity • System Design
            </p>
          </article>

          <article className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold">Building</h3>
            <p className="mt-3 leading-7 text-muted-foreground">
              Open-source projects, developer tools, and products that solve
              real-world problems.
            </p>
          </article>
        </div>
      </section>
    </Container>
  );
}
