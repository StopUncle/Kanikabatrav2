'use client'

import Pusher from 'pusher-js'

let pusherClient: Pusher | null = null

export function getPusherClient(): Pusher | null {
  if (typeof window === 'undefined') return null

  const key = process.env.NEXT_PUBLIC_PUSHER_KEY
  const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER

  if (!key || !cluster) {
    console.warn('Pusher client keys not configured')
    return null
  }

  if (!pusherClient) {
    pusherClient = new Pusher(key, {
      cluster,
      authEndpoint: '/api/community/pusher/auth'
    })
  }

  return pusherClient
}

export function subscribeToChatRoom(
  roomSlug: string,
  isPremium: boolean,
  callbacks: {
    onMessage?: (data: ChatMessageEvent) => void
    onUserJoin?: (data: UserPresenceEvent) => void
    onUserLeave?: (data: UserPresenceEvent) => void
    onTyping?: (data: TypingEvent) => void
  }
) {
  const client = getPusherClient()
  if (!client) return null

  const channelName = isPremium
    ? `private-premium-${roomSlug}`
    : `presence-chat-${roomSlug}`

  const channel = client.subscribe(channelName)

  if (callbacks.onMessage) {
    channel.bind('message', callbacks.onMessage)
  }

  if (callbacks.onUserJoin) {
    channel.bind('pusher:member_added', callbacks.onUserJoin)
  }

  if (callbacks.onUserLeave) {
    channel.bind('pusher:member_removed', callbacks.onUserLeave)
  }

  if (callbacks.onTyping) {
    channel.bind('typing', callbacks.onTyping)
  }

  return {
    channel,
    unsubscribe: () => {
      client.unsubscribe(channelName)
    }
  }
}

export function subscribeToUserNotifications(
  userId: string,
  onNotification: (data: NotificationEvent) => void
) {
  const client = getPusherClient()
  if (!client) return null

  const channel = client.subscribe(`private-user-${userId}`)
  channel.bind('notification', onNotification)

  return {
    channel,
    unsubscribe: () => {
      client.unsubscribe(`private-user-${userId}`)
    }
  }
}

export interface ChatMessageEvent {
  id: string
  content: string
  authorId: string
  authorName: string
  authorAvatar?: string
  createdAt: string
  type: 'TEXT' | 'IMAGE' | 'SYSTEM'
}

export interface UserPresenceEvent {
  id: string
  info: {
    name: string
    avatar?: string
  }
}

export interface TypingEvent {
  userId: string
  userName: string
  isTyping: boolean
}

export interface NotificationEvent {
  id: string
  type: string
  title: string
  message: string
  link?: string
  createdAt: string
}
