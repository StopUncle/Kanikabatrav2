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
          subject: "[Inner Circle] Discussion prompt queue is empty",
          html: `<p>The discussion-prompt cron found no unused DiscussionPrompt rows. The feed will stop receiving discussion content until more are seeded.</p><p>Add more rows to <code>prisma/seeds/discussion-prompts.ts</code> and re-run the seed script.</p>`,
        });
      } catch (err) {
        logger.error("[cron discussion-prompt] failed to send empty-queue alert", err as Error);
      }
      return NextResponse.json({ message: "No prompts remaining", queueEmpty: true });
    }

    await prisma.feedPost.create({
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
    });

    await prisma.discussionPrompt.update({
      where: { id: prompt.id },
      data: { isUsed: true, postedAt: now },
    });

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
