import { NextResponse } from "next/server";
import { getCommunityStats } from "@/lib/community/stats";

/**
 * Public community stats. Reuses the same 5-minute cached helper as the
 * server-rendered SocialProofTicker so client + server consumers see the
 * same numbers without doubling DB load.
 *
 * Cache headers: we tell browsers + CDN to cache for 5 minutes to match
 * the unstable_cache TTL. Any front-end consumer (e.g. /quiz/results
 * client component) can call this on mount without worrying about
 * hammering the DB.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const stats = await getCommunityStats();
  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=300",
    },
  });
}
