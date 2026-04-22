"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Scenario, SimulatorState } from "@/lib/simulator/types";
import SimulatorRunner from "./SimulatorRunner";

type Props = {
  scenario: Scenario;
  initialState?: SimulatorState;
  nextScenarioHref?: string | null;
};

/**
 * Thin client wrapper around SimulatorRunner that handles persistence.
 *
 * - onStateChange  → POST /api/simulator/progress (throttled, fire-and-forget)
 * - onComplete     → POST /api/simulator/complete (captures newly-earned badges)
 *
 * Persistence failures are swallowed intentionally. Losing a save mid-run
 * costs the player at most one replay; losing the end-of-scenario badge
 * costs nothing permanent.
 */
export default function SimulatorPageClient({
  scenario,
  initialState,
  nextScenarioHref,
}: Props) {
  const router = useRouter();
  const [badgesEarned, setBadgesEarned] = useState<string[]>([]);

  // Throttle saves — only fire if state has actually changed on a key field.
  const lastSavedRef = useRef<string>("");

  const handleStateChange = useCallback(
    (state: SimulatorState) => {
      // Key includes the fields we actually care about being persisted.
      const key = `${state.currentSceneId}|${state.choicesMade.length}|${state.outcome ?? ""}`;
      if (key === lastSavedRef.current) return;
      lastSavedRef.current = key;

      void fetch("/api/simulator/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenarioId: state.scenarioId,
          currentSceneId: state.currentSceneId,
          choicesMade: state.choicesMade,
          xpEarned: state.xpEarned,
          outcome: state.outcome ?? null,
          endedAt: state.endedAt ?? null,
        }),
      }).catch(() => {
        // Silent — client is authoritative during the run
      });
    },
    [],
  );

  const handleComplete = useCallback(async (state: SimulatorState) => {
    // Clear stale badges from the previous run immediately. Without
    // this, a replay that reaches a *different* ending path will
    // briefly show the previous run's badge keys on the ending
    // screen until the /complete POST resolves and sets fresh ones
    // — a misleading render window of 200ms–2s on slow connections.
    setBadgesEarned([]);
    try {
      const res = await fetch("/api/simulator/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenarioId: state.scenarioId,
          currentSceneId: state.currentSceneId,
          choicesMade: state.choicesMade,
          xpEarned: state.xpEarned,
          outcome: state.outcome,
          endedAt: state.endedAt,
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as {
          allEarnedKeys: string[];
          newlyEarnedKeys: string[];
        };
        // Show ALL earned badges on the ending screen (visual reward), even
        // if duplicates — so replays still feel rewarding. Uniqueness is
        // enforced server-side via the SimulatorBadge unique constraint.
        setBadgesEarned(data.allEarnedKeys);
        // Refresh server components so the index page reflects new state
        // when the user returns.
        router.refresh();
      }
    } catch {
      // Silent
    }
  }, [router]);

  return (
    <SimulatorRunner
      scenario={scenario}
      initialState={initialState}
      onStateChange={handleStateChange}
      onComplete={handleComplete}
      nextScenarioHref={nextScenarioHref}
      badgesEarned={badgesEarned}
    />
  );
}
