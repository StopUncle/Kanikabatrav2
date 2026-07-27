import { prisma } from "@/lib/prisma";
import Move from "@/components/app-shell/Move";

/**
 * The Baseline Read as a row any surface can drop in with one line.
 * Renders nothing once it is done, so it can sit permanently on Today,
 * the Day-0 checklist and the Quizzes screen without ever becoming
 * nagging furniture.
 */
export default async function BaselineCta({ userId }: { userId: string }) {
  const taken = await prisma.baselineAttempt.count({ where: { userId } });
  if (taken > 0) return null;

  return (
    <Move
      href="/app/measure/baseline"
      title="The Baseline Read"
      sub="Twelve rooms. Find out what already gets past you."
      cta="START"
      icon={
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" />
        </svg>
      }
    />
  );
}
