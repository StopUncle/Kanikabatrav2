import { prisma } from "@/lib/prisma";
import QuestionsClient from "./QuestionsClient";

export const dynamic = "force-dynamic";

export default async function QuestionsAdminPage() {
  // Initial PENDING list, server-rendered so the page lights up
  // immediately. The client component refetches on tab switches.
  const initial = await prisma.memberQuestion.findMany({
    where: { status: "PENDING" },
    orderBy: [{ upvoteCount: "desc" }, { createdAt: "desc" }],
    take: 100,
    select: {
      id: true,
      content: true,
      isAnonymous: true,
      status: true,
      upvoteCount: true,
      createdAt: true,
      answeredAt: true,
      rejectionReason: true,
      userId: true,
      answerPost: { select: { id: true, title: true, type: true } },
    },
  });

  const grouped = await prisma.memberQuestion.groupBy({
    by: ["status"],
    _count: true,
  });
  const tabCounts: Record<string, number> = {
    PENDING: 0,
    ANSWERING: 0,
    ANSWERED: 0,
    REJECTED: 0,
    HIDDEN: 0,
  };
  for (const g of grouped) tabCounts[g.status] = g._count;

  return (
    <QuestionsClient
      initialQuestions={initial.map((q) => ({
        ...q,
        createdAt: q.createdAt.toISOString(),
        answeredAt: q.answeredAt?.toISOString() ?? null,
      }))}
      initialTabCounts={tabCounts}
    />
  );
}
