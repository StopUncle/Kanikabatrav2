import { redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { trainingGate } from "@/lib/access/guard";
import IntakeFlow from "@/components/program/IntakeFlow";

export const metadata = {
  title: "The Twelve: intake | Consilium",
};

/**
 * The Twelve's front door: four questions, then the Read.
 */
export default async function ProgramIntakePage() {
  const userId = await requireServerAuth("/app/program/intake");
  // Training-tier surface, same tier decision as the rest of The Twelve.
  const gate = await trainingGate(userId);
  if (gate) return gate;

  const enrolled = await prisma.programEnrollment.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (enrolled) redirect("/app/program");

  return (
    <div className="pb-8 pt-6">
      <div className="mb-6 px-5">
        <h1
          className="text-app-hero font-light"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Before the twelve weeks
        </h1>
        <p className="mt-1.5 text-app-body text-[var(--app-muted)]">
          Four questions. She reads them once and writes your Read: the
          pattern she sees, and the order your twelve weeks should run in.
          Honest answers get an honest letter.
        </p>
      </div>
      <IntakeFlow />
    </div>
  );
}
