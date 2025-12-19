'use client'

import Image from 'next/image'
import { format } from 'date-fns'

interface ChatMessageProps {
  message: {
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
  isOwnMessage: boolean
  showAvatar: boolean
}

export default function ChatMessage({ message, isOwnMessage, showAvatar }: ChatMessageProps) {
  const time = format(new Date(message.createdAt), 'HH:mm')

  if (message.type === 'SYSTEM') {
    return (
      <div className="text-center py-2">
        <span className="text-xs text-gray-500 bg-deep-black/50 px-3 py-1 rounded-full">
          {message.content}
        </span>
      </div>
    )
  }

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-end gap-2 max-w-[70%] ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
        {showAvatar ? (
          message.author.avatar ? (
            <Image
              src={message.author.avatar}
              alt={message.author.name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              unoptimized
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-accent-burgundy/30 flex items-center justify-center flex-shrink-0">
              <span className="text-accent-gold text-sm font-medium">
                {message.author.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )
        ) : (
          <div className="w-8 flex-shrink-0" />
        )}

        <div>
          {showAvatar && !isOwnMessage && (
            <span className="text-xs text-gray-500 ml-1 mb-1 block">
              {message.author.name}
            </span>
          )}
          <div
            className={`
              px-4 py-2 rounded-2xl
              ${isOwnMessage
                ? 'bg-accent-burgundy text-white rounded-br-md'
                : 'bg-gray-800 text-white rounded-bl-md'
              }
            `}
          >
            {message.type === 'IMAGE' ? (
              <Image
                src={message.content}
                alt="Shared image"
                width={400}
                height={300}
                className="max-w-full rounded-lg"
                unoptimized
              />
            ) : (
              <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
            )}
          </div>
          <span className={`text-[10px] text-gray-600 mt-1 block ${isOwnMessage ? 'text-right mr-1' : 'ml-1'}`}>
            {time}
          </span>
        </div>
      </div>
    </div>
  )
}
