"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, FastForward, AlertTriangle } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import * as Sentry from "@sentry/nextjs";
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
import ImmersionOverlay from "./ImmersionOverlay";
import SceneShake from "./SceneShake";
import XpFloater from "./XpFloater";
import StreakIndicator from "./StreakIndicator";
import SceneProgress from "./SceneProgress";
import ScenarioIntro from "./ScenarioIntro";
import ChoiceTimer from "./ChoiceTimer";
import ChoicePopularityReveal from "./ChoicePopularityReveal";

type Props = {
  scenario: Scenario;
  /** Optional initial state, used to resume from server-persisted progress. */
  initialState?: SimulatorState;
  /**
   * Called every time state changes meaningfully (scene transition, choice,
   * ending). Implementations POST to /api/simulator/progress for persistence.
   * Failures are non-fatal, the game keeps working client-side.
   */
  onStateChange?: (state: SimulatorState) => void;
  /** Called once when the scenario reaches an ending scene. Server records badges. */
  onComplete?: (state: SimulatorState) => void;
  /** Link to the next scenario in the flow, if any. */
  nextScenarioHref?: string | null;
  /** Badge keys awarded by this completion, shown on the ending screen. */
  badgesEarned?: string[];
  /**
   * Where the exit button (top-right X) navigates. Defaults to the member
   * catalog. The public /try route overrides this to "/" so unauth players
   * don't get pushed into a 404 behind auth.
   */
  exitHref?: string;
  /**
   * Custom CTA block rendered on the ending screen in place of the
   * "Next Scenario" button. Used on the public demo to convert finishers
   * into Consilium members.
   */
  endingCta?: React.ReactNode;
  /**
   * When true, suppress the "Understand what happened → blog post"
   * CTA on losing endings. The public /try demo sets this so cold
   * visitors don't get pulled off the conversion flow into a blog
   * tangent. Forwarded to EndingScreen.
   */
  hideFailureBlog?: boolean;
  /**
   * Previous-best summary, shown as a small "Replaying · best: N XP
   * · Mastery" banner under the letterbox during dialog, and in the
   * ending-summary when this run concludes. Null on first attempt.
   */
  previousBest?: {
    xpEarned: number;
    outcome: import("@/lib/simulator/types").OutcomeType | null;
    completedAt: string;
  } | null;
};

