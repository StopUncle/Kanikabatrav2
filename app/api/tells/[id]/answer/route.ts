/**
 * POST /api/tells/[id]/answer
 *
 * Submit a Tell answer. Server determines correctness and Elo delta;
 * client cannot lie about either. Returns the full reveal payload so
 * the page can re-render after submit even on a fresh page-load.
 *
 * Body: { choiceId: string, answerMs?: number }
 */

import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import {
  resolveTellContext,
  setAnonCookie,
} from "@/lib/tells/auth-context";
import { recordAnswer, RecordAnswerInputError } from "@/lib/tells/db";
import { logger } from "@/lib/logger";

const Body = z.object({
  choiceId: z.string().min(1).max(200),
  answerMs: z.number().int().min(0).max(10 * 60 * 1000).optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id || typeof id !== "string") {
    return NextResponse.json(
      { error: "Tell id required" },
      { status: 400 },
    );
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

  const ctx = await resolveTellContext();

  try {
    const result = await recordAnswer({
      tellId: id,
      choiceId: body.choiceId,
      userId: ctx.userId,
      anonId: ctx.userId ? null : ctx.anonId,
      answerMs: body.answerMs,
    });

    const res = NextResponse.json(result);
    if (ctx.anonIdMinted) setAnonCookie(res, ctx.anonId);
    return res;
  } catch (err) {
    if (err instanceof RecordAnswerInputError) {
      return NextResponse.json(
        { error: err.message },
        { status: 400 },
      );
    }
    logger.error(
      "[tells.answer] failed",
      err instanceof Error ? err : new Error(String(err)),
      { tellId: id, userId: ctx.userId ?? "anonymous" },
    );
    return NextResponse.json(
      { error: "Could not record answer" },
      { status: 500 },
    );
  }
}
