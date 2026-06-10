/**
 * GET  /api/consilium/lab — catalog state: active session, quota, history.
 * POST /api/consilium/lab — start a session against a persona.
 *
 * Auth: member required (active Consilium membership). The Lab runs on
 * Sonnet, so the daily session cap is the primary cost gate; it is
 * enforced with the same serializable count+create transaction Receipts
 * uses, so two concurrent starts cannot both pass.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { requireAuth } from "@/lib/auth/middleware";
import { checkMembership } from "@/lib/community/membership";
import { prisma } from "@/lib/prisma";
import { LAB_PERSONAS, getPersona } from "@/lib/lab/personas";
import { LAB_DAILY_CAP, LAB_MAX_TURNS } from "@/lib/lab/engine";
import { logger } from "@/lib/logger";

const DAY_MS = 24 * 60 * 60 * 1000;

async function labQuota(userId: string) {
  const since = new Date(Date.now() - DAY_MS);
  const used = await prisma.labSession.count({
    where: { userId, createdAt: { gte: since } },
  });
  return { used, cap: LAB_DAILY_CAP, remaining: Math.max(0, LAB_DAILY_CAP - used) };
}

export async function GET(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const { isMember } = await checkMembership(user.id);
    if (!isMember) {
      return NextResponse.json(
        { error: "The Lab is a member feature." },
        { status: 403 },
      );
    }

    const [active, quota, recent] = await Promise.all([
      prisma.labSession.findFirst({
        where: { userId: user.id, status: "ACTIVE" },
        orderBy: { createdAt: "desc" },
      }),
      labQuota(user.id),
      prisma.labSession.findMany({
        where: { userId: user.id, status: "ENDED" },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          personaKey: true,
          score: true,
          createdAt: true,
        },
      }),
    ]);

    return NextResponse.json({
      personas: LAB_PERSONAS.map((p) => ({
        key: p.key,
        name: p.name,
        title: p.title,
        hook: p.hook,
        brief: p.brief,
        difficulty: p.difficulty,
      })),
      active: active
        ? {
            id: active.id,
            personaKey: active.personaKey,
            transcript: active.transcript,
            turnCount: active.turnCount,
            maxTurns: LAB_MAX_TURNS,
          }
        : null,
      quota,
      recent,
    });
  });
}

const StartBody = z.object({
  personaKey: z.string().min(1).max(50),
});

export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    const { isMember } = await checkMembership(user.id);
    if (!isMember) {
      return NextResponse.json(
        { error: "The Lab is a member feature." },
        { status: 403 },
      );
    }

    let body: z.infer<typeof StartBody>;
    try {
      body = StartBody.parse(await req.json());
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid payload", detail: (err as Error).message },
        { status: 400 },
      );
    }

    const persona = getPersona(body.personaKey);
    if (!persona) {
      return NextResponse.json({ error: "Unknown persona" }, { status: 404 });
    }

    // One active session at a time: resuming beats stacking.
    const existing = await prisma.labSession.findFirst({
      where: { userId: user.id, status: "ACTIVE" },
      select: { id: true },
    });
    if (existing) {
      return NextResponse.json(
        { error: "You already have a session running. Finish it first." },
        { status: 409 },
      );
    }

    const since = new Date(Date.now() - DAY_MS);
    try {
      const session = await prisma.$transaction(
        async (tx) => {
          const used = await tx.labSession.count({
            where: { userId: user.id, createdAt: { gte: since } },
          });
          if (used >= LAB_DAILY_CAP) {
            throw new QuotaExceededError();
          }
          return tx.labSession.create({
            data: {
              userId: user.id,
              personaKey: persona.key,
              transcript: [
                {
                  role: "persona",
                  text: persona.opening,
                  at: new Date().toISOString(),
                },
              ],
            },
          });
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
      );

      return NextResponse.json({
        session: {
          id: session.id,
          personaKey: session.personaKey,
          transcript: session.transcript,
          turnCount: session.turnCount,
          maxTurns: LAB_MAX_TURNS,
        },
        quota: await labQuota(user.id),
      });
    } catch (err) {
      if (err instanceof QuotaExceededError) {
        return NextResponse.json(
          {
            error: "One session per day. The cap is part of the training.",
            quota: await labQuota(user.id),
          },
          { status: 429 },
        );
      }
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2034"
      ) {
        return NextResponse.json(
          { error: "One session per day. The cap is part of the training." },
          { status: 429 },
        );
      }
      logger.error(
        "[lab] session create failed",
        err instanceof Error ? err : new Error(String(err)),
        { userId: user.id, personaKey: body.personaKey },
      );
      return NextResponse.json(
        { error: "Could not start the session. Try again." },
        { status: 500 },
      );
    }
  });
}

class QuotaExceededError extends Error {}
