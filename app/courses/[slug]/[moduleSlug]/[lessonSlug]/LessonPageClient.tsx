'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import DOMPurify from 'dompurify'
import BackgroundEffects from '@/components/BackgroundEffects'
import Header from '@/components/Header'
import LessonPlayer from '@/components/course/LessonPlayer'
import CourseNav from '@/components/course/CourseNav'
import { ArrowLeft, Check, ChevronRight, Crown, MessageSquare, Lock } from 'lucide-react'

interface Module {
  id: string
  title: string
  slug: string
  lessons: {
    id: string
    title: string
    slug: string
    isFree: boolean
    isCompleted?: boolean
  }[]
}

interface LessonPageClientProps {
  course: {
    id: string
    title: string
    slug: string
    tier: string
  }
  module: {
    id: string
    title: string
    slug: string
  }
  lesson: {
    id: string
    title: string
    slug: string
    description: string | null
    videoUrl: string | null
    textContent: string | null
    duration: number | null
    isFree: boolean
  }
  modules: Module[]
  hasAccess: boolean
  isLoggedIn: boolean
  enrollmentId?: string
  initialProgress: {
    watchedSeconds: number
    isCompleted: boolean
  }
  prevLesson?: { moduleSlug: string; lessonSlug: string; title: string } | null
  nextLesson?: { moduleSlug: string; lessonSlug: string; title: string } | null
}

