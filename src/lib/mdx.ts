import type { ProjectItem, InsightItem } from '@/types/content';

/**
 * Compile MDX content to a function that can be executed
 * Note: This is a simplified version for Next.js App Router compatibility
 * @param content - Raw MDX content string
 * @returns Compiled MDX function as string
 */
export async function compileMDX(content: string): Promise<string> {
  try {
    // For now, return a simple function that processes the content
    // In a real implementation, this would use @mdx-js/mdx
    const processedContent = processMDXContent(content);
    
    // Return a simple function representation
    return `function MDXContent() {
  return ${JSON.stringify(processedContent)};
}`;
  } catch (error) {
    console.error('Error compiling MDX:', error);
    throw new Error(`Failed to compile MDX: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Compile MDX content for a project
 * @param project - Project item with content
 * @returns Compiled MDX function as string
 */
export async function compileProjectMDX(project: ProjectItem): Promise<string> {
  return compileMDX(project.content);
}

/**
 * Compile MDX content for an insight
 * @param insight - Insight item with content
 * @returns Compiled MDX function as string
 */
export async function compileInsightMDX(insight: InsightItem): Promise<string> {
  return compileMDX(insight.content);
}

/**
 * Process MDX content for rendering
 * This function prepares MDX content for use in React components
 * @param content - Raw MDX content string
 * @returns Processed content ready for rendering
 */
export function processMDXContent(content: string): string {
  try {
    // Basic processing - remove frontmatter if present
    const withoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');
    
    // Additional processing can be added here
    // For now, return the content as-is
    return withoutFrontmatter.trim();
  } catch (error) {
    console.error('Error processing MDX content:', error);
    return content; // Fallback to raw content
  }
}

/**
 * Get MDX components for rendering
 * This function provides the components that will be used to render MDX
 */
export function useMDXComponents(components: Record<string, React.ComponentType> = {}) {
  return {
    // Default components can be added here
    // These will be used by the mdx-components.tsx file
    ...components,
  };
}

// Re-export commonly used types and utilities
export type { ProjectItem, InsightItem } from '@/types/content';
