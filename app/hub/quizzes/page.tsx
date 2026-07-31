import Link from "next/link";
import { PageHeader, PageShell } from "@/components/app-shell/ui";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { QUIZ_REGISTRY } from "@/lib/quiz-registry";

export const metadata = {
  title: "Quizzes | Consilium",
};

/**
 * Quizzes: the instrument suite as app cards, plus the member's latest
 * result. The Baseline Read card slots in at the top of this screen when
 * it ships (Claude B's lane); until then the suite leads.
 */
export default async function QuizzesPage() {
  const userId = await requireServerAuth("/app/quizzes");

  const latest = await prisma.quizResult.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: { id: true, createdAt: true },
  });

  return (
    <PageShell>
      <PageHeader
        title="Quizzes"
        lede="Calibrated instruments, not magazine filler."
      />

      {latest && (
        <Link
          href={`/quiz/results/${latest.id}`}
          className="mb-5 flex items-center gap-3.5 rounded-[18px] border border-[var(--app-line)] px-[18px] py-4"
          style={{
            background:
              "linear-gradient(140deg, rgba(212,175,55,0.09), rgba(212,175,55,0.02))",
          }}
        >
          <span className="min-w-0 flex-1">
            <span className="mb-1 block text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]">
              Your latest result
            </span>
            <span
              className="block text-app-lead"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Dark Mirror ·{" "}
              {latest.createdAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </span>
          <span className="shrink-0 text-xs tracking-[0.1em] text-[var(--app-gold)]">
            VIEW →
          </span>
        </Link>
      )}

      <div className="flex flex-col gap-2.5">
        {QUIZ_REGISTRY.map((q) => (
          <Link
            key={q.slug}
            href={q.href}
            className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-4 py-[15px]"
          >
            <span className="flex items-baseline justify-between gap-3">
              <span
                className="truncate text-app-lead"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {q.title}
              </span>
              <span className="shrink-0 text-app-eyebrow tabular-nums text-[var(--app-dim)]">
                {q.minutes} min
              </span>
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-[var(--app-dim)]">
              {q.blurb}
            </span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
