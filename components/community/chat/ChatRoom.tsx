'use client'

import { useState, useEffect, useRef } from 'react'
import { Users } from 'lucide-react'
import ChatMessageList from './ChatMessageList'
import ChatInput from './ChatInput'
import OnlineUsers from './OnlineUsers'
import { subscribeToChatRoom, ChatMessageEvent } from '@/lib/pusher/client'

interface Message {
  id: string
  content: string
  type: 'TEXT' | 'IMAGE' | 'SYSTEM'
  createdAt: string
  author: {
    id: string
    name: string
    avatar?: string
  }
}

interface Member {
  id: string
  name: string
  avatar?: string
  role: string
}

interface ChatRoomProps {
  room: {
    id: string
    name: string
    slug: string
    description: string | null
    accessTier: string
    memberCount: number
    members: Member[]
    isMember: boolean
  }
  currentUserId: string | null
}

export default function ChatRoom({ room, currentUserId }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [onlineUsers, setOnlineUsers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [showOnlineUsers, setShowOnlineUsers] = useState(false)
  const subscriptionRef = useRef<ReturnType<typeof subscribeToChatRoom> | null>(null)

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch(`/api/community/chat/${room.slug}/messages`)
        if (res.ok) {
          const data = await res.json()
          setMessages(data.messages || [])
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [room.slug])

  useEffect(() => {
    if (!currentUserId) return

    const isPremium = room.accessTier === 'PREMIUM' || room.accessTier === 'COACHING_CLIENT'

    subscriptionRef.current = subscribeToChatRoom(room.slug, isPremium, {
      onMessage: (data: ChatMessageEvent) => {
        setMessages(prev => [...prev, {
          id: data.id,
          content: data.content,
          type: data.type,
          createdAt: data.createdAt,
          author: {
            id: data.authorId,
            name: data.authorName,
            avatar: data.authorAvatar
          }
        }])
      },
      onUserJoin: (data) => {
        setOnlineUsers(prev => {
          if (prev.find(u => u.id === data.id)) return prev
          return [...prev, {
            id: data.id,
            name: data.info.name,
            avatar: data.info.avatar,
            role: 'MEMBER'
          }]
        })
      },
      onUserLeave: (data) => {
        setOnlineUsers(prev => prev.filter(u => u.id !== data.id))
      }
    })

    return () => {
      subscriptionRef.current?.unsubscribe()
    }
  }, [room.slug, room.accessTier, currentUserId])

  async function handleSendMessage(content: string) {
    if (!currentUserId) return

    try {
      const res = await fetch(`/api/community/chat/${room.slug}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      })

      if (!res.ok) {
        console.error('Failed to send message')
      }
    } catch (error) {
      console.error('Send message error:', error)
    }
  }

  async function handleJoinRoom() {
    try {
      const res = await fetch(`/api/community/chat/${room.slug}`, {
        method: 'POST'
      })
      if (res.ok) {
        window.location.reload()
      }
    } catch (error) {
      console.error('Failed to join room:', error)
    }
  }

  if (!currentUserId) {
    return (
      <div className="flex items-center justify-center h-96 bg-deep-navy/50 border border-gray-800 rounded-xl">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Please log in to participate in chat</p>
          <a
            href="/login"
            className="px-6 py-2 bg-accent-gold text-deep-black rounded-lg font-medium hover:bg-accent-gold/90"
          >
            Login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-12rem)] bg-deep-navy/50 border border-gray-800 rounded-xl overflow-hidden">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div>
            <h2 className="font-semibold text-white">{room.name}</h2>
            {room.description && (
              <p className="text-sm text-gray-500">{room.description}</p>
            )}
          </div>
          <button
            onClick={() => setShowOnlineUsers(!showOnlineUsers)}
            className="lg:hidden p-2 text-gray-400 hover:text-white"
          >
            <Users className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Loading messages...</p>
            </div>
          ) : (
            <ChatMessageList
              messages={messages}
              currentUserId={currentUserId}
            />
          )}
        </div>

        {room.isMember ? (
          <ChatInput onSend={handleSendMessage} />
        ) : (
          <div className="p-4 border-t border-gray-800 text-center">
            <button
              onClick={handleJoinRoom}
              className="px-6 py-2 bg-accent-gold text-deep-black rounded-lg font-medium hover:bg-accent-gold/90"
            >
              Join Room to Chat
            </button>
          </div>
        )}
      </div>

      <div className={`
        w-64 border-l border-gray-800 bg-deep-black/50
        ${showOnlineUsers ? 'block' : 'hidden lg:block'}
      `}>
        <OnlineUsers
          members={room.members}
          onlineUsers={onlineUsers}
          memberCount={room.memberCount}
        />
      </div>
    </div>
  )
}
