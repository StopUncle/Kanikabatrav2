import type { Metadata } from "next";
import { requireServerAuth } from "@/lib/auth/server-auth";
import InstinctsHex from "@/components/tells/InstinctsHex";
import HandleClaim from "@/components/tells/HandleClaim";
import { PageHeader, PageShell } from "@/components/app-shell/ui";
import { getInstinctScore, getTellStreak } from "@/lib/tells/db";
import { prisma } from "@/lib/prisma";
import { AXIS_KEYS, AXIS_LABELS } from "@/lib/tells/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your Instinct Hex | Consilium",
  description: "Your six-axis instinct rating across all tracks.",
};

const AXIS_BLURBS: Record<string, string> = {
  READ: "Naming what someone is doing while they are doing it.",
  SPOT: "Catching the move in flight, before it lands.",
  REPLY: "Knowing the structurally clean response under pressure.",
  REFUSE: "Saying no without explaining yourself out of the no.",
  CALIBRATE: "Reading status, room, and signal across difference.",
  HOLD: "Not reacting. The most expensive instinct, the slowest to learn.",
};

function tier(rating: number): { label: string; color: string } {
  if (rating < 1100) return { label: "Untrained", color: "text-[var(--app-dim)]" };
  if (rating < 1300) return { label: "Aware", color: "text-[var(--app-text)]" };
  if (rating < 1500) return { label: "Practiced", color: "text-[var(--app-gold)]" };
  if (rating < 1700) return { label: "Sharp", color: "text-[var(--app-gold)]" };
  if (rating < 1900) return { label: "Expert", color: "text-[var(--app-green)]" };
  return { label: "Native", color: "text-[var(--app-green)]" };
}

export default async function ConsiliumInstinctsScorePage() {
  const userId = await requireServerAuth("/app/instincts/score");

  const [score, streak, profile] = await Promise.all([
    getInstinctScore(userId),
    getTellStreak(userId),
    prisma.user.findUnique({
      where: { id: userId },
      select: { handle: true, profilePublic: true },
    }),
  ]);

  const ratings: Record<string, number> = {
    READ: score.read,
    SPOT: score.spot,
    REPLY: score.reply,
    REFUSE: score.refuse,
    CALIBRATE: score.calibrate,
    HOLD: score.hold,
  };

  const overall = Math.round(
    AXIS_KEYS.reduce((sum, a) => sum + ratings[a], 0) / AXIS_KEYS.length,
  );

  return (
    <PageShell>
      <PageHeader
        title="Your hex"
        lede="Each Tell adjusts the axes it trains. The hex grows the way a body grows in a gym, slowly, only with reps."
      />

      <div className="flex justify-center">
        <InstinctsHex score={score} size={320} showLabels={true} />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <div className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] p-4">
          <p className="mb-2 text-app-tiny uppercase tracking-app-label text-[var(--app-gold)] opacity-70">
            Composite
          </p>
          <div className="flex items-baseline gap-3">
            <span
              className="text-app-hero font-light text-[var(--app-text)] tabular-nums"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {overall}
            </span>
            <span
              className={`text-app-caption uppercase tracking-app-label ${tier(overall).color}`}
            >
              {tier(overall).label}
            </span>
          </div>
          <p className="mt-2 text-app-caption leading-relaxed text-[var(--app-dim)]">
            {streak?.currentDays ?? 0} day streak &middot;{" "}
            {score.totalAnswered} answers logged
          </p>
        </div>

        <HandleClaim
          initialHandle={profile?.handle ?? null}
          initialPublic={profile?.profilePublic ?? false}
        />

        {AXIS_KEYS.map((axis) => {
          const v = ratings[axis];
          const t = tier(v);
          return (
            <div
              key={axis}
              className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] p-4"
            >
              <div className="mb-1 flex items-baseline justify-between">
                <p className="text-app-body uppercase tracking-app-wide text-[var(--app-text)]">
                  {AXIS_LABELS[axis]}
                </p>
                <p className="flex items-baseline gap-2.5">
                  <span
                    className="text-app-title font-light text-[var(--app-gold)] tabular-nums"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {v}
                  </span>
                  <span
                    className={`text-app-tiny uppercase tracking-app-label ${t.color}`}
                  >
                    {t.label}
                  </span>
                </p>
              </div>
              <p className="text-app-caption leading-relaxed text-[var(--app-dim)]">
                {AXIS_BLURBS[axis]}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-app-micro leading-relaxed text-[var(--app-dim)]">
        Pattern recognition training. Not medical, legal, or diagnostic
        advice. Composite is the average of the six axes. Rating uses Elo per
        axis, K=24 for the first thirty answers, K=16 thereafter.
      </p>
    </PageShell>
  );
}
