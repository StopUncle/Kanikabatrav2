"use client";

/**
 * Speed Drill, headless.
 *
 * Every bit of the game that is not pixels: the phase machine, the deck, the
 * clock, combos and milestones, the keyboard, and the one POST at the end.
 * Two screens render this (the legacy /consilium page and the app shell), so
 * the rules live in exactly one place.
 *
 * Deliberately NOT in here, because they belong to whoever is drawing:
 *  - locking body scroll
 *  - routing on exit
 *  - anything that renders
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DRILL_SECONDS,
  drawDeck,
  type DrillCard,
} from "@/lib/games/speed-drill/content";

export type DrillPhase = "intro" | "countdown" | "play" | "results";

export interface DrillAnswer {
  card: DrillCard;
  picked: boolean;
  correct: boolean;
  /** Time from the card appearing to the call, in ms. */
  answerMs: number;
}

/** What the completion endpoint hands back, when it hands anything back. */
export interface DrillServerResult {
  standing: {
    amount: number;
    /** The showing-up floor inside `amount`. */
    base: number;
    /** Full deck at 80 percent accuracy or better. */
    sharpBonus: number;
    /** Full deck, every call right. */
    perfectBonus: number;
    newStanding: number;
    /** Set only when this grant crossed a rank threshold. */
    rangUp: { fromLevel: number; toLevel: number; ringName: string } | null;
  } | null;
  streak: {
    current: number;
    longest: number;
    bumped: boolean;
  } | null;
}

export const MILESTONES: Record<number, string> = {
  3: "On a roll",
  5: "Sharp",
  7: "Ruthless",
  10: "Untouchable",
};

export const TIER_LABELS: Record<number, string> = {
  1: "Warm-up",
  2: "Sharp",
  3: "Ruthless",
};

/**
 * Tier 2 is the bank's centre of gravity, so every player starts at Sharp.
 * Adaptive difficulty (server-driven from recent accuracy) is a gameplay
 * change, not a presentation one, and stays out of scope here.
 */
export const DEFAULT_TIER = 2;

/** How long the correct/wrong flash holds before the next card. */
export const FLASH_MS = 430;

