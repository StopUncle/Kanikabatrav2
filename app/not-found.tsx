'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import GradientText from '@/components/ui/GradientText'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import KBSpinLogo from '@/components/KBSpinLogo'

export default function NotFound() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center">
          {/* 404 Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
                <KBSpinLogo size="xl" animate={false} />
              </div>
              <GradientText className="text-8xl sm:text-9xl md:text-[12rem] font-bold leading-none relative z-10">
                404
              </GradientText>
            </div>
          </motion.div>

          {/* Main Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-text-light">
              Page Not Found
            </h1>
            <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
              Even sociopaths get lost sometimes. The page you&apos;re looking for has vanished into the psychological void.
            </p>
          </motion.div>

          {/* Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <Card>
              <h2 className="text-2xl font-bold mb-8 text-gold">
                Where would you like to go?
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Home */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="text-center p-4 rounded-lg bg-deep-black/30 hover:bg-deep-black/50 transition-colors"
                >
                  <div className="text-3xl mb-3">🏠</div>
                  <h3 className="text-lg font-semibold mb-2 text-text-light">Home</h3>
                  <p className="text-text-muted text-sm mb-4">
                    Return to the main page
                  </p>
                  <Link href="/">
                    <Button variant="outline" size="sm" fullWidth>
                      Go Home
                    </Button>
                  </Link>
                </motion.div>

                {/* About */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="text-center p-4 rounded-lg bg-deep-black/30 hover:bg-deep-black/50 transition-colors"
                >
                  <div className="text-3xl mb-3">🧠</div>
                  <h3 className="text-lg font-semibold mb-2 text-text-light">About</h3>
                  <p className="text-text-muted text-sm mb-4">
                    Learn about the sociopath
                  </p>
                  <Link href="/about">
                    <Button variant="outline" size="sm" fullWidth>
                      About Me
                    </Button>
                  </Link>
                </motion.div>

                {/* Coaching */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="text-center p-4 rounded-lg bg-deep-black/30 hover:bg-deep-black/50 transition-colors"
                >
                  <div className="text-3xl mb-3">⚡</div>
                  <h3 className="text-lg font-semibold mb-2 text-text-light">Coaching</h3>
                  <p className="text-text-muted text-sm mb-4">
                    Transform your psychology
                  </p>
                  <Link href="/coaching">
                    <Button variant="outline" size="sm" fullWidth>
                      Book Session
                    </Button>
                  </Link>
                </motion.div>

                {/* Book */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="text-center p-4 rounded-lg bg-deep-black/30 hover:bg-deep-black/50 transition-colors"
                >
                  <div className="text-3xl mb-3">📖</div>
                  <h3 className="text-lg font-semibold mb-2 text-text-light">The Book</h3>
                  <p className="text-text-muted text-sm mb-4">
                    Sociopathic Dating Bible
                  </p>
                  <Link href="/#book">
                    <Button variant="outline" size="sm" fullWidth>
                      Get Book
                    </Button>
                  </Link>
                </motion.div>

                {/* Contact */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="text-center p-4 rounded-lg bg-deep-black/30 hover:bg-deep-black/50 transition-colors"
                >
                  <div className="text-3xl mb-3">💬</div>
                  <h3 className="text-lg font-semibold mb-2 text-text-light">Contact</h3>
                  <p className="text-text-muted text-sm mb-4">
                    Get in touch
                  </p>
                  <Link href="/contact">
                    <Button variant="outline" size="sm" fullWidth>
                      Contact Me
                    </Button>
                  </Link>
                </motion.div>

                {/* Dashboard */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="text-center p-4 rounded-lg bg-deep-black/30 hover:bg-deep-black/50 transition-colors"
                >
                  <div className="text-3xl mb-3">👤</div>
                  <h3 className="text-lg font-semibold mb-2 text-text-light">Account</h3>
                  <p className="text-text-muted text-sm mb-4">
                    Get in touch
                  </p>
                  <Link href="/contact">
                    <Button variant="outline" size="sm" fullWidth>
                      Contact
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </Card>
          </motion.div>

          {/* Main Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
          >
            <Link href="/">
              <Button variant="primary" size="lg">
                Take Me Home
              </Button>
            </Link>

            <Link href="/coaching">
              <Button variant="secondary" size="lg">
                Book a Session
              </Button>
            </Link>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-16"
          >
            <blockquote className="text-text-muted italic max-w-2xl mx-auto">
              &ldquo;Sometimes you have to get lost to find out where you truly belong.
              But I always know exactly where I&apos;m going.&rdquo;
            </blockquote>
            <p className="text-gold font-semibold mt-4">— Kanika Batra</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}