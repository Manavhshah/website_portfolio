"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { WorkFrontmatter } from "@/lib/content";

export interface WorkIndexItem {
  slug: string;
  frontmatter: WorkFrontmatter;
}

/**
 * The work list with a preview card that follows the cursor while a row is
 * hovered. The preview shows the entry's headline numbers so the list stays
 * quiet but rewards curiosity. Touch devices just get the list.
 */
export default function WorkIndex({ items }: { items: WorkIndexItem[] }) {
  const [active, setActive] = useState<WorkIndexItem | null>(null);
  const [canHover, setCanHover] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const lastX = useRef(0);
  const [tilt, setTilt] = useState(0);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  function onMove(e: React.MouseEvent) {
    setPos({ x: e.clientX + 24, y: e.clientY - 40 });
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    setTilt(Math.max(-4, Math.min(4, dx * 0.35)));
  }

  return (
    <div onMouseMove={canHover ? onMove : undefined} onMouseLeave={() => setActive(null)}>
      <div className="border-b border-line">
        {items.map((entry) => {
          const fm = entry.frontmatter;
          return (
            <Link
              key={entry.slug}
              href={`/work/${entry.slug}`}
              onMouseEnter={() => setActive(entry)}
              className="group grid gap-2 border-t border-line py-6 sm:grid-cols-[7rem_1fr_auto] sm:gap-8 sm:py-7"
            >
              <span className="text-sm text-faint">{fm.date.slice(0, 4)}</span>
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
        })}
      </div>

      {canHover && (
        <AnimatePresence>
          {active && active.frontmatter.highlights && (
            <motion.div
              key={active.slug}
              aria-hidden
              initial={{ opacity: 0, scale: 0.9, x: pos.x, y: pos.y }}
              animate={{ opacity: 1, scale: 1, rotate: tilt, x: pos.x, y: pos.y }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.5, opacity: { duration: 0.15 } }}
              className="pointer-events-none fixed left-0 top-0 z-40 w-56 rounded-md bg-fg p-4 text-bg shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)]"
            >
              <p className="text-[0.7rem] uppercase tracking-wider opacity-60">{active.frontmatter.org}</p>
              <dl className="mt-3 space-y-3">
                {active.frontmatter.highlights.slice(0, 3).map((h) => (
                  <div key={h.label}>
                    <dt className="sr-only">{h.label}</dt>
                    <dd className="font-display text-2xl leading-none">{h.value}</dd>
                    <dd className="mt-1 text-xs leading-snug opacity-70">{h.label}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
