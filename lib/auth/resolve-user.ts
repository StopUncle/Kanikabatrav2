import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { verifyAccessToken } from "./jwt";
import { prisma } from "@/lib/prisma";

/**
 * Unified "resolve the current authenticated user" helper.
 *
 * Many legacy routes resolve the caller via raw `verifyAccessToken(token).
 * userId` — which checks the JWT signature + expiry, but skips the two
 * server-side revocation paths:
 *
 *   1. `user.isBanned` — set by /api/admin/users/[id] when Kanika bans
 *      someone. Must invalidate sessions immediately.
 *   2. `user.tokenVersion` — bumped on ban / logout / password reset.
 *      Tokens signed before the bump must stop working even if still
 *      cryptographically valid.
 *
 * This helper centralises those checks so every route that needs the
 * current userId gets them for free. Returns null if no valid active
 * (non-banned) session is present.
 *
 * Usage:
 *   const userId = await resolveActiveUserId();
 *   if (!userId) return NextResponse.json({ error: "..." }, { status: 401 });
 *
 * Or the request-scoped variant for routes that receive a NextRequest:
 *   const userId = await resolveActiveUserIdFromRequest(request);
 */

export async function resolveActiveUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) return null;
  return resolveFromToken(token);
}

export async function resolveActiveUserIdFromRequest(
  request: NextRequest,
): Promise<string | null> {
  const token = request.cookies.get("accessToken")?.value;
  if (!token) return null;
  return resolveFromToken(token);
}

async function resolveFromToken(token: string): Promise<string | null> {
  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, isBanned: true, tokenVersion: true },
  });
  if (!user) return null;
  if (user.isBanned) return null;
  if (payload.v !== undefined && payload.v !== user.tokenVersion) return null;
  return user.id;
}
