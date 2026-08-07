import type { Prisma } from "@prisma/client";

/** suspendReason written by the member-facing pause flow. */
export const MEMBER_PAUSE_REASON = "member-requested-pause";

/**
 * The pause flow overwrites `expiresAt` with the pause deadline so the
 * auto-resume cron has something to select on. That destroys the real
 * paid-through date, so it gets stashed here on the way in and restored
 * on the way out.
 *
 * Without this, resuming left the member ACTIVE with an expiry already
 * in the past (the cron only picks up rows where `expiresAt <= now`, so
 * the stale date is guaranteed, not incidental) and the lazy expiry
 * check in lib/community/membership.ts demoted them to EXPIRED on their
 * next page load while their card kept being charged.
 */
const PRESERVED_EXPIRY_KEY = "pausedFromExpiresAt";

function toRecord(
  value: Prisma.JsonValue | null | undefined,
): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

/**
 * Merge the pre-pause paid-through date into applicationData, preserving
 * whatever else already lives there (dormant-reminder bookkeeping, etc).
 */
export function withPreservedExpiry(
  applicationData: Prisma.JsonValue | null | undefined,
  expiresAt: Date | null,
): Prisma.InputJsonValue {
  return {
    ...toRecord(applicationData),
    [PRESERVED_EXPIRY_KEY]: expiresAt ? expiresAt.toISOString() : null,
  } as Prisma.InputJsonValue;
}

/**
 * Rebuild a paid-through date for a membership with no live subscription
 * to consult (a gift or comped row), giving back exactly the time the
 * pause consumed. Stripe-backed memberships should prefer the live
 * period end; this is the fallback for everyone else.
 */
export function restoreExpiryAfterPause(
  applicationData: Prisma.JsonValue | null | undefined,
  suspendedAt: Date | null,
  now: Date,
): Date | null {
  const raw = toRecord(applicationData)[PRESERVED_EXPIRY_KEY];
  if (typeof raw !== "string") return null;

  const original = new Date(raw);
  if (Number.isNaN(original.getTime())) return null;

  const pausedMs = suspendedAt ? now.getTime() - suspendedAt.getTime() : 0;
  return new Date(original.getTime() + Math.max(pausedMs, 0));
}
