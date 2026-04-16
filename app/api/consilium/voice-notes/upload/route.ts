import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { isAdmin } from "@/lib/community/membership";
import { isR2Configured, uploadToR2 } from "@/lib/storage/r2";
import { logger } from "@/lib/logger";
import crypto from "crypto";

const ALLOWED_EXTENSIONS = ["mp3", "mp4", "m4a", "wav", "ogg", "webm"];
const ALLOWED_MIME_TYPES = [
  "audio/mpeg",
  "audio/mp4",
  "audio/x-m4a",
  "audio/wav",
  "audio/ogg",
  "audio/webm",
  "video/mp4",
];

// First few bytes (magic numbers) for each supported audio format.
// Extension and MIME type can both be spoofed — this is a belt-and-braces
// check that the file actually starts with the right signature.
function sniffAudio(buffer: Buffer): string | null {
  if (buffer.length < 12) return null;

  // ID3v2 tag (MP3) — starts with "ID3"
  if (buffer[0] === 0x49 && buffer[1] === 0x44 && buffer[2] === 0x33) return "audio/mpeg";
  // MP3 frame header — starts with 0xFF 0xFB/0xFA/0xF3/0xF2
  if (buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0) return "audio/mpeg";
  // OGG — "OggS"
  if (buffer[0] === 0x4f && buffer[1] === 0x67 && buffer[2] === 0x67 && buffer[3] === 0x53) return "audio/ogg";
  // WAV — "RIFF....WAVE"
  if (
    buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
    buffer[8] === 0x57 && buffer[9] === 0x41 && buffer[10] === 0x56 && buffer[11] === 0x45
  ) return "audio/wav";
  // MP4/M4A — "ftyp" at byte 4
  if (buffer[4] === 0x66 && buffer[5] === 0x74 && buffer[6] === 0x79 && buffer[7] === 0x70) return "audio/mp4";
  // WebM/Matroska — 0x1A 0x45 0xDF 0xA3
  if (buffer[0] === 0x1a && buffer[1] === 0x45 && buffer[2] === 0xdf && buffer[3] === 0xa3) return "audio/webm";

  return null;
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

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: mp3, mp4, m4a, wav, ogg, webm" },
        { status: 400 },
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid audio format" },
        { status: 400 },
      );
    }

    // Read the buffer once and use it for both sniffing and upload.
    const buffer = Buffer.from(await file.arrayBuffer());

    // Magic-number sniff: reject files whose extension/MIME claim one format
    // but whose bytes say another. Extension + MIME + magic all have to agree.
    const sniffed = sniffAudio(buffer);
    if (!sniffed) {
      return NextResponse.json(
        { error: "File does not appear to be a valid audio file" },
        { status: 400 },
      );
    }

    const key = `voice-notes/vn-${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;

    try {
      const result = await uploadToR2(key, buffer, file.type);
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
