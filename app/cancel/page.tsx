'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import BackgroundEffects from '@/components/BackgroundEffects'
import Header from '@/components/Header'
import GradientText from '@/components/ui/GradientText'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import DoubleEchoLogo from '@/components/DoubleEchoLogo'
import { logger } from '@/lib/logger'

function CancelContent() {
  const searchParams = useSearchParams()

  useEffect(() => {
    // Log payment cancellation
    const orderId = searchParams.get('order_id')
    const type = searchParams.get('type')

    logger.warn('Payment cancelled by user', {
      orderId,
      type,
      timestamp: new Date().toISOString()
    })
  }, [searchParams])

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full flex items-center justify-center"
          >
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GradientText className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Payment Cancelled
            </GradientText>
            <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
              Your payment was cancelled. No charges were made to your account.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* What Happened */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <h2 className="text-2xl font-bold mb-6 text-gold">What Happened?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-orange-400 text-lg">⏸️</span>
                  <div>
                    <p className="text-text-light font-medium">Payment Cancelled</p>
                    <p className="text-text-muted text-sm">You chose to cancel the payment process</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-lg">💳</span>
                  <div>
                    <p className="text-text-light font-medium">No Charges Made</p>
                    <p className="text-text-muted text-sm">Your payment method was not charged</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-blue-400 text-lg">🔄</span>
                  <div>
                    <p className="text-text-light font-medium">Try Again Anytime</p>
                    <p className="text-text-muted text-sm">You can complete your purchase whenever you&apos;re ready</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Common Questions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <h2 className="text-2xl font-bold mb-6 text-gold">Common Questions</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-text-light font-medium mb-2">Why was my payment cancelled?</p>
                  <p className="text-text-muted text-sm">
                    You chose to cancel during the payment process, or closed the payment window.
                  </p>
                </div>

                <div>
                  <p className="text-text-light font-medium mb-2">Will I be charged?</p>
                  <p className="text-text-muted text-sm">
                    No, no charges were made to your payment method since the transaction was cancelled.
                  </p>
                </div>

                <div>
                  <p className="text-text-light font-medium mb-2">Can I try again?</p>
                  <p className="text-text-muted text-sm">
                    Absolutely! You can return anytime to complete your purchase.
                  </p>
                </div>

                <div>
                  <p className="text-text-light font-medium mb-2">Need help?</p>
                  <p className="text-text-muted text-sm">
                    Contact us if you experienced any issues during checkout.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <Card className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-gold">Why not try again?</h2>
            <p className="text-text-muted mb-8 max-w-2xl mx-auto">
              Ready to unlock the dark psychology secrets? Transform your mindset and master human psychology.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2 text-text-light">Sociopathic Dating Bible</h3>
                <p className="text-text-muted text-sm mb-4">Psychology of Power - $34.99</p>
                <Link href="/#book">
                  <Button variant="primary" fullWidth>
                    Get the Book
                  </Button>
                </Link>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2 text-text-light">1-on-1 Coaching</h3>
                <p className="text-text-muted text-sm mb-4">Dark Psychology Sessions</p>
                <Link href="/coaching">
                  <Button variant="secondary" fullWidth>
                    Book Session
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
        >
          <Link href="/">
            <Button variant="primary" size="lg">
              Back to Home
            </Button>
          </Link>

          <Link href="/coaching">
            <Button variant="outline" size="lg">
              View Coaching
            </Button>
          </Link>

          <Link href="/contact">
            <Button variant="ghost" size="lg">
              Contact Support
            </Button>
          </Link>
        </motion.div>

        {/* Reassurance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-text-muted">
            🔒 All payments are processed securely • No hidden fees • 24/7 Support
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function CancelPage() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <Suspense fallback={
        <div className="min-h-screen pt-20 sm:pt-24 pb-16 flex items-center justify-center relative z-10">
          <div className="text-center">
            <DoubleEchoLogo size="xl" animate={true} className="mx-auto mb-8" />
            <p className="text-text-muted">Loading...</p>
          </div>
        </div>
      }>
        <CancelContent />
      </Suspense>
    </>
  )
}