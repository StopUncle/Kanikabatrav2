import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(request.url);
    const roleParam = searchParams.get("role") || "ALL";
    const bannedParam = searchParams.get("banned") || "false";

    const where: Record<string, unknown> = {};

    if (roleParam !== "ALL") {
      where.role = roleParam;
    }

    if (bannedParam === "true") {
      where.isBanned = true;
    } else if (bannedParam === "false") {
      where.isBanned = false;
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        displayName: true,
        role: true,
        isBanned: true,
        banReason: true,
        createdAt: true,
        communityMembership: {
          select: {
            id: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    const formatted = users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      displayName: user.displayName,
      role: user.role,
      isBanned: user.isBanned,
      banReason: user.banReason,
      createdAt: user.createdAt,
      membershipStatus: user.communityMembership?.status || null,
    }));

    return NextResponse.json({
      success: true,
      users: formatted,
      count: formatted.length,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}
