"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Check, X } from "lucide-react";
import type {
  PublicTell,
  PublicTellChoice,
  TellArtifact,
  TellChoice,
} from "@/lib/tells/types";
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
 * Reveal payload, hydrated only after the server confirms the user has
 * answered. Holds the answer-key fields (choices' isCorrect/why + Kanika's
 * read) that the public Tell deliberately omits to prevent network-tab
 * answer-key leak.
 */
interface RevealPayload {
  choices: TellChoice[];
  reveal: string;
}

/**
 * Renders one Tell end-to-end: artifact → choices → reveal.
 *
 * Critical invariant: the prop is `PublicTell` (no answer key). The reveal
 * payload arrives from the server only after the answer is recorded, either
 * via /api/tells/[id]/answer on submit or /api/tells/[id]/my-response on
 * mount when the user has already answered.
 */
export default function TellPlayer({
  tell,
  surface = "public",
}: {
  tell: PublicTell;
  /**
   * Where the player is rendered. Drives the reveal footer:
   *   "public"   → "Train Your Instincts $29/mo" + "Tomorrow's Tell"
   *                (cold-visitor funnel; current /tells, /tells/[slug]).
   *   "member"   → "Your hex" + "History" + "Receipts"
   *                (paying member; do NOT sell membership).
   */
  surface?: "public" | "member";
}) {
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [streak, setStreak] = useState<StreakState>(EMPTY_STREAK);
  const [hydrated, setHydrated] = useState(false);
  const [delta, setDelta] = useState<CompletionDelta | null>(null);
  const [serverResult, setServerResult] = useState<ServerAnswerResult | null>(
    null,
  );
  const [reveal, setReveal] = useState<RevealPayload | null>(null);
  const submittingRef = useRef(false);
  const startedAtRef = useRef<number>(Date.now());

  // Hydrate the streak from localStorage on mount, then reconcile
  // against today (apply freeze or reset if days were missed).
  // Also ask the server if this user already answered this Tell, so
  // a refresh or a return visit lands on the reveal with the user's
  // actual pick AND the answer-key payload.
  useEffect(() => {
    startedAtRef.current = Date.now();
    const loaded = loadStreak();
    const reconciled = reconcile(loaded);
    setStreak(reconciled);
    setHydrated(true);
    if (reconciled !== loaded) saveStreak(reconciled);

    let cancelled = false;

    fetch(`/api/tells/${encodeURIComponent(tell.id)}/my-response`)
      .then(async (res) => (res.ok ? await res.json() : null))
      .then(
        (data: {
          response: {
            choiceId: string;
            isCorrect: boolean;
            scoreImpact: number;
            countedScored: boolean;
            countedStreak: boolean;
          } | null;
          reveal: RevealPayload | null;
        } | null) => {
          if (cancelled || !data?.response) return;
          const r = data.response;
          setPickedId(r.choiceId);
          setServerResult({
            correct: r.isCorrect,
            scoreImpact: r.scoreImpact,
            isReplay: !r.countedScored,
            countedStreak: r.countedStreak,
            streak: null,
          });
          if (data.reveal) setReveal(data.reveal);
        },
      )
      .catch(() => {
        // Network failure: leave pickedId null, the user can answer fresh.
      });

    return () => {
      cancelled = true;
    };
  }, [tell.id]);

  function handlePick(choiceId: string) {
    if (pickedId !== null || submittingRef.current) return;
    submittingRef.current = true;
    setPickedId(choiceId);

    // Optimistic local streak update — works offline, works for
    // anonymous visitors. The reveal stays gated on the server response
    // because we don't have the answer key on the client yet.
    const result = complete(streak, tell.id);
    setStreak(result.state);
    setDelta(result.delta);
    saveStreak(result.state);
    if (result.delta.kind === "extended") {
      window.setTimeout(() => setDelta(null), 1200);
    }

    const answerMs = Math.max(0, Date.now() - startedAtRef.current);
    fetch(`/api/tells/${encodeURIComponent(tell.id)}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ choiceId, answerMs }),
    })
      .then(async (res) => {
        if (!res.ok) return null;
        return (await res.json()) as ServerAnswerResult & {
          reveal: RevealPayload;
        };
      })
      .then((data) => {
        if (!data) return;
        setServerResult({
          correct: data.correct,
          scoreImpact: data.scoreImpact,
          isReplay: data.isReplay,
          countedStreak: data.countedStreak,
          streak: data.streak,
        });
        if (data.reveal) setReveal(data.reveal);
      })
      .catch(() => {
        // Silent. Server unreachable; leave the user with the picked state
        // but no reveal. They can refresh to retry the my-response fetch.
      })
      .finally(() => {
        submittingRef.current = false;
      });
  }

  const revealed = pickedId !== null && reveal !== null;
  const correctChoice = reveal?.choices.find((c) => c.isCorrect) ?? null;
  const pickedRevealChoice =
    pickedId && reveal
      ? reveal.choices.find((c) => c.id === pickedId) ?? null
      : null;
  const isCorrect = pickedRevealChoice?.isCorrect ?? false;

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
        revealChoices={reveal?.choices ?? null}
        pickedId={pickedId}
        onPick={handlePick}
        revealed={revealed}
      />

      <AnimatePresence>
        {revealed && reveal && pickedRevealChoice && correctChoice && (
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <TellRevealView
              reveal={reveal}
              picked={pickedRevealChoice}
              correct={correctChoice}
              isCorrect={isCorrect}
              serverResult={serverResult}
              surface={surface}
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

function TellHeader({ tell }: { tell: PublicTell }) {
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
  revealChoices,
  pickedId,
  onPick,
  revealed,
}: {
  choices: PublicTellChoice[];
  revealChoices: TellChoice[] | null;
  pickedId: string | null;
  onPick: (id: string) => void;
  revealed: boolean;
}) {
  return (
    <div className="space-y-3">
      {choices.map((c) => {
        const isPicked = c.id === pickedId;
        const showResult = revealed && revealChoices !== null;
        const revealChoice = revealChoices?.find((rc) => rc.id === c.id);
        const isThisCorrect = revealChoice?.isCorrect ?? false;

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
        } else if (isPicked) {
          // Picked but reveal not yet hydrated: dim the others.
          stateClass = "border-accent-gold/60 bg-accent-gold/5 text-text-light";
        }

        // Once a pick is registered, lock the buttons even before reveal
        // hydrates so the user can't double-submit.
        const locked = pickedId !== null;

        return (
          <button
            key={c.id}
            onClick={() => !locked && onPick(c.id)}
            disabled={locked}
            className={`w-full text-left px-5 py-4 rounded-lg border transition-all duration-200 ${stateClass} ${
              !locked ? "cursor-pointer" : "cursor-default"
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
  reveal,
  picked,
  correct,
  isCorrect,
  serverResult,
  surface,
}: {
  reveal: RevealPayload;
  picked: TellChoice;
  correct: TellChoice;
  isCorrect: boolean;
  serverResult: ServerAnswerResult | null;
  surface: "public" | "member";
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
        {reveal.choices.map((c) => (
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
          {reveal.reveal}
        </p>
      </div>

      {/* Footer disclaimer + CTA. Surface-aware: members never see the
          $29/mo upsell because they already pay; cold visitors get the
          conversion CTA. */}
      <div className="pt-6 border-t border-gray-800 space-y-6">
        <p className="text-text-gray/60 text-xs leading-relaxed">
          Pattern recognition training. Not medical or legal advice. Not a
          substitute for professional evaluation.
        </p>
        {surface === "public" ? (
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
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/consilium/instincts/score"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-accent-gold/40 text-accent-gold font-medium tracking-wider uppercase text-xs hover:bg-accent-gold/10 transition-all"
            >
              Your hex
            </a>
            <a
              href="/consilium/instincts/history"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-700 text-text-light font-medium tracking-wider uppercase text-xs hover:border-accent-gold/40 transition-all"
            >
              History
            </a>
            <a
              href="/consilium/receipts"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-700 text-text-light font-medium tracking-wider uppercase text-xs hover:border-accent-gold/40 transition-all"
            >
              Receipts
            </a>
          </div>
        )}
      </div>

      {process.env.NODE_ENV !== "production" && (
        <p className="text-text-gray/30 text-[10px] mt-4 font-mono">
          spike: picked={picked.id} correct={correct.id}
        </p>
      )}
    </div>
  );
}
