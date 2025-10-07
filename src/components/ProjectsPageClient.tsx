'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ProjectListItem } from '@/types/content';

interface ProjectsPageClientProps {
  projects: ProjectListItem[];
  allTags: string[];
}

export default function ProjectsPageClient({ projects, allTags }: ProjectsPageClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredProjects = selectedTag 
    ? projects.filter(project => project.frontmatter.tags.includes(selectedTag))
    : projects;

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
            <h1 className="mb-4">Projects</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A collection of projects showcasing technical solutions, business impact, and innovative approaches to complex problems.
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

      {/* Projects Grid */}
      <main className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block"
              >
                <article className="card-professional p-6 h-full flex flex-col">
                  <div className="mb-4 flex-grow">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {project.frontmatter.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-4">
                      {project.frontmatter.summary}
                    </p>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.frontmatter.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <time>
                        {new Date(project.frontmatter.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <span className="group-hover:text-foreground transition-colors">
                        Read more →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-4">No projects found</h3>
              <p className="text-muted-foreground">
                {selectedTag 
                  ? `No projects found with the tag "${selectedTag}".`
                  : 'Projects will appear here once they are added to the content directory.'
                }
              </p>
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(null)}
                  className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Show all projects
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
