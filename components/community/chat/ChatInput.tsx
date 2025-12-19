'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSend: (content: string) => void
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  async function handleSend() {
    const trimmed = message.trim()
    if (!trimmed || isSending) return

    setIsSending(true)
    try {
      await onSend(trimmed)
      setMessage('')
      inputRef.current?.focus()
    } finally {
      setIsSending(false)
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="p-4 border-t border-gray-800 bg-deep-black/30">
      <div className="flex items-end gap-2">
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          className="flex-1 bg-deep-black border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 resize-none focus:border-accent-gold focus:outline-none min-h-[40px] max-h-[120px]"
          style={{
            height: 'auto',
            overflow: message.includes('\n') ? 'auto' : 'hidden'
          }}
        />
        <button
          onClick={handleSend}
          disabled={!message.trim() || isSending}
          className="p-2.5 bg-accent-gold text-deep-black rounded-lg hover:bg-accent-gold/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
      <p className="text-xs text-gray-600 mt-2">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  )
}
