import Link from "next/link";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import {
  ACHIEVEMENTS,
  eventsObserved,
  type AchievementProgressSnapshot,
} from "@/lib/simulator/achievements";
import { getScenario } from "@/lib/simulator/scenarios";
import type { OutcomeType, ChoiceRecord } from "@/lib/simulator/types";
import {
  Award,
  Crown,
  Eye,
  Flame,
  Shield,
  Sparkles,
  Star,
  Skull,
  Lock,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

export const metadata = {
  title: "Achievements — Dark Mirror | Kanika Batra",
  description:
    "Cross-scenario accolades for your Dark Mirror simulator runs.",
};

function IconFor({ name }: { name: string }) {
  const cls = "w-6 h-6";
  switch (name) {
    case "shield":
      return <Shield className={cls} strokeWidth={1.5} />;
    case "crown":
      return <Crown className={cls} strokeWidth={1.5} />;
    case "eye":
      return <Eye className={cls} strokeWidth={1.5} />;
    case "sparkles":
      return <Sparkles className={cls} strokeWidth={1.5} />;
    case "flame":
      return <Flame className={cls} strokeWidth={1.5} />;
    case "skull":
      return <Skull className={cls} strokeWidth={1.5} />;
    case "award":
      return <Award className={cls} strokeWidth={1.5} />;
    case "star":
    default:
      return <Star className={cls} strokeWidth={1.5} />;
  }
}

export default async function SimulatorAchievementsPage() {
  const userId = await requireServerAuth(
    "/consilium/simulator/achievements",
  );

  const [completions, badgeRows] = await Promise.all([
    prisma.simulatorProgress.findMany({
      where: { userId, completedAt: { not: null } },
      select: {
        scenarioId: true,
        currentSceneId: true,
        outcome: true,
        xpEarned: true,
        choicesMade: true,
        startedAt: true,
        completedAt: true,
      },
    }),
    prisma.simulatorBadge.findMany({
      where: { userId },
      select: { badgeKey: true },
    }),
  ]);

  const badgesHeld = new Set(badgeRows.map((b) => b.badgeKey));
  const snapshot: AchievementProgressSnapshot = {
    completions: completions.map((r) => {
      const choicesMade = (r.choicesMade as unknown as ChoiceRecord[]) ?? [];
      const scenarioForEvents = getScenario(r.scenarioId);
      const events = scenarioForEvents
        ? eventsObserved(scenarioForEvents, {
            choicesMade,
            currentSceneId: r.currentSceneId,
          })
        : undefined;
      const durationMs =
        r.startedAt && r.completedAt
          ? r.completedAt.getTime() - r.startedAt.getTime()
          : undefined;
      return {
        scenarioId: r.scenarioId,
        outcome: (r.outcome as OutcomeType | null) ?? null,
        xpEarned: r.xpEarned,
        choicesMade: choicesMade.map((m) => ({ wasOptimal: m.wasOptimal })),
        events,
        durationMs,
      };
    }),
    badgesHeld,
  };

  const earnedCount = ACHIEVEMENTS.filter((a) => a.isEarned(snapshot)).length;

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-10 lg:py-14">
      <Link
        href="/consilium/simulator"
        className="inline-flex items-center gap-2 text-sm text-text-gray hover:text-warm-gold transition-colors mb-6"
      >
        <ArrowLeft size={14} />
        Back to the scenario list
      </Link>

      <header className="text-center mb-12">
        <p className="text-warm-gold/90 uppercase tracking-[0.3em] text-sm mb-3">
          Dark Mirror · Accolades
        </p>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-wider uppercase mb-4"
          style={{
            background:
              "linear-gradient(135deg, #f3d98a 0%, #d4af37 50%, #9c7a1f 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Achievements
        </h1>
        <div className="w-16 h-px bg-warm-gold/50 mx-auto mb-6" />
        <p className="text-text-gray max-w-xl mx-auto font-light leading-relaxed">
          Cross-scenario accolades. Your scenario badges still live on each
          mission; these recognize the patterns across the whole game.
        </p>
        <p className="mt-4 text-sm text-warm-gold/80 tracking-wide">
          {earnedCount} of {ACHIEVEMENTS.length} earned
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {ACHIEVEMENTS.map((ach) => {
          const earned = ach.isEarned(snapshot);
          const progress = ach.progress ? ach.progress(snapshot) : null;
          const pct = progress
            ? Math.min(100, Math.round((progress.current / progress.total) * 100))
            : null;

          return (
            <div
              key={ach.key}
              className={`relative overflow-hidden rounded-2xl border p-6 transition-all ${
                earned
                  ? "border-warm-gold/60 bg-warm-gold/[0.04] shadow-[0_8px_32px_-12px_rgba(212,175,55,0.4)]"
                  : "border-white/10 bg-deep-black/40"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center border ${
                    earned
                      ? "border-warm-gold/60 bg-warm-gold/10 text-warm-gold"
                      : "border-white/10 bg-white/[0.02] text-text-gray/50"
                  }`}
                >
                  <IconFor name={ach.icon} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className={`text-lg font-light tracking-wide ${
                        earned ? "text-warm-gold" : "text-text-light"
                      }`}
                    >
                      {ach.title}
                    </h3>
                    {earned ? (
                      <CheckCircle2
                        size={14}
                        strokeWidth={1.5}
                        className="text-warm-gold/80 shrink-0"
                      />
                    ) : (
                      <Lock
                        size={12}
                        strokeWidth={1.5}
                        className="text-text-gray/40 shrink-0"
                      />
                    )}
                  </div>
                  <p
                    className={`text-sm font-light leading-relaxed ${
                      earned ? "text-text-light/80" : "text-text-gray/70"
                    }`}
                  >
                    {ach.description}
                  </p>

                  {progress && !earned && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-text-gray/70 mb-1.5">
                        <span>Progress</span>
                        <span className="text-warm-gold/80">
                          {progress.current} / {progress.total}
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/[0.04] overflow-hidden">
                        <div
                          className="h-full bg-warm-gold/70"
                          style={{ width: `${pct ?? 0}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {earned && (
                    <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-warm-gold/80">
                      Earned
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
