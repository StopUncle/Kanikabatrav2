import type { Prisma, PrismaClient } from "@prisma/client";
import { grantStanding } from "@/lib/standing/grant";
import { STANDING } from "@/lib/standing/config";
import { SCENARIO_BY_ID, getTrack } from "@/lib/simulator/scenarios";
import {
  PATH_CHAPTERS,
  effectiveStep,
  type PathChapter,
  type PathStep,
} from "./curriculum";

/**
 * Path progress: read-mostly completion detection (plan §5.3 schema note).
 *
 * Every signal a step can require already exists as a queryable table
 * (SimulatorProgress, TellResponse, Receipt, FeedComment, GameSession,
 * LabSession, QuizResult, MemberQuestion), so evaluation is: fetch all
 * signals once (9 parallel queries, flat cost regardless of how far along
 * the member is), walk the registry in memory, then persist anything
 * newly completed in one createMany. Chapter Seals grant through
 * grantStanding (deduped per chapter) and are marked by a synthetic
 * "<chapterId>-seal" progress row so a sealed chapter never re-queries.
 *
 * Veterans fast-forward naturally: their history satisfies early
 * chapters on first evaluation and the rows + Seals all land in one
 * pass. Ring gates at act boundaries are respected: steps inside a
 * ring-locked chapter are NOT persisted even when the signals exist,
 * so the moment the gate opens they complete on the next visit.
 */

export type ChapterStatus = "complete" | "active" | "locked-seq" | "locked-ring";

export interface ChapterState {
  chapter: PathChapter;
  status: ChapterStatus;
  completedSteps: number;
  totalSteps: number;
  /** Set when status is locked-ring. */
  opensAtRing?: number;
}

export interface PathState {
  chapters: ChapterState[];
  /** The member's next action, null when the whole Path is complete. */
  current: { chapter: PathChapter; step: PathStep; stepIndex: number } | null;
  /** Chapter ids sealed during THIS evaluation (celebration hook). */
  newSeals: string[];
  /** Completed chapters overall (the Seal count). */
  sealedCount: number;
  /** Every completed step id (incl. seal markers), for step-level UI. */
  completedStepIds: ReadonlySet<string>;
}

type Db = PrismaClient | Prisma.TransactionClient;

const SPINE_TRACKS: Record<"MALE" | "FEMALE", string[]> = {
  FEMALE: ["female"],
  MALE: ["male-dating", "male-business"],
};

function sealId(chapterId: string): string {
  return `${chapterId}-seal`;
}

interface Signals {
  completedScenarioIds: Set<string>;
  electives: number;
  tells: number;
  comments: number;
  receipts: number;
  drills: number;
  labs: number;
  hasQuiz: boolean;
  hasQuestion: boolean;
}

function stepDone(
  step: PathStep,
  gender: "MALE" | "FEMALE",
  isMember: boolean,
  s: Signals,
): boolean {
  const k = effectiveStep(step, isMember).kind;
  switch (k.type) {
    case "scenario":
      return s.completedScenarioIds.has(gender === "MALE" ? k.male : k.female);
    case "tells":
      return s.tells >= k.count;
    case "comments":
      return s.comments >= k.count;
    case "receipts":
      return s.receipts >= k.count;
    case "drills":
      return s.drills >= k.count;
    case "labs":
      return s.labs >= k.count;
    case "quiz":
      return s.hasQuiz;
    case "question":
      return s.hasQuestion;
    case "elective":
      return s.electives >= k.count;
  }
}

async function readSignals(
  prisma: Db,
  userId: string,
  gender: "MALE" | "FEMALE",
): Promise<Signals> {
  const [
    scenarioRows,
    tells,
    comments,
    receipts,
    drills,
    labs,
    quizzes,
    questions,
  ] = await Promise.all([
    prisma.simulatorProgress.findMany({
      where: { userId, completedAt: { not: null } },
      select: { scenarioId: true },
    }),
    prisma.tellResponse.count({ where: { userId, countedScored: true } }),
    prisma.feedComment.count({
      where: { authorId: userId, status: "APPROVED" },
    }),
    prisma.receipt.count({ where: { userId } }),
    prisma.gameSession.count({ where: { userId } }),
    prisma.labSession.count({ where: { userId, status: "ENDED" } }),
    prisma.quizResult.count({ where: { userId } }),
    prisma.memberQuestion.count({ where: { userId } }),
  ]);

  const completedScenarioIds = new Set(scenarioRows.map((r) => r.scenarioId));
  const spine = new Set(SPINE_TRACKS[gender]);
  let electives = 0;
  completedScenarioIds.forEach((id) => {
    const scenario = SCENARIO_BY_ID[id];
    if (scenario && !spine.has(getTrack(scenario))) electives++;
  });

  return {
    completedScenarioIds,
    electives,
    tells,
    comments,
    receipts,
    drills,
    labs,
    hasQuiz: quizzes > 0,
    hasQuestion: questions > 0,
  };
}

