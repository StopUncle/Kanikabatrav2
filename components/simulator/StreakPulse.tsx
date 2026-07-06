"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * Momentary celebratory pulse fired the instant the player lands their
 * 3rd, 5th, or 7th consecutive optimal choice in a single run. Distinct
 * from StreakIndicator, which is the persistent "Streak ×N" badge: this
 * is a brief flourish that makes the milestone feel alive in the moment,
 * then clears itself within ~1.5s. Lighter than ImmersionOverlay (no
 * full-screen effect); a small gold glow plus a caption near the top.
 *
 * Copy escalates in tone, not in visual intensity, at each milestone.
 */

const MILESTONE_COPY: Record<number, string> = {
  3: "3 in a row",
  5: "5 in a row",
  7: "Cold precision",
};

const VISIBLE_MS = 1500;

export type StreakMilestone = { value: number; id: number };

export default function StreakPulse({
  milestone,
}: {
  milestone: StreakMilestone | null;
}) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<StreakMilestone | null>(null);

  useEffect(() => {
    if (!milestone) return;
    setActive(milestone);
    const timer = setTimeout(() => setActive(null), VISIBLE_MS);
    return () => clearTimeout(timer);
  }, [milestone]);

  const copy = active ? MILESTONE_COPY[active.value] : null;

  return (
    <AnimatePresence>
      {active && copy && (
        <m.div
          key={active.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: reduceMotion ? 1 : [0, 1, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={
            reduceMotion
              ? { duration: 0.2 }
              : { duration: 1.4, ease: "easeOut", times: [0, 0.15, 0.65, 1] }
          }
          className="pointer-events-none fixed top-[140px] sm:top-[152px] left-1/2 -translate-x-1/2 z-[66] flex items-center justify-center"
        >
          {!reduceMotion && (
            <m.span
              aria-hidden
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.5, 0], scale: [0.6, 1.3, 1.5] }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute -inset-x-16 -inset-y-10 rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(212,175,55,0.35) 0%, transparent 70%)",
              }}
            />
          )}
          <m.span
            initial={{ scale: reduceMotion ? 1 : 0.9 }}
            animate={{ scale: reduceMotion ? 1 : [0.9, 1.05, 1] }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative whitespace-nowrap text-accent-gold text-sm sm:text-base uppercase tracking-[0.4em] font-light"
            style={{ textShadow: "0 0 18px rgba(212,175,55,0.6)" }}
          >
            {copy}
          </m.span>
        </m.div>
      )}
    </AnimatePresence>
  );
}
