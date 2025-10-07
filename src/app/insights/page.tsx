import { getAllInsightsList, getAllInsightTags } from "@/lib/content";
import InsightsPageClient from "@/components/InsightsPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
  description: "Thoughts, learnings, and observations on technology, business, and the intersection of both.",
  openGraph: {
    title: "Insights | Manav Shah",
    description: "Thoughts, learnings, and observations on technology, business, and the intersection of both.",
    url: "/insights",
  },
  twitter: {
    title: "Insights | Manav Shah",
    description: "Thoughts, learnings, and observations on technology, business, and the intersection of both.",
  },
};

export default function InsightsPage() {
  const insights = getAllInsightsList();
  const allTags = getAllInsightTags();

  return <InsightsPageClient insights={insights} allTags={allTags} />;
}