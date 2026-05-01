"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Loader2, CheckCircle2, ShieldCheck } from "lucide-react";
import {
  MINI_QUIZ_QUESTIONS,
  buildMiniResult,
  type MiniDarkMirrorResult,
} from "@/lib/mini-quiz";
import type { PersonalityType } from "@/lib/quiz-data";
import { getAttributionForSubmit } from "@/lib/attribution";

/**
 * Mini Dark Mirror, four-state client UI.
 *
 * State machine:
 *   intro → quiz (7 sequential questions) → result (one-axis teaser
 *   + email gate) → success (post-submit, "check your inbox")
 *
 * Per the multimillion-roadmap (research/multimillion-roadmap/
 * 11-phase-1-detailed.md week 4), the goal is owned-email capture, not
 * paid conversion. The full $9.99 quiz is referenced as the upsell.
 *
 * Visual design: matches the existing Dark Mirror brand voice — dark
 * theme, warm-gold accents, light/extralight typography, uppercase
 * tracking-wider section headers, no em dashes per the project-wide
 * purge. Mobile-first; 7 questions sized for thumb-tapping.
 */

type State = "intro" | "quiz" | "result" | "success";

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

  function handleAnswer(answerId: string, type: PersonalityType) {
    setSelectedAnswerId(answerId);
    const next = { ...answers, [question.id]: type };
    setAnswers(next);

    // Brief feedback delay so the tap registers visually before the
    // next question renders. Without this, mobile users feel like the
    // tap was lost.
    setTimeout(() => {
      if (currentQ < MINI_QUIZ_QUESTIONS.length - 1) {
        setCurrentQ((i) => i + 1);
        setSelectedAnswerId(null);
      } else {
        const r = buildMiniResult(next);
        setResult(r);
        setState("result");
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
      setState("success");
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

  // Suppress prefers-reduced-motion check for the typewriter on results,
  // matching the simulator's recent fix (commit 6025c7d). The fade-in
  // motion below is opacity-only, low-vestibular-impact.

  return (
    <div className="min-h-screen bg-deep-black text-text-light">
      {/* Subtle gradient backdrop, same palette as the Consilium feed
          and the simulator. Stays static across all four states; the
          content above it transitions. */}
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
                Seven scenarios. About 90 seconds. We tell you which of
                six personality patterns you sit closest to, and what
                that means for the way you operate in relationships.
              </p>
              <p className="text-text-gray/70 text-sm font-light max-w-lg mx-auto mb-10">
                Free. Built from the same clinical assessment Kanika
                uses with members.
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
                No signup to start. Email only at the end if you want
                the full read.
              </p>

              {/* Soft cross-link to the full assessment. Kept quiet, not
                  competing with the begin CTA above. */}
              <div className="mt-12 pt-8 border-t border-warm-gold/10 max-w-md mx-auto">
                <p className="text-text-gray/60 text-xs uppercase tracking-[0.25em] mb-2">
                  Want the full 6-axis read?
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
              {/* Progress strip at the top. Members see "3 of 7" so
                  they know they're not in an unbounded survey. */}
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
                      onClick={() => handleAnswer(answer.id, answer.type)}
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

          {state === "result" && result && (
            <m.section
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-warm-gold/70 text-[10px] uppercase tracking-[0.4em] mb-4">
                Result
              </p>
              <p className="text-text-gray text-sm font-light mb-3">
                You scored highest on
              </p>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-wider uppercase leading-tight mb-3"
                style={{
                  background:
                    "linear-gradient(135deg, #f3d98a 0%, #d4af37 50%, #9c7a1f 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {result.dominantName}
              </h2>
              <p className="text-warm-gold/85 italic text-base sm:text-lg font-light mb-8 max-w-md mx-auto">
                {result.dominantTagline}
              </p>

              <div className="bg-gradient-to-br from-deep-burgundy/15 to-deep-navy/20 backdrop-blur-sm border border-warm-gold/20 rounded-2xl p-6 sm:p-8 text-left max-w-lg mx-auto mb-6">
                <p className="text-text-light font-light leading-relaxed text-sm sm:text-base">
                  {result.teaser}
                </p>
                <div className="mt-5 pt-5 border-t border-warm-gold/15">
                  <p className="text-warm-gold/70 text-[10px] uppercase tracking-[0.3em] mb-2">
                    Your full report
                  </p>
                  <p className="text-text-gray text-sm font-light leading-relaxed">
                    Email it to me. The full read covers all 6 axes,
                    your specific blind spots, and how this pattern
                    plays out in your relationships.
                  </p>
                </div>
              </div>

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
                      Sending
                    </>
                  ) : (
                    <>
                      Send my full report
                      <ArrowRight size={16} strokeWidth={1.8} />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 pt-2 text-text-gray/55 text-[11px]">
                  <ShieldCheck size={12} className="text-warm-gold/50" />
                  <span>
                    No spam. One email with the report. Unsubscribe any
                    time.
                  </span>
                </div>
              </form>

              {/* Anchor link to the paid full assessment, sits below
                  the email form so the email-capture conversion fires
                  first and the upgrade is the secondary path. */}
              <div className="mt-12 pt-8 border-t border-warm-gold/10 max-w-md mx-auto">
                <p className="text-text-gray/60 text-xs uppercase tracking-[0.25em] mb-2">
                  Want the comprehensive version
                </p>
                <Link
                  href="/quiz"
                  className="text-warm-gold/80 hover:text-warm-gold text-sm font-light transition-colors"
                >
                  The full Dark Mirror Assessment, 20 questions, $9.99 →
                </Link>
              </div>
            </m.section>
          )}

          {state === "success" && result && (
            <m.section
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <m.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warm-gold/15 border border-warm-gold/40 mb-6"
              >
                <CheckCircle2
                  size={28}
                  strokeWidth={1.6}
                  className="text-warm-gold"
                />
              </m.div>
              <p className="text-warm-gold/70 text-[10px] uppercase tracking-[0.4em] mb-4">
                Sent
              </p>
              <h2 className="text-3xl sm:text-4xl font-extralight tracking-wider uppercase leading-tight mb-4 text-text-light">
                Check your inbox.
              </h2>
              <p className="text-text-gray text-base font-light leading-relaxed max-w-md mx-auto mb-8">
                Your full {result.dominantName} report is on its way.
                It usually lands within 60 seconds. Check your promotions
                tab if it doesn&apos;t show up.
              </p>

              <div className="bg-gradient-to-br from-deep-burgundy/15 to-deep-navy/20 backdrop-blur-sm border border-warm-gold/20 rounded-2xl p-6 max-w-md mx-auto">
                <p className="text-warm-gold/80 text-[11px] uppercase tracking-[0.3em] mb-3">
                  While you wait
                </p>
                <Link
                  href="/quiz"
                  className="block py-3 px-5 rounded-xl border border-warm-gold/30 hover:border-warm-gold/60 hover:bg-warm-gold/[0.04] transition-all text-left mb-3"
                >
                  <p className="text-text-light text-sm font-light">
                    The full Dark Mirror Assessment
                  </p>
                  <p className="text-text-gray/70 text-xs mt-1">
                    20 questions, full 6-axis radar, $9.99
                  </p>
                </Link>
                <Link
                  href="/book"
                  className="block py-3 px-5 rounded-xl border border-warm-gold/30 hover:border-warm-gold/60 hover:bg-warm-gold/[0.04] transition-all text-left"
                >
                  <p className="text-text-light text-sm font-light">
                    The Sociopathic Dating Bible
                  </p>
                  <p className="text-text-gray/70 text-xs mt-1">
                    The book the simulator scenarios came from
                  </p>
                </Link>
              </div>
            </m.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
