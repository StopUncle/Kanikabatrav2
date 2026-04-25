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
    const dayOfWeek = now.getDay(); // 0=Sunday, 1=Monday ... 6=Saturday

    // Skip Sunday (dayOfWeek=0) — seeds are weekday-only (Mon–Fri) and
    // firing on Sunday would cannibalize a Monday prompt via the fallback.
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return NextResponse.json({ success: true, message: "Skipped — weekends have no prompts", skipped: true });
    }

    // Idempotency: if a discussion prompt was already posted today,
    // don't create a duplicate (e.g. on GitHub Actions retry).
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart.getTime() + 86_400_000);
    const alreadyPosted = await prisma.feedPost.findFirst({
      where: {
        type: "DISCUSSION_PROMPT",
        createdAt: { gte: todayStart, lt: todayEnd },
      },
    });
    if (alreadyPosted) {
      return NextResponse.json({ success: true, message: "Already posted today", skipped: true });
    }

    // Year-cycle reset: same as daily-insight — reset the pool when exhausted.
    const unusedCount = await prisma.discussionPrompt.count({ where: { isUsed: false } });
    if (unusedCount === 0) {
      await prisma.discussionPrompt.updateMany({ data: { isUsed: false, postedAt: null } });
      logger.info("[cron discussion-prompt] all prompts used — reset pool for new cycle");
    }

    let prompt = await prisma.discussionPrompt.findFirst({
      where: { dayOfWeek, isUsed: false },
      orderBy: { variation: "asc" },
    });

    if (!prompt) {
      prompt = await prisma.discussionPrompt.findFirst({
        where: { isUsed: false },
        orderBy: [{ dayOfWeek: "asc" }, { variation: "asc" }],
      });
    }

    if (!prompt) {
      logger.error("[cron discussion-prompt] queue empty — feed will go silent");
      try {
        const adminEmail = process.env.ADMIN_EMAIL || "Kanika@kanikarose.com";
        await sendEmail({
          to: adminEmail,
          subject: "Heads up — your discussion prompt library is running low",
          html: `
            <p style="font-family: Georgia, serif; font-size: 16px; color: #f5f0ed;">Hey Kanika,</p>
            <p style="font-family: Georgia, serif; font-size: 15px; color: #94a3b8; line-height: 1.6;">
              The weekly discussion prompts that auto-post to the Consilium feed (Manipulation Monday, etc.) have run out. No prompt will post today.
            </p>
            <p style="font-family: Georgia, serif; font-size: 15px; color: #94a3b8; line-height: 1.6;">
              Ask your developer to add more — no action needed from you, just a heads up.
            </p>
            <p style="font-family: Georgia, serif; font-size: 13px; color: #94a3b8; margin-top: 24px; font-style: italic;">
              You're getting this because the system sends a one-time alert when the automated content queue is empty.
            </p>
          `,
        });
      } catch (err) {
        logger.error("[cron discussion-prompt] failed to send empty-queue alert", err as Error);
      }
      return NextResponse.json({ message: "No prompts remaining", queueEmpty: true });
    }

    const post = await prisma.feedPost.create({
      data: {
        title: prompt.title,
        content: prompt.content,
        type: "DISCUSSION_PROMPT",
        isPinned: false,
        isLocked: false,
        metadata: {
          promptId: prompt.id,
          theme: prompt.theme,
          dayOfWeek: prompt.dayOfWeek,
          variation: prompt.variation,
        },
      },
      select: { id: true },
    });

    await prisma.discussionPrompt.update({
      where: { id: prompt.id },
      data: { isUsed: true, postedAt: now },
    });

    // Fire-and-forget bot engagement (Project B).
    import("@/lib/bots/scheduler")
      .then(({ scheduleBotActions }) => scheduleBotActions(post.id))
      .then((r) => logger.info("[bots] scheduled", { postId: post.id, ...r }))
      .catch((err) =>
        logger.error("[bots] schedule failed", err as Error, { postId: post.id }),
      );

    return NextResponse.json({
      success: true,
      theme: prompt.theme,
      variation: prompt.variation,
    });
  } catch (error) {
    console.error("Cron discussion-prompt error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
