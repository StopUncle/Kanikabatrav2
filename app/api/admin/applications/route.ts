import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MembershipStatus } from "@prisma/client";

function validateAdminAccess(request: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) {
    console.error("ADMIN_SECRET environment variable not configured");
    return false;
  }

  const providedSecret = request.headers.get("x-admin-secret");
  return providedSecret === adminSecret;
}

export async function GET(request: NextRequest) {
  if (!validateAdminAccess(request)) {
    return NextResponse.json(
      { error: "Unauthorized - valid admin credentials required" },
      { status: 401 },
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status") || "PENDING";

    const where =
      statusParam === "ALL"
        ? {}
        : { status: statusParam as MembershipStatus };

    const applications = await prisma.communityMembership.findMany({
      where,
      select: {
        id: true,
        userId: true,
        status: true,
        applicationData: true,
        appliedAt: true,
        approvedAt: true,
        activatedAt: true,
        billingCycle: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            displayName: true,
          },
        },
      },
      orderBy: { appliedAt: "desc" },
      take: 100,
    });

    return NextResponse.json({
      success: true,
      applications,
      count: applications.length,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 },
    );
  }
}
