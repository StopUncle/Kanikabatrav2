import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./jwt";
import { PrismaUserDatabase } from "./prisma-database";
import { UserSession } from "./types";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function authenticateUser(
  request: NextRequest,
): Promise<UserSession | null> {
  try {
    // Try member access token first
    const accessToken = request.cookies.get("accessToken")?.value;

    if (accessToken) {
      try {
        const payload = verifyAccessToken(accessToken);
        const user = await PrismaUserDatabase.findById(payload.userId);
        if (user) {
          if (payload.v !== undefined && payload.v !== user.tokenVersion) {
            // Token revoked — fall through to admin check
          } else if (user.isBanned) {
            // Banned users get no session, regardless of token validity.
            // Token version is bumped on ban via /api/admin/users/[id],
            // so existing cookies are invalidated at the crypto layer too;
            // this check catches any edge case where that didn't happen.
            return null;
          } else {
            return { id: user.id, email: user.email };
          }
        }
      } catch {
        // Invalid token — fall through to admin check
      }
    }

    // Fall back to admin_session cookie so admin preview works
    // across all API routes that use requireAuth
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
              return { id: adminUser.id, email: adminUser.email };
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

export async function requireAuth(
  request: NextRequest,
  handler: (request: NextRequest, user: UserSession) => Promise<NextResponse>,
): Promise<NextResponse> {
  const user = await authenticateUser(request);

  if (!user) {
    return createAuthResponse("Authentication required");
  }

  return handler(request, user);
}