/**
 * Evaluate the member's Path, persist newly completed steps and Seals,
 * and return the full state for the Chamber / map page.
 */
export async function getPathState(
  prisma: Db,
  userId: string,
  opts: {
    gender: "MALE" | "FEMALE" | null;
    ringLevel: number;
    /** Free accounts evaluate freeKind substitutes. Defaults to member. */
    isMember?: boolean;
  },
): Promise<PathState> {
  const isMember = opts.isMember ?? true;
  const gender: "MALE" | "FEMALE" = opts.gender === "MALE" ? "MALE" : "FEMALE";

  const [progressRows, signals] = await Promise.all([
    prisma.userPathProgress.findMany({
      where: { userId },
      select: { stepId: true },
    }),
    readSignals(prisma, userId, gender),
  ]);
  const done = new Set(progressRows.map((r) => r.stepId));

  const chapters: ChapterState[] = [];
  const newRows: { userId: string; stepId: string }[] = [];
  const newSeals: string[] = [];
  let current: PathState["current"] = null;
  let previousComplete = true;

  for (const chapter of PATH_CHAPTERS) {
    const ringLocked =
      chapter.ringRequired !== undefined &&
      opts.ringLevel > chapter.ringRequired;
    const seqLocked = !previousComplete;

    if (ringLocked || seqLocked) {
      chapters.push({
        chapter,
        // Rank lock outranks sequence lock in the display: "Opens at
        // Analyst" is actionable, "finish the previous chapter" is not
        // news when the previous chapter is also on screen.
        status: ringLocked ? "locked-ring" : "locked-seq",
        completedSteps: 0,
        totalSteps: chapter.steps.length,
        opensAtRing: ringLocked ? chapter.ringRequired : undefined,
      });
      previousComplete = false;
      continue;
    }

    let completedSteps = 0;
    for (let index = 0; index < chapter.steps.length; index++) {
      const step = chapter.steps[index];
      const already = done.has(step.id);
      const detected = already || stepDone(step, gender, isMember, signals);
      if (detected) {
        completedSteps++;
        if (!already) {
          newRows.push({ userId, stepId: step.id });
          done.add(step.id);
        }
      } else if (!current) {
        current = { chapter, step, stepIndex: index };
      }
    }

    const complete = completedSteps === chapter.steps.length;
    if (complete && !done.has(sealId(chapter.id))) {
      done.add(sealId(chapter.id));
      newSeals.push(chapter.id);
    }

    chapters.push({
      chapter,
      status: complete ? "complete" : "active",
      completedSteps,
      totalSteps: chapter.steps.length,
    });
    previousComplete = complete;
  }

  if (newRows.length > 0) {
    await prisma.userPathProgress.createMany({
      data: newRows,
      skipDuplicates: true,
    });
  }
  // Grant first, THEN write the seal marker. If we crash between the
  // two, the next visit re-detects the seal and re-calls the grant,
  // which grantStanding's dedupe (source+refId) turns into a no-op.
  // The reverse order would skip a failed grant forever.
  for (const chapterId of newSeals) {
    const grant = await grantStanding(prisma, {
      userId,
      source: "CHAPTER",
      amount: STANDING.CHAPTER,
      refId: chapterId,
      dedupe: true,
    });
    // A grant that errored (not a dedupe no-op) must NOT get its marker,
    // or the Seal's Standing would be skipped forever; leaving the marker
    // unwritten makes the next visit re-detect and retry the grant.
    if (grant.failed) continue;
    await prisma.userPathProgress.createMany({
      data: [{ userId, stepId: sealId(chapterId) }],
      skipDuplicates: true,
    });
  }

  const sealedCount = chapters.filter((c) => c.status === "complete").length;
  return { chapters, current, newSeals, sealedCount, completedStepIds: done };
}
