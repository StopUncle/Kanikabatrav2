import { notFound, redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import {
  ALL_SCENARIOS,
  SCENARIO_BY_ID,
  getTrack,
  scenariosForTrack,
} from "@/lib/simulator/scenarios";
import { readTodayCheckIn } from "@/lib/checkin/db";
import { getAccess } from "@/lib/access/tier";
import { canPlay } from "@/lib/simulator/access";
import UpgradeWall from "@/components/app-shell/upgrade/UpgradeWall";
import { trackAccess } from "@/lib/simulator/track-gates";
import type { ScenarioTrack } from "@/lib/simulator/types";
import { resolveScenario } from "@/lib/simulator/resolve";
import type { SimulatorState, ChoiceRecord, OutcomeType } from "@/lib/simulator/types";
import SimulatorPageClient from "@/components/simulator/SimulatorPageClient";

/**
 * Play a scenario. Resumes mid-run progress from DB. If the scenario was
 * already completed, we start the replay from the opening scene instead
 * of dropping the player back on the ending screen, the latter killed
 * engagement because "already done" scenarios never invited replay.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ scenarioId: string }>;
}) {
  const { scenarioId } = await params;
  const scenario = await resolveScenario(scenarioId);
  if (!scenario) return { title: "Simulator | Kanika Batra" };
  return {
    title: `${scenario.title}. The Dark Mirror | Kanika Batra`,
    description: scenario.description,
  };
}

export default async function SimulatorPlay({
  params,
}: {
  params: Promise<{ scenarioId: string }>;
}) {
  const { scenarioId } = await params;
  const scenario = await resolveScenario(scenarioId);
  if (!scenario) notFound();

  const userId = await requireServerAuth(
    `/app/train/${scenarioId}`,
  );

  // Tier gate. This is the load-bearing one: the catalog can stop drawing a
  // card and the URL still plays, so the decision has to happen here and in
  // /api/simulator/* rather than in whatever rendered the link.
  //
  // A locked chapter shows the wall in place instead of redirecting. The
  // scenario title is the pitch, so naming it is the point; a silent bounce
  // to the room reads as the app being broken. The run itself never starts:
  // nothing below this line executes, and /api/simulator/* refuses too.
  const viewerAccess = await getAccess(userId);
  if (!canPlay(scenario, viewerAccess)) {
    return (
      <UpgradeWall trigger="chapter-end" nextChapterTitle={scenario.title} />
    );
  }

  // Load persisted state, null when never played.
  const [row, viewer, todayCheckIn] = await Promise.all([
    prisma.simulatorProgress.findUnique({
      where: { userId_scenarioId: { userId, scenarioId } },
    }),
    prisma.user.findUnique({
      where: { id: userId },
      select: { gender: true, ringLevel: true },
    }),
    readTodayCheckIn(prisma, userId),
  ]);

  // Ring gate (plan §3.2): a deep link into a sealed track bounces to
  // the catalog, where the door renders with its opens-at line. Static
  // catalog scenarios only; generated drops carry no track. A track the
  // member has started (ANY scenario in it, matching the catalog's
  // definition) stays open, and today's check-in recommendation opens
  // its track regardless of Ring.
  if (SCENARIO_BY_ID[scenario.id]) {
    const trackId = getTrack(scenario);
    const access = trackAccess(trackId, {
      gender: viewer?.gender ?? null,
      ringLevel: viewer?.ringLevel ?? 4,
      recommendedTrack:
        (todayCheckIn?.recommendedTrack as ScenarioTrack | null) ?? null,
      startedTracks: row ? new Set([trackId]) : undefined,
    });
    if (!access.open) {
      const startedInTrack = await prisma.simulatorProgress.count({
        where: {
          userId,
          scenarioId: { in: scenariosForTrack(trackId).map((sc) => sc.id) },
        },
      });
      if (startedInTrack === 0) {
        redirect("/app/train");
      }
    }
  }

  // Completed runs always start fresh; only mid-run progress resumes.
  //
  // Defensive guard: if the row's currentSceneId points at an ending
  // scene or at a scene that doesn't exist anymore (scenario edited
  // after the row was written), ignore the resume. Historically, a
  // bad save ordering or a failed `endedAt` write could leave a row
  // with currentSceneId = ending_id + completedAt = null, which
  // dropped players directly onto the ending screen on re-entry.
  // Starting fresh is always safe; losing one mid-run save is not.
  let initialState: SimulatorState | undefined = undefined;
  if (row && !row.completedAt) {
    const resumeScene = scenario.scenes.find(
      (s) => s.id === row.currentSceneId,
    );
    const resumeIsValid = !!resumeScene && !resumeScene.isEnding;
    if (resumeIsValid) {
      initialState = {
        scenarioId: row.scenarioId,
        currentSceneId: row.currentSceneId,
        // choicesMade is Json. Prisma types it as Prisma.JsonValue, but we
        // wrote it in the shape ChoiceRecord[]. Cast narrowly.
        choicesMade: (row.choicesMade as unknown as ChoiceRecord[]) ?? [],
        xpEarned: row.xpEarned ?? 0,
        outcome: (row.outcome as OutcomeType | null) ?? undefined,
        endedAt: undefined,
      };
    }
  }

  // Previous-best summary, shown in the pre-game overlay and on the
  // ending screen so a replay feels like beating a record, not
  // repeating chores. Only populated for fully-completed runs.
  const previousBest = row?.completedAt
    ? {
        xpEarned: row.xpEarned ?? 0,
        outcome: (row.outcome as OutcomeType | null) ?? null,
        completedAt: row.completedAt.toISOString(),
      }
    : null;

  // Endings the player has already reached across prior runs. Deduped
  // because /api/simulator/complete pushes on every completion and can
  // hold repeats. Powers the "N of M endings" catalog on the ending
  // screen so replayers can hunt the paths they haven't found yet.
  const seenEndingIds = row?.endingsReached
    ? Array.from(new Set(row.endingsReached))
    : [];

  // "Next scenario" link, whatever comes after this one in ALL_SCENARIOS.
  const currentIdx = ALL_SCENARIOS.findIndex((s) => s.id === scenario.id);
  const next = currentIdx >= 0 ? ALL_SCENARIOS[currentIdx + 1] : undefined;
  // Into the app, not the legacy runner: finishing a scenario and being
  // handed to the old skin for the next one undoes the whole point.
  const nextHref = next ? `/app/train/${next.id}` : null;

  return (
    <SimulatorPageClient
      scenario={scenario}
      initialState={initialState}
      previousBest={previousBest}
      nextScenarioHref={nextHref}
      seenEndingIds={seenEndingIds}
      allowGauntlet={viewerAccess.isMember}
      // Resuming a run keeps the mode it was started in. A member who
      // lapsed mid-gauntlet resumes in story; the server would refuse
      // gauntlet pay anyway, so the UI should not promise it.
      initialMode={
        initialState && row?.mode === "gauntlet" && viewerAccess.isMember
          ? "gauntlet"
          : undefined
      }
      // Members enter runs from the app's Train screen now; leaving a run
      // must land back there, not on the legacy catalog.
      exitHref="/app/train"
    />
  );
}
