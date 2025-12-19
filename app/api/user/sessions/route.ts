import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'
import { SessionStatus, Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    try {
      const { searchParams } = new URL(req.url)
      const status = searchParams.get('status')
      const page = parseInt(searchParams.get('page') || '1')
      const limit = parseInt(searchParams.get('limit') || '20')
      const skip = (page - 1) * limit

      const where: Prisma.CoachingSessionWhereInput = {
        userId: user.id
      }

      if (status) {
        const statusUpper = status.toUpperCase() as SessionStatus
        if (Object.values(SessionStatus).includes(statusUpper)) {
          where.status = statusUpper
        }
      }

      const [sessions, total] = await Promise.all([
        prisma.coachingSession.findMany({
          where,
          include: {
            feedback: {
              select: {
                id: true,
                rating: true,
                feedback: true,
                goals: true,
                outcomes: true,
                createdAt: true
              }
            }
          },
          orderBy: {
            scheduledAt: 'desc'
          },
          skip,
          take: limit
        }),
        prisma.coachingSession.count({ where })
      ])

      return NextResponse.json({
        sessions,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      })
    } catch (error) {
      console.error('Error fetching sessions:', error)
      return NextResponse.json(
        { error: 'Failed to fetch sessions' },
        { status: 500 }
      )
    }
  })
}
