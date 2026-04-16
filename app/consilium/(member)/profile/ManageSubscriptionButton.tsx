"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";

/**
 * Opens the Stripe Customer Portal for the signed-in member. Hitting
 * /api/consilium/subscription/portal returns the portal URL; we redirect
 * there so Stripe handles card changes, cancellation, and invoice
 * history without us reimplementing any of it.
 */
export default function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function openPortal() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/consilium/subscription/portal", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to open portal");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to open portal");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={openPortal}
        disabled={loading}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-warm-gold/40 text-warm-gold text-sm tracking-[0.15em] uppercase hover:bg-warm-gold/10 hover:border-warm-gold/70 transition-all disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            Opening…
          </>
        ) : (
          <>
            <CreditCard size={14} strokeWidth={1.5} />
            Manage Subscription
          </>
        )}
      </button>
      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
    </div>
  );
}
