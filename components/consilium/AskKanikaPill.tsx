"use client";

import { useEffect, useState, useCallback } from "react";
import { MessageCircle } from "lucide-react";
import AskKanikaModal from "./AskKanikaModal";

type CooldownState = {
  allowed: boolean;
  nextAvailableAt?: string;
  remainingToday: number;
  dailyCap: number;
};

/**
 * The Ask Kanika entry point in the MemberPillNav.
 *
 * Three states drive the label:
 *   - Available  → "Ask Kanika" + subtle gold pulse on the pill border
 *   - Cooldown   → "Ask Kanika · 12h" with live countdown
 *   - Answered   → "Ask Kanika 🟢" green-dot indicator (overrides countdown)
 *
 * Click → opens the AskKanikaModal. State refetches when the modal
 * closes so a just-submitted question flips the pill into cooldown
 * without a page reload.
 *
 * Lazy: fetches /me on mount, refreshes every 90s while idle, and
 * always after a modal close. Total cost ≈ one tiny query per page
 * load, then once per minute and a half. Negligible.
 */
export default function AskKanikaPill() {
  const [open, setOpen] = useState(false);
  const [cooldown, setCooldown] = useState<CooldownState | null>(null);
  const [hasUnreadAnswer, setHasUnreadAnswer] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const fetchState = useCallback(async () => {
    try {
      const r = await fetch("/api/consilium/questions/me", { cache: "no-store" });
      if (!r.ok) return;
      const body = await r.json();
      setCooldown(body.cooldown ?? null);
      setHasUnreadAnswer(Boolean(body.hasUnreadAnswer));
    } catch {
      // Silent — pill renders in default state if the fetch fails.
    }
  }, []);

  // Initial fetch + 90s refresh.
  useEffect(() => {
    fetchState();
    const id = setInterval(fetchState, 90_000);
    return () => clearInterval(id);
  }, [fetchState]);

  // Refresh on modal close so any just-submitted question flips state.
  const handleClose = useCallback(() => {
    setOpen(false);
    fetchState();
  }, [fetchState]);

  // Tick "now" every second while the pill is showing a countdown.
  // Skipped when modal is open (modal has its own timer) or pill has
  // no cooldown to display.
  const showingCountdown = !open && !hasUnreadAnswer && cooldown && !cooldown.allowed;
  useEffect(() => {
    if (!showingCountdown) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [showingCountdown]);

  const cooldownMs =
    cooldown?.nextAvailableAt
      ? Math.max(0, new Date(cooldown.nextAvailableAt).getTime() - now)
      : 0;

  // Visual variants. Order of precedence: answered > cooldown > available.
  const variant: "answered" | "cooldown" | "available" = hasUnreadAnswer
    ? "answered"
    : cooldown && !cooldown.allowed
      ? "cooldown"
      : "available";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ask Kanika"
        className={`group shrink-0 snap-start inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-[11px] tracking-[0.18em] uppercase transition-all duration-200 ${
          variant === "answered"
            ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-300 shadow-[0_0_16px_-6px_rgba(52,211,153,0.5)]"
            : variant === "cooldown"
              ? "border-warm-gold/25 text-text-gray/75 hover:border-warm-gold/40 hover:text-warm-gold"
              : "border-warm-gold/40 text-warm-gold/90 bg-warm-gold/5 hover:bg-warm-gold/10 shadow-[0_0_14px_-6px_rgba(212,175,55,0.45)]"
        }`}
      >
        <MessageCircle
          size={13}
          strokeWidth={1.6}
          className="shrink-0"
        />
        <span className="whitespace-nowrap leading-none">Ask Kanika</span>
        {variant === "cooldown" && cooldownMs > 0 && (
          <span className="ml-0.5 inline-flex items-center pl-2 border-l border-warm-gold/15 tabular-nums text-[10px] tracking-wider text-text-gray/60 leading-none">
            {formatShortCountdown(cooldownMs)}
          </span>
        )}
        {variant === "answered" && (
          <span
            className="ml-0.5 inline-flex items-center pl-2 border-l border-emerald-400/25"
            aria-label="Kanika answered your question"
          >
            <span className="relative inline-flex w-1.5 h-1.5">
              <span
                aria-hidden
                className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping"
              />
              <span
                aria-hidden
                className="relative inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"
              />
            </span>
          </span>
        )}
      </button>
      <AskKanikaModal open={open} onClose={handleClose} />
    </>
  );
}

/** Compact countdown for the pill chip — hours-and-minutes only. */
function formatShortCountdown(ms: number): string {
  const totalMin = Math.max(0, Math.floor(ms / 60_000));
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m`;
  return "<1m";
}
