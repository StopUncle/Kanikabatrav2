import { prisma } from '@/lib/prisma'
import { AccessTier } from '@prisma/client'

export interface AccessCheckResult {
  hasAccess: boolean
  reason?: string
  requiredTier?: AccessTier
  upgradeUrl?: string
}

export async function checkAccessTier(
  userId: string | null,
  requiredTier: AccessTier
): Promise<AccessCheckResult> {
  // PUBLIC: No authentication required
  if (requiredTier === 'PUBLIC') {
    return { hasAccess: true }
  }

  // All other tiers require login
  if (!userId) {
    return {
      hasAccess: false,
      reason: 'Login required to access this content',
      requiredTier,
      upgradeUrl: '/login'
    }
  }

  // REGISTERED: Just needs to be logged in
  if (requiredTier === 'REGISTERED') {
    return { hasAccess: true }
  }

  // Fetch user purchases for tier validation
  const purchases = await prisma.purchase.findMany({
    where: {
      userId,
      status: 'COMPLETED'
    },
    select: {
      type: true,
      productVariant: true
    }
  })

  switch (requiredTier) {
    case 'BOOK_OWNER': {
      const hasBook = purchases.some(p => p.type === 'BOOK')
      return {
        hasAccess: hasBook,
        reason: hasBook ? undefined : 'Book purchase required for access',
        requiredTier,
        upgradeUrl: '/book'
      }
    }

    case 'COACHING_CLIENT': {
      const hasCoaching = purchases.some(p => p.type === 'COACHING')
      return {
        hasAccess: hasCoaching,
        reason: hasCoaching ? undefined : 'Coaching package required for access',
        requiredTier,
        upgradeUrl: '/coaching'
      }
    }

    case 'PREMIUM': {
      const hasPremium = purchases.length > 0
      return {
        hasAccess: hasPremium,
        reason: hasPremium ? undefined : 'Purchase required for premium access',
        requiredTier,
        upgradeUrl: '/book'
      }
    }

    default:
      return { hasAccess: false, reason: 'Unknown access tier' }
  }
}

export function getAccessTierLabel(tier: AccessTier): string {
  const labels: Record<AccessTier, string> = {
    PUBLIC: 'Public',
    REGISTERED: 'Members Only',
    BOOK_OWNER: 'Book Owners',
    COACHING_CLIENT: 'Coaching Clients',
    COURSE_SUBSCRIBER: 'Course Subscribers',
    PREMIUM: 'Premium Members'
  }
  return labels[tier] || tier
}

export function getAccessTierColor(tier: AccessTier): string {
  const colors: Record<AccessTier, string> = {
    PUBLIC: 'text-green-400',
    REGISTERED: 'text-blue-400',
    BOOK_OWNER: 'text-purple-400',
    COACHING_CLIENT: 'text-amber-400',
    COURSE_SUBSCRIBER: 'text-indigo-400',
    PREMIUM: 'text-accent-gold'
  }
  return colors[tier] || 'text-gray-400'
}
