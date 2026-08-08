import { NextRequest, NextResponse } from "next/server";
import { verifyUnsubscribeToken } from "@/lib/unsubscribe-token";
import { applyUnsubscribe } from "@/lib/unsubscribe-apply";
import { logger } from "@/lib/logger";

/**
 * RFC 8058 one-click unsubscribe endpoint.
 *
 * Gmail / Apple Mail render a native "Unsubscribe" button in the
 * inbox UI when the email carries:
 *   List-Unsubscribe: <https://.../this-endpoint?token=X>, <mailto:...>
 *   List-Unsubscribe-Post: List-Unsubscribe=One-Click
 *
 * Clicking that button POSTs `List-Unsubscribe=One-Click` to one of
 * the URLs in List-Unsubscribe. We accept the POST, verify the
 * signed token, flip the corresponding pref to false, and return
 * 200. No login required, the signed token is the auth.
 *
 * GET is also supported (redirects to the existing /unsubscribe
 * page for users who type the URL or click a stale link).
 */

async function handle(token: string | null): Promise<{ ok: boolean }> {
  if (!token) return { ok: false };
  const payload = verifyUnsubscribeToken(token);
  if (!payload) return { ok: false };

  try {
    // Shared with the /unsubscribe page, so the header button and the
    // body link cannot end up writing the preference two different ways.
    await applyUnsubscribe(payload);
    return { ok: true };
  } catch (err) {
    logger.error("[unsubscribe-oneclick] failed", err as Error, {
      userId: payload.userId,
      email: payload.email,
      type: payload.type,
    });
    return { ok: false };
  }
}

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  const result = await handle(token);
  // RFC 8058 expects 200 on success. Empty body is fine; mail
  // clients don't render anything from this response.
  return NextResponse.json(
    { ok: result.ok },
    { status: result.ok ? 200 : 400 },
  );
}

export async function GET(req: NextRequest) {
  // Defensive, if a user clicks the URL directly, send them to
  // the rendered unsubscribe page that has the confirmation +
  // re-subscribe option.
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  const dest = token
    ? `/unsubscribe?token=${encodeURIComponent(token)}`
    : "/unsubscribe";
  // Build absolute URL from NEXT_PUBLIC_BASE_URL, not req.url. Behind
  // Railway's proxy, `req.url` resolves to https://localhost:8080 and
  // the redirect Location would be unreachable for the recipient.
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";
  return NextResponse.redirect(`${baseUrl}${dest}`, 302);
}
