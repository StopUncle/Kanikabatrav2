/**
 * POST /api/initiation/reading
 *
 * Store the Reading, the abbreviated Dark Mirror taken during the
 * Initiation. It used to render on screen and then vanish the moment
 * the member clicked Continue.
 *
 * This is The Mirror (who you are), stored as its own row. It is
 * deliberately not a QuizResult: that model carries payment, delivery
 * and credit-code state, and writing free in-app readings into it would
 * quietly corrupt the paid quiz funnel. It is also deliberately nothing
 * to do with The Mark, which measures how easily you get played. The
 * two instruments never mix.
 *
 * Body: { scores: Record<string, number>, dominantType, secondaryType? }
 */

import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";

const AXES = [
  "psychopathic",
  "sociopathic",
  "narcissistic",
  "borderline",
  "histrionic",
  "neurotypical",
] as const;

const Body = z.object({
  scores: z.record(z.enum(AXES), z.number().min(0).max(100)),
  dominantType: z.enum(AXES),
  secondaryType: z.enum(AXES).nullable().optional(),
});

export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    let body: z.infer<typeof Body>;
    try {
      body = Body.parse(await req.json());
    } catch {
      return NextResponse.json({ error: "Invalid reading" }, { status: 400 });
    }

    // One row per sitting. The Initiation only runs once, but a member
    // who refreshes mid-ceremony should not be blocked from finishing,
    // so this stays an append rather than an upsert.
    await prisma.mirrorReading.create({
      data: {
        userId: user.id,
        source: "INITIATION",
        scores: body.scores,
        dominantType: body.dominantType,
        secondaryType: body.secondaryType ?? null,
      },
    });

    return NextResponse.json({ ok: true });
  });
}
