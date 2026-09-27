# Working on this repo

Personal portfolio for Manav Shah. Rebuilt September 2026. Read `README.md` first for where content lives.

## Rules

- **Facts come from Manav's records, not from memory.** Numbers on the site follow the claim boundaries in `~/projects/shiplight-career-record/VERIFIED-METRICS.md` and the résumé at `public/documents/Manav_Shah_Resume.pdf`. Do not inflate. Do not invent metrics.
- **Content is MDX, not JSX.** New case studies and essays go in `src/content/`. Do not hardcode content into page components unless it is page structure (about page prose is the one exception).
- **Keep it static.** No database, no server actions, no auth. Contact is email, LinkedIn, and a calendar link. If someone asks for a form, push back once and suggest a hosted form service.
- **`npm run build` must pass** before any commit. It validates frontmatter and pre-renders every route.
- **Design tokens live in `src/app/globals.css`** under `@theme`. Change colors and type there, not with one-off hex values in components.
- **Motion is restrained.** `Reveal` for scroll-in, small hover transitions, and nothing that moves without user input. Everything respects `prefers-reduced-motion`.
- **Minimal, not decorated.** Manav pointed at minimal.gallery as the reference. Lists over cards, plain sans labels over mono caps, no glow or grain, one serif statement per page. If a change adds chrome, it is probably wrong.

## Structure

- `src/app/` routes: `/`, `/work`, `/work/[slug]`, `/writing`, `/writing/[slug]`, `/about`, `/contact`, plus `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `not-found.tsx`.
- `src/lib/content.ts` reads and validates MDX frontmatter. `src/lib/mdx.tsx` compiles MDX with `@mdx-js/mdx` `evaluate` and defines the `Lede`, `Stats`, and `Callout` components.
- `src/content/site.ts` is the single source for name, links, email, nav, and the status line.

## Gotchas

- `next-mdx-remote` was removed on purpose: its serializer dropped JSX props (`<Stats items={...} />` arrived empty). Use `@mdx-js/mdx` directly.
- MDX wraps the text inside `<Lede>` in a `<p>`, so `Lede` renders a `div`.
- Content dates are `YYYY-MM-DD` and parsed as local time in `formatDate`; do not switch to `new Date(string)` or dates shift by a day.
- Route params are a `Promise` in Next 15; always `await params`.

## Sensitive

Do not publish anything about Shiplight's business status or Manav's job search. Present Shiplight as the current role.
