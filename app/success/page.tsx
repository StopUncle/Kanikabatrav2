'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import BackgroundEffects from '@/components/BackgroundEffects'
import Header from '@/components/Header'
import BookingModal from '@/components/BookingModal'
import { CheckCircle, Download, Calendar } from 'lucide-react'

function SuccessContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [orderDetails, setOrderDetails] = useState<{
    type?: string
    amount?: string
    orderId?: string
    customerName?: string
    customerEmail?: string
    packageName?: string
    downloadToken?: string
  } | null>(null)

  const searchParams = useSearchParams()

  useEffect(() => {
    // Get order details from URL parameters
    const paymentId = searchParams.get('payment_id')
    const orderId = searchParams.get('order_id')
    const type = searchParams.get('type')
    const amount = searchParams.get('amount')
    const customerName = searchParams.get('customer_name')
    const customerEmail = searchParams.get('customer_email')
    const packageName = searchParams.get('package_name')
    const downloadToken = searchParams.get('download_token')

    if (paymentId || orderId) {
      setOrderDetails({
        type: type || 'purchase',
        amount: amount || 'N/A',
        orderId: orderId || paymentId || 'Unknown',
        customerName: customerName || 'Customer',
        customerEmail: customerEmail || '',
        packageName: packageName || 'Coaching Package',
        downloadToken: downloadToken || undefined
      })

      // Auto-show booking modal for coaching purchases
      if (type === 'coaching') {
        setTimeout(() => {
          setShowBookingModal(true)
        }, 2000)
      }
    }

    setIsLoading(false)
  }, [searchParams])

  const isBookPurchase = orderDetails?.type === 'book'
  const isCoachingPurchase = orderDetails?.type === 'coaching'

  if (isLoading) {
    return (
      <>
        <BackgroundEffects />
        <Header />
        <div className="min-h-screen pt-32 pb-16 px-4 relative z-10 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-gold mx-auto mb-4"></div>
            <p className="text-text-gray">Loading...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen pt-32 pb-16 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CheckCircle className="w-20 h-20 text-accent-gold mx-auto mb-8" />

            <h1 className="text-5xl md:text-6xl font-light mb-6">
              <span className="gradient-text">Payment Successful!</span>
            </h1>

            <p className="text-text-gray text-lg md:text-xl mb-12">
              Your order has been processed successfully. Welcome to the dark side.
            </p>
          </motion.div>

          {orderDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8 mb-12"
            >
              <h2 className="text-2xl font-light gradient-text-gold mb-6">Order Details</h2>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <p className="text-text-gray mb-2"><strong>Order ID:</strong></p>
                  <p className="text-text-light font-mono text-sm">{orderDetails.orderId}</p>
                </div>
                <div>
                  <p className="text-text-gray mb-2"><strong>Amount:</strong></p>
                  <p className="text-text-light">${orderDetails.amount}</p>
                </div>
                {orderDetails.packageName && (
                  <div className="md:col-span-2">
                    <p className="text-text-gray mb-2"><strong>Item:</strong></p>
                    <p className="text-text-light">{orderDetails.packageName}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {isBookPurchase && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8"
              >
                <Download className="w-12 h-12 text-accent-gold mx-auto mb-4" />
                <h3 className="text-xl font-light gradient-text-gold mb-4">Download Your Book</h3>
                <p className="text-text-gray mb-6">
                  We&apos;re also sending a copy of your download link to your email (check spam folder if you don&apos;t see it).
                  Click below to download immediately:
                </p>

                <a
                  href={orderDetails?.downloadToken ? `/api/download?token=${orderDetails.downloadToken}&format=epub` : '#'}
                  className="w-full btn-primary rounded-full text-white py-4 text-center inline-block mb-6"
                  onClick={(e) => {
                    if (!orderDetails?.downloadToken) {
                      e.preventDefault()
                      alert('Demo mode - real purchases will have a working download link here')
                    }
                  }}
                >
                  📚 Download Book Now (EPUB)
                </a>

                <div className="bg-deep-burgundy/20 border border-deep-burgundy/30 rounded-lg p-4">
                  <p className="text-sm text-text-gray">
                    <strong className="text-accent-gold">Important:</strong> The download link is valid for 30 days with 5 downloads max.
                    Save your copy locally for permanent access. If you need help, contact Kanika@kanikarose.com
                  </p>
                </div>
              </motion.div>
            )}

            {isCoachingPurchase && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8"
              >
                <Calendar className="w-12 h-12 text-accent-gold mx-auto mb-4" />
                <h3 className="text-xl font-light gradient-text-gold mb-4">Schedule Your Session</h3>
                <p className="text-text-gray mb-6">
                  Complete the pre-session questionnaire to get the most out of our time together.
                  You&apos;ll then receive a scheduling link within 24-48 hours.
                </p>
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full btn-primary rounded-full text-white py-3 mb-4"
                >
                  Complete Questionnaire
                </button>
                <div className="bg-deep-burgundy/20 border border-deep-burgundy/30 rounded-lg p-4">
                  <p className="text-sm text-text-gray">
                    <strong className="text-accent-gold">Note:</strong> The questionnaire helps me prepare for our session
                    and ensures we address your specific needs effectively.
                  </p>
                </div>
              </motion.div>
            )}

            {!isBookPurchase && !isCoachingPurchase && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="md:col-span-2 bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8"
              >
                <h3 className="text-xl font-light gradient-text-gold mb-4">What&apos;s Next?</h3>
                <p className="text-text-gray mb-6">
                  You&apos;ll receive a confirmation email with detailed instructions within the next few minutes.
                  Check your inbox and spam folder.
                </p>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="btn-primary rounded-full text-white px-8 py-3 text-center"
            >
              Contact Support
            </Link>
            <Link
              href="/"
              className="btn-secondary rounded-full px-8 py-3 text-center"
            >
              Return Home
            </Link>
            <Link
              href="/contact"
              className="btn-ghost rounded-full px-8 py-3 text-center"
            >
              Contact Support
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-text-gray text-sm italic">
              &ldquo;Welcome to the darkness. Your transformation begins now.&rdquo;
            </p>
            <p className="text-accent-gold text-sm mt-2">- Kanika Batra</p>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal for Coaching Purchases */}
      {isCoachingPurchase && orderDetails && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          packageName={orderDetails.packageName || 'Coaching Package'}
          customerName={orderDetails.customerName || 'Customer'}
          customerEmail={orderDetails.customerEmail || ''}
          orderId={orderDetails.orderId || ''}
        />
      )}
    </>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <>
        <BackgroundEffects />
        <Header />
        <div className="min-h-screen pt-32 pb-16 px-4 relative z-10 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-gold mx-auto mb-4"></div>
            <p className="text-text-gray">Loading...</p>
          </div>
        </div>
      </>
    }>
      <SuccessContent />
    </Suspense>
  )
}