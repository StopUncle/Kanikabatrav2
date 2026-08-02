import { NextRequest, NextResponse } from "next/server";
import { verifyCronSecret } from "@/lib/cron-auth";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { escapeHtml } from "@/lib/escape-html";
import { INTRO_PROMPT_MARKER } from "@/lib/day0/checklist";

/**
 * Cron: the reply guarantee behind the Day-0 intro prompt.
 *
 * "I read every single one" only stays true if Kanika actually replies.
 * This finds intro comments that are 2 to 3 days old with no reply from
 * her yet and emails her a short list. The email goes to the ADMIN, not
 * the member; the member should only ever experience the reply itself.
 *
 * Expected schedule: daily. The [48h, 72h) age window means a daily run
 * surfaces each comment exactly once, so no sent-flag bookkeeping is
 * needed. If a run is missed, that day's comments age past the window
 * silently rather than double-nudging later.
 */
export async function POST(request: NextRequest) {
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const prompt = await prisma.feedPost.findFirst({
      where: { metadata: { path: ["marker"], equals: INTRO_PROMPT_MARKER } },
      select: { id: true },
    });
    if (!prompt) {
      return NextResponse.json({ ok: true, skipped: "no intro prompt" });
    }

    const now = Date.now();
    const unanswered = await prisma.feedComment.findMany({
      where: {
        postId: prompt.id,
        parentId: null,
        status: { not: "REJECTED" },
        author: { role: { not: "ADMIN" } },
        createdAt: {
          gte: new Date(now - 72 * 3600_000),
          lt: new Date(now - 48 * 3600_000),
        },
        children: { none: { author: { role: "ADMIN" } } },
      },
      select: {
        content: true,
        author: { select: { displayName: true, name: true, email: true } },
      },
      orderBy: { createdAt: "asc" },
      take: 20,
    });

    if (unanswered.length === 0) {
      return NextResponse.json({ ok: true, pending: 0 });
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";
    const postUrl = `${baseUrl}/consilium/feed/${prompt.id}`;
    const rows = unanswered
      .map((c) => {
        const who = escapeHtml(
          c.author.displayName || c.author.name || c.author.email,
        );
        const excerpt = escapeHtml(
          c.content.length > 140 ? `${c.content.slice(0, 140)}...` : c.content,
        );
        return `<li style="margin: 0 0 12px 0; color: #e5e5e5;"><strong>${who}</strong><br><span style="color: #a0a0a0;">${excerpt}</span></li>`;
      })
      .join("");

    const sent = await sendEmail({
      to: process.env.ADMIN_EMAIL || "Kanika@kanikarose.com",
      subject: `${unanswered.length} intro ${
        unanswered.length === 1 ? "comment" : "comments"
      } waiting on your reply`,
      html: `<div style="background: #0a0a0a; padding: 24px; font-family: -apple-system, sans-serif;">
        <p style="color: #e5e5e5;">New members introduced themselves two days ago and haven't heard back yet. A one-line reply from you is the whole reply guarantee.</p>
        <ul style="padding-left: 18px;">${rows}</ul>
        <p><a href="${postUrl}" style="color: #d4af37;">Open the intro thread</a></p>
      </div>`,
    });

    return NextResponse.json({ ok: true, pending: unanswered.length, sent });
  } catch (error) {
    console.error("intro-reply-nudge cron failed:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
