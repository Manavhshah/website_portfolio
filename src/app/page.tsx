import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { site, siteUrl } from "@/content/site";
import { getAll } from "@/lib/content";
import WorkRow from "@/components/WorkRow";
import WritingRow from "@/components/WritingRow";
import Reveal from "@/components/Reveal";

export default function Home() {
  const work = getAll("work");
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Statement */}
      <section className="container-page pt-24 pb-24 sm:pt-36 sm:pb-32">
        <div className="max-w-3xl">
          <Image
            src="/images/headshot.jpg"
            alt="Manav Shah"
            width={56}
            height={56}
            priority
            className="mb-10 h-14 w-14 rounded-full object-cover object-top animate-fade-up"
          />
          <h1 className="font-display text-balance text-[2.4rem] leading-[1.12] text-fg animate-fade-up delay-1 sm:text-5xl lg:text-[3.4rem]">
            I&apos;m Manav Shah, an industrial engineer who builds the commercial side of
            early-stage startups. Sourcing, outbound, measurement, launches.
          </h1>
          <p className="mt-8 text-lg text-muted animate-fade-up delay-2 sm:text-xl">
            {site.role}. {site.location}.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm animate-fade-up delay-3">
            <Link href="/about" className="link-underline text-fg">
              About
            </Link>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-fg"
            >
              LinkedIn
            </a>
            <a
              href={site.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-fg"
            >
              Résumé
            </a>
            <a href={`mailto:${site.email}`} className="link-underline text-fg">
              Email
            </a>
          </div>
        </div>
      </section>

      {/* Work index */}
      <section className="container-page pb-24">
        <Reveal>
          <h2 className="mb-2 text-sm text-muted">Work</h2>
          <div className="border-b border-line">
            {work.map((entry) => (
              <WorkRow key={entry.slug} entry={entry} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* Writing */}
      <section className="container-page pb-24">
        <Reveal>
          <div className="mb-2 flex items-baseline justify-between">
            <h2 className="text-sm text-muted">Writing</h2>
            <Link
              href="/writing"
              className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
            >
              All writing
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
          <div className="border-b border-line">
            {writing.map((w) => (
              <WritingRow key={w.slug} entry={w} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* Contact line */}
      <section className="container-page pb-24">
        <Reveal>
          <p className="max-w-2xl font-display text-3xl leading-snug text-fg sm:text-4xl">
            Building something early?{" "}
            <a href={`mailto:${site.email}`} className="text-accent link-underline">
              Say hello.
            </a>
          </p>
        </Reveal>
      </section>
    </>
  );
}
