"use client";

/**
 * Soft choice timer rendered above the choice cards on `mood: danger`
 * scenes. Fills a slim 12-second progress bar from left to right.
 *
 * CRITICAL: this NEVER auto-picks. The bar manufactures embodied
 * pressure, a felt sense of "decide", without changing outcomes.
 * Faster choices = more scenes per session = more dopamine cycles,
 * but the player is always the one who picks.
 *
 * Reduced-motion: respects `prefers-reduced-motion`. We render the
 * bar at 0% width with a static "Decide" hint instead of the
 * filling animation.
 */
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

type Props = {
  /** Stable id (sceneId works), when this changes the timer resets. */
  resetKey: string;
  durationMs?: number;
};

export default function ChoiceTimer({ resetKey, durationMs = 12000 }: Props) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      key={resetKey}
      className="max-w-md mx-auto mb-3 px-4"
      aria-hidden
    >
      <div className="flex items-center gap-2 mb-1.5 justify-center">
        <Clock
          size={11}
          className="text-red-400/70"
          strokeWidth={1.6}
        />
        <span className="text-[10px] uppercase tracking-[0.3em] text-red-400/70">
          {reducedMotion ? "Decide" : "Decide before you think too hard"}
        </span>
      </div>
      <div className="relative h-[2px] rounded-full overflow-hidden bg-white/[0.06]">
        {!reducedMotion && (
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500/60 via-amber-400/60 to-red-500/40 origin-left"
            style={{
              animation: `choice-timer-fill ${durationMs}ms linear forwards`,
            }}
          />
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
