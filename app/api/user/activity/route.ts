import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    try {
      const { searchParams } = new URL(req.url)
      const type = searchParams.get('type')
      const page = parseInt(searchParams.get('page') || '1')
      const limit = parseInt(searchParams.get('limit') || '20')
      const skip = (page - 1) * limit

      const where: { userId: string; type?: string } = {
        userId: user.id
      }

      if (type) {
        where.type = type
      }

      const [activities, total] = await Promise.all([
        prisma.activityLog.findMany({
          where,
          orderBy: {
            createdAt: 'desc'
          },
          skip,
          take: limit
        }),
        prisma.activityLog.count({ where })
      ])

      return NextResponse.json({
        activities,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      })
    } catch (error) {
      console.error('Error fetching activity:', error)
      return NextResponse.json(
        { error: 'Failed to fetch activity' },
        { status: 500 }
      )
    }
  })
}
