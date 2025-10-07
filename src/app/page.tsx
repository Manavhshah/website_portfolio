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
      "https://linkedin.com/in/manav-hitesh-shah",
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
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="section-padding gradient-subtle">
        <div className="container-max text-center">
          <h1 className="animate-fade-in mb-6">
            Manav Shah
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up">
            Building at the intersection of startups, strategy, and finance. I design go-to-market and finance systems that turn ideas into measurable results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link
              href="/projects"
              className="btn-primary inline-flex items-center justify-center px-6 py-3 rounded-lg"
            >
              View Projects
            </Link>
            <Link
              href="/insights"
              className="btn-secondary inline-flex items-center justify-center px-6 py-3 rounded-lg border"
            >
              Read Insights
            </Link>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="section-padding bg-card">
        <div className="container-max">
          <h2 className="mb-8 text-center">About Me</h2>
          
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="mb-6 leading-relaxed">
              I&apos;ve always been drawn to how things work, not just the mechanics, but the systems behind them. Whether it&apos;s a business model, a market, or a workflow, I like finding the pattern, simplifying it, and turning it into something that scales.
            </p>
            
            <p className="mb-6 leading-relaxed">
              That curiosity led me from engineering into building automations that save teams hours, forecasts that turn uncertainty into clarity, and products that move ideas off the whiteboard. I&apos;ve learned that progress isn&apos;t about doing everything; it&apos;s about doing the right things in the right order.
            </p>
            
            <p className="mb-6 leading-relaxed">
              I&apos;m most at home connecting people and ideas, data with intuition, and watching what happens next. Across fintech, real estate, and data systems, I&apos;ve built a habit of moving fast, learning deeply, and leaving better systems behind.
            </p>
            
            <p className="mb-8 leading-relaxed">
              Outside work, I explore how finance and technology shape decisions: from options strategies to AI-driven systems, and share those learnings through small, documented experiments.
            </p>
            
            <p className="mb-8 leading-relaxed">
              According to my CliftonStrengths, I&apos;m an <strong>Arranger</strong> and <strong>Achiever</strong> — I excel at orchestrating many moving parts while pushing projects to completion. My <strong>Command</strong> gives me the confidence to take initiative and make tough decisions when direction is unclear. With <strong>Focus</strong>, I align energy toward the few priorities that create outsized impact. And my <strong>Strategic</strong> mindset helps me spot patterns early, anticipate obstacles, and position teams to win.
            </p>
          </div>
          
          {/* CliftonStrengths Grid */}
          <div className="mt-12">
            <h3 className="mb-6 text-center">CliftonStrengths Grid</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border px-4 py-3 text-left font-semibold">Strength</th>
                    <th className="border border-border px-4 py-3 text-left font-semibold">How it shows up in my work</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-3 font-medium">Arranger</td>
                    <td className="border border-border px-4 py-3 text-muted-foreground">I organize people, tools, and timelines into efficient systems that keep momentum.</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="border border-border px-4 py-3 font-medium">Achiever</td>
                    <td className="border border-border px-4 py-3 text-muted-foreground">I set high standards and push projects from idea to measurable result.</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-3 font-medium">Command</td>
                    <td className="border border-border px-4 py-3 text-muted-foreground">I lead with clarity and confidence, especially when others need direction.</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="border border-border px-4 py-3 font-medium">Focus</td>
                    <td className="border border-border px-4 py-3 text-muted-foreground">I prioritize ruthlessly to finish what matters most.</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-3 font-medium">Strategic</td>
                    <td className="border border-border px-4 py-3 text-muted-foreground">I see patterns quickly and plan alternative paths to reach goals faster.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="flex items-center justify-between mb-12">
            <h2>Projects</h2>
            <Link
              href="/projects"
              className="text-muted-foreground hover:text-foreground transition-colors"
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
                <div className="card-professional p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {project.frontmatter.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {project.frontmatter.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.frontmatter.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
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

      {/* Awards, Recognition, Features Section */}
      <section className="section-padding bg-card">
        <div className="container-max">
          <h2 className="mb-12 text-center">Awards, Recognition, Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Richard N. Baxendale Outstanding Junior Award */}
            <div className="card-professional p-6 text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-3">
                Richard N. Baxendale Outstanding Junior Award
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                For leadership, academic excellence, and department impact.
              </p>
            </div>

            {/* Tau Beta Pi Honors Society */}
            <div className="card-professional p-6 text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold mb-3">
                Tau Beta Pi Honors Society
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Recognition of academic and professional distinction.
              </p>
            </div>

            {/* James Scholar / Dean's List */}
            <div className="card-professional p-6 text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-3">
                James Scholar / Dean&apos;s List
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Consistent top performance across semesters.
              </p>
            </div>

            {/* Scholarships and Awards */}
            <div className="card-professional p-6 text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3">
                Scholarships and Awards
              </h3>
              <div className="text-muted-foreground text-sm leading-relaxed space-y-2">
                <p>Illinois Engineering Achievement Scholarship</p>
                <p>Illinois Engineering Outstanding Scholarship</p>
                <p>Tau Beta Pi Award Fund</p>
                <p>Industrial and Enterprise Systems Engineering Scholarship</p>
              </div>
            </div>
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

      {/* Documents Section */}
      <section className="px-6 py-16 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <a
              href="/documents/Resume Manav September 25.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="bg-neutral-800 rounded-lg p-6 hover:bg-neutral-700 transition-colors text-center">
                <div className="text-4xl mb-4">📄</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-white">
                  Resume
                </h3>
                <p className="text-neutral-400 text-sm">
                  Download my latest resume and professional background
                </p>
              </div>
            </a>
            
              <a
                href="/documents/Manav Shah Economic Report.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
              <div className="bg-neutral-800 rounded-lg p-6 hover:bg-neutral-700 transition-colors text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-white">
                  Economic Report
                </h3>
                <p className="text-neutral-400 text-sm">
                  Analysis and insights on economic trends and market conditions
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
