'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { InsightListItem } from '@/types/content';

interface InsightsPageClientProps {
  insights: InsightListItem[];
  allTags: string[];
}

export default function InsightsPageClient({ insights, allTags }: InsightsPageClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredInsights = selectedTag 
    ? insights.filter(insight => insight.frontmatter.tags.includes(selectedTag))
    : insights;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="section-padding gradient-subtle">
        <div className="container-max">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              ← Back to home
            </Link>
            <h1 className="mb-4">Insights</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Thoughts, learnings, and observations on technology, business, and the intersection of both.
            </p>
          </div>

          {/* Tag Filter */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold mb-4">Filter by tags</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedTag === null
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedTag === tag
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Insights Grid */}
      <main className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredInsights.map((insight) => (
              <Link
                key={insight.slug}
                href={`/insights/${insight.slug}`}
                className="group block"
              >
                <article className="card-professional p-6 h-full flex flex-col">
                  <div className="mb-4 flex-grow">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {insight.frontmatter.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {insight.frontmatter.summary}
                    </p>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex flex-wrap gap-2">
                        {insight.frontmatter.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <time className="text-muted-foreground text-sm">
                        {new Date(insight.frontmatter.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                    
                    <div className="flex items-center justify-end">
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        Read more →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredInsights.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-4">No insights found</h3>
              <p className="text-muted-foreground">
                {selectedTag 
                  ? `No insights found with the tag "${selectedTag}".`
                  : 'Insights will appear here once they are added to the content directory.'
                }
              </p>
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(null)}
                  className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Show all insights
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
