import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { readPact } from "@/lib/pact/read";
import { classifyEntry, CRISIS_CARD } from "@/lib/program/ai/safety";

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
    const body = (await req.json().catch(() => null)) as {
      journalBody?: unknown;
      publicBody?: unknown;
      share?: unknown;
    } | null;

    const journalBody =
      typeof body?.journalBody === "string" ? body.journalBody.trim() : "";
    const publicBody =
      typeof body?.publicBody === "string" ? body.publicBody.trim() : "";
    const share = body?.share === true;

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

    if (flagged) {
      return NextResponse.json({ success: true, flagged: true, card: CRISIS_CARD });
    }
    return NextResponse.json({
      success: true,
      flagged: false,
      shared: share && !!publicBody,
    });
  });
}
