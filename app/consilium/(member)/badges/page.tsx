import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import MemberBadge from "@/components/consilium/MemberBadge";
import {
  BADGE_TIERS,
  getBadge,
  monthsSince,
  tierForMember,
  daysToNextTier,
} from "@/components/consilium/badge-tiers";
import { Lock, CheckCircle2, Clock, Crown } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Badges. The Consilium | Kanika Batra",
  description:
    "The twelve tenure ranks of the Consilium. One new rank for every month you stay.",
};

export default async function ConsiliumBadgesPage() {
  const userId = await requireServerAuth("/consilium/badges");

  const [membership, me] = await Promise.all([
    prisma.communityMembership.findUnique({
      where: { userId },
      select: { activatedAt: true },
    }),
    prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    }),
  ]);

  const months = monthsSince(membership?.activatedAt ?? null);
  const currentTier = tierForMember({
    role: me?.role,
    activatedAt: membership?.activatedAt ?? null,
  });
  const currentBadge = getBadge(currentTier);
  const daysToNext = daysToNextTier(membership?.activatedAt ?? null);
  const isQueen = currentTier === 12;

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-10 lg:py-14">
      {/* Heading */}
      <header className="text-center mb-12">
        <p className="text-warm-gold/90 uppercase tracking-[0.3em] text-sm mb-3">
          Consilium · Tenure
        </p>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-wider uppercase mb-4"
          style={{
            background:
              "linear-gradient(135deg, #f3d98a 0%, #d4af37 50%, #9c7a1f 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          The Twelve Ranks
        </h1>
        <div className="w-16 h-px bg-warm-gold/50 mx-auto mb-6" />
        <p className="text-text-gray max-w-2xl mx-auto font-light leading-relaxed">
          Every month you stay in the Consilium, your seal climbs a rank. A
          full year earns the Queen and there is no rank beyond her. Time in
          the council is the only currency. No shortcuts, no purchase, no
          referral.
        </p>
      </header>

      {/* Where you are */}
      <section className="mb-14">
        <div className="max-w-3xl mx-auto rounded-3xl border border-warm-gold/25 bg-gradient-to-br from-deep-black/70 via-deep-burgundy/10 to-deep-black/70 p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            <div className="shrink-0">
              <MemberBadge tier={currentTier} size="xl" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-[10px] uppercase tracking-[0.3em] text-text-gray/60 mb-1">
                Your current rank
              </p>
              <p className="text-xs text-warm-gold/90 uppercase tracking-[0.3em] mb-2">
                {currentBadge.monthLabel} · Rank {currentBadge.numeral}
              </p>
              <h2 className="text-3xl sm:text-4xl font-extralight tracking-wider uppercase text-warm-gold mb-2">
                {currentBadge.name}
              </h2>
              <p className="text-text-gray font-light italic mb-4">
                &ldquo;{currentBadge.tagline}&rdquo;
              </p>
              {!isQueen && daysToNext !== null ? (
                <p className="text-sm text-text-gray flex items-center justify-center sm:justify-start gap-2">
                  <Clock size={14} strokeWidth={1.5} className="text-warm-gold/70" />
                  <span>
                    <span className="text-warm-gold">
                      {daysToNext} {daysToNext === 1 ? "day" : "days"}
                    </span>{" "}
                    until <span className="text-text-light">{getBadge(currentTier + 1).name}</span>
                  </span>
                </p>
              ) : (
                <p className="text-sm text-warm-gold flex items-center justify-center sm:justify-start gap-2">
                  <Crown size={14} strokeWidth={1.5} />
                  No rank beyond the Queen.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* The Ladder */}
      <section className="mb-14">
        <div className="text-center mb-8">
          <p className="text-warm-gold text-xs uppercase tracking-[0.3em] mb-2">
            How To Unlock
          </p>
          <h2 className="text-2xl sm:text-3xl font-extralight tracking-wider uppercase text-text-light mb-3">
            The Ladder
          </h2>
          <p className="text-text-gray text-sm max-w-xl mx-auto">
            Each badge below unlocks automatically the day you hit its month.
            You don&apos;t earn it, you outlast for it.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {BADGE_TIERS.map((t) => {
            const state: "past" | "current" | "locked" =
              t.tier < currentTier
                ? "past"
                : t.tier === currentTier
                  ? "current"
                  : "locked";
            const isLocked = state === "locked";
            const isCurrent = state === "current";
            const isPast = state === "past";
            const monthsAway = t.tier - 1 - months;

            return (
              <div
                key={t.tier}
                className={`
                  relative overflow-hidden rounded-2xl border p-5 transition-all duration-300
                  ${
                    isCurrent
                      ? "border-warm-gold/70 bg-warm-gold/5 shadow-[0_8px_32px_-8px_rgba(212,175,55,0.35)]"
                      : isPast
                        ? "border-warm-gold/25 bg-deep-black/40"
                        : "border-warm-gold/10 bg-deep-black/30"
                  }
                `}
              >
                <div className="absolute top-3 right-3">
                  {isCurrent && (
                    <span className="text-[9px] uppercase tracking-[0.2em] text-deep-black bg-warm-gold rounded-full px-2 py-0.5 font-medium">
                      Now
                    </span>
                  )}
                  {isPast && (
                    <CheckCircle2
                      size={16}
                      strokeWidth={1.5}
                      className="text-warm-gold/70"
                    />
                  )}
                  {isLocked && (
                    <Lock
                      size={14}
                      strokeWidth={1.5}
                      className="text-text-gray/40"
                    />
                  )}
                </div>

                <div
                  className={`flex justify-center mb-3 transition-all ${
                    isLocked ? "opacity-30 saturate-50" : ""
                  }`}
                >
                  <MemberBadge tier={t.tier} size="md" />
                </div>

                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-text-gray/60 mb-1">
                    {t.monthLabel} · Rank {t.numeral}
                  </p>
                  <p
                    className={`text-base font-light tracking-[0.15em] uppercase mb-2 ${
                      isLocked ? "text-text-gray/50" : "text-warm-gold"
                    }`}
                  >
                    {t.name}
                  </p>
                  <p
                    className={`text-xs font-light leading-relaxed min-h-[2.25rem] ${
                      isLocked ? "text-text-gray/40" : "text-text-gray/90"
                    }`}
                  >
                    {t.tagline}
                  </p>

                  {isLocked && monthsAway > 0 && (
                    <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-text-gray/50">
                      {monthsAway === 1
                        ? "Unlocks next month"
                        : `${monthsAway} months away`}
                    </p>
                  )}
                  {isPast && (
                    <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-warm-gold/60">
                      Earned
                    </p>
                  )}
                  {isCurrent && (
                    <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-warm-gold">
                      Current rank
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Explainer */}
      <section className="max-w-2xl mx-auto text-center mb-10 p-8 rounded-2xl border border-warm-gold/15 bg-deep-black/40">
        <p className="text-warm-gold text-xs uppercase tracking-[0.3em] mb-3">
          The Rule
        </p>
        <p className="text-text-light font-light leading-relaxed">
          One rank per month, counted from the day you joined. No badges for
          activity, no badges for engagement, no badges for purchase. Only
          time. The members here longest are the ones the Consilium was built
          to serve.
        </p>
        <Link
          href="/consilium/profile"
          className="inline-block mt-6 text-sm tracking-[0.18em] uppercase text-warm-gold hover:text-warm-gold/80 transition-colors"
        >
          View your full profile →
        </Link>
      </section>
    </div>
  );
}
