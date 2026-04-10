import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";
import { logger } from "@/lib/logger";

/**
 * Admin metrics dashboard API.
 *
 * Aggregates revenue, member counts, conversion funnel, and churn so
 * Kanika has a server-side view of what's working. Previously the only
 * business insight was "count the Stripe emails".
 *
 * All amounts in USD. Grouping is by calendar month in UTC; fine for a
 * personal-brand site, would need timezone handling at scale.
 */
export async function GET(_request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twelveMonthsAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 11,
      1,
    );

    // ---------- Monthly revenue (last 12 months) ----------
    // Raw SQL is the cleanest path for month-grouped aggregates; Prisma's
    // query builder doesn't expose DATE_TRUNC.
    const monthlyRevenueRows = await prisma.$queryRaw<
      { month: Date; revenue: number; count: bigint }[]
    >`
      SELECT
        DATE_TRUNC('month', "createdAt") AS month,
        SUM("amount")::float AS revenue,
        COUNT(*) AS count
      FROM "Purchase"
      WHERE "status" = 'COMPLETED'
        AND "createdAt" >= ${twelveMonthsAgo}
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY month ASC
    `;

    const monthlyRevenue = monthlyRevenueRows.map((row) => ({
      month: row.month.toISOString().slice(0, 7), // YYYY-MM
      revenue: Number(row.revenue) || 0,
      count: Number(row.count) || 0,
    }));

    // ---------- Revenue by product type (last 30 days) ----------
    const revenueByType = await prisma.purchase.groupBy({
      by: ["type"],
      where: {
        status: "COMPLETED",
        createdAt: { gte: thirtyDaysAgo },
      },
      _sum: { amount: true },
      _count: true,
    });

    // ---------- Active Inner Circle members ----------
    const activeMembers = await prisma.communityMembership.count({
      where: { status: "ACTIVE" },
    });

    // ---------- Membership status breakdown ----------
    const membershipBreakdown = await prisma.communityMembership.groupBy({
      by: ["status"],
      _count: true,
    });

    // ---------- 30d book sales ----------
    const bookSales30d = await prisma.purchase.count({
      where: {
        type: "BOOK",
        status: "COMPLETED",
        createdAt: { gte: thirtyDaysAgo },
      },
    });

    // ---------- 7d quiz submissions ----------
    const quizSubmissions7d = await prisma.quizResult.count({
      where: { createdAt: { gte: sevenDaysAgo } },
    });

    // ---------- Conversion funnel (last 30 days) ----------
    // quiz taken → book purchased → inner circle applied → inner circle activated
    const quizTaken30d = await prisma.quizResult.count({
      where: { createdAt: { gte: thirtyDaysAgo } },
    });
    const applicationsSubmitted30d = await prisma.communityMembership.count({
      where: { appliedAt: { gte: thirtyDaysAgo } },
    });
    const membershipsActivated30d = await prisma.communityMembership.count({
      where: { activatedAt: { gte: thirtyDaysAgo } },
    });

    // ---------- Churn (30d) ----------
    // Cancellations in the last 30 days as a percentage of active members at
    // the start of the window. Rough but directionally useful.
    const cancellations30d = await prisma.communityMembership.count({
      where: { cancelledAt: { gte: thirtyDaysAgo } },
    });
    const churnRatePct =
      activeMembers + cancellations30d > 0
        ? (cancellations30d / (activeMembers + cancellations30d)) * 100
        : 0;

    // ---------- Total lifetime revenue (all time) ----------
    const lifetimeRevenueAgg = await prisma.purchase.aggregate({
      where: { status: "COMPLETED" },
      _sum: { amount: true },
      _count: true,
    });

    // ---------- Recent high-value purchases (last 10) ----------
    const recentPurchases = await prisma.purchase.findMany({
      where: { status: "COMPLETED" },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        type: true,
        productVariant: true,
        amount: true,
        customerEmail: true,
        customerName: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      generatedAt: now.toISOString(),

      lifetime: {
        revenue: Number(lifetimeRevenueAgg._sum.amount) || 0,
        purchaseCount: lifetimeRevenueAgg._count,
      },

      monthly: {
        revenue: monthlyRevenue,
      },

      revenueByType: revenueByType.map((r) => ({
        type: r.type,
        revenue: Number(r._sum.amount) || 0,
        count: r._count,
      })),

      members: {
        active: activeMembers,
        breakdown: membershipBreakdown.map((m) => ({
          status: m.status,
          count: m._count,
        })),
      },

      activity: {
        bookSales30d,
        quizSubmissions7d,
        quizTaken30d,
        applicationsSubmitted30d,
        membershipsActivated30d,
        cancellations30d,
        churnRatePct: Math.round(churnRatePct * 10) / 10,
      },

      recentPurchases: recentPurchases.map((p) => ({
        id: p.id,
        type: p.type,
        productVariant: p.productVariant,
        amount: Number(p.amount),
        customerEmail: p.customerEmail,
        customerName: p.customerName,
        createdAt: p.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    logger.error("[admin-metrics] failed to compute metrics", error as Error);
    return NextResponse.json(
      { error: "Failed to load metrics" },
      { status: 500 },
    );
  }
}
