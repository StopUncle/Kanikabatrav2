import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ALL_SCENARIOS,
  scenariosByLevel,
  LEVEL_TITLES,
} from "@/lib/simulator/scenarios";
import { ArrowRight, Clock, Target, CheckCircle2, Circle, Lock } from "lucide-react";

export const metadata = {
  title: "The Dark Mirror — Simulator | Kanika Batra",
  description:
    "Interactive scenarios teaching pattern recognition, information discipline, and power dynamics through story.",
};

/**
 * Catalog landing — groups scenarios by level with a header blurb per level.
 * Shows per-scenario status (new / in-progress / completed) + XP + badges.
 * Scenarios with unmet prerequisites render as locked.
 */
export default async function SimulatorIndex() {
  const userId = await requireServerAuth("/consilium/simulator");

  const [progress, badgeCount] = await Promise.all([
    prisma.simulatorProgress.findMany({
      where: { userId },
      select: {
        scenarioId: true,
        completedAt: true,
        outcome: true,
        xpEarned: true,
      },
    }),
    prisma.simulatorBadge.count({ where: { userId } }),
  ]);

  const progressByScenario = new Map(progress.map((p) => [p.scenarioId, p]));
  const totalXp = progress.reduce((acc, p) => acc + (p.xpEarned ?? 0), 0);

  // A scenario is "unlocked" if ALL of its prerequisites have been completed.
  const completedIds = new Set(
    progress.filter((p) => p.completedAt).map((p) => p.scenarioId),
  );
  const isUnlocked = (prerequisites?: string[]) =>
    !prerequisites || prerequisites.every((id) => completedIds.has(id));

  const byLevel = scenariosByLevel();
  const levels = Object.keys(byLevel)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <main className="min-h-screen px-4 sm:px-8 py-12 max-w-6xl mx-auto">
      {/* Header */}
      <header className="mb-12">
        <p className="text-accent-gold/70 uppercase tracking-[0.3em] text-xs mb-3">
          The Consilium · Simulator
        </p>
        <h1 className="text-4xl sm:text-5xl font-extralight text-white mb-4 tracking-wide">
          The <span className="text-accent-gold">Dark Mirror</span>
        </h1>
        <p className="text-text-gray text-lg font-light max-w-2xl leading-relaxed">
          Interactive scenarios. Real dating and social dynamics. Real
          manipulation tactics. Every choice teaches you something — whether it
          costs you or not.
        </p>

        <div className="mt-8 flex flex-wrap gap-6 text-sm">
          <div>
            <p className="text-accent-gold/60 uppercase tracking-[0.25em] text-[10px]">
              Total XP
            </p>
            <p className="text-white text-2xl font-extralight mt-1">
              {totalXp}
            </p>
          </div>
          <div>
            <p className="text-accent-gold/60 uppercase tracking-[0.25em] text-[10px]">
              Badges
            </p>
            <p className="text-white text-2xl font-extralight mt-1">
              {badgeCount}
            </p>
          </div>
          <div>
            <p className="text-accent-gold/60 uppercase tracking-[0.25em] text-[10px]">
              Completed
            </p>
            <p className="text-white text-2xl font-extralight mt-1">
              {progress.filter((p) => p.completedAt).length} / {ALL_SCENARIOS.length}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/consilium/simulator/achievements"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.2em] text-warm-gold border border-warm-gold/30 rounded-full hover:bg-warm-gold/10 hover:border-warm-gold/60 transition-all"
          >
            View achievements
            <ArrowRight size={12} />
          </Link>
        </div>
      </header>

      {/* Levels */}
      {levels.map((level) => {
        const levelInfo = LEVEL_TITLES[level] ?? {
          title: `Level ${level}`,
          blurb: "",
        };
        return (
          <section key={level} className="mb-14">
            <div className="mb-6 flex items-baseline gap-4 border-b border-accent-gold/15 pb-4">
              <span className="text-accent-gold/60 text-[10px] uppercase tracking-[0.4em]">
                Level {level}
              </span>
              <h2 className="text-2xl font-extralight text-white tracking-wide">
                {levelInfo.title}
              </h2>
              <p className="text-text-gray/60 text-sm font-light italic ml-auto hidden sm:block">
                {levelInfo.blurb}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {byLevel[level].map((s) => {
                const p = progressByScenario.get(s.id);
                const unlocked = isUnlocked(s.prerequisites);
                const status = p?.completedAt
                  ? "completed"
                  : p
                    ? "in-progress"
                    : unlocked
                      ? "new"
                      : "locked";
                const outcome = p?.outcome;

                const statusColor =
                  status === "completed" && outcome === "good"
                    ? "text-accent-gold"
                    : status === "completed" && outcome === "bad"
                      ? "text-red-400"
                      : status === "in-progress"
                        ? "text-amber-300"
                        : status === "locked"
                          ? "text-text-gray/40"
                          : "text-text-gray";

                const statusLabel =
                  status === "completed" && outcome === "good"
                    ? "Mastered"
                    : status === "completed" && outcome === "bad"
                      ? "Failed (replay)"
                      : status === "completed"
                        ? "Completed"
                        : status === "in-progress"
                          ? "In progress"
                          : status === "locked"
                            ? "Locked"
                            : "New";

                const Icon =
                  status === "completed"
                    ? CheckCircle2
                    : status === "locked"
                      ? Lock
                      : Circle;

                const cardBody = (
                  <>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="min-w-0">
                        <p
                          className={`text-[10px] uppercase tracking-[0.3em] mb-2 ${statusColor}`}
                        >
                          <Icon
                            size={10}
                            className="inline mr-1.5 align-middle"
                          />
                          {statusLabel}
                        </p>
                        <h3 className="text-xl font-light text-white tracking-wide mb-1">
                          {s.title}
                        </h3>
                        <p className="text-accent-gold/80 text-sm italic font-light">
                          {s.tagline}
                        </p>
                      </div>
                      {status !== "locked" && (
                        <ArrowRight
                          size={18}
                          className="text-accent-gold/40 group-hover:text-accent-gold group-hover:translate-x-1 transition-all shrink-0 mt-1"
                          strokeWidth={1.5}
                        />
                      )}
                    </div>

                    <p className="text-text-gray text-sm font-light leading-relaxed mb-4 line-clamp-3">
                      {s.description}
                    </p>

                    <div className="flex flex-wrap gap-3 text-text-gray/60 text-xs pt-3 border-t border-accent-gold/10">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={11} strokeWidth={1.5} />
                        {s.estimatedMinutes} min
                      </span>
                      <span className="inline-flex items-center gap-1.5 capitalize">
                        <Target size={11} strokeWidth={1.5} />
                        {s.difficulty}
                      </span>
                      <span className="ml-auto text-accent-gold/60">
                        +{s.xpReward} XP
                      </span>
                    </div>
                  </>
                );

                if (status === "locked") {
                  return (
                    <div
                      key={s.id}
                      className="p-6 rounded-xl border border-accent-gold/10 bg-deep-black/30 opacity-60 cursor-not-allowed"
                      title="Complete earlier scenarios to unlock"
                    >
                      {cardBody}
                    </div>
                  );
                }

                return (
                  <Link
                    key={s.id}
                    href={`/consilium/simulator/${s.id}`}
                    className="group block p-6 rounded-xl border border-accent-gold/20 bg-deep-black/50 hover:border-accent-gold/60 hover:shadow-[0_8px_32px_-8px_rgba(212,175,55,0.25)] transition-all"
                  >
                    {cardBody}
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Future-content tease */}
      <div className="p-6 rounded-xl border border-dashed border-accent-gold/15 bg-deep-black/30 text-center opacity-80">
        <p className="text-accent-gold/50 uppercase tracking-[0.3em] text-[10px] mb-3">
          Levels 6–10 · Coming
        </p>
        <p className="text-text-gray text-sm font-light max-w-md mx-auto">
          Corporate power dynamics. Long-game reputation war. The Queen
          scenarios. New scenarios drop monthly; members unlock them first.
        </p>
      </div>
    </main>
  );
}
