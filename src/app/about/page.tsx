import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import Timeline from "@/components/Timeline";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Manav Shah grew up in Mumbai, studied industrial engineering and technology entrepreneurship at Illinois, and now builds go-to-market systems for early-stage startups in the Bay Area.",
  alternates: { canonical: "/about" },
};

const strengths = [
  { name: "Arranger", how: "People, tools, and timelines into systems that keep moving." },
  { name: "Achiever", how: "From idea to a measurable result." },
  { name: "Command", how: "Clear direction when nobody else will give it." },
  { name: "Focus", how: "The few things that matter, finished." },
  { name: "Strategic", how: "Patterns early. Alternatives ready." },
];

const campus = [
  "Course Assistant, MATH 112. Two sections, 70+ students a semester",
  "Senior Mentor, Illinois Business Council. 22 chosen from 400+",
  "Tau Beta Pi. Helped plan the Engineering Career Fair",
  "Silicon Valley Entrepreneurship Workshop. 25 chosen from 300+",
  "Cozad New Venture Challenge, with Alligator AI",
];

const honors = [
  "ISE Outstanding Junior and Outstanding Senior Awards",
  "James Scholar, five-time Dean's List",
  "Tau Beta Pi",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            I like finding the pattern, simplifying it, and turning it into something that{" "}
            <em className="text-accent">scales.</em>
          </>
        }
        intro="Mumbai-born. Illinois-trained. Bay Area-based."
      />

      {/* Story + portrait */}
      <section className="container-page pb-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="prose">
              <p>
                I grew up in Mumbai in a family that builds businesses. My father and uncle
                started a paper trading company in 1999. Dinner was about customers, credit, and
                the mills. That was my first course in go-to-market.
              </p>
              <p>
                At Illinois I studied industrial engineering, then added technology
                entrepreneurship. One degree taught me to see systems. The other taught me nothing
                matters until someone pays. I graduated in May 2026 with both and a 3.94.
              </p>
              <p>
                Along the way: underwriting in Chicago, a product thesis in Mumbai, a rebuilt CRM at
                an energy fintech, and two years teaching calculus sections. Then Heymarket as first
                GTM engineer, and Shiplight as founding GTM hire. One foot in customer conversations,
                one in the codebase, accountable for the number.
              </p>
              <p>
                Since 2018 I have run a small career-guidance program for tenth-graders in Pundhra,
                a village in Gujarat. It is the project I have kept the longest.
              </p>
              <p>
                Next, I want to build a company. Everything on this site is practice.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="space-y-4">
            <figure className="overflow-hidden rounded-lg border border-line bg-surface">
              <Image
                src="/images/sf-bay.jpg"
                alt="Manav on the San Francisco Bay with the city skyline behind him"
                width={2000}
                height={1334}
                sizes="(min-width: 1024px) 26rem, 100vw"
                className="aspect-[3/2] w-full object-cover"
              />
              <figcaption className="px-4 py-3 text-xs text-faint">
                San Francisco Bay, January 2025.
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-lg border border-line bg-surface">
              <Image
                src="/images/sv-workshop.jpg"
                alt="Manav laughing with classmates at the Silicon Valley Entrepreneurship Workshop"
                width={2000}
                height={1334}
                sizes="(min-width: 1024px) 26rem, 100vw"
                className="aspect-[3/2] w-full object-cover"
              />
              <figcaption className="px-4 py-3 text-xs text-faint">
                Silicon Valley Entrepreneurship Workshop cohort.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="hairline">
        <div className="container-page py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow mb-3">Timeline</p>
            <h2 className="font-display text-3xl text-fg sm:text-4xl">Where I have been</h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 max-w-3xl">
            <Timeline />
          </Reveal>
        </div>
      </section>

      {/* Strengths */}
      <section className="hairline">
        <div className="container-page py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
            <Reveal>
              <p className="eyebrow mb-3">How I work</p>
              <h2 className="font-display text-3xl text-fg sm:text-4xl">Five strengths</h2>
              <p className="mt-5 text-pretty leading-relaxed text-muted">
                CliftonStrengths, in my words.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="divide-y divide-line border-y border-line">
                {strengths.map((s) => (
                  <div key={s.name} className="grid gap-2 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <dt className="font-display text-xl text-fg">{s.name}</dt>
                    <dd className="text-pretty text-[0.95rem] leading-relaxed text-muted">{s.how}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Campus + honors */}
      <section className="hairline">
        <div className="container-page py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow mb-3">At Illinois</p>
              <h2 className="font-display text-3xl text-fg">Beyond the classroom</h2>
              <ul className="mt-6 space-y-3">
                {campus.map((c) => (
                  <li key={c} className="flex gap-3 text-pretty text-[0.95rem] leading-relaxed text-muted">
                    <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow mb-3">Recognition</p>
              <h2 className="font-display text-3xl text-fg">Honors</h2>
              <ul className="mt-6 space-y-3">
                {honors.map((h) => (
                  <li key={h} className="flex gap-3 text-pretty text-[0.95rem] leading-relaxed text-muted">
                    <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-10 rounded-lg border border-line bg-bg-elevated p-5">
                <p className="eyebrow">Education</p>
                <p className="mt-2 font-display text-xl text-fg">University of Illinois Urbana-Champaign</p>
                <p className="mt-1 text-sm text-muted">
                  B.Sc. Industrial Engineering + B.Sc. Technology Entrepreneurship. 3.94. May 2026.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Off hours */}
      <section className="hairline">
        <div className="container-page py-16 sm:py-20">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-3">Off hours</p>
            <h2 className="font-display text-3xl text-fg">Off hours</h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted">
              Options and commodity futures. Macroeconomics. Ray Dalio. A running list of ideas.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={site.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent"
              >
                Download résumé
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
              >
                Say hello
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
