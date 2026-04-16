import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

/**
 * Admin actions on a single CommentReport.
 *
 * Body: { action: "dismiss" | "hide-comment" }
 *
 * - dismiss         resolves the report, leaves the comment as-is
 * - hide-comment    sets FeedComment.status = HIDDEN and resolves
 *                   all reports for that comment in one transaction
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { id } = await params;

  const body = await request.json().catch(() => ({}));
  const action = body.action as string | undefined;

  if (!action || !["dismiss", "hide-comment"].includes(action)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const report = await prisma.commentReport.findUnique({
    where: { id },
    select: { id: true, commentId: true },
  });
  if (!report) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  if (action === "dismiss") {
    await prisma.commentReport.update({
      where: { id },
      data: { resolvedAt: new Date() },
    });
    return NextResponse.json({ ok: true, action: "dismissed" });
  }

  // hide-comment: flip the comment + resolve every report for it
  await prisma.$transaction([
    prisma.feedComment.update({
      where: { id: report.commentId },
      data: { status: "HIDDEN" },
    }),
    prisma.commentReport.updateMany({
      where: { commentId: report.commentId, resolvedAt: null },
      data: { resolvedAt: new Date() },
    }),
  ]);

  return NextResponse.json({ ok: true, action: "hidden" });
}
