import type { ReactNode } from "react";
import { cn } from "./cn";

/**
 * The uppercase label that opens a section, and optionally the thing on the
 * far right of it.
 *
 * Six different letter-spacings were in use for what is visually one element
 * (0.14em through 0.4em), which reads as carelessness at a glance even when
 * nobody can name what is wrong. One spacing, two tones: dim for a plain
 * divider, gold when the section is the point of the screen.
 */

export interface SectionHeaderProps {
  eyebrow: string;
  /** The human sentence under the label. Optional: many sections need none. */
  title?: string;
  /** Usually a Link. Sits on the baseline of the eyebrow, right aligned. */
  action?: ReactNode;
  tone?: "dim" | "gold";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  action,
  tone = "dim",
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-3">
        <h2
          className={cn(
            "text-app-eyebrow uppercase tracking-app-label",
            tone === "gold" ? "text-[var(--app-gold-soft)]" : "text-[var(--app-dim)]",
          )}
        >
          {eyebrow}
        </h2>
        {action}
      </div>
      {title && (
        <p className="mt-1.5 text-app-lead font-light text-[var(--app-text)]">
          {title}
        </p>
      )}
    </div>
  );
}
