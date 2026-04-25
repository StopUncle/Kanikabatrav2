import { prisma } from "@/lib/prisma";
import { getBotSettings } from "./settings";
import { BOT_PERSONAS, type PostTypeAffinity } from "./personas";
import {
  pickCommentCount,
  pickLikeCount,
  drawCommentSchedule,
  drawLikeSchedule,
  selectBotsWeighted,
} from "./scheduling";
import { logger } from "@/lib/logger";

export interface ScheduleResult {
  commentsScheduled: number;
  likesScheduled: number;
  reason?: string;
}

const RECENCY_WINDOW_MS = 24 * 60 * 60 * 1000;

export async function scheduleBotActions(postId: string): Promise<ScheduleResult> {
  const settings = await getBotSettings();
  if (!settings.enabled) {
    return { commentsScheduled: 0, likesScheduled: 0, reason: "disabled" };
  }

  const post = await prisma.feedPost.findUnique({
    where: { id: postId },
    select: {
      id: true,
      title: true,
      content: true,
      type: true,
      isPinned: true,
      createdAt: true,
    },
  });
  if (!post) return { commentsScheduled: 0, likesScheduled: 0, reason: "no-post" };

  const existing = await prisma.botAction.findMany({
    where: { postId },
    select: { id: true },
    take: 1,
  });
  if (existing.length > 0) {
    return { commentsScheduled: 0, likesScheduled: 0, reason: "already-scheduled" };
  }

  const slugs = BOT_PERSONAS.map((p) => p.slug);
  const botUsers = await prisma.user.findMany({
    where: {
      isBot: true,
      botActive: true,
      email: { in: slugs.map((s) => `${s}-bot@consilium.local`) },
    },
    select: { id: true, email: true },
  });
  if (botUsers.length === 0) {
    logger.warn("[bots] scheduleBotActions: no bot users in DB", { postId });
    return { commentsScheduled: 0, likesScheduled: 0, reason: "no-bots" };
  }
  const slugToUserId = new Map<string, string>();
  for (const u of botUsers) {
    const slug = u.email.replace(/-bot@consilium\.local$/, "");
    slugToUserId.set(slug, u.id);
  }
  const activePersonas = BOT_PERSONAS.filter((p) => slugToUserId.has(p.slug));

  const since = new Date(Date.now() - RECENCY_WINDOW_MS);
  const recent = await prisma.botAction.findMany({
    where: { status: "EXECUTED", executedAt: { gte: since } },
    select: { botId: true },
  });
  const userIdToSlug = new Map(
    Array.from(slugToUserId.entries()).map(([s, id]) => [id, s]),
  );
  const recentSlugs = Array.from(
    new Set(recent.map((r) => userIdToSlug.get(r.botId)).filter(Boolean) as string[]),
  );

  const postType = post.type as PostTypeAffinity;
  const commentCount = pickCommentCount(postType, post.isPinned);
  const likeCount = pickLikeCount(postType, post.isPinned);

  const commentBots = selectBotsWeighted(activePersonas, postType, commentCount, recentSlugs);
  const commentSlugSet = new Set(commentBots.map((p) => p.slug));
  const likeBots = selectBotsWeighted(
    activePersonas.filter((p) => !commentSlugSet.has(p.slug)),
    postType,
    likeCount,
    recentSlugs,
  );

  const commentTimes = drawCommentSchedule(commentBots.length, post.createdAt);
  const likeTimes = drawLikeSchedule(likeBots.length, post.createdAt);

  const rows = [
    ...commentBots.map((p, i) => ({
      type: "COMMENT" as const,
      botId: slugToUserId.get(p.slug)!,
      postId,
      scheduledAt: commentTimes[i],
    })),
    ...likeBots.map((p, i) => ({
      type: "LIKE" as const,
      botId: slugToUserId.get(p.slug)!,
      postId,
      scheduledAt: likeTimes[i],
    })),
  ];

  if (rows.length === 0) {
    return { commentsScheduled: 0, likesScheduled: 0, reason: "empty-pool" };
  }

  await prisma.botAction.createMany({ data: rows });

  return {
    commentsScheduled: commentBots.length,
    likesScheduled: likeBots.length,
  };
}
