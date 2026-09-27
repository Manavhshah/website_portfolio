import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import CopyEmail from "@/components/CopyEmail";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email, LinkedIn, or thirty minutes on the calendar. Whichever is easiest.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const channels = [
    { label: "Book 30 minutes", hint: "Google Calendar", href: site.links.calendar },
    { label: "LinkedIn", hint: "Connect or message", href: site.links.linkedin },
    { label: "GitHub", hint: "Go-to-market tooling, mostly", href: site.links.github },
    { label: "X", hint: "Occasional notes", href: site.links.x },
    { label: "Résumé", hint: "One page, PDF", href: site.links.resume },
  ];

  return (
    <>
      <PageHeader
        title={
          <>
            Let&apos;s <em className="text-accent">talk.</em>
          </>
        }
        intro="Founders, operators, students. I answer email the same day."
      />

      <section className="container-page pb-24">
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line py-8">
            <a
              href={`mailto:${site.email}`}
              className="font-display text-2xl text-fg transition-colors hover:text-accent sm:text-4xl"
            >
              {site.email}
            </a>
            <CopyEmail email={site.email} />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <ul className="border-b border-line">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid items-baseline gap-1 border-t border-line py-5 sm:grid-cols-[12rem_1fr_auto] sm:gap-8"
                >
                  <span className="text-fg transition-colors group-hover:text-accent">{c.label}</span>
                  <span className="text-[0.95rem] text-muted">{c.hint}</span>
                  <ArrowUpRight
                    className="hidden h-4 w-4 self-center text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 text-sm text-faint">
            {site.location}. In person in San Francisco, or a call from anywhere.
          </p>
        </Reveal>
      </section>
    </>
  );
}
