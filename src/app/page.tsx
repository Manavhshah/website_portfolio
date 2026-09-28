import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site, siteUrl } from "@/content/site";
import { getAll } from "@/lib/content";
import WritingRow from "@/components/WritingRow";
import WorkIndex from "@/components/WorkIndex";
import HeroCards from "@/components/HeroCards";
import SplitText from "@/components/SplitText";
import LocalClock from "@/components/LocalClock";
import Reveal from "@/components/Reveal";
import PitchSlider from "@/components/PitchSlider";

export default function Home() {
  const work = getAll("work").map((e) => ({ slug: e.slug, frontmatter: e.frontmatter }));
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

      {/* Hero: statement with cards you can throw around */}
      <section className="container-page overflow-hidden">
        <HeroCards>
          <p className="mb-6 text-sm text-muted animate-fade-up">
            Manav Shah · {site.location} · <LocalClock />
          </p>
          <h1 className="font-display text-balance text-[2.6rem] leading-[1.06] text-fg sm:text-6xl lg:text-[4.2rem]">
            <SplitText text="Engineer who builds the commercial machine." accentFrom={4} delay={0.15} />
          </h1>
          <p className="mx-auto mt-7 max-w-md text-pretty text-lg text-muted animate-fade-up delay-3 sm:text-xl">
            Sourcing, outbound, measurement, launches. The systems that turn an early product
            into a business.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm animate-fade-up delay-4">
            <Link href="/about" className="link-underline text-fg">
              About
            </Link>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline text-fg">
              LinkedIn
            </a>
            <a href={site.links.resume} target="_blank" rel="noopener noreferrer" className="link-underline text-fg">
              Résumé
            </a>
            <a href={`mailto:${site.email}`} className="link-underline text-fg">
              Email
            </a>
          </div>
        </HeroCards>
        <p className="pb-4 text-center text-xs text-faint lg:hidden">Drag the cards.</p>
      </section>

      {/* The pitch, at whatever volume you like */}
      <section className="container-page pt-12 pb-24">
        <Reveal>
          <h2 className="mb-6 text-sm text-muted">The pitch. You pick the volume.</h2>
          <PitchSlider />
        </Reveal>
      </section>

      {/* Work index */}
      <section className="container-page pb-24">
        <Reveal>
          <h2 className="mb-2 text-sm text-muted">Work</h2>
          <WorkIndex items={work} />
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
            <a href={`mailto:${site.email}`} className="link-underline text-accent">
              Say hello.
            </a>
          </p>
        </Reveal>
      </section>
    </>
  );
}
