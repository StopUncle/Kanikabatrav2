import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const days = Math.max(
    1,
    Math.min(90, Number(request.nextUrl.searchParams.get("days") || 7)),
  );
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  // Anything that has *moved past* development counts as shipped for the
  // purposes of "did we actually produce it". FILMED + PUBLISHED.
  const SHIPPED_STAGES = ["FILMED", "PUBLISHED"];

  const ideas = await prisma.contentIdea.findMany({
    where: {
      developmentStage: { in: SHIPPED_STAGES },
      updatedAt: { gte: since },
    },
    include: {
      confession: {
        select: { id: true, category: true, tier: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  const total = ideas.length;
  const filmed = ideas.filter((i) => i.developmentStage === "FILMED").length;
  const published = ideas.filter(
    (i) => i.developmentStage === "PUBLISHED",
  ).length;

  function bucket<T extends keyof (typeof ideas)[number]>(
    field: T,
  ): Record<string, number> {
    const out: Record<string, number> = {};
    for (const idea of ideas) {
      const v = idea[field] as unknown;
      const key = v == null ? "(unset)" : String(v);
      out[key] = (out[key] ?? 0) + 1;
    }
    return out;
  }

  const byCloseMechanism = bucket("closeMechanism");
  const byHookType = bucket("hookType");
  const byFrame = bucket("frame");
  const byVideoFormat = bucket("videoFormat");
  const byDeepening = bucket("deepeningMechanism");

  // Confession usage in shipped videos
  const confessionsUsed = ideas
    .map((i) => i.confession)
    .filter(
      (c): c is NonNullable<typeof c> => c !== null && c !== undefined,
    );
  const confessionTierBreakdown: Record<string, number> = {};
  const confessionCategoryBreakdown: Record<string, number> = {};
  for (const c of confessionsUsed) {
    confessionTierBreakdown[c.tier] = (confessionTierBreakdown[c.tier] ?? 0) + 1;
    confessionCategoryBreakdown[c.category] =
      (confessionCategoryBreakdown[c.category] ?? 0) + 1;
  }

  // Disclosure ratio, should be ~20% per the framework
  const longShipped = ideas.filter(
    (i) =>
      i.videoFormat !== "SHORT" &&
      i.deepeningMechanism != null,
  );
  const disclosureCount = longShipped.filter(
    (i) => i.deepeningMechanism === "PERSONAL_DISCLOSURE",
  ).length;
  const disclosureRatio =
    longShipped.length > 0 ? disclosureCount / longShipped.length : 0;

  // Recent items list (slim)
  const recent = ideas.slice(0, 30).map((i) => ({
    id: i.id,
    title: i.title,
    videoFormat: i.videoFormat,
    hookType: i.hookType,
    closeMechanism: i.closeMechanism,
    deepeningMechanism: i.deepeningMechanism,
    frame: i.frame,
    developmentStage: i.developmentStage,
    updatedAt: i.updatedAt,
    confessionTier: i.confession?.tier ?? null,
  }));

  return NextResponse.json({
    days,
    total,
    filmed,
    published,
    byCloseMechanism,
    byHookType,
    byFrame,
    byVideoFormat,
    byDeepening,
    confessionsUsed: confessionsUsed.length,
    confessionTierBreakdown,
    confessionCategoryBreakdown,
    disclosureRatio,
    disclosureCount,
    longShippedCount: longShipped.length,
    recent,
  });
}
