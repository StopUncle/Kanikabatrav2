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
import { computeStarsFromJson } from "@/lib/simulator/stars";
import type { ScenarioTrack, OutcomeType } from "@/lib/simulator/types";
import { ArrowRight, Trophy, BarChart3, Sparkles, Check } from "lucide-react";
import LevelJourney, {
  type LevelGroup,
  type ScenarioNode,
  type ScenarioStatus,
} from "@/components/consilium/LevelJourney";
import StreakBanner from "@/components/simulator/StreakBanner";
import { readSimulatorStreak } from "@/lib/simulator/streak";

export const metadata = {
  title: "The Dark Mirror. Simulator | Kanika Batra",
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
  "divorce-arc",
  "loving-mira",
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

  const [progress, badgeCount, streak] = await Promise.all([
    prisma.simulatorProgress.findMany({
      where: { userId },
      select: {
        scenarioId: true,
        currentSceneId: true,
        completedAt: true,
        outcome: true,
        xpEarned: true,
        startedAt: true,
        // choicesMade powers the 3-star rating per scenario card.
        // Stored as Json on SimulatorProgress; computeStarsFromJson
        // tolerates the unknown shape and returns 0 if malformed.
        choicesMade: true,
        // Length vs scenes.filter(isEnding).length renders the
        // "X / Y endings" counter on each completed scenario card.
        endingsReached: true,
      },
    }),
    prisma.simulatorBadge.count({ where: { userId } }),
    readSimulatorStreak(prisma, userId),
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

  // Cross-track summary, used by the track selector to label inactive
  // cards. A track with no progress shows "Start"; one with progress
  // shows "Resume · X / Y" so the user can see where they left off
  // without switching first.
  const completedByTrack = new Map<ScenarioTrack, number>();
  const totalByTrack = new Map<ScenarioTrack, number>();
  for (const s of ALL_SCENARIOS) {
    const t = (s.track ?? "female") as ScenarioTrack;
    totalByTrack.set(t, (totalByTrack.get(t) ?? 0) + 1);
  }
  for (const p of progress) {
    if (!p.completedAt) continue;
    const s = scenarioById.get(p.scenarioId);
    if (!s) continue;
    const t = (s.track ?? "female") as ScenarioTrack;
    completedByTrack.set(t, (completedByTrack.get(t) ?? 0) + 1);
  }
  const startedTrackIds = new Set<ScenarioTrack>();
  for (const p of progress) {
    const s = scenarioById.get(p.scenarioId);
    if (s) startedTrackIds.add((s.track ?? "female") as ScenarioTrack);
  }

  // First-visit detection. A user with zero SimulatorProgress rows and
  // no explicit ?track= param hasn't picked a line yet, so the catalog
  // shouldn't dump them onto the Feminine default with a "Resume" CTA
  // (they have nothing to resume). The full-bleed chooser below is
  // shown instead. Anyone with at least one row or an explicit track
  // selection falls through to the normal catalog.
  const isFirstVisit = progress.length === 0 && !params.track;

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
      // Stars are computed from the BEST run we've seen, for v1 that's
      // just the row in SimulatorProgress, since the table stores the
      // most-recent run not a per-attempt history. If we add per-run
      // history later, swap in a max() over the history here.
      const stars = p?.completedAt
        ? computeStarsFromJson(p.outcome as OutcomeType | null, p.choicesMade)
        : 0;
      // Endings counter: distinct ending sceneIds the player has reached
      // / total endings declared in the scenario. The total is computed
      // from the scenario object directly so it stays in sync with content.
      // /api/simulator/complete writes endingsReached via atomic Prisma
      // push (race-safe under concurrent completions), which can persist
      // duplicates when a player replays the same ending. Dedup here so
      // the counter reports distinct endings, not raw row count.
      const endingsTotal = s.scenes.filter((sc) => sc.isEnding).length;
      const endingsFound = p?.endingsReached
        ? new Set(p.endingsReached).size
        : 0;
      return {
        scenario: s,
        status,
        resumeSceneId: p?.currentSceneId,
        xpEarned: p?.xpEarned ?? 0,
        stars,
        endingsFound,
        endingsTotal,
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
      // (The Narc Friend), the track-boss crown belongs there too.
      // L10 is the Maris-arc mid-boss. The cluster-b-lab track
      // currently tops out at L4 so no boss renders; that's deliberate
      //, a drill track doesn't need a mid-arc boss.
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

  // First-visit chooser. Zero progress + no explicit track means we
  // strip the page down to the line-picker so the user makes a
  // deliberate choice instead of being dropped onto the Feminine
  // default. The "Just browsing" escape link preserves the
  // one-click-to-start path for the impatient.
  if (isFirstVisit) {
    return (
      <main className="min-h-screen px-4 sm:px-8 py-10 max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <p className="text-warm-gold/70 uppercase tracking-[0.3em] text-xs mb-3">
            The Consilium · Simulator
          </p>
          <h1 className="text-4xl sm:text-5xl font-extralight text-white mb-4 tracking-wide">
            The <span className="text-warm-gold">Dark Mirror</span>
          </h1>
          <p className="text-text-gray text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Nine lines. Pick the one that matches your life right now. You can
            switch any time. Progress tracks independently.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {VALID_TRACKS.map((t) => {
            const tMeta = TRACK_META[t];
            const total = totalByTrack.get(t) ?? 0;
            return (
              <Link
                key={t}
                href={tMeta.href}
                className="group flex flex-col p-5 rounded-xl border border-warm-gold/15 bg-deep-black/40 transition-all hover:border-warm-gold/50 hover:bg-warm-gold/[0.04] hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-warm-gold/60 uppercase tracking-[0.3em] text-[10px]">
                    {total} scenarios
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-warm-gold/40 group-hover:text-warm-gold group-hover:translate-x-0.5 transition-all"
                    strokeWidth={1.6}
                  />
                </div>
                <p className="text-white text-lg font-light tracking-wide mb-2">
                  {tMeta.label}
                </p>
                <p className="text-text-gray/70 text-xs font-light leading-relaxed">
                  {tMeta.sublabel}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/consilium/simulator?track=female"
            className="inline-flex items-center gap-2 text-text-gray/60 hover:text-warm-gold text-xs uppercase tracking-[0.25em] transition-colors"
          >
            Just browsing? Start with Feminine
            <ArrowRight size={12} strokeWidth={1.6} />
          </Link>
        </div>
      </main>
    );
  }

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
          Every choice teaches you something, whether it costs you or not.
        </p>

        <div className="mt-7">
          <StreakBanner
            current={streak.current}
            longest={streak.longest}
            isAtRisk={streak.isAtRisk}
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
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
          Framed explicitly as a chooser ("Pick your line") so it doesn't
          read as a passive label of where the user already is. Active
          card has a stronger gold border + check chip; inactive cards
          carry a chevron and either a "Resume X/Y" or "Start" eyebrow
          so the user knows at a glance which lines they've touched.
          Mobile (<sm): horizontal scroll row of compact pills.
          Desktop (≥sm): wrapping card grid. */}
      <div className="mb-3 flex items-baseline justify-between">
        <p className="text-warm-gold/70 uppercase tracking-[0.3em] text-[10px]">
          Pick your line · 9 tracks
        </p>
        <p className="text-text-gray/50 text-[10px] uppercase tracking-[0.25em] hidden sm:block">
          Progress tracks independently
        </p>
      </div>
      <nav
        aria-label="Simulator track"
        className="mb-10 p-1.5 rounded-xl border border-warm-gold/15 bg-deep-black/40"
      >
        {/* Mobile: scrollable pill row. */}
        <div className="sm:hidden flex gap-1.5 overflow-x-auto snap-x snap-mandatory -mx-1.5 px-1.5 pb-0.5 scrollbar-hide">
          {VALID_TRACKS.map((t) => {
            const tMeta = TRACK_META[t];
            const active = t === track;
            const started = startedTrackIds.has(t);
            return (
              <Link
                key={t}
                href={tMeta.href}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 snap-start px-4 py-2.5 rounded-lg text-xs font-light tracking-wide whitespace-nowrap transition-all ${
                  active
                    ? "bg-warm-gold/15 border border-warm-gold/50 text-white"
                    : "border border-warm-gold/15 bg-white/[0.02] text-text-gray/80 active:bg-white/10"
                }`}
              >
                {tMeta.label}
                {!active && started && (
                  <span className="ml-1.5 text-[9px] text-warm-gold/70">
                    ·
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop: wrapping card grid. */}
        <div className="hidden sm:flex sm:flex-wrap gap-2">
          {VALID_TRACKS.map((t) => {
            const tMeta = TRACK_META[t];
            const active = t === track;
            const done = completedByTrack.get(t) ?? 0;
            const total = totalByTrack.get(t) ?? 0;
            const started = startedTrackIds.has(t);
            const eyebrow = active
              ? "Current"
              : started
                ? `Resume · ${done} / ${total}`
                : "Start";
            return (
              <Link
                key={t}
                href={tMeta.href}
                aria-current={active ? "page" : undefined}
                className={`group relative flex-1 basis-[220px] flex flex-col items-start px-4 py-3 rounded-lg transition-all ${
                  active
                    ? "bg-warm-gold/10 border border-warm-gold/50 ring-1 ring-warm-gold/15"
                    : "border border-warm-gold/10 bg-deep-black/30 hover:border-warm-gold/40 hover:bg-warm-gold/[0.04]"
                }`}
              >
                {!active && (
                  <ArrowRight
                    size={13}
                    strokeWidth={1.6}
                    className="absolute top-3 right-3 text-warm-gold/30 group-hover:text-warm-gold group-hover:translate-x-0.5 transition-all"
                  />
                )}
                {active && (
                  <span className="absolute top-3 right-3 inline-flex items-center justify-center w-4 h-4 rounded-full bg-warm-gold/20 border border-warm-gold/50">
                    <Check
                      size={9}
                      strokeWidth={2.5}
                      className="text-warm-gold"
                    />
                  </span>
                )}
                <span
                  className={`uppercase tracking-[0.3em] text-[10px] mb-1 pr-6 ${
                    active ? "text-warm-gold" : "text-warm-gold/55"
                  }`}
                >
                  {eyebrow}
                </span>
                <span
                  className={`text-base font-light tracking-wide pr-6 ${
                    active ? "text-white" : "text-text-light"
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

      {/* Bottom CTA, re-surfaces the next-up scenario for the visitor
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
