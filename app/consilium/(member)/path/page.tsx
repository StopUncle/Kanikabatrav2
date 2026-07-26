import Link from "next/link";
import { ArrowRight, Check, Lock } from "lucide-react";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { getPathState, type ChapterState } from "@/lib/path/progress";
import { ringByLevel } from "@/lib/standing/config";
import { stepHref } from "@/lib/path/curriculum";

export const metadata = {
  title: "The Path. The Consilium | Kanika Batra",
  description: "Twelve chapters, counted inward. This is the map.",
};

const ACT_TITLES: Record<1 | 2 | 3, { name: string; epithet: string }> = {
  1: { name: "Act I · The Outer Rings", epithet: "learn to see" },
  2: { name: "Act II · The Middle Rings", epithet: "learn to move" },
  3: { name: "Act III · The Inner Rings", epithet: "learn to build" },
};

/**
 * The Path map (plan §5.3): the full curriculum, one tap deeper than the
 * Chamber's single card. The active chapter expands its steps; sealed
 * chapters collapse to a checkmark row; locked chapters show what opens
 * them. Never the Chamber's job to show this much.
 */
export default async function PathMapPage() {
  const userId = await requireServerAuth("/consilium/path");

  const viewer = await prisma.user.findUnique({
    where: { id: userId },
    select: { gender: true, ringLevel: true },
  });
  const gender = viewer?.gender ?? null;

  const state = await getPathState(prisma, userId, {
    gender,
    ringLevel: viewer?.ringLevel ?? 4,
  });

  const doneSteps = state.completedStepIds;

  const byAct: Record<1 | 2 | 3, ChapterState[]> = { 1: [], 2: [], 3: [] };
  for (const c of state.chapters) byAct[c.chapter.act].push(c);

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-12">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-extralight tracking-wider uppercase gradient-text-gold mb-2">
          The Path
        </h1>
        <div className="w-12 h-px bg-warm-gold/40 mb-3" />
        <p className="text-text-gray text-sm">
          Twelve chapters, counted inward. {state.sealedCount} sealed.
        </p>
      </div>

      {( [1, 2, 3] as const ).map((act) => (
        <section key={act} className="mb-8">
          <div className="mb-3 flex items-baseline gap-2">
            <h2 className="text-text-light text-xs uppercase tracking-[0.3em] font-light">
              {ACT_TITLES[act].name}
            </h2>
            <span className="text-text-gray/50 text-xs italic">
              {ACT_TITLES[act].epithet}
            </span>
          </div>

          <div className="space-y-2.5">
            {byAct[act].map(({ chapter, status, completedSteps, totalSteps, opensAtRing }) => {
              const isActive = status === "active";
              return (
                <div
                  key={chapter.id}
                  className={`rounded-xl border px-4 py-3.5 ${
                    isActive
                      ? "border-warm-gold/30 bg-warm-gold/[0.04]"
                      : status === "complete"
                        ? "border-white/10 bg-white/[0.02]"
                        : "border-white/[0.06] bg-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-[11px] tabular-nums ${
                        status === "complete"
                          ? "border-warm-gold/40 bg-warm-gold/10 text-warm-gold"
                          : isActive
                            ? "border-warm-gold/40 text-warm-gold"
                            : "border-white/10 text-text-gray/40"
                      }`}
                    >
                      {status === "complete" ? (
                        <Check size={13} strokeWidth={2} />
                      ) : status === "active" ? (
                        chapter.number
                      ) : (
                        <Lock size={11} strokeWidth={1.6} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-light ${
                          status === "locked-seq" || status === "locked-ring"
                            ? "text-text-gray/50"
                            : "text-text-light"
                        }`}
                      >
                        {chapter.title}
                      </p>
                      <p className="text-text-gray/60 text-xs font-light truncate">
                        {status === "locked-ring" && opensAtRing
                          ? `Opens at ${ringByLevel(opensAtRing).name}`
                          : chapter.blurb}
                      </p>
                    </div>
                    {isActive && (
                      <span className="shrink-0 text-text-gray text-[11px] tabular-nums">
                        {completedSteps}/{totalSteps}
                      </span>
                    )}
                  </div>

                  {isActive && (
                    <div className="mt-3 ml-10 space-y-2">
                      {chapter.steps.map((step) => {
                        const done = doneSteps.has(step.id);
                        return done ? (
                          <div key={step.id} className="flex items-center gap-2.5">
                            <Check
                              size={13}
                              strokeWidth={2}
                              className="shrink-0 text-warm-gold/70"
                            />
                            <span className="text-text-gray/50 text-sm font-light line-through decoration-white/20">
                              {step.label}
                            </span>
                          </div>
                        ) : (
                          <Link
                            key={step.id}
                            href={stepHref(step, gender)}
                            className="group flex items-center gap-2.5"
                          >
                            <span className="shrink-0 h-1.5 w-1.5 rounded-full bg-white/25 group-hover:bg-warm-gold transition-colors" />
                            <span className="text-text-light/90 text-sm font-light group-hover:text-warm-gold transition-colors">
                              {step.label}
                            </span>
                            <ArrowRight
                              size={12}
                              className="text-text-gray/30 group-hover:text-warm-gold transition-colors"
                            />
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
