"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  Mail,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { getAttributionForSubmit } from "@/lib/attribution";
import { STARTER_PATTERNS } from "@/lib/starter-pack-content";

/**
 * Pattern Recognition Starter Pack, the second of three free email-
 * capture surfaces (mini quiz / starter pack / paid full assessment).
 * Per the multimillion-roadmap, the goal is owned-email capture, not
 * paid conversion in this surface.
 *
 * The deliverable is a styled HTML email. There is no PDF download
 * because (a) HTML email is universally readable, (b) the email IS
 * the touchpoint we want to maintain post-capture, (c) PDF generation
 * is yet another build with no upside over inline HTML.
 */

type State = "form" | "submitting" | "sent";

export default function StarterPackForm() {
  const [state, setState] = useState<State>("form");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Enter a valid email so we can send the pack.");
      return;
    }
    setState("submitting");
    setError(null);
    try {
      const attribution = getAttributionForSubmit();
      const res = await fetch("/api/starter-pack/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          attribution,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.error ?? "Something went wrong. Try again in a moment.",
        );
      }
      setState("sent");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Try again in a moment.",
      );
      setState("form");
    }
  }

  return (
    <div className="bg-gradient-to-br from-deep-burgundy/15 to-deep-navy/20 backdrop-blur-sm border border-warm-gold/25 rounded-2xl p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {state !== "sent" ? (
          <m.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-warm-gold/80 text-[10px] uppercase tracking-[0.3em] mb-3">
              The Pattern Recognition Starter Pack
            </p>
            <h3 className="text-2xl sm:text-3xl font-extralight tracking-wider uppercase text-text-light mb-3">
              Five tactics. Named.
            </h3>
            <p className="text-text-gray font-light leading-relaxed text-sm sm:text-base mb-5">
              {STARTER_PATTERNS.length} of the most common manipulator
              patterns, each with a clinical definition, three concrete
              examples, and the tell that makes it diagnosable. In your
              inbox in 60 seconds. Free.
            </p>

            {/* Show the pattern names so visitors know what they're
                getting before they hand over the email. The names
                themselves teach. */}
            <ul className="mb-6 space-y-2">
              {STARTER_PATTERNS.map((p) => (
                <li
                  key={p.name}
                  className="text-text-light text-sm font-light flex items-start gap-2"
                >
                  <span
                    aria-hidden
                    className="text-warm-gold/70 mt-0.5 shrink-0"
                  >
                    ·
                  </span>
                  <span>{p.name}</span>
                </li>
              ))}
            </ul>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Mail
                  size={16}
                  strokeWidth={1.6}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gold/60 pointer-events-none"
                />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  disabled={state === "submitting"}
                  className="w-full bg-deep-black/60 border border-warm-gold/25 rounded-full pl-11 pr-5 py-3.5 text-text-light placeholder:text-text-gray/40 focus:border-warm-gold/60 focus:outline-none focus:ring-2 focus:ring-warm-gold/30 transition-all disabled:opacity-60"
                />
              </div>
              {error && (
                <p role="alert" className="text-red-400/90 text-xs font-light">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={state === "submitting"}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-warm-gold text-deep-black font-medium text-sm tracking-wider uppercase transition-all hover:bg-warm-gold/90 hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.45)] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {state === "submitting" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Send the pack
                    <ArrowRight size={16} strokeWidth={1.8} />
                  </>
                )}
              </button>
              <div className="flex items-center justify-center gap-1.5 pt-1 text-text-gray/55 text-[11px]">
                <ShieldCheck size={11} className="text-warm-gold/50" />
                <span>
                  No spam. One email with the pack. Unsubscribe any time.
                </span>
              </div>
            </form>
          </m.div>
        ) : (
          <m.div
            key="sent"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center py-4"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-warm-gold/15 border border-warm-gold/40 mb-4">
              <CheckCircle2
                size={22}
                strokeWidth={1.6}
                className="text-warm-gold"
              />
            </div>
            <p className="text-warm-gold/70 text-[10px] uppercase tracking-[0.4em] mb-2">
              Sent
            </p>
            <h3 className="text-xl font-extralight tracking-wider uppercase text-text-light mb-2">
              Check your inbox.
            </h3>
            <p className="text-text-gray text-sm font-light leading-relaxed max-w-sm mx-auto">
              The Starter Pack will land in the next 60 seconds. Check
              promotions if it doesn&apos;t show up.
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
