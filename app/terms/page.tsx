'use client'

import { motion } from 'framer-motion'
import BackgroundEffects from '@/components/BackgroundEffects'
import Header from '@/components/Header'
import { SITE_CONFIG } from '@/lib/constants'

export default function TermsPage() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen pt-32 pb-16 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-light mb-6">
              <span className="gradient-text">Terms of Service</span>
            </h1>
            <p className="text-text-gray text-lg">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>

          {/* Terms Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8">
                <h2 className="text-2xl font-light gradient-text-gold mb-6">1. Acceptance of Terms</h2>
                <div className="space-y-4">
                  <p className="text-text-gray leading-relaxed">
                    By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                  <p className="text-text-gray leading-relaxed">
                    These terms apply to all visitors, users, and others who access or use the service provided by {SITE_CONFIG.name}.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8">
                <h2 className="text-2xl font-light gradient-text-gold mb-6">2. Services and Content</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">Educational Purpose</h3>
                    <p className="text-text-gray leading-relaxed">
                      All content, including books, coaching sessions, and educational materials, is provided for informational and educational purposes only. This content is not intended as medical, psychological, or therapeutic advice.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">Coaching Services</h3>
                    <p className="text-text-gray leading-relaxed">
                      Coaching services are not therapy or medical treatment. {SITE_CONFIG.name} is not a licensed therapist, counselor, or medical professional. Coaching is intended for high-functioning individuals seeking personal development and strategic thinking enhancement.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">Content Disclaimer</h3>
                    <p className="text-text-gray leading-relaxed">
                      Content may include discussion of dark psychology, manipulation tactics, and antisocial personality traits. This content is presented for educational understanding and self-protection, not for causing harm to others.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8">
                <h2 className="text-2xl font-light gradient-text-gold mb-6">3. Payment and Refunds</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">Payment Terms</h3>
                    <p className="text-text-gray leading-relaxed">
                      All payments must be made in advance of receiving services. We accept payment via PayPal and other approved payment methods. Prices are subject to change without notice.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">Refund Policy</h3>
                    <p className="text-text-gray leading-relaxed mb-4">
                      For coaching services: Full refund available if requested within 24 hours of first session completion and you are not satisfied. After 24 hours, no refunds will be provided.
                    </p>
                    <p className="text-text-gray leading-relaxed">
                      For digital products: Due to the nature of digital products, all sales are final unless otherwise specified.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8">
                <h2 className="text-2xl font-light gradient-text-gold mb-6">4. User Responsibilities</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">Prohibited Uses</h3>
                    <p className="text-text-gray leading-relaxed mb-4">You agree not to use our services or content to:</p>
                    <ul className="list-disc list-inside space-y-2 text-text-gray ml-4">
                      <li>Harm, harass, or manipulate others</li>
                      <li>Engage in illegal activities</li>
                      <li>Violate the rights of others</li>
                      <li>Distribute malicious software or spam</li>
                      <li>Impersonate any person or entity</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">Ethical Use</h3>
                    <p className="text-text-gray leading-relaxed">
                      You agree to use all information and strategies learned for ethical purposes, self-protection, and legitimate personal development goals only.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8">
                <h2 className="text-2xl font-light gradient-text-gold mb-6">5. Disclaimers and Limitations</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">No Guarantees</h3>
                    <p className="text-text-gray leading-relaxed">
                      We make no guarantees about specific outcomes or results. Individual results may vary based on personal circumstances, effort, and application of provided strategies.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">Limitation of Liability</h3>
                    <p className="text-text-gray leading-relaxed">
                      {SITE_CONFIG.name} shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services or content.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">Mental Health</h3>
                    <p className="text-text-gray leading-relaxed">
                      If you are experiencing mental health issues, suicidal thoughts, or psychological distress, please seek immediate professional help from qualified mental health professionals.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8">
                <h2 className="text-2xl font-light gradient-text-gold mb-6">6. Privacy and Confidentiality</h2>
                <div className="space-y-4">
                  <p className="text-text-gray leading-relaxed">
                    We respect your privacy and maintain strict confidentiality regarding all coaching sessions and personal information shared.
                  </p>
                  <p className="text-text-gray leading-relaxed">
                    Personal information collected is used solely for providing services and will not be shared with third parties without your consent, except as required by law.
                  </p>
                  <p className="text-text-gray leading-relaxed">
                    For detailed information about how we collect, use, and protect your data, please refer to our Privacy Policy.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8">
                <h2 className="text-2xl font-light gradient-text-gold mb-6">7. Modifications and Contact</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">Changes to Terms</h3>
                    <p className="text-text-gray leading-relaxed">
                      We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated &ldquo;Last modified&rdquo; date.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">Contact Information</h3>
                    <p className="text-text-gray leading-relaxed">
                      For questions about these terms, please contact us at:{' '}
                      <a href={`mailto:${SITE_CONFIG.email}`} className="text-accent-gold hover:text-accent-gold/80 transition-colors">
                        {SITE_CONFIG.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}