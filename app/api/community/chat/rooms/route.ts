import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAccessTier } from '@/lib/community/access'
import { verifyAccessToken } from '@/lib/auth/jwt'
import { cookies } from 'next/headers'

export async function GET(_request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value
    let userId: string | null = null

    if (accessToken) {
      const payload = verifyAccessToken(accessToken)
      if (payload) {
        userId = payload.userId
      }
    }

    const rooms = await prisma.chatRoom.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        _count: {
          select: { members: true, messages: true }
        }
      }
    })

    const accessibleRooms = await Promise.all(
      rooms.map(async (room) => {
        const access = await checkAccessTier(userId, room.accessTier)
        return {
          id: room.id,
          name: room.name,
          slug: room.slug,
          description: room.description,
          accessTier: room.accessTier,
          category: room.category,
          memberCount: room._count.members,
          messageCount: room._count.messages,
          hasAccess: access.hasAccess,
          accessReason: access.reason,
          upgradeUrl: access.upgradeUrl
        }
      })
    )

    return NextResponse.json({
      success: true,
      rooms: accessibleRooms
    })
  } catch (error) {
    console.error('Chat rooms fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch chat rooms' },
      { status: 500 }
    )
  }
}
