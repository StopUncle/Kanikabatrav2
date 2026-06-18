/**
 * GET /api/admin/email-stats: marketing email engagement + segmentation.
 *
 * Always returns per-sequence open/click rates. With ?engaged=<sequence>
 * (&type=open|click) it also returns the distinct recipients who engaged,
 * the segmentation primitive for a targeted follow-up campaign.
 *
 * Admin only.
 */

import { NextResponse, type NextRequest } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import {
  getEmailEngagementStats,
  getEngagedEmails,
} from "@/lib/email-tracking";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const sp = request.nextUrl.searchParams;
  const engaged = sp.get("engaged");
  const type = sp.get("type") === "click" ? "CLICK" : "OPEN";

  const stats = await getEmailEngagementStats();

  if (engaged) {
    const emails = await getEngagedEmails(engaged, type);
    return NextResponse.json({
      stats,
      engaged: { sequence: engaged, type, count: emails.length, emails },
    });
  }

  return NextResponse.json({ stats });
}
