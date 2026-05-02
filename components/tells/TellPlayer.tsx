"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Check, X } from "lucide-react";
import type { Tell, TellArtifact, TellChoice } from "@/lib/tells/types";
import { TRACK_LABELS, AXIS_LABELS } from "@/lib/tells/types";
import {
  EMPTY_STREAK,
  complete,
  loadStreak,
  reconcile,
  saveStreak,
  type CompletionDelta,
  type StreakState,
} from "@/lib/tells/streak";
import StreakBadge from "./StreakBadge";

interface ServerAnswerResult {
  correct: boolean;
  scoreImpact: number;
  isReplay: boolean;
  countedStreak: boolean;
  streak: {
    currentDays: number;
    longestDays: number;
    freezesAvail: number;
    freezeUsed: boolean;
  } | null;
}

/**
 * TellPlayer, the spike-phase orchestrator.
 *
 * Renders one Tell end-to-end: artifact → choices → reveal. No
 * persistence, no score, no streak in this build. Once the loop
 * is approved, the answer-submit becomes a POST and the reveal
 * gets a score-delta float.
 *
 * Motion respects prefers-reduced-motion via framer-motion's built-in
 * MotionConfig in the parent layout.
 */
export default function TellPlayer({ tell }: { tell: Tell }) {
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [streak, setStreak] = useState<StreakState>(EMPTY_STREAK);
  const [hydrated, setHydrated] = useState(false);
  const [delta, setDelta] = useState<CompletionDelta | null>(null);
  const [serverResult, setServerResult] = useState<ServerAnswerResult | null>(
    null,
  );
  const startedAtRef = useRef<number>(Date.now());

  // Hydrate the streak from localStorage on mount, then reconcile
  // against today (apply freeze or reset if days were missed).
  useEffect(() => {
    startedAtRef.current = Date.now();
    const loaded = loadStreak();
    const reconciled = reconcile(loaded);
    setStreak(reconciled);
    setHydrated(true);
    if (reconciled !== loaded) saveStreak(reconciled);

    // If today's Tell has already been completed, hop straight to
    // the reveal so refreshes don't reset the user's progress.
    if (reconciled.completedTellId === tell.id) {
      const correct = tell.choices.find((c) => c.isCorrect);
      if (correct) setPickedId(correct.id);
    }
  }, [tell.id, tell.choices]);

  function handlePick(choiceId: string) {
    if (pickedId !== null) return;
    setPickedId(choiceId);

    // Optimistic local streak update — works offline, works for
    // anonymous visitors, never blocks the reveal.
    const result = complete(streak, tell.id);
    setStreak(result.state);
    setDelta(result.delta);
    saveStreak(result.state);
    if (result.delta.kind === "extended") {
      window.setTimeout(() => setDelta(null), 1200);
    }

    // Authoritative server submit. Failures are non-fatal; the local
    // reveal is already rendering. We use the server response to
    // overlay score-delta and authoritative streak when the user is
    // logged in.
    const answerMs = Math.max(0, Date.now() - startedAtRef.current);
    fetch(`/api/tells/${encodeURIComponent(tell.id)}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ choiceId, answerMs }),
    })
      .then(async (res) => {
        if (!res.ok) return null;
        return (await res.json()) as ServerAnswerResult;
      })
      .then((data) => {
        if (data) setServerResult(data);
      })
      .catch(() => {
        // Silent. Local UX continues.
      });
  }

  const revealed = pickedId !== null;
  const correctChoice = tell.choices.find((c) => c.isCorrect)!;
  const pickedChoice = pickedId
    ? tell.choices.find((c) => c.id === pickedId) ?? null
    : null;
  const isCorrect = pickedChoice?.isCorrect ?? false;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-6">
        <StreakBadge state={streak} hydrated={hydrated} delta={delta} />
      </div>

      <TellHeader tell={tell} />

      <TellArtifactView artifact={tell.artifact} />

      <h2 className="text-text-light text-lg sm:text-xl font-light mt-10 mb-5 leading-snug">
        {tell.question}
      </h2>

      <TellChoicesView
        choices={tell.choices}
        pickedId={pickedId}
        onPick={handlePick}
        revealed={revealed}
      />

      <AnimatePresence>
        {revealed && (
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <TellRevealView
              tell={tell}
              picked={pickedChoice!}
              correct={correctChoice}
              isCorrect={isCorrect}
              serverResult={serverResult}
            />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Header                                                                     */
/* -------------------------------------------------------------------------- */

function TellHeader({ tell }: { tell: Tell }) {
  return (
    <div className="mb-8">
      <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.4em] mb-3">
        Tell {String(tell.number).padStart(3, "0")} &middot;{" "}
        {TRACK_LABELS[tell.track]}
      </p>
      <h1 className="text-2xl sm:text-3xl font-extralight tracking-wider uppercase text-text-light">
        Today&rsquo;s Tell
      </h1>
      <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-text-gray">
        <span>Trains:</span>
        {tell.axes.map((a) => (
          <span
            key={a}
            className="px-2 py-0.5 border border-accent-gold/30 rounded text-accent-gold/80"
          >
            {AXIS_LABELS[a]}
          </span>
        ))}
        <span className="ml-auto opacity-60">
          {"●".repeat(tell.difficulty)}
          <span className="opacity-30">
            {"●".repeat(5 - tell.difficulty)}
          </span>
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Artifact                                                                   */
/* -------------------------------------------------------------------------- */

function TellArtifactView({ artifact }: { artifact: TellArtifact }) {
  if (artifact.kind === "voicemail") {
    return (
      <div className="rounded-lg border border-gray-800 bg-deep-black/60 p-6 sm:p-8">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-text-gray mb-4">
          <span>Voicemail &middot; {artifact.speakerLabel}</span>
          {artifact.durationLabel && <span>{artifact.durationLabel}</span>}
        </div>
        <p
          className="text-text-light leading-relaxed font-light text-base sm:text-lg"
          style={{ fontFamily: "Georgia, serif" }}
        >
          &ldquo;{artifact.transcript}&rdquo;
        </p>
      </div>
    );
  }

  if (artifact.kind === "text-exchange") {
    return (
      <div className="rounded-lg border border-gray-800 bg-deep-black/60 p-5 sm:p-7">
        {artifact.label && (
          <p className="text-[10px] uppercase tracking-[0.3em] text-text-gray mb-4">
            {artifact.label}
          </p>
        )}
        <div className="space-y-2.5">
          {artifact.lines.map((line, i) => (
            <div
              key={i}
              className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm sm:text-base leading-relaxed ${
                line.from === "them"
                  ? "bg-gray-800/60 text-text-light rounded-bl-sm"
                  : "bg-accent-burgundy/40 text-text-light rounded-br-sm ml-auto"
              }`}
            >
              {line.text}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // paragraph or scene
  return (
    <div className="rounded-lg border border-gray-800 bg-deep-black/60 p-6 sm:p-8">
      {artifact.label && (
        <p className="text-[10px] uppercase tracking-[0.3em] text-text-gray mb-4">
          {artifact.label}
        </p>
      )}
      <p
        className="text-text-light leading-relaxed font-light text-base sm:text-lg"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {artifact.text}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Choices                                                                    */
/* -------------------------------------------------------------------------- */

function TellChoicesView({
  choices,
  pickedId,
  onPick,
  revealed,
}: {
  choices: TellChoice[];
  pickedId: string | null;
  onPick: (id: string) => void;
  revealed: boolean;
}) {
  return (
    <div className="space-y-3">
      {choices.map((c) => {
        const isPicked = c.id === pickedId;
        const showResult = revealed;
        const isThisCorrect = c.isCorrect;

        let stateClass =
          "border-gray-800 hover:border-accent-gold/60 hover:bg-accent-gold/5";
        if (showResult) {
          if (isThisCorrect) {
            stateClass =
              "border-emerald-500/60 bg-emerald-500/10 text-text-light";
          } else if (isPicked) {
            stateClass =
              "border-accent-burgundy/80 bg-accent-burgundy/20 text-text-light";
          } else {
            stateClass = "border-gray-800/50 opacity-50";
          }
        }

        return (
          <button
            key={c.id}
            onClick={() => !revealed && onPick(c.id)}
            disabled={revealed}
            className={`w-full text-left px-5 py-4 rounded-lg border transition-all duration-200 ${stateClass} ${
              !revealed ? "cursor-pointer" : "cursor-default"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="flex-1 text-text-light font-light text-base leading-relaxed">
                {c.text}
              </span>
              {showResult && isThisCorrect && (
                <Check
                  size={18}
                  className="text-emerald-400 flex-shrink-0 mt-0.5"
                />
              )}
              {showResult && isPicked && !isThisCorrect && (
                <X
                  size={18}
                  className="text-accent-burgundy flex-shrink-0 mt-0.5"
                />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Reveal                                                                     */
/* -------------------------------------------------------------------------- */

function TellRevealView({
  tell,
  picked,
  correct,
  isCorrect,
  serverResult,
}: {
  tell: Tell;
  picked: TellChoice;
  correct: TellChoice;
  isCorrect: boolean;
  serverResult: ServerAnswerResult | null;
}) {
  return (
    <div className="mt-10 space-y-8">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
        {isCorrect ? (
          <>
            <Check size={20} className="text-emerald-400" />
            <span className="text-emerald-400 text-[11px] uppercase tracking-[0.4em]">
              Correct read
            </span>
          </>
        ) : (
          <>
            <X size={20} className="text-accent-burgundy" />
            <span className="text-accent-burgundy text-[11px] uppercase tracking-[0.4em]">
              Missed
            </span>
          </>
        )}
        {serverResult && serverResult.scoreImpact !== 0 && (
          <span
            className={`ml-auto text-[11px] uppercase tracking-[0.4em] ${
              serverResult.scoreImpact > 0
                ? "text-emerald-400"
                : "text-accent-burgundy"
            }`}
          >
            {serverResult.scoreImpact > 0 ? "+" : ""}
            {serverResult.scoreImpact} rating
          </span>
        )}
        {serverResult?.isReplay && (
          <span className="ml-auto text-[10px] uppercase tracking-[0.4em] text-text-gray/60">
            Replay
          </span>
        )}
      </div>

      {/* Why each choice */}
      <div className="space-y-5">
        <p className="text-[10px] uppercase tracking-[0.4em] text-accent-gold/70">
          Why each choice
        </p>
        {tell.choices.map((c) => (
          <div
            key={c.id}
            className="border-l-2 pl-4 py-1"
            style={{
              borderColor: c.isCorrect
                ? "rgb(52 211 153 / 0.6)"
                : "rgb(75 85 99 / 0.4)",
            }}
          >
            <p className="text-sm text-text-light font-light mb-1.5">
              {c.text}
            </p>
            <p className="text-text-gray text-sm leading-relaxed">{c.why}</p>
          </div>
        ))}
      </div>

      {/* Kanika's read */}
      <div className="pt-2">
        <p className="text-[10px] uppercase tracking-[0.4em] text-accent-gold/70 mb-4">
          Kanika&rsquo;s read
        </p>
        <p
          className="text-text-light text-base sm:text-lg font-light leading-relaxed"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {tell.reveal}
        </p>
      </div>

      {/* Footer disclaimer + CTA */}
      <div className="pt-6 border-t border-gray-800 space-y-6">
        <p className="text-text-gray/60 text-xs leading-relaxed">
          Pattern recognition training. Not medical or legal advice. Not a
          substitute for professional evaluation.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/consilium/apply?src=tell"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-sm hover:bg-accent-gold/90 transition-all"
          >
            Train Your Instincts &middot; $29/mo
          </a>
          <a
            href="/tells"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-accent-gold/40 text-accent-gold font-medium tracking-wider uppercase text-sm hover:bg-accent-gold/10 transition-all"
          >
            Tomorrow&rsquo;s Tell
          </a>
        </div>
      </div>

      {/* Hide-the-warning during dev only */}
      {process.env.NODE_ENV !== "production" && (
        <p className="text-text-gray/30 text-[10px] mt-4 font-mono">
          spike: picked={picked.id} correct={correct.id}
        </p>
      )}
    </div>
  );
}
