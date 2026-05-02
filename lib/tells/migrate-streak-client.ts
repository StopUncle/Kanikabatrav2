/**
 * Fire-and-forget POST that migrates an anonymous localStorage streak
 * onto the user's TellStreak row. Called immediately after a
 * successful register or login.
 *
 * Safe to call even when no streak exists (the server merges max-of,
 * so an empty payload is a no-op). Failures are silent.
 */

import { loadStreak, isoWeekKey } from "./streak";

export function migrateLocalStreakIfPresent(): void {
  if (typeof window === "undefined") return;
  const local = loadStreak();
  if (local.currentDays === 0 && local.longestDays === 0) return;

  fetch("/api/tells/migrate-streak", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      currentDays: local.currentDays,
      longestDays: local.longestDays,
      lastTellDate: local.lastTellDate,
      freezesAvail: local.freezesAvail,
      freezeWeekKey: local.freezeWeekKey || isoWeekKey(),
    }),
  }).catch(() => {
    // Silent. The localStorage value remains as a fallback.
  });
}
