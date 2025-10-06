// Base frontmatter interface that all content types extend
export interface BaseFrontmatter {
  title: string;
  summary: string;
  date: string;
  tags: string[];
  [key: string]: unknown;
}

// Project-specific frontmatter
export interface ProjectFrontmatter extends BaseFrontmatter {
  cover: string;
}

// Insight-specific frontmatter (same as base for now, but can be extended)
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InsightFrontmatter extends BaseFrontmatter {
  // No additional fields for insights currently
  // Can be extended in the future if needed
}

// Union type for all frontmatter types
export type ContentFrontmatter = ProjectFrontmatter | InsightFrontmatter;

// Content item with frontmatter and slug
export interface ContentItem<T extends BaseFrontmatter = BaseFrontmatter> {
  slug: string;
  frontmatter: T;
  content: string;
}

// Specific content item types
export interface ProjectItem extends ContentItem<ProjectFrontmatter> {
  frontmatter: ProjectFrontmatter;
}

export interface InsightItem extends ContentItem<InsightFrontmatter> {
  frontmatter: InsightFrontmatter;
}

// Type guards to check content types
export function isProjectItem(item: ContentItem): item is ProjectItem {
  return 'cover' in item.frontmatter;
}

export function isInsightItem(item: ContentItem): item is InsightItem {
  return !('cover' in item.frontmatter);
}

// Helper type for content listing (without full content)
export interface ContentListItem<T extends BaseFrontmatter = BaseFrontmatter> {
  slug: string;
  frontmatter: T;
}

export type ProjectListItem = ContentListItem<ProjectFrontmatter>;
export type InsightListItem = ContentListItem<InsightFrontmatter>;
