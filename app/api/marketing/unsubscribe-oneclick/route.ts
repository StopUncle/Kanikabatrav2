import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyUnsubscribeToken } from "@/lib/unsubscribe-token";
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
    const user = payload.userId
      ? await prisma.user.findUnique({
          where: { id: payload.userId },
          select: { id: true, emailPreferences: true },
        })
      : await prisma.user.findUnique({
          where: { email: payload.email! },
          select: { id: true, emailPreferences: true },
        });

    if (user) {
      const existing =
        user.emailPreferences && typeof user.emailPreferences === "object"
          ? (user.emailPreferences as Record<string, unknown>)
          : {};
      const next = { ...existing, [payload.type]: false };
      await prisma.$executeRaw`
        UPDATE "User"
        SET "emailPreferences" = ${JSON.stringify(next)}::jsonb,
            "updatedAt" = NOW()
        WHERE id = ${user.id}
      `;
    }

    if (payload.email) {
      await prisma.subscriber.updateMany({
        where: { email: payload.email },
        data: { tags: { push: `unsubscribed:${payload.type}` } },
      });
    }

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
  return NextResponse.redirect(new URL(dest, req.url), 302);
}
