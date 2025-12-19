'use client'

import { motion } from 'framer-motion'
import BackgroundEffects from '@/components/BackgroundEffects'
import Header from '@/components/Header'
import CourseCard from '@/components/course/CourseCard'
import { BookOpen, Crown, Shield, Zap } from 'lucide-react'

interface Course {
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

interface Enrollment {
  courseId: string
  progress: number
}

interface CoursesPageClientProps {
  courses: Course[]
  enrollments: Enrollment[]
  isLoggedIn: boolean
}

export default function CoursesPageClient({
  courses,
  enrollments,
  isLoggedIn: _isLoggedIn
}: CoursesPageClientProps) {
  const getEnrollment = (courseId: string) =>
    enrollments.find(e => e.courseId === courseId)

  const standardCourses = courses.filter(c => c.tier === 'standard')
  const goldCourses = courses.filter(c => c.tier === 'gold')

  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen pt-20 sm:pt-24 lg:pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6">
              <span className="gradient-text">Dark Psychology Courses</span>
            </h1>
            <p className="text-text-gray text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Master the art of psychological manipulation, power dynamics, and mental warfare
              through exclusive video courses taught by a diagnosed sociopath.
            </p>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm">
              <div className="flex items-center gap-2 text-accent-gold">
                <BookOpen className="w-4 h-4" />
                <span>Video Lessons</span>
              </div>
              <div className="flex items-center gap-2 text-accent-gold">
                <Shield className="w-4 h-4" />
                <span>Exclusive Content</span>
              </div>
              <div className="flex items-center gap-2 text-accent-gold">
                <Zap className="w-4 h-4" />
                <span>Community Access</span>
              </div>
            </div>
          </motion.div>

          {courses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center py-16"
            >
              <div className="bg-deep-black/40 backdrop-blur-sm border border-accent-gold/20 rounded-2xl p-8 sm:p-12 max-w-2xl mx-auto">
                <BookOpen className="w-16 h-16 text-accent-gold/30 mx-auto mb-6" />
                <h2 className="text-2xl sm:text-3xl font-light gradient-text mb-4">
                  Courses Coming Soon
                </h2>
                <p className="text-text-gray mb-6">
                  Our exclusive dark psychology courses are currently being prepared.
                  Subscribe to be notified when they launch.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-burgundy to-accent-sapphire text-white px-8 py-3 rounded-full hover:shadow-lg transition-all font-medium"
                >
                  Get Notified
                </a>
              </div>
            </motion.div>
          ) : (
            <>
              {standardCourses.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-16"
                >
                  <h2 className="text-2xl sm:text-3xl font-light mb-8 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-accent-gold" />
                    <span className="gradient-text">Standard Courses</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {standardCourses.map((course) => {
                      const enrollment = getEnrollment(course.id)
                      return (
                        <CourseCard
                          key={course.id}
                          course={course}
                          isSubscribed={!!enrollment}
                          progress={enrollment?.progress}
                        />
                      )
                    })}
                  </div>
                </motion.section>
              )}

              {goldCourses.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/5 via-accent-gold/10 to-accent-gold/5 rounded-3xl -z-10" />
                    <div className="p-6 sm:p-8">
                      <h2 className="text-2xl sm:text-3xl font-light mb-2 flex items-center gap-3">
                        <Crown className="w-6 h-6 text-accent-gold" />
                        <span className="gradient-text-gold">Gold Tier Courses</span>
                      </h2>
                      <p className="text-text-muted mb-8">
                        Advanced content covering the most powerful and controversial psychological tactics.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {goldCourses.map((course) => {
                          const enrollment = getEnrollment(course.id)
                          return (
                            <CourseCard
                              key={course.id}
                              course={course}
                              isSubscribed={!!enrollment}
                              progress={enrollment?.progress}
                            />
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}
            </>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center bg-gradient-to-r from-accent-burgundy/10 to-accent-sapphire/10 rounded-2xl p-8 border border-accent-gold/20"
          >
            <h2 className="text-2xl sm:text-3xl font-light mb-4">
              <span className="gradient-text">What You Get With Each Course</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {[
                { icon: BookOpen, title: 'Video Lessons', desc: 'HD video content with text notes' },
                { icon: Zap, title: 'Community Forum', desc: 'Discuss with other subscribers' },
                { icon: Shield, title: 'Monthly Access', desc: 'Cancel anytime, no commitment' },
                { icon: Crown, title: 'New Content', desc: 'Regular updates and additions' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent-gold/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-accent-gold" />
                  </div>
                  <h3 className="font-medium text-text-light mb-1">{item.title}</h3>
                  <p className="text-sm text-text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
