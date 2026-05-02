/**
 * Streak math + localStorage persistence for Tells.
 *
 * Anonymous-by-default, no server, no auth. Once the schema lands,
 * the localStorage value migrates to the user's TellStreak row at
 * signup, so a 7-day anonymous streak survives account creation.
 *
 * Day boundaries are UTC. Display still shows the user's local time,
 * but the underlying "did this user play today" check runs on UTC so
 * a player in Sydney and a player in Los Angeles share the same Tell
 * for the same calendar day.
 *
 * Freeze: one auto-applied freeze per ISO week. Missing one day uses
 * the freeze if available; missing without it resets to 0.
 */

const STORAGE_KEY = "kb-tells-streak-v1";

export interface StreakState {
  currentDays: number;
  longestDays: number;
  /** YYYY-MM-DD in UTC, the last day a main Tell was completed. */
  lastTellDate: string | null;
  /** Tell id completed today, prevents replay double-counting. */
  completedTellId: string | null;
  /** ISO week key (YYYY-Wnn) tracking when the freeze last reset. */
  freezeWeekKey: string;
  /** 1 if a freeze is available this week, 0 if used. */
  freezesAvail: number;
}

export const EMPTY_STREAK: StreakState = {
  currentDays: 0,
  longestDays: 0,
  lastTellDate: null,
  completedTellId: null,
  freezeWeekKey: "",
  freezesAvail: 1,
};

/* -------------------------------------------------------------------------- */
/* Pure date helpers (testable, no localStorage)                              */
/* -------------------------------------------------------------------------- */

export function utcDateKey(d: Date = new Date()): string {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

/** ISO week key, e.g. "2026-W18". Used to refill the weekly freeze. */
export function isoWeekKey(d: Date = new Date()): string {
  // Algorithm per ISO 8601: Thursday of week determines the year.
  const date = new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
  );
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNum = Math.ceil(
    ((date.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7,
  );
  return `${date.getUTCFullYear()}-W${String(weekNum).padStart(2, "0")}`;
}

/** Days between two YYYY-MM-DD strings (b - a). Returns 0 for same day. */
export function daysBetween(a: string, b: string): number {
  const ta = Date.UTC(
    Number(a.slice(0, 4)),
    Number(a.slice(5, 7)) - 1,
    Number(a.slice(8, 10)),
  );
  const tb = Date.UTC(
    Number(b.slice(0, 4)),
    Number(b.slice(5, 7)) - 1,
    Number(b.slice(8, 10)),
  );
  return Math.round((tb - ta) / 86_400_000);
}

/* -------------------------------------------------------------------------- */
/* Pure transitions                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Reconcile a saved streak with today's date. Applied on every page
 * load. If the user missed a day, this either uses the freeze or
 * resets the streak. Pure, no side effects.
 */
export function reconcile(
  state: StreakState,
  today: string = utcDateKey(),
  thisWeek: string = isoWeekKey(),
): StreakState {
  // Refill the weekly freeze if we crossed into a new ISO week.
  const next: StreakState =
    state.freezeWeekKey === thisWeek
      ? state
      : { ...state, freezeWeekKey: thisWeek, freezesAvail: 1 };

  if (!next.lastTellDate) return next;

  const gap = daysBetween(next.lastTellDate, today);

  if (gap <= 0) {
    // Today or earlier (clock skew): leave as-is.
    return next;
  }
  if (gap === 1) {
    // Yesterday was last play. Streak intact, awaiting today.
    return { ...next, completedTellId: null };
  }
  if (gap === 2 && next.freezesAvail > 0) {
    // One missed day, freeze covers it.
    return {
      ...next,
      freezesAvail: 0,
      completedTellId: null,
    };
  }
  // 2+ days missed without an available freeze, OR 3+ days missed.
  return {
    ...next,
    currentDays: 0,
    completedTellId: null,
  };
}

export type CompletionDelta =
  | {
      kind: "extended";
      previousDays: number;
      newDays: number;
      isNewLongest: boolean;
    }
  | { kind: "already-done-today" }
  | { kind: "replay" };

/**
 * Apply the user completing a main Tell. Returns the new state plus a
 * delta describing what happened, so the UI can animate.
 */
export function complete(
  state: StreakState,
  tellId: string,
  today: string = utcDateKey(),
): { state: StreakState; delta: CompletionDelta } {
  // Already completed this exact Tell.
  if (state.completedTellId === tellId) {
    return { state, delta: { kind: "replay" } };
  }
  // Different Tell but already completed something today: no streak.
  if (state.lastTellDate === today) {
    return {
      state: { ...state, completedTellId: tellId },
      delta: { kind: "already-done-today" },
    };
  }

  const newDays = state.currentDays + 1;
  const newLongest = Math.max(state.longestDays, newDays);
  return {
    state: {
      ...state,
      currentDays: newDays,
      longestDays: newLongest,
      lastTellDate: today,
      completedTellId: tellId,
    },
    delta: {
      kind: "extended",
      previousDays: state.currentDays,
      newDays,
      isNewLongest: newLongest > state.longestDays,
    },
  };
}

/* -------------------------------------------------------------------------- */
/* localStorage IO (browser-only)                                             */
/* -------------------------------------------------------------------------- */

export function loadStreak(): StreakState {
  if (typeof window === "undefined") return EMPTY_STREAK;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_STREAK, freezeWeekKey: isoWeekKey() };
    const parsed = JSON.parse(raw) as Partial<StreakState>;
    // Defensive: missing keys default to empty.
    return {
      ...EMPTY_STREAK,
      freezeWeekKey: isoWeekKey(),
      ...parsed,
    };
  } catch {
    return { ...EMPTY_STREAK, freezeWeekKey: isoWeekKey() };
  }
}

export function saveStreak(state: StreakState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Quota exceeded or private mode. Streak becomes session-only,
    // not worth surfacing as an error to the user.
  }
}
