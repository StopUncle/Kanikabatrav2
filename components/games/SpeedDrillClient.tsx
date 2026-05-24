"use client";

/**
 * Speed Drill — web port of dark-mirror-app/src/games/SpeedDrill/SpeedDrill.tsx.
 *
 * Ten cards drawn from a 53-card bank. Sixty seconds. Binary call per card:
 * manipulation, or clean. Combos at 3/5/7/10 fire milestone callouts. The
 * timer auto-ends to results when it runs out.
 *
 * The original is React Native; this is the Tailwind + CSS-transition
 * equivalent. Animation is done with class toggles and `transition-*` rather
 * than the RN `Animated` API. The game-feel intent is preserved: countdown
 * pop, card slide-in, flash overlay on each call, count-up on results.
 *
 * Daily training:
 *   - The first session of a UTC calendar day counts for the games streak.
 *   - Replays the same day are practice (still recorded, no streak change).
 *   - The streak update happens server-side in /api/games/speed-drill/complete.
 *
 * Keyboard:
 *   - M / Left arrow → Manipulative
 *   - C / Right arrow → Clean
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Flame, ArrowRight, RotateCcw } from "lucide-react";
import {
  DRILL_BANK,
  DRILL_CARDS,
  DRILL_SECONDS,
  drawDeck,
  type DrillCard,
} from "@/lib/games/speed-drill/content";

type Phase = "intro" | "countdown" | "play" | "results";

interface Answered {
  card: DrillCard;
  picked: boolean;
  correct: boolean;
}

const MILESTONES: Record<number, string> = {
  3: "On a roll",
  5: "Sharp",
  7: "Ruthless",
  10: "Untouchable",
};

const TIER_LABELS: Record<number, string> = {
  1: "Warm-up",
  2: "Sharp",
  3: "Ruthless",
};

// Tier 2 is the default web target. Adaptive difficulty (server-driven from
// recent accuracy) is a future improvement; for v1 every player starts at
// Sharp, which is the bank's centre of gravity.
const DEFAULT_TIER = 2;

const FLASH_MS = 430;

function formatClock(seconds: number): string {
  const s = Math.max(0, seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export default function SpeedDrillClient() {
  const router = useRouter();

  const [phase, setPhase] = useState<Phase>("intro");
  const [deck, setDeck] = useState<DrillCard[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answered[]>([]);
  const [locked, setLocked] = useState<{ picked: boolean; correct: boolean } | null>(
    null,
  );
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [milestone, setMilestone] = useState<string | null>(null);
  const [flash, setFlash] = useState<"gold" | "burgundy" | null>(null);
  const [clock, setClock] = useState(DRILL_SECONDS);
  const [countNum, setCountNum] = useState(3);
  const [countdownTick, setCountdownTick] = useState(0); // forces re-animation
  const [runStartedAt, setRunStartedAt] = useState<number | null>(null);
  const [posted, setPosted] = useState(false);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  // Clear pending timers on unmount.
  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
      if (flashTimer.current) clearTimeout(flashTimer.current);
    };
  }, []);

  // Lock body scroll while the full-screen phases are active so the
  // sticky member nav (z-30) can't bleed in over the game. Intro,
  // countdown, and play all run as fixed inset-0 overlays; results
  // is a normal scrollable page that needs the body scroll back.
  useEffect(() => {
    const lock = phase === "intro" || phase === "countdown" || phase === "play";
    const prev = document.body.style.overflow;
    if (lock) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

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

  // Per-second countdown clock for the play phase. The timer bar (CSS
  // transition on a width property) does the visual; this state drives the
  // numeric readout and the auto-end-to-results when the timer expires.
  useEffect(() => {
    if (phase !== "play") return;
    setClock(DRILL_SECONDS);
    const startedAt = Date.now();
    setRunStartedAt(startedAt);
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

  // Keyboard handlers during play.
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, locked, deck, index]);

  function startRun() {
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
    setPosted(false);
    setPhase("countdown");
  }

  function fireFlash(correct: boolean) {
    setFlash(correct ? "gold" : "burgundy");
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(null), 430);
  }

  function answer(picked: boolean) {
    if (locked || phase !== "play") return;
    const card = deck[index];
    if (!card) return;
    const correct = picked === card.manipulative;
    setLocked({ picked, correct });
    setAnswers((prev) => [...prev, { card, picked, correct }]);
    fireFlash(correct);

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
      else setIndex((i) => i + 1);
    }, FLASH_MS);
  }

  // POST results once when the run ends.
  useEffect(() => {
    if (phase !== "results" || posted) return;
    setPosted(true);
    const score = answers.filter((a) => a.correct).length;
    const totalCards = answers.length;
    const accuracy =
      totalCards > 0 ? Math.round((score / totalCards) * 100) : 0;
    const durationSec = runStartedAt
      ? Math.min(300, Math.round((Date.now() - runStartedAt) / 1000) + 3) // +3 for countdown
      : DRILL_SECONDS;
    void fetch("/api/games/speed-drill/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        score,
        totalCards,
        accuracy,
        maxCombo,
        durationSec,
        tier: DEFAULT_TIER,
      }),
    }).catch(() => {
      // Non-fatal: the player still sees their results.
    });
  }, [phase, posted, answers, maxCombo, runStartedAt]);

  // ---- Render ---------------------------------------------------------------

  if (phase === "intro") return <Intro tier={DEFAULT_TIER} onBegin={startRun} />;
  if (phase === "countdown")
    return <Countdown count={countNum} tick={countdownTick} />;
  if (phase === "results")
    return (
      <Results
        answers={answers}
        maxCombo={maxCombo}
        onPlayAgain={startRun}
        onExit={() => router.push("/consilium/games")}
      />
    );

  // Play phase
  const card = deck[index];
  const low = clock <= 10;
  const timerProgress = Math.max(0, Math.min(1, clock / DRILL_SECONDS));

  return (
    <div className="fixed inset-0 z-50 bg-deep-black flex flex-col text-white">
      {/* Timer bar */}
      <div className="h-1 bg-white/5">
        <div
          className={`h-full transition-[width,background-color] duration-1000 ease-linear ${
            low ? "bg-burgundy" : "bg-warm-gold"
          }`}
          style={{ width: `${timerProgress * 100}%` }}
        />
      </div>

      {/* Head row */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <Link
          href="/consilium/games"
          aria-label="Close"
          className="p-2 -ml-2 text-text-gray/70 hover:text-warm-gold transition-colors"
        >
          <X size={18} strokeWidth={1.6} />
        </Link>
        <span className="text-bone tracking-[0.2em] text-sm tabular-nums">
          {String(index + 1).padStart(2, "0")} / {DRILL_CARDS}
        </span>
        <span
          className={`text-base tabular-nums tracking-wide w-14 text-right transition-colors ${
            low ? "text-burgundy animate-pulse" : "text-warm-gold"
          }`}
        >
          {formatClock(clock)}
        </span>
      </div>

      {/* Combo / milestone zone */}
      <div className="h-8 flex items-center justify-center">
        {milestone ? (
          <p
            key={milestone}
            className="text-warm-gold italic text-lg tracking-wide animate-[fadeInUp_300ms_ease-out]"
          >
            {milestone}
          </p>
        ) : combo >= 2 ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warm-gold/10 text-warm-gold text-[11px] uppercase tracking-[0.18em]">
            <Flame size={11} strokeWidth={2} />
            {combo} streak
          </span>
        ) : null}
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
        {card && (
          <p
            key={index}
            className="text-text-light text-xl sm:text-2xl md:text-3xl text-center leading-relaxed font-light max-w-3xl animate-[fadeInUp_260ms_ease-out]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {card.line}
          </p>
        )}
      </div>

      {/* Call buttons */}
      <div className="flex gap-3 px-4 sm:px-6 pb-6 sm:pb-8">
        <CallButton
          label="Manipulative"
          shortcut="M"
          isCorrectAnswer={card?.manipulative === true}
          locked={locked}
          isPicked={locked?.picked === true}
          onPress={() => answer(true)}
        />
        <CallButton
          label="Clean"
          shortcut="C"
          isCorrectAnswer={card?.manipulative === false}
          locked={locked}
          isPicked={locked?.picked === false}
          onPress={() => answer(false)}
        />
      </div>

      {/* Flash overlay */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 z-[60] transition-opacity duration-300 ${
          flash ? "opacity-40" : "opacity-0"
        } ${flash === "gold" ? "bg-warm-gold" : flash === "burgundy" ? "bg-burgundy" : ""}`}
      />

      {/* Keyframes for card / milestone fade-up */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

// =============================================================================
// Sub-components
// =============================================================================

function Intro({ tier, onBegin }: { tier: number; onBegin: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-deep-black flex flex-col text-white">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <Link
          href="/consilium/games"
          aria-label="Close"
          className="p-2 -ml-2 text-text-gray/70 hover:text-warm-gold transition-colors"
        >
          <X size={18} strokeWidth={1.6} />
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1
          className="text-4xl sm:text-5xl font-light tracking-wide text-white mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Speed Drill
        </h1>
        <div className="w-10 h-px bg-warm-gold/40 my-4" />
        <p
          className="text-warm-gold text-xl mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Ten calls. Sixty seconds.
        </p>
        <p className="text-text-gray/80 text-sm sm:text-base font-light leading-relaxed max-w-md mb-8">
          Each card is one line someone said to you. Manipulation, or clean?
          Trust the first instinct. Strings of correct calls build a combo
          and a milestone callout.
        </p>
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-text-gray/70 mb-2">
          <span>{DRILL_CARDS} cards</span>
          <span className="text-text-gray/30">·</span>
          <span>{DRILL_SECONDS} sec</span>
          <span className="text-text-gray/30">·</span>
          <span>Decode</span>
        </div>
        <p className="text-warm-gold text-[10px] uppercase tracking-[0.25em]">
          Calibrated to you: {TIER_LABELS[tier] ?? "Sharp"}
        </p>
        <p className="text-text-gray/40 text-[10px] tracking-wider mt-6">
          Keyboard: M = manipulative · C = clean
        </p>
      </div>

      <div className="px-6 pb-8">
        <button
          onClick={onBegin}
          className="w-full max-w-md mx-auto block py-4 rounded-full bg-warm-gold text-deep-black font-medium tracking-[0.2em] uppercase text-sm transition-all hover:bg-warm-gold/90 hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.55)]"
        >
          Begin
        </button>
      </div>
    </div>
  );
}

function Countdown({ count, tick }: { count: number; tick: number }) {
  return (
    <div className="fixed inset-0 z-50 bg-deep-black flex items-center justify-center">
      <span
        key={tick}
        className="text-warm-gold text-[140px] tracking-wider font-light leading-none animate-[countPop_460ms_ease-out]"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {count === 0 ? "GO" : count}
      </span>
      <style jsx global>{`
        @keyframes countPop {
          0% {
            opacity: 0;
            transform: scale(0.6);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

function CallButton({
  label,
  shortcut,
  isCorrectAnswer,
  locked,
  isPicked,
  onPress,
}: {
  label: string;
  shortcut: string;
  isCorrectAnswer: boolean;
  locked: { picked: boolean; correct: boolean } | null;
  isPicked: boolean;
  onPress: () => void;
}) {
  let tone = "bg-white/[0.03] border-warm-gold/15 text-text-light hover:border-warm-gold/40 hover:bg-warm-gold/[0.04]";
  let mark = "";
  if (locked) {
    if (isCorrectAnswer) {
      tone =
        "bg-warm-gold/15 border-warm-gold/60 text-warm-gold ring-1 ring-warm-gold/30";
      mark = "✓";
    } else if (isPicked) {
      tone = "bg-burgundy/25 border-burgundy/70 text-burgundy/90";
      mark = "✗";
    } else {
      tone = "bg-white/[0.02] border-white/5 text-text-gray/40";
    }
  }

  return (
    <button
      onClick={onPress}
      disabled={locked != null}
      className={`flex-1 h-28 sm:h-32 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all duration-200 disabled:cursor-default active:scale-[0.97] ${tone}`}
    >
      <span className="text-lg sm:text-xl tracking-wide">{label}</span>
      <span className="text-[10px] tracking-[0.3em] uppercase opacity-50">
        {shortcut}
      </span>
      {mark && <span className="text-2xl absolute mt-12">{mark}</span>}
    </button>
  );
}

function Results({
  answers,
  maxCombo,
  onPlayAgain,
  onExit,
}: {
  answers: Answered[];
  maxCombo: number;
  onPlayAgain: () => void;
  onExit: () => void;
}) {
  const score = answers.filter((a) => a.correct).length;
  const answered = answers.length;
  const accuracy = answered > 0 ? Math.round((score / answered) * 100) : 0;
  const missed = useMemo(() => answers.filter((a) => !a.correct), [answers]);

  // Simple count-up for the score.
  const [shownScore, setShownScore] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const duration = 620;
    const id = setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / duration);
      setShownScore(Math.round(score * t));
      if (t >= 1) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [score]);

  return (
    <div className="min-h-screen bg-deep-black text-white px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <p className="text-warm-gold/60 uppercase tracking-[0.3em] text-[10px] text-center mb-6">
          Speed Drill
        </p>

        <div className="flex items-end justify-center gap-2 mb-2">
          <span
            className="text-warm-gold text-7xl sm:text-8xl font-light leading-none tabular-nums"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {shownScore}
          </span>
          <span
            className="text-text-gray/60 text-3xl pb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            / {answered}
          </span>
        </div>
        <p className="text-text-gray/70 uppercase tracking-[0.25em] text-[10px] text-center">
          Clean calls
        </p>

        <div className="flex items-center justify-center gap-3 mt-6 text-[11px] uppercase tracking-[0.2em] text-text-gray/70">
          <span>{accuracy}% accuracy</span>
          <span className="text-text-gray/30">·</span>
          <span>best streak {maxCombo}</span>
        </div>

        {missed.length === 0 && answered > 0 && (
          <p
            className="text-warm-gold italic text-center text-base mt-10"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            A clean sweep. Nothing got past you.
          </p>
        )}

        {missed.length > 0 && (
          <div className="mt-12">
            <p className="text-warm-gold/60 uppercase tracking-[0.3em] text-[10px] mb-4">
              What slipped past
            </p>
            <div className="space-y-2">
              {missed.map((m) => (
                <div
                  key={m.card.id}
                  className="p-4 rounded-lg border border-white/5 bg-white/[0.02]"
                >
                  <p
                    className="text-text-light italic text-sm leading-relaxed"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    &ldquo;{m.card.line}&rdquo;
                  </p>
                  <p className="text-burgundy/80 text-[10px] uppercase tracking-[0.2em] mt-2">
                    {m.card.tag}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex flex-col gap-3">
          <button
            onClick={onPlayAgain}
            className="w-full py-3.5 rounded-full bg-warm-gold text-deep-black font-medium tracking-[0.2em] uppercase text-sm transition-all hover:bg-warm-gold/90 inline-flex items-center justify-center gap-2"
          >
            <RotateCcw size={14} strokeWidth={2} />
            Run it again
          </button>
          <button
            onClick={onExit}
            className="w-full py-3.5 rounded-full border border-warm-gold/30 text-warm-gold tracking-[0.2em] uppercase text-sm transition-all hover:bg-warm-gold/5 inline-flex items-center justify-center gap-2"
          >
            Done
            <ArrowRight size={14} strokeWidth={2} />
          </button>
        </div>

        {/* Hidden silence to satisfy unused-bank-import lint if it triggers */}
        <span className="sr-only">{DRILL_BANK.length} cards in the bank</span>
      </div>
    </div>
  );
}
