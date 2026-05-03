import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { TRACK_LABELS, type InstinctTrack } from "@/lib/tells/types";

export const dynamic = "force-dynamic";

/**
 * Admin analytics for Tells.
 *
 * Per-Tell stats Kanika needs to tune content:
 *   - total responses (anonymous + scored)
 *   - accuracy: pct who picked the correct choice
 *   - distribution: which wrong choice attracts the most picks
 *   - first-30s drop-off (to be added when answerMs analysis ships)
 *
 * Scored-only counts power the "is this Tell too hard" question;
 * accuracy below 25% likely means the distractors are mis-tuned.
 * Accuracy above 90% likely means the Tell is too obvious for the
 * difficulty rating set on it.
 */
interface TellStats {
  id: string;
  number: number;
  slug: string;
  question: string;
  track: InstinctTrack;
  difficulty: number;
  status: string;
  totalResponses: number;
  correctResponses: number;
  accuracy: number; // 0-100
  scoredResponses: number;
  byChoice: Array<{ choiceId: string; choiceText: string; count: number; isCorrect: boolean }>;
}

export default async function TellAnalyticsPage() {
  const tells = await prisma.tell.findMany({
    orderBy: [{ scheduleDate: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      number: true,
      slug: true,
      question: true,
      track: true,
      difficulty: true,
      status: true,
      choices: true,
    },
    take: 100,
  });

  if (tells.length === 0) {
    return (
      <div className="max-w-4xl">
        <Link
          href="/admin/tells"
          className="inline-flex items-center gap-2 text-text-gray hover:text-accent-gold text-sm mb-6"
        >
          <ArrowLeft size={14} /> Back to Tells
        </Link>
        <p className="text-text-gray text-sm">No Tells to analyse yet.</p>
      </div>
    );
  }

  // Pull all responses for these tells in one round-trip.
  const tellIds = tells.map((t) => t.id);
  const responses = await prisma.tellResponse.findMany({
    where: { tellId: { in: tellIds } },
    select: { tellId: true, choiceId: true, isCorrect: true, countedScored: true },
  });

  // Bucket responses by tellId + choiceId.
  const byTell = new Map<string, { total: number; correct: number; scored: number; choiceCounts: Map<string, number> }>();
  for (const r of responses) {
    let bucket = byTell.get(r.tellId);
    if (!bucket) {
      bucket = { total: 0, correct: 0, scored: 0, choiceCounts: new Map() };
      byTell.set(r.tellId, bucket);
    }
    bucket.total += 1;
    if (r.isCorrect) bucket.correct += 1;
    if (r.countedScored) bucket.scored += 1;
    bucket.choiceCounts.set(
      r.choiceId,
      (bucket.choiceCounts.get(r.choiceId) ?? 0) + 1,
    );
  }

  const stats: TellStats[] = tells.map((t) => {
    const bucket = byTell.get(t.id) ?? {
      total: 0,
      correct: 0,
      scored: 0,
      choiceCounts: new Map<string, number>(),
    };
    const choices = t.choices as unknown as Array<{
      id: string;
      text: string;
      isCorrect: boolean;
    }>;
    const byChoice = choices.map((c) => ({
      choiceId: c.id,
      choiceText: c.text,
      count: bucket.choiceCounts.get(c.id) ?? 0,
      isCorrect: c.isCorrect,
    }));
    return {
      id: t.id,
      number: t.number,
      slug: t.slug,
      question: t.question,
      track: t.track as InstinctTrack,
      difficulty: t.difficulty,
      status: t.status,
      totalResponses: bucket.total,
      correctResponses: bucket.correct,
      accuracy:
        bucket.total > 0
          ? Math.round((bucket.correct / bucket.total) * 100)
          : 0,
      scoredResponses: bucket.scored,
      byChoice,
    };
  });

  const grandTotal = stats.reduce((sum, s) => sum + s.totalResponses, 0);
  const grandScored = stats.reduce((sum, s) => sum + s.scoredResponses, 0);

  return (
    <div className="max-w-6xl space-y-10">
      <header>
        <Link
          href="/admin/tells"
          className="inline-flex items-center gap-2 text-text-gray hover:text-accent-gold text-sm mb-4"
        >
          <ArrowLeft size={14} /> Back to Tells
        </Link>
        <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.4em] mb-2">
          Tells &middot; Analytics
        </p>
        <h1 className="text-3xl font-extralight tracking-wider uppercase text-text-light">
          Per-Tell performance
        </h1>
        <p className="text-text-gray text-sm mt-3">
          {tells.length} Tells &middot; {grandTotal} total responses
          ({grandScored} scored, {grandTotal - grandScored} anonymous)
        </p>
      </header>

      <div className="space-y-4">
        {stats.map((s) => (
          <TellCard key={s.id} s={s} />
        ))}
      </div>

      <p className="text-text-gray/50 text-xs leading-relaxed pt-6 border-t border-gray-800">
        Accuracy below 25% suggests the distractors are too convincing or
        the correct answer is mis-keyed. Accuracy above 90% suggests the
        Tell is too obvious for its difficulty rating. Aim for 50-75% on
        difficulty 3 Tells.
      </p>
    </div>
  );
}

function TellCard({ s }: { s: TellStats }) {
  const accuracyColour =
    s.totalResponses === 0
      ? "text-text-gray/40"
      : s.accuracy < 25
        ? "text-accent-burgundy"
        : s.accuracy > 90
          ? "text-warm-gold"
          : "text-emerald-400";

  return (
    <article className="rounded-lg border border-gray-800 bg-deep-black/40 p-5 space-y-4">
      <header className="flex flex-col sm:flex-row sm:items-baseline gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.3em] mb-1">
            Tell {String(s.number).padStart(3, "0")} &middot;{" "}
            {TRACK_LABELS[s.track]} &middot; D{s.difficulty} &middot; {s.status}
          </p>
          <p className="text-text-light text-sm font-light">
            <Link
              href={`/admin/tells/${s.id}/edit`}
              className="hover:text-accent-gold"
            >
              {s.question}
            </Link>
          </p>
        </div>
        <div className="flex items-baseline gap-3 flex-shrink-0">
          <span className="text-text-gray/60 text-xs">
            {s.totalResponses} resp
          </span>
          <span className={`text-2xl font-extralight ${accuracyColour}`}>
            {s.totalResponses === 0 ? "—" : `${s.accuracy}%`}
          </span>
        </div>
      </header>

      {s.totalResponses > 0 && (
        <div className="space-y-2">
          {s.byChoice.map((c) => {
            const pct =
              s.totalResponses > 0
                ? Math.round((c.count / s.totalResponses) * 100)
                : 0;
            return (
              <div key={c.choiceId} className="space-y-1">
                <div className="flex items-baseline justify-between gap-3 text-xs">
                  <span
                    className={
                      c.isCorrect ? "text-emerald-400" : "text-text-gray"
                    }
                  >
                    {c.isCorrect ? "✓ " : ""}
                    {c.choiceText.length > 80
                      ? c.choiceText.slice(0, 80) + "…"
                      : c.choiceText}
                  </span>
                  <span className="text-text-gray/60 flex-shrink-0">
                    {c.count} &middot; {pct}%
                  </span>
                </div>
                <div className="h-1 bg-gray-800/40 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      c.isCorrect
                        ? "bg-emerald-500/60"
                        : "bg-accent-burgundy/40"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}
