import "server-only";

import { cache } from "react";
import type { Project } from "@/types/project";

const projects: Project[] = [
  {
    title: "DevLog",
    slug: "devlog",
    logo: "/projects/devlog.svg",
    summary:
      "A personal technical journal and portfolio platform for writing practical engineering notes.",
    whyItExists:
      "DevLog exists for two reasons. First, I wanted a place to document what I am learning while building real systems. Second, I wanted to teach younger students and early-career developers the things that often feel intimidating at first: cloud infrastructure, DevOps practices, backend architecture, system design, and security-minded engineering.",
    architecture:
      "The public site is a Next.js app that renders blog, project, and profile pages. The admin experience talks to an Express backend with Prisma and PostgreSQL for article management. Images are uploaded through the backend into S3, then optimized asynchronously by an AWS Lambda image-compression service before the final URLs are used in articles.",
    description:
      "DevLog is the site you are reading now. It combines a writing-first public blog with a custom admin dashboard for publishing MDX articles, uploading optimized cover/content images, managing featured posts, and tracking lightweight reader engagement.",
    status: "Live",
    year: "2026",
    productType: "Web publishing platform",
    stack: [
      "Next.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "AWS S3",
      "AWS Lambda",
      "GitHub Actions",
    ],
    highlights: [
      "Server-rendered public pages with article SEO metadata and social sharing.",
      "Admin publishing flow with MDX editing, draft/published/archive states, and featured posts.",
      "S3 image uploads with Lambda-based optimization for cover and content images.",
      "Anonymous view and love counters without requiring reader accounts.",
    ],
    links: [
      {
        label: "Frontend repository",
        href: "https://github.com/IftekharPriyo/personal-blog-site-frontend",
      },
      {
        label: "Backend repository",
        href: "https://github.com/IftekharPriyo/personal-blog-site-backend",
      },
    ],
    liveLink: {
      label: "Visit DevLog",
      href: "/",
    },
  },
  {
    title: "Sanymar",
    slug: "sanymar",
    logo: "/projects/sanymar.svg",
    summary:
      "A local-first Windows desktop AI radio jockey that speaks between Spotify tracks.",
    whyItExists:
      "Sanymar exists because Spotify's radio jockey and AI DJ-style experience is not available in my country. I wanted to build a version for myself and for local listeners: a desktop companion that can understand the current track, prepare short radio-style commentary, and speak between songs without sending private playback context to a hosted service.",
    architecture:
      "Sanymar is a Tauri 2 modular monolith. React owns the UI and typed IPC calls, while Rust modules handle Spotify playback state, provider boundaries, SQLite persistence, RJ script coordination, local TTS, validated WAV playback, and security-sensitive storage. Spotify uses Authorization Code with PKCE and Windows Credential Manager. Local generation can use loopback-only Ollama, and speech synthesis uses bundled Kokoro through Sherpa-ONNX.",
    description:
      "Sanymar observes authorized Spotify playback, writes short English radio dialogue locally, synthesizes it with a local voice provider, and plays the result through the Windows default audio device. It is designed as a privacy-conscious desktop app with explicit provider boundaries and local-first storage.",
    status: "Private alpha",
    year: "2026",
    productType: "Windows desktop application",
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
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/IftekharPriyo/Sanymar",
      },
    ],
    liveLink: {
      label: "Request private alpha access",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=iftekhar.priyo12345@gmail.com&su=Sanymar%20private%20alpha%20access&body=Hi%20Iftekhar%2C%0A%0AI%20would%20like%20to%20try%20the%20Sanymar%20private%20alpha.%0A%0AThanks!",
    },
  },
  {
    title: "VS Code Voice Assistant",
    slug: "vs-code-voice-assistant",
    logo: "/projects/vs-code-voice-assistant.png",
    summary:
      "A local VS Code extension that captures natural speech and turns it into developer-ready text inside the editor.",
    whyItExists:
      "This project exists because speaking to ChatGPT in the browser is useful, but that workflow breaks when I am already deep inside VS Code with coding agents and editor context. I wanted a voice workflow that feels native to the editor, works locally, and eventually turns messy spoken intent into clean prompts or code-related text.",
    architecture:
      "The extension contributes a Secondary Side Bar webview, status-bar microphone shortcut, and recording commands. On Windows, it captures PCM audio from the default microphone through a native WinMM helper, writes a temporary WAV file, runs local whisper.cpp transcription, appends the raw transcript to the webview state, and deletes the temporary audio file after processing. Runtime and model downloads are pinned and checksum verified.",
    description:
      "VS Code Voice Assistant brings a ChatGPT-like microphone workflow into VS Code. The current slice records speech from the default Windows microphone, transcribes it locally with whisper.cpp, accumulates the raw transcript in a Secondary Side Bar view, and keeps audio on the user's machine.",
    status: "Live",
    year: "2026",
    productType: "VS Code extension",
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
        label: "GitHub repository",
        href: "https://github.com/IftekharPriyo/vscode-voice-assistant",
      },
    ],
    liveLink: {
      label: "View on Marketplace",
      href: "https://marketplace.visualstudio.com/items?itemName=iftekharpriyo.vscode-voice-assistant",
    },
  },
];

export const getProjects = cache(async () => projects);

export const getProjectBySlug = cache(async (slug: string) => {
  return projects.find((project) => project.slug === slug) ?? null;
});
