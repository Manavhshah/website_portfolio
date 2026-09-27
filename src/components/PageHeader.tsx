import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="container-page pt-16 pb-12 sm:pt-24 sm:pb-16">
      {eyebrow && <p className="eyebrow mb-4 animate-fade-up">{eyebrow}</p>}
      <h1 className="font-display text-balance text-5xl leading-[1.02] text-fg animate-fade-up delay-1 sm:text-6xl lg:text-7xl">
        {title}
      </h1>
      {intro && (
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted animate-fade-up delay-2 sm:text-xl">
          {intro}
        </p>
      )}
      {children && <div className="mt-8 animate-fade-up delay-3">{children}</div>}
    </header>
  );
}
