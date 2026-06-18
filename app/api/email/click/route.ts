/**
 * GET /api/email/click?d=<payload>&u=<target>: click redirect + tracking.
 *
 * Records a CLICK event, then 302-redirects to the target. Only same-host
 * targets are honored (the instrumenter only ever wraps same-host links),
 * which closes the open-redirect hole; anything else falls back to the
 * homepage. Never errors out of the redirect.
 */

import { NextResponse, type NextRequest } from "next/server";
import { decodeTrackingPayload, recordEmailEvent } from "@/lib/email-tracking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const token = sp.get("d");
  const target = sp.get("u");
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";

  // Validate the redirect target: same host only. Prevents the tracking
  // link from being abused as an open redirect.
  let dest = base;
  if (target) {
    try {
      const u = new URL(target);
      const ownHost = new URL(base).host;
      if (
        (u.protocol === "http:" || u.protocol === "https:") &&
        u.host === ownHost
      ) {
        dest = u.toString();
      }
    } catch {
      // Malformed target, fall back to homepage.
    }
  }

  if (token) {
    const ctx = decodeTrackingPayload(token);
    if (ctx) await recordEmailEvent("CLICK", ctx, target ?? undefined);
  }

  return NextResponse.redirect(dest, 302);
}
