import { NextRequest, NextResponse } from "next/server";
import {
  REFERRAL_COOKIE_NAME,
  REFERRAL_COOKIE_DAYS,
  resolveReferralCode,
} from "@/lib/referrals";

/**
 * Cookie-capture endpoint for inbound referral links.
 *
 * Called by a tiny client-side hook on every page load when ?ref=<code>
 * is in the URL. We resolve the code server-side first (don't trust the
 * client) and only set the cookie if it points to a real member. That
 * way invalid or rotated codes don't pollute the cookie jar.
 *
 * 30-day TTL matches the attribution localStorage TTL (kb-attribution-v1).
 * httpOnly NOT set, because the subscription-create endpoint reads it
 * server-side via the cookie header, but no client code reads it either
 * (it's purely a server-side hint). Setting httpOnly anyway for defense
 * in depth.
 */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as { ref?: unknown };
  const ref = typeof body.ref === "string" ? body.ref.toUpperCase() : "";

  if (!ref) {
    return NextResponse.json({ ok: false, reason: "missing-ref" }, { status: 400 });
  }

  const referrer = await resolveReferralCode(ref);
  if (!referrer) {
    return NextResponse.json({ ok: false, reason: "code-not-found" }, { status: 404 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(REFERRAL_COOKIE_NAME, ref, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: REFERRAL_COOKIE_DAYS * 24 * 60 * 60,
    path: "/",
  });
  return response;
}
