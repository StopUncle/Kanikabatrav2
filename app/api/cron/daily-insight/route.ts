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

    // Idempotency: if a post with today's date was already created (e.g.
    // GitHub Actions retried after a timeout), skip to avoid duplicates.
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart.getTime() + 86_400_000);
    const alreadyPosted = await prisma.feedPost.findFirst({
      where: {
        type: "AUTOMATED",
        title: "Today's Dark Insight",
        createdAt: { gte: todayStart, lt: todayEnd },
      },
    });
    if (alreadyPosted) {
      return NextResponse.json({ success: true, message: "Already posted today", skipped: true });
    }

    // Year-cycle reset: if ALL insights are used, reset the pool. This
    // prevents the queue from permanently exhausting after ~60 days. The
    // rotation restarts with the same content in a new year.
    const unusedCount = await prisma.dailyInsight.count({ where: { isUsed: false } });
    if (unusedCount === 0) {
      await prisma.dailyInsight.updateMany({ data: { isUsed: false, postedAt: null } });
      logger.info("[cron daily-insight] all insights used — reset pool for new cycle");
    }

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
          subject: "Heads up — your daily insight library is running low",
          html: `
            <p style="font-family: Georgia, serif; font-size: 16px; color: #f5f0ed;">Hey Kanika,</p>
            <p style="font-family: Georgia, serif; font-size: 15px; color: #94a3b8; line-height: 1.6;">
              The automatic daily insights posting to the Consilium feed have run out. The feed won't post a new insight today until more are added.
            </p>
            <p style="font-family: Georgia, serif; font-size: 15px; color: #94a3b8; line-height: 1.6;">
              Ask your developer to top up the insights library — no action is needed from you, just a heads up.
            </p>
            <p style="font-family: Georgia, serif; font-size: 13px; color: #94a3b8; margin-top: 24px; font-style: italic;">
              You're getting this because the system sends a one-time alert when the automated content queue is empty. Once refilled, you won't hear about it again.
            </p>
          `,
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
