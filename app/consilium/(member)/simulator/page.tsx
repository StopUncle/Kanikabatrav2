import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ALL_SCENARIOS,
  scenariosByLevel,
  scenariosForTrack,
  levelTitlesForTrack,
  TRACK_META,
} from "@/lib/simulator/scenarios";
import { catalogueStats } from "@/lib/simulator/stats";
import type { ScenarioTrack } from "@/lib/simulator/types";
import { ArrowRight, Trophy, BarChart3, Sparkles } from "lucide-react";
import LevelJourney, {
  type LevelGroup,
  type ScenarioNode,
  type ScenarioStatus,
} from "@/components/consilium/LevelJourney";

export const metadata = {
  title: "The Dark Mirror — Simulator | Kanika Batra",
  description:
    "Interactive scenarios teaching pattern recognition, information discipline, and power dynamics through story.",
};

const VALID_TRACKS: ScenarioTrack[] = [
  "female",
  "male-business",
  "male-dating",
  "anxiety",
  "toxic-narc",
  "pc-child",
  "cluster-b-lab",
];

function resolveTrack(value?: string): ScenarioTrack {
  if (value && (VALID_TRACKS as string[]).includes(value)) {
    return value as ScenarioTrack;
  }
  return "female";
}

/**
 * Simulator catalog. Renders the chosen track as a LevelJourney —
 * a vertical unlock-path layout that reads like a game rather than
 * a flat grid. Track tabs at top, journey below.
 *
 * Status calculation lives here on the server: each scenario gets
 * one of {locked, available, in-progress, completed-good,
 * completed-neutral, completed-bad} based on prereq satisfaction
 * and the user's SimulatorProgress row. The LevelJourney component
 * is purely presentational.
 */
