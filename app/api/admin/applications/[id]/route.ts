import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendApplicationApproved } from "@/lib/email";
import { logger } from "@/lib/logger";
import { requireAdminSession } from "@/lib/admin/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const body = await request.json();
    const { action, note } = body as { action: string; note?: string };

    if (!action || !["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Must be 'approve' or 'reject'" },
        { status: 400 },
      );
    }

    const membership = await prisma.communityMembership.findUnique({
      where: { id },
    });

    if (!membership) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 },
      );
    }

    if (action === "approve") {
      // Guard: only PENDING memberships can be approved. Without this,
      // clicking approve on an ACTIVE member flips them to APPROVED and
      // locks them out of the feed/courses until another webhook fires.
      if (membership.status !== "PENDING") {
        return NextResponse.json(
          { error: `Cannot approve — membership is ${membership.status}, not PENDING` },
          { status: 400 },
        );
      }

      const updated = await prisma.communityMembership.update({
        where: { id },
        data: {
          status: "APPROVED",
          approvedAt: new Date(),
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      });

      // Notify the applicant — fire-and-forget so a transient SMTP failure
      // doesn't make the admin think the approval itself failed.
      if (updated.user?.email) {
        sendApplicationApproved(
          updated.user.email,
          updated.user.name || "Member",
        ).catch((err) =>
          logger.error("Failed to send approval email", err as Error),
        );
      }

      return NextResponse.json({
        success: true,
        message: "Application approved",
        membership: updated,
      });
    }

    const existingData =
      (membership.applicationData as Record<string, unknown>) || {};
    const updated = await prisma.communityMembership.update({
      where: { id },
      data: {
        status: "CANCELLED",
        applicationData: {
          ...existingData,
          rejectionNote: note || "Application rejected by admin",
          rejectedAt: new Date().toISOString(),
        },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Application rejected",
      membership: updated,
    });
  } catch (error) {
    console.error("Error processing application:", error);
    return NextResponse.json(
      { error: "Failed to process application" },
      { status: 500 },
    );
  }
}
