import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "./jwt";

if (process.env.NODE_ENV === "production" && process.env.DEV_BYPASS_AUTH === "true") {
  throw new Error("FATAL: DEV_BYPASS_AUTH must not be enabled in production");
}

/**
 * Get the authenticated user's ID from cookies.
 * Redirects to login if not authenticated (unless DEV_BYPASS_AUTH is set).
 */
export async function requireServerAuth(redirectPath: string): Promise<string> {
  if (process.env.DEV_BYPASS_AUTH === "true") {
    return "dev-admin";
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect(`/login?redirect=${redirectPath}`);
  }

  try {
    const payload = verifyAccessToken(accessToken);
    return payload.userId;
  } catch {
    redirect(`/login?redirect=${redirectPath}`);
  }
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
