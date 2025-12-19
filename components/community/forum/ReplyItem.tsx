'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, Reply, Edit } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import PostEditor from './PostEditor'

interface Author {
  id: string
  name: string | null
  displayName: string | null
  avatarUrl: string | null
}

interface ReplyData {
  id: string
  content: string
  likeCount: number
  createdAt: string
  author: Author
  children: ReplyData[]
}

interface ReplyItemProps {
  reply: ReplyData
  postId: string
  currentUserId: string | null
  onReplyAdded: (reply: ReplyData, parentId?: string) => void
  depth: number
}

export default function ReplyItem({
  reply,
  postId,
  currentUserId,
  onReplyAdded,
  depth
}: ReplyItemProps) {
  const [likeCount, setLikeCount] = useState(reply.likeCount)
  const [userLiked, setUserLiked] = useState(false)
  const [showReplyEditor, setShowReplyEditor] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(reply.content)

  const authorName = reply.author.displayName || reply.author.name || 'Anonymous'
  const isAuthor = currentUserId === reply.author.id
  const maxDepth = 3

  async function handleLike() {
    if (!currentUserId) return

    try {
      const res = await fetch(`/api/community/posts/${postId}/replies/${reply.id}/like`, {
        method: 'POST'
      })
      if (res.ok) {
        const data = await res.json()
        setLikeCount(data.likeCount)
        setUserLiked(data.liked)
      }
    } catch (error) {
      console.error('Failed to like reply:', error)
    }
  }

  async function handleReplySubmit(replyContent: string) {
    try {
      const res = await fetch(`/api/community/posts/${postId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: replyContent,
          parentId: depth < maxDepth ? reply.id : undefined
        })
      })
      if (res.ok) {
        const data = await res.json()
        onReplyAdded(data.reply, depth < maxDepth ? reply.id : undefined)
        setShowReplyEditor(false)
      }
    } catch (error) {
      console.error('Failed to submit reply:', error)
    }
  }

  async function handleUpdate(newContent: string) {
    try {
      const res = await fetch(`/api/community/posts/${postId}/replies/${reply.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newContent })
      })
      if (res.ok) {
        setContent(newContent)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Failed to update reply:', error)
    }
  }

  return (
    <div className={`${depth > 0 ? 'ml-8 border-l border-gray-800 pl-4' : ''}`}>
      <div className="bg-deep-black/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          {reply.author.avatarUrl ? (
            <Image
              src={reply.author.avatarUrl}
              alt={authorName}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
              unoptimized
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-accent-burgundy/30 flex items-center justify-center">
              <span className="text-accent-gold text-sm font-medium">
                {authorName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-white text-sm">{authorName}</span>
              <span className="text-gray-500 text-xs">
                {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
              </span>
            </div>

            {isEditing ? (
              <div className="mt-2">
                <PostEditor
                  initialContent={content}
                  onSubmit={handleUpdate}
                  onCancel={() => setIsEditing(false)}
                  submitLabel="Save"
                  placeholder="Edit your reply..."
                />
              </div>
            ) : (
              <p className="text-gray-300 text-sm mt-1 whitespace-pre-wrap">{content}</p>
            )}

            <div className="flex items-center gap-4 mt-3">
              <button
                onClick={handleLike}
                disabled={!currentUserId}
                className={`
                  flex items-center gap-1 text-xs transition-colors
                  ${!currentUserId
                    ? 'text-gray-600 cursor-not-allowed'
                    : userLiked
                      ? 'text-red-500 hover:text-red-400'
                      : 'text-gray-500 hover:text-red-500'
                  }
                `}
              >
                <Heart className={`w-4 h-4 ${userLiked ? 'fill-current' : ''}`} />
                {likeCount}
              </button>

              {currentUserId && (
                <button
                  onClick={() => setShowReplyEditor(!showReplyEditor)}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-white"
                >
                  <Reply className="w-4 h-4" />
                  Reply
                </button>
              )}

              {isAuthor && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-white"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>

            {showReplyEditor && (
              <div className="mt-3">
                <PostEditor
                  onSubmit={handleReplySubmit}
                  onCancel={() => setShowReplyEditor(false)}
                  placeholder={`Reply to ${authorName}...`}
                  submitLabel="Reply"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {reply.children && reply.children.length > 0 && (
        <div className="mt-2 space-y-2">
          {reply.children.map((child) => (
            <ReplyItem
              key={child.id}
              reply={child}
              postId={postId}
              currentUserId={currentUserId}
              onReplyAdded={onReplyAdded}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
