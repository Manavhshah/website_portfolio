import Link from "next/link";
import { getAllInsightsList, getAllInsightTags } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
  description: "Thoughts, learnings, and observations on technology, business, and the intersection of both.",
  openGraph: {
    title: "Insights | Manav Shah",
    description: "Thoughts, learnings, and observations on technology, business, and the intersection of both.",
    url: "/insights",
  },
  twitter: {
    title: "Insights | Manav Shah",
    description: "Thoughts, learnings, and observations on technology, business, and the intersection of both.",
  },
};

export default function InsightsPage() {
  const insights = getAllInsightsList();
  const allTags = getAllInsightTags();

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <header className="px-6 py-16 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-neutral-400 hover:text-white transition-colors mb-6"
            >
              ← Back to home
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Insights</h1>
            <p className="text-xl text-neutral-300 max-w-2xl">
              Thoughts, learnings, and observations on technology, business, and the intersection of both.
            </p>
          </div>

          {/* Tag Filter */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold mb-4">Filter by tags</h2>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 bg-neutral-800 text-neutral-300 text-sm rounded-full hover:bg-neutral-700 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Insights List */}
      <main className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {insights.map((insight) => (
              <Link
                key={insight.slug}
                href={`/insights/${insight.slug}`}
                className="group block"
              >
                <article className="bg-neutral-800 rounded-lg p-8 hover:bg-neutral-700 transition-colors">
                  <div className="mb-4">
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-white">
                      {insight.frontmatter.title}
                    </h3>
                    <p className="text-neutral-400 mb-6 text-lg leading-relaxed">
                      {insight.frontmatter.summary}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {insight.frontmatter.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-neutral-700 text-neutral-300 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-neutral-500">
                      <time>
                        {new Date(insight.frontmatter.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <span className="group-hover:text-white transition-colors">
                        Read more →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {insights.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-4">No insights found</h3>
              <p className="text-neutral-400">
                Insights will appear here once they are added to the content directory.
              </p>
            </div>
          )}
        </div>
      </main>

    </div>
  );
}
