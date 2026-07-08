import type { Metadata } from "next";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
  title: "About",
  description: "About the author and the focus of this technical blog.",
};

export default function AboutPage() {
  return (
    <Container className="py-12 sm:py-16">
      <section className="max-w-3xl">
        <p className="text-sm font-medium uppercase text-primary">About</p>
        <h1 className="mt-4 text-4xl font-semibold">Learning in public.</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          This space collects practical engineering notes across cloud, DevOps,
          cybersecurity, backend systems, and frontend craft. The goal is
          simple: write clearly, revisit what works, and keep improving the
          systems that carry real work. Author : Iftekhar Priyo.
        </p>
      </section>
    </Container>
  );
}
