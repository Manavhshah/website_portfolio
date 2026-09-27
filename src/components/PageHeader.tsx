import type { ReactNode } from "react";

export default function PageHeader({
  title,
  intro,
  children,
}: {
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="container-page pt-20 pb-12 sm:pt-28 sm:pb-16">
      <h1 className="font-display text-balance text-4xl leading-[1.08] text-fg animate-fade-up sm:text-5xl">
        {title}
      </h1>
      {intro && (
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted animate-fade-up delay-1">
          {intro}
        </p>
      )}
      {children && <div className="mt-8 animate-fade-up delay-2">{children}</div>}
    </header>
  );
}
