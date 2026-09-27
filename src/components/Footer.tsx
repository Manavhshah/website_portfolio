import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();
  const external = [
    { label: "LinkedIn", href: site.links.linkedin },
    { label: "GitHub", href: site.links.github },
    { label: "X", href: site.links.x },
    { label: "Résumé", href: site.links.resume },
    { label: "Email", href: `mailto:${site.email}` },
  ];

  return (
    <footer className="hairline mt-24">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl text-fg">
              {site.name}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              {site.tagline} Based in the {site.location}. Open to conversations
              about early go-to-market, founding roles, and things worth building.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Pages</p>
            <ul className="space-y-2.5">
              {[{ label: "Home", href: "/" }, ...site.nav].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-sm text-fg-soft hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Elsewhere</p>
            <ul className="space-y-2.5">
              {external.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-1 text-sm text-fg-soft hover:text-fg"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3.5 w-3.5 text-faint" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.fullName}</p>
          <p>Built with Next.js and MDX. Content is mine, unless I say otherwise.</p>
        </div>
      </div>
    </footer>
  );
}
