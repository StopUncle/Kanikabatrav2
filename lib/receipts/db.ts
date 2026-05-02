/**
 * Receipts DB layer. Server-only.
 *
 * Three concerns:
 *   1. Quota: count receipts in the current ISO week per user.
 *   2. Replay detection: short-circuit identical-input pastes by hash.
 *   3. Persistence: write Receipt rows after a successful LLM call.
 */

import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";
import { isoWeekKey } from "@/lib/tells/streak";

/* -------------------------------------------------------------------------- */
/* Quota                                                                      */
/* -------------------------------------------------------------------------- */

const TIER_WEEKLY_CAPS = {
  member: 12,
  inner: 60,
} as const;

export type ReceiptsTier = keyof typeof TIER_WEEKLY_CAPS;

/**
 * How many receipts this user has consumed in the current ISO week,
 * and what their cap is. Used both for the API gate and the surface
 * banner ("8 / 12 this week").
 */
export async function getReceiptsQuota(
  userId: string,
  tier: ReceiptsTier,
): Promise<{
  used: number;
  cap: number;
  remaining: number;
  weekKey: string;
}> {
  const cap = TIER_WEEKLY_CAPS[tier];
  const start = startOfIsoWeek(new Date());

  const used = await prisma.receipt.count({
    where: { userId, createdAt: { gte: start } },
  });

  return {
    used,
    cap,
    remaining: Math.max(0, cap - used),
    weekKey: isoWeekKey(),
  };
}

function startOfIsoWeek(d: Date): Date {
  const day = d.getUTCDay() || 7; // Sunday=7 per ISO
  const monday = new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
  );
  monday.setUTCDate(monday.getUTCDate() - (day - 1));
  return monday;
}

/* -------------------------------------------------------------------------- */
/* Replay detection                                                           */
/* -------------------------------------------------------------------------- */

export function hashInput(input: string): string {
  return createHash("sha256").update(input.trim()).digest("hex");
}

/**
 * If the same user has run the same input within the last 7 days,
 * return that prior Receipt. Saves the LLM call and gives the user
 * the same answer they got before, which is the right semantic.
 */
export async function findRecentSameInput(
  userId: string,
  inputHash: string,
): Promise<{ id: string; response: string; label: string | null } | null> {
  const sevenDaysAgo = new Date(Date.now() - 7 * 86_400_000);
  const row = await prisma.receipt.findFirst({
    where: {
      userId,
      inputHash,
      createdAt: { gte: sevenDaysAgo },
    },
    orderBy: { createdAt: "desc" },
    select: { id: true, response: true, label: true },
  });
  return row;
}

/* -------------------------------------------------------------------------- */
/* List + delete                                                              */
/* -------------------------------------------------------------------------- */

export async function listReceipts(
  userId: string,
  opts: { limit?: number } = {},
) {
  return prisma.receipt.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: opts.limit ?? 30,
    select: {
      id: true,
      label: true,
      response: true,
      inputCharCount: true,
      createdAt: true,
    },
  });
}

export async function getReceipt(userId: string, id: string) {
  return prisma.receipt.findFirst({
    where: { id, userId },
  });
}

export async function deleteReceipt(userId: string, id: string) {
  await prisma.receipt.deleteMany({ where: { id, userId } });
}
