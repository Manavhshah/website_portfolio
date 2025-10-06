import Link from "next/link";
import { getAllProjectsList, getAllProjectTags } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore a collection of projects showcasing technical solutions, business impact, and innovative approaches to complex problems.",
  openGraph: {
    title: "Projects | Manav Shah",
    description: "Explore a collection of projects showcasing technical solutions, business impact, and innovative approaches to complex problems.",
    url: "/projects",
  },
  twitter: {
    title: "Projects | Manav Shah",
    description: "Explore a collection of projects showcasing technical solutions, business impact, and innovative approaches to complex problems.",
  },
};

export default function ProjectsPage() {
  const projects = getAllProjectsList();
  const allTags = getAllProjectTags();

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
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Projects</h1>
            <p className="text-xl text-neutral-300 max-w-2xl">
              A collection of projects showcasing technical solutions, business impact, and innovative approaches to complex problems.
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

      {/* Projects Grid */}
      <main className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block"
              >
                <article className="bg-neutral-800 rounded-lg p-6 hover:bg-neutral-700 transition-colors h-full">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-white">
                      {project.frontmatter.title}
                    </h3>
                    <p className="text-neutral-400 mb-4 line-clamp-4">
                      {project.frontmatter.summary}
                    </p>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.frontmatter.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-neutral-700 text-neutral-300 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-neutral-500">
                      <time>
                        {new Date(project.frontmatter.date).toLocaleDateString('en-US', {
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
          {projects.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-4">No projects found</h3>
              <p className="text-neutral-400">
                Projects will appear here once they are added to the content directory.
              </p>
            </div>
          )}
        </div>
      </main>

    </div>
  );
}
