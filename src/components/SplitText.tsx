"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Reveals a line of text word by word, each word rising out of a clipped box.
 * Pass `accent` to colour the trailing words.
 */
export default function SplitText({
  text,
  accentFrom,
  delay = 0,
  className,
}: {
  text: string;
  /** index of the first word to colour with the accent */
  accentFrom?: number;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className={
              accentFrom !== undefined && i >= accentFrom ? "inline-block text-accent" : "inline-block"
            }
            initial={reduce ? false : { y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: delay + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
