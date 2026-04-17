/**
 * GET /api/simulator/scenarios — catalog view for the scenario list page.
 *
 * Returns metadata only (no scene content) to keep the payload small.
 * Includes per-scenario completion status for the current user so the list
 * can render "new", "in progress", or "completed" chips.
 *
 * NOTE: this endpoint does NOT enforce Consilium membership — auth alone is
 * enough to LIST. The /consilium/simulator page does the membership check
 * at layout level. If you add a non-member mode later, this is still safe.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { ALL_SCENARIOS } from "@/lib/simulator/scenarios";

export async function GET(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const progress = await prisma.simulatorProgress.findMany({
      where: { userId: user.id },
      select: {
        scenarioId: true,
        completedAt: true,
        outcome: true,
        xpEarned: true,
      },
    });
    const progressByScenario = new Map(progress.map((p) => [p.scenarioId, p]));

    const catalog = ALL_SCENARIOS.map((s) => {
      const p = progressByScenario.get(s.id);
      return {
        id: s.id,
        title: s.title,
        tagline: s.tagline,
        description: s.description,
        tier: s.tier,
        difficulty: s.difficulty,
        estimatedMinutes: s.estimatedMinutes,
        xpReward: s.xpReward,
        tacticsLearned: s.tacticsLearned,
        // per-user status
        status: p?.completedAt ? "completed" : p ? "in-progress" : "new",
        outcome: p?.outcome ?? null,
        xpEarned: p?.xpEarned ?? 0,
      };
    });

    return NextResponse.json({ scenarios: catalog });
  });
}