export default function SimulatorRunner({
  scenario,
  initialState,
  onStateChange,
  onComplete,
  nextScenarioHref,
  badgesEarned,
  exitHref = "/consilium/simulator",
  endingCta,
  hideFailureBlog = false,
  previousBest = null,
}: Props) {
  const [state, setState] = useState<SimulatorState>(
    initialState ?? initState(scenario),
  );
  const [lineIndex, setLineIndex] = useState(0);

  // Pre-game intro overlay, shown on a fresh run (never on a
  // mid-run resume, since the player is already deep in). Mid-run
  // resume is identified by either initialState being set AND not
  // pointing at the start scene.
  const hadResume =
    !!initialState &&
    (initialState.currentSceneId !== scenario.startSceneId ||
      initialState.choicesMade.length > 0);
  const [showIntro, setShowIntro] = useState(!hadResume);

  // Portal target, document.body. Escapes the parent layout's stacking
  // context (the consilium member layout wraps content in `relative z-10`,
  // which caps our `z-[60]` against the Header at `z-50` and causes the
  // header to overlap the game). Portal is null until mount so SSR doesn't
  // blow up; the first render is empty then re-renders with the real tree.
  const [portalReady, setPortalReady] = useState(false);
  useEffect(() => {
    setPortalReady(true);
  }, []);

  // Lock the body scroll while the game is mounted, prevents mobile Safari
  // from bouncing the underlying page behind the portal.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Browser-level close / navigate-away guard. Matches the in-app
  // exit button's confirm dialog but at the OS level. Fires on:
  //   - closing the tab
  //   - using the browser back button
  //   - typing a new URL in the address bar
  // Only active when mid-run (at least one choice made, not yet on
  // an ending). Browsers ignore custom strings in modern versions;
  // the event just needs preventDefault + returnValue set to trigger
  // the generic "Changes you made may not be saved" prompt.
  useEffect(() => {
    function onBeforeUnload(e: BeforeUnloadEvent) {
      const sceneNow = currentScene(scenario, state);
      const isMid = !sceneNow?.isEnding && state.choicesMade.length > 0;
      if (!isMid) return;
      e.preventDefault();
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [scenario, state]);

  // Keyboard a11y: Space / Enter advances the dialog just like a
  // background tap. Scoped to the document so the player doesn't
  // have to keep the Continue button focused across scene remounts
  // (focus is lost when AnimatePresence unmounts a DialogBox per
  // line, so relying on button focus was a trap).
  // Skipped during choices, there the player is choosing, not
  // advancing; arrow keys / Tab + Enter on the choice cards is the
  // right path and that works natively via the <button>s.
  // Also skipped while the intro is showing so the Begin button
  // owns the keypress.
  // Ref to the latest dispatchTap. DispatchTap itself is declared further
  // down (after derived `scene`/`lineIndex` are computed), but the keyboard
  // listener below needs to call it. The ref pattern avoids the temporal-
  // dead-zone error and lets us keep the listener bound exactly once.
  const dispatchTapRef = useRef<
    ((source: "background" | "keyboard" | "skip-button") => void) | null
  >(null);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== " " && e.key !== "Enter") return;
      // Don't intercept when focus is inside a form / link / other
      // interactive target. Those get the key natively.
      const target = e.target as HTMLElement | null;
      if (target?.closest("button, a, input, textarea, select")) return;
      // Don't compete with the choices phase or the intro overlay.
      const sceneNow = currentScene(scenario, state);
      const atEnding = !!sceneNow?.isEnding;
      const choicesOut =
        !!sceneNow &&
        !sceneNow.isEnding &&
        !!sceneNow.choices &&
        sceneNow.choices.length > 0 &&
        lineIndex >= (sceneNow.dialog?.length ?? 0);
      if (atEnding || choicesOut || showIntro) return;
      e.preventDefault();
      // Route through the same lock as taps so a held-down key can't
      // outpace the AnimatePresence exit window and hit a stale listener.
      dispatchTapRef.current?.("keyboard");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scenario, state, lineIndex, showIntro]);
  // Dopamine state. XP floater + optimal-streak tracking
  const [xpFloat, setXpFloat] = useState<{
    id: number;
    xp: number;
    tone: "optimal" | "neutral" | "bad";
  } | null>(null);
  const [streak, setStreak] = useState(0);
  // Ref avoids re-firing onComplete when React double-invokes in StrictMode.
  const completeFiredRef = useRef(false);

  // Choice-popularity reveal state. We fetch the per-(sceneId,choiceId)
  // pick rates once at scenario start, then look up the rate for whatever
  // choice the player just made and flash the % briefly.
  // `rates` is { [sceneId]: { [choiceId]: 0..1 } }, see /api/simulator/choice-popularity.
  const [popularityRates, setPopularityRates] = useState<Record<
    string,
    Record<string, number>
  > | null>(null);
  const [lastPickReveal, setLastPickReveal] = useState<{
    rate: number | null;
    resetKey: string;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(
      `/api/simulator/choice-popularity?scenarioId=${encodeURIComponent(scenario.id)}`,
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        setPopularityRates(data.rates ?? {});
      })
      .catch(() => {
        // Non-fatal, the reveal just won't show. Game keeps working.
      });
    return () => {
      cancelled = true;
    };
  }, [scenario.id]);

  // Stuck-detector state. Tracks taps on the current scene and shows a
  // recovery overlay when a player has been on the same scene for >60s,
  // tapped >5 times, and made zero choices. The overlay offers a one-tap
  // "Skip to choices" escape so the player is never permanently jammed.
  // Triggers were specifically informed by the 2026-04-25 paid-member
  // incident where laykanbass got stuck on `wake-up` for 9 minutes.
  const tapCountRef = useRef(0);
  const sceneEnteredAtRef = useRef<number>(Date.now());
  const [showStuckRecovery, setShowStuckRecovery] = useState(false);
  const stuckCheckTimerRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  const scene = currentScene(scenario, state);
  const totalLines = scene?.dialog?.length ?? 0;
  // currentLine is undefined when lineIndex has been bumped PAST the
  // final dialog line, that's the signal that the player has read
  // all the dialog and we're now showing choices (or auto-advancing).
  const currentLine: DialogLine | undefined = scene?.dialog?.[lineIndex];
  // The line that was on-screen immediately before the choices appeared.
  // Shown as an echo above the choice cards so the player can see what
  // they are replying to. Always resolves to the final dialog line of
  // the scene when choices are active (lineIndex >= totalLines).
  const lastDialogLine: DialogLine | undefined =
    totalLines > 0 ? scene?.dialog?.[totalLines - 1] : undefined;
  const isLastLine = lineIndex === totalLines - 1;
  // Only show choices once the player has clicked PAST the last dialog
  // line. The previous logic flipped showChoices the moment we landed
  // ON the last line, which silently skipped that line, players never
  // saw the final inner-voice tactical beat that frames the choice.
  const showChoices =
    !!scene &&
    !scene.isEnding &&
    !!scene.choices &&
    scene.choices.length > 0 &&
    lineIndex >= totalLines;

  const characterById = useMemo(() => {
    const map: Record<string, Scenario["characters"][number]> = {};
    for (const c of scenario.characters) map[c.id] = c;
    return map;
  }, [scenario.characters]);

  const activeCharacter =
    currentLine?.speakerId && currentLine.speakerId !== "inner-voice"
      ? characterById[currentLine.speakerId]
      : undefined;

  // The "cast", characters visibly present in the current scene. If the
  // scene declares `presentCharacterIds`, we render that list side-by-side.
  // Otherwise we fall back to just the active speaker (legacy behavior).
  // inner-voice is filtered out, it's narration, not a visible character.
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

  // Persistence hook, fire on state transitions (but not lineIndex changes).
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
    const lines = scene.dialog?.length ?? 0;

    // Still inside the dialog, step to the next line.
    if (lineIndex < lines - 1) {
      setLineIndex((i) => i + 1);
      return;
    }

    // On the last dialog line. Clicking "Decide" / "Continue" here
    // either reveals the choices (by bumping lineIndex past the end —
    // showChoices then evaluates true) or auto-advances to the next
    // scene if there are no choices.
    if (lineIndex === lines - 1) {
      if (scene.choices && scene.choices.length > 0) {
        setLineIndex(lines); // past the end → choices render
        return;
      }
      // Auto-advance scene
      setState((prev) => autoAdvance(scenario, prev));
      setLineIndex(0);
      return;
    }

    // lineIndex is past the dialog. If choices are showing, the click
    // came from somewhere stale, ignore. Otherwise auto-advance.
    if (scene.choices && scene.choices.length > 0) return;
    setState((prev) => autoAdvance(scenario, prev));
    setLineIndex(0);
  }, [scene, scenario, lineIndex]);

  const pickChoice = useCallback(
    (choice: Choice) => {
      // Show XP floater. Tone maps to the optimality signal used by
      // the engine for XP calculation so the floater matches reality.
      const tone: "optimal" | "neutral" | "bad" =
        choice.isOptimal === true
          ? "optimal"
          : choice.isOptimal === false
            ? "bad"
            : "neutral";
      const baseXp = tone === "optimal" ? 10 : tone === "bad" ? 0 : 3;

      // Streak tracking: increment on optimal, reset otherwise.
      // Streak bonuses, a small reward for reading the scenario as it
      // was meant to be read. Reinforces the teaching loop: three
      // optimal choices in a row = +5 XP, five = +10, seven = +15.
      // Non-optimal choice resets the streak (but doesn't punish XP
      // further than the base 0/3).
      const nextStreak = choice.isOptimal === true ? streak + 1 : 0;
      const streakBonus =
        nextStreak === 3
          ? 5
          : nextStreak === 5
            ? 10
            : nextStreak === 7
              ? 15
              : 0;
      const totalXp = baseXp + streakBonus;

      // Skip the "+0 XP" floater, it reads as a bug (a reward with
      // no reward). The choice card already flashes red to signal a
      // bad choice; that's enough visual feedback without a
      // misleading "+0" pop. Optimal + neutral still show.
      if (totalXp > 0) {
        setXpFloat({
          id: Date.now(),
          xp: totalXp,
          tone,
        });
        setTimeout(() => setXpFloat(null), 1500);
      }
      setStreak(nextStreak);

      // Choice popularity reveal, look up the rate for the choice we just
      // picked on the scene we're leaving. Suppressed on scenes with too
      // few aggregated picks (the API returns no entry, falling through
      // to null which the reveal component renders as nothing).
      const pickRate =
        popularityRates?.[state.currentSceneId]?.[choice.id] ?? null;
      setLastPickReveal({
        rate: pickRate,
        resetKey: `${state.currentSceneId}:${choice.id}:${Date.now()}`,
      });

      setState((prev) => {
        const next = applyChoice(scenario, prev, choice.id);
        return streakBonus > 0
          ? { ...next, xpEarned: next.xpEarned + streakBonus }
          : next;
      });
      setLineIndex(0);
    },
    [scenario, streak, state.currentSceneId, popularityRates],
  );

  const restart = useCallback(() => {
    completeFiredRef.current = false;
    setState(initState(scenario));
    setLineIndex(0);
    setStreak(0);
    setXpFloat(null);
    // Re-show the intro on replay so the player sees the "Replay"
    // framing + previous-best callout before diving back in.
    setShowIntro(true);
    // Reset the server-side progress row so a page refresh during the
    // replay doesn't snap back to the ending. Fire-and-forget: the
    // local reset above is what the player sees; this is just the
    // persistence catch-up. The server preserves completionCount and
    // endingsReached so the player keeps their record + ending
    // progress counter.
    fetch("/api/simulator/replay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scenarioId: scenario.id }),
    }).catch(() => {
      /* non-fatal — the local state is the source of truth during play */
    });
  }, [scenario]);

  // Exit button, small icon, top-right, above the letterbox. Shown on all
  // breakpoints but sized/positioned so it doesn't compete with content.
  // `href` returns to the scenario index. On mobile it's the primary way
  // out of the full-screen game (the site Header is now hidden behind the
  // portal). On desktop it's a quieter affordance.
  //
  // Mid-run confirmation: if the player has made at least one choice and
  // isn't on an ending screen, tapping Exit prompts before navigating.
  // Protects against accidental taps losing replay progress. Bumped to
  // 44×44 on all breakpoints for WCAG touch-target compliance.
  const router = useRouter();
  const isMidRun = !scene?.isEnding && state.choicesMade.length > 0;
  const handleExit = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isMidRun) return; // let the Link navigate normally
      e.preventDefault();
      const ok = window.confirm(
        "Exit this scenario? Your current run won't be saved.",
      );
      if (ok) router.push(exitHref);
    },
    [isMidRun, router, exitHref],
  );
  const exitButton = (
    <Link
      href={exitHref}
      onClick={handleExit}
      aria-label="Exit scenario"
      className="fixed top-[max(env(safe-area-inset-top),0.5rem)] right-[max(env(safe-area-inset-right),0.75rem)] z-[70] flex items-center justify-center w-11 h-11 rounded-full bg-deep-black/70 backdrop-blur-md border border-white/15 text-text-gray hover:text-accent-gold hover:border-accent-gold/40 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-black"
    >
      <X size={18} strokeWidth={1.5} />
    </Link>
  );

  // Tap-anywhere-to-advance.
  // During dialog playback, a click on the background (not on a
  // button or link, and not while choices are showing) should
  // advance the dialog the same way the Continue/Skip button does.
  // We dispatch a custom "simulator:tap" event and DialogBox listens
  //, keeps the typewriter skip-vs-advance logic in one place and
  // avoids lifting the typewriter hook up.
  //
  // Triple-defence against the 2026-04-25 stuck-on-scene-1 incident:
  //
  //   1. `lastDispatchAtRef`, wall-clock timestamp guard. IOS Safari
  //      can synthesise a `click` ~50–300ms after a `touchend`, so a
  //      single tap fires the handler twice. The timestamp guard
  //      drops any second event within 75ms of the first.
  //   2. `tapLockRef`, 500ms boolean lock that covers the
  //      AnimatePresence exit (350ms) plus scheduling slack, so
  //      a rapid second tap can't reach a stale DialogBox listener.
  //   3. We bind via `onPointerUp` (not `onClick`) on the game div —
  //      pointer events fire once per touch on every modern browser
  //      and don't get the synthesized-click follow-up.
  //
  // Hoisted above the `if (!scene)` / `if (scene.isEnding)` early
  // returns below so the hooks are called unconditionally on every
  // render (React's rules-of-hooks).
  const tapLockRef = useRef(false);
  const lastDispatchAtRef = useRef(0);
  const dispatchTap = useCallback(
    (source: "background" | "keyboard" | "skip-button") => {
      if (showChoices || showIntro) return;
      const now =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      // Timestamp dedupe, kills iOS double-fire (touchend + synthetic click).
      if (now - lastDispatchAtRef.current < 75) return;
      if (tapLockRef.current) return;
      lastDispatchAtRef.current = now;
      tapLockRef.current = true;
      // Telemetry breadcrumb, captured by Sentry on any later error and
      // visible in the dashboard regardless. Lets us reconstruct exactly
      // what scene + lineIndex the player was on when a loop is reported.
      try {
        Sentry.addBreadcrumb({
          category: "simulator.tap",
          level: "info",
          message: `tap (${source})`,
          data: {
            scenarioId: scenario.id,
            sceneId: scene?.id,
            lineIndex,
            choicesMade: state.choicesMade.length,
            tapCount: tapCountRef.current,
          },
        });
      } catch {
        // Sentry not initialized in dev, non-fatal.
      }
      tapCountRef.current += 1;
      window.dispatchEvent(new CustomEvent("simulator:tap"));
      window.setTimeout(() => {
        tapLockRef.current = false;
      }, 500);
    },
    [
      showChoices,
      showIntro,
      scenario.id,
      scene?.id,
      lineIndex,
      state.choicesMade.length,
    ],
  );

  const handleBackgroundTap = useCallback(
    (e: React.PointerEvent) => {
      const target = e.target as HTMLElement;
      // Never intercept clicks on interactive elements.
      if (target.closest("button, a")) return;
      dispatchTap("background");
    },
    [dispatchTap],
  );

  // Keep the keyboard handler's ref pointed at the latest dispatchTap.
  useEffect(() => {
    dispatchTapRef.current = dispatchTap;
  }, [dispatchTap]);

  // Reset tap counter + scene-entered timestamp whenever the scene changes.
  // This is the heartbeat for the stuck-detector: every fresh scene starts
  // a new 60s window, and a player who's progressing normally will reset
  // long before the recovery overlay shows.
  useEffect(() => {
    tapCountRef.current = 0;
    sceneEnteredAtRef.current = Date.now();
    setShowStuckRecovery(false);
    if (stuckCheckTimerRef.current) clearInterval(stuckCheckTimerRef.current);
    // Only arm the detector for non-ending dialog scenes. Endings have
    // their own UI; intro is gated separately.
    if (!scene || scene.isEnding) return;
    stuckCheckTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - sceneEnteredAtRef.current;
      // Trigger: been on this scene >60s, tapped >5 times, no progress.
      // The "no progress" check is on choicesMade for THIS scene, players
      // who've made earlier choices and are mid-scenario re-reading dialog
      // are not stuck.
      const sceneChoicesMade = state.choicesMade.filter(
        (c) => c.sceneId === scene.id,
      ).length;
      if (elapsed > 60_000 && tapCountRef.current > 5 && sceneChoicesMade === 0) {
        setShowStuckRecovery(true);
      }
    }, 5_000);
    return () => {
      if (stuckCheckTimerRef.current) clearInterval(stuckCheckTimerRef.current);
    };
    // We deliberately do NOT include state.choicesMade in deps, the
    // detector watches it by closure on each interval tick. Re-running
    // the effect on every choice would reset the timer mid-scene.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene?.id]);

  // Emergency-skip-to-choices. The reliable escape hatch: even if every
  // tap-handler is broken, this button advances state directly. Only shown
  // during the dialog phase of a non-ending scene that has choices.
  const skipDialogToChoices = useCallback(() => {
    if (!scene || scene.isEnding) return;
    if (!scene.choices || scene.choices.length === 0) {
      // No-choice scene, fall back to autoAdvance.
      setState((prev) => autoAdvance(scenario, prev));
      setLineIndex(0);
      return;
    }
    setLineIndex(scene.dialog?.length ?? 0);
    setShowStuckRecovery(false);
    try {
      Sentry.addBreadcrumb({
        category: "simulator.skip",
        level: "info",
        message: "emergency skip to choices",
        data: {
          scenarioId: scenario.id,
          sceneId: scene.id,
          tapCount: tapCountRef.current,
          msOnScene: Date.now() - sceneEnteredAtRef.current,
        },
      });
    } catch {
      // non-fatal
    }
  }, [scene, scenario]);

  if (!scene) {
    // Unknown scene id, bad data or tampered state. Fail gracefully.
    const missing = (
      <div className="fixed inset-0 z-[60] bg-deep-black flex items-center justify-center text-text-gray">
        {exitButton}
        <p className="text-sm">Scene missing. Restart the scenario.</p>
      </div>
    );
    if (!portalReady) return null;
    return createPortal(missing, document.body);
  }

  // Ending scene, dedicated cinematic layout
  if (scene.isEnding) {
    const ending = (
      <div className="fixed inset-0 z-[60] bg-deep-black overflow-y-auto">
        <MoodBackground mood={scene.mood ?? "mysterious"} />
        <Letterbox />
        {exitButton}
        <AnimatePresence mode="wait">
          <EndingScreen
            key={scene.id}
            scenario={scenario}
            scene={scene}
            state={state}
            badgesEarned={badgesEarned}
            nextScenarioHref={nextScenarioHref}
            customCta={endingCta}
            hideFailureBlog={hideFailureBlog}
            previousBest={previousBest}
            onRestart={restart}
          />
        </AnimatePresence>
      </div>
    );
    if (!portalReady) return null;
    return createPortal(ending, document.body);
  }

  // Dialog scene
  // Layout strategy: use absolute positioning instead of flex-col to
  // prevent dialog-to-choices transition from reflowing the character.
  //
  //   [ letterbox top ]        fixed, h-14/16
  //   [ scenario label ]       absolute top-20
  //   [ cast zone ]            absolute, centered between label and dialog
  //   [ dialog/choices zone ]  absolute bottom, min-height reserved so
  //                            choice cards don't push up the dialog above
  //
  // The whole thing is rendered through a portal to document.body so it
  // escapes the consilium layout's z-10 stacking context and properly
  // covers the site Header on every breakpoint (mobile in particular).
  // (Tap-anywhere-to-advance hook + handler are hoisted above the
  // early returns up top, see `tapLockRef` / `handleBackgroundTap`.)

  // Whether the dialog phase is active for this non-ending scene.
  // Used to gate the always-visible emergency skip-to-choices button —
  // if the player ever loops on dialog, they have one reliable escape.
  const inDialogPhase =
    !showIntro &&
    !showChoices &&
    !scene.isEnding &&
    !!scene.choices &&
    scene.choices.length > 0;

  const game = (
    <div
      // cursor-pointer signals "tap anywhere to advance" during dialog;
      // dropped during the choices phase so the game doesn't falsely
      // suggest the background is clickable when the actual action is
      // to pick a choice.
      //
      // Bound on `onPointerUp` (not `onClick`). IOS Safari emits a
      // synthesised `click` after `touchend` when the parent has
      // `cursor: pointer` set, that synthetic click was the prime
      // suspect for the 2026-04-25 stuck-on-scene-1 incident. Pointer
      // events fire once per touch on every modern engine and don't
      // get the synthesised follow-up.
      className={`fixed inset-0 z-[60] bg-deep-black overflow-hidden touch-manipulation ${
        showChoices ? "" : "cursor-pointer"
      }`}
      onPointerUp={handleBackgroundTap}
    >
      <MoodBackground mood={scene.mood} />
      <Letterbox />
      <ImmersionOverlay sceneId={scene.id} trigger={scene.immersionTrigger} />
      <SceneProgress scenario={scenario} state={state} />
      <StreakIndicator streak={streak} />
      {/* Brief social-proof reveal after a choice resolves —
          "Only 23% of players chose this." Suppresses on rare
          aggregations (<5 picks per scene). */}
      <ChoicePopularityReveal
        rate={lastPickReveal?.rate ?? null}
        resetKey={lastPickReveal?.resetKey ?? "none"}
      />
      {exitButton}
      <XpFloater
        show={!!xpFloat}
        xp={xpFloat?.xp ?? 0}
        tone={xpFloat?.tone}
      />
      <ScenarioIntro
        scenario={scenario}
        show={showIntro}
        previousBest={previousBest}
        onBegin={() => setShowIntro(false)}
      />

      {/* Emergency skip-to-choices affordance.
          Always rendered during the dialog phase of any choice-bearing
          scene. The reliable escape hatch, even if every tap-handler
          is broken, this button advances state directly via setLineIndex.
          Quiet styling so it doesn't compete with the typewriter, but
          always reachable. Top-left, opposite the exit button. */}
      {inDialogPhase && (
        <button
          type="button"
          onClick={skipDialogToChoices}
          aria-label="Skip dialog, go to choices"
          className="fixed top-[max(env(safe-area-inset-top),0.5rem)] left-[max(env(safe-area-inset-left),0.75rem)] z-[70] inline-flex items-center gap-1.5 px-3 h-11 rounded-full bg-deep-black/70 backdrop-blur-md border border-white/15 text-text-gray hover:text-accent-gold hover:border-accent-gold/40 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-black text-[10px] uppercase tracking-[0.25em]"
        >
          <FastForward size={12} strokeWidth={1.6} />
          Skip
        </button>
      )}

      {/* Stuck-recovery overlay.
          Shown automatically when a player has been on the same scene
          for >60s, tapped >5 times, and made zero choices on this scene.
          Offers the same skipDialogToChoices escape but with framing
          that makes the user feel acknowledged, "we noticed, here's
          the way out" beats a silent UI failure every time. */}
      {showStuckRecovery && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-deep-black/80 backdrop-blur-sm">
          <div className="max-w-sm w-full bg-gradient-to-br from-deep-burgundy/30 to-deep-navy/40 backdrop-blur-md border border-accent-gold/30 rounded-2xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-accent-gold/10 flex items-center justify-center">
                <AlertTriangle
                  className="w-5 h-5 text-accent-gold"
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <h3 className="text-text-light text-lg font-light tracking-wide mb-2">
              Looks like you&apos;re stuck.
            </h3>
            <p className="text-text-gray text-sm font-light leading-relaxed mb-6">
              The dialog should advance when you tap. If it&apos;s
              looping, jump straight to your choices.
            </p>
            <button
              type="button"
              onClick={skipDialogToChoices}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 bg-accent-gold text-deep-black font-medium rounded-full hover:bg-accent-gold/90 transition-all"
            >
              Skip to choices
              <FastForward size={14} strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => setShowStuckRecovery(false)}
              className="mt-3 text-text-gray/60 hover:text-text-gray text-xs font-light"
            >
              I&apos;m fine, dismiss
            </button>
          </div>
        </div>
      )}

      <SceneShake sceneId={scene.id} shake={scene.shakeOnEntry}>

      {/* Scenario label, absolute top, just under letterbox */}
      <div className="absolute top-[76px] sm:top-[88px] left-0 right-0 z-30 text-center px-4">
        <p className="text-accent-gold/60 text-[10px] uppercase tracking-[0.5em]">
          {scenario.title}
        </p>
        {/* Previous-best banner. Shows up on a replay so the player
            knows what they're gunning for. Drops out the moment the
            ending screen mounts (EndingScreen shows its own
            prior-best comparison). Only renders when a prior
            completion exists. */}
        {previousBest && !scene.isEnding && (
          <p className="mt-1 text-text-gray/60 text-[9px] uppercase tracking-[0.35em]">
            <span className="text-accent-gold/60">Replay</span>
            <span className="mx-1.5 text-text-gray/30">·</span>
            Best{" "}
            <span className="text-accent-gold/80 tabular-nums">
              {previousBest.xpEarned}
            </span>{" "}
            XP
            {previousBest.outcome && (
              <>
                <span className="mx-1.5 text-text-gray/30">·</span>
                {previousBest.outcome === "good" ||
                previousBest.outcome === "passed"
                  ? "Mastery"
                  : previousBest.outcome === "bad" ||
                      previousBest.outcome === "failed"
                    ? "Cost"
                    : "Outcome"}
              </>
            )}
          </p>
        )}
      </div>

      {/* Cast staging, absolute, centered between top label and dialog zone.
          - Solo scene (1 char): center, full size.
          - Group scene (2-3 chars): speaker center/forward, supporting
            cast left + right at 55% size and lower z-index. When the
            active speaker changes, the LAYOUT stays stable, we just
            re-rim-light who's talking. No character swap, no fade out,
            no scene cut. Film-grade continuity.
          Supporting cast uses `key={c.id}` only (not emotion-keyed) so
          they don't remount when speakers change. */}
      <div className="absolute inset-x-0 top-24 sm:top-28 bottom-[360px] sm:bottom-[320px] z-10 flex items-center justify-center px-4">
        {castCharacters.length === 1 ? (
          // Solo, just center it
          (() => {
            const c = castCharacters[0];
            const isSpeaker = activeCharacter?.id === c.id;
            return (
              <CharacterSilhouette
                key={c.id}
                character={c}
                emotion={isSpeaker ? currentLine?.emotion : c.defaultEmotion}
                intensity={isSpeaker ? 1 : 0.72}
                role="solo"
              />
            );
          })()
        ) : (
          // Group, speaker center, supporting cast at sides
          <div className="relative w-full max-w-3xl h-full flex items-center justify-center">
            {/* Supporting cast, positioned left/right, behind speaker */}
            {castCharacters
              .filter((c) => c.id !== activeCharacter?.id)
              .map((c, i, arr) => {
                const isOnlySupporting = arr.length === 1;
                const side =
                  isOnlySupporting || i === 1 ? "right" : "left";
                return (
                  <div
                    key={c.id}
                    className={`absolute bottom-4 ${
                      side === "left"
                        ? "left-0 sm:left-8"
                        : "right-0 sm:right-8"
                    } z-0`}
                  >
                    <CharacterSilhouette
                      character={c}
                      emotion={c.defaultEmotion}
                      intensity={0.65}
                      role="supporting"
                    />
                  </div>
                );
              })}
            {/* Active speaker, centered, forward */}
            {activeCharacter && (
              <div className="relative z-10">
                <CharacterSilhouette
                  key={activeCharacter.id}
                  character={activeCharacter}
                  emotion={currentLine?.emotion}
                  intensity={1}
                  role="speaker"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Dialog + choices, absolute bottom.
          When choices are shown, the last dialog line is echoed above them
          so the player can see what they're replying to. The echo is
          compact (no typewriter, no advance button, muted styling) to
          avoid competing visually with the choice cards.

          Anchored to the bottom via `justify-end` rather than centred:
          on mobile, 4-choice scenes with long tactic text overflow any
          fixed min-height. Centring then split the overflow above and
          below, pushing the echo up off-screen and the choice stack
          down behind the bottom letterbox. Justify-end keeps the
          choice cards pinned where the player expects them and lets
          the echo sit directly above, never covered.

          `max-h-[calc(...)]` caps the column at viewport-minus-letterbox-
          frames so the echo can never push past the top letterbox even
          on the tallest scenes; pair with `overflow-y-auto` so a 5-choice
          scene on a short viewport scrolls within the column rather than
          clipping silently.

          z-[35] sits above the scenario-title banner (z-30) so tall
          choice stacks, diagnostic scenes with long tactic text, and
          any scene with 4+ cards, paint cleanly over the title without
          the text bleeding through the cards' backdrop-blur. Still
          below the letterbox (z-40) so the top/bottom frame reads as
          the outermost layer. */}
      <div className="absolute inset-x-0 bottom-16 sm:bottom-20 z-[35] flex flex-col items-center justify-end gap-3 sm:gap-5 px-4 max-h-[calc(100dvh-180px)] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Last-line echo. Only renders during the choices phase.
            Sits above the choice cards, in its own slot, so it cannot
            be covered by the choices grid. Animates in once with the
            choices. */}
        {!showIntro && showChoices && scene.choices && lastDialogLine && (
          <m.div
            key={`echo-${scene.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="max-w-2xl w-full px-2 text-center"
          >
            {lastDialogLine.speakerId && (
              <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.35em] mb-1.5 font-light">
                {lastDialogLine.speakerId === "inner-voice"
                  ? "Inner voice"
                  : (characterById[lastDialogLine.speakerId]?.name ??
                    lastDialogLine.speakerId)}
              </p>
            )}
            <p
              className={`font-light leading-snug text-sm sm:text-base max-w-xl mx-auto ${
                lastDialogLine.speakerId == null
                  ? "italic text-text-gray/70"
                  : "text-white/75"
              }`}
            >
              {lastDialogLine.text}
            </p>
          </m.div>
        )}

        {/* One AnimatePresence with mode="wait" so the dialog→choices
            swap is sequential (dialog exits, then choices enter) instead
            of overlapping in the same vertical zone. */}
        <AnimatePresence mode="wait">
          {/* Suppress the dialog + choices column while the intro
              overlay is showing. Otherwise the typewriter races to
              completion behind the intro and the player hits Begin
              to find an already-revealed first line. */}
          {showIntro ? null : showChoices && scene.choices ? (
            <div className="w-full" key={`choices-wrap-${scene.id}`}>
              {/* Soft choice timer, only on `mood: danger` scenes. Fills
                  a slim 12s bar above the cards; never auto-picks. The
                  timer is a felt-pressure tool, not a mechanic. */}
              {scene.mood === "danger" && (
                <ChoiceTimer resetKey={scene.id} />
              )}
              <ChoiceCards
                key={`choices-${scene.id}`}
                choices={scene.choices}
                onPick={pickChoice}
                scenario={scenario}
              />
            </div>
          ) : currentLine ? (
            <DialogBox
              key={`line-${scene.id}-${lineIndex}`}
              line={currentLine}
              character={
                currentLine.speakerId
                  ? characterById[currentLine.speakerId]
                  : undefined
              }
              isLastLine={!!isLastLine}
              onAdvance={advanceLine}
              // Skip-scene shortcut, only offered on replays. Jumps
              // past every remaining dialog line in the current scene
              // straight to the choices (or triggers an auto-advance
              // for non-choice scenes). Saves the player from re-
              // reading dialog they've already seen. Does nothing on
              // endings, so safe to always offer when replaying.
              onSkipScene={
                previousBest
                  ? () => {
                      if (
                        scene.choices &&
                        scene.choices.length > 0
                      ) {
                        setLineIndex(totalLines);
                      } else {
                        setState((prev) => autoAdvance(scenario, prev));
                        setLineIndex(0);
                      }
                    }
                  : undefined
              }
            />
          ) : null}
        </AnimatePresence>
      </div>

      </SceneShake>
    </div>
  );

  if (!portalReady) return null;
  return createPortal(game, document.body);
}
