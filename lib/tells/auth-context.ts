/**
 * Resolve the current request's "who are they" for Tells.
 *
 * Returns a userId if the request carries a valid accessToken cookie,
 * an anonId in either case (issued lazily and persisted as a cookie
 * so anonymous visitors are still distinct).
 *
 * Server-only. The anonId cookie is httpOnly: it is not used for any
 * auth decision, only response bucketing, but keeping it server-issued
 * prevents trivial farming.
 */

import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { getAdminUserId } from "@/lib/auth/server-auth";

export interface TellContext {
  userId: string | null;
  anonId: string;
  /** True if anonId was minted on this request, so the route handler
   *  knows to set the cookie on the response. */
  anonIdMinted: boolean;
  /**
   * True when the request carried an accessToken that failed to verify
   * and nothing else identified the caller.
   *
   * This is NOT the same as anonymous. A visitor with no cookie at all
   * is anonymous on purpose, and public /tells depends on that. A member
   * whose 15-minute accessToken just expired is not anonymous: they hold
   * a 7-day refreshToken and are one silent refresh away from being
   * themselves again. Writing their work to anonId instead loses it.
   *
   * Routes that persist member-owned progress must refuse a stale
   * request so the client can refresh and retry. Read-only routes can
   * ignore this and degrade to the anonymous view.
   */
  stale: boolean;
}

const ANON_COOKIE = "kb-tells-anon";
const ANON_MAX_AGE = 60 * 60 * 24 * 365 * 2; // 2 years

export async function resolveTellContext(): Promise<TellContext> {
  const store = await cookies();

  let userId: string | null = null;
  let stale = false;
  const access = store.get("accessToken")?.value;
  if (access) {
    try {
      const payload = verifyAccessToken(access);
      userId = payload?.userId ?? null;
      // A token that verifies but carries no userId is malformed, which
      // is a stale credential too: the caller believes they are signed in.
      stale = userId === null;
    } catch {
      userId = null;
      stale = true;
    }
  }

  // Admin fallback: when an admin navigates a member surface (e.g.
  // Kanika previewing /consilium/receipts), they may have only an
  // admin_session cookie, no member accessToken. Treat the admin as
  // the underlying ADMIN user so member-side API routes accept the
  // request, matching the behavior of requireServerAuth on the page.
  if (!userId) {
    userId = await getAdminUserId();
    // An admin session identified them after all, so nothing is stale.
    if (userId) stale = false;
  }

  let anonId = store.get(ANON_COOKIE)?.value;
  let anonIdMinted = false;
  if (!anonId) {
    anonId = randomUUID();
    anonIdMinted = true;
  }

  return { userId, anonId, anonIdMinted, stale };
}

/**
 * The response a route should send when a stale credential would have
 * cost the member their work. `retry: true` tells the client this is
 * worth one refresh-and-resend, as opposed to a real sign-in prompt.
 */
export function staleCredentialResponse(): Response {
  return Response.json(
    { error: "Session expired", retry: true },
    { status: 401 },
  );
}

/** Apply a freshly minted anonId to the response cookies. */
export function setAnonCookie(
  response: Response,
  anonId: string,
): Response {
  const cookieValue = [
    `${ANON_COOKIE}=${anonId}`,
    "Path=/",
    `Max-Age=${ANON_MAX_AGE}`,
    "HttpOnly",
    "SameSite=Lax",
    process.env.NODE_ENV === "production" ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
  response.headers.append("Set-Cookie", cookieValue);
  return response;
}
