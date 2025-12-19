'use client'

import { useState } from 'react'

interface PostEditorProps {
  onSubmit: (content: string, title?: string) => Promise<void>
  onCancel?: () => void
  placeholder?: string
  submitLabel?: string
  showTitle?: boolean
  initialTitle?: string
  initialContent?: string
}

export default function PostEditor({
  onSubmit,
  onCancel,
  placeholder = 'Write your content...',
  submitLabel = 'Submit',
  showTitle = false,
  initialTitle = '',
  initialContent = ''
}: PostEditorProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!content.trim()) return
    if (showTitle && !title.trim()) return

    setIsSubmitting(true)
    try {
      await onSubmit(content.trim(), showTitle ? title.trim() : undefined)
      setTitle('')
      setContent('')
    } catch (error) {
      console.error('Submit error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {showTitle && (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="w-full bg-deep-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-accent-gold focus:outline-none"
          minLength={3}
          maxLength={200}
          required
        />
      )}

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        rows={showTitle ? 8 : 4}
        className="w-full bg-deep-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-accent-gold focus:outline-none resize-none"
        minLength={showTitle ? 10 : 1}
        required
      />

      <div className="flex items-center justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-400 hover:text-white"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting || !content.trim() || (showTitle && !title.trim())}
          className="px-6 py-2 bg-accent-gold text-deep-black rounded-lg font-medium hover:bg-accent-gold/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : submitLabel}
        </button>
      </div>
    </form>
  )
}
