'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MessageCircle, Eye, Share2, Edit } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import LikeButton from './LikeButton'
import ReplyThread from './ReplyThread'
import PostEditor from './PostEditor'

interface Author {
  id: string
  name: string | null
  displayName: string | null
  avatarUrl: string | null
}

interface Reply {
  id: string
  content: string
  likeCount: number
  createdAt: string
  author: Author
  children: Reply[]
}

interface PostDetailProps {
  post: {
    id: string
    title: string
    content: string
    viewCount: number
    likeCount: number
    replyCount: number
    userLiked: boolean
    createdAt: string
    updatedAt: string
    author: Author
    category: {
      id: string
      name: string
      slug: string
    }
  }
  currentUserId: string | null
}

export default function PostDetail({ post, currentUserId }: PostDetailProps) {
  const [likeCount, setLikeCount] = useState(post.likeCount)
  const [userLiked, setUserLiked] = useState(post.userLiked)
  const [replies, setReplies] = useState<Reply[]>([])
  const [repliesLoading, setRepliesLoading] = useState(true)
  const [showReplyEditor, setShowReplyEditor] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [postContent, setPostContent] = useState(post.content)
  const [postTitle, setPostTitle] = useState(post.title)

  const authorName = post.author.displayName || post.author.name || 'Anonymous'
  const isAuthor = currentUserId === post.author.id

  useState(() => {
    async function fetchReplies() {
      try {
        const res = await fetch(`/api/community/posts/${post.id}/replies`)
        if (res.ok) {
          const data = await res.json()
          setReplies(data.replies || [])
        }
      } catch (error) {
        console.error('Failed to fetch replies:', error)
      } finally {
        setRepliesLoading(false)
      }
    }
    fetchReplies()
  })

  async function handleLikeToggle() {
    if (!currentUserId) return

    try {
      const res = await fetch(`/api/community/posts/${post.id}/like`, {
        method: 'POST'
      })
      if (res.ok) {
        const data = await res.json()
        setLikeCount(data.likeCount)
        setUserLiked(data.liked)
      }
    } catch (error) {
      console.error('Failed to toggle like:', error)
    }
  }

  async function handleReplySubmit(content: string) {
    try {
      const res = await fetch(`/api/community/posts/${post.id}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      })
      if (res.ok) {
        const data = await res.json()
        setReplies([...replies, data.reply])
        setShowReplyEditor(false)
      }
    } catch (error) {
      console.error('Failed to submit reply:', error)
    }
  }

  async function handlePostUpdate(title: string, content: string) {
    try {
      const res = await fetch(`/api/community/posts/${post.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      })
      if (res.ok) {
        setPostTitle(title)
        setPostContent(content)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Failed to update post:', error)
    }
  }

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({
        title: postTitle,
        url: window.location.href
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="space-y-6">
      <article className="bg-deep-navy/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-start gap-4">
          {post.author.avatarUrl ? (
            <Image
              src={post.author.avatarUrl}
              alt={authorName}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover"
              unoptimized
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-accent-burgundy/30 flex items-center justify-center">
              <span className="text-accent-gold font-semibold text-lg">
                {authorName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-white">{authorName}</span>
                <span className="text-gray-500 text-sm ml-2">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </span>
              </div>
              {isAuthor && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {isEditing ? (
              <div className="mt-4">
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  className="w-full bg-deep-black border border-gray-700 rounded-lg px-4 py-2 text-white mb-3"
                />
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  rows={6}
                  className="w-full bg-deep-black border border-gray-700 rounded-lg px-4 py-2 text-white resize-none"
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handlePostUpdate(postTitle, postContent)}
                    className="px-4 py-2 bg-accent-gold text-deep-black rounded-lg font-medium hover:bg-accent-gold/90"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-white mt-2">{postTitle}</h1>
                <div className="mt-4 text-gray-300 whitespace-pre-wrap">
                  {postContent}
                </div>
              </>
            )}

            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-800">
              <LikeButton
                liked={userLiked}
                count={likeCount}
                onClick={handleLikeToggle}
                disabled={!currentUserId}
              />
              <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                <MessageCircle className="w-5 h-5" />
                <span>{post.replyCount}</span>
              </button>
              <div className="flex items-center gap-2 text-gray-500">
                <Eye className="w-5 h-5" />
                <span>{post.viewCount}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </article>

      <div className="bg-deep-navy/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">
            Replies ({replies.length})
          </h2>
          {currentUserId && (
            <button
              onClick={() => setShowReplyEditor(!showReplyEditor)}
              className="px-4 py-2 bg-accent-burgundy/20 text-accent-gold rounded-lg hover:bg-accent-burgundy/30"
            >
              Write Reply
            </button>
          )}
        </div>

        {showReplyEditor && (
          <div className="mb-6">
            <PostEditor
              onSubmit={handleReplySubmit}
              onCancel={() => setShowReplyEditor(false)}
              placeholder="Write your reply..."
              submitLabel="Post Reply"
            />
          </div>
        )}

        {repliesLoading ? (
          <div className="text-center py-8 text-gray-500">Loading replies...</div>
        ) : replies.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No replies yet. Be the first to respond!
          </div>
        ) : (
          <ReplyThread
            replies={replies}
            postId={post.id}
            currentUserId={currentUserId}
            onReplyAdded={(newReply: Reply, parentId?: string) => {
              if (parentId) {
                setReplies(replies.map(r =>
                  r.id === parentId
                    ? { ...r, children: [...r.children, newReply] }
                    : r
                ))
              } else {
                setReplies([...replies, newReply])
              }
            }}
          />
        )}
      </div>
    </div>
  )
}
