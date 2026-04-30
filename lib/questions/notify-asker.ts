import { prisma } from "@/lib/prisma";
import { sendQuestionAnswered } from "@/lib/email";
import { sendPushToUser } from "@/lib/push";
import { logger } from "@/lib/logger";

/**
 * Closes the engagement loop. When the admin links an answering FeedPost
 * to a question, the asker gets an email pointing them at the answer
 * AND a web-push notification (if subscribed). Both are best-effort —
 * neither failure mode should break the admin's PATCH.
 *
 * Failure here is logged but never thrown — the admin's PATCH must
 * succeed even if Resend / SMTP / web-push is having a moment.
 */
export async function notifyAskerOfAnswer(params: {
  questionId: string;
  userId: string;
  questionContent: string;
  answerPostId: string;
}): Promise<void> {
  const [user, post] = await Promise.all([
    prisma.user.findUnique({
      where: { id: params.userId },
      select: { email: true, displayName: true, name: true, emailPreferences: true },
    }),
    prisma.feedPost.findUnique({
      where: { id: params.answerPostId },
      select: { type: true },
    }),
  ]);

  if (!user) {
    logger.warn("[questions/notify] asker not found", { questionId: params.questionId });
    return;
  }
  if (!post || (post.type !== "VOICE_NOTE" && post.type !== "VIDEO")) {
    logger.warn("[questions/notify] answer post is not voice/video", {
      questionId: params.questionId,
      postType: post?.type,
    });
    return;
  }

  // Respect transactional email opt-out if the user has explicitly set it.
  // Default behaviour is to send (this is a transactional event, not marketing).
  const prefs = (user.emailPreferences ?? {}) as Record<string, unknown>;
  if (prefs.questionAnswered === false) {
    logger.info("[questions/notify] user opted out of answer notifications", {
      questionId: params.questionId,
    });
    return;
  }

  const ok = await sendQuestionAnswered({
    recipientEmail: user.email,
    recipientName: user.displayName ?? user.name ?? "Member",
    questionContent: params.questionContent,
    answerPostId: params.answerPostId,
    answerType: post.type,
  });

  // Web push delivery — fire-and-forget, deliberately not awaited
  // beyond its own async boundary. The push helper internally
  // respects pushPreferences and silently no-ops if VAPID is unset
  // or the user has no subscriptions, so this is safe in any
  // environment. Tag matches the question id so re-publishes
  // collapse into one lock-screen entry instead of stacking.
  const pushTitle =
    post.type === "VIDEO"
      ? "Kanika answered your question — video"
      : "Kanika answered your question — voice note";
  await sendPushToUser(params.userId, "questionAnswered", {
    title: pushTitle,
    body:
      params.questionContent.length > 110
        ? params.questionContent.slice(0, 107) + "…"
        : params.questionContent,
    url: `/consilium/feed#post-${params.answerPostId}`,
    tag: `question-${params.questionId}`,
  }).catch((err) => {
    logger.warn("[questions/notify] push failed", {
      questionId: params.questionId,
      err: err instanceof Error ? err.message : String(err),
    });
    return 0;
  });

  logger.info("[questions/notify] dispatched", {
    questionId: params.questionId,
    ok,
  });
}
