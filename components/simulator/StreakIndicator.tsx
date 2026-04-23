"use client";

import { m, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";

/**
 * Briefly displays "STREAK ×N" when the player makes 3+ optimal choices
 * in a row. Hides on reset (any non-optimal choice).
 *
 * Positioned top-right under the scenario label.
 */
export default function StreakIndicator({ streak }: { streak: number }) {
  // Only show when a bonus is active (first streak bonus is at 3 optimal
  // in a row — see SimulatorRunner's pickChoice). Showing at streak=2
  // was a false-positive: the badge appeared while no XP bonus was yet
  // being awarded.
  const show = streak >= 3;

  return (
    <AnimatePresence>
      {show && (
        <m.div
          key={streak}
          initial={{ opacity: 0, scale: 0.8, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed top-[96px] sm:top-[108px] right-4 sm:right-8 z-[65] pointer-events-none"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-deep-black/70 border border-accent-gold/50 backdrop-blur-sm shadow-[0_0_20px_-4px_rgba(212,175,55,0.6)]">
            <Flame
              size={14}
              strokeWidth={1.5}
              className="text-accent-gold"
            />
            <span className="text-[11px] uppercase tracking-[0.25em] text-accent-gold font-light">
              Streak ×{streak}
            </span>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
