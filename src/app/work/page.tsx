import type { Metadata } from "next";
import { getAll } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import WorkRow from "@/components/WorkRow";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from Shiplight, Heymarket, Innovo Markets, Mag Mile Capital, Integrow, and Alligator AI.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const entries = getAll("work");
  return (
    <>
      <PageHeader title="Work" intro="Seven things I owned. Every number has a boundary." />
      <section className="container-page pb-24">
        <div className="border-b border-line">
          {entries.map((e) => (
            <WorkRow key={e.slug} entry={e} />
          ))}
        </div>
      </section>
    </>
  );
}
