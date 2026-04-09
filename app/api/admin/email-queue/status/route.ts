import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

export async function GET(_request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const [pending, sent, failed, cancelled] = await Promise.all([
      prisma.emailQueue.count({ where: { status: "PENDING" } }),
      prisma.emailQueue.count({ where: { status: "SENT" } }),
      prisma.emailQueue.count({ where: { status: "FAILED" } }),
      prisma.emailQueue.count({ where: { status: "CANCELLED" } }),
    ]);

    const [upcoming, recent] = await Promise.all([
      prisma.emailQueue.findMany({
        where: { status: "PENDING" },
        orderBy: { scheduledAt: "asc" },
        take: 10,
        select: {
          id: true,
          recipientEmail: true,
          recipientName: true,
          sequence: true,
          step: true,
          subject: true,
          scheduledAt: true,
        },
      }),
      prisma.emailQueue.findMany({
        where: { status: "SENT" },
        orderBy: { sentAt: "desc" },
        take: 10,
        select: {
          id: true,
          recipientEmail: true,
          recipientName: true,
          sequence: true,
          step: true,
          subject: true,
          sentAt: true,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      counts: { pending, sent, failed, cancelled },
      upcoming,
      recent,
    });
  } catch (error) {
    console.error("Error fetching email queue status:", error);
    return NextResponse.json(
      { error: "Failed to fetch email queue status" },
      { status: 500 },
    );
  }
}
