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
  { title: "Find the right people", body: "Sourcing from behavior, not titles." },
  { title: "Start conversations", body: "Outbound people actually answer." },
  { title: "Make growth measurable", body: "Funnels the founders can trust." },
  { title: "Ship the fix myself", body: "Python, SQL, React, coding agents." },
  { title: "Run the launch", body: "Video, demos, partners, launch day." },
  { title: "Model the decision", body: "Underwriting, pricing, forecasting." },
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
      <section className="relative">
        <div className="bg-glow" aria-hidden />
        <div className="container-page pt-16 pb-16 sm:pt-28 sm:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <p className="eyebrow mb-5 animate-fade-up">
              {site.role} · {site.location}
            </p>
            <h1 className="font-display text-balance text-[2.9rem] leading-[1.02] text-fg animate-fade-up delay-1 sm:text-6xl lg:text-7xl">
              Engineer who builds the{" "}
              <em className="text-accent">commercial machine.</em>
            </h1>
            <p className="mt-7 max-w-md text-pretty text-lg leading-relaxed text-muted animate-fade-up delay-2 sm:text-xl">
              Sourcing, outbound, measurement, launches. The systems that turn an early
              product into a business.
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
            <div className="photo-frame aspect-[4/5]">
              <Image
                src="/images/headshot.jpg"
                alt="Manav Shah"
                fill
                priority
                sizes="(min-width: 1024px) 28rem, 24rem"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted">
              <span className="eyebrow mr-2 text-accent">Now</span>
              {site.now}
            </p>
          </div>
        </div>

        {/* Credential strip */}
        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6 animate-fade-up delay-4 sm:mt-20">
          <span className="eyebrow">Built with</span>
          {["Shiplight", "Heymarket", "Innovo Markets", "Mag Mile Capital", "Integrow", "UIUC Grainger"].map((name) => (
            <span key={name} className="font-display text-lg text-fg-soft sm:text-xl">
              {name}
            </span>
          ))}
        </div>
        </div>
      </section>

      {/* Featured work */}
      <section className="container-page py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Work"
            title="Selected work"
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
            <SectionHeading eyebrow="What I do" title="Go-to-market, end to end" />
          </Reveal>
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.05} className="border-t border-line pt-5">
                <p className="eyebrow text-accent">0{i + 1}</p>
                <h3 className="mt-3 text-lg font-medium text-fg">{c.title}</h3>
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
                Two degrees, three finance roles, two startups, one company of my own.
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
                Building something early? Let&apos;s talk.
              </h2>
              <p className="mt-6 text-pretty text-lg text-muted">
                Email is best. Thirty minutes on my calendar works too.
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
