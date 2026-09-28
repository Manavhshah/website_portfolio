# Working on this repo

Personal portfolio for Manav Shah. Rebuilt September 2026. Read `README.md` first for where content lives.

## Rules

- **Facts come from Manav's records, not from memory.** Numbers on the site follow the claim boundaries in `~/projects/shiplight-career-record/VERIFIED-METRICS.md` and the résumé at `public/documents/Manav_Shah_Resume.pdf`. Do not inflate. Do not invent metrics.
- **Content is MDX, not JSX.** New case studies and essays go in `src/content/`. Do not hardcode content into page components unless it is page structure (about page prose is the one exception).
- **Keep it static.** No database, no server actions, no auth. Contact is email, LinkedIn, and a calendar link. If someone asks for a form, push back once and suggest a hosted form service.
- **`npm run build` must pass** before any commit. It validates frontmatter and pre-renders every route.
- **Design tokens live in `src/app/globals.css`** under `@theme`. Change colors and type there, not with one-off hex values in components.
- **Motion is restrained.** `Reveal` for scroll-in, small hover transitions, and nothing that moves without user input. Everything respects `prefers-reduced-motion`.
- **Minimal base, a few signature interactions.** Manav pointed at minimal.gallery, then said the result was "boring and not fun". The answer was personality, not chrome: draggable photo and note cards in the hero (`HeroCards`), a bio that rewrites itself from soft sell to hard sell (`PitchSlider`, inspired by getcoleman.com), a cursor-following stats preview on the work list (`WorkIndex`), count-up numbers (`CountUp`), word-by-word headline reveal (`SplitText`), and a live SF clock. Keep the page structure quiet; put the play into a small number of deliberate moments. Do not add borders, eyebrows, glows, or grain back.
- **Hero cards live in `src/components/HeroCards.tsx`.** To add a photo, drop it in `public/images/` and add an entry with desktop percent position and mobile pile offsets. Six cards is the sweet spot.
- **Pitch copy lives in `src/components/PitchSlider.tsx`.** Five levels, same facts, rising volume. Every number in level 3 and 4 must still trace to the verified metrics.

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
