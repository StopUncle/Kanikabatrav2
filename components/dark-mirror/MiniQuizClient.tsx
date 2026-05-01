"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import {
  MINI_QUIZ_QUESTIONS,
  buildMiniResult,
  type MiniDarkMirrorResult,
} from "@/lib/mini-quiz";
import type { PersonalityType } from "@/lib/quiz-data";
import { getAttributionForSubmit } from "@/lib/attribution";
import DarkMirrorRadar from "./DarkMirrorRadar";
import ClinicalResultCard from "./ClinicalResultCard";
import ConsiliumAxisTile from "./ConsiliumAxisTile";

/**
 * Mini Dark Mirror, four-state client.
 *
 * State machine:
 *   intro → quiz (12 sequential questions) → email-gate → reveal
 *
 * The reveal is the magnificent moment, animated radar (the
 * screenshot moment), composed clinical card (primary + secondary
 * axis synthesis), axis-tailored Consilium tile (the funnel).
 *
 * Email-gate sits BETWEEN the quiz and the reveal so the visitor
 * is fully invested (12 questions of work) but has not yet seen
 * the visual payoff. Conversion rate at this gate should be very
 * high; users who balk haven't earned the radar yet.
 */

type State = "intro" | "quiz" | "email-gate" | "reveal";

export default function MiniQuizClient() {
  const [state, setState] = useState<State>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, PersonalityType>>({});
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(
    null,
  );
  const [result, setResult] = useState<MiniDarkMirrorResult | null>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const question = MINI_QUIZ_QUESTIONS[currentQ];
  const progress = ((currentQ + 1) / MINI_QUIZ_QUESTIONS.length) * 100;

  function handleAnswer(answerId: string, axis: PersonalityType) {
    setSelectedAnswerId(answerId);
    const next = { ...answers, [question.id]: axis };
    setAnswers(next);

    setTimeout(() => {
      if (currentQ < MINI_QUIZ_QUESTIONS.length - 1) {
        setCurrentQ((i) => i + 1);
        setSelectedAnswerId(null);
      } else {
        // Compute result now, but don't reveal until email is submitted.
        const r = buildMiniResult(next);
        setResult(r);
        setState("email-gate");
      }
    }, 320);
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!result) return;
    if (!email.trim() || !email.includes("@")) {
      setSubmitError("Enter a valid email so we can send your full report.");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const attribution = getAttributionForSubmit();
      const res = await fetch("/api/mini-quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          dominantType: result.dominantType,
          scores: result.scores,
          attribution,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.error ?? "Something went wrong. Try again in a moment.",
        );
      }
      // Reveal the magnificent layout. The drip is already enqueued
      // server-side; this transition is for the user-facing moment.
      setState("reveal");
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Try again in a moment.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-deep-black text-text-light">
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.06), transparent 60%), radial-gradient(ellipse at 20% 100%, rgba(114,33,57,0.18), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(15,23,42,0.45), transparent 55%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-5 sm:px-6 py-12 sm:py-16">
        <AnimatePresence mode="wait">
          {state === "intro" && (
            <m.section
              key="intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <p className="text-warm-gold/70 text-[10px] uppercase tracking-[0.4em] mb-4">
                The Mini Dark Mirror
              </p>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-wider uppercase leading-tight mb-5"
                style={{
                  background:
                    "linear-gradient(135deg, #f3d98a 0%, #d4af37 50%, #9c7a1f 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Find your axis.
              </h1>
              <p className="text-text-gray text-base sm:text-lg font-light leading-relaxed max-w-lg mx-auto mb-3">
                Twelve scenarios. About three minutes. A clinical-grade
                read on which of six personality patterns you sit
                closest to, drawn from the DSM-5 Cluster B framework.
              </p>
              <p className="text-text-gray/70 text-sm font-light max-w-lg mx-auto mb-10">
                Free. Built from the same six-axis Cluster B framework
                as the full Dark Mirror Assessment.
              </p>

              <button
                type="button"
                onClick={() => setState("quiz")}
                className="inline-flex items-center justify-center gap-2 py-4 px-10 rounded-full bg-warm-gold text-deep-black font-medium text-base tracking-wider uppercase transition-all hover:bg-warm-gold/90 hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.45)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-black"
              >
                Begin
                <ArrowRight size={18} strokeWidth={1.8} />
              </button>

              <p className="text-text-gray/50 text-xs mt-6">
                No signup to start. Email at the end so we can send
                you the full clinical-style synthesis.
              </p>

              <div className="mt-12 pt-8 border-t border-warm-gold/10 max-w-md mx-auto">
                <p className="text-text-gray/60 text-xs uppercase tracking-[0.25em] mb-2">
                  Want the full assessment?
                </p>
                <Link
                  href="/quiz"
                  className="text-warm-gold/80 hover:text-warm-gold text-sm font-light transition-colors"
                >
                  The full Dark Mirror Assessment, $9.99 →
                </Link>
              </div>
            </m.section>
          )}

          {state === "quiz" && question && (
            <m.section
              key={`q-${question.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex items-center justify-between mb-5">
                <p className="text-warm-gold/70 text-[10px] uppercase tracking-[0.3em]">
                  Question {currentQ + 1} of {MINI_QUIZ_QUESTIONS.length}
                </p>
                <p className="text-text-gray/50 text-[10px] uppercase tracking-[0.25em]">
                  Mini Dark Mirror
                </p>
              </div>
              <div className="h-[3px] bg-warm-gold/10 rounded-full mb-8 overflow-hidden">
                <m.div
                  className="h-full bg-warm-gold/70 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>

              <h2 className="text-xs uppercase tracking-[0.3em] text-warm-gold/80 mb-3">
                {question.title}
              </h2>
              <p className="text-text-light text-xl sm:text-2xl font-light leading-snug mb-8">
                {question.scenario}
              </p>

              <div className="space-y-3">
                {question.answers.map((answer) => {
                  const isSelected = selectedAnswerId === answer.id;
                  return (
                    <button
                      key={answer.id}
                      type="button"
                      onClick={() => handleAnswer(answer.id, answer.axis)}
                      disabled={selectedAnswerId !== null}
                      className={`w-full text-left rounded-xl border px-5 py-4 transition-all duration-200 disabled:cursor-not-allowed ${
                        isSelected
                          ? "border-warm-gold/70 bg-warm-gold/[0.08] shadow-[0_0_24px_-6px_rgba(212,175,55,0.5)]"
                          : "border-warm-gold/15 bg-deep-black/40 hover:border-warm-gold/40 hover:bg-warm-gold/[0.03] active:scale-[0.99]"
                      } ${selectedAnswerId !== null && !isSelected ? "opacity-40" : ""}`}
                    >
                      <p className="text-text-light text-sm sm:text-base font-light leading-relaxed">
                        {answer.text}
                      </p>
                    </button>
                  );
                })}
              </div>
            </m.section>
          )}

          {state === "email-gate" && result && (
            <m.section
              key="email-gate"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-warm-gold/70 text-[10px] uppercase tracking-[0.4em] mb-4">
                Your read is ready
              </p>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-wider uppercase leading-tight mb-5"
                style={{
                  background:
                    "linear-gradient(135deg, #f3d98a 0%, #d4af37 50%, #9c7a1f 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Where to send it.
              </h2>
              <p className="text-text-gray text-base font-light leading-relaxed max-w-md mx-auto mb-8">
                You&apos;ll see the full clinical-style synthesis on
                the next screen, the radar across all six axes, the
                dominant and secondary read, and the specific way this
                pattern shows up in relationships. We also email you a
                copy so it doesn&apos;t disappear when you close the tab.
              </p>

              <form
                onSubmit={handleEmailSubmit}
                className="max-w-md mx-auto space-y-3"
              >
                <div className="relative">
                  <Mail
                    size={16}
                    strokeWidth={1.6}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gold/60 pointer-events-none"
                  />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (submitError) setSubmitError(null);
                    }}
                    disabled={submitting}
                    className="w-full bg-deep-black/60 border border-warm-gold/25 rounded-full pl-11 pr-5 py-3.5 text-text-light placeholder:text-text-gray/40 focus:border-warm-gold/60 focus:outline-none focus:ring-2 focus:ring-warm-gold/30 transition-all disabled:opacity-60"
                  />
                </div>

                {submitError && (
                  <p
                    role="alert"
                    className="text-red-400/90 text-xs font-light"
                  >
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-8 rounded-full bg-warm-gold text-deep-black font-medium text-sm tracking-wider uppercase transition-all hover:bg-warm-gold/90 hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.45)] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Composing your report
                    </>
                  ) : (
                    <>
                      Reveal my result
                      <ArrowRight size={16} strokeWidth={1.8} />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 pt-2 text-text-gray/55 text-[11px]">
                  <ShieldCheck size={12} className="text-warm-gold/50" />
                  <span>
                    No spam. One report, plus the follow-up sequence.
                    Unsubscribe any time.
                  </span>
                </div>
              </form>
            </m.section>
          )}

          {state === "reveal" && result && (
            <m.section
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-7"
            >
              {/* Eyebrow */}
              <m.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-center"
              >
                <p className="text-warm-gold/70 text-[10px] uppercase tracking-[0.4em] mb-2">
                  The Mini Dark Mirror
                </p>
                <h1 className="text-2xl sm:text-3xl font-extralight tracking-wider uppercase text-text-light leading-tight">
                  Your read
                </h1>
              </m.div>

              {/* Radar, the screenshot moment */}
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex justify-center"
              >
                <DarkMirrorRadar
                  scores={result.scores}
                  dominantType={result.dominantType}
                  secondaryType={result.secondaryType}
                />
              </m.div>

              {/* Clinical synthesis card */}
              <ClinicalResultCard result={result} />

              {/* Axis-tailored Consilium tile */}
              <ConsiliumAxisTile result={result} />

              {/* Footer, email confirmation + upsell */}
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="text-center pt-4"
              >
                <div className="inline-flex items-center gap-2 text-text-gray/60 text-xs">
                  <Mail size={12} className="text-warm-gold/60" />
                  <span>
                    A copy is on its way to {email}. Check spam if it
                    doesn&apos;t land in 60 seconds.
                  </span>
                </div>

                <div className="mt-10 pt-8 border-t border-warm-gold/10 max-w-md mx-auto">
                  <p className="text-text-gray/60 text-xs uppercase tracking-[0.25em] mb-3">
                    Want the comprehensive version
                  </p>
                  <Link
                    href="/quiz"
                    className="text-warm-gold/80 hover:text-warm-gold text-sm font-light transition-colors"
                  >
                    The full Dark Mirror Assessment, 20 questions, $9.99 →
                  </Link>
                </div>
              </m.div>
            </m.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