export function formatClock(seconds: number): string {
  const s = Math.max(0, seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export interface SpeedDrillState {
  phase: DrillPhase;
  deck: DrillCard[];
  index: number;
  /** The card on screen, or null between runs. */
  card: DrillCard | null;
  answers: DrillAnswer[];
  /** Set between a call and the next card appearing. */
  locked: { picked: boolean; correct: boolean } | null;
  combo: number;
  maxCombo: number;
  milestone: string | null;
  flash: "gold" | "burgundy" | null;
  clock: number;
  countNum: number;
  /** Bumped on each countdown step so the caller can restart an animation. */
  countdownTick: number;
  score: number;
  accuracy: number;
  /** Null until the completion POST resolves. Never blocks the results view. */
  server: DrillServerResult | null;
  start: () => void;
  answer: (picked: boolean) => void;
}

export function useSpeedDrill(): SpeedDrillState {
  const [phase, setPhase] = useState<DrillPhase>("intro");
  const [deck, setDeck] = useState<DrillCard[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<DrillAnswer[]>([]);
  const [locked, setLocked] = useState<{
    picked: boolean;
    correct: boolean;
  } | null>(null);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [milestone, setMilestone] = useState<string | null>(null);
  const [flash, setFlash] = useState<"gold" | "burgundy" | null>(null);
  const [clock, setClock] = useState(DRILL_SECONDS);
  const [countNum, setCountNum] = useState(3);
  const [countdownTick, setCountdownTick] = useState(0);
  const [runStartedAt, setRunStartedAt] = useState<number | null>(null);
  const [server, setServer] = useState<DrillServerResult | null>(null);

  /**
   * A ref, not state, and the distinction is load bearing. As state it would
   * be a dependency of the effect that sets it, so React would tear down and
   * re-run that effect mid-flight, and the cleanup would cancel the very
   * request it had just sent. The result came back to nobody.
   */
  const postedRef = useRef(false);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardShownAtRef = useRef(0);
  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      if (flashTimer.current) clearTimeout(flashTimer.current);
    };
  }, []);

  // Countdown: 3, 2, 1, GO.
  useEffect(() => {
    if (phase !== "countdown") return;
    setCountNum(3);
    setCountdownTick((t) => t + 1);
    let n = 3;
    const id = setInterval(() => {
      n -= 1;
      if (n < 0) {
        clearInterval(id);
        setPhase("play");
      } else {
        setCountNum(n);
        setCountdownTick((t) => t + 1);
      }
    }, 480);
    return () => clearInterval(id);
  }, [phase]);

  // The clock. Driven off wall time rather than tick counting, so a
  // backgrounded tab does not hand out extra seconds.
  useEffect(() => {
    if (phase !== "play") return;
    setClock(DRILL_SECONDS);
    const startedAt = Date.now();
    setRunStartedAt(startedAt);
    cardShownAtRef.current = startedAt;
    const id = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      const remaining = DRILL_SECONDS - elapsed;
      if (remaining <= 0) {
        clearInterval(id);
        setClock(0);
        setPhase("results");
      } else {
        setClock(remaining);
      }
    }, 250);
    return () => clearInterval(id);
  }, [phase]);

  const start = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setDeck(drawDeck(DEFAULT_TIER));
    setIndex(0);
    setAnswers([]);
    setLocked(null);
    setCombo(0);
    setMaxCombo(0);
    setMilestone(null);
    setFlash(null);
    setServer(null);
    postedRef.current = false;
    setPhase("countdown");
  }, []);

  const answer = useCallback(
    (picked: boolean) => {
      if (locked || phase !== "play") return;
      const card = deck[index];
      if (!card) return;
      const correct = picked === card.manipulative;
      const answerMs = Math.min(60_000, Date.now() - cardShownAtRef.current);

      setLocked({ picked, correct });
      setAnswers((prev) => [...prev, { card, picked, correct, answerMs }]);

      setFlash(correct ? "gold" : "burgundy");
      if (flashTimer.current) clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setFlash(null), FLASH_MS);

      if (correct) {
        const next = combo + 1;
        setCombo(next);
        setMaxCombo((m) => Math.max(m, next));
        const label = MILESTONES[next];
        if (label) {
          setMilestone(label);
          later(() => setMilestone(null), 1100);
        }
      } else {
        setCombo(0);
      }

      later(() => {
        setLocked(null);
        if (index >= deck.length - 1) setPhase("results");
        else {
          setIndex((i) => i + 1);
          cardShownAtRef.current = Date.now();
        }
      }, FLASH_MS);
    },
    [locked, phase, deck, index, combo, later],
  );

  // Keyboard: M or Left for manipulative, C or Right for clean.
  useEffect(() => {
    if (phase !== "play") return;
    const onKey = (e: KeyboardEvent) => {
      if (locked) return;
      const k = e.key.toLowerCase();
      if (k === "m" || e.key === "ArrowLeft") answer(true);
      else if (k === "c" || e.key === "ArrowRight") answer(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, locked, answer]);

  const score = answers.filter((a) => a.correct).length;
  const accuracy =
    answers.length > 0 ? Math.round((score / answers.length) * 100) : 0;

  // Report the run exactly once. The player's results never wait on this and
  // never break because of it: a failure just leaves `server` null.
  useEffect(() => {
    if (phase !== "results" || postedRef.current) return;
    postedRef.current = true;

    const durationSec = runStartedAt
      ? Math.min(300, Math.round((Date.now() - runStartedAt) / 1000) + 3)
      : DRILL_SECONDS;

    void (async () => {
      try {
        const res = await fetch("/api/games/speed-drill/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            score,
            totalCards: answers.length,
            accuracy,
            maxCombo,
            durationSec,
            tier: DEFAULT_TIER,
            answers: answers.map((a) => ({
              cardId: a.card.id,
              picked: a.picked,
              answerMs: a.answerMs,
            })),
          }),
        });
        if (!res.ok) return;
        const body = await res.json();
        setServer({
          standing: body?.standing ?? null,
          streak: body?.streak ?? null,
        });
      } catch {
        /* the player still sees their results */
      }
    })();
  }, [phase, answers, score, accuracy, maxCombo, runStartedAt]);

  return {
    phase,
    deck,
    index,
    card: deck[index] ?? null,
    answers,
    locked,
    combo,
    maxCombo,
    milestone,
    flash,
    clock,
    countNum,
    countdownTick,
    score,
    accuracy,
    server,
    start,
    answer,
  };
}
