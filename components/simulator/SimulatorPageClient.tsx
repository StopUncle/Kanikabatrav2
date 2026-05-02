"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type {
  Scenario,
  SimulatorState,
  OutcomeType,
} from "@/lib/simulator/types";
import SimulatorRunner from "./SimulatorRunner";
import AchievementToast from "./AchievementToast";
import SimulatorErrorBoundary from "./SimulatorErrorBoundary";

export type PreviousBest = {
  xpEarned: number;
  outcome: OutcomeType | null;
  completedAt: string; // ISO
};

type Props = {
  scenario: Scenario;
  initialState?: SimulatorState;
  /**
   * Summary of the player's best previous completion, shown as a
   * "Replaying · Your best: 85 XP · Mastery" banner at the top of
   * the game so replays feel like beating a record. Null on first
   * attempt.
   */
  previousBest?: PreviousBest | null;
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
  previousBest = null,
  nextScenarioHref,
}: Props) {
  const router = useRouter();
  const [badgesEarned, setBadgesEarned] = useState<string[]>([]);
  // Newly-earned-this-run keys drive the corner toast. Separate from
  // `badgesEarned` (which is all earned, replay-inclusive, for the
  // ending grid) so replays of an already-unlocked scenario don't
  // re-fire the toast.
  const [unlockedThisRun, setUnlockedThisRun] = useState<string[]>([]);
  // Track the "best-to-date" across the session so a second replay
  // in the same tab compares against the run that just finished, not
  // the previousBest prop frozen at page load. Initial value mirrors
  // the prop so first run always has a reference.
  const [bestToDate, setBestToDate] = useState<PreviousBest | null>(
    previousBest,
  );

  // Throttle saves, only fire if state has actually changed on a key field.
  const lastSavedRef = useRef<string>("");
  // Latest scene id, read by the error boundary so a crash report can
  // pin the failure to a specific scene rather than just a scenario.
  const currentSceneIdRef = useRef<string | null>(null);

  const handleStateChange = useCallback(
    (state: SimulatorState) => {
      currentSceneIdRef.current = state.currentSceneId;
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
        // Silent, client is authoritative during the run
      });
    },
    [],
  );

  const handleComplete = useCallback(async (state: SimulatorState) => {
    // Clear stale badges from the previous run immediately. Without
    // this, a replay that reaches a *different* ending path will
    // briefly show the previous run's badge keys on the ending
    // screen until the /complete POST resolves and sets fresh ones
    //, a misleading render window of 200ms–2s on slow connections.
    setBadgesEarned([]);
    setUnlockedThisRun([]);

    // Update the session's best-to-date if this run exceeded it.
    // A subsequent in-session replay sees this as the new baseline so
    // the "NEW BEST / Best: N XP" comparison stays honest without
    // waiting for a router.refresh + re-hydrate.
    setBestToDate((prev) => {
      if (!prev || state.xpEarned > prev.xpEarned) {
        return {
          xpEarned: state.xpEarned,
          outcome: state.outcome ?? null,
          completedAt: state.endedAt ?? new Date().toISOString(),
        };
      }
      return prev;
    });
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
        // if duplicates so replays still feel rewarding. Uniqueness is
        // enforced server-side via the SimulatorBadge unique constraint.
        setBadgesEarned(data.allEarnedKeys);
        // Toast only on first-time unlocks, a replay that re-earns the
        // same key array gets no popup, which is what players want.
        setUnlockedThisRun(data.newlyEarnedKeys);
        // Refresh server components so the index page reflects new state
        // when the user returns.
        router.refresh();
      }
    } catch {
      // Silent
    }
  }, [router]);

  return (
    <SimulatorErrorBoundary
      scenarioId={scenario.id}
      currentSceneIdRef={currentSceneIdRef}
      exitHref="/consilium/simulator"
    >
      <SimulatorRunner
        scenario={scenario}
        initialState={initialState}
        previousBest={bestToDate}
        onStateChange={handleStateChange}
        onComplete={handleComplete}
        nextScenarioHref={nextScenarioHref}
        badgesEarned={badgesEarned}
      />
      <AchievementToast unlocks={unlockedThisRun} />
    </SimulatorErrorBoundary>
  );
}
