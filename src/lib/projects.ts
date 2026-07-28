import "server-only";

import { cache } from "react";
import type { Project } from "@/types/project";

const projects: Project[] = [
  {
    title: "DevLog",
    slug: "devlog",
    summary:
      "A personal technical journal for practical writing on software engineering, cloud, DevOps, and security.",
    description:
      "DevLog is the site you are reading now. It is built as a writing-first portfolio and blog, with an admin workflow for publishing MDX articles, uploading optimized cover/content images, and tracking lightweight reader engagement.",
    status: "Live",
    year: "2026",
    role: "Full-stack engineer",
    stack: ["Next.js", "Express", "Prisma", "PostgreSQL", "AWS S3", "Lambda"],
    highlights: [
      "Server-rendered public pages with SEO metadata for articles.",
      "Admin publishing flow with MDX editing and image uploads.",
      "Anonymous view and love counters without requiring user accounts.",
    ],
  },
  {
    title: "Image Compressor Lambda",
    slug: "image-compressor-lambda",
    summary:
      "A reusable AWS Lambda service for compressing uploaded images into optimized web assets.",
    description:
      "A small infrastructure utility designed to be reused across personal projects. Source images are uploaded to S3, Lambda processes them, and the optimized public asset URL can be stored by the calling application.",
    status: "In progress",
    year: "2026",
    role: "Cloud engineer",
    stack: ["AWS Lambda", "AWS S3", "Node.js", "Sharp"],
    highlights: [
      "Reusable image pipeline for blog covers and article content images.",
      "Keeps upload handling separate from image optimization work.",
      "Uses S3 prefixes to separate incoming originals from optimized assets.",
    ],
  },
  {
    title: "VS Code Voice Assistant",
    slug: "vs-code-voice-assistant",
    summary:
      "A local VS Code extension that captures natural speech and turns it into developer-ready text inside the editor.",
    description:
      "VS Code Voice Assistant brings a ChatGPT-like microphone workflow into VS Code. The current slice records speech from the default Windows microphone, transcribes it locally with whisper.cpp, accumulates the raw transcript in a Secondary Side Bar view, and keeps audio on the user's machine.",
    status: "In progress",
    year: "2026",
    role: "Extension developer",
    stack: [
      "VS Code Extension",
      "TypeScript",
      "whisper.cpp",
      "WinMM",
      "Local Speech-to-Text",
    ],
    highlights: [
      "Adds a compact Voice Assistant view in VS Code's Secondary Side Bar.",
      "Captures native PCM microphone audio on Windows and transcribes locally.",
      "Automatically provisions the pinned whisper.cpp runtime and base English model with checksum verification.",
      "Avoids backend accounts, API keys, telemetry, and audio uploads.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/IftekharPriyo/vscode-voice-assistant",
      },
    ],
  },
  {
    title: "Sanymar",
    slug: "sanymar",
    summary:
      "A local-first Windows desktop AI radio jockey that speaks between Spotify tracks.",
    description:
      "Sanymar observes authorized Spotify playback, writes short English radio dialogue locally, synthesizes it with a local voice provider, and plays the result through the Windows default audio device. It is designed as a privacy-conscious desktop app with explicit provider boundaries and local-first storage.",
    status: "In progress",
    year: "2026",
    role: "Desktop product engineer",
    stack: [
      "Tauri 2",
      "React",
      "Rust",
      "SQLite",
      "Spotify API",
      "Ollama",
      "Sherpa-ONNX",
      "Kokoro",
    ],
    highlights: [
      "Uses Spotify Authorization Code with PKCE and stores tokens in Windows Credential Manager.",
      "Generates bounded local dialogue with optional loopback-only Ollama and defensive validation.",
      "Bundles English Kokoro synthesis through Sherpa-ONNX for in-process local speech.",
      "Prepares transition commentary, pauses Spotify at handoff, speaks alone, then resumes the next track.",
    ],
  },
  {
    title: "Cloud & Security Learning Lab",
    slug: "cloud-security-learning-lab",
    summary:
      "A growing collection of hands-on experiments for AWS, DevOps, system design, and cybersecurity practice.",
    description:
      "This is the practical lab behind many future DevLog articles. The goal is to build small, focused projects that explain one real engineering idea at a time, from deployment automation to secure cloud architecture.",
    status: "Prototype",
    year: "2026",
    role: "Builder and writer",
    stack: ["AWS", "Docker", "Linux", "CI/CD", "Security"],
    highlights: [
      "Turns learning notes into reproducible technical projects.",
      "Connects blog writing with real implementation evidence.",
      "Prioritizes simple explanations over abstract theory.",
    ],
  },
];

export const getProjects = cache(async () => projects);

export const getProjectBySlug = cache(async (slug: string) => {
  return projects.find((project) => project.slug === slug) ?? null;
});
