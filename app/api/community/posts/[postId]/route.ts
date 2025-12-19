import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth/middleware'
import { checkAccessTier } from '@/lib/community/access'
import { verifyAccessToken } from '@/lib/auth/jwt'
import { cookies } from 'next/headers'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params

    // Get user ID if logged in
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value
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
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Check access
    const access = await checkAccessTier(userId, post.category.accessTier)
    if (!access.hasAccess) {
      return NextResponse.json(
        {
          error: access.reason,
          requiredTier: post.category.accessTier,
          upgradeUrl: access.upgradeUrl
        },
        { status: 403 }
      )
    }

    // Increment view count
    await prisma.forumPost.update({
      where: { id: postId },
      data: { viewCount: { increment: 1 } }
    })

    // Check if user liked this post
    let userLiked = false
    if (userId) {
      const like = await prisma.postLike.findUnique({
        where: {
          postId_userId: { postId, userId }
        }
      })
      userLiked = !!like
    }

    return NextResponse.json({
      success: true,
      post: {
        ...post,
        replyCount: post._count.replies,
        likeCount: post._count.likes,
        userLiked,
        _count: undefined
      }
    })
  } catch (error) {
    console.error('Post fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  return requireAuth(request, async (_req, user) => {
    try {
      const { postId } = await params
      const body = await request.json()
      const { title, content } = body

      const post = await prisma.forumPost.findUnique({
        where: { id: postId }
      })

      if (!post) {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: 404 }
        )
      }

      // Only author or admin can edit
      const currentUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true }
      })

      if (post.authorId !== user.id && currentUser?.role !== 'ADMIN') {
        return NextResponse.json(
          { error: 'Not authorized to edit this post' },
          { status: 403 }
        )
      }

      const updatedPost = await prisma.forumPost.update({
        where: { id: postId },
        data: {
          ...(title && { title }),
          ...(content && { content }),
          updatedAt: new Date()
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              displayName: true,
              avatarUrl: true
            }
          }
        }
      })

      return NextResponse.json({
        success: true,
        post: updatedPost
      })
    } catch (error) {
      console.error('Update post error:', error)
      return NextResponse.json(
        { error: 'Failed to update post' },
        { status: 500 }
      )
    }
  })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  return requireAuth(request, async (_req, user) => {
    try {
      const { postId } = await params

      const post = await prisma.forumPost.findUnique({
        where: { id: postId }
      })

      if (!post) {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: 404 }
        )
      }

      // Only author or moderator/admin can delete
      const currentUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true }
      })

      if (
        post.authorId !== user.id &&
        !['MODERATOR', 'ADMIN'].includes(currentUser?.role || '')
      ) {
        return NextResponse.json(
          { error: 'Not authorized to delete this post' },
          { status: 403 }
        )
      }

      await prisma.forumPost.delete({
        where: { id: postId }
      })

      return NextResponse.json({
        success: true,
        message: 'Post deleted'
      })
    } catch (error) {
      console.error('Delete post error:', error)
      return NextResponse.json(
        { error: 'Failed to delete post' },
        { status: 500 }
      )
    }
  })
}
