"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DRILL_CARDS,
  DRILL_SECONDS,
} from "@/lib/games/speed-drill/content";
import {
  formatClock,
  useSpeedDrill,
} from "@/lib/games/speed-drill/use-speed-drill";
import { haptic } from "@/lib/haptics";
import Ceremony from "@/components/app-shell/juice/Ceremony";
import StatTile from "@/components/app-shell/juice/StatTile";
import { useCountUp } from "@/lib/hooks/use-count-up";
import DrillResults from "./DrillResults";

/**
 * Speed Drill in the app shell.
 *
 * The whole screen is the game: no tab bar, no chrome, one way out. The
 * everyday juice is quiet (a flash per call, a combo that pulses, the clock
 * bar draining) and all the weight is saved for the ceremony at the end.
 */

export interface DrillPersonalBest {
  bestScore: number | null;
  totalSessions: number;
}

function Headline({ score }: { score: number }) {
  const shown = useCountUp(score, { delayMs: 700, durationMs: 1000 });
  return (
    <>
      {shown}
      <span className="text-app-hero text-[var(--app-dim)]">/{DRILL_CARDS}</span>
    </>
  );
}

/** Kanika's line on the result. Earned, never congratulatory by default. */
function voiceFor(score: number, isBest: boolean): string {
  if (isBest) return "Better than you have ever done it. Do it again tomorrow.";
  if (score >= 9) return "That is the instinct doing the work, not the thinking.";
  if (score >= 7) return "Solid. The ones you missed are the ones built to be missed.";
  if (score >= 5) return "Half. Which means half of them still get through.";
  return "Slow down and you will get them. Speed comes after.";
}

