import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAccessTier } from '@/lib/community/access'
import { requireAuth } from '@/lib/auth/middleware'
import { verifyAccessToken } from '@/lib/auth/jwt'
import { cookies } from 'next/headers'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ roomSlug: string }> }
) {
  try {
    const { roomSlug } = await params

    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value
    let userId: string | null = null

    if (accessToken) {
      const payload = verifyAccessToken(accessToken)
      if (payload) {
        userId = payload.userId
      }
    }

    const room = await prisma.chatRoom.findUnique({
      where: { slug: roomSlug },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                displayName: true,
                avatarUrl: true
              }
            }
          },
          orderBy: { joinedAt: 'desc' },
          take: 50
        },
        _count: {
          select: { members: true }
        }
      }
    })

    if (!room) {
      return NextResponse.json(
        { error: 'Chat room not found' },
        { status: 404 }
      )
    }

    if (!room.isActive) {
      return NextResponse.json(
        { error: 'This chat room is currently inactive' },
        { status: 403 }
      )
    }

    const access = await checkAccessTier(userId, room.accessTier)
    if (!access.hasAccess) {
      return NextResponse.json(
        {
          error: access.reason,
          requiredTier: room.accessTier,
          upgradeUrl: access.upgradeUrl
        },
        { status: 403 }
      )
    }

    let isMember = false
    let memberRole = null
    if (userId) {
      const membership = room.members.find(m => m.user.id === userId)
      if (membership) {
        isMember = true
        memberRole = membership.role
      }
    }

    return NextResponse.json({
      success: true,
      room: {
        id: room.id,
        name: room.name,
        slug: room.slug,
        description: room.description,
        accessTier: room.accessTier,
        category: room.category,
        memberCount: room._count.members,
        members: room.members.map(m => ({
          id: m.user.id,
          name: m.user.displayName || m.user.name,
          avatar: m.user.avatarUrl,
          role: m.role,
          joinedAt: m.joinedAt
        })),
        isMember,
        memberRole
      }
    })
  } catch (error) {
    console.error('Chat room fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch chat room' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ roomSlug: string }> }
) {
  return requireAuth(request, async (_req, user) => {
    try {
      const { roomSlug } = await params

      const room = await prisma.chatRoom.findUnique({
        where: { slug: roomSlug }
      })

      if (!room || !room.isActive) {
        return NextResponse.json(
          { error: 'Chat room not found or inactive' },
          { status: 404 }
        )
      }

      const access = await checkAccessTier(user.id, room.accessTier)
      if (!access.hasAccess) {
        return NextResponse.json(
          { error: access.reason },
          { status: 403 }
        )
      }

      const existingMember = await prisma.chatMember.findUnique({
        where: {
          roomId_userId: { roomId: room.id, userId: user.id }
        }
      })

      if (existingMember) {
        return NextResponse.json({
          success: true,
          message: 'Already a member',
          alreadyMember: true
        })
      }

      await prisma.chatMember.create({
        data: {
          roomId: room.id,
          userId: user.id,
          role: 'MEMBER'
        }
      })

      return NextResponse.json({
        success: true,
        message: 'Joined room successfully'
      }, { status: 201 })
    } catch (error) {
      console.error('Join room error:', error)
      return NextResponse.json(
        { error: 'Failed to join room' },
        { status: 500 }
      )
    }
  })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ roomSlug: string }> }
) {
  return requireAuth(request, async (_req, user) => {
    try {
      const { roomSlug } = await params

      const room = await prisma.chatRoom.findUnique({
        where: { slug: roomSlug }
      })

      if (!room) {
        return NextResponse.json(
          { error: 'Chat room not found' },
          { status: 404 }
        )
      }

      const membership = await prisma.chatMember.findUnique({
        where: {
          roomId_userId: { roomId: room.id, userId: user.id }
        }
      })

      if (!membership) {
        return NextResponse.json(
          { error: 'Not a member of this room' },
          { status: 400 }
        )
      }

      await prisma.chatMember.delete({
        where: { id: membership.id }
      })

      return NextResponse.json({
        success: true,
        message: 'Left room successfully'
      })
    } catch (error) {
      console.error('Leave room error:', error)
      return NextResponse.json(
        { error: 'Failed to leave room' },
        { status: 500 }
      )
    }
  })
}
