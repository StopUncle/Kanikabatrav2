/**
 * The welcome video Kanika records for new members.
 *
 * Read server-side from WELCOME_VIDEO_URL (preferred; changing it on
 * Railway restarts the app, no rebuild needed) with the legacy
 * NEXT_PUBLIC_ var as fallback so an already-set value keeps working.
 * Returns null while the asset doesn't exist; every consumer must
 * treat null as "skip the video beat entirely".
 *
 * If this ever needs live admin editing, swap the body for a
 * SiteSetting read; callers don't change.
 */
export function getWelcomeVideoUrl(): string | null {
  return (
    process.env.WELCOME_VIDEO_URL ||
    process.env.NEXT_PUBLIC_WELCOME_VIDEO_URL ||
    null
  );
}
