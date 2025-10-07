import Link from "next/link";
import { notFound } from "next/navigation";
import { getInsightBySlug, getAllInsightsList } from "@/lib/content";
import { processMDXContent } from "@/lib/mdx";
import type { Metadata } from "next";

interface InsightPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const insights = getAllInsightsList();
  return insights.map((insight) => ({
    slug: insight.slug,
  }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const insight = getInsightBySlug(params.slug);
  
  if (!insight) {
    return {
      title: "Insight Not Found",
    };
  }

  return {
    title: insight.frontmatter.title,
    description: insight.frontmatter.summary,
    keywords: insight.frontmatter.tags,
    openGraph: {
      title: `${insight.frontmatter.title} | Manav Shah`,
      description: insight.frontmatter.summary,
      url: `/insights/${params.slug}`,
      type: 'article',
      publishedTime: insight.frontmatter.date,
      tags: insight.frontmatter.tags,
    },
    twitter: {
      card: 'summary',
      title: `${insight.frontmatter.title} | Manav Shah`,
      description: insight.frontmatter.summary,
    },
  };
}

export default function InsightPage({ params }: InsightPageProps) {
  const insight = getInsightBySlug(params.slug);

  if (!insight) {
    notFound();
  }

  const processedContent = processMDXContent(insight.content);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="section-padding gradient-subtle">
        <div className="container-max">
          <div className="mb-8">
            <Link
              href="/insights"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              ← Back to insights
            </Link>
            <h1 className="mb-6">
              {insight.frontmatter.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
              {insight.frontmatter.summary}
            </p>
            
            {/* Insight Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-400">
              <time>
                {new Date(insight.frontmatter.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <div className="flex flex-wrap gap-2">
                {insight.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-neutral-800 text-neutral-300 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="section-padding">
        <div className="container-max">
          <article className="project-content">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
          </article>
        </div>
      </main>

      {/* Navigation */}
      <nav className="px-6 py-12 sm:px-8 lg:px-12 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <Link
              href="/insights"
              className="inline-flex items-center text-neutral-400 hover:text-white transition-colors"
            >
              ← All insights
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center text-neutral-400 hover:text-white transition-colors"
            >
              View projects →
            </Link>
          </div>
        </div>
      </nav>

    </div>
  );
}
