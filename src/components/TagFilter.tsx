"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Client-side tag filter. Receives pre-rendered children keyed by tag so the
 * server still renders every item (good for SEO) and the client only toggles
 * visibility.
 */
export default function TagFilter({
  tags,
  items,
}: {
  tags: string[];
  items: { key: string; tags: string[]; node: ReactNode }[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const visible = active ? items.filter((i) => i.tags.includes(active)) : items;

  return (
    <div>
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by tag"
      >
        <FilterButton active={active === null} onClick={() => setActive(null)}>
          All
        </FilterButton>
        {tags.map((t) => (
          <FilterButton key={t} active={active === t} onClick={() => setActive(t)}>
            {t}
          </FilterButton>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {visible.map((i) => (
          <div key={i.key}>{i.node}</div>
        ))}
      </div>
      {visible.length === 0 && (
        <p className="py-12 text-center text-muted">Nothing tagged {active} yet.</p>
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
        active
          ? "border-accent bg-accent text-accent-fg"
          : "border-line text-muted hover:border-line-strong hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}
