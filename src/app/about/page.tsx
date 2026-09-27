import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import Timeline from "@/components/Timeline";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Manav Shah grew up in Mumbai, studied industrial engineering and technology entrepreneurship at Illinois, and builds go-to-market systems for early-stage startups in the Bay Area.",
  alternates: { canonical: "/about" },
};

const capabilities = [
  { title: "Find the right people", body: "Sourcing from behavior, not titles." },
  { title: "Start conversations", body: "Outbound people actually answer." },
  { title: "Make growth measurable", body: "Funnels the founders can trust." },
  { title: "Ship the fix myself", body: "Python, SQL, React, coding agents." },
  { title: "Run the launch", body: "Video, demos, partners, launch day." },
  { title: "Model the decision", body: "Underwriting, pricing, forecasting." },
];

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

function Section({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="container-page grid gap-8 border-t border-line py-14 sm:py-16 lg:grid-cols-[12rem_1fr]">
        <h2 className="text-sm text-muted">{label}</h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            I like finding the pattern, simplifying it, and turning it into something that{" "}
            <em className="text-accent">scales.</em>
          </>
        }
        intro="Mumbai-born. Illinois-trained. Bay Area-based."
      />

      <Section label="Story">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
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
              <p>Next, I want to build a company. Everything on this site is practice.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="space-y-4">
            <figure>
              <Image
                src="/images/sf-bay.jpg"
                alt="Manav on the San Francisco Bay with the city skyline behind him"
                width={2000}
                height={1334}
                sizes="(min-width: 1024px) 24rem, 100vw"
                className="aspect-[3/2] w-full rounded-md object-cover"
              />
              <figcaption className="mt-2 text-xs text-faint">San Francisco Bay, January 2025.</figcaption>
            </figure>
            <figure>
              <Image
                src="/images/sv-workshop.jpg"
                alt="Manav laughing with classmates at the Silicon Valley Entrepreneurship Workshop"
                width={2000}
                height={1334}
                sizes="(min-width: 1024px) 24rem, 100vw"
                className="aspect-[3/2] w-full rounded-md object-cover"
              />
              <figcaption className="mt-2 text-xs text-faint">
                Silicon Valley Entrepreneurship Workshop cohort.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      <Section label="What I do">
        <Reveal>
          <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {capabilities.map((c) => (
              <li key={c.title}>
                <p className="text-fg">{c.title}</p>
                <p className="mt-1 text-[0.95rem] text-muted">{c.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section label="Timeline">
        <Reveal className="max-w-2xl">
          <Timeline />
        </Reveal>
      </Section>

      <Section label="Strengths">
        <Reveal>
          <dl className="max-w-2xl divide-y divide-line border-y border-line">
            {strengths.map((s) => (
              <div key={s.name} className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="text-fg">{s.name}</dt>
                <dd className="text-[0.95rem] text-muted">{s.how}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-faint">CliftonStrengths, in my words.</p>
        </Reveal>
      </Section>

      <Section label="Illinois">
        <Reveal>
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="text-fg">Beyond the classroom</p>
              <ul className="mt-3 space-y-2 text-[0.95rem] text-muted">
                {campus.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-fg">Honors</p>
              <ul className="mt-3 space-y-2 text-[0.95rem] text-muted">
                {honors.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <p className="mt-6 text-fg">Education</p>
              <p className="mt-3 text-[0.95rem] text-muted">
                University of Illinois Urbana-Champaign. B.Sc. Industrial Engineering + B.Sc.
                Technology Entrepreneurship. 3.94. May 2026.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section label="Off hours">
        <Reveal>
          <p className="max-w-2xl text-[0.95rem] text-muted">
            Options and commodity futures. Macroeconomics. Ray Dalio. A running list of ideas.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a
              href={site.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-fg"
            >
              Résumé
            </a>
            <Link href="/contact" className="link-underline text-fg">
              Contact
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
