/**
 * POST /api/consilium/lab/[sessionId]/end — finish a session and get
 * the judge's score.
 *
 * Sessions with fewer than LAB_MIN_TURNS_TO_SCORE player messages are
 * marked ABANDONED with no score (not enough signal to grade, and the
 * member shouldn't burn their daily slot on an accidental tap, so
 * abandoned sessions are excluded from the quota count's intent going
 * forward; the rolling 24h window still applies to starts).
 *
 * A successful end bumps the unified daily streak: a Lab session is a
 * qualifying daily action, same as a simulator run or a Tell.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { getPersona } from "@/lib/lab/personas";
import {
  scoreLabSession,
  LAB_MIN_TURNS_TO_SCORE,
  type TranscriptMessage,
} from "@/lib/lab/engine";
import { bumpDailyStreak } from "@/lib/streak/daily";
import { grantStanding } from "@/lib/standing/grant";
import { STANDING } from "@/lib/standing/config";
import { recordEncounters } from "@/lib/mark/encounters";
import { encountersFromLabScore } from "@/lib/mark/sources/lab";
import { getAccess, canTrain } from "@/lib/access/tier";
import { logger } from "@/lib/logger";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ sessionId: string }> },
) {
  const { sessionId } = await context.params;
  return requireAuth(request, async (_req, user) => {
    // Same training gate as session creation: ending a session runs the
    // judge, an LLM spend a lapsed subscriber should not command.
    const access = await getAccess(user.id);
    if (!canTrain(access)) {
      return NextResponse.json(
        { error: "This needs an active subscription. The Pact opens it." },
        { status: 403 },
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
        { error: "This session already ended." },
        { status: 409 },
      );
    }

    // Too short to grade: mark abandoned, no judge call.
    if (session.turnCount < LAB_MIN_TURNS_TO_SCORE) {
      await prisma.labSession.update({
        where: { id: session.id },
        data: { status: "ABANDONED", endedAt: new Date() },
      });
      return NextResponse.json({ score: null, abandoned: true });
    }

    const persona = getPersona(session.personaKey);
    if (!persona) {
      await prisma.labSession.update({
        where: { id: session.id },
        data: { status: "ABANDONED", endedAt: new Date() },
      });
      return NextResponse.json({ score: null, abandoned: true });
    }

    const transcript = session.transcript as unknown as TranscriptMessage[];

    try {
      const { score, costMicros } = await scoreLabSession(persona, transcript);

      await prisma.labSession.update({
        where: { id: session.id },
        data: {
          status: "ENDED",
          endedAt: new Date(),
          score: score as unknown as object,
          costMicros: session.costMicros + costMicros,
        },
      });

      // Fire-and-forget: streak bump failure must not eat the score.
      bumpDailyStreak(prisma, user.id).catch((err) => {
        logger.warn("[lab] daily streak bump failed", {
          userId: user.id,
          error: err instanceof Error ? err.message : String(err),
        });
      });

      // Standing: one grant per scored session (deduped on the session id
      // so an end-request retry can't double-pay). Abandoned sessions earn
      // nothing, the quota upstream bounds farm attempts. Holding the line
      // pays a bonus on top of the showing-up floor; the verdict screen
      // reports exactly what landed, so the grant is awaited.
      const heldBonus =
        score.outcome === "held" ? STANDING.LAB_HELD_BONUS : 0;
      const grant = await grantStanding(prisma, {
        userId: user.id,
        source: "LAB",
        amount: STANDING.LAB + heldBonus,
        refId: session.id,
        dedupe: true,
      });

      // The Mark: a held session counts as catching the persona's
      // signature tactics, a played session as missing them, a mixed
      // verdict writes nothing. Deduped on the session id so an end
      // retry cannot double-write. recordEncounters never throws.
      await recordEncounters(prisma, {
        userId: user.id,
        source: "LAB",
        encounters: encountersFromLabScore(
          session.personaKey,
          session.id,
          score.outcome,
        ),
        dedupe: true,
      });

      return NextResponse.json({
        score,
        abandoned: false,
        standing: grant.granted
          ? {
              amount: grant.amount,
              base: STANDING.LAB,
              heldBonus,
              newStanding: grant.newStanding,
              rangUp: grant.rangUp,
            }
          : null,
      });
    } catch (err) {
      logger.error(
        "[lab] scoring failed",
        err instanceof Error ? err : new Error(String(err)),
        { userId: user.id, sessionId, personaKey: session.personaKey },
      );
      // End the session anyway so the member isn't stuck with an
      // unkillable ACTIVE row; they just don't get a verdict.
      await prisma.labSession.update({
        where: { id: session.id },
        data: { status: "ENDED", endedAt: new Date() },
      });
      return NextResponse.json({ score: null, abandoned: false });
    }
  });
}
