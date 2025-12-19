import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    try {
      const userData = await prisma.user.findUnique({
        where: { id: user.id },
        include: {
          purchases: {
            where: { status: 'COMPLETED' }
          },
          sessions: true,
          enrollments: {
            include: {
              course: true,
              progress: {
                include: {
                  lesson: {
                    include: {
                      module: {
                        include: {
                          _count: {
                            select: { lessons: true }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          achievements: {
            include: {
              achievement: true
            }
          }
        }
      })

      if (!userData) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      // Calculate days active
      const memberSince = new Date(userData.createdAt)
      const daysActive = Math.floor(
        (Date.now() - memberSince.getTime()) / (1000 * 60 * 60 * 24)
      )

      // Session stats
      const totalSessions = userData.sessions.length
      const completedSessions = userData.sessions.filter(s => s.status === 'COMPLETED').length
      const upcomingSessions = userData.sessions.filter(s => {
        const scheduledAt = s.scheduledAt ? new Date(s.scheduledAt) : null
        return s.status === 'SCHEDULED' && scheduledAt && scheduledAt > new Date()
      }).length

      // Course progress
      const courseProgress = userData.enrollments.map(enrollment => {
        const completedLessons = enrollment.progress.filter(p => p.isCompleted).length

        return {
          courseId: enrollment.course.id,
          courseTitle: enrollment.course.title,
          courseSlug: enrollment.course.slug,
          completedLessons,
          status: enrollment.status
        }
      })

      // Get total lessons for each course
      const coursesWithLessons = await Promise.all(
        courseProgress.map(async (cp) => {
          const lessonCount = await prisma.courseLesson.count({
            where: {
              module: {
                courseId: cp.courseId
              }
            }
          })
          return {
            ...cp,
            totalLessons: lessonCount,
            percentage: lessonCount > 0
              ? Math.round((cp.completedLessons / lessonCount) * 100)
              : 0
          }
        })
      )

      // Overall course completion
      const totalLessonsCompleted = userData.enrollments.reduce(
        (total, e) => total + e.progress.filter(p => p.isCompleted).length,
        0
      )

      // Purchases
      const purchases = userData.purchases.length
      const hasBook = userData.purchases.some(p => p.type === 'BOOK')

      // Achievements
      const achievementsEarned = userData.achievements.length
      const totalAchievements = await prisma.achievement.count()

      // Calculate streak (simplified - days since first activity or sign up)
      // In a real app, you'd track daily logins
      const streak = Math.min(daysActive, 7) // Cap at 7 for now

      return NextResponse.json({
        memberSince: memberSince.toISOString(),
        daysActive,
        streak,
        sessions: {
          total: totalSessions,
          completed: completedSessions,
          upcoming: upcomingSessions,
          completionRate: totalSessions > 0
            ? Math.round((completedSessions / totalSessions) * 100)
            : 0
        },
        courses: {
          enrolled: userData.enrollments.length,
          completed: userData.enrollments.filter(e => e.status === 'COMPLETED').length,
          lessonsCompleted: totalLessonsCompleted,
          progress: coursesWithLessons
        },
        purchases: {
          total: purchases,
          hasBook
        },
        achievements: {
          earned: achievementsEarned,
          total: totalAchievements,
          percentage: totalAchievements > 0
            ? Math.round((achievementsEarned / totalAchievements) * 100)
            : 0
        }
      })
    } catch (error) {
      console.error('Error fetching progress:', error)
      return NextResponse.json(
        { error: 'Failed to fetch progress' },
        { status: 500 }
      )
    }
  })
}
