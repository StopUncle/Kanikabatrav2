'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ShareButtons from './ShareButtons'
import type { ResultProfile } from '@/lib/quiz-questions'

interface QuizResultsProps {
  resultId: string
  type: string
  percentages: {
    narcissism: number
    machiavellianism: number
    psychopathy: number
  }
  profile: ResultProfile
}

export default function QuizResults({
  resultId,
  type,
  percentages,
  profile
}: QuizResultsProps) {
  const [showEmailCapture, setShowEmailCapture] = useState(true)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/quiz/results/${resultId}`
    : ''

  const shareText = `I just took the Dark Triad Personality Quiz and I'm ${profile.title}! Think you can handle the truth?`

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    try {
      await fetch(`/api/quiz/results/${resultId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'quiz',
          quizResultId: resultId,
          tags: [type]
        })
      })

      setEmailSubmitted(true)
      setShowEmailCapture(false)
    } catch (error) {
      console.error('Error saving email:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleShare = async () => {
    try {
      await fetch(`/api/quiz/results/${resultId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shared: true })
      })
    } catch (error) {
      console.error('Error marking as shared:', error)
    }
  }

  const traitBars = [
    { name: 'Narcissism', value: percentages.narcissism, color: 'from-yellow-500 to-amber-600' },
    { name: 'Machiavellianism', value: percentages.machiavellianism, color: 'from-red-600 to-rose-700' },
    { name: 'Psychopathy', value: percentages.psychopathy, color: 'from-purple-600 to-indigo-700' }
  ]

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div
          className="inline-block px-6 py-2 rounded-full text-sm uppercase tracking-widest mb-6 border"
          style={{
            backgroundColor: `${profile.color}20`,
            borderColor: `${profile.color}40`,
            color: profile.color
          }}
        >
          Your Result
        </div>

        <h1 className="text-5xl md:text-7xl font-extralight text-white mb-4">
          {profile.title}
        </h1>
        <p className="text-2xl text-accent-gold font-light mb-8">
          {profile.subtitle}
        </p>
        <p className="text-text-gray text-lg max-w-2xl mx-auto leading-relaxed">
          {profile.description}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/5 rounded-2xl p-8 border border-white/10"
      >
        <h3 className="text-lg font-medium text-white mb-6 text-center">
          Your Dark Triad Breakdown
        </h3>
        <div className="space-y-6">
          {traitBars.map((trait, index) => (
            <motion.div
              key={trait.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-gray">{trait.name}</span>
                <span className="text-white font-medium">{trait.value}%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${trait.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${trait.value}%` }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="bg-gradient-to-br from-accent-gold/10 to-transparent rounded-2xl p-6 border border-accent-gold/20">
          <h3 className="text-lg font-medium text-accent-gold mb-4">Your Strengths</h3>
          <ul className="space-y-3">
            {profile.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-3 text-text-gray">
                <span className="text-accent-gold mt-1">+</span>
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-accent-burgundy/10 to-transparent rounded-2xl p-6 border border-accent-burgundy/20">
          <h3 className="text-lg font-medium text-accent-burgundy mb-4">Your Dark Side</h3>
          <ul className="space-y-3">
            {profile.darkSide.map((weakness, index) => (
              <li key={index} className="flex items-start gap-3 text-text-gray">
                <span className="text-accent-burgundy mt-1">-</span>
                {weakness}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {showEmailCapture && !emailSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-br from-deep-navy to-accent-burgundy/20 rounded-2xl p-8 border border-white/10 text-center"
        >
          <h3 className="text-xl font-light text-white mb-3">
            Want personalized insights for your type?
          </h3>
          <p className="text-text-gray mb-6">
            Get exclusive content tailored to {profile.title.toLowerCase()}s delivered to your inbox.
          </p>
          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-text-gray focus:outline-none focus:border-accent-gold/50"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-accent-gold text-deep-black font-medium rounded-lg hover:bg-accent-gold/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Get Insights'}
            </button>
          </form>
          <button
            onClick={() => setShowEmailCapture(false)}
            className="mt-4 text-sm text-text-gray hover:text-white transition-colors"
          >
            Skip for now
          </button>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white/5 rounded-2xl p-8 border border-white/10"
      >
        <h3 className="text-lg font-medium text-white mb-2">
          Recommended for You
        </h3>
        <p className="text-accent-gold text-sm mb-4">{profile.recommendation.product}</p>
        <p className="text-text-gray mb-6">{profile.recommendation.reason}</p>
        <Link
          href={profile.recommendation.link}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-gold to-accent-burgundy text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          Learn More
          <span>&rarr;</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="flex flex-col items-center gap-6 pt-8 border-t border-white/10"
      >
        <p className="text-text-gray text-center">
          Share your results and see how your friends compare
        </p>
        <ShareButtons
          url={shareUrl}
          text={shareText}
          onShare={handleShare}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center"
      >
        <Link
          href="/quiz"
          className="text-accent-gold hover:underline"
        >
          Take the quiz again
        </Link>
      </motion.div>
    </div>
  )
}
