import { MetadataRoute } from 'next';
import { getAllProjectsList, getAllInsightsList } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  // Get all dynamic content
  const projects = getAllProjectsList();
  const insights = getAllInsightsList();
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
  
  // Dynamic project pages
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  
  // Dynamic insight pages
  const insightPages: MetadataRoute.Sitemap = insights.map((insight) => ({
    url: `${baseUrl}/insights/${insight.slug}`,
    lastModified: new Date(insight.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  
  return [...staticPages, ...projectPages, ...insightPages];
}
