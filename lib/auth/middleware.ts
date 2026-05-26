import { NextRequest, NextResponse } from "next/server";
import {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} from "./jwt";
import { PrismaUserDatabase } from "./prisma-database";
import { UserSession } from "./types";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

/**
 * Outcome of authenticating an incoming API request.
 *
 * `refreshedTokens` is set when the accessToken was expired/missing but
 * the refreshToken still validates. The caller (requireAuth) is
 * responsible for attaching these as Set-Cookie on the outgoing
 * response so the next request from this client has a fresh access
 * token. Without this, a player who spends >15 minutes in the
 * simulator silently stops persisting progress and eventually gets
 * bounced to /login on their next page navigation.
 */
export type AuthResult = {
  user: UserSession;
  refreshedTokens?: { accessToken: string; refreshToken: string };
};

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

const ACCESS_MAX_AGE = 15 * 60;
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60;

export async function authenticateUser(
  request: NextRequest,
): Promise<AuthResult | null> {
  try {
    const accessToken = request.cookies.get("accessToken")?.value;

    if (accessToken) {
      try {
        const payload = verifyAccessToken(accessToken);
        const user = await PrismaUserDatabase.findById(payload.userId);
        if (user) {
          if (payload.v !== undefined && payload.v !== user.tokenVersion) {
            // Token revoked, fall through to refresh attempt
          } else if (user.isBanned) {
            return null;
          } else {
            return { user: { id: user.id, email: user.email } };
          }
        }
      } catch {
        // Invalid/expired access token, try refresh
      }
    }

    // Silent refresh path. When the accessToken is missing or expired
    // but the refreshToken is still cryptographically valid AND its
    // tokenVersion matches the user's current version (not logged out,
    // not password-reset, not banned), mint a fresh pair. The caller
    // attaches them to the outgoing response so the client's cookies
    // update without a round-trip to /api/auth/refresh.
    const refreshToken = request.cookies.get("refreshToken")?.value;
    if (refreshToken) {
      try {
        const payload = verifyRefreshToken(refreshToken);
        const user = await PrismaUserDatabase.findById(payload.userId);
        if (
          user &&
          !user.isBanned &&
          (payload.v === undefined || payload.v === user.tokenVersion)
        ) {
          const tokenPayload = {
            userId: user.id,
            email: user.email,
            v: user.tokenVersion,
          };
          return {
            user: { id: user.id, email: user.email },
            refreshedTokens: {
              accessToken: generateAccessToken(tokenPayload),
              refreshToken: generateRefreshToken(tokenPayload),
            },
          };
        }
      } catch {
        // Invalid refresh token, fall through to admin
      }
    }

    // Admin session fallback (unchanged from prior behavior).
    const adminSession = request.cookies.get("admin_session")?.value;
    if (adminSession) {
      const secret = process.env.JWT_SECRET;
      if (secret) {
        try {
          const payload = jwt.verify(adminSession, secret) as { role?: string };
          if (payload.role === "admin") {
            const adminUser = await prisma.user.findFirst({
              where: { role: "ADMIN" },
              select: { id: true, email: true },
            });
            if (adminUser) {
              return { user: { id: adminUser.id, email: adminUser.email } };
            }
          }
        } catch {
          // Invalid admin token
        }
      }
    }

    return null;
  } catch (_error) {
    return null;
  }
}

export function createAuthResponse(error: string, status: number = 401) {
  return NextResponse.json({ error }, { status });
}

function attachRefreshedCookies(
  response: NextResponse,
  tokens: { accessToken: string; refreshToken: string },
): NextResponse {
  response.cookies.set("accessToken", tokens.accessToken, {
    ...COOKIE_OPTS,
    maxAge: ACCESS_MAX_AGE,
  });
  response.cookies.set("refreshToken", tokens.refreshToken, {
    ...COOKIE_OPTS,
    maxAge: REFRESH_MAX_AGE,
  });
  return response;
}

export async function requireAuth(
  request: NextRequest,
  handler: (request: NextRequest, user: UserSession) => Promise<NextResponse>,
): Promise<NextResponse> {
  const result = await authenticateUser(request);

  if (!result) {
    return createAuthResponse("Authentication required");
  }

  const response = await handler(request, result.user);
  if (result.refreshedTokens) {
    return attachRefreshedCookies(response, result.refreshedTokens);
  }
  return response;
}
