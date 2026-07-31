/**
 * What a screen shows while it is still fetching.
 *
 * Worth more here than it sounds. The state-capture harness kept photographing
 * spinners and filing working screens as broken, and the reason it could is
 * that the waits are long enough to matter: the Lab's picker arrives at about
 * 4.3 seconds in dev. A spinner spends that time saying nothing. A skeleton
 * spends it saying what is coming, which makes the same wait read as shorter.
 *
 * Reuses the shimmer keyframe already in the Tailwind config rather than
 * adding a second opinion about how a loading pulse should look.
 */

import type { CSSProperties } from "react";
import { cn } from "./cn";

export function Skeleton({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden
      style={style}
      className={cn(
        "animate-shimmer rounded-md bg-[var(--app-card-2)] motion-reduce:animate-none",
        className,
      )}
    />
  );
}

/**
 * Lines of text that are not there yet. The last one is short, because real
 * paragraphs end mid-line and a stack of equal bars reads as a table.
 */
export function SkeletonText({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className={cn("h-2.5", i === lines - 1 ? "w-1/2" : "w-full")}
        />
      ))}
    </div>
  );
}

/** A card-shaped wait, for the common case of a list that is still loading. */
export function SkeletonCard({ lines = 3 }: { lines?: number }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] p-4"
    >
      <Skeleton className="mb-3 h-2 w-20" />
      <SkeletonText lines={lines} />
    </div>
  );
}
