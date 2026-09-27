import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Entry } from "@/lib/content";

/** One line per case study. Title, where, when. Summary on the second line. */
export default function WorkRow({ entry }: { entry: Entry<"work"> }) {
  const { slug, frontmatter: fm } = entry;
  const year = fm.date.slice(0, 4);
  return (
    <Link
      href={`/work/${slug}`}
      className="group grid gap-2 border-t border-line py-6 sm:grid-cols-[7rem_1fr_auto] sm:gap-8 sm:py-7"
    >
      <span className="text-sm text-faint">{year}</span>
      <span>
        <span className="block font-display text-2xl leading-tight text-fg transition-colors group-hover:text-accent sm:text-[1.75rem]">
          {fm.title}
        </span>
        <span className="mt-2 block text-[0.95rem] leading-relaxed text-muted">
          {fm.org} · {fm.role}
          {fm.status ? ` · ${fm.status}` : ""}
        </span>
      </span>
      <ArrowUpRight
        className="hidden h-5 w-5 self-start text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block"
        aria-hidden
      />
    </Link>
  );
}
