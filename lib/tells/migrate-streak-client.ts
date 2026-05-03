/**
 * Fire-and-forget POST that triggers server-side streak reconciliation
 * after a fresh register or login. The server reads the user's
 * TellResponse history (including any rows still keyed to the anonymous
 * cookie this browser carries) and writes the authoritative streak.
 *
 * The client sends no body. localStorage is never trusted as a source
 * of truth, so a malicious caller cannot grant themselves a streak.
 */

import { loadStreak } from "./streak";

export function migrateLocalStreakIfPresent(): void {
  if (typeof window === "undefined") return;
  const local = loadStreak();
  // Only ping the server if the browser thinks it has any history at
  // all. Avoids pointless POSTs from users who never played as an anon.
  if (local.currentDays === 0 && local.longestDays === 0) return;

  fetch("/api/tells/migrate-streak", { method: "POST" }).catch(() => {
    // Silent. The localStorage value remains as a fallback.
  });
}
