import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { getReferralLeaderboard } from "@/lib/referrals";

/**
 * Top-10 referrers by converted count. Member-only, the leaderboard is
 * an internal social signal not a public marketing surface. Display
 * names are sanitised by getReferralLeaderboard so members cannot dox
 * each other.
 */
export async function GET(request: NextRequest) {
  return requireAuth(request, async () => {
    const rows = await getReferralLeaderboard(10);
    return NextResponse.json({ rows });
  });
}
