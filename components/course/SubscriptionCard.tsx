'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Crown, Check, Zap, Shield, BookOpen, MessageSquare } from 'lucide-react'
import Link from 'next/link'

interface SubscriptionCardProps {
  course: {
    id: string
    title: string
    slug: string
    price: number
    tier: string
  }
  isLoggedIn: boolean
  hasSubscription: boolean
  subscriptionStatus?: string
  onSubscribe?: () => void
}

const benefits = [
  { icon: BookOpen, text: 'All video lessons' },
  { icon: MessageSquare, text: 'Community forum access' },
  { icon: Zap, text: 'New content updates' },
  { icon: Shield, text: 'Cancel anytime' }
]

export default function SubscriptionCard({
  course,
  isLoggedIn,
  hasSubscription,
  subscriptionStatus,
  onSubscribe
}: SubscriptionCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const isGold = course.tier === 'gold'

  const handleSubscribe = async () => {
    if (!isLoggedIn) {
      window.location.href = `/login?redirect=/courses/${course.slug}`
      return
    }

    setIsLoading(true)
    if (onSubscribe) {
      onSubscribe()
    }
    setIsLoading(false)
  }

  if (hasSubscription && subscriptionStatus === 'ACTIVE') {
    return (
      <div className="bg-deep-black/40 backdrop-blur-sm border border-accent-gold rounded-2xl p-6">
        <div className="flex items-center gap-2 text-accent-gold mb-4">
          <Check className="w-5 h-5" />
          <span className="font-medium">Active Subscription</span>
        </div>
        <p className="text-text-gray text-sm mb-4">
          You have full access to all course content and community features.
        </p>
        <Link
          href="/dashboard"
          className="block w-full text-center bg-accent-gold/10 text-accent-gold py-3 rounded-lg hover:bg-accent-gold/20 transition-colors"
        >
          Manage Subscription
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-deep-black/40 backdrop-blur-sm border rounded-2xl p-6 ${
        isGold ? 'border-accent-gold' : 'border-accent-gold/20'
      }`}
    >
      {isGold && (
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-5 h-5 text-accent-gold" />
          <span className="text-accent-gold font-medium">Gold Tier</span>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-light gradient-text">${course.price}</span>
          <span className="text-text-muted">/month</span>
        </div>
        <p className="text-text-muted text-sm mt-1">Billed monthly</p>
      </div>

      <ul className="space-y-3 mb-6">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-center gap-3 text-sm text-text-light">
            <benefit.icon className="w-4 h-4 text-accent-gold flex-shrink-0" />
            <span>{benefit.text}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubscribe}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-accent-burgundy to-accent-sapphire text-white py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-accent-burgundy/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </span>
        ) : isLoggedIn ? (
          'Subscribe Now'
        ) : (
          'Login to Subscribe'
        )}
      </button>

      <p className="text-center text-xs text-text-muted mt-4">
        Secure payment via PayPal. Cancel anytime.
      </p>
    </motion.div>
  )
}
