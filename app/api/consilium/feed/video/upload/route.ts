import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { isAdmin } from "@/lib/community/membership";
import { isR2Configured, uploadToR2 } from "@/lib/storage/r2";
import { logger } from "@/lib/logger";
import crypto from "crypto";

/**
 * Admin-only video upload to R2. Mirrors the voice-notes upload route
 * (same R2 bucket, same magic-byte sniff philosophy) so the feed can
 * carry Kanika-on-camera posts alongside audio and essays.
 *
 * Sniffing is the source of truth — phone cameras / share-sheets
 * regularly arrive with empty MIME, codec-suffixed MIME, or wrong
 * extension. We trust the bytes first, the extension/MIME second.
 *
 * Cap is 500MB. The 50MB voice-note cap doesn't fit a 60-90s 1080p clip.
 * Beyond 500MB the right answer is to encode before upload, not to bump
 * the cap further — Next.js body parsing memory will become the bottleneck.
 */

// Force the Node runtime — the Edge runtime can't buffer multi-hundred-MB
// uploads through formData(). Long timeout for slow connections pushing
// 500MB clips.
export const runtime = "nodejs";
export const maxDuration = 300;
export const dynamic = "force-dynamic";

const MAX_BYTES = 500 * 1024 * 1024;

const ALLOWED_EXTENSIONS = new Set(["mp4", "mov", "m4v", "webm"]);

const ALLOWED_BASE_MIMES = new Set([
  "video/mp4",
  "video/quicktime",
  "video/x-m4v",
  "video/webm",
]);

const SNIFFED_TO_EXT: Record<string, string> = {
  "video/mp4": "mp4",
  "video/quicktime": "mov",
  "video/webm": "webm",
};

function sniffVideo(buffer: Buffer): string | null {
  if (buffer.length < 12) return null;

  // ISO-BMFF (mp4, mov, m4v): bytes 4..7 are "ftyp".
  if (
    buffer[4] === 0x66 &&
    buffer[5] === 0x74 &&
    buffer[6] === 0x79 &&
    buffer[7] === 0x70
  ) {
    // The 4 bytes immediately after "ftyp" identify the brand:
    //   "qt  " = QuickTime (.mov)
    //   "isom"/"mp42"/"avc1"/"M4V " = MP4 family
    const brand = buffer.subarray(8, 12).toString("ascii");
    if (brand.startsWith("qt")) return "video/quicktime";
    return "video/mp4";
  }

  // Matroska/WebM EBML magic: 1A 45 DF A3
  if (
    buffer[0] === 0x1a &&
    buffer[1] === 0x45 &&
    buffer[2] === 0xdf &&
    buffer[3] === 0xa3
  ) {
    return "video/webm";
  }

  return null;
}

function baseMime(mime: string): string {
  return mime.split(";")[0].trim().toLowerCase();
}

export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const admin = await isAdmin(user.id);
    if (!admin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    if (!isR2Configured()) {
      logger.error(
        "[feed-video] upload attempted but R2 is not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, R2_PUBLIC_URL.",
      );
      return NextResponse.json(
        { error: "Storage is not configured. Ask the developer to set R2 env vars." },
        { status: 503 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("video") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No video file provided" }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: `File too large (max ${MAX_BYTES / (1024 * 1024)}MB)` },
        { status: 400 },
      );
    }

    const reportedMime = baseMime(file.type || "");
    const rawExt = file.name.split(".").pop()?.toLowerCase() || "";

    const buffer = Buffer.from(await file.arrayBuffer());
    const sniffed = sniffVideo(buffer);

    if (!sniffed) {
      logger.warn("[feed-video] upload rejected — sniff failed", {
        name: file.name,
        mime: file.type,
        size: file.size,
      });
      return NextResponse.json(
        { error: "File does not appear to be a valid video file (mp4, mov, or webm)" },
        { status: 400 },
      );
    }

    let finalExt: string;
    if (rawExt && ALLOWED_EXTENSIONS.has(rawExt)) {
      finalExt = rawExt;
    } else {
      finalExt = SNIFFED_TO_EXT[sniffed] ?? "bin";
    }

    if (reportedMime && !ALLOWED_BASE_MIMES.has(reportedMime)) {
      logger.info("[feed-video] accepting via sniff despite unknown MIME", {
        reportedMime,
        sniffed,
        name: file.name,
      });
    }

    const storeContentType =
      reportedMime && ALLOWED_BASE_MIMES.has(reportedMime) ? reportedMime : sniffed;

    const key = `feed-videos/fv-${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${finalExt}`;

    try {
      const result = await uploadToR2(key, buffer, storeContentType);
      return NextResponse.json(
        { success: true, url: result.url, key: result.key },
        { status: 201 },
      );
    } catch (err) {
      logger.error("[feed-video] R2 upload failed", err as Error, {
        key,
        size: file.size,
        mime: file.type,
      });
      return NextResponse.json(
        { error: "Upload failed. Please try again." },
        { status: 502 },
      );
    }
  });
}
