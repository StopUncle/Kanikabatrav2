import Link from "next/link";
import { PageHeader, PageShell } from "@/components/app-shell/ui";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { getPathState } from "@/lib/path/progress";
import { appStepHref } from "@/lib/path/curriculum";
import { ringByLevel } from "@/lib/standing/config";

export const metadata = {
  title: "Path | Consilium",
};

const ACT_LABELS: Record<1 | 2 | 3, string> = {
  1: "Act I",
  2: "Act II",
  3: "Act III",
};

/**
 * The Path: the whole journey as a vertical timeline. Done chapters are
 * filled dots, the active chapter glows and carries the next-step card,
 * locked chapters say exactly what opens them.
 */
export default async function PathPage() {
  const userId = await requireServerAuth("/app/path");

  const viewer = await prisma.user.findUnique({
    where: { id: userId },
    select: { gender: true, ringLevel: true },
  });

  const state = await getPathState(prisma, userId, {
    gender: viewer?.gender ?? null,
    ringLevel: viewer?.ringLevel ?? 4,
  });

  let lastAct: number | null = null;

  return (
    <PageShell>
      <PageHeader
        title="Your path"
        lede={`${state.sealedCount} of ${state.chapters.length} chapters sealed`}
      />

      <div className="relative pl-[30px]">
        <span
          aria-hidden
          className="absolute bottom-2 left-[10px] top-2 w-px"
          style={{
            background:
              "linear-gradient(180deg, var(--app-gold-soft), rgba(212,175,55,0.06))",
          }}
        />
        {state.chapters.map((c) => {
          const actHeader =
            c.chapter.act !== lastAct ? ACT_LABELS[c.chapter.act] : null;
          lastAct = c.chapter.act;
          const isCurrent =
            state.current?.chapter.id === c.chapter.id ? state.current : null;
          const locked =
            c.status === "locked-seq" || c.status === "locked-ring";

          return (
            <div key={c.chapter.id} className="relative pb-7">
              {actHeader && (
                <p className="mb-3 text-app-tiny uppercase tracking-app-label text-[var(--app-dim)]">
                  {actHeader}
                </p>
              )}
              <span
                aria-hidden
                className={`absolute left-[-26px] h-[13px] w-[13px] rounded-full border-[1.5px] ${
                  c.status === "complete"
                    ? "border-[var(--app-gold)] bg-[var(--app-gold)]"
                    : c.status === "active"
                      ? "border-[var(--app-gold)] bg-[var(--app-black)] shadow-[0_0_0_5px_rgba(212,175,55,0.15)]"
                      : "border-[var(--app-dim)] bg-[var(--app-black)]"
                }`}
                style={{ top: actHeader ? 34 : 4 }}
              />
              <p className="mb-0.5 text-app-tiny uppercase tracking-app-label text-[var(--app-dim)]">
                Chapter {c.chapter.number}
                {c.status === "active" ? " · now" : ""}
              </p>
              <p
                className={`text-lg ${
                  c.status === "complete"
                    ? "text-[var(--app-muted)]"
                    : locked
                      ? "text-[var(--app-dim)]"
                      : ""
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {c.chapter.title}
                {locked && (
                  <svg
                    aria-hidden
                    className="ml-2 inline-block h-3 w-3 opacity-60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--app-dim)"
                    strokeWidth="2"
                  >
                    <rect x="5" y="11" width="14" height="9" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                )}
              </p>
              <p className="mt-0.5 text-xs text-[var(--app-dim)]">
                {c.status === "locked-ring" && c.opensAtRing
                  ? `Opens at ${ringByLevel(c.opensAtRing).name}`
                  : c.status === "locked-seq"
                    ? `Opens with Chapter ${c.chapter.number - 1}`
                    : `${c.completedSteps} of ${c.totalSteps} complete`}
              </p>

              {isCurrent && (
                <Link
                  href={appStepHref(isCurrent.step, viewer?.gender ?? null)}
                  className="mt-3 block rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-[15px]"
                >
                  <span className="block text-app-lead font-medium">
                    {isCurrent.step.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-[var(--app-dim)]">
                    {isCurrent.step.framing}
                  </span>
                  <span className="mt-3 block h-[3px] overflow-hidden rounded-full bg-[var(--app-line)]">
                    <span
                      className="block h-full rounded-full bg-[var(--app-gold)]"
                      style={{
                        width: `${Math.round((c.completedSteps / Math.max(1, c.totalSteps)) * 100)}%`,
                      }}
                    />
                  </span>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
