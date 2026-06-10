/**
 * POST /api/consilium/lab/[sessionId]/message — send a move, get the
 * persona's reply.
 *
 * Cost controls, cheap to expensive:
 *   1. Per-user burst limit (6/min) blocks rapid-fire spam at the
 *      expensive Sonnet call.
 *   2. Per-session turn cap (16 player messages) bounds every session.
 *   3. 400-char input cap bounds prompt growth.
 *
 * The transcript is persisted after the LLM reply so a failed call
 * leaves the session exactly as it was; the member just retries.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { getPersona } from "@/lib/lab/personas";
import {
  labReply,
  LAB_MAX_TURNS,
  LAB_MAX_MSG_CHARS,
  type TranscriptMessage,
} from "@/lib/lab/engine";
import { enforceRateLimit, limits } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const Body = z.object({
  text: z.string().min(1).max(LAB_MAX_MSG_CHARS),
});

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ sessionId: string }> },
) {
  const { sessionId } = await context.params;
  return requireAuth(request, async (req, user) => {
    const rateLimited = await enforceRateLimit(
      limits.labMessage,
      `user:${user.id}`,
    );
    if (rateLimited) return rateLimited;

    let body: z.infer<typeof Body>;
    try {
      body = Body.parse(await req.json());
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid payload", detail: (err as Error).message },
        { status: 400 },
      );
    }

    const session = await prisma.labSession.findFirst({
      where: { id: sessionId, userId: user.id },
    });
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }
    if (session.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "This session has ended." },
        { status: 409 },
      );
    }
    if (session.turnCount >= LAB_MAX_TURNS) {
      return NextResponse.json(
        { error: "Turn limit reached. End the session for your score." },
        { status: 409 },
      );
    }

    const persona = getPersona(session.personaKey);
    if (!persona) {
      return NextResponse.json(
        { error: "Persona no longer exists." },
        { status: 410 },
      );
    }

    const transcript = session.transcript as unknown as TranscriptMessage[];
    const now = new Date().toISOString();
    const withUserMove: TranscriptMessage[] = [
      ...transcript,
      { role: "user", text: body.text.trim(), at: now },
    ];

    let reply: { text: string; costMicros: number };
    try {
      reply = await labReply(persona, withUserMove);
    } catch (err) {
      logger.error(
        "[lab] persona reply failed",
        err instanceof Error ? err : new Error(String(err)),
        { userId: user.id, sessionId, personaKey: session.personaKey },
      );
      return NextResponse.json(
        { error: `${persona.name} went quiet. Try again.` },
        { status: 502 },
      );
    }

    const finalTranscript: TranscriptMessage[] = [
      ...withUserMove,
      { role: "persona", text: reply.text, at: new Date().toISOString() },
    ];

    const updated = await prisma.labSession.update({
      where: { id: session.id },
      data: {
        transcript: finalTranscript as unknown as object[],
        turnCount: session.turnCount + 1,
        costMicros: session.costMicros + reply.costMicros,
      },
      select: { turnCount: true },
    });

    return NextResponse.json({
      reply: reply.text,
      turnCount: updated.turnCount,
      maxTurns: LAB_MAX_TURNS,
    });
  });
}
