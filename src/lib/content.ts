import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Content lives in src/content/{work,writing}/*.mdx.
 * Each file has YAML frontmatter followed by an MDX body.
 * The filename (without .mdx) is the URL slug.
 */

const CONTENT_ROOT = path.join(process.cwd(), "src/content");

export type ContentType = "work" | "writing";

export interface WorkFrontmatter {
  title: string;
  /** One sentence shown on cards and in metadata. */
  summary: string;
  /** Organisation or project name. */
  org: string;
  /** Your role there. */
  role: string;
  /** Human readable period, e.g. "Jun 2026 – Present". */
  period: string;
  /** ISO date used for sorting (usually the start date). */
  date: string;
  tags: string[];
  /** Up to three headline numbers shown on the card and detail page. */
  highlights?: { value: string; label: string }[];
  /** Show on the home page. */
  featured?: boolean;
  /** Lower comes first among featured items. */
  order?: number;
  /** Optional external link (live site, repo, PDF). */
  link?: { href: string; label: string };
  /** Optional status pill, e.g. "Paused", "Live". */
  status?: string;
}

export interface WritingFrontmatter {
  title: string;
  summary: string;
  date: string;
  tags: string[];
  /** Estimated read time in minutes. Computed if omitted. */
  readingTime?: number;
}

export type Frontmatter<T extends ContentType> = T extends "work"
  ? WorkFrontmatter
  : WritingFrontmatter;

export interface Entry<T extends ContentType> {
  slug: string;
  type: T;
  frontmatter: Frontmatter<T>;
  body: string;
}

function dir(type: ContentType) {
  return path.join(CONTENT_ROOT, type);
}

function readEntry<T extends ContentType>(type: T, file: string): Entry<T> {
  const raw = fs.readFileSync(path.join(dir(type), file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.mdx$/, "");
  const fm = data as Frontmatter<T>;

  if (type === "writing") {
    const w = fm as WritingFrontmatter;
    if (!w.readingTime) {
      const words = content.split(/\s+/).filter(Boolean).length;
      w.readingTime = Math.max(1, Math.round(words / 220));
    }
  }

  assertFrontmatter(type, slug, fm);
  return { slug, type, frontmatter: fm, body: content };
}

function assertFrontmatter(type: ContentType, slug: string, fm: unknown) {
  const f = fm as Record<string, unknown>;
  const required =
    type === "work"
      ? ["title", "summary", "org", "role", "period", "date", "tags"]
      : ["title", "summary", "date", "tags"];
  for (const key of required) {
    if (f[key] === undefined || f[key] === null || f[key] === "") {
      throw new Error(
        `src/content/${type}/${slug}.mdx is missing required frontmatter field "${key}"`,
      );
    }
  }
}

export function getAll<T extends ContentType>(type: T): Entry<T>[] {
  const d = dir(type);
  if (!fs.existsSync(d)) return [];
  return fs
    .readdirSync(d)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map((f) => readEntry(type, f))
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

export function getBySlug<T extends ContentType>(
  type: T,
  slug: string,
): Entry<T> | null {
  const file = path.join(dir(type), `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  return readEntry(type, `${slug}.mdx`);
}

export function getFeaturedWork(limit = 3): Entry<"work">[] {
  return getAll("work")
    .filter((e) => e.frontmatter.featured)
    .sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99))
    .slice(0, limit);
}

export function getAllTags(type: ContentType): string[] {
  const tags = new Set<string>();
  for (const e of getAll(type)) e.frontmatter.tags.forEach((t) => tags.add(t));
  return Array.from(tags).sort();
}

/** Previous and next entries by date, for detail-page navigation. */
export function getNeighbours<T extends ContentType>(type: T, slug: string) {
  const all = getAll(type);
  const i = all.findIndex((e) => e.slug === slug);
  return {
    newer: i > 0 ? all[i - 1] : null,
    older: i >= 0 && i < all.length - 1 ? all[i + 1] : null,
  };
}
