'use client'

import { motion } from 'framer-motion'
import { SITE_CONFIG } from '@/lib/constants'

export default function AboutContent() {
  return (
    <div className="min-h-screen pt-32 pb-16 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            <span className="gradient-text">{SITE_CONFIG.title}</span>
          </h1>
          <p className="text-text-gray text-lg md:text-xl max-w-3xl mx-auto">
            {SITE_CONFIG.description}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8 h-full">
              <h2 className="text-2xl font-light gradient-text-gold mb-6">The Origin Story</h2>
              <div className="space-y-4 text-text-gray leading-relaxed">
                <p>
                  From psychiatric wards to pageant stages—my journey defies every expectation society has about what a diagnosed sociopath should look like.
                </p>
                <p>
                  At 19, I received my official diagnosis: Antisocial Personality Disorder. While others saw this as a limitation, I recognized it as my greatest advantage. Where most people struggle with emotional baggage, social anxiety, and self-doubt, I operate with crystal-clear logic and unshakeable confidence.
                </p>
                <p>
                  I&apos;ve won beauty pageants, built businesses, and mastered the art of human psychology—not despite my diagnosis, but because of it. I see patterns others miss. I make decisions others fear. I achieve what others only dream of.
                </p>
                <p>
                  Now, I&apos;m sharing these insights with women who are ready to stop being victims and start being victors. My lack of empathy isn&apos;t a weakness—it&apos;s the superpower that lets me teach you the truth about power, attraction, and dominance.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Credentials */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8 h-full">
              <h2 className="text-2xl font-light gradient-text-gold mb-6">The Credentials</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-accent-gold text-sm uppercase tracking-wider mb-2">Clinical</h3>
                  <ul className="space-y-2 text-text-gray">
                    <li>• Diagnosed with Antisocial Personality Disorder (2019)</li>
                    <li>• Factor 1 Psychopathy traits confirmed</li>
                    <li>• Studied by multiple psychiatric professionals</li>
                    <li>• Living proof that ASPD can be a strategic advantage</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-accent-gold text-sm uppercase tracking-wider mb-2">Achievements</h3>
                  <ul className="space-y-2 text-text-gray">
                    <li>• Multiple beauty pageant titles</li>
                    <li>• 500K+ social media following</li>
                    <li>• 20.6M+ YouTube views</li>
                    <li>• Published author and speaker</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-accent-gold text-sm uppercase tracking-wider mb-2">Expertise</h3>
                  <ul className="space-y-2 text-text-gray">
                    <li>• Dark psychology and manipulation</li>
                    <li>• Strategic relationship architecture</li>
                    <li>• Power dynamics and control</li>
                    <li>• Psychological warfare tactics</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-deep-burgundy/20 to-deep-navy/20 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-12 text-center"
        >
          <h2 className="text-3xl font-light gradient-text mb-6">My Philosophy</h2>
          <p className="text-xl text-text-gray mb-8 italic">
            &quot;Your empathy is their weapon. Your coldness is your shield.&quot;
          </p>
          <div className="max-w-3xl mx-auto space-y-4 text-text-gray leading-relaxed">
            <p>
              I don&apos;t teach you to be nice. I teach you to be strategic. In a world where emotional manipulation is disguised as love, where vulnerability is weaponized against you, and where &apos;being yourself&apos; leads to being exploited—you need a different approach.
            </p>
            <p>
              My methods aren&apos;t about becoming evil. They&apos;re about recognizing that the game of power has always existed, and you&apos;ve been playing it with a blindfold on. I&apos;m here to remove that blindfold and show you how the game really works.
            </p>
            <p>
              Some will call this controversial. Others will call it dangerous. I call it necessary. Because while everyone else is teaching you to heal, I&apos;m teaching you to win.
            </p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-light mb-6">
            <span className="text-text-light">Ready to Learn From a</span>{' '}
            <span className="gradient-text">Real Predator?</span>
          </h2>
          <p className="text-text-gray text-lg mb-8 max-w-2xl mx-auto">
            Stop taking advice from people who lose. Learn from someone who can&apos;t.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/book" className="btn-primary rounded-full text-white px-8 py-4">
              Get The Book
            </a>
            <a href="/coaching" className="btn-secondary rounded-full px-8 py-4">
              Private Coaching
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}