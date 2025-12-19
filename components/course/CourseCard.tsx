'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Lock, Crown, BookOpen } from 'lucide-react'

interface CourseCardProps {
  course: {
    id: string
    title: string
    slug: string
    description: string | null
    thumbnailUrl: string | null
    price: number
    tier: string
    moduleCount?: number
    lessonCount?: number
  }
  isSubscribed?: boolean
  progress?: number
}

export default function CourseCard({ course, isSubscribed, progress }: CourseCardProps) {
  const isGold = course.tier === 'gold'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <div className={`bg-deep-black/40 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300 ${
        isGold
          ? 'border-accent-gold shadow-lg shadow-accent-gold/10 hover:shadow-xl hover:shadow-accent-gold/20'
          : 'border-accent-gold/20 hover:border-accent-gold/40'
      }`}>
        {isGold && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-gradient-to-r from-accent-gold to-yellow-500 text-deep-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Crown className="w-3 h-3" />
              GOLD
            </span>
          </div>
        )}

        <div className="relative aspect-video bg-gradient-to-br from-accent-burgundy/30 to-accent-sapphire/30 overflow-hidden">
          {course.thumbnailUrl ? (
            <Image
              src={course.thumbnailUrl}
              alt={course.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-accent-gold/30" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-transparent to-transparent" />

          {isSubscribed && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-accent-gold rounded-full p-4">
                <Play className="w-8 h-8 text-deep-black" fill="currentColor" />
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className={`text-xl sm:text-2xl font-light mb-2 ${isGold ? 'gradient-text-gold' : 'gradient-text'}`}>
            {course.title}
          </h3>

          {course.description && (
            <p className="text-text-gray text-sm mb-4 line-clamp-2">
              {course.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-text-muted mb-4">
            {course.moduleCount !== undefined && (
              <span className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                {course.moduleCount} modules
              </span>
            )}
            {course.lessonCount !== undefined && (
              <span className="flex items-center gap-1">
                <Play className="w-3 h-3" />
                {course.lessonCount} lessons
              </span>
            )}
          </div>

          {progress !== undefined && progress > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-text-muted mb-1">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-deep-black/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-burgundy to-accent-sapphire transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            {isSubscribed ? (
              <Link
                href={`/courses/${course.slug}`}
                className="flex-1 bg-gradient-to-r from-accent-burgundy to-accent-sapphire text-white text-center py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Continue Learning
              </Link>
            ) : (
              <>
                <div>
                  <div className="text-2xl font-light gradient-text">
                    ${course.price}
                  </div>
                  <div className="text-xs text-text-muted">/month</div>
                </div>
                <Link
                  href={`/courses/${course.slug}`}
                  className="bg-gradient-to-r from-accent-burgundy to-accent-sapphire text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
                >
                  {isGold ? <Crown className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  View Course
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
