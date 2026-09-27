import Link from "next/link";
import { timeline } from "@/content/timeline";
import { cn } from "@/lib/utils";

export default function Timeline({ limit }: { limit?: number }) {
  const items = limit ? timeline.slice(0, limit) : timeline;
  return (
    <ol className="relative border-l border-line pl-8 sm:pl-10">
      {items.map((t, i) => {
        const inner = (
          <>
            <p className="eyebrow">{t.period}</p>
            <h3 className="mt-2 text-lg font-medium text-fg">
              {t.title}
              <span className="text-muted"> · {t.org}</span>
            </h3>
            <p className="mt-2 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-muted">
              {t.note}
            </p>
          </>
        );
        return (
          <li key={`${t.period}-${t.org}`} className={cn("relative pb-10", i === items.length - 1 && "pb-0")}>
            <span
              className={cn(
                "absolute -left-8 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-bg sm:-left-10",
                t.kind === "venture" ? "bg-accent" : t.kind === "education" ? "bg-faint" : "bg-fg-soft",
              )}
              aria-hidden
            />
            {t.href ? (
              <Link href={t.href} className="group block rounded-md transition-colors">
                {inner}
                <span className="mt-2 inline-block text-sm text-faint transition-colors group-hover:text-accent">
                  Read the case study →
                </span>
              </Link>
            ) : (
              inner
            )}
          </li>
        );
      })}
    </ol>
  );
}
