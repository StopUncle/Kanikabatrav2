import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { readGamePersonalBest } from "@/lib/games/status";
import DrillScreen from "@/components/app-shell/play/DrillScreen";

export const metadata = {
  title: "Speed Drill | Consilium",
};

/**
 * The drill owns the whole screen, so the tab bar hides itself on this route.
 * The personal best comes down as a prop rather than from the completion
 * endpoint, which keeps that route's response about the run that just ended.
 */
export default async function DrillPage() {
  const userId = await requireServerAuth("/app/play/drill");
  const best = await readGamePersonalBest(prisma, userId, "speed-drill");

  return (
    <DrillScreen
      personalBest={{
        bestScore: best.bestScore,
        totalSessions: best.totalSessions,
      }}
    />
  );
}
