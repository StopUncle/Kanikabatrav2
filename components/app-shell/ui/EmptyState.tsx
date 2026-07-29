import Link from "next/link";
import { cn } from "./cn";

/**
 * What a screen says when it has nothing to show yet.
 *
 * Today every one of these is a single muted sentence in a card, which is a
 * dead end: it explains the absence and offers no way out of it. That was
 * survivable while every account was an active member with months of history,
 * because almost nobody saw one. A free tier inverts that. Empty becomes the
 * first thing most arrivals see, on most screens, in the minute that decides
 * whether they come back.
 *
 * So an empty state gets a way forward wherever one honestly exists. Where it
 * does not, the sentence alone is still correct: inventing a button that goes
 * nowhere is worse than admitting the screen is waiting.
 */

export interface EmptyStateProps {
  /** The absence, in the member's terms. One sentence, no apology. */
  line: string;
  /** The smaller line under it, for when the absence needs explaining. */
  hint?: string;
  action?: { label: string; href: string };
  className?: string;
}

export default function EmptyState({
  line,
  hint,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-4 py-8 text-center",
        className,
      )}
    >
      <p className="text-app-body text-[var(--app-muted)]">{line}</p>
      {hint && (
        <p className="mx-auto mt-1.5 max-w-[34ch] text-app-caption text-[var(--app-dim)]">
          {hint}
        </p>
      )}
      {action && (
        <Link
          href={action.href}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[var(--app-gold-soft)] px-4 py-2 text-app-eyebrow uppercase tracking-app-wide text-[var(--app-gold)] transition-colors hover:bg-[var(--app-gold)] hover:text-[#0a0908]"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
