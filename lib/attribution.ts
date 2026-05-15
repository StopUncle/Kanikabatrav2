/**
 * Acquisition attribution — capture, persist, retrieve.
 *
 * Lifecycle:
 *   1. <AttributionTracker /> mounts on every page (root layout) and
 *      calls captureAttribution() on first load. If URL has UTM/click
 *      IDs OR the user came from a referrer, we persist the snapshot
 *      to localStorage. Subsequent navigations skip — first-touch wins.
 *   2. At register / quiz-save, the client reads the snapshot and
 *      sends it as part of the body.
 *   3. The server merges client payload + server-derived signals
 *      (ipCountry from request headers) before writing to DB.
 *
 * Why localStorage and not sessionStorage:
 *   A user clicks an Instagram ad → lands on /quiz → takes quiz → 20
 *   minutes later registers. sessionStorage survives that. But if they
 *   close the tab and reopen later from history, sessionStorage is
 *   gone — localStorage isn't, so we still attribute correctly.
 *
 * Why first-touch wins:
 *   If a user clicks Instagram → /quiz, then later navigates to /book
 *   directly (no UTMs), we don't want the second visit to overwrite
 *   the original Instagram attribution with "(direct)". The first
 *   touch is the real source.
 */

const STORAGE_KEY = "kb-attribution-v1";
// Attribution expires after 30 days — long enough to cover the
// quiz-then-register-later flow, short enough that a stale UTM from
// last quarter doesn't pollute today's signups.
const ATTRIBUTION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export interface AttributionPayload {
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  utmTerm?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
  ttclid?: string | null;
  referrer?: string | null;
  landingPage?: string | null;
  userAgent?: string | null;
  language?: string | null;
  timezone?: string | null;
  capturedAt?: string | null;
}

interface StoredAttribution extends AttributionPayload {
  capturedAt: string;
}

function trim(s: string | null | undefined, max = 500): string | null {
  if (!s) return null;
  const t = s.trim();
  if (!t) return null;
  return t.length > max ? t.slice(0, max) : t;
}

/**
 * Read URL params + browser navigator + document.referrer and return
 * a payload. Pure read — no side effects. Safe to call repeatedly.
 *
 * Returns an object even when nothing is present (all fields null) so
 * the caller can decide whether to persist based on signal strength.
 */
export function readClientAttribution(): AttributionPayload {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  // Some platforms uppercase or mix-case UTM keys. Normalize lookup.
  const get = (k: string): string | null => {
    const exact = params.get(k);
    if (exact) return exact;
    const entries: Array<[string, string]> = [];
    params.forEach((value, key) => entries.push([key, value]));
    for (const [key, value] of entries) {
      if (key.toLowerCase() === k.toLowerCase()) return value;
    }
    return null;
  };

  const tz = (() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return null;
    }
  })();

  return {
    utmSource: trim(get("utm_source")),
    utmMedium: trim(get("utm_medium")),
    utmCampaign: trim(get("utm_campaign")),
    utmContent: trim(get("utm_content")),
    utmTerm: trim(get("utm_term")),
    gclid: trim(get("gclid")),
    fbclid: trim(get("fbclid")),
    ttclid: trim(get("ttclid")),
    referrer: trim(document.referrer),
    landingPage: trim(window.location.pathname + window.location.search, 500),
    userAgent: trim(navigator.userAgent, 500),
    language: trim(navigator.language),
    timezone: trim(tz),
  };
}

/**
 * Returns true if the payload carries enough signal to be worth
 * persisting. Ignores trivial payloads (just userAgent + tz from a
 * direct navigation with no referrer) so we don't overwrite a real
 * earlier attribution with empty noise.
 */
function hasMeaningfulSignal(p: AttributionPayload): boolean {
  return !!(
    p.utmSource ||
    p.utmMedium ||
    p.utmCampaign ||
    p.gclid ||
    p.fbclid ||
    p.ttclid ||
    (p.referrer && !p.referrer.includes(window.location.host))
  );
}

