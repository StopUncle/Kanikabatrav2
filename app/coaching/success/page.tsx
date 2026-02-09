'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Calendar, Mail, MessageCircle, Sparkles, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import BackgroundEffects from '@/components/BackgroundEffects'

export default function CoachingSuccessPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [orderDetails, setOrderDetails] = useState<{
    sessionType: string
    schedulingLink: string
  } | null>(null)

  useEffect(() => {
    // Simulate loading order details
    setTimeout(() => {
      setIsLoading(false)
      // In production, fetch actual order details from your backend
      setOrderDetails({
        sessionType: 'Presence & Influence',
        schedulingLink: '/dashboard',
      })
    }, 2000)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-deep-black">
        <BackgroundEffects />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center z-10"
        >
          <div className="animate-spin w-16 h-16 border-4 border-gold border-t-transparent rounded-full mx-auto mb-6" />
          <p className="text-gold text-lg">Processing your transformation...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep-black text-text-light relative overflow-hidden">
      <BackgroundEffects />

      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 pt-20 pb-10"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-light mb-4 bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
            Welcome to Your Transformation
          </h1>
          <p className="text-xl text-text-muted">
            Your coaching session has been confirmed
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-2xl border border-gold/20 p-8 mb-8"
        >
          <div className="flex items-start mb-6">
            <Sparkles className="w-6 h-6 text-gold mr-3 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-light text-gold mb-2">Your Session: {orderDetails?.sessionType}</h2>
              <p className="text-text-muted">
                You&apos;ve taken the first step toward mastering your darkness and wielding it as power.
              </p>
            </div>
          </div>

          <div className="space-y-6 mt-8">
            <h3 className="text-xl font-light text-gold mb-4">What Happens Next:</h3>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-gold font-medium">1</span>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-1">Check Your Email</h4>
                <p className="text-text-muted">
                  You&apos;ll receive a confirmation email with session details and preparation materials within the next 5 minutes.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-gold font-medium">2</span>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-1">Schedule Your Session</h4>
                <p className="text-text-muted mb-3">
                  Click the button below to access your dashboard and schedule your coaching session at a time that works for you.
                </p>
                <Link href="/contact">
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Now
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-gold font-medium">3</span>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-1">Prepare for Transformation</h4>
                <p className="text-text-muted">
                  Review the preparation guide sent to your email. Come ready to shed your old self and embrace your power.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Preparation Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-burgundy-dark/30 to-black/30 backdrop-blur-sm rounded-2xl border border-burgundy/20 p-8 mb-8"
        >
          <h3 className="text-xl font-light text-gold mb-4">Before Your Session:</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <ArrowRight className="w-4 h-4 text-gold mr-2 mt-1 flex-shrink-0" />
              <span>Write down your biggest challenges and what you want to transform</span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="w-4 h-4 text-gold mr-2 mt-1 flex-shrink-0" />
              <span>Be prepared to be completely honest about your darkness</span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="w-4 h-4 text-gold mr-2 mt-1 flex-shrink-0" />
              <span>Come with an open mind ready to challenge everything you believe</span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="w-4 h-4 text-gold mr-2 mt-1 flex-shrink-0" />
              <span>Set aside a quiet, private space for our session</span>
            </li>
          </ul>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 text-center"
        >
          <h3 className="text-lg font-light text-gold mb-3">Need Help?</h3>
          <p className="text-text-muted mb-4">
            If you have any questions or need to reschedule, I&apos;m here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </Link>
            <a href="mailto:kanika@kanikarose.com">
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4 mr-2" />
                Email Directly
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Contact Support
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg">
              Return to Home
            </Button>
          </Link>
        </motion.div>

        {/* Inspirational Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-16 pb-8"
        >
          <p className="text-lg text-gold italic">
            &ldquo;Your darkness is not your weakness. It&apos;s your untapped power.&rdquo;
          </p>
          <p className="text-text-muted mt-2">- Kanika Batra</p>
        </motion.div>
      </div>
    </div>
  )
}