"use client";

import { useMemo, useState } from "react";
import { m } from "framer-motion";
import { Sparkles, Flag } from "lucide-react";
import type { Choice, Scenario } from "@/lib/simulator/types";

type Props = {
  choices: Choice[];
  onPick: (choice: Choice) => void;
  /**
   * When passed, choices whose nextSceneId points at an `isEnding`
   * scene get a small "Ends here" badge. Without this, fast-end
   * choices read as a UX bug — players tap, the scenario closes
   * out, and it looks like the game just stopped.
   */
  scenario?: Scenario;
};

export default function ChoiceCards({ choices, onPick, scenario }: Props) {
  // Build a fast lookup of which scene ids are endings so we can
  // tag choices that route directly to one. Memoised on the scenario
  // identity — the scenes array is static per scenario.
  const endingIds = useMemo(() => {
    if (!scenario) return new Set<string>();
    return new Set(scenario.scenes.filter((s) => s.isEnding).map((s) => s.id));
  }, [scenario]);
  // Track which card was clicked so we can flash it before the scene
  // transitions. Small delay (~200ms) before the actual pickChoice fires.
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handlePick(choice: Choice) {
    if (selectedId) return; // Prevent double-click
    setSelectedId(choice.id);
    setTimeout(() => onPick(choice), 220);
  }
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12, transition: { duration: 0.25 } }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`max-w-4xl mx-auto w-full px-4 grid gap-4 ${
        choices.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"
      } grid-cols-1`}
    >
      {choices.map((c, i) => {
        const isSelected = selectedId === c.id;
        const isDimmed = selectedId !== null && !isSelected;
        // Flash color telegraphs the choice quality for ~200ms before
        // the scene transitions. Optimal = gold, explicit bad = red,
        // neutral = cool white.
        const flashBorder = isSelected
          ? c.isOptimal === true
            ? "border-accent-gold shadow-[0_0_40px_0_rgba(212,175,55,0.7)]"
            : c.isOptimal === false
              ? "border-red-400/80 shadow-[0_0_40px_0_rgba(220,70,70,0.55)]"
              : "border-white/70 shadow-[0_0_30px_0_rgba(255,255,255,0.3)]"
          : "border-accent-gold/25 hover:border-accent-gold/70 hover:shadow-[0_8px_32px_-8px_rgba(212,175,55,0.35)]";
        return (
          <m.button
            key={c.id}
            onClick={() => handlePick(c)}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isDimmed ? 0.35 : 1,
              y: 0,
              scale: isSelected ? 1.02 : 1,
            }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
            whileHover={!selectedId ? { y: -4, scale: 1.01 } : undefined}
            whileTap={!selectedId ? { scale: 0.99 } : undefined}
            disabled={!!selectedId}
            // Screen-reader hint: read the choice text + the
            // "ends here" warning (if applicable) + the tactic as one
            // accessible label. aria-label on a span doesn't get read;
            // aria-describedby on the button itself does.
            aria-describedby={
              endingIds.has(c.nextSceneId) || c.tactic
                ? `choice-desc-${c.id}`
                : undefined
            }
            className={`group relative text-left p-6 rounded-xl border bg-deep-black/70 backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-4 focus-visible:ring-offset-deep-black ${flashBorder}`}
          >
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-br from-accent-gold/5 to-transparent" />
            {endingIds.has(c.nextSceneId) && (
              <span
                className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-deep-black/80 border border-warm-gold/30 text-warm-gold/80 text-[9px] uppercase tracking-[0.2em]"
                title="This choice closes out the scenario"
              >
                <Flag size={8} strokeWidth={2} aria-hidden />
                Ends here
              </span>
            )}
            <p className="relative text-white font-light text-base sm:text-lg leading-snug mb-3">
              {c.text}
            </p>
            {c.tactic && (
              <p className="relative text-text-gray/60 text-xs italic leading-relaxed border-t border-accent-gold/10 pt-3">
                <Sparkles
                  size={10}
                  className="inline-block mr-1.5 text-accent-gold/70"
                  strokeWidth={1.5}
                  aria-hidden
                />
                {c.tactic}
              </p>
            )}
            {(endingIds.has(c.nextSceneId) || c.tactic) && (
              <span id={`choice-desc-${c.id}`} className="sr-only">
                {endingIds.has(c.nextSceneId) &&
                  "Warning: this choice ends the scenario. "}
                {c.tactic}
              </span>
            )}
          </m.button>
        );
      })}
    </m.div>
  );
}
