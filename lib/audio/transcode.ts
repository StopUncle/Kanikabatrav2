import { spawn } from "node:child_process";
import { logger } from "@/lib/logger";

/**
 * Transcode an audio buffer of any supported input format to MP3.
 *
 * Why this exists: the browser's MediaRecorder API (used by the
 * VoiceRecorder component) emits webm/Opus by default. iOS Safari
 * refuses to play webm in an <audio> tag. mp3 is the only format
 * that plays universally on every browser + OS we care about.
 *
 * Implementation notes:
 *  - Uses pipes (no temp files) so we don't hit Railway's /tmp quota
 *    on large uploads or leak files on crash.
 *  - 96 kbps mono is plenty for spoken voice and keeps file sizes
 *    reasonable (~1 MB per minute).
 *  - Hard 60s timeout — if ffmpeg hangs we throw rather than block
 *    the upload request indefinitely.
 *  - Requires ffmpeg on PATH. Provided by `ffmpeg-full` in
 *    nixpacks.toml (Railway). Local dev needs ffmpeg installed
 *    separately (brew install ffmpeg / apt install ffmpeg / etc).
 */
export async function transcodeToMp3(input: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const args = [
      "-hide_banner",
      "-loglevel", "error",
      "-i", "pipe:0",
      "-vn", // strip video tracks (webm from MediaRecorder can carry one)
      "-codec:a", "libmp3lame",
      "-b:a", "96k",
      "-ac", "1", // mono
      "-ar", "44100",
      "-f", "mp3",
      "pipe:1",
    ];

    const ff = spawn("ffmpeg", args, { stdio: ["pipe", "pipe", "pipe"] });

    const chunks: Buffer[] = [];
    let stderr = "";
    let settled = false;

    const timeout = setTimeout(() => {
      if (settled) return;
      settled = true;
      try {
        ff.kill("SIGKILL");
      } catch {
        // Process may already be dead.
      }
      reject(new Error("ffmpeg timed out after 60s"));
    }, 60_000);

    ff.stdout.on("data", (c: Buffer) => chunks.push(c));
    ff.stderr.on("data", (c: Buffer) => {
      stderr += c.toString();
    });

    ff.on("error", (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      logger.error("[transcode] ffmpeg spawn failed", err, { stderr });
      reject(new Error(`ffmpeg spawn failed: ${err.message}`));
    });

    ff.on("close", (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      if (code !== 0) {
        logger.error("[transcode] ffmpeg exited non-zero", undefined, {
          code,
          stderr: stderr.slice(0, 500),
        });
        reject(new Error(`ffmpeg exited ${code}: ${stderr.slice(0, 200)}`));
        return;
      }
      resolve(Buffer.concat(chunks));
    });

    ff.stdin.write(input);
    ff.stdin.end();
  });
}
