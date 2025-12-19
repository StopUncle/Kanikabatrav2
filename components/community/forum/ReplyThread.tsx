'use client'

import ReplyItem from './ReplyItem'

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

interface ReplyThreadProps {
  replies: Reply[]
  postId: string
  currentUserId: string | null
  onReplyAdded: (reply: Reply, parentId?: string) => void
}

export default function ReplyThread({
  replies,
  postId,
  currentUserId,
  onReplyAdded
}: ReplyThreadProps) {
  return (
    <div className="space-y-4">
      {replies.map((reply) => (
        <ReplyItem
          key={reply.id}
          reply={reply}
          postId={postId}
          currentUserId={currentUserId}
          onReplyAdded={onReplyAdded}
          depth={0}
        />
      ))}
    </div>
  )
}
