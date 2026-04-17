import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ALL_SCENARIOS } from "@/lib/simulator/scenarios";
import { ArrowRight, Clock, Target, CheckCircle2, Circle } from "lucide-react";

export const metadata = {
  title: "The Dark Mirror — Simulator | Kanika Batra",
  description:
    "Interactive scenarios teaching pattern recognition, information discipline, and power dynamics through story.",
};

/**
 * Scenario list — the "story map" landing page inside the Consilium.
 * Each card shows tier, difficulty, estimated time, and per-user status
 * (new / in-progress / completed). Clicking a card enters the scenario.
 */
export default async function SimulatorIndex() {
  const userId = await requireServerAuth("/consilium/simulator");

  const progress = await prisma.simulatorProgress.findMany({
    where: { userId },
    select: {
      scenarioId: true,
      completedAt: true,
      outcome: true,
      xpEarned: true,
    },
  });

  const progressByScenario = new Map(progress.map((p) => [p.scenarioId, p]));
  const badgeCount = await prisma.simulatorBadge.count({
    where: { userId },
  });
  const totalXp = progress.reduce((acc, p) => acc + (p.xpEarned ?? 0), 0);

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

        {/* Run totals */}
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
      </header>

      {/* Scenario cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ALL_SCENARIOS.map((s) => {
          const p = progressByScenario.get(s.id);
          const status = p?.completedAt ? "completed" : p ? "in-progress" : "new";
          const outcome = p?.outcome;

          const statusColor =
            status === "completed" && outcome === "good"
              ? "text-accent-gold"
              : status === "completed" && outcome === "bad"
                ? "text-red-400"
                : status === "in-progress"
                  ? "text-amber-300"
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
                    : "New";

          return (
            <Link
              key={s.id}
              href={`/consilium/simulator/${s.id}`}
              className="group block p-6 rounded-xl border border-accent-gold/20 bg-deep-black/50 hover:border-accent-gold/60 hover:shadow-[0_8px_32px_-8px_rgba(212,175,55,0.25)] transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="min-w-0">
                  <p className={`text-[10px] uppercase tracking-[0.3em] mb-2 ${statusColor}`}>
                    {status === "completed" ? (
                      <CheckCircle2
                        size={10}
                        className="inline mr-1.5 align-middle"
                      />
                    ) : (
                      <Circle
                        size={10}
                        className="inline mr-1.5 align-middle opacity-60"
                      />
                    )}
                    {statusLabel}
                  </p>
                  <h2 className="text-xl font-light text-white tracking-wide mb-1">
                    {s.title}
                  </h2>
                  <p className="text-accent-gold/80 text-sm italic font-light">
                    {s.tagline}
                  </p>
                </div>
                <ArrowRight
                  size={18}
                  className="text-accent-gold/40 group-hover:text-accent-gold group-hover:translate-x-1 transition-all shrink-0 mt-1"
                  strokeWidth={1.5}
                />
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
            </Link>
          );
        })}

        {/* Placeholder for upcoming scenarios — tells members the game is expanding */}
        <div className="p-6 rounded-xl border border-dashed border-accent-gold/15 bg-deep-black/30 opacity-60">
          <p className="text-accent-gold/50 uppercase tracking-[0.3em] text-[10px] mb-2">
            Coming soon
          </p>
          <h2 className="text-xl font-light text-text-gray tracking-wide mb-1">
            Level 1 — The Party Path
          </h2>
          <p className="text-text-gray/70 text-sm italic font-light">
            Maris. The test. Your first real decision.
          </p>
          <p className="text-text-gray/50 text-sm font-light mt-4">
            New scenarios drop monthly. Coach Kanika writes them; members
            unlock them first.
          </p>
        </div>
      </div>
    </main>
  );
}
