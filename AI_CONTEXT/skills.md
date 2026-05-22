# Frontend Project Skills & Development Guidelines

## Project Overview

This project is a modern technical blogging platform with lightweight personal branding.

Current scope:
- Public-facing frontend only
- No backend integration yet
- No CMS/admin dashboard yet
- Blog content managed locally using MDX files

Purpose:
- Publish technical blogs
- Share learning journey in cloud, DevOps, cybersecurity, and software engineering
- Build a clean writing-focused platform
- Practice production-grade frontend engineering
- Build scalable frontend architecture for future backend integration

---

# Core Philosophy

This is primarily a writing-focused platform.

The content should be the center of the experience.

The UI should:
- support readability,
- feel modern,
- stay minimal,
- avoid unnecessary visual clutter.

The website should feel like:
- an engineer’s personal publication,
- not a startup landing page.

---

# Tech Stack

## Core
- Next.js (App Router)
- TypeScript

## Styling
- Tailwind CSS

## UI Components
- shadcn/ui
- Lucide React

## Animation
- Framer Motion

## Content
- MDX for blog posts

## Tooling
- ESLint
- Prettier
- Strict TypeScript

---

# Development Philosophy

- Build scalable and maintainable code
- Prioritize readability
- Keep architecture clean
- Prefer reusable components
- Prefer server components when possible
- Use client components only when necessary
- Maintain clean folder organization
- Follow accessibility best practices
- Optimize for performance and SEO

---

# Homepage Structure

The homepage should contain:
- Small hero/introduction
- Featured blog post
- Latest blog posts section
- “See more” navigation to full blog archive
- Footer

The homepage should remain clean and focused.

Do not overload the homepage with:
- large portfolio sections,
- excessive animations,
- too many UI elements,
- complicated layouts.

---

# UI/UX Guidelines

## Design Style
- Minimal
- Modern
- Typography-focused
- Professional
- Content-first
- Dark mode first

## Layout
- Responsive on all screen sizes
- Mobile-first approach
- Consistent spacing
- Proper typography hierarchy
- Good whitespace usage

## Animation
- Subtle only
- Smooth hover states
- Avoid distracting effects
- Prioritize readability over animation

---

# SEO Requirements

Every page should:
- Use proper metadata
- Use semantic HTML
- Maintain heading hierarchy
- Optimize performance
- Include OpenGraph metadata
- Include Twitter card metadata

Blog pages should:
- Support clean slugs
- Support syntax highlighting
- Be optimized for readability

---

# Blog System

Current implementation:
- Local MDX-based blog system

Blog requirements:
- Syntax highlighting
- Reading time
- Tags/categories
- Reusable blog layout
- SEO optimization

Future migration:
- Backend-powered CMS
- API-driven content
- Admin dashboard

---

# Folder Structure Rules

- Shared components inside `/components`
- Utilities inside `/lib`
- Hooks inside `/hooks`
- Types inside `/types`
- Blog content inside `/content`
- Constants inside `/constants`

---

# Component Rules

## Preferred Pattern
- Functional components only
- Strong TypeScript typing
- Reusable UI patterns
- Small focused components

## Naming
- PascalCase for components
- camelCase for functions
- kebab-case for route folders

---

# Performance Rules

- Optimize images using Next.js Image
- Avoid unnecessary client rendering
- Lazy load heavy components
- Keep bundle size minimal
- Avoid unnecessary dependencies

---

# Accessibility Rules

- Use semantic HTML
- Support keyboard navigation
- Add aria labels where needed
- Maintain proper contrast ratio
- Ensure responsive typography

---

# Current Planned Pages

## Main Pages
- Home
- Blog
- Blog Detail
- About

## Optional Future Pages
- Uses
- Notes
- Research
- Dev Logs

---

# Coding Standards

- Avoid any types unless necessary
- Prefer interfaces for object shapes
- Keep files manageable
- Separate logic from presentation
- Use clean abstractions

---

# Future Scalability

This frontend should later support:
- Backend API integration
- CMS integration
- Authentication
- PostgreSQL backend
- AWS deployment architecture

Design the frontend with scalability in mind, but do not implement backend features yet.