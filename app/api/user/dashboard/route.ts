import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth/middleware'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        purchases: {
          where: { status: 'COMPLETED' },
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            type: true,
            productVariant: true,
            amount: true,
            downloadToken: true,
            downloadCount: true,
            maxDownloads: true,
            createdAt: true,
          },
        },
        sessions: {
          orderBy: { scheduledAt: 'desc' },
          select: {
            id: true,
            packageName: true,
            sessionCount: true,
            scheduledAt: true,
            duration: true,
            status: true,
            meetingUrl: true,
            notes: true,
          },
        },
      },
    })

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      user: userData,
    })
  })
}
