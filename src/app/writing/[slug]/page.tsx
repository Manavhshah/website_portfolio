import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAll, getBySlug, getNeighbours } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { site, siteUrl } from "@/content/site";
import ReadingProgress from "@/components/ReadingProgress";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAll("writing").map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getBySlug("writing", slug);
  if (!entry) return { title: "Not found" };
  const { frontmatter: fm } = entry;
  return {
    title: fm.title,
    description: fm.summary,
    alternates: { canonical: `/writing/${slug}` },
    openGraph: {
      type: "article",
      title: fm.title,
      description: fm.summary,
      url: `/writing/${slug}`,
      publishedTime: fm.date,
      authors: [site.fullName],
      tags: fm.tags,
    },
  };
}

export default async function WritingDetail({ params }: Props) {
  const { slug } = await params;
  const entry = getBySlug("writing", slug);
  if (!entry) notFound();

  const { frontmatter: fm } = entry;
  const body = await renderMdx(entry.body);
  const { newer, older } = getNeighbours("writing", slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.title,
    description: fm.summary,
    datePublished: fm.date,
    author: { "@type": "Person", name: site.fullName, url: siteUrl() },
    url: `${siteUrl()}/writing/${slug}`,
  };

  return (
    <article>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="container-prose pt-14 pb-10 sm:pt-20">
        <Link
          href="/writing"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          All writing
        </Link>
        <p className="eyebrow mt-10 animate-fade-up">
          <time dateTime={fm.date}>{formatDate(fm.date, { year: "numeric", month: "long", day: "numeric" })}</time>
          <span className="mx-2 text-faint">·</span>
          {fm.readingTime} min read
        </p>
        <h1 className="mt-4 font-display text-balance text-4xl leading-[1.05] text-fg animate-fade-up delay-1 sm:text-5xl">
          {fm.title}
        </h1>
        <p className="mt-5 text-pretty text-lg leading-relaxed text-muted animate-fade-up delay-2">
          {fm.summary}
        </p>
      </header>

      <div className="container-prose pb-16">
        <div className="prose">{body}</div>

        <ul className="mt-12 flex flex-wrap gap-1.5 border-t border-line pt-6">
          {fm.tags.map((t) => (
            <li key={t} className="rounded-full bg-surface px-2.5 py-1 text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>
      </div>

      <nav className="hairline" aria-label="More writing">
        <div className="container-page grid gap-4 py-10 sm:grid-cols-2">
          {older ? (
            <Link
              href={`/writing/${older.slug}`}
              className="rounded-lg border border-line p-5 transition-colors hover:border-line-strong hover:bg-bg-elevated"
            >
              <p className="eyebrow inline-flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" aria-hidden /> Earlier
              </p>
              <p className="mt-2 font-display text-xl text-fg">{older.frontmatter.title}</p>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link
              href={`/writing/${newer.slug}`}
              className="rounded-lg border border-line p-5 text-right transition-colors hover:border-line-strong hover:bg-bg-elevated"
            >
              <p className="eyebrow inline-flex items-center gap-1">
                Later <ArrowRight className="h-3 w-3" aria-hidden />
              </p>
              <p className="mt-2 font-display text-xl text-fg">{newer.frontmatter.title}</p>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
