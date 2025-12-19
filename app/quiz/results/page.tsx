'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import BackgroundEffects from '@/components/BackgroundEffects'
import { PERSONALITY_PROFILES, PersonalityType, QuizScores, DiagnosisResult, QUIZ_INFO } from '@/lib/quiz-data'
import RadarChart from '@/components/quiz/RadarChart'

interface QuizResultsData {
  scores: QuizScores
  primaryType: PersonalityType
  secondaryType: PersonalityType
  diagnosis: DiagnosisResult
  answers: Record<number, PersonalityType>
  completedAt: string
}

export default function QuizResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<QuizResultsData | null>(null)
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('quizResults')
    if (!stored) {
      router.push('/quiz')
      return
    }

    try {
      const data = JSON.parse(stored) as QuizResultsData
      setResults(data)
    } catch {
      router.push('/quiz')
    }
  }, [router])

  if (!results) {
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center">
        <div className="text-accent-gold">Loading...</div>
      </div>
    )
  }

  const primaryProfile = PERSONALITY_PROFILES[results.primaryType]
  const diagnosis = results.diagnosis

  const handleUnlock = async () => {
    if (!email) return
    setIsLoading(true)

    try {
      const response = await fetch('/api/quiz/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          scores: results.scores,
          primaryType: results.primaryType,
          secondaryType: results.secondaryType,
          answers: results.answers
        })
      })

      const data = await response.json()

      if (data.approveUrl) {
        window.location.href = data.approveUrl
      }
    } catch (error) {
      console.error('Payment error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="min-h-screen pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Results Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-4 px-4 py-2 border border-accent-gold/30 rounded-full">
              <span className="text-accent-gold text-sm tracking-[0.2em] uppercase">
                Assessment Complete
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extralight text-white mb-4">
              Primary Type: <span className="text-accent-gold">{primaryProfile.name}</span>
            </h1>

            <p className="text-xl text-text-gray font-light italic mb-6">
              &quot;{primaryProfile.tagline}&quot;
            </p>

            {/* Blurred Clinical Diagnosis Preview */}
            <div className="relative inline-block">
              <div className="blur-sm select-none px-6 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg">
                <p className="text-accent-gold font-mono text-sm">
                  {diagnosis?.clinicalLabel || 'Clinical diagnosis loading...'}
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xs bg-deep-black/80 px-3 py-1 rounded">
                  🔒 Unlock to reveal
                </span>
              </div>
            </div>
          </motion.div>

          {/* Locked Radar Chart Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="relative p-8 bg-deep-black/50 border border-accent-gold/20 rounded-lg">
              <div className="relative">
                <div className="blur-sm opacity-50">
                  <RadarChart scores={results.scores} />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6 bg-deep-black/80 rounded-lg border border-accent-gold/30">
                    <div className="text-4xl mb-3">🔒</div>
                    <p className="text-white font-light mb-2">Full Results Locked</p>
                    <p className="text-text-gray text-sm">
                      6-axis breakdown including Neurotypical baseline
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* What You'll Get */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-xl font-light text-white text-center mb-6">
              Your Full Clinical Report Includes:
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '🩺', title: 'Clinical-Style Diagnosis', desc: 'Your type + functioning level assessment' },
                { icon: '📊', title: 'Complete Radar Chart', desc: 'Visual breakdown of all 6 types including NT' },
                { icon: '⚡', title: 'Functioning Analysis', desc: 'High/Moderate/Low adaptive assessment' },
                { icon: '🎯', title: 'Primary & Secondary Types', desc: 'Deep dive into your top two patterns' },
                { icon: '💔', title: 'Relationship Patterns', desc: 'How your type affects your love life' },
                { icon: '📧', title: 'Delivered to Your Email', desc: 'Keep your results forever' }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-deep-black/30 border border-accent-gold/10 rounded-lg"
                >
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <div className="text-white font-light">{item.title}</div>
                    <div className="text-text-gray text-sm">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Payment Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            {!showPayment ? (
              <div>
                <button
                  onClick={() => setShowPayment(true)}
                  className="px-12 py-4 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-deep-black font-medium text-lg tracking-wider uppercase rounded transition-all hover:shadow-lg hover:shadow-accent-gold/20"
                >
                  Unlock Full Report - ${QUIZ_INFO.price}
                </button>
                <p className="mt-4 text-text-gray text-sm">
                  One-time payment. Instant delivery.
                </p>
              </div>
            ) : (
              <div className="max-w-md mx-auto p-6 bg-deep-black/50 border border-accent-gold/20 rounded-lg">
                <h3 className="text-xl font-light text-white mb-4">
                  Enter Your Email
                </h3>
                <p className="text-text-gray text-sm mb-6">
                  Your full clinical report will be sent here.
                </p>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-deep-black border border-accent-gold/30 rounded text-white placeholder-text-gray/50 focus:border-accent-gold focus:outline-none mb-4"
                />

                <button
                  onClick={handleUnlock}
                  disabled={!email || isLoading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-deep-black font-medium tracking-wider uppercase rounded transition-all hover:shadow-lg hover:shadow-accent-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : `Pay $${QUIZ_INFO.price} with PayPal`}
                </button>

                <button
                  onClick={() => setShowPayment(false)}
                  className="mt-4 text-text-gray text-sm hover:text-white transition-colors"
                >
                  &larr; Back
                </button>
              </div>
            )}
          </motion.div>

          {/* Free Preview Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 pt-8 border-t border-accent-gold/10"
          >
            <h3 className="text-lg font-light text-white text-center mb-6">
              Free Preview: Your Primary Type
            </h3>

            <div className="p-6 bg-deep-black/30 border border-accent-gold/20 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl text-accent-gold">{primaryProfile.name}</h4>
                <span className="text-text-gray text-sm">{results.scores[results.primaryType]}%</span>
              </div>

              <p className="text-text-gray leading-relaxed mb-4">
                {primaryProfile.description.split('.')[0]}.
              </p>

              <div className="text-text-gray/50 text-sm">
                <p>🔒 Full clinical diagnosis, functioning level, traits, and relationship patterns locked...</p>
              </div>
            </div>
          </motion.div>

          {/* Retake Option */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-center"
          >
            <Link
              href="/quiz"
              className="text-text-gray text-sm hover:text-accent-gold transition-colors"
            >
              &larr; Retake Assessment
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  )
}
