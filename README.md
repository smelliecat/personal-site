# Kwesi Adu Cobbina — Academic Website

Personal academic website built with **Next.js 14 (App Router)**, **TypeScript**, and **TailwindCSS**.

## Features

- Single-page home with Hero, Research Interests, News, Publications, Projects, Teaching, Service, Awards, and Contact sections
- Dedicated pages: `/publications`, `/teaching`, `/projects`, `/blog`, `/contact`
- Client-side publication filtering (year, type, topic, full-text search)
- MDX blog with syntax highlighting (rehype-pretty-code + Shiki)
- Dark mode with system preference default (`next-themes`)
- Fully responsive, mobile-first layout
- Accessible: semantic HTML, ARIA labels, keyboard nav, skip-to-content link
- SEO: OpenGraph, Twitter cards, JSON-LD (Person), sitemap, robots.txt
- Analytics hook placeholder (Plausible/GA — disabled by default)
- All content editable from JSON files in `content/`

---

## Repository Structure

```
.
├── content/                  # ← Edit your content here
│   ├── profile.json          # Bio, links, advisors, awards
│   ├── news.json             # Timeline news items
│   ├── publications.json     # All publications / preprints
│   ├── projects.json         # Research & engineering projects
│   ├── teaching.json         # Courses taught / TA'd
│   ├── service.json          # Reviewing, memberships, mentoring
│   └── blog/                 # MDX blog posts
│       └── *.mdx
├── public/
│   └── cv.pdf                # ← Place your CV PDF here
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Root layout + SEO + JSON-LD
│   │   ├── page.tsx          # Home page
│   │   ├── publications/
│   │   ├── teaching/
│   │   ├── projects/
│   │   ├── blog/[slug]/
│   │   ├── contact/
│   │   ├── api/contact/      # Contact form API route
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/           # All UI components
│   ├── lib/                  # Content loaders + MDX utils
│   └── types/                # TypeScript types
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
# → http://localhost:3000
```

### Production build

```bash
npm run build
npm start
```

---

## Customizing Content

All content lives in `content/`. Edit the JSON files — no code changes needed.

### `content/profile.json`
Update your name, title, affiliation, email, research summary, interests, and social links.

```json
{
  "name": "Your Name",
  "email": "you@institution.edu",
  "links": {
    "scholar": "https://scholar.google.com/citations?user=YOUR_ID",
    "github":  "https://github.com/YOUR_HANDLE",
    ...
  }
}
```

### `content/publications.json`
Add/edit publications. Status options: `"published"`, `"preprint"`, `"under-review"`, `"in-preparation"`.

Set `"selected": true` on up to 5 publications to show them on the home page.

### `content/blog/`
Create `.mdx` files with frontmatter:

```mdx
---
title: "Your Post Title"
date: "2025-01-15"
excerpt: "A short description."
tags: ["NLP", "Research"]
readingTime: "4 min"
---

Your post content here. Supports **Markdown**, code blocks with syntax highlighting, etc.
```

### Adding your CV

Place your CV PDF at `public/cv.pdf`. The "Download CV" button will serve it automatically.

---

## Environment Variables

Create a `.env.local` file:

```bash
# Required for production SEO (sitemap, OG URLs)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Optional: Plausible analytics (leave unset to disable)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
```

To enable the analytics script, uncomment the `<script>` tag in `src/app/layout.tsx`.

---

## Contact Form

The form posts to `/api/contact`. By default it just logs to the console.

To wire up real email delivery, edit `src/app/api/contact/route.ts` and add your provider:

```bash
# Resend (recommended)
npm install resend
# Set RESEND_API_KEY in .env.local
```

---

## Deployment

### Vercel (recommended)

1. Push this repo to GitHub / GitLab / Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Add environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_SITE_URL` → your production URL (e.g., `https://kwesicobbina.com`)
4. Click **Deploy**. Zero-config — Vercel auto-detects Next.js.

For a custom domain: Vercel dashboard → Project → Settings → Domains.

### GitHub Pages (static export)

GitHub Pages requires a fully static build. Add this to `next.config.mjs`:

```js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}
```

> Note: the `/api/contact` route will not work in static export mode. You will need to use a client-side form service (e.g., Formspree, Web3Forms).

Then:

```bash
npm run build        # generates /out
```

Deploy the `/out` folder to GitHub Pages via the `gh-pages` branch, or use the GitHub Actions workflow below:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

---

## Lighthouse

Expected scores on production Vercel deployment:
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

---

## License

MIT — feel free to fork and adapt for your own academic site.
