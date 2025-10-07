import { getAllProjectsList, getAllProjectTags } from "@/lib/content";
import ProjectsPageClient from "@/components/ProjectsPageClient";
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

  return <ProjectsPageClient projects={projects} allTags={allTags} />;
}
