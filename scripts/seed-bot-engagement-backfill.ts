import { PrismaClient } from "@prisma/client";
import { scheduleBotActions } from "../lib/bots/scheduler";

const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.feedPost.findMany({
    select: { id: true, title: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  console.log(
    `Found ${posts.length} posts. Enqueuing for any without existing BotActions…`,
  );

  let scheduled = 0;
  let skipped = 0;

  for (const post of posts) {
    const existing = await prisma.botAction.count({ where: { postId: post.id } });
    if (existing > 0) {
      console.log(
        `  - skip ${post.title.slice(0, 60)} (${existing} existing actions)`,
      );
      skipped++;
      continue;
    }
    const r = await scheduleBotActions(post.id);
    const reasonStr = r.reason ? ` (${r.reason})` : "";
    console.log(
      `  + ${post.title.slice(0, 60)} → ${r.commentsScheduled}c + ${r.likesScheduled}l${reasonStr}`,
    );
    if (r.commentsScheduled + r.likesScheduled > 0) scheduled++;
  }

  console.log(`Done. ${scheduled} posts enqueued, ${skipped} already had actions.`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
