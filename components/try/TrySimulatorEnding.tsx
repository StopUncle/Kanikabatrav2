"use client";

import { useState } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Loader2, Check } from "lucide-react";

/**
 * Ending-screen conversion block for the public /try Simulator demo.
 *
 * The visitor just finished a full scenario, the highest-intent moment.
 * Before the paid membership ask, we capture the email: "get your read
 * plus three more free scenarios." Tagged source "try-simulator" so the
 * cohort gets its own drip later. The $29/mo Consilium link stays
 * visible underneath so a non-capturer can still convert directly.
 *
 * Rendered into EndingScreen's `customCta` slot via PublicSimulatorClient,
 * so the shared EndingScreen / SimulatorRunner stay untouched.
 */
export default function TrySimulatorEnding() {
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
          source: "try-simulator",
          tags: ["try-simulator"],
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

  const consiliumLink = (
    <Link
      href="/consilium/apply?src=try"
      className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-sm rounded-full hover:bg-accent-gold/90 transition-all"
    >
      Step Inside, $29/mo
      <ArrowRight size={16} strokeWidth={1.5} />
    </Link>
  );

  return (
    <div className="w-full sm:w-auto sm:max-w-sm self-center">
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <m.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="inline-flex items-center gap-2 text-accent-gold text-sm font-light">
              <Check size={15} strokeWidth={2} />
              On its way. Three more scenarios are in your inbox.
            </p>
            {consiliumLink}
          </m.div>
        ) : (
          <m.div
            key="capture"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-stretch gap-3"
          >
            <p className="text-text-gray text-xs text-center leading-relaxed">
              Want your full read plus three more scenarios, free?
            </p>
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
                  "Get them"
                )}
              </button>
            </form>
            {state === "error" && error && (
              <p role="alert" className="text-red-400 text-xs text-center">
                {error}
              </p>
            )}
            <Link
              href="/consilium/apply?src=try"
              className="text-text-gray/60 hover:text-accent-gold text-[11px] text-center tracking-wide transition-colors"
            >
              or step inside the full game, $29/mo &rarr;
            </Link>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
