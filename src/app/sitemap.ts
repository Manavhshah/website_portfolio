import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { getAll } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/writing`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const work = getAll("work").map((e) => ({
    url: `${base}/work/${e.slug}`,
    lastModified: new Date(e.frontmatter.date),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const writing = getAll("writing").map((e) => ({
    url: `${base}/writing/${e.slug}`,
    lastModified: new Date(e.frontmatter.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...work, ...writing];
}
