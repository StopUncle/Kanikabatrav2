import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "./jwt";
import jwt from "jsonwebtoken";

if (process.env.NODE_ENV === "production" && process.env.DEV_BYPASS_AUTH === "true") {
  throw new Error("FATAL: DEV_BYPASS_AUTH must not be enabled in production");
}

/**
 * Check if the caller has a valid admin_session cookie. Used by
 * requireServerAuth to let admins preview member-only pages without
 * needing a separate member login.
 */
async function getAdminUserId(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin_session")?.value;
    if (!adminSession) return null;
    const secret = process.env.JWT_SECRET;
    if (!secret) return null;
    const payload = jwt.verify(adminSession, secret) as { role?: string; adminId?: string };
    if (payload.role !== "admin") return null;
    // Return a stable admin user ID so downstream code has something
    // to query with. "admin-preview" is synthetic — checkMembership
    // handles the bypass separately.
    return payload.adminId || "admin-preview";
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
      return payload.userId;
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
 * Optionally get user ID from cookies (returns null if not logged in).
 * With DEV_BYPASS_AUTH, always returns the dev user.
 */
export async function optionalServerAuth(): Promise<string | null> {
  if (process.env.DEV_BYPASS_AUTH === "true") {
    return "dev-admin";
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  try {
    const payload = verifyAccessToken(accessToken);
    return payload.userId;
  } catch {
    return null;
  }
}
