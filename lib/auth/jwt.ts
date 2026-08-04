import jwt from "jsonwebtoken";

// SECURITY: Validate JWT secrets at startup - never use insecure defaults in production
function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "CRITICAL: JWT_SECRET environment variable is required in production",
      );
    }
    console.warn(
      "WARNING: Using insecure default JWT_SECRET - set JWT_SECRET in environment",
    );
    return "dev-only-secret-do-not-use-in-production";
  }
  return secret;
}

function getJwtRefreshSecret(): string {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "CRITICAL: JWT_REFRESH_SECRET environment variable is required in production",
      );
    }
    console.warn(
      "WARNING: Using insecure default JWT_REFRESH_SECRET - set JWT_REFRESH_SECRET in environment",
    );
    return "dev-only-refresh-secret-do-not-use-in-production";
  }
  return secret;
}

const JWT_SECRET = getJwtSecret();
const JWT_REFRESH_SECRET = getJwtRefreshSecret();

export interface JWTPayload {
  userId: string;
  email: string;
  // Token version, embedded at sign time, checked on verify against
  // the user's current tokenVersion. Bumped on password reset and
  // logout to invalidate all outstanding tokens. Optional for backward
  // compat with tokens signed before this was added (they'll expire
  // naturally within their TTL).
  v?: number;
  /**
   * Purpose marker carried by NON-session tokens. Session tokens never
   * set it; the password-reset token does (type: "password-reset"), and
   * it is signed with this same JWT_SECRET. See assertSessionToken.
   */
  type?: string;
  iat?: number;
  exp?: number;
}

/**
 * Refuse any token that declares a purpose.
 *
 * The password-reset token is signed with JWT_SECRET, the same secret
 * that signs access tokens, so before this check a reset link WAS a
 * session: paste the token from the emailed URL in as an accessToken
 * cookie and you were that user for the token's full hour, without
 * changing the password and without leaving them any signal.
 * /api/auth/reset-password already refuses the reverse direction by
 * requiring type === "password-reset"; this is the missing half.
 *
 * Deliberately keyed on the presence of the claim rather than on a
 * required type: "access" value, so no session signed before this
 * existed gets invalidated. Nobody is logged out by this change.
 */
function assertSessionToken(payload: JWTPayload): JWTPayload {
  if (payload.type !== undefined) {
    throw new Error("Not a session token");
  }
  return payload;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

// Generate access token (15 minutes)
export function generateAccessToken(
  payload: Omit<JWTPayload, "iat" | "exp">,
): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
}

// Generate refresh token (7 days)
export function generateRefreshToken(
  payload: Omit<JWTPayload, "iat" | "exp">,
): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

// Generate both tokens
export function generateTokenPair(
  payload: Omit<JWTPayload, "iat" | "exp">,
): TokenPair {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
}

// Verify access token
export function verifyAccessToken(token: string): JWTPayload {
  try {
    return assertSessionToken(jwt.verify(token, JWT_SECRET) as JWTPayload);
  } catch (_error) {
    throw new Error("Invalid access token");
  }
}

// Verify refresh token
export function verifyRefreshToken(token: string): JWTPayload {
  try {
    return assertSessionToken(
      jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload,
    );
  } catch (_error) {
    throw new Error("Invalid refresh token");
  }
}

