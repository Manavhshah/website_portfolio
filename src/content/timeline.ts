/**
 * Career and education timeline, newest first.
 * `href` is optional and links to a case study under /work.
 */
export interface TimelineEntry {
  period: string;
  title: string;
  org: string;
  note: string;
  href?: string;
  kind: "work" | "education" | "venture";
}

export const timeline: TimelineEntry[] = [
  {
    period: "Jun 2026 — Present",
    title: "Founding GTM Lead",
    org: "Shiplight",
    note: "First go-to-market hire at an AI testing startup.",
    href: "/work/shiplight",
    kind: "work",
  },
  {
    period: "2026",
    title: "Founder",
    org: "Alligator AI",
    note: "Relationship memory, built through Cozad. Paused.",
    href: "/work/alligator",
    kind: "venture",
  },
  {
    period: "May 2026",
    title: "B.Sc. Industrial Engineering + B.Sc. Technology Entrepreneurship",
    org: "UIUC",
    note: "3.94 GPA. James Scholar, Tau Beta Pi, ISE Outstanding Junior and Senior.",
    kind: "education",
  },
  {
    period: "Dec 2025 — May 2026",
    title: "Go-To-Market Engineer",
    org: "Heymarket",
    note: "First GTM engineering hire. Clay, Outreach, lead scoring.",
    href: "/work/heymarket",
    kind: "work",
  },
  {
    period: "May — Dec 2025",
    title: "Business Development",
    org: "Innovo Markets",
    note: "CRM systems for an energy fintech. Created a UIUC capstone sponsorship.",
    href: "/work/innovo",
    kind: "work",
  },
  {
    period: "Summer 2024",
    title: "Summer Analyst",
    org: "Mag Mile Capital",
    note: "$70M+ in CRE underwriting. AI underwriting pilot.",
    href: "/work/mag-mile",
    kind: "work",
  },
  {
    period: "Summer 2023",
    title: "Business Development Intern",
    org: "Integrow",
    note: "Thesis for India's first real-estate PMS.",
    href: "/work/integrow",
    kind: "work",
  },
  {
    period: "2022",
    title: "Mumbai to Illinois",
    org: "Dhirubhai Ambani International School",
    note: "IB diploma, then Grainger Engineering.",
    kind: "education",
  },
];
