import type { Metadata } from "next";
import { getAll } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import WritingRow from "@/components/WritingRow";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Short essays on go-to-market, growth measurement, founders, and what I am learning by building.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  const entries = getAll("writing");
  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Writing"
        intro="Short notes, written after doing the thing."
      />
      <section className="container-page pb-16">
        <div className="border-b border-line">
          {entries.map((e) => (
            <WritingRow key={e.slug} entry={e} />
          ))}
        </div>
      </section>
    </>
  );
}
