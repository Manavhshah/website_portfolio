# tasks.md

## Phase 1: Project scaffold

**T01. Initialize Next.js project**
- Description: Create a new Next.js App Router project with TypeScript.
- Acceptance Criteria:
  - `npx create-next-app@latest` completes without errors.
  - App runs at `http://localhost:3000`.
- Manual Test Steps:
  1. Run `npm run dev`.
  2. Open `http://localhost:3000` and see default Next.js page.

**T02. Add Tailwind CSS**
- Description: Install and configure Tailwind in App Router.
- Acceptance Criteria:
  - `@tailwind` directives added to `src/styles/globals.css`.
  - `tailwind.config.ts` includes `./src/app/**/*` and `./src/components/**/*` in content paths.
  - A sample class like `bg-neutral-950` changes background on `/`.
- Manual Test Steps:
  1. Add `className="bg-neutral-950 text-white"` to root wrapper.
  2. Verify dark background renders.

**T03. Set base layout and metadata**
- Description: Create `src/app/layout.tsx` with global font, `<html lang="en">`, and base metadata.
- Acceptance Criteria:
  - Default layout wraps all pages.
  - Title and description appear in page head.

**T04. Configure path alias**
- Description: Add `@/*` alias in `tsconfig.json`.
- Acceptance Criteria:
  - Import from `@/components/...` compiles.

## Phase 2: shadcn/ui setup

**T05. Install shadcn/ui**
- Description: Set up shadcn CLI and generate Button and Input components.
- Acceptance Criteria:
  - `src/components/ui/button.tsx` and `input.tsx` exist.
  - Components render in a sample page without errors.

**T06. Theme integration**
- Description: Ensure Tailwind theme tokens are aligned with shadcn presets.
- Acceptance Criteria:
  - Button default variant renders with expected padding and radius.

## Phase 3: MDX content pipeline

**T07. Enable MDX**
- Description: Configure Next.js MDX support with page extensions.
- Acceptance Criteria:
  - `next.config.mjs` supports `.mdx`.
  - Importing a simple `.mdx` page under `app` works.

**T08. MDX components mapping**
- Description: Add `mdx-components.tsx` for custom elements and typography.
- Acceptance Criteria:
  - `<h1>`, `<p>`, `<a>`, `<pre>` render with site styles.

**T09. Content directories**
- Description: Create `src/content/projects` and `src/content/insights`.
- Acceptance Criteria:
  - At least one `.mdx` file exists in each folder with frontmatter.
  - Build does not break.

**T10. Frontmatter types**
- Description: Define `src/types/content.ts` for project and insight frontmatter.
- Acceptance Criteria:
  - Types include `title`, `summary`, `date`, `tags`, `cover`, `slug`.
  - Type is imported without TS errors.

**T11. MDX list helpers**
- Description: Implement `src/lib/content.ts` to list and get content from the filesystem.
- Acceptance Criteria:
  - `getAllProjects()` returns sorted items by date.
  - `getProjectBySlug(slug)` returns full metadata and raw body.

**T12. MDX compile helper**
- Description: Implement `src/lib/mdx.ts` to compile MDX to React.
- Acceptance Criteria:
  - Detail page can render compiled MDX body.

## Phase 4: Static pages

**T13. Home page scaffold**
- Description: Create `src/app/(marketing)/page.tsx` with Hero, Stats strip placeholder, Featured projects list preview, Insights preview, CTA.
- Acceptance Criteria:
  - Page renders sections with heading anchors.
  - No console errors.

**T14. About page content**
- Description: Create `src/app/(marketing)/about/page.tsx` with story, CliftonStrengths grid, values.
- Acceptance Criteria:
  - CliftonStrengths listed: Arranger, Achiever, Command, Focus, Strategic.
  - Page passes basic accessibility checks for headings and landmarks.

## Phase 5: Projects listing and detail via MDX

**T15. Projects list route**
- Description: Create `src/app/(marketing)/projects/page.tsx`.
- Acceptance Criteria:
  - Lists items from `getAllProjects()`.
  - Each item links to `/projects/[slug]`.

**T16. Project detail route**
- Description: Create `src/app/(marketing)/projects/[slug]/page.tsx`.
- Acceptance Criteria:
  - Loads project by slug.
  - Renders cover image, title, summary, date, tags, and compiled MDX body.
- Manual Test Steps:
  1. Add `innovo.mdx` with content and frontmatter.
  2. Navigate to `/projects/innovo` and verify render.

## Phase 6: Insights listing and detail via MDX

**T17. Insights list route**
- Description: Create `src/app/(marketing)/insights/page.tsx`.
- Acceptance Criteria:
  - Lists insights sorted by date.
  - Each item links to `/insights/[slug]` or an inline page.

**T18. Insight detail route**
- Description: Create `src/app/(marketing)/insights/[slug]/page.tsx`.
- Acceptance Criteria:
  - Renders MDX with typography and code blocks.

## Phase 7: Contact form to Supabase

**T19. Supabase project and table**
- Description: Create Supabase project and `contacts` table.
- Acceptance Criteria:
  - Table fields: `id uuid pk`, `name text`, `email text`, `message text`, `created_at timestamptz default now()`.
  - Row Level Security enabled.

**T20. Insert policy for anon**
- Description: Add RLS policy to allow inserts for anon.
- Acceptance Criteria:
  - Policy named `insert_contact_anyone` exists.
  - Insert from SQL editor as anon works.

