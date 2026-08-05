import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

/**
 * Fixed-window rate limiter backed by the RateLimit table in Postgres.
 *
 * Why DB-backed instead of Upstash / Redis:
 *   - Zero new infrastructure. Works on the existing Railway Postgres.
 *   - Traffic volume on this app is well below what a DB-backed limiter
 *     can handle. The hot paths we're limiting (auth, comments) are
 *     low-QPS by nature.
 *   - Swap-out path is clean if we ever grow into needing Upstash — the
 *     public surface is just `rateLimit(...)`.
 *
 * Window semantics:
 *   - Each (action, subject) pair has a single row.
 *   - When a request comes in, we compare `now - windowStart` to `windowMs`.
 *   - If the window has elapsed, we reset: count=1, windowStart=now.
 *   - Otherwise we increment count.
 *   - If count > max, we reject.
 *
 * Fail-open: if the DB is unreachable or the query throws for any reason,
 * we let the request through and log a warning. Better to serve a legit
 * user than 503 the whole site on a transient DB hiccup.
 */

export interface RateLimitConfig {
  /** Namespace for this limit, e.g. "auth:login" */
  action: string;
  /** Max requests per window */
  max: number;
  /** Window size in milliseconds */
  windowMs: number;
}

export interface RateLimitResult {
  /** Whether the request is allowed to proceed */
  allowed: boolean;
  /** How many more requests the subject has in the current window */
  remaining: number;
  /** When the current window resets (unix ms) */
  resetAt: number;
}

/**
 * Extract a best-effort client IP from a Next.js request.
 *
 * The only thing that matters here is that the caller cannot choose their own
 * bucket. A caller can send whatever they like in X-Forwarded-For, and a proxy
 * APPENDS the address it actually saw rather than replacing the header, so the
 * leftmost entry is the caller's own invention and the rightmost is the only
 * one they cannot forge. Reading the leftmost entry, which this did until
 * 2026-07-29, hands every limit in this file to anyone willing to vary one
 * header: a fresh value is a fresh bucket, which made the 5/hour on the six
 * digit admin PIN decorative.
 *
 * cf-connecting-ip is deliberately NOT trusted by default. Verified 2026-07-29:
 * kanikarose.com answers with `Server: railway-edge` and no Cloudflare markers,
 * so Railway's proxy is the only hop in front of this app and nothing sets that
 * header on the way in. Trusting it here would hand back the same
 * fresh-bucket-per-request bypass described above, just under a different
 * header name. It is honoured only when TRUST_CF_CONNECTING_IP says an ingress
 * actually sets it, and if Cloudflare is ever put in front, the rightmost
 * forwarded hop becomes a shared Cloudflare edge and that flag becomes
 * required rather than optional.
 */
export function getClientIp(request: NextRequest): string {
  if (process.env.TRUST_CF_CONNECTING_IP === "true") {
    const cf = request.headers.get("cf-connecting-ip")?.trim();
    if (cf) return cf;
  }

  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const hops = xff
      .split(",")
      .map((hop) => hop.trim())
      .filter(Boolean);
    const nearest = hops[hops.length - 1];
    if (nearest) return nearest;
  }

  const xri = request.headers.get("x-real-ip")?.trim();
  if (xri) return xri;
  return "ip:unknown";
}

/**
 * Check + increment the rate limit for a subject. Returns whether the
 * request should be allowed.
 */
export async function rateLimit(
  config: RateLimitConfig,
  subject: string,
): Promise<RateLimitResult> {
  const now = new Date();

  try {
    // Read-modify-write in a transaction so two parallel requests from the
    // same subject can't both see "count=0" and both be allowed when only
    // one should be.
    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.rateLimit.findUnique({
        where: {
          action_subject: {
            action: config.action,
            subject,
          },
        },
      });

      if (!existing) {
        // First request from this subject in this action. Create the row.
        await tx.rateLimit.create({
          data: {
            action: config.action,
            subject,
            count: 1,
            windowStart: now,
          },
        });
        return {
          count: 1,
          windowStart: now,
        };
      }

      const windowAge = now.getTime() - existing.windowStart.getTime();
      if (windowAge >= config.windowMs) {
        // Window has elapsed. Reset the counter.
        const updated = await tx.rateLimit.update({
          where: { id: existing.id },
          data: {
            count: 1,
            windowStart: now,
          },
        });
        return { count: updated.count, windowStart: updated.windowStart };
      }

      // Still within the window. Increment.
      const updated = await tx.rateLimit.update({
        where: { id: existing.id },
        data: {
          count: { increment: 1 },
        },
      });
      return { count: updated.count, windowStart: updated.windowStart };
    });

    const resetAt = result.windowStart.getTime() + config.windowMs;
    const allowed = result.count <= config.max;
    return {
      allowed,
      remaining: Math.max(0, config.max - result.count),
      resetAt,
    };
  } catch (err) {
    // Fail-open on DB errors. Log + allow — better than 503ing the site.
    logger.warn("[rate-limit] fail-open due to error", {
      action: config.action,
      subject,
      error: err instanceof Error ? err.message : String(err),
    });
    return {
      allowed: true,
      remaining: config.max,
      resetAt: now.getTime() + config.windowMs,
    };
  }
}

/**
 * Convenience: apply a rate limit + return a 429 NextResponse if exceeded,
 * or null to indicate the caller should proceed. Handles the standard rate
 * limit headers (X-RateLimit-*, Retry-After).
 */
