"use client";

import { Flame, Snowflake } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import type { StreakState, CompletionDelta } from "@/lib/tells/streak";

/**
 * Compact streak badge for the top of the Tell page.
 *
 * Three states:
 *   - hidden        (state hasn't hydrated yet, prevents SSR flicker)
 *   - 0 days        (small "first day" prompt)
 *   - n days        (flame + count, snowflake if a freeze covered them)
 */
export default function StreakBadge({
  state,
  hydrated,
  delta,
}: {
  state: StreakState;
  hydrated: boolean;
  delta: CompletionDelta | null;
}) {
  if (!hydrated) {
    // Reserve the height to avoid layout shift on hydration.
    return <div className="h-7" aria-hidden />;
  }

  const days = state.currentDays;
  const usedFreeze = state.freezesAvail === 0;

  return (
    <div className="flex items-center justify-center gap-2 h-7 text-[11px] uppercase tracking-[0.3em]">
      <AnimatePresence mode="wait">
        {days === 0 ? (
          <m.div
            key="zero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-text-gray/70"
          >
            Day one starts now.
          </m.div>
        ) : (
          <m.div
            key={`days-${days}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <Flame
              size={14}
              className={
                delta?.kind === "extended"
                  ? "text-accent-gold"
                  : "text-accent-gold/80"
              }
              strokeWidth={1.6}
            />
            <span className="text-accent-gold">
              {days} {days === 1 ? "day" : "days"}
            </span>
            {usedFreeze && (
              <span
                className="flex items-center gap-1 text-text-gray/70"
                title="Weekly freeze used to cover one missed day"
              >
                <Snowflake size={11} strokeWidth={1.6} />
                <span>Freeze used</span>
              </span>
            )}
          </m.div>
        )}
      </AnimatePresence>

      {/* Floating "+1" beside the badge when a streak just extended. */}
      <AnimatePresence>
        {delta?.kind === "extended" && (
          <m.span
            key="+1"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-emerald-400 text-[11px]"
          >
            +1
          </m.span>
        )}
      </AnimatePresence>
    </div>
  );
}
