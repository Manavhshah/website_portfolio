"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-line bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-[1.35rem] tracking-tight text-fg"
          aria-label="Home"
        >
          {site.name}
          <span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                isActive(item.href)
                  ? "text-fg"
                  : "text-muted hover:text-fg",
              )}
            >
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-surface"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
              {item.label}
            </Link>
          ))}
          <a
            href={site.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
          >
            Résumé
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="relative block h-3 w-5">
            <span
              className={cn(
                "absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300",
                open && "translate-y-[6px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[6px] h-px w-5 bg-current transition-opacity duration-200",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[12px] h-px w-5 bg-current transition-transform duration-300",
                open && "-translate-y-[6px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="container-page fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-bg pt-6 md:hidden"
          >
            {site.nav.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.25 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "block border-b border-line py-5 font-display text-3xl",
                    isActive(item.href) ? "text-fg" : "text-muted",
                  )}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <a
              href={site.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center rounded-full border border-line-strong px-5 py-2.5 text-sm text-fg"
            >
              Download résumé
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
