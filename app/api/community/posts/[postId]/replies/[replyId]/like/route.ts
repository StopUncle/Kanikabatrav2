import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth/middleware'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string; replyId: string }> }
) {
  return requireAuth(request, async (_req, user) => {
    try {
      const { replyId } = await params

      const reply = await prisma.forumReply.findUnique({
        where: { id: replyId }
      })

      if (!reply) {
        return NextResponse.json(
          { error: 'Reply not found' },
          { status: 404 }
        )
      }

      const existingLike = await prisma.replyLike.findUnique({
        where: {
          replyId_userId: { replyId, userId: user.id }
        }
      })

      if (existingLike) {
        await prisma.$transaction([
          prisma.replyLike.delete({
            where: { id: existingLike.id }
          }),
          prisma.forumReply.update({
            where: { id: replyId },
            data: { likeCount: { decrement: 1 } }
          })
        ])

        return NextResponse.json({
          success: true,
          liked: false,
          likeCount: reply.likeCount - 1
        })
      } else {
        await prisma.$transaction([
          prisma.replyLike.create({
            data: { replyId, userId: user.id }
          }),
          prisma.forumReply.update({
            where: { id: replyId },
            data: { likeCount: { increment: 1 } }
          })
        ])

        return NextResponse.json({
          success: true,
          liked: true,
          likeCount: reply.likeCount + 1
        })
      }
    } catch (error) {
      console.error('Reply like toggle error:', error)
      return NextResponse.json(
        { error: 'Failed to toggle like' },
        { status: 500 }
      )
    }
  })
}
