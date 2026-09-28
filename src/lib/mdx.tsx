import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import CountUp from "@/components/CountUp";

/* ------------------------------------------------------------------ */
/* Components available inside every .mdx file                         */
/* ------------------------------------------------------------------ */

function Anchor({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) {
  const external = /^https?:\/\//.test(href);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

/** <Callout>Short aside or caveat.</Callout> */
function Callout({ children }: { children: ReactNode }) {
  return <div className="callout">{children}</div>;
}

/**
 * <Stats cols={3} items={[{ value: "54", label: "merged PRs" }, ...]} />
 * Renders a compact grid of headline numbers.
 */
function Stats({
  items = [],
  cols = 3,
}: {
  items?: { value: string; label: string }[];
  cols?: number;
}) {
  if (items.length === 0) return null;
  return (
    <div className="stat-grid" style={{ ["--cols" as string]: cols }}>
      {items.map((s) => (
        <div key={s.label}>
          <div className="font-display text-3xl leading-none text-fg">
            <CountUp value={s.value} />
          </div>
          <div className="mt-2 text-sm text-muted">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/** <Lede>Opening paragraph, set larger.</Lede> */
function Lede({ children }: { children: ReactNode }) {
  // MDX wraps the inner text in a <p>, so this must not be a <p> itself.
  return (
    <div className="lede font-display text-2xl leading-snug text-fg sm:text-[1.7rem]">
      {children}
    </div>
  );
}

export const mdxComponents = {
  a: Anchor,
  Callout,
  Stats,
  Lede,
};

/* ------------------------------------------------------------------ */
/* Compile + render (server only)                                      */
/* ------------------------------------------------------------------ */

/**
 * Compiles an MDX string to a React element tree. Runs at build time for
 * statically generated pages, so the cost is paid once per content file.
 */
export async function renderMdx(source: string) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
    development: false,
  });
  return <Content components={mdxComponents} />;
}
