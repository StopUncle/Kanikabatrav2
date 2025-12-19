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
    const { searchParams } = new URL(request.url)
    const cursor = searchParams.get('cursor')
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50)

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
        category: {
          select: { accessTier: true }
        }
      }
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    const access = await checkAccessTier(userId, post.category.accessTier)
    if (!access.hasAccess) {
      return NextResponse.json(
        { error: access.reason },
        { status: 403 }
      )
    }

    const replies = await prisma.forumReply.findMany({
      where: {
        postId,
        parentId: null
      },
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'asc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            displayName: true,
            avatarUrl: true
          }
        },
        children: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                displayName: true,
                avatarUrl: true
              }
            },
            _count: {
              select: { likes: true }
            }
          },
          orderBy: { createdAt: 'asc' }
        },
        _count: {
          select: { likes: true }
        }
      }
    })

    const hasMore = replies.length > limit
    const results = hasMore ? replies.slice(0, -1) : replies
    const nextCursor = hasMore ? results[results.length - 1].id : null

    const formattedReplies = results.map(reply => ({
      ...reply,
      likeCount: reply._count.likes,
      children: reply.children.map(child => ({
        ...child,
        likeCount: child._count.likes,
        _count: undefined
      })),
      _count: undefined
    }))

    return NextResponse.json({
      success: true,
      replies: formattedReplies,
      nextCursor,
      hasMore
    })
  } catch (error) {
    console.error('Replies fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch replies' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  return requireAuth(request, async (_req, user) => {
    try {
      const { postId } = await params
      const body = await request.json()
      const { content, parentId } = body

      if (!content || content.length < 1) {
        return NextResponse.json(
          { error: 'Content is required' },
          { status: 400 }
        )
      }

      const post = await prisma.forumPost.findUnique({
        where: { id: postId },
        include: {
          category: {
            select: { accessTier: true }
          }
        }
      })

      if (!post) {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: 404 }
        )
      }

      if (post.isLocked) {
        return NextResponse.json(
          { error: 'This post is locked' },
          { status: 403 }
        )
      }

      const access = await checkAccessTier(user.id, post.category.accessTier)
      if (!access.hasAccess) {
        return NextResponse.json(
          { error: access.reason },
          { status: 403 }
        )
      }

      if (parentId) {
        const parentReply = await prisma.forumReply.findUnique({
          where: { id: parentId }
        })
        if (!parentReply || parentReply.postId !== postId) {
          return NextResponse.json(
            { error: 'Parent reply not found' },
            { status: 404 }
          )
        }
      }

      const [reply] = await prisma.$transaction([
        prisma.forumReply.create({
          data: {
            postId,
            authorId: user.id,
            content,
            parentId: parentId || null
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
        }),
        prisma.forumPost.update({
          where: { id: postId },
          data: {
            replyCount: { increment: 1 },
            lastReplyAt: new Date()
          }
        })
      ])

      return NextResponse.json({
        success: true,
        reply: {
          ...reply,
          likeCount: 0,
          children: []
        }
      }, { status: 201 })
    } catch (error) {
      console.error('Create reply error:', error)
      return NextResponse.json(
        { error: 'Failed to create reply' },
        { status: 500 }
      )
    }
  })
}