export async function enforceRateLimit(
  config: RateLimitConfig,
  subject: string,
): Promise<NextResponse | null> {
  const result = await rateLimit(config, subject);

  if (result.allowed) return null;

  const retryAfterSeconds = Math.max(
    1,
    Math.ceil((result.resetAt - Date.now()) / 1000),
  );

  return NextResponse.json(
    {
      error: "Too many requests. Slow down.",
      retryAfter: retryAfterSeconds,
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfterSeconds),
        "X-RateLimit-Limit": String(config.max),
        "X-RateLimit-Remaining": String(result.remaining),
        "X-RateLimit-Reset": String(Math.floor(result.resetAt / 1000)),
      },
    },
  );
}

// ========================================
// Pre-configured limit profiles
// ========================================
// These map directly to the recommendations in the audit plan. Tune the
// max/windowMs numbers here if anything feels too strict or too lax.

export const limits = {
  /** Login: 5 attempts per minute per IP */
  authLogin: { action: "auth:login", max: 5, windowMs: 60_000 },
  /**
   * Register: 10 per minute per IP. Per-IP means per NAT egress: a
   * launch wave puts many listeners behind one carrier-grade NAT
   * address, so 3/min locked out real signups. 10/min still stops a
   * scripted flood (email uniqueness catches the rest).
   */
  authRegister: { action: "auth:register", max: 10, windowMs: 60_000 },
  /** Forgot password: 3 per 10 min per email */
  authForgot: { action: "auth:forgot-password", max: 3, windowMs: 10 * 60_000 },
  /**
   * Reset password: 5 per 10 min per IP. Looser than forgot-password
   * because a legitimate user can fumble the confirm field, tight enough
   * that token guessing and repeated bcrypt work are both bounded.
   */
  authReset: { action: "auth:reset-password", max: 5, windowMs: 10 * 60_000 },
  /** Admin PIN: 5 per hour per IP (brute force is the real risk) */
  adminPin: { action: "admin:auth", max: 5, windowMs: 60 * 60_000 },
  /** Feed comments: 10 per hour per user */
  feedComment: { action: "feed:comment", max: 10, windowMs: 60 * 60_000 },
  /** Quiz submit: 10 per day per IP */
  quizSubmit: { action: "quiz:submit", max: 10, windowMs: 24 * 60 * 60_000 },
  /**
   * Unauthenticated email senders. Each of these fires a real email to
   * an attacker-supplied address, so an unlimited loop burns Resend
   * quota and, worse, domain reputation. A legit visitor does each of
   * these once, maybe twice on a typo.
   */
  miniQuizSubmit: { action: "mini-quiz:submit", max: 5, windowMs: 60 * 60_000 },
  starterPack: { action: "starter-pack:subscribe", max: 5, windowMs: 60 * 60_000 },
  contactForm: { action: "contact:submit", max: 3, windowMs: 60 * 60_000 },
  /**
   * Pact journal saves: the entry is an update, so re-saving is legal,
   * but every save runs the crisis classifier (an LLM call). Twelve an
   * hour is a generous editing session and a hard wall for a loop.
   */
  pactEntrySave: { action: "pact:entry:save", max: 12, windowMs: 60 * 60_000 },
  /**
   * Receipts create: 4 per minute per user. Backstop against parallel
   * bursts that would otherwise fire 12 LLM calls before the weekly
   * quota gate engages, burning cost on every one. The weekly cap (12 or
   * 60 depending on tier) still bounds the long tail.
   */
  receiptsCreate: { action: "receipts:create", max: 4, windowMs: 60_000 },
  /**
   * Freeform simulator moves: burst gate per user. Haiku is cheap but a
   * stuck client retry loop would still fire real LLM calls.
   */
  simFreeformBurst: { action: "sim:freeform:burst", max: 8, windowMs: 60_000 },
  /**
   * Freeform simulator moves: daily ceiling per user. Generous enough
   * to type every move of two full scenario runs.
   */
  simFreeformDaily: {
    action: "sim:freeform:daily",
    max: 80,
    windowMs: 24 * 60 * 60_000,
  },
  /**
   * Lab messages: burst gate per user. The Lab runs on Sonnet, which is
   * the expensive model, so the per-minute gate is tight. The session
   * turn cap and daily session cap bound the long tail.
   */
  labMessage: { action: "lab:message", max: 6, windowMs: 60_000 },
  /**
   * Free public Receipts. Layered to bound LLM spend on an anonymous,
   * uncapped-by-login surface, cheap-to-expensive:
   *   - Burst: 4/min per anonId, mirrors receiptsCreate.
   *   - Anon: 1 free read / 24h per anonId, before the email gate.
   *   - IP: 5 free reads / 24h per IP, backstop against cookie-clearing
   *     to farm fresh anonIds.
   *   - Email: 3 reads / day for email-gated (subscribed) visitors.
   *   - Global: hard daily ceiling on total free reads, the circuit
   *     breaker against an abuse spike running up an unbounded bill.
   */
  receiptsFreeBurst: { action: "receipts:free:burst", max: 4, windowMs: 60_000 },
  receiptsFreeAnon: {
    action: "receipts:free:anon",
    max: 1,
    windowMs: 24 * 60 * 60_000,
  },
  receiptsFreeIp: {
    action: "receipts:free:ip",
    max: 5,
    windowMs: 24 * 60 * 60_000,
  },
  receiptsFreeEmail: {
    action: "receipts:free:email",
    max: 3,
    windowMs: 24 * 60 * 60_000,
  },
  receiptsFreeGlobal: {
    action: "receipts:free:global",
    max: 2000,
    windowMs: 24 * 60 * 60_000,
  },
  /**
   * Newsletter / lead capture: 10 per minute per IP. The capture endpoint is
   * public and unauthenticated and writes a Subscriber plus enqueues a drip,
   * so an unguarded flood could spam the list and the queue. Generous enough
   * that no real signer-up ever hits it.
   */
  newsletterCapture: {
    action: "newsletter:capture",
    max: 10,
    windowMs: 60_000,
  },
} satisfies Record<string, RateLimitConfig>;
