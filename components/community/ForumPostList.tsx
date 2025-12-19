'use client'

import Link from 'next/link'
import { MessageSquare, Eye, Heart, Clock, Pin, Lock } from 'lucide-react'

interface Post {
  id: string
  title: string
  slug: string
  content: string
  isPinned: boolean
  isLocked: boolean
  viewCount: number
  likeCount: number
  replyCount: number
  createdAt: string
  lastReplyAt: string | null
  author: {
    id: string
    displayName: string | null
    name: string | null
    role: string
  }
}

interface ForumPostListProps {
  posts: Post[]
  categorySlug: string
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

function getAuthorBadge(role: string) {
  if (role === 'ADMIN') {
    return (
      <span className="px-1.5 py-0.5 bg-accent-gold text-deep-black text-xs rounded font-medium">
        Admin
      </span>
    )
  }
  if (role === 'MODERATOR') {
    return (
      <span className="px-1.5 py-0.5 bg-accent-burgundy text-white text-xs rounded font-medium">
        Mod
      </span>
    )
  }
  return null
}

export default function ForumPostList({ posts, categorySlug }: ForumPostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-deep-black/40 backdrop-blur-sm border border-accent-gold/20 rounded-xl">
        <MessageSquare className="w-12 h-12 text-text-muted mx-auto mb-4" />
        <p className="text-text-gray mb-2">No posts yet</p>
        <p className="text-sm text-text-muted">Be the first to start a discussion!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/community/${categorySlug}/${post.slug}`}
          className="block bg-deep-black/40 backdrop-blur-sm border border-accent-gold/10 rounded-xl p-4 sm:p-5 hover:border-accent-gold/30 transition-all group"
        >
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex w-10 h-10 rounded-full bg-gradient-to-br from-accent-burgundy to-accent-sapphire items-center justify-center flex-shrink-0">
              <span className="text-white font-medium text-sm">
                {(post.author.displayName || post.author.name || 'A')[0].toUpperCase()}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                {post.isPinned && (
                  <Pin className="w-4 h-4 text-accent-gold" />
                )}
                {post.isLocked && (
                  <Lock className="w-4 h-4 text-text-muted" />
                )}
                <h3 className="font-medium text-text-light group-hover:text-accent-gold transition-colors truncate">
                  {post.title}
                </h3>
              </div>

              <p className="text-sm text-text-gray line-clamp-2 mb-3">
                {post.content.slice(0, 150)}...
              </p>

              <div className="flex items-center flex-wrap gap-3 sm:gap-4 text-xs text-text-muted">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-text-light">
                    {post.author.displayName || post.author.name || 'Anonymous'}
                  </span>
                  {getAuthorBadge(post.author.role)}
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimeAgo(post.createdAt)}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{post.viewCount}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  <span>{post.likeCount}</span>
                </div>

                <div className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>{post.replyCount} replies</span>
                </div>

                {post.lastReplyAt && (
                  <span className="hidden sm:inline">
                    Last reply {formatTimeAgo(post.lastReplyAt)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
