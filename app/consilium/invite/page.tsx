import { redirect } from "next/navigation";
import { optionalServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import BackgroundEffects from "@/components/BackgroundEffects";
import {
  getOrCreateReferralCode,
  getReferralCounts,
  getReferralLeaderboard,
  REFERRER_REWARD_CENTS,
} from "@/lib/referrals";
import ReferralLinkPanel from "@/components/referrals/ReferralLinkPanel";
import { Trophy } from "lucide-react";

export const metadata = {
  title: "Invite friends, The Consilium | Kanika Batra",
  description:
    "Bring someone into The Consilium. They join, you both get a month free.",
};

/**
 * Member-only referral page. Surfaces the member's unique link, their
 * conversion counts, and the top-10 leaderboard. Gated to authenticated
 * members; non-members bounce to /consilium where they can join first.
 */
export default async function InvitePage() {
  const userId = await optionalServerAuth();
  if (!userId) {
    redirect("/register?returnTo=/consilium/invite");
  }

  const membership = await prisma.communityMembership.findUnique({
    where: { userId },
    select: { status: true },
  });
  if (!membership || membership.status !== "ACTIVE") {
    redirect("/consilium");
  }

  const [code, counts, leaderboard, baseUrl] = await Promise.all([
    getOrCreateReferralCode(userId),
    getReferralCounts(userId),
    getReferralLeaderboard(10),
    Promise.resolve(process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com"),
  ]);

  const url = `${baseUrl}/consilium?ref=${code}`;
  const rewardDollars = (REFERRER_REWARD_CENTS / 100).toFixed(0);

  return (
    <div className="min-h-screen bg-deep-black text-text-light">
      <BackgroundEffects />

      <div className="relative z-10 max-w-2xl mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-10">
          <span className="text-warm-gold text-xs tracking-[0.3em] uppercase font-medium">
            Member Benefit
          </span>
          <h1 className="text-4xl font-extralight tracking-wider uppercase mt-3 mb-3">
            <span className="gradient-text-gold">Bring Someone In</span>
          </h1>
          <div className="w-16 h-px bg-warm-gold/30 mx-auto mt-4 mb-5" />
          <p className="text-text-gray font-light max-w-md mx-auto leading-relaxed">
            Share your link. They join The Consilium, you get a free
            month credited to your next renewal. No cap. Bring as many
            as you like.
          </p>
        </div>

        <ReferralLinkPanel
          code={code}
          url={url}
          converted={counts.converted}
          pending={counts.pending}
          rewardDollars={rewardDollars}
        />

        <div className="mt-12">
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={16} className="text-warm-gold" strokeWidth={1.5} />
            <h2 className="text-sm uppercase tracking-[0.25em] text-text-gray">
              Top Recruiters This Month
            </h2>
          </div>
          {leaderboard.length === 0 ? (
            <div className="p-6 bg-deep-black/40 border border-warm-gold/10 rounded-2xl text-center">
              <p className="text-text-gray font-light text-sm">
                No one has converted a referral yet. First seat at the
                top is yours for the taking.
              </p>
            </div>
          ) : (
            <ol className="space-y-1 bg-deep-black/40 border border-warm-gold/15 rounded-2xl overflow-hidden">
              {leaderboard.map((row, i) => (
                <li
                  key={row.userId}
                  className={`flex items-center justify-between px-5 py-3 ${
                    i === 0
                      ? "bg-warm-gold/[0.06]"
                      : i % 2 === 0
                        ? "bg-white/[0.02]"
                        : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-sm tabular-nums w-6 ${
                        i < 3 ? "text-warm-gold" : "text-text-gray/60"
                      }`}
                    >
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-text-light font-light text-sm">
                      {row.displayName}
                    </span>
                  </div>
                  <span className="text-text-gray text-xs tabular-nums">
                    {row.convertedCount}{" "}
                    {row.convertedCount === 1 ? "join" : "joins"}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="mt-12 text-center">
          <p className="text-text-gray/60 text-xs leading-relaxed max-w-md mx-auto">
            Referrals credit on your friend&apos;s first successful
            payment. We email you when a credit lands and you can see
            the running total above. No fine print, no clawbacks unless
            the new member refunds within 30 days.
          </p>
        </div>
      </div>
    </div>
  );
}
