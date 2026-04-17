"use client";

import { m, AnimatePresence } from "framer-motion";

/**
 * Brief XP gain indicator that drifts up and fades. Rendered when a
 * choice is made. Color varies with quality:
 *   - gold  : optimal choice (+10 bonus)
 *   - white : neutral / mid-tier
 *   - red   : explicit non-optimal
 *
 * Tiny dopamine hit with zero gameplay cost.
 */
export default function XpFloater({
  show,
  xp,
  tone = "neutral",
}: {
  show: boolean;
  xp: number;
  tone?: "optimal" | "neutral" | "bad";
}) {
  const color =
    tone === "optimal"
      ? "text-accent-gold"
      : tone === "bad"
        ? "text-red-400"
        : "text-white";

  return (
    <AnimatePresence>
      {show && (
        <m.div
          key={show ? "show" : "hide"}
          initial={{ opacity: 0, y: 0, scale: 0.9 }}
          animate={{ opacity: [0, 1, 1, 0], y: -60, scale: 1.05 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut", times: [0, 0.15, 0.7, 1] }}
          className={`pointer-events-none fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[65] font-light tracking-wider text-2xl ${color}`}
          style={{ textShadow: "0 0 20px currentColor" }}
        >
          +{xp} XP
        </m.div>
      )}
    </AnimatePresence>
  );
}
