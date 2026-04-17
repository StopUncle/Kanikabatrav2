"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type {
  Scenario,
  SimulatorState,
  Choice,
  DialogLine,
} from "@/lib/simulator/types";
import {
  applyChoice,
  autoAdvance,
  currentScene,
  initState,
  isComplete,
} from "@/lib/simulator/engine";
import MoodBackground from "./MoodBackground";
import Letterbox from "./Letterbox";
import CharacterSilhouette from "./CharacterSilhouette";
import DialogBox from "./DialogBox";
import ChoiceCards from "./ChoiceCards";
import EndingScreen from "./EndingScreen";

type Props = {
  scenario: Scenario;
  /** Optional initial state — used to resume from server-persisted progress. */
  initialState?: SimulatorState;
  /**
   * Called every time state changes meaningfully (scene transition, choice,
   * ending). Implementations POST to /api/simulator/progress for persistence.
   * Failures are non-fatal — the game keeps working client-side.
   */
  onStateChange?: (state: SimulatorState) => void;
  /** Called once when the scenario reaches an ending scene. Server records badges. */
  onComplete?: (state: SimulatorState) => void;
  /** Link to the next scenario in the flow, if any. */
  nextScenarioHref?: string | null;
  /** Badge keys awarded by this completion — shown on the ending screen. */
  badgesEarned?: string[];
};

export default function SimulatorRunner({
  scenario,
  initialState,
  onStateChange,
  onComplete,
  nextScenarioHref,
  badgesEarned,
}: Props) {
  const [state, setState] = useState<SimulatorState>(
    initialState ?? initState(scenario),
  );
  const [lineIndex, setLineIndex] = useState(0);
  // Ref avoids re-firing onComplete when React double-invokes in StrictMode.
  const completeFiredRef = useRef(false);

  const scene = currentScene(scenario, state);
  const currentLine: DialogLine | undefined = scene?.dialog?.[lineIndex];
  const isLastLine =
    scene && scene.dialog ? lineIndex === scene.dialog.length - 1 : false;
  const showChoices =
    !!scene &&
    !scene.isEnding &&
    isLastLine &&
    !!scene.choices &&
    scene.choices.length > 0;

  const characterById = useMemo(() => {
    const map: Record<string, Scenario["characters"][number]> = {};
    for (const c of scenario.characters) map[c.id] = c;
    return map;
  }, [scenario.characters]);

  const activeCharacter =
    currentLine?.speakerId && currentLine.speakerId !== "inner-voice"
      ? characterById[currentLine.speakerId]
      : undefined;

  // The "cast" — characters visibly present in the current scene. If the
  // scene declares `presentCharacterIds`, we render that list side-by-side.
  // Otherwise we fall back to just the active speaker (legacy behavior).
  // inner-voice is filtered out — it's narration, not a visible character.
  const castCharacters = (() => {
    if (!scene) return [];
    const ids =
      scene.presentCharacterIds && scene.presentCharacterIds.length > 0
        ? scene.presentCharacterIds
        : activeCharacter
          ? [activeCharacter.id]
          : [];
    return ids
      .filter((id) => id !== "inner-voice")
      .map((id) => characterById[id])
      .filter((c): c is NonNullable<typeof c> => !!c)
      .slice(0, 3);
  })();

  // Persistence hook — fire on state transitions (but not lineIndex changes).
  useEffect(() => {
    onStateChange?.(state);
  }, [state, onStateChange]);

  // Fire completion hook once when state enters an ended state.
  useEffect(() => {
    if (isComplete(state) && !completeFiredRef.current) {
      completeFiredRef.current = true;
      onComplete?.(state);
    }
  }, [state, onComplete]);

  const advanceLine = useCallback(() => {
    if (!scene) return;
    // More lines remain — just step forward in the current scene
    if (scene.dialog && lineIndex < scene.dialog.length - 1) {
      setLineIndex((i) => i + 1);
      return;
    }
    // Last line: if scene has choices, ChoiceCards render; nothing to do here.
    if (scene.choices && scene.choices.length > 0) return;

    // Auto-advance to next scene (handles endings internally)
    setState((prev) => {
      const next = autoAdvance(scenario, prev);
      return next;
    });
    setLineIndex(0);
  }, [scene, scenario, lineIndex]);

  const pickChoice = useCallback(
    (choice: Choice) => {
      setState((prev) => applyChoice(scenario, prev, choice.id));
      setLineIndex(0);
    },
    [scenario],
  );

  const restart = useCallback(() => {
    completeFiredRef.current = false;
    setState(initState(scenario));
    setLineIndex(0);
  }, [scenario]);

  if (!scene) {
    // Unknown scene id — bad data or tampered state. Fail gracefully.
    return (
      <div className="fixed inset-0 z-[60] bg-deep-black flex items-center justify-center text-text-gray">
        <p className="text-sm">Scene missing. Restart the scenario.</p>
      </div>
    );
  }

  // Ending scene — dedicated cinematic layout
  if (scene.isEnding) {
    return (
      <div className="fixed inset-0 z-[60] bg-deep-black overflow-y-auto">
        <MoodBackground mood={scene.mood ?? "mysterious"} />
        <Letterbox />
        <AnimatePresence mode="wait">
          <EndingScreen
            key={scene.id}
            scenario={scenario}
            scene={scene}
            state={state}
            badgesEarned={badgesEarned}
            nextScenarioHref={nextScenarioHref}
            onRestart={restart}
          />
        </AnimatePresence>
      </div>
    );
  }

  // Dialog scene
  return (
    <div className="fixed inset-0 z-[60] bg-deep-black overflow-hidden flex flex-col">
      <MoodBackground mood={scene.mood} />
      <Letterbox />

      {/* Scenario label — top */}
      <div className="relative z-30 pt-20 sm:pt-24 text-center">
        <p className="text-accent-gold/60 text-[10px] uppercase tracking-[0.5em]">
          {scenario.title}
        </p>
      </div>

      {/* Cast — one or more characters side-by-side. Speaker gets full
          intensity + emotion-driven rim light; others dim back. */}
      <div className="relative z-10 flex-1 flex items-end justify-center px-4 gap-4 sm:gap-8">
        {castCharacters.map((c) => {
          const isSpeaker = activeCharacter?.id === c.id;
          return (
            <CharacterSilhouette
              key={c.id}
              character={c}
              emotion={
                isSpeaker ? currentLine?.emotion : c.defaultEmotion
              }
              intensity={isSpeaker ? 1 : 0.72}
            />
          );
        })}
      </div>

      {/* Dialog + choices */}
      <div className="relative z-20 pb-24 sm:pb-28 flex flex-col items-center gap-8">
        <AnimatePresence mode="wait">
          {!showChoices && currentLine && (
            <DialogBox
              key={`${scene.id}-${lineIndex}`}
              line={currentLine}
              character={
                currentLine.speakerId
                  ? characterById[currentLine.speakerId]
                  : undefined
              }
              isLastLine={!!isLastLine}
              onAdvance={advanceLine}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showChoices && scene.choices && (
            <ChoiceCards choices={scene.choices} onPick={pickChoice} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
