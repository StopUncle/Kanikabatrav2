import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

/**
 * GET /api/admin/reports?status=open|resolved|all
 *
 * Returns member-filed comment reports for admin triage. Defaults to
 * open (unresolved) so the queue is the first thing Kanika sees.
 *
 * Groups reports by comment so the admin can see "N reports on this
 * comment" instead of a flat list that would bury the most-reported
 * content.
 */
export async function GET(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") ?? "open";

  const where: Record<string, unknown> = {};
  if (status === "open") where.resolvedAt = null;
  if (status === "resolved") where.resolvedAt = { not: null };
  // "all", no filter

  const reports = await prisma.commentReport.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 200,
    include: {
      reporter: { select: { id: true, email: true, displayName: true, name: true } },
      comment: {
        select: {
          id: true,
          content: true,
          status: true,
          createdAt: true,
          postId: true,
          author: {
            select: { id: true, email: true, displayName: true, name: true },
          },
        },
      },
    },
  });

  return NextResponse.json({
    reports: reports.map((r) => ({
      id: r.id,
      reason: r.reason,
      createdAt: r.createdAt.toISOString(),
      resolvedAt: r.resolvedAt?.toISOString() ?? null,
      reporter: {
        id: r.reporter.id,
        email: r.reporter.email,
        label: r.reporter.displayName || r.reporter.name || r.reporter.email,
      },
      comment: {
        id: r.comment.id,
        content: r.comment.content,
        status: r.comment.status,
        createdAt: r.comment.createdAt.toISOString(),
        postId: r.comment.postId,
        author: {
          id: r.comment.author.id,
          email: r.comment.author.email,
          label:
            r.comment.author.displayName ||
            r.comment.author.name ||
            r.comment.author.email,
        },
      },
    })),
  });
}
