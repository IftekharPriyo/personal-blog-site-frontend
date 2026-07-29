# DevLog Frontend

DevLog is a personal technical journal and portfolio frontend built with Next.js, TypeScript, and Tailwind CSS.

It powers the public blog, project showcase, profile/About experience, and admin article-management UI for publishing technical content around software engineering, cloud, DevOps, system design, and cybersecurity.

## Current Scope

- Public homepage with featured/latest articles
- Blog archive with pagination and list/grid view support
- Blog detail pages with MDX rendering, cover images, social sharing, view count, and love count
- Project/product showcase pages
- About page with profile sections, tech stack, resume download, and social links
- SEO metadata, Open Graph/Twitter cards, sitemap, robots.txt, and JSON-LD
- Dark/light theme support
- Animated UI details such as page transitions, typewriter titles, rotating hero label, and homepage `whoami?` mascot
- Admin login through backend-backed HTTP-only cookie session
- Admin dashboard overview
- Article listing, creation, editing, publishing status, featured flag, tags, categories, and MDX content editing
- Admin image uploads for cover images and inline article images through backend/S3/Lambda flow

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- MDX / `next-mdx-remote`
- `rehype-pretty-code` / Shiki for code highlighting
- `next-themes`
- `lucide-react`
- `simple-icons`
- DotLottie React for the homepage mascot
- pnpm

## Environment Variables

Create a local `.env` file when needed:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BACKEND_API_URL=http://localhost:5000
GOOGLE_SITE_VERIFICATION=
NGROK_DEV_ORIGIN=
```

### Required

- `BACKEND_API_URL`: Server-side backend origin used by frontend API routes and server components.
- `NEXT_PUBLIC_SITE_URL`: Public site URL used for canonical URLs, sitemap, and social metadata.

### Optional

- `GOOGLE_SITE_VERIFICATION`: Adds Google Search Console verification metadata.
- `NGROK_DEV_ORIGIN`: Allows a trusted ngrok dev origin in `next.config.ts`.

## Local Development

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open:

```txt
http://localhost:3000
```

The Express backend should be running separately, usually at:

```txt
http://localhost:5000
```

## Useful Scripts

```bash
pnpm lint
pnpm build
pnpm start
```

## Admin Flow

The admin UI lives under:

```txt
/admin
```

The frontend does not expose backend JWTs to client-side JavaScript. Login requests are proxied through frontend API routes, and the session is stored with an HTTP-only cookie.

Admin article and upload requests are also proxied through frontend API routes to the Express backend.

## Media Upload Flow

Article media is uploaded through the backend:

- Cover images: `/api/admin/uploads/cover-image`
- Inline article images: `/api/admin/uploads/article-image`

The backend uploads original images to S3. A Lambda-based image compressor can optimize them and return public URLs used by the article content.

## Deployment Notes

This project is designed to run as the frontend service, commonly on port `3000`, with the backend service running separately, commonly on port `5000`.

For production behind Nginx, the frontend should call the backend through the configured server-side `BACKEND_API_URL` or through the reverse-proxy setup used by the deployment.
