"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Reveal — the project's standard scroll-entrance.
 *
 * Children fade up with a whisper of scale the first time they enter the
 * viewport. Pass `index` to cascade siblings (each step adds 80ms). The
 * whole effect collapses to a plain wrapper when the visitor prefers
 * reduced motion, so accessibility is free.
 *
 * One primitive, used everywhere, so every section breathes in with the
 * same rhythm instead of each component inventing its own.
 */
type Tag = "div" | "section" | "li" | "span" | "article";

const TAGS = {
  div: m.div,
  section: m.section,
  li: m.li,
  span: m.span,
  article: m.article,
} as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger position among siblings. Each step adds 80ms of delay. */
  index?: number;
  /** Extra delay (seconds) on top of the index stagger. */
  delay?: number;
  /** Vertical travel in px. Default 24. */
  y?: number;
  /** Skip the subtle scale (use for full-bleed blocks). */
  noScale?: boolean;
  as?: Tag;
}

export default function Reveal({
  children,
  className,
  index = 0,
  delay = 0,
  y = 24,
  noScale = false,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Motion = TAGS[as];

  if (reduce) {
    return <Motion className={className}>{children}</Motion>;
  }

  return (
    <Motion
      className={className}
      initial={{ opacity: 0, y, scale: noScale ? 1 : 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08 + delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Motion>
  );
}
