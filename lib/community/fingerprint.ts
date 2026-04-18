import crypto from "crypto";

/**
 * Per-user deterministic fingerprint for content-leak forensics.
 *
 * Shown (subtly) on every member page as a "SID" — looks like a generic
 * session reference the way Stripe / Datadog session IDs do. When a member
 * records their screen and posts Consilium content externally, the
 * fingerprint is visible in the leaked footage. An admin pastes the 8-char
 * code into the lookup tool and gets the exact userId who recorded it.
 *
 * Deterministic: same userId → same fingerprint forever, so a historical
 * leak can still be attributed after the user is banned.
 *
 * Keyed with JWT_SECRET so an attacker who knows only a userId can't
 * pre-compute fingerprints to spoof someone else.
 *
 * Output: 8 lowercase hex chars — ~4 billion distinct values. Collision
 * probability for ~1,000 members is negligible.
 */

const FINGERPRINT_SEPARATOR = "::consilium-sid::";

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("JWT_SECRET is required to compute fingerprints");
    }
    return "dev-only-fingerprint-secret";
  }
  return secret;
}

export function computeFingerprint(userId: string): string {
  const hash = crypto
    .createHash("sha256")
    .update(userId + FINGERPRINT_SEPARATOR + getSecret())
    .digest("hex");
  return hash.slice(0, 8);
}

/**
 * Brute-force reverse lookup. For our scale (low hundreds of members)
 * iterating every userId and recomputing is fast — the SHA256 is ~1μs per
 * hash, so even 10,000 members is ~10ms of CPU.
 *
 * Returns the userId that matches, or null if no match.
 */
export function resolveFingerprintFromUsers(
  fingerprint: string,
  userIds: string[],
): string | null {
  const target = fingerprint.trim().toLowerCase();
  if (!/^[0-9a-f]{8}$/.test(target)) return null;
  for (const id of userIds) {
    if (computeFingerprint(id) === target) return id;
  }
  return null;
}
