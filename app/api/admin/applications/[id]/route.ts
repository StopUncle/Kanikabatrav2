import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendApplicationApproved } from "@/lib/email";
import { logger } from "@/lib/logger";

function validateAdminAccess(request: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) {
    console.error("ADMIN_SECRET environment variable not configured");
    return false;
  }

  const providedSecret = request.headers.get("x-admin-secret");
  return providedSecret === adminSecret;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!validateAdminAccess(request)) {
    return NextResponse.json(
      { error: "Unauthorized - valid admin credentials required" },
      { status: 401 },
    );
  }

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
