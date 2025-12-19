'use client'

import { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'

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

interface ChatMessageListProps {
  messages: Message[]
  currentUserId: string
}

export default function ChatMessageList({ messages, currentUserId }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No messages yet. Start the conversation!</p>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => {
        const prevMessage = messages[index - 1]
        const showAvatar = !prevMessage || prevMessage.author.id !== message.author.id

        return (
          <ChatMessage
            key={message.id}
            message={message}
            isOwnMessage={message.author.id === currentUserId}
            showAvatar={showAvatar}
          />
        )
      })}
      <div ref={bottomRef} />
    </div>
  )
}
