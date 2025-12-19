import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAuth(request, async (_req, user) => {
    try {
      const { id } = await params

      const session = await prisma.coachingSession.findFirst({
        where: {
          id,
          userId: user.id
        },
        include: {
          feedback: true
        }
      })

      if (!session) {
        return NextResponse.json(
          { error: 'Session not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        feedback: session.feedback
      })
    } catch (error) {
      console.error('Error fetching feedback:', error)
      return NextResponse.json(
        { error: 'Failed to fetch feedback' },
        { status: 500 }
      )
    }
  })
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAuth(request, async (req, user) => {
    try {
      const { id } = await params
      const body = await req.json()
      const { rating, feedback, goals, outcomes } = body

      if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        return NextResponse.json(
          { error: 'Rating must be a number between 1 and 5' },
          { status: 400 }
        )
      }

      const session = await prisma.coachingSession.findFirst({
        where: {
          id,
          userId: user.id
        },
        include: {
          feedback: true
        }
      })

      if (!session) {
        return NextResponse.json(
          { error: 'Session not found' },
          { status: 404 }
        )
      }

      if (session.status !== 'COMPLETED') {
        return NextResponse.json(
          { error: 'Can only leave feedback for completed sessions' },
          { status: 400 }
        )
      }

      if (session.feedback) {
        return NextResponse.json(
          { error: 'Feedback already submitted for this session' },
          { status: 400 }
        )
      }

      const newFeedback = await prisma.sessionFeedback.create({
        data: {
          sessionId: id,
          rating,
          feedback: feedback || null,
          goals: goals || null,
          outcomes: outcomes || null
        }
      })

      return NextResponse.json({
        success: true,
        feedback: newFeedback
      })
    } catch (error) {
      console.error('Error creating feedback:', error)
      return NextResponse.json(
        { error: 'Failed to submit feedback' },
        { status: 500 }
      )
    }
  })
}
