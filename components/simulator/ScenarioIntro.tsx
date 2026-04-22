"use client";

import { m, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Users, Clock, Target } from "lucide-react";
import type { Scenario, OutcomeType } from "@/lib/simulator/types";

type Props = {
  scenario: Scenario;
  show: boolean;
  previousBest?: {
    xpEarned: number;
    outcome: OutcomeType | null;
    completedAt: string;
  } | null;
  onBegin: () => void;
};

/**
 * Pre-game curtain. Shown once at mount (and again after a Replay)
 * to give the player a beat before the scenario starts — scenario
 * title, tagline, a glance at the cast, and a prominent "Begin"
 * button. On replays it also shows the previous best so the player
 * knows what they're gunning for.
 *
 * Sits above MoodBackground + Letterbox but below the exit X. Fades
 * out when the player taps Begin.
 *
 * Design decisions:
 *   - Black backdrop with a slow-breathing gold seal behind the title
 *     so the scene doesn't feel dead while the player reads.
 *   - Characters shown as a small name-tag strip, not silhouettes —
 *     the silhouettes belong to the scene itself; previewing them
 *     here would dilute their impact when the first beat lands.
 *   - Replay affordance: if previousBest exists, the button copy
 *     flips to "Replay scenario" with a small best-summary under it.
 */
export default function ScenarioIntro({
  scenario,
  show,
  previousBest = null,
  onBegin,
}: Props) {
  const isReplay = !!previousBest;
  const bestLabel =
    previousBest?.outcome === "good" || previousBest?.outcome === "passed"
      ? "Mastery"
      : previousBest?.outcome === "bad" || previousBest?.outcome === "failed"
        ? "Cost"
        : previousBest?.outcome === "neutral"
          ? "Outcome"
          : null;

  return (
    <AnimatePresence>
      {show && (
        <m.div
          key="scenario-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="scenario-intro-title"
          className="fixed inset-0 z-[62] bg-deep-black/95 backdrop-blur-sm flex items-center justify-center px-6 py-16 overflow-y-auto"
        >
          <div className="max-w-2xl w-full text-center">
            {/* Slow-breathing gold ring behind the title to match the
                cinematic opening feel of the rest of the simulator. */}
            <m.div
              aria-hidden
              animate={{ scale: [1, 1.04, 1], opacity: [0.35, 0.5, 0.35] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 65%)",
              }}
            />

            <m.p
              initial={{ opacity: 0, letterSpacing: "0.15em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-accent-gold/70 text-[10px] uppercase font-light mb-6 relative"
            >
              {isReplay ? "Replay · The Dark Mirror" : "The Dark Mirror"}
            </m.p>

            <m.h1
              id="scenario-intro-title"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl font-extralight text-white tracking-wide mb-4 relative"
            >
              {scenario.title}
            </m.h1>

            <m.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="w-16 h-px bg-accent-gold/60 mx-auto mb-6 origin-center"
            />

            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-text-gray text-base sm:text-lg font-light italic leading-relaxed mb-8 max-w-xl mx-auto relative"
            >
              {scenario.tagline}
            </m.p>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.3em] text-text-gray/60 mb-10 relative"
            >
              <span className="inline-flex items-center gap-1.5">
                <Clock size={11} strokeWidth={1.5} />~
                {scenario.estimatedMinutes || 10} min
              </span>
              {scenario.characters.length > 0 && (
                <span className="inline-flex items-center gap-1.5">
                  <Users size={11} strokeWidth={1.5} />
                  {scenario.characters.length}{" "}
                  {scenario.characters.length === 1 ? "character" : "characters"}
                </span>
              )}
              {scenario.tacticsLearned?.length > 0 && (
                <span className="inline-flex items-center gap-1.5">
                  <Target size={11} strokeWidth={1.5} />
                  {scenario.tacticsLearned.length} tactics
                </span>
              )}
            </m.div>

            {/* Previous-best callout on replays. Drawn like a quiet
                scoreboard so the player feels they're returning to
                beat something specific. */}
            {isReplay && previousBest && (
              <m.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full border border-accent-gold/25 bg-deep-black/60 relative"
              >
                <span className="text-accent-gold/60 text-[9px] uppercase tracking-[0.35em]">
                  Best
                </span>
                <span className="text-accent-gold text-lg font-light tabular-nums">
                  {previousBest.xpEarned} XP
                </span>
                {bestLabel && (
                  <>
                    <span className="text-text-gray/30 text-xs">·</span>
                    <span
                      className={`text-xs uppercase tracking-[0.25em] ${
                        previousBest.outcome === "good" ||
                        previousBest.outcome === "passed"
                          ? "text-accent-gold"
                          : previousBest.outcome === "bad" ||
                              previousBest.outcome === "failed"
                            ? "text-red-400/80"
                            : "text-text-gray/70"
                      }`}
                    >
                      {bestLabel}
                    </span>
                  </>
                )}
              </m.div>
            )}

            <m.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              onClick={onBegin}
              autoFocus
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-accent-gold text-deep-black font-medium tracking-[0.2em] uppercase text-sm hover:bg-accent-gold/90 hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-4 focus-visible:ring-offset-deep-black active:scale-[0.98] transition-all relative"
            >
              {isReplay ? (
                <>
                  <RotateCcw
                    size={16}
                    strokeWidth={1.8}
                    className="group-hover:-rotate-12 transition-transform"
                  />
                  Replay scenario
                </>
              ) : (
                <>
                  <Play size={16} strokeWidth={1.8} />
                  Begin
                </>
              )}
            </m.button>

            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="text-text-gray/50 text-xs mt-6 relative"
            >
              Tap anywhere during dialog to advance
            </m.p>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
