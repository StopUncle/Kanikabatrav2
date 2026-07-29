import { prisma } from "@/lib/prisma";
import JournalReviewClient from "./JournalReviewClient";

export const dynamic = "force-dynamic";

/**
 * The Twelve's journal review queue.
 *
 * Flagged entries first (the crisis classifier fired and a human must
 * look), then the unreviewed sample. Her name is on every generated reply;
 * this queue is the standing check that the voice has not drifted.
 */
export default async function ProgramJournalAdminPage() {
  const [flaggedCount, unreviewedCount, entries] = await Promise.all([
    prisma.journalEntry.count({ where: { flagged: true, reviewedAt: null } }),
    prisma.journalEntry.count({ where: { reviewedAt: null } }),
    prisma.journalEntry.findMany({
      where: { reviewedAt: null },
      orderBy: [{ flagged: "desc" }, { createdAt: "desc" }],
      take: 50,
      include: { user: { select: { email: true, name: true } } },
    }),
  ]);

  return (
    <JournalReviewClient
      flaggedCount={flaggedCount}
      unreviewedCount={unreviewedCount}
      initial={entries.map((e) => ({
        id: e.id,
        weekNumber: e.weekNumber,
        member: e.user.name || e.user.email,
        body: e.body,
        reply: e.reply,
        replyModel: e.replyModel,
        flagged: e.flagged,
        createdAt: e.createdAt.toISOString(),
      }))}
    />
  );
}
