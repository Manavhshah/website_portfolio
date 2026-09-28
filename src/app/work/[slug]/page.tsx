import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getAll, getBySlug, getNeighbours } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { site } from "@/content/site";
import CountUp from "@/components/CountUp";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAll("work").map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getBySlug("work", slug);
  if (!entry) return { title: "Not found" };
  const { frontmatter: fm } = entry;
  return {
    title: fm.title,
    description: fm.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "article",
      title: fm.title,
      description: fm.summary,
      url: `/work/${slug}`,
      tags: fm.tags,
    },
  };
}

export default async function WorkDetail({ params }: Props) {
  const { slug } = await params;
  const entry = getBySlug("work", slug);
  if (!entry) notFound();

  const { frontmatter: fm } = entry;
  const body = await renderMdx(entry.body);
  const { newer, older } = getNeighbours("work", slug);

  return (
    <article>
      <header className="container-page pt-14 pb-10 sm:pt-20 sm:pb-14">
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          All work
        </Link>

        <p className="eyebrow mt-10 animate-fade-up">
          {fm.org}
          <span className="mx-2 text-faint">·</span>
          {fm.role}
          <span className="mx-2 text-faint">·</span>
          {fm.period}
          {fm.status && (
            <>
              <span className="mx-2 text-faint">·</span>
              <span className="text-accent">{fm.status}</span>
            </>
          )}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-balance text-4xl leading-[1.05] text-fg animate-fade-up delay-1 sm:text-5xl lg:text-6xl">
          {fm.title}
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted animate-fade-up delay-2">
          {fm.summary}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 animate-fade-up delay-3">
          <ul className="flex flex-wrap gap-1.5">
            {fm.tags.map((t) => (
              <li key={t} className="rounded-full bg-surface px-2.5 py-1 text-xs text-muted">
                {t}
              </li>
            ))}
          </ul>
          {fm.link && (
            <a
              href={fm.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-fg-soft transition-colors hover:text-accent"
            >
              {fm.link.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          )}
        </div>

        {fm.highlights && fm.highlights.length > 0 && (
          <dl className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3 animate-fade-up delay-4">
            {fm.highlights.map((h) => (
              <div key={h.label} className="bg-bg-elevated px-5 py-5">
                <dt className="sr-only">{h.label}</dt>
                <dd className="font-display text-4xl leading-none text-fg">
                  <CountUp value={h.value} />
                </dd>
                <dd className="mt-2 text-sm text-muted">{h.label}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>

      <div className="container-prose pb-16">
        <div className="prose">{body}</div>
      </div>

      <nav className="hairline" aria-label="More work">
        <div className="container-page grid gap-4 py-10 sm:grid-cols-2">
          {older ? (
            <Link
              href={`/work/${older.slug}`}
              className="group rounded-lg border border-line p-5 transition-colors hover:border-line-strong hover:bg-bg-elevated"
            >
              <p className="eyebrow inline-flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" aria-hidden /> Earlier
              </p>
              <p className="mt-2 font-display text-xl text-fg">{older.frontmatter.org}</p>
              <p className="mt-1 text-sm text-muted">{older.frontmatter.role}</p>
            </Link>
          ) : (
            <span />
          )}
          {newer ? (
            <Link
              href={`/work/${newer.slug}`}
              className="group rounded-lg border border-line p-5 text-right transition-colors hover:border-line-strong hover:bg-bg-elevated"
            >
              <p className="eyebrow inline-flex items-center gap-1">
                Later <ArrowRight className="h-3 w-3" aria-hidden />
              </p>
              <p className="mt-2 font-display text-xl text-fg">{newer.frontmatter.org}</p>
              <p className="mt-1 text-sm text-muted">{newer.frontmatter.role}</p>
            </Link>
          ) : (
            <Link
              href="/contact"
              className="group rounded-lg border border-line p-5 text-right transition-colors hover:border-line-strong hover:bg-bg-elevated"
            >
              <p className="eyebrow inline-flex items-center gap-1">
                Next <ArrowRight className="h-3 w-3" aria-hidden />
              </p>
              <p className="mt-2 font-display text-xl text-fg">Talk to me</p>
              <p className="mt-1 text-sm text-muted">{site.email}</p>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
