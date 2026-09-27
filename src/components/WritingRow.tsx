import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Entry } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export default function WritingRow({ entry }: { entry: Entry<"writing"> }) {
  const { slug, frontmatter: fm } = entry;
  return (
    <Link
      href={`/writing/${slug}`}
      className="group grid gap-3 border-t border-line py-7 transition-colors hover:bg-bg-elevated sm:grid-cols-[9rem_1fr_auto] sm:gap-8 sm:px-4 sm:-mx-4"
    >
      <time className="eyebrow pt-1.5" dateTime={fm.date}>
        {formatDate(fm.date, { year: "numeric", month: "short", day: "numeric" })}
      </time>
      <div>
        <h3 className="font-display text-balance text-2xl text-fg sm:text-[1.7rem]">
          {fm.title}
        </h3>
        <p className="mt-2 max-w-2xl text-pretty text-[0.95rem] leading-relaxed text-muted">
          {fm.summary}
        </p>
        <p className="mt-3 text-xs text-faint">
          {fm.readingTime} min read
          <span className="mx-2">·</span>
          {fm.tags.join(", ")}
        </p>
      </div>
      <ArrowUpRight
        className="hidden h-5 w-5 self-start text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block"
        aria-hidden
      />
    </Link>
  );
}
