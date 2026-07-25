import { redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { checkMembership } from "@/lib/community/membership";
import { prisma } from "@/lib/prisma";
import { resolveScenario } from "@/lib/simulator/resolve";
import type {
  ChoiceRecord,
  OutcomeType,
  SimulatorState,
} from "@/lib/simulator/types";
import BackgroundEffects from "@/components/BackgroundEffects";
import InitiationFlow from "@/components/initiation/InitiationFlow";

export const metadata = {
  title: "The Initiation. The Consilium | Kanika Batra",
  description: "This is where you start.",
};

/**
 * The Initiation (plan §4): the single Day-0 route every member passes
 * through before the rest of the Consilium opens. Lives OUTSIDE the
 * (member) route group on purpose: no sidebar, no pill nav, and no
 * collision with the member layout's un-initiated redirect.
 *
 * Veterans (any completed scenario, i.e. anyone with real history at
 * the Rings launch) get the short variant and never replay mission-1-1.
 */
export default async function InitiationPage({
  searchParams,
}: {
  searchParams: Promise<{ claimed?: string }>;
}) {
  const userId = await requireServerAuth("/consilium/initiation");
  const { claimed } = await searchParams;
  const { isMember, redirectUrl } = await checkMembership(userId);
  if (!isMember) {
    redirect(redirectUrl || "/consilium");
  }

  const FIRST_SCENARIO_ID = "mission-1-1";
  const [user, completedRuns, quizCount, missionRow] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        displayName: true,
        gender: true,
        initiationAt: true,
      },
    }),
    prisma.simulatorProgress.count({
      where: { userId, completedAt: { not: null } },
    }),
    prisma.quizResult.count({ where: { userId } }),
    prisma.simulatorProgress.findUnique({
      where: {
        userId_scenarioId: { userId, scenarioId: FIRST_SCENARIO_ID },
      },
    }),
  ]);

  if (user?.initiationAt) {
    redirect("/consilium/chamber");
  }

  // A completed scenario anywhere in their history means they know the
  // product; the flow skips The First Scenario and places them from
  // their (retro-granted) Standing. This also covers the resume case:
  // finishing mission-1-1 inside the Initiation then refreshing lands
  // here with completedRuns >= 1 and goes straight to placement.
  const veteran = completedRuns > 0;

  const scenario = veteran ? null : await resolveScenario(FIRST_SCENARIO_ID);

  // Mid-run resume for the first scenario, same defensive shape as the
  // simulator play page: never resume onto an ending or missing scene.
  let scenarioInitialState: SimulatorState | undefined = undefined;
  if (!veteran && scenario && missionRow && !missionRow.completedAt) {
    const resumeScene = scenario.scenes.find(
      (s) => s.id === missionRow.currentSceneId,
    );
    if (resumeScene && !resumeScene.isEnding) {
      scenarioInitialState = {
        scenarioId: missionRow.scenarioId,
        currentSceneId: missionRow.currentSceneId,
        choicesMade:
          (missionRow.choicesMade as unknown as ChoiceRecord[]) ?? [],
        xpEarned: missionRow.xpEarned ?? 0,
        outcome: (missionRow.outcome as OutcomeType | null) ?? undefined,
        endedAt: undefined,
      };
    }
  }

  return (
    <div className="min-h-screen bg-deep-black text-text-light">
      <BackgroundEffects />
      <div className="relative z-10">
        <InitiationFlow
          needsDisplayName={!user?.displayName}
          needsGender={!user?.gender}
          hasQuizResult={quizCount > 0}
          veteran={veteran}
          gender={user?.gender ?? null}
          scenario={scenario}
          scenarioInitialState={scenarioInitialState}
          justClaimed={claimed === "1"}
        />
      </div>
    </div>
  );
}
