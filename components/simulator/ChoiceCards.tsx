"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { Choice, Scenario } from "@/lib/simulator/types";

type Props = {
  choices: Choice[];
  onPick: (choice: Choice) => void;
  /** Retained for API compatibility; no longer used. */
  scenario?: Scenario;
};

export default function ChoiceCards({ choices, onPick }: Props) {
  // Track which card was clicked so we can flash it before the scene
  // transitions. Small delay (~200ms) before the actual pickChoice fires.
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handlePick(choice: Choice) {
    if (selectedId) return; // Prevent double-click
    setSelectedId(choice.id);
    setTimeout(() => onPick(choice), 220);
  }

  // Choice-count → column layout. 4 choices deliberately break to a
  // 2×2 grid rather than 3-cols-plus-orphan, 118 scenes catalogue-wide
  // have 4 choices and were silently rendering 3+1 on desktop. 1/2
  // choices get 2 columns (wider cards at low counts read better than
  // stretched single columns); 3 → 3 cols; 5+ → 3 cols (accepts
  // a 3+N tail for rare high-count scenes).
  const desktopCols =
    choices.length <= 2
      ? "md:grid-cols-2"
      : choices.length === 3
        ? "md:grid-cols-3"
        : choices.length === 4
          ? "md:grid-cols-2"
          : "md:grid-cols-3";

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12, transition: { duration: 0.25 } }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`max-w-4xl mx-auto w-full px-4 grid gap-4 grid-cols-1 ${desktopCols}`}
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
            aria-describedby={c.tactic ? `choice-desc-${c.id}` : undefined}
            className={`group relative text-left p-6 rounded-xl border bg-deep-black/70 backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-4 focus-visible:ring-offset-deep-black ${flashBorder}`}
          >
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-br from-accent-gold/5 to-transparent" />
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
            {c.tactic && (
              <span id={`choice-desc-${c.id}`} className="sr-only">
                {c.tactic}
              </span>
            )}
          </m.button>
        );
      })}
    </m.div>
  );
}
