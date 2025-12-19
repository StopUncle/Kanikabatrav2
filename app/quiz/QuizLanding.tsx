'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'

export default function QuizLanding() {
  return (
    <div className="min-h-screen bg-deep-black overflow-hidden">
      <Header />

      <main className="pt-32 pb-20 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-accent-burgundy/20 text-accent-gold text-sm uppercase tracking-widest rounded-full mb-8 border border-accent-burgundy/30">
              Dark Psychology Assessment
            </span>

            <h1 className="text-5xl md:text-7xl font-extralight uppercase tracking-wide text-white mb-6">
              Which <span className="text-accent-gold">Dark Triad</span>
              <br />
              <span className="font-thin">Personality Are You?</span>
            </h1>

            <p className="text-xl text-text-gray max-w-2xl mx-auto mb-12 leading-relaxed">
              Discover whether you&apos;re a Narcissist, Machiavellian, or Psychopath.
              15 questions. Brutal honesty required. Your results will reveal
              your psychological shadow.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                title: 'Narcissism',
                description: 'Self-importance, need for admiration, grandiosity',
                icon: '👑'
              },
              {
                title: 'Machiavellianism',
                description: 'Strategic manipulation, cynicism, pragmatism',
                icon: '♟️'
              },
              {
                title: 'Psychopathy',
                description: 'Low empathy, impulsivity, fearlessness',
                icon: '🎭'
              }
            ].map((trait, index) => (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-gradient-to-br from-white/5 to-white/0 rounded-2xl p-6 border border-white/10"
              >
                <div className="text-4xl mb-4">{trait.icon}</div>
                <h3 className="text-lg font-medium text-white mb-2">{trait.title}</h3>
                <p className="text-sm text-text-gray">{trait.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link
              href="/quiz/questions"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-accent-gold via-accent-burgundy to-accent-gold bg-[length:200%_auto] hover:bg-right-top text-white font-medium text-lg rounded-full transition-all duration-500 shadow-lg shadow-accent-gold/20 hover:shadow-accent-gold/40"
            >
              Begin Assessment
              <span className="text-xl">&rarr;</span>
            </Link>

            <p className="mt-6 text-sm text-text-gray">
              Takes approximately 3-5 minutes. Results are private unless you choose to share.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-20 pt-12 border-t border-white/10"
          >
            <p className="text-text-gray text-sm mb-4 uppercase tracking-wider">
              Based on Dark Triad Research
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-xs text-text-gray/60">
              <span>15 Questions</span>
              <span>•</span>
              <span>Science-Based</span>
              <span>•</span>
              <span>Instant Results</span>
              <span>•</span>
              <span>Shareable</span>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-accent-burgundy/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-accent-gold/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-deep-navy/50 rounded-full blur-[200px] pointer-events-none" />
      </main>
    </div>
  )
}
