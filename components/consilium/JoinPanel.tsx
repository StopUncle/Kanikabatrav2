"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";

const INCLUDED = [
  "The Dark Mirror Simulator — 30 branching scenarios across three tracks",
  "Full course library — dark psychology, pattern recognition, career strategy",
  "Voice notes from Kanika — raw, unfiltered, members-only",
  "Daily psychology drops + discussion prompts",
  "Forum + live chat with the council",
  "Member price on the Sociopathic Dating Bible — $9.99 (vs $24.99)",
];

/**
 * Single-button join card. Replaces the old multi-field application
 * form. POSTs to the subscription/create endpoint and redirects the
 * browser to Stripe — payment success activates the membership via
 * the existing webhook + redirects to /consilium/feed.
 */
export default function JoinPanel() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleJoin() {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/consilium/subscription/create", {
        method: "POST",
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      setError(
        data.error ?? "Couldn't start checkout. Please try again in a moment.",
      );
      setSubmitting(false);
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-deep-black/50 backdrop-blur-sm border border-warm-gold/20 rounded-2xl p-8">
      <div className="flex items-baseline justify-center gap-2 mb-2">
        <span className="text-5xl font-extralight text-warm-gold tabular-nums">
          $29
        </span>
        <span className="text-text-gray font-light">/month</span>
      </div>
      <p className="text-text-gray/60 text-xs text-center uppercase tracking-[0.25em] mb-8">
        Cancel anytime · Instant access
      </p>

      <ul className="space-y-3 mb-8">
        {INCLUDED.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <CheckCircle
              size={16}
              className="text-warm-gold mt-0.5 shrink-0"
              strokeWidth={1.5}
            />
            <p className="text-text-gray text-sm font-light leading-relaxed">
              {item}
            </p>
          </li>
        ))}
      </ul>

      <button
        onClick={handleJoin}
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full text-text-light font-medium uppercase tracking-wider text-sm transition-all duration-300 disabled:opacity-60"
        style={{
          background: "linear-gradient(135deg, #720921, #6366f1)",
          boxShadow:
            "0 8px 20px rgba(114,9,33,0.3), 0 8px 20px rgba(99,102,241,0.3)",
        }}
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Opening checkout...
          </>
        ) : (
          <>
            Join — $29/month
            <ArrowRight size={16} />
          </>
        )}
      </button>

      {error && (
        <p className="text-red-400 text-xs text-center mt-4 font-light">
          {error}
        </p>
      )}
    </div>
  );
}
