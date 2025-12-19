import { NextRequest, NextResponse } from 'next/server'
import { pusherServer } from '@/lib/pusher/server'
import { verifyAccessToken } from '@/lib/auth/jwt'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { checkAccessTier } from '@/lib/community/access'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const payload = verifyAccessToken(accessToken)
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const socketId = formData.get('socket_id') as string
    const channelName = formData.get('channel_name') as string

    if (!socketId || !channelName) {
      return NextResponse.json(
        { error: 'Missing socket_id or channel_name' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        displayName: true,
        avatarUrl: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (channelName.startsWith('private-premium-')) {
      const roomSlug = channelName.replace('private-premium-', '')
      const room = await prisma.chatRoom.findUnique({
        where: { slug: roomSlug }
      })

      if (!room) {
        return NextResponse.json(
          { error: 'Room not found' },
          { status: 404 }
        )
      }

      const access = await checkAccessTier(payload.userId, room.accessTier)
      if (!access.hasAccess) {
        return NextResponse.json(
          { error: 'Access denied to premium room' },
          { status: 403 }
        )
      }

      const authResponse = pusherServer.authorizeChannel(socketId, channelName)
      return NextResponse.json(authResponse)
    }

    if (channelName.startsWith('presence-chat-')) {
      const roomSlug = channelName.replace('presence-chat-', '')
      const room = await prisma.chatRoom.findUnique({
        where: { slug: roomSlug }
      })

      if (!room) {
        return NextResponse.json(
          { error: 'Room not found' },
          { status: 404 }
        )
      }

      const access = await checkAccessTier(payload.userId, room.accessTier)
      if (!access.hasAccess) {
        return NextResponse.json(
          { error: 'Access denied' },
          { status: 403 }
        )
      }

      const presenceData = {
        user_id: user.id,
        user_info: {
          name: user.displayName || user.name,
          avatar: user.avatarUrl
        }
      }

      const authResponse = pusherServer.authorizeChannel(
        socketId,
        channelName,
        presenceData
      )
      return NextResponse.json(authResponse)
    }

    if (channelName.startsWith('private-user-')) {
      const targetUserId = channelName.replace('private-user-', '')

      if (targetUserId !== payload.userId) {
        return NextResponse.json(
          { error: 'Cannot subscribe to other user channels' },
          { status: 403 }
        )
      }

      const authResponse = pusherServer.authorizeChannel(socketId, channelName)
      return NextResponse.json(authResponse)
    }

    return NextResponse.json(
      { error: 'Unknown channel type' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Pusher auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
