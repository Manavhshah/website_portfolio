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
  { name: "Arranger", how: "I organize people, tools, and timelines into systems that keep momentum." },
  { name: "Achiever", how: "I set a high bar and push work from idea to a measurable result." },
  { name: "Command", how: "I lead with clarity when a room needs direction, and take the decision when nobody else will." },
  { name: "Focus", how: "I prioritize ruthlessly. The few things that matter most get finished." },
  { name: "Strategic", how: "I see patterns early and keep alternative paths ready." },
];

const campus = [
  "Course Assistant for MATH 112, teaching two discussion sections and 70+ students a semester",
  "Senior Mentor and Families Coordinator, Illinois Business Council, one of 22 chosen from 400+ applicants",
  "Tau Beta Pi professional committee, helped plan the TBP Engineering Career Fair",
  "Engineering Alumni Ambassador, organized alumni events and produced outreach media",
  "Management Consultant, Students Consulting for Non-Profit Organizations",
  "Silicon Valley Entrepreneurship Workshop, one of 25 selected from 300+ applicants",
  "Cozad New Venture Challenge, founder of Alligator AI",
  "Officer, Jain Students Association; volunteer, Young Jains of America",
];

const honors = [
  "Outstanding Junior Award (Richard N. Baxendale) and Outstanding Senior Award, ISE Department",
  "James Scholar and five-time Dean's List",
  "Tau Beta Pi engineering honor society",
  "Illinois Engineering Achievement and Outstanding Scholarships",
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
        intro="Mumbai-born, Illinois-trained, Bay Area-based. An engineer by education who found that the most interesting systems to build are the ones that turn a product into a business."
      />

      {/* Story + portrait */}
      <section className="container-page pb-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="prose">
              <p>
                I grew up in Mumbai in a family that builds businesses. My father and uncle
                founded a paper trading company in 1999 and grew it from a single dealership to
                thousands of tonnes a month, and dinner-table conversation was about customers,
                credit, and what the mills were doing. I did not know it at the time, but that was
                my first course in go-to-market.
              </p>
              <p>
                I came to the Grainger College of Engineering at Illinois in 2022 to study
                industrial engineering, then added a second degree in technology entrepreneurship
                because I kept wandering across the street to the business building. Industrial
                engineering taught me to see workflows, bottlenecks, and simulation. Entrepreneurship
                taught me that none of it matters until someone pays for it. I graduated in May 2026
                with both degrees and a 3.94.
              </p>
              <p>
                Along the way I underwrote commercial real estate in Chicago, wrote the product
                thesis for India&apos;s first real-estate portfolio management service, rebuilt the
                CRM at an energy fintech, and then talked that fintech into sponsoring my
                department&apos;s senior capstone so the students after me would get a real problem
                to solve. I taught calculus discussion sections for two years, because explaining a
                thing is the best way to find out whether you understand it.
              </p>
              <p>
                In my final semester I joined Heymarket as their first go-to-market engineer, and
                a month after graduation I joined Shiplight as the founding GTM hire. That is the
                role I have been training for without knowing it: one foot in customer conversations,
                one foot in the codebase, accountable for the number.
              </p>
              <p>
                Since 2018 I have also run a small vocational education initiative in Pundhra, a
                village in Gujarat, helping tenth-graders with limited access to guidance see what
                careers exist beyond the ones they can see from home. It is the project I have kept
                the longest.
              </p>
              <p>
                What I want next is to build a company. Not a specific one yet, but the kind that
                starts with an expensive, urgent problem and a founding team that can both sell and
                ship. Everything on this site is practice.
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
                San Francisco Bay, January 2025, the week I decided this was where I wanted to build.
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
                Silicon Valley Entrepreneurship Workshop, with the Technology Entrepreneur Center cohort.
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
              <h2 className="font-display text-3xl text-fg sm:text-4xl">Five strengths, in my words</h2>
              <p className="mt-5 text-pretty leading-relaxed text-muted">
                My CliftonStrengths profile, which turned out to be an accurate description of how I
                behave in a room where nothing is defined yet.
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
                  B.Sc. Industrial Engineering and B.Sc. Technology Entrepreneurship, Grainger College of
                  Engineering. GPA 3.94. Graduated May 2026.
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
            <h2 className="font-display text-3xl text-fg">What I read, trade, and argue about</h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted">
              Options strategies and commodity futures, which I studied formally and trade carefully.
              Macroeconomics, especially the shift toward state-led industrial strategy. Ray Dalio and
              anything on how systems fail. And I keep a running list of ideas and emerging
              technologies, on the advice of a founder I met in the Valley.
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
