import { NextRequest, NextResponse } from "next/server";
import { optionalServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";

/**
 * Remove a push subscription. Called when a member toggles "off" in
 * the prefs UI or revokes browser permission. Authenticated members
 * can only delete subscriptions they own.
 */
export async function POST(req: NextRequest) {
  const userId = await optionalServerAuth();
  if (!userId) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  let body: { endpoint?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!body.endpoint) {
    return NextResponse.json({ error: "missing_endpoint" }, { status: 400 });
  }

  await prisma.pushSubscription.deleteMany({
    where: { endpoint: body.endpoint, userId },
  });

  return NextResponse.json({ ok: true });
}
