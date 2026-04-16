import { redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { checkMembership } from "@/lib/community/membership";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import InnerCircleSidebar from "@/components/consilium/InnerCircleSidebar";
import { prisma } from "@/lib/prisma";
import {
  monthsSince,
  tierFromMonths,
} from "@/components/consilium/badge-tiers";

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

  // Count members active in the last 5 minutes for "online" indicator
  const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
  const [onlineCount, me] = await Promise.all([
    prisma.user.count({
      where: {
        communityMembership: { status: "ACTIVE" },
        updatedAt: { gte: fiveMinAgo },
      },
    }),
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        displayName: true,
        communityMembership: {
          select: { activatedAt: true },
        },
      },
    }),
  ]);

  // Current tier is a pure function of the activatedAt timestamp — no
  // DB column to keep in sync, no cron to run, no drift.
  const months = monthsSince(me?.communityMembership?.activatedAt ?? null);
  const currentTier = tierFromMonths(months);
  const displayName = me?.displayName || "Counselor";

  return (
    <div className="min-h-screen bg-deep-black text-text-light">
      <BackgroundEffects />
      <Header />
      <div className="relative z-10 lg:flex pt-16 sm:pt-20">
        <InnerCircleSidebar
          onlineCount={onlineCount}
          currentTier={currentTier}
          displayName={displayName}
        />
        <main className="flex-1 min-w-0 pt-10 lg:pt-0">
          {children}
        </main>
      </div>
    </div>
  );
}
