# architecture.md

## 0) Tech stack
- Next.js App Router (TypeScript)
- Tailwind CSS
- MDX for content pages
- shadcn/ui for components
- Supabase for contact form storage
- No admin pages. Focus on a clean, professional, easy site

---

## 1) File and folder structure

```bash
.
├─ src/
│  ├─ app/
│  │  ├─ (marketing)/
│  │  │  ├─ page.tsx                 # /
│  │  │  ├─ about/
│  │  │  │  └─ page.tsx              # /about
│  │  │  ├─ projects/
│  │  │  │  ├─ page.tsx              # /projects
│  │  │  │  └─ [slug]/
│  │  │  │     └─ page.tsx           # /projects/[slug]
│  │  │  ├─ contact/
│  │  │  │  └─ page.tsx              # /contact
│  │  ├─ api/
│  │  │  └─ revalidate/route.ts      # optional ISR webhook
│  │  ├─ sitemap.ts                  # SEO
│  │  ├─ robots.txt                  # SEO
│  │  └─ layout.tsx
│  ├─ components/
│  │  ├─ ui/                         # shadcn generated
│  │  ├─ layout/
│  │  │  ├─ navbar.tsx
│  │  │  └─ footer.tsx
│  │  ├─ hero/
│  │  │  └─ hero.tsx
│  │  ├─ stats/
│  │  │  └─ stats-strip.tsx
│  │  ├─ cards/
│  │  │  ├─ project-card.tsx
│  │  │  └─ insight-card.tsx
│  │  ├─ content/
│  │  │  └─ mdx-article.tsx          # MDX wrapper + typography
│  │  └─ forms/
│  │     └─ contact-form.tsx
│  ├─ content/
│  │  ├─ projects/                   # MDX sources with frontmatter
│  │  │  ├─ innovo.mdx
│  │  │  └─ mag-mile.mdx
│  │  └─ insights/                   # short posts
│  │     ├─ outreach.mdx
│  │     └─ options-notes.mdx
│  ├─ lib/
│  │  ├─ mdx.ts                      # read + compile MDX
│  │  ├─ content.ts                  # list/get helpers for MDX
│  │  ├─ supabase/
│  │  │  ├─ browser.ts               # createBrowserClient
│  │  │  └─ server.ts                # createServerClient
│  │  ├─ email.ts                    # contact notifications (optional)
│  │  ├─ routes.ts                   # typed route map
│  │  └─ utils.ts
│  ├─ server/
│  │  └─ actions/
│  │     └─ contact.ts               # server action for contact submit
│  ├─ styles/
│  │  └─ globals.css
│  ├─ types/
│  │  ├─ content.ts                  # frontmatter types
│  │  └─ db.ts                       # Supabase row types
│  └─ hooks/
│     └─ useCopy.ts
├─ public/
│  ├─ images/
│  │  └─ og.png
│  └─ Manav_Shah_Resume.pdf
├─ mdx-components.tsx                # MDX element mapping
├─ tailwind.config.ts
├─ next.config.mjs
├─ tsconfig.json
├─ package.json
└─ README.md
```

---

## 2) What each part does
- `app` - routes, layouts, metadata
- `(marketing)` - public pages: home, about, projects, contact
- `api/revalidate` - optional revalidation hook for ISR
- `components/ui` - shadcn library
- `components/*` - site widgets: hero, stats, cards, forms
- `content` - MDX sources for projects and insights
- `lib/mdx.ts` - parse frontmatter and compile MDX to React
- `lib/supabase/*` - Supabase client creation for browser and server
- `server/actions/contact.ts` - validates form and writes to Supabase
- `styles/globals.css` - Tailwind base
- `types/*` - TS types for MDX and DB rows
- `hooks/*` - small client hooks

---

## 3) Page map and route patterns
- `/` - Hero, stats strip, featured projects, insights preview, call to action
- `/about` - Story, CliftonStrengths, values grid, timeline
- `/projects` - MDX list view with tags
- `/projects/[slug]` - MDX detail with cover, summary, body
- `/contact` - Contact form with server action submit

Route patterns use filesystem routing in the App Router. MDX slugs map to files under `content/projects`.

---

## 4) State ownership
- Local state
  - UI toggles, copy to clipboard, contact form inputs
- Server actions
  - Handle contact submit, safe validation, Supabase insert, optional email notify
- Supabase
  - Store contact submissions only. Reading managed from Supabase dashboard or email notifications

---

## 5) Data flow
### MDX content
1. Author `.mdx` files in `content/projects` or `content/insights` with frontmatter
2. `lib/content.ts` lists files and parses frontmatter for lists
3. Detail route loads the MDX by slug and renders with `mdx-article` wrapper

Frontmatter example:
```md
---
title: "Innovo Markets"
summary: "Go to market systems for energy fintech"
date: "2025-08-01"
tags: ["fintech", "automation", "gtm"]
cover: "/images/innovo.png"
---
```

### Contact form
1. User submits form on `/contact`
2. Server action `submitContact` validates input and inserts a row into `contacts` table
3. Optional: send an email notification or revalidate a lightweight thank you state
4. You view messages in Supabase dashboard

---

## 6) Env vars
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - anon key for browser
- `SUPABASE_SERVICE_ROLE_KEY` - server only, used in server action insert
- `SITE_URL` - canonical URL for metadata, sitemap, OG
- Optional mail provider keys if using email notifications

Used in `lib/supabase/*`, server action, and SEO helpers.

---

## 7) Testing
- Unit tests with Vitest for `lib/mdx.ts` and helpers
- Component tests with Testing Library for `contact-form` and `project-card`
- Playwright smoke:
  - visit `/`, `/projects`, `/projects/[slug]`, `/contact`
  - submit contact form and assert success toast while mocking the insert

---

## 8) Accessibility and SEO
Accessibility
- Semantic headings, one H1 per page
- Labels on inputs, descriptive alt text
- Keyboard focus states and skip links
- Respect `prefers-reduced-motion`

SEO
- Metadata in `layout.tsx` and per page overrides
- `sitemap.ts` and `robots.txt`
- OG image and Twitter cards
- Canonical URL via `SITE_URL`
- JSON-LD Person schema on `/`

---

## 9) Deployment plan for Vercel
1. Create Supabase project and `contacts` table
2. Add env vars in Vercel Project Settings
3. Connect GitHub repo and deploy with defaults
4. Upload `og.png`, set domain, and verify SSL
5. Enable analytics if desired

### Supabase schema
```sql
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

alter table public.contacts enable row level security;

create policy "insert_contact_anyone"
on public.contacts
for insert
to anon
with check (true);
```
