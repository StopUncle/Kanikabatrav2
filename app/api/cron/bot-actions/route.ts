import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAnthropic, ANTHROPIC_MODEL } from "@/lib/anthropic";
import { getBotSettings } from "@/lib/bots/settings";
import { getPersonaBySlug, type BotPersona } from "@/lib/bots/personas";
import { buildCommentPrompt } from "@/lib/bots/prompt";
import { validateBotComment } from "@/lib/bots/output-guard";
import { logger } from "@/lib/logger";

const PER_RUN_CAP = 50;
const PER_DAY_CAP = 1500;
const MAX_ATTEMPTS = 5;
const ANTHROPIC_TIMEOUT_MS = 15_000;

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET && secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await getBotSettings();
  if (!settings.enabled) {
    return NextResponse.json({ skipped: "disabled" });
  }

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayCount = await prisma.botAction.count({
    where: { status: "EXECUTED", executedAt: { gte: todayStart } },
  });
  if (todayCount >= PER_DAY_CAP) {
    logger.warn("[cron bot-actions] per-day cap hit", { todayCount });
    return NextResponse.json({ skipped: "daily-cap", todayCount });
  }

  // Cap the run-batch by the remaining daily budget, so 50/run can't
  // overshoot 1500/day on a hot Sunday.
  const runCap = Math.min(PER_RUN_CAP, PER_DAY_CAP - todayCount);

  // Atomic claim: push scheduledAt 30 min into the future for the rows
  // we're about to process. If a concurrent cron run lands while we're
  // mid-batch (e.g. Anthropic flaking and our 50 calls take >5min),
  // it'll see our claimed rows as not-due-yet and skip them — preventing
  // duplicate FeedComment inserts. SKIP LOCKED so simultaneous claimers
  // don't block each other. Failure path (markFailed) reschedules the
  // row to its own retry slot, overriding the +30min push.
  const claimed = await prisma.$queryRaw<Array<{ id: string }>>`
    UPDATE "BotAction"
    SET "scheduledAt" = NOW() + INTERVAL '30 minutes'
    WHERE id IN (
      SELECT id FROM "BotAction"
      WHERE status = 'PENDING' AND "scheduledAt" <= NOW()
      ORDER BY "scheduledAt" ASC
      LIMIT ${runCap}
      FOR UPDATE SKIP LOCKED
    )
    RETURNING id
  `;

  const due = claimed.length === 0
    ? []
    : await prisma.botAction.findMany({
        where: { id: { in: claimed.map((c) => c.id) } },
        include: {
          bot: { select: { id: true, email: true } },
          post: { select: { id: true, title: true, content: true, type: true } },
        },
      });

  let executed = 0;
  let failed = 0;
  let skipped = 0;

  for (const action of due) {
    try {
      if (action.type === "LIKE") {
        await executeLike(action.id, action.botId, action.postId, settings.dryRun);
        executed++;
        continue;
      }

      const personaSlug = action.bot.email.replace(/-bot@consilium\.local$/, "");
      const persona = getPersonaBySlug(personaSlug);
      if (!persona) {
        await markFailed(action.id, "persona-missing");
        failed++;
        continue;
      }

      const result = await generateAndStoreComment(
        action.id,
        persona,
        action.post,
        settings.dryRun,
      );
      if (result === "executed") executed++;
      else if (result === "skipped") skipped++;
      else if (result !== "rescheduled") failed++;
    } catch (err) {
      logger.error("[cron bot-actions] action failed", err as Error, {
        actionId: action.id,
      });
      // markFailed itself can fail (DB blip, optimistic lock) — don't let
      // that abort the rest of the batch.
      try {
        await markFailed(action.id, (err as Error).message);
      } catch (markErr) {
        logger.error("[cron bot-actions] markFailed also failed", markErr as Error, {
          actionId: action.id,
        });
      }
      failed++;
    }
  }

  return NextResponse.json({
    settings: { dryRun: settings.dryRun },
    pickedUp: due.length,
    executed,
    failed,
    skipped,
  });
}

