import Link from "next/link";
import { notFound } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { getScenario } from "@/lib/simulator/scenarios";
import { ArrowRight, Check, Clock, BookOpen } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const adv = await prisma.adventure.findUnique({ where: { slug } });
  if (!adv) return { title: "Adventure | Kanika Batra" };
  return {
    title: `${adv.title}. Adventure | Kanika Batra`,
    description: adv.tagline,
  };
}

export default async function AdventureDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const userId = await requireServerAuth(`/consilium/adventures/${slug}`);

  const adventure = await prisma.adventure.findUnique({ where: { slug } });
  if (!adventure || !adventure.publishedAt) notFound();

  const progress = await prisma.adventureProgress.findUnique({
    where: { userId_adventureId: { userId, adventureId: adventure.id } },
  });

  const chapters = adventure.scenarioIds.map((id, idx) => {
    const scenario = getScenario(id);
    return {
      idx,
      id,
      title: scenario?.title ?? `Scenario ${idx + 1}`,
      tagline: scenario?.tagline ?? null,
      estimatedMinutes: scenario?.estimatedMinutes ?? 0,
      missing: !scenario,
    };
  });

  const isCompleted = !!progress?.completedAt;
  const isInProgress = !!progress && !progress.completedAt;
  const currentStep = progress?.currentStep ?? 0;

  const ctaHref = isCompleted
    ? `/consilium/adventures/${adventure.slug}/complete`
    : `/consilium/adventures/${adventure.slug}/run`;
  const ctaLabel = isCompleted
    ? "Read recap"
    : isInProgress
      ? "Continue"
      : "Begin the arc";

  return (
    <main className="min-h-screen px-4 sm:px-8 py-10 max-w-3xl mx-auto">
      <Link
        href="/consilium/adventures"
        className="inline-flex items-center gap-1 text-warm-gold/60 hover:text-warm-gold text-[10px] uppercase tracking-[0.3em] mb-6 transition-colors"
      >
        <ArrowRight size={10} strokeWidth={1.6} className="rotate-180" />
        Adventures
      </Link>

      <header className="mb-8">
        <p className="text-warm-gold/70 uppercase tracking-[0.3em] text-xs mb-3">
          {adventure.difficulty} . {adventure.estimatedMinutes} minutes .{" "}
          {chapters.length} chapters
        </p>
        <h1 className="text-4xl sm:text-5xl font-extralight text-white mb-4 tracking-wide">
          {adventure.title}
        </h1>
        <p className="text-warm-gold/85 text-lg sm:text-xl font-light italic mb-6">
          {adventure.tagline}
        </p>
        <p className="text-text-gray text-base font-light leading-relaxed whitespace-pre-wrap">
          {adventure.description}
        </p>
      </header>

      <div className="mb-8">
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-warm-gold text-deep-black font-medium tracking-wider uppercase text-sm transition-all hover:bg-warm-gold/90 hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.55)]"
        >
          {ctaLabel}
          <ArrowRight size={16} />
        </Link>
        {isInProgress && (
          <p className="mt-3 text-text-gray/60 text-xs uppercase tracking-[0.25em]">
            Step {Math.min(currentStep + 1, chapters.length)} of {chapters.length}
          </p>
        )}
      </div>

      <section className="mt-12">
        <p className="text-warm-gold/70 uppercase tracking-[0.3em] text-[10px] mb-4">
          The chapters
        </p>
        <ol className="space-y-2">
          {chapters.map((ch) => {
            const isPast = !!progress && ch.idx < currentStep;
            const isCurrent = isInProgress && ch.idx === currentStep;
            return (
              <li
                key={ch.id}
                className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                  isCurrent
                    ? "border-warm-gold/50 bg-warm-gold/[0.04]"
                    : "border-warm-gold/10 bg-deep-black/30"
                }`}
              >
                <span
                  className={`shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] tabular-nums ${
                    isPast || isCompleted
                      ? "bg-warm-gold/15 text-warm-gold"
                      : isCurrent
                        ? "bg-warm-gold text-deep-black font-medium"
                        : "border border-warm-gold/20 text-warm-gold/60"
                  }`}
                >
                  {isPast || isCompleted ? (
                    <Check size={11} strokeWidth={2.4} />
                  ) : (
                    ch.idx + 1
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-light tracking-wide ${
                      ch.missing
                        ? "text-text-gray/40 line-through"
                        : "text-white"
                    }`}
                  >
                    {ch.title}
                  </p>
                  {ch.tagline && !ch.missing && (
                    <p className="text-text-gray/60 text-xs font-light leading-relaxed mt-0.5">
                      {ch.tagline}
                    </p>
                  )}
                  {ch.missing && (
                    <p className="text-text-gray/40 text-[10px] uppercase tracking-[0.25em] mt-0.5">
                      Scenario removed
                    </p>
                  )}
                </div>
                {!ch.missing && ch.estimatedMinutes > 0 && (
                  <span className="shrink-0 inline-flex items-center gap-1 text-text-gray/50 text-[10px] uppercase tracking-[0.25em]">
                    <Clock size={9} strokeWidth={1.6} />
                    {ch.estimatedMinutes}m
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <p className="mt-10 inline-flex items-center gap-2 text-warm-gold/50 text-[10px] uppercase tracking-[0.3em]">
        <BookOpen size={11} strokeWidth={1.6} />
        Reuses scenarios from the simulator. Progress carries over.
      </p>
    </main>
  );
}
