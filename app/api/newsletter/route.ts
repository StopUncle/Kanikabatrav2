import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import {
  buildNewsletterDrip,
  buildQuizResultDrip,
  buildCoachingLeadDrip,
  QUIZ_DRIP_SLUGS,
} from "@/lib/email-sequences";
import { logger } from "@/lib/logger";
import { enforceRateLimit, getClientIp, limits } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // Public, unauthenticated capture: rate-limit per IP so it can't be
    // flooded to spam the subscriber list and the email queue.
    const limited = await enforceRateLimit(
      limits.newsletterCapture,
      `ip:${getClientIp(request)}`,
    );
    if (limited) return limited;

    const {
      email,
      name,
      source = "newsletter",
      quizResultId,
      quizSlug,
      tags = [],
    } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    const normalized = email.toLowerCase();
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email: normalized },
    });
    const isNew = !existingSubscriber;

    if (existingSubscriber) {
      const newTags = Array.from(
        new Set([...(existingSubscriber.tags || []), ...tags]),
      );
      await prisma.subscriber.update({
        where: { email: normalized },
        data: {
          tags: newTags,
          ...(quizResultId && { quizResultId }),
        },
      });
    } else {
      await prisma.subscriber.create({
        data: {
          email: normalized,
          name: name || null,
          source,
          quizResultId: quizResultId || null,
          tags,
          verified: true,
        },
      });
    }

    // Enroll the right drip. A known quizSlug gets the result-specific
    // nurture (for new AND returning subscribers, since a returning
    // visitor may be finishing this quiz for the first time). Everyone
    // else gets the generic newsletter drip, new subscribers only.
    // Idempotent on the (recipient, sequence) pair. Failure here must
    // not break the capture.
    const dripDisplayName = name || normalized.split("@")[0] || "you";
    const hasQuizDrip =
      typeof quizSlug === "string" && QUIZ_DRIP_SLUGS.has(quizSlug);
    try {
      if (hasQuizDrip) {
        const entries = buildQuizResultDrip(
          normalized,
          dripDisplayName,
          quizSlug,
        );
        if (entries && entries.length > 0) {
          const existingDrip = await prisma.emailQueue.findFirst({
            where: {
              recipientEmail: normalized,
              sequence: entries[0]!.sequence,
            },
            select: { id: true },
          });
          if (!existingDrip) {
            await prisma.emailQueue.createMany({ data: entries });
          }
        }
      } else if (source === "coaching") {
        // Coaching lead nurture. Fires for new AND returning subscribers,
        // since a returning newsletter subscriber expressing coaching
        // interest is a high-intent signal worth nurturing. Deduped on the
        // sequence so it never double-enrolls.
        const entries = buildCoachingLeadDrip(normalized, dripDisplayName);
        const existingDrip = await prisma.emailQueue.findFirst({
          where: { recipientEmail: normalized, sequence: entries[0]!.sequence },
          select: { id: true },
        });
        if (!existingDrip) {
          await prisma.emailQueue.createMany({ data: entries });
        }
      } else if (isNew) {
        const existingDrip = await prisma.emailQueue.findFirst({
          where: { recipientEmail: normalized, sequence: "newsletter-drip" },
          select: { id: true },
        });
        if (!existingDrip) {
          const entries = buildNewsletterDrip(normalized, dripDisplayName);
          await prisma.emailQueue.createMany({ data: entries });
        }
      }
    } catch (dripErr) {
      logger.error("[newsletter] drip enqueue failed", dripErr as Error, {
        email: normalized,
      });
    }

    // Welcome email for brand-new subscribers only (fire and forget).
    if (isNew) {
      sendEmail({
        to: normalized,
        subject: "Welcome to The Psychology of Power",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1a0d11 0%, #0a1628 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #d4af37; margin: 0; font-size: 24px;">Welcome</h1>
          </div>
          <div style="background: #050511; padding: 30px; border: 1px solid #d4af37; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="color: #f5f0ed; font-size: 16px; line-height: 1.6;">
              ${name ? `Hey ${name},` : "Hey,"}
            </p>
            <p style="color: #94a3b8; line-height: 1.6;">
              Thanks for subscribing. You're now on the inside.
            </p>
            <p style="color: #94a3b8; line-height: 1.6;">
              I'll be sharing insights on power dynamics, strategic psychology, and the patterns most people miss, directly to your inbox.
            </p>
            <p style="color: #94a3b8; line-height: 1.6;">
              No fluff. No filler. Just the stuff that actually moves the needle.
            </p>
            <p style="color: #d4af37; font-style: italic; margin-top: 30px;">
              Kanika Batra<br>
              <span style="color: #666; font-size: 12px;">The Psychology of Power</span>
            </p>
          </div>
        </div>
      `,
      }).catch((err) =>
        logger.error("[newsletter] welcome email failed", err as Error, {
          email: normalized,
        }),
      );
    }

    return NextResponse.json({
      success: true,
      message: isNew ? "Successfully subscribed" : "Subscription updated",
      isNew,
    });
  } catch (error) {
    logger.error("[newsletter] subscription error", error as Error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const subscribers = await prisma.subscriber.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    const stats = await prisma.subscriber.groupBy({
      by: ["source"],
      _count: { id: true },
    });

    const total = await prisma.subscriber.count();

    return NextResponse.json({
      total,
      bySource: stats.reduce(
        (acc, item) => {
          acc[item.source] = item._count.id;
          return acc;
        },
        {} as Record<string, number>,
      ),
      recentSubscribers: subscribers.map((s) => ({
        email: s.email,
        source: s.source,
        tags: s.tags,
        createdAt: s.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 },
    );
  }
}
