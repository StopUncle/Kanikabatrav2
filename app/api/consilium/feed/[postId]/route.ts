import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { deleteFromR2, isR2Configured } from "@/lib/storage/r2";

/**
 * Admin-only feed post mutations.
 *
 * - PATCH  /api/consilium/feed/:postId, toggle isPinned / isLocked
 * - DELETE /api/consilium/feed/:postId, hard delete (cascades comments + likes
 *   via Prisma onDelete: Cascade)
 *
 * Both gate on the admin_session cookie via requireAdminSession, matching the
 * rest of the admin API surface.
 */

interface RouteParams {
  params: Promise<{ postId: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { postId } = await params;
  if (!postId) {
    return NextResponse.json({ error: "postId required" }, { status: 400 });
  }

  let body: { isPinned?: boolean; isLocked?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const data: { isPinned?: boolean; isLocked?: boolean } = {};
  if (typeof body.isPinned === "boolean") data.isPinned = body.isPinned;
  if (typeof body.isLocked === "boolean") data.isLocked = body.isLocked;
  if (Object.keys(data).length === 0) {
    return NextResponse.json(
      { error: "Nothing to update. Supply isPinned and/or isLocked." },
      { status: 400 },
    );
  }

  try {
    const updated = await prisma.feedPost.update({
      where: { id: postId },
      data,
      select: { id: true, isPinned: true, isLocked: true },
    });
    return NextResponse.json({ success: true, post: updated });
  } catch (err) {
    logger.error("[admin/feed-patch] failed", err as Error, { postId });
    return NextResponse.json(
      { error: "Update failed (post may not exist)" },
      { status: 404 },
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { postId } = await params;
  if (!postId) {
    return NextResponse.json({ error: "postId required" }, { status: 400 });
  }

  try {
    // If this is a voice-note post, grab the R2 key before we delete the
    // row. The voiceNoteUrl is of the form
    //   https://pub-XXX.r2.dev/voice-notes/vn-1234567890-abc.m4a
    // We strip the public-URL prefix to recover the object key, then best-
    // effort delete from R2 AFTER the DB row is gone. DB is authoritative
    // so a failed R2 delete leaves an orphan object but the user-facing
    // state is consistent, easier to garbage-collect orphans later than
    // to leave the DB referencing deleted audio.
    const post = await prisma.feedPost.findUnique({
      where: { id: postId },
      select: { voiceNoteUrl: true, type: true },
    });

    await prisma.feedPost.delete({ where: { id: postId } });

    if (
      post?.type === "VOICE_NOTE" &&
      post.voiceNoteUrl &&
      isR2Configured()
    ) {
      const publicBase = (process.env.R2_PUBLIC_URL ?? "").replace(/\/$/, "");
      if (publicBase && post.voiceNoteUrl.startsWith(publicBase + "/")) {
        const key = post.voiceNoteUrl.slice(publicBase.length + 1);
        try {
          await deleteFromR2(key);
        } catch (err) {
          logger.warn("[admin/feed-delete] R2 delete failed (orphan ok)", {
            postId,
            key,
            err: (err as Error).message,
          });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    logger.error("[admin/feed-delete] failed", err as Error, { postId });
    return NextResponse.json(
      { error: "Delete failed (post may not exist)" },
      { status: 404 },
    );
  }
}
