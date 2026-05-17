import Link from "next/link";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { ArrowRight, Check, Clock, Sparkles } from "lucide-react";

export const metadata = {
  title: "Adventures. The Dark Mirror | Kanika Batra",
  description:
    "Multi-scenario arcs. One narrative thread, played across five to seven chapters. Pick a journey.",
};

export default async function AdventuresIndex() {
  const userId = await requireServerAuth("/consilium/adventures");

  const [adventures, progresses] = await Promise.all([
    prisma.adventure.findMany({
      where: { publishedAt: { not: null } },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    }),
    prisma.adventureProgress.findMany({ where: { userId } }),
  ]);

  const progressByAdventure = new Map(progresses.map((p) => [p.adventureId, p]));

  return (
    <main className="min-h-screen px-4 sm:px-8 py-10 max-w-5xl mx-auto">
      <header className="mb-10">
        <p className="text-warm-gold/70 uppercase tracking-[0.3em] text-xs mb-3">
          The Consilium . Adventures
        </p>
        <h1 className="text-4xl sm:text-5xl font-extralight text-white mb-4 tracking-wide">
          Pick a <span className="text-warm-gold">journey</span>
        </h1>
        <p className="text-text-gray text-base sm:text-lg font-light max-w-2xl leading-relaxed">
          A curated arc of five to seven scenarios played as one continuous
          story. Progress saves between chapters. Step in once a day, finish
          across a week.
        </p>
      </header>

      {adventures.length === 0 ? (
        <div className="p-8 rounded-xl border border-warm-gold/15 bg-deep-black/40 text-center">
          <p className="text-text-gray/70 text-sm font-light">
            No adventures published yet. Check back soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {adventures.map((adv) => {
            const progress = progressByAdventure.get(adv.id);
            const total = adv.scenarioIds.length;
            const stepLabel = progress
              ? progress.completedAt
                ? "Completed"
                : `Step ${Math.min(progress.currentStep + 1, total)} of ${total}`
              : `${total} chapters`;
            const isCompleted = !!progress?.completedAt;
            return (
              <Link
                key={adv.id}
                href={`/consilium/adventures/${adv.slug}`}
                className={`group relative flex flex-col p-6 rounded-xl border bg-deep-black/40 transition-all hover:-translate-y-0.5 ${
                  isCompleted
                    ? "border-warm-gold/10 opacity-70 hover:opacity-100 hover:border-warm-gold/30"
                    : "border-warm-gold/15 hover:border-warm-gold/50 hover:bg-warm-gold/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-warm-gold/60 uppercase tracking-[0.3em] text-[10px]">
                    {stepLabel}
                  </span>
                  <div className="flex items-center gap-2">
                    {adv.isNew && !progress && (
                      <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.2em] px-1.5 py-0.5 rounded-full bg-deep-burgundy text-warm-gold border border-warm-gold/40">
                        <Sparkles size={9} strokeWidth={2.4} />
                        New
                      </span>
                    )}
                    {isCompleted ? (
                      <Check
                        size={14}
                        strokeWidth={1.8}
                        className="text-warm-gold/70"
                      />
                    ) : (
                      <ArrowRight
                        size={14}
                        strokeWidth={1.6}
                        className="text-warm-gold/40 group-hover:text-warm-gold group-hover:translate-x-0.5 transition-all"
                      />
                    )}
                  </div>
                </div>
                <h2 className="text-white text-xl font-light tracking-wide mb-2">
                  {adv.title}
                </h2>
                <p className="text-text-gray/80 text-sm font-light leading-relaxed mb-4">
                  {adv.tagline}
                </p>
                <div className="mt-auto flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-warm-gold/50">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={10} strokeWidth={1.6} />
                    {adv.estimatedMinutes} min
                  </span>
                  <span>.</span>
                  <span>{adv.difficulty}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <p className="mt-10 text-center text-text-gray/50 text-xs uppercase tracking-[0.25em]">
        Each adventure reuses scenarios from the catalog. You can replay any
        single chapter from the
        <Link
          href="/consilium/simulator"
          className="text-warm-gold/70 hover:text-warm-gold ml-1 transition-colors"
        >
          simulator
        </Link>
        .
      </p>
    </main>
  );
}
