/**
 * POST /api/admin/content/repurpose — turn one hook into Consilium assets.
 *
 * Auth: admin session. The output is drafts; nothing is published here.
 * Kanika reviews/edits in the Content Studio and publishes the insight +
 * prompt to the feed via the existing /api/consilium/feed/posts route
 * (which fans out push to members).
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminSession } from "@/lib/admin/auth";
import { repurposeHook, RepurposeInputError } from "@/lib/content/repurpose";
import { logger } from "@/lib/logger";

export const maxDuration = 120;

const Body = z.object({ hook: z.string().min(1).max(4000) });

export async function POST(request: NextRequest) {
  const denied = await requireAdminSession();
  if (denied) return denied;

  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await request.json());
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid payload", detail: (err as Error).message },
      { status: 400 },
    );
  }

  try {
    const result = await repurposeHook(body.hook);
    return NextResponse.json({ result });
  } catch (err) {
    if (err instanceof RepurposeInputError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    logger.error(
      "[content/repurpose] failed",
      err instanceof Error ? err : new Error(String(err)),
    );
    return NextResponse.json(
      { error: "Could not generate. Try again." },
      { status: 502 },
    );
  }
}
