"use client";

import { useState, useCallback } from "react";
import { MANIPULATION_QUIZ, getResult } from "@/lib/quiz-manipulation";
import type { QuizResult } from "@/lib/quiz-manipulation";

// ─── Analytics ─────────────────────────────────────────────
function trackEvent(name: string, params?: Record<string, string>) {
  try {
    const w = window as unknown as {
      gtag?: (...args: unknown[]) => void;
      fbq?: (...args: unknown[]) => void;
    };
    w.gtag?.("event", name, params);
    w.fbq?.("trackCustom", name, params);
  } catch {
    /* analytics should never break the page */
  }
}

function withUtm(url: string, campaign: string) {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}utm_source=kanikarose&utm_medium=linkinbio&utm_campaign=${campaign}`;
}

// ─── Main Page ─────────────────────────────────────────────
export default function LinksPage() {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f0ed]">
      {/* ── HERO ── */}
      <section className="px-5 pt-14 pb-6 text-center">
        <h1
          className="text-[2rem] font-light tracking-[0.35em] uppercase"
          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
        >
          Kanika Batra
        </h1>
        <p className="mt-3 text-[#d4af37] text-base tracking-wide">
          I see what you can&apos;t.
        </p>
        <p className="mt-2 text-[#6b7280] text-xs tracking-[0.15em] uppercase">
          Diagnosed ASPD &middot; Author &middot; Soprano
        </p>
      </section>

      {/* ── FIVE CTA BUTTONS ── */}
      <section className="px-5 pb-8 space-y-3 max-w-md mx-auto">
        <button
          onClick={() => {
            trackEvent("quiz_start");
            setShowQuiz(true);
          }}
          className="w-full text-left p-4 rounded-xl bg-gradient-to-r from-[#720921] to-[#4a0616] border border-[#8b1a33]/40 active:scale-[0.98] transition-transform"
        >
          <p className="text-[#f5f0ed] font-medium text-[15px]">
            How Easily Can You Be Manipulated?
          </p>
          <p className="text-[#d4af37]/80 text-xs mt-1">
            7 questions &middot; Takes 2 minutes
          </p>
        </button>

        <a
          href={withUtm("/ask", "ama")}
          onClick={() => trackEvent("qa_click")}
          className="block w-full p-4 rounded-xl bg-[#0d0d1a] border border-[#d4af37]/15 active:scale-[0.98] transition-transform"
        >
          <p className="text-[#f5f0ed] font-medium text-[15px]">
            Ask Me Anything
          </p>
          <p className="text-[#6b7280] text-xs mt-1">
            Written or voice answer — from $39.99
          </p>
        </a>

        <a
          href={withUtm("/coaching", "coaching")}
          onClick={() => trackEvent("coaching_click")}
          className="block w-full p-4 rounded-xl bg-[#0d0d1a] border border-[#d4af37]/15 active:scale-[0.98] transition-transform"
        >
          <p className="text-[#f5f0ed] font-medium text-[15px]">
            Book a Private Session
          </p>
          <p className="text-[#6b7280] text-xs mt-1">
            1:1 coaching &middot; Limited spots
          </p>
        </a>

        <a
          href="#books"
          onClick={() => trackEvent("book_click")}
          className="block w-full p-4 rounded-xl bg-[#0d0d1a] border border-[#d4af37]/15 active:scale-[0.98] transition-transform"
        >
          <p className="text-[#f5f0ed] font-medium text-[15px]">
            Get the Books
          </p>
          <p className="text-[#6b7280] text-xs mt-1">
            Honeytrap &middot; Sociopathic Dating Bible
          </p>
        </a>

        <a
          href={withUtm("https://edit2ai.com", "editai")}
          onClick={() => trackEvent("editai_click")}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full p-4 rounded-xl bg-transparent border border-[#d4af37]/10 border-dashed active:scale-[0.98] transition-transform"
        >
          <p className="text-[#d4af37]/70 font-medium text-[15px]">
            The tool I use to edit my Reels
          </p>
          <p className="text-[#6b7280] text-xs mt-1">
            Edit AI &middot; One-click editing for creators
          </p>
        </a>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="px-5 py-5 border-t border-b border-[#1a1a2e]">
        <div className="flex items-center justify-center gap-3 text-[#6b7280] text-[11px] tracking-wider uppercase flex-wrap text-center">
          <span>278K+ Instagram</span>
          <span className="text-[#2a2a3e]">&middot;</span>
          <span>157K+ YouTube</span>
          <span className="text-[#2a2a3e]">&middot;</span>
          <span>Author of 2 books</span>
          <span className="text-[#2a2a3e]">&middot;</span>
          <span>As seen on LADbible</span>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="px-5 py-12 max-w-md mx-auto text-center">
        <div className="w-24 h-24 rounded-full mx-auto mb-6 bg-gradient-to-br from-[#720921] to-[#0a1628] border-2 border-[#d4af37]/20 flex items-center justify-center">
          <span
            className="text-[#d4af37] text-2xl font-light tracking-[0.2em]"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            KB
          </span>
        </div>
        <p className="text-[#94a3b8] text-sm leading-relaxed">
          Diagnosed with Antisocial Personality Disorder at 21. Former Miss
          Universe and Miss World finalist. I&apos;ve spent years learning to
          read people — now I teach you how.
        </p>
        <button
          onClick={() => {
            trackEvent("quiz_start", { source: "about" });
            setShowQuiz(true);
          }}
          className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-[#720921] to-[#4a0616] text-[#f5f0ed] text-sm font-medium tracking-wider uppercase active:scale-[0.97] transition-transform"
        >
          Take the Quiz
        </button>
      </section>

      {/* ── BOOKS ── */}
      <section id="books" className="px-5 py-12 max-w-md mx-auto">
        <h2
          className="text-center text-xs tracking-[0.3em] uppercase text-[#6b7280] mb-8"
          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
        >
          The Books
        </h2>
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-[#0d0d1a] border border-[#1a1a2e]">
            <h3 className="text-[#f5f0ed] font-medium mb-1">Honeytrap</h3>
            <p className="text-[#6b7280] text-sm mb-4">
              A thriller about the games people play — written by someone who
              plays them.
            </p>
            <a
              href={withUtm(
                "https://www.amazon.com/dp/B0FWKJLT6F",
                "honeytrap",
              )}
              onClick={() => trackEvent("book_click", { book: "honeytrap" })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-sm font-medium active:scale-[0.97] transition-transform"
            >
              Get it
            </a>
          </div>

          <div className="p-5 rounded-xl bg-[#0d0d1a] border border-[#1a1a2e]">
            <h3 className="text-[#f5f0ed] font-medium mb-1">
              Sociopathic Dating Bible
            </h3>
            <p className="text-[#6b7280] text-sm mb-4">
              The field guide to never being blindsided again.
            </p>
            <a
              href={withUtm("https://www.amazon.com/dp/B0FWKJLT6F", "sdb")}
              onClick={() => trackEvent("book_click", { book: "sdb" })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-sm font-medium active:scale-[0.97] transition-transform"
            >
              Get it
            </a>
          </div>
        </div>
      </section>

      {/* ── EDIT AI ── */}
      <section className="px-5 py-10 max-w-md mx-auto">
        <div className="p-5 rounded-xl border border-dashed border-[#d4af37]/10 text-center">
          <p
            className="text-[11px] tracking-[0.3em] uppercase text-[#6b7280] mb-3"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            For Creators
          </p>
          <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">
            I use Edit AI to turn my raw footage into polished Reels in one
            click. If you make content, try it.
          </p>
          <a
            href={withUtm("https://edit2ai.com", "editai_section")}
            onClick={() => trackEvent("editai_click", { source: "section" })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 rounded-full border border-[#d4af37]/20 text-[#d4af37]/70 text-sm font-medium active:scale-[0.97] transition-transform"
          >
            Try Edit AI
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-5 py-12 border-t border-[#1a1a2e] max-w-md mx-auto">
        {/* Social Icons */}
        <div className="flex justify-center gap-5 mb-8">
          <a
            href={withUtm("https://instagram.com/kanikabatra", "social")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b7280] hover:text-[#d4af37] transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href={withUtm("https://www.youtube.com/@KanikaBatra", "social")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b7280] hover:text-[#d4af37] transition-colors"
            aria-label="YouTube"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a
            href={withUtm("https://tiktok.com/@ogkanikabatra", "social")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b7280] hover:text-[#d4af37] transition-colors"
            aria-label="TikTok"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </a>
        </div>

        {/* Email Capture */}
        <FooterEmailCapture />

        <p className="text-center text-[#3a3a4e] text-[10px] mt-8 tracking-wider">
          &copy; 2026 Kanika Batra. All rights reserved.
        </p>
      </footer>

      {/* ── QUIZ OVERLAY ── */}
      {showQuiz && <QuizOverlay onClose={() => setShowQuiz(false)} />}
    </div>
  );
}

// ─── Footer Email Capture ──────────────────────────────────
function FooterEmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;

    setStatus("sending");
    trackEvent("email_signup", { source: "footer" });

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "linkinbio-footer" }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <p className="text-center text-[#d4af37] text-sm">
        You&apos;re in. Check your inbox.
      </p>
    );
  }

  return (
    <div className="text-center">
      <p className="text-[#94a3b8] text-sm mb-4">
        Get insights most people pay for — free.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-xs mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 min-w-0 px-4 py-2.5 rounded-full bg-[#0d0d1a] border border-[#1a1a2e] text-[#f5f0ed] text-sm placeholder:text-[#3a3a4e] focus:outline-none focus:border-[#d4af37]/30"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-5 py-2.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-sm font-medium disabled:opacity-50 active:scale-[0.97] transition-transform"
        >
          {status === "sending" ? "..." : "Join"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-red-400/70 text-xs mt-2">
          Something went wrong. Try again.
        </p>
      )}
    </div>
  );
}

// ─── Quiz Overlay ──────────────────────────────────────────
function QuizOverlay({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"intro" | "questions" | "email" | "results">(
    "intro",
  );
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const totalQuestions = MANIPULATION_QUIZ.length;
  const question = MANIPULATION_QUIZ[currentQ];

  const handleAnswer = useCallback(
    (points: number) => {
      const newAnswers = [...answers, points];
      setAnswers(newAnswers);

      if (currentQ < totalQuestions - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        setStep("email");
      }
    },
    [answers, currentQ, totalQuestions],
  );

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;

    setSubmitting(true);
    const score = answers.reduce((sum, a) => sum + a, 0);
    const quizResult = getResult(score);
    setResult(quizResult);

    trackEvent("quiz_complete", {
      score: String(score),
      type: quizResult.type,
    });

    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || undefined,
          source: "manipulation-quiz",
          tags: [`quiz-${quizResult.type}`, `quiz-score-${score}`],
        }),
      });
    } catch {
      /* email capture failed silently — still show results */
    }

    setSubmitting(false);
    setStep("results");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505]/98 flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#6b7280] text-2xl leading-none"
          aria-label="Close quiz"
        >
          &times;
        </button>

        {/* Intro */}
        {step === "intro" && (
          <div className="text-center">
            <p className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-4">
              The Manipulation Test
            </p>
            <h2
              className="text-2xl font-light text-[#f5f0ed] mb-3 leading-tight"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              How Easily Can You
              <br />
              Be Manipulated?
            </h2>
            <p className="text-[#6b7280] text-sm mb-8">
              7 questions &middot; Takes 2 minutes &middot; Free
            </p>
            <button
              onClick={() => setStep("questions")}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#720921] to-[#4a0616] text-[#f5f0ed] text-sm font-medium tracking-wider uppercase active:scale-[0.97] transition-transform"
            >
              Start
            </button>
          </div>
        )}

        {/* Questions */}
        {step === "questions" && question && (
          <div>
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between text-[10px] text-[#6b7280] uppercase tracking-wider mb-2">
                <span>
                  Question {currentQ + 1} of {totalQuestions}
                </span>
                <span>
                  {Math.round(((currentQ + 1) / totalQuestions) * 100)}%
                </span>
              </div>
              <div className="w-full h-0.5 bg-[#1a1a2e] rounded-full">
                <div
                  className="h-full bg-[#d4af37] rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQ + 1) / totalQuestions) * 100}%`,
                  }}
                />
              </div>
            </div>

            <p className="text-[#f5f0ed] text-[15px] leading-relaxed mb-6">
              {question.question}
            </p>

            <div className="space-y-3">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option.points)}
                  className="w-full text-left p-4 rounded-xl bg-[#0d0d1a] border border-[#1a1a2e] text-[#94a3b8] text-sm leading-relaxed active:bg-[#720921]/20 active:border-[#720921]/30 active:text-[#f5f0ed] transition-colors"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Email Gate */}
        {step === "email" && (
          <div className="text-center">
            <p className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-4">
              Your Results Are Ready
            </p>
            <h2
              className="text-xl font-light text-[#f5f0ed] mb-2"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              Where should we send them?
            </h2>
            <p className="text-[#6b7280] text-sm mb-8">
              Enter your email to see your manipulation vulnerability score.
            </p>
            <form onSubmit={handleEmailSubmit} className="space-y-3 text-left">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name (optional)"
                className="w-full px-4 py-3 rounded-xl bg-[#0d0d1a] border border-[#1a1a2e] text-[#f5f0ed] text-sm placeholder:text-[#3a3a4e] focus:outline-none focus:border-[#d4af37]/30"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0d0d1a] border border-[#1a1a2e] text-[#f5f0ed] text-sm placeholder:text-[#3a3a4e] focus:outline-none focus:border-[#d4af37]/30"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#720921] to-[#4a0616] text-[#f5f0ed] text-sm font-medium tracking-wider uppercase disabled:opacity-50 active:scale-[0.97] transition-transform"
              >
                {submitting ? "Loading..." : "See My Results"}
              </button>
            </form>
          </div>
        )}

        {/* Results */}
        {step === "results" && result && (
          <div className="text-center">
            <p className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-4">
              Your Result
            </p>
            <h2
              className="text-2xl font-light text-[#f5f0ed] mb-2"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              {result.title}
            </h2>
            <div className="inline-block px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-xs mb-6">
              Score: {answers.reduce((s, a) => s + a, 0)} / {totalQuestions * 3}
            </div>
            <p className="text-[#94a3b8] text-sm leading-relaxed mb-8">
              {result.description}
            </p>
            <div className="space-y-3">
              <a
                href={
                  result.cta.href.startsWith("http")
                    ? withUtm(result.cta.href, "quiz_result")
                    : result.cta.href
                }
                onClick={() =>
                  trackEvent("quiz_cta_click", { type: result.type })
                }
                className="block w-full py-3.5 rounded-full bg-gradient-to-r from-[#720921] to-[#4a0616] text-[#f5f0ed] text-sm font-medium tracking-wider uppercase text-center active:scale-[0.97] transition-transform"
              >
                {result.cta.label}
              </a>
              <button
                onClick={onClose}
                className="block w-full py-3 text-[#6b7280] text-sm"
              >
                Back to page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
