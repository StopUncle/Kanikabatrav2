import type { ReactNode } from "react";
import { cn } from "./cn";

/**
 * The surface everything in the app sits on.
 *
 * This shape was not designed here, it was counted. Twenty-odd places in the
 * app already draw the same card and differ only in padding, so the majority
 * spelling became the default and the near-misses became the variants. The
 * point is not that a card is hard to write, it is that writing it by hand
 * twenty times is how the app ended up with five corner radii.
 */

type CardTone = "default" | "raised" | "gold" | "quiet";
type CardPad = "none" | "tight" | "default" | "roomy";

const TONES: Record<CardTone, string> = {
  default: "border-[var(--app-line-soft)] bg-[var(--app-card)]",
  raised: "border-[var(--app-line)] bg-[var(--app-card-2)]",
  // For the one card on a screen that is asking for something.
  gold: "border-[var(--app-gold-soft)] bg-[var(--app-card)]",
  // Grouping without claiming attention: no fill, just an edge.
  quiet: "border-[var(--app-line-soft)] bg-transparent",
};

const PADS: Record<CardPad, string> = {
  none: "",
  tight: "px-4 py-3.5",
  default: "p-4",
  roomy: "p-5",
};

export interface CardProps {
  children: ReactNode;
  tone?: CardTone;
  pad?: CardPad;
  className?: string;
}

export default function Card({
  children,
  tone = "default",
  pad = "default",
  className = "",
}: CardProps) {
  return (
    <div className={cn("rounded-2xl border", TONES[tone], PADS[pad], className)}>
      {children}
    </div>
  );
}
