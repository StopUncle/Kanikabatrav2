'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Menu, X, Check, Play, Lock } from 'lucide-react'

interface Lesson {
  id: string
  title: string
  slug: string
  isCompleted?: boolean
  isFree: boolean
}

interface Module {
  id: string
  title: string
  slug: string
  lessons: Lesson[]
}

interface CourseNavProps {
  courseSlug: string
  courseTitle: string
  modules: Module[]
  currentModuleSlug: string
  currentLessonSlug: string
  hasAccess: boolean
  prevLesson?: { moduleSlug: string; lessonSlug: string; title: string } | null
  nextLesson?: { moduleSlug: string; lessonSlug: string; title: string } | null
}

export default function CourseNav({
  courseSlug,
  courseTitle,
  modules,
  currentModuleSlug,
  currentLessonSlug,
  hasAccess,
  prevLesson,
  nextLesson
}: CourseNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const currentModule = modules.find(m => m.slug === currentModuleSlug)
  const currentLessonIndex = currentModule?.lessons.findIndex(l => l.slug === currentLessonSlug) ?? 0
  const totalLessonsInModule = currentModule?.lessons.length ?? 0

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-deep-black/95 backdrop-blur-lg border-t border-accent-gold/20 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex items-center gap-2 text-text-light"
          >
            <Menu className="w-5 h-5" />
            <span className="text-sm">
              Lesson {currentLessonIndex + 1}/{totalLessonsInModule}
            </span>
          </button>

          <div className="flex items-center gap-2">
            {prevLesson && (
              <Link
                href={`/courses/${courseSlug}/${prevLesson.moduleSlug}/${prevLesson.lessonSlug}`}
                className="p-2 rounded-lg bg-accent-gold/10 text-accent-gold hover:bg-accent-gold/20 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
            )}
            {nextLesson && (
              <Link
                href={`/courses/${courseSlug}/${nextLesson.moduleSlug}/${nextLesson.lessonSlug}`}
                className="p-2 rounded-lg bg-gradient-to-r from-accent-burgundy to-accent-sapphire text-white hover:shadow-lg transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-deep-black border-l border-accent-gold/20 z-50 overflow-y-auto"
            >
              <div className="sticky top-0 bg-deep-black/95 backdrop-blur-lg border-b border-accent-gold/20 p-4 flex items-center justify-between">
                <h3 className="font-medium text-text-light truncate">
                  {courseTitle}
                </h3>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-accent-gold/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-text-muted" />
                </button>
              </div>

              <div className="p-4">
                {modules.map((module) => (
                  <div key={module.id} className="mb-6">
                    <h4 className="text-sm font-medium text-accent-gold mb-3">
                      {module.title}
                    </h4>
                    <div className="space-y-1">
                      {module.lessons.map((lesson) => {
                        const isCurrentLesson =
                          module.slug === currentModuleSlug &&
                          lesson.slug === currentLessonSlug
                        const canAccess = hasAccess || lesson.isFree

                        return canAccess ? (
                          <Link
                            key={lesson.id}
                            href={`/courses/${courseSlug}/${module.slug}/${lesson.slug}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                              isCurrentLesson
                                ? 'bg-accent-gold/20 text-accent-gold'
                                : 'hover:bg-accent-gold/5 text-text-light'
                            }`}
                          >
                            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                              {lesson.isCompleted ? (
                                <div className="w-full h-full rounded-full bg-accent-gold/20 flex items-center justify-center">
                                  <Check className="w-3 h-3 text-accent-gold" />
                                </div>
                              ) : (
                                <div className={`w-full h-full rounded-full flex items-center justify-center ${
                                  isCurrentLesson ? 'bg-accent-gold text-deep-black' : 'bg-accent-gold/10'
                                }`}>
                                  <Play className="w-3 h-3" fill={isCurrentLesson ? 'currentColor' : 'none'} />
                                </div>
                              )}
                            </div>
                            <span className="text-sm truncate">{lesson.title}</span>
                          </Link>
                        ) : (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-3 p-3 rounded-lg text-text-muted opacity-50"
                          >
                            <div className="w-6 h-6 rounded-full bg-text-muted/10 flex items-center justify-center flex-shrink-0">
                              <Lock className="w-3 h-3" />
                            </div>
                            <span className="text-sm truncate">{lesson.title}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="hidden lg:block fixed right-8 top-28 w-80 max-h-[calc(100vh-8rem)] overflow-y-auto bg-deep-black/40 backdrop-blur-sm border border-accent-gold/20 rounded-xl">
        <div className="sticky top-0 bg-deep-black/95 backdrop-blur-lg border-b border-accent-gold/10 p-4">
          <Link
            href={`/courses/${courseSlug}`}
            className="text-sm text-text-muted hover:text-accent-gold transition-colors"
          >
            ← Back to course
          </Link>
          <h3 className="font-medium text-text-light mt-2 truncate">
            {courseTitle}
          </h3>
        </div>

        <div className="p-4">
          {modules.map((module) => (
            <div key={module.id} className="mb-6 last:mb-0">
              <h4 className="text-xs font-medium text-accent-gold mb-3 uppercase tracking-wider">
                {module.title}
              </h4>
              <div className="space-y-1">
                {module.lessons.map((lesson) => {
                  const isCurrentLesson =
                    module.slug === currentModuleSlug &&
                    lesson.slug === currentLessonSlug
                  const canAccess = hasAccess || lesson.isFree

                  return canAccess ? (
                    <Link
                      key={lesson.id}
                      href={`/courses/${courseSlug}/${module.slug}/${lesson.slug}`}
                      className={`flex items-center gap-3 p-2 rounded-lg transition-colors text-sm ${
                        isCurrentLesson
                          ? 'bg-accent-gold/20 text-accent-gold'
                          : 'hover:bg-accent-gold/5 text-text-light'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                        {lesson.isCompleted ? (
                          <div className="w-full h-full rounded-full bg-accent-gold/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-accent-gold" />
                          </div>
                        ) : (
                          <div className={`w-full h-full rounded-full flex items-center justify-center ${
                            isCurrentLesson ? 'bg-accent-gold text-deep-black' : 'bg-accent-gold/10'
                          }`}>
                            <Play className="w-2.5 h-2.5" fill={isCurrentLesson ? 'currentColor' : 'none'} />
                          </div>
                        )}
                      </div>
                      <span className="truncate">{lesson.title}</span>
                    </Link>
                  ) : (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-3 p-2 rounded-lg text-text-muted opacity-50 text-sm"
                    >
                      <div className="w-5 h-5 rounded-full bg-text-muted/10 flex items-center justify-center flex-shrink-0">
                        <Lock className="w-2.5 h-2.5" />
                      </div>
                      <span className="truncate">{lesson.title}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
