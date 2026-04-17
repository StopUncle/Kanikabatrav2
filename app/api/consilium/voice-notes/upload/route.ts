import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { isAdmin } from "@/lib/community/membership";
import { isR2Configured, uploadToR2 } from "@/lib/storage/r2";
import { logger } from "@/lib/logger";
import crypto from "crypto";

const ALLOWED_EXTENSIONS = new Set([
  "mp3",
  "mp4",
  "m4a",
  "wav",
  "ogg",
  "webm",
  "aac",
  "caf",
]);

const ALLOWED_BASE_MIMES = new Set([
  "audio/mpeg",
  "audio/mp3",
  "audio/mp4",
  "audio/m4a",
  "audio/x-m4a",
  "audio/aac",
  "audio/wav",
  "audio/x-wav",
  "audio/wave",
  "audio/ogg",
  "audio/webm",
  "audio/x-caf",
  "video/mp4",
]);

// Sniffed MIME → canonical extension. Used when the extension/MIME on the
// incoming file is missing or clearly wrong (common from iPhone Safari).
const SNIFFED_TO_EXT: Record<string, string> = {
  "audio/mpeg": "mp3",
  "audio/mp4": "m4a",
  "audio/ogg": "ogg",
  "audio/wav": "wav",
  "audio/webm": "webm",
};

function sniffAudio(buffer: Buffer): string | null {
  if (buffer.length < 12) return null;

  if (buffer[0] === 0x49 && buffer[1] === 0x44 && buffer[2] === 0x33) return "audio/mpeg";
  if (buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0) return "audio/mpeg";
  if (buffer[0] === 0x4f && buffer[1] === 0x67 && buffer[2] === 0x67 && buffer[3] === 0x53) return "audio/ogg";
  if (
    buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
    buffer[8] === 0x57 && buffer[9] === 0x41 && buffer[10] === 0x56 && buffer[11] === 0x45
  ) return "audio/wav";
  if (buffer[4] === 0x66 && buffer[5] === 0x74 && buffer[6] === 0x79 && buffer[7] === 0x70) return "audio/mp4";
  if (buffer[0] === 0x1a && buffer[1] === 0x45 && buffer[2] === 0xdf && buffer[3] === 0xa3) return "audio/webm";

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
        "[voice-notes] upload attempted but R2 is not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, R2_PUBLIC_URL.",
      );
      return NextResponse.json(
        { error: "Storage is not configured. Ask the developer to set R2 env vars." },
        { status: 503 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("audio") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 50MB)" }, { status: 400 });
    }

    const reportedMime = baseMime(file.type || "");
    const rawExt = file.name.split(".").pop()?.toLowerCase() || "";

    // Read the buffer once so we can sniff magic bytes. Sniffing is the source
    // of truth — extension and MIME from iOS Safari are often wrong (recorder
    // returns "audio/mp4;codecs=mp4a.40.2", share-sheet drops extension entirely,
    // etc.) so we trust the bytes first.
    const buffer = Buffer.from(await file.arrayBuffer());
    const sniffed = sniffAudio(buffer);

    if (!sniffed) {
      logger.warn("[voice-notes] upload rejected — sniff failed", {
        name: file.name,
        mime: file.type,
        size: file.size,
      });
      return NextResponse.json(
        { error: "File does not appear to be a valid audio file" },
        { status: 400 },
      );
    }

    // Pick the extension we'll store under. Order of preference:
    //   1. raw extension if it's in the allow-list AND consistent with sniff
    //   2. canonical extension derived from sniffed type
    //   3. sniffed type's default (safety net)
    let finalExt: string;
    if (rawExt && ALLOWED_EXTENSIONS.has(rawExt)) {
      finalExt = rawExt;
    } else {
      finalExt = SNIFFED_TO_EXT[sniffed] ?? "bin";
    }

    // Accept if EITHER the reported MIME is in our allowlist OR the sniff passed.
    // iOS commonly reports MIMEs we don't have verbatim (codec suffixes, x-m4a
    // variants, empty string). The sniff is authoritative.
    if (reportedMime && !ALLOWED_BASE_MIMES.has(reportedMime)) {
      // MIME explicitly disallowed but sniff succeeded → still accept, just log
      // for visibility in case a new format shows up in the wild.
      logger.info("[voice-notes] accepting via sniff despite unknown MIME", {
        reportedMime,
        sniffed,
        name: file.name,
      });
    }

    const storeContentType = reportedMime && ALLOWED_BASE_MIMES.has(reportedMime)
      ? reportedMime
      : sniffed;

    const key = `voice-notes/vn-${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${finalExt}`;

    try {
      const result = await uploadToR2(key, buffer, storeContentType);
      return NextResponse.json(
        { success: true, url: result.url, key: result.key },
        { status: 201 },
      );
    } catch (err) {
      logger.error("[voice-notes] R2 upload failed", err as Error, {
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
