'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, MessageCircle, Eye, Pin } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface PostCardProps {
  post: {
    id: string
    title: string
    slug: string
    content: string
    isPinned: boolean
    viewCount: number
    likeCount: number
    replyCount: number
    createdAt: string
    author: {
      id: string
      name: string | null
      displayName: string | null
      avatarUrl: string | null
    }
  }
  categorySlug: string
}

export default function PostCard({ post, categorySlug }: PostCardProps) {
  const authorName = post.author.displayName || post.author.name || 'Anonymous'
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })

  return (
    <Link
      href={`/community/forum/${categorySlug}/post/${post.id}`}
      className="block p-4 bg-deep-navy/30 hover:bg-deep-navy/50 border border-gray-800 hover:border-gray-700 rounded-lg transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {post.author.avatarUrl ? (
            <Image
              src={post.author.avatarUrl}
              alt={authorName}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
              unoptimized
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-accent-burgundy/30 flex items-center justify-center">
              <span className="text-accent-gold font-medium">
                {authorName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {post.isPinned && (
              <Pin className="w-4 h-4 text-accent-gold flex-shrink-0" />
            )}
            <h3 className="font-medium text-white truncate">
              {post.title}
            </h3>
          </div>

          <p className="text-sm text-gray-400 mt-1 line-clamp-2">
            {post.content.substring(0, 150)}...
          </p>

          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
            <span>{authorName}</span>
            <span>{timeAgo}</span>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {post.viewCount}
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {post.likeCount}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {post.replyCount}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
