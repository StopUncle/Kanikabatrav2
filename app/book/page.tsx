'use client'

import { useState } from 'react'
import Link from 'next/link'
import BackgroundEffects from '@/components/BackgroundEffects'
import Header from '@/components/Header'
import CountdownTimer from '@/components/CountdownTimer'
import PresaleModal from '@/components/PresaleModal'
import PayPalButton from '@/components/PayPalButton'
import { BOOK_INFO } from '@/lib/constants'
import { ShoppingCart, BookOpen, Brain, Heart, Target, Trophy, Zap, Bell } from 'lucide-react'

const CHAPTER_LIST = [
  { num: 1, title: 'The Doctrine of Cold', desc: 'Emotional detachment as your superpower' },
  { num: 2, title: 'The Holy Grail Doctrine', desc: 'Why your body is currency, not a gift' },
  { num: 3, title: 'The Rotation', desc: 'Managing multiple targets strategically' },
  { num: 4, title: 'The Transformation Protocol', desc: 'Becoming magnetically irresistible' },
  { num: 5, title: 'Scarcity Tactics', desc: 'Making yourself the ultimate prize' },
  { num: 6, title: 'Love Bombing Mastery', desc: 'Creating addictive emotional highs' },
  { num: 7, title: 'The Shit Test Matrix', desc: 'Psychological screening methods that reveal everything' },
  { num: 8, title: 'Family Colonization', desc: 'Infiltrating their inner circle' },
  { num: 9, title: 'Unhinged Texts', desc: 'Strategic emotional chaos' },
  { num: 10, title: 'The Beige Protocol', desc: 'Neutralizing competition without lifting a finger' },
  { num: 11, title: 'Reputation Warfare', desc: 'Controlling the narrative' },
  { num: 12, title: 'The Nuclear Ghost Protocol', desc: 'Strategic disappearance as power' },
  { num: 13, title: 'The Upgrade Protocol', desc: 'Trading up systematically' },
  { num: 14, title: 'The Empress Endgame', desc: 'Transcending the need for validation' },
  { num: 15, title: 'The Perks of Dating a Sociopath', desc: 'Why our loyalty is unmatched' },
]

const BOOK_QUOTES = [
  "Stop being the victim. Start being the villain.",
  "Men are players. You are the game.",
  "Love is for peasants. Thrones are for predators.",
  "Healing is for houseplants. You? You upgrade.",
  "Your empathy is their weapon. Your coldness is your shield.",
]

