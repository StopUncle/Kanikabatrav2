'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Plus, ArrowRight, Loader2, CheckCircle, Play, Crown, MessageSquare } from 'lucide-react'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import DashboardCard from '@/components/dashboard/DashboardCard'
import PurchaseItem from '@/components/dashboard/PurchaseItem'
import SessionsSection from '@/components/dashboard/SessionsSection'
import SessionFeedbackModal from '@/components/dashboard/SessionFeedbackModal'
import QuickStats from '@/components/dashboard/QuickStats'
import ProgressOverview from '@/components/dashboard/ProgressOverview'
import AchievementsSection from '@/components/dashboard/AchievementsSection'
import ActivityFeed from '@/components/dashboard/ActivityFeed'
import ProgressBar from '@/components/course/ProgressBar'
import MobileNavigation from '@/components/dashboard/MobileNavigation'
import AccountSection from '@/components/dashboard/AccountSection'

interface CourseSubscription {
  id: string
  status: string
  course: {
    id: string
    title: string
    slug: string
    tier: string
    price: number
  }
  currentPeriodStart: string | null
  currentPeriodEnd: string | null
  cancelledAt: string | null
  progress: {
    completed: number
    total: number
    percentage: number
  }
}

interface Purchase {
  id: string
  type: string
  productVariant: string | null
  amount: number
  downloadToken: string | null
  downloadCount: number
  maxDownloads: number
  createdAt: string
}

interface Session {
  id: string
  packageName: string
  sessionCount: number
  scheduledAt: string | null
  duration: number
  status: string
  meetingUrl: string | null
  notes: string | null
  userNotes: string | null
  feedback?: {
    rating: number
    feedback?: string
  }
}

interface DashboardData {
  user: {
    id: string
    email: string
    name: string | null
    createdAt: string
    purchases: Purchase[]
    sessions: Session[]
  }
}

interface DashboardClientProps {
  user: {
    email: string
    userId: string
  }
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const router = useRouter()
  const [data, setData] = useState<DashboardData | null>(null)
  const [subscriptions, setSubscriptions] = useState<CourseSubscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [feedbackSessionId, setFeedbackSessionId] = useState<string | null>(null)
  const [feedbackSessionTitle, setFeedbackSessionTitle] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [mobileTab, setMobileTab] = useState<'overview' | 'progress' | 'achievements' | 'account'>('overview')

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [dashboardRes, subscriptionsRes] = await Promise.all([
          fetch('/api/user/dashboard'),
          fetch('/api/subscriptions/status')
        ])

        if (!dashboardRes.ok) {
          throw new Error('Failed to fetch dashboard data')
        }
        const dashboardResult = await dashboardRes.json()
        setData(dashboardResult)

        if (subscriptionsRes.ok) {
          const subscriptionsResult = await subscriptionsRes.json()
          setSubscriptions(subscriptionsResult.subscriptions || [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  const purchases = data?.user.purchases.map(p => ({
    type: 'book' as const,
    title: p.type === 'BOOK' ? "Sociopathic Dating Bible" : p.productVariant || 'Product',
    description: 'Master the psychology of power and strategic influence',
    purchaseDate: new Date(p.createdAt).toLocaleDateString(),
    status: 'active' as const,
    downloadUrl: p.downloadToken ? `/api/download/${p.downloadToken}` : '#'
  })) ?? []

  const memberSince = data?.user.createdAt
    ? new Date(data.user.createdAt)
    : new Date()

  const daysActive = Math.floor((Date.now() - memberSince.getTime()) / (1000 * 60 * 60 * 24))

  const stats = {
    totalPurchases: purchases.length,
    upcomingSessions: (data?.user.sessions || []).filter(s => {
      const scheduledAt = s.scheduledAt ? new Date(s.scheduledAt) : null
      return s.status === 'SCHEDULED' && scheduledAt && scheduledAt > new Date()
    }).length,
    completedSessions: (data?.user.sessions || []).filter(s => s.status === 'COMPLETED').length,
    daysActive: Math.max(daysActive, 1)
  }

  const handleNotesUpdate = useCallback(async (sessionId: string, notes: string) => {
    try {
      const response = await fetch(`/api/user/sessions/${sessionId}/notes`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userNotes: notes })
      })

      if (!response.ok) throw new Error('Failed to update notes')

      if (data) {
        setData({
          ...data,
          user: {
            ...data.user,
            sessions: data.user.sessions.map(s =>
              s.id === sessionId ? { ...s, userNotes: notes } : s
            )
          }
        })
      }

      setSuccessMessage('Notes saved!')
      setTimeout(() => setSuccessMessage(null), 2000)
    } catch (err) {
      console.error('Error updating notes:', err)
    }
  }, [data])

