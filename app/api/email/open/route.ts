/**
 * GET /api/email/open?d=<payload>: the 1x1 open pixel.
 *
 * Decodes the tracking payload, records an OPEN event, and always returns a
 * transparent GIF with no-cache headers (so re-opens re-fire). Never errors:
 * a tracking miss must not show a broken image in the recipient's inbox.
 */

import { type NextRequest } from "next/server";
import {
  decodeTrackingPayload,
  recordEmailEvent,
  TRACKING_PIXEL_GIF,
} from "@/lib/email-tracking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("d");
  if (token) {
    const ctx = decodeTrackingPayload(token);
    if (ctx) await recordEmailEvent("OPEN", ctx);
  }

  return new Response(new Uint8Array(TRACKING_PIXEL_GIF), {
    status: 200,
    headers: {
      "Content-Type": "image/gif",
      "Content-Length": String(TRACKING_PIXEL_GIF.length),
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
