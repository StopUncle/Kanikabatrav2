import { NextRequest, NextResponse } from "next/server";
import {
  resolveActiveUserId,
  resolveActiveUserIdFromRequest,
} from "@/lib/auth/resolve-user";
import { prisma } from "@/lib/prisma";
import {
  mergeEmailPreferences,
  normalizeEmailPreferences,
} from "@/lib/email-preferences";
import { logger } from "@/lib/logger";

/**
 * Email preferences, read and write.
 *
 * PUT used to replace the stored object wholesale with whatever the client
 * sent, unvalidated. Any client that knew fewer keys than the server
 * deleted the rest, and since every gate in the codebase reads an absent
 * key as opted-IN, a deletion silently re-subscribed people. It now MERGES
 * over what is stored and whitelists to the known keys, so a partial or
 * stale client can only change what it actually knows about.
 *
 * Both handlers resolve the user through `resolve-user`, which accepts the
 * refreshToken fallback. That matters: preferences are often opened from a
 * link in an email hours after the 15 minute access token expired.
 */

export async function GET() {
  try {
    const userId = await resolveActiveUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { emailPreferences: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Always hand back all five keys. A client that renders straight from
    // this response can then write back exactly what it read without
    // having to know the defaults.
    return NextResponse.json({
      emailPreferences: normalizeEmailPreferences(user.emailPreferences),
    });
  } catch (error) {
    logger.error("[user/settings] failed to read preferences", error as Error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = await resolveActiveUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { emailPreferences } = body ?? {};

    if (
      !emailPreferences ||
      typeof emailPreferences !== "object" ||
      Array.isArray(emailPreferences)
    ) {
      return NextResponse.json(
        { error: "Invalid preferences" },
        { status: 400 },
      );
    }

    // Read-then-merge. The read and the write are not in a transaction
    // because the only writer is the account owner and the loss window is
    // one toggle, but the merge means a concurrent write from a second tab
    // loses at most the key it was itself changing rather than all five.
    const existing = await prisma.user.findUnique({
      where: { id: userId },
      select: { emailPreferences: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const merged = mergeEmailPreferences(
      existing.emailPreferences,
      emailPreferences,
    );

    await prisma.user.update({
      where: { id: userId },
      data: { emailPreferences: merged },
    });

    // Echo the stored result so the client can settle on the truth rather
    // than on its own optimistic guess.
    return NextResponse.json({ success: true, emailPreferences: merged });
  } catch (error) {
    logger.error(
      "[user/settings] failed to update preferences",
      error as Error,
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
