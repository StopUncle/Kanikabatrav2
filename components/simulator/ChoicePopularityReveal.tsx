"use client";

/**
 * Brief reveal showing what fraction of players picked the choice the
 * current player just made. Fades in over 400ms, holds for ~2s, fades
 * out. Designed to register without breaking the scene transition flow.
 *
 * Two simultaneous pulls:
 *   - Identity hit ("I'm in the rare 23%")
 *   - Curiosity ("what did the other 77% do?")
 *
 * Source data: GET /api/simulator/choice-popularity?scenarioId=X
 * (server-side aggregation, cached 1h, suppresses scenes with <5 picks).
 *
 * Implementation note: rendered AFTER the choice resolves (not during
 * the cards). Sits above the dialog when the next scene loads, fades
 * out before the player has a chance to feel like it's nagging.
 */
import { useEffect, useState } from "react";
import { Users } from "lucide-react";

type Props = {
  /** Pick rate 0..1, or null to suppress. */
  rate: number | null;
  /** Stable id (the picked choice id), change resets the reveal. */
  resetKey: string;
};

export default function ChoicePopularityReveal({ rate, resetKey }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (rate === null || rate === undefined) {
      setVisible(false);
      return;
    }
    setVisible(true);
    // Hold ~2s after fade-in, then fade out.
    const fadeOut = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(fadeOut);
  }, [rate, resetKey]);

  if (rate === null || rate === undefined) return null;

  const pct = Math.round(rate * 100);
  // The flavor changes by rarity. Rare picks should feel like identity
  // signals; common picks should land softer (less "you're a sheep" energy).
  const isRare = pct <= 25;
  const isCommon = pct >= 65;
  const message = isRare
    ? `Only ${pct}% of players chose this`
    : isCommon
      ? `${pct}% of players chose this`
      : `${pct}% of players chose this`;

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 top-20 z-30 flex justify-center transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-live="polite"
    >
      <div
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border backdrop-blur-md text-[11px] uppercase tracking-[0.2em] ${
          isRare
            ? "border-accent-gold/40 bg-deep-black/70 text-accent-gold"
            : "border-white/10 bg-deep-black/60 text-text-gray"
        }`}
      >
        <Users size={11} strokeWidth={1.6} />
        <span>{message}</span>
      </div>
    </div>
  );
}
