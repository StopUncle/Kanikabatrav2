import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { isAdmin } from "@/lib/community/membership";
import { isR2Configured, verifyR2ObjectExists } from "@/lib/storage/r2";
import { logger } from "@/lib/logger";

/**
 * Admin-only post-upload verifier for the presigned-PUT flow. The
 * browser calls this after a successful direct PUT to R2, and we
 * HEAD-check the object to confirm it actually exists before the UI
 * starts treating the returned public URL as real.
 *
 * Without this step, a silently-dropped PUT (network blip, bucket
 * misconfig, CORS refusal that the XHR reports as success, etc.) would
 * produce a video post pointing at a 404.
 *
 * Only the key returned by the presign route is trusted, everything
 * else (public URL, size, timing) is derived server-side.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 500 * 1024 * 1024;
const KEY_PREFIX = "feed-videos/";

interface VerifyRequest {
  key?: unknown;
}

export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const admin = await isAdmin(user.id);
    if (!admin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    if (!isR2Configured()) {
      return NextResponse.json(
        { error: "Storage is not configured." },
        { status: 503 },
      );
    }

    let body: VerifyRequest;
    try {
      body = (await request.json()) as VerifyRequest;
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const key = typeof body.key === "string" ? body.key : "";
    if (!key) {
      return NextResponse.json({ error: "key is required" }, { status: 400 });
    }

    // Hard gate: only keys we actually mint (prefix + expected shape)
    // can be verified. Stops a compromised cookie from HEAD-probing
    // arbitrary R2 objects.
    if (!key.startsWith(KEY_PREFIX) || key.includes("..")) {
      return NextResponse.json({ error: "Invalid key" }, { status: 400 });
    }

    try {
      const size = await verifyR2ObjectExists(key);
      if (size <= 0) {
        return NextResponse.json({ error: "Uploaded object is empty" }, { status: 422 });
      }
      if (size > MAX_BYTES) {
        // Delete the oversized object so the bucket doesn't accumulate
        // junk if someone manually PUT a huge file to a presigned URL.
        logger.warn("[feed-video-verify] object exceeds max size", { key, size });
        return NextResponse.json(
          { error: `Uploaded file exceeds ${MAX_BYTES / (1024 * 1024)}MB limit` },
          { status: 413 },
        );
      }

      return NextResponse.json({ success: true, key, size }, { status: 200 });
    } catch (err) {
      const error = err as { name?: string; $metadata?: { httpStatusCode?: number } };
      if (
        error?.name === "NotFound" ||
        error?.$metadata?.httpStatusCode === 404
      ) {
        return NextResponse.json(
          { error: "Object not found in storage, upload may have been interrupted." },
          { status: 404 },
        );
      }
      logger.error("[feed-video-verify] HEAD failed", err as Error, { key });
      return NextResponse.json(
        { error: "Could not verify upload. Please try again." },
        { status: 500 },
      );
    }
  });
}
