'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import BackgroundEffects from '@/components/BackgroundEffects'
import Header from '@/components/Header'
import { Check, Loader2, AlertCircle, BookOpen, MessageSquare, Play } from 'lucide-react'

export default function SubscribeSuccessPage() {
  const searchParams = useSearchParams()
  const params = useParams()
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState('')

  const subscriptionId = searchParams.get('subscription_id')
  const courseId = searchParams.get('course_id')
  const slug = params.slug as string

  useEffect(() => {
    if (!subscriptionId || !courseId) {
      setStatus('error')
      setError('Missing subscription information')
      return
    }

    const activateSubscription = async () => {
      try {
        const response = await fetch('/api/subscriptions/activate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subscriptionId, courseId })
        })

        const data = await response.json()

        if (data.success) {
          setStatus('success')
        } else {
          setStatus('error')
          setError(data.error || 'Failed to activate subscription')
        }
      } catch (_err) {
        setStatus('error')
        setError('An error occurred while activating your subscription')
      }
    }

    activateSubscription()
  }, [subscriptionId, courseId])

  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen pt-20 sm:pt-24 lg:pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          {status === 'loading' && (
            <div className="bg-deep-black/40 backdrop-blur-sm border border-accent-gold/20 rounded-2xl p-8 text-center">
              <Loader2 className="w-16 h-16 text-accent-gold mx-auto mb-6 animate-spin" />
              <h1 className="text-2xl font-light gradient-text mb-4">
                Activating Your Subscription
              </h1>
              <p className="text-text-muted">
                Please wait while we set up your course access...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="bg-deep-black/40 backdrop-blur-sm border border-accent-gold rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-light gradient-text-gold mb-4">
                Welcome to the Course!
              </h1>
              <p className="text-text-gray mb-8">
                Your subscription is now active. You have full access to all course content and the community forum.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-left p-4 bg-accent-gold/5 rounded-lg">
                  <BookOpen className="w-5 h-5 text-accent-gold flex-shrink-0" />
                  <div>
                    <p className="text-text-light text-sm font-medium">Full Course Access</p>
                    <p className="text-text-muted text-xs">Watch all video lessons</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-left p-4 bg-accent-gold/5 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-accent-gold flex-shrink-0" />
                  <div>
                    <p className="text-text-light text-sm font-medium">Community Forum</p>
                    <p className="text-text-muted text-xs">Connect with other students</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => router.push(`/courses/${slug}`)}
                  className="w-full bg-gradient-to-r from-accent-burgundy to-accent-sapphire text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Start Learning
                </button>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-full bg-accent-gold/10 text-accent-gold py-3 rounded-xl hover:bg-accent-gold/20 transition-colors"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-deep-black/40 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <h1 className="text-2xl font-light text-red-400 mb-4">
                Something Went Wrong
              </h1>
              <p className="text-text-gray mb-6">
                {error}
              </p>
              <p className="text-text-muted text-sm mb-8">
                If you were charged, please contact support and we&apos;ll resolve this immediately.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => router.push(`/courses/${slug}`)}
                  className="w-full bg-accent-gold/10 text-accent-gold py-3 rounded-xl hover:bg-accent-gold/20 transition-colors"
                >
                  Return to Course
                </button>
                <button
                  onClick={() => router.push('/contact')}
                  className="w-full text-text-muted hover:text-text-light py-3 transition-colors"
                >
                  Contact Support
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  )
}