export default async function SimulatorIndex({
  searchParams,
}: {
  searchParams: Promise<{ track?: string }>;
}) {
  const userId = await requireServerAuth("/consilium/simulator");
  const params = await searchParams;
  const track = resolveTrack(params.track);

  const [progress, badgeCount] = await Promise.all([
    prisma.simulatorProgress.findMany({
      where: { userId },
      select: {
        scenarioId: true,
        currentSceneId: true,
        completedAt: true,
        outcome: true,
        xpEarned: true,
        startedAt: true,
      },
    }),
    prisma.simulatorBadge.count({ where: { userId } }),
  ]);

  const progressByScenario = new Map(progress.map((p) => [p.scenarioId, p]));
  const totalXp = progress.reduce((acc, p) => acc + (p.xpEarned ?? 0), 0);

  const completedIds = new Set(
    progress.filter((p) => p.completedAt).map((p) => p.scenarioId),
  );
  const scenarioById = new Map(ALL_SCENARIOS.map((s) => [s.id, s]));
  const isUnlocked = (prerequisites?: string[]) =>
    !prerequisites || prerequisites.every((id) => completedIds.has(id));

  const trackScenarios = scenariosForTrack(track);
  const byLevel = scenariosByLevel(track);
  const levelKeys = Object.keys(byLevel)
    .map(Number)
    .sort((a, b) => a - b);
  const levelTitles = levelTitlesForTrack(track);

  // Per-track progress counters.
  const trackScenarioIds = new Set(trackScenarios.map((s) => s.id));
  const trackProgress = progress.filter((p) =>
    trackScenarioIds.has(p.scenarioId),
  );
  const trackCompleted = trackProgress.filter((p) => p.completedAt).length;
  const trackXp = trackProgress.reduce(
    (acc, p) => acc + (p.xpEarned ?? 0),
    0,
  );

  // Translate (scenario, progress, prereqs) → ScenarioStatus + the
  // pretty name of any blocking prereq for the locked render.
  function statusFor(
    scenarioId: string,
    prerequisites?: string[],
  ): { status: ScenarioStatus; prereqTitles: string[] } {
    const p = progressByScenario.get(scenarioId);
    if (!isUnlocked(prerequisites)) {
      const titles = (prerequisites ?? [])
        .filter((id) => !completedIds.has(id))
        .map((id) => scenarioById.get(id)?.title ?? id);
      return { status: "locked", prereqTitles: titles };
    }
    if (!p) return { status: "available", prereqTitles: [] };
    if (!p.completedAt) return { status: "in-progress", prereqTitles: [] };
    if (p.outcome === "good")
      return { status: "completed-good", prereqTitles: [] };
    if (p.outcome === "bad")
      return { status: "completed-bad", prereqTitles: [] };
    return { status: "completed-neutral", prereqTitles: [] };
  }

  // Build LevelGroup[] for the journey component.
  const levelGroups: LevelGroup[] = levelKeys.map((level) => {
    const info = levelTitles[level] ?? { title: `Level ${level}`, blurb: "" };
    const scenariosInLevel = byLevel[level];
    const nodes: ScenarioNode[] = scenariosInLevel.map((s) => {
      const { status, prereqTitles } = statusFor(s.id, s.prerequisites);
      const p = progressByScenario.get(s.id);
      return {
        scenario: s,
        status,
        resumeSceneId: p?.currentSceneId,
        xpEarned: p?.xpEarned ?? 0,
        prerequisiteTitles: prereqTitles,
      };
    });
    // Level is "unlocked" if at least one scenario in it is non-locked.
    const isLevelUnlocked = nodes.some((n) => n.status !== "locked");
    return {
      level,
      title: info.title,
      blurb: info.blurb,
      scenarios: nodes,
      isUnlocked: isLevelUnlocked,
      // Boss treatment for mid-arc and finale levels. L5 is the
      // natural climax across most tracks (The Presentation, Christmas
      // at His Parents, The Legal Adult). L6 is toxic-narc's finale
      // (The Narc Friend) — the track-boss crown belongs there too.
      // L10 is the Maris-arc mid-boss. The cluster-b-lab track
      // currently tops out at L4 so no boss renders; that's deliberate
      // — a drill track doesn't need a mid-arc boss.
      isBoss: level === 5 || level === 6 || level === 10,
    };
  });

  // "Up next" = first available or in-progress scenario in track order.
  // Prefer in-progress (resume) over available (start fresh).
  let nextUp: ScenarioNode | null = null;
  for (const group of levelGroups) {
    for (const node of group.scenarios) {
      if (node.status === "in-progress") {
        nextUp = node;
        break;
      }
    }
    if (nextUp) break;
  }
  if (!nextUp) {
    for (const group of levelGroups) {
      for (const node of group.scenarios) {
        if (node.status === "available") {
          nextUp = node;
          break;
        }
      }
      if (nextUp) break;
    }
  }

  const unlockedCount = levelGroups
    .flatMap((g) => g.scenarios)
    .filter((n) => n.status !== "locked").length;

  const meta = TRACK_META[track];

  return (
    <main className="min-h-screen px-4 sm:px-8 py-10 max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <p className="text-warm-gold/70 uppercase tracking-[0.3em] text-xs mb-3">
          The Consilium · Simulator
        </p>
        <h1 className="text-4xl sm:text-5xl font-extralight text-white mb-4 tracking-wide">
          The <span className="text-warm-gold">Dark Mirror</span>
        </h1>
        <p className="text-text-gray text-base sm:text-lg font-light max-w-2xl leading-relaxed">
          Interactive scenarios. Real dynamics. Real manipulation tactics.
          Every choice teaches you something — whether it costs you or not.
        </p>

        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Stat label="Track XP" value={trackXp.toLocaleString()} />
          <Stat label="Total XP" value={totalXp.toLocaleString()} />
          <Stat label="Badges" value={badgeCount} />
          <Stat
            label="Completed"
            value={`${trackCompleted} / ${trackScenarios.length}`}
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2.5">
          <Link
            href="/consilium/simulator/leaderboard"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.2em] text-warm-gold border border-warm-gold/30 rounded-full hover:bg-warm-gold/10 hover:border-warm-gold/60 transition-all"
          >
            <BarChart3 size={12} strokeWidth={1.6} />
            Leaderboard
          </Link>
          <Link
            href="/consilium/simulator/achievements"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.2em] text-warm-gold border border-warm-gold/30 rounded-full hover:bg-warm-gold/10 hover:border-warm-gold/60 transition-all"
          >
            <Trophy size={12} strokeWidth={1.6} />
            Achievements
          </Link>
        </div>
      </header>

      {/* Track selector.
          Mobile (<sm): horizontal scroll row of compact pills. Seven
          full-width tabs stacked vertically used to eat 700px of
          mobile real estate — replaced with a scrollable row of
          label-only pills. The active track's sublabel moves into
          the "Current track" panel below (already present), so the
          pills don't need to repeat it.
          Desktop (≥sm): wrapping card grid with the full eyebrow +
          label + sublabel layout. basis-[220px] keeps each card's
          sublabel readable, flex-wrap breaks to a second row when
          the container can't hold all seven in a line. */}
      <nav
        aria-label="Simulator track"
        className="mb-8 p-1.5 rounded-xl border border-warm-gold/15 bg-deep-black/40"
      >
        {/* Mobile: scrollable pill row. scrollbar-hide removes the
            default bar so the row reads clean; snap keeps each pill
            landing at the left edge when scrolled. */}
        <div className="sm:hidden flex gap-1.5 overflow-x-auto snap-x snap-mandatory -mx-1.5 px-1.5 pb-0.5 scrollbar-hide">
          {VALID_TRACKS.map((t) => {
            const tMeta = TRACK_META[t];
            const active = t === track;
            return (
              <Link
                key={t}
                href={tMeta.href}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 snap-start px-4 py-2.5 rounded-lg text-xs font-light tracking-wide whitespace-nowrap transition-all ${
                  active
                    ? "bg-warm-gold/15 border border-warm-gold/50 text-white"
                    : "border border-white/5 bg-white/[0.02] text-text-gray/80 active:bg-white/10"
                }`}
              >
                {tMeta.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop: wrapping card grid — unchanged layout, hidden on
            small screens. */}
        <div className="hidden sm:flex sm:flex-wrap gap-2">
          {VALID_TRACKS.map((t) => {
            const tMeta = TRACK_META[t];
            const active = t === track;
            return (
              <Link
                key={t}
                href={tMeta.href}
                className={`flex-1 basis-[220px] flex flex-col items-start px-4 py-3 rounded-lg transition-all ${
                  active
                    ? "bg-warm-gold/10 border border-warm-gold/40"
                    : "border border-transparent hover:bg-white/5"
                }`}
              >
                <span
                  className={`uppercase tracking-[0.3em] text-[10px] mb-1 ${
                    active ? "text-warm-gold" : "text-warm-gold/50"
                  }`}
                >
                  {active ? "Playing" : "Switch to"}
                </span>
                <span
                  className={`text-base font-light tracking-wide ${
                    active ? "text-white" : "text-text-gray"
                  }`}
                >
                  {tMeta.label}
                </span>
                <span className="text-text-gray/50 text-xs font-light mt-1 leading-snug">
                  {tMeta.sublabel}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="mb-6 border-l-2 border-warm-gold/30 pl-4">
        <p className="text-warm-gold/70 uppercase tracking-[0.3em] text-[10px] mb-1">
          Current track
        </p>
        <p className="text-white text-xl font-extralight tracking-wide">
          {meta.label}
        </p>
        <p className="text-text-gray/70 text-sm font-light mt-1">
          {meta.sublabel}
        </p>
      </div>

      {/* The journey itself */}
      <LevelJourney
        levels={levelGroups}
        nextUp={nextUp}
        totalScenarios={trackScenarios.length}
        unlockedCount={unlockedCount}
        completedCount={trackCompleted}
        trackXp={trackXp}
      />

      {/* Library footer */}
      <div className="mt-12 p-5 rounded-xl border border-dashed border-warm-gold/15 bg-deep-black/30 text-center">
        <p className="inline-flex items-center justify-center gap-1.5 text-warm-gold/60 uppercase tracking-[0.3em] text-[10px] mb-2">
          <Sparkles size={10} strokeWidth={1.8} />
          Full Library · {catalogueStats.scenarios} scenarios across {catalogueStats.tracks} tracks
        </p>
        <p className="text-text-gray/70 text-sm font-light max-w-md mx-auto">
          Each track is a separate curriculum. Playing one doesn&apos;t lock
          another. Progress tracks independently.
        </p>
      </div>

      {/* Bottom CTA — re-surfaces the next-up scenario for the visitor
          who's read the whole page and wants to act. */}
      {nextUp && nextUp.status !== "locked" && (
        <div className="mt-8 text-center">
          <Link
            href={`/consilium/simulator/${nextUp.scenario.id}`}
            className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-warm-gold text-deep-black font-medium tracking-wider uppercase text-sm transition-all hover:bg-warm-gold/90 hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.55)]"
          >
            {nextUp.status === "in-progress" ? "Resume" : "Start"} —{" "}
            {nextUp.scenario.title}
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-warm-gold/60 uppercase tracking-[0.25em] text-[10px]">
        {label}
      </p>
      <p className="text-white text-2xl font-extralight mt-1 tabular-nums">
        {value}
      </p>
    </div>
  );
}
