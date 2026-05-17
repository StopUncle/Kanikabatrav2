"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { catalogueStats } from "@/lib/simulator/stats";

const INCLUDED = [
  `The Dark Mirror Simulator, ${catalogueStats.scenarios} branching scenarios across ${catalogueStats.tracks} tracks`,
  "Full course library, dark psychology, pattern recognition, career strategy",
  "Voice notes from Kanika, raw, unfiltered, members-only",
  "Daily psychology drops + discussion prompts",
  "Forum + live chat with the council",
  "Member price on the Sociopathic Dating Bible, $9.99 (vs $24.99)",
];

type BillingCycle = "monthly" | "annual";

/**
 * Join card with a monthly / annual plan toggle.
 *
 * Annual is positioned as the recommended option (Recurly: annual subs
 * churn 51% less). "2 months free" is mathematically true ($29 x 12 =
 * $348, annual price is $290 = a $58 saving, which is exactly two
 * monthly payments).
 *
 * Defaults to ANNUAL on first render. This matters: defaults steer
 * choice. The member can flip to monthly with one click, but the
 * higher-LTV plan is the one they see first.
 *
 * POSTs to /api/consilium/subscription/create with the chosen cycle
 * and redirects to Stripe. The success webhook stamps billingCycle on
 * the membership row.
 */
export default function JoinPanel() {
  const [cycle, setCycle] = useState<BillingCycle>("annual");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleJoin() {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/consilium/subscription/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ billingCycle: cycle }),
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

  const isAnnual = cycle === "annual";
  const displayPrice = isAnnual ? "$290" : "$29";
  const displayPeriod = isAnnual ? "/year" : "/month";
  const subline = isAnnual
    ? "About $24.17/month, billed annually"
    : "Cancel anytime · Instant access";
  const ctaCopy = isAnnual ? "Join, $290/year" : "Join, $29/month";

  return (
    <div className="bg-deep-black/50 backdrop-blur-sm border border-warm-gold/20 rounded-2xl p-8">
      <div
        role="tablist"
        aria-label="Choose billing cycle"
        className="flex items-center gap-1 p-1 mb-6 bg-deep-black/60 border border-warm-gold/15 rounded-full"
      >
        <button
          role="tab"
          aria-selected={!isAnnual}
          onClick={() => setCycle("monthly")}
          disabled={submitting}
          className={`flex-1 py-2 px-4 rounded-full text-xs uppercase tracking-[0.18em] font-light transition-all duration-200 ${
            !isAnnual
              ? "bg-warm-gold/20 text-text-light"
              : "text-text-gray/70 hover:text-text-light"
          }`}
        >
          Monthly
        </button>
        <button
          role="tab"
          aria-selected={isAnnual}
          onClick={() => setCycle("annual")}
          disabled={submitting}
          className={`flex-1 relative py-2 px-4 rounded-full text-xs uppercase tracking-[0.18em] font-light transition-all duration-200 ${
            isAnnual
              ? "bg-warm-gold/20 text-text-light"
              : "text-text-gray/70 hover:text-text-light"
          }`}
        >
          Annual
          <span className="ml-2 text-[10px] text-warm-gold/90 normal-case tracking-wider">
            2 months free
          </span>
        </button>
      </div>

      <div className="flex items-baseline justify-center gap-2 mb-2">
        <span className="text-5xl font-extralight text-warm-gold tabular-nums">
          {displayPrice}
        </span>
        <span className="text-text-gray font-light">{displayPeriod}</span>
      </div>
      <p className="text-text-gray/60 text-xs text-center uppercase tracking-[0.25em] mb-8">
        {subline}
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
            {ctaCopy}
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
