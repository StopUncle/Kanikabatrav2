'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import BackgroundEffects from '@/components/BackgroundEffects'
import RadarChart from '@/components/quiz/RadarChart'
import { PERSONALITY_PROFILES, PersonalityType, QuizScores, DiagnosisResult, FunctioningLevel } from '@/lib/quiz-data'

interface QuizResultData {
  id: string
  email: string
  scores: QuizScores
  primaryType: PersonalityType
  secondaryType: PersonalityType
  diagnosis: DiagnosisResult
  paid: boolean
}

function QuizSuccessContent() {
  const searchParams = useSearchParams()
  const [result, setResult] = useState<QuizResultData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [paymentCaptured, setPaymentCaptured] = useState(false)

  useEffect(() => {
    const captureAndLoadResults = async () => {
      const quizId = searchParams.get('quiz_id')
      const token = searchParams.get('token')

      if (!quizId) {
        setError('Missing quiz ID')
        setIsLoading(false)
        return
      }

      try {
        if (token && !paymentCaptured) {
          const captureResponse = await fetch('/api/quiz/capture-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: token,
              quizResultId: quizId
            })
          })

          if (!captureResponse.ok) {
            const captureData = await captureResponse.json()
            throw new Error(captureData.error || 'Payment capture failed')
          }

          setPaymentCaptured(true)
        }

        const response = await fetch(`/api/quiz/results?id=${quizId}`)

        if (!response.ok) {
          throw new Error('Failed to load results')
        }

        const data = await response.json()
        setResult(data)

        if (data.paid && data.email) {
          await fetch('/api/quiz/send-results', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quizResultId: quizId })
          })
        }

      } catch (err) {
        console.error('Error loading results:', err)
        setError(err instanceof Error ? err.message : 'Failed to load results')
      } finally {
        setIsLoading(false)
      }
    }

    captureAndLoadResults()
  }, [searchParams, paymentCaptured])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-accent-gold mb-4">Unlocking your results...</div>
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-accent-gold rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !result) {
    return (
      <>
        <BackgroundEffects />
        <Header />
        <main className="min-h-screen pt-24 pb-16 relative z-10 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="text-5xl mb-6">⚠️</div>
            <h1 className="text-2xl text-white mb-4">Something went wrong</h1>
            <p className="text-text-gray mb-8">{error || 'Could not load your results'}</p>
            <Link
              href="/quiz"
              className="px-8 py-3 bg-accent-gold text-deep-black font-medium rounded hover:bg-accent-gold/90 transition-colors"
            >
              Start Over
            </Link>
          </div>
        </main>
      </>
    )
  }

  const primaryProfile = PERSONALITY_PROFILES[result.primaryType]
  const secondaryProfile = PERSONALITY_PROFILES[result.secondaryType]
  const diagnosis = result.diagnosis

  const getFunctioningColor = (level: FunctioningLevel) => {
    switch (level) {
      case 'high': return 'text-green-400 border-green-400/30 bg-green-400/10'
      case 'moderate': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10'
      case 'low': return 'text-red-400 border-red-400/30 bg-red-400/10'
    }
  }

  const getFunctioningLabel = (level: FunctioningLevel) => {
    switch (level) {
      case 'high': return 'High Adaptive Function'
      case 'moderate': return 'Moderate Adaptive Function'
      case 'low': return 'Low Adaptive Function'
    }
  }

  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="min-h-screen pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-4 px-4 py-2 border border-accent-gold/30 rounded-full bg-accent-gold/10">
              <span className="text-accent-gold text-sm tracking-[0.2em] uppercase">
                Payment Successful
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extralight text-white mb-4">
              Your Dark Mirror Profile
            </h1>

            <p className="text-text-gray mb-6">
              Results sent to <span className="text-accent-gold">{result.email}</span>
            </p>

            {diagnosis && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                <div className="px-6 py-4 bg-deep-black/80 border-2 border-accent-gold rounded-lg">
                  <div className="text-xs text-text-gray uppercase tracking-wider mb-2">Clinical Assessment</div>
                  <div className="text-xl sm:text-2xl font-mono text-accent-gold mb-2">
                    {diagnosis.clinicalLabel}
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getFunctioningColor(diagnosis.functioningLevel)}`}>
                    {getFunctioningLabel(diagnosis.functioningLevel)}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="p-8 bg-deep-black/50 border border-accent-gold/20 rounded-lg">
              <RadarChart scores={result.scores} showLabels showValues />
            </div>
          </motion.div>

          {diagnosis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="p-6 bg-deep-black/50 border border-accent-gold/20 rounded-lg">
                <h3 className="text-lg font-light text-accent-gold mb-3">Functioning Assessment</h3>
                <p className="text-text-gray leading-relaxed">
                  {diagnosis.description}
                </p>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-xl font-light text-white text-center mb-6">
              Your 6-Axis Score Breakdown
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.entries(result.scores).map(([type, score]) => (
                <div
                  key={type}
                  className={`p-4 rounded-lg border text-center ${
                    type === result.primaryType
                      ? 'bg-accent-gold/20 border-accent-gold'
                      : type === result.secondaryType
                        ? 'bg-accent-gold/10 border-accent-gold/50'
                        : type === 'neurotypical'
                          ? 'bg-green-900/20 border-green-600/30'
                          : 'bg-deep-black/30 border-accent-gold/10'
                  }`}
                >
                  <div className={`text-2xl font-light mb-1 ${
                    type === 'neurotypical' ? 'text-green-400' : 'text-accent-gold'
                  }`}>
                    {score}%
                  </div>
                  <div className="text-xs text-text-gray uppercase tracking-wider">
                    {type === 'neurotypical' ? 'Neurotypical' : PERSONALITY_PROFILES[type as PersonalityType].name.split(' ')[1] || PERSONALITY_PROFILES[type as PersonalityType].name}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <div className="p-6 bg-gradient-to-br from-accent-gold/10 to-transparent border border-accent-gold/30 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">👑</span>
                <div>
                  <div className="text-xs text-text-gray uppercase tracking-wider">Primary Type</div>
                  <h3 className="text-2xl text-accent-gold">{primaryProfile.name}</h3>
                </div>
              </div>

              <p className="text-text-gray text-sm italic mb-4">&quot;{primaryProfile.tagline}&quot;</p>

              <p className="text-white/90 leading-relaxed mb-6">
                {primaryProfile.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm text-accent-gold uppercase tracking-wider mb-3">Traits</h4>
                  <ul className="space-y-2">
                    {primaryProfile.traits.map((trait, i) => (
                      <li key={i} className="text-text-gray text-sm flex items-start gap-2">
                        <span className="text-accent-gold">•</span>
                        {trait}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm text-accent-gold uppercase tracking-wider mb-3">Strengths</h4>
                  <ul className="space-y-2">
                    {primaryProfile.strengths.map((strength, i) => (
                      <li key={i} className="text-text-gray text-sm flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm text-accent-gold uppercase tracking-wider mb-3">Blind Spots</h4>
                <ul className="space-y-2">
                  {primaryProfile.blindSpots.map((blind, i) => (
                    <li key={i} className="text-text-gray text-sm flex items-start gap-2">
                      <span className="text-red-400">!</span>
                      {blind}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 p-4 bg-deep-black/50 rounded-lg">
                <h4 className="text-sm text-accent-gold uppercase tracking-wider mb-2">Relationship Pattern</h4>
                <p className="text-text-gray text-sm">{primaryProfile.relationshipPattern}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <div className="p-6 bg-deep-black/30 border border-accent-gold/20 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🥈</span>
                <div>
                  <div className="text-xs text-text-gray uppercase tracking-wider">Secondary Type</div>
                  <h3 className="text-xl text-white">{secondaryProfile.name}</h3>
                </div>
              </div>

              <p className="text-text-gray text-sm italic mb-4">&quot;{secondaryProfile.tagline}&quot;</p>

              <p className="text-text-gray leading-relaxed">
                {secondaryProfile.description}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-12"
          >
            <h2 className="text-xl font-light text-white text-center mb-6">
              Go Deeper
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/book" className="block">
                <div className="p-6 bg-deep-black/50 border border-accent-gold/20 rounded-lg hover:border-accent-gold/50 transition-colors">
                  <div className="text-2xl mb-3">📖</div>
                  <h3 className="text-lg text-accent-gold mb-2">The Sociopathic Dating Bible</h3>
                  <p className="text-text-gray text-sm">
                    Master the psychology behind attraction and power dynamics.
                  </p>
                </div>
              </Link>

              <Link href="/coaching" className="block">
                <div className="p-6 bg-deep-black/50 border border-accent-gold/20 rounded-lg hover:border-accent-gold/50 transition-colors">
                  <div className="text-2xl mb-3">🎯</div>
                  <h3 className="text-lg text-accent-gold mb-2">1:1 Coaching</h3>
                  <p className="text-text-gray text-sm">
                    Personal guidance from a clinically diagnosed sociopath.
                  </p>
                </div>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <Link
              href="/quiz"
              className="text-text-gray text-sm hover:text-accent-gold transition-colors"
            >
              ← Retake Assessment
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  )
}

export default function QuizSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-deep-black flex items-center justify-center">
        <div className="text-accent-gold">Loading...</div>
      </div>
    }>
      <QuizSuccessContent />
    </Suspense>
  )
}
