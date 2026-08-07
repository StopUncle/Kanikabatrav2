import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { getWaitingCount } from "@/lib/studio/inbox";

/**
 * The badge number: unanswered questions plus threads with unread member
 * messages. Two counts, no payload, so the app can poll it on every focus
 * without thinking about cost.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const denied = await requireAdminSession();
  if (denied) return denied;

  const waiting = await getWaitingCount();
  return NextResponse.json(
    { waiting },
    { headers: { "Cache-Control": "no-store" } },
  );
}
