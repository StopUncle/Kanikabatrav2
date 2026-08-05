import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { readPact } from "@/lib/pact/read";
import { classifyEntry, CRISIS_CARD } from "@/lib/program/ai/safety";
import { enforceRateLimit, limits } from "@/lib/rate-limit";

const MAX_JOURNAL_CHARS = 8000;
const MAX_PUBLIC_CHARS = 2000;

/**
 * The weekly journal. journalBody is private and never leaves; publicBody
 * is a SEPARATE box the member fills deliberately, the only text that can
 * ever reach the wall. The crisis classifier runs before storage (it fails
 * closed); a flagged entry stores privately, shows the human-written card,
 * and can never be shared. Writable only while the week is open: after the
 * week resolves, the record is the record.
 */
export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    // Every save runs the crisis classifier (an LLM call) and the entry
    // is an update, so without this a loop re-saves the same week
    // endlessly at real cost.
    const limited = await enforceRateLimit(limits.pactEntrySave, user.id);
    if (limited) return limited;

    const body = (await req.json().catch(() => null)) as {
      journalBody?: unknown;
      publicBody?: unknown;
      share?: unknown;
      anonymous?: unknown;
    } | null;

    const journalBody =
      typeof body?.journalBody === "string" ? body.journalBody.trim() : "";
    const publicBody =
      typeof body?.publicBody === "string" ? body.publicBody.trim() : "";
    const share = body?.share === true;
    const anonymous = body?.anonymous === true;

    if (!journalBody) {
      return NextResponse.json({ error: "Write the week first" }, { status: 400 });
    }
    if (journalBody.length > MAX_JOURNAL_CHARS) {
      return NextResponse.json(
        { error: `Keep it under ${MAX_JOURNAL_CHARS} characters` },
        { status: 400 },
      );
    }
    if (publicBody.length > MAX_PUBLIC_CHARS) {
      return NextResponse.json(
        { error: `The shared note caps at ${MAX_PUBLIC_CHARS} characters` },
        { status: 400 },
      );
    }
    if (share && !publicBody) {
      return NextResponse.json(
        { error: "Nothing in the shared box to share" },
        { status: 400 },
      );
    }

    const read = await readPact(user.id);
    if (!read.pact || !read.entry) {
      return NextResponse.json({ error: "No open week" }, { status: 404 });
    }
    if (read.entry.weekEndsAt < new Date()) {
      return NextResponse.json(
        { error: "That week has closed" },
        { status: 409 },
      );
    }

    // Classify the private entry and, when sharing, the public note too:
    // the wall must never carry what the card was written to catch.
    const toClassify = share ? `${journalBody}\n\n${publicBody}` : journalBody;
    const classification = await classifyEntry(toClassify);
    const flagged = classification.crisis;

    await prisma.pactEntry.update({
      where: { id: read.entry.id },
      data: {
        journalBody,
        flagged: flagged ? true : undefined,
        ...(flagged
          ? { publicBody: null, sharedAt: null }
          : {
              publicBody: publicBody || null,
              sharedAt: share ? (read.entry.sharedAt ?? new Date()) : null,
            }),
      },
    });

    // The shared note goes through to the feed as the member's own small
    // post (type PACT_NOTE), under their name or Anonymous as they chose.
    // Tracked by id so an edit updates the same post and a retraction (or
    // a crisis flag) removes it. The real authorId is stored either way;
    // anonymity is applied when the post is serialized, never by dropping
    // the author. Admin post moderation can still take it down, which
    // SetNulls the link.
    const wantShared = share && !!publicBody && !flagged;
    const existingPostId = read.entry.feedPostId;
    let feedPostId: string | null = null;

    const noteData = {
      title: `Pact week ${read.entry.weekNumber}`,
      content: publicBody,
      metadata: {
        pactNote: true,
        weekNumber: read.entry.weekNumber,
        anonymous,
      },
    };

    if (wantShared) {
      const updated = existingPostId
        ? await prisma.feedPost.updateMany({
            where: { id: existingPostId },
            data: noteData,
          })
        : { count: 0 };
      if (updated.count > 0) {
        feedPostId = existingPostId;
      } else {
        const post = await prisma.feedPost.create({
          data: {
            ...noteData,
            type: "PACT_NOTE",
            authorId: user.id,
          },
          select: { id: true },
        });
        await prisma.pactEntry.update({
          where: { id: read.entry.id },
          data: { feedPostId: post.id },
        });
        feedPostId = post.id;
      }
    } else if (existingPostId) {
      await prisma.feedPost.deleteMany({ where: { id: existingPostId } });
    }

    if (flagged) {
      return NextResponse.json({ success: true, flagged: true, card: CRISIS_CARD });
    }
    return NextResponse.json({
      success: true,
      flagged: false,
      shared: wantShared,
      feedPostId: wantShared ? feedPostId : null,
    });
  });
}
