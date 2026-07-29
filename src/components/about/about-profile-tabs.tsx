"use client";

import { useState } from "react";
import {
  BriefcaseBusiness,
  Boxes,
  ChevronDown,
  Cloud,
  GraduationCap,
  Layers3,
  Sparkles,
} from "lucide-react";
import type { SimpleIcon } from "simple-icons";
import {
  siApollographql,
  siDocker,
  siExpress,
  siGit,
  siGithubactions,
  siGooglecloud,
  siGrafana,
  siGraphql,
  siGnubash,
  siJavascript,
  siLinux,
  siMysql,
  siNeon,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siOllama,
  siPostgresql,
  siPrisma,
  siPrometheus,
  siPython,
  siReact,
  siRust,
  siTailwindcss,
  siTerraform,
  siTypescript,
} from "simple-icons";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "about", label: "About", icon: Sparkles },
  { id: "career", label: "Career", icon: BriefcaseBusiness },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "stack", label: "Tech Stack", icon: Layers3 },
  { id: "currently", label: "Currently", icon: Cloud },
] as const;

const careerTimeline = [
  {
    title: "Software Engineer",
    meta: "Younode, Inc. / Sapporo, Japan / Remote / Oct 2021 - Mar 2026",
    description:
      "Developed and maintained production frontend and backend features for music, content-management, chatbot, and administrative platforms serving Japanese and international clients.",
  },
  {
    title: "Software Engineer Intern",
    meta: "Younode, Inc. / Sapporo, Japan / Remote / Mar 2021 - Sep 2021",
    description:
      "Contributed to the Pulp music social-networking product while building production engineering, Git workflow, testing, bug-fixing, and remote collaboration skills.",
  },
];

const educationTimeline = [
  {
    title: "Master's in Cybersecurity",
    meta: "Universiti Teknologi Malaysia / Johor Bahru, Malaysia / Starts Oct 2026",
    description:
      "A planned deeper move into cybersecurity, cloud security, and security-minded engineering.",
  },
  {
    title: "BSc in Computer Science and Engineering",
    meta: "North South University / Dhaka, Bangladesh / 2017 - 2022",
    description:
      "Built the computer science foundation behind my professional software engineering work.",
  },
];

const techStack = [
  {
    name: "Languages",
    icon: Layers3,
    items: [
      { name: "JavaScript", icon: siJavascript },
      { name: "TypeScript", icon: siTypescript },
      { name: "Python", icon: siPython },
      { name: "Rust", icon: siRust },
      { name: "Bash", icon: siGnubash },
    ],
  },
  {
    name: "Frontend",
    icon: Layers3,
    items: [
      { name: "React", icon: siReact },
      { name: "Next.js", icon: siNextdotjs },
      { name: "React Native", icon: siReact },
      { name: "Tailwind CSS", icon: siTailwindcss },
      { name: "Apollo Client", icon: siApollographql },
      { name: "SEO", icon: siGooglecloud },
    ],
  },
  {
    name: "Backend",
    icon: Boxes,
    items: [
      { name: "Node.js", icon: siNodedotjs },
      { name: "Express", icon: siExpress },
      { name: "NestJS", icon: siNestjs },
      { name: "GraphQL", icon: siGraphql },
      { name: "Apollo Server", icon: siApollographql },
      { name: "REST APIs", icon: siNodedotjs },
      { name: "gRPC", iconSrc: "/tech-icons/grpc.svg" },
    ],
  },
  {
    name: "Databases",
    icon: Cloud,
    items: [
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "MySQL", icon: siMysql },
      { name: "Prisma ORM", icon: siPrisma },
      { name: "Neon", icon: siNeon },
    ],
  },
  {
    name: "Cloud & DevOps",
    icon: Cloud,
    items: [
      { name: "AWS", iconSrc: "/tech-icons/aws.svg" },
      { name: "Google Cloud Platform", icon: siGooglecloud },
      { name: "Terraform", icon: siTerraform },
      { name: "GitHub Actions", icon: siGithubactions },
      { name: "Prometheus", icon: siPrometheus },
      { name: "Grafana", icon: siGrafana },
    ],
  },
  {
    name: "Additional",
    icon: Sparkles,
    items: [
      { name: "Git", icon: siGit },
      { name: "Docker", icon: siDocker },
      { name: "Linux", icon: siLinux },
      { name: "LLM Integration", icon: siOllama },
      { name: "DevSecOps learning", iconSrc: "/tech-icons/aws.svg" },
    ],
  },
];

function BrandIcon({ icon }: { icon: SimpleIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      className="size-6"
      style={{ color: `#${icon.hex}` }}
    >
      <path fill="currentColor" d={icon.path} />
    </svg>
  );
}

function TechIcon({
  item,
}: {
  item: { name: string; icon?: SimpleIcon; iconSrc?: string };
}) {
  if (item.iconSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={item.iconSrc} alt="" className="size-6 object-contain" />
    );
  }

  if (item.icon) {
    return <BrandIcon icon={item.icon} />;
  }

  return <Sparkles className="size-6 text-primary" aria-hidden="true" />;
}