async function executeLike(
  actionId: string,
  botId: string,
  postId: string,
  dryRun: boolean,
): Promise<void> {
  if (dryRun) {
    await prisma.botAction.update({
      where: { id: actionId },
      data: { status: "EXECUTED", executedAt: new Date() },
    });
    return;
  }
  await prisma.$transaction(async (tx) => {
    const existing = await tx.feedPostLike.findUnique({
      where: { postId_userId: { postId, userId: botId } },
    });
    if (!existing) {
      await tx.feedPostLike.create({ data: { postId, userId: botId } });
      await tx.feedPost.update({
        where: { id: postId },
        data: { likeCount: { increment: 1 } },
      });
    }
    await tx.botAction.update({
      where: { id: actionId },
      data: { status: "EXECUTED", executedAt: new Date() },
    });
  });
}

type CommentRunResult = "executed" | "skipped" | "rescheduled" | "failed";

async function generateAndStoreComment(
  actionId: string,
  persona: BotPersona,
  post: { id: string; title: string; content: string; type: string },
  dryRun: boolean,
): Promise<CommentRunResult> {
  const { system, user } = buildCommentPrompt(persona, {
    title: post.title,
    content: post.content,
    type: post.type as "AUTOMATED" | "ANNOUNCEMENT" | "DISCUSSION_PROMPT" | "VOICE_NOTE" | "VIDEO",
  });

  const prior = await prisma.botAction.findMany({
    where: { postId: post.id, status: "EXECUTED", commentText: { not: null } },
    select: { commentText: true },
  });
  const priorTexts = prior.map((p) => p.commentText!).filter(Boolean);

  let text: string | null = null;
  for (const temperature of [0.85, 0.95]) {
    const generated = await callAnthropic(system, user, temperature);
    const guard = validateBotComment(generated, priorTexts);
    if (guard.ok) {
      text = generated;
      break;
    }
    logger.info("[cron bot-actions] guard rejected", {
      actionId,
      reason: guard.reason,
    });
  }

  if (!text) {
    await prisma.botAction.update({
      where: { id: actionId },
      data: { status: "SKIPPED", failureReason: "guard-rejected-twice" },
    });
    return "skipped";
  }

  if (dryRun) {
    await prisma.botAction.update({
      where: { id: actionId },
      data: { status: "EXECUTED", executedAt: new Date(), commentText: text },
    });
    return "executed";
  }

  const action = await prisma.botAction.findUnique({
    where: { id: actionId },
    select: { botId: true, postId: true },
  });
  if (!action) return "failed";

  await prisma.$transaction(async (tx) => {
    const comment = await tx.feedComment.create({
      data: {
        postId: action.postId,
        authorId: action.botId,
        content: text,
        status: "APPROVED",
      },
    });
    await tx.feedPost.update({
      where: { id: action.postId },
      data: { commentCount: { increment: 1 } },
    });
    await tx.botAction.update({
      where: { id: actionId },
      data: {
        status: "EXECUTED",
        executedAt: new Date(),
        commentText: text,
        commentId: comment.id,
      },
    });
  });
  return "executed";
}

async function callAnthropic(
  system: string,
  user: string,
  temperature: number,
): Promise<string> {
  const client = getAnthropic();
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ANTHROPIC_TIMEOUT_MS);
  try {
    const resp = await client.messages.create(
      {
        model: ANTHROPIC_MODEL,
        max_tokens: 200,
        temperature,
        system,
        messages: [{ role: "user", content: user }],
      },
      { signal: ctrl.signal },
    );
    const block = resp.content[0];
    if (block.type !== "text") return "";
    return block.text.trim();
  } finally {
    clearTimeout(t);
  }
}

async function markFailed(actionId: string, reason: string): Promise<void> {
  const action = await prisma.botAction.findUnique({
    where: { id: actionId },
    select: { attempts: true },
  });
  if (!action) return;
  const nextAttempts = action.attempts + 1;
  if (nextAttempts >= MAX_ATTEMPTS) {
    await prisma.botAction.update({
      where: { id: actionId },
      data: { status: "FAILED", failureReason: reason, attempts: nextAttempts },
    });
    return;
  }
  const delayMs = 15 * 60 * 1000 * Math.pow(2, action.attempts);
  await prisma.botAction.update({
    where: { id: actionId },
    data: {
      status: "PENDING",
      scheduledAt: new Date(Date.now() + delayMs + Math.random() * 60_000),
      failureReason: reason,
      attempts: nextAttempts,
    },
  });
}
