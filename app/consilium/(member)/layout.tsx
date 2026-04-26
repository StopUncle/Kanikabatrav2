import { redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { checkMembership } from "@/lib/community/membership";
import BackgroundEffects from "@/components/BackgroundEffects";
import InnerCircleSidebar from "@/components/consilium/InnerCircleSidebar";
import MemberPillNav from "@/components/consilium/MemberPillNav";
import SessionWatermark from "@/components/consilium/SessionWatermark";
import { prisma } from "@/lib/prisma";
import { tierForMember, daysToNextTier } from "@/components/consilium/badge-tiers";
import { computeFingerprint } from "@/lib/community/fingerprint";
import { getRecentActivity } from "@/lib/community/activity";

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await requireServerAuth("/consilium/feed");
  const { isMember, redirectUrl } = await checkMembership(userId);

  if (!isMember) {
    redirect(redirectUrl || "/consilium");
  }

  // Single round-trip for everything the sidebar needs: viewer record,
  // online count, simulator stats, recent activity. Bundling in
  // Promise.all keeps TTFB tight as the sidebar gets richer.
  const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
  const [onlineCount, me, simStats, recentActivity] = await Promise.all([
    prisma.user.count({
      where: {
        communityMembership: { status: "ACTIVE" },
        updatedAt: { gte: fiveMinAgo },
        isBot: false,
      },
    }),
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        displayName: true,
        role: true,
        communityMembership: {
          select: { activatedAt: true },
        },
      },
    }),
    prisma.simulatorProgress.aggregate({
      where: { userId },
      _sum: { xpEarned: true },
      _count: { _all: true },
    }),
    getRecentActivity(5),
  ]);

  // Current tier is pure function of (role, activatedAt) — no DB
  // column to keep in sync, no cron to run, no drift. Admins always
  // read as Queen regardless of tenure.
  const currentTier = tierForMember({
    role: me?.role,
    activatedAt: me?.communityMembership?.activatedAt ?? null,
  });
  const displayName = me?.displayName || "Counselor";

  const totalXp = simStats._sum.xpEarned ?? 0;
  const completedRuns = simStats._count._all;
  const daysToNext =
    me?.role === "ADMIN"
      ? null
      : daysToNextTier(me?.communityMembership?.activatedAt ?? null);

  const fingerprint = computeFingerprint(userId);

  // The public marketing Header used to render here too. It's gone now —
  // member pages should feel like a private destination, not a tab in
  // the brochure site. Everything a member needs (back to dashboard,
  // profile, logout) lives in the sidebar footer.
  return (
    <div className="min-h-screen bg-deep-black text-text-light">
      <BackgroundEffects />
      <div className="relative z-10 lg:flex">
        <InnerCircleSidebar
          onlineCount={onlineCount}
          currentTier={currentTier}
          displayName={displayName}
          totalXp={totalXp}
          completedRuns={completedRuns}
          daysToNext={daysToNext}
          recentActivity={recentActivity}
        />
        <main className="flex-1 min-w-0 pt-14 lg:pt-0">
          {/* Quick-access pill nav. Sits at the top of every member
              page as a sticky strip — the equivalent of "below the
              header" for a space that uses the sidebar instead of
              the marketing Header. Re-uses the same `onlineCount`
              already fetched for the sidebar (no extra round-trip). */}
          <MemberPillNav onlineCount={onlineCount} />
          {children}
        </main>
      </div>
      <SessionWatermark fingerprint={fingerprint} />
    </div>
  );
}
