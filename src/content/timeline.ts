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
    note: "First go-to-market hire at an AI software-testing startup. Outbound, partnerships, launch, and the growth infrastructure behind them.",
    href: "/work/shiplight",
    kind: "work",
  },
  {
    period: "2026",
    title: "Founder",
    org: "Alligator AI",
    note: "AI relationship-memory system. Built and validated through UIUC's Cozad New Venture Challenge. Currently paused.",
    href: "/work/alligator",
    kind: "venture",
  },
  {
    period: "May 2026",
    title: "B.Sc. Industrial Engineering & B.Sc. Technology Entrepreneurship",
    org: "University of Illinois Urbana-Champaign",
    note: "Double degree, 3.94 GPA. James Scholar, Tau Beta Pi, Outstanding Junior and Senior Awards in the ISE department.",
    kind: "education",
  },
  {
    period: "Dec 2025 — May 2026",
    title: "Go-To-Market Engineer",
    org: "Heymarket",
    note: "First GTM engineering hire. Built outbound infrastructure in Clay and Outreach, lead scoring, and messaging experiments.",
    href: "/work/heymarket",
    kind: "work",
  },
  {
    period: "May 2025 — Dec 2025",
    title: "Business Development",
    org: "Innovo Markets",
    note: "CRM and prospecting systems for an energy-commodities fintech. Brought the company into UIUC's senior capstone program.",
    href: "/work/innovo",
    kind: "work",
  },
  {
    period: "Summer 2024",
    title: "Summer Analyst",
    org: "Mag Mile Capital",
    note: "Underwriting support across $70M+ in hospitality and multifamily deals. Coordinated an AI underwriting software pilot.",
    href: "/work/mag-mile",
    kind: "work",
  },
  {
    period: "Summer 2023",
    title: "Business Development Intern",
    org: "Integrow Asset Management",
    note: "Product thesis and go-to-market for India's first real-estate portfolio management service.",
    href: "/work/integrow",
    kind: "work",
  },
  {
    period: "2022",
    title: "Left Mumbai for Illinois",
    org: "Dhirubhai Ambani International School",
    note: "IB diploma. Moved to the United States to study engineering at Grainger.",
    kind: "education",
  },
];