export default function BookPage() {
  const [showPresaleModal, setShowPresaleModal] = useState(false)
  const [showPayPalHero, setShowPayPalHero] = useState(false)
  const [showPayPalCTA, setShowPayPalCTA] = useState(false)

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

  const handlePaymentSuccess = (details: { id: string, status: string, downloadToken?: string }) => {
    const tokenParam = details.downloadToken ? `&download_token=${details.downloadToken}` : ''
    window.location.href = `/success?payment_id=${details.id}&type=book&amount=${BOOK_INFO.price}${tokenParam}`
  }

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error)
  }

  const launchDate = new Date(BOOK_INFO.expectedLaunchDate)
  const formattedDate = launchDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short'
  })

  return (
    <>
      <BackgroundEffects />
      <Header />

      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Book Visual */}
            <div className="relative">
              <div className="book-3d animate-levitate">
                <div className="relative w-80 h-[480px] mx-auto">
                  <div className="absolute inset-0 book-cover-gradient rounded-lg shadow-2xl">
                    <div className="p-8 h-full flex flex-col justify-between">
                      <div>
                        <p className="text-accent-gold text-xs uppercase tracking-[0.3em] mb-4">
                          The Controversial Bestseller
                        </p>
                        <h1 className="text-4xl font-serif mb-2 gradient-text-gold">
                          SOCIOPATHIC
                        </h1>
                        <h1 className="text-4xl font-serif mb-2 gradient-text">
                          DATING
                        </h1>
                        <h1 className="text-4xl font-serif gradient-text-gold">
                          BIBLE
                        </h1>
                      </div>
                      <div>
                        <p className="text-text-gray text-sm mb-4 italic">
                          A Cure For Empathy
                        </p>
                        <p className="text-accent-gold font-serif text-lg">
                          KANIKA BATRA
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -right-4 top-0 bottom-0 w-12 bg-gradient-to-r from-deep-burgundy to-deep-black rounded-r-lg" />
                </div>
              </div>
            </div>

            {/* Book Info */}
            <div className="space-y-6">
              <div>
                <p className="text-accent-burgundy uppercase tracking-[0.2em] text-sm mb-2">
                  70,000 Words of Strategic Dominance
                </p>
                <h2 className="text-4xl md:text-5xl font-serif mb-4">
                  <span className="gradient-text">The Dating Guide</span>
                  <br />
                  <span className="text-text-light">Empaths Fear</span>
                </h2>
                <p className="text-text-gray text-lg italic">
                  {BOOK_INFO.description}
                </p>
              </div>

              <div className="space-y-3">
                {BOOK_INFO.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-accent-gold mt-0.5" />
                    <p className="text-text-light">{feature}</p>
                  </div>
                ))}
              </div>

              {BOOK_INFO.isPresale && (
                <div className="mb-6 space-y-4">
                  <div className="p-4 bg-accent-gold/10 rounded-lg border border-accent-gold/30">
                    <div className="flex items-center gap-2 text-accent-gold mb-3">
                      <Bell size={20} />
                      <span className="font-semibold">Presale - Launching {formattedDate}</span>
                    </div>
                    <CountdownTimer targetDate={BOOK_INFO.expectedLaunchDate} className="justify-center" />
                  </div>
                </div>
              )}

              {showPayPalHero ? (
                <div className="space-y-4">
                  <PayPalButton
                    type="book"
                    amount={BOOK_INFO.price}
                    itemName={BOOK_INFO.title}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    onCancel={() => setShowPayPalHero(false)}
                  />
                  <div className="text-center">
                    <button
                      onClick={() => setShowPayPalHero(false)}
                      className="text-text-gray hover:text-text-light text-sm"
                    >
                      ← Back
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  {BOOK_INFO.isPresale ? (
                    <button
                      onClick={() => setShowPresaleModal(true)}
                      className="btn-primary rounded-full text-white px-8 py-4 flex items-center justify-center gap-2"
                    >
                      <Bell className="w-5 h-5" />
                      Join Presale List
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowPayPalHero(true)}
                      className="btn-primary rounded-full text-white px-8 py-4 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Get The Book - ${BOOK_INFO.price}
                    </button>
                  )}
                  <Link href="#chapters" className="btn-secondary rounded-full px-8 py-4 text-center">
                    Preview Chapters
                  </Link>
                </div>
              )}

              <p className="text-text-gray text-sm">
                {BOOK_INFO.isPresale
                  ? '⏰ Be notified the moment the book launches + exclusive presale pricing'
                  : '⚠️ Warning: This book contains strategic content that may permanently change how you view relationships.'
                }
              </p>
            </div>
          </div>
        </section>

        {/* Quotes Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent via-deep-burgundy/10 to-transparent">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-serif text-center mb-12 gradient-text-gold">
              Savage Wisdom From The Book
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BOOK_QUOTES.map((quote, index) => (
                <div key={index} className="glass-card p-6 border border-accent-gold/20">
                  <p className="text-text-light text-lg italic">&ldquo;{quote}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chapter Preview */}
        <section id="chapters" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-serif mb-4">
                <span className="gradient-text">15 Chapters</span>
                <span className="text-text-light"> of Strategic Mastery</span>
              </h3>
              <p className="text-text-gray text-lg">
                From foundation to empire - your complete transformation roadmap
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CHAPTER_LIST.map((chapter) => (
                <div key={chapter.num} className="tier-card p-4 relative">
                  <div className="flex items-start gap-3">
                    <span className="text-accent-gold font-bold">{chapter.num}.</span>
                    <div>
                      <h4 className="text-text-light font-medium mb-1">{chapter.title}</h4>
                      <p className="text-text-gray text-sm">{chapter.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Concepts */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent via-deep-navy/20 to-transparent">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-serif text-center mb-12">
              <span className="gradient-text-gold">Core Concepts</span>
              <span className="text-text-light"> You&apos;ll Master</span>
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Brain className="w-12 h-12 text-accent-gold mx-auto mb-3" />
                <h4 className="text-text-light font-medium mb-2">The Doctrine of Cold</h4>
                <p className="text-text-gray text-sm">
                  Transform emotional detachment into magnetic power
                </p>
              </div>

              <div className="text-center">
                <Target className="w-12 h-12 text-accent-gold mx-auto mb-3" />
                <h4 className="text-text-light font-medium mb-2">The Rotation System</h4>
                <p className="text-text-gray text-sm">
                  Manage multiple prospects like a strategic portfolio
                </p>
              </div>

              <div className="text-center">
                <Heart className="w-12 h-12 text-accent-gold mx-auto mb-3" />
                <h4 className="text-text-light font-medium mb-2">Love Bombing</h4>
                <p className="text-text-gray text-sm">
                  Create addictive emotional highs they can&apos;t resist
                </p>
              </div>

              <div className="text-center">
                <Trophy className="w-12 h-12 text-accent-gold mx-auto mb-3" />
                <h4 className="text-text-light font-medium mb-2">The Empress Endgame</h4>
                <p className="text-text-gray text-sm">
                  Ascend beyond the game to become the throne itself
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-serif text-center mb-12 gradient-text">
              Reader Transformations
            </h3>

            <div className="space-y-8">
              <div className="glass-card p-6 border-l-4 border-accent-gold">
                <p className="text-text-light text-lg mb-4 italic">
                  &ldquo;This book decoded the game I didn&apos;t even know I was losing. Within weeks of applying these strategies, I went from being ghosted to being pursued by multiple high-value men.&rdquo;
                </p>
                <p className="text-accent-gold">— Sarah K., Investment Banker</p>
              </div>

              <div className="glass-card p-6 border-l-4 border-accent-gold">
                <p className="text-text-light text-lg mb-4 italic">
                  &ldquo;Forget therapy. This book taught me more about power dynamics in relationships than years of counseling. It&apos;s brutal, honest, and absolutely life-changing.&rdquo;
                </p>
                <p className="text-accent-gold">— Michelle R., CEO</p>
              </div>

              <div className="glass-card p-6 border-l-4 border-accent-gold">
                <p className="text-text-light text-lg mb-4 italic">
                  &ldquo;I used to be the girl who got played. Now I&apos;m the one they obsess over. The Rotation System alone is worth ten times the price of this book.&rdquo;
                </p>
                <p className="text-accent-gold">— Jessica T., Attorney</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 border-t border-accent-gold/10">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-serif mb-6">
              <span className="text-text-light">Ready to Stop Being</span>
              <br />
              <span className="gradient-text">The Victim?</span>
            </h3>

            <p className="text-text-gray text-lg mb-8 max-w-2xl mx-auto">
              This isn&apos;t just a book. It&apos;s your initiation into a new way of thinking about love, power, and control.
              The question isn&apos;t whether you&apos;re ready for this knowledge—it&apos;s whether you can afford to live without it.
            </p>

            {showPayPalCTA ? (
              <div className="max-w-md mx-auto space-y-4">
                <PayPalButton
                  type="book"
                  amount={BOOK_INFO.price}
                  itemName={BOOK_INFO.title}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  onCancel={() => setShowPayPalCTA(false)}
                />
                <div className="text-center">
                  <button
                    onClick={() => setShowPayPalCTA(false)}
                    className="text-text-gray hover:text-text-light text-sm"
                  >
                    ← Back
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {BOOK_INFO.isPresale ? (
                  <button
                    onClick={() => setShowPresaleModal(true)}
                    className="btn-primary rounded-full text-white px-10 py-4 text-lg flex items-center justify-center gap-2"
                  >
                    <Bell className="w-5 h-5" />
                    Join Presale List
                  </button>
                ) : (
                  <button
                    onClick={() => setShowPayPalCTA(true)}
                    className="btn-primary rounded-full text-white px-10 py-4 text-lg flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-5 h-5" />
                    Get Instant Access - ${BOOK_INFO.price}
                  </button>
                )}
              </div>
            )}

            <p className="text-text-gray text-sm mt-6">
              {BOOK_INFO.isPresale
                ? `Launches ${formattedDate} • Be the first to know`
                : 'Digital download • Instant access • Lifetime updates'
              }
            </p>
          </div>
        </section>
      </main>

      <PresaleModal
        isOpen={showPresaleModal}
        onClose={() => setShowPresaleModal(false)}
        onEmailSubmit={handlePresaleSignup}
      />
    </>
  )
}