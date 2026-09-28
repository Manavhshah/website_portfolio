import type { Metadata } from "next";
import { getAll } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import WorkIndex from "@/components/WorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from Shiplight, Heymarket, Innovo Markets, Mag Mile Capital, Integrow, and Alligator AI.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const entries = getAll("work").map((e) => ({ slug: e.slug, frontmatter: e.frontmatter }));
  return (
    <>
      <PageHeader title="Work" intro="Seven things I owned. Every number has a boundary." />
      <section className="container-page pb-24">
        <WorkIndex items={entries} />
      </section>
    </>
  );
}
