"use client";

import { useState } from "react";
import { Loader2, Check, ArrowRight } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Lead capture for high-intent coaching visitors who are not ready to drop
 * $297 to $4,997 on the spot. Direct-checkout alone loses everyone who needs
 * a beat to decide. This captures the email (source "coaching"), which fires
 * the coaching nurture drip, and reuses the shared /api/newsletter contract.
 */
export default function CoachingLeadCapture() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    if (!EMAIL_RE.test(email.trim())) {
      setError("That email does not look right.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
          source: "coaching",
          tags: ["coaching-lead"],
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong. Try again.");
        setSubmitting(false);
        return;
      }
      setDone(true);
      setSubmitting(false);
    } catch {
      setError("Network error. Try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto rounded-2xl border border-accent-gold/20 bg-[#0a0a18] p-7 sm:p-9 text-center">
      {done ? (
        <div className="py-4">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center">
            <Check className="w-6 h-6 text-accent-gold" />
          </div>
          <p className="text-text-light text-lg font-light mb-2">
            You&rsquo;re on the list.
          </p>
          <p className="text-text-gray/70 text-sm leading-relaxed max-w-sm mx-auto">
            I&rsquo;ll send you what a session actually looks like, and a note
            the next time spots open. No spam.
          </p>
        </div>
      ) : (
        <>
          <h3 className="text-2xl font-light text-text-light mb-2">
            Not ready to book?
          </h3>
          <p className="text-text-gray/70 text-sm leading-relaxed mb-6 max-w-md mx-auto">
            Leave your email. I&rsquo;ll show you what a session actually is, the
            real question most people get stuck on, and first dibs when a spot
            opens. Eight clients a month, no more.
          </p>
          <div className="space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First name (optional)"
              className="w-full bg-deep-black/40 border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-text-light placeholder:text-text-gray/40 focus:outline-none focus:border-accent-gold/50"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void submit();
              }}
              placeholder="you@email.com"
              className="w-full bg-deep-black/40 border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-text-light placeholder:text-text-gray/40 focus:outline-none focus:border-accent-gold/50"
            />
            {error && <p className="text-accent-burgundy text-sm">{error}</p>}
            <button
              onClick={submit}
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-xs hover:bg-accent-gold/90 transition-all disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Sending
                </>
              ) : (
                <>
                  Send me the breakdown
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
