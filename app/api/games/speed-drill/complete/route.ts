/**
 * POST /api/games/speed-drill/complete, called when a Speed Drill run ends.
 *
 * Server responsibilities:
 *   1. Validate the payload (Zod, plus internal-consistency checks)
 *   2. Insert a GameSession row
 *   3. Bump the user's games streak (idempotent within a UTC calendar day)
 *   4. Return the updated streak so the results screen can show it
 *
 * Failure is non-fatal: if the request dies, the player still sees their
 * score. The row just doesn't persist; the next session will.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { bumpGamesStreak } from "@/lib/games/status";
import { bumpDailyStreak } from "@/lib/streak/daily";
import { grantStanding, grantsTodayCount } from "@/lib/standing/grant";
import { STANDING } from "@/lib/standing/config";
import { DRILL_CARDS, DRILL_BANK } from "@/lib/games/speed-drill/content";
import { drillStandingBreakdown } from "@/lib/games/speed-drill/scoring";
import { recordEncounters } from "@/lib/mark/encounters";
import { encountersFromDrillAnswers } from "@/lib/mark/sources/drill";
import { captureServerAsync } from "@/lib/analytics/server";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { logger } from "@/lib/logger";

const CompleteBody = z.object({
  /** Number of correct calls in the run. */
  score: z.number().int().min(0).max(DRILL_CARDS),
  /** Cards actually answered (could be < DRILL_CARDS if the timer ran out). */
  totalCards: z.number().int().min(0).max(DRILL_CARDS),
  /** Longest correct streak during the run. */
  maxCombo: z.number().int().min(0).max(DRILL_CARDS),
  /** Total session length in seconds, including countdown. Cap at 5 min
   *  to catch tab-left-open garbage payloads. */
  durationSec: z.number().int().min(0).max(300),
  /** Difficulty tier used for the draw. 1=warm-up, 2=sharp, 3=ruthless. */
  tier: z.union([z.literal(1), z.literal(2), z.literal(3)]).default(2),
  /**
   * Per-card record of the run. Optional so a cached client that only
   * sends aggregates still saves its session; when present, the server
   * re-derives score and accuracy from it and feeds the Mark.
   */
  answers: z
    .array(
      z.object({
        cardId: z.string().min(1).max(40),
        picked: z.boolean(),
        answerMs: z.number().int().min(0).max(60_000).optional(),
      }),
    )
    .max(DRILL_CARDS)
    .optional(),
});

const CARD_BY_ID = new Map(DRILL_BANK.map((card) => [card.id, card]));

export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    let body: z.infer<typeof CompleteBody>;
    try {
      body = CompleteBody.parse(await req.json());
    } catch (_err) {
      return NextResponse.json({ error: "invalid payload" }, { status: 400 });
    }

    if (body.score > body.totalCards) {
      return NextResponse.json(
        { error: "score exceeds totalCards" },
        { status: 400 },
      );
    }

    // With a per-card record, the server owns the truth: every card must
    // exist in the bank, appear once, and score is re-derived from the
    // bank's answer key. The client aggregates must agree or the payload
    // is rejected as tampered.
    let score = body.score;
    let totalCards = body.totalCards;
    if (body.answers) {
      const ids = new Set(body.answers.map((a) => a.cardId));
      if (ids.size !== body.answers.length) {
        return NextResponse.json(
          { error: "duplicate cards in answers" },
          { status: 400 },
        );
      }
      for (const a of body.answers) {
        if (!CARD_BY_ID.has(a.cardId)) {
          return NextResponse.json(
            { error: `unknown card: ${a.cardId}` },
            { status: 400 },
          );
        }
      }
      totalCards = body.answers.length;
      score = body.answers.filter(
        (a) => a.picked === CARD_BY_ID.get(a.cardId)?.manipulative,
      ).length;
      if (score !== body.score || totalCards !== body.totalCards) {
        return NextResponse.json(
          { error: "aggregates disagree with answers" },
          { status: 400 },
        );
      }
    }

    // Server-side accuracy. Trust this column, not the client's value.
    const accuracy =
      totalCards > 0 ? Math.round((score / totalCards) * 100) : 0;

    try {
      const session = await prisma.gameSession.create({
        data: {
          userId: user.id,
          gameKey: "speed-drill",
          score,
          totalCards,
          accuracy,
          maxCombo: body.maxCombo,
          durationSec: body.durationSec,
          tier: body.tier,
        },
        select: {
          id: true,
          score: true,
          accuracy: true,
          maxCombo: true,
          playedAt: true,
        },
      });

      const streak = await bumpGamesStreak(prisma, user.id).catch((err) => {
        // Don't fail the request if the streak update errors. The session
        // is the load-bearing artefact; the streak is a derivative.
        logger.error(
          "games streak bump failed",
          err instanceof Error ? err : undefined,
        );
        return null;
      });

      // Unified Consilium daily streak — any game session counts toward it.
      bumpDailyStreak(prisma, user.id).catch((err) => {
        logger.error(
          "daily streak bump failed",
          err instanceof Error ? err : undefined,
        );
      });

      // Standing: daily-capped so session-spamming can't farm the Rings.
      // The session row itself is uncapped.
      //
      // Awaited rather than fired and forgotten, because the app-shell drill
      // shows what the run earned and opens the rank-up ceremony off `rangUp`,
      // which used to be computed and thrown away. A failure here degrades to
      // a null field so this can never turn a saved session into a 500.
      let standing: {
        amount: number;
        base: number;
        sharpBonus: number;
        perfectBonus: number;
        newStanding: number;
        rangUp: { fromLevel: number; toLevel: number; ringName: string } | null;
      } | null = null;
      try {
        const today = await grantsTodayCount(prisma, user.id, "DRILL");
        if (today < STANDING.DRILL_DAILY_CAP) {
          // Performance bonuses only when the per-card record is present:
          // score is server-re-derived above, so the breakdown never trusts
          // client aggregates. Legacy aggregates-only clients keep the floor.
          const breakdown = body.answers
            ? drillStandingBreakdown(score, totalCards)
            : {
                base: STANDING.DRILL,
                sharpBonus: 0,
                perfectBonus: 0,
                total: STANDING.DRILL,
              };
          const grant = await grantStanding(prisma, {
            userId: user.id,
            source: "DRILL",
            amount: breakdown.total,
            refId: session.id,
          });
          if (grant.granted) {
            standing = {
              amount: grant.amount,
              base: breakdown.base,
              sharpBonus: breakdown.sharpBonus,
              perfectBonus: breakdown.perfectBonus,
              newStanding: grant.newStanding,
              rangUp: grant.rangUp,
            };
          }
        }
      } catch (err) {
        logger.error(
          "drill standing grant failed",
          err instanceof Error ? err : undefined,
        );
      }

      // The Mark: the first time a member ever faces a mapped card is the
      // read that counts. Deduped per card id, correctness re-derived
      // from the bank inside the mapper. recordEncounters never throws.
      if (body.answers) {
        await recordEncounters(prisma, {
          userId: user.id,
          source: "DRILL",
          encounters: encountersFromDrillAnswers(body.answers),
          dedupe: true,
        });
      }

      captureServerAsync(user.id, ANALYTICS_EVENTS.DRILL_COMPLETED, {
        score,
        accuracy,
        tier: body.tier,
      });

      return NextResponse.json({ session, streak, standing });
    } catch (err) {
      logger.error(
        "speed-drill complete failed",
        err instanceof Error ? err : undefined,
      );
      return NextResponse.json({ error: "save failed" }, { status: 500 });
    }
  });
}
