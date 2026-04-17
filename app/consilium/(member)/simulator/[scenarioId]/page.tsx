import { notFound } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { getScenario, ALL_SCENARIOS } from "@/lib/simulator/scenarios";
import type { SimulatorState, ChoiceRecord, OutcomeType } from "@/lib/simulator/types";
import SimulatorPageClient from "@/components/simulator/SimulatorPageClient";

/**
 * Play a scenario. Loads any persisted state from DB and hydrates the
 * client runner. If the persisted state points at an ending scene, the
 * runner will render the ending screen — the user can replay from there.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ scenarioId: string }>;
}) {
  const { scenarioId } = await params;
  const scenario = getScenario(scenarioId);
  if (!scenario) return { title: "Simulator | Kanika Batra" };
  return {
    title: `${scenario.title} — The Dark Mirror | Kanika Batra`,
    description: scenario.description,
  };
}

export default async function SimulatorPlay({
  params,
}: {
  params: Promise<{ scenarioId: string }>;
}) {
  const { scenarioId } = await params;
  const scenario = getScenario(scenarioId);
  if (!scenario) notFound();

  const userId = await requireServerAuth(
    `/consilium/simulator/${scenarioId}`,
  );

  // Load persisted state — null when never played.
  const row = await prisma.simulatorProgress.findUnique({
    where: { userId_scenarioId: { userId, scenarioId } },
  });

  const initialState: SimulatorState | undefined = row
    ? {
        scenarioId: row.scenarioId,
        currentSceneId: row.currentSceneId,
        // choicesMade is Json — Prisma types it as Prisma.JsonValue, but we
        // wrote it in the shape ChoiceRecord[]. Cast narrowly.
        choicesMade: (row.choicesMade as unknown as ChoiceRecord[]) ?? [],
        xpEarned: row.xpEarned ?? 0,
        outcome: (row.outcome as OutcomeType | null) ?? undefined,
        endedAt: row.completedAt?.toISOString() ?? undefined,
      }
    : undefined;

  // "Next scenario" link — whatever comes after this one in ALL_SCENARIOS.
  const currentIdx = ALL_SCENARIOS.findIndex((s) => s.id === scenario.id);
  const next = currentIdx >= 0 ? ALL_SCENARIOS[currentIdx + 1] : undefined;
  const nextHref = next ? `/consilium/simulator/${next.id}` : null;

  return (
    <SimulatorPageClient
      scenario={scenario}
      initialState={initialState}
      nextScenarioHref={nextHref}
    />
  );
}
