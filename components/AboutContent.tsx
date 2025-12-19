'use client'

import { motion } from 'framer-motion'
import { SITE_CONFIG, SOCIAL_METRICS, CONTENT_THEMES } from '@/lib/constants'
import SocialHub from './SocialHub'
import Disclaimer from './Disclaimer'
import FAQSection from './FAQSection'

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
          <p className="text-text-gray text-lg md:text-xl max-w-3xl mx-auto mb-4">
            {SITE_CONFIG.description}
          </p>
          <p className="text-gold-400 text-xl italic">
            &quot;{SITE_CONFIG.tagline}&quot;
          </p>
        </motion.div>

        {/* Quick Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          <div className="bg-deep-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-light text-white">{SOCIAL_METRICS.combined.totalFollowers}</div>
            <div className="text-gray-500 text-sm">Total Followers</div>
          </div>
          <div className="bg-deep-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-light text-white">{SOCIAL_METRICS.combined.totalViews}</div>
            <div className="text-gray-500 text-sm">Total Views</div>
          </div>
          <div className="bg-deep-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-light text-white">28</div>
            <div className="text-gray-500 text-sm">Years Old</div>
          </div>
          <div className="bg-deep-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-light text-white">21</div>
            <div className="text-gray-500 text-sm">Age of ASPD Diagnosis</div>
          </div>
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
                  Born in New Zealand and raised in Sydney, Australia—my journey from psychiatric assessment to international pageant stages defies every expectation society has about what a diagnosed sociopath should look like.
                </p>
                <p>
                  At 21, after years of behavioral issues, poor impulse control, and a near-fatal suicide attempt, I finally received my diagnosis: Antisocial Personality Disorder. The psychiatrist who diagnosed me had spent years working in prisons. He saw what I was immediately.
                </p>
                <p>
                  While others saw this as a death sentence, I recognized it as my greatest advantage. Where most people struggle with emotional baggage, social anxiety, and self-doubt, I operate with crystal-clear logic and unshakeable confidence.
                </p>
                <p>
                  Now based in Barcelona with my husband Sam of 3.5 years, I&apos;ve built a following of over 670,000 across social media—teaching people the strategic truths about power, attraction, and dominance that society refuses to acknowledge.
                </p>
                <p className="text-white font-medium">
                  I&apos;m here to teach you how to stop being predictable, stop being the victim, and start being the villain.
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
                  <h3 className="text-accent-gold text-sm uppercase tracking-wider mb-2">Clinical Diagnosis</h3>
                  <ul className="space-y-2 text-text-gray">
                    <li>• Clinically Diagnosed ASPD (Age 21)</li>
                    <li>• Assessed by prison psychiatrist specialist</li>
                    <li>• Documented behavioral patterns since childhood</li>
                    <li>• Living proof that ASPD can be weaponized for success</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-accent-gold text-sm uppercase tracking-wider mb-2">Beauty Pageant Titles</h3>
                  <ul className="space-y-2 text-text-gray">
                    {SITE_CONFIG.credentials.filter(c => c.includes('Miss')).map((credential, i) => (
                      <li key={i}>• {credential}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-accent-gold text-sm uppercase tracking-wider mb-2">Digital Presence</h3>
                  <ul className="space-y-2 text-text-gray">
                    <li>• {SOCIAL_METRICS.youtube.totalViews} YouTube views across {SOCIAL_METRICS.youtube.videos} videos</li>
                    <li>• {SOCIAL_METRICS.tiktok.likes} TikTok likes (grew to 500K in ONE MONTH before hack)</li>
                    <li>• {SOCIAL_METRICS.instagram.followers} Instagram followers</li>
                    <li>• Published author: &quot;Honeytrap&quot; (2020), &quot;Sociopathic Dating Bible&quot;</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-accent-gold text-sm uppercase tracking-wider mb-2">Expertise</h3>
                  <ul className="space-y-2 text-text-gray">
                    <li>• Dark psychology and strategic seduction</li>
                    <li>• Manipulation detection and countermeasures</li>
                    <li>• The rotation system for dating power</li>
                    <li>• Psychological warfare and emotional detachment</li>
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

        {/* Social Hub */}
        <SocialHub />

        {/* Why Listen to Kanika - E-E-A-T Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-light text-center mb-8">
            <span className="gradient-text">Why My Perspective Matters</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-deep-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
              <div className="text-accent-gold text-3xl mb-4">01</div>
              <h3 className="text-white font-medium mb-3">Lived Experience</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Unlike most psychology content creators who study personality disorders from textbooks,
                I live with ASPD. My insights come from first-person experience, not theoretical frameworks.
                This gives me a perspective that researchers and therapists simply cannot have.
              </p>
            </div>
            <div className="bg-deep-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
              <div className="text-accent-gold text-3xl mb-4">02</div>
              <h3 className="text-white font-medium mb-3">Verified Track Record</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                With 37M+ views and 670K+ followers, my content has been validated by millions.
                The demand for authentic ASPD perspectives proves there&apos;s a gap in mainstream
                psychology education that I uniquely fill. My audience includes psychology students,
                therapists, and abuse survivors.
              </p>
            </div>
            <div className="bg-deep-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
              <div className="text-accent-gold text-3xl mb-4">03</div>
              <h3 className="text-white font-medium mb-3">Educational Mission</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                I help people understand how Cluster B personalities actually think and operate.
                This knowledge protects potential victims, helps people recognize manipulation patterns,
                and provides insight that can only come from someone on the inside looking out.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Content Topics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-light text-center mb-8">
            <span className="text-white">What I</span>{' '}
            <span className="gradient-text">Cover</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {CONTENT_THEMES.map((theme, index) => (
              <div
                key={index}
                className="bg-deep-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-5 hover:border-accent-burgundy/50 transition-colors"
              >
                <div className="text-2xl mb-3">{theme.icon}</div>
                <h3 className="text-white font-medium mb-2">{theme.name}</h3>
                <p className="text-gray-500 text-sm">{theme.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <FAQSection
            title="Common Questions About Kanika"
            items={[
              {
                question: "Is Kanika actually diagnosed with ASPD?",
                answer: "Yes. At age 21, after years of documented behavioral issues and a near-fatal suicide attempt, I was clinically diagnosed with Antisocial Personality Disorder by a psychiatrist who specialized in working with prison populations. This diagnosis came after comprehensive psychological evaluation."
              },
              {
                question: "What qualifications does Kanika have to discuss psychology?",
                answer: "My qualifications are experiential rather than academic. I provide first-person insights into how Cluster B personalities think and operate—something no textbook can teach. I always emphasize that my content is educational entertainment, not clinical advice, and I encourage anyone struggling with mental health to seek professional help."
              },
              {
                question: "Is the content meant to teach people how to manipulate others?",
                answer: "My content serves two purposes: teaching people to recognize manipulation tactics they may be experiencing, and providing honest insight into how personality disorders like ASPD actually function. Understanding how predators think is the best defense against them."
              },
              {
                question: "What is the difference between a sociopath and a psychopath?",
                answer: "Both terms describe Antisocial Personality Disorder (ASPD). 'Psychopath' often refers to those with the disorder from birth (nature), while 'sociopath' typically describes those who developed it through environment (nurture). Clinically, the formal diagnosis is ASPD. I use 'sociopath' because my condition developed partially through environmental factors."
              },
              {
                question: "Does Kanika work with a mental health professional?",
                answer: "My content focuses on lived experience and education. For anyone struggling with personality disorders, relationship abuse, or mental health challenges, I always recommend working with licensed therapists and mental health professionals. My role is education and awareness, not treatment."
              }
            ]}
          />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
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

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16"
        >
          <Disclaimer variant="full" />
        </motion.div>
      </div>
    </div>
  )
}