"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Mail, Check, Loader2, X } from "lucide-react";
import type { DaughterType } from "@/lib/quiz-daughter-data";

interface DaughterEmailCaptureProps {
  /** The user's primary daughter type — used to tag the Subscriber for segmentation. */
  primaryType: DaughterType;
  /** Optional secondary type — also tagged. */
  secondaryType?: DaughterType;
  /** Compact composite label e.g. "The Hypervigilant" — shown in the headline. */
  primaryProfileName: string;
}

type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; isNew: boolean }
  | { kind: "error"; message: string }
  | { kind: "dismissed" };

// Soft opt-in email capture for the Daughter Pattern results page.
//
// Design intent: this is NOT a paywall and NOT a friction wall. The user
// has already received their full free result above this component. The
// capture is a kind, optional offer — "want this emailed to you so you
// can come back to it?" Dismissable. Skippable. The result remains
// fully visible above whether the user submits or not.
//
// Tags the Subscriber with `daughter-quiz` + the user's primary type
// (e.g. `daughter-type:hypervigilant`) so future email sequences can
// segment by profile and send tailored follow-ups. Reuses the existing
// /api/newsletter endpoint — no new API route, no new schema.
export default function DaughterEmailCapture({
  primaryType,
  secondaryType,
  primaryProfileName,
}: DaughterEmailCaptureProps) {
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
                ? "I'll email a copy of this result and a short reading list tailored to your profile within the next few minutes. The Sunday emails after that go to people in this exact niche — no fluff, opt out anytime."
                : "Your existing subscription has been tagged with your daughter-pattern profile, so future emails are calibrated to it. Nothing else changes."}
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

    // Tags carry segmentation signal. `daughter-quiz` flags the source;
    // `daughter-type:<slug>` lets future Mailchimp / Resend campaigns
    // pull the Hypervigilant readers into one segment, the Fawn readers
    // into another, etc. Secondary type is also tagged because a
    // significant minority of users sit between two profiles.
    const tags = [
      "daughter-quiz",
      `daughter-type:${primaryType}`,
      ...(secondaryType && secondaryType !== primaryType
        ? [`daughter-type-secondary:${secondaryType}`]
        : []),
    ];

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name.trim() || undefined,
          source: "daughter-quiz",
          tags,
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
          "Couldn't connect. Check your internet and try again — your result is still safe above.",
      });
    }
  };

  return (
    <AnimatePresence>
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="mb-12 p-6 bg-gradient-to-br from-accent-gold/8 to-transparent border border-accent-gold/25 rounded-xl relative"
      >
        {/* Dismiss — kept small and quiet. The capture is opt-in; the
            dismiss is a one-tap exit so users who don't want to share
            their email don't feel pressured. */}
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
            <p className="text-text-gray text-sm leading-relaxed">
              Many readers want to come back to their {primaryProfileName} read
              after they've sat with it for a few days. I'll email you a copy of
              the result, plus a short reading list tailored to your profile —
              the next two articles to read, the chapter of the book that maps
              onto your pattern, and the specific Inner Circle threads other
              women in your profile have found most useful.
            </p>
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
