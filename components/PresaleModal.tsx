'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, BookOpen, Mail, Crown, ShoppingCart } from 'lucide-react'
import { BOOK_INFO } from '@/lib/constants'

interface PresaleModalProps {
  isOpen: boolean
  onClose: () => void
  onEmailSubmit: (email: string, option: 'kdp' | 'premium' | 'both') => Promise<void>
}

export default function PresaleModal({ isOpen, onClose, onEmailSubmit }: PresaleModalProps) {
  const [email, setEmail] = useState('')
  const [selectedOption, setSelectedOption] = useState<'kdp' | 'premium' | 'both'>('premium')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await onEmailSubmit(email, selectedOption)
      setSubmitted(true)
      setTimeout(() => {
        onClose()
        setSubmitted(false)
        setEmail('')
      }, 3000)
    } catch (_err) {
      setError('Failed to join presale list. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const launchDate = new Date(BOOK_INFO.expectedLaunchDate)
  const formattedDate = launchDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-gradient-to-br from-deep-black to-deep-burgundy p-8 rounded-2xl shadow-2xl z-50 border border-gold/20"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-text-muted hover:text-text-light transition-colors"
            >
              <X size={24} />
            </button>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="text-6xl mb-4">✨</div>
                <h3 className="text-2xl font-light gradient-text mb-2">You&apos;re on the List!</h3>
                <p className="text-text-muted">
                  We&apos;ll notify you the moment the book launches on {formattedDate}
                </p>
              </motion.div>
            ) : (
              <>
                <h2 className="text-3xl font-light gradient-text mb-2">
                  Join the Presale List
                </h2>
                <p className="text-text-muted mb-6">
                  Be first to know when &quot;Sociopathic Dating Bible&quot; launches on {formattedDate}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-text-light text-sm mb-2 block">Choose Your Version</span>

                      <div className="space-y-3">
                        <button
                          type="button"
                          onClick={() => setSelectedOption('kdp')}
                          className={`w-full p-4 rounded-lg border transition-all text-left ${
                            selectedOption === 'kdp'
                              ? 'border-accent-gold bg-accent-gold/10'
                              : 'border-gold/20 hover:border-gold/40'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <BookOpen className="text-accent-gold mt-1" size={20} />
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-semibold text-text-light">Amazon KDP Version</div>
                                  <div className="text-sm text-text-muted mt-1">Standard edition on Kindle & paperback</div>
                                </div>
                                <div className="text-2xl font-light gradient-text-gold">${BOOK_INFO.kdpPrice}</div>
                              </div>
                            </div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedOption('premium')}
                          className={`w-full p-4 rounded-lg border transition-all text-left ${
                            selectedOption === 'premium'
                              ? 'border-accent-gold bg-accent-gold/10'
                              : 'border-gold/20 hover:border-gold/40'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Crown className="text-accent-gold mt-1" size={20} />
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-semibold text-text-light">Premium Uncensored</div>
                                  <div className="text-sm text-text-muted mt-1">
                                    Direct from author + exclusive bonuses
                                  </div>
                                  <ul className="text-xs text-accent-gold mt-2 space-y-1">
                                    <li>• Bonus chapter & video masterclass</li>
                                    <li>• Email templates & consultation discount</li>
                                    <li>• Private Telegram group access</li>
                                  </ul>
                                </div>
                                <div className="text-2xl font-light gradient-text-gold">${BOOK_INFO.price}</div>
                              </div>
                            </div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedOption('both')}
                          className={`w-full p-4 rounded-lg border transition-all text-left ${
                            selectedOption === 'both'
                              ? 'border-accent-gold bg-accent-gold/10'
                              : 'border-gold/20 hover:border-gold/40'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <ShoppingCart className="text-accent-gold mt-1" size={20} />
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-semibold text-text-light">Notify Me About Both</div>
                                  <div className="text-sm text-text-muted mt-1">Get updates for all versions</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>
                    </label>

                    <label className="block">
                      <span className="text-text-light text-sm mb-2 block flex items-center gap-2">
                        <Mail size={16} />
                        Your Email
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="empress@example.com"
                        className="w-full px-4 py-3 bg-black/50 border border-gold/20 rounded-lg focus:border-accent-gold focus:outline-none text-text-light placeholder-text-muted"
                      />
                    </label>
                  </div>

                  {error && (
                    <div className="text-red-400 text-sm">{error}</div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="w-full btn-primary rounded-full py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Joining...' : 'Join Presale List'}
                  </button>

                  <p className="text-xs text-text-muted text-center">
                    No spam, ever. You&apos;ll receive 3 emails: launch announcement, 24-hour reminder, and final notice.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}