import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Entry } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function WorkCard({
  entry,
  size = "default",
  className,
}: {
  entry: Entry<"work">;
  size?: "default" | "large";
  className?: string;
}) {
  const { slug, frontmatter: fm } = entry;
  const large = size === "large";

  return (
    <Link
      href={`/work/${slug}`}
      className={cn(
        "group relative flex h-full flex-col rounded-lg border border-line bg-bg-elevated p-6 transition-[border-color,background-color,transform] duration-300 hover:border-line-strong hover:bg-surface sm:p-7",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow">
          {fm.org}
          <span className="mx-2 text-faint">·</span>
          {fm.period}
        </p>
        {fm.status && (
          <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted">
            {fm.status}
          </span>
        )}
      </div>

      <h3
        className={cn(
          "mt-4 font-display text-balance text-fg",
          large ? "text-3xl sm:text-4xl" : "text-2xl",
        )}
      >
        {fm.title}
      </h3>

      <p className="mt-3 text-pretty text-[0.95rem] leading-relaxed text-muted">
        {fm.summary}
      </p>

      {fm.highlights && fm.highlights.length > 0 && (
        <dl
          className={cn(
            "mt-6 grid gap-x-6 gap-y-4",
            large ? "grid-cols-3" : "grid-cols-3",
          )}
        >
          {fm.highlights.slice(0, 3).map((h) => (
            <div key={h.label}>
              <dt className="sr-only">{h.label}</dt>
              <dd className="font-display text-2xl leading-none text-fg">{h.value}</dd>
              <dd className="mt-1.5 text-xs leading-snug text-faint">{h.label}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-auto flex items-center justify-between pt-6">
        <ul className="flex flex-wrap gap-1.5">
          {fm.tags.slice(0, 3).map((t) => (
            <li
              key={t}
              className="rounded-full bg-surface px-2.5 py-1 text-xs text-muted"
            >
              {t}
            </li>
          ))}
        </ul>
        <span className="inline-flex items-center gap-1 text-sm text-muted transition-colors group-hover:text-accent">
          Read
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
