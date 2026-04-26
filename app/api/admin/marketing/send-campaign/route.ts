import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import {
  CAMPAIGNS,
  enqueueCampaignToAllOptedIn,
  type CampaignId,
} from "@/lib/email-campaigns";

/**
 * POST /api/admin/marketing/send-campaign
 *
 * Body: { campaignId: CampaignId, scheduledAt?: ISO-string }
 *
 * Enqueues the campaign into EmailQueue, one row per opted-in user,
 * staggered by 30 seconds each so a 1k-recipient blast spreads over
 * ~8 hours and doesn't blow up SMTP rate limits.
 *
 * Idempotent — re-running on the same campaign skips users who
 * already have a PENDING or SENT row for that campaignId.
 */
export async function POST(req: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const body = await req.json().catch(() => ({}));
  const campaignId = body?.campaignId as CampaignId | undefined;
  if (!campaignId || !(campaignId in CAMPAIGNS)) {
    return NextResponse.json(
      { error: "Unknown campaignId" },
      { status: 400 },
    );
  }

  const scheduledAt = body?.scheduledAt
    ? new Date(body.scheduledAt)
    : new Date();
  if (Number.isNaN(scheduledAt.getTime())) {
    return NextResponse.json({ error: "Invalid scheduledAt" }, { status: 400 });
  }

  try {
    const result = await enqueueCampaignToAllOptedIn(campaignId, scheduledAt);
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    console.error("[admin/send-campaign]", e);
    return NextResponse.json(
      { error: "Enqueue failed" },
      { status: 500 },
    );
  }
}
