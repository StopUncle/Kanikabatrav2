/**
 * POST /api/simulator/complete — called on ending scene reach.
 *
 * Server responsibilities:
 *   1. Resolve the badge keys earned by this run (via badgesEarnedFromState)
 *   2. Upsert progress row with outcome + completedAt
 *   3. Insert SimulatorBadge rows for any new badges (unique constraint
 *      silently skips duplicates)
 *   4. Return the list of NEW badge keys so the ending screen can celebrate
 *
 * Failure is non-fatal for the player — if the request dies, the client
 * still shows the ending; the badge just won't register until they replay.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getScenario, ALL_SCENARIOS } from "@/lib/simulator/scenarios";
import {
  badgesEarnedFromState,
  levelCompleteBadgeFor,
} from "@/lib/simulator/badges";
import {
  evaluateAchievements,
  eventsObserved,
  type AchievementProgressSnapshot,
} from "@/lib/simulator/achievements";
import type {
  SimulatorState,
  OutcomeType,
  ChoiceRecord,
} from "@/lib/simulator/types";
import { replayXp } from "@/lib/simulator/engine";
import { mergeProgress } from "@/lib/simulator/progress-merge";
import { logger } from "@/lib/logger";

const CompleteBody = z.object({
  scenarioId: z.string().min(1).max(100),
  currentSceneId: z.string().min(1).max(200),
  choicesMade: z.array(
    z.object({
      sceneId: z.string(),
      choiceId: z.string(),
      wasOptimal: z.boolean(),
      timestamp: z.string(),
    }),
  ),
  xpEarned: z.number().int().min(0).max(10_000),
  outcome: z.enum(["good", "neutral", "bad", "passed", "failed"]),
  endedAt: z.string(),
});

export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    let body: z.infer<typeof CompleteBody>;
    try {
      const json = await req.json();
      body = CompleteBody.parse(json);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid completion payload", detail: (err as Error).message },
        { status: 400 },
      );
    }

    const scenario = getScenario(body.scenarioId);
    if (!scenario) {
      return NextResponse.json(
        { error: `Unknown scenario: ${body.scenarioId}` },
        { status: 404 },
      );
    }

    const endingScene = scenario.scenes.find(
      (s) => s.id === body.currentSceneId && s.isEnding,
    );
    if (!endingScene) {
      return NextResponse.json(
        { error: "currentSceneId is not a declared ending for this scenario" },
        { status: 400 },
      );
    }

    // Anti-cheat: recompute XP from the claimed choicesMade and clamp.
    // See /api/simulator/progress for the same rationale — the server
    // owns the engine, so it computes the truth and never trusts the
    // client number beyond it.
    const authoritative = replayXp(scenario, body.choicesMade);
    const safeXp = Math.min(body.xpEarned, authoritative.xp);

    const state: SimulatorState = {
      scenarioId: body.scenarioId,
      currentSceneId: body.currentSceneId,
      choicesMade: body.choicesMade,
      xpEarned: safeXp,
      outcome: body.outcome,
      endedAt: body.endedAt,
    };

    const earnedKeys = badgesEarnedFromState(scenario, state);

    try {
      // Best-of merge — shared with /api/simulator/progress so a replay
      // completion doesn't overwrite a better prior completion. The
      // previous destructive upsert here silently negated the best-of
      // logic /progress enforces: if a player's first run was 100 XP /
      // "good" and a replay ended at 60 XP / "bad", this endpoint would
      // clobber the row down to the worse run. Now the existing row is
      // fetched first and the merge helper decides what to keep.
      const existingRow = await prisma.simulatorProgress.findUnique({
        where: {
          userId_scenarioId: {
            userId: user.id,
            scenarioId: body.scenarioId,
          },
        },
      });
      const { create, update } = mergeProgress(existingRow, {
        currentSceneId: body.currentSceneId,
        choicesMade: body.choicesMade,
        xpEarned: safeXp,
        outcome: body.outcome,
        endedAt: body.endedAt,
      });

      // Persist progress + badges in one round-trip.
      const [, existing] = await prisma.$transaction([
        prisma.simulatorProgress.upsert({
          where: {
            userId_scenarioId: {
              userId: user.id,
              scenarioId: body.scenarioId,
            },
          },
          create: {
            userId: user.id,
            scenarioId: body.scenarioId,
            ...create,
          },
          update,
        }),
        prisma.simulatorBadge.findMany({
          where: { userId: user.id, badgeKey: { in: earnedKeys } },
          select: { badgeKey: true },
        }),
      ]);

      const alreadyEarned = new Set(existing.map((b) => b.badgeKey));
      const newKeys = earnedKeys.filter((k) => !alreadyEarned.has(k));

      if (newKeys.length > 0) {
        await prisma.simulatorBadge.createMany({
          data: newKeys.map((badgeKey) => ({ userId: user.id, badgeKey })),
          skipDuplicates: true,
        });
      }

      // Level-complete check — if this run just completed every scenario in
      // the level with a good/mastery badge, award the level-clear badge too.
      // We re-read the full badge set so the check includes the badges we
      // just inserted above.
      //
      // Track-aware filter: each track (female, male-business, male-dating)
      // numbers its levels from 1 independently. Without the track filter,
      // a male-track completion at level 1 would also match female-track
      // mission-1-1 and mission-1-2 in the pool, so the "level 1 clear"
      // check would demand badges the player has no path to earning. The
      // male-track level-clear would silently never fire.
      const heldNow = await prisma.simulatorBadge.findMany({
        where: { userId: user.id },
        select: { badgeKey: true },
      });
      const heldNowSet = new Set(heldNow.map((b) => b.badgeKey));
      const scenarioTrack = scenario.track ?? "female";
      const scenariosInLevel = ALL_SCENARIOS.filter(
        (s) =>
          s.level === scenario.level && (s.track ?? "female") === scenarioTrack,
      ).map((s) => s.id);
      const levelKey = levelCompleteBadgeFor(
        scenario.level,
        scenariosInLevel,
        heldNowSet,
      );

      if (levelKey) {
        try {
          await prisma.simulatorBadge.create({
            data: { userId: user.id, badgeKey: levelKey },
          });
          newKeys.push(levelKey);
          earnedKeys.push(levelKey);
          heldNowSet.add(levelKey);
        } catch {
          // Unique constraint — already had it. Silent.
        }
      }

      // Meta-achievements — cumulative cross-scenario accolades. Evaluated
      // off the user's full completion history + current badge set. Any
      // that newly fire get inserted alongside scenario + level badges.
      const allCompletions = await prisma.simulatorProgress.findMany({
        where: { userId: user.id, completedAt: { not: null } },
        select: {
          scenarioId: true,
          currentSceneId: true,
          outcome: true,
          xpEarned: true,
          choicesMade: true,
        },
      });
      const snapshot: AchievementProgressSnapshot = {
        completions: allCompletions.map((r) => {
          const choicesMade =
            (r.choicesMade as unknown as ChoiceRecord[]) ?? [];
          const scenarioForEvents = getScenario(r.scenarioId);
          // Populate observed events only when we have the scenario object
          // in memory — unregistered / deleted scenarios leave events
          // undefined, and achievements that read events should short-
          // circuit gracefully on the absence.
          const events = scenarioForEvents
            ? eventsObserved(scenarioForEvents, {
                choicesMade,
                currentSceneId: r.currentSceneId,
              })
            : undefined;
          return {
            scenarioId: r.scenarioId,
            outcome: (r.outcome as OutcomeType | null) ?? null,
            xpEarned: r.xpEarned,
            choicesMade: choicesMade.map((m) => ({ wasOptimal: m.wasOptimal })),
            events,
          };
        }),
        badgesHeld: heldNowSet,
      };
      const achievementKeys = evaluateAchievements(snapshot);
      const freshAchievements = achievementKeys.filter(
        (k) => !heldNowSet.has(k),
      );
      if (freshAchievements.length > 0) {
        await prisma.simulatorBadge.createMany({
          data: freshAchievements.map((badgeKey) => ({
            userId: user.id,
            badgeKey,
          })),
          skipDuplicates: true,
        });
        for (const k of freshAchievements) {
          newKeys.push(k);
          earnedKeys.push(k);
        }
      }

      return NextResponse.json({
        success: true,
        allEarnedKeys: earnedKeys, // every badge the run would earn
        newlyEarnedKeys: newKeys, // only the ones not previously held
      });
    } catch (err) {
      logger.error("[simulator-complete] failed", err as Error, {
        userId: user.id,
        scenarioId: body.scenarioId,
      });
      return NextResponse.json(
        { error: "Failed to record completion" },
        { status: 500 },
      );
    }
  });
}
