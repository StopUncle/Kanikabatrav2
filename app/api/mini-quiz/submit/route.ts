import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMiniDarkMirrorResult } from "@/lib/email";
import { buildMiniDarkMirrorDrip } from "@/lib/email-sequences";
import {
  buildAttributionRecord,
  type AttributionPayload,
} from "@/lib/attribution";
import { logger } from "@/lib/logger";

/**
 * POST /api/mini-quiz/submit
 *
 * Captures the mini-quiz email submission, creates / upserts a
 * Subscriber row tagged with the dominant personality axis, and fires
 * the result-delivery email. Per the multimillion-roadmap (research/
 * multimillion-roadmap/11-phase-1-detailed.md week 4), the goal is
 * owned-email capture; this endpoint is the conversion event.
 *
 * No schema migration is needed — this uses the existing Subscriber
 * model with `source: "mini-quiz"` and the dominant axis stored in
 * the `tags` array.
 */

const PersonalityTypeSchema = z.enum([
  "psychopathic",
  "sociopathic",
  "narcissistic",
  "borderline",
  "histrionic",
  "neurotypical",
]);

const ScoresSchema = z.object({
  psychopathic: z.number(),
  sociopathic: z.number(),
  narcissistic: z.number(),
  borderline: z.number(),
  histrionic: z.number(),
  neurotypical: z.number(),
});

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
  dominantType: PersonalityTypeSchema,
  scores: ScoresSchema,
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

  const { email, dominantType, scores, attribution } = parsed.data;
  const normalised = email.trim().toLowerCase();

  try {
    // Subscribe via the existing Subscriber model. Upsert on email so
    // a returning visitor who re-takes the quiz updates their dominant
    // axis tag rather than producing duplicate rows.
    const tags: string[] = [`mini-quiz:${dominantType}`];
    // Add the attribution source as a tag so segmentation queries can
    // filter by acquisition channel without joining QuizResult.
    if (attribution?.utmSource) tags.push(`utm-source:${attribution.utmSource}`);

    // Preserve any `unsubscribed:*` tag a returning visitor may have
     // collected via /unsubscribe — re-submitting the mini-quiz must
     // not silently re-opt-in someone who explicitly opted out.
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
        // On re-submit, refresh the source + tags but keep verified state.
        source: "mini-quiz",
        tags: { set: mergedTags },
      },
      create: {
        email: normalised,
        source: "mini-quiz",
        tags: mergedTags,
        verified: false,
      },
    });

    // Best-effort log of acquisition source for diagnostics. The
    // attribRecord itself isn't persisted on Subscriber today (model
    // doesn't have those columns); future-Claude can add them if a
    // migration is appropriate. Using buildAttributionRecord here for
    // the same sanitisation pipeline the User and QuizResult rows
    // use, so logs are consistent with prod data.
    if (attribution) {
      const attribRecord = buildAttributionRecord(
        attribution as AttributionPayload,
        req,
      );
      logger.info("mini-quiz capture", {
        email: normalised,
        dominantType,
        utmSource: attribRecord.utmSource,
        ipCountry: attribRecord.ipCountry,
      });
    }

    const sent = await sendMiniDarkMirrorResult({
      email: normalised,
      dominantType,
      scores,
    });
    if (!sent) {
      logger.error(
        "mini-quiz submit: subscriber created but email send failed",
        new Error(`email=${normalised}`),
      );
      // Still return 200 — the subscriber is captured. Email is
      // recoverable; subscription is the irreversible primary event.
    }

    // Enqueue the 4-email drip (Day 1 / 3 / 5 / 7). Idempotent — if
    // this email already has a mini-dark-mirror-drip enrollment, skip
    // re-queuing so re-takers don't get a duplicated sequence.
    try {
      const existingDrip = await prisma.emailQueue.findFirst({
        where: {
          recipientEmail: normalised,
          sequence: "mini-dark-mirror-drip",
        },
        select: { id: true },
      });
      if (!existingDrip) {
        const dripDisplayName = normalised.split("@")[0] || "you";
        const entries = buildMiniDarkMirrorDrip(
          normalised,
          dripDisplayName,
          dominantType,
        );
        await prisma.emailQueue.createMany({ data: entries });
      }
    } catch (dripErr) {
      // Drip failure must not break the capture flow. Log and move on.
      logger.error("mini-quiz drip enqueue failed", dripErr as Error);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    logger.error("mini-quiz submit failed", err as Error);
    return NextResponse.json(
      { error: "Could not save your submission. Try again in a moment." },
      { status: 500 },
    );
  }
}
