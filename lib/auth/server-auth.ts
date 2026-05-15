import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "./jwt";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

if (process.env.NODE_ENV === "production" && process.env.DEV_BYPASS_AUTH === "true") {
  throw new Error("FATAL: DEV_BYPASS_AUTH must not be enabled in production");
}

/**
 * Check if the caller has a valid admin_session cookie. Used by
 * requireServerAuth to let admins preview member-only pages without
 * needing a separate member login.
 */
/**
 * Resolve a valid admin_session cookie to a real User ID. Looks up the
 * first user with role=ADMIN in the database so comments, likes, and
 * other actions are attributed to a real account (not a synthetic ID).
 * Exported so API routes can reuse the same logic.
 */
export async function getAdminUserId(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin_session")?.value;
    if (!adminSession) return null;
    const secret = process.env.JWT_SECRET;
    if (!secret) return null;
    const payload = jwt.verify(adminSession, secret) as { role?: string };
    if (payload.role !== "admin") return null;

    // Find the real ADMIN user so actions are attributed correctly.
    const adminUser = await prisma.user.findFirst({
      where: { role: "ADMIN" },
      select: { id: true },
    });
    return adminUser?.id || "admin-preview";
  } catch {
    return null;
  }
}

/**
 * Get the authenticated user's ID from cookies.
 * Redirects to login if not authenticated (unless DEV_BYPASS_AUTH is set).
 * Admins with a valid admin_session cookie bypass the member login check.
 */
export async function requireServerAuth(redirectPath: string): Promise<string> {
  if (process.env.DEV_BYPASS_AUTH === "true") {
    return "dev-admin";
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    try {
      const payload = verifyAccessToken(accessToken);
      // Block banned users at the server-render layer too, not just at
      // API routes. The DB check is cheap and matches the middleware.
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, isBanned: true, tokenVersion: true },
      });
      if (user && !user.isBanned && (payload.v === undefined || payload.v === user.tokenVersion)) {
        return payload.userId;
      }
      if (user?.isBanned) {
        redirect(`/login?banned=1`);
      }
    } catch {
      // Token invalid — fall through to admin check
    }
  }

  // No valid member token — check for admin session
  const adminId = await getAdminUserId();
  if (adminId) return adminId;

  redirect(`/login?redirect=${redirectPath}`);
}

/**
 * Optionally get user ID from cookies (returns null if not logged in or
 * if the user is banned).
 *
 * Falls back to the admin_session cookie when no valid member access
 * token is present, mirroring requireServerAuth. Without this fallback,
 * member-side API routes (Receipts, resend-download, etc.) would reject
 * admins who navigated into member surfaces via the admin pathway,
 * even though those same admins can load the matching page just fine.
 */
export async function optionalServerAuth(): Promise<string | null> {
  if (process.env.DEV_BYPASS_AUTH === "true") {
    return "dev-admin";
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    try {
      const payload = verifyAccessToken(accessToken);
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { isBanned: true, tokenVersion: true },
      });
      if (user && !user.isBanned) {
        if (payload.v === undefined || payload.v === user.tokenVersion) {
          return payload.userId;
        }
      }
    } catch {
      // Token invalid — fall through to admin check
    }
  }

  return getAdminUserId();
}
