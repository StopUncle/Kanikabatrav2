"use client";

import { useState } from "react";

/**
 * The recovery door for a pact whose payment failed.
 *
 * Weekly billing fails often, and a suspended member cannot write, cannot
 * keep a week, and is refused a second checkout (that would double-bill).
 * The only correct move is a new card on the existing subscription, which
 * is what the Stripe portal does. Without this button the member's pact
 * simply expired in silence with their scars intact.
 */
export default function ResumeBilling() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function open() {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/pact/subscription/portal", {
        method: "POST",
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error || "Could not open billing. Please try again.");
    } catch {
      setError("Could not open billing. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mb-5 rounded-2xl border border-[var(--pact-blood-dried)] bg-[var(--app-card)] px-4 py-4">
      <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--pact-blood)]">
        The last payment did not go through
      </p>
      <p className="mt-1.5 text-app-caption leading-relaxed text-[var(--app-muted)]">
        Your pact is still here and your record is intact. Put a working
        card on it and your week opens again where you left it.
      </p>
      <button
        type="button"
        onClick={open}
        disabled={busy}
        className="mt-3.5 w-full rounded-full bg-[var(--pact-blood)] px-5 py-3 text-[12.5px] uppercase tracking-[0.16em] text-[var(--app-text)] transition-transform active:scale-[0.97] disabled:opacity-50"
      >
        {busy ? "Opening billing" : "Update the card"}
      </button>
      {error && (
        <p className="mt-2.5 text-[12.5px] text-[var(--app-rose)]">{error}</p>
      )}
    </div>
  );
}
