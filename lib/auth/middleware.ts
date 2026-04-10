import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./jwt";
import { PrismaUserDatabase } from "./prisma-database";
import { UserSession } from "./types";

export async function authenticateUser(
  request: NextRequest,
): Promise<UserSession | null> {
  try {
    // Get access token from cookies
    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return null;
    }

    // Verify token
    const payload = verifyAccessToken(accessToken);

    // Verify user still exists
    const user = await PrismaUserDatabase.findById(payload.userId);
    if (!user) {
      return null;
    }

    // Reject tokens signed before the last password reset or logout.
    // Legacy tokens without `v` are accepted (they'll expire naturally
    // within their 15-min TTL).
    if (payload.v !== undefined && payload.v !== user.tokenVersion) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
    };
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
