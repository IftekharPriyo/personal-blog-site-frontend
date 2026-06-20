# Personal Blog Site Frontend

A modern technical blogging platform built with Next.js, TypeScript, and Tailwind CSS.

The platform focuses on:
- technical writing,
- engineering notes,
- cloud computing,
- DevOps,
- cybersecurity,
- backend engineering,
- and software development learning.

---

## Current Scope

This project currently includes:
- Public-facing frontend
- MDX-based blog system
- Responsive UI
- SEO optimization
- Dark/light mode
- Modern minimal interface
- Hidden admin sign-in route at `/admin`
- HTTP-only cookie authentication through the backend API

This project does not yet include:
- CMS/admin dashboard
- Admin content-management tools

---

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- MDX

---

## Homepage Structure

- Small introduction section
- Featured blog post
- Latest blog posts
- Blog archive navigation

---

## Goals

- Build a clean writing-focused platform
- Practice scalable frontend architecture
- Publish technical content
- Prepare for future backend integration

---

## Admin Authentication

The frontend forwards admin authentication to the backend without exposing the
JWT to client-side JavaScript. The backend defaults to `http://localhost:5000`
during local development. Set the server-only environment variable below when
the backend uses another origin:

```env
BACKEND_API_URL=https://api.example.com
```

---

## Future Plans

- Backend API integration
- CMS admin dashboard
- PostgreSQL database
- Authentication system
- AWS deployment architecture
