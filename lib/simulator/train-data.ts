import type { PrismaClient } from "@prisma/client";
import {
  ALL_SCENARIOS,
  levelTitlesForTrack,
  scenariosForTrack,
  TRACK_META,
} from "@/lib/simulator/scenarios";
import { listPublishedGenerated } from "@/lib/simulator/generated";
import { readTodayCheckIn } from "@/lib/checkin/db";
import {
  trackAccess,
  spineTracks,
  type TrackAccess,
} from "@/lib/simulator/track-gates";
import type { ScenarioTrack } from "@/lib/simulator/types";
import { computeStarsFromJson, type StarRating } from "@/lib/simulator/stars";
import type { OutcomeType } from "@/lib/simulator/types";

/**
 * Data assembly for the Train screen: the recommendation-first view of the
 * scenario catalog. Distilled from the old catalog page's inline assembly
 * (app/consilium/(member)/simulator/page.tsx); that page keeps its own copy
 * until it is retired, because refactoring an 800-line surface that is about
 * to die buys nothing.
 *
 * Server-only: TRACK_META pulls the full scenario index, which must never
 * reach a client bundle.
 */

export const VALID_TRACKS: ScenarioTrack[] = [
  "female",
  "male-business",
  "male-dating",
  "anxiety",
  "toxic-narc",
  "pc-child",
  "cluster-b-lab",
  "divorce-arc",
  "loving-mira",
  "after-him",
  "after-her",
];

/** One rung: a scenario inside a track, with the member's state on it. */
export interface TrackRung {
  scenarioId: string;
  title: string;
  /** One line of setup. The trail borrows the first rung's line to name its chapter. */
  tagline: string;
  level: number;
  done: boolean;
  /** Started but never finished. */
  inProgress: boolean;
  isNew: boolean;
  /** Prerequisites not met yet, so it cannot be played. */
  locked: boolean;
  /** Not on the free tier. The chrome chips it; the runner still walls. */
  memberOnly: boolean;
  /**
   * The best run's star rating, 0 until completed. Same math the ending
   * screen uses, so the map and the verdict never disagree.
   */
  stars: StarRating;
}

export interface TrackSummary {
  track: ScenarioTrack;
  label: string;
  sublabel: string;
  access: TrackAccess;
  completed: number;
  total: number;
  newCount: number;
  /**
   * The scenarios themselves, ordered by level. Carried here so Train can
   * open a track in place instead of handing the member to the old
   * catalog, which was the last thing routing anybody out of the app.
   */
  rungs: TrackRung[];
  /**
   * Chapter names, keyed by level. Every track already ships written ones,
   * so the trail names its chapters rather than numbering them.
   */
  levelTitles: Record<number, { title: string; blurb: string }>;
  /** Sum of rung stars, against a ceiling of 3 per scenario. */
  starsEarned: number;
  starsPossible: number;
}

export interface NextUp {
  scenarioId: string;
  title: string;
  trackLabel: string;
  /** Why THIS one: today's check-in, an unfinished run, or the front door. */
  reason: "checkin" | "resume" | "start";
}

export interface TrainData {
  nextUp: NextUp | null;
  /** Open tracks first (spine leading), sealed tracks last, soonest-opening first. */
  tracks: TrackSummary[];
  freshFiles: { scenarioId: string; title: string; tagline: string }[];
}

