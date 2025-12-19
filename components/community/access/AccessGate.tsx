'use client'

import { ReactNode } from 'react'
import { Lock, Crown, BookOpen, Users } from 'lucide-react'
import Link from 'next/link'

interface AccessGateProps {
  children?: ReactNode
  hasAccess: boolean
  requiredTier?: string
  reason?: string
  upgradeUrl?: string
}

export default function AccessGate({
  children,
  hasAccess,
  requiredTier,
  reason,
  upgradeUrl
}: AccessGateProps) {
  if (hasAccess) {
    return <>{children}</>
  }

  function getTierIcon() {
    switch (requiredTier) {
      case 'PREMIUM':
        return <Crown className="w-16 h-16 text-accent-gold" />
      case 'BOOK_OWNER':
        return <BookOpen className="w-16 h-16 text-accent-burgundy" />
      case 'COACHING_CLIENT':
        return <Users className="w-16 h-16 text-purple-400" />
      default:
        return <Lock className="w-16 h-16 text-gray-500" />
    }
  }

  function getTierName() {
    switch (requiredTier) {
      case 'PREMIUM':
        return 'Premium Members'
      case 'BOOK_OWNER':
        return 'Book Owners'
      case 'COACHING_CLIENT':
        return 'Coaching Clients'
      case 'REGISTERED':
        return 'Registered Users'
      default:
        return 'Members'
    }
  }

  function getUpgradeMessage() {
    switch (requiredTier) {
      case 'PREMIUM':
        return 'Upgrade to premium to unlock this exclusive content'
      case 'BOOK_OWNER':
        return 'Purchase the book to access this content'
      case 'COACHING_CLIENT':
        return 'Become a coaching client to join this space'
      case 'REGISTERED':
        return 'Create an account to participate'
      default:
        return 'Upgrade your access to view this content'
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md text-center p-8 bg-deep-navy/50 border border-gray-800 rounded-xl">
        <div className="mb-6 flex justify-center">
          {getTierIcon()}
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">
          {getTierName()} Only
        </h2>

        <p className="text-gray-400 mb-2">
          {reason || getUpgradeMessage()}
        </p>

        <p className="text-sm text-gray-500 mb-6">
          This content is exclusively available to {getTierName().toLowerCase()}.
        </p>

        <div className="space-y-3">
          {upgradeUrl ? (
            <Link
              href={upgradeUrl}
              className="block w-full py-3 px-6 bg-accent-gold text-deep-black rounded-lg font-semibold hover:bg-accent-gold/90 transition-colors"
            >
              {requiredTier === 'REGISTERED' ? 'Sign Up Now' : 'Upgrade Access'}
            </Link>
          ) : requiredTier === 'REGISTERED' ? (
            <>
              <Link
                href="/login"
                className="block w-full py-3 px-6 bg-accent-gold text-deep-black rounded-lg font-semibold hover:bg-accent-gold/90 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block w-full py-3 px-6 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Create Account
              </Link>
            </>
          ) : (
            <Link
              href="/book"
              className="block w-full py-3 px-6 bg-accent-gold text-deep-black rounded-lg font-semibold hover:bg-accent-gold/90 transition-colors"
            >
              View Options
            </Link>
          )}

          <Link
            href="/community"
            className="block text-sm text-gray-400 hover:text-white transition-colors"
          >
            Back to Community
          </Link>
        </div>
      </div>
    </div>
  )
}
