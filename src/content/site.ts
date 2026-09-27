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
    "Manav Shah is an industrial engineer turned founding go-to-market operator. He builds the systems that turn a product into a business: sourcing, outreach, measurement, content, and launches.",
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
  now: "Leading go-to-market at Shiplight, an AI software-testing startup, and building the growth systems behind its self-serve launch.",
} as const;

export function siteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");
  return raw.replace(/\/$/, "");
}
