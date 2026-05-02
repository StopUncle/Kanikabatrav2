/**
 * POST /api/tells/migrate-streak
 *
 * Move an anonymous localStorage streak onto the user's TellStreak row
 * after they sign up or sign in. Idempotent: if the user already has a
 * better streak server-side, the migration is a no-op.
 *
 * Body: {
 *   currentDays: number,
 *   longestDays: number,
 *   lastTellDate: string | null,
 *   freezesAvail: number,
 *   freezeWeekKey: string,
 * }
 */

import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { resolveTellContext } from "@/lib/tells/auth-context";
import { prisma } from "@/lib/prisma";
import { isoWeekKey } from "@/lib/tells/streak";

const Body = z.object({
  currentDays: z.number().int().min(0).max(10_000),
  longestDays: z.number().int().min(0).max(10_000),
  lastTellDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
  freezesAvail: z.number().int().min(0).max(1),
  freezeWeekKey: z.string().max(20).optional(),
});

export async function POST(request: NextRequest) {
  const ctx = await resolveTellContext();
  if (!ctx.userId) {
    return NextResponse.json({ error: "Auth required" }, { status: 401 });
  }

  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await request.json());
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid payload", detail: (err as Error).message },
      { status: 400 },
    );
  }

  const existing = await prisma.tellStreak.findUnique({
    where: { userId: ctx.userId },
  });

  // Server-side row wins on every field where it is greater. No way for
  // a malicious client to lower their own server streak by sending a
  // smaller localStorage value.
  const merged = {
    currentDays: Math.max(existing?.currentDays ?? 0, body.currentDays),
    longestDays: Math.max(existing?.longestDays ?? 0, body.longestDays),
    lastTellDate: pickLatestDate(existing?.lastTellDate, body.lastTellDate),
    freezeWeekKey: body.freezeWeekKey ?? existing?.freezeWeekKey ?? isoWeekKey(),
    freezesAvail: existing
      ? existing.freezesAvail
      : body.freezesAvail,
  };

  await prisma.tellStreak.upsert({
    where: { userId: ctx.userId },
    update: merged,
    create: { userId: ctx.userId, ...merged },
  });

  return NextResponse.json({ migrated: true, ...merged });
}

function pickLatestDate(
  a: string | null | undefined,
  b: string | null | undefined,
): string | null {
  if (!a) return b ?? null;
  if (!b) return a;
  return a > b ? a : b;
}
