import type { MDXComponents } from 'mdx/types';
import { cn } from '@/lib/utils';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Customize headings with proper styling
    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          'scroll-m-20 text-2xl font-semibold tracking-tight',
          className
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn(
          'scroll-m-20 text-xl font-semibold tracking-tight',
          className
        )}
        {...props}
      />
    ),
    h5: ({ className, ...props }) => (
      <h5
        className={cn(
          'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
          className
        )}
        {...props}
      />
    ),
    h6: ({ className, ...props }) => (
      <h6
        className={cn(
          'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
          className
        )}
        {...props}
      />
    ),
    // Customize paragraphs
    p: ({ className, ...props }) => (
      <p
        className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
        {...props}
      />
    ),
    // Customize links
    a: ({ className, ...props }) => (
      <a
        className={cn('font-medium underline underline-offset-4', className)}
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
    // Customize lists
    ul: ({ className, ...props }) => (
      <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...props} />
    ),
    ol: ({ className, ...props }) => (
      <ol className={cn('my-6 ml-6 list-decimal [&>li]:mt-2', className)} {...props} />
    ),
    li: ({ className, ...props }) => (
      <li className={cn('mt-2', className)} {...props} />
    ),
    // Customize blockquotes
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn('mt-6 border-l-2 pl-6 italic', className)}
        {...props}
      />
    ),
    // Customize horizontal rules
    hr: ({ className, ...props }) => (
      <hr className={cn('my-4 md:my-8', className)} {...props} />
    ),
    // Customize tables
    table: ({ className, ...props }) => (
      <div className="my-6 w-full overflow-y-auto">
        <table className={cn('w-full', className)} {...props} />
      </div>
    ),
    tr: ({ className, ...props }) => (
      <tr className={cn('m-0 border-t p-0 even:bg-muted', className)} {...props} />
    ),
    th: ({ className, ...props }) => (
      <th
        className={cn(
          'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        className={cn(
          'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
          className
        )}
        {...props}
      />
    ),
    ...components,
  };
}
