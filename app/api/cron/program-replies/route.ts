import { NextRequest, NextResponse } from "next/server";
import { verifyCronSecret } from "@/lib/cron-auth";
import { prisma } from "@/lib/prisma";
import { sendPushToUser } from "@/lib/push";
import { isGauntletWeek } from "@/lib/program/ai/arcs";
import { classifyEntry } from "@/lib/program/ai/safety";
import { generateReply } from "@/lib/program/ai/generate";
import { getEnrollment, weekMaterial, priorEntries } from "@/lib/program/ai/state";
import { logger } from "@/lib/logger";

/**
 * Generates the journal replies that have come due.
 *
 * Runs on the same 15-minute GitHub Actions cadence as the email queue,
 * which combined with each entry's own 40-to-70-minute due time produces
 * the designed latency: the reply lands as a push a while after the entry,
 * because an instant reply reads as processed and a delayed one as read.
 *
 * Flagged entries never appear here: they were answered with the fixed
 * card at write time and their replyDueAt is already satisfied.
 */

const BATCH = 10;

export async function POST(request: NextRequest) {
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const due = await prisma.journalEntry.findMany({
    where: { reply: null, replyDueAt: { lte: new Date() } },
    orderBy: { replyDueAt: "asc" },
    take: BATCH,
  });

  let sent = 0;
  const failures: string[] = [];

  for (const entry of due) {
    try {
      const [enrollment, material, earlier] = await Promise.all([
        getEnrollment(prisma, entry.userId),
        weekMaterial(prisma, entry.weekNumber),
        priorEntries(prisma, entry.userId, entry.weekNumber),
      ]);
      if (!enrollment || !material) {
        failures.push(`${entry.id}: missing enrollment or week`);
        continue;
      }

      // Re-classified here rather than stored: one cheap call, and the
      // classification is fresh even if the classifier improved since the
      // entry was written.
      const classification = await classifyEntry(entry.body);

      const { reply, model } = await generateReply({
        intake: enrollment,
        week: material,
        isGauntlet: isGauntletWeek(entry.weekNumber),
        entryBody: entry.body,
        priorEntries: earlier,
        targeting: classification.targeting,
      });

      await prisma.journalEntry.update({
        where: { id: entry.id },
        data: { reply, replyModel: model },
      });
      sent++;

      // Same category as a question she answers: it is her answering.
      await sendPushToUser(entry.userId, "questionAnswered", {
        title: "She read your entry",
        body: `Week ${entry.weekNumber}. Her reply is in your journal.`,
        url: "/app/program",
      }).catch(() => 0);
    } catch (err) {
      failures.push(`${entry.id}: ${err instanceof Error ? err.message : "unknown"}`);
      logger.error(
        `[cron program-replies] generation failed for ${entry.id}`,
        err instanceof Error ? err : undefined,
      );
    }
  }

  return NextResponse.json({ due: due.length, sent, failures });
}
