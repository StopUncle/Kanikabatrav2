import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { requireAdminSession } from "@/lib/admin/auth";

const VALID_ROLES: UserRole[] = ["MEMBER", "MODERATOR", "ADMIN"];

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const body = await request.json();
    const { action, reason, role } = body as {
      action: string;
      reason?: string;
      role?: string;
    };

    const VALID_ACTIONS = [
      "ban",
      "unban",
      "set-role",
      "restrict-messaging",
      "unrestrict-messaging",
    ] as const;
    if (!action || !VALID_ACTIONS.includes(action as (typeof VALID_ACTIONS)[number])) {
      return NextResponse.json(
        { error: `Invalid action. Must be one of: ${VALID_ACTIONS.join(", ")}` },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    }

    if (action === "ban") {
      const updated = await prisma.$transaction(async (tx) => {
        const bannedUser = await tx.user.update({
          where: { id },
          data: {
            isBanned: true,
            banReason: reason || "Banned by admin",
          },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            isBanned: true,
            banReason: true,
            createdAt: true,
          },
        });

        await tx.communityMembership.updateMany({
          where: { userId: id, status: { not: "SUSPENDED" } },
          data: {
            status: "SUSPENDED",
            suspendedAt: new Date(),
            suspendReason: reason || "User banned",
          },
        });

        return bannedUser;
      });

      return NextResponse.json({
        success: true,
        message: "User banned",
        user: updated,
      });
    }

    if (action === "unban") {
      const updated = await prisma.user.update({
        where: { id },
        data: {
          isBanned: false,
          banReason: null,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isBanned: true,
          banReason: true,
          createdAt: true,
        },
      });

      return NextResponse.json({
        success: true,
        message: "User unbanned",
        user: updated,
      });
    }

    if (action === "set-role") {
      if (!role || !VALID_ROLES.includes(role as UserRole)) {
        return NextResponse.json(
          {
            error: `Invalid role. Must be one of: ${VALID_ROLES.join(", ")}`,
          },
          { status: 400 },
        );
      }

      const updated = await prisma.user.update({
        where: { id },
        data: { role: role as UserRole },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isBanned: true,
          banReason: true,
          createdAt: true,
        },
      });

      return NextResponse.json({
        success: true,
        message: `User role updated to ${role}`,
        user: updated,
      });
    }

    if (action === "restrict-messaging") {
      const updated = await prisma.user.update({
        where: { id },
        data: {
          messagingRestricted: true,
          messagingRestrictedAt: new Date(),
          messagingRestrictedReason: reason || "Restricted by admin",
        },
        select: {
          id: true,
          email: true,
          name: true,
          messagingRestricted: true,
          messagingRestrictedReason: true,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Messaging restricted",
        user: updated,
      });
    }

    if (action === "unrestrict-messaging") {
      const updated = await prisma.user.update({
        where: { id },
        data: {
          messagingRestricted: false,
          messagingRestrictedAt: null,
          messagingRestrictedReason: null,
        },
        select: {
          id: true,
          email: true,
          name: true,
          messagingRestricted: true,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Messaging unrestricted",
        user: updated,
      });
    }

    return NextResponse.json(
      { error: "Unhandled action" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Error managing user:", error);
    return NextResponse.json(
      { error: "Failed to manage user" },
      { status: 500 },
    );
  }
}
