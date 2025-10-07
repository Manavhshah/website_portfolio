import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectsList } from "@/lib/content";
import { processMDXContent } from "@/lib/mdx";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const projects = getAllProjectsList();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.summary,
    keywords: project.frontmatter.tags,
    openGraph: {
      title: `${project.frontmatter.title} | Manav Shah`,
      description: project.frontmatter.summary,
      url: `/projects/${params.slug}`,
      type: 'article',
      publishedTime: project.frontmatter.date,
      tags: project.frontmatter.tags,
      images: project.frontmatter.cover ? [
        {
          url: project.frontmatter.cover,
          width: 1200,
          height: 630,
          alt: project.frontmatter.title,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.frontmatter.title} | Manav Shah`,
      description: project.frontmatter.summary,
      images: project.frontmatter.cover ? [project.frontmatter.cover] : undefined,
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const processedContent = processMDXContent(project.content);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="section-padding gradient-subtle">
        <div className="container-max">
          <div className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              ← Back to projects
            </Link>
            <h1 className="mb-6">
              {project.frontmatter.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
              {project.frontmatter.summary}
            </p>
            
            {/* Project Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <time>
                {new Date(project.frontmatter.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <div className="flex flex-wrap gap-2">
                {project.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {project.frontmatter.cover && (
        <section className="px-6 mb-16 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-neutral-800 rounded-lg overflow-hidden">
              <img
                src={project.frontmatter.cover}
                alt={`${project.frontmatter.title} cover image`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

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
              href="/projects"
              className="inline-flex items-center text-neutral-400 hover:text-white transition-colors"
            >
              ← All projects
            </Link>
            <Link
              href="/insights"
              className="inline-flex items-center text-neutral-400 hover:text-white transition-colors"
            >
              Read insights →
            </Link>
          </div>
        </div>
      </nav>

    </div>
  );
}
