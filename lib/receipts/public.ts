/**
 * Public (free-tier) Receipts DB layer. Server-only.
 *
 * The free Receipts surface is anonymous and holds the same privacy posture
 * as the paid feature: the user's pasted input and screenshots are NEVER
 * stored. We persist ONLY the generated read, and only so the shareable
 * card (/api/og/receipts/[id]) has something to render server-side when a
 * social scraper fetches it. No userId, no input, no hash.
 */

import { prisma } from "@/lib/prisma";

export interface CreatePublicReceiptArgs {
  response: string;
  model: string;
  costMicros: number;
  anonId?: string | null;
}

/** Persist a free read and return its short id for the share link. */
export async function createPublicReceipt(
  args: CreatePublicReceiptArgs,
): Promise<{ id: string }> {
  const row = await prisma.publicReceipt.create({
    data: {
      response: args.response,
      model: args.model,
      costMicros: args.costMicros,
      anonId: args.anonId ?? null,
    },
    select: { id: true },
  });
  return row;
}

/** Fetch a stored free read for the share card. Returns null if missing. */
export async function getPublicReceipt(
  id: string,
): Promise<{ id: string; response: string; createdAt: Date } | null> {
  return prisma.publicReceipt.findUnique({
    where: { id },
    select: { id: true, response: true, createdAt: true },
  });
}
