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
 * Extract a best-effort client IP from a Next.js request. Prefers
 * X-Forwarded-For (set by Railway's proxy), falls back to a literal "ip:
 * unknown" marker so rate limits still work coarsely.
 */
export function getClientIp(request: NextRequest): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    // XFF may be a comma-separated list — the client IP is the first one.
    return xff.split(",")[0].trim();
  }
  const xri = request.headers.get("x-real-ip");
  if (xri) return xri.trim();
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
  /** Register: 3 per minute per IP */
  authRegister: { action: "auth:register", max: 3, windowMs: 60_000 },
  /** Forgot password: 3 per 10 min per email */
  authForgot: { action: "auth:forgot-password", max: 3, windowMs: 10 * 60_000 },
  /** Admin PIN: 5 per hour per IP (brute force is the real risk) */
  adminPin: { action: "admin:auth", max: 5, windowMs: 60 * 60_000 },
  /** Feed comments: 10 per hour per user */
  feedComment: { action: "feed:comment", max: 10, windowMs: 60 * 60_000 },
  /** Quiz submit: 10 per day per IP */
  quizSubmit: { action: "quiz:submit", max: 10, windowMs: 24 * 60 * 60_000 },
  /**
   * Receipts create: 4 per minute per user. Backstop against parallel
   * bursts that would otherwise fire 12 LLM calls before the weekly
   * quota gate engages, burning cost on every one. The weekly cap (12 or
   * 60 depending on tier) still bounds the long tail.
   */
  receiptsCreate: { action: "receipts:create", max: 4, windowMs: 60_000 },
} satisfies Record<string, RateLimitConfig>;
