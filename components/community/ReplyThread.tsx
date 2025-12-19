'use client'

import { useState } from 'react'
import { Heart, Reply, Loader2 } from 'lucide-react'

interface ReplyAuthor {
  id: string
  displayName: string | null
  name: string | null
  role: string
}

interface ForumReply {
  id: string
  content: string
  likeCount: number
  isEdited: boolean
  createdAt: string
  author: ReplyAuthor
  children?: ForumReply[]
}

interface ReplyThreadProps {
  replies: ForumReply[]
  postId: string
  isLoggedIn: boolean
  onReplyAdded?: () => void
  depth?: number
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return date.toLocaleDateString()
}

function ReplyItem({
  reply,
  postId,
  isLoggedIn,
  onReplyAdded,
  depth = 0
}: {
  reply: ForumReply
  postId: string
  isLoggedIn: boolean
  onReplyAdded?: () => void
  depth: number
}) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(reply.likeCount)

  const handleLike = async () => {
    if (!isLoggedIn) return

    try {
      const response = await fetch(`/api/community/posts/${postId}/replies/${reply.id}/like`, {
        method: 'POST'
      })

      if (response.ok) {
        setIsLiked(!isLiked)
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
      }
    } catch (error) {
      console.error('Failed to like reply:', error)
    }
  }

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyContent.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/community/posts/${postId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: replyContent.trim(),
          parentId: reply.id
        })
      })

      if (response.ok) {
        setReplyContent('')
        setShowReplyForm(false)
        if (onReplyAdded) onReplyAdded()
      }
    } catch (error) {
      console.error('Failed to submit reply:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const maxDepth = 3

  return (
    <div className={`${depth > 0 ? 'ml-4 sm:ml-8 border-l border-accent-gold/10 pl-4' : ''}`}>
      <div className="py-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-burgundy/50 to-accent-sapphire/50 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-medium">
              {(reply.author.displayName || reply.author.name || 'A')[0].toUpperCase()}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-text-light text-sm">
                {reply.author.displayName || reply.author.name || 'Anonymous'}
              </span>
              {reply.author.role === 'ADMIN' && (
                <span className="px-1.5 py-0.5 bg-accent-gold text-deep-black text-xs rounded font-medium">
                  Admin
                </span>
              )}
              <span className="text-xs text-text-muted">
                {formatTimeAgo(reply.createdAt)}
              </span>
              {reply.isEdited && (
                <span className="text-xs text-text-muted">(edited)</span>
              )}
            </div>

            <p className="text-text-gray text-sm whitespace-pre-wrap mb-2">
              {reply.content}
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                disabled={!isLoggedIn}
                className={`flex items-center gap-1 text-xs transition-colors ${
                  isLiked ? 'text-red-400' : 'text-text-muted hover:text-red-400'
                } ${!isLoggedIn ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Heart className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
                <span>{likeCount}</span>
              </button>

              {isLoggedIn && depth < maxDepth && (
                <button
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="flex items-center gap-1 text-xs text-text-muted hover:text-accent-gold transition-colors"
                >
                  <Reply className="w-3 h-3" />
                  Reply
                </button>
              )}
            </div>

            {showReplyForm && (
              <form onSubmit={handleSubmitReply} className="mt-3">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  rows={2}
                  className="w-full px-3 py-2 bg-deep-black/60 border border-accent-gold/20 rounded-lg text-sm text-text-light placeholder-text-muted focus:border-accent-gold/50 focus:outline-none resize-none"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowReplyForm(false)}
                    className="px-3 py-1 text-xs text-text-muted hover:text-text-light transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !replyContent.trim()}
                    className="flex items-center gap-1 px-3 py-1 bg-accent-gold/20 text-accent-gold rounded text-xs hover:bg-accent-gold/30 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      'Reply'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {reply.children && reply.children.length > 0 && depth < maxDepth && (
        <div className="space-y-0">
          {reply.children.map((child) => (
            <ReplyItem
              key={child.id}
              reply={child}
              postId={postId}
              isLoggedIn={isLoggedIn}
              onReplyAdded={onReplyAdded}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ReplyThread({
  replies,
  postId,
  isLoggedIn,
  onReplyAdded,
  depth = 0
}: ReplyThreadProps) {
  if (replies.length === 0) {
    return (
      <div className="text-center py-8 text-text-muted">
        <p>No replies yet. Be the first to respond!</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-accent-gold/10">
      {replies.map((reply) => (
        <ReplyItem
          key={reply.id}
          reply={reply}
          postId={postId}
          isLoggedIn={isLoggedIn}
          onReplyAdded={onReplyAdded}
          depth={depth}
        />
      ))}
    </div>
  )
}
