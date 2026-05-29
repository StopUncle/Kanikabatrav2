import type { NextRequest } from "next/server";
import crypto from "node:crypto";

/**
 * Constant-time authorization for cron endpoints.
 *
 * Accepts the secret via the `x-cron-secret` header (scheduled callers) or an
 * `Authorization: Bearer <secret>` header (retry-emails). It is checked ONLY
 * against CRON_SECRET. We deliberately do NOT fall back to ADMIN_SECRET: that
 * secret guards the admin panel, and a leak there must not be able to fire
 * membership cancellations, Stripe unpauses, balance credits, or mass emails.
 *
 * Uses crypto.timingSafeEqual (with a length pre-check, since timingSafeEqual
 * throws on length mismatch) so the comparison can't be used as a timing
 * oracle. Returns true iff the caller is authorized.
 */
export function verifyCronSecret(request: NextRequest): boolean {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;

  const headerSecret = request.headers.get("x-cron-secret");
  const bearer = request.headers
    .get("authorization")
    ?.replace(/^Bearer\s+/i, "");
  const provided = headerSecret || bearer || "";
  if (!provided) return false;

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
