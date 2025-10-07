import type { MDXComponents } from 'mdx/types';
import { cn } from '@/lib/utils';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Customize headings with proper styling and spacing
    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8',
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          'scroll-m-20 text-3xl font-semibold tracking-tight mt-12 mb-6 first:mt-0',
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          'scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4',
          className
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn(
          'scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-3',
          className
        )}
        {...props}
      />
    ),
    h5: ({ className, ...props }) => (
      <h5
        className={cn(
          'scroll-m-20 text-lg font-semibold tracking-tight mt-6 mb-3',
          className
        )}
        {...props}
      />
    ),
    h6: ({ className, ...props }) => (
      <h6
        className={cn(
          'scroll-m-20 text-base font-semibold tracking-tight mt-4 mb-2',
          className
        )}
        {...props}
      />
    ),
    // Customize paragraphs with better spacing
    p: ({ className, ...props }) => (
      <p
        className={cn('leading-relaxed text-muted-foreground mb-4', className)}
        {...props}
      />
    ),
    // Customize links
    a: ({ className, ...props }) => (
      <a
        className={cn('font-medium text-primary hover:text-primary/80 underline underline-offset-4 transition-colors', className)}
        {...props}
      />
    ),
    // Customize code blocks
    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          'mb-4 mt-6 overflow-x-auto rounded-lg border bg-muted px-4 py-3 text-sm',
          className
        )}
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn(
          'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
          className
        )}
        {...props}
      />
    ),
    // Customize lists with better spacing and readability
    ul: ({ className, ...props }) => (
      <ul className={cn('my-6 ml-6 list-disc space-y-3', className)} {...props} />
    ),
    ol: ({ className, ...props }) => (
      <ol className={cn('my-6 ml-6 list-decimal space-y-3', className)} {...props} />
    ),
    li: ({ className, ...props }) => (
      <li className={cn('leading-relaxed text-muted-foreground', className)} {...props} />
    ),
    // Customize blockquotes
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn('mt-6 mb-6 border-l-4 border-primary pl-6 italic text-muted-foreground bg-muted/50 py-4 rounded-r-lg', className)}
        {...props}
      />
    ),
    // Customize horizontal rules
    hr: ({ className, ...props }) => (
      <hr className={cn('my-8 border-border', className)} {...props} />
    ),
    // Customize tables with professional styling
    table: ({ className, ...props }) => (
      <div className="my-8 w-full overflow-y-auto rounded-lg border border-border">
        <table className={cn('w-full', className)} {...props} />
      </div>
    ),
    tr: ({ className, ...props }) => (
      <tr className={cn('border-b border-border even:bg-muted/30', className)} {...props} />
    ),
    th: ({ className, ...props }) => (
      <th
        className={cn(
          'border-r border-border px-4 py-3 text-left font-semibold bg-muted [&[align=center]]:text-center [&[align=right]]:text-right last:border-r-0',
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        className={cn(
          'border-r border-border px-4 py-3 text-left text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right last:border-r-0',
          className
        )}
        {...props}
      />
    ),
    ...components,
  };
}
