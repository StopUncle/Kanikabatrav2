import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAuth(request, async (req, user) => {
    try {
      const { id } = await params
      const body = await req.json()
      const { userNotes } = body

      if (typeof userNotes !== 'string') {
        return NextResponse.json(
          { error: 'userNotes must be a string' },
          { status: 400 }
        )
      }

      const session = await prisma.coachingSession.findFirst({
        where: {
          id,
          userId: user.id
        }
      })

      if (!session) {
        return NextResponse.json(
          { error: 'Session not found' },
          { status: 404 }
        )
      }

      const updatedSession = await prisma.coachingSession.update({
        where: { id },
        data: { userNotes }
      })

      return NextResponse.json({
        success: true,
        session: updatedSession
      })
    } catch (error) {
      console.error('Error updating session notes:', error)
      return NextResponse.json(
        { error: 'Failed to update notes' },
        { status: 500 }
      )
    }
  })
}
