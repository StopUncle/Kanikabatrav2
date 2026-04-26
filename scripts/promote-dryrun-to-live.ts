/**
 * One-shot: take all EXECUTED dry-run BotActions and turn them into
 * real FeedComment + FeedPostLike rows on the live feed.
 *
 * Idempotent on the comment side via the BotAction.commentId pointer.
 * Idempotent on the like side via the FeedPostLike composite UQ.
 *
 * Deletes any EXECUTED comment that contains an em or en dash (those
 * were generated under the old prompt before the AI-tell guard landed).
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Delete junk em-dash comments
  const junkA = await prisma.botAction.deleteMany({
    where: { type: "COMMENT", status: "EXECUTED", commentText: { contains: "—" } },
  });
  const junkB = await prisma.botAction.deleteMany({
    where: { type: "COMMENT", status: "EXECUTED", commentText: { contains: "–" } },
  });
  console.log(`[1/3] Deleted ${junkA.count + junkB.count} em/en-dash comment actions`);

  // 2. Promote good dry-run comments to real FeedComment rows
  const goodComments = await prisma.botAction.findMany({
    where: {
      type: "COMMENT",
      status: "EXECUTED",
      commentText: { not: null },
      commentId: null,
    },
    include: { post: { select: { createdAt: true } } },
  });
  console.log(`[2/3] Promoting ${goodComments.length} comments…`);

  let posted = 0;
  for (const a of goodComments) {
    const earliest = a.post.createdAt.getTime() + 60 * 60 * 1000;
    const latest = Date.now() - 5 * 60 * 1000;
    const range = Math.max(latest - earliest, 60 * 1000);
    const createdAt = new Date(earliest + Math.random() * range);
    await prisma.$transaction(async (tx) => {
      const c = await tx.feedComment.create({
        data: {
          postId: a.postId,
          authorId: a.botId,
          content: a.commentText!,
          status: "APPROVED",
          createdAt,
        },
      });
      await tx.feedPost.update({
        where: { id: a.postId },
        data: { commentCount: { increment: 1 } },
      });
      await tx.botAction.update({
        where: { id: a.id },
        data: { commentId: c.id },
      });
    });
    posted++;
    if (posted % 10 === 0) console.log(`  posted ${posted}/${goodComments.length}`);
  }
  console.log(`  ✓ posted ${posted} comments to live feed`);

  // 3. Promote dry-run likes to real FeedPostLike rows
  const goodLikes = await prisma.botAction.findMany({
    where: { type: "LIKE", status: "EXECUTED" },
    include: { post: { select: { createdAt: true } } },
  });
  console.log(`[3/3] Promoting ${goodLikes.length} likes…`);

  let liked = 0;
  let dup = 0;
  for (const a of goodLikes) {
    try {
      const earliest = a.post.createdAt.getTime() + 5 * 60 * 1000;
      const latest = Date.now() - 60 * 1000;
      const range = Math.max(latest - earliest, 60 * 1000);
      const createdAt = new Date(earliest + Math.random() * range);
      await prisma.$transaction(async (tx) => {
        await tx.feedPostLike.create({
          data: { postId: a.postId, userId: a.botId, createdAt },
        });
        await tx.feedPost.update({
          where: { id: a.postId },
          data: { likeCount: { increment: 1 } },
        });
      });
      liked++;
    } catch (e) {
      const err = e as { code?: string };
      if (err.code === "P2002") dup++;
      else throw e;
    }
  }
  console.log(`  ✓ posted ${liked} likes (${dup} dupes skipped)`);

  await prisma.$disconnect();
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