export default function DrillScreen({
  personalBest,
}: {
  personalBest: DrillPersonalBest;
}) {
  const router = useRouter();
  const drill = useSpeedDrill();
  const [ceremony, setCeremony] = useState<"score" | "rank" | null>(null);
  const [seenCeremony, setSeenCeremony] = useState(false);

  // Track the best across this mount too, so a replay does not re-fire the
  // personal-best moment it already earned a minute ago.
  const [sessionBest, setSessionBest] = useState(personalBest.bestScore ?? 0);

  const immersive =
    drill.phase === "countdown" || drill.phase === "play";

  // Hold the page still while the game owns the screen.
  useEffect(() => {
    if (!immersive) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [immersive]);

  // The run ended: open the moment.
  useEffect(() => {
    if (drill.phase !== "results" || seenCeremony) return;
    setSeenCeremony(true);
    setCeremony("score");
  }, [drill.phase, seenCeremony]);

  const isBest =
    personalBest.totalSessions > 0 && drill.score > sessionBest;
  const rangUp = drill.server?.standing?.rangUp ?? null;

  const closeScore = () => {
    setSessionBest((b) => Math.max(b, drill.score));
    // A rank-up is a bigger event than a score, so it gets its own moment
    // rather than being crammed into the first one as a footnote.
    setCeremony(rangUp ? "rank" : null);
  };

  const replay = () => {
    setSeenCeremony(false);
    setCeremony(null);
    drill.start();
  };

  // ---- Intro ---------------------------------------------------------------

  if (drill.phase === "intro") {
    return (
      <div className="flex min-h-full flex-col px-6 pb-[max(24px,env(safe-area-inset-bottom))] pt-6">
        <div className="flex justify-end">
          <Link
            href="/app/train"
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--app-dim)]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </Link>
        </div>

        <div className="flex flex-1 flex-col justify-center">
          <p className="mb-3 text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]">
            Speed drill
          </p>
          <h1
            className="text-[34px] font-light leading-[1.1]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ten lines.
            <br />
            Sixty seconds.
          </h1>
          <p className="mt-4 max-w-[300px] text-app-lead leading-relaxed text-[var(--app-muted)]">
            Each card is something someone said. Call it: manipulation, or
            clean. Trust the first instinct, because in the room that is all
            you get.
          </p>

          {personalBest.totalSessions > 0 && (
            <div className="mt-7 flex items-center gap-6">
              <span className="flex items-baseline gap-1.5">
                <span
                  className="text-app-display tabular-nums text-[var(--app-gold)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {personalBest.bestScore ?? 0}/{DRILL_CARDS}
                </span>
                <span className="text-app-tiny uppercase tracking-app-wide text-[var(--app-dim)]">
                  your best
                </span>
              </span>
              <span className="flex items-baseline gap-1.5">
                <span
                  className="text-app-display tabular-nums text-[var(--app-text)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {personalBest.totalSessions}
                </span>
                <span className="text-app-tiny uppercase tracking-app-wide text-[var(--app-dim)]">
                  plays
                </span>
              </span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            haptic("select");
            drill.start();
          }}
          className="w-full rounded-full bg-[var(--app-gold)] py-4 text-app-body font-semibold uppercase tracking-app-wide text-[var(--app-on-gold)] transition-transform active:scale-[0.97]"
        >
          Start
        </button>
      </div>
    );
  }

  // ---- Countdown -----------------------------------------------------------

  if (drill.phase === "countdown") {
    return (
      <div className="flex min-h-full items-center justify-center">
        <span
          key={drill.countdownTick}
          className="app-pop-in text-[86px] font-light leading-none text-[var(--app-gold)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {drill.countNum === 0 ? "GO" : drill.countNum}
        </span>
      </div>
    );
  }

  // ---- Play ----------------------------------------------------------------

  if (drill.phase === "play") {
    const remaining = drill.clock / DRILL_SECONDS;
    const urgent = drill.clock <= 10;

    return (
      <div className="relative flex min-h-full flex-col overflow-hidden">
        {/* Call feedback. Opacity only, so it composites cheaply. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-200"
          style={{
            opacity: drill.flash ? 1 : 0,
            background:
              drill.flash === "gold"
                ? "radial-gradient(120% 80% at 50% 100%, rgba(212,175,55,0.28), transparent 70%)"
                : "radial-gradient(120% 80% at 50% 100%, rgba(114,33,57,0.42), transparent 70%)",
          }}
        />

        <div className="px-5 pt-5">
          <div className="flex items-center justify-between">
            <Link
              href="/app/train"
              aria-label="Leave the drill"
              className="text-[var(--app-dim)]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </Link>
            <span
              className={`text-app-title tabular-nums ${
                urgent ? "text-[var(--app-rose)]" : "text-[var(--app-text)]"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {formatClock(drill.clock)}
            </span>
            <span className="text-app-caption tabular-nums text-[var(--app-dim)]">
              {Math.min(drill.index + 1, drill.deck.length)}/{drill.deck.length}
            </span>
          </div>

          <div className="mt-3 h-[2px] overflow-hidden rounded-full bg-[rgba(212,175,55,0.14)]">
            <div
              className="h-full rounded-full transition-[width] duration-1000 ease-linear"
              style={{
                width: `${remaining * 100}%`,
                background: urgent ? "var(--app-rose)" : "var(--app-gold)",
              }}
            />
          </div>
        </div>

        {/* Combo and milestone live inline rather than as floating toasts:
            a fixed overlay would escape the phone column on desktop. */}
        <div className="flex h-8 items-center justify-center">
          {drill.milestone ? (
            <span className="app-pop-in text-app-caption uppercase tracking-app-label text-[var(--app-gold)]">
              {drill.milestone}
            </span>
          ) : drill.combo >= 2 ? (
            <span className="text-app-caption uppercase tracking-app-wide text-[var(--app-gold-soft)]">
              {drill.combo} in a row
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 items-center px-6">
          <p
            key={drill.card?.id ?? drill.index}
            className="app-rise text-app-display leading-[1.35]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {drill.card?.line}
          </p>
        </div>

        {/* After a call, the card's real tactic is named for a beat. This is
            the actual teaching moment in the whole game. */}
        <div className="flex h-9 items-center justify-center px-6">
          {drill.locked && drill.card && (
            <span
              className={`app-rise text-center text-app-caption ${
                drill.locked.correct
                  ? "text-[var(--app-green)]"
                  : "text-[var(--app-rose)]"
              }`}
            >
              {drill.locked.correct ? "Right" : "Wrong"}
              {" · "}
              <span className="text-[var(--app-muted)]">
                {drill.card.manipulative ? drill.card.tag : "Clean"}
              </span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 px-5 pb-[max(20px,env(safe-area-inset-bottom))]">
          <button
            type="button"
            disabled={Boolean(drill.locked)}
            onClick={() => {
              haptic("tick");
              drill.answer(true);
            }}
            className="rounded-2xl border border-[rgba(183,110,121,0.4)] bg-[rgba(183,110,121,0.08)] py-5 text-app-caption font-semibold uppercase tracking-app-wide text-[var(--app-rose)] transition-transform active:scale-[0.96] disabled:opacity-50"
          >
            Manipulation
          </button>
          <button
            type="button"
            disabled={Boolean(drill.locked)}
            onClick={() => {
              haptic("tick");
              drill.answer(false);
            }}
            className="rounded-2xl border border-[rgba(127,184,144,0.4)] bg-[rgba(127,184,144,0.08)] py-5 text-app-caption font-semibold uppercase tracking-app-wide text-[var(--app-green)] transition-transform active:scale-[0.96] disabled:opacity-50"
          >
            Clean
          </button>
        </div>
      </div>
    );
  }

  // ---- Results -------------------------------------------------------------

  return (
    <>
      <DrillResults
        answers={drill.answers}
        score={drill.score}
        accuracy={drill.accuracy}
        maxCombo={drill.maxCombo}
        standing={drill.server?.standing?.amount ?? null}
        onReplay={replay}
      />

      <Ceremony
        open={ceremony === "score"}
        onDismiss={closeScore}
        delayMs={220}
        eyebrow={isBest ? "New personal best" : "Speed drill"}
        headline={<Headline score={drill.score} />}
        subline={`${drill.accuracy}% accuracy, best run of ${drill.maxCombo}.`}
        voice={voiceFor(drill.score, isBest)}
        action={{ label: "See the misses" }}
        secondary={{ label: "Run it again", onClick: replay }}
      >
        <div className="grid grid-cols-3 gap-2.5">
          <StatTile
            value={drill.accuracy}
            label="accuracy"
            suffix="%"
            delayMs={1150}
          />
          <StatTile
            value={drill.maxCombo}
            label="best run"
            tone="rose"
            delayMs={1250}
          />
          <StatTile
            value={drill.server?.standing?.amount ?? 0}
            label="Standing"
            tone="green"
            delayMs={1350}
          />
        </div>
      </Ceremony>

      <Ceremony
        open={ceremony === "rank"}
        onDismiss={() => setCeremony(null)}
        eyebrow="You moved inward"
        headline={rangUp?.ringName ?? ""}
        subline="A new rank. Standing carried you here."
        voice="Most people never get past the door."
        action={{
          label: "See what opened",
          onClick: () => router.push("/app/you"),
        }}
        secondary={{ label: "Later" }}
      />
    </>
  );
}
