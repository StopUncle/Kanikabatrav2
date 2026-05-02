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

export interface TellContext {
  userId: string | null;
  anonId: string;
  /** True if anonId was minted on this request, so the route handler
   *  knows to set the cookie on the response. */
  anonIdMinted: boolean;
}

const ANON_COOKIE = "kb-tells-anon";
const ANON_MAX_AGE = 60 * 60 * 24 * 365 * 2; // 2 years

export async function resolveTellContext(): Promise<TellContext> {
  const store = await cookies();

  let userId: string | null = null;
  const access = store.get("accessToken")?.value;
  if (access) {
    try {
      const payload = verifyAccessToken(access);
      userId = payload?.userId ?? null;
    } catch {
      userId = null;
    }
  }

  let anonId = store.get(ANON_COOKIE)?.value;
  let anonIdMinted = false;
  if (!anonId) {
    anonId = randomUUID();
    anonIdMinted = true;
  }

  return { userId, anonId, anonIdMinted };
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
