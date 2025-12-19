'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown, Play, Lock, Check, Clock, Eye } from 'lucide-react'

interface Lesson {
  id: string
  title: string
  slug: string
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

interface ModuleListProps {
  modules: Module[]
  courseSlug: string
  hasAccess: boolean
  currentLessonId?: string
}

function formatDuration(seconds: number | null): string {
  if (!seconds) return ''
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  if (mins >= 60) {
    const hrs = Math.floor(mins / 60)
    const remainingMins = mins % 60
    return `${hrs}h ${remainingMins}m`
  }
  return `${mins}m ${secs > 0 ? `${secs}s` : ''}`
}

export default function ModuleList({
  modules,
  courseSlug,
  hasAccess,
  currentLessonId
}: ModuleListProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(() => {
    if (currentLessonId) {
      const moduleWithCurrentLesson = modules.find(m =>
        m.lessons.some(l => l.id === currentLessonId)
      )
      if (moduleWithCurrentLesson) {
        return new Set([moduleWithCurrentLesson.id])
      }
    }
    return new Set([modules[0]?.id].filter(Boolean))
  })

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const next = new Set(prev)
      if (next.has(moduleId)) {
        next.delete(moduleId)
      } else {
        next.add(moduleId)
      }
      return next
    })
  }

  const getModuleProgress = (module: Module): number => {
    const completedLessons = module.lessons.filter(l => l.isCompleted).length
    return module.lessons.length > 0
      ? (completedLessons / module.lessons.length) * 100
      : 0
  }

  return (
    <div className="space-y-4">
      {modules.map((module, moduleIndex) => {
        const isExpanded = expandedModules.has(module.id)
        const progress = getModuleProgress(module)
        const completedCount = module.lessons.filter(l => l.isCompleted).length

        return (
          <div
            key={module.id}
            className="bg-deep-black/40 backdrop-blur-sm border border-accent-gold/20 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full px-4 sm:px-6 py-4 flex items-center justify-between text-left hover:bg-accent-gold/5 transition-colors"
            >
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-accent-burgundy to-accent-sapphire flex items-center justify-center flex-shrink-0">
                  <span className="text-sm sm:text-base font-medium text-white">
                    {moduleIndex + 1}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-text-light text-sm sm:text-base truncate">
                    {module.title}
                  </h3>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs text-text-muted mt-1">
                    <span>{module.lessons.length} lessons</span>
                    {hasAccess && completedCount > 0 && (
                      <span className="text-accent-gold">
                        {completedCount}/{module.lessons.length} completed
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {hasAccess && progress > 0 && (
                  <div className="hidden sm:block w-24">
                    <div className="h-1.5 bg-deep-black/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent-burgundy to-accent-sapphire"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
                <ChevronDown
                  className={`w-5 h-5 text-text-muted transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="border-t border-accent-gold/10">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const canAccess = hasAccess || lesson.isFree
                      const isCurrent = lesson.id === currentLessonId
                      const lessonHref = `/courses/${courseSlug}/${module.slug}/${lesson.slug}`
                      const lessonClassName = `flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 border-b border-accent-gold/5 last:border-b-0 ${
                        canAccess
                          ? 'hover:bg-accent-gold/5 cursor-pointer'
                          : 'opacity-60 cursor-not-allowed'
                      } ${isCurrent ? 'bg-accent-gold/10' : ''}`

                      const lessonContent = (
                        <>
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0">
                            {lesson.isCompleted ? (
                              <div className="w-full h-full rounded-full bg-accent-gold/20 flex items-center justify-center">
                                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-accent-gold" />
                              </div>
                            ) : canAccess ? (
                              <div className={`w-full h-full rounded-full flex items-center justify-center ${
                                isCurrent
                                  ? 'bg-accent-gold text-deep-black'
                                  : 'bg-accent-gold/10 text-accent-gold'
                              }`}>
                                <Play className="w-3 h-3 sm:w-4 sm:h-4" fill={isCurrent ? 'currentColor' : 'none'} />
                              </div>
                            ) : (
                              <div className="w-full h-full rounded-full bg-text-muted/10 flex items-center justify-center">
                                <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-text-muted" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm truncate ${
                                isCurrent ? 'text-accent-gold font-medium' : 'text-text-light'
                              }`}>
                                {lessonIndex + 1}. {lesson.title}
                              </span>
                              {lesson.isFree && !hasAccess && (
                                <span className="text-xs bg-accent-gold/20 text-accent-gold px-2 py-0.5 rounded-full flex-shrink-0">
                                  <Eye className="w-3 h-3 inline mr-1" />
                                  Preview
                                </span>
                              )}
                            </div>
                          </div>

                          {lesson.duration && (
                            <div className="flex items-center gap-1 text-xs text-text-muted flex-shrink-0">
                              <Clock className="w-3 h-3" />
                              <span>{formatDuration(lesson.duration)}</span>
                            </div>
                          )}
                        </>
                      )

                      return canAccess ? (
                        <Link
                          key={lesson.id}
                          href={lessonHref}
                          className={lessonClassName}
                        >
                          {lessonContent}
                        </Link>
                      ) : (
                        <div
                          key={lesson.id}
                          className={lessonClassName}
                        >
                          {lessonContent}
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
