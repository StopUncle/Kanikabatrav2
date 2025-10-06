'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { XCircle, ArrowLeft, MessageCircle, RefreshCw } from 'lucide-react'
import Button from '@/components/ui/Button'
import BackgroundEffects from '@/components/BackgroundEffects'

export default function CoachingCancelPage() {
  return (
    <div className="min-h-screen bg-deep-black text-text-light relative overflow-hidden">
      <BackgroundEffects />

      {/* Cancel Header */}
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
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full mb-6"
          >
            <XCircle className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-light mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Session Cancelled
          </h1>
          <p className="text-xl text-text-muted">
            Your transformation awaits when you&apos;re ready
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
          <h2 className="text-2xl font-light text-gold mb-4">Not Ready Yet?</h2>
          <p className="text-text-muted mb-6">
            I understand. Facing your darkness and transforming it into power isn&apos;t a decision to take lightly.
            When you&apos;re ready to stop playing small and embrace your true potential, I&apos;ll be here.
          </p>

          <div className="bg-burgundy-dark/20 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gold mb-3">What you&apos;re walking away from:</h3>
            <ul className="space-y-2 text-text-muted">
              <li>• The ability to read and manipulate any social dynamic</li>
              <li>• Mastery over your dark feminine energy</li>
              <li>• Freedom from emotional chains that hold you back</li>
              <li>• The power to become truly unforgettable</li>
              <li>• Direct guidance from someone who lives without masks</li>
            </ul>
          </div>

          <p className="text-text-muted italic">
            Most people spend their entire lives afraid of their own shadow.
            Don&apos;t be most people.
          </p>
        </motion.div>

        {/* Reasons for Cancellation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 mb-8"
        >
          <h3 className="text-xl font-light text-gold mb-4">Common Hesitations:</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium mb-2">&ldquo;It&apos;s too expensive&rdquo;</h4>
              <p className="text-text-muted">
                How much is your transformation worth? How much does staying the same cost you every day?
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-2">&ldquo;I&apos;m not sure it will work&rdquo;</h4>
              <p className="text-text-muted">
                Doubt is the luxury of those who have options. If you&apos;re here, you know conventional methods haven&apos;t worked.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-2">&ldquo;I&apos;m scared&rdquo;</h4>
              <p className="text-text-muted">
                Good. Fear means you&apos;re close to breakthrough. But fear without action is just suffering.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Alternative Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-burgundy-dark/30 to-black/30 backdrop-blur-sm rounded-2xl border border-burgundy/20 p-8 mb-8"
        >
          <h3 className="text-xl font-light text-gold mb-4">Not Ready for Coaching?</h3>
          <p className="text-text-muted mb-6">
            Start your transformation journey with my book instead:
          </p>
          <div className="bg-black/50 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gold mb-2">Sociopathic Dating Bible</h4>
            <p className="text-text-muted mb-4">
              70,000 words of unfiltered truth about power, manipulation, and the psychology of a diagnosed sociopath.
            </p>
            <Link href="/#book">
              <Button variant="primary" size="sm">
                Get the Book Instead
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/coaching">
            <Button variant="primary" size="lg">
              <RefreshCw className="w-5 h-5 mr-2" />
              Reconsider Coaching
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Return Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" size="lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              Ask Questions
            </Button>
          </Link>
        </motion.div>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-16 pb-8"
        >
          <p className="text-lg text-gold italic">
            &ldquo;The only thing worse than being a monster is pretending you&apos;re not one.&rdquo;
          </p>
          <p className="text-text-muted mt-2">- Kanika Batra</p>
          <p className="text-text-muted mt-6 text-sm">
            When you&apos;re ready to stop pretending, I&apos;ll be here.
          </p>
        </motion.div>
      </div>
    </div>
  )
}