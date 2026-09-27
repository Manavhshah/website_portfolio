import { site } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();
  const links = [
    { label: "Email", href: `mailto:${site.email}` },
    { label: "LinkedIn", href: site.links.linkedin },
    { label: "GitHub", href: site.links.github },
    { label: "X", href: site.links.x },
    { label: "Résumé", href: site.links.resume },
  ];

  return (
    <footer className="mt-12 border-t border-line">
      <div className="container-page flex flex-col gap-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-faint">
          © {year} {site.fullName}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="link-underline text-muted hover:text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
