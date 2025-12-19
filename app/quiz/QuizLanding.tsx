'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import BackgroundEffects from '@/components/BackgroundEffects'
import { QUIZ_INFO } from '@/lib/quiz-data'

export default function QuizLanding() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="min-h-screen pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6 px-4 py-2 border border-accent-gold/30 rounded-full">
              <span className="text-accent-gold text-sm tracking-[0.2em] uppercase">
                Psychological Assessment
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white mb-6 tracking-wide">
              {QUIZ_INFO.name}
            </h1>

            <p className="text-xl sm:text-2xl text-accent-gold font-light mb-8">
              {QUIZ_INFO.tagline}
            </p>

            <p className="text-text-gray text-lg max-w-2xl mx-auto mb-12">
              {QUIZ_INFO.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">{QUIZ_INFO.questionCount}</div>
                <div className="text-text-gray text-sm uppercase tracking-wider">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">{QUIZ_INFO.estimatedTime}</div>
                <div className="text-text-gray text-sm uppercase tracking-wider">To Complete</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-accent-gold">6</div>
                <div className="text-text-gray text-sm uppercase tracking-wider">Personality Types</div>
              </div>
            </div>

            {/* CTA Button */}
            <Link href="/quiz/take">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-deep-black font-medium text-lg tracking-wider uppercase rounded transition-all hover:shadow-lg hover:shadow-accent-gold/20"
              >
                Begin Assessment
              </motion.button>
            </Link>
          </motion.div>

          {/* The Six Personality Types */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-light text-white text-center mb-8 tracking-wide">
              The Six Personality Types
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Psychopathic', trait: 'Cold & Calculated', icon: '🎭' },
                { name: 'Sociopathic', trait: 'Impulsive & Reactive', icon: '🔥' },
                { name: 'Narcissistic', trait: 'Grandiose & Entitled', icon: '👑' },
                { name: 'Borderline', trait: 'Intense & Unstable', icon: '🌊' },
                { name: 'Histrionic', trait: 'Dramatic & Magnetic', icon: '✨' },
                { name: 'Neurotypical', trait: 'Balanced & Adaptive', icon: '⚖️' },
              ].map((type, index) => (
                <motion.div
                  key={type.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className={`p-4 bg-deep-black/50 border rounded-lg text-center hover:border-accent-gold/40 transition-colors ${
                    type.name === 'Neurotypical' ? 'border-green-600/30' : 'border-accent-gold/20'
                  }`}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className={`font-light mb-1 ${type.name === 'Neurotypical' ? 'text-green-400' : 'text-accent-gold'}`}>{type.name}</div>
                  <div className="text-text-gray text-xs">{type.trait}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-light text-white text-center mb-8 tracking-wide">
              How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Answer 20 Scenarios',
                  description: 'Real dating and social situations with a functioning assessment. No boring agree/disagree—just truth.'
                },
                {
                  step: '02',
                  title: 'Get Your Profile',
                  description: 'See your primary type and preview your radar chart—for free.'
                },
                {
                  step: '03',
                  title: 'Unlock Full Report',
                  description: `Clinical-style diagnosis with functioning level and detailed analysis delivered to your email for $${QUIZ_INFO.price}.`
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-extralight text-accent-gold/40 mb-4">{item.step}</div>
                  <h3 className="text-lg font-light text-white mb-2">{item.title}</h3>
                  <p className="text-text-gray text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Why This Quiz */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-16"
          >
            <div className="p-8 bg-gradient-to-br from-accent-gold/5 to-transparent border border-accent-gold/20 rounded-lg">
              <h2 className="text-xl font-light text-accent-gold mb-4 text-center">
                This Isn&apos;t Your Average Personality Test
              </h2>
              <p className="text-text-gray text-center max-w-2xl mx-auto">
                Most quizzes ask generic questions and give vague results. The Dark Mirror Assessment
                puts you in real scenarios—dating situations, power dynamics, moments of betrayal—and
                reveals how your psychology actually operates when it matters.
              </p>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <div className="p-6 bg-deep-black/30 border border-accent-gold/10 rounded-lg">
              <p className="text-text-gray text-xs leading-relaxed">
                {QUIZ_INFO.disclaimer}
              </p>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-center mt-12"
          >
            <Link href="/quiz/take">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 border border-accent-gold text-accent-gold font-medium tracking-wider uppercase rounded transition-all hover:bg-accent-gold/10"
              >
                Start Now →
              </motion.button>
            </Link>
            <p className="mt-4 text-text-gray text-sm">
              Free to take. Pay only to unlock your full report.
            </p>
          </motion.div>
        </div>
      </main>
    </>
  )
}
