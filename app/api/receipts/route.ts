/**
 * POST /api/receipts — create a Receipt (premium killer).
 * GET  /api/receipts — list current user's receipts.
 *
 * Auth: member required (active community membership).
 *
 * Cost-control layering, in order from cheap to expensive:
 *   1. Per-user rate limit (4/min) blocks parallel bursts.
 *   2. Replay short-circuit returns the prior Receipt without billing.
 *   3. Weekly quota count caps the total per ISO week.
 *   4. LLM call.
 *   5. Persist (transactional reservation: count + insert atomic, so two
 *      concurrent submits cannot both pass the quota gate).
 */

import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { resolveTellContext } from "@/lib/tells/auth-context";
import { checkMembership } from "@/lib/community/membership";
import { prisma } from "@/lib/prisma";
import {
  callReceipts,
  ReceiptsInputError,
} from "@/lib/receipts/anthropic";
import {
  findRecentSameInput,
  getReceiptsQuota,
  hashInput,
  listReceipts,
  type ReceiptsTier,
} from "@/lib/receipts/db";
import { enforceRateLimit, limits } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const Body = z.object({
  input: z.string().min(1).max(20_000),
  label: z.string().max(120).optional(),
});

const TIER_WEEKLY_CAPS = { member: 12, inner: 60 } as const;

export async function POST(request: NextRequest) {
  const ctx = await resolveTellContext();
  if (!ctx.userId) {
    return NextResponse.json({ error: "Auth required" }, { status: 401 });
  }

  const { isMember } = await checkMembership(ctx.userId);
  if (!isMember) {
    return NextResponse.json(
      { error: "Receipts is a member feature. Activate Consilium." },
      { status: 403 },
    );
  }

  // Rate limit per-user to bound parallel bursts. The Receipts model is
  // expensive (Sonnet) so even small bursts are worth blocking.
  const rateLimited = await enforceRateLimit(
    limits.receiptsCreate,
    `user:${ctx.userId}`,
  );
  if (rateLimited) return rateLimited;

  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await request.json());
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid payload", detail: (err as Error).message },
      { status: 400 },
    );
  }

  const tier: ReceiptsTier = "member";
  const cap = TIER_WEEKLY_CAPS[tier];

  // 1. Replay short-circuit: same input within 7 days returns the
  //    prior Receipt and does not consume from the cap.
  const inputHash = hashInput(body.input);
  const prior = await findRecentSameInput(ctx.userId, inputHash);
  if (prior) {
    return NextResponse.json({
      receipt: { id: prior.id, response: prior.response, label: prior.label },
      replay: true,
    });
  }

  // 2. Pre-flight quota gate: cheaper than running the LLM only to throw
  //    the result away. Authoritative gate is the post-LLM transaction.
  const preflight = await getReceiptsQuota(ctx.userId, tier);
  if (preflight.remaining <= 0) {
    return NextResponse.json(
      { error: "Weekly receipt limit reached.", quota: preflight },
      { status: 429 },
    );
  }

  // 3. LLM call.
  let result;
  try {
    result = await callReceipts(body.input, body.label);
  } catch (err) {
    if (err instanceof ReceiptsInputError) {
      return NextResponse.json(
        { error: err.message, kind: err.kind },
        { status: 400 },
      );
    }
    logger.error(
      "[receipts] llm call failed",
      err instanceof Error ? err : new Error(String(err)),
      { userId: ctx.userId, charCount: body.input.length },
    );
    return NextResponse.json(
      { error: "Receipts could not produce a read. Try again." },
      { status: 502 },
    );
  }

  // 4. Persist with a Serializable count+create. If a concurrent submit
  //    already filled the cap between our preflight read and this commit,
  //    the second transaction's count sees the new row and refuses.
  //    Postgres serializability throws P2034 (transaction conflict) on
  //    one of the concurrent tx's — we treat that as quota-exceeded too,
  //    since the alternative is committing past the cap.
  const weekStart = startOfIsoWeek(new Date());
  let row: {
    id: string;
    label: string | null;
    response: string;
    createdAt: Date;
  };
  let usedAfter: number;
  try {
    const inserted = await prisma.$transaction(
      async (tx) => {
        const used = await tx.receipt.count({
          where: { userId: ctx.userId!, createdAt: { gte: weekStart } },
        });
        if (used >= cap) {
          throw new QuotaExceededError(used, cap);
        }
        const created = await tx.receipt.create({
          data: {
            userId: ctx.userId!,
            label: body.label || null,
            response: result.response,
            inputCharCount: body.input.length,
            inputHash,
            model: result.model,
            costMicros: result.costMicros,
          },
          select: {
            id: true,
            label: true,
            response: true,
            createdAt: true,
          },
        });
        return { created, used: used + 1 };
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
    row = inserted.created;
    usedAfter = inserted.used;
  } catch (err) {
    if (err instanceof QuotaExceededError) {
      logger.warn("[receipts] quota raced past cap, rejecting", {
        userId: ctx.userId,
        used: err.used,
        cap: err.cap,
      });
      return NextResponse.json(
        {
          error: "Weekly receipt limit reached.",
          quota: { used: err.used, cap: err.cap, remaining: 0 },
        },
        { status: 429 },
      );
    }
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2034"
    ) {
      // Serialization failure under contention. Behaviorally identical to
      // hitting the cap — caller is the one who lost the race.
      return NextResponse.json(
        { error: "Weekly receipt limit reached." },
        { status: 429 },
      );
    }
    logger.error(
      "[receipts] persist failed",
      err instanceof Error ? err : new Error(String(err)),
      { userId: ctx.userId },
    );
    return NextResponse.json(
      { error: "Receipts could not save. Try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    receipt: row,
    quota: {
      used: usedAfter,
      cap,
      remaining: Math.max(0, cap - usedAfter),
    },
    replay: false,
  });
}

class QuotaExceededError extends Error {
  constructor(
    readonly used: number,
    readonly cap: number,
  ) {
    super(`Weekly cap ${cap} reached (${used})`);
    this.name = "QuotaExceededError";
  }
}

function startOfIsoWeek(d: Date): Date {
  const day = d.getUTCDay() || 7;
  const monday = new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
  );
  monday.setUTCDate(monday.getUTCDate() - (day - 1));
  return monday;
}

export async function GET() {
  const ctx = await resolveTellContext();
  if (!ctx.userId) {
    return NextResponse.json({ error: "Auth required" }, { status: 401 });
  }

  const [items, quota] = await Promise.all([
    listReceipts(ctx.userId, { limit: 30 }),
    getReceiptsQuota(ctx.userId, "member"),
  ]);

  return NextResponse.json({ items, quota });
}
