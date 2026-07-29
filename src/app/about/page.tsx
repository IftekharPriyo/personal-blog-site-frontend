import type { Metadata } from "next";
import { AboutProfileTabs } from "@/components/about/about-profile-tabs";
import { SocialLinks } from "@/components/about/social-links";
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
        <p className="font-mono text-sm font-medium text-primary">whoami</p>
        <TypewriterTitle
          text="Hi, I'm Iftekhar Priyo."
          className="mt-4 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl"
        />
      </section>

      <AboutProfileTabs />

      <div className="mt-10 max-w-3xl">
        <p className="text-sm font-medium uppercase text-primary">
          Connect with me
        </p>
        <div className="mt-4">
          <SocialLinks />
        </div>
      </div>
    </Container>
  );
}
