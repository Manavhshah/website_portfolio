import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-page py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-5xl text-fg">This page does not exist.</h1>
      <p className="mt-4 text-muted">It may have moved when the site was rebuilt.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back home
      </Link>
    </section>
  );
}
