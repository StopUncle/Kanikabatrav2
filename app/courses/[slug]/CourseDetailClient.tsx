'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import BackgroundEffects from '@/components/BackgroundEffects'
import Header from '@/components/Header'
import ModuleList from '@/components/course/ModuleList'
import SubscriptionCard from '@/components/course/SubscriptionCard'
import ProgressBar from '@/components/course/ProgressBar'
import { Crown, BookOpen, Play, Clock, ArrowLeft, MessageSquare } from 'lucide-react'

interface Lesson {
  id: string
  title: string
  slug: string
  description: string | null
  duration: number | null
  isFree: boolean
  isCompleted?: boolean
  watchedSeconds?: number
}

interface Module {
  id: string
  title: string
  slug: string
  description: string | null
  lessons: Lesson[]
}

interface Course {
  id: string
  title: string
  slug: string
  description: string | null
  thumbnailUrl: string | null
  price: number
  tier: string
}

interface CourseDetailClientProps {
  course: Course
  modules: Module[]
  hasAccess: boolean
  subscriptionStatus?: string
  progress: number
  isLoggedIn: boolean
  totalLessons: number
  completedLessons: number
}

export default function CourseDetailClient({
  course,
  modules,
  hasAccess,
  subscriptionStatus,
  progress,
  isLoggedIn,
  totalLessons,
  completedLessons
}: CourseDetailClientProps) {
  const router = useRouter()
  const [_showSubscribeModal, _setShowSubscribeModal] = useState(false)
  const isGold = course.tier === 'gold'

  const totalDuration = modules.reduce((acc, m) =>
    acc + m.lessons.reduce((la, l) => la + (l.duration || 0), 0), 0
  )

  const formatTotalDuration = () => {
    const hours = Math.floor(totalDuration / 3600)
    const mins = Math.floor((totalDuration % 3600) / 60)
    if (hours > 0) return `${hours}h ${mins}m`
    return `${mins}m`
  }

  const getNextLesson = () => {
    for (const mod of modules) {
      for (const lesson of mod.lessons) {
        if (!lesson.isCompleted) {
          return { module: mod, lesson }
        }
      }
    }
    return null
  }

  const nextLesson = hasAccess ? getNextLesson() : null

  const handleSubscribe = () => {
    router.push(`/courses/${course.slug}/subscribe`)
  }

  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen pt-20 sm:pt-24 lg:pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => router.push('/courses')}
            className="flex items-center gap-2 text-text-muted hover:text-accent-gold transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Courses</span>
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  {isGold && (
                    <span className="bg-gradient-to-r from-accent-gold to-yellow-500 text-deep-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      GOLD TIER
                    </span>
                  )}
                </div>

                <h1 className={`text-3xl sm:text-4xl md:text-5xl font-light mb-4 ${
                  isGold ? 'gradient-text-gold' : 'gradient-text'
                }`}>
                  {course.title}
                </h1>

                {course.description && (
                  <p className="text-text-gray text-lg mb-6">
                    {course.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-4 sm:gap-6 text-sm">
                  <div className="flex items-center gap-2 text-text-muted">
                    <BookOpen className="w-4 h-4 text-accent-gold" />
                    <span>{modules.length} modules</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-muted">
                    <Play className="w-4 h-4 text-accent-gold" />
                    <span>{totalLessons} lessons</span>
                  </div>
                  {totalDuration > 0 && (
                    <div className="flex items-center gap-2 text-text-muted">
                      <Clock className="w-4 h-4 text-accent-gold" />
                      <span>{formatTotalDuration()} total</span>
                    </div>
                  )}
                </div>
              </motion.div>

              {hasAccess && progress > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8 bg-deep-black/40 backdrop-blur-sm border border-accent-gold/20 rounded-xl p-4 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-medium text-text-light">Your Progress</h3>
                      <p className="text-sm text-text-muted">
                        {completedLessons} of {totalLessons} lessons completed
                      </p>
                    </div>
                    {nextLesson && (
                      <button
                        onClick={() => router.push(
                          `/courses/${course.slug}/${nextLesson.module.slug}/${nextLesson.lesson.slug}`
                        )}
                        className="flex items-center gap-2 bg-gradient-to-r from-accent-burgundy to-accent-sapphire text-white px-4 py-2 rounded-lg text-sm hover:shadow-lg transition-all"
                      >
                        <Play className="w-4 h-4" />
                        Continue
                      </button>
                    )}
                  </div>
                  <ProgressBar progress={progress} showLabel={false} size="lg" />
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl sm:text-2xl font-light gradient-text mb-6">
                  Course Content
                </h2>
                <ModuleList
                  modules={modules}
                  courseSlug={course.slug}
                  hasAccess={hasAccess}
                />
              </motion.div>

              {hasAccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 bg-gradient-to-r from-accent-burgundy/10 to-accent-sapphire/10 rounded-xl p-6 border border-accent-gold/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-accent-gold" />
                    </div>
                    <div>
                      <h3 className="font-medium text-text-light mb-1">
                        Join the Discussion
                      </h3>
                      <p className="text-sm text-text-muted mb-3">
                        Connect with other students, ask questions, and share your progress in our community forum.
                      </p>
                      <button
                        onClick={() => router.push('/community')}
                        className="text-sm text-accent-gold hover:text-accent-gold/80 transition-colors"
                      >
                        Go to Community Forum →
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-28">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <SubscriptionCard
                    course={course}
                    isLoggedIn={isLoggedIn}
                    hasSubscription={hasAccess}
                    subscriptionStatus={subscriptionStatus}
                    onSubscribe={handleSubscribe}
                  />
                </motion.div>

                {!hasAccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 bg-deep-black/20 backdrop-blur-sm border border-accent-gold/10 rounded-xl p-4"
                  >
                    <h4 className="font-medium text-text-light mb-3 text-sm">
                      What&apos;s included:
                    </h4>
                    <ul className="space-y-2 text-sm text-text-muted">
                      <li>• Lifetime access to all lessons</li>
                      <li>• Community forum access</li>
                      <li>• New content as it&apos;s added</li>
                      <li>• Mobile-friendly video player</li>
                      <li>• Track your progress</li>
                    </ul>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
