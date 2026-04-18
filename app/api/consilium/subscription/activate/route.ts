import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

/**
 * Welcome-post body. Version 2 adds the house rules. Bump `version` in the
 * metadata whenever this changes so existing posts get refreshed instead of
 * sitting outdated forever.
 */
function buildWelcomeContent(): string {
  return [
    "This is your space. A private community navigating power dynamics, dark psychology, and the realities no one else talks about.",
    "",
    "**What's inside**",
    "",
    "• **The Feed** — posts, discussions, and announcements from Kanika.",
    "• **Voice Notes** — raw, unfiltered insights you won't hear on the podcast.",
    "• **The Classroom** — courses on dark psychology, pattern recognition, and career strategy.",
    "• **The Dark Mirror Simulator** — interactive scenarios that teach you what the manipulation feels like from the inside.",
    "• **Forum + Chat** — members-only threads and real-time rooms.",
    "",
    "**House rules — read these**",
    "",
    "This community is vetted, moderated, and watermarked. Breaking any of the below earns a warning first, a permanent ban and IP-level block on the second offense.",
    "",
    "• **No sexual talk.** Zero. This is a strategy community, not a personal ads board. Flirting with other members, sexually-explicit commentary, or DM sliding gets you removed immediately.",
    "• **No insults toward other members.** Disagree hard if you want — attack the idea, never the person. Name-calling, mockery, and pile-ons are bannable.",
    "• **No filming, screen-recording, or screenshotting what's inside.** What Kanika shares here stays here. Every page is watermarked with your account's unique session ID. If content from the Consilium appears on TikTok, Twitter, YouTube, Discord, or a podcast, we will identify the exact account that recorded it and permanently ban it — along with IP-level blocks.",
    "• **No doxxing or sharing other members' private information.** Their email, real name, DMs to you, what they said in chat — all off-limits outside the walls.",
    "• **No recruiting members to outside paid services.** Your coaching business / OnlyFans / newsletter isn't welcome here. This is Kanika's room. Build your own elsewhere.",
    "• **No spam, self-promotion, or affiliate links.** The feed is for conversation, not conversion.",
    "• **No harassment — DMs or otherwise.** Members are free to say no, ignore, or block. If someone tells you to stop, stop.",
    "• **No impersonation.** Don't pretend to be Kanika, another member, or someone with credentials you don't have.",
    "• **No sharing the book, course videos, or voice notes.** Piracy gets the account banned and the content revoked.",
    "",
    "Every comment is reviewed. Every post is watermarked. Every ban is permanent.",
    "",
    "Welcome to the other side.",
  ].join("\n");
}

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
              title: "Welcome to The Consilium — Read Before Posting",
              content: welcomeContent,
              type: "AUTOMATED",
              isPinned: true,
              metadata: { type: "welcome", automated: true, version: 2 },
            },
          });
        } else if (
          ((existingWelcome.metadata as Record<string, unknown>)?.version ?? 1) !== 2
        ) {
          // Version bump — refresh the house rules on existing post without
          // losing its id / comments. Only updates content + title + metadata
          // so member interactions (likes, comments) carry over.
          await prisma.feedPost.update({
            where: { id: existingWelcome.id },
            data: {
              title: "Welcome to The Consilium — Read Before Posting",
              content: welcomeContent,
              isPinned: true,
              metadata: {
                ...((existingWelcome.metadata as Record<string, unknown>) || {}),
                type: "welcome",
                automated: true,
                version: 2,
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
