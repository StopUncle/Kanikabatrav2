"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { Lock, Mail, Loader2, ArrowRight, ShieldCheck } from "lucide-react";

interface QuizResultGateProps {
  /** Quiz slug, matches a QUIZ_DRIP_COPY key in lib/email-sequences.ts
   *  so the API enrolls the right per-quiz nurture (e.g. "sociopath"). */
  quizSlug: string;
  /** Subscriber.source value, e.g. "sociopath-quiz". */
  source: string;
  /** Segmentation tags (axis, tier, archetype). The source is always
   *  added too, so callers pass only the result-specific tags. */
  tags: string[];
  /** Human label for the result, used in the gate copy ("Cold Predator"). */
  resultLabel: string;
  /** The full result breakdown. Blurred behind the gate until the
   *  visitor submits an email (or has captured on a previous quiz). */
  children: React.ReactNode;
}

/**
 * Preview-then-gate wrapper for the free clinical quiz results.
 *
 * The headline result sits ABOVE this gate (the free teaser). The full
 * breakdown is passed as children: blurred and clamped until the
 * visitor gives an email, then revealed in full. Submitting posts to
 * /api/newsletter with the quizSlug, which tags the Subscriber and
 * enrolls the result-specific drip.
 *
 * These results pages render entirely from sessionStorage on the
 * client, so the gate has no SEO cost (Googlebot never sees the result
 * either way). It is pure capture lift over the old dismissable
 * QuizEmailCapture box.
 *
 * A returning visitor who already captured on any quiz (localStorage
 * `kb-quiz-email`) is auto-unlocked, and is silently tagged + enrolled
 * for this quiz the first time they reach it, so every quiz they finish
 * still nurtures them without re-gating.
 */
export default function QuizResultGate({
  quizSlug,
  source,
  tags,
  resultLabel,
  children,
}: QuizResultGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const finalTags = Array.from(new Set([source, ...tags]));

  // Auto-unlock a returning visitor who has captured before, and tag
  // them for this quiz once (fires the per-quiz drip server-side).
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("kb-quiz-email");
    } catch {
      stored = null;
    }
    if (!stored || !stored.includes("@")) return;

    setUnlocked(true);

    const taggedKey = `kb-quiz-tagged:${quizSlug}`;
    let alreadyTagged = false;
    try {
      alreadyTagged = localStorage.getItem(taggedKey) === "1";
    } catch {
      alreadyTagged = true;
    }
    if (alreadyTagged) return;

    try {
      localStorage.setItem(taggedKey, "1");
    } catch {
      // ignore storage failures, the POST below is best-effort anyway
    }
    fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: stored,
        source,
        tags: finalTags,
        quizSlug,
      }),
    }).catch(() => {
      // best-effort, the visitor already sees their result
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizSlug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          name: name.trim() || undefined,
          source,
          tags: finalTags,
          quizSlug,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Something went wrong. Try again.");
      }
      try {
        localStorage.setItem("kb-quiz-email", email.trim().toLowerCase());
        localStorage.setItem(`kb-quiz-tagged:${quizSlug}`, "1");
      } catch {
        // unlocking still works for this session even if storage fails
      }
      setUnlocked(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Couldn't connect. Check your internet and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="mb-12">
      {/* Blurred, clamped preview of the real breakdown, faded to black */}
      <div className="relative" aria-hidden>
        <div className="max-h-[460px] overflow-hidden">
          <div className="blur-[6px] opacity-50 select-none pointer-events-none">
            {children}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-deep-black pointer-events-none" />
      </div>

      {/* Gate card */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="-mt-16 relative z-10 p-6 sm:p-8 rounded-xl border border-accent-gold/40 bg-gradient-to-br from-accent-gold/10 to-deep-black/80 backdrop-blur-sm"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-10 h-10 rounded-full bg-accent-gold/15 border border-accent-gold/40 flex items-center justify-center">
            <Lock size={16} className="text-accent-gold" strokeWidth={1.6} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-light text-white mb-2 leading-snug">
              Your full {resultLabel} read is right here.
            </h3>
            <p className="text-text-gray text-sm leading-relaxed">
              Enter your email to unlock the complete breakdown: your subscale
              scores, where you land against the norms, and what your
              configuration does under pressure. I&rsquo;ll send a copy plus a
              short series tuned to this exact result. No spam, unsubscribe any
              time.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First name (optional)"
            disabled={submitting}
            autoComplete="given-name"
            className="flex-1 px-4 py-3 bg-deep-black/60 border border-accent-gold/20 rounded text-white placeholder:text-text-gray/40 focus:outline-none focus:border-accent-gold/60 transition-colors text-sm disabled:opacity-50"
          />
          <div className="relative flex-1">
            <Mail
              size={15}
              strokeWidth={1.6}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-gold/50 pointer-events-none"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              placeholder="your@email.com"
              disabled={submitting}
              autoComplete="email"
              inputMode="email"
              className="w-full pl-9 pr-4 py-3 bg-deep-black/60 border border-accent-gold/20 rounded text-white placeholder:text-text-gray/40 focus:outline-none focus:border-accent-gold/60 transition-colors text-sm disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={submitting || !email}
            className="px-6 py-3 bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-xs rounded hover:bg-accent-gold/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {submitting ? (
              <>
                <Loader2 size={14} className="animate-spin" strokeWidth={2} />
                Unlocking
              </>
            ) : (
              <>
                Unlock my result
                <ArrowRight size={14} strokeWidth={1.8} />
              </>
            )}
          </button>
        </form>

        {error && (
          <p role="alert" className="mt-3 text-xs text-red-400 leading-relaxed">
            {error}
          </p>
        )}

        <div className="mt-4 flex items-center gap-2 text-text-gray/50 text-[11px]">
          <ShieldCheck size={12} className="text-accent-gold/50 shrink-0" />
          <span>
            Your result is computed on your device. Email only unlocks the full
            read and the follow-up series.
          </span>
        </div>
      </m.div>
    </div>
  );
}
