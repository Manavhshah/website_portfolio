"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";

/**
 * A bio that rewrites itself as you drag from "less hard sell" to "more hard
 * sell". Same facts at every level; only the volume changes.
 */

const levels: { label: string; cta: string; body: string }[] = [
  {
    label: "Understated",
    cta: "Say hi if you like",
    body:
      "Manav Shah. Industrial engineer. Works on go-to-market at an early-stage startup in San Francisco. Grew up in Mumbai, studied at Illinois. Happy to chat.",
  },
  {
    label: "Honest",
    cta: "Email me",
    body:
      "I'm Manav, an industrial engineer who ended up building the commercial side of startups. At Shiplight I run outbound, measurement, and launches. Before that: first GTM engineer at Heymarket, an energy fintech, and a summer underwriting real estate in Chicago.",
  },
  {
    label: "Confident",
    cta: "Let's talk",
    body:
      "I build the systems that turn early products into businesses: sourcing, outbound, funnel measurement, launches. Founding GTM at Shiplight, first GTM engineer at Heymarket, two engineering degrees from Illinois. When the funnel is broken in the codebase, I open the pull request myself.",
  },
  {
    label: "Assertive",
    cta: "Get in touch today",
    body:
      "Manav Shah is the rare go-to-market hire who ships the code. Fifty-four merged pull requests, a 35% reply rate on cold outbound, a startup's referring domains more than tripled, a funnel rebuilt from the event definitions up. Founding GTM at Shiplight. Illinois engineer, 3.94 GPA. If you're building something early, you want him in the room.",
  },
  {
    label: "Full send",
    cta: "EMAIL HIM RIGHT NOW",
    body:
      "You are looking at the commercial machine. Manav Shah pulled 4,553 developer profiles out of raw GitHub behavior, got a third of strangers to reply, tripled a company's referring domains in one summer, shipped 54 pull requests, and fixed the funnel your analytics vendor lied to you about. Two degrees. One founder in progress. Stop scrolling.",
  },
];

export default function PitchSlider() {
  const [level, setLevel] = useState(2);
  const reduce = useReducedMotion();
  const current = levels[level];

  return (
    <div>
      <div className="min-h-[11rem] sm:min-h-[9rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={level}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="max-w-3xl text-pretty text-xl leading-relaxed text-fg sm:text-2xl"
            style={{ fontWeight: 400 + level * 25 }}
          >
            {current.body}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-10 max-w-3xl">
        <label htmlFor="pitch" className="sr-only">
          How hard should the pitch be?
        </label>
        <input
          id="pitch"
          type="range"
          min={0}
          max={levels.length - 1}
          step={1}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          className="pitch-range w-full"
          aria-valuetext={current.label}
        />
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="font-display italic text-muted">Less hard sell</span>
          <span className="text-xs text-faint">{current.label}</span>
          <span className="font-display italic text-muted">More hard sell</span>
        </div>
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.a
            key={level}
            href={`mailto:${site.email}`}
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm transition-colors"
            style={{
              background: level >= 3 ? "var(--color-accent)" : level >= 1 ? "var(--color-fg)" : "transparent",
              color: level >= 3 ? "var(--color-accent-fg)" : level >= 1 ? "var(--color-bg)" : "var(--color-fg)",
              border: level === 0 ? "1px solid var(--color-line-strong)" : "1px solid transparent",
              letterSpacing: level === 4 ? "0.04em" : undefined,
            }}
          >
            {current.cta}
          </motion.a>
        </AnimatePresence>
      </div>
    </div>
  );
}