**T21. Supabase client utilities**
- Description: Add `src/lib/supabase/browser.ts` and `server.ts`.
- Acceptance Criteria:
  - Browser client uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
  - Server client can be instantiated.

**T22. Contact form UI**
- Description: Build `src/components/forms/contact-form.tsx` with shadcn Input, Textarea, Button.
- Acceptance Criteria:
  - Client validation for required fields.
  - Submit button disabled while submitting.

**T23. Server action for contact submit**
- Description: Add `src/server/actions/contact.ts` with zod validation and Supabase insert.
- Acceptance Criteria:
  - Valid payload inserts one row.
  - Invalid payload returns typed error.
- Manual Test Steps:
  1. Fill form and submit valid data.
  2. Verify new row in Supabase table.

**T24. Contact page**
- Description: Create `src/app/(marketing)/contact/page.tsx` that renders the form and success state.
- Acceptance Criteria:
  - Displays toast or inline success message after insert.

## Phase 8: Admin login and messages table

**T25. Supabase Auth enablement**
- Description: Enable email provider in Supabase Auth.
- Acceptance Criteria:
  - You can sign in with email link locally using Supabase auth UI or custom form.

**T26. Admin allowlist**
- Description: Add `ADMIN_EMAILS` env and a simple helper to check admin status.
- Acceptance Criteria:
  - `isAdmin(email)` returns true only for allowlisted emails.

**T27. Route group for admin**
- Description: Create `src/app/(admin)/admin/page.tsx` with sign in and messages table placeholder.
- Acceptance Criteria:
  - If not authenticated, show sign in button.
  - If authenticated and allowlisted, show table placeholder.

**T28. Server query for contacts**
- Description: Create `src/server/queries/contacts.ts` to select recent contacts.
- Acceptance Criteria:
  - Returns rows sorted by `created_at desc`.
  - Accepts `limit` and `offset`.

**T29. Messages table view**
- Description: Implement table using shadcn Table with pagination controls.
- Acceptance Criteria:
  - Table shows name, email, message, created_at.
  - Pagination updates rows without full page reload.

## Phase 9: SEO, sitemap, robots

**T30. Metadata and Open Graph**
- Description: Add site level metadata in `layout.tsx` and per page overrides.
- Acceptance Criteria:
  - Title and description set.
  - `og:image` set to `public/images/og.png`.

**T31. Sitemap**
- Description: Add `src/app/sitemap.ts` to include `/`, `/about`, `/projects`, project slugs, `/contact`.
- Acceptance Criteria:
  - `GET /sitemap.xml` returns valid XML.

**T32. Robots**
- Description: Add `src/app/robots.txt` with allow rules and sitemap reference.
- Acceptance Criteria:
  - `GET /robots.txt` returns text with correct sitemap URL.

**T33. JSON-LD Person schema**
- Description: Embed JSON-LD on homepage with name, links, and sameAs.
- Acceptance Criteria:
  - `<script type="application/ld+json">` present in HTML.
  - Validates with Google Rich Results test.

## Phase 10: UX polish and accessibility

**T34. Accessibility pass**
- Description: Add skip link, ensure focus outlines, label inputs, alt text.
- Acceptance Criteria:
  - Keyboard tab order works.
  - Lighthouse accessibility score 90+.

**T35. Prefers reduced motion**
- Description: Honor `prefers-reduced-motion` for any animations.
- Acceptance Criteria:
  - With reduced motion enabled, animations are minimized.

**T36. Responsive checks**
- Description: Ensure pages look good on mobile, tablet, desktop.
- Acceptance Criteria:
  - No horizontal scroll on mobile.
  - Typography scales appropriately.

## Phase 11: Tests

**T37. Unit test utilities**
- Description: Add Vitest and tests for `lib/content.ts` and `lib/mdx.ts`.
- Acceptance Criteria:
  - `npm run test` passes.

**T38. Component test contact form**
- Description: Test required validation and success state.
- Acceptance Criteria:
  - Submitting empty form shows errors.
  - Mocked server action success shows success UI.

**T39. Playwright smoke tests**
- Description: Add e2e tests for core routes and contact submit.
- Acceptance Criteria:
  - Visits `/`, `/about`, `/projects`, one project detail, and `/contact`.
  - Contact flow passes with mocked insert.

## Phase 12: Deploy

**T40. Prepare env**
- Description: Add env vars locally and in Vercel dashboard.
- Acceptance Criteria:
  - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SITE_URL`, `ADMIN_EMAILS` present in Vercel.

**T41. GitHub integration**
- Description: Push repo and connect to Vercel.
- Acceptance Criteria:
  - First deploy succeeds with default settings.

**T42. Post deploy checks**
- Description: Verify production site.
- Acceptance Criteria:
  - Pages render without errors.
  - Sitemap and robots accessible.
  - Contact form creates a row in Supabase from production site.

**T43. Custom domain**
- Description: Add domain in Vercel and set DNS.
- Acceptance Criteria:
  - HTTPS green lock.
  - Canonical URL uses custom domain.

---

## Appendix: Acceptance Data

- Example project frontmatter:
  ```md
  ---
  title: "Innovo Markets"
  summary: "Go to market systems for energy fintech"
  date: "2025-08-01"
  tags: ["fintech", "automation", "gtm"]
  cover: "/images/innovo.png"
  ---
  ```
- Example contact payload:
  ```json
  { "name": "Jane Doe", "email": "jane@ex.com", "message": "Hello" }
  ```
