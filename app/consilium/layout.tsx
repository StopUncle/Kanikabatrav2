import { Metadata } from "next";
import { resolveActiveUserId } from "@/lib/auth/resolve-user";
import { prisma } from "@/lib/prisma";
import TrialSubscribeButton from "@/components/consilium/TrialSubscribeButton";

export const metadata: Metadata = {
  title: "The Consilium | Kanika Batra",
  description: "A private council for dark psychology education and personal transformation.",
};

export default async function InnerCircleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let trialBanner: { daysLeft: number } | null = null;

  // Ban-aware resolver returns null for banned / tokenVersion-revoked
  // users, which is exactly what we want — they shouldn't see the trial
  // countdown banner anyway since they don't have an active membership.
  const userId = await resolveActiveUserId();
  if (userId) {
    const membership = await prisma.communityMembership.findUnique({
      where: { userId },
      select: { billingCycle: true, expiresAt: true, status: true },
    });

    if (
      membership?.billingCycle === "trial" &&
      membership.status === "ACTIVE" &&
      membership.expiresAt
    ) {
      const daysLeft = Math.ceil(
        (membership.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
      );
      trialBanner = { daysLeft };
    }
  }

  return (
    <>
      {trialBanner && (
        <div className="fixed top-20 left-0 right-0 z-40 bg-accent-gold/10 border-b border-accent-gold/20 px-4 py-2 text-center">
          <p className="text-sm text-text-light">
            <span className="text-accent-gold font-medium">Free trial:</span> {trialBanner.daysLeft} days remaining &mdash;
            <TrialSubscribeButton />
          </p>
        </div>
      )}
      {children}
    </>
  );
}
