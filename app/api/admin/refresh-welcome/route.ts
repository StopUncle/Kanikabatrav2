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

  // Match order matters: try the canonical metadata marker first, then
  // fall back to legacy rows that pre-date the metadata.type=welcome
  // convention (old test posts, seed data, hand-created rows) by title.
  // Without this fallback, refresh would CREATE a duplicate instead of
  // updating the one the user actually sees.
  const existing =
    (await prisma.feedPost.findFirst({
      where: {
        type: "AUTOMATED",
        metadata: { path: ["type"], equals: "welcome" },
      },
    })) ||
    (await prisma.feedPost.findFirst({
      where: {
        OR: [
          { title: { startsWith: "Welcome to The Consilium" } },
          { title: { startsWith: "Welcome to the Consilium" } },
        ],
      },
      orderBy: { createdAt: "asc" },
    }));

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
      // Normalize these in case we matched a legacy row that wasn't
      // previously AUTOMATED or didn't carry our metadata marker.
      type: "AUTOMATED",
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
