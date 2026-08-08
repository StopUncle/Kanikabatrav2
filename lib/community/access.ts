import { prisma } from "@/lib/prisma";
import { AccessTier } from "@prisma/client";
import { getAccess, canAccessMemberOnly } from "@/lib/access/tier";

export interface AccessCheckResult {
  hasAccess: boolean;
  reason?: string;
  requiredTier?: AccessTier;
  upgradeUrl?: string;
}

/**
 * Access to forum, chat and classroom content.
 *
 * This helper predates the Pact/Consilium ladder: its tiers are BOOK_OWNER,
 * COACHING_CLIENT and PREMIUM, and it has no idea what a membership is. The
 * `PUBLIC` branch returned `hasAccess: true` without so much as checking for
 * a userId, and `PUBLIC` is the schema default for both `Category` and
 * `ChatRoom` (prisma/schema.prisma:483, 582) — so any category created
 * without an explicit tier was readable, and postable, by anyone at all.
 *
 * The pages for these surfaces redirect to the feed and have since
 * 2026-07-02, which hid the problem without fixing it: a page redirect is
 * not an API gate, and all twelve routes under `app/api/community/**` stayed
 * live behind this function.
 *
 * Every caller is a Consilium-internal surface, so membership is now the
 * baseline and the legacy tier can only narrow further from there. This is
 * the change `task_plan.md` 2.4 recorded and never made.
 */
export async function checkAccessTier(
  userId: string | null,
  requiredTier: AccessTier,
): Promise<AccessCheckResult> {
  // Membership first, for every tier including PUBLIC. Forum and chat live
  // inside the Consilium; there is no such thing as a public one.
  if (!userId) {
    return {
      hasAccess: false,
      reason: "Login required to access this content",
      requiredTier,
      upgradeUrl: "/login",
    };
  }

  const access = await getAccess(userId);
  if (!canAccessMemberOnly(access)) {
    return {
      hasAccess: false,
      reason: "Consilium membership required for access",
      requiredTier,
      upgradeUrl: "/consilium/apply",
    };
  }

  // PUBLIC and REGISTERED add nothing beyond membership.
  if (requiredTier === "PUBLIC" || requiredTier === "REGISTERED") {
    return { hasAccess: true };
  }

  // Fetch user purchases for tier validation
  const purchases = await prisma.purchase.findMany({
    where: {
      userId,
      status: "COMPLETED",
    },
    select: {
      type: true,
      productVariant: true,
    },
  });

  switch (requiredTier) {
    case "BOOK_OWNER": {
      const hasBook = purchases.some((p) => p.type === "BOOK");
      return {
        hasAccess: hasBook,
        reason: hasBook ? undefined : "Book purchase required for access",
        requiredTier,
        upgradeUrl: "/book",
      };
    }

    case "COACHING_CLIENT": {
      const hasCoaching = purchases.some((p) => p.type === "COACHING");
      return {
        hasAccess: hasCoaching,
        reason: hasCoaching
          ? undefined
          : "Coaching package required for access",
        requiredTier,
        upgradeUrl: "/coaching",
      };
    }

    case "PREMIUM": {
      const hasPremium = purchases.length > 0;
      return {
        hasAccess: hasPremium,
        reason: hasPremium ? undefined : "Purchase required for premium access",
        requiredTier,
        upgradeUrl: "/book",
      };
    }

    default:
      return { hasAccess: false, reason: "Unknown access tier" };
  }
}

export function getAccessTierLabel(tier: AccessTier): string {
  const labels: Record<AccessTier, string> = {
    PUBLIC: "Public",
    REGISTERED: "Members Only",
    BOOK_OWNER: "Book Owners",
    COACHING_CLIENT: "Coaching Clients",
    COURSE_SUBSCRIBER: "Course Subscribers",
    PREMIUM: "Premium Members",
  };
  return labels[tier] || tier;
}

export function getAccessTierColor(tier: AccessTier): string {
  const colors: Record<AccessTier, string> = {
    PUBLIC: "text-green-400",
    REGISTERED: "text-blue-400",
    BOOK_OWNER: "text-purple-400",
    COACHING_CLIENT: "text-amber-400",
    COURSE_SUBSCRIBER: "text-indigo-400",
    PREMIUM: "text-accent-gold",
  };
  return colors[tier] || "text-gray-400";
}
