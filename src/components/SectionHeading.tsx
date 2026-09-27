import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  link,
  className,
}: {
  eyebrow?: string;
  title: string;
  link?: { href: string; label: string };
  className?: string;
}) {
  return (
    <div className={cn("mb-10 flex items-end justify-between gap-6", className)}>
      <div>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="font-display text-3xl text-fg sm:text-4xl">{title}</h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="group hidden shrink-0 items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg sm:inline-flex"
        >
          {link.label}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      )}
    </div>
  );
}
