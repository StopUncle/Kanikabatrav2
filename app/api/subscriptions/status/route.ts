import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/middleware'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    try {
      const subscriptions = await prisma.subscription.findMany({
        where: {
          userId: user.id
        },
        include: {
          course: {
            select: {
              id: true,
              title: true,
              slug: true,
              tier: true,
              price: true
            }
          },
          enrollment: {
            include: {
              progress: {
                select: {
                  isCompleted: true
                }
              },
              course: {
                include: {
                  modules: {
                    include: {
                      lessons: {
                        select: { id: true }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      const formattedSubscriptions = subscriptions.map(sub => {
        const totalLessons = sub.enrollment?.course.modules.reduce(
          (acc, m) => acc + m.lessons.length,
          0
        ) || 0
        const completedLessons = sub.enrollment?.progress.filter(p => p.isCompleted).length || 0
        const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

        return {
          id: sub.id,
          status: sub.status,
          course: sub.course,
          currentPeriodStart: sub.currentPeriodStart,
          currentPeriodEnd: sub.currentPeriodEnd,
          cancelledAt: sub.cancelledAt,
          createdAt: sub.createdAt,
          progress: {
            completed: completedLessons,
            total: totalLessons,
            percentage: progress
          }
        }
      })

      return NextResponse.json({
        success: true,
        subscriptions: formattedSubscriptions,
        hasActiveSubscription: subscriptions.some(s => s.status === 'ACTIVE')
      })
    } catch (error) {
      console.error('Subscription status error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to get subscription status' },
        { status: 500 }
      )
    }
  })
}
