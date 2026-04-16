import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import MemberBadge, {
  BADGE_TIERS,
  getBadge,
  monthsSince,
  tierFromMonths,
  daysToNextTier,
} from "@/components/consilium/MemberBadge";
import { Lock, CheckCircle2, Calendar, MessageSquare, Heart, BookOpen, type LucideIcon } from "lucide-react";
import ManageSubscriptionButton from "./ManageSubscriptionButton";

export const metadata = {
  title: "Your Rank — The Consilium | Kanika Batra",
  description: "Your tenure, rank, and membership inside the Consilium.",
};

export default async function ConsiliumProfilePage() {
  const userId = await requireServerAuth("/consilium/profile");

  const [user, membership, commentCount, forumPostCount, likeCount] =
    await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          displayName: true,
          name: true,
          email: true,
          createdAt: true,
          gender: true,
          role: true,
        },
      }),
      prisma.communityMembership.findUnique({
        where: { userId },
        select: {
          status: true,
          activatedAt: true,
          expiresAt: true,
          billingCycle: true,
        },
      }),
      prisma.feedComment.count({
        where: { authorId: userId, status: "APPROVED" },
      }),
      prisma.forumPost.count({ where: { authorId: userId } }),
      prisma.feedPostLike.count({ where: { userId } }),
    ]);

  const handle = user?.displayName || "Counselor";
  const months = monthsSince(membership?.activatedAt ?? null);
  const currentTier = tierFromMonths(months);
  const currentBadge = getBadge(currentTier);
  const isQueen = currentTier === 12;
  const nextBadge = isQueen ? null : getBadge(currentTier + 1);
  const daysToNext = daysToNextTier(membership?.activatedAt ?? null);

  // Progress within the current month — 0..1 fraction toward next tier
  const daysIntoMonth = membership?.activatedAt
    ? ((Date.now() - membership.activatedAt.getTime()) /
        (1000 * 60 * 60 * 24)) %
      30
    : 0;
  const monthFraction = Math.min(1, daysIntoMonth / 30);

  const activatedLabel = membership?.activatedAt
    ? membership.activatedAt.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;
  const renewsLabel = membership?.expiresAt
    ? membership.expiresAt.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const daysInConsilium = membership?.activatedAt
    ? Math.floor(
        (Date.now() - membership.activatedAt.getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-10 lg:py-14">
      {/* Hero — current rank */}
      <section className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-warm-gold/20 bg-gradient-to-br from-deep-black/80 via-deep-burgundy/20 to-deep-black/80 p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-10">
            {/* Badge */}
            <div className="shrink-0">
              <MemberBadge tier={currentTier} size="xl" />
            </div>

            {/* Identity + rank */}
            <div className="flex-1 text-center sm:text-left">
              <p className="text-[10px] uppercase tracking-[0.3em] text-text-gray/60 mb-2">
                {handle}
              </p>
              <p className="text-xs text-warm-gold/90 uppercase tracking-[0.3em] mb-2">
                {currentBadge.monthLabel} · Rank {currentBadge.numeral}
              </p>
              <h1
                className="text-4xl sm:text-5xl font-extralight tracking-wider uppercase mb-3"
                style={{
                  background:
                    "linear-gradient(135deg, #f3d98a 0%, #d4af37 50%, #9c7a1f 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {currentBadge.name}
              </h1>
              <p className="text-text-gray font-light italic leading-relaxed">
                &ldquo;{currentBadge.tagline}&rdquo;
              </p>

              {/* Progress to next tier */}
              {nextBadge && daysToNext !== null ? (
                <div className="mt-6">
                  <div className="flex items-baseline justify-between text-xs mb-2">
                    <span className="text-text-gray/70 uppercase tracking-[0.2em]">
                      Next: {nextBadge.name}
                    </span>
                    <span className="text-warm-gold/80">
                      {daysToNext} {daysToNext === 1 ? "day" : "days"}
                    </span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-deep-black/80 overflow-hidden border border-warm-gold/10">
                    <div
                      className="h-full bg-gradient-to-r from-warm-gold/60 via-warm-gold to-warm-gold/80 rounded-full transition-all"
                      style={{ width: `${Math.round(monthFraction * 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-6">
                  <p className="text-xs text-warm-gold/90 uppercase tracking-[0.2em]">
                    No rank beyond the Queen.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="mb-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <StatTile
          icon={Calendar}
          label="Days in the Consilium"
          value={daysInConsilium}
        />
        <StatTile icon={MessageSquare} label="Comments" value={commentCount} />
        <StatTile icon={BookOpen} label="Forum posts" value={forumPostCount} />
        <StatTile icon={Heart} label="Posts liked" value={likeCount} />
      </section>

      {/* The Ladder */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <p className="text-warm-gold text-xs uppercase tracking-[0.3em] mb-2">
            How To Unlock
          </p>
          <h2 className="text-2xl sm:text-3xl font-extralight tracking-wider uppercase text-text-light mb-2">
            The Ladder
          </h2>
          <p className="text-text-gray text-sm max-w-xl mx-auto">
            Your seal climbs one rank every month you stay in the Consilium.
            Time is the only currency — no shortcuts, no purchase, no referral.
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

            // Month gap calculation: tier T unlocks at month (T-1).
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
                        ? "border-warm-gold/20 bg-deep-black/40"
                        : "border-warm-gold/10 bg-deep-black/30"
                  }
                `}
              >
                {/* Status pill in top-right */}
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

                {/* Badge — dimmed if locked */}
                <div
                  className={`flex justify-center mb-3 transition-all ${
                    isLocked ? "opacity-30 saturate-50" : ""
                  }`}
                >
                  <MemberBadge tier={t.tier} size="md" />
                </div>

                {/* Meta */}
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

                  {/* Unlock-in line */}
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

      {/* Membership */}
      <section className="mb-12">
        <div className="text-center mb-6">
          <p className="text-warm-gold text-xs uppercase tracking-[0.3em] mb-2">
            Membership
          </p>
          <h2 className="text-2xl font-extralight tracking-wider uppercase text-text-light">
            Your Seat
          </h2>
        </div>

        <div className="max-w-2xl mx-auto rounded-2xl border border-warm-gold/20 bg-deep-black/50 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`w-2 h-2 rounded-full ${
                    membership?.status === "ACTIVE"
                      ? "bg-emerald-400"
                      : membership?.status === "SUSPENDED"
                        ? "bg-amber-400"
                        : "bg-text-gray/50"
                  }`}
                />
                <span
                  className={`text-xs uppercase tracking-[0.25em] ${
                    membership?.status === "ACTIVE"
                      ? "text-emerald-400"
                      : membership?.status === "SUSPENDED"
                        ? "text-amber-400"
                        : "text-text-gray"
                  }`}
                >
                  {membership?.status ?? "Inactive"}
                </span>
              </div>
              {activatedLabel && (
                <p className="text-sm text-text-gray">
                  Joined{" "}
                  <span className="text-text-light font-light">
                    {activatedLabel}
                  </span>
                </p>
              )}
              {renewsLabel && membership?.status === "ACTIVE" && (
                <p className="text-sm text-text-gray mt-1">
                  Renews{" "}
                  <span className="text-text-light font-light">
                    {renewsLabel}
                  </span>
                  {membership.billingCycle && (
                    <span className="text-text-gray/60 text-xs ml-2 capitalize">
                      · {membership.billingCycle} billing
                    </span>
                  )}
                </p>
              )}
            </div>

            {membership?.status === "ACTIVE" ||
            membership?.status === "SUSPENDED" ? (
              <ManageSubscriptionButton />
            ) : null}
          </div>
        </div>
      </section>

      {/* Account */}
      <section>
        <div className="text-center mb-6">
          <p className="text-warm-gold text-xs uppercase tracking-[0.3em] mb-2">
            Account
          </p>
          <h2 className="text-2xl font-extralight tracking-wider uppercase text-text-light">
            Identity
          </h2>
        </div>

        <div className="max-w-2xl mx-auto rounded-2xl border border-warm-gold/15 bg-deep-black/40 p-6 sm:p-8 space-y-4">
          <Row label="Display name" value={handle} />
          <Row label="Email" value={user?.email ?? ""} muted />
          {user?.gender && (
            <Row label="Chamber" value={user.gender.toLowerCase()} />
          )}
          <p className="text-xs text-text-gray/60 pt-4 border-t border-warm-gold/10">
            To change your email or display name, open the{" "}
            <a
              href="/dashboard"
              className="text-warm-gold hover:text-warm-gold/80 transition-colors"
            >
              Dashboard
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

function Row({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-text-gray/70 uppercase tracking-[0.18em] text-xs">
        {label}
      </span>
      <span
        className={`font-light ${muted ? "text-text-gray" : "text-text-light"} truncate`}
      >
        {value}
      </span>
    </div>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-warm-gold/15 bg-deep-black/40 p-4 sm:p-5 text-center">
      <Icon
        size={18}
        strokeWidth={1.25}
        className="text-warm-gold/80 mx-auto mb-2"
      />
      <p className="text-2xl sm:text-3xl font-extralight text-warm-gold">
        {value}
      </p>
      <p className="text-[10px] uppercase tracking-[0.18em] text-text-gray/60 mt-1">
        {label}
      </p>
    </div>
  );
}
