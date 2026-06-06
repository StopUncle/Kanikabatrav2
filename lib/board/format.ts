/**
 * Relative-time formatting for the board. "Recency = life", so timestamps
 * read as "3 days ago", "4h ago", "just now". Pure + client-safe.
 *
 * Takes an explicit `now` argument in the core function so it is
 * deterministic and testable; the convenience wrapper uses Date.now().
 */

export function relativeTimeFrom(date: Date | string, now: number): string {
  const then = typeof date === "string" ? new Date(date).getTime() : date.getTime();
  const seconds = Math.round((now - then) / 1000);

  if (seconds < 45) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  const weeks = Math.round(days / 7);
  if (weeks < 5) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.round(days / 365);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

export function relativeTime(date: Date | string): string {
  return relativeTimeFrom(date, Date.now());
}

/** Compact short date, e.g. "Apr 2026", for the re-score timeline. */
export function monthYear(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
