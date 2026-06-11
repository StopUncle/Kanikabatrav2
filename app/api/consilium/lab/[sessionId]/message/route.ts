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

    let reply: { texts: string[]; costMicros: number };
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

    // A barrage is stored as one persona row per message so the thread and
    // the scorer both see the back-to-back pressure exactly as the member did.
    const personaMessages: TranscriptMessage[] = reply.texts.map((text) => ({
      role: "persona",
      text,
      at: new Date().toISOString(),
    }));
    const finalTranscript: TranscriptMessage[] = [
      ...withUserMove,
      ...personaMessages,
    ];

    // Optimistic-concurrency guard: only write if the row is still ACTIVE
    // and sitting at the turnCount we read. A concurrent send (double Enter)
    // or a send racing /end will fail this match instead of clobbering the
    // transcript, double-spending the turn cap, or resurrecting a scored
    // session. costMicros uses an atomic increment so the losing request's
    // spend is still accounted even though its transcript is discarded.
    const guarded = await prisma.labSession.updateMany({
      where: { id: session.id, status: "ACTIVE", turnCount: session.turnCount },
      data: {
        transcript: finalTranscript as unknown as object[],
        turnCount: { increment: 1 },
        costMicros: { increment: reply.costMicros },
      },
    });
    if (guarded.count === 0) {
      // Someone else advanced this session between our read and write.
      await prisma.labSession.update({
        where: { id: session.id },
        data: { costMicros: { increment: reply.costMicros } },
      });
      return NextResponse.json(
        { error: "That session moved on. Refresh and continue." },
        { status: 409 },
      );
    }

    return NextResponse.json({
      replies: reply.texts,
      turnCount: session.turnCount + 1,
      maxTurns: LAB_MAX_TURNS,
    });
  });
}