function Timeline({
  items,
}: {
  items: Array<{ title: string; meta: string; description: string }>;
}) {
  return (
    <div className="mt-7 space-y-0">
      {items.map((item, index) => (
        <div key={item.title} className="relative grid gap-1 pb-8 pl-8 last:pb-0">
          {index < items.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute left-[0.34rem] top-4 h-full border-l border-dashed border-border"
            />
          ) : null}
          <span
            aria-hidden="true"
            className="absolute left-0 top-2 size-3 rounded-full border border-primary bg-background shadow-[0_0_0_4px_color-mix(in_srgb,var(--primary)_14%,transparent)]"
          />
          <h3 className="text-lg font-semibold text-foreground sm:text-xl">
            {item.title}
          </h3>
          <p className="text-xs leading-5 text-primary sm:text-sm">
            {item.meta}
          </p>
          <p className="mt-2 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function TechStackGrid() {
  const [openCategory, setOpenCategory] = useState(techStack[0].name);

  return (
    <div className="mt-7 space-y-3">
      {techStack.map(({ name, icon: Icon, items }) => {
        const isOpen = openCategory === name;

        return (
          <div
            key={name}
            className="overflow-hidden rounded-lg border border-border/70 bg-card/55"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenCategory(isOpen ? "" : name)}
              className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="font-semibold text-foreground">{name}</span>
              </span>
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform",
                  isOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>

            {isOpen ? (
              <div className="grid gap-3 border-t border-border/70 p-4 sm:grid-cols-2">
                {items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 rounded-md bg-secondary/45 px-3.5 py-3 text-sm text-muted-foreground sm:text-base"
                  >
                    <TechIcon item={item} />
                    {item.name}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function AboutProfileTabs() {
  const [activeSectionId, setActiveSectionId] = useState<(typeof navItems)[number]["id"]>(
    "about",
  );

  return (
    <section className="mt-8 grid gap-7 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start lg:gap-8">
      <div className="order-2 min-w-0 max-w-3xl lg:order-1">
        <div key={activeSectionId} className="animate-section-change">
          {activeSectionId === "about" ? (
            <div>
              <p className="text-sm font-medium uppercase text-primary">About</p>
              <div className="mt-5 space-y-5 text-base leading-7 text-muted-foreground sm:space-y-6 sm:text-lg sm:leading-8">
                <p>
                  I am a software engineer with 5 years of professional
                  experience delivering production-grade web, mobile, content
                  management, and API-driven applications for a Japanese software
                  company in a remote, cross-functional environment.
                </p>
                <p>
                  I have worked across the full software development lifecycle,
                  from designing and implementing features to maintaining and
                  improving live systems.
                </p>
                <p>
                  Right now I am developing deeper expertise in cloud
                  infrastructure, DevOps, system design, and cybersecurity through
                  hands-on projects and technical writing.
                </p>
                <p>
                  DevLog is the public home for that work. It is where I turn
                  real project lessons into simple, practical write-ups for young
                  students and early-career developers who want to understand
                  cloud infrastructure, DevOps practices, backend architecture,
                  system design, and security without feeling overwhelmed.
                </p>
              </div>
            </div>
          ) : null}

          {activeSectionId === "career" ? (
            <div>
              <p className="text-sm font-medium uppercase text-primary">Career</p>
              <h2 className="mt-3 text-xl font-semibold sm:text-2xl">
                A practical engineering path.
              </h2>
              <Timeline items={careerTimeline} />
            </div>
          ) : null}

          {activeSectionId === "education" ? (
            <div>
              <p className="text-sm font-medium uppercase text-primary">
                Education
              </p>
              <h2 className="mt-3 text-xl font-semibold sm:text-2xl">
                Structured study and hands-on learning.
              </h2>
              <Timeline items={educationTimeline} />
            </div>
          ) : null}

          {activeSectionId === "stack" ? (
            <div>
              <p className="text-sm font-medium uppercase text-primary">
                Tech Stack
              </p>
              <h2 className="mt-3 text-xl font-semibold sm:text-2xl">
                Tools I use to build and learn.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                My current focus sits around web engineering, backend
                architecture, cloud infrastructure, DevOps, system design, and
                cybersecurity.
              </p>
              <TechStackGrid />
            </div>
          ) : null}

          {activeSectionId === "currently" ? (
            <div>
              <p className="text-sm font-medium uppercase text-primary">
                Currently
              </p>
              <h2 className="mt-3 text-xl font-semibold sm:text-2xl">
                Where my attention is going.
              </h2>
              <div className="mt-5 space-y-5 text-base leading-7 text-muted-foreground sm:space-y-6 sm:text-lg sm:leading-8">
                <p>
                  I am learning cloud engineering, AWS, DevOps, cybersecurity,
                  and system design through hands-on projects.
                </p>
                <p>
                  I am open to remote part-time, contract, freelance, or suitable
                  full-time software and cloud-related opportunities.
                </p>
                <p className="text-foreground">
                  If something took me hours or days to truly understand, I hope I
                  can explain it to you in just a few minutes.
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <nav
        aria-label="About sections"
        className="order-1 min-w-0 rounded-xl border border-border bg-secondary/70 p-2 lg:sticky lg:top-24 lg:order-2"
      >
        <div className="flex gap-1 overflow-x-auto [scrollbar-width:none] lg:grid [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeSectionId;

            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveSectionId(item.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-card/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:w-full lg:shrink lg:min-w-0",
                  isActive &&
                    "bg-card text-foreground shadow-[0_1px_2px_rgba(24,21,18,0.08)]",
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </section>
  );
}
