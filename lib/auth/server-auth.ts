import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken, verifyRefreshToken } from "./jwt";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

/**
 * Verify the refreshToken cookie cryptographically and against the
 * user's current tokenVersion. Used as a fallback when the 15-minute
 * accessToken has expired but the 7-day refreshToken is still valid.
 *
 * Returns the userId on success, null otherwise. Does NOT mint a new
 * accessToken cookie, that has to happen in a Route Handler or Server
 * Action (Server Components can only read cookies in Next 15). The
 * next API call from this client will run through requireAuth, which
 * does silently refresh and attach Set-Cookie. So the user's cookies
 * become current again on their first interaction after the page
 * render. Until then, page renders keep working because they accept
 * the refreshToken as proof.
 */
async function resolveUserViaRefreshToken(
  refreshToken: string,
): Promise<{ userId: string; banned: boolean } | null> {
  try {
    const payload = verifyRefreshToken(refreshToken);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, isBanned: true, tokenVersion: true },
    });
    if (!user) return null;
    if (payload.v !== undefined && payload.v !== user.tokenVersion) return null;
    return { userId: user.id, banned: user.isBanned };
  } catch {
    return null;
  }
}

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
      // Token invalid, fall through to refreshToken attempt
    }
  }

  // Silent server-side acceptance via refreshToken. The 15-minute
  // accessToken often expires mid-session (e.g. while reading a long
  // simulator scenario). As long as the 7-day refreshToken is valid,
  // page renders should keep working. The cookie itself is refreshed
  // on the next API call (see lib/auth/middleware.ts:requireAuth).
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (refreshToken) {
    const refreshed = await resolveUserViaRefreshToken(refreshToken);
    if (refreshed?.banned) {
      redirect(`/login?banned=1`);
    }
    if (refreshed) {
      return refreshed.userId;
    }
  }

  // No valid member token, check for admin session
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
      // Token invalid, fall through to refresh attempt
    }
  }

  // Silent refreshToken acceptance, same rationale as requireServerAuth.
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (refreshToken) {
    const refreshed = await resolveUserViaRefreshToken(refreshToken);
    if (refreshed && !refreshed.banned) {
      return refreshed.userId;
    }
  }

  return getAdminUserId();
}
