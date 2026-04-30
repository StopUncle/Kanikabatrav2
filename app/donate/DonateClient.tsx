"use client";

import { useState } from "react";
import { Heart, Loader2 } from "lucide-react";

/**
 * Donate page. Pay-what-you-want via Stripe `custom_unit_amount` —
 * the actual dollar input lives on Stripe's hosted Checkout, so this
 * page is just the framing + an optional message + email + the redirect.
 *
 * Structure:
 *   1. Hero, what donations support, in plain language
 *   2. Form, optional email, optional message, optional anonymous toggle
 *   3. Submit. POSTs /api/donate/create-session, redirects to Stripe
 *
 * No suggested tiers / "$5 / $10 / $25" buttons. Stripe's amount field
 * does that natively, no need to duplicate.
 */
export default function DonateClient() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const r = await fetch("/api/donate/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim() || undefined,
          message: message.trim() || undefined,
          isAnonymous,
        }),
      });
      const body = await r.json();
      if (!r.ok || !body.url) {
        setError(body.error ?? "Couldn't start checkout. Please try again.");
        setSubmitting(false);
        return;
      }
      window.location.href = body.url;
    } catch {
      setError("Couldn't reach the server. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-deep-black text-text-light pt-20 pb-32">
      <div className="max-w-xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-warm-gold/30 text-warm-gold/90 text-[10px] uppercase tracking-[0.3em] mb-6">
            <Heart size={11} fill="currentColor" />
            Support
          </span>
          <h1 className="text-4xl sm:text-5xl font-extralight tracking-wide text-white mb-5">
            Support the work
          </h1>
          <p className="text-text-gray text-base leading-relaxed max-w-md mx-auto">
            If the books, the simulator, the community, or the writing has
            meant something to you, thank you. A donation goes directly
            toward keeping it all going. Pay whatever feels right.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-warm-gold/20 bg-deep-black/60 p-6 sm:p-8"
        >
          <div className="mb-5">
            <label
              htmlFor="donate-email"
              className="block text-warm-gold/80 text-[10px] uppercase tracking-[0.25em] mb-2"
            >
              Email (optional)
            </label>
            <input
              id="donate-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              disabled={submitting}
              className="w-full rounded-lg border border-warm-gold/15 bg-deep-black/60 px-3 py-2.5 text-text-light placeholder:text-text-gray/40 focus:outline-none focus:border-warm-gold/45"
            />
            <p className="mt-1 text-[11px] text-text-gray/55">
              For the thank-you email. Leave blank if you&apos;d rather not be
              contacted. Stripe will still send a receipt.
            </p>
          </div>

          <div className="mb-5">
            <label
              htmlFor="donate-message"
              className="block text-warm-gold/80 text-[10px] uppercase tracking-[0.25em] mb-2"
            >
              Message to Kanika (optional)
            </label>
            <textarea
              id="donate-message"
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 500))}
              placeholder="Anything you want to say."
              rows={4}
              disabled={submitting}
              className="w-full rounded-lg border border-warm-gold/15 bg-deep-black/60 px-3 py-2.5 text-text-light placeholder:text-text-gray/40 focus:outline-none focus:border-warm-gold/45 resize-none"
            />
            <p className="mt-1 text-[11px] text-text-gray/55 text-right tabular-nums">
              {message.length}/500
            </p>
          </div>

          <label className="flex items-start gap-3 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              disabled={submitting}
              className="mt-0.5 accent-warm-gold"
            />
            <span className="text-[12px] text-text-gray leading-relaxed">
              Donate anonymously. Your name won&apos;t appear in any
              public acknowledgement, even if you include one in the
              message above.
            </span>
          </label>

          {error && (
            <p className="mb-4 text-[12px] text-rose-400/90">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-warm-gold/90 hover:bg-warm-gold text-deep-black font-semibold text-[13px] tracking-[0.2em] uppercase py-3 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Redirecting…
              </>
            ) : (
              <>
                <Heart size={14} fill="currentColor" />
                Continue to Stripe
              </>
            )}
          </button>

          <p className="mt-4 text-[11px] text-text-gray/50 text-center leading-relaxed">
            You&apos;ll set the amount on the next page. Stripe handles the payment
            securely. Kanika never sees your card details. One-time donation;
            this is not a subscription.
          </p>
        </form>
      </div>
    </main>
  );
}
