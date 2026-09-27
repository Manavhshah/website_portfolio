/**
 * Single place for facts that appear across the site.
 * Edit here and every page updates.
 */
export const site = {
  name: "Manav Shah",
  fullName: "Manav Hitesh Shah",
  role: "Founding GTM Lead at Shiplight",
  tagline: "Engineer who builds the commercial machine.",
  description:
    "Industrial engineer turned founding go-to-market operator. Sourcing, outbound, measurement, and launches for early-stage startups.",
  location: "San Francisco Bay Area",
  email: "manav.shah0304@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/manav-hitesh-shah",
    github: "https://github.com/Manavhshah",
    x: "https://x.com/ManavhShah",
    calendar: "https://calendar.app.google/zdiDM4Z64SCFxFJb6",
    resume: "/documents/Manav_Shah_Resume.pdf",
  },
  nav: [
    { label: "Work", href: "/work" },
    { label: "Writing", href: "/writing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  /** Short status line shown on the home page. Keep it to one sentence. */
  now: "Leading go-to-market at Shiplight, an AI software-testing startup.",
} as const;

/**
 * Canonical site origin. Accepts NEXT_PUBLIC_SITE_URL with or without a
 * protocol, falls back to Vercel's deployment host, then localhost.
 * Never throws: an invalid value falls back rather than failing the build.
 */
export function siteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];
  for (const c of candidates) {
    if (!c) continue;
    const withProtocol = /^https?:\/\//.test(c) ? c : `https://${c}`;
    try {
      return new URL(withProtocol).origin;
    } catch {
      // ignore and try the next candidate
    }
  }
  return "http://localhost:3000";
}
