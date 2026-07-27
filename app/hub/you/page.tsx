import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { readDailyStreak } from "@/lib/streak/daily";
import { ringByLevel, standingToNextRing } from "@/lib/standing/config";
import RingEmblem from "@/components/rings/RingEmblem";
import Move from "@/components/app-shell/Move";

export const metadata = {
  title: "You | Consilium",
};

/**
 * You: rank, the numbers that move, and the doors that don't fit a tab
 * (the library, profile).
 */
export default async function YouPage() {
  const userId = await requireServerAuth("/app/you");

  const [viewer, dailyStreak, simStats] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { displayName: true, standing: true, ringLevel: true },
    }),
    readDailyStreak(prisma, userId),
    prisma.simulatorProgress.aggregate({
      where: { userId, completedAt: { not: null } },
      _count: { _all: true },
    }),
  ]);

  const standing = viewer?.standing ?? 0;
  const ringLevel = viewer?.ringLevel ?? 4;
  const rank = ringByLevel(ringLevel);
  const next = standingToNextRing(standing);
  let pct = 100;
  if (next) {
    const floor = rank.threshold;
    const span = next.next.threshold - floor;
    pct = span > 0 ? Math.min(100, ((standing - floor) / span) * 100) : 100;
  }

  return (
    <div className="px-5 pb-28 pt-6">
      <h1
        className="text-[28px] font-light"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {viewer?.displayName || "You"}
      </h1>
      <p className="mb-6 mt-1 text-[13px] text-[var(--app-muted)]">
        Measured. Earned. Yours.
      </p>

      {/* Rank card */}
      <div className="mb-4 flex items-center gap-5 rounded-[18px] border border-[var(--app-line)] bg-[var(--app-card)] p-[18px]">
        <RingEmblem level={ringLevel} size={84} className="shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-[11px] uppercase tracking-[0.22em] text-[var(--app-gold-soft)]">
            Your rank
          </p>
          <p
            className="text-[22px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {rank.name}
          </p>
          <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-[rgba(212,175,55,0.15)]">
            <div
              className="h-full rounded-full bg-[var(--app-gold)]"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-1.5 text-[11.5px] text-[var(--app-dim)]">
            {standing.toLocaleString()} Standing
            {next
              ? ` · ${next.remaining.toLocaleString()} to ${next.next.name}`
              : " · Inner Circle"}
          </p>
        </div>
      </div>

      {/* Tallies */}
      <div className="mb-6 grid grid-cols-3 gap-2.5">
        {[
          { num: dailyStreak.current, label: "day streak" },
          { num: simStats._count._all, label: "scenarios run" },
          { num: standing, label: "Standing" },
        ].map((t) => (
          <div
            key={t.label}
            className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-3 py-4 text-center"
          >
            <p
              className="text-[24px] font-light text-[var(--app-gold)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.num.toLocaleString()}
            </p>
            <p className="mt-1 text-[11px] leading-tight text-[var(--app-dim)]">
              {t.label}
            </p>
          </div>
        ))}
      </div>

      {/* The rest of the house */}
      <div className="flex flex-col gap-2.5">
        <Move
          href="/consilium/book"
          title="The book"
          sub="The Sociopathic Dating Bible, inside."
          cta="READ"
          icon={
            <svg viewBox="0 0 24 24">
              <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3z" />
              <path d="M5 4v16" />
            </svg>
          }
        />
        <Move
          href="/consilium/videos"
          title="Videos"
          sub="The video library."
          cta="WATCH"
          icon={
            <svg viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="M10 9.5l5 2.5-5 2.5z" />
            </svg>
          }
        />
        <Move
          href="/consilium/voice-notes"
          title="Voice notes"
          sub="Kanika, in your ear."
          cta="LISTEN"
          icon={
            <svg viewBox="0 0 24 24">
              <rect x="9" y="3" width="6" height="11" rx="3" />
              <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
            </svg>
          }
        />
        <Move
          href="/consilium/profile"
          title="Profile & settings"
          sub="Name, avatar, notifications."
          cta="EDIT"
          icon={
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="8.5" r="3.5" />
              <path d="M5 20c1.2-3.5 3.8-5 7-5s5.8 1.5 7 5" />
            </svg>
          }
        />
      </div>
    </div>
  );
}
