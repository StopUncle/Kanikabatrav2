"use client";

import { m, useReducedMotion } from "framer-motion";

/**
 * GoldDivider — a hairline of gold that draws outward from the centre as
 * it enters view. The connective tissue between acts on the homepage: it
 * signals "new section" without a heavy rule, and the draw-in keeps the
 * scroll feeling alive. Decorative, so it is hidden from assistive tech
 * and static under reduced motion.
 */
export default function GoldDivider({
  className = "",
  width = "max-w-xs",
}: {
  className?: string;
  width?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={`flex justify-center ${className}`} aria-hidden>
      <m.div
        className={`h-px w-full ${width} bg-gradient-to-r from-transparent via-warm-gold/45 to-transparent`}
        initial={reduce ? false : { scaleX: 0, opacity: 0 }}
        whileInView={reduce ? undefined : { scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