  const handleLeaveFeedback = useCallback((sessionId: string) => {
    const session = data?.user.sessions.find(s => s.id === sessionId)
    if (session) {
      setFeedbackSessionId(sessionId)
      setFeedbackSessionTitle(session.packageName)
      setShowFeedbackModal(true)
    }
  }, [data])

  const handleFeedbackSuccess = useCallback(() => {
    if (data && feedbackSessionId) {
      setData({
        ...data,
        user: {
          ...data.user,
          sessions: data.user.sessions.map(s =>
            s.id === feedbackSessionId
              ? { ...s, feedback: { rating: 5, feedback: '' } }
              : s
          )
        }
      })
    }
    setSuccessMessage('Thank you for your feedback!')
    setTimeout(() => setSuccessMessage(null), 3000)
  }, [data, feedbackSessionId])

  if (loading) {
    return (
      <>
        <DashboardHeader userEmail={user.email} />
        <main className="min-h-screen bg-deep-black pt-32 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="w-12 h-12 text-accent-gold animate-spin mb-4" />
              <p className="text-text-gray">Loading your dashboard...</p>
            </div>
          </div>
        </main>
      </>
    )
  }

  if (error) {
    return (
      <>
        <DashboardHeader userEmail={user.email} />
        <main className="min-h-screen bg-deep-black pt-32 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col items-center justify-center py-24">
              <div className="text-center">
                <p className="text-red-400 mb-4">{error}</p>
                <button
                  onClick={() => router.refresh()}
                  className="px-6 py-2 bg-accent-gold text-deep-black rounded-lg font-medium hover:bg-accent-gold/90 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <DashboardHeader userEmail={user.email} />

      <main className="min-h-screen bg-deep-black pt-32 pb-24 md:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-light gradient-text mb-2">
              Welcome back, {data?.user.name || user.email.split('@')[0]}
            </h1>
            <p className="text-text-gray">
              Your psychology of power journey continues here
            </p>
          </div>

          {/* Quick Stats - Always visible */}
          <div className={`mb-8 ${mobileTab !== 'overview' ? 'hidden md:block' : ''}`}>
            <QuickStats {...stats} />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Courses, Purchases & Coaching (visible on Overview tab on mobile) */}
            <div className={`lg:col-span-2 space-y-8 ${mobileTab !== 'overview' ? 'hidden md:block' : ''}`}>
              {/* My Courses Section */}
              <DashboardCard
                title="My Courses"
                subtitle="Your active subscriptions"
                icon={Play}
                headerAction={
                  <Link
                    href="/courses"
                    className="px-4 py-1.5 bg-gold/10 hover:bg-gold/20 rounded-lg text-gold text-sm font-medium transition-colors"
                  >
                    Browse Courses
                  </Link>
                }
              >
                {subscriptions.length > 0 ? (
                  <div className="space-y-4">
                    {subscriptions.map((sub) => (
                      <div
                        key={sub.id}
                        className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 hover:border-accent-gold/30 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {sub.course.tier === 'gold' && (
                                <Crown className="w-4 h-4 text-accent-gold" />
                              )}
                              <h4 className="font-medium text-text-light">
                                {sub.course.title}
                              </h4>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-text-muted">
                              <span className={`px-2 py-0.5 rounded ${
                                sub.status === 'ACTIVE'
                                  ? 'bg-green-500/20 text-green-400'
                                  : sub.status === 'CANCELLED'
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : 'bg-gray-500/20 text-gray-400'
                              }`}>
                                {sub.status}
                              </span>
                              {sub.currentPeriodEnd && sub.status === 'ACTIVE' && (
                                <span>
                                  Renews {new Date(sub.currentPeriodEnd).toLocaleDateString()}
                                </span>
                              )}
                              {sub.cancelledAt && (
                                <span>
                                  Access until {new Date(sub.currentPeriodEnd || '').toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                          <Link
                            href={`/courses/${sub.course.slug}`}
                            className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-accent-burgundy to-accent-sapphire rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all"
                          >
                            <Play className="w-3 h-3" />
                            Continue
                          </Link>
                        </div>
                        <ProgressBar
                          progress={sub.progress.percentage}
                          showLabel={true}
                          size="sm"
                        />
                        <p className="text-xs text-text-muted mt-2">
                          {sub.progress.completed} of {sub.progress.total} lessons completed
                        </p>
                      </div>
                    ))}

                    {subscriptions.some(s => s.status === 'ACTIVE') && (
                      <Link
                        href="/community"
                        className="flex items-center gap-3 p-4 bg-accent-gold/5 border border-accent-gold/20 rounded-xl hover:bg-accent-gold/10 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-accent-gold" />
                        </div>
                        <div>
                          <p className="font-medium text-text-light">Community Forum</p>
                          <p className="text-xs text-text-muted">Connect with other students</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-accent-gold ml-auto" />
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Play size={48} className="mx-auto text-gray-700 mb-3" />
                    <p className="text-text-muted mb-2">No active course subscriptions</p>
                    <p className="text-xs text-text-muted mb-4">
                      Subscribe to a course for full video access and community features
                    </p>
                    <Link
                      href="/courses"
                      className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-accent-burgundy to-accent-sapphire rounded-lg text-white font-medium hover:shadow-lg transition-all"
                    >
                      Browse Courses
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                )}
              </DashboardCard>

              {/* Purchases Section */}
              <DashboardCard
                title="My Purchases"
                subtitle="Your books and content"
                icon={BookOpen}
                headerAction={
                  <button className="text-gold hover:text-gold-dark transition-colors">
                    <Plus size={20} />
                  </button>
                }
              >
                {purchases.length > 0 ? (
                  <div className="space-y-3">
                    {purchases.map((purchase, index) => (
                      <PurchaseItem key={index} {...purchase} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen size={48} className="mx-auto text-gray-700 mb-3" />
                    <p className="text-text-muted">No purchases yet</p>
                    <button
                      onClick={() => router.push('/book')}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-accent-burgundy to-accent-sapphire rounded-lg text-white font-medium hover:shadow-lg transition-all inline-flex items-center gap-2"
                    >
                      Browse Books
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </DashboardCard>

              {/* Coaching Sessions Section */}
              <SessionsSection
                sessions={data?.user.sessions || []}
                onNotesUpdate={handleNotesUpdate}
                onLeaveFeedback={handleLeaveFeedback}
              />
            </div>

            {/* Right Column - Progress, Achievements, Activity & Account */}
            <div className="space-y-6">
              {/* Progress Overview - visible on Progress tab on mobile */}
              <div className={`${mobileTab !== 'overview' && mobileTab !== 'progress' ? 'hidden md:block' : ''}`}>
                <ProgressOverview />
              </div>

              {/* Achievements - visible on Achievements tab on mobile */}
              <div className={`${mobileTab !== 'overview' && mobileTab !== 'achievements' ? 'hidden md:block' : ''}`}>
                <AchievementsSection compact />
              </div>

              {/* Recent Activity - visible on Overview tab on mobile */}
              <div className={`${mobileTab !== 'overview' ? 'hidden md:block' : ''}`}>
                <ActivityFeed compact limit={5} />
              </div>

              {/* Account Settings - visible on Account tab on mobile */}
              <div className={`${mobileTab !== 'overview' && mobileTab !== 'account' ? 'hidden md:block' : ''}`}>
                <AccountSection
                  email={user.email}
                  userId={user.userId}
                  name={data?.user.name || null}
                  memberSince={memberSince}
                  onProfileUpdate={(newName) => {
                    if (data) {
                      setData({
                        ...data,
                        user: { ...data.user, name: newName }
                      })
                    }
                  }}
                  onPasswordChange={() => {}}
                  onSuccess={(message) => {
                    setSuccessMessage(message)
                    setTimeout(() => setSuccessMessage(null), 3000)
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Success Message Toast */}
        {successMessage && (
          <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex items-center gap-2 bg-green-900/90 border border-green-500 rounded-lg px-4 py-3 text-green-200 shadow-lg animate-fade-in">
            <CheckCircle className="w-5 h-5" />
            <span>{successMessage}</span>
          </div>
        )}
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation activeTab={mobileTab} onTabChange={setMobileTab} />

      {/* Session Feedback Modal */}
      {feedbackSessionId && (
        <SessionFeedbackModal
          isOpen={showFeedbackModal}
          onClose={() => {
            setShowFeedbackModal(false)
            setFeedbackSessionId(null)
          }}
          sessionId={feedbackSessionId}
          sessionTitle={feedbackSessionTitle}
          onSuccess={handleFeedbackSuccess}
        />
      )}
    </>
  )
}