export default function LessonPageClient({
  course,
  module,
  lesson,
  modules,
  hasAccess,
  isLoggedIn: _isLoggedIn,
  enrollmentId,
  initialProgress,
  prevLesson,
  nextLesson
}: LessonPageClientProps) {
  const _router = useRouter()
  const [isCompleted, setIsCompleted] = useState(initialProgress.isCompleted)
  const isGold = course.tier === 'gold'

  const sanitizedTextContent = useMemo(() => {
    if (!lesson.textContent) return ''
    return DOMPurify.sanitize(lesson.textContent, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre'],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class']
    })
  }, [lesson.textContent])

  const updateProgress = useCallback(async (watchedSeconds: number, completed: boolean = false) => {
    if (!enrollmentId) return

    try {
      await fetch(`/api/courses/${course.slug}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: lesson.id,
          watchedSeconds,
          isCompleted: completed
        })
      })

      if (completed) {
        setIsCompleted(true)
      }
    } catch (error) {
      console.error('Failed to update progress:', error)
    }
  }, [enrollmentId, course.slug, lesson.id])

  const handleVideoProgress = useCallback((seconds: number) => {
    updateProgress(seconds)
  }, [updateProgress])

  const handleVideoComplete = useCallback(() => {
    updateProgress(lesson.duration || 0, true)
  }, [updateProgress, lesson.duration])

  const markAsComplete = async () => {
    await updateProgress(lesson.duration || 0, true)
  }

  return (
    <>
      <BackgroundEffects />
      <Header />

      <div className="min-h-screen pt-20 sm:pt-24 pb-24 lg:pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto lg:mr-96">
          <div className="mb-6">
            <Link
              href={`/courses/${course.slug}`}
              className="inline-flex items-center gap-2 text-text-muted hover:text-accent-gold transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {course.title}
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-2">
              {isGold && (
                <span className="bg-gradient-to-r from-accent-gold to-yellow-500 text-deep-black px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  GOLD
                </span>
              )}
              {lesson.isFree && !hasAccess && (
                <span className="bg-accent-gold/20 text-accent-gold px-2 py-0.5 rounded text-xs">
                  Free Preview
                </span>
              )}
              {isCompleted && (
                <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Completed
                </span>
              )}
            </div>

            <p className="text-text-muted text-sm mb-1">{module.title}</p>
            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-light ${
              isGold ? 'gradient-text-gold' : 'gradient-text'
            }`}>
              {lesson.title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <LessonPlayer
              videoUrl={lesson.videoUrl}
              title={lesson.title}
              onProgress={hasAccess ? handleVideoProgress : undefined}
              onComplete={hasAccess ? handleVideoComplete : undefined}
              initialPosition={initialProgress.watchedSeconds}
              duration={lesson.duration || undefined}
            />
          </motion.div>

          {lesson.textContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-deep-black/40 backdrop-blur-sm border border-accent-gold/20 rounded-xl p-6 sm:p-8 mb-8"
            >
              <h2 className="text-xl font-light gradient-text mb-4">Lesson Notes</h2>
              <div className="prose prose-invert prose-gold max-w-none">
                <div
                  className="text-text-gray leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: sanitizedTextContent }}
                />
              </div>
            </motion.div>
          )}

          {lesson.description && !lesson.textContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-deep-black/40 backdrop-blur-sm border border-accent-gold/20 rounded-xl p-6 mb-8"
            >
              <h2 className="text-lg font-light gradient-text mb-3">About This Lesson</h2>
              <p className="text-text-gray">{lesson.description}</p>
            </motion.div>
          )}

          {hasAccess && !isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <button
                onClick={markAsComplete}
                className="flex items-center gap-2 text-accent-gold hover:text-accent-gold/80 transition-colors"
              >
                <div className="w-5 h-5 rounded border border-accent-gold/50 flex items-center justify-center">
                  <Check className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                </div>
                Mark as Complete
              </button>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            {prevLesson && (
              <Link
                href={`/courses/${course.slug}/${prevLesson.moduleSlug}/${prevLesson.lessonSlug}`}
                className="flex-1 bg-deep-black/40 backdrop-blur-sm border border-accent-gold/20 rounded-xl p-4 hover:border-accent-gold/40 transition-colors"
              >
                <span className="text-xs text-text-muted">Previous</span>
                <p className="text-text-light truncate">{prevLesson.title}</p>
              </Link>
            )}
            {nextLesson && (
              <Link
                href={`/courses/${course.slug}/${nextLesson.moduleSlug}/${nextLesson.lessonSlug}`}
                className="flex-1 bg-gradient-to-r from-accent-burgundy/20 to-accent-sapphire/20 border border-accent-gold/20 rounded-xl p-4 hover:border-accent-gold/40 transition-colors text-right"
              >
                <span className="text-xs text-text-muted">Next</span>
                <p className="text-text-light truncate flex items-center justify-end gap-2">
                  {nextLesson.title}
                  <ChevronRight className="w-4 h-4" />
                </p>
              </Link>
            )}
          </motion.div>

          {!hasAccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-accent-burgundy/20 to-accent-sapphire/20 border border-accent-gold/30 rounded-xl p-6 text-center"
            >
              <Lock className="w-8 h-8 text-accent-gold mx-auto mb-3" />
              <h3 className="text-lg font-medium text-text-light mb-2">
                Subscribe for Full Access
              </h3>
              <p className="text-text-muted text-sm mb-4">
                Get access to all lessons, community forum, and new content updates.
              </p>
              <Link
                href={`/courses/${course.slug}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-burgundy to-accent-sapphire text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                View Subscription Options
              </Link>
            </motion.div>
          )}

          {hasAccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-deep-black/20 backdrop-blur-sm border border-accent-gold/10 rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-accent-gold" />
                <div>
                  <p className="text-sm text-text-light">Have questions about this lesson?</p>
                  <Link
                    href="/community"
                    className="text-sm text-accent-gold hover:text-accent-gold/80 transition-colors"
                  >
                    Discuss in the community forum →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <CourseNav
        courseSlug={course.slug}
        courseTitle={course.title}
        modules={modules}
        currentModuleSlug={module.slug}
        currentLessonSlug={lesson.slug}
        hasAccess={hasAccess}
        prevLesson={prevLesson}
        nextLesson={nextLesson}
      />
    </>
  )
}
