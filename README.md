# manavshah.site

Personal site for Manav Shah. Next.js 15 App Router, Tailwind CSS v4, MDX content, no database.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, also validates every content file
npm run lint
```

Set `NEXT_PUBLIC_SITE_URL` (for example `https://manavshah.com`) in production so canonical URLs, the sitemap, and Open Graph tags use the real domain. On Vercel this falls back to the deployment URL automatically.

## Where things live

| What | Where |
|---|---|
| Name, role, email, links, nav, one-line status | `src/content/site.ts` |
| Career and education timeline | `src/content/timeline.ts` |
| Case studies (one file each) | `src/content/work/*.mdx` |
| Essays (one file each) | `src/content/writing/*.mdx` |
| Home page statement | `src/app/page.tsx` |
| Capability list, strengths, campus list, honors | `src/app/about/page.tsx` |
| Résumé PDF | `public/documents/Manav_Shah_Resume.pdf` |
| Photos | `public/images/` |
| Colors, type, spacing tokens, prose styles | `src/app/globals.css` |
| MDX components (`Lede`, `Stats`, `Callout`) | `src/lib/mdx.tsx` |

The filename of a content file is its URL: `src/content/work/shiplight.mdx` becomes `/work/shiplight`.

## Add a case study

Create `src/content/work/<slug>.mdx`:

```mdx
---
title: "One sentence that says what you did and why it mattered"
summary: "Two sentences for the card and search results."
org: "Company"
role: "Your title"
period: "Jan 2027 — Present"
date: "2027-01-01"            # used for sorting, newest first
tags: ["Go-to-market", "Growth engineering"]
status: "Paused"              # optional: shown after the role in lists
link:                         # optional
  href: "https://example.com"
  label: "example.com"
highlights:                   # optional: up to three headline numbers
  - value: "35%"
    label: "reply rate across ~400 conversations"
---

<Lede>
Opening paragraph, set large. One or two sentences.
</Lede>

## The situation

Plain Markdown from here. Headings, lists, links, tables, bold all work.

<Stats cols={3} items={[
  { value: "4,553", label: "profiles researched" },
  { value: "35%", label: "reply rate" },
  { value: "5 → 30", label: "Domain Rating" },
]} />

<Callout>
A caveat or boundary on the numbers above.
</Callout>
```

Run `npm run build`. A missing required field fails the build with the file and field named.

## Add an essay

Create `src/content/writing/<slug>.mdx` with `title`, `summary`, `date`, and `tags` in the frontmatter. Reading time is computed. Same components are available.

## Update the résumé

Replace `public/documents/Manav_Shah_Resume.pdf`. Keep the filename so existing links keep working.

## Update a link or the role line

Edit `src/content/site.ts`. `role` and `location` appear under the home page statement.

## Deploy

The repo is meant to deploy on Vercel with defaults. Add `NEXT_PUBLIC_SITE_URL` in the project settings once a domain is attached.
