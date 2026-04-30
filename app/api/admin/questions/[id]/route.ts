import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";
import { logger } from "@/lib/logger";

const patchSchema = z.object({
  status: z.enum(["PENDING", "ANSWERING", "ANSWERED", "REJECTED", "HIDDEN"]).optional(),
  answerPostId: z.string().nullable().optional(),
  rejectionReason: z.string().max(500).optional(),
});

/**
 * PATCH /api/admin/questions/[id]
 *
 * Update question status and/or link an answering FeedPost. When
 * `answerPostId` is set, the question status is forced to ANSWERED,
 * `answeredAt` is stamped, and an email is fired to the asker so they
 * see the green-dot pill on next visit.
 *
 * Email send is fire-and-forget, a transient SMTP issue must not
 * unwind the DB update.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const u = await requireAdminSession();
  if (u) return u;

  const { id } = await params;

  let body: z.infer<typeof patchSchema>;
  try {
    body = patchSchema.parse(await req.json());
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.issues[0]?.message ?? "Invalid input" },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // If linking an answer post, verify it exists and is a voice/video type.
  if (body.answerPostId) {
    const post = await prisma.feedPost.findUnique({
      where: { id: body.answerPostId },
      select: { id: true, type: true },
    });
    if (!post) return NextResponse.json({ error: "Answer post not found" }, { status: 404 });
    if (post.type !== "VOICE_NOTE" && post.type !== "VIDEO") {
      return NextResponse.json(
        { error: "Answer must be a voice note or video post" },
        { status: 400 },
      );
    }
  }

  const updateData: {
    status?: "PENDING" | "ANSWERING" | "ANSWERED" | "REJECTED" | "HIDDEN";
    answerPostId?: string | null;
    answeredAt?: Date | null;
    rejectionReason?: string | null;
  } = {};

  if (body.status !== undefined) updateData.status = body.status;
  if (body.answerPostId !== undefined) {
    updateData.answerPostId = body.answerPostId;
    if (body.answerPostId) {
      updateData.status = "ANSWERED";
      updateData.answeredAt = new Date();
    }
  }
  if (body.rejectionReason !== undefined) {
    updateData.rejectionReason = body.rejectionReason || null;
  }

  const before = await prisma.memberQuestion.findUnique({
    where: { id },
    select: { answerPostId: true, userId: true, content: true },
  });
  if (!before) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await prisma.memberQuestion.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      status: true,
      answeredAt: true,
      answerPostId: true,
    },
  });

  // Trigger asker notification only when an answer is freshly linked
  // (not on every re-link or status edit). Fire-and-forget.
  if (body.answerPostId && before.answerPostId !== body.answerPostId) {
    import("@/lib/questions/notify-asker")
      .then(({ notifyAskerOfAnswer }) =>
        notifyAskerOfAnswer({
          questionId: id,
          userId: before.userId,
          questionContent: before.content,
          answerPostId: body.answerPostId!,
        }),
      )
      .catch((err) =>
        logger.error("[questions] notify-asker failed", err as Error, {
          questionId: id,
        }),
      );
  }

  return NextResponse.json({ success: true, question: updated });
}
