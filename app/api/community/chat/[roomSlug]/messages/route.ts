import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAccessTier } from '@/lib/community/access'
import { requireAuth } from '@/lib/auth/middleware'
import { verifyAccessToken } from '@/lib/auth/jwt'
import { cookies } from 'next/headers'
import { pusherServer } from '@/lib/pusher/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ roomSlug: string }> }
) {
  try {
    const { roomSlug } = await params
    const { searchParams } = new URL(request.url)
    const cursor = searchParams.get('cursor')
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)

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
      where: { slug: roomSlug }
    })

    if (!room || !room.isActive) {
      return NextResponse.json(
        { error: 'Chat room not found' },
        { status: 404 }
      )
    }

    const access = await checkAccessTier(userId, room.accessTier)
    if (!access.hasAccess) {
      return NextResponse.json(
        { error: access.reason },
        { status: 403 }
      )
    }

    const messages = await prisma.chatMessage.findMany({
      where: { roomId: room.id },
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            displayName: true,
            avatarUrl: true
          }
        }
      }
    })

    const hasMore = messages.length > limit
    const results = hasMore ? messages.slice(0, -1) : messages
    const nextCursor = hasMore ? results[results.length - 1].id : null

    return NextResponse.json({
      success: true,
      messages: results.reverse().map(msg => ({
        id: msg.id,
        content: msg.content,
        type: msg.type,
        createdAt: msg.createdAt,
        author: {
          id: msg.author.id,
          name: msg.author.displayName || msg.author.name,
          avatar: msg.author.avatarUrl
        }
      })),
      nextCursor,
      hasMore
    })
  } catch (error) {
    console.error('Messages fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
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
      const body = await request.json()
      const { content, type = 'TEXT' } = body

      if (!content || content.trim().length === 0) {
        return NextResponse.json(
          { error: 'Message content is required' },
          { status: 400 }
        )
      }

      if (content.length > 2000) {
        return NextResponse.json(
          { error: 'Message too long (max 2000 characters)' },
          { status: 400 }
        )
      }

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

      const membership = await prisma.chatMember.findUnique({
        where: {
          roomId_userId: { roomId: room.id, userId: user.id }
        }
      })

      if (!membership) {
        await prisma.chatMember.create({
          data: {
            roomId: room.id,
            userId: user.id,
            role: 'MEMBER'
          }
        })
      }

      const userData = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          name: true,
          displayName: true,
          avatarUrl: true
        }
      })

      const message = await prisma.chatMessage.create({
        data: {
          roomId: room.id,
          authorId: user.id,
          content: content.trim(),
          type: type as 'TEXT' | 'IMAGE' | 'SYSTEM'
        }
      })

      const channelName = room.accessTier === 'PREMIUM' || room.accessTier === 'COACHING_CLIENT'
        ? `private-premium-${roomSlug}`
        : `presence-chat-${roomSlug}`

      try {
        await pusherServer.trigger(channelName, 'message', {
          id: message.id,
          content: message.content,
          type: message.type,
          createdAt: message.createdAt.toISOString(),
          authorId: user.id,
          authorName: userData?.displayName || userData?.name || 'Anonymous',
          authorAvatar: userData?.avatarUrl
        })
      } catch (pusherError) {
        console.warn('Pusher broadcast failed:', pusherError)
      }

      return NextResponse.json({
        success: true,
        message: {
          id: message.id,
          content: message.content,
          type: message.type,
          createdAt: message.createdAt,
          author: {
            id: user.id,
            name: userData?.displayName || userData?.name,
            avatar: userData?.avatarUrl
          }
        }
      }, { status: 201 })
    } catch (error) {
      console.error('Send message error:', error)
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      )
    }
  })
}
