'use client';

import { useEffect, useState } from 'react';
import { compileMDX, processMDXContent } from '@/lib/mdx';
import { getProjectBySlug } from '@/lib/content';

export default function TestMDXCompilePage() {
  const [compiledContent, setCompiledContent] = useState<string>('');
  const [processedContent, setProcessedContent] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function testCompilation() {
      try {
        // Test with a simple MDX content
        const testContent = `# Test MDX Compilation

This is a test of the MDX compilation system.

## Features

- **Bold text** works
- *Italic text* works
- \`Inline code\` works

\`\`\`javascript
const hello = "world";
console.log(hello);
\`\`\`

## Conclusion

If you can see this, MDX compilation is working! 🎉
`;

        // Test content processing
        const processed = processMDXContent(testContent);
        setProcessedContent(processed);

        // Test MDX compilation
        const compiled = await compileMDX(testContent);
        setCompiledContent(compiled);

        // Test with actual project content
        const project = getProjectBySlug('innovo');
        if (project) {
          const projectCompiled = await compileMDX(project.content);
          console.log('Project compilation successful:', projectCompiled.length);
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    }

    testCompilation();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">MDX Compilation Test</h1>
        
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Processed Content</h2>
            <div className="bg-neutral-800 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm">
                {processedContent || 'Loading...'}
              </pre>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Compiled MDX</h2>
            <div className="bg-neutral-800 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-xs overflow-auto max-h-96">
                {compiledContent || 'Loading...'}
              </pre>
            </div>
          </div>
        </div>

        {compiledContent && !error && (
          <div className="mt-8 p-4 bg-green-900 border border-green-700 text-green-100 rounded">
            ✅ MDX compilation successful! The helper functions are working correctly.
          </div>
        )}
      </div>
    </div>
  );
}
