import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth/middleware'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string; replyId: string }> }
) {
  return requireAuth(request, async (_req, user) => {
    try {
      const { postId, replyId } = await params
      const body = await request.json()
      const { content } = body

      if (!content || content.length < 1) {
        return NextResponse.json(
          { error: 'Content is required' },
          { status: 400 }
        )
      }

      const reply = await prisma.forumReply.findUnique({
        where: { id: replyId }
      })

      if (!reply || reply.postId !== postId) {
        return NextResponse.json(
          { error: 'Reply not found' },
          { status: 404 }
        )
      }

      const currentUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true }
      })

      if (reply.authorId !== user.id && currentUser?.role !== 'ADMIN') {
        return NextResponse.json(
          { error: 'Not authorized to edit this reply' },
          { status: 403 }
        )
      }

      const updatedReply = await prisma.forumReply.update({
        where: { id: replyId },
        data: {
          content,
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
        reply: updatedReply
      })
    } catch (error) {
      console.error('Update reply error:', error)
      return NextResponse.json(
        { error: 'Failed to update reply' },
        { status: 500 }
      )
    }
  })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string; replyId: string }> }
) {
  return requireAuth(request, async (_req, user) => {
    try {
      const { postId, replyId } = await params

      const reply = await prisma.forumReply.findUnique({
        where: { id: replyId }
      })

      if (!reply || reply.postId !== postId) {
        return NextResponse.json(
          { error: 'Reply not found' },
          { status: 404 }
        )
      }

      const currentUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true }
      })

      if (
        reply.authorId !== user.id &&
        !['MODERATOR', 'ADMIN'].includes(currentUser?.role || '')
      ) {
        return NextResponse.json(
          { error: 'Not authorized to delete this reply' },
          { status: 403 }
        )
      }

      await prisma.$transaction([
        prisma.forumReply.delete({
          where: { id: replyId }
        }),
        prisma.forumPost.update({
          where: { id: postId },
          data: { replyCount: { decrement: 1 } }
        })
      ])

      return NextResponse.json({
        success: true,
        message: 'Reply deleted'
      })
    } catch (error) {
      console.error('Delete reply error:', error)
      return NextResponse.json(
        { error: 'Failed to delete reply' },
        { status: 500 }
      )
    }
  })
}
