import { prisma } from "@/lib/prisma";
import { MembershipStatus } from "@prisma/client";

export interface MembershipCheck {
  isMember: boolean;
  status: MembershipStatus | null;
  membership: {
    id: string;
    status: MembershipStatus;
    billingCycle: string;
    activatedAt: Date | null;
    expiresAt: Date | null;
  } | null;
  reason?: string;
  redirectUrl?: string;
}

export async function checkMembership(userId: string | null): Promise<MembershipCheck> {
  if (!userId) {
    return {
      isMember: false,
      status: null,
      membership: null,
      reason: "Login required",
      redirectUrl: "/login",
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isBanned: true, banReason: true },
  });

  if (user?.isBanned) {
    return {
      isMember: false,
      status: "SUSPENDED" as MembershipStatus,
      membership: null,
      reason: user.banReason || "Your account has been suspended",
    };
  }

  const membership = await prisma.communityMembership.findUnique({
    where: { userId },
    select: {
      id: true,
      status: true,
      billingCycle: true,
      activatedAt: true,
      expiresAt: true,
    },
  });

  if (!membership) {
    return {
      isMember: false,
      status: null,
      membership: null,
      reason: "Not a member",
      redirectUrl: "/inner-circle",
    };
  }

  // CANCELLED but still within paid period — allow access until expiresAt
  if (membership.status === "CANCELLED" && membership.expiresAt && membership.expiresAt > new Date()) {
    return { isMember: true, membership, status: membership.status };
  }

  if (membership.status !== "ACTIVE") {
    const redirectMap: Record<string, string> = {
      PENDING: "/inner-circle/apply?status=pending",
      APPROVED: "/inner-circle/apply?status=approved",
      CANCELLED: "/inner-circle?status=cancelled",
      EXPIRED: "/inner-circle?status=expired",
      SUSPENDED: "/inner-circle?status=suspended",
    };

    return {
      isMember: false,
      status: membership.status,
      membership,
      reason: `Membership status: ${membership.status.toLowerCase()}`,
      redirectUrl: redirectMap[membership.status] || "/inner-circle",
    };
  }

  // Lazy expiry: active membership past expiresAt
  if (membership.expiresAt && membership.expiresAt < new Date()) {
    await prisma.communityMembership.update({
      where: { id: membership.id },
      data: { status: "EXPIRED" },
    });

    return {
      isMember: false,
      status: "EXPIRED",
      membership,
      reason: "Membership expired",
      redirectUrl: "/inner-circle?status=expired",
    };
  }

  return {
    isMember: true,
    status: "ACTIVE",
    membership,
  };
}

export async function isAdmin(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  return user?.role === "ADMIN" || user?.role === "MODERATOR";
}
