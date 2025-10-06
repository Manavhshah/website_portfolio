import Link from "next/link";
import { getAllProjectsList, getAllInsightsList } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Manav Shah's portfolio. Explore projects, insights, and professional experience in technology and business.",
  openGraph: {
    title: "Manav Shah - Portfolio",
    description: "Welcome to Manav Shah's portfolio. Explore projects, insights, and professional experience in technology and business.",
    url: "/",
  },
  twitter: {
    title: "Manav Shah - Portfolio",
    description: "Welcome to Manav Shah's portfolio. Explore projects, insights, and professional experience in technology and business.",
  },
};

export default function Home() {
  // Get content for the home page
  const projects = getAllProjectsList();
  const insights = getAllInsightsList();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Manav Shah",
    "description": "Software engineer and technology professional building systems that scale and exploring the intersection of technology and business.",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    "sameAs": [
      "https://github.com/manavshah",
      "https://linkedin.com/in/manavshah",
      "https://twitter.com/manavshah"
    ],
    "jobTitle": "Software Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Technology Professional"
    },
    "knowsAbout": [
      "Software Engineering",
      "Technology",
      "Business Strategy",
      "System Architecture",
      "Full Stack Development"
    ],
    "alumniOf": {
      "@type": "Organization",
      "name": "Technology Education"
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Manav Shah
          </h1>
          <p className="text-xl sm:text-2xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Building systems that scale. Exploring the intersection of technology and business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors"
            >
              View Projects
            </Link>
            <Link
              href="/insights"
              className="inline-flex items-center justify-center px-6 py-3 border border-neutral-600 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Read Insights
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="px-6 py-16 sm:px-8 lg:px-12 bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Projects</h2>
            <Link
              href="/projects"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              View all →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block"
              >
                <div className="bg-neutral-800 rounded-lg p-6 hover:bg-neutral-700 transition-colors">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-white">
                    {project.frontmatter.title}
                  </h3>
                  <p className="text-neutral-400 mb-4 line-clamp-3">
                    {project.frontmatter.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.frontmatter.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-neutral-700 text-neutral-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="px-6 py-16 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Insights</h2>
            <Link
              href="/insights"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              View all →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {insights.slice(0, 4).map((insight) => (
              <Link
                key={insight.slug}
                href={`/insights/${insight.slug}`}
                className="group block"
              >
                <article className="bg-neutral-800 rounded-lg p-6 hover:bg-neutral-700 transition-colors">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-white">
                    {insight.frontmatter.title}
                  </h3>
                  <p className="text-neutral-400 mb-4 line-clamp-3">
                    {insight.frontmatter.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {insight.frontmatter.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-neutral-700 text-neutral-300 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <time className="text-neutral-500 text-sm">
                      {new Date(insight.frontmatter.date).toLocaleDateString()}
                    </time>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      </div>
  );
}
