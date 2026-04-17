"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { RotateCcw, ArrowRight, Award } from "lucide-react";
import type { Scene, Scenario, SimulatorState } from "@/lib/simulator/types";
import { BADGE_BY_KEY } from "@/lib/simulator/badges";

type Props = {
  scenario: Scenario;
  scene: Scene;
  state: SimulatorState;
  /** Badge keys earned by this run (deduped against prior badges server-side). */
  badgesEarned?: string[];
  /** Hook for "next scenario" — pass null to hide the next CTA. */
  nextScenarioHref?: string | null;
  onRestart: () => void;
};

export default function EndingScreen({
  scene,
  state,
  badgesEarned = [],
  nextScenarioHref,
  onRestart,
}: Props) {
  const outcome = state.outcome ?? scene.outcomeType ?? "neutral";
  const outcomeColor =
    outcome === "good" || outcome === "passed"
      ? "text-accent-gold"
      : outcome === "bad" || outcome === "failed"
        ? "text-red-400"
        : "text-text-light";

  const outcomeLabel =
    outcome === "good" || outcome === "passed"
      ? "Mastery"
      : outcome === "bad" || outcome === "failed"
        ? "Cost"
        : "Outcome";

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20 overflow-y-auto"
    >
      <div className="max-w-2xl w-full text-center">
        <m.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.45em" }}
          transition={{ duration: 1, delay: 0.4 }}
          className={`uppercase text-xs mb-8 ${outcomeColor}`}
        >
          {outcomeLabel}
        </m.p>

        <m.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-5xl sm:text-6xl font-extralight text-white mb-8 tracking-wide"
        >
          {scene.endingTitle ?? "Scene Complete"}
        </m.h1>

        <m.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="w-24 h-px bg-accent-gold mx-auto mb-10 origin-center"
        />

        {scene.endingSummary && (
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="text-text-gray text-lg sm:text-xl font-light leading-relaxed mb-12 max-w-xl mx-auto"
          >
            {scene.endingSummary}
          </m.p>
        )}

        {/* XP earned */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          className="inline-flex flex-col items-center gap-1 px-6 py-3 rounded-full border border-accent-gold/30 mb-6"
        >
          <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.35em]">
            XP Earned
          </p>
          <p className="text-accent-gold text-2xl font-light">
            +{state.xpEarned}
          </p>
        </m.div>

        {/* Badges earned this run */}
        {badgesEarned.length > 0 && (
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="mb-12 flex flex-col items-center gap-3"
          >
            <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.35em]">
              Badge{badgesEarned.length > 1 ? "s" : ""} Earned
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {badgesEarned.map((key) => {
                const b = BADGE_BY_KEY[key];
                if (!b) return null;
                return (
                  <div
                    key={key}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-deep-black/60 border border-accent-gold/30"
                  >
                    <Award
                      size={16}
                      className="text-accent-gold"
                      strokeWidth={1.5}
                    />
                    <div className="text-left">
                      <p className="text-white text-sm font-light">{b.title}</p>
                      <p className="text-text-gray/60 text-[10px] italic">
                        {b.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </m.div>
        )}

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-accent-gold/40 text-accent-gold hover:bg-accent-gold/10 font-medium tracking-wider uppercase text-sm rounded-full transition-all"
          >
            <RotateCcw size={16} strokeWidth={1.5} />
            Replay
          </button>
          {nextScenarioHref && (
            <Link
              href={nextScenarioHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-sm rounded-full hover:bg-accent-gold/90 transition-all"
            >
              Next Scenario
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
          )}
        </m.div>
      </div>
    </m.div>
  );
}
