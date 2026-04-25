import { prisma } from "@/lib/prisma";
import BotsClient from "./BotsClient";

export const dynamic = "force-dynamic";

export default async function BotsAdminPage() {
  const settings = await prisma.botEngagementSettings.upsert({
    where: { id: "singleton" },
    create: { id: "singleton" },
    update: {},
  });

  const bots = await prisma.user.findMany({
    where: { isBot: true },
    select: { id: true, displayName: true, email: true, botActive: true },
    orderBy: { displayName: "asc" },
  });

  const recent = await prisma.botAction.findMany({
    orderBy: { createdAt: "desc" },
    take: 30,
    include: {
      bot: { select: { displayName: true } },
      post: { select: { id: true, title: true } },
    },
  });

  return (
    <BotsClient
      initialSettings={{ enabled: settings.enabled, dryRun: settings.dryRun }}
      bots={bots}
      initialActions={recent.map((a) => ({
        id: a.id,
        type: a.type,
        status: a.status,
        commentText: a.commentText,
        failureReason: a.failureReason,
        createdAt: a.createdAt.toISOString(),
        executedAt: a.executedAt?.toISOString() ?? null,
        bot: { displayName: a.bot.displayName },
        post: { id: a.post.id, title: a.post.title },
      }))}
    />
  );
}
