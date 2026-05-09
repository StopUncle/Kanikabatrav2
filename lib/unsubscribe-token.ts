import jwt from "jsonwebtoken";

/**
 * One-click email unsubscribe tokens.
 *
 * These are HMAC-signed JWTs (separate `aud` claim from auth tokens so
 * they can NEVER be confused with an access token) embedded in the
 * unsubscribe link of promotional emails. Clicking the link hits
 * `/unsubscribe?token=<token>` which verifies the signature and flips
 * `User.emailPreferences[type]` to false — no login required.
 *
 * Lifetime: 1 year. Unsubscribe links must work on old emails sitting
 * in someone's inbox months later.
 *
 * Reuses `JWT_SECRET` (already required in production by lib/auth/jwt.ts)
 * so we don't need a new env var. The `aud: "unsubscribe"` claim makes
 * cross-token reuse impossible — verifying with `aud: "unsubscribe"`
 * rejects any access/refresh token, and verifying an unsubscribe token
 * with the access-token verifier would reject it because the access
 * verifier doesn't pass `aud`.
 */

const UNSUBSCRIBE_AUDIENCE = "unsubscribe";
const UNSUBSCRIBE_TTL = "365d";

// The keys an unsubscribe token can target. Must match keys in
// `User.emailPreferences`. Keep this list in sync with
// `app/api/user/settings/route.ts` DEFAULT_PREFERENCES.
export type UnsubscribeType =
  | "marketing"
  | "productUpdates"
  | "sessionReminders"
  | "weeklyDigest";

const VALID_TYPES: ReadonlySet<string> = new Set([
  "marketing",
  "productUpdates",
  "sessionReminders",
  "weeklyDigest",
]);

/**
 * A token addresses its target by either `userId` (logged-in members)
 * or `email` (mini-quiz subscribers and book/quiz buyers who never
 * created a User account). Exactly one MUST be present at sign time.
 * Verifying never returns a payload with both fields populated.
 */
export interface UnsubscribePayload {
  userId?: string;
  email?: string;
  type: UnsubscribeType;
}

interface DecodedUnsubscribePayload extends UnsubscribePayload {
  iat?: number;
  exp?: number;
  aud?: string;
}

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "CRITICAL: JWT_SECRET is required to sign unsubscribe tokens in production",
      );
    }
    return "dev-only-secret-do-not-use-in-production";
  }
  return secret;
}

export function signUnsubscribeToken(payload: UnsubscribePayload): string {
  const hasUserId = typeof payload.userId === "string" && payload.userId.length > 0;
  const hasEmail = typeof payload.email === "string" && payload.email.length > 0;
  if (hasUserId === hasEmail) {
    throw new Error(
      "signUnsubscribeToken requires exactly one of userId or email",
    );
  }
  const claim: Record<string, unknown> = { type: payload.type };
  if (hasUserId) claim.userId = payload.userId;
  if (hasEmail) claim.email = payload.email!.toLowerCase();
  return jwt.sign(claim, getSecret(), {
    audience: UNSUBSCRIBE_AUDIENCE,
    expiresIn: UNSUBSCRIBE_TTL,
  });
}

/**
 * Verify and decode an unsubscribe token. Returns the payload on
 * success, or null on any failure (invalid signature, expired, wrong
 * audience, malformed type). Callers should treat null as "show the
 * generic 'this link is invalid or expired' page".
 */
export function verifyUnsubscribeToken(
  token: string,
): UnsubscribePayload | null {
  try {
    const decoded = jwt.verify(token, getSecret(), {
      audience: UNSUBSCRIBE_AUDIENCE,
    }) as DecodedUnsubscribePayload;

    if (typeof decoded.type !== "string" || !VALID_TYPES.has(decoded.type)) {
      return null;
    }

    const hasUserId =
      typeof decoded.userId === "string" && decoded.userId.length > 0;
    const hasEmail =
      typeof decoded.email === "string" && decoded.email.length > 0;
    if (hasUserId === hasEmail) return null;

    return hasUserId
      ? { userId: decoded.userId, type: decoded.type as UnsubscribeType }
      : { email: decoded.email!.toLowerCase(), type: decoded.type as UnsubscribeType };
  } catch {
    return null;
  }
}

/**
 * Build the full unsubscribe URL for a given user + email type. Used
 * by email senders to embed in promotional templates.
 */
export function buildUnsubscribeUrl(
  payload: UnsubscribePayload,
  baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL ?? "https://kanikarose.com",
): string {
  const token = signUnsubscribeToken(payload);
  return `${baseUrl.replace(/\/$/, "")}/unsubscribe?token=${encodeURIComponent(token)}`;
}
