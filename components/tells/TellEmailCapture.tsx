"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Mail, Loader2, Check, Flame } from "lucide-react";

/**
 * Streak-keeper email capture for the public /tells reveal footer.
 *
 * The daily-return loop is the whole reason to ask: "get tomorrow's
 * Tell so your streak never breaks." Captures into /api/newsletter
 * tagged source "tells" so the cohort can get its own daily-habit
 * nurture later. Shown only on the public surface (members already
 * have the habit and a real account).
 */
export default function TellEmailCapture() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "submitting") return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Enter a valid email.");
      setState("error");
      return;
    }

    setState("submitting");
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          source: "tells",
          tags: ["tells"],
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Something went wrong. Try again.");
      }
      setState("success");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Couldn't connect. Try again.",
      );
      setState("error");
    }
  }

  return (
    <div className="rounded-lg border border-accent-gold/25 bg-gradient-to-br from-accent-gold/[0.06] to-transparent p-5">
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <m.p
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-accent-gold text-sm font-light"
          >
            <Check size={15} strokeWidth={2} />
            You&rsquo;re set. Tomorrow&rsquo;s Tell lands in your inbox.
          </m.p>
        ) : (
          <m.div
            key="capture"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center">
                <Flame size={15} className="text-accent-gold" strokeWidth={1.6} />
              </div>
              <div>
                <p className="text-text-light text-sm font-light leading-snug">
                  Don&rsquo;t break your streak.
                </p>
                <p className="text-text-gray text-xs leading-relaxed mt-0.5">
                  Get tomorrow&rsquo;s Tell in your inbox, plus the reads that
                  do not fit in sixty seconds.
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Mail
                  size={14}
                  strokeWidth={1.6}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-gold/50 pointer-events-none"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === "error") setState("idle");
                  }}
                  placeholder="your@email.com"
                  disabled={state === "submitting"}
                  autoComplete="email"
                  inputMode="email"
                  className="w-full pl-8 pr-3 py-2.5 bg-deep-black/60 border border-accent-gold/25 rounded-full text-white text-sm placeholder:text-text-gray/40 focus:outline-none focus:border-accent-gold/60 transition-colors disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={state === "submitting" || !email}
                className="px-5 py-2.5 bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-xs rounded-full hover:bg-accent-gold/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {state === "submitting" ? (
                  <Loader2 size={14} className="animate-spin" strokeWidth={2} />
                ) : (
                  "Notify me"
                )}
              </button>
            </form>
            {state === "error" && error && (
              <p role="alert" className="text-red-400 text-xs mt-2">
                {error}
              </p>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
