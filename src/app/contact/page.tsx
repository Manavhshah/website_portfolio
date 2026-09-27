import type { Metadata } from "next";
import { ArrowUpRight, Calendar, FileText, Github, Linkedin, Mail } from "lucide-react";
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
    {
      icon: Calendar,
      label: "Book 30 minutes",
      hint: "Pick a slot on my Google Calendar",
      href: site.links.calendar,
      external: true,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      hint: "Connect or message me there",
      href: site.links.linkedin,
      external: true,
    },
    {
      icon: Github,
      label: "GitHub",
      hint: "Code, mostly go-to-market tooling",
      href: site.links.github,
      external: true,
    },
    {
      icon: FileText,
      label: "Résumé",
      hint: "One page, PDF, September 2026",
      href: site.links.resume,
      external: true,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s <em className="text-accent">talk.</em>
          </>
        }
        intro="Founders, operators, students. I answer email the same day."
      />

      <section className="container-page pb-20">
        <Reveal>
          <div className="rounded-lg border border-line bg-bg-elevated p-6 sm:p-8">
            <p className="eyebrow inline-flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" aria-hidden />
              Email, the best way
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={`mailto:${site.email}`}
                className="font-display text-2xl text-fg transition-colors hover:text-accent sm:text-4xl"
              >
                {site.email}
              </a>
              <CopyEmail email={site.email} />
            </div>
          </div>
        </Reveal>

        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {channels.map((c, i) => (
            <Reveal as="li" key={c.label} delay={0.05 * (i + 1)}>
              <a
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className="group flex h-full items-start gap-4 rounded-lg border border-line p-5 transition-colors hover:border-line-strong hover:bg-bg-elevated"
              >
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line bg-surface text-fg-soft">
                  <c.icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="flex-1">
                  <span className="flex items-center justify-between gap-2 text-fg">
                    {c.label}
                    <ArrowUpRight
                      className="h-4 w-4 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-1 block text-sm text-muted">{c.hint}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.3}>
          <p className="mt-10 max-w-xl text-sm leading-relaxed text-faint">
            {site.location}. In person in San Francisco, or a call from anywhere.
          </p>
        </Reveal>
      </section>
    </>
  );
}
