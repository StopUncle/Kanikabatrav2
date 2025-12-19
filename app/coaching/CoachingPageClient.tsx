'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import BackgroundEffects from '@/components/BackgroundEffects'
import Header from '@/components/Header'
import PayPalButton from '@/components/PayPalButton'
import { COACHING_PACKAGES, COACHING_BUNDLE_BENEFITS } from '@/lib/constants'
import { Check, ArrowRight, Users, Clock, Star, Zap } from 'lucide-react'

export default function CoachingPage() {
  const [selectedPackages, setSelectedPackages] = useState<{[key: string]: 'single' | 'bundle'}>({})
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null)
  const router = useRouter()

  const handlePaymentSuccess = (details: { id: string; amount?: string }, packageName: string, isBundle: boolean) => {
    const params = new URLSearchParams({
      payment_id: details.id,
      order_id: details.id,
      type: 'coaching',
      amount: details.amount || '0',
      package_name: packageName + (isBundle ? ' - Bundle' : ''),
      bundle: isBundle.toString()
    })

    router.push(`/success?${params.toString()}`)
  }

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error)
    alert('Payment failed. Please try again or contact support.')
  }

  const togglePackage = (packageId: string) => {
    setExpandedPackage(expandedPackage === packageId ? null : packageId)
  }

  const selectPackageType = (packageId: string, type: 'single' | 'bundle') => {
    setSelectedPackages(prev => ({
      ...prev,
      [packageId]: type
    }))
  }

  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen pt-20 sm:pt-24 lg:pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6">
              <span className="gradient-text">Operate Regardless of Feelings</span>
            </h1>
            <p className="text-text-gray text-lg md:text-xl max-w-3xl mx-auto mb-8">
              There&apos;s a headspace where fear doesn&apos;t vote, decisions come fast, and the voice
              that wants you to quit goes silent. I live there. I can show you the door.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-accent-gold">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>40-90 minute intensive sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>1-on-1 with a diagnosed sociopath</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>Access the state on demand</span>
              </div>
            </div>

          </motion.div>

          {/* Bundle Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-r from-accent-burgundy/20 to-accent-sapphire/20 rounded-2xl p-6 mb-12 border border-accent-gold/20"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-light gradient-text-gold mb-2">Bundle Advantages</h2>
              <p className="text-text-muted">Get more transformation for less investment</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {COACHING_BUNDLE_BENEFITS.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-accent-gold flex-shrink-0" />
                  <span className="text-sm text-text-light">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Coaching Packages */}
          <div className="space-y-8 mb-16">
            {COACHING_PACKAGES.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                id={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative overflow-hidden ${pkg.popular ? 'lg:scale-[1.02]' : ''}`}
              >
                <div className={`bg-deep-black/40 backdrop-blur-sm border rounded-2xl p-6 sm:p-8 relative ${
                  pkg.popular ? 'border-accent-gold shadow-2xl shadow-accent-gold/10' : 'border-accent-gold/20'
                }`}>
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="bg-gradient-to-r from-accent-gold to-accent-gold/80 text-deep-black px-6 py-2 rounded-full text-sm font-bold tracking-wide flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  {/* Package Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-8">
                    <div className="flex-1">
                      <h3 className="text-3xl sm:text-4xl font-light gradient-text-gold mb-4">
                        {pkg.name}
                      </h3>
                      <p className="text-text-gray text-lg leading-relaxed mb-6">
                        {pkg.description}
                      </p>
                      <button
                        onClick={() => togglePackage(pkg.id)}
                        className="flex items-center gap-2 text-accent-gold hover:text-accent-gold/80 transition-colors text-sm font-medium"
                      >
                        {expandedPackage === pkg.id ? 'Show Less' : 'Learn More'}
                        <ArrowRight className={`w-4 h-4 transition-transform ${expandedPackage === pkg.id ? 'rotate-90' : ''}`} />
                      </button>
                    </div>

                    {/* Pricing Options */}
                    <div className="flex-shrink-0 w-full lg:w-auto">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:w-80">
                        {/* Single Session */}
                        <div
                          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedPackages[pkg.id] === 'single'
                              ? 'border-accent-gold bg-accent-gold/5'
                              : 'border-accent-gold/30 hover:border-accent-gold/50'
                          }`}
                          onClick={() => selectPackageType(pkg.id, 'single')}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-medium text-text-light">Single Session</h4>
                              <p className="text-text-muted text-sm">{pkg.duration}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-light gradient-text">
                                ${pkg.price}
                              </div>
                            </div>
                          </div>
                          {selectedPackages[pkg.id] === 'single' && (
                            <PayPalButton
                              type="coaching"
                              itemId={pkg.id}
                              amount={pkg.price}
                              itemName={pkg.name}
                              onSuccess={(details) => handlePaymentSuccess(details, pkg.name, false)}
                              onError={handlePaymentError}
                              className="mt-4"
                            />
                          )}
                        </div>

                        {/* Bundle */}
                        <div
                          className={`p-6 rounded-xl border-2 cursor-pointer transition-all relative ${
                            selectedPackages[pkg.id] === 'bundle'
                              ? 'border-accent-gold bg-accent-gold/5'
                              : 'border-accent-gold/30 hover:border-accent-gold/50'
                          }`}
                          onClick={() => selectPackageType(pkg.id, 'bundle')}
                        >
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-accent-burgundy to-accent-sapphire text-white px-3 py-1 rounded-full text-xs font-medium">
                            SAVE ${(pkg.price * 3) - pkg.bundlePrice}
                          </div>
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-medium text-text-light">Bundle Package</h4>
                              <p className="text-text-muted text-sm">{pkg.bundleDuration}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-light gradient-text">
                                ${pkg.bundlePrice}
                              </div>
                              <div className="text-xs text-text-muted line-through">
                                ${pkg.price * 3}
                              </div>
                            </div>
                          </div>
                          {selectedPackages[pkg.id] === 'bundle' && (
                            <PayPalButton
                              type="coaching"
                              itemId={`${pkg.id}-bundle`}
                              amount={pkg.bundlePrice}
                              itemName={`${pkg.name} - Bundle`}
                              onSuccess={(details) => handlePaymentSuccess(details, pkg.name, true)}
                              onError={handlePaymentError}
                              className="mt-4"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedPackage === pkg.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-accent-gold/20 pt-8"
                      >
                        {/* Long Description */}
                        <div className="mb-8">
                          <h4 className="text-xl font-light text-accent-gold mb-4">What You&apos;ll Learn</h4>
                          <p className="text-text-gray leading-relaxed">
                            {pkg.longDescription}
                          </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                          {/* Single Session Features */}
                          <div>
                            <h4 className="text-lg font-light text-accent-gold mb-4 flex items-center gap-2">
                              <Star className="w-5 h-5" />
                              Single Session Includes
                            </h4>
                            <ul className="space-y-3">
                              {pkg.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <Check className="text-accent-gold mt-0.5 flex-shrink-0" size={18} />
                                  <span className="text-text-light text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Bundle Features */}
                          <div>
                            <h4 className="text-lg font-light text-accent-gold mb-4 flex items-center gap-2">
                              <Zap className="w-5 h-5" />
                              Bundle Exclusive Benefits
                            </h4>
                            <ul className="space-y-3">
                              {pkg.bundleFeatures.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <Check className="text-accent-gold mt-0.5 flex-shrink-0" size={18} />
                                  <span className="text-text-light text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Process Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-light text-center mb-12">
              <span className="gradient-text">The Process</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Identify Your Blocks',
                  description: 'Deep analysis of what\'s creating hesitation, emotional hijacking, and friction in your psychology. We find the patterns that are holding you back.'
                },
                {
                  step: '02',
                  title: 'Design Your Protocols',
                  description: 'Custom strategies based on your specific triggers, goals, and operating environment. Each protocol is tailored to how your mind actually works.'
                },
                {
                  step: '03',
                  title: 'Lock It In',
                  description: 'Practice, reinforcement, and direct access to ensure the new patterns stick. Bundle clients get ongoing support when it matters most.'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8 text-center hover:border-accent-gold/30 transition-all"
                >
                  <div className="text-6xl font-light gradient-text-gold opacity-50 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-light gradient-text-gold mb-4">
                    {item.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center bg-gradient-to-r from-accent-burgundy/10 to-accent-sapphire/10 rounded-2xl p-8 border border-accent-gold/20"
          >
            <h2 className="text-2xl sm:text-3xl font-light mb-4">
              <span className="gradient-text">Ready to stop negotiating with yourself?</span>
            </h2>
            <p className="text-text-muted mb-6 max-w-2xl mx-auto">
              Select your path above, or contact us for a recommendation based on your specific goals.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-burgundy to-accent-sapphire text-white px-8 py-3 rounded-full hover:shadow-lg transition-all font-medium"
            >
              Questions? Contact Support
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </>
  )
}