/**
 * Capture-and-persist on first meaningful touch. Idempotent — once a
 * non-trivial attribution is stored, later visits don't overwrite it
 * (first-touch wins). Stale attributions (>30d old) are evicted.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  // Check existing stored attribution
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const existing = JSON.parse(raw) as StoredAttribution;
      const age = Date.now() - new Date(existing.capturedAt).getTime();
      if (age < ATTRIBUTION_TTL_MS) {
        // Honor first-touch: don't overwrite a fresh stored attribution
        return;
      }
      // Otherwise it's stale — fall through and recapture
    }
  } catch {
    // Corrupted localStorage entry — ignore and overwrite
  }

  const fresh = readClientAttribution();
  if (!hasMeaningfulSignal(fresh)) return;

  const stored: StoredAttribution = {
    ...fresh,
    capturedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Quota exceeded or storage disabled — skip silently
  }
}

/**
 * Read the stored attribution if present and not stale. Returns null
 * if none, or if the stored value is older than the TTL. Clients
 * should call this when submitting forms (register, quiz/save) and
 * include the result in the request body.
 *
 * Falls back to a fresh client read if no stored value — captures
 * landing context for users who arrived via direct nav and registered
 * the same session.
 */
export function getAttributionForSubmit(): AttributionPayload {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const existing = JSON.parse(raw) as StoredAttribution;
      const age = Date.now() - new Date(existing.capturedAt).getTime();
      if (age < ATTRIBUTION_TTL_MS) {
        return existing;
      }
    }
  } catch {
    // Fall through
  }

  // Nothing stored or stale — return current page context as a
  // best-effort fallback (gives us at least userAgent, referrer,
  // landingPage for direct visitors).
  return readClientAttribution();
}

// ---------------------------------------------------------------------
// Server-side helpers
// ---------------------------------------------------------------------

/**
 * Extract IP-derived country from common reverse-proxy headers.
 * Railway forwards `cf-ipcountry` if Cloudflare is in front; Vercel
 * uses `x-vercel-ip-country`. Fly.io uses `fly-client-ip-country`.
 * If none match, returns null and we skip — better to miss the field
 * than to make stuff up from User-Agent guessing.
 */
export function extractIpCountry(headers: Headers): string | null {
  const candidates = [
    "cf-ipcountry",
    "x-vercel-ip-country",
    "fly-client-ip-country",
    "x-country-code",
  ];
  for (const name of candidates) {
    const v = headers.get(name);
    if (v && v.trim() && v.toLowerCase() !== "xx") {
      return v.trim().slice(0, 8);
    }
  }
  return null;
}

/**
 * Final server-side merge: trust client for what only the client
 * knows (UTMs, referrer, navigator), but always derive ipCountry +
 * userAgent server-side as the source of truth (clients can spoof).
 *
 * Accepts a `Headers` object directly so this is usable from API
 * routes (pass `request.headers`) and server actions (pass `await
 * headers()` from `next/headers`).
 *
 * Returns a sanitized object suitable for direct Prisma write.
 */
export function buildAttributionRecord(
  payload: AttributionPayload | null | undefined,
  headers: Headers,
): Record<string, string | null> {
  const safe = (v: unknown, max = 500): string | null => {
    if (typeof v !== "string") return null;
    const t = v.trim();
    if (!t) return null;
    return t.length > max ? t.slice(0, max) : t;
  };

  const p = payload ?? {};
  return {
    utmSource: safe(p.utmSource, 100),
    utmMedium: safe(p.utmMedium, 100),
    utmCampaign: safe(p.utmCampaign, 200),
    utmContent: safe(p.utmContent, 200),
    utmTerm: safe(p.utmTerm, 200),
    gclid: safe(p.gclid, 200),
    fbclid: safe(p.fbclid, 200),
    ttclid: safe(p.ttclid, 200),
    referrer: safe(p.referrer, 500),
    landingPage: safe(p.landingPage, 500),
    // Server-derived: trust headers over client-supplied
    userAgent: safe(headers.get("user-agent"), 500),
    ipCountry: extractIpCountry(headers),
    language: safe(p.language, 20),
    timezone: safe(p.timezone, 60),
  };
}
