"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Mail, Check, Loader2, X } from "lucide-react";

interface QuizEmailCaptureProps {
  /** Subscriber.source value, e.g. "sociopath-quiz", "narcissist-quiz". */
  source: string;
  /** Tags carry segmentation signal (axis name, archetype slug, intensity
   *  tier). Always includes the source as a tag too. */
  tags: string[];
  /** Headline shown above the form. Pulled from each quiz's profile copy
   *  so the prompt sounds tailored ("Want your Cold Predator read by email?"). */
  resultLabel: string;
  /** Optional override copy. Falls back to a sensible generic line. */
  description?: string;
}

type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; isNew: boolean }
  | { kind: "error"; message: string }
  | { kind: "dismissed" };

/**
 * Generic post-results email capture for the themed quiz suite.
 *
 * Pre-2026-05-08 the seven Cluster B / partner-detection quizzes were
 * sessionStorage-only — pure SEO landing pages with zero funnel
 * connection. This component is the bridge: a soft, dismissable opt-in
 * that posts to /api/newsletter, which now also enrolls the subscriber
 * in the 3-email newsletter drip. Result is shown above whether or not
 * the user submits.
 *
 * The Daughter quiz has its own variant (DaughterEmailCapture) that
 * predates this generic. Either is fine; this one is the canonical
 * pattern going forward.
 */
export default function QuizEmailCapture({
  source,
  tags,
  resultLabel,
  description,
}: QuizEmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  if (state.kind === "dismissed") return null;

  if (state.kind === "success") {
    return (
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-12 p-6 bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/30 rounded-xl"
      >
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-9 h-9 rounded-full bg-green-500/15 border border-green-500/40 flex items-center justify-center">
            <Check size={16} className="text-green-400" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-light text-white mb-1">
              {state.isNew ? "You're in." : "You're already on the list."}
            </h3>
            <p className="text-text-gray text-sm leading-relaxed">
              {state.isNew
                ? "I'll email a copy of this read within the next few minutes. The Sunday letters that follow go to people in this exact niche, no fluff, opt out anytime."
                : "Your existing subscription has been tagged with your quiz profile, so future emails are calibrated to it. Nothing else changes."}
            </p>
          </div>
        </div>
      </m.div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.kind === "submitting") return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setState({ kind: "error", message: "Please enter a valid email." });
      return;
    }

    setState({ kind: "submitting" });

    const finalTags = Array.from(new Set([source, ...tags]));

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name.trim() || undefined,
          source,
          tags: finalTags,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setState({
          kind: "error",
          message: data.error ?? "Something went wrong. Try again in a moment.",
        });
        return;
      }

      const data = (await res.json()) as { isNew?: boolean };
      setState({ kind: "success", isNew: data.isNew ?? true });
    } catch {
      setState({
        kind: "error",
        message:
          "Couldn't connect. Check your internet and try again, your result is still safe above.",
      });
    }
  };

  const copy =
    description ??
    `Many readers come back to their ${resultLabel} read after sitting with it for a few days. I'll email you a copy plus a short reading list tailored to your profile.`;

  return (
    <AnimatePresence>
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="mb-12 p-6 bg-gradient-to-br from-accent-gold/8 to-transparent border border-accent-gold/25 rounded-xl relative"
      >
        <button
          type="button"
          onClick={() => setState({ kind: "dismissed" })}
          aria-label="Dismiss email capture"
          className="absolute top-3 right-3 text-text-gray/40 hover:text-text-gray transition-colors"
        >
          <X size={16} strokeWidth={1.5} />
        </button>

        <div className="flex items-start gap-3 mb-5">
          <div className="shrink-0 w-9 h-9 rounded-full bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center">
            <Mail size={16} className="text-accent-gold" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-light text-white mb-1">
              Want this emailed to you?
            </h3>
            <p className="text-text-gray text-sm leading-relaxed">{copy}</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your first name (optional)"
            disabled={state.kind === "submitting"}
            className="flex-1 px-4 py-3 bg-deep-black/60 border border-accent-gold/20 rounded text-white placeholder:text-text-gray/40 focus:outline-none focus:border-accent-gold/60 transition-colors text-sm disabled:opacity-50"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={state.kind === "submitting"}
            className="flex-1 px-4 py-3 bg-deep-black/60 border border-accent-gold/20 rounded text-white placeholder:text-text-gray/40 focus:outline-none focus:border-accent-gold/60 transition-colors text-sm disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={state.kind === "submitting" || !email}
            className="px-6 py-3 bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-xs rounded hover:bg-accent-gold/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {state.kind === "submitting" ? (
              <>
                <Loader2 size={14} className="animate-spin" strokeWidth={2} />
                Sending
              </>
            ) : (
              "Email Me The Result"
            )}
          </button>
        </form>

        {state.kind === "error" && (
          <p className="mt-3 text-xs text-red-400 leading-relaxed">
            {state.message}
          </p>
        )}

        <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-text-gray/50 leading-relaxed">
          One welcome email + the Sunday letter when there is one. No daily
          spam. Unsubscribe anytime.
        </p>
      </m.div>
    </AnimatePresence>
  );
}
