"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type {
  Scenario,
  SimulatorState,
  OutcomeType,
} from "@/lib/simulator/types";
import SimulatorRunner from "@/components/simulator/SimulatorRunner";
import AchievementToast from "@/components/simulator/AchievementToast";
import SimulatorErrorBoundary from "@/components/simulator/SimulatorErrorBoundary";

export type PreviousBest = {
  xpEarned: number;
  outcome: OutcomeType | null;
  completedAt: string;
};

type Props = {
  scenario: Scenario;
  initialState?: SimulatorState;
  previousBest?: PreviousBest | null;
  /**
   * URL slug of the parent adventure. After a scenario reaches an ending
   * we POST {completedScenarioId} to /api/adventures/[slug]/advance to
   * advance the arc cursor, in addition to the regular /api/simulator/complete
   * call. The next-button on the ending screen routes back into the run
   * page so the dispatcher picks the next chapter or the recap.
   */
  adventureSlug: string;
  /** Display label "Step 3 of 7", baked server-side. */
  stepLabel: string;
  /** Title of the adventure, used on the ending CTA label. */
  adventureTitle: string;
};

/**
 * Adventure-aware client wrapper around SimulatorRunner. Parallel to the
 * standalone SimulatorPageClient but additionally pings the adventure
 * advance endpoint when the scenario completes. Kept separate so the
 * default simulator path stays untouched.
 */
export default function AdventureSimulatorPageClient({
  scenario,
  initialState,
  previousBest = null,
  adventureSlug,
  stepLabel,
  adventureTitle,
}: Props) {
  const router = useRouter();
  const [badgesEarned, setBadgesEarned] = useState<string[]>([]);
  const [unlockedThisRun, setUnlockedThisRun] = useState<string[]>([]);
  const [bestToDate, setBestToDate] = useState<PreviousBest | null>(previousBest);

  useEffect(() => {
    document.body.dataset.simulatorActive = "true";
    return () => {
      delete document.body.dataset.simulatorActive;
    };
  }, []);

  const lastSavedRef = useRef<string>("");
  const currentSceneIdRef = useRef<string | null>(null);

  const handleStateChange = useCallback((state: SimulatorState) => {
    currentSceneIdRef.current = state.currentSceneId;
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
    }).catch(() => {});
  }, []);

  const handleComplete = useCallback(
    async (state: SimulatorState) => {
      setBadgesEarned([]);
      setUnlockedThisRun([]);
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

      // Fire both completions in parallel. The per-scenario complete
      // captures badges; the adventure advance moves the arc cursor.
      // Either may fail without blocking the player from reading the
      // ending screen and clicking Continue.
      try {
        const [completeRes] = await Promise.all([
          fetch("/api/simulator/complete", {
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
          }),
          fetch(`/api/adventures/${adventureSlug}/advance`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completedScenarioId: state.scenarioId }),
          }).catch(() => null),
        ]);
        if (completeRes && completeRes.ok) {
          const data = (await completeRes.json()) as {
            allEarnedKeys: string[];
            newlyEarnedKeys: string[];
          };
          setBadgesEarned(data.allEarnedKeys);
          setUnlockedThisRun(data.newlyEarnedKeys);
        }
        router.refresh();
      } catch {
        // Silent. Run state remains visible to the player.
      }
    },
    [adventureSlug, router],
  );

  // The ending screen's "Next Scenario" link routes back into the run
  // dispatcher, which reads the freshly-advanced AdventureProgress row
  // and either renders the next chapter or redirects to /complete.
  const nextScenarioHref = `/consilium/adventures/${adventureSlug}/run`;

  return (
    <SimulatorErrorBoundary
      scenarioId={scenario.id}
      currentSceneIdRef={currentSceneIdRef}
      exitHref={`/consilium/adventures/${adventureSlug}`}
    >
      <SimulatorRunner
        scenario={scenario}
        initialState={initialState}
        previousBest={bestToDate}
        onStateChange={handleStateChange}
        onComplete={handleComplete}
        nextScenarioHref={nextScenarioHref}
        badgesEarned={badgesEarned}
        exitHref={`/consilium/adventures/${adventureSlug}`}
      />
      <AdventureChapterBanner label={stepLabel} title={adventureTitle} />
      <AchievementToast unlocks={unlockedThisRun} />
    </SimulatorErrorBoundary>
  );
}

/**
 * Tiny top-corner banner anchoring the player in the arc. The runner
 * occupies the full viewport, so this is a fixed-position pill rendered
 * over the runner chrome. Pure presentational, no interactivity.
 */
function AdventureChapterBanner({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div className="pointer-events-none fixed top-3 left-1/2 -translate-x-1/2 z-[60] px-3 py-1.5 rounded-full bg-deep-black/70 border border-warm-gold/25 backdrop-blur-sm text-center max-w-[80vw]">
      <p className="text-warm-gold/80 uppercase tracking-[0.25em] text-[9px] truncate">
        {label} . {title}
      </p>
      <span className="block h-px w-8 mx-auto mt-0.5 bg-warm-gold/40" />
    </div>
  );
}
