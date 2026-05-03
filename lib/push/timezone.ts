/**
 * Timezone helpers for the daily-Tell push cron.
 *
 * The cron runs hourly in UTC. For each user, we need to know their
 * local hour and local date so we can decide:
 *   - Is it their preferred hour right now?
 *   - Have we already sent today's push (in their local TZ)?
 *
 * We use the built-in Intl.DateTimeFormat with the user's IANA
 * timezone. This handles DST, half-hour offsets (India, Newfoundland),
 * and historical transitions transparently.
 *
 * Pure functions, no side effects — easy to test.
 */

/** Default timezone when the user has none stored. UTC is the safest
 *  choice; the "send" check will then fire at exactly the user's
 *  preferred hour as interpreted in UTC. */
const DEFAULT_TZ = "UTC";

export interface LocalTimePoint {
  /** 0-23 in the target timezone. */
  hour: number;
  /** YYYY-MM-DD in the target timezone. */
  date: string;
}

/**
 * Get the user's local hour and local date for a given moment.
 *
 * Throws RangeError if the timezone string is invalid (e.g. typo, dropped
 * column). Caller should fall back to UTC on throw.
 */
export function getLocalTimePoint(
  timezone: string,
  now: Date = new Date(),
): LocalTimePoint {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const get = (t: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === t)?.value ?? "";

  // Intl can return "24" for midnight in some locales; clamp to 23 so
  // downstream comparisons stay in the 0-23 space we expect.
  let hour = parseInt(get("hour"), 10);
  if (!Number.isFinite(hour)) hour = 0;
  if (hour === 24) hour = 0;

  const date = `${get("year")}-${get("month")}-${get("day")}`;

  return { hour, date };
}

/** Same as above but tolerant of bad timezone strings. Returns UTC on error. */
export function getLocalTimePointSafe(
  timezone: string | null | undefined,
  now: Date = new Date(),
): LocalTimePoint {
  const tz = timezone || DEFAULT_TZ;
  try {
    return getLocalTimePoint(tz, now);
  } catch {
    return getLocalTimePoint(DEFAULT_TZ, now);
  }
}

/**
 * Decide whether to send the daily-Tell push to a given user *right now*.
 *
 * Rules:
 *   1. User must be opted-in (caller checks).
 *   2. Current local hour must be at or past preferredHour. Catch-up
 *      delivery: if the cron skipped the user's preferred hour (Railway
 *      lapse, GitHub Actions delay), the next hourly run still delivers
 *      the same day. Better one push at 9:15 than no push at all.
 *   3. We must not have sent today already (lastSentDate !== currentLocalDate).
 *
 * Returns the new lastSentDate to write back, or null if we should not send.
 */
export function shouldSendDailyTellPush(args: {
  preferredHour: number;
  lastSentDate: string | null;
  currentLocal: LocalTimePoint;
}): string | null {
  const { preferredHour, lastSentDate, currentLocal } = args;

  // Already sent today.
  if (lastSentDate === currentLocal.date) return null;

  // Not their hour yet — send only at or after the preferred hour.
  if (currentLocal.hour < preferredHour) return null;

  return currentLocal.date;
}
