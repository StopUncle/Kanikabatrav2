'use client'

import { useState } from 'react'
import { Send, X, Loader2 } from 'lucide-react'

interface PostEditorProps {
  categoryId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export default function PostEditor({ categoryId, onSuccess, onCancel }: PostEditorProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId,
          title: title.trim(),
          content: content.trim()
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create post')
      }

      setTitle('')
      setContent('')
      if (onSuccess) onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-deep-black/40 backdrop-blur-sm border border-accent-gold/20 rounded-xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-text-light">Create New Post</h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1 hover:bg-accent-gold/10 rounded transition-colors"
          >
            <X className="w-5 h-5 text-text-muted" />
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm text-text-muted mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a descriptive title..."
            className="w-full px-4 py-3 bg-deep-black/60 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-muted focus:border-accent-gold/50 focus:outline-none transition-colors"
            required
            maxLength={200}
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm text-text-muted mb-1">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts, questions, or insights..."
            rows={6}
            className="w-full px-4 py-3 bg-deep-black/60 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-muted focus:border-accent-gold/50 focus:outline-none transition-colors resize-none"
            required
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-text-muted hover:text-text-light transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting || !title.trim() || !content.trim()}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-accent-burgundy to-accent-sapphire text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Post
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
