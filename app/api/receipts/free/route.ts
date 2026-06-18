/**
 * POST /api/receipts/free: the FREE, public Receipts lead magnet.
 *
 * No membership required. Two request shapes drive the funnel:
 *
 *   1. Preview (no email): the first read is free with zero friction. Capped
 *      at 1 per anonId / 24h (plus a per-IP backstop against cookie-clearing).
 *      Once that is spent, the route returns { gated: true } and the client
 *      shows the email gate. Preview reads are NOT persisted and carry no
 *      share card.
 *   2. Full (email present): captures the email via the existing newsletter
 *      contract (source "receipts-free", which fires the drip), then returns
 *      the read AND a shareId. Only the generated read is persisted (never the
 *      input), so the branded share card has something to render.
 *
 * Cost firewall, cheap-to-expensive: a global daily ceiling, a per-anonId
 * burst limit, then the per-anonId / per-IP / per-email caps. The model is
 * Haiku (cheap, for volume); the system prompt is the hardened public variant
 * that never labels a named real person.
 */

import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { resolveTellContext, setAnonCookie } from "@/lib/tells/auth-context";
import { ANTHROPIC_MODEL } from "@/lib/anthropic";
import {
  callReceipts,
  ReceiptsInputError,
} from "@/lib/receipts/anthropic";
import { RECEIPTS_PUBLIC_SYSTEM_PROMPT } from "@/lib/receipts/prompt";
import { createPublicReceipt } from "@/lib/receipts/public";
import { rateLimit, getClientIp, limits } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Body = z.object({
  input: z.string().max(20_000).optional().default(""),
  email: z.string().max(200).optional(),
  images: z
    .array(
      z.object({
        base64: z.string().min(1),
        mediaType: z.enum([
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/gif",
        ]),
      }),
    )
    .max(2)
    .optional(),
});

/** JSON response that also sets the anon cookie when it was freshly minted. */
function respond(
  data: unknown,
  init: { status?: number } = {},
  cookie?: { anonId: string; minted: boolean },
): NextResponse {
  const res = NextResponse.json(data, init);
  if (cookie?.minted) setAnonCookie(res, cookie.anonId);
  return res;
}

export async function POST(request: NextRequest) {
  const ctx = await resolveTellContext();
  const cookie = { anonId: ctx.anonId, minted: ctx.anonIdMinted };
  const ip = getClientIp(request);

  // Global circuit breaker first: the cheapest possible reject, and the one
  // that protects the bill if anything else is bypassed.
  const global = await rateLimit(limits.receiptsFreeGlobal, "all");
  if (!global.allowed) {
    return respond(
      { error: "Receipts is busy right now. Try again shortly." },
      { status: 429 },
      cookie,
    );
  }

  // Per-anonId burst, to stop parallel submits firing a wave of LLM calls.
  const burst = await rateLimit(limits.receiptsFreeBurst, `anon:${ctx.anonId}`);
  if (!burst.allowed) {
    return respond(
      { error: "Slow down a moment, then try again." },
      { status: 429 },
      cookie,
    );
  }

  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await request.json());
  } catch (err) {
    return respond(
      { error: "Invalid payload", detail: (err as Error).message },
      { status: 400 },
      cookie,
    );
  }

  const email = body.email?.trim().toLowerCase();
  const hasEmail = !!email && EMAIL_RE.test(email);

  if (body.email && !hasEmail) {
    return respond(
      { error: "That email does not look right." },
      { status: 400 },
      cookie,
    );
  }

  // Gating: no email is the free first read; once the anon (or IP) allowance
  // is spent, fall through to the email gate. With an email, the daily email
  // cap applies instead.
  if (!hasEmail) {
    const anon = await rateLimit(limits.receiptsFreeAnon, `anon:${ctx.anonId}`);
    const byIp = await rateLimit(limits.receiptsFreeIp, `ip:${ip}`);
    if (!anon.allowed || !byIp.allowed) {
      return respond({ gated: true }, { status: 200 }, cookie);
    }
  } else {
    const byEmail = await rateLimit(limits.receiptsFreeEmail, `email:${email}`);
    if (!byEmail.allowed) {
      return respond(
        {
          error:
            "You have reached today's free reads. Come back tomorrow, or join Consilium for unlimited.",
          quotaReached: true,
        },
        { status: 429 },
        cookie,
      );
    }
  }

  // Capture the email before producing the gated value, reusing the existing
  // newsletter contract (it creates the Subscriber and enqueues the drip).
  // A capture hiccup should not deny the read the user just earned.
  if (hasEmail) {
    try {
      const res = await fetch(`${request.nextUrl.origin}/api/newsletter`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          source: "receipts-free",
          tags: ["receipts-free"],
        }),
      });
      if (!res.ok) {
        logger.warn("[receipts-free] newsletter capture non-ok", {
          status: res.status,
        });
      }
    } catch (err) {
      logger.error(
        "[receipts-free] newsletter capture failed",
        err instanceof Error ? err : new Error(String(err)),
      );
    }
  }

  // LLM call: Haiku + the hardened public prompt. No label on the free tier.
  let result;
  try {
    result = await callReceipts(body.input, undefined, body.images, {
      model: ANTHROPIC_MODEL,
      systemPrompt: RECEIPTS_PUBLIC_SYSTEM_PROMPT,
    });
  } catch (err) {
    if (err instanceof ReceiptsInputError) {
      return respond(
        { error: err.message, kind: err.kind },
        { status: 400 },
        cookie,
      );
    }
    logger.error(
      "[receipts-free] llm call failed",
      err instanceof Error ? err : new Error(String(err)),
      { anonId: ctx.anonId },
    );
    return respond(
      { error: "Could not produce a read. Try again." },
      { status: 502 },
      cookie,
    );
  }

  // Preview (no email): return the read, do not persist, no share card.
  if (!hasEmail) {
    return respond({ read: result.response, canShare: false }, {}, cookie);
  }

  // Full (email): persist ONLY the read so the share card can render it.
  let shareId: string | null = null;
  try {
    const saved = await createPublicReceipt({
      response: result.response,
      model: result.model,
      costMicros: result.costMicros,
      anonId: ctx.anonId,
    });
    shareId = saved.id;
  } catch (err) {
    // The read is still valuable without a share link; do not fail the request.
    logger.error(
      "[receipts-free] persist failed",
      err instanceof Error ? err : new Error(String(err)),
      { anonId: ctx.anonId },
    );
  }

  return respond(
    { read: result.response, shareId, canShare: shareId !== null },
    {},
    cookie,
  );
}
