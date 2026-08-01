"use client";

/**
 * Soft choice timer rendered above the choice cards. Fills a slim
 * progress bar from left to right. Two uses:
 *
 *   - Story mode, `mood: danger` scenes only: purely cosmetic pressure,
 *     12 seconds, nothing happens on expiry.
 *   - Gauntlet mode, every choice scene: 10 seconds, expiry fires
 *     `onExpire` exactly once so the runner can mark the pick as
 *     hesitated (which breaks the streak chain).
 *
 * CRITICAL: this NEVER auto-picks. The bar manufactures embodied
 * pressure, a felt sense of "decide", without taking the choice away.
 * Expiry costs streak, not agency.
 *
 * Reduced-motion: no filling animation. Cosmetic use renders a static
 * "Decide" hint. When `onExpire` is set the clock is a game rule, so a
 * numeric seconds countdown renders instead; a timer that punishes
 * silently would be unfair.
 */
import { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";

type Props = {
  /** Stable id (sceneId works), when this changes the timer resets. */
  resetKey: string;
  durationMs?: number;
  /** Fired once when the clock runs out. Absent = cosmetic timer. */
  onExpire?: () => void;
};

export default function ChoiceTimer({
  resetKey,
  durationMs = 12000,
  onExpire,
}: Props) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [expired, setExpired] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(durationMs / 1000));
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const armed = !!onExpire;

  useEffect(() => {
    if (!armed) return;
    setExpired(false);
    setSecondsLeft(Math.ceil(durationMs / 1000));
    const timeout = setTimeout(() => {
      setExpired(true);
      onExpireRef.current?.();
    }, durationMs);
    const tick = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => {
      clearTimeout(timeout);
      clearInterval(tick);
    };
  }, [armed, durationMs, resetKey]);

  const label = expired
    ? "Time's gone. Choose anyway."
    : reducedMotion
      ? armed
        ? `${secondsLeft}s`
        : "Decide"
      : "Decide before you think too hard";

  return (
    <div key={resetKey} className="max-w-md mx-auto mb-3 px-4" aria-hidden>
      <div className="flex items-center gap-2 mb-1.5 justify-center">
        <Clock
          size={11}
          className={expired ? "text-text-gray/50" : "text-red-400/70"}
          strokeWidth={1.6}
        />
        <span
          className={`text-[10px] uppercase tracking-[0.3em] ${
            expired ? "text-text-gray/50" : "text-red-400/70"
          }`}
        >
          {label}
        </span>
      </div>
      <div className="relative h-[2px] rounded-full overflow-hidden bg-white/[0.06]">
        {!reducedMotion && !expired && (
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500/60 via-amber-400/60 to-red-500/40 origin-left"
            style={{
              animation: `choice-timer-fill ${durationMs}ms linear forwards`,
            }}
          />
        )}
        {expired && (
          <div className="absolute inset-0 bg-white/[0.12]" />
        )}
      </div>
      <style>{`
        @keyframes choice-timer-fill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
