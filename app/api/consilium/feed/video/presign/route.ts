import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { isAdmin } from "@/lib/community/membership";
import { isR2Configured, getPresignedUploadUrl } from "@/lib/storage/r2";
import { logger } from "@/lib/logger";
import crypto from "crypto";

/**
 * Admin-only presigned URL generator for direct-to-R2 video uploads.
 *
 * The browser uploads the file bytes straight to Cloudflare R2 via the
 * signed PUT URL returned by this endpoint. The server never sees the
 * video body, which means:
 *   1. Railway's edge proxy body-size limit is out of the critical path.
 *      (A 169 MB file previously returned 502 before hitting Next.js.)
 *   2. The Node process doesn't have to buffer the file into memory,
 *      which would OOM on smaller Railway instances.
 *   3. MaxDuration / timeouts are no longer a factor. R2 handles the
 *      long-running upload.
 *
 * Flow:
 *   1. Client calls POST /presign with { filename, size, type }.
 *   2. Server validates admin + quick size/extension checks, mints a
 *      key, returns { uploadUrl, publicUrl, key, expiresIn }.
 *   3. Client PUTs the bytes to `uploadUrl` with matching Content-Type
 *      + Cache-Control headers.
 *   4. Client calls POST /verify with { key } once PUT returns 200.
 *   5. Server HEAD-checks the key exists in R2 and returns the
 *      canonical public URL. The UI stores this on the video post.
 *
 * R2 CORS config is required, see R2-CORS-SETUP.md at project root.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 500 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["mp4", "mov", "m4v", "webm"]);

const EXT_TO_MIME: Record<string, string> = {
  mp4: "video/mp4",
  mov: "video/quicktime",
  m4v: "video/x-m4v",
  webm: "video/webm",
};

interface PresignRequest {
  filename?: unknown;
  size?: unknown;
  type?: unknown;
}

export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const admin = await isAdmin(user.id);
    if (!admin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    if (!isR2Configured()) {
      logger.error(
        "[feed-video-presign] called but R2 is not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, R2_PUBLIC_URL.",
      );
      return NextResponse.json(
        { error: "Storage is not configured. Ask the developer to set R2 env vars." },
        { status: 503 },
      );
    }

    let body: PresignRequest;
    try {
      body = (await request.json()) as PresignRequest;
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const filename = typeof body.filename === "string" ? body.filename : "";
    const size = typeof body.size === "number" ? body.size : 0;
    const reportedType =
      typeof body.type === "string" ? body.type.split(";")[0].trim().toLowerCase() : "";

    if (!filename) {
      return NextResponse.json({ error: "filename is required" }, { status: 400 });
    }
    if (!Number.isFinite(size) || size <= 0) {
      return NextResponse.json({ error: "size must be a positive integer" }, { status: 400 });
    }
    if (size > MAX_BYTES) {
      return NextResponse.json(
        { error: `File too large (max ${MAX_BYTES / (1024 * 1024)}MB)` },
        { status: 400 },
      );
    }

    const rawExt = filename.split(".").pop()?.toLowerCase() ?? "";
    if (!rawExt || !ALLOWED_EXTENSIONS.has(rawExt)) {
      return NextResponse.json(
        { error: "Only mp4, mov, m4v, webm are supported" },
        { status: 400 },
      );
    }

    // The server only sees the browser's declared MIME here, full
    // byte-sniffing happens server-side after upload, in the verify
    // route, by HEAD-ing the object and checking size. For the
    // presigned URL we sign the best-guess content type so R2 stores
    // something playable; if the extension is allowed but the type is
    // not in our map, default to the extension's canonical mime.
    const signedContentType =
      reportedType && reportedType.startsWith("video/") ? reportedType : EXT_TO_MIME[rawExt];

    const key = `feed-videos/fv-${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${rawExt}`;

    try {
      const presigned = await getPresignedUploadUrl(key, signedContentType);
      return NextResponse.json(presigned, { status: 200 });
    } catch (err) {
      logger.error("[feed-video-presign] sign failed", err as Error, { key, size });
      return NextResponse.json(
        { error: "Could not prepare upload. Please try again." },
        { status: 500 },
      );
    }
  });
}

export async function GET() {
  return NextResponse.json({ error: "Use POST" }, { status: 405 });
}
