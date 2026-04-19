/**
 * Whitelist for video / poster URLs that flow into raw <video src>,
 * <img src>, or CSS background-image. Without this, an admin (or anyone
 * who compromises an admin session) can paste `javascript:...` or a
 * `data:text/html,...` URL and turn the player into an XSS vector.
 *
 * Allowed:
 *   - https:// URLs hosted on the configured R2 bucket
 *   - https:// URLs on youtube.com / youtu.be (we render those via iframe
 *     elsewhere; included here for the URL-field validator)
 *
 * Disallowed: everything else, including http://, javascript:, data:,
 * vbscript:, file:, blob:, and any unknown host.
 */

const ALLOWED_HOSTS = new Set<string>([
  "youtube.com",
  "www.youtube.com",
  "youtu.be",
  "m.youtube.com",
]);

function r2Hostname(): string | null {
  const url = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || process.env.R2_PUBLIC_URL;
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

export function isSafeMediaUrl(raw: string | null | undefined): boolean {
  if (!raw) return false;
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return false;
  }
  if (parsed.protocol !== "https:") return false;
  if (ALLOWED_HOSTS.has(parsed.hostname)) return true;
  const r2 = r2Hostname();
  if (r2 && parsed.hostname === r2) return true;
  return false;
}

/** Returns the URL if it passes the whitelist, otherwise null. */
export function safeMediaUrl(raw: string | null | undefined): string | null {
  return isSafeMediaUrl(raw) ? (raw as string) : null;
}
