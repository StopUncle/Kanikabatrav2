import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
      return NextResponse.json({ message: "No prompts remaining" });
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
