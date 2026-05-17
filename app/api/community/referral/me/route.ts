import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import {
  getOrCreateReferralCode,
  getReferralCounts,
  REFERRER_REWARD_CENTS,
} from "@/lib/referrals";

/**
 * Member-facing referral info. Lazy-generates a referral code on first
 * call so existing members do not need a back-fill migration.
 *
 * Returns the code, the shareable URL, and conversion counts. The UI at
 * /consilium/invite calls this on mount.
 *
 * Gated to authenticated users only, the referral link is a member
 * benefit and visiting /consilium/invite without a session bounces to
 * /register at the page level.
 */
export async function GET(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const code = await getOrCreateReferralCode(user.id);
    const counts = await getReferralCounts(user.id);
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";
    const url = `${baseUrl}/consilium?ref=${code}`;
    return NextResponse.json({
      code,
      url,
      rewardCents: REFERRER_REWARD_CENTS,
      ...counts,
    });
  });
}
