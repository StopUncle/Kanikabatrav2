import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";
import {
  buildWelcomeContent,
  WELCOME_TITLE,
  WELCOME_VERSION,
} from "@/lib/community/welcome-post";

/**
 * Admin-only: force-refresh the pinned "Welcome to The Consilium" post to
 * the current version.
 *
 * The automated upgrade path in /api/consilium/subscription/activate only
 * fires for NEW activations, so existing active members keep seeing old
 * welcome copy until the admin hits this endpoint (or creates a new post
 * manually). One click, no downtime, no member interaction loss (keeps the
 * same FeedPost id so existing comments/likes carry).
 *
 * POST /api/admin/refresh-welcome
 */
export async function POST(_request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const existing = await prisma.feedPost.findFirst({
    where: {
      type: "AUTOMATED",
      metadata: { path: ["type"], equals: "welcome" },
    },
  });

  const content = buildWelcomeContent();

  if (!existing) {
    const created = await prisma.feedPost.create({
      data: {
        title: WELCOME_TITLE,
        content,
        type: "AUTOMATED",
        isPinned: true,
        metadata: { type: "welcome", automated: true, version: WELCOME_VERSION },
      },
      select: { id: true, title: true, createdAt: true },
    });
    return NextResponse.json({ success: true, action: "created", post: created });
  }

  const updated = await prisma.feedPost.update({
    where: { id: existing.id },
    data: {
      title: WELCOME_TITLE,
      content,
      isPinned: true,
      metadata: {
        ...((existing.metadata as Record<string, unknown>) || {}),
        type: "welcome",
        automated: true,
        version: WELCOME_VERSION,
      },
    },
    select: { id: true, title: true, createdAt: true },
  });

  return NextResponse.json({ success: true, action: "updated", post: updated });
}
