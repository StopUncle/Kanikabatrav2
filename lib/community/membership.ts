import { prisma } from "@/lib/prisma";
import { MembershipStatus } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

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
  // Admin bypass: admins with a valid admin_session cookie can preview
  // the Inner Circle as members would see it. The bypass returns a
  // synthetic ACTIVE result so all gated pages (feed, classroom, voice
  // notes) render normally.
  try {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin_session")?.value;
    if (adminSession) {
      const secret = process.env.JWT_SECRET;
      if (secret) {
        const payload = jwt.verify(adminSession, secret) as { role?: string };
        if (payload.role === "admin") {
          const membership = userId
            ? await prisma.communityMembership.findUnique({
                where: { userId },
                select: { id: true, status: true, billingCycle: true, activatedAt: true, expiresAt: true },
              })
            : null;
          return {
            isMember: true,
            status: "ACTIVE",
            membership: membership || {
              id: "admin-preview",
              status: "ACTIVE" as MembershipStatus,
              billingCycle: "MONTHLY",
              activatedAt: new Date(),
              expiresAt: new Date(Date.now() + 365 * 86_400_000),
            },
          };
        }
      }
    }
  } catch {
    // Admin cookie invalid/expired — fall through to normal check
  }

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
    // Still look up the real membership so callers reading
    // check.membership.expiresAt don't crash on null.
    const bannedMembership = await prisma.communityMembership.findUnique({
      where: { userId },
    });
    return {
      isMember: false,
      status: "SUSPENDED" as MembershipStatus,
      membership: bannedMembership,
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
      redirectUrl: "/consilium",
    };
  }

  // CANCELLED but still within paid period — allow access until expiresAt
  if (membership.status === "CANCELLED" && membership.expiresAt && membership.expiresAt > new Date()) {
    return { isMember: true, membership, status: membership.status };
  }

  // APPROVED applications that sit untouched for 14+ days auto-expire.
  // This prevents approved-but-abandoned applications from blocking the
  // pipeline indefinitely.
  if (membership.status === "APPROVED") {
    const approvedAt = membership.activatedAt || new Date(0);
    const fourteenDays = 14 * 24 * 60 * 60 * 1000;
    if (Date.now() - approvedAt.getTime() > fourteenDays) {
      await prisma.communityMembership.updateMany({
        where: { id: membership.id, status: "APPROVED" },
        data: { status: "EXPIRED" },
      });
      return {
        isMember: false,
        status: "EXPIRED",
        membership,
        reason: "Your approval has expired. Please reapply.",
        redirectUrl: "/consilium?status=expired",
      };
    }
  }

  if (membership.status !== "ACTIVE") {
    const redirectMap: Record<string, string> = {
      PENDING: "/consilium/apply?status=pending",
      APPROVED: "/consilium/apply?status=approved",
      CANCELLED: "/consilium?status=cancelled",
      EXPIRED: "/consilium?status=expired",
      SUSPENDED: "/consilium?status=suspended",
    };

    return {
      isMember: false,
      status: membership.status,
      membership,
      reason: `Membership status: ${membership.status.toLowerCase()}`,
      redirectUrl: redirectMap[membership.status] || "/consilium",
    };
  }

  // Lazy expiry: active membership past expiresAt. Use an optimistic
  // WHERE guard so a concurrent webhook renewal (which may have just
  // set status=ACTIVE + future expiresAt) doesn't get stomped to EXPIRED.
  if (membership.expiresAt && membership.expiresAt < new Date()) {
    await prisma.communityMembership.updateMany({
      where: { id: membership.id, status: "ACTIVE" },
      data: { status: "EXPIRED" },
    });

    return {
      isMember: false,
      status: "EXPIRED",
      membership,
      reason: "Membership expired",
      redirectUrl: "/consilium?status=expired",
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
