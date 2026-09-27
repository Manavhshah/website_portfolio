"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin accent bar under the header that fills as the reader scrolls. */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-16 z-50 h-px origin-left bg-accent"
    />
  );
}
