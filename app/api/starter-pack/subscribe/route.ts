import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendStarterPack } from "@/lib/email";
import { buildStarterPackDrip } from "@/lib/email-sequences";
import { logger } from "@/lib/logger";

/**
 * POST /api/starter-pack/subscribe
 *
 * Captures the Starter Pack email submission, creates / upserts a
 * Subscriber row tagged `starter-pack`, and fires the 5-pattern
 * delivery email. Mirrors /api/mini-quiz/submit's structure but
 * without the personality-axis tag (no quiz was taken).
 */

const AttributionSchema = z
  .object({
    utmSource: z.string().nullable().optional(),
    utmMedium: z.string().nullable().optional(),
    utmCampaign: z.string().nullable().optional(),
    utmContent: z.string().nullable().optional(),
    utmTerm: z.string().nullable().optional(),
    gclid: z.string().nullable().optional(),
    fbclid: z.string().nullable().optional(),
    ttclid: z.string().nullable().optional(),
    referrer: z.string().nullable().optional(),
    landingPage: z.string().nullable().optional(),
    userAgent: z.string().nullable().optional(),
    language: z.string().nullable().optional(),
    timezone: z.string().nullable().optional(),
  })
  .partial()
  .optional();

const RequestSchema = z.object({
  email: z.string().email().max(254),
  attribution: AttributionSchema,
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request payload" },
      { status: 400 },
    );
  }

  const { email, attribution } = parsed.data;
  const normalised = email.trim().toLowerCase();

  try {
    const tags: string[] = ["starter-pack"];
    if (attribution?.utmSource) tags.push(`utm-source:${attribution.utmSource}`);

    // Preserve unsubscribe markers across re-submits. Same reasoning
    // as /api/mini-quiz/submit: an explicit opt-out must survive a
    // re-capture event.
    const existingSub = await prisma.subscriber.findUnique({
      where: { email: normalised },
      select: { tags: true },
    });
    const preservedUnsubTags =
      existingSub?.tags?.filter((t) => t.startsWith("unsubscribed:")) ?? [];
    const mergedTags = [...tags, ...preservedUnsubTags];

    await prisma.subscriber.upsert({
      where: { email: normalised },
      update: {
        source: "starter-pack",
        tags: { set: mergedTags },
      },
      create: {
        email: normalised,
        source: "starter-pack",
        tags: mergedTags,
        verified: false,
      },
    });

    const sent = await sendStarterPack({ email: normalised });
    if (!sent) {
      logger.error(
        "starter-pack subscribe: subscriber created but email send failed",
        new Error(`email=${normalised}`),
      );
      // Same as mini-quiz: still 200, email is recoverable.
    }

    // Enqueue the 4-email drip (Day 1 / 3 / 5 / 7). Idempotent — skip
    // if this email already has a starter-pack-drip enrollment.
    try {
      const existingDrip = await prisma.emailQueue.findFirst({
        where: {
          recipientEmail: normalised,
          sequence: "starter-pack-drip",
        },
        select: { id: true },
      });
      if (!existingDrip) {
        const dripDisplayName = normalised.split("@")[0] || "you";
        const entries = buildStarterPackDrip(normalised, dripDisplayName);
        await prisma.emailQueue.createMany({ data: entries });
      }
    } catch (dripErr) {
      logger.error("starter-pack drip enqueue failed", dripErr as Error);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    logger.error("starter-pack subscribe failed", err as Error);
    return NextResponse.json(
      { error: "Could not save your subscription. Try again in a moment." },
      { status: 500 },
    );
  }
}
