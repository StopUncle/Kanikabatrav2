import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { verifyAccessToken } from '@/lib/auth/jwt'
import { prisma } from '@/lib/prisma'
import { checkAccessTier } from '@/lib/community/access'
import PostDetail from '@/components/community/forum/PostDetail'
import AccessGate from '@/components/community/access/AccessGate'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: Promise<{ categorySlug: string; postId: string }>
}

export async function generateMetadata({ params }: Props) {
  const { postId } = await params
  const post = await prisma.forumPost.findUnique({
    where: { id: postId },
    select: { title: true, content: true }
  })

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${post.title} | Forum | Kanika Batra`,
    description: post.content.substring(0, 160)
  }
}

export default async function PostPage({ params }: Props) {
  const { categorySlug, postId } = await params

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  let userId: string | null = null

  if (accessToken) {
    const payload = verifyAccessToken(accessToken)
    if (payload) {
      userId = payload.userId
    }
  }

  const post = await prisma.forumPost.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          displayName: true,
          avatarUrl: true
        }
      },
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
          accessTier: true
        }
      },
      _count: {
        select: { replies: true, likes: true }
      }
    }
  })

  if (!post) {
    notFound()
  }

  if (post.category.slug !== categorySlug) {
    notFound()
  }

  const access = await checkAccessTier(userId, post.category.accessTier)

  if (!access.hasAccess) {
    return (
      <AccessGate
        hasAccess={false}
        requiredTier={post.category.accessTier}
        reason={access.reason}
        upgradeUrl={access.upgradeUrl}
      />
    )
  }

  await prisma.forumPost.update({
    where: { id: postId },
    data: { viewCount: { increment: 1 } }
  })

  let userLiked = false
  if (userId) {
    const like = await prisma.postLike.findUnique({
      where: {
        postId_userId: { postId, userId }
      }
    })
    userLiked = !!like
  }

  const formattedPost = {
    id: post.id,
    title: post.title,
    content: post.content,
    viewCount: post.viewCount,
    replyCount: post._count.replies,
    likeCount: post._count.likes,
    userLiked,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    author: post.author,
    category: {
      id: post.category.id,
      name: post.category.name,
      slug: post.category.slug
    }
  }

  return (
    <div>
      <Link
        href={`/community/forum/${categorySlug}`}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to {post.category.name}
      </Link>

      <PostDetail post={formattedPost} currentUserId={userId} />
    </div>
  )
}
