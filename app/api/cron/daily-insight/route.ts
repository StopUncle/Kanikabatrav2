import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { logger } from "@/lib/logger";

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
      // Empty queue — alert the admin so the feed doesn't go silent.
      // Cap the alert frequency by checking a "last alerted" marker, but
      // for simplicity, log every time and let the admin set a Sentry
      // alert on this string.
      logger.error("[cron daily-insight] queue empty — feed will go silent");
      try {
        const adminEmail = process.env.ADMIN_EMAIL || "Kanika@kanikarose.com";
        await sendEmail({
          to: adminEmail,
          subject: "[Inner Circle] Daily insight queue is empty",
          html: `<p>The daily-insight cron found no unused DailyInsight rows. The feed will stop receiving daily content until more are seeded.</p><p>Add more rows to <code>prisma/seeds/daily-insights.ts</code> and re-run the seed script.</p>`,
        });
      } catch (err) {
        logger.error("[cron daily-insight] failed to send empty-queue alert", err as Error);
      }
      return NextResponse.json({ message: "No insights remaining", queueEmpty: true });
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
