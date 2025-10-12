'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, Crown, BookOpen, Bell } from 'lucide-react'
import PayPalButton from './PayPalButton'
import PresaleModal from './PresaleModal'
import CountdownTimer from './CountdownTimer'
import { BOOK_INFO } from '@/lib/constants'

const bookFeatures = [
  '70,000 words of pure strategic dominance',
  'The Rotation System for managing multiple prospects',
  'Ghost Protocol: Exit strategies that haunt them forever',
  'From victim mindset to empress mentality',
]

export default function BookShowcase() {
  const [showPayPal, setShowPayPal] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [showPresaleModal, setShowPresaleModal] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<'kdp' | 'premium'>('premium')

  const handlePaymentSuccess = (details: { id: string, status: string }) => {
    setPaymentStatus('success')
    // Redirect to success page or show download link
    window.location.href = `/success?payment_id=${details.id}&type=book&amount=${BOOK_INFO.price}`
  }

  const handlePaymentError = (error: string) => {
    setPaymentStatus('error')
    console.error('Payment failed:', error)
  }

  const handlePresaleSignup = async (email: string, option: 'kdp' | 'premium' | 'both') => {
    const response = await fetch('/api/presale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, option })
    })

    if (!response.ok) {
      throw new Error('Failed to join presale list')
    }

    return response.json()
  }

  const launchDate = new Date(BOOK_INFO.expectedLaunchDate)
  const formattedDate = launchDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  })

  return (
    <section id="book" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Book 3D Display */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative w-64 sm:w-72 md:w-80 h-[360px] sm:h-[400px] md:h-[450px] animate-levitate mx-auto">
              <div className="absolute inset-0 book-3d">
                {/* Book Cover */}
                <div className="absolute inset-0 book-cover-gradient rounded-r-2xl shadow-2xl flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 transform translateZ-20">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-light text-center text-text-light mb-2 sm:mb-4 leading-tight">
                    SOCIOPATHIC<br />DATING<br />BIBLE
                  </h3>
                  <div className="w-12 sm:w-16 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent mb-2 sm:mb-4" />
                  <p className="text-text-gray text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] mb-2 sm:mb-4 italic">A Cure For Empathy</p>
                  <p className="gradient-text-gold text-sm sm:text-base md:text-lg tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] uppercase">Kanika Batra</p>
                </div>
                
                {/* Book Spine */}
                <div className="absolute left-0 top-0 w-8 sm:w-10 md:w-12 h-full bg-gradient-to-r from-deep-black to-deep-burgundy transform rotateY-90 translateZ-24 rounded-l-md">
                  <div className="h-full flex items-center justify-center">
                    <span className="text-accent-gold text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] transform rotate-90 whitespace-nowrap">
                      SOCIOPATHIC DATING BIBLE
                    </span>
                  </div>
                </div>
                
                {/* Book Shadow */}
                <div className="absolute inset-0 bg-black/50 transform translateZ-10 rounded-r-2xl blur-xl" />
              </div>
            </div>
          </motion.div>

          {/* Book Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6">
                <span className="gradient-text">{BOOK_INFO.wordCount} Words</span>
                <br />
                <span className="text-text-light">of Strategic Mastery</span>
              </h2>
              <p className="text-text-gray text-base sm:text-lg leading-relaxed">
                Stop being the prey. Start being the predator. This controversial guide reveals the cold,
                calculated methods that create unstoppable attraction and unbreakable control—written by
                someone who genuinely lacks empathy and sees romance as a strategic game.
              </p>
            </div>

            <div className="space-y-4">
              {bookFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-accent-burgundy/10 to-accent-sapphire/5 border-l-2 sm:border-l-4 border-accent-gold hover:translate-x-1 sm:hover:translate-x-2 transition-transform"
                >
                  <Check className="text-accent-gold mt-1" size={20} />
                  <span className="text-text-light">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-burgundy/20 to-sapphire/10 p-4 sm:p-6 lg:p-8 rounded-lg border border-gold/20">
              {BOOK_INFO.isPresale && (
                <div className="mb-6 space-y-4">
                  <div className="p-3 bg-accent-gold/10 rounded-lg border border-accent-gold/30">
                    <div className="flex items-center gap-2 text-accent-gold mb-2">
                      <Bell size={20} />
                      <span className="font-semibold">Presale - Launching {formattedDate}</span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <CountdownTimer targetDate={BOOK_INFO.expectedLaunchDate} />
                  </div>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <button
                  onClick={() => setSelectedVersion('kdp')}
                  className={`w-full p-4 rounded-lg border transition-all text-left relative ${
                    selectedVersion === 'kdp'
                      ? 'border-accent-gold bg-accent-gold/10'
                      : 'border-gold/20 hover:border-gold/40 opacity-60'
                  }`}
                  disabled
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <BookOpen className="text-accent-gold mt-1" size={20} />
                      <div>
                        <div className="font-semibold text-text-light">Amazon KDP Version</div>
                        <div className="text-sm text-text-muted mt-1">Kindle & Paperback</div>
                        <div className="text-xs text-accent-gold mt-2 italic">Coming Soon</div>
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedVersion('premium')}
                  className={`w-full p-4 rounded-lg border transition-all text-left relative ${
                    selectedVersion === 'premium'
                      ? 'border-accent-gold bg-accent-gold/10'
                      : 'border-gold/20 hover:border-gold/40'
                  }`}
                >
                  <div className="absolute -top-3 -right-3 bg-accent-burgundy text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    LIMITED TIME
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Crown className="text-accent-gold mt-1" size={20} />
                      <div>
                        <div className="font-semibold text-text-light">Premium Uncensored</div>
                        <div className="text-sm text-text-muted mt-1">Direct + Exclusive Bonuses</div>
                        <ul className="text-xs text-accent-gold mt-2 space-y-1">
                          {BOOK_INFO.premiumBonuses.slice(0, 3).map((bonus, i) => (
                            <li key={i}>• {bonus}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-text-muted line-through opacity-60">${BOOK_INFO.originalPrice}</div>
                      <div className="text-2xl font-light gradient-text-gold">${BOOK_INFO.price}</div>
                    </div>
                  </div>
                </button>
              </div>

              {paymentStatus === 'success' ? (
                <div className="text-center">
                  <div className="text-green-400 text-lg font-semibold mb-4">
                    ✅ Purchase Successful!
                  </div>
                  <p className="text-text-muted mb-4">
                    Check your email for download instructions.
                  </p>
                </div>
              ) : paymentStatus === 'error' ? (
                <div className="text-center">
                  <div className="text-red-400 text-lg font-semibold mb-4">
                    ❌ Payment Failed
                  </div>
                  <p className="text-text-muted mb-4">
                    Please try again or contact support.
                  </p>
                  <button
                    onClick={() => {
                      setPaymentStatus('idle')
                      setShowPayPal(false)
                    }}
                    className="btn-primary rounded-full text-white px-4 sm:px-6 py-2 text-sm sm:text-base"
                  >
                    Try Again
                  </button>
                </div>
              ) : BOOK_INFO.isPresale ? (
                <div className="space-y-4">
                  <button
                    onClick={() => setShowPresaleModal(true)}
                    className="w-full btn-primary rounded-full text-white text-center py-3 sm:py-4 font-semibold tracking-wide text-sm sm:text-base"
                  >
                    Join Presale List →
                  </button>
                  <p className="text-xs text-center text-text-muted">
                    Get notified when the book launches + exclusive presale pricing
                  </p>
                </div>
              ) : showPayPal ? (
                <div>
                  <PayPalButton
                    type="book"
                    amount={BOOK_INFO.price}
                    itemName={BOOK_INFO.title}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    onCancel={() => setShowPayPal(false)}
                  />
                  <div className="text-center mt-4">
                    <button
                      onClick={() => setShowPayPal(false)}
                      className="text-text-muted hover:text-text-light text-sm"
                    >
                      ← Back to Options
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedVersion === 'premium' ? (
                    <button
                      onClick={() => setShowPayPal(true)}
                      className="w-full btn-primary rounded-full text-white text-center py-3 sm:py-4 font-semibold tracking-wide text-sm sm:text-base"
                    >
                      Buy Now - ${BOOK_INFO.price}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full btn-primary rounded-full text-white text-center py-3 sm:py-4 font-semibold tracking-wide text-sm sm:text-base opacity-50 cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  )}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/about"
                      className="btn-secondary rounded-full text-center py-2 sm:py-3 text-xs sm:text-sm flex-1"
                    >
                      Read Sample
                    </Link>
                    <Link
                      href="/contact"
                      className="btn-ghost rounded-full text-center py-2 sm:py-3 text-xs sm:text-sm flex-1"
                    >
                      Questions?
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <PresaleModal
        isOpen={showPresaleModal}
        onClose={() => setShowPresaleModal(false)}
        onEmailSubmit={handlePresaleSignup}
      />
    </section>
  )
}