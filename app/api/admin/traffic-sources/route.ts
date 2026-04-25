/**
 * GET /api/admin/traffic-sources?days=7
 *
 * Returns acquisition attribution breakdowns from User + QuizResult
 * over the requested window. Admin-only.
 *
 * Response shape:
 *   {
 *     window: { days, since },
 *     users: { total, by_source, by_campaign, by_country, untagged }
 *     quiz:  { total, by_source, by_campaign, by_country, untagged }
 *   }
 *
 * Untagged = rows created in the window with no utmSource AND no
 * recognizable referrer — direct/organic/dark traffic.
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(request.url);
  const daysParam = parseInt(searchParams.get("days") || "7", 10);
  const days = Math.min(Math.max(daysParam, 1), 90);
  const since = new Date(Date.now() - days * 86400_000);

  // Run all aggregations in parallel — each one is small
  const [
    userTotal,
    userBySource,
    userByCampaign,
    userByCountry,
    userUntagged,
    quizTotal,
    quizBySource,
    quizByCampaign,
    quizByCountry,
    quizUntagged,
  ] = await Promise.all([
    prisma.user.count({ where: { createdAt: { gte: since } } }),
    prisma.user.groupBy({
      by: ["utmSource"],
      where: { createdAt: { gte: since }, utmSource: { not: null } },
      _count: { _all: true },
      orderBy: { _count: { utmSource: "desc" } },
    }),
    prisma.user.groupBy({
      by: ["utmCampaign"],
      where: { createdAt: { gte: since }, utmCampaign: { not: null } },
      _count: { _all: true },
      orderBy: { _count: { utmCampaign: "desc" } },
      take: 20,
    }),
    prisma.user.groupBy({
      by: ["ipCountry"],
      where: { createdAt: { gte: since }, ipCountry: { not: null } },
      _count: { _all: true },
      orderBy: { _count: { ipCountry: "desc" } },
      take: 20,
    }),
    prisma.user.count({
      where: {
        createdAt: { gte: since },
        utmSource: null,
        OR: [{ referrer: null }, { referrer: "" }],
      },
    }),
    prisma.quizResult.count({ where: { createdAt: { gte: since } } }),
    prisma.quizResult.groupBy({
      by: ["utmSource"],
      where: { createdAt: { gte: since }, utmSource: { not: null } },
      _count: { _all: true },
      orderBy: { _count: { utmSource: "desc" } },
    }),
    prisma.quizResult.groupBy({
      by: ["utmCampaign"],
      where: { createdAt: { gte: since }, utmCampaign: { not: null } },
      _count: { _all: true },
      orderBy: { _count: { utmCampaign: "desc" } },
      take: 20,
    }),
    prisma.quizResult.groupBy({
      by: ["ipCountry"],
      where: { createdAt: { gte: since }, ipCountry: { not: null } },
      _count: { _all: true },
      orderBy: { _count: { ipCountry: "desc" } },
      take: 20,
    }),
    prisma.quizResult.count({
      where: {
        createdAt: { gte: since },
        utmSource: null,
        OR: [{ referrer: null }, { referrer: "" }],
      },
    }),
  ]);

  const fmt = (
    rows: Array<{ _count: { _all: number } } & Record<string, unknown>>,
    key: string,
  ) =>
    rows.map((r) => ({
      label: (r[key] as string | null) ?? "(unknown)",
      count: r._count._all,
    }));

  return NextResponse.json({
    window: { days, since: since.toISOString() },
    users: {
      total: userTotal,
      bySource: fmt(userBySource, "utmSource"),
      byCampaign: fmt(userByCampaign, "utmCampaign"),
      byCountry: fmt(userByCountry, "ipCountry"),
      untagged: userUntagged,
    },
    quiz: {
      total: quizTotal,
      bySource: fmt(quizBySource, "utmSource"),
      byCampaign: fmt(quizByCampaign, "utmCampaign"),
      byCountry: fmt(quizByCountry, "ipCountry"),
      untagged: quizUntagged,
    },
  });
}
