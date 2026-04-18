import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import {
  buildWelcomeContent,
  WELCOME_TITLE,
  WELCOME_VERSION,
} from "@/lib/community/welcome-post";

// Stripe handles activation via webhook (checkout.session.completed).
// This endpoint checks whether the webhook has already activated the membership,
// and if so returns success. This lets the success page poll until the webhook fires.
export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const membership = await prisma.communityMembership.findUnique({
      where: { userId: user.id },
    });

    if (!membership) {
      return NextResponse.json({ error: "No membership found" }, { status: 404 });
    }

    if (membership.status === "ACTIVE") {
      // Welcome post is best-effort. A failure here shouldn't break activation,
      // but we DO need a log trail or schema drift could silently kill new
      // member welcomes forever.
      try {
        const existingWelcome = await prisma.feedPost.findFirst({
          where: { type: "AUTOMATED", metadata: { path: ["type"], equals: "welcome" } },
        });

        const welcomeContent = buildWelcomeContent();
        if (!existingWelcome) {
          await prisma.feedPost.create({
            data: {
              title: WELCOME_TITLE,
              content: welcomeContent,
              type: "AUTOMATED",
              isPinned: true,
              metadata: { type: "welcome", automated: true, version: WELCOME_VERSION },
            },
          });
        } else if (
          ((existingWelcome.metadata as Record<string, unknown>)?.version ?? 1) !==
          WELCOME_VERSION
        ) {
          await prisma.feedPost.update({
            where: { id: existingWelcome.id },
            data: {
              title: WELCOME_TITLE,
              content: welcomeContent,
              isPinned: true,
              metadata: {
                ...((existingWelcome.metadata as Record<string, unknown>) || {}),
                type: "welcome",
                automated: true,
                version: WELCOME_VERSION,
              },
            },
          });
        }
      } catch (err) {
        logger.error("[subscription-activate] welcome post creation failed", err as Error, {
          userId: user.id,
        });
      }

      return NextResponse.json({ success: true, status: "ACTIVE" });
    }

    // Webhook hasn't fired yet -- tell the client to keep polling
    return NextResponse.json({ success: false, status: membership.status });
  });
}
