import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AnswerComposer from "@/components/studio/AnswerComposer";

/**
 * One question, and the means to answer it. Nothing else.
 *
 * The asker stays anonymous here when they asked to be. Revealing an
 * identity is a moderation act and lives behind its own endpoint in
 * /admin/questions, not a screen she answers from every day.
 */
export const dynamic = "force-dynamic";

export default async function StudioQuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const question = await prisma.memberQuestion.findUnique({
    where: { id },
    select: {
      id: true,
      content: true,
      isAnonymous: true,
      status: true,
      upvoteCount: true,
      createdAt: true,
      user: { select: { displayName: true, name: true } },
      answerPost: {
        select: { id: true, content: true, type: true, voiceNoteUrl: true },
      },
    },
  });
  if (!question) notFound();

  const from = question.isAnonymous
    ? "Anonymous"
    : question.user?.displayName || question.user?.name || "Member";
  const answered = question.status === "ANSWERED" && question.answerPost;

  return (
    <main className="px-5 pb-16 pt-[max(1.25rem,env(safe-area-inset-top))]">
      <Link
        href="/studio"
        className="mb-6 inline-block text-[13px] font-light text-[#7a6f60]"
      >
        ‹ Inbox
      </Link>

      <div className="mb-6 rounded-2xl border border-[#d4af37]/20 bg-[#141110] p-5">
        <div className="mb-2.5 flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#d4af37]">
            {from}
          </span>
          {question.upvoteCount > 0 && (
            <span className="text-[12px] font-light text-[#7a6f60]">
              {question.upvoteCount} upvote
              {question.upvoteCount === 1 ? "" : "s"}
            </span>
          )}
        </div>
        <p className="text-[17px] font-light leading-relaxed text-[#f5f0ed]">
          {question.content}
        </p>
      </div>

      {answered ? (
        <div className="rounded-2xl border border-[#d4af37]/15 bg-[#4a1426]/10 p-5">
          <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#d4af37]">
            Answered
          </p>
          {question.answerPost?.voiceNoteUrl && (
            /* eslint-disable-next-line jsx-a11y/media-has-caption */
            <audio
              controls
              src={question.answerPost.voiceNoteUrl}
              className="mb-3 w-full"
            />
          )}
          <p className="text-[15px] font-light leading-relaxed text-[#d6cfc4]">
            {question.answerPost?.content}
          </p>
        </div>
      ) : (
        <AnswerComposer questionId={question.id} />
      )}
    </main>
  );
}
