import { notFound, redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { getScenario } from "@/lib/simulator/scenarios";
import AdventureSimulatorPageClient from "@/components/adventures/AdventureSimulatorPageClient";
import type {
  ChoiceRecord,
  OutcomeType,
  SimulatorState,
} from "@/lib/simulator/types";

/**
 * Adventure run dispatcher. Resolves the current scenario from the
 * AdventureProgress cursor and renders the runner. If the arc is already
 * completed, redirects to the recap.
 *
 * Self-healing cursor: if the scenario at currentStep has been completed
 * standalone (SimulatorProgress.completedAt set), we advance the cursor
 * before rendering. This prevents the player from being stuck repeating
 * a chapter when a prior /advance call failed silently. The advance
 * endpoint remains the canonical write path; this is the resilience layer.
 */
export default async function AdventureRun({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const userId = await requireServerAuth(`/consilium/adventures/${slug}/run`);

  const adventure = await prisma.adventure.findUnique({ where: { slug } });
  if (!adventure || !adventure.publishedAt) notFound();

  if (adventure.scenarioIds.length === 0) {
    redirect(`/consilium/adventures/${slug}`);
  }

  // Lazily create the progress row on first visit so a deep-linked
  // /run URL works the same as the Start button.
  let progress = await prisma.adventureProgress.upsert({
    where: { userId_adventureId: { userId, adventureId: adventure.id } },
    create: { userId, adventureId: adventure.id, currentStep: 0 },
    update: {},
  });

  // Completed arc: send to the recap.
  if (progress.completedAt) {
    redirect(`/consilium/adventures/${slug}/complete`);
  }

  // Self-heal: skip past chapters the player has already completed
  // standalone. Cap iterations at scenarioIds.length to rule out a
  // pathological infinite loop if the data ever lands in a weird state.
  for (let i = 0; i < adventure.scenarioIds.length; i++) {
    if (progress.currentStep >= adventure.scenarioIds.length) break;
    const sid = adventure.scenarioIds[progress.currentStep];
    const sim = await prisma.simulatorProgress.findUnique({
      where: { userId_scenarioId: { userId, scenarioId: sid } },
      select: { completedAt: true },
    });
    if (!sim?.completedAt) break;
    const nextStep = progress.currentStep + 1;
    const isFinal = nextStep >= adventure.scenarioIds.length;
    progress = await prisma.adventureProgress.update({
      where: { id: progress.id },
      data: {
        currentStep: nextStep,
        completedAt: isFinal ? new Date() : null,
      },
    });
    if (isFinal) {
      redirect(`/consilium/adventures/${slug}/complete`);
    }
  }

  const scenarioId = adventure.scenarioIds[progress.currentStep];
  const scenario = getScenario(scenarioId);
  if (!scenario) {
    // Scenario was removed from code without updating the arc. Surface
    // it on the detail page (which shows the chapter as "Scenario removed")
    // so the admin can fix it.
    redirect(`/consilium/adventures/${slug}`);
  }

  // Mid-run resume for this chapter only (mirrors the standalone runner).
  const row = await prisma.simulatorProgress.findUnique({
    where: { userId_scenarioId: { userId, scenarioId } },
  });

  let initialState: SimulatorState | undefined = undefined;
  if (row && !row.completedAt) {
    const resumeScene = scenario.scenes.find((s) => s.id === row.currentSceneId);
    if (resumeScene && !resumeScene.isEnding) {
      initialState = {
        scenarioId: row.scenarioId,
        currentSceneId: row.currentSceneId,
        choicesMade: (row.choicesMade as unknown as ChoiceRecord[]) ?? [],
        xpEarned: row.xpEarned ?? 0,
        outcome: (row.outcome as OutcomeType | null) ?? undefined,
        endedAt: undefined,
      };
    }
  }

  const stepLabel = `Step ${progress.currentStep + 1} of ${adventure.scenarioIds.length}`;

  return (
    <AdventureSimulatorPageClient
      scenario={scenario}
      initialState={initialState}
      adventureSlug={adventure.slug}
      adventureTitle={adventure.title}
      stepLabel={stepLabel}
    />
  );
}
