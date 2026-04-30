"use client";

import type { Scenario, SimulatorState } from "@/lib/simulator/types";

/**
 * Subtle progress pips across the top of the viewport. Shows how many
 * choices have been made in the current run, as dim gold dots. Hidden
 * when the scenario has zero choice points (unusual).
 *
 * Doesn't reveal the total scene count, we don't want the player to
 * feel the scenario's "length." Just that they've advanced.
 */
export default function SceneProgress({
  scenario,
  state,
}: {
  scenario: Scenario;
  state: SimulatorState;
}) {
  // Rough estimate: how many choice-bearing scenes this scenario has.
  const choiceScenes = scenario.scenes.filter(
    (s) => s.choices && s.choices.length > 0,
  ).length;
  if (choiceScenes === 0) return null;

  const madeSoFar = state.choicesMade.length;
  const pipCount = Math.min(choiceScenes, 10); // cap visual density
  const filledPips = Math.min(
    pipCount,
    Math.ceil((madeSoFar / choiceScenes) * pipCount),
  );

  return (
    <div className="fixed top-[62px] sm:top-[72px] left-1/2 -translate-x-1/2 z-[55] pointer-events-none">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: pipCount }).map((_, i) => {
          const filled = i < filledPips;
          return (
            <span
              key={i}
              className={`rounded-full transition-all duration-500 ${
                filled
                  ? "w-1.5 h-1.5 bg-accent-gold/80"
                  : "w-1 h-1 bg-accent-gold/20"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
