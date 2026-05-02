/**
 * POST /api/receipts — create a Receipt (premium killer).
 * GET  /api/receipts — list current user's receipts.
 *
 * Auth: member required (active community membership).
 *
 * Quota: weekly cap by tier. Replay detection: same input within 7
 * days returns the prior Receipt without re-billing the LLM.
 */

import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
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
import { logger } from "@/lib/logger";

const Body = z.object({
  input: z.string().min(1).max(20_000),
  label: z.string().max(120).optional(),
});

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

  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await request.json());
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid payload", detail: (err as Error).message },
      { status: 400 },
    );
  }

  const tier: ReceiptsTier = "member"; // upgraded later when Inner ships

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

  // 2. Quota gate.
  const quota = await getReceiptsQuota(ctx.userId, tier);
  if (quota.remaining <= 0) {
    return NextResponse.json(
      {
        error: "Weekly receipt limit reached.",
        quota,
      },
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

  // 4. Persist (without raw input).
  const row = await prisma.receipt.create({
    data: {
      userId: ctx.userId,
      label: body.label || null,
      response: result.response,
      inputCharCount: body.input.length,
      inputHash,
      model: result.model,
      costMicros: result.costMicros,
    },
    select: { id: true, label: true, response: true, createdAt: true },
  });

  return NextResponse.json({
    receipt: row,
    quota: {
      used: quota.used + 1,
      cap: quota.cap,
      remaining: quota.remaining - 1,
    },
    replay: false,
  });
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
