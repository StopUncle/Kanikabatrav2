import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET && secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

    let insight = await prisma.dailyInsight.findFirst({
      where: { dayOfYear, isUsed: false },
    });

    if (!insight) {
      insight = await prisma.dailyInsight.findFirst({
        where: { isUsed: false },
        orderBy: { dayOfYear: "asc" },
      });
    }

    if (!insight) {
      return NextResponse.json({ message: "No insights remaining" });
    }

    await prisma.feedPost.create({
      data: {
        title: "Today's Dark Insight",
        content: insight.content,
        type: "AUTOMATED",
        isPinned: false,
        isLocked: false,
        metadata: { insightId: insight.id, category: insight.category },
      },
    });

    await prisma.dailyInsight.update({
      where: { id: insight.id },
      data: { isUsed: true, postedAt: now },
    });

    return NextResponse.json({ success: true, category: insight.category });
  } catch (error) {
    console.error("Cron daily-insight error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
