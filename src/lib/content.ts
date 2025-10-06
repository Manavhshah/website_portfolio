import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { 
  ProjectItem, 
  InsightItem, 
  ProjectListItem, 
  InsightListItem,
  ProjectFrontmatter,
  InsightFrontmatter 
} from '@/types/content';

const contentDirectory = path.join(process.cwd(), 'src/content');

// Helper function to get all MDX files from a directory
function getMdxFiles(directory: string): string[] {
  try {
    const fullPath = path.join(contentDirectory, directory);
    if (!fs.existsSync(fullPath)) {
      return [];
    }
    
    return fs.readdirSync(fullPath)
      .filter(file => file.endsWith('.mdx'))
      .map(file => path.join(fullPath, file));
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error);
    return [];
  }
}

// Helper function to get slug from file path
function getSlugFromPath(filePath: string): string {
  const fileName = path.basename(filePath, '.mdx');
  return fileName;
}

// Helper function to read and parse MDX file
function readMdxFile(filePath: string): { frontmatter: Record<string, unknown>; content: string } | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);
    return { frontmatter, content };
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

// Get all projects with full content
export function getAllProjects(): ProjectItem[] {
  const files = getMdxFiles('projects');
  
  const projects = files
    .map(filePath => {
      const slug = getSlugFromPath(filePath);
      const fileData = readMdxFile(filePath);
      
      if (!fileData) return null;
      
      return {
        slug,
        frontmatter: fileData.frontmatter as ProjectFrontmatter,
        content: fileData.content
      } as ProjectItem;
    })
    .filter((project): project is ProjectItem => project !== null)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
  
  return projects;
}

// Get all projects as list items (without content)
export function getAllProjectsList(): ProjectListItem[] {
  const files = getMdxFiles('projects');
  
  const projects = files
    .map(filePath => {
      const slug = getSlugFromPath(filePath);
      const fileData = readMdxFile(filePath);
      
      if (!fileData) return null;
      
      return {
        slug,
        frontmatter: fileData.frontmatter as ProjectFrontmatter
      } as ProjectListItem;
    })
    .filter((project): project is ProjectListItem => project !== null)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
  
  return projects;
}

// Get all insights with full content
export function getAllInsights(): InsightItem[] {
  const files = getMdxFiles('insights');
  
  const insights = files
    .map(filePath => {
      const slug = getSlugFromPath(filePath);
      const fileData = readMdxFile(filePath);
      
      if (!fileData) return null;
      
      return {
        slug,
        frontmatter: fileData.frontmatter as InsightFrontmatter,
        content: fileData.content
      } as InsightItem;
    })
    .filter((insight): insight is InsightItem => insight !== null)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
  
  return insights;
}

// Get all insights as list items (without content)
export function getAllInsightsList(): InsightListItem[] {
  const files = getMdxFiles('insights');
  
  const insights = files
    .map(filePath => {
      const slug = getSlugFromPath(filePath);
      const fileData = readMdxFile(filePath);
      
      if (!fileData) return null;
      
      return {
        slug,
        frontmatter: fileData.frontmatter as InsightFrontmatter
      } as InsightListItem;
    })
    .filter((insight): insight is InsightListItem => insight !== null)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
  
  return insights;
}

// Get a single project by slug
export function getProjectBySlug(slug: string): ProjectItem | null {
  const filePath = path.join(contentDirectory, 'projects', `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileData = readMdxFile(filePath);
  if (!fileData) {
    return null;
  }
  
  return {
    slug,
    frontmatter: fileData.frontmatter as ProjectFrontmatter,
    content: fileData.content
  } as ProjectItem;
}

// Get a single insight by slug
export function getInsightBySlug(slug: string): InsightItem | null {
  const filePath = path.join(contentDirectory, 'insights', `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileData = readMdxFile(filePath);
  if (!fileData) {
    return null;
  }
  
  return {
    slug,
    frontmatter: fileData.frontmatter as InsightFrontmatter,
    content: fileData.content
  } as InsightItem;
}

// Get all unique tags from projects
export function getAllProjectTags(): string[] {
  const projects = getAllProjectsList();
  const allTags = projects.flatMap(project => project.frontmatter.tags);
  return Array.from(new Set(allTags)).sort();
}

// Get all unique tags from insights
export function getAllInsightTags(): string[] {
  const insights = getAllInsightsList();
  const allTags = insights.flatMap(insight => insight.frontmatter.tags);
  return Array.from(new Set(allTags)).sort();
}

// Get all unique tags from all content
export function getAllTags(): string[] {
  const projectTags = getAllProjectTags();
  const insightTags = getAllInsightTags();
  const allTags = [...projectTags, ...insightTags];
  return Array.from(new Set(allTags)).sort();
}
