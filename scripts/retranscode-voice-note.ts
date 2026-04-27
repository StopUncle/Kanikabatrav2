/**
 * One-shot fix: download an existing non-mp3 voice note from R2,
 * transcode to mp3, upload as a new key, and update the FeedPost row
 * to point at the new URL.
 *
 * Why: voice notes recorded in browser before the upload pipeline
 * gained server-side transcoding are stored as webm/Opus. iOS Safari
 * refuses to play webm in <audio>, so any iOS member sees a silent
 * player. This script retroactively fixes those rows.
 *
 * Usage:
 *   DATABASE_URL=<prod>  R2_ACCOUNT_ID=...  R2_ACCESS_KEY_ID=...  \
 *   R2_SECRET_ACCESS_KEY=...  R2_BUCKET=kanika-media  \
 *   R2_PUBLIC_URL=https://pub-...r2.dev  \
 *   npx tsx scripts/retranscode-voice-note.ts <feedPostId>
 *
 * Idempotent on key collision (random hex suffix). Skips posts that
 * already point at .mp3.
 */

import { PrismaClient } from "@prisma/client";
import crypto from "node:crypto";
import { transcodeToMp3 } from "../lib/audio/transcode";
import { uploadToR2 } from "../lib/storage/r2";

const prisma = new PrismaClient();

async function main() {
  const postId = process.argv[2];
  if (!postId) {
    console.error("Usage: npx tsx scripts/retranscode-voice-note.ts <feedPostId>");
    process.exit(1);
  }

  const post = await prisma.feedPost.findUnique({
    where: { id: postId },
    select: { id: true, title: true, type: true, voiceNoteUrl: true },
  });
  if (!post) {
    console.error(`Post ${postId} not found`);
    process.exit(1);
  }
  if (post.type !== "VOICE_NOTE") {
    console.error(`Post ${postId} is type ${post.type}, expected VOICE_NOTE`);
    process.exit(1);
  }
  if (!post.voiceNoteUrl) {
    console.error(`Post ${postId} has no voiceNoteUrl — nothing to transcode`);
    process.exit(1);
  }
  if (post.voiceNoteUrl.endsWith(".mp3")) {
    console.log(`Already mp3 — nothing to do: ${post.voiceNoteUrl}`);
    return;
  }

  console.log(`Fetching: ${post.voiceNoteUrl}`);
  const res = await fetch(post.voiceNoteUrl);
  if (!res.ok) throw new Error(`Fetch failed ${res.status}`);
  const sourceBuf = Buffer.from(await res.arrayBuffer());
  console.log(`Downloaded ${sourceBuf.length.toLocaleString()} bytes`);

  console.log("Transcoding to mp3…");
  const t0 = Date.now();
  const mp3Buf = await transcodeToMp3(sourceBuf);
  console.log(
    `→ ${mp3Buf.length.toLocaleString()} bytes mp3 in ${(Date.now() - t0) / 1000}s`,
  );

  const newKey = `voice-notes/vn-${Date.now()}-${crypto.randomBytes(6).toString("hex")}.mp3`;
  console.log(`Uploading to R2: ${newKey}`);
  const result = await uploadToR2(newKey, mp3Buf, "audio/mpeg");
  console.log(`Uploaded: ${result.url}`);

  await prisma.feedPost.update({
    where: { id: post.id },
    data: { voiceNoteUrl: result.url },
  });
  console.log(`Updated FeedPost ${post.id}.voiceNoteUrl → ${result.url}`);
  console.log("Done. (Old webm in R2 is orphaned — safe to leave or sweep later.)");

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
