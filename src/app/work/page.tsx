import type { Metadata } from "next";
import { getAll, getAllTags } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import WorkCard from "@/components/WorkCard";
import TagFilter from "@/components/TagFilter";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from Shiplight, Heymarket, Innovo Markets, Mag Mile Capital, Integrow, and Alligator AI. Go-to-market systems, growth engineering, and the occasional financial model.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const entries = getAll("work");
  const tags = getAllTags("work");

  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Work"
        intro="Seven things I owned. Every number has a boundary."
      />
      <section className="container-page pb-16">
        <TagFilter
          tags={tags}
          items={entries.map((e) => ({
            key: e.slug,
            tags: e.frontmatter.tags,
            node: <WorkCard entry={e} className="h-full" />,
          }))}
        />
      </section>
    </>
  );
}
