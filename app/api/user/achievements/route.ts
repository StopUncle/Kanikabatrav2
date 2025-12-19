import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'

interface AchievementCriteria {
  type: string
  count: number
}

export async function GET(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    try {
      // Get all achievements and user's earned achievements
      const [allAchievements, userAchievements, userData] = await Promise.all([
        prisma.achievement.findMany({
          orderBy: { sortOrder: 'asc' }
        }),
        prisma.userAchievement.findMany({
          where: { userId: user.id },
          include: { achievement: true }
        }),
        prisma.user.findUnique({
          where: { id: user.id },
          include: {
            _count: {
              select: {
                purchases: true
              }
            },
            sessions: {
              where: { status: 'COMPLETED' }
            },
            purchases: {
              where: { status: 'COMPLETED' }
            },
            enrollments: {
              include: {
                progress: {
                  where: { isCompleted: true }
                }
              }
            }
          }
        })
      ])

      if (!userData) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      // Calculate progress for each achievement type
      const completedSessions = userData.sessions.length
      const completedLessons = userData.enrollments.reduce(
        (total, enrollment) => total + enrollment.progress.length,
        0
      )
      const completedCourses = userData.enrollments.filter(
        e => e.status === 'COMPLETED'
      ).length
      const daysActive = Math.floor(
        (Date.now() - new Date(userData.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      )
      const purchasesMade = userData.purchases.length
      const bookPurchased = userData.purchases.some(p => p.type === 'BOOK') ? 1 : 0

      // Check for feedback given
      const feedbackCount = await prisma.sessionFeedback.count({
        where: {
          session: {
            userId: user.id
          }
        }
      })

      const progressMap: Record<string, number> = {
        sessions_completed: completedSessions,
        lessons_completed: completedLessons,
        course_completed: completedCourses,
        days_active: daysActive,
        feedback_given: feedbackCount,
        purchases_made: purchasesMade,
        book_purchased: bookPurchased
      }

      const earnedSlugs = new Set(userAchievements.map(ua => ua.achievement.slug))

      // Map achievements with earned status and progress
      const achievements = allAchievements.map(achievement => {
        const isEarned = earnedSlugs.has(achievement.slug)
        const userAchievement = userAchievements.find(
          ua => ua.achievementId === achievement.id
        )
        const criteria = achievement.criteria as unknown as AchievementCriteria
        const currentProgress = progressMap[criteria.type] || 0
        const progress = Math.min(100, Math.round((currentProgress / criteria.count) * 100))

        return {
          id: achievement.id,
          slug: achievement.slug,
          name: achievement.name,
          description: achievement.description,
          icon: achievement.icon,
          tier: achievement.tier,
          isEarned,
          earnedAt: userAchievement?.earnedAt || null,
          progress,
          currentValue: currentProgress,
          targetValue: criteria.count
        }
      })

      // Separate earned and available
      const earned = achievements.filter(a => a.isEarned)
      const available = achievements.filter(a => !a.isEarned)

      // Find recently earned (last 7 days)
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      const recentlyEarned = earned.filter(
        a => a.earnedAt && new Date(a.earnedAt) > sevenDaysAgo
      )

      return NextResponse.json({
        earned,
        available,
        recentlyEarned,
        stats: {
          total: allAchievements.length,
          earned: earned.length,
          progress: Math.round((earned.length / allAchievements.length) * 100)
        }
      })
    } catch (error) {
      console.error('Error fetching achievements:', error)
      return NextResponse.json(
        { error: 'Failed to fetch achievements' },
        { status: 500 }
      )
    }
  })
}