export async function getTrainData(
  prisma: PrismaClient,
  userId: string,
): Promise<TrainData> {
  const [progress, viewer, checkIn, generated] = await Promise.all([
    prisma.simulatorProgress.findMany({
      where: { userId },
      orderBy: { startedAt: "desc" },
      select: {
        scenarioId: true,
        completedAt: true,
        outcome: true,
        choicesMade: true,
      },
    }),
    prisma.user.findUnique({
      where: { id: userId },
      select: { gender: true, ringLevel: true },
    }),
    readTodayCheckIn(prisma, userId),
    listPublishedGenerated(),
  ]);

  const gender = viewer?.gender ?? null;
  const scenarioById = new Map(ALL_SCENARIOS.map((s) => [s.id, s]));
  const progressByScenario = new Map(progress.map((p) => [p.scenarioId, p]));
  const completedIds = new Set(
    progress.filter((p) => p.completedAt).map((p) => p.scenarioId),
  );
  const isUnlocked = (prerequisites?: string[]) =>
    !prerequisites || prerequisites.every((id) => completedIds.has(id));

  const startedTracks = new Set<ScenarioTrack>();
  for (const p of progress) {
    const sc = scenarioById.get(p.scenarioId);
    if (sc) startedTracks.add((sc.track ?? "female") as ScenarioTrack);
  }
  const recommendedTrack =
    (checkIn?.recommendedTrack as ScenarioTrack | null) ?? null;

  const nextInTrack = (t: ScenarioTrack) => {
    const list = scenariosForTrack(t);
    return (
      list.find((s) => {
        const p = progressByScenario.get(s.id);
        return !!p && !p.completedAt;
      }) ??
      list.find(
        (s) => !progressByScenario.has(s.id) && isUnlocked(s.prerequisites),
      ) ??
      null
    );
  };

  const summaries: TrackSummary[] = VALID_TRACKS.map((t) => {
    const list = scenariosForTrack(t);
    let completed = 0;
    let newCount = 0;
    for (const s of list) {
      if (completedIds.has(s.id)) completed++;
      if (s.isNew && !progressByScenario.has(s.id)) newCount++;
    }
    const rungs: TrackRung[] = list.map((s) => {
      const p = progressByScenario.get(s.id);
      const done = completedIds.has(s.id);
      return {
        scenarioId: s.id,
        title: s.title,
        tagline: s.tagline,
        level: s.level,
        done,
        inProgress: !!p && !p.completedAt,
        isNew: !!s.isNew && !p,
        locked: !isUnlocked(s.prerequisites),
        memberOnly: s.tier !== "free",
        stars: done
          ? computeStarsFromJson(
              (p?.outcome as OutcomeType | null) ?? null,
              p?.choicesMade,
            )
          : 0,
      };
    });
    const starsEarned = rungs.reduce((sum, r) => sum + r.stars, 0);

    return {
      track: t,
      label: TRACK_META[t].label,
      sublabel: TRACK_META[t].sublabel,
      access: trackAccess(t, {
        gender,
        ringLevel: viewer?.ringLevel ?? 4,
        recommendedTrack,
        startedTracks,
      }),
      completed,
      total: list.length,
      newCount,
      rungs,
      levelTitles: levelTitlesForTrack(t),
      starsEarned,
      starsPossible: list.length * 3,
    };
  });

  const byTrack = new Map(summaries.map((s) => [s.track, s]));
  const spine = spineTracks(gender);

  // The hero: today's recommendation wins, an unfinished run comes second,
  // the spine's front door is the fallback.
  let nextUp: NextUp | null = null;
  if (recommendedTrack && byTrack.get(recommendedTrack)?.access.open) {
    const s = nextInTrack(recommendedTrack);
    if (s) {
      nextUp = {
        scenarioId: s.id,
        title: s.title,
        trackLabel: TRACK_META[recommendedTrack].label,
        reason: "checkin",
      };
    }
  }
  if (!nextUp) {
    const inProgressRow = progress.find((p) => {
      if (p.completedAt) return false;
      return scenarioById.has(p.scenarioId);
    });
    if (inProgressRow) {
      const s = scenarioById.get(inProgressRow.scenarioId)!;
      const t = (s.track ?? "female") as ScenarioTrack;
      if (byTrack.get(t)?.access.open) {
        nextUp = {
          scenarioId: s.id,
          title: s.title,
          trackLabel: TRACK_META[t].label,
          reason: "resume",
        };
      }
    }
  }
  if (!nextUp) {
    for (const t of spine) {
      const s = nextInTrack(t);
      if (s) {
        nextUp = {
          scenarioId: s.id,
          title: s.title,
          trackLabel: TRACK_META[t].label,
          reason: "start",
        };
        break;
      }
    }
  }

  // Open tracks first with the spine leading, then sealed tracks in the
  // order their doors open (ranks count down, so higher opensAtRing first).
  const open = summaries.filter((s) => s.access.open);
  const sealed = summaries.filter((s) => !s.access.open);
  open.sort((a, b) => {
    const aSpine = spine.includes(a.track) ? 0 : 1;
    const bSpine = spine.includes(b.track) ? 0 : 1;
    if (aSpine !== bSpine) return aSpine - bSpine;
    return a.label.localeCompare(b.label);
  });
  sealed.sort(
    (a, b) => (b.access.opensAtRing ?? 0) - (a.access.opensAtRing ?? 0),
  );

  return {
    nextUp,
    tracks: [...open, ...sealed],
    freshFiles: generated
      .slice(0, 10)
      .map(({ scenarioId, title, tagline }) => ({ scenarioId, title, tagline })),
  };
}
