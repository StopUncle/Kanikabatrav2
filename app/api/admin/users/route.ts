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

    // Bots are real User rows but must NEVER appear in admin member views
    // or counters. They have their own surface at /admin/bots.
    const where: Record<string, unknown> = { isBot: false };

    if (roleParam !== "ALL") {
      where.role = roleParam;
    }

    if (bannedParam === "true") {
      where.isBanned = true;
    } else if (bannedParam === "false") {
      where.isBanned = false;
    }

    // List view stays paginated at 100, the dashboard table can't
    // render thousands. But `count` and `memberCount` must reflect the
    // full table; otherwise the admin dashboard tile reads
    // formatted.length and gets capped forever once the userbase
    // exceeds 100. Confirmed in prod April 2026: tile stuck at "100
    // Total Members" for weeks while the userbase grew to 300+.
    const [users, totalUsers, totalMembers] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          displayName: true,
          role: true,
          isBanned: true,
          banReason: true,
          messagingRestricted: true,
          messagingRestrictedReason: true,
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
      }),
      prisma.user.count({ where }),
      prisma.communityMembership.count({
        where: { status: "ACTIVE", user: { isBot: false } },
      }),
    ]);

    const formatted = users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      displayName: user.displayName,
      role: user.role,
      isBanned: user.isBanned,
      banReason: user.banReason,
      messagingRestricted: user.messagingRestricted,
      messagingRestrictedReason: user.messagingRestrictedReason,
      createdAt: user.createdAt,
      membershipStatus: user.communityMembership?.status || null,
    }));

    return NextResponse.json({
      success: true,
      users: formatted,
      count: totalUsers,
      memberCount: totalMembers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}
