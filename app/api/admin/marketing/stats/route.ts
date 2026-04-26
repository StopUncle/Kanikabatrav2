import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/admin/marketing/stats
 *
 * Returns the audience size + per-campaign send/skip tally for the
 * admin dashboard. Counts are real-time off the EmailQueue +
 * User tables.
 */
export async function GET() {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const [totalUsers, optedOutUsers, recentRows] = await Promise.all([
    prisma.user.count({ where: { isBanned: false, isBot: false } }),
    prisma.user.count({
      where: {
        isBanned: false,
        isBot: false,
        emailPreferences: { path: ["marketing"], equals: false },
      },
    }),
    prisma.emailQueue.groupBy({
      by: ["sequence", "status"],
      where: { sequence: { startsWith: "drip-" } },
      _count: { _all: true },
    }),
  ]);

  const optedIn = totalUsers - optedOutUsers;

  // Reshape into per-campaign rows: { campaignId: { PENDING, SENT, FAILED, CANCELLED } }
  const byCampaign: Record<string, Record<string, number>> = {};
  for (const row of recentRows) {
    byCampaign[row.sequence] = byCampaign[row.sequence] ?? {};
    byCampaign[row.sequence][row.status] = row._count._all;
  }

  return NextResponse.json({
    audience: {
      total: totalUsers,
      optedIn,
      optedOut: optedOutUsers,
    },
    campaigns: byCampaign,
  });
}
