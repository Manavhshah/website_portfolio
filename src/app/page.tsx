import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site, siteUrl } from "@/content/site";
import { getAll, getFeaturedWork } from "@/lib/content";
import WorkCard from "@/components/WorkCard";
import WritingRow from "@/components/WritingRow";
import SectionHeading from "@/components/SectionHeading";
import Timeline from "@/components/Timeline";
import Reveal from "@/components/Reveal";

const capabilities = [
  {
    title: "Find the right people",
    body: "Signal-based sourcing from public behavior, enrichment, and qualification. Lists that refresh themselves instead of decaying.",
  },
  {
    title: "Start conversations that get answered",
    body: "Persona-specific outbound, reply handling in the founder's voice, and playbooks the next hire can pick up.",
  },
  {
    title: "Make growth measurable",
    body: "Funnel instrumentation across GA4, PostHog, and Search Console, with definitions the team can defend.",
  },
  {
    title: "Ship the fix myself",
    body: "Python, SQL, React, and coding agents. When the funnel is broken in the codebase, I open the pull request.",
  },
  {
    title: "Run the launch",
    body: "Positioning, demos, video, partner coordination, and launch-day communications, on a deadline.",
  },
  {
    title: "Model the decision",
    body: "Underwriting models, pricing simulations, and forecasting frameworks from an engineering education and three finance roles.",
  },
];

export default function Home() {
  const featured = getFeaturedWork(3);
  const writing = getAll("writing").slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.fullName,
    alternateName: site.name,
    jobTitle: site.role,
    description: site.description,
    url: siteUrl(),
    image: `${siteUrl()}/images/headshot.jpg`,
    email: `mailto:${site.email}`,
    sameAs: [site.links.linkedin, site.links.github, site.links.x],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Illinois Urbana-Champaign",
    },
    worksFor: { "@type": "Organization", name: "Shiplight" },
    knowsAbout: [
      "Go-to-market strategy",
      "Growth engineering",
      "Outbound sales",
      "Product analytics",
      "Industrial engineering",
      "Financial modeling",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="container-page pt-16 pb-20 sm:pt-28 sm:pb-28">
        <div className="grid items-end gap-12 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <p className="eyebrow mb-5 animate-fade-up">
              {site.role} · {site.location}
            </p>
            <h1 className="font-display text-balance text-[2.9rem] leading-[1.02] text-fg animate-fade-up delay-1 sm:text-6xl lg:text-7xl">
              Engineer who builds the{" "}
              <em className="text-accent">commercial machine.</em>
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted animate-fade-up delay-2 sm:text-xl">
              I take a product with early customers and build the systems that turn it
              into a business: sourcing, outbound, measurement, content, and launches.
              Industrial engineer by training, founding go-to-market operator by choice.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3 animate-fade-up delay-3">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent"
              >
                See the work
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
              >
                About me
              </Link>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline ml-1 inline-flex items-center gap-1 text-sm text-muted hover:text-fg"
              >
                LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm animate-fade-up delay-2 lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-surface">
              <Image
                src="/images/headshot.jpg"
                alt="Manav Shah"
                fill
                priority
                sizes="(min-width: 1024px) 28rem, 24rem"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-faint">{site.now}</p>
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section className="container-page py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Three things I am proud of"
            link={{ href: "/work", label: "All work" }}
          />
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-3">
          {featured.map((entry, i) => (
            <Reveal key={entry.slug} delay={i * 0.08} className="h-full">
              <WorkCard entry={entry} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="hairline">
        <div className="container-page py-16 sm:py-20">
          <Reveal>
            <SectionHeading eyebrow="What I do" title="The parts of go-to-market I can own end to end" />
          </Reveal>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.05}>
                <h3 className="text-lg font-medium text-fg">{c.title}</h3>
                <p className="mt-2 text-pretty text-[0.95rem] leading-relaxed text-muted">{c.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Timeline */}
      <section className="hairline">
        <div className="container-page py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
            <Reveal>
              <p className="eyebrow mb-3">The path so far</p>
              <h2 className="font-display text-3xl text-fg sm:text-4xl">
                From Mumbai to Grainger to the Bay
              </h2>
              <p className="mt-5 text-pretty leading-relaxed text-muted">
                A double degree in industrial engineering and technology entrepreneurship,
                three finance and fintech roles, two startups as an early go-to-market hire,
                and one company of my own. Each stop added a tool.
              </p>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-fg-soft transition-colors hover:text-accent"
              >
                The longer story
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <Timeline limit={5} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Writing */}
      <section className="hairline">
        <div className="container-page py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Writing"
              title="Notes from the work"
              link={{ href: "/writing", label: "All writing" }}
            />
          </Reveal>
          <Reveal>
            <div className="border-b border-line">
              {writing.map((w) => (
                <WritingRow key={w.slug} entry={w} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="hairline">
        <div className="container-page py-20 sm:py-28">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow mb-4">Get in touch</p>
              <h2 className="font-display text-balance text-4xl text-fg sm:text-5xl">
                Building something early and need the commercial side to move as fast as the product?
              </h2>
              <p className="mt-6 text-pretty text-lg text-muted">
                I am always happy to talk about go-to-market, founding roles, or an idea you are
                turning over. Email is best. Thirty minutes on my calendar works too.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent"
                >
                  {site.email}
                </a>
                <a
                  href={site.links.calendar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  Book 30 minutes
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
