import { NextRequest, NextResponse } from "next/server";
import { optionalServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";

/**
 * Persist (or refresh) a push subscription for the authenticated
 * member. Idempotent: same endpoint upserts onto the existing row,
 * which means re-subscribing on the same device doesn't create dupes.
 *
 * Body shape:
 *   {
 *     endpoint: string,
 *     keys: { p256dh: string, auth: string }
 *   }
 *
 * Response: 200 with { ok: true } on success, 401 if not logged in.
 */
export async function POST(req: NextRequest) {
  const userId = await optionalServerAuth();
  if (!userId) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  let body: {
    endpoint?: string;
    keys?: { p256dh?: string; auth?: string };
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (
    !body.endpoint ||
    !body.keys ||
    !body.keys.p256dh ||
    !body.keys.auth
  ) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const userAgent = req.headers.get("user-agent") ?? null;

  await prisma.pushSubscription.upsert({
    where: { endpoint: body.endpoint },
    update: {
      userId, // re-bind to the current user (e.g. shared device)
      p256dh: body.keys.p256dh,
      auth: body.keys.auth,
      userAgent,
      lastUsedAt: new Date(),
    },
    create: {
      userId,
      endpoint: body.endpoint,
      p256dh: body.keys.p256dh,
      auth: body.keys.auth,
      userAgent,
    },
  });

  return NextResponse.json({ ok: true });
}
