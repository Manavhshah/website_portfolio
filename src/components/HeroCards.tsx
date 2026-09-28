"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Photo and note cards scattered around the hero. Each card flies in, floats
 * gently, and can be picked up and thrown. Positions are percentages of the
 * hero container so the layout scales; on small screens the cards collapse
 * into an overlapping pile under the statement.
 */

type Card =
  | { kind: "photo"; src: string; alt: string; caption?: string; w: number; h: number }
  | { kind: "note"; body: ReactNode; tone?: "paper" | "ink" | "accent" };

interface Placed {
  card: Card;
  /** desktop position, percent of container */
  x: number;
  y: number;
  rotate: number;
  /** css width on desktop */
  width: number;
  /** pile offset on mobile */
  mx: number;
  my: number;
  mr: number;
}

const cards: Placed[] = [
  {
    card: { kind: "photo", src: "/images/golden-gate.jpg", alt: "With friends in front of the Golden Gate Bridge", caption: "Golden Gate, Jan 2025", w: 1400, h: 933 },
    x: 2, y: 6, rotate: -7, width: 240, mx: -85, my: 0, mr: -6,
  },
  {
    card: { kind: "photo", src: "/images/headshot.jpg", alt: "Manav Shah", caption: "Me", w: 1120, h: 1400 },
    x: 78, y: 4, rotate: 6, width: 170, mx: 75, my: 20, mr: 6,
  },
  {
    card: { kind: "note", tone: "ink", body: (
      <>
        <span className="block text-[0.7rem] uppercase tracking-wider opacity-60">Now</span>
        <span className="mt-1 block leading-snug">Founding GTM at Shiplight, an AI testing startup.</span>
      </>
    ) },
    x: 4, y: 64, rotate: 4, width: 210, mx: -80, my: 180, mr: 4,
  },
  {
    card: { kind: "photo", src: "/images/stairs.jpg", alt: "Being carried up a staircase by a friend during the Silicon Valley workshop", caption: "Silicon Valley workshop", w: 933, h: 1400 },
    x: 82, y: 52, rotate: -5, width: 150, mx: 90, my: 190, mr: -5,
  },
  {
    card: { kind: "note", tone: "accent", body: (
      <>
        <span className="block font-display text-3xl leading-none">35%</span>
        <span className="mt-1 block text-[0.8rem] leading-snug opacity-80">reply rate across ~400 outbound conversations</span>
      </>
    ) },
    x: 22, y: 84, rotate: -3, width: 180, mx: -60, my: 330, mr: -3,
  },
  {
    card: { kind: "note", tone: "paper", body: (
      <span className="block leading-snug">Mumbai → Urbana‑Champaign → San Francisco</span>
    ) },
    x: 62, y: 86, rotate: 3, width: 220, mx: 70, my: 360, mr: 3,
  },
];

export default function HeroCards({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Statement sits in the middle; cards are absolutely placed around it on desktop */}
      <div className="relative z-10 mx-auto max-w-2xl py-20 text-center sm:py-28 lg:py-40">
        {children}
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-0 hidden lg:block",
        )}
        aria-hidden
      >
        {desktop &&
          cards.map((p, i) => (
            <motion.div
              key={i}
              drag
              dragConstraints={ref}
              dragElastic={0.18}
              dragMomentum
              whileHover={{ scale: 1.04, rotate: 0, zIndex: 20 }}
              whileDrag={{ scale: 1.06, rotate: 0, zIndex: 30, cursor: "grabbing" }}
              initial={reduce ? false : { opacity: 0, scale: 0.6, x: "-50%", y: "-50%", rotate: 0 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: p.rotate }}
              transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.25 + i * 0.09 }}
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.width }}
              className="pointer-events-auto absolute cursor-grab select-none"
            >
              <Floating index={i} disabled={!!reduce}>
                <CardView card={p.card} />
              </Floating>
            </motion.div>
          ))}
      </div>

      {/* Mobile and tablet: an overlapping pile under the statement */}
      <div className="relative mx-auto h-[520px] w-full max-w-md lg:hidden" aria-hidden>
        {cards.map((p, i) => (
          <motion.div
            key={i}
            drag
            dragConstraints={ref}
            dragElastic={0.2}
            whileTap={{ scale: 1.04, zIndex: 30 }}
            initial={reduce ? false : { opacity: 0, y: 30, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: p.mr }}
            transition={{ type: "spring", stiffness: 140, damping: 18, delay: 0.2 + i * 0.07 }}
            style={{ left: `calc(50% + ${p.mx}px)`, top: p.my, width: p.card.kind === 'photo' ? Math.min(p.width, 160) : Math.min(p.width, 180), translateX: "-50%" }}
            className="absolute cursor-grab select-none"
          >
            <CardView card={p.card} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/** Gentle idle bob so the cards feel alive. */
function Floating({ children, index, disabled }: { children: ReactNode; index: number; disabled: boolean }) {
  if (disabled) return <>{children}</>;
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
    >
      {children}
    </motion.div>
  );
}

function CardView({ card }: { card: Card }) {
  if (card.kind === "photo") {
    return (
      <figure className="rounded-md border border-line bg-white p-2 shadow-[0_14px_40px_-16px_rgba(0,0,0,0.35)]">
        <Image
          src={card.src}
          alt={card.alt}
          width={card.w}
          height={card.h}
          sizes="260px"
          draggable={false}
          className="block w-full rounded-[3px] object-cover"
        />
        {card.caption && (
          <figcaption className="px-1 pt-2 pb-0.5 font-display text-sm text-fg-soft">{card.caption}</figcaption>
        )}
      </figure>
    );
  }
  const tone = card.tone ?? "paper";
  return (
    <div
      className={cn(
        "rounded-md border p-4 text-sm shadow-[0_14px_40px_-18px_rgba(0,0,0,0.35)]",
        tone === "paper" && "border-line bg-white text-fg",
        tone === "ink" && "border-transparent bg-fg text-bg",
        tone === "accent" && "border-transparent bg-accent text-accent-fg",
      )}
    >
      {card.body}
    </div>
  );
}